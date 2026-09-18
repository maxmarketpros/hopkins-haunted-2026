# Hopkins Haunted Attraction — 2026 Website Plan (v2, multi-page)

**Replaces:** https://www.hopkinshauntedattraction.com/ (Wix, owner-built) — same domain, new site
**Stack:** Next.js 16 (App Router, TypeScript, static export) + Tailwind CSS v4 + MDX blog
**Host:** Netlify (static deploy, Netlify Image CDN, redirects from every old URL)
**Scope:** 8 pages + blog (4 migrated posts), one video, 26 migrated images, 8 new photo-real generated images, dark "night on the farm" design system
**Crawled:** 2026-09-18 — all 6 pages, blog index, 4 posts, 3 sitemaps

---

## 1. What is wrong with the current site (and what this plan fixes)

The owner built it herself in Wix. The content is good; the structure is not. These are the specific problems the new site corrects:

| Problem on the current site | Fix |
|---|---|
| A whole page for one 4:3 video ("Trailer") | Trailer lives on About and Home; no standalone page |
| Dates, hours and prices are buried at the bottom of the home page, under ~600 words | Dedicated **Tickets & Dates** page; dates + prices also in the top strip and the home page |
| The Kids Pass description on Home is the FAQ answer pasted in verbatim | Each piece of copy lives once; pages link to each other |
| Five of six pages share the exact same `<title>` and meta description | Unique title, description, OG image and JSON-LD per page |
| Nav typo "Frequant Questions"; heading "FREQUENT ASKED QUESTIONS" | Fixed |
| Characters page is names only, no layout, no info | Full **Characters** page with a portrait grid, per-character detail views with shareable URLs |
| About page is 5 SEO paragraphs with no imagery | Rewritten flow (same words, better order) with photography, trailer, and a "how the night unfolds" sequence |
| Same looping video runs behind the nav on every page, with a banner that repeats the logo | Video is used purposefully: hero loop on Home, cinema player on About |
| Join the Crew has a flyer image with a past tryout date (July 25) as its only structured info | All crew copy transcribed into real text; date removed; "what to expect" kept |
| Blog posts have no covers on the index, no related posts, no next/prev, generic AI stock art | Proper blog index, post template with reading width, next/prev, author, RSS |
| No structured data, no sitemap discipline, no 404 page | Event, FAQPage, BlogPosting, TouristAttraction schema; sitemap; themed 404 |
| Hotlinked Wix media | Everything self-hosted and optimized |

---

## 2. Site map (new information architecture)

```
/                    Home — hero video, tonight-at-a-glance, what it is, passes, cast teaser, trailer, FAQ teaser, crew teaser, find us
/tickets             Tickets & Dates — 9 nights, hours, 4 passes, parking, on-site booth, know-before-you-buy → Fearticket
/about               About the Haunt — the trail, the farm, cinematic storytelling, trailer, Touch Pass, since 2023
/characters          Characters — all 8, portrait grid with flashlight reveal
/characters/[slug]   One character — full-bleed portrait + details (opens as an overlay from the grid, real page on direct visit)
/faq                 FAQ — 7 questions + "Know before you go"
/join-the-crew       Join the Haunt Crew — all recruitment copy, roles, tryouts, apply
/blog                Blog index — 4 posts
/blog/[slug]         Post
/blog/feed.xml       RSS
/contact             Contact & Directions — address, phone, email, Google Maps embed, hours, socials, optional message form
/404                 Themed not-found page
```

**Primary nav (all pages):** Tickets · About · Characters · FAQ · Join the Crew · Blog · **[Get tickets]**
**Utility strip above nav:** `OCT 16 – NOV 1 · 7:30 PM – MIDNIGHT · SIMPSONVILLE, SC · Directions` (mono, lantern gold; collapses on scroll)
**Footer (all pages):** logo, one-line description, nav links, Contact, address/phone/email, socials, "© 2026 Hopkins Haunted Attraction. Sinister Woods, 1800s. All rights reserved."
**Mobile:** full-screen menu; sticky bottom bar with **Get tickets** + **Directions** on every page except Contact.

### Redirects from every old URL (301, in `netlify.toml`)
| Old (Wix) | New |
|---|---|
| `/about-hopkins-haunted-attraction` | `/about` |
| `/hopkins-haunted-attraction-trailer` | `/about#trailer` |
| `/frequently-asked-questions` | `/faq` |
| `/entertainment-jobs-in-greenville-county` | `/join-the-crew` |
| `/hopkins-haunted-attraction-characters` | `/characters` |
| `/post/:slug` | `/blog/:slug` (same four slugs kept) |
| `/blog/categories/*`, `/blog/tags/*` | `/blog` |
| `hopkinshauntedattraction.com` (apex) | `www.hopkinshauntedattraction.com` (canonical stays `www`, matching what Google has indexed) |
| `hopkinshauntedhayride.com` (old 2025 domain, optional) | `www.hopkinshauntedattraction.com` as a Netlify domain alias |

---

## 3. Content inventory (everything from the current site, verbatim)

### 3.1 Copy by destination page

**Home**
- H1 (from old home): *The Most Terrifying Haunted Attraction in Greenville County, SC*
- Intro paragraph: *Welcome to Hopkins Haunted Attraction, South Carolina's premier destination for pure terror. Located right here in Greenville County, our immersive nightmare experience has been pushing the limits of fear since 2023. Whether you are a horror fanatic or just looking for the ultimate weekend thrill, our live actors, bone-chilling sets, and relentless scares will test your survival instincts. Do you have what it takes to make it out alive?*
- Short version of "This is no ordinary haunted trail" (two paragraphs) with a link to About
- Buttons: **Purchase tickets** (old label kept as "Get tickets" in nav; "Purchase tickets" on buttons where the old site used it), **See trailer**

