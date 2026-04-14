import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Repitor",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten bei der Nutzung von repitor.de gemäß DSGVO.",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-24">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Zurück zu repitor.de
      </Link>

      <article className="prose prose-sm dark:prose-invert mt-8 prose-headings:tracking-tight prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-p:leading-relaxed prose-p:text-foreground/85 prose-strong:text-foreground prose-li:text-foreground/85">
        <h1>Datenschutzerklärung</h1>

        <p>
          Der Schutz deiner personenbezogenen Daten ist uns wichtig. Diese
          Datenschutzerklärung informiert dich darüber, welche Daten bei der
          Nutzung von <strong>repitor.de</strong> (&bdquo;Repitor&ldquo;)
          erhoben werden, wie wir damit umgehen und welche Rechte dir
          zustehen.
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich im Sinne der DSGVO ist:
          <br />
          Jonah Röhl, Eppendorferstieg 5, 22299 Hamburg, E-Mail:
          kontakt@repitor.de
        </p>

        <h2>2. Welche Daten werden verarbeitet?</h2>

        <h3>a) Zugriffsdaten (Server-Logs)</h3>
        <p>
          Beim Aufruf unserer Website verarbeiten wir technisch notwendige
          Zugriffsdaten (IP-Adresse, Zeitpunkt, aufgerufene Seite,
          Browser-Typ) zur Bereitstellung des Dienstes und zum Schutz vor
          Missbrauch. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an einem sicheren, funktionsfähigen
          Dienst).
        </p>

        <h3>b) Klausurlösung (Text oder Datei-Upload)</h3>
        <p>
          Um dir ein Korrekturfeedback zu liefern, übermittelst du deine
          Klausurlösung an uns. Diese wird an unseren KI-Dienstleister
          (Anthropic, siehe unten) weitergeleitet, um das Feedback zu
          erstellen. Die Lösung wird{" "}
          <strong>nicht dauerhaft auf unseren Servern gespeichert</strong>,
          sondern ausschließlich für die Dauer der Korrektur verarbeitet.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
        </p>

        <h3>c) Zahlungsdaten</h3>
        <p>
          Für die Abwicklung der Zahlung nutzen wir Stripe (siehe unten).
          Repitor selbst erhält keine Kreditkarten- oder Kontodaten, sondern
          nur eine Bestätigung über eine erfolgte Zahlung (Session-ID).
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
        </p>

        <h3>d) Warteliste (optional)</h3>
        <p>
          Wenn du dich in die Warteliste einträgst, speichern wir deine
          E-Mail-Adresse in einer Notion-Datenbank, bis du dich austrägst.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
        </p>

        <h2>3. Eingesetzte Dienstleister (Auftragsverarbeiter)</h2>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> (USA) — Hosting der Website.
            Datenübermittlung auf Grundlage der EU-Standardvertragsklauseln.
          </li>
          <li>
            <strong>Anthropic, PBC</strong> (USA) — Verarbeitung der
            Klausurlösung zur Erstellung des Feedbacks (Claude API).
            Anthropic speichert API-Inhalte gemäß eigenen Angaben nicht zum
            Training. Datenübermittlung auf Grundlage der
            EU-Standardvertragsklauseln.
          </li>
          <li>
            <strong>Stripe Payments Europe Ltd.</strong> (Irland) —
            Abwicklung der Zahlung. Stripe verarbeitet
            Kreditkarten-/Zahlungsdaten eigenverantwortlich nach eigenen
            Datenschutzbestimmungen (stripe.com/privacy).
          </li>
          <li>
            <strong>Upstash Inc.</strong> (USA / EU-Region) — Rate-Limiting
            und temporäre Speicherung der Zahlungs-Session (max. 24 h).
          </li>
          <li>
            <strong>Notion Labs, Inc.</strong> (USA) — Speicherung der
            Warteliste. Nur aktiv, wenn du dich auf die Warteliste
            einträgst.
          </li>
        </ul>

        <h2>4. Cookies und Web-Analyse</h2>
        <p>
          Wir verwenden Vercel Web Analytics zur anonymen Messung der
          Nutzung (cookieless, keine personenbezogene Auswertung). Für den
          Zahlungsvorgang können Cookies von Stripe gesetzt werden, die zur
          Betrugsprävention technisch erforderlich sind.
        </p>

        <h2>5. Speicherdauer</h2>
        <ul>
          <li>
            Klausurlösungen: nicht dauerhaft gespeichert (nur für die Dauer
            der Korrektur).
          </li>
          <li>
            Zahlungs-Session-IDs: maximal 24 Stunden (nur zur Freischaltung
            der bezahlten Korrektur).
          </li>
          <li>Zugriffs-Logs: bis zu 30 Tage.</li>
          <li>Warteliste: bis zum Widerruf deiner Einwilligung.</li>
        </ul>

        <h2>6. Deine Rechte</h2>
        <p>
          Dir stehen folgende Rechte zu: Auskunft (Art. 15 DSGVO),
          Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art.
          18), Widerspruch (Art. 21), Datenübertragbarkeit (Art. 20). Zur
          Ausübung wende dich an die im Impressum genannte Adresse.
        </p>
        <p>
          Du hast außerdem ein Beschwerderecht bei der zuständigen
          Datenschutzaufsichtsbehörde.
        </p>

        <h2>7. Widerruf der Einwilligung</h2>
        <p>
          Eine erteilte Einwilligung (z.&nbsp;B. Warteliste) kannst du
          jederzeit mit Wirkung für die Zukunft widerrufen. Die
          Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt
          davon unberührt.
        </p>

        <p className="text-xs text-muted-foreground mt-12">
          Stand:{" "}
          {new Date().toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
          })}
        </p>
      </article>
    </main>
  );
}
