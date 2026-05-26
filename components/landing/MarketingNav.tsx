"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { href: "/bible/acf/genesis/1", label: "Bíblia" },
  { href: "/chat", label: "IA" },
  { href: "/plans", label: "Planos" },
  { href: "/discover", label: "Comunidade" },
  { href: "/app", label: "Devocional" },
];

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-hairline"
          : "bg-transparent"
      }`}
      role="navigation"
    >
      <div className="container-page flex items-center justify-between py-4 lg:py-5">
        <Link href="/" aria-label="AI Bible — início">
          <Logo size="md" layout="stack" />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-soft hover:text-gold-dark transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            className="text-xs font-mono uppercase tracking-widest text-ink-mute hover:text-ink transition-colors px-2 py-1"
            aria-label="Trocar idioma"
          >
            <span className="text-ink">PT</span>
            <span className="mx-1">/</span>EN
          </button>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              border: "1.5px solid #B8960C",
              color: "#B8960C",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "#B8960C";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#B8960C";
            }}
          >
            Baixar o App
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-5 h-px bg-ink transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-ink transition-transform ${
              open ? "-translate-y-[2px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-x-0 top-[64px] bottom-0 bg-white border-t border-hairline transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-col px-6 py-8 gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl tracking-tight"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/app"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 self-start"
          >
            <span className="btn-dot" aria-hidden />
            Abrir o App →
          </Link>
        </div>
      </div>
    </nav>
  );
}
