import Link from "next/link";
import { Countdown } from "@/components/tickets/Countdown";
import { passes, season } from "@/content/site";

const cheapest = Math.min(...passes.filter((p) => p.slug !== "vip-parking").map((p) => p.price));

/** Three giant numbers and the countdown. Nothing else. */
export function Glance() {
  const cells = [
    { big: String(season.nights.length), small: "nights", sub: season.rangeShort },
    { big: "7:30", small: "PM", sub: "until midnight" },
    { big: `$${cheapest}`, small: "and up", sub: "per person" },
  ];
  return (
    <section id="glance" aria-label="At a glance" className="border-y border-bone/10 bg-soot">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4 md:gap-6 md:py-20">
        {cells.map((c) => (
          <Link key={c.small} href="/tickets" className="group">
            <p className="display text-[4.5rem] leading-none text-bone transition-colors group-hover:text-blaze md:text-[5.5rem]">
              {c.big}
              <span className="ml-2 text-[0.4em] text-bone/60">{c.small}</span>
            </p>
            <p className="label-mono mt-3 text-bone/60">{c.sub}</p>
          </Link>
        ))}
        <div className="flex flex-col justify-end border-t border-bone/10 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <Countdown className="display text-[1.75rem] leading-tight text-lantern md:text-[2rem]" />
          <p className="label-mono mt-3 text-bone/60">{season.dateGroups.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}
