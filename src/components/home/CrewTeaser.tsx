import Image from "next/image";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { links } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;
const IMG = "/images/site/join-the-haunt-crew.webp";

/** A slim band: the old site's crew artwork, one line, one button. The jobs copy lives on /join-the-crew. */
export function CrewTeaser() {
  return (
    <section id="crew" className="border-y border-bone/10 py-16 md:py-28">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <figure className="max-w-[280px] overflow-hidden rounded-[2px] bg-soot sm:max-w-sm lg:max-w-none">
            <Image
              src={IMG}
              alt="Join the Haunt Crew: two Hopkins Haunted Attraction characters flank red lettering under bare winter trees"
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 400px, 100vw"
              placeholder="blur"
              blurDataURL={blurMap[IMG]}
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={120}>
          <h2 className="display text-display-md text-bone">Your nightmare job is here.</h2>
          <p className="mt-5 max-w-xl text-bone/80">Scare actors, monster handlers, makeup artists and set crew for the 2026 season. No experience necessary.</p>
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <Button href={links.apply} size="lg">
              Apply now
            </Button>
            <Button href="/join-the-crew" variant="ghost">
              Scare actor jobs
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
