import Link from "next/link";
import { Button } from "@/components/system/Button";
import { Reveal } from "@/components/system/Reveal";
import { Section } from "@/components/system/Section";
import { PassTile } from "@/components/tickets/PassTile";
import { links, passes, sellsOutLine } from "@/content/site";
import { cn } from "@/lib/cn";

export function PassesPreview() {
  return (
    <Section id="passes" title="2026 tickets and passes" lede="One night on the trail. Every pass is per person, except parking." className="bg-soot">
      {/* phones: a price list, one row per pass; the full copy is on /tickets */}
      <Reveal className="sm:hidden">
        <ul className="border-t border-bone/15">
          {passes.map((p) => (
            <li key={p.slug} className={cn("border-b", p.featured ? "border-blaze/60" : "border-bone/15")}>
              <Link href="/tickets/#passes" className="flex items-center justify-between gap-4 py-4">
                <span>
                  <span className="display block text-[1.5rem] leading-none text-bone">{p.name}</span>
                  <span className={cn("label-mono mt-1.5 block text-[0.6875rem]", p.featured ? "text-blaze" : "text-bone/55")}>
                    {p.featured ? "Most popular" : p.kicker}
                  </span>
                </span>
                <span className="display shrink-0 text-[2.5rem] leading-none text-bone">
                  <span className="align-top text-[0.45em] text-bone/60">$</span>
                  {p.price}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* tablets and up: the flat tiles */}
      <div className="hidden gap-12 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {passes.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <PassTile pass={p} />
          </Reveal>
        ))}
      </div>

      <p className="label-mono mt-10 text-[0.6875rem] text-blaze sm:mt-16 sm:text-[0.75rem]">{sellsOutLine}</p>
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        <Button href={links.tickets} size="lg" className="w-full sm:w-auto">
          Buy tickets
        </Button>
        <Button href="/tickets" variant="ghost" className="self-start">
          All dates and pass details
        </Button>
      </div>
    </Section>
  );
}
