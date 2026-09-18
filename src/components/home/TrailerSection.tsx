import { TrailerFrame } from "@/components/about/TrailerFrame";
import { Reveal } from "@/components/system/Reveal";

export function TrailerSection() {
  return (
    <section id="trailer" className="scroll-mt-24 bg-soot py-16 md:py-40">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="display text-display-lg text-bone">Watch the trailer</h2>
          <p className="mt-6 text-lede text-bone/70">Sound on.</p>
        </Reveal>
        <Reveal className="mx-auto mt-14 max-w-5xl md:mt-20" delay={120}>
          <TrailerFrame />
        </Reveal>
      </div>
    </section>
  );
}
