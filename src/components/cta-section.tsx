import { WaitlistForm } from "@/components/waitlist-form";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
            Sei von Anfang an dabei.
          </h2>
          <p className="mx-auto mt-4 max-w-[45ch] text-lg text-muted-foreground">
            Repitor startet bald. Trag dich auf die Warteliste ein und erfahre
            als Erstes, wenn es losgeht.
          </p>
          <WaitlistForm className="mt-8 justify-center" />
        </div>
      </div>
    </section>
  );
}
