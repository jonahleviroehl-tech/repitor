import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Repitor Blog",
    default: "Blog — Repitor",
  },
  description:
    "Tipps und Ratgeber rund um Jura-Klausuren, Gutachtenstil, Klausurtechnik und Examensvorbereitung.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="flex-1 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">{children}</div>
      </main>
      <Footer />
    </>
  );
}
