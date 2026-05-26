"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { getTheme, setTheme, type Theme } from "@/lib/settings";

const OPTIONS: { id: Theme; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "Claro", icon: Sun },
  { id: "dark", label: "Escuro", icon: Moon },
  { id: "auto", label: "Sistema", icon: Monitor },
];

export default function ThemeToggle() {
  const [theme, setT] = useState<Theme>("auto");

  useEffect(() => {
    setT(getTheme());
  }, []);

  const change = (t: Theme) => {
    setT(t);
    setTheme(t);
  };

  return (
    <div
      className="inline-flex p-1 rounded-full border border-hairline bg-paper-warm/40"
      role="group"
      aria-label="Tema"
    >
      {OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const active = opt.id === theme;
        return (
          <button
            key={opt.id}
            onClick={() => change(opt.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
              active
                ? "bg-ink text-paper font-medium"
                : "text-ink-mute hover:text-ink"
            }`}
            aria-pressed={active}
          >
            <Icon size={12} className={active ? "text-gold" : ""} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
