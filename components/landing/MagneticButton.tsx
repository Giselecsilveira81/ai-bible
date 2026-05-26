"use client";

import { useRef } from "react";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "gold" | "ghost" | "outline";
  size?: "default" | "lg" | "sm";
  className?: string;
  ariaLabel?: string;
  external?: boolean;
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
  ariaLabel,
  external,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.35;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const cls = clsx(
    "btn magnetic",
    variant === "primary" && "btn-primary",
    variant === "gold" && "btn-gold",
    variant === "ghost" && "btn-ghost",
    variant === "outline" && "btn-outline",
    size === "lg" && "btn-lg",
    size === "sm" && "btn-sm",
    className,
  );

  const inner = (
    <>
      <span className="btn-dot" aria-hidden />
      {children}
    </>
  );

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cls}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cls}
      aria-label={ariaLabel}
    >
      {inner}
    </Link>
  );
}
