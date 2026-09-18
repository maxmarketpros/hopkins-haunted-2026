"use client";

import { useEffect, useRef } from "react";

/**
 * A single trail line down the left rail of the home page that draws itself as you scroll.
 * Desktop only (xl+). Static under prefers-reduced-motion.
 */
export function TrailSpine() {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<SVGLineElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const ln = line.current;
    if (!el || !ln) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let height = 0;
    const measure = () => {
      const parent = el.parentElement;
      height = parent ? parent.getBoundingClientRect().height : 0;
      el.style.height = `${height}px`;
      ln.setAttribute("y2", String(height));
      ln.style.strokeDasharray = `${height}`;
      if (reduce) ln.style.strokeDashoffset = "0";
    };
    let raf = 0;
    const draw = () => {
      raf = 0;
      if (reduce) return;
      const parent = el.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      const viewportBottom = window.innerHeight * 0.8;
      const progress = Math.min(1, Math.max(0, (viewportBottom - r.top) / r.height));
      ln.style.strokeDashoffset = `${height * (1 - progress)}`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    measure();
    draw();
    const ro = new ResizeObserver(() => {
      measure();
      draw();
    });
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="pointer-events-none absolute top-0 hidden w-6 xl:block"
      style={{ left: "max(1rem, calc((100vw - 1200px) / 2 - 1.75rem))" }}
    >
      <svg width="24" height="100%" className="h-full w-6 overflow-visible">
        <line x1="12" y1="0" x2="12" y2="0" stroke="rgb(237 230 214 / 0.14)" strokeWidth="1" strokeDasharray="2 8" />
        <line ref={line} x1="12" y1="0" x2="12" y2="0" stroke="var(--color-lantern)" strokeOpacity="0.55" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
