import { Button } from "@/components/system/Button";
import { hero, links } from "@/content/site";
import { BillingBlock } from "./BillingBlock";
import { HeroVideo } from "./HeroVideo";

/**
 * The one-sheet: full-viewport video, bottom-left billing.
 * The H1 is the site's ranking line and the biggest type on the site. No logo; the nav carries it.
 */
export function Hero() {
  const lines = hero.h1;
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-soot">
      <HeroVideo />

      <div className="container-page relative flex flex-1 flex-col justify-end pb-10 pt-28 md:pb-20 md:pt-40">
        <p className="label-mono hero-rise flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-blaze md:text-[0.75rem]">
          <span aria-hidden className="blaze-mark" />
          {hero.eyebrow.map((part, i) => (
            <span key={part} className={i === hero.eyebrow.length - 1 ? "hidden sm:inline" : undefined}>
              {i > 0 && (
                <span aria-hidden className="mr-3">
                  ·
                </span>
              )}
              {part}
            </span>
          ))}
        </p>
        <h1 className="display mt-5 text-[clamp(3.25rem,1rem+8vw,8.5rem)] leading-[0.9] text-bone md:mt-8">
          {lines.map((line, i) => (
            <span
              key={line}
              className={i === lines.length - 1 ? "hero-rise block text-blaze" : "hero-rise block"}
              style={{ animationDelay: `${120 + i * 110}ms` }}
            >
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-rise mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-bone/85 md:mt-8 md:text-lede" style={{ animationDelay: "420ms" }}>
          {hero.lede}
        </p>
        <div className="hero-rise mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 md:mt-10" style={{ animationDelay: "520ms" }}>
          <Button href={links.tickets} size="lg" className="w-full sm:w-auto">
            Get tickets
          </Button>
          <Button href="#trailer" variant="ghost" className="self-start">
            Watch the trailer
          </Button>
        </div>
      </div>

      <BillingBlock className="hero-rise" style={{ animationDelay: "660ms" }} />
    </section>
  );
}
