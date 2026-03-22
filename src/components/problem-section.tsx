import { AlertTriangle, Clock } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
          Klausuren üben ist das effektivste Training
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <AlertTriangle className="size-6 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">
              Karteikarten reichen nicht
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Definitionen kennen reicht nicht. Im Examen zählt nur, wie du sie
              anwendest. Jede geschriebene Klausur trainiert genau das —
              Karteikarten nicht. Aktives Anwenden schlägt passives Wiederholen
              bei komplexen Aufgaben wie Jura-Examensklausuren.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-destructive/10">
              <Clock className="size-6 text-destructive" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">
              Aber ohne Feedback übst du blind
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              Eine Klausur ohne Feedback ist wie Training ohne Spiegel. Gleiche
              Fehler 50 Mal wiederholen — falscher Aufbau, fehlende Subsumtion,
              Schwerpunkt falsch gesetzt — ohne es zu merken. Klassische
              Korrekturdienste: 3 Wochen Wartezeit, 25–35{"\u202F"}€ pro
              Korrektur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
