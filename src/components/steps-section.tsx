import { FileUp, PenLine, Sparkles, FileText, File } from "lucide-react";

const STEPS = [
  {
    number: 1,
    icon: FileUp,
    title: "Unterlagen hochladen",
    description:
      "Lade den Klausursachverhalt und die Lösungsskizze hoch.",
  },
  {
    number: 2,
    icon: PenLine,
    title: "Lösung eingeben",
    description:
      "Gib deine Klausurlösung als Datei oder direkt als Text ein.",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Korrektur erhalten",
    description:
      "Erhalte eine detaillierte Korrektur mit Stärken und konkreten Verbesserungsvorschlägen.",
  },
];

/* ── Step 1 mock: file stack ── */
function UploadMock() {
  return (
    <div className="space-y-1.5">
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2">
          <FileText className="size-4 text-red-500/80" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">Sachverhalt_ZR3.pdf</p>
            <p className="text-[10px] text-muted-foreground">248 KB</p>
          </div>
          <span className="size-1.5 rounded-full bg-emerald-500" />
        </div>
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2">
          <File className="size-4 text-blue-500/80" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">Lösungsskizze_ZR3.docx</p>
            <p className="text-[10px] text-muted-foreground">156 KB</p>
          </div>
          <span className="size-1.5 rounded-full bg-emerald-500" />
        </div>
    </div>
  );
}

/* ── Step 2 mock: text editor ── */
function EditorMock() {
  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <div className="size-2.5 rounded-full bg-border" />
        <div className="size-2.5 rounded-full bg-border" />
        <div className="size-2.5 rounded-full bg-border" />
        <span className="ml-2 text-[10px] text-muted-foreground">Deine Lösung</span>
      </div>
      {/* Editor content */}
      <div className="px-4 py-3 text-[11px] leading-5 text-foreground/70">
        <p>
          <span className="font-semibold text-foreground/50">I.</span>{" "}
          A könnte gegen B einen Anspruch auf Schadensersatz gem.
          §&thinsp;823 I BGB haben.
        </p>
        <p className="mt-2">
          <span className="font-semibold text-foreground/50">1.</span>{" "}
          Fraglich ist, ob eine Rechtsguts&shy;verletzung vorliegt. Durch den
          Zusammenstoß erlitt A eine Fraktur...
        </p>
        <p className="mt-2 text-foreground/40">
          <span className="font-semibold text-foreground/30">2.</span>{" "}
          B müsste die Rechts&shy;guts&shy;verletzung auch kausal
          verursacht haben...
        </p>
        {/* Cursor blink */}
        <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-primary" />
      </div>
    </div>
  );
}

/* ── Step 3 mock: correction result ── */
function ResultMock() {
  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-xs font-semibold text-foreground">Korrektur</span>
        <div className="flex items-center gap-1.5 rounded-md bg-primary/15 px-2 py-1">
          <span className="text-[10px] text-muted-foreground">~</span>
          <span className="font-mono text-sm font-bold tabular-nums leading-none text-foreground">11</span>
          <span className="text-[10px] text-muted-foreground">Pkt.</span>
        </div>
      </div>
      {/* Feedback items */}
      <div className="space-y-2 px-4 py-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white">1</span>
          <div>
            <p className="text-[11px] font-semibold text-foreground">Sauberer Obersatz</p>
            <p className="text-[10px] leading-relaxed text-muted-foreground">Anspruchsgrundlage korrekt identifiziert.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-white">3</span>
          <div>
            <p className="text-[11px] font-semibold text-foreground">Adäquanz fehlt</p>
            <p className="text-[10px] leading-relaxed text-muted-foreground">Adäquanzprüfung bei Verkehrsunfällen nötig.</p>
          </div>
        </div>
        <div className="rounded-md border border-border/60 bg-muted/20 px-2.5 py-2">
          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary/70">Besser so:</p>
          <p className="text-[10px] italic leading-relaxed text-foreground/60">
            &quot;...Darüber hinaus müsste der Erfolg auch adäquat verursacht worden sein.&quot;
          </p>
        </div>
      </div>
      {/* Status */}
      <div className="flex items-center gap-1.5 border-t border-border/60 px-4 py-2">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
        <span className="text-[10px] text-muted-foreground">Korrektur wird geschrieben...</span>
      </div>
    </div>
  );
}

const STEP_MOCKS = [UploadMock, EditorMock, ResultMock];

export function StepsSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
          So funktioniert&apos;s
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          {/* Left — timeline */}
          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative flex gap-6 md:gap-8">
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-lg font-bold text-primary-foreground">
                    {step.number}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div className="w-px grow bg-border" />
                  )}
                </div>

                {/* Content */}
                <div className={i < STEPS.length - 1 ? "pb-8 md:pb-10" : "pb-0"}>
                  <div className="flex items-center gap-2.5">
                    <step.icon className="size-5 text-primary/70" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 max-w-[45ch] text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Inline mock — mobile only */}
                  <div className="mt-4 md:hidden">
                    {(() => {
                      const Mock = STEP_MOCKS[i];
                      return <Mock />;
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — stacked mocks (desktop only) */}
          <div className="hidden space-y-6 md:block" aria-hidden="true">
            {STEP_MOCKS.map((Mock, i) => (
              <Mock key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
