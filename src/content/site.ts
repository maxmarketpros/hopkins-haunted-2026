/**
 * Single source of truth for everything the owner changes season to season:
 * dates, hours, prices, characters, FAQ, crew copy, contact details and links.
 * Copy is kept verbatim from the 2026 site unless a comment says otherwise.
 */

export const site = {
  name: "Hopkins Haunted Attraction",
  shortName: "Hopkins Haunted",
  url: "https://www.hopkinshauntedattraction.com",
  tagline: "The sinister woods of the 1800s",
  description:
    "Hopkins Haunted Attraction is a 30-minute walk-through haunted trail on a historic farm in Simpsonville, SC. Live actors, cinematic sets and relentless scares in Greenville County every October.",
  since: 2023,
  footerLine: "Sinister Woods, 1800s.",
} as const;

export const contact = {
  phoneDisplay: "(864) 243-4010",
  phoneHref: "tel:8642434010",
  email: "hopkinshauntedattraction@gmail.com",
  address: {
    street: "3717 Fork Shoals Rd.",
    city: "Simpsonville",
    state: "SC",
    zip: "29680",
    full: "3717 Fork Shoals Rd., Simpsonville, SC 29680",
    lat: 34.6465,
    lng: -82.3195,
  },
} as const;

export const links = {
  tickets: "https://hopkinshauntedattraction.fearticket.com",
  apply:
    "https://docs.google.com/forms/d/e/1FAIpQLSebeqHuFZSAHoX6PPnMaGSXXhxwLctFvSUT_IQ7yjARclgPaA/viewform",
  facebook: "https://www.facebook.com/profile.php?id=61573071903049",
  instagram: "https://www.instagram.com/hopkinshauntedattraction/",
  tiktok: "https://www.tiktok.com/@haunted_hopkins",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=3717+Fork+Shoals+Rd,+Simpsonville,+SC+29680",
  mapEmbed:
    "https://www.google.com/maps?q=3717+Fork+Shoals+Rd,+Simpsonville,+SC+29680&z=14&output=embed",
} as const;

export const nav = [
  { href: "/tickets", label: "Tickets" },
  { href: "/about", label: "About" },
  { href: "/characters", label: "Characters" },
  { href: "/faq", label: "FAQ" },
  { href: "/join-the-crew", label: "Join the Crew" },
  { href: "/blog", label: "Blog" },
] as const;

/** 2026 season. Dates are local (America/New_York). */
export const season = {
  year: 2026,
  timeZone: "America/New_York",
  /** Each night the trail runs. Grouped by weekend in the UI. */
  nights: [
    "2026-10-16",
    "2026-10-17",
    "2026-10-23",
    "2026-10-24",
    "2026-10-25",
    "2026-10-29",
    "2026-10-30",
    "2026-10-31",
    "2026-11-01",
  ],
  opens: "19:30",
  closes: "24:00",
  hoursLine: "7:30 PM – Midnight Each Night",
  hoursShort: "7:30 PM – Midnight",
  rangeShort: "Oct 16 – Nov 1",
  /** Verbatim date groups as written on the old site. */
  dateGroups: ["October 16–17", "October 23–25", "October 29–31", "November 1"],
} as const;

export type Pass = {
  slug: string;
  name: string;
  price: number;
  kicker: string;
  /** Verbatim from the old site. */
  description: string;
  /** Extra verbatim paragraphs (Kids pass warning). */
  more?: string[];
  featured?: boolean;
};

