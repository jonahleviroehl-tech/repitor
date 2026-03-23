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
      className={cn(className)}
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
    >
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-start" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", flex: "1 1 auto", minWidth: "200px", maxWidth: "320px" }}>
          <input
            type="email"
            required
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "error") setState("idle");
            }}
            style={{
              height: "3rem",
              width: "100%",
              borderRadius: "0.75rem",
              border: state === "error" ? "1.5px solid #dc2626" : "1.5px solid oklch(0.91 0.02 80)",
              backgroundColor: "oklch(0.995 0.003 80)",
              padding: "0 1rem",
              fontSize: "1rem",
              color: "oklch(0.20 0.02 75)",
              outline: "none",
            }}
          />
          {state === "error" && (
            <p style={{ fontSize: "0.875rem", color: "#dc2626" }}>{errorMsg}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={state === "loading"}
          style={{
            display: "inline-flex",
            height: "3rem",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            borderRadius: "0.75rem",
            backgroundColor: "oklch(0.75 0.18 75)",
            padding: "0 1.5rem",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "oklch(0.16 0.02 75)",
            border: "none",
            cursor: state === "loading" ? "not-allowed" : "pointer",
            opacity: state === "loading" ? 0.7 : 1,
            transition: "all 0.2s",
          }}
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
      </div>
    </form>
  );
}
