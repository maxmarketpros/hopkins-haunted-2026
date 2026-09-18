import { cn } from "@/lib/cn";

/** Section eyebrow: a painted trail blaze plus a mono label. */
export function Blaze({
  label,
  className,
  as: Tag = "p",
}: {
  label: string;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag className={cn("label-mono flex items-center gap-3 text-lantern", className)}>
      <span aria-hidden className="blaze-mark" />
      <span>{label}</span>
    </Tag>
  );
}
