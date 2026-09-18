import { links, season, contact } from "@/content/site";

/** Thin utility strip above the nav. Not sticky, so it scrolls away with the top of the page. */
export function SeasonStrip() {
  return (
    <div className="relative z-40 border-b border-bone/10 bg-soot text-lantern">
      <div className="container-page label-mono flex h-9 items-center justify-between gap-4 overflow-hidden text-[0.6875rem] sm:text-[0.75rem]">
        <p className="flex min-w-0 items-center gap-3 whitespace-nowrap">
          <span>{season.rangeShort}</span>
          <span aria-hidden className="hidden text-bone/25 xs:inline">·</span>
          <span className="hidden xs:inline">{season.hoursShort}</span>
          <span aria-hidden className="hidden text-bone/25 md:inline">·</span>
          <span className="hidden md:inline">
            {contact.address.city}, {contact.address.state}
          </span>
        </p>
        <a
          href={links.directions}
          target="_blank"
          rel="noopener"
          className="shrink-0 text-bone/70 underline decoration-fog underline-offset-4 hover:text-bone hover:decoration-lantern"
        >
          Directions
        </a>
      </div>
    </div>
  );
}
