// Import from lib to avoid pdf-parse's test file reference in index.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse/lib/pdf-parse") as (
  buffer: Buffer
) => Promise<{ text: string; numpages: number; info: unknown }>;

const MAX_TEXT_LENGTH = 40_000;

export class PdfParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PdfParseError";
  }
}

export async function extractTextFromPdf(
  buffer: ArrayBuffer
): Promise<string> {
  try {
    const result = await pdfParse(Buffer.from(buffer));
    const text = result.text?.trim() ?? "";

    if (text.length < 50) {
      throw new PdfParseError(
        "Diese PDF scheint eingescannt zu sein oder enthält keinen lesbaren Text. Bitte lade eine PDF mit Textebene hoch."
      );
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return (
        text.slice(0, MAX_TEXT_LENGTH) +
        "\n\n[Text wurde nach 40.000 Zeichen abgeschnitten]"
      );
    }

    return text;
  } catch (error) {
    if (error instanceof PdfParseError) throw error;

    const message =
      error instanceof Error ? error.message : String(error);

    if (message.includes("password")) {
      throw new PdfParseError(
        "Diese PDF ist passwortgeschützt. Bitte lade eine ungeschützte PDF hoch."
      );
    }

    throw new PdfParseError(
      "Die PDF-Datei konnte nicht gelesen werden. Bitte stelle sicher, dass es sich um ein gültiges PDF handelt."
    );
  }
}