**Tickets & Dates**
- 2026 season dates: **October 16–17 · October 23–25 · October 29–31 · November 1** (9 nights)
- Hours: *7:30 PM – Midnight Each Night*
- Passes (verbatim):
  - **HAUNT PASS – $25** — *Walk the trail for the ultimate thrill—more scares, closer encounters, and a fully immersive haunted adventure.*
  - **HAUNT TOUCH PASS – $30** — *For those who want the ultimate thrill, the Touch Pass unlocks a more immersive level of fear. By purchasing this add-on, you are permitting actors to touch you in a safe but startling way.*
  - **HAUNT KIDS 10 & UNDER PASS – $15** — *For our younger thrill-seekers! This ticket is available for children ages 10 and under to experience the Hopkins Haunted Attraction trail. Please keep in mind that this is a PG-13 haunted attraction designed to scare. The trail includes live scare actors, darkness, loud noises, flashing lights, fog effects, frightening scenes, and sudden scares. Parental discretion is strongly advised. All children must be accompanied by a responsible adult while experiencing the attraction. Please consider your child's comfort level with scary environments before purchasing. Think they're brave enough for the woods? There's only one way to find out.*
  - **VIP PARKING PASS – $10** — *Skip the general parking area and park closer to the entrance of Hopkins Haunted Attraction with a VIP Parking Pass! Your $10 VIP Parking Pass is valid for one vehicle and provides access to our designated VIP parking area for a quicker, more convenient arrival and exit.*
- From FAQ: tickets sold at the on-site booth; buy online to skip the line; VIP parking is bought with tickets; handicap parking available; no coolers, food and drink vendors each night
- From About: *Tickets often sell out fast, so we highly encourage early reservations.*

**About the Haunt**
- H: *THIS IS NO ORDINARY HAUNTED TRAIL*
- *As creators of some of the most intense scares in the Upstate, we invite you to step into the sinister woods of the 1800s.*
- *Located in Simpsonville, South Carolina, Hopkins Haunted Attraction is not your typical fall festival or family farm hayride. This is a fully immersive horror experience where the deeper you venture into the woods, the closer you get to the nightmare.*
- *At Hopkins, you don't just watch the story unfold—you become part of it.*
- *Make your way through approximately 30 minutes of haunted trails, terrifying scenes, and unexpected encounters lurking deep within the darkness. Stay alert, watch your surroundings, and whatever you do… don't assume you're alone.*
- *Want to take the terror to the next level? This year, we're offering a Touch Pass option for guests who want an even more intense and interactive experience. By choosing the Touch Pass, you're permitting our creatures to get a little closer, making your journey through the darkness even more terrifying.*
- *Step into the nightmare and experience the terror for yourself.*
- Old About page, all four sections verbatim: *Discover Premier Halloween Entertainment in Greenville County* · *Cinematic Storytelling on a Historic Farm* · *A Staple of Upstate Fall Culture* · *Plan Your Night of Terror* (full text captured in the crawl; reordered on the page so the farm story comes first and "plan your night" is last, next to the tickets CTA)
- Trailer (the video) with the "SEE TRAILER" call-to-action from the old home

**Characters**
- H: *Get to Know the Main Characters* (used as the page intro line)
- Tip Toes · Jester · Bobby the Butcher · Ashes · Slasher · Schizo · Jolly · Trouble — names only on the current site. Each gets an editable `descriptor` and `spottedAt` field in the content file, drafted from the photos and clearly marked for the owner to rewrite. ⚠️ See open questions.

**FAQ (7, verbatim)**
1. Do the Actors touch you? — *Actors will only touch you if you purchase the "Touch Pass"*
2. How long is it to walk the trail? — *Typically, it takes 30 minutes to walk. It all depends on how fast you and your group walk.*
3. Is this Haunted Attraction too scary for children? — *(the PG-13 paragraph above)*
4. Can I purchase tickets at the event? — *Yes, there is a ticket booth on site to purchase tickets. However, you can skip the line and purchase your tickets online.*
5. Can we park close to the event? — *Yes, we have VIP parking available for $10 per car. You can purchase VIP parking online when buying tickets.*
6. Is there handicap parking? — *Yes*
7. Can I bring a cooler? — *No, there will be food & drink vendors selling at the event each night.*
- "Know before you go" checklist (drawn from the site + blog posts): buy online to skip the line · arrive early on weekends · about 30 minutes on foot, uneven wooded terrain, wear closed shoes · dress in layers · PG-13, sudden scares, fog and strobe · kids 10 and under with an adult · no coolers, vendors on site · VIP and handicap parking

