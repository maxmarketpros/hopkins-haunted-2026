import { createElement } from "react";
import { areaServed, cast, contact, faq, links, passes, season, site, trailer } from "@/content/site";
import { nightOpensAt } from "./dates";

export function JsonLd({ data }: { data: object | object[] }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

const ATTRACTION_ID = `${site.url}/#attraction`;

/** Real photos of the place, for the business and event listings. */
const photos = () => [
  `${site.url}/images/site/cast-poster.webp`,
  `${site.url}/images/site/trail-chainsaw.webp`,
  `${site.url}/images/site/gate-fog.webp`,
  `${site.url}/og/default.jpg`,
];

const place = () => ({
  "@type": "Place",
  name: site.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressRegion: contact.address.state,
    postalCode: contact.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: contact.address.lat, longitude: contact.address.lng },
  hasMap: links.directions,
});

const dayOfWeek = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: season.timeZone }).format(nightOpensAt(iso));

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    publisher: { "@id": ATTRACTION_ID },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "EntertainmentBusiness", "LocalBusiness"],
    "@id": ATTRACTION_ID,
    name: site.name,
    alternateName: site.shortName,
    slogan: site.tagline,
    url: site.url,
    description: site.description,
    image: photos(),
    logo: `${site.url}/brand/logo.png`,
    telephone: "+1-864-243-4010",
    email: contact.email,
    foundingDate: String(site.since),
    priceRange: "$15–$30",
    address: place().address,
    geo: place().geo,
    hasMap: links.directions,
    areaServed: areaServed.map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "State", name: "South Carolina" } })),
    openingHoursSpecification: season.nights.map((iso) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayOfWeek(iso),
      opens: season.opens,
      closes: "23:59",
      validFrom: iso,
      validThrough: iso,
    })),
    sameAs: [links.facebook, links.instagram, links.tiktok],
    isAccessibleForFree: false,
    publicAccess: true,
    touristType: ["Thrill seekers", "Families"],
  };
}

/** One Event per night, with an offer per pass. */
export function eventsJsonLd() {
  return season.nights.map((iso) => {
    const start = nightOpensAt(iso);
    const end = new Date(start.getTime() + 4.5 * 3600 * 1000);
    const dateLabel = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: season.timeZone }).format(start);
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      "@id": `${site.url}/tickets/#night-${iso}`,
      name: `${site.name} — ${dateLabel}`,
      description: site.description,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      doorTime: start.toISOString(),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: photos(),
      location: place(),
      organizer: { "@type": "Organization", "@id": ATTRACTION_ID, name: site.name, url: site.url },
      performer: { "@type": "PerformingGroup", name: `${site.name} Haunt Crew` },
      offers: passes.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.price,
        priceCurrency: "USD",
        url: links.tickets,
        availability: "https://schema.org/InStock",
        validFrom: "2026-09-01T00:00:00-04:00",
      })),
      typicalAgeRange: "13-",
    };
  });
}

export function videoJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${site.url}/about/#trailer`,
    name: `${site.name} official trailer`,
    description: `Official trailer for ${site.name}, a haunted trail on an 1800s farm in Simpsonville, SC.`,
    thumbnailUrl: [`${site.url}${trailer.poster}`],
    uploadDate: trailer.uploadDate,
    duration: trailer.duration,
    contentUrl: `${site.url}${trailer.url}`,
    publisher: { "@id": ATTRACTION_ID },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function castJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hopkins Haunted Attraction characters",
    itemListElement: cast.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/characters/${c.slug}/`,
      name: c.name,
      image: `${site.url}${c.image}`,
    })),
  };
}

export function blogPostingJsonLd(p: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  cover: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    image: `${site.url}${p.cover}`,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    author: { "@type": "Person", name: p.author },
    publisher: { "@type": "Organization", "@id": ATTRACTION_ID, name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/brand/logo.png` } },
    mainEntityOfPage: `${site.url}/blog/${p.slug}/`,
  };
}
