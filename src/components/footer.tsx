import Link from "next/link";
import { Logo } from "@/components/logo";
import { getPublishedRechtsgebiete } from "@/lib/rechtsgebiete";

export function Footer() {
  const publishedGebiete = getPublishedRechtsgebiete();

  return (
    <footer className="border-t border-border py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="sm" />
            <p className="mt-2 max-w-[40ch] text-sm text-muted-foreground">
              KI-gestützte Klausurkorrektur für Jurastudierende.
            </p>
          </div>

          {/* Klausuren-Kategorien (SEO: interner Link-Pool zu Hubs) */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Klausuren
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/klausuren"
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  Alle Klausuren
                </Link>
              </li>
              {publishedGebiete.map((rg) => (
                <li key={rg.slug}>
                  <Link
                    href={`/klausuren/${rg.slug}`}
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    {rg.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Rechtliches
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/impressum"
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Repitor
        </div>
      </div>
    </footer>
  );
}
