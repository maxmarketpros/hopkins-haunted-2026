import type { Metadata } from "next";
import { Social } from "@/components/chrome/Social";
import { DarkMap } from "@/components/contact/DarkMap";
import { MessageForm } from "@/components/contact/MessageForm";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { contact, driveTimes, links, season } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";

const title = "Directions & Contact | Hopkins Haunted, Simpsonville SC";
const greenville = driveTimes.find((d) => d.from === "Downtown Greenville");

export const metadata: Metadata = {
  title: { absolute: title },
  description:
    "Hopkins Haunted Attraction is at 3717 Fork Shoals Rd., Simpsonville, SC 29680, 30 minutes from Greenville. Map, drive times, parking, phone and email.",
  alternates: { canonical: "/contact/" },
  openGraph: { title, url: "/contact/", images: [{ url: "/og/contact.jpg", width: 1200, height: 630 }] },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        blaze="Fork Shoals Road, after dark"
        title="Directions and contact"
        lede={contact.address.full}
        image="/images/generated/farm-lane-headlights.webp"
        imageAlt="Headlights glowing through fog on a gravel farm lane lined with pines, a wooden arrow sign at the turn"
        imagePosition="center 60%"
        size="sm"
        actions={
          <Button href={links.directions} size="lg">
            Get directions
          </Button>
        }
      />

      <Section className="pt-16 md:pt-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <DarkMap height="h-[380px] md:h-[520px]" />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <dt className="label-mono text-bone/60">Address</dt>
                <dd className="mt-1.5 text-lede text-bone">
                  <a href={links.directions} target="_blank" rel="noopener" className="hover:text-lantern">
                    {contact.address.street}
                    <br />
                    {contact.address.city}, {contact.address.state} {contact.address.zip}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/60">Season hours</dt>
                <dd className="mt-1.5 text-bone">
                  {season.hoursLine}
                  <br />
                  <span className="text-bone/60">{season.dateGroups.join(" · ")}</span>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/60">Phone</dt>
                <dd className="mt-1.5">
                  <a href={contact.phoneHref} className="text-lede text-bone hover:text-lantern">
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/60">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere] text-bone hover:text-lantern">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/60">Parking</dt>
                <dd className="mt-1.5 text-bone/85">
                  General parking is free. VIP parking ($10 per car, bought with your tickets) is closer to the entrance. Handicap parking is available.
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/60">Follow</dt>
                <dd className="mt-3 flex gap-3">
                  <Social />
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section id="drive-times" title="Getting here" className="scroll-mt-24 bg-soot">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="text-lede text-bone/80">
              The farm is on Fork Shoals Road south of Simpsonville, about {greenville?.minutes} minutes from downtown Greenville and an easy drive from anywhere in the
              Upstate. Put the address in your maps app; the last stretch is dark country road, so leave a little early.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href={links.directions}>Open in Google Maps</Button>
              <Button href="/tickets" variant="ghost">
                Tickets and 2026 dates
              </Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={100}>
            <dl className="grid gap-x-12 sm:grid-cols-2">
              {driveTimes.map((d) => (
                <div key={d.from} className="flex items-baseline justify-between gap-4 border-b border-bone/10 py-4">
                  <dt className="text-lede text-bone">{d.from}</dt>
                  <dd className="label-mono text-bone/60">about {d.minutes} min</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[0.8125rem] text-bone/50">Drive times are approximate and depend on traffic.</p>
          </Reveal>
        </div>
      </Section>

      <Section title="Send a message">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <MessageForm />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <p className="display text-display-sm text-bone">Or just come out</p>
            <p className="mt-4 text-bone/70">During the season the fastest answer is at the ticket booth. The second fastest is the phone.</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href={links.tickets}>Get tickets</Button>
              <Button href="/faq" variant="ghost">
                Read the FAQ
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact/" }])} />
    </>
  );
}
