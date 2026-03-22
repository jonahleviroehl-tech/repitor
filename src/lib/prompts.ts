// TODO: Dedizierte Prompt-Engineering Session
// Diese Prompts sind funktionale Platzhalter für den End-to-End-Flow.
// Die finale Prompt-Architektur wird in einer eigenen Session entwickelt.

export type EvaluationSchema = {
  schwerpunkte: {
    name: string;
    maxPunkte: number;
    erwarteteInhalte: string[];
  }[];
  gesamtpunkte: number;
  bewertungskriterien: string[];
};

export type CorrectionMeta = {
  note: number;
  staerken: string[];
  schwaechen: string[];
  zusammenfassung: string;
};

// --- Stage 1: Schema-Generierung aus der Lösungsskizze ---

export function buildSchemaPrompt(skizzeText: string): {
  system: string;
  user: string;
} {
  // TODO: Dedizierte Prompt-Engineering Session
  return {
    system: `Du bist ein erfahrener Jura-Korrektor an einer deutschen Universität.
Deine Aufgabe: Analysiere die folgende Lösungsskizze und erstelle ein strukturiertes Bewertungsschema als JSON.

Antworte NUR mit validem JSON in diesem Format:
{
  "schwerpunkte": [
    {
      "name": "Name des Prüfungspunkts",
      "maxPunkte": 5,
      "erwarteteInhalte": ["Erwarteter Inhalt 1", "Erwarteter Inhalt 2"]
    }
  ],
  "gesamtpunkte": 18,
  "bewertungskriterien": ["Gutachtenstil", "Subsumtion", "Aufbau", "Schwerpunktsetzung"]
}

Kein Markdown, keine Erklärungen — nur JSON.`,
    user: `Hier ist die Lösungsskizze:\n\n${skizzeText}`,
  };
}

// --- Stage 2: Korrektur basierend auf dem Schema ---

export function buildCorrectionPrompt(
  klausurText: string,
  schema: EvaluationSchema,
  loesungText: string
): { system: string; user: string } {
  // TODO: Dedizierte Prompt-Engineering Session
  return {
    system: `Du bist ein erfahrener Jura-Korrektor an einer deutschen Universität.
Du korrigierst die Klausurlösung eines Studierenden anhand eines Bewertungsschemas.

Beginne deine Antwort mit einem META-Block im folgenden Format:
<!-- META -->
{
  "note": 10,
  "staerken": ["Guter Aufbau", "Saubere Subsumtion"],
  "schwaechen": ["Schwerpunkt falsch gesetzt", "Meinungsstreit fehlt"],
  "zusammenfassung": "Solide Arbeit mit Schwächen in der Schwerpunktsetzung."
}
<!-- /META -->

Danach folgt deine ausführliche Korrektur als Markdown:
- Verwende ## für jeden Schwerpunkt aus dem Bewertungsschema
- Zitiere konkrete Stellen aus der Bearbeitung
- Gib spezifische Verbesserungsvorschläge
- Sei ehrlich aber ermutigend, duze den Studierenden
- Vergib Punkte pro Schwerpunkt

Die Note ist in Notenpunkten (0-18).`,
    user: `## Klausur-Sachverhalt

${klausurText}

## Bewertungsschema

${JSON.stringify(schema, null, 2)}

## Bearbeitung des Studierenden

${loesungText}`,
  };
}
