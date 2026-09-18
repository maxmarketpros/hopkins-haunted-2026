"use client";

import { useEffect, useState } from "react";
import { season } from "@/content/site";
import { cn } from "@/lib/cn";
import { groupLabel, nightGroups, nightParts, todayIso } from "@/lib/dates";

/** The nine nights, grouped by weekend. Tonight lights up; past nights fade. */
export function DateGrid() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayIso()), []);
  const groups = nightGroups(season.nights);

  return (
    <div className="flex flex-wrap gap-4">
      {groups.map((g, gi) => (
        <section key={gi} className="surface min-w-0 rounded-[2px] p-5" aria-label={groupLabel(g, gi, groups.length)}>
          <p className="label-mono text-bone/60">{groupLabel(g, gi, groups.length)}</p>
          <ul className="mt-4 flex gap-2">
            {g.map((iso) => {
              const p = nightParts(iso);
              const isTonight = today === iso;
              const isPast = today !== null && iso < today;
              return (
                <li
                  key={iso}
                  className={cn(
                    "flex w-[4.5rem] flex-col items-center rounded-[2px] border px-2 py-4 text-center transition-colors sm:w-[5.25rem]",
                    isTonight ? "border-blaze bg-blaze/15 lantern-glow" : "border-bone/10 bg-soot/60",
                    isPast && "opacity-40",
                  )}
                >
                  <span className="label-mono text-[0.625rem] text-bone/60">{p.dow}</span>
                  <span className={cn("display mt-1 text-[2.5rem] leading-none", "text-bone")}>{p.day}</span>
                  <span className="label-mono mt-1 text-[0.625rem] text-bone/60">{p.month}</span>
                  {isTonight && <span className="label-mono mt-2 text-[0.5625rem] text-lantern">Tonight</span>}
                  <span className="sr-only">{p.long}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
