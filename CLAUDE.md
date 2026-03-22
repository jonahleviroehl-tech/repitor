@AGENTS.md

# Repitor

## Was ist Repitor?
KI-gestützte Klausurkorrektur-Plattform für Jurastudierende in Deutschland. User laden eine Klausur + Lösungsskizze hoch, schreiben ihre Lösung (oder laden sie hoch), und Claude gibt strukturiertes Feedback basierend auf der Lösungsskizze.

## Domains
- **Hauptdomain:** repitor.de
- **SEO-Redirect:** klausurfeedback.de → repitor.de
- **Registrar:** IONOS

## Kernidee / Differenzierung
- Der User liefert die Lösungsskizze selbst mit — kein eigenes Domain-Training nötig
- Dadurch sofort für jedes Rechtsgebiet und jede Klausur einsetzbar
- Schnell (Minuten statt Wochen), günstig (4.90€ statt 25-35€), detailliert

## Tech Stack
- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **AI:** Anthropic Claude API (`@anthropic-ai/sdk`)
- **PDF Parsing:** `pdf-parse`
- **Fonts:** Geist Sans + Geist Mono (bereits konfiguriert)

## Projekt-Status
Frisches Scaffold. Alle Dateien in `src/components/` und `src/lib/` sind nur Platzhalter-Kommentare.
`page.tsx` ist noch das Next.js Default Template. Alles muss noch gebaut werden.

### Existierende Dateistruktur
```
src/app/page.tsx              — Default Next.js template (ersetzen)
src/app/layout.tsx            — Root Layout (Geist Fonts, basic setup)
src/app/globals.css           — Tailwind + shadcn theme vars (fertig)
src/app/api/korrektur/route.ts — API Route Platzhalter
src/components/ui/button.tsx   — shadcn Button (fertig)
src/components/upload-zone.tsx — Platzhalter
src/components/korrektur-form.tsx — Platzhalter
src/components/korrektur-result.tsx — Platzhalter
src/lib/utils.ts              — cn() helper (fertig)
src/lib/prompts.ts            — Platzhalter
src/lib/claude.ts             — Platzhalter
```

## Commands
- `npm run dev` — Dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint

## Design-Richtung
- Deutsch-sprachige UI
- Seriös aber modern — Zielgruppe sind Jurastudierende, die Qualität erwarten
- Clean, minimalistisch, vertrauenswürdig
- Dark mode support (shadcn theme vars sind schon gesetzt)
- Mobile-first responsive

## Seiten / Features (MVP)
1. **Landing Page** — Wertversprechen, Erklärung wie es funktioniert, CTA
2. **Korrektur-Seite** — Upload (Klausur + Lösungsskizze), Klausurlösung eingeben/hochladen, Korrektur starten
3. **Ergebnis-Seite** — Streaming-Anzeige des Claude-Feedbacks

## Business Context
- Zielgruppe: ~117.000 Jurastudierende in Deutschland
- Preisziel: 4,90€ pro Korrektur, erste Korrektur gratis
- Hauptkonkurrent: KlausurenKIste (Köln) — hat Zeitvorsprung aber schwächere UX
- MVP: Kein Auth, kein Payment, keine Datenbank — alles kommt später

## Wichtige Regeln
- Deutsche UI-Texte (Zielgruppe sind deutsche Jurastudierende)
- Streaming via SSE für die Korrektur-Anzeige
- .env.local enthält ANTHROPIC_API_KEY (nie committen)
- Qualität vor Features — lieber weniger aber gut

## Design Context

### Users
German law students (~117k) preparing for exams. They are used to mediocre institutional tools and pay 25-35€ for manual corrections that take weeks. Context: stressed, time-pressured, quality-sensitive. They need to trust the tool immediately.

### Brand Personality
Confident, precise, approachable. Not corporate-stiff, not startup-playful. Think: "the smart friend who's really good at law."

### Aesthetic Direction
- **Visual tone:** Bold, modern SaaS (Linear/Vercel tier). Large typography, tight spacing, confident hierarchy.
- **Color:** Warm amber (OKLCH) on warm off-whites. No purple/AI aesthetic. No pure black or white.
- **Typography:** Geist Sans for body, Geist Mono for data/numbers. Headlines at tracking-tighter, oversized (5xl-7xl).
- **Anti-references:** Generic template sites, outdated academic tools, anything with small text and vast whitespace.
- **Theme:** Light mode primary, dark mode supported via shadcn vars.

### Design Principles
1. **Bold over safe** — Oversized typography, prominent CTAs, strong visual hierarchy. If it feels "too big," it's probably right.
2. **Tight over airy** — Reduce padding, fill space with content weight. Whitespace should be intentional, not leftover.
3. **Trust through craft** — Polished details (transitions, hover states, consistent spacing) build credibility faster than logos or badges.
4. **Conversion-first** — Every section should either build trust or drive toward the CTA. No decorative-only elements.
5. **Asymmetric over centered** — Offset layouts, unequal grid columns, left-aligned content. Avoid the "default template" look.
