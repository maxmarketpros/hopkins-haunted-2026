"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, nav, site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu on route change and lock scroll while open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "border-b border-bone/10 bg-soot/85 backdrop-blur-md" : "border-b border-transparent bg-gradient-to-b from-soot/70 to-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-20 items-center justify-between gap-6 md:h-24">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
          <Image
            src="/brand/logo.png"
            alt={site.name}
            width={1600}
            height={600}
            sizes="(min-width: 768px) 224px, 176px"
            className="h-[4.125rem] w-auto md:h-[5.25rem]"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "label-mono py-2 text-[0.8125rem] text-bone/80 transition-colors hover:text-bone",
                  isActive(item.href) && "text-bone underline decoration-blaze decoration-2 underline-offset-[0.6em]",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={links.tickets}
            target="_blank"
            rel="noopener"
            className="label-mono hidden rounded-[2px] bg-blaze px-5 py-3 text-[0.8125rem] text-bone lantern-glow transition-colors hover:bg-[#d92c22] sm:inline-flex"
          >
            Get tickets
          </a>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-[2px] border border-bone/25 text-bone lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M2 5h16M2 10h16M2 15h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 z-50 overflow-y-auto border-t border-bone/10 bg-soot/95 backdrop-blur-md lg:hidden"
      >
        <ul className="container-page flex flex-col py-6">
          {nav.map((item) => (
            <li key={item.href} className="border-b border-bone/10">
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn("display flex items-center justify-between py-5 text-[2.5rem] text-bone/90 hover:text-bone", isActive(item.href) && "text-blaze")}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="border-b border-bone/10">
            <Link href="/contact" className="display flex items-center justify-between py-5 text-[2.5rem] text-bone/90 hover:text-bone">
              Contact
            </Link>
          </li>
          <li className="pt-8">
            <a
              href={links.tickets}
              target="_blank"
              rel="noopener"
              className="label-mono flex items-center justify-center rounded-[2px] bg-blaze px-6 py-5 text-bone lantern-glow"
            >
              Get tickets
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
