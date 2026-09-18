import Image from "next/image";
import { Button } from "@/components/system/Button";
import { Blaze } from "@/components/system/Blaze";
import { Reveal } from "@/components/system/Reveal";
import { crew, links } from "@/content/site";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

export function CrewTeaser() {
  return (
    <section id="crew" className="relative isolate overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 vignette">
        <Image
          src="/images/generated/makeup-backstage.webp"
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurMap["/images/generated/makeup-backstage.webp"]}
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pine via-pine/85 to-pine/30" />
      </div>
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <Blaze label="Crew · Now hiring" className="mb-6" />
          <h2 className="display text-display-lg text-bone">{crew.heading}</h2>
          <p className="mt-6 text-lede italic text-bone/85">“{crew.pullQuote}”</p>
          <p className="mt-5 text-bone/75">
            Scare actors, monster handlers, makeup artists and set crew. No experience necessary. We teach you the rest.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={links.apply}>Apply now</Button>
            <Button href="/join-the-crew" variant="secondary">
              About the crew
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
