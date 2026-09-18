import { season } from "@/content/site";

const TZ = season.timeZone;

/** "2026-10-16" → Date at local opening time in America/New_York. */
export function nightOpensAt(iso: string): Date {
  // Eastern Daylight Time covers October; Nov 1, 2026 is the DST changeover (2 AM), so the Nov 1 night opens in EST.
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

/** e.g. { dow: "FRI", day: "16", month: "OCT" } in the venue timezone. */
export function nightParts(iso: string) {
  const dt = nightOpensAt(iso);
  const dow = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: TZ }).format(dt).toUpperCase();
  const day = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: TZ }).format(dt);
  const month = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: TZ }).format(dt).toUpperCase();
  const long = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: TZ }).format(dt);
  return { dow, day, month, long, dt };
}

/** Groups consecutive nights into weekends (a gap of more than a day starts a new group). */
export function nightGroups(nights: readonly string[]) {
  const groups: string[][] = [];
  let prev: Date | null = null;
  for (const n of nights) {
    const dt = nightOpensAt(n);
    if (!prev || (dt.getTime() - prev.getTime()) / 86400000 > 1.5) groups.push([]);
    groups[groups.length - 1].push(n);
    prev = dt;
  }
  return groups;
}

/** A true label for each group: opening weekend, Halloween weekend, closing night, or "Weekend N". */
export function groupLabel(group: string[], index: number, total: number): string {
  if (group.some((n) => n.endsWith("-10-31"))) return "Halloween weekend";
  if (index === 0) return "Opening weekend";
  if (index === total - 1 && group.length === 1) return "Closing night";
  if (index === total - 1) return "Closing weekend";
  return `Weekend ${index + 1}`;
}

/** ISO date (YYYY-MM-DD) of "today" in the venue timezone. */
export function todayIso(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Post dates are date-only strings (YYYY-MM-DD); format them as calendar dates, not instants. */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
}
