import Link from "next/link";
import { Countdown } from "@/components/tickets/Countdown";
import { contact, links, passes, season } from "@/content/site";

const cheapest = Math.min(...passes.filter((p) => p.slug !== "vip-parking").map((p) => p.price));

/** At-a-glance facts right under the hero: when, hours, from what price, where. */
export function Tonight() {
  const cells = [
    { k: "Season", v: `${season.nights.length} nights · ${season.rangeShort}`, href: "/tickets" },
    { k: "Hours", v: season.hoursShort, href: "/tickets" },
    { k: "Passes", v: `From $${cheapest}`, href: "/tickets" },
    { k: "Where", v: `${contact.address.city}, ${contact.address.state}`, href: links.directions, external: true },
  ];
  return (
    <section aria-label="At a glance" className="border-b border-bone/10 bg-soot">
      <div className="container-page grid grid-cols-2 divide-bone/10 md:grid-cols-4 md:divide-x">
        {cells.map((c) =>
          c.external ? (
            <a key={c.k} href={c.href} target="_blank" rel="noopener" className="group py-6 pr-4 md:px-6 md:py-7 first:md:pl-0">
              <span className="label-mono block text-bone/45">{c.k}</span>
              <span className="mt-1.5 block font-bold text-bone group-hover:text-lantern">{c.v}</span>
            </a>
          ) : (
            <Link key={c.k} href={c.href} className="group py-6 pr-4 md:px-6 md:py-7 first:md:pl-0">
              <span className="label-mono block text-bone/45">{c.k}</span>
              <span className="mt-1.5 block font-bold text-bone group-hover:text-lantern">{c.v}</span>
            </Link>
          ),
        )}
      </div>
      <div className="container-page">
        <div className="label-mono flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-bone/10 py-3">
          <Countdown className="text-lantern" />
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-bone/50">
            {season.dateGroups.map((g) => (
              <span key={g}>{g}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
