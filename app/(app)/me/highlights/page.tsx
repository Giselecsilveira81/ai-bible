"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Highlighter } from "lucide-react";
import {
  getAllHighlights,
  HIGHLIGHT_COLORS,
  type HighlightEntry,
} from "@/lib/highlights";

export default function HighlightsPage() {
  const [items, setItems] = useState<HighlightEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(getAllHighlights());
    setLoaded(true);
  }, []);

  const filtered =
    filter === "all" ? items : items.filter((it) => it.color === filter);

  return (
    <main className="mx-auto max-w-reader px-6 py-12">
      <Link
        href="/me"
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute hover:text-gold-dark inline-flex items-center gap-2 mb-6"
      >
        <ArrowLeft size={12} />
        voltar
      </Link>
      <header className="mb-8">
        <p className="section-eyebrow">Coleção</p>
        <h1 className="font-serif text-4xl tracking-tight mt-2">Destaques</h1>
      </header>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        <FilterPill
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          Todos · {items.length}
        </FilterPill>
        {HIGHLIGHT_COLORS.map((c) => {
          const count = items.filter((it) => it.color === c.id).length;
          if (count === 0) return null;
          return (
            <FilterPill
              key={c.id}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
              dotColor={c.swatch}
            >
              {c.label} · {count}
            </FilterPill>
          );
        })}
      </div>

      {loaded && items.length === 0 && (
        <div className="card-soft p-8 text-center">
          <Highlighter
            size={28}
            strokeWidth={1.3}
            className="mx-auto mb-4 text-ink-mute"
          />
          <p className="text-sm text-ink-soft mb-2">
            Nenhum destaque ainda.
          </p>
          <p className="text-xs text-ink-mute">
            Toque em um versículo no leitor e escolha uma cor.
          </p>
        </div>
      )}

      <ul className="space-y-3">
        {filtered.map((h, i) => {
          const colorInfo = HIGHLIGHT_COLORS.find((c) => c.id === h.color);
          return (
            <li key={i}>
              <Link
                href={`/bible/${h.versionId}/${h.abbrev}/${h.chapter}`}
                className="card-soft block p-5 group"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gold-dark">
                    {h.abbrev.toUpperCase()} {h.chapter}:{h.verse}
                  </p>
                  {colorInfo && (
                    <span
                      style={{ backgroundColor: colorInfo.swatch }}
                      className="w-3 h-3 rounded-full border border-hairline"
                      title={colorInfo.label}
                    />
                  )}
                </div>
                <p className="text-sm text-ink-soft">
                  Capítulo {h.chapter}, versículo {h.verse} — clique pra abrir.
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

function FilterPill({
  active,
  onClick,
  children,
  dotColor,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dotColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs uppercase tracking-wider rounded-full transition-colors ${
        active
          ? "bg-ink text-paper"
          : "border border-hairline text-ink-mute hover:bg-paper-warm"
      }`}
    >
      {dotColor && (
        <span
          style={{ backgroundColor: dotColor }}
          className="w-3 h-3 rounded-full border border-hairline"
        />
      )}
      {children}
    </button>
  );
}
