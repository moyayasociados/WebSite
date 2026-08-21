import Link from "next/link";
import type { ReactNode } from "react";
import { landingPath } from "@/shared/lib/landing-navigation";

type Props = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
  onClick,
}: Props) {
  const styles = {
    primary: "bg-primary text-white hover:-translate-y-0.5 hover:shadow-lg",
    secondary: "bg-secondary text-white hover:-translate-y-0.5 hover:shadow-lg",
    outline:
      "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
    ghost: "text-primary hover:text-secondary",
  }[variant];
  const cn = `inline-flex items-center justify-center gap-2 rounded px-6 py-3 font-semibold transition-all duration-300 ${styles} ${className}`;
  if (href)
    return (
      <Link
        href={href.startsWith("#") ? landingPath(href) : href}
        onClick={onClick}
        className={cn}
      >
        {children}
      </Link>
    );
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cn}>
      {children}
    </button>
  );
}
