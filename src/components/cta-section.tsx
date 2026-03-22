import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
          Deine erste Korrektur. Kostenlos.
        </h2>
        <p className="mx-auto mt-4 max-w-[45ch] text-lg text-muted-foreground">
          Keine Anmeldung, keine Kreditkarte. In wenigen Minuten weißt du, wo du stehst.
        </p>
        <div className="mt-8">
          <a
            href="/korrektur"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold tracking-tight text-primary-foreground transition-all duration-200 hover:bg-primary/85 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
          >
            Jetzt kostenlos testen
            <ArrowRight className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
