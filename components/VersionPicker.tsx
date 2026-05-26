"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Check } from "lucide-react";
import type { Version } from "@/lib/bible";

type Props = {
  versions: Version[];
  current: string;
  bookSlug: string;
  chapter: number;
};

export default function VersionPicker({
  versions,
  current,
  bookSlug,
  chapter,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [langFilter, setLangFilter] = useState<string>("all");

  const cur = versions.find((v) => v.id === current);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      // Pré-seleciona o idioma da versão atual
      setLangFilter(cur?.group ?? "all");
    }
  }, [open, cur]);

  const languages = useMemo(() => {
    const map = new Map<string, number>();
    for (const v of versions) {
      map.set(v.group, (map.get(v.group) ?? 0) + 1);
    }
    return [...map.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // mais populosos primeiro
  }, [versions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return versions.filter((v) => {
      if (langFilter !== "all" && v.group !== langFilter) return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) ||
        v.abbr.toLowerCase().includes(q) ||
        v.group.toLowerCase().includes(q)
      );
    });
  }, [versions, query, langFilter]);

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, Version[]>>((acc, v) => {
      (acc[v.group] ??= []).push(v);
      return acc;
    }, {});
  }, [filtered]);

  const choose = (id: string) => {
    setOpen(false);
    router.push(`/bible/${id}/${bookSlug}/${chapter}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs uppercase tracking-wider font-medium hover:bg-paper-warm px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 text-ink-mute hover:text-ink"
      >
        {cur?.abbr ?? current}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-paper w-full max-w-lg rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden border border-hairline"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <header className="border-b border-hairline px-5 py-3 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold-dark">
                  ✦ Escolha a tradução
                </div>
                <div className="text-[11px] text-ink-mute mt-0.5">
                  {versions.length} versões em {languages.length} idiomas
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-ink-mute hover:text-ink p-1"
                aria-label="Fechar"
              >
                <X size={16} />
              </button>
            </header>

            {/* Busca */}
            <div className="border-b border-hairline px-5 py-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-hairline focus-within:border-gold transition-colors">
                <Search size={14} className="text-ink-mute shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar tradução, sigla ou idioma…"
                  autoFocus
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-mute"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-ink-mute hover:text-ink"
                    aria-label="Limpar"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Filtros de idioma */}
            <div className="border-b border-hairline px-5 py-3 overflow-x-auto">
              <div className="flex gap-1.5 whitespace-nowrap">
                <LangPill
                  active={langFilter === "all"}
                  onClick={() => setLangFilter("all")}
                  count={versions.length}
                >
                  Todos
                </LangPill>
                {languages.map((l) => (
                  <LangPill
                    key={l.name}
                    active={langFilter === l.name}
                    onClick={() => setLangFilter(l.name)}
                    count={l.count}
                  >
                    {l.name}
                  </LangPill>
                ))}
              </div>
            </div>

            {/* Lista */}
            <div className="overflow-y-auto flex-1 p-3">
              {Object.entries(grouped).map(([group, vs]) => (
                <div key={group} className="mb-5 last:mb-0">
                  {langFilter === "all" && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gold-dark px-2 py-1.5 sticky top-0 bg-paper z-10">
                      {group} · {vs.length}
                    </p>
                  )}
                  <ul className="space-y-0.5">
                    {vs.map((v) => (
                      <li key={v.id}>
                        <button
                          onClick={() => choose(v.id)}
                          className={`w-full text-left p-3 rounded-lg hover:bg-paper-warm transition-colors flex items-baseline justify-between gap-3 ${
                            v.id === current ? "bg-gold-pale" : ""
                          }`}
                        >
                          <span className="text-sm leading-tight flex-1">
                            {v.name}
                          </span>
                          <span className="flex items-center gap-2 shrink-0">
                            {v.id === current && (
                              <Check size={12} className="text-gold-dark" />
                            )}
                            <span
                              className={`font-mono text-[10px] uppercase tracking-widest ${
                                v.id === current
                                  ? "text-gold-dark font-medium"
                                  : "text-ink-mute"
                              }`}
                            >
                              {v.abbr}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="py-12 text-center text-sm text-ink-mute">
                  Nenhuma tradução encontrada.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function LangPill({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-colors ${
        active
          ? "bg-ink text-paper"
          : "border border-hairline text-ink-mute hover:bg-paper-warm hover:text-ink"
      }`}
    >
      {children}
      <span className={active ? "opacity-60" : "opacity-50"}>{count}</span>
    </button>
  );
}
