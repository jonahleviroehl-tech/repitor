const FAQS = [
  {
    question: "Wie genau ist die KI-Korrektur?",
    answer:
      "Repitor generiert keine eigenen Rechtsmeinungen — es vergleicht deine Bearbeitung Punkt für Punkt mit deiner Lösungsskizze. Das ist eine bewusste Designentscheidung: Deine Lösungsskizze ist die einzige Quelle der Wahrheit. Keine halluzinierten Normen, keine erfundenen Meinungsstreite. Das Feedback bezieht sich auf Aufbau, Gutachtenstil, Schwerpunktsetzung und Subsumtion.",
  },
  {
    question: "Funktioniert das für jedes Rechtsgebiet?",
    answer:
      "Ja. Da du selbst die Lösungsskizze mitlieferst, funktioniert Repitor für jedes Rechtsgebiet und jede Klausurart — Zivilrecht, Strafrecht, Öffentliches Recht und mehr.",
  },
  {
    question: "Was passiert mit meinen hochgeladenen Dateien?",
    answer:
      "Deine Dateien werden ausschließlich für die Korrektur verarbeitet und nicht gespeichert. Nach Abschluss der Korrektur werden alle Daten gelöscht. Wir speichern keine Klausuren, Lösungsskizzen oder Bearbeitungen.",
  },
  {
    question: "Wie lange dauert eine Korrektur?",
    answer:
      "Die Korrektur startet sofort und wird in Echtzeit gestreamt. In der Regel dauert es 3–5 Minuten, bis die vollständige Korrektur vorliegt — abhängig von der Länge deiner Bearbeitung.",
  },
  {
    question: "Was kostet Repitor?",
    answer:
      "Erste Korrektur kostenlos — ohne Anmeldung, ohne Kreditkarte. Danach 4,90\u202F\u20AC pro Korrektur. Zum Vergleich: klassische Korrekturdienste kosten 25–35\u202F\u20AC und du wartest Wochen auf dein Ergebnis.",
  },
  {
    question: "Ersetzt Repitor die Uni-Korrektur?",
    answer:
      "Nein. Repitor ist dein Trainingspartner, nicht dein Prüfer. Je kürzer die Feedback-Schleife, desto schneller wirst du besser. Repitor hilft dir, gezielt an Aufbau, Technik und Schwerpunkten zu arbeiten — zwischen den offiziellen Klausuren.",
  },
];

export function FaqSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
          Häufige Fragen
        </h2>

        <div className="mt-8 max-w-3xl divide-y divide-border">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium text-foreground md:text-lg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="ml-6 shrink-0 text-lg text-muted-foreground transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
