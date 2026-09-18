"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links } from "@/content/site";
import { cn } from "@/lib/cn";

/** Sticky bottom bar on small screens: tickets + directions. Appears after the hero scrolls away. */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (pathname.startsWith("/contact")) return null;
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-pine/90 backdrop-blur-md transition-transform duration-500 ease-out sm:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex gap-2 p-3">
        <a
          href={links.tickets}
          target="_blank"
          rel="noopener"
          className="label-mono flex flex-1 items-center justify-center rounded-[2px] bg-blaze py-3.5 text-bone lantern-glow"
        >
          Get tickets
        </a>
        <a
          href={links.directions}
          target="_blank"
          rel="noopener"
          className="label-mono flex items-center justify-center rounded-[2px] border border-bone/25 px-5 py-3.5 text-bone"
        >
          Directions
        </a>
      </div>
    </div>
  );
}
