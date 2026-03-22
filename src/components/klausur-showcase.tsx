"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MarkerType = "strength" | "improvement";

type Annotation = {
  id: number;
  type: MarkerType;
  label: string;
  detail: string;
  recommendation?: string;
};

const ANNOTATIONS: Annotation[] = [
  {
    id: 1,
    type: "strength",
    label: "Sauberer Obersatz",
    detail:
      "Anspruchsgrundlage korrekt identifiziert. Alle relevanten Tatbestandsmerkmale im Obersatz genannt.",
  },
  {
    id: 2,
    type: "strength",
    label: "Schutzzweck erkannt",
    detail:
      "Ausführung zum Schutzzweck der Norm überzeugt. Subsumtion der Körperverletzung sauber durchgeführt.",
  },
  {
    id: 3,
    type: "improvement",
    label: "Adäquanz fehlt",
    detail:
      "Äquivalenztheorie richtig angewendet, aber die Adäquanzprüfung fehlt. Bei Verkehrsunfällen ist diese zu prüfen.",
    recommendation:
      "\"...Kausalität nach der Äquivalenztheorie liegt vor. Darüber hinaus müsste der Erfolg auch adäquat verursacht worden sein. Das Überfahren einer roten Ampel birgt die generelle Gefahr eines Zusammenstoßes, sodass Adäquanz zu bejahen ist.\"",
  },
  {
    id: 4,
    type: "improvement",
    label: "Verschulden vertiefen",
    detail:
      "Fahrlässigkeitsprüfung zu oberflächlich. Objektiver Sorgfaltsmaßstab muss konkret herausgearbeitet werden.",
    recommendation:
      "\"...Maßstab ist das Verhalten eines besonnenen und gewissenhaften Verkehrsteilnehmers in der konkreten Situation. Ein solcher hätte die Rotlichtanzeige beachtet und angehalten.\"",
  },
];

function InlineMarker({
  id,
  type,
  activeId,
  setActiveId,
}: {
  id: number;
  type: MarkerType;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
}) {
  const isActive = activeId === id;
  const isDimmed = activeId !== null && activeId !== id;

  return (
    <span
      className={cn(
        "ml-1 inline-flex size-5 cursor-pointer items-center justify-center rounded-full text-[11px] font-bold leading-none text-white align-top transition-all duration-200",
        type === "strength" ? "bg-emerald-500" : "bg-amber-500",
        isActive && [
          "scale-[1.35] z-10 relative",
          type === "strength"
            ? "ring-2 ring-offset-1 ring-emerald-400/60"
            : "ring-2 ring-offset-1 ring-amber-400/60",
        ],
        isDimmed && "opacity-40"
      )}
      onMouseEnter={() => setActiveId(id)}
      onMouseLeave={() => setActiveId(null)}
      onClick={() => setActiveId(activeId === id ? null : id)}
    >
      {id}
    </span>
  );
}

function HighlightSpan({
  id,
  type,
  activeId,
  children,
}: {
  id: number;
  type: MarkerType;
  activeId: number | null;
  children: React.ReactNode;
}) {
  const isActive = activeId === id;

  return (
    <span
      className={cn(
        "rounded-sm px-0.5 transition-colors duration-200",
        isActive &&
          (type === "strength"
            ? "bg-emerald-100/60 dark:bg-emerald-900/30"
            : "bg-amber-100/60 dark:bg-amber-900/30")
      )}
    >
      {children}
    </span>
  );
}

