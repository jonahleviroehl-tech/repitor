export function Footer() {
  return (
    <footer className="border-t border-border py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Repitor
              </span>
              <span className="inline-block size-2 rounded-full bg-primary" />
            </div>
            <p className="mt-1 max-w-[40ch] text-sm text-muted-foreground">
              KI-gestützte Klausurkorrektur für Jurastudierende.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a
                href="#"
                className="transition-colors duration-200 hover:text-foreground"
              >
                Impressum
              </a>
              <a
                href="#"
                className="transition-colors duration-200 hover:text-foreground"
              >
                Datenschutz
              </a>
              <a
                href="#"
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
