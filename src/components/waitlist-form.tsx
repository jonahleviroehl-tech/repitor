"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaitlistForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: POST to backend / Mailchimp / etc.
    setSubmitted(true);
  }

  if (submitted) {
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
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}
    >
      <input
        type="email"
        required
        placeholder="deine@email.de"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 flex-1 rounded-xl border border-border bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 sm:max-w-xs"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-semibold tracking-tight text-primary-foreground transition-all duration-200 hover:bg-primary/85 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
      >
        Auf die Warteliste
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
