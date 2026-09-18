import { CastCard } from "@/components/cast/CastCard";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { cast } from "@/content/site";

const featured = ["tip-toes", "jester", "bobby-the-butcher", "slasher"];

export function CastTeaser() {
  const four = featured.map((s) => cast.find((c) => c.slug === s)!);
  return (
    <Section
      id="cast"
      blaze={`Cast · ${cast.length} of them`}
      title="Who’s waiting in the woods"
      lede="Every one of them is a real person in real makeup, and every one of them has been out there longer than you have. Run a light over them."
      seam
    >
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {four.map((c, i) => (
          <Reveal key={c.slug} delay={i * 80} className="w-[70vw] shrink-0 snap-start sm:w-auto">
            <CastCard c={c} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Button href="/characters" variant="secondary">
          Meet all {cast.length}
        </Button>
      </div>
    </Section>
  );
}
