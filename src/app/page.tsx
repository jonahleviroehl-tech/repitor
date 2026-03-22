import { NavBar } from "@/components/nav-bar";
import { Hero } from "@/components/hero";
import { KlausurShowcase } from "@/components/klausur-showcase";
import { ProblemSection } from "@/components/problem-section";
import { SolutionSection } from "@/components/solution-section";
import { StepsSection } from "@/components/steps-section";
import { StatsStrip } from "@/components/stats-strip";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <KlausurShowcase />
        <ProblemSection />
        <SolutionSection />
        <StepsSection />
        <StatsStrip />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
