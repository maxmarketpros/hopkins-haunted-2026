import Image from "next/image";
import { Button } from "@/components/system/Button";
import { contact, links, season, site } from "@/content/site";
import { HeroVideo } from "./HeroVideo";

/** Full-viewport hero: the logo, one line of facts, one way to buy. */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-soot">
      <HeroVideo />

      <div className="container-page relative flex flex-1 flex-col items-center justify-center pb-24 pt-32 text-center md:pb-28 md:pt-36">
        <div className="hero-rise flex w-full flex-col items-center">
          <Image
            src="/brand/logo.png"
            alt={site.name}
            width={1600}
            height={600}
            priority
            sizes="(min-width: 1024px) 880px, 92vw"
            className="h-auto w-[min(100%,880px)] drop-shadow-[0_14px_50px_rgb(0_0_0_/_0.75)]"
          />
          <p className="label-mono mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.8125rem] text-bone/85 md:text-[0.9375rem]">
            <span>{season.rangeShort}</span>
            <span aria-hidden className="text-blaze">·</span>
            <span>{season.hoursShort}</span>
            <span aria-hidden className="hidden text-blaze sm:inline">·</span>
            <span className="hidden sm:inline">
              {contact.address.city}, {contact.address.state}
            </span>
          </p>
          <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <Button href={links.tickets} size="lg">
              Get tickets
            </Button>
            <Button href="#trailer" variant="ghost">
              Watch the trailer
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#glance"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-bone/50 transition-colors hover:text-bone md:block"
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="1" y="1" width="20" height="32" rx="10" />
          <path d="M11 9v7" className="animate-bounce" />
        </svg>
      </a>
    </section>
  );
}