**Join the Haunt Crew (all of it, verbatim)**
- H: *Join the Haunt Crew*
- *Do you have a passion for acting and a love for everything creepy? Hopkins Haunted Attraction is the premier entertainment destination in Greenville County, South Carolina, and we are looking for the next generation of fear inducers to join our elite Haunt Crew. This is your chance to work with a team of professional makeup artists, set designers, and fellow performers in a cinematic horror experience. Whether you aspire to be a scare actor, a monster handler, or a makeup maestro, we offer a unique platform to hone your skills and terrify thousands of visitors. Join a community of creative individuals dedicated to delivering unforgettable chills in the Upstate. Your nightmare job is here, so do not wait, apply now.*
- Pull quote: *If You Have A Passion For Acting And A Love For All Things Creepy, We Want YOU On Our Team!*
- H: *Premier Seasonal Entertainment Jobs in Greenville County*
- *When you join the team at Hopkins Haunted Attraction in Simpsonville, you are stepping into one of the most rewarding seasonal jobs in Greenville County, South Carolina. We pride ourselves on being a premier entertainment destination. You will gain highly valuable, hands-on experience in theatrical performance, set design, and guest relations within a completely safe and supportive environment. Working on our farm is much more than just a temporary gig. It is a chance to build lasting friendships, develop unique professional skills, and be part of a highly trusted local organization dedicated to delivering an unforgettable entertainment experience to our community.*
- From the tryouts flyer (transcribed from the image): H: *Actor Recruitment & Tryouts* — *Hopkins Haunted Attraction is searching for energetic, dedicated, and fearless individuals to join our 2026 Scare Team! No experience is necessary—we'll teach you the skills you need to bring the nightmare to life. Attend our Scare Actor Tryouts to showcase your creativity, energy, and ability to terrify. Whether you're a seasoned scare actor or ready to step into the darkness for the first time, we want to see what you've got!* — **What to expect:** Come dressed comfortably · Participate in scare stations · Outdoor activities · Learn what it takes to be a Scare Actor — Location: 3717 Fork Shoals Rd., Simpsonville, SC 29680. The flyer's date (July 25 at 11:00 a.m.) has passed; the page shows "Next tryouts: date to be announced" until the owner supplies one.
- Roles named on the site: scare actor, monster handler, makeup artist. Page also mentions set design and guest relations (from the copy above).
- **APPLY NOW** → https://docs.google.com/forms/d/e/1FAIpQLSebeqHuFZSAHoX6PPnMaGSXXhxwLctFvSUT_IQ7yjARclgPaA/viewform
- Questions → hopkinshauntedattraction@gmail.com · (864) 243-4010
- Related post link: "Exciting Seasonal Entertainment Jobs in Greenville County…"

**Contact & Directions**
- 3717 Fork Shoals Rd., Simpsonville, SC 29680 · (864) 243-4010 · hopkinshauntedattraction@gmail.com
- Google Maps embed (keyless iframe) + **Get directions** link
- Hours during season; socials: Facebook, Instagram, TikTok
- Optional: short message form (Netlify Forms, honeypot) — name, email, message

### 3.2 Blog (4 posts, migrated verbatim into MDX; same slugs)
| Slug | Title | Author | Published | Read | Cover |
|---|---|---|---|---|---|
| `discover-simpsonville-s-1800s-haunted-adventure` | Discover Simpsonville's 1800s Haunted Adventure | Heather Cannon | 2026-04-07 (upd. 05-19) | 3 min | `536d0efe` (foggy farmhouse) + body image `1c41330b` (fog, gallows-like frame) |
| `experience-the-thrills-of-hopkins-haunted-attraction` | Experience the Thrills of Hopkins Haunted Attraction | Heather Cannon | 2026-04-07 (upd. 05-19) | 2 min | `39f1e9a9` (teal corridor) + body image `f5ae1ba0` (iron fence, 1536×2048 photo) |
| `join-the-chilling-story-at-hopkins-haunted-attraction` | Join the Chilling Story at Hopkins Haunted Attraction | Heather Cannon | 2026-04-07 (upd. 05-19) | 2 min | `c850d0e5` (corridor with "Haunted Attraction" sign) + body image `e2ccbd00` (green-lit figure, 4032×3024 photo) |
| `exciting-seasonal-entertainment-jobs-in-greenville-county-for-theatrical-students-and-enthusiastic-a` | Exciting Seasonal Entertainment Jobs in Greenville County for Theatrical Students and Enthusiastic Adults | Lucas Herman | 2026-04-22 | 3 min | `be680008` (Bobby the Butcher portrait) |

Full post bodies (headings, paragraphs, lists) are present in the saved Wix HTML and will be extracted by script into MDX, not retyped. ⚠️ Flags for the client: the "Experience the Thrills" post mentions a corn maze, which the attraction does not have; the jobs post mentions concessions staff and quotes "Sarah" and "John". Migrated as-is unless told otherwise.

### 3.3 Every external link
| Purpose | URL |
|---|---|
| Buy tickets (Fearticket) | https://hopkinshauntedattraction.fearticket.com |
| Apply to crew (Google Form) | https://docs.google.com/forms/d/e/1FAIpQLSebeqHuFZSAHoX6PPnMaGSXXhxwLctFvSUT_IQ7yjARclgPaA/viewform |
| Facebook | https://www.facebook.com/profile.php?id=61573071903049 |
| Instagram | https://www.instagram.com/hopkinshauntedattraction/ |
| TikTok | https://www.tiktok.com/@haunted_hopkins |
| Directions | https://www.google.com/maps/dir/?api=1&destination=3717+Fork+Shoals+Rd,+Simpsonville,+SC+29680 |
| Map embed | `https://www.google.com/maps?q=3717+Fork+Shoals+Rd,+Simpsonville,+SC+29680&output=embed` (no API key) |
| Phone / Email | `tel:8642434010` · `mailto:hopkinshauntedattraction@gmail.com` |

