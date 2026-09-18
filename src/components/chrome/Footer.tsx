import Image from "next/image";
import Link from "next/link";
import { contact, driveTimes, links, nav, season, site } from "@/content/site";
import { Social } from "./Social";

const greenville = driveTimes.find((d) => d.from === "Downtown Greenville");

const planLinks = [
  { href: "/tickets/", label: "Tickets and 2026 dates" },
  { href: "/tickets/#before-you-buy", label: "Know before you go" },
  { href: "/contact/#drive-times", label: "Directions to the farm" },
  { href: "/faq/", label: "Questions people ask" },
  { href: "/characters/", label: "The characters" },
];

const linkCls = "text-bone/80 hover:text-bone hover:underline decoration-fog underline-offset-4";

export function Footer() {
  return (
    <footer className="relative border-t border-bone/10 bg-soot">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Image src="/brand/logo.png" alt={site.name} width={1600} height={600} className="h-auto w-72" />
          <p className="mt-6 max-w-sm text-bone/70">
            A 30-minute haunted trail on an 1800s farm in Simpsonville, South Carolina, about {greenville?.minutes} minutes from Greenville. Every October since{" "}
            {site.since}.
          </p>
          <div className="mt-6 flex gap-3">
            <Social />
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="label-mono text-blaze">Pages</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className={linkCls}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Plan your visit" className="md:col-span-3">
          <p className="label-mono text-blaze">Plan your visit</p>
          <ul className="mt-4 space-y-2.5">
            {planLinks.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label-mono text-blaze">Find us</p>
          <address className="mt-4 not-italic text-bone/80">
            <a href={links.directions} target="_blank" rel="noopener" className={linkCls}>
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.state} {contact.address.zip}
            </a>
            <br />
            <a href={contact.phoneHref} className={`mt-3 inline-block ${linkCls}`}>
              {contact.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${contact.email}`} className={`inline-block [overflow-wrap:anywhere] ${linkCls}`}>
              {contact.email}
            </a>
          </address>
          <p className="label-mono mt-6 text-bone/60">
            {season.rangeShort} · {season.hoursShort}
          </p>
          <a
            href={links.tickets}
            target="_blank"
            rel="noopener"
            className="label-mono mt-5 inline-flex rounded-[2px] bg-blaze px-5 py-3 text-bone lantern-glow hover:bg-[#d92c22]"
          >
            Purchase tickets
          </a>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.8125rem] text-bone/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {season.year} {site.name}. {site.footerLine} All rights reserved.
          </p>
          <p className="label-mono text-[0.6875rem]">
            Haunted trail · {contact.address.city}, {contact.address.state} · Greenville County
          </p>
        </div>
      </div>
    </footer>
  );
}
