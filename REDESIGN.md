# Redesign v3 — "The One-Sheet"

Branch `redesign-v2` (v3 builds on top of it). Two goals from the second client review:

1. **No logo in the hero.** A new hero built on words, not the wordmark. The nav already carries the logo at full size.
2. **Rank on Google for normal searches.** People type things like *haunted trail near me*, *haunted house Greenville SC*, *haunted attractions Simpsonville*, *Halloween events Greenville 2026*, *scariest haunted trail South Carolina*. The site has to say those things out loud, in the owner's voice, on pages Google can read.

v2's rules still hold (short headings, one idea per section, room, real photos, Anton/Caslon/Plex, same colors). v3 adds the one thing v2 cut too hard: enough visible, keyword-bearing text for a search engine, placed where it doesn't fight the poster.

---

## Part 1 — What the audit found

| Area | Today (v2) | Problem |
|---|---|---|
| Home H1 | Hidden (`sr-only`) | Google discounts hidden headings. The only H1 on the most important page is invisible. |
| Home body text | ~230 words | Thin. Competing haunt sites carry 500–900 words on the home page. |
| Home H2s | "The cast", "Find us", "Passes", "Watch the trailer" | No search terms in any visible heading. |
| Title tags | Brand first everywhere | Fine for brand searches, weak for generic ones. Crew title is 70+ chars. |
| Meta descriptions | Home 250 chars, tickets 210, crew 230 | Truncated in results. Target ≤155. |
| Local terms | "Simpsonville" and "Greenville County" only | Nothing for Greenville city, Mauldin, Fountain Inn, Greer, Spartanburg, Anderson, "the Upstate". |
| Structured data | LocalBusiness, per-night Event, FAQPage, Breadcrumb, ItemList, BlogPosting | Missing: opening hours, VideoObject (trailer), hasMap, areaServed, real photo list. |
| Blog | 4 posts from the old site, one with an empty description | No new content targeting long-tail questions. |
| Old URLs | All 301'd | Good. Keep. |

---

## Part 2 — The hero

A movie one-sheet, bottom-left billing. Video loop stays (it works). The logo goes. The H1 is the biggest thing on the site and it is also the ranking line.

```
┌──────────────────────────────────────────────────────────────────────┐
│ [logo]                  Tickets About Characters FAQ Crew  [GET TICKETS] │
│                                                                      │
│                    (video loop, darker on the left and bottom)       │
│                                                                      │
│   ■ HAUNTED TRAIL · SIMPSONVILLE, SC · SINCE 2023                     │
│                                                                      │
│   GREENVILLE COUNTY'S                                                │
│   MOST TERRIFYING                       ← H1, Anton, up to 8.5rem     │
│   HAUNTED TRAIL.                        ← last line in blaze red      │
│                                                                      │
│   Thirty minutes on foot through the sinister woods of an 1800s      │
│   farm. Live actors, cinematic sets, and no way around.              │
│                                                                      │
│   [ GET TICKETS ]      Watch the trailer                             │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ OCT 16–17 · 23–25 · 29–31 · NOV 1 │ 7:30 PM – MIDNIGHT │ FROM $15 │ GATES OPEN IN 28 DAYS │
└──────────────────────────────────────────────────────────────────────┘
```

**The signature: the billing block.** The strip along the foot of the hero is the poster's credits line. Four mono cells: the date groups, the hours, the starting price, and the countdown (which becomes "OPEN TONIGHT" in lantern gold on show nights). It replaces the v2 "At a glance" numerals, so the page gets shorter, not longer. On phones the strip sits under the hero as a 2×2 grid.

**Why this H1.** "The Most Terrifying Haunted Attraction in Greenville County, SC" was the owner's H1 on the old site. v3 keeps the claim and the two search terms (*Greenville County*, *haunted trail*) and cuts it to six words. It's the one heading on the site allowed to be longer than five words, because it's the one Google reads first.

**The one sentence under it** carries the rest: *haunted trail*, *1800s farm*, *live actors*. The brand name is in the nav, the title tag and the schema; it doesn't need to be in the sentence.

Mobile: poster image (no video, as now), H1 at ~3.5rem stacking four lines, billing block below the fold.

Motion: three H1 lines rise in sequence over 600ms, then the sentence and buttons, then the strip. Reduced-motion gets a plain fade.

