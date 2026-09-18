import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.16em] whitespace-nowrap rounded-[2px] transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-out select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-blaze text-bone lantern-glow hover:bg-[#d92c22] hover:shadow-[0_0_0_1px_rgb(196_38_29_/_0.6),0_16px_60px_-10px_rgb(196_38_29_/_0.8)] active:translate-y-px",
  secondary:
    "border border-bone/30 text-bone hover:border-bone hover:bg-bone/5 active:translate-y-px",
  ghost: "text-bone/85 hover:text-bone underline decoration-blaze underline-offset-[0.4em] decoration-2 hover:decoration-bone",
};

const sizes: Record<Size, string> = {
  md: "text-[0.8125rem] px-6 py-3.5",
  lg: "text-[0.9375rem] px-9 py-5",
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
  const ghost = variant === "ghost";
  const cls = cn(base, variants[variant], ghost ? "px-0 py-2 text-[0.8125rem]" : sizes[size], className);
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
