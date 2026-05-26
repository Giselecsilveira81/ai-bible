"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { PLANS, AUDIENCES, type Audience } from "@/lib/plans";

export default function PlansPage() {
  const [filter, setFilter] = useState<Audience | "todos">("todos");

  const filtered =
    filter === "todos"
      ? PLANS
      : PLANS.filter((p) => p.audience.includes(filter));

  return (
    <main className="mx-auto max-w-reader px-6 py-12">
      <header className="mb-10">
        <p className="section-eyebrow text-gold-dark">✦ Estudos</p>
        <h1 className="font-serif text-4xl lg:text-5xl tracking-tight mt-2">
          Planos
        </h1>
        <p className="text-sm text-ink-soft mt-3 max-w-md leading-relaxed">
          Estudos guiados com devocional diário gerado por IA. Marque seu
          progresso, anote insights, deixe que o Espírito ensine.
        </p>
      </header>

      <div className="mb-8 -mx-6 px-6 overflow-x-auto">
        <div className="flex gap-1.5 pb-1 whitespace-nowrap">
          <FilterPill
            active={filter === "todos"}
            onClick={() => setFilter("todos")}
          >
            Todos
          </FilterPill>
          {AUDIENCES.map((a) => (
            <FilterPill
              key={a.id}
              active={filter === a.id}
              onClick={() => setFilter(a.id)}
            >
              {a.label}
            </FilterPill>
          ))}
        </div>
      </div>

      <ul className="space-y-3">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/plans/${p.slug}`}
              className="card-soft block p-5 lg:p-6 group hover:border-gold transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-serif text-xl lg:text-2xl leading-snug tracking-tight">
                  {p.title}
                </h3>
                <span className="flex items-center gap-1.5 shrink-0 font-mono text-[10px] uppercase tracking-widest text-gold-dark">
                  <Calendar size={10} />
                  {p.days} dias
                </span>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed mb-4">
                {p.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.audience
                    .filter((a) => a !== "todos")
                    .slice(0, 3)
                    .map((a) => (
                      <span
                        key={a}
                        className="text-[9px] font-mono uppercase tracking-widest bg-paper-warm px-2 py-0.5 rounded-full text-ink-soft"
                      >
                        {AUDIENCES.find((x) => x.id === a)?.label ?? a}
                      </span>
                    ))}
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold-dark px-2 py-0.5">
                    {p.topic}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="text-ink-mute opacity-0 group-hover:opacity-100 group-hover:text-gold-dark group-hover:translate-x-1 transition-all"
                />
              </div>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-sm text-ink-mute py-12 text-center font-mono uppercase tracking-widest">
            Nenhum plano nessa categoria ainda.
          </li>
        )}
      </ul>
    </main>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-mono rounded-full transition-colors ${
        active
          ? "bg-ink text-paper"
          : "border border-hairline text-ink-mute hover:bg-paper-warm hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
