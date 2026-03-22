export const SUPPORTED_EXTENSIONS = [".pdf", ".docx", ".doc", ".txt", ".rtf"];

export function getSupportedFormatsLabel(): string {
  return "PDF, DOCX, TXT, RTF";
}

export function getSupportedAcceptString(): string {
  return ".pdf,.docx,.doc,.txt,.rtf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain,application/rtf";
}
