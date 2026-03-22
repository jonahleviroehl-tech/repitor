"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { GradeBadge } from "@/components/grade-badge";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import type { CorrectionMeta, EvaluationSchema } from "@/lib/prompts";

type KorrekturResultProps = {
  formData: FormData;
  onReset: () => void;
};

type ResultStatus = "loading" | "streaming" | "done" | "error";

export function KorrekturResult({ formData, onReset }: KorrekturResultProps) {
  const [status, setStatus] = useState<ResultStatus>("loading");
  const [, setSchema] = useState<EvaluationSchema | null>(null);
  const [meta, setMeta] = useState<CorrectionMeta | null>(null);
  const [, setRawText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const metaParsed = useRef(false);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const threshold = 100;
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    userScrolledUp.current = !isNearBottom;
  }, []);

  useEffect(() => {
    if (!userScrolledUp.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayText]);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    async function startStream() {
      try {
        const response = await fetch("/api/korrektur", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(
            data?.error ?? "Ein Fehler ist aufgetreten. Bitte versuche es erneut."
          );
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("Keine Antwort vom Server.");

        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

        setStatus("streaming");

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";

          for (const event of events) {
            const lines = event.split("\n");
            let eventType = "";
            let eventData = "";

            for (const line of lines) {
              if (line.startsWith("event: ")) {
                eventType = line.slice(7);
              } else if (line.startsWith("data: ")) {
                eventData = line.slice(6);
              }
            }

            if (eventType === "schema") {
              try {
                setSchema(JSON.parse(eventData));
              } catch {}
              continue;
            }

            if (eventType === "error") {
              try {
                setError(JSON.parse(eventData));
              } catch {
                setError(eventData);
              }
              setStatus("error");
              return;
            }

            if (eventType === "done") {
              setStatus("done");
              return;
            }

            if (eventData) {
              try {
                const text = JSON.parse(eventData) as string;
                accumulated += text;
                setRawText(accumulated);

                if (!metaParsed.current) {
                  const metaMatch = accumulated.match(
                    /<!-- META -->\s*(\{[\s\S]*?\})\s*<!-- \/META -->/
                  );
                  if (metaMatch) {
                    try {
                      const parsed = JSON.parse(metaMatch[1]) as CorrectionMeta;
                      setMeta(parsed);
                      metaParsed.current = true;
                    } catch {}
                  }
                }

                const metaEnd = accumulated.indexOf("<!-- /META -->");
                if (metaEnd !== -1) {
                  setDisplayText(
                    accumulated.slice(metaEnd + "<!-- /META -->".length).trim()
                  );
                } else if (!accumulated.includes("<!-- META")) {
                  setDisplayText(accumulated);
                }
              } catch {}
            }
          }
        }

        setStatus("done");
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error
            ? err.message
            : "Ein unerwarteter Fehler ist aufgetreten."
        );
        setStatus("error");
      }
    }

    startStream();

    return () => {
      controller.abort();
    };
  }, [formData]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <div className="flex items-center gap-3">
          <Loader2 className="size-5 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">
            Lösungsskizze wird analysiert...
          </p>
        </div>
        <div className="w-full max-w-md space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="rounded-lg bg-destructive/10 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="size-3.5" data-icon="inline-start" />
          Erneut versuchen
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {meta && (
        <div className="space-y-3 animate-in fade-in duration-500">
          <GradeBadge note={meta.note} />

          {meta.zusammenfassung && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {meta.zusammenfassung}
            </p>
          )}

          {meta.staerken.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs font-medium text-muted-foreground mr-1">
                Stärken:
              </span>
              {meta.staerken.map((s) => (
                <Badge key={s} variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {meta.schwaechen.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs font-medium text-muted-foreground mr-1">
                Verbesserungspotenzial:
              </span>
              {meta.schwaechen.map((s) => (
                <Badge key={s} variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  {s}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {displayText && (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="max-h-[60vh] overflow-y-auto pr-2"
        >
          <MarkdownRenderer content={displayText} />
        </div>
      )}

      {status === "streaming" && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-primary" />
          Korrektur wird geschrieben...
        </div>
      )}

      {status === "done" && (
        <div className="flex items-center gap-3 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Korrektur abgeschlossen
          </p>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="size-3.5" data-icon="inline-start" />
            Neue Korrektur
          </Button>
        </div>
      )}
    </div>
  );
}
