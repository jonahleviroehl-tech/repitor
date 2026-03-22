import Anthropic from "@anthropic-ai/sdk";
import {
  buildSchemaPrompt,
  buildCorrectionPrompt,
  type EvaluationSchema,
} from "./prompts";

const client = new Anthropic();

// TODO: Dedizierte Prompt-Engineering Session — Model-Wahl überprüfen
const MODEL = "claude-sonnet-4-5-20250514";

// --- Stage 1: Schema aus Lösungsskizze generieren (nicht-streaming) ---

export async function generateSchema(
  skizzeText: string
): Promise<EvaluationSchema> {
  const { system, user } = buildSchemaPrompt(skizzeText);

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system,
    messages: [{ role: "user", content: user }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // JSON aus der Antwort extrahieren (Claude gibt manchmal Markdown-Wrapper mit)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Claude hat kein valides JSON zurückgegeben.");
  }

  const schema = JSON.parse(jsonMatch[0]) as EvaluationSchema;

  // Basis-Validierung
  if (!schema.schwerpunkte || !Array.isArray(schema.schwerpunkte)) {
    throw new Error("Ungültiges Bewertungsschema: schwerpunkte fehlt.");
  }

  return schema;
}

// --- Stage 2: Korrektur streamen ---

export function streamCorrection(
  klausurText: string,
  schema: EvaluationSchema,
  loesungText: string
): ReadableStream<Uint8Array> {
  const { system, user } = buildCorrectionPrompt(
    klausurText,
    schema,
    loesungText
  );
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: MODEL,
          max_tokens: 8000,
          system,
          messages: [{ role: "user", content: user }],
        });

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const chunk = `data: ${JSON.stringify(event.delta.text)}\n\n`;
            controller.enqueue(encoder.encode(chunk));
          }
        }

        controller.enqueue(encoder.encode("event: done\ndata: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unbekannter Fehler";
        controller.enqueue(
          encoder.encode(`event: error\ndata: ${JSON.stringify(message)}\n\n`)
        );
        controller.close();
      }
    },
  });
}