export const passes: Pass[] = [
  {
    slug: "haunt-pass",
    name: "Haunt Pass",
    price: 25,
    kicker: "General admission",
    description:
      "Walk the trail for the ultimate thrill—more scares, closer encounters, and a fully immersive haunted adventure.",
    featured: true,
  },
  {
    slug: "touch-pass",
    name: "Haunt Touch Pass",
    price: 30,
    kicker: "They can touch you",
    description:
      "For those who want the ultimate thrill, the Touch Pass unlocks a more immersive level of fear. By purchasing this add-on, you are permitting actors to touch you in a safe but startling way.",
  },
  {
    slug: "kids-pass",
    name: "Haunt Kids 10 & Under Pass",
    price: 15,
    kicker: "Ages 10 and under",
    description:
      "For our younger thrill-seekers! This ticket is available for children ages 10 and under to experience the Hopkins Haunted Attraction trail.",
    more: [
      "Please keep in mind that this is a PG-13 haunted attraction designed to scare. The trail includes live scare actors, darkness, loud noises, flashing lights, fog effects, frightening scenes, and sudden scares. Parental discretion is strongly advised.",
      "All children must be accompanied by a responsible adult while experiencing the attraction. Please consider your child’s comfort level with scary environments before purchasing.",
      "Think they’re brave enough for the woods? There’s only one way to find out.",
    ],
  },
  {
    slug: "vip-parking",
    name: "VIP Parking Pass",
    price: 10,
    kicker: "Per vehicle",
    description:
      "Skip the general parking area and park closer to the entrance of Hopkins Haunted Attraction with a VIP Parking Pass!",
    more: [
      "Your $10 VIP Parking Pass is valid for one vehicle and provides access to our designated VIP parking area for a quicker, more convenient arrival and exit.",
    ],
  },
];

export type Character = {
  slug: string;
  name: string;
  image: string;
  width: number;
  height: number;
  /** EDITABLE — drafted from the photos; the old site had names only. */
  descriptor: string;
  /** EDITABLE — where on the trail guests tend to meet them. */
  spottedAt: string;
};

export const cast: Character[] = [
  {
    slug: "tip-toes",
    name: "Tip Toes",
    image: "/images/cast/tip-toes.webp",
    width: 900,
    height: 1200,
    descriptor: "You’ll hear the giggle before the door moves. By then the door has already moved.",
    spottedAt: "The cabin door",
  },
  {
    slug: "jester",
    name: "Jester",
    image: "/images/cast/jester.webp",
    width: 900,
    height: 1200,
    descriptor: "Bells, stripes, and a bat he swings for fun. Nobody else finds it funny.",
    spottedAt: "The clearing",
  },
  {
    slug: "bobby-the-butcher",
    name: "Bobby the Butcher",
    image: "/images/cast/bobby-the-butcher.webp",
    width: 900,
    height: 1200,
    descriptor: "Keeps the smokehouse. Doesn’t take questions about what’s hanging in it.",
    spottedAt: "The smokehouse",
  },
  {
    slug: "ashes",
    name: "Ashes",
    image: "/images/cast/ashes.webp",
    width: 900,
    height: 1200,
    descriptor: "Rides the back road after dark. If you can hear the engine, you’re already too close.",
    spottedAt: "The back road",
  },
  {
    slug: "slasher",
    name: "Slasher",
    image: "/images/cast/slasher.webp",
    width: 900,
    height: 1200,
    descriptor: "Top hat, bandana, chainsaw. The last thing most guests remember clearly.",
    spottedAt: "Deep woods",
  },
  {
    slug: "schizo",
    name: "Schizo",
    image: "/images/cast/schizo.webp",
    width: 542,
    height: 819,
    descriptor: "Never quite where you saw him last. Don’t blink, and don’t turn around.",
    spottedAt: "Anywhere",
  },
  {
    slug: "jolly",
    name: "Jolly",
    image: "/images/cast/jolly.webp",
    width: 900,
    height: 1200,
    descriptor: "Rocks on the porch with a doll that was never hers. She’d like you to stay awhile.",
    spottedAt: "The porch",
  },
  {
    slug: "trouble",
    name: "Trouble",
    image: "/images/cast/trouble.webp",
    width: 900,
    height: 1200,
    descriptor: "Torn shirt, wide grin, and a sign that says you should have turned back.",
    spottedAt: "The fence line",
  },
];

export const faq = [
  {
    q: "Do the actors touch you?",
    a: ["Actors will only touch you if you purchase the “Touch Pass”."],
  },
  {
    q: "How long is it to walk the trail?",
    a: ["Typically, it takes 30 minutes to walk. It all depends on how fast you and your group walk."],
  },
  {
    q: "Is this haunted attraction too scary for children?",
    a: [
      "For our younger thrill-seekers! This ticket is available for children ages 10 and under to experience the Hopkins Haunted Attraction trail.",
      "Please keep in mind that this is a PG-13 haunted attraction designed to scare. The trail includes live scare actors, darkness, loud noises, flashing lights, fog effects, frightening scenes, and sudden scares. Parental discretion is strongly advised.",
      "All children must be accompanied by a responsible adult while experiencing the attraction. Please consider your child’s comfort level with scary environments before purchasing.",
      "Think they’re brave enough for the woods? There’s only one way to find out.",
    ],
  },
  {
    q: "Can I purchase tickets at the event?",
    a: ["Yes, there is a ticket booth on site to purchase tickets. However, you can skip the line and purchase your tickets online."],
  },
  {
    q: "Can we park close to the event?",
    a: ["Yes, we have VIP parking available for $10 per car. You can purchase VIP parking online when buying tickets."],
  },
  {
    q: "Is there handicap parking?",
    a: ["Yes."],
  },
  {
    q: "Can I bring a cooler?",
    a: ["No, there will be food & drink vendors selling at the event each night."],
  },
] as const;

