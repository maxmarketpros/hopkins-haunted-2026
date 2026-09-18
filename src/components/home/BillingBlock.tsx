import Link from "next/link";
import type { CSSProperties } from "react";
import { Countdown } from "@/components/tickets/Countdown";
import { passes, season } from "@/content/site";
import { cn } from "@/lib/cn";

const cheapest = Math.min(...passes.filter((p) => p.slug !== "vip-parking").map((p) => p.price));
const shortDates = season.dateGroups.map((g) => g.replace("October", "Oct").replace("November", "Nov")).join(" · ");

/**
 * The credits line at the foot of the poster: dates, hours, price, status.
 * Sits at the bottom of the hero on desktop; on phones it's a 2×2 grid under the copy.
 */
export function BillingBlock({ className, style }: { className?: string; style?: CSSProperties }) {
  const cells = [
    { label: `${season.nights.length} nights`, value: shortDates, href: "/tickets/#dates" },
    { label: "Hours", value: season.hoursShort, href: "/tickets/" },
    { label: "Passes", value: `From $${cheapest}`, href: "/tickets/#passes" },
  ];
  return (
    <div className={cn("relative border-t border-bone/15 bg-soot/80 backdrop-blur-md", className)} style={style}>
      <dl className="container-page grid grid-cols-2 gap-x-6 gap-y-6 py-6 md:grid-cols-4 md:gap-x-10 md:py-7">
        {cells.map((c) => (
          <div key={c.label}>
            <dt className="label-mono text-[0.6875rem] text-bone/50">{c.label}</dt>
            <dd className="mt-2">
              <Link href={c.href} className="label-mono text-[0.8125rem] text-bone transition-colors hover:text-blaze md:text-[0.875rem]">
                {c.value}
              </Link>
            </dd>
          </div>
        ))}
        <div>
          <dt className="label-mono text-[0.6875rem] text-bone/50">Status</dt>
          <dd className="mt-2">
            <Countdown className="label-mono text-[0.8125rem] text-lantern md:text-[0.875rem]" />
          </dd>
        </div>
      </dl>
    </div>
  );
}