---

## Part 3 — Home page, section by section

Target: 550–650 visible words (up from ~230). All of it in the owner's voice. All of it below the hero. Each section still one heading, one idea, one action.

| # | Section | Heading (H2) | Body | Action |
|---|---|---|---|---|
| 1 | **Hero** | H1 above | one sentence | Get tickets / Watch the trailer |
| 2 | **The trail** | *This is no ordinary haunted trail* (owner's heading) | Owner paragraphs 2 and 4 (Simpsonville, not a hayride, 30 minutes, don't assume you're alone). Chainsaw photo. ~90 words | About the haunt |
| 3 | **Passes** | *2026 tickets and passes* | v2 tiles. One mono line under the grid: "Halloween weekend sells out. Buy online and skip the line." ~110 words incl. tile copy | Buy tickets |
| 4 | **Characters** | *Meet the characters* | Four cards as v2. "Characters" matches the URL and the nav | Meet all 8 |
| 5 | **Trailer** | *Watch the trailer* | Player. VideoObject schema added | — |
| 6 | **Crew** | *Your nightmare job is here.* | Slimmed to one line + button (full page carries the jobs copy) | Apply now |
| 7 | **Plan your night** (new) | *Plan your night* (owner's About heading, shortened) | Three columns. **Where:** address, "about 30 minutes from downtown Greenville", drive times from Simpsonville, Mauldin, Fountain Inn, Greer, Anderson, Spartanburg. **When:** date groups, hours, "Halloween weekend sells out". **Know before you go:** four bullets. Night map full-width below (replaces "Find us"). ~130 words | Get directions |
| 8 | **Questions** (new) | *Questions people ask* | Four FAQ answers, open, verbatim: touch, how long, kids, tickets at the gate. ~90 words. FAQPage schema stays on /faq only | All questions |
| 9 | **About** (new) | *About the haunt* | The owner's welcome paragraph, verbatim ("South Carolina's premier destination for pure terror… Greenville County… since 2023… live actors…"). Set small in Caslon, two columns, heading left. Quiet. ~80 words | Read about the farm |
| 10 | **Last word** | *Make it out alive.* | As v2, cast poster | Get tickets |

Removed from v2: the "At a glance" strip (folded into the hero billing block) and "Find us" (folded into Plan your night).

---

## Part 4 — Inner pages

Same components. Changes are copy and metadata, not layout, except where noted.

| Page | H1 | Title tag (≤60) | Notes |
|---|---|---|---|
| Home | Greenville County's most terrifying haunted trail. | `Haunted Trail Near Greenville, SC \| Hopkins Haunted Attraction` | Description ≤155 with *Simpsonville*, *30 min from Greenville*, dates, from $15 |
| Tickets | Tickets and 2026 dates | `Tickets & 2026 Dates \| Hopkins Haunted Attraction` | Add "Halloween weekend sells out" line. Events schema stays here |
| About | The haunt | `About the Haunt: a Haunted Farm in Simpsonville, SC` | Owner's four SEO headings stay as H2s. Add VideoObject |
| Characters | The characters | `The Characters \| Hopkins Haunted Attraction` | As is |
| FAQ | Questions | `FAQ: Touch Pass, Kids, Parking \| Hopkins Haunted` | As is |
| Contact | Directions and contact | `Directions & Contact \| Hopkins Haunted, Simpsonville SC` | New **Drive times** list (same data as home). Local-search page |
| Join the crew | Join the Haunt Crew | `Scare Actor Jobs in Greenville County \| Join the Haunt Crew` | Owner's jobs copy stays. Title shortened |
| Blog | Blog | `Blog \| Hopkins Haunted Attraction` | Fix the empty description on "Join the Chilling Story" |

Drive times are pulled from Google Maps at build time and stored once in `site.ts` (`driveTimes`), used by home and contact. Rounded to 5 minutes, worded "about".

---

## Part 5 — Technical SEO

Done in code, all on this branch:

- **Visible H1 on every page.** Home H1 moves into the hero. No more `sr-only` headings.
- **Titles keyword-first where a generic search matters** (home, contact, crew). Brand-first elsewhere. All ≤60 characters.
- **Descriptions ≤155 characters** on every page, each with the city and one search term.
- **Schema additions** in `src/lib/jsonld.ts`:
  - LocalBusiness: `openingHoursSpecification` per night (validFrom/validThrough), `hasMap`, `areaServed` (Greenville, Simpsonville, Mauldin, Fountain Inn, Greer, Spartanburg, Anderson), `image` as a list of the real photos, `slogan`, `publicAccess`.
  - `VideoObject` for the trailer (home + about): name, description, thumbnail, upload date, duration, content URL.
  - Event: `doorTime`, `performer`, real photo images. Already per night with per-pass offers.
  - `WebSite` with site name (helps Google show the right name in results).
  - `aggregateRating` only if the client gives us the real Google review count and score. Never invented.
- **Alt text** on every real photo describes what's in it and where (e.g. "Scare actor with a chainsaw on the Hopkins Haunted Attraction trail in Simpsonville, SC"). Decorative overlays stay empty.
- **Internal links** use descriptive anchors: "tickets and 2026 dates", "directions to the farm", "the characters". Footer gets a "Plan your visit" column (Tickets & dates, Directions, FAQ, Know before you go).
- **Sitemap** uses real last-modified dates per page instead of build time.
- **Search Console + Bing verification** meta tags wired to env vars, so the client's tokens can be added without a code change.
- **OG image** regenerated from the new hero (H1 on the poster still), so shares match the site.
- Speed: unchanged. Poster is the LCP image, video loads after `load`, phones skip the video.

---

## Part 6 — Content (blog)

Four posts, 600–900 words each, owner's voice, real photos. Each targets a question people actually type. I draft, the client reviews before publish.

1. **Haunted trail vs. haunted house: what to expect at Hopkins** — *haunted trail near me*, *what is a haunted trail*
2. **Is Hopkins Haunted Attraction too scary for kids?** — *haunted house for kids Greenville SC*, *family Halloween events Simpsonville*
3. **What to wear and bring to a haunted trail in October** — *what to wear haunted trail*
4. **Halloween 2026 near Greenville, SC: dates, hours and how to skip the line** — *Halloween events Greenville SC 2026*, *haunted houses near Greenville*

Not in this branch, but in scope once the design is approved.

---

## Part 7 — Off-site (the part code can't do)

This is what actually moves "near me" rankings. A checklist for the client:

- **Google Business Profile**: claim/verify, category *Haunted house*, hours set per show night, the real photos, a review link, Event posts each week of the season. This matters more than anything on the site.
- **Google Search Console**: verify the new site, submit `sitemap.xml`, check the old Wix property for the URLs that had traffic.
- **Bing Webmaster Tools**: same.
- **Haunt directories** (free listings, real backlinks): HauntWorld, The Scare Factor, Haunted House Ratings, FrightFind, HauntedHouses.com, Haunted Attraction Association.
- **Local listings** every September: GVLtoday, Greenville Journal fall guide, Kidding Around Greenville, Upstate Parent, City of Simpsonville events, Facebook Events.
- **YouTube**: upload the trailer with a link back to the site (video results are their own ranking surface).
- **Name, address, phone** identical everywhere: "Hopkins Haunted Attraction, 3717 Fork Shoals Rd., Simpsonville, SC 29680, (864) 243-4010".

---

## Build order

1. Hero + billing block (new `Hero.tsx`, `BillingBlock.tsx`; delete `Glance.tsx`).
2. Home sections: trail copy, passes heading, characters heading, slim crew, `PlanYourNight.tsx`, `HomeFaq.tsx`, `AboutBlock.tsx`; delete `FindUs.tsx`.
3. `site.ts`: `driveTimes`, `sellsOutLine`, per-page `lastModified`.
4. Metadata pass on all eight pages. Schema additions. Alt text pass. Footer column.
5. Contact page drive times. About/tickets tweaks.
6. Screenshots desktop + phone, `tsc`, `next build`, Lighthouse SEO 100 / Performance ≥ 90 on home.
7. Commit, push, PR to `main`.

## History

- **v1** (main): first build. Rejected: busy, text-heavy, compact, small logo, stub-style passes.
- **v2** (`redesign-v2`, bc500c7): poster type, roomy layout, real photos, flat pass tiles. Accepted as the direction.
- **v3** (this plan): hero without the logo, search-first copy and metadata, plan-your-night and FAQ on the home page.
