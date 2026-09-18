"use client";

import { useEffect, useState } from "react";
import { season } from "@/content/site";
import { nightOpensAt, todayIso } from "@/lib/dates";

function describe(now: Date): string {
  const today = todayIso(now);
  const nights = season.nights;
  const first = nightOpensAt(nights[0]);
  const last = nightOpensAt(nights[nights.length - 1]);

  if (nights.includes(today)) return "Open tonight, 7:30 PM to midnight";
  if (now.getTime() > last.getTime() + 6 * 3600 * 1000) return `That’s a wrap on ${season.year}. See you next October.`;
  if (now < first) {
    const days = Math.ceil((first.getTime() - now.getTime()) / 86400000);
    if (days <= 1) return "Opening night is tomorrow";
    return `Opening night in ${days} days`;
  }
  const next = nights.find((n) => n > today);
  if (next) {
    const dt = nightOpensAt(next);
    const label = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: season.timeZone }).format(dt);
    return `Next night: ${label}`;
  }
  return `Season runs ${season.rangeShort}`;
}

/** One quiet mono line. Server renders a safe default; the client refines it after mount. */
export function Countdown({ className }: { className?: string }) {
  const [text, setText] = useState(`Opening night ${new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: season.timeZone }).format(nightOpensAt(season.nights[0]))}`);
  useEffect(() => {
    setText(describe(new Date()));
    const id = setInterval(() => setText(describe(new Date())), 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className={className} aria-live="polite">
      {text}
    </p>
  );
}
