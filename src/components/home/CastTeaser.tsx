import { CastCard } from "@/components/cast/CastCard";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { cast } from "@/content/site";

const featured = ["tip-toes", "jester", "bobby-the-butcher", "slasher"];

export function CastTeaser() {
  const four = featured.map((s) => cast.find((c) => c.slug === s)!);
  return (
    <section id="characters" className="py-24 md:py-40">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="display text-display-lg text-bone">Meet the characters</h2>
          <Button href="/characters" variant="ghost" className="mb-2">
            All {cast.length} characters
          </Button>
        </div>
        <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:mt-20 lg:grid-cols-4">
          {four.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90} className="w-[76vw] shrink-0 snap-start sm:w-auto">
              <CastCard c={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
