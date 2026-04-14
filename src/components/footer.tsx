import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo size="sm" />
            <p className="mt-1 max-w-[40ch] text-sm text-muted-foreground">
              KI-gestützte Klausurkorrektur für Jurastudierende.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link
                href="/impressum"
                className="transition-colors duration-200 hover:text-foreground"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="transition-colors duration-200 hover:text-foreground"
              >
                Datenschutz
              </Link>
              <a
                href="mailto:kontakt@repitor.de"
                className="transition-colors duration-200 hover:text-foreground"
              >
                Kontakt
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Repitor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