/** Trailhead notice: distilled from the FAQ, passes and blog posts. */
export const knowBeforeYouGo = [
  "Buy online to skip the ticket line. There is also a ticket booth on site.",
  "Arrive early on weekends; the line builds after dark.",
  "About 30 minutes on foot over uneven wooded ground. Wear closed shoes.",
  "Dress in layers. It gets cold in the trees after 9 PM.",
  "PG-13: live actors, darkness, fog, loud noises, flashing lights and sudden scares.",
  "Kids 10 and under need a Kids Pass and a responsible adult with them.",
  "No coolers. Food and drink vendors are open every night.",
  "General parking is free. VIP parking is $10 per car, bought with your tickets. Handicap parking is available.",
] as const;

export const crew = {
  heading: "Join the Haunt Crew",
  intro:
    "Do you have a passion for acting and a love for everything creepy? Hopkins Haunted Attraction is the premier entertainment destination in Greenville County, South Carolina, and we are looking for the next generation of fear inducers to join our elite Haunt Crew. This is your chance to work with a team of professional makeup artists, set designers, and fellow performers in a cinematic horror experience. Whether you aspire to be a scare actor, a monster handler, or a makeup maestro, we offer a unique platform to hone your skills and terrify thousands of visitors. Join a community of creative individuals dedicated to delivering unforgettable chills in the Upstate. Your nightmare job is here, so do not wait, apply now.",
  pullQuote:
    "If you have a passion for acting and a love for all things creepy, we want YOU on our team!",
  jobsHeading: "Premier Seasonal Entertainment Jobs in Greenville County",
  jobsBody:
    "When you join the team at Hopkins Haunted Attraction in Simpsonville, you are stepping into one of the most rewarding seasonal jobs in Greenville County, South Carolina. We pride ourselves on being a premier entertainment destination. You will gain highly valuable, hands-on experience in theatrical performance, set design, and guest relations within a completely safe and supportive environment. Working on our farm is much more than just a temporary gig. It is a chance to build lasting friendships, develop unique professional skills, and be part of a highly trusted local organization dedicated to delivering an unforgettable entertainment experience to our community.",
  roles: [
    {
      name: "Scare actor",
      blurb: "Bring a character to life on the trail. No experience necessary; we’ll teach you.",
    },
    {
      name: "Monster handler",
      blurb: "Keep the creatures, the scenes and the guests moving safely through the dark.",
    },
    {
      name: "Makeup artist",
      blurb: "Prosthetics, blood and grime. Turn the crew into the cast before the gates open.",
    },
    {
      name: "Set & guest crew",
      blurb: "Set design, parking, the ticket booth and guest relations. The night doesn’t run without you.",
    },
  ],
  tryouts: {
    heading: "Actor Recruitment & Tryouts",
    /** Verbatim from the tryouts flyer image. */
    body: "Hopkins Haunted Attraction is searching for energetic, dedicated, and fearless individuals to join our 2026 Scare Team! No experience is necessary—we’ll teach you the skills you need to bring the nightmare to life. Attend our Scare Actor Tryouts to showcase your creativity, energy, and ability to terrify. Whether you’re a seasoned scare actor or ready to step into the darkness for the first time, we want to see what you’ve got!",
    /** The July 25 tryouts have passed; set a string here when the next date is known. */
    nextDate: null as string | null,
    expect: [
      "Come dressed comfortably",
      "Participate in scare stations",
      "Outdoor activities",
      "Learn what it takes to be a Scare Actor",
    ],
  },
} as const;

