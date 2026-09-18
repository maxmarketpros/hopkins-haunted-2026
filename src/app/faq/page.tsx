import type { Metadata } from "next";
import { FaqList } from "@/components/faq/FaqList";
import { Blaze } from "@/components/system/Blaze";
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
        lede="The things people ask at the gate, answered before you get there. If yours isn’t here, call or email and a human will answer."
        image="/images/generated/rocking-chair-porch.webp"
        imageAlt="An empty rocking chair on the porch of an old farmhouse at night"
        imagePosition="center 45%"
        size="sm"
      />

      <Section blaze={`${faq.length} questions`} seam className="pt-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <FaqList items={faq} open={0} />
          </Reveal>
          <Reveal className="lg:col-span-4" delay={100}>
            <div className="surface rounded-[2px] p-6 lg:sticky lg:top-28">
              <Blaze label="Still wondering" className="mb-4" />
              <p className="display text-display-sm text-bone">Ask a human</p>
              <p className="mt-3 text-bone/75">We answer the phone and the inbox during the season.</p>
              <div className="mt-5 space-y-2">
                <a href={contact.phoneHref} className="block font-bold text-bone hover:text-lantern">
                  {contact.phoneDisplay}
                </a>
                <a href={`mailto:${contact.email}`} className="block [overflow-wrap:anywhere] text-bone/85 hover:text-lantern">
                  {contact.email}
                </a>
              </div>
              <div className="mt-6">
                <Button href="/contact" variant="secondary">
                  Contact & directions
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="know-before-you-go" blaze="Trailhead notice" title="Know before you go">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <ul className="surface divide-y divide-bone/10 rounded-[2px]">
              {knowBeforeYouGo.map((line) => (
                <li key={line} className="flex items-start gap-4 px-5 py-4">
                  <span aria-hidden className="blaze-mark mt-1 scale-75" />
                  <span className="text-bone/85">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="flex flex-col justify-end lg:col-span-4" delay={100}>
            <p className="text-bone/70">Ready?</p>
            <div className="mt-4 flex flex-col gap-3">
              <Button href={links.tickets}>Purchase tickets</Button>
              <Button href="/tickets" variant="secondary">
                Dates & passes
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <JsonLd data={[faqJsonLd(), breadcrumbJsonLd([{ name: "FAQ", path: "/faq/" }])]} />
    </>
  );
}
