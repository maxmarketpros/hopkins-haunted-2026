import Image from "next/image";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { trailCopy } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;
const IMG = "/images/site/trail-chainsaw.webp";

/** The owner's heading and two of the owner's paragraphs, beside the chainsaw photo from the old site. */
export function TrailIntro() {
  return (
    <section id="trail" className="py-16 md:py-40">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-soot sm:aspect-[3/4]">
            <Image
              src={IMG}
              alt="A masked scare actor raises a chainsaw in green light beside an old wooden door on the Hopkins Haunted Attraction trail in Simpsonville, SC"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              placeholder="blur"
              blurDataURL={blurMap[IMG]}
              className="object-cover"
            />
          </figure>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={120}>
          <h2 className="display text-display-lg text-bone">{trailCopy.heading}</h2>
          <div className="mt-8 max-w-lg space-y-5 text-bone/80">
            <p className="text-lede">{trailCopy.paragraphs[1]}</p>
            <p>{trailCopy.paragraphs[3]}</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Button href="/about" variant="secondary" size="lg">
              About the haunt
            </Button>
            <Button href="/tickets" variant="ghost">
              Tickets and 2026 dates
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