/** Old About page, verbatim, reordered for the new page. */
export const aboutSections = {
  discover: {
    heading: "Discover Premier Halloween Entertainment in Greenville County",
    body: "If you are searching for the ultimate haunted attraction in Greenville County, South Carolina, you are stepping into a region steeped in chilling legends, eerie tales, and intense attractions that come alive every October - November. Greenville County is not just home to scenic hills and Southern charm. It is also a place where local lore and haunted history collide to create unforgettable fright experiences. Whether you are a thrill seeker craving a fast-paced maze, a family looking for spooky fun, or a history buff drawn to the ghostly past of the area, Hopkins Haunted Attraction offers something for everyone brave enough to face the shadows of our Simpsonville Haunted Attraction.",
  },
  cinematic: {
    heading: "Cinematic Storytelling on a Historic Farm",
    body: [
      "The entertainment at Hopkins Haunted Attraction goes far beyond your average scare destination. We have built a meticulously crafted world of horror right here on our farm that immerses visitors in cinematic level storytelling. As a proud local entertainment venue in Greenville County, we feature realistic sets, professional actors, and creative special effects that rival major movie productions. We offer unique twists on fear, moving from psychological terror to gruesome scenes straight out of your nightmares.",
      "Visitors constantly describe our haunted farm as an immersive experience that blends art, performance, and fear into one unforgettable night of entertainment. Beyond our staged frights, the haunted reputation of Greenville County stretches into real history. Centuries old estates, abandoned textile mills, and winding backroads carry ghost stories passed down through generations. Locals whisper about spectral figures seen in the Reedy River fog and eerie lights flickering in long forgotten barns just like ours.",
    ],
  },
  staple: {
    heading: "A Staple of Upstate Fall Culture",
    body: "Visiting Hopkins Haunted Attraction is more than a seasonal thrill. It is a premier entertainment experience for the whole community. The Upstate rallies around the Halloween spirit with pumpkin festivals, ghost tours, and local artisans selling horror themed crafts. Families enjoy the festive atmosphere by day, while the more daring venture out to our Simpsonville farm after dark to test their courage. We love turning the thrill of fear into a staple of local entertainment that brings people together and showcases the best of Greenville County.",
  },
  plan: {
    heading: "Plan Your Night of Terror",
    body: [
      "For those planning a visit, our haunted season typically begins in mid-October and runs through November 1st. Tickets often sell out fast, so we highly encourage early reservations. Whether you are a South Carolina local or traveling from nearby Georgia or North Carolina, our haunted attraction promises a hauntingly good time filled with screams, laughter, and stories you will retell for years.",
      "If you think you have experienced every haunted house worth visiting, think again. Hopkins Haunted Attraction delivers a rare combination of authentic Southern hospitality and intense horror that you will not find anywhere else. Gather your courage, bring a few brave friends, and prepare to face the darkness waiting around every corner.",
    ],
  },
} as const;

/** Old home page, verbatim. */
export const trailCopy = {
  h1: "The Most Terrifying Haunted Attraction in Greenville County, SC",
  welcome:
    "Welcome to Hopkins Haunted Attraction, South Carolina’s premier destination for pure terror. Located right here in Greenville County, our immersive nightmare experience has been pushing the limits of fear since 2023. Whether you are a horror fanatic or just looking for the ultimate weekend thrill, our live actors, bone-chilling sets, and relentless scares will test your survival instincts. Do you have what it takes to make it out alive?",
  heading: "This is no ordinary haunted trail",
  paragraphs: [
    "As creators of some of the most intense scares in the Upstate, we invite you to step into the sinister woods of the 1800s.",
    "Located in Simpsonville, South Carolina, Hopkins Haunted Attraction is not your typical fall festival or family farm hayride. This is a fully immersive horror experience where the deeper you venture into the woods, the closer you get to the nightmare.",
    "At Hopkins, you don’t just watch the story unfold—you become part of it.",
    "Make your way through approximately 30 minutes of haunted trails, terrifying scenes, and unexpected encounters lurking deep within the darkness. Stay alert, watch your surroundings, and whatever you do… don’t assume you’re alone.",
  ],
  touchPass:
    "Want to take the terror to the next level? This year, we’re offering a Touch Pass option for guests who want an even more intense and interactive experience. By choosing the Touch Pass, you’re permitting our creatures to get a little closer, making your journey through the darkness even more terrifying.",
  closing: "Step into the nightmare and experience the terror for yourself.",
} as const;
