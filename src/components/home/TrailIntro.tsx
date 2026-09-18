import Image from "next/image";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { trailCopy } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;
const IMG = "/images/site/trail-chainsaw.webp";

export function TrailIntro() {
  return (
    <section id="trail" className="py-24 md:py-40">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <figure className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-soot">
            <Image
              src={IMG}
              alt="A masked actor raises a chainsaw overhead in green light beside an old wooden door on the trail"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              placeholder="blur"
              blurDataURL={blurMap[IMG]}
              className="object-cover"
            />
          </figure>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={120}>
          <h2 className="display text-display-lg text-bone">
            Thirty minutes.
            <br />
            On foot.
            <br />
            <span className="text-blaze">In the dark.</span>
          </h2>
          <p className="mt-8 max-w-lg text-lede text-bone/80">{trailCopy.paragraphs[1]}</p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Button href="/about" variant="secondary" size="lg">
              About the haunt
            </Button>
            <Button href="/tickets" variant="ghost">
              Dates and passes
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
