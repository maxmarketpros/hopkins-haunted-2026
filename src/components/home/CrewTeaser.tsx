import Image from "next/image";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { links } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;
const IMG = "/images/site/join-the-haunt-crew.webp";

export function CrewTeaser() {
  return (
    <section id="crew" className="py-24 md:py-40">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:order-2 lg:col-span-6">
          <h2 className="display text-display-lg text-bone">Your nightmare job is here.</h2>
          <p className="mt-8 max-w-lg text-lede text-bone/80">
            Scare actors, monster handlers, makeup artists and set crew. No experience necessary.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Button href={links.apply} size="lg">
              Apply now
            </Button>
            <Button href="/join-the-crew" variant="ghost">
              About the crew
            </Button>
          </div>
        </Reveal>
        <Reveal className="lg:order-1 lg:col-span-6" delay={120}>
          <figure className="overflow-hidden rounded-[2px] bg-soot">
            <Image
              src={IMG}
              alt="Join the Haunt Crew: two characters flank red lettering under bare winter trees"
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 600px, 100vw"
              placeholder="blur"
              blurDataURL={blurMap[IMG]}
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
