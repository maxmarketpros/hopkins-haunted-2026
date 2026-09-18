# Redesign v2 — "The Poster"

Branch `redesign-v2`. A full visual redo after client review of the first build. Content (`src/content/site.ts`, blog MDX), routes, SEO, redirects and the asset pipeline are unchanged.

## What was wrong (client review)

- Home hero: small logo, long italic paragraph, two equal buttons. No impact.
- Nav logo too small.
- Passes as ticket stubs: serial numbers, perforations, vertical text. Busy.
- Generated "trail at night" photo in the trail section. Client wants real images from the old site.
- Headings too long; too much copy in every section; everything packed tight.

## Direction

A horror one-sheet, not a brochure. Every section is one big idea: a short heading in tall poster type, at most one short paragraph, one action, and room around it. Black, bone, blood red. Real photos of the cast and the farm do the talking.

Rules applied everywhere:

- Headings are 2–5 words.
- One paragraph per section, two sentences max, except the About page (SEO copy kept as written) and the FAQ answers.
- One primary button per section. A second link is text only.
- Section padding 7–10rem on desktop. Container 1280px.
- No decorative eyebrows with marks, no serials, no scroll-drawn lines, no mono strip above the nav.

## Tokens

| Role | Choice |
|---|---|
| Display | **Anton** — tall, tight, uppercase. Sizes: hero 6–9rem, section 3.5–6rem. |
| Body | Libre Caslon Text at 1.125rem / 1.7. |
| Labels | IBM Plex Mono, only for dates, prices and tiny eyebrows. |
| Colors | pine `#0a0c0b` bg, soot `#070908`, bark `#161a18` surfaces, bone `#ede6d6` text, blaze `#c4261d` accent, lantern `#c9a24a` used only for the "Tonight" state and price numerals. Fog teal reduced to the map filter and a faint hero tint. |

## Home, section by section

1. **Hero** — full-viewport video. Logo up to 880px wide, centered. One mono line under it: `Oct 16 – Nov 1 · 7:30 PM – Midnight · Simpsonville, SC`. One red button, "Get tickets", and a text link, "Watch the trailer".
2. **At a glance** — four giant numerals: `9 nights`, `7:30 PM`, `$15 from`, and the countdown line. No cards.
3. **The trail** — heading "Thirty minutes. On foot. In the dark." One paragraph (the owner's "not your typical fall festival" line). Photo: the chainsaw scene from the old site's blog (`experience-thrills-body`), reused as `images/site/trail-chainsaw.webp`.
4. **Passes** — heading "Passes". Four flat tiles: giant price, name, one sentence. Haunt Pass marked "Most popular". One "Buy tickets" button under the grid.
5. **The cast** — four full-color portraits, name only, hover zoom. "Meet all 8".
6. **Trailer** — heading "Watch the trailer", full-width player.
7. **Crew** — the old site's "Join the Haunt Crew" artwork as the picture. Heading "Your nightmare job is here." (their line). Apply button.
8. **Find us** — heading "Find us". Full-width night map with the address card floating on it.
9. **Last word** — heading "Make it out alive." Cast poster from the old site. Get tickets.

## Inner pages

Same components (PageHero, Section, PassTile, CastCard) so they inherit the new scale and spacing. Copy trimmed where it was mine; owner copy untouched. Tickets page shows the long pass notes under each tile.
