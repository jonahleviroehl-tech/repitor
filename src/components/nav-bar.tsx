"use client";

import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Repitor
          </span>
          <span className="inline-block size-2 rounded-full bg-primary" />
        </a>

        <a
          href="/korrektur"
          className={buttonVariants({
            size: "default",
            className: "font-semibold",
          })}
        >
          Klausur korrigieren
        </a>
      </div>
    </nav>
  );
}
