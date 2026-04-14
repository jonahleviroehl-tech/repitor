import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — Repitor",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 DDG.",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-24">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Zurück zu repitor.de
      </Link>

      <article className="prose prose-sm dark:prose-invert mt-8 prose-headings:tracking-tight prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-foreground/85 prose-strong:text-foreground">
        <h1>Impressum</h1>

        <p className="text-muted-foreground">
          Angaben gemäß § 5 DDG
        </p>

        <h2>Anbieter</h2>
        <p>
          <strong>Jonah Röhl</strong>
          <br />
          Eppendorferstieg 5
          <br />
          22299 Hamburg
          <br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: kontakt@repitor.de
        </p>

        <h2>Umsatzsteuer</h2>
        <p>
          Kleinunternehmer gemäß § 19 UStG — es wird keine Umsatzsteuer
          ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer nach § 27 a UStG
          liegt derzeit nicht vor.
        </p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Jonah Röhl
          <br />
          Anschrift wie oben
        </p>

        <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </article>
    </main>
  );
}
