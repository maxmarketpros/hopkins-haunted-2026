import { createElement } from "react";
import { cast, contact, faq, links, passes, season, site } from "@/content/site";
import { nightOpensAt } from "./dates";

export function JsonLd({ data }: { data: object | object[] }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

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
});

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "LocalBusiness"],
    "@id": `${site.url}/#attraction`,
    name: site.name,
    url: site.url,
    description: site.description,
    image: `${site.url}/og/default.jpg`,
    logo: `${site.url}/brand/logo.png`,
    telephone: "+1-864-243-4010",
    email: contact.email,
    foundingDate: String(site.since),
    priceRange: "$15–$30",
    address: place().address,
    geo: place().geo,
    sameAs: [links.facebook, links.instagram, links.tiktok],
    isAccessibleForFree: false,
    touristType: ["Thrill seekers", "Families"],
  };
}

/** One Event per night, with an offer per pass. */
export function eventsJsonLd() {
  return season.nights.map((iso) => {
    const start = nightOpensAt(iso);
    const end = new Date(start.getTime() + 4.5 * 3600 * 1000);
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: `${site.name} — ${new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: season.timeZone }).format(start)}`,
      description: site.description,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: [`${site.url}/og/default.jpg`],
      location: place(),
      organizer: { "@type": "Organization", name: site.name, url: site.url },
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
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/brand/logo.png` } },
    mainEntityOfPage: `${site.url}/blog/${p.slug}/`,
  };
}
