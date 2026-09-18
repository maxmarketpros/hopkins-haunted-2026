import type { Metadata } from "next";
import { FaqList } from "@/components/faq/FaqList";
import { Button } from "@/components/system/Button";
import { PageHero } from "@/components/system/PageHero";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { contact, faq, knowBeforeYouGo, links } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Do the actors touch you? How long is the trail? Is it too scary for kids? Parking, tickets at the gate, coolers. Everything guests ask before visiting Hopkins Haunted Attraction in Simpsonville, SC.",
  alternates: { canonical: "/faq/" },
  openGraph: { title: "FAQ | Hopkins Haunted Attraction", url: "/faq/", images: [{ url: "/og/faq.jpg", width: 1200, height: 630 }] },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        blaze="Questions"
        title="Frequently asked questions"
        lede="Everything people ask at the gate, answered before you get there."
        image="/images/site/gate-fog.webp"
        imageAlt="A rusted iron gate wrapped in chain in a foggy wood"
        imagePosition="center 60%"
      />

      <Section className="pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <FaqList items={faq} open={0} />
          </Reveal>
          <Reveal className="lg:col-span-4" delay={100}>
            <div className="lg:sticky lg:top-32">
              <p className="display text-display-md text-bone">Ask a human</p>
              <p className="mt-4 text-bone/70">We answer the phone and the inbox during the season.</p>
              <div className="mt-6 space-y-2">
                <a href={contact.phoneHref} className="display block text-display-sm text-bone hover:text-blaze">
                  {contact.phoneDisplay}
                </a>
                <a href={`mailto:${contact.email}`} className="block [overflow-wrap:anywhere] text-bone/80 hover:text-bone">
                  {contact.email}
                </a>
              </div>
              <div className="mt-8">
                <Button href="/contact" variant="secondary">
                  Contact
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="know-before-you-go" title="Know before you go" className="bg-soot">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <ul className="divide-y divide-bone/10 border-y border-bone/10">
              {knowBeforeYouGo.map((line) => (
                <li key={line} className="flex items-start gap-5 py-5">
                  <span aria-hidden className="blaze-mark mt-2" />
                  <span className="text-lede text-bone/85">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="flex flex-col justify-end lg:col-span-4" delay={100}>
            <div className="flex flex-wrap items-center gap-6">
              <Button href={links.tickets} size="lg">
                Get tickets
              </Button>
              <Button href="/tickets" variant="ghost">
                Dates and passes
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <JsonLd data={[faqJsonLd(), breadcrumbJsonLd([{ name: "FAQ", path: "/faq/" }])]} />
    </>
  );
}
