const STATS = [
  { value: "~5 Min", label: "bis zur fertigen Korrektur" },
  { value: "Kostenlos", label: "die erste Korrektur" },
  { value: "Erste gratis", label: "ohne Anmeldung, ohne Kreditkarte" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-border bg-muted/30 py-10 md:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 md:gap-0">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center ${i < STATS.length - 1 ? "md:border-r md:border-border/50" : ""}`}
          >
            <p className="font-mono text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              {stat.value}
            </p>
            <p className="mt-1 text-base text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
