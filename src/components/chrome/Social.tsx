import { links } from "@/content/site";

const items = [
  {
    href: links.facebook,
    label: "Facebook",
    path: "M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.4V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3Z",
  },
  {
    href: links.instagram,
    label: "Instagram",
    path: "M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5-8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1C3.7 15 3.7 14.7 3.7 12s0-3 .1-4.1c.1-2.7 1.4-4 4.1-4.1 1.1-.1 1.4-.1 4.1-.1ZM12 2C9.3 2 9 2 7.9 2.1 4.2 2.2 2.2 4.2 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.1 3.7 2.1 5.7 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.7-.1 5.7-2.1 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1C21.8 4.2 19.8 2.2 16.1 2.1 15 2 14.7 2 12 2Z",
  },
  {
    href: links.tiktok,
    label: "TikTok",
    path: "M16.6 5.8c-.9-.6-1.5-1.5-1.7-2.6h-3v12.3a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.9a5.6 5.6 0 1 0 4.8 5.6V9.3c1.2.9 2.7 1.4 4.2 1.4V7.7c-1 0-1.8-.2-2.5-.6V5.8Z",
  },
];

export function Social({ className }: { className?: string }) {
  return (
    <>
      {items.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener"
          aria-label={s.label}
          className={
            className ??
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 text-bone/75 transition-colors hover:border-lantern/60 hover:text-lantern"
          }
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </>
  );
}
