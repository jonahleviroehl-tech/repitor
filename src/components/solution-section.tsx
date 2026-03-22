import { Target, BookOpen, Zap, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Target,
    title: "Klausurtechnik-Fokus",
    description:
      "Aufbaufehler, Schwerpunkte, Subsumtionstiefe — das, was über Punkte entscheidet.",
  },
  {
    icon: BookOpen,
    title: "Basiert auf deiner Lösungsskizze",
    description:
      "Funktioniert für jedes Rechtsgebiet und jede Klausur. Du lieferst den Maßstab.",
  },
  {
    icon: Zap,
    title: "In Minuten, nicht Wochen",
    description:
      "Sofort-Feedback statt 3 Wochen Wartezeit. Je kürzer die Feedback-Schleife, desto schneller wirst du besser.",
  },
];

export function SolutionSection() {
  return (
    <section className="border-y border-border/50 bg-muted/20 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* Left — headline + body */}
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Sofortiges Feedback zu jeder Übungsklausur
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground md:text-lg">
              Repitor analysiert deine Klausur anhand deiner Lösungsskizze —
              Aufbau, Schwerpunktsetzung, Gutachtenstil, Subsumtion. Die meisten
              Punkte verlierst du nicht durch fehlendes Wissen, sondern durch
              Technik. Repitor zeigt dir genau, wo.
            </p>

            {/* Trust callout */}
            <div className="mt-6 border-l-4 border-l-primary pl-4 md:pl-5">
              <p className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
                <ShieldCheck className="size-4 text-primary/70" />
                Keine halluzinierten Rechtsmeinungen.
              </p>
              <p className="mt-1 max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
                Deine Lösungsskizze ist der alleinige Maßstab — kein eigenes
                Rechts-Training, keine erfundenen Normen.
              </p>
            </div>
          </div>

          {/* Right — feature list */}
          <div className="divide-y divide-border/60">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
