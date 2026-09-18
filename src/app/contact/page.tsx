import type { Metadata } from "next";
import { Social } from "@/components/chrome/Social";
import { DarkMap } from "@/components/contact/DarkMap";
import { MessageForm } from "@/components/contact/MessageForm";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { contact, links, season } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    "Hopkins Haunted Attraction is at 3717 Fork Shoals Rd., Simpsonville, SC 29680. Call (864) 243-4010 or email hopkinshauntedattraction@gmail.com. Map, directions, hours and parking.",
  alternates: { canonical: "/contact/" },
  openGraph: { title: "Contact & Directions | Hopkins Haunted Attraction", url: "/contact/", images: [{ url: "/og/contact.jpg", width: 1200, height: 630 }] },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        blaze="Contact & directions"
        title="Fork Shoals Road, after dark"
        lede={`${contact.address.full}. Look for the cars and the fog; you can’t miss the turn.`}
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

      <Section blaze="Find us" seam className="pt-14 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <DarkMap height="h-[380px] md:h-[520px]" />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <dt className="label-mono text-bone/45">Address</dt>
                <dd className="mt-1.5 text-lede text-bone">
                  <a href={links.directions} target="_blank" rel="noopener" className="hover:text-lantern">
                    {contact.address.street}
                    <br />
                    {contact.address.city}, {contact.address.state} {contact.address.zip}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/45">Season hours</dt>
                <dd className="mt-1.5 text-bone">
                  {season.hoursLine}
                  <br />
                  <span className="text-bone/60">{season.dateGroups.join(" · ")}</span>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/45">Phone</dt>
                <dd className="mt-1.5">
                  <a href={contact.phoneHref} className="text-lede text-bone hover:text-lantern">
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/45">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere] text-bone hover:text-lantern">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/45">Parking</dt>
                <dd className="mt-1.5 text-bone/85">
                  General parking is free. VIP parking ($10 per car, bought with your tickets) is closer to the entrance. Handicap parking is available.
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/45">Follow</dt>
                <dd className="mt-3 flex gap-3">
                  <Social />
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section blaze="Message" className="pt-0 md:pt-0">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <MessageForm />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <p className="display text-display-sm text-bone">Or just come out</p>
            <p className="mt-4 text-bone/75">
              The fastest way to get an answer during the season is at the ticket booth. The second fastest is the phone.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={links.tickets}>Purchase tickets</Button>
              <Button href="/faq" variant="secondary">
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
