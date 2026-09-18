import type { Metadata } from "next";
import { Blaze } from "@/components/system/Blaze";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { Countdown } from "@/components/tickets/Countdown";
import { DateGrid } from "@/components/tickets/DateGrid";
import { PassStub } from "@/components/tickets/PassStub";
import { contact, knowBeforeYouGo, links, passes, season } from "@/content/site";
import { breadcrumbJsonLd, eventsJsonLd, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Tickets & Dates 2026",
  description:
    "2026 season dates, hours and passes for Hopkins Haunted Attraction in Simpsonville, SC. Nine nights, October 16 through November 1, 7:30 PM to midnight. Haunt Pass $25, Touch Pass $30, Kids $15, VIP Parking $10.",
  alternates: { canonical: "/tickets/" },
  openGraph: { title: "Tickets & Dates 2026 | Hopkins Haunted Attraction", url: "/tickets/", images: [{ url: "/og/tickets.jpg", width: 1200, height: 630 }] },
};

export default function TicketsPage() {
  return (
    <>
      <PageHero
        blaze={`Season ${season.year} · ${season.nights.length} nights`}
        title="Nine nights in the woods"
        lede={`${season.hoursLine}. Tickets often sell out fast, so we highly encourage early reservations.`}
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

      <Section id="dates" blaze="Dates & hours" title="When the gates open" seam>
        <Reveal>
          <DateGrid />
        </Reveal>
        <Reveal delay={100} className="mt-8 grid gap-6 border-t border-bone/10 pt-8 md:grid-cols-3">
          <div>
            <p className="label-mono text-bone/60">Hours</p>
            <p className="display mt-2 text-display-sm text-lantern">{season.hoursShort}</p>
            <p className="mt-1 text-bone/60">each night the trail runs</p>
          </div>
          <div>
            <p className="label-mono text-bone/60">Status</p>
            <Countdown className="mt-2 text-lede font-bold text-bone" />
            <p className="mt-1 text-bone/60">Times are Eastern.</p>
          </div>
          <div>
            <p className="label-mono text-bone/60">Where</p>
            <p className="mt-2 text-lede font-bold text-bone">
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

      <Section
        id="passes"
        blaze="Passes · 4 options"
        title="Pick your pass"
        lede="Every pass covers one night on the trail. Buy online through Fearticket to skip the line, or at the booth on site."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {passes.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <PassStub pass={p} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={links.tickets} size="lg">
            Purchase tickets
          </Button>
          <p className="max-w-md text-[0.9375rem] text-bone/60">
            Tickets are sold by Fearticket, our ticketing partner. The button opens their checkout in a new tab.
          </p>
        </div>
      </Section>

      <Section id="before-you-buy" blaze="Trailhead notice" title="Know before you go" seam className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ul className="surface divide-y divide-bone/10 rounded-[2px]">
              {knowBeforeYouGo.map((line) => (
                <li key={line} className="flex items-start gap-4 px-5 py-4">
                  <span aria-hidden className="blaze-mark mt-1 scale-75" />
                  <span className="text-bone/85">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={100}>
            <div className="lg:sticky lg:top-28">
              <Blaze label="Questions" className="mb-4" />
              <h3 className="display text-display-sm text-bone">Still not sure?</h3>
              <p className="mt-4 text-bone/75">
                The FAQ covers touching, kids, parking and coolers. For anything else, call or email us before you drive out.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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
