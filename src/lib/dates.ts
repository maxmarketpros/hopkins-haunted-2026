import { season } from "@/content/site";

const TZ = season.timeZone;

/** "2026-10-16" → Date at local opening time in America/New_York (approx. via ISO with fixed offset lookup). */
export function nightOpensAt(iso: string): Date {
  // Eastern Daylight Time applies to the whole 2026 season (DST ends Nov 1, 2026 at 2 AM; the Nov 1 night opens after that,
  // but 7:30 PM EST vs EDT only shifts by one hour and the countdown targets opening night in October).
  const [y, m, d] = iso.split("-").map(Number);
  const isEdt = m < 11;
  const offset = isEdt ? "-04:00" : "-05:00";
  return new Date(`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T${season.opens}:00${offset}`);
}

export function openingNight(): Date {
  return nightOpensAt(season.nights[0]);
}

export function lastNight(): Date {
  return nightOpensAt(season.nights[season.nights.length - 1]);
}

/** Formats an ISO night as e.g. { dow: "FRI", day: "16", month: "OCT" } in the venue timezone. */
export function nightParts(iso: string) {
  const dt = nightOpensAt(iso);
  const dow = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: TZ }).format(dt).toUpperCase();
  const day = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: TZ }).format(dt);
  const month = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: TZ }).format(dt).toUpperCase();
  return { dow, day, month, dt };
}

/** Groups consecutive nights into weekends (gap > 1 day starts a new group). */
export function nightGroups(nights: readonly string[]) {
  const groups: string[][] = [];
  let prev: Date | null = null;
  for (const n of nights) {
    const dt = nightOpensAt(n);
    if (prev && (dt.getTime() - prev.getTime()) / 86400000 > 1.5) groups.push([]);
    if (groups.length === 0) groups.push([]);
    groups[groups.length - 1].push(n);
    prev = dt;
  }
  return groups;
}

/** ISO date (YYYY-MM-DD) of "today" in the venue timezone. */
export function todayIso(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}
