import { CheckCircle2 } from "lucide-react";

const TRUST_ITEMS = [
  "Alle Rechtsgebiete",
  "Keine Datenspeicherung",
  "Sofort einsatzbereit",
];

export function TrustSection() {
  return (
    <section className="border-y border-border/50 bg-muted/20 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-base font-medium text-muted-foreground md:text-lg">
          Für alle Rechtsgebiete. Zivilrecht, Strafrecht, Öffentliches Recht und mehr.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="size-4 text-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
