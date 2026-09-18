import type { Metadata } from "next";
import Link from "next/link";
import { CallSheet } from "@/components/crew/CallSheet";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { contact, crew, links } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: { absolute: "Scare Actor Jobs in Greenville County | Join the Haunt Crew" },
  description:
    "Scare actors, monster handlers and makeup artists wanted at Hopkins Haunted Attraction in Simpsonville, SC. Seasonal jobs, no experience needed. Apply now.",
  alternates: { canonical: "/join-the-crew/" },
  openGraph: { title: "Join the Haunt Crew | Hopkins Haunted Attraction", url: "/join-the-crew/", images: [{ url: "/og/crew.jpg", width: 1200, height: 630 }] },
};

export default function CrewPage() {
  return (
    <>
      <PageHero
        blaze="Now hiring"
        title={crew.heading}
        lede={crew.pullQuote}
        image="/images/generated/makeup-backstage.webp"
        imageAlt="A backstage makeup station in a barn, a performer in the chair and an artist's gloved hands at work"
        imagePosition="70% center"
        size="lg"
        actions={
          <>
            <Button href={links.apply} size="lg">
              Apply now
            </Button>
            <Button href={`mailto:${contact.email}`} variant="ghost">
              Email us
            </Button>
          </>
        }
      />

      <Section title="Your nightmare job is here.">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-lede text-bone/80">{crew.intro}</p>
          </Reveal>
        </div>
        <Reveal className="mt-20 md:mt-28">
          <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {crew.roles.map((r) => (
              <li key={r.name} className="border-t-2 border-bone/15 pt-8">
                <h3 className="display text-display-sm text-bone">{r.name}</h3>
                <p className="mt-4 text-bone/70">{r.blurb}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="tryouts" title="Tryouts" className="bg-soot">
        <Reveal>
          <CallSheet />
        </Reveal>
      </Section>

      <Section id="jobs" title="Seasonal jobs">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="display text-display-sm text-bone">{crew.jobsHeading}</h3>
            <p className="mt-6 text-bone/75">{crew.jobsBody}</p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={100}>
            <p className="label-mono text-blaze">From the blog</p>
            <Link
              href="/blog/exciting-seasonal-entertainment-jobs-in-greenville-county-for-theatrical-students-and-enthusiastic-a/"
              className="display mt-4 block text-display-sm text-bone hover:text-blaze"
            >
              Seasonal entertainment jobs in Greenville County
            </Link>
            <p className="mt-4 text-bone/70">What the work is like, who it suits, and how to get started.</p>
            <div className="mt-8">
              <Button href={links.apply}>Apply now</Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Join the Crew", path: "/join-the-crew/" }])} />
    </>
  );
}
