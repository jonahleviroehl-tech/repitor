"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaitlistForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || state === "loading") return;

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Eintragung fehlgeschlagen.");
      }

      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Eintragung fehlgeschlagen. Bitte versuche es erneut."
      );
    }
  }

  if (state === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-800/40 dark:bg-emerald-950/30",
          className
        )}
      >
        <CheckCircle2 className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <p className="text-base font-medium text-emerald-900 dark:text-emerald-300">
          Du bist auf der Warteliste! Wir melden uns zum Launch.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-start", className)}
    >
      <div className="flex flex-1 flex-col gap-1.5">
        <input
          type="email"
          required
          placeholder="deine@email.de"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          className={cn(
            "h-12 w-full rounded-xl border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-80",
            state === "error" ? "border-destructive" : "border-border"
          )}
        />
        {state === "error" && (
          <p className="text-sm text-destructive">{errorMsg}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold tracking-tight text-primary-foreground transition-all duration-200 hover:bg-primary/85 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:opacity-70 disabled:pointer-events-none"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Wird eingetragen...
          </>
        ) : (
          <>
            Auf die Warteliste
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}