### 3.4 Video (one file on the whole site; no YouTube/Vimeo anywhere)
- Wix ID `30eebb_df547e4c42e845c596d57355420dbecb`, renditions 360p/480p/720p; 720p = 960×720 (4:3), 11.0 MB, has audio. Poster `df547e4c…f000.jpg`.
- Old use: muted loop behind the header on every page + the "Trailer" page player.
- New use: **Home hero loop** (muted, cropped to 16:9, re-encoded ≈3 MB MP4 + WebM, poster) and **About "Trailer" cinema player** (original quality, sound, controls, loads on play). Home also has a "See trailer" button that jumps to `/about#trailer`.

### 3.5 Images (26 originals downloaded at full resolution)
**Brand:** `d6dc1dfd` main logo 2000×750 transparent (the one you specified) · `64c9ea94` round handprint mark 500×500 (favicon, nav mark) · `4cdb1dd9` red tree + gold wordmark 835×356 (footer)
**Site photos/graphics:** `296fe717` wide banner 1999×571 · `d37e45b6` five-character poster 1086×1448 · `7b97bed7` rocking-chair doll octagon 500×500 · `1b03264e` "Join the Haunt Crew" 1800×1200 · `afbf2cc9` crew strip 1500×300 · `95e885c7` tryouts flyer 900×600 (text transcribed; image not used) · `6d350fe7` banner with vendor credit 1500×600 (not used) · `abd6768a` small OG banner (not used) · `df547e4c` video poster 960×720
**Cast (8):** `b724fbcb` Tip Toes · `3a699f76` Jester · `be680008` Bobby the Butcher · `c0ec9a23` Ashes · `f9e1cf2e` Slasher · `d09b2c42` Schizo (542×819, the only small one) · `ec760ea7` Jolly · `7526c5b8` Trouble (all 900×1200 except Schizo)
**Blog (6):** listed in 3.2

All are re-encoded to WebP/AVIF at sane sizes by script; nothing is hot-linked to Wix.

---

## 4. Design system — "Night on the Farm"

### 4.1 Subject, audience, job
A 30-minute walk-through haunted trail in 1800s farm woods, Simpsonville SC, with a named cast. Audience: 16–35 Upstate thrill-seekers on phones deciding which night and which pass; parents of brave kids; would-be scare actors. Each page has one job; the site's job is **Get tickets**.

### 4.2 What "dark mode haunted, but more thought out" means here
The current site is black with red and olive text. It has atmosphere in its photography and none in its layout. The new system treats darkness as *layered light*, not a flat black background:

