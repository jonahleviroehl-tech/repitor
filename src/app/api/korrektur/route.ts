import { NextRequest } from "next/server";
import { extractTextFromFile, FileParseError } from "@/lib/file-parser";
import { generateSchema, streamCorrection } from "@/lib/claude";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const klausurFile = formData.get("klausur") as File | null;
    const skizzeFile = formData.get("skizze") as File | null;
    const loesungFile = formData.get("loesung") as File | null;
    const loesungText = formData.get("loesungText") as string | null;

    // --- Validierung ---

    if (!klausurFile || !skizzeFile) {
      return Response.json(
        { error: "Klausur und Lösungsskizze sind erforderlich." },
        { status: 400 }
      );
    }

    if (!loesungFile && (!loesungText || loesungText.trim().length < 50)) {
      return Response.json(
        {
          error:
            "Bitte lade deine Lösung als Datei hoch oder gib sie als Text ein (mindestens 50 Zeichen).",
        },
        { status: 400 }
      );
    }

    for (const file of [klausurFile, skizzeFile, loesungFile].filter(Boolean)) {
      if (file!.size > MAX_FILE_SIZE) {
        return Response.json(
          { error: `Die Datei "${file!.name}" ist zu groß. Maximal 10 MB.` },
          { status: 413 }
        );
      }
    }

    // --- Texte extrahieren (parallel) ---

    const extractionPromises = [
      extractTextFromFile(
        await klausurFile.arrayBuffer(),
        klausurFile.name,
        klausurFile.type
      ),
      extractTextFromFile(
        await skizzeFile.arrayBuffer(),
        skizzeFile.name,
        skizzeFile.type
      ),
    ];

    if (loesungFile) {
      extractionPromises.push(
        extractTextFromFile(
          await loesungFile.arrayBuffer(),
          loesungFile.name,
          loesungFile.type
        )
      );
    }

    const results = await Promise.all(extractionPromises);
    const klausurText = results[0];
    const skizzeText = results[1];
    const finalLoesungText = loesungFile ? results[2] : loesungText!.trim();

    // --- Stage 1: Bewertungsschema generieren (blockierend) ---

    const schema = await generateSchema(skizzeText);

    // --- Stage 2: Korrektur streamen ---

    const encoder = new TextEncoder();
    const schemaEvent = `event: schema\ndata: ${JSON.stringify(schema)}\n\n`;

    const correctionStream = streamCorrection(
      klausurText,
      schema,
      finalLoesungText
    );

    // Schema-Event vor den Correction-Stream setzen
    const combinedStream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(schemaEvent));

        const reader = correctionStream.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(combinedStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    if (error instanceof FileParseError) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.error("Korrektur-Fehler:", error);
    return Response.json(
      {
        error:
          "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.",
      },
      { status: 500 }
    );
  }
}
