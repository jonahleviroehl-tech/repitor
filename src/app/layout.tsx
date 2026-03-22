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
  title: "Repitor — KI-Klausurkorrektur für Jurastudierende",
  description:
    "Jura-Klausur korrigieren lassen — detailliertes Feedback zu Gutachtenstil, Aufbau und Schwerpunktsetzung in Minuten. Erste Korrektur kostenlos.",
  keywords: [
    "Jura Klausur Korrektur",
    "Klausur korrigieren lassen Jura",
    "KI Klausurkorrektur Jura",
    "Jura Klausur üben",
    "Gutachtenstil Feedback",
    "Jura Examensklausur Übung",
    "Jura Klausur Tipps Aufbau",
    "Klausurfeedback",
  ],
  openGraph: {
    title: "Repitor — KI-Klausurkorrektur für Jurastudierende",
    description:
      "Jura-Klausur korrigieren lassen — detailliertes Feedback zu Gutachtenstil und Aufbau in Minuten. Erste Korrektur kostenlos.",
    url: "https://repitor.de",
    siteName: "Repitor",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Repitor — KI-Klausurkorrektur für Jurastudierende",
    description:
      "Jura-Klausur korrigieren lassen — detailliertes Feedback zu Gutachtenstil und Aufbau in Minuten. Erste Korrektur kostenlos.",
  },
  alternates: {
    canonical: "https://repitor.de",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
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
    "KI-gestützte Klausurkorrektur für Jurastudierende in Deutschland",
};

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
