import { FaqList } from "@/components/faq/FaqList";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { faq } from "@/content/site";

export function FaqTeaser() {
  const three = [faq[0], faq[1], faq[2]];
  return (
    <Section id="faq" blaze="Questions" seam>
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 className="display text-display-lg text-bone">Before you ask</h2>
          <p className="mt-6 text-bone/80">The three things everyone asks at the gate. The rest are on the FAQ page.</p>
          <div className="mt-8">
            <Button href="/faq" variant="secondary">
              All questions
            </Button>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={100}>
          <FaqList items={three} />
        </Reveal>
      </div>
    </Section>
  );
}
