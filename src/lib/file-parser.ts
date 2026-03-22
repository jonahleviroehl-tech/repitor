import mammoth from "mammoth";
import {
  SUPPORTED_EXTENSIONS,
  getSupportedFormatsLabel,
} from "@/lib/supported-formats";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse/lib/pdf-parse") as (
  buffer: Buffer
) => Promise<{ text: string; numpages: number; info: unknown }>;

const MAX_TEXT_LENGTH = 40_000;

const SUPPORTED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
  "application/rtf",
  "text/rtf",
] as const;

export class FileParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileParseError";
  }
}

function getFileExtension(filename: string): string {
  return filename.toLowerCase().slice(filename.lastIndexOf("."));
}

function isSupportedFile(filename: string, mimeType: string): boolean {
  const ext = getFileExtension(filename);
  return (
    SUPPORTED_EXTENSIONS.includes(ext) ||
    (SUPPORTED_MIME_TYPES as readonly string[]).includes(mimeType)
  );
}

async function extractFromPdf(buffer: Buffer): Promise<string> {
  try {
    const result = await pdfParse(buffer);
    return result.text?.trim() ?? "";
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes("password")) {
      throw new FileParseError(
        "Diese PDF ist passwortgeschützt. Bitte lade eine ungeschützte Datei hoch."
      );
    }

    throw new FileParseError(
      "Die PDF-Datei konnte nicht gelesen werden. Bitte stelle sicher, dass es sich um ein gültiges PDF handelt."
    );
  }
}

async function extractFromDocx(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value?.trim() ?? "";
  } catch {
    throw new FileParseError(
      "Die DOCX-Datei konnte nicht gelesen werden. Bitte stelle sicher, dass es sich um ein gültiges Word-Dokument handelt."
    );
  }
}

function extractFromTxt(buffer: Buffer): string {
  return buffer.toString("utf-8").trim();
}

function extractFromRtf(buffer: Buffer): string {
  // Strip RTF control words and extract plain text
  const raw = buffer.toString("utf-8");
  // Remove RTF header, control words, and groups — keep text content
  const text = raw
    .replace(/\{\\[^{}]*\}/g, "") // remove nested groups like {\fonttbl...}
    .replace(/\\[a-z]+\d*\s?/gi, "") // remove control words like \par \b \i
    .replace(/[{}]/g, "") // remove remaining braces
    .replace(/\\\\/g, "\\") // unescape backslashes
    .replace(/\\'([0-9a-f]{2})/gi, (_, hex: string) =>
      String.fromCharCode(parseInt(hex, 16))
    ) // hex chars
    .replace(/\r\n/g, "\n")
    .trim();

  return text;
}

export async function extractTextFromFile(
  buffer: ArrayBuffer,
  filename: string,
  mimeType: string
): Promise<string> {
  if (!isSupportedFile(filename, mimeType)) {
    throw new FileParseError(
      `Das Dateiformat wird nicht unterstützt. Erlaubt sind: ${getSupportedFormatsLabel()}.`
    );
  }

  const buf = Buffer.from(buffer);
  const ext = getFileExtension(filename);

  let text: string;

  if (ext === ".pdf" || mimeType === "application/pdf") {
    text = await extractFromPdf(buf);
  } else if (
    ext === ".docx" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    text = await extractFromDocx(buf);
  } else if (ext === ".doc" || mimeType === "application/msword") {
    // .doc (legacy Word) — mammoth doesn't support .doc, try as text fallback
    // Most modern .doc files are actually .docx mislabeled
    try {
      text = await extractFromDocx(buf);
    } catch {
      throw new FileParseError(
        "Das ältere .doc-Format wird nicht zuverlässig unterstützt. Bitte speichere die Datei als .docx oder .pdf und lade sie erneut hoch."
      );
    }
  } else if (ext === ".txt" || mimeType === "text/plain") {
    text = extractFromTxt(buf);
  } else if (
    ext === ".rtf" ||
    mimeType === "application/rtf" ||
    mimeType === "text/rtf"
  ) {
    text = extractFromRtf(buf);
  } else {
    throw new FileParseError(
      `Das Dateiformat wird nicht unterstützt. Erlaubt sind: ${getSupportedFormatsLabel()}.`
    );
  }

  if (text.length < 50) {
    throw new FileParseError(
      "Die Datei scheint keinen lesbaren Text zu enthalten. Bitte lade eine Datei mit Textinhalt hoch."
    );
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return (
      text.slice(0, MAX_TEXT_LENGTH) +
      "\n\n[Text wurde nach 40.000 Zeichen abgeschnitten]"
    );
  }

  return text;
}
