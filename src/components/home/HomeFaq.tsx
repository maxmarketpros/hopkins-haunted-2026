import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { faq } from "@/content/site";

/** Four answers, open on the page, verbatim from the FAQ. The FAQPage schema lives on /faq only. */
const picks: { index: number; paragraphs: number[] }[] = [
  { index: 0, paragraphs: [0] }, // touch
  { index: 1, paragraphs: [0] }, // how long
  { index: 2, paragraphs: [1] }, // kids: the PG-13 line
  { index: 3, paragraphs: [0] }, // tickets at the gate
];

export function HomeFaq() {
  return (
    <Section id="questions" title="Questions people ask">
      <div className="grid gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
        {picks.map((p, i) => {
          const item = faq[p.index];
          return (
            <Reveal key={item.q} delay={i * 80}>
              <h3 className="display text-display-sm text-bone">{item.q}</h3>
              {p.paragraphs.map((n) => (
                <p key={n} className="mt-4 text-bone/80">
                  {item.a[n]}
                </p>
              ))}
            </Reveal>
          );
        })}
      </div>
      <div className="mt-16">
        <Button href="/faq" variant="secondary">
          All questions
        </Button>
      </div>
    </Section>
  );
}