export function KlausurShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const annotationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMarkerActivate = (id: number | null) => {
    setActiveId(id);
    // On click (mobile), scroll to matching annotation
    if (id !== null && annotationRefs.current[id - 1]) {
      annotationRefs.current[id - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-border/30 bg-muted/10 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Klausurtechnik sichtbar gemacht
        </p>
        <h2 className="mb-10 max-w-[28ch] text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
          Jeder Absatz bekommt gezieltes Feedback
        </h2>

        <div className="grid items-start gap-6 md:grid-cols-[1.4fr_1fr] md:gap-8">
          {/* ── Paper ── */}
          <div
            className={cn(
              "relative rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 transition-all duration-700",
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5 md:px-7">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Klausur Nr.&thinsp;3 — Zivilrecht
                </p>
                <p className="text-xs text-muted-foreground">
                  BGB AT, Deliktsrecht
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-primary/15 px-3 py-1.5">
                <span className="text-[10px] font-medium text-muted-foreground">~</span>
                <span className="text-xl font-bold tabular-nums leading-none text-foreground">
                  11
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Pkt.
                  </span>
                  <span className="text-[10px] leading-none text-muted-foreground">
                    geschätzt
                  </span>
                </div>
              </div>
            </div>

            {/* Paper content */}
            <div className="relative px-5 py-5 md:px-7 md:py-6">
              {/* Subtle lined paper */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 27px, var(--border) 27px, var(--border) 28px)",
                  opacity: 0.18,
                }}
              />

              <div className="relative space-y-4 text-[13px] leading-7 text-foreground/85">
                {/* §1 — Obersatz */}
                <p>
                  <span className="font-semibold text-foreground/60">I.</span>{" "}
                  A könnte gegen B einen Anspruch auf Schadensersatz gemäß
                  §&thinsp;823 Abs.&thinsp;1 BGB haben. Dafür müsste B eine
                  Rechtsgutsverletzung des A{" "}
                  <HighlightSpan id={1} type="strength" activeId={activeId}>
                    widerrechtlich und schuldhaft
                    herbeigeführt haben.
                    <InlineMarker
                      id={1}
                      type="strength"
                      activeId={activeId}
                      setActiveId={setActiveId}
                    />
                  </HighlightSpan>
                </p>

                {/* §2 — Rechtsgutsverletzung */}
                <p>
                  <span className="font-semibold text-foreground/60">1.</span>{" "}
                  Fraglich ist zunächst, ob eine Rechtsgutsverletzung vorliegt.
                  Durch den Zusammenstoß erlitt A eine Fraktur des rechten
                  Unterarms. Eine Körperverletzung i.S.d. §&thinsp;823
                  Abs.&thinsp;1 BGB liegt vor, wenn die körperliche
                  Unversehrtheit nicht nur unerheblich beeinträchtigt wird. Eine
                  Fraktur stellt eine erhebliche Beeinträchtigung der
                  körperlichen Integrität dar.{" "}
                  <HighlightSpan id={2} type="strength" activeId={activeId}>
                    Mithin liegt eine Rechtsgutsverletzung in Form der
                    Körperverletzung vor.
                    <InlineMarker
                      id={2}
                      type="strength"
                      activeId={activeId}
                      setActiveId={setActiveId}
                    />
                  </HighlightSpan>
                </p>

                {/* §3 — Kausalität */}
                <p>
                  <span className="font-semibold text-foreground/60">2.</span>{" "}
                  B müsste die Rechtsgutsverletzung auch kausal verursacht
                  haben. Nach der Äquivalenztheorie ist jede Bedingung kausal,
                  die nicht hinweggedacht werden kann, ohne dass der Erfolg in
                  seiner konkreten Gestalt entfiele. Hätte B nicht die rote
                  Ampel überfahren, wäre es nicht zum Zusammenstoß gekommen.{" "}
                  <HighlightSpan id={3} type="improvement" activeId={activeId}>
                    Kausalität liegt vor.
                    <InlineMarker
                      id={3}
                      type="improvement"
                      activeId={activeId}
                      setActiveId={setActiveId}
                    />
                  </HighlightSpan>
                </p>

                {/* §4 — Verschulden (fades out) */}
                <p>
                  <span className="font-semibold text-foreground/60">3.</span>{" "}
                  Weiterhin müsste B schuldhaft gehandelt haben. Fahrlässig
                  handelt gemäß §&thinsp;276 Abs.&thinsp;2 BGB, wer die im
                  Verkehr erforderliche Sorgfalt außer Acht lässt. B hat eine
                  rote Ampel überfahren und dabei einen anderen
                  Verkehrsteilnehmer verletzt.{" "}
                  <HighlightSpan id={4} type="improvement" activeId={activeId}>
                    Dies stellt eine Verletzung der
                    <InlineMarker
                      id={4}
                      type="improvement"
                      activeId={activeId}
                      setActiveId={setActiveId}
                    />
                  </HighlightSpan>
                </p>

                <p className="text-foreground/50">
                  verkehrsrechtlichen Sorgfaltspflichten dar. Allerdings ist
                  fraglich, welcher Sorgfaltsmaßstab hier konkret anzulegen
                  ist...
                </p>
              </div>

              {/* Fade overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
            </div>

            {/* Bottom status */}
            <div className="flex items-center gap-2 border-t border-border/60 px-5 py-3 md:px-7">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">
                Korrektur wird geschrieben...
              </span>
            </div>
          </div>

          {/* ── Annotations ── */}
          <div className="flex flex-col gap-3 md:justify-between md:py-5 md:min-h-[380px]">
            {ANNOTATIONS.map((annotation, i) => {
              const isActive = activeId === annotation.id;
              const isDimmed =
                activeId !== null && activeId !== annotation.id;

              return (
                <div
                  key={annotation.id}
                  ref={(el) => {
                    annotationRefs.current[i] = el;
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl border-l-[3px] px-4 py-3.5 transition-all duration-200",
                    annotation.type === "strength"
                      ? "border-l-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/20"
                      : "border-l-amber-500 bg-amber-50/80 dark:bg-amber-950/20",
                    // Scroll-in animation
                    visible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-6 opacity-0",
                    // Active state
                    isActive && [
                      "-translate-x-1.5 shadow-md border-l-[4px]",
                      annotation.type === "strength"
                        ? "bg-emerald-100/80 dark:bg-emerald-950/35"
                        : "bg-amber-100/80 dark:bg-amber-950/35",
                    ],
                    // Dimmed state
                    isDimmed && "opacity-40",
                    // Hover (only when not dimmed)
                    !isDimmed &&
                      !isActive &&
                      "hover:-translate-x-0.5 hover:shadow-sm"
                  )}
                  style={{
                    transitionDelay: visible
                      ? `${400 + i * 150}ms`
                      : "0ms",
                  }}
                  onMouseEnter={() => setActiveId(annotation.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() =>
                    setActiveId(
                      activeId === annotation.id ? null : annotation.id
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-none text-white transition-all duration-200",
                        annotation.type === "strength"
                          ? "bg-emerald-500"
                          : "bg-amber-500",
                        isActive && "scale-110"
                      )}
                    >
                      {annotation.id}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {annotation.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {annotation.detail}
                  </p>
                  {annotation.recommendation && (
                    <div className="mt-2.5 rounded-lg border border-border/60 bg-card/80 px-3 py-2.5">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary/70">
                        Besser so:
                      </p>
                      <p className="text-[12px] italic leading-relaxed text-foreground/70">
                        {annotation.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
