import type { Metadata } from "next";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { Countdown } from "@/components/tickets/Countdown";
import { DateGrid } from "@/components/tickets/DateGrid";
import { PassTile } from "@/components/tickets/PassTile";
import { contact, knowBeforeYouGo, links, passes, season, sellsOutLine } from "@/content/site";
import { breadcrumbJsonLd, eventsJsonLd, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Tickets & 2026 Dates",
  description:
    "Nine nights, Oct 16 – Nov 1, 7:30 PM to midnight in Simpsonville, SC. Haunt Pass $25, Touch Pass $30, Kids $15, VIP Parking $10. Buy online, skip the line.",
  alternates: { canonical: "/tickets/" },
  openGraph: { title: "Tickets & 2026 Dates | Hopkins Haunted Attraction", url: "/tickets/", images: [{ url: "/og/tickets.jpg", width: 1200, height: 630 }] },
};

export default function TicketsPage() {
  return (
    <>
      <PageHero
        blaze={`Season ${season.year}`}
        title="Tickets and 2026 dates"
        lede={`Nine nights in the woods, ${season.hoursShort.toLowerCase()}. ${sellsOutLine}`}
        image="/images/generated/ticket-booth.webp"
        imageAlt="A wooden ticket booth strung with bare bulbs at the edge of a foggy field at dusk"
        imagePosition="center 40%"
        actions={
          <>
            <Button href={links.tickets} size="lg">
              Purchase tickets
            </Button>
            <Button href="#before-you-buy" variant="secondary" size="lg">
              Before you buy
            </Button>
          </>
        }
      />

      <Section id="dates" title="Dates" seam>
        <Reveal>
          <DateGrid />
        </Reveal>
        <Reveal delay={100} className="mt-16 grid gap-10 border-t border-bone/10 pt-10 md:grid-cols-3">
          <div>
            <p className="label-mono text-bone/55">Hours</p>
            <p className="display mt-3 text-display-md text-bone">{season.hoursShort}</p>
            <p className="mt-2 text-bone/60">each night the trail runs</p>
          </div>
          <div>
            <p className="label-mono text-bone/55">Status</p>
            <Countdown className="display mt-3 text-display-sm text-lantern" />
            <p className="mt-2 text-bone/60">Times are Eastern.</p>
          </div>
          <div>
            <p className="label-mono text-bone/55">Where</p>
            <p className="display mt-3 text-display-sm text-bone">
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.state} {contact.address.zip}
            </p>
            <a href={links.directions} target="_blank" rel="noopener" className="mt-1 inline-block text-bone/70 underline decoration-fog underline-offset-4 hover:text-lantern">
              Get directions
            </a>
          </div>
        </Reveal>
      </Section>

      <Section id="passes" title="Passes" lede="One night on the trail. Buy online through Fearticket to skip the line, or at the booth on site." className="bg-soot">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {passes.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <PassTile pass={p} details />
            </Reveal>
          ))}
        </div>
        <div className="mt-20 flex flex-wrap items-center gap-6">
          <Button href={links.tickets} size="lg">
            Purchase tickets
          </Button>
          <p className="max-w-md text-[0.9375rem] text-bone/60">
            Tickets are sold by Fearticket, our ticketing partner. The button opens their checkout in a new tab.
          </p>
        </div>
      </Section>

      <Section id="before-you-buy" title="Know before you go" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ul className="divide-y divide-bone/10 border-y border-bone/10">
              {knowBeforeYouGo.map((line) => (
                <li key={line} className="flex items-start gap-5 py-5">
                  <span aria-hidden className="blaze-mark mt-2" />
                  <span className="text-lede text-bone/85">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <div className="lg:sticky lg:top-32">
              <h3 className="display text-display-md text-bone">Still not sure?</h3>
              <p className="mt-4 text-bone/70">The FAQ covers touching, kids, parking and coolers. For anything else, call us.</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button href="/faq" variant="secondary">
                  Read the FAQ
                </Button>
                <Button href={contact.phoneHref} variant="ghost">
                  {contact.phoneDisplay}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <JsonLd data={[...eventsJsonLd(), breadcrumbJsonLd([{ name: "Tickets & Dates", path: "/tickets/" }])]} />
    </>
  );
}