1. **Three depths of dark.** `pine` ground → `bark` surfaces → `soot` recesses. Everything sits in a depth, so cards, nav and footer read as objects in a dark space rather than boxes on black.
2. **Two light sources, used on purpose.** *Fog* (cool teal, lifted from the brand's own photo grade) washes section seams and photo edges. *Lantern* (warm gold) exists only around prices, dates and the Get-tickets button — the warmest, brightest thing on any page is always the way to buy.
3. **Film grain.** One fixed SVG-noise layer at 5% opacity over the whole page. Ties every page to the video's texture; costs nothing.
4. **Vignetted photography.** Every photo gets a soft inset shadow so its edges fall into the ground; no bright rectangles floating on black.
5. **Trail blazes.** Every section eyebrow is a small painted red blaze (the mark hikers follow on trees) + a mono label. It's the sitewide structural device and it is literally what a trail is made of.
6. **Restraint.** No flicker, glitch, dripping-text effects, fog GIFs, cursor trails or spider webs. The brand's dripping brush lettering appears once per page: in the logo.

### 4.3 Tokens (`globals.css` → Tailwind v4 `@theme`)
**Color**
| Token | Hex | Role |
|---|---|---|
| `pine` | `#0A0C0B` | Page ground |
| `bark` | `#161A18` | Raised surfaces: cards, nav on scroll, footer |
| `soot` | `#070908` | Recesses: video frame, dossier overlay, code/stub backs |
| `line` | `rgba(237,230,214,.12)` | Hairlines |
| `fog` | `#2F6F6A` | Cool light: seams, glows, hover, link underline |
| `fog-deep` | `#173B38` | Fog gradient base |
| `bone` | `#EDE6D6` | Text; `bone/70` secondary; `bone/45` meta |
| `blaze` | `#C4261D` | Blazes, primary button, handprint red; `blaze-deep #7A1610` hover |
| `lantern` | `#C9A24A` | Dates, prices, mono labels, focus rings; `lantern/15` glow |

Contrast: bone/pine 15:1 · lantern/pine 8:1 · bone on blaze 5.3:1 (buttons ≥16px 600).

**Type** (`next/font/google`, self-hosted at build, `display: swap`)
| Role | Face | Rules |
|---|---|---|
| Display | **Rye** 400 | Page and section headlines only, uppercase, never under 32px, `leading-[0.95]`, `tracking-[0.01em]`. 1800s wood-type handbill: right for a cast of clowns, a jester and a butcher on a historic farm. Fallback if it reads "saloon" on the first screenshot: **Alfa Slab One**. |
| Body | **Libre Caslon Text** 400/400i/700 | 17–19px, `leading-[1.65]`, max measure 68ch. Period serif; continuous with the old nav. |
| Utility | **IBM Plex Mono** 400/500 | 12–14px, uppercase, `tracking-[0.14em]`: blazes, dates, prices, strip, captions, footer meta |

Scale: `display-xl` 72/56/44 · `display-lg` 56/44/36 · `display-md` 40/34/30 · `h3` Caslon 700 26/22 · body 18/17 · small 15 · mono 13.

**Layout**
- Container 1200px; gutters 16/32/48px.
- Page hero pattern (all inner pages): full-bleed image or video, 60–70vh, blaze + mono kicker, Rye headline, one Caslon sentence, one or two actions, fog seam into the first section.
- Sections `py-20` mobile / `py-28` desktop. Alternating 7/5 media splits. Cards `bark` on `pine`, 2px radius (wood-type era, not pill UI), `line` border, vignette on images.
- Buttons: primary = `blaze` fill, bone text, lantern glow behind (`box-shadow 0 0 40px lantern/15`); secondary = `line` border, bone text, fog fill on hover; both mono uppercase.

**Motion**
- Page load: 600ms fade from `soot`; hero media fades in; headline rises 12px. Once.
- Scroll: sections fade-up 16px once at 20% visibility; Home only: the trail line draws down the left rail.
- Hover: buttons brighten glow; cards lift 2px; cast portraits flashlight-reveal.
- Reduced motion: no autoplay video (poster), no reveals, no draw.

### 4.4 Signature moments (one per page; everything else stays quiet)
| Page | The one memorable thing |
|---|---|
| Home | Hero video with the logo, then the **trail line** that draws down the page and ties the sections together like a route |
| Tickets | Passes as **ticket stubs**: perforated tear line, mono serial "HHA-2026", price in the stub end. Nine nights as a **calendar strip** grouped by weekend, tonight highlighted during the season |
| About | The trailer in a **cinema frame** (letterboxed in `soot`, "SINCE 2023" as a film-leader mark) and **How the night unfolds** — Arrive · Enter · Survive, in order because the order is real |
| Characters | **Flashlight grid**: portraits sit at 35% until the cursor (or a tap) sweeps a warm circle across them. Opening one slides in a **dossier** overlay with the full portrait and details, and the URL becomes `/characters/slasher` (shareable, and a real page when visited directly) |
| FAQ | Quiet by design. Native accordions; the **Know before you go** card styled like a trailhead notice board |
| Join the Crew | The **call sheet**: tryout info laid out like a film production call sheet (roles, what to expect, location, "Next tryouts: TBA"), with APPLY NOW as the only red on the page |
| Blog | Post pages with a 68ch measure, Caslon drop cap, mono dateline, cover with vignette; index as a two-column ledger |
| Contact | **Dark map**: the Google embed sits in a `soot` frame with a CSS filter that turns the map night-toned to match the site; "Open in Google Maps" always available. Hours, address, phone, socials in a mono block beside it |
| 404 | "You wandered off the trail." One blaze, one link home, one generated woods image |

### 4.5 Wireframes

**Home**
```
┌ OCT 16 – NOV 1 · 7:30 PM – MIDNIGHT · SIMPSONVILLE, SC · Directions ───────────┐  strip
├ (mark)  Tickets  About  Characters  FAQ  Join the Crew  Blog        [GET TICKETS] ┤  nav
│                                                                                  │
│      ░░░ hero video loop (muted, 16:9 crop, fog-tinted) ░░░                      │
│                    [ HOPKINS HAUNTED ATTRACTION logo ]                           │
│              The sinister woods of the 1800s · Simpsonville, SC                  │
│               [ PURCHASE TICKETS ]   [ ▶ See the trailer ]                       │
│ ~~~~~~~~~~~~~~~~~~~~~~~ fog seam ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ │
│ ■ TONIGHT        9 NIGHTS · OCT 16 → NOV 1 │ 7:30 PM – MIDNIGHT │ FROM $15  → /tickets │
│ ┆                                                                                │
│ ■ TRAIL · ~30 MIN   THIS IS NO ORDINARY HAUNTED TRAIL      [generated trail-night]│
│ ┆                   two paragraphs · Read about the haunt →                       │
│ ┆                                                                                │
│ ■ PASSES            [stub $25] [stub $30] [stub $15] [stub $10]   → Fearticket   │
│ ┆                                                                                │
│ ■ CAST · 8          [Tip Toes] [Jester] [Bobby] [Slasher]   Meet all eight →     │
│ ┆                                                                                │
│ ■ TRAILER           [ cinema frame, poster + play → /about#trailer or inline ]   │
│ ┆                                                                                │
│ ■ QUESTIONS         3 accordions · All questions →                               │
│ ┆                                                                                │
│ ■ CREW              pull quote · Apply now                                        │
│ ┆                                                                                │
│ ■ FIND US           address · hours · [dark map] · Directions                    │
├ footer ──────────────────────────────────────────────────────────────────────────┤
```

**Tickets & Dates**
```
│ hero: generated ticket-booth image · ■ SEASON 2026 · "NINE NIGHTS IN THE WOODS"   │
│ ┌──── OCT ────────────────────────────────┐ ┌── NOV ──┐                          │
│ │ 16 17 │ 23 24 25 │ 29 30 31 │            │ │  1      │  7:30 PM – MIDNIGHT       │
│ └─────────────────────────────────────────┘ └─────────┘  opening night in N days  │
│ ■ PASSES                                                                          │
│ ┌───────────────────┬──┐ ┌───────────────────┬──┐                                │
│ │ HAUNT PASS        │25│ │ HAUNT TOUCH PASS  │30│  stubs: perforation, serial,   │
│ │ description       │$ │ │ description (hand)│$ │  [Purchase] → Fearticket        │
│ └───────────────────┴──┘ └───────────────────┴──┘                                │
│ ┌ KIDS 10 & UNDER  15 ┐ ┌ VIP PARKING 10 ┐                                       │
│ ■ BEFORE YOU BUY    booth on site · skip the line online · PG-13 · parking · no coolers │
│ [ PURCHASE TICKETS ]                                                              │
```

**Characters**
```
│ hero: generated treeline-silhouette · ■ CAST · 8 OF THEM · "WHO'S WAITING IN THE WOODS" │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   dimmed portraits, flashlight on hover/tap      │
│ │      │ │      │ │      │ │      │   name in Rye under each, mono "spotted at"       │
│ └──────┘ └──────┘ └──────┘ └──────┘                                                  │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   click → dossier overlay (URL /characters/slug)  │
│ └──────┘ └──────┘ └──────┘ └──────┘                                                  │
│ ■ MEET THEM IN PERSON   [ PURCHASE TICKETS ]                                          │
```

### 4.6 Self-critique against the defaults
- Not "black + one neon accent": three-way palette drawn from the brand's own photo grade; the warm light is reserved for money.
- Not "horror font everywhere": one wood-type display, large and rare; a period serif body; the brand's brush lettering only in the logo.
- Not numbered sections: trail blazes, and sequences only where order is real (the night, the tryout steps).
- Not a fog GIF / flicker: grain and vignette, both static.
- Not a generic pricing table: ticket stubs, because the page is about buying a ticket to a farm haunt and the old site already reached for a ticket graphic — this does it properly.

---

## 5. Generated images (Codex imagegen, photo-realistic)

`/codex-image:generate` is ready (Node 22, Codex CLI 0.154, logged in, imagegen skill present; the plugin's status probe false-fails on a retired flag, the generate command itself works). Every prompt ends with the same grade: *"night, cool teal shadows, warm lantern highlights, fine film grain, shot on 35mm, shallow depth of field, photo-realistic, no people's faces, no text, no logos."* No gore, no real people. Each output is reviewed visually; anything illustrated, uncanny or off-grade is regenerated.

| # | File | Aspect | Subject | Used on |
|---|---|---|---|---|
| 1 | `trail-night.jpg` | 3:2 | Narrow dirt footpath through dense Southern pine and hardwood at night, low ground fog, one kerosene lantern on a post | Home trail section, About |
| 2 | `farm-barn-fog.jpg` | 16:9 | Weathered 1800s wooden barn on a Carolina farm, fog across the field, one window lit dim orange, moon behind cloud | About hero |
| 3 | `ticket-booth.jpg` | 21:9 | Rustic wooden ticket booth at a farm edge at dusk, string of bare bulbs, fog, a line of silhouettes | Tickets hero |
| 4 | `treeline-silhouette.jpg` | 21:9 | Tree line at the edge of a field at night, fog, a single distant standing figure with no visible face | Characters hero |
| 5 | `makeup-backstage.jpg` | 3:2 | Backstage makeup station in a barn: bulb-lit mirror, brushes, latex, a performer's shoulder and gloved artist hands, faces out of frame | Join the Crew hero |
| 6 | `rocking-chair-porch.jpg` | 4:5 | Empty rocking chair on an old farmhouse porch at night, fog, moonlight | FAQ hero |
| 7 | `farm-lane-headlights.jpg` | 16:9 | Gravel farm lane at night, car headlights in fog, a hand-painted wooden arrow sign at the turn | Contact hero |
| 8 | `blaze-on-tree.jpg` | 1:1 | Close-up of a fresh red painted trail blaze on pine bark, fog behind | 404 page, blog index header, small dividers |
| — | `og/*.jpg` (composited with `sharp`, not generated) | 1200×630 | Logo + page title over a darkened crop of the page's hero image | Social share, one per page |

Minimum delivered: 4. Planned: 8.

---

## 6. Technical plan

### 6.1 Why static export on Netlify
Nothing on this site needs a server: no auth, no dynamic data, no API. So the build is `next build` with `output: 'export'`, and Netlify serves plain files from `out/`. Benefits: no dependency on the Netlify Next runtime's support for Next 16, instant cold loads, trivial rollbacks, and Netlify Forms works because the form markup is in the HTML. Images still get on-demand optimization by pointing `next/image` at the **Netlify Image CDN** through a custom loader (`/.netlify/images?url=…&w=…&q=…`), so we keep `<Image>` ergonomics without a Node runtime. Local dev runs `netlify dev`, which emulates the Image CDN.

### 6.2 Scaffold
```
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
npm i @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time sharp
```
Next 16.3 / Tailwind 4.3 (current on npm). Node 22.15, ffmpeg 8, Netlify CLI 26, git, gh are installed locally.

### 6.3 Repo layout
```
├─ PLAN.md · README.md
├─ netlify.toml                 build (npm run build → out/), redirects (§2), headers (video/immutable, security), [images] remote_images not needed
├─ next.config.ts               output:'export', trailingSlash:true, images.loader:'custom' + loaderFile, mdx pageExtensions
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx             fonts, Grain, SeasonStrip, Nav, Footer, MobileCtaBar, sitewide JSON-LD, skip link
│  │  ├─ page.tsx               Home
│  │  ├─ tickets/page.tsx · about/page.tsx · faq/page.tsx · join-the-crew/page.tsx · contact/page.tsx
│  │  ├─ characters/page.tsx · characters/[slug]/page.tsx
│  │  ├─ @modal/default.tsx · @modal/(.)characters/[slug]/page.tsx   (intercepting route → dossier overlay; falls back to a client dialog + pushState if export disagrees)
│  │  ├─ blog/page.tsx · blog/[slug]/page.tsx · blog/feed.xml/route.ts (force-static)
│  │  ├─ not-found.tsx · sitemap.ts · robots.ts · icon.png · apple-icon.png
│  │  └─ (each route) opengraph-image.tsx  → generated at build
│  ├─ content/site.ts           ONE typed file: season nights, hours, passes, cast, faq, crew, contact, links, page copy
│  ├─ components/
│  │  ├─ chrome/   Nav · SeasonStrip · Footer · MobileCtaBar · Grain · SkipLink
│  │  ├─ system/   Blaze · Section · PageHero · Reveal · Button · Prose · Vignette
│  │  ├─ home/     HeroVideo · TrailSpine · Tonight · PassesPreview · CastTeaser · FaqTeaser · CrewTeaser · FindUs
│  │  ├─ tickets/  DateGrid · Countdown · PassStub · BeforeYouBuy
│  │  ├─ about/    TrailerFrame · NightUnfolds · FarmStory · TouchPass
│  │  ├─ cast/     CastGrid · CastCard (flashlight) · Dossier
│  │  ├─ faq/      FaqList · TrailheadNotice
│  │  ├─ crew/     CallSheet · Roles · ApplyCta
│  │  ├─ blog/     PostCard · PostHeader · PostNav · Byline
│  │  └─ contact/  DarkMap · ContactBlock · MessageForm (Netlify Forms + honeypot)
│  └─ lib/         jsonld.ts · dates.ts (America/New_York) · mdx.ts · image-loader.ts · og.ts
├─ content/blog/*.mdx           4 migrated posts (frontmatter: title, slug, date, updated, author, readTime, cover, excerpt, description)
├─ public/
│  ├─ brand/       logo.png · handprint-mark.png · tree-wordmark.png
│  ├─ images/site/ · images/cast/ · images/blog/ · images/generated/ · og/
│  └─ video/       hero-loop.mp4 · hero-loop.webm · hero-poster.jpg · trailer.mp4
└─ scripts/
   ├─ fetch-assets.mjs          re-downloads the 26 Wix originals + 720p video into raw/ (gitignored)
   ├─ optimize-images.mjs       sharp → WebP/AVIF, sized variants, metadata stripped
   ├─ transcode-video.ps1       ffmpeg (§6.5)
   ├─ extract-blog.mjs          Wix HTML → MDX with frontmatter, image refs rewritten to /images/blog/
   └─ build-og.mjs              composites the per-page OG images
```

### 6.4 Content model
`site.ts` is the single source for anything the owner changes yearly: `season.nights[]` (ISO dates), `season.hours`, `passes[]`, `cast[]` (`slug, name, image, descriptor, spottedAt`), `faq[]`, `crew` (paragraphs, roles, tryouts, applyUrl), `contact`, `links`. Blog is MDX. README documents "how to change the dates, prices, add a character, add a post."

### 6.5 Video pipeline (ffmpeg)
- Hero loop: crop 4:3 → 16:9 around the Wix focal point (42.6%, 44.6%), 1280×720, no audio, H.264 CRF 28 `+faststart` and VP9 CRF 36; poster from ~2s. ≈3 MB each. `autoplay muted loop playsInline preload="metadata"`, `aria-hidden`; not autoplayed under `prefers-reduced-motion` or `Save-Data`.
- Trailer: original 720p MP4 as `trailer.mp4`, `preload="none"`, loads on play, native controls, sound on.
- `netlify.toml` header: `/video/*` → `Cache-Control: public, max-age=31536000, immutable`.

### 6.6 Images
Raw PNGs stay out of git. Script emits WebP (and AVIF for heroes) at 1600px max, cast at 900×1200 and 450×600, blog covers at 1344×768, so `public/` stays around 12 MB. `next/image` with the Netlify loader handles srcset; `sizes` set per placement; hero poster and logo `priority`.

### 6.7 SEO and structured data
- Unique `title`/`description`/OG per page (fixes the duplicate-title bug). Canonical `https://www.hopkinshauntedattraction.com/…`.
- JSON-LD: sitewide `TouristAttraction` (address, geo, phone, sameAs); `Event` ×9 (one per night, ET offsets, `offers` per pass with price + Fearticket URL) on Home and Tickets; `FAQPage` on FAQ; `BlogPosting` on posts; `BreadcrumbList` on inner pages.
- `sitemap.xml`, `robots.txt`, RSS at `/blog/feed.xml`.
- 301s for every old URL (§2) so nothing indexed since April is lost.

### 6.8 Accessibility and quality floor
Landmarks, skip link, one `h1` per page, logical headings, lantern focus rings, `<details>` FAQs, dossier overlay as a real `<dialog>` with focus trap and Escape, flashlight is enhancement only (names always visible), map iframe has a title and a text alternative, form has labels and a honeypot, reduced-motion respected, all tap targets ≥44px. Targets: Lighthouse mobile ≥90 perf, 100 a11y, 100 SEO on every route. Viewports checked: 360, 390, 768, 1024, 1440, 1920.

### 6.9 Netlify setup and DNS cutover from Wix
1. `netlify.toml`: `[build] command="npm run build" publish="out"`, redirects, headers, `[[plugins]]` none required.
2. Create the site (`netlify init` → GitHub repo → auto deploys; deploy previews on PRs).
3. Verify with `netlify build` locally and a `netlify deploy` preview URL before going live.
4. Domain: add `www.hopkinshauntedattraction.com` as primary and apex as redirect in Netlify. In Wix: unlock the domain / update DNS — `A @ 75.2.60.5`, `CNAME www <site>.netlify.app` (or move nameservers to Netlify DNS). SSL is automatic once DNS resolves. Keep the Wix site published until the new one answers on the domain, then cancel Wix.
5. Optional: add `hopkinshauntedhayride.com` as a domain alias that 301s to the new site.
6. No environment variables. Analytics slot in `layout.tsx` for GA4 / Meta Pixel IDs if supplied.

---

## 7. Build sequence

| Phase | Work | Checkpoint |
|---|---|---|
| 0 Init | git init, scaffold, `netlify.toml`, tokens, fonts, Grain, Nav/Strip/Footer/MobileCtaBar, 404 | Screenshot of the shell at 1440 and 390; Rye vs Alfa Slab decision |
| 1 Assets | fetch → optimize → transcode; generate 8 images and review each; composite OG images | Contact sheet of all final assets |
| 2 Home | Hero video, trail spine, all home sections | Screenshots, reduced-motion check |
| 3 Tickets + About | Date grid, countdown, stubs, before-you-buy; About flow, cinema trailer, night-unfolds | Screenshots |
| 4 Characters | Grid, flashlight, dossier overlay + direct routes for all 8 | Every `/characters/[slug]` renders standalone |
| 5 FAQ + Crew + Contact | Accordions, notice board; call sheet, roles, apply; dark map, contact block, form | Form submission test on a deploy preview |
| 6 Blog | Extract 4 posts to MDX, index, post template, next/prev, RSS | Diff each post against the Wix text |
| 7 SEO | Metadata per page, JSON-LD, sitemap/robots, redirects | Rich-results test on Home, Tickets, FAQ, a post |
| 8 QA + ship | Lighthouse on all routes, keyboard walk, link check, video on iOS Safari/Chrome/Firefox, `netlify build`, deploy preview, README, push to GitHub | Preview URL for your review, then DNS cutover checklist |

---

## 8. Open questions (with the assumption I'll build on if unanswered)

| Question | Assumption |
|---|---|
| Characters have no bios. Do you want short editable descriptors and a "spotted at" line per character, or names only? | Descriptors drafted from the photos, marked editable in `site.ts`; names and portraits carry the page either way. |
| Next tryout date for 2026? | "Next tryouts: to be announced" with the flyer copy and what-to-expect list. |
| Blog: keep the "corn maze" line and the "Sarah/John" quotes? | Migrated verbatim. |
| Contact message form via Netlify Forms (free, spam-filtered) — include? | Included, small, below the map. |
| The dark-filtered Google Map — OK, or plain default map? | Dark filter on, with an "Open in Google Maps" link. |
| Canonical host `www` (matches current indexing)? | Yes; apex redirects to `www`. |
| Redirect the old `hopkinshauntedhayride.com` here? | Prepared as an optional alias; needs DNS access to that domain. |
| Should the owner be able to add blog posts without a developer (git-based CMS at `/admin`)? | Not included; MDX in the repo. Can be added later with Decap CMS. |

---

## 9. Build notes (what changed from the plan during the build, 2026-09-18)

- **Display face is Alfa Slab One, not Rye.** Four candidates were rendered side by side on the real page (Rye, Alfa Slab One, Grenze Gotisch, Ultra). Rye read "Wild West saloon", Grenze read "metal band". Alfa Slab One keeps the 1800s handbill weight and stays legible at every size.
- **Character dossier is a `<dialog>` + History API, not intercepting routes.** Next.js does not support intercepting routes in static export. Opening a card pushes `/characters/<slug>/` onto history, Escape/Back/backdrop click restore `/characters/`, and each slug is also a real prerendered page for direct visits and sharing.
- **Blog migration reads the rendered article DOM.** Wix's JSON-LD `articleBody` is a flattened copy with no headings or lists, and one post had none at all. `scripts/extract-blog.mjs` converts the `article[data-hook="post"]` markup to Markdown and only falls back to `articleBody` if the DOM yields nothing. One post contained a literal `![…](https://example.com/…)` placeholder the owner had pasted; it is dropped.
- **The hero-bottom season strip was cut.** It duplicated the utility strip and the at-a-glance bar. The specific date groups now live in the at-a-glance bar next to the countdown.
- **Hero video overlay lightened** from 55% to 30% so the red-lit footage reads; the teal screen tint stays.
- **Nine nights group into three runs, not four.** Oct 29–Nov 1 is one consecutive run (Thu–Sun), so the date grid shows it as "Halloween weekend" with four tiles. The old site's "October 29–31 / November 1" wording is kept everywhere the dates are written out.
- **Post dates** are formatted as calendar dates (UTC) so "2026-04-07" never shows as April 6.
- **Verified locally:** `next build` exports 29 routes; `netlify serve` confirms all 301 redirects, Image CDN transforms, security headers and the contact form markup. Every external link returns 200. Each page has one `h1` and a unique title.
- **Hero video autoplay and loading.** React renders `muted` as a property only, so Chrome blocked autoplay on the production build. The `<video>` is now emitted as raw HTML with the `muted` attribute, and its sources are attached after the page `load` event so the poster paints first and the 3 MB loop never competes with the logo, fonts and JS. Posters are WebP.
- **Contrast.** Lighthouse flagged mono labels at 45–50% bone on pine (≈4:1). Secondary text now sits at 55–60% (≥5.4:1). The "Tonight" marker on the date grid is lantern gold instead of blaze red on dark.
