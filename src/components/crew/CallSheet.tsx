import { contact, crew, links } from "@/content/site";

/** Tryout info laid out like a film production call sheet. */
export function CallSheet() {
  const t = crew.tryouts;
  const rows: { k: string; v: React.ReactNode }[] = [
    { k: "Production", v: "Hopkins Haunted Attraction · 2026 Scare Team" },
    { k: "Next tryouts", v: t.nextDate ?? <span className="text-bone/70">To be announced. Apply now and we’ll tell you first.</span> },
    { k: "Location", v: `${contact.address.street} ${contact.address.city}, ${contact.address.state} ${contact.address.zip}` },
    { k: "Wardrobe", v: "Come dressed comfortably. Outdoor activities." },
    { k: "Experience", v: "None required. We teach you the skills." },
    {
      k: "Contact",
      v: (
        <>
          <a href={`mailto:${contact.email}`} className="hover:text-lantern">
            {contact.email}
          </a>{" "}
          ·{" "}
          <a href={contact.phoneHref} className="hover:text-lantern">
            {contact.phoneDisplay}
          </a>
        </>
      ),
    },
  ];

  return (
    <article className="surface overflow-hidden rounded-[2px]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/10 bg-soot/60 px-6 py-4">
        <p className="label-mono text-blaze">Call sheet</p>
        <p className="label-mono text-bone/60">Actor recruitment & tryouts</p>
      </header>
      <div className="grid gap-8 p-6 md:grid-cols-12 md:p-8">
        <div className="md:col-span-7">
          <h3 className="display text-display-sm text-bone">{t.heading}</h3>
          <p className="mt-4 text-bone/85">{t.body}</p>
          <p className="label-mono mt-6 text-bone/60">What to expect</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {t.expect.map((e) => (
              <li key={e} className="flex items-start gap-3 text-bone/85">
                <span aria-hidden className="blaze-mark mt-1 scale-[0.6]" />
                {e}
              </li>
            ))}
          </ul>
        </div>
        <dl className="divide-y divide-bone/10 border-y border-bone/10 md:col-span-5 md:border-y-0 md:border-l md:pl-8">
          {rows.map((r) => (
            <div key={r.k} className="grid grid-cols-[7rem_1fr] gap-3 py-3 text-[0.9375rem]">
              <dt className="label-mono pt-0.5 text-bone/60">{r.k}</dt>
              <dd className="text-bone/90">{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 px-6 py-5 md:px-8">
        <p className="text-bone/70">Applications are open year-round.</p>
        <a href={links.apply} target="_blank" rel="noopener" className="label-mono inline-flex rounded-[2px] bg-blaze px-5 py-3 text-bone lantern-glow hover:bg-[#d92c22]">
          Apply now
        </a>
      </footer>
    </article>
  );
}
