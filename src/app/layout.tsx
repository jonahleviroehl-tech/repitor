import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Repitor — Probeklausur schreiben, Feedback in Minuten | Jura Klausur Korrektur",
  description:
    "Probeklausur oder Übungsklausur mit Lösung geschrieben? Repitor gibt dir sofortiges Feedback zu Gutachtenstil, Aufbau und Schwerpunktsetzung — für alle Rechtsgebiete. Bald verfügbar — jetzt auf die Warteliste!",
  keywords: [
    "Probeklausur Strafrecht",
    "Probeklausur BGB",
    "Probeklausur Öffentliches Recht",
    "Übungsklausur mit Lösung",
    "Jura Klausur Korrektur",
    "Klausur korrigieren lassen Jura",
    "KI Klausurkorrektur Jura",
    "Jura Klausur üben",
    "Gutachtenstil Feedback",
    "Jura Examensklausur Übung",
    "Klausurfeedback",
  ],
  openGraph: {
    title: "Repitor — Probeklausur schreiben, Feedback in Minuten",
    description:
      "Probeklausur geschrieben? Sofortiges Feedback zu Gutachtenstil, Aufbau und Schwerpunktsetzung — für alle Rechtsgebiete. Jetzt auf die Warteliste!",
    url: "https://repitor.de",
    siteName: "Repitor",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Repitor — Probeklausur schreiben, Feedback in Minuten",
    description:
      "Probeklausur geschrieben? Sofortiges Feedback zu Gutachtenstil, Aufbau und Schwerpunktsetzung — für alle Rechtsgebiete. Jetzt auf die Warteliste!",
  },
  alternates: {
    canonical: "https://repitor.de",
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Repitor",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Erste Korrektur kostenlos",
    },
    description:
      "KI-gestützte Klausurkorrektur für Jurastudierende in Deutschland — Feedback zu Probeklausuren in Minuten",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Repitor",
    url: "https://repitor.de",
    description:
      "KI-gestützte Klausurkorrektur für Jurastudierende in Deutschland",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}