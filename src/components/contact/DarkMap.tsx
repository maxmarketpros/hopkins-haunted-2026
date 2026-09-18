import { contact, links } from "@/content/site";
import { cn } from "@/lib/cn";

/** Google Maps embed, night-toned with a CSS filter, inside a soot frame. No API key needed. */
export function DarkMap({ className, height = "h-[360px] md:h-[440px]" }: { className?: string; height?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2px] border border-bone/10 bg-soot", height, className)}>
      <iframe
        src={links.mapEmbed}
        title={`Map to ${contact.address.full}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen={false}
        className="map-night absolute inset-0 h-full w-full border-0"
      />
      <a
        href={links.directions}
        target="_blank"
        rel="noopener"
        className="label-mono absolute bottom-3 left-3 rounded-[2px] bg-pine/90 px-3 py-2 text-[0.6875rem] text-bone backdrop-blur hover:text-lantern"
      >
        Open in Google Maps ↗
      </a>
    </div>
  );
}
