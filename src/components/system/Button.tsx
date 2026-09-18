import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.14em] whitespace-nowrap rounded-[2px] transition-[background-color,color,box-shadow,transform] duration-300 ease-out select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-blaze text-bone lantern-glow hover:bg-blaze-deep hover:shadow-[0_0_0_1px_rgb(201_162_74_/_0.4),0_0_60px_rgb(201_162_74_/_0.28)] active:translate-y-px",
  secondary:
    "border border-bone/25 text-bone hover:border-bone/50 hover:bg-fog-deep/40 active:translate-y-px",
  ghost: "text-bone/80 hover:text-bone underline decoration-fog underline-offset-[0.35em] hover:decoration-lantern",
};

const sizes: Record<Size, string> = {
  md: "text-[0.8125rem] px-5 py-3",
  lg: "text-[0.875rem] px-7 py-4",
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function Button({ href, variant = "primary", size = "md", className, children, external, ...rest }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (!href) {
    return (
      <button type="button" className={cls} {...(rest as ComponentProps<"button">)}>
        {children}
      </button>
    );
  }
  const isExternal = external ?? /^https?:|^mailto:|^tel:/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={cls} target={/^https?:/.test(href) ? "_blank" : undefined} rel={/^https?:/.test(href) ? "noopener" : undefined} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
