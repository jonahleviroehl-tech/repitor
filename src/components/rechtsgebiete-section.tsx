const RECHTSGEBIETE = [
  "Zivilrecht",
  "Strafrecht",
  "Öffentliches Recht",
  "BGB AT",
  "Schuldrecht",
  "Sachenrecht",
  "Verwaltungsrecht",
  "Staatsrecht",
  "Europarecht",
  "Arbeitsrecht",
  "Handelsrecht",
  "Gesellschaftsrecht",
  "Strafprozessrecht",
  "Zivilprozessrecht",
];

export function RechtsgebieteSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
          Funktioniert für alle Rechtsgebiete
        </h2>
        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground md:text-lg">
          Ob Probeklausur im Strafrecht, Übungsklausur im BGB AT oder
          Examensklausur im Öffentlichen Recht — Repitor gibt dir Feedback zu
          jeder Klausur, in jedem Rechtsgebiet.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {RECHTSGEBIETE.map((gebiet) => (
            <span
              key={gebiet}
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/60"
            >
              {gebiet}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
