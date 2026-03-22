import { NavBar } from "@/components/nav-bar";
import { KorrekturForm } from "@/components/korrektur-form";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Klausur korrigieren — Repitor",
  description:
    "Jura-Klausur korrigieren lassen — lade Sachverhalt, Lösungsskizze und deine Bearbeitung hoch. Detailliertes Feedback in Minuten.",
};

export default function KorrekturPage() {
  return (
    <>
      <NavBar />
      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Klausur korrigieren lassen
            </h1>
            <p className="mt-3 max-w-[55ch] text-base text-muted-foreground md:text-lg">
              Lade deine Unterlagen hoch und erhalte in wenigen Minuten eine
              detaillierte Korrektur.
            </p>
          </div>
          <KorrekturForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
