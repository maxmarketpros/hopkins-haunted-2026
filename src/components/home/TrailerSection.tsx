import { TrailerFrame } from "@/components/about/TrailerFrame";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { links } from "@/content/site";

export function TrailerSection() {
  return (
    <Section id="trailer" blaze="Trailer · Sound on" className="scroll-mt-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-4">
          <h2 className="display text-display-lg text-bone">See it before you walk it</h2>
          <p className="mt-6 text-bone/80">
            Thirty seconds from the woods. Everything in it is real, on the farm, after dark. Turn the sound up.
          </p>
          <div className="mt-8">
            <Button href={links.tickets}>Purchase tickets</Button>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={100}>
          <TrailerFrame />
        </Reveal>
      </div>
    </Section>
  );
}
