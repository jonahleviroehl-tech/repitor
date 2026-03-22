import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="mx-auto grid max-w-7xl items-center px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        {/* Left column — text */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/60 px-4 py-1.5">
            <span className="inline-block size-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Erste Korrektur kostenlos
            </span>
          </div>

          <h1 className="mt-6 max-w-[20ch] text-5xl font-bold leading-[0.95] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Jura-Klausur
            <br />
            korrigieren lassen.
            <br />
            <span className="text-primary">In Minuten.</span>
          </h1>

          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            Jede geschriebene Klausur bringt dich weiter als 100 Karteikarten —
            aber nur mit Feedback. Repitor gibt dir in Minuten detaillierte
            Rückmeldung zu Aufbau, Gutachtenstil und Schwerpunktsetzung.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="/korrektur"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold tracking-tight text-primary-foreground transition-all duration-200 hover:bg-primary/85 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
            >
              Jetzt kostenlos testen
              <ArrowRight className="size-5" />
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {["Keine Anmeldung nötig", "Alle Rechtsgebiete", "Keine Datenspeicherung"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="size-3.5 text-primary/60" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — product mock */}
        <div className="hidden md:block" aria-hidden="true">
          <div className="-rotate-1 rounded-2xl border border-border bg-card p-6 shadow-xl shadow-primary/5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Korrekturergebnis
            </p>

            {/* Grade badge */}
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-primary/15 px-4 py-3">
              <span className="text-xs font-medium text-muted-foreground">~</span>
              <span className="text-3xl font-bold tabular-nums leading-none text-foreground">
                11
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Punkte
                </span>
                <span className="text-[11px] leading-none text-muted-foreground">
                  geschätzt
                </span>
              </div>
            </div>

            {/* Stärken */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="text-xs font-medium text-muted-foreground mr-1">
                Stärken:
              </span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                Gutachtenstil
              </span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                Schwerpunktsetzung
              </span>
            </div>

            {/* Schwächen */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="text-xs font-medium text-muted-foreground mr-1">
                Verbesserungspotenzial:
              </span>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                Subsumtionstiefe
              </span>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-border" />

            {/* Feedback preview with fade */}
            <div className="relative">
              <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Ausführung zum Schutzzweck der Norm hat überzeugt. Die
                  Anspruchsgrundlage § 823 I BGB wurde korrekt identifiziert
                  und sauber aufgebaut.
                </p>
                <p>
                  Bei der Subsumtion des Verschuldens wäre eine tiefere
                  Auseinandersetzung mit dem Sorgfaltsmaßstab
                  wünschenswert...
                </p>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
            </div>

            {/* Bottom */}
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
              Korrektur abgeschlossen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
