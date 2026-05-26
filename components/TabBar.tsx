"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Calendar, Search, User } from "lucide-react";

const tabs = [
  {
    href: "/app",
    label: "Início",
    icon: Home,
    match: (p: string) => p === "/app",
  },
  { href: "/bible", label: "Bíblia", icon: BookOpen, match: (p: string) => p.startsWith("/bible") },
  { href: "/plans", label: "Planos", icon: Calendar, match: (p: string) => p.startsWith("/plans") },
  { href: "/discover", label: "Descobrir", icon: Search, match: (p: string) => p.startsWith("/discover") },
  { href: "/me", label: "Perfil", icon: User, match: (p: string) => p.startsWith("/me") },
];

export default function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-paper/95 backdrop-blur-xl border-t border-hairline"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="max-w-reader mx-auto grid grid-cols-5 px-2">
        {tabs.map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-[0.18em] font-mono transition-colors ${
                  active ? "text-gold-dark" : "text-ink-mute hover:text-ink"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2 : 1.5}
                  className={active ? "text-gold-dark" : ""}
                />
                <span className={active ? "font-medium" : ""}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
