import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CallSheet } from "@/components/crew/CallSheet";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { contact, crew, links } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

export const metadata: Metadata = {
  title: "Join the Haunt Crew · Seasonal Entertainment Jobs in Greenville County",
  description:
    "Scare actors, monster handlers and makeup artists wanted for the 2026 Scare Team at Hopkins Haunted Attraction in Simpsonville, SC. No experience necessary. Premier seasonal entertainment jobs in Greenville County. Apply now.",
  alternates: { canonical: "/join-the-crew/" },
  openGraph: { title: "Join the Haunt Crew | Hopkins Haunted Attraction", url: "/join-the-crew/", images: [{ url: "/og/crew.jpg", width: 1200, height: 630 }] },
};

export default function CrewPage() {
  return (
    <>
      <PageHero
        blaze="Crew · Now hiring"
        title={crew.heading}
        lede={crew.pullQuote}
        image="/images/generated/makeup-backstage.webp"
        imageAlt="A backstage makeup station in a barn, a performer in the chair and an artist's gloved hands at work"
        imagePosition="70% center"
        actions={
          <>
            <Button href={links.apply} size="lg">
              Apply now
            </Button>
            <Button href={`mailto:${contact.email}`} variant="secondary" size="lg">
              Email us
            </Button>
          </>
        }
      />

      <Section blaze="The crew" seam>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-display-lg text-bone">Your nightmare job is here</h2>
            <p className="mt-8 text-bone/85">{crew.intro}</p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <figure className="vignette overflow-hidden rounded-[2px]">
              <Image
                src="/images/site/join-the-haunt-crew.webp"
                alt="Join the Haunt Crew: two Hopkins characters at the edges of a foggy pine forest"
                width={1800}
                height={1200}
                sizes="(min-width: 1024px) 480px, 100vw"
                placeholder="blur"
                blurDataURL={blurMap["/images/site/join-the-haunt-crew.webp"]}
                className="h-auto w-full"
              />
            </figure>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <p className="label-mono mb-5 text-lantern">Roles</p>
          <ul className="grid gap-px overflow-hidden rounded-[2px] bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
            {crew.roles.map((r) => (
              <li key={r.name} className="bg-bark p-6">
                <h3 className="display text-[1.375rem] leading-tight text-bone">{r.name}</h3>
                <p className="mt-3 text-[0.9375rem] text-bone/75">{r.blurb}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="tryouts" blaze="Tryouts" title="Actor recruitment & tryouts" seam>
        <Reveal>
          <CallSheet />
        </Reveal>
      </Section>

      <Section id="jobs" blaze="Seasonal jobs" title={crew.jobsHeading}>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="text-bone/85">{crew.jobsBody}</p>
          </Reveal>
          <Reveal className="lg:col-span-4" delay={100}>
            <div className="surface rounded-[2px] p-6">
              <p className="label-mono text-lantern">Read more</p>
              <Link href="/blog/exciting-seasonal-entertainment-jobs-in-greenville-county-for-theatrical-students-and-enthusiastic-a/" className="display mt-3 block text-[1.25rem] leading-tight text-bone hover:text-lantern">
                Seasonal entertainment jobs in Greenville County for theatrical students and enthusiastic adults
              </Link>
              <p className="mt-3 text-[0.9375rem] text-bone/70">From the blog. What the work is like, who it suits, and how to get started.</p>
              <div className="mt-6">
                <Button href={links.apply}>Apply now</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Join the Crew", path: "/join-the-crew/" }])} />
    </>
  );
}
