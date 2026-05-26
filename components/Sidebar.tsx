"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Calendar,
  Search,
  User,
  Baby,
  MessageCircle,
} from "lucide-react";
import Logo from "@/components/landing/Logo";

const PRIMARY = [
  {
    href: "/app",
    label: "Início",
    icon: Home,
    match: (p: string) => p === "/app",
  },
  {
    href: "/bible",
    label: "Bíblia",
    icon: BookOpen,
    match: (p: string) => p.startsWith("/bible"),
  },
  {
    href: "/plans",
    label: "Planos",
    icon: Calendar,
    match: (p: string) => p.startsWith("/plans"),
  },
  {
    href: "/discover",
    label: "Descobrir",
    icon: Search,
    match: (p: string) => p.startsWith("/discover"),
  },
];

const SECONDARY = [
  {
    href: "/chat",
    label: "Conselheiro",
    icon: MessageCircle,
    match: (p: string) => p.startsWith("/chat"),
  },
  {
    href: "/kids",
    label: "Crianças",
    icon: Baby,
    match: (p: string) => p.startsWith("/kids"),
  },
  {
    href: "/me",
    label: "Perfil",
    icon: User,
    match: (p: string) => p.startsWith("/me"),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 border-r border-hairline bg-paper-warm/60 backdrop-blur-xl flex-col z-20">
      <Link
        href="/"
        className="px-6 py-6 border-b border-hairline flex items-center"
        aria-label="AI Bible — início"
      >
        <Logo size="md" />
      </Link>

      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-0.5 mb-6">
          {PRIMARY.map((item) => (
            <NavItem key={item.href} item={item} active={item.match(pathname)} />
          ))}
        </ul>
        <p className="section-eyebrow px-3 mb-2">Mais</p>
        <ul className="space-y-0.5">
          {SECONDARY.map((item) => (
            <NavItem key={item.href} item={item} active={item.match(pathname)} />
          ))}
        </ul>
      </nav>

      <div className="px-6 py-4 border-t border-hairline flex items-center justify-between">
        <p className="section-eyebrow">AI Bible · v0.2</p>
        <span className="text-gold text-sm">✦</span>
      </div>
    </aside>
  );
}

function NavItem({
  item,
  active,
}: {
  item: {
    href: string;
    label: string;
    icon: React.ComponentType<{
      size?: number;
      strokeWidth?: number;
      className?: string;
    }>;
  };
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
          active
            ? "bg-ink text-paper font-medium shadow-soft-sm"
            : "text-ink hover:bg-paper-warm hover:text-gold-dark"
        }`}
      >
        <Icon
          size={16}
          strokeWidth={active ? 2.25 : 1.75}
          className={active ? "text-gold" : ""}
        />
        {item.label}
      </Link>
    </li>
  );
}
