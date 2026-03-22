const FAQS = [
  {
    question: "Wie funktioniert die KI-Korrektur?",
    answer:
      "Repitor generiert keine eigenen Rechtsmeinungen — es vergleicht deine Bearbeitung Punkt für Punkt mit deiner Lösungsskizze. Deine Lösungsskizze ist die einzige Quelle der Wahrheit. Keine halluzinierten Normen, keine erfundenen Meinungsstreite. Das Feedback bezieht sich auf Aufbau, Gutachtenstil, Schwerpunktsetzung und Subsumtion.",
  },
  {
    question: "Für welche Rechtsgebiete funktioniert Repitor?",
    answer:
      "Für alle. Da du selbst die Lösungsskizze mitlieferst, funktioniert Repitor für jede Probeklausur und jedes Rechtsgebiet — Zivilrecht, Strafrecht, Öffentliches Recht, BGB AT, Schuldrecht, Sachenrecht, Verwaltungsrecht, Staatsrecht und mehr. Ob Übungsklausur im Strafrecht oder Examensklausur im Öffentlichen Recht — du lieferst den Maßstab.",
  },
  {
    question: "Kann ich jede Probeklausur korrigieren lassen?",
    answer:
      "Ja. Solange du den Sachverhalt und eine Lösungsskizze hast, kannst du jede Probeklausur oder Übungsklausur mit Lösung korrigieren lassen — unabhängig von Rechtsgebiet, Schwierigkeitsgrad oder Uni. Repitor braucht kein eigenes Training pro Klausurtyp.",
  },
  {
    question: "Ersetzt Repitor einen Klausurenkurs?",
    answer:
      "Nein. Repitor ist dein Trainingspartner zwischen den Klausurenkursen, nicht deren Ersatz. Je kürzer die Feedback-Schleife, desto schneller wirst du besser. Repitor hilft dir, gezielt an Aufbau, Technik und Schwerpunkten zu arbeiten — ergänzend zu Hemmer, Alpmann oder dem Uni-Klausurenkurs.",
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
      "Deine erste Korrektur ist kostenlos — ohne Anmeldung, ohne Kreditkarte. Zur genauen Preisgestaltung informieren wir dich zum Launch.",
  },
  {
    question: "Wann startet Repitor?",
    answer:
      "Bald! Trag dich auf die Warteliste ein und wir benachrichtigen dich, sobald Repitor verfügbar ist. Du kannst dann als Erstes deine Probeklausur korrigieren lassen.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
