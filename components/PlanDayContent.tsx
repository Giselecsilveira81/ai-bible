"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Devotional = {
  reference: string;
  passage: string;
  reflection: string;
  prayer: string;
  highlight: string;
};

type Props = {
  planSlug: string;
  day: number;
  totalDays: number;
};

export default function PlanDayContent({ planSlug, day, totalDays }: Props) {
  const [data, setData] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetch("/api/plan-day", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planSlug, day }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .finally(() => setLoading(false));
    // resetar marcado quando muda o dia
    const stored = localStorage.getItem(`plan-progress:${planSlug}`);
    if (stored) {
      try {
        const progress = JSON.parse(stored) as number[];
        setDone(progress.includes(day));
      } catch {
        setDone(false);
      }
    } else {
      setDone(false);
    }
  }, [planSlug, day]);

  const toggleDone = () => {
    const next = !done;
    setDone(next);
    const stored = localStorage.getItem(`plan-progress:${planSlug}`);
    let progress: number[] = [];
    if (stored) {
      try {
        progress = JSON.parse(stored);
      } catch {}
    }
    if (next) {
      if (!progress.includes(day)) progress.push(day);
    } else {
      progress = progress.filter((d) => d !== day);
    }
    localStorage.setItem(`plan-progress:${planSlug}`, JSON.stringify(progress));
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-3 py-8">
        <div className="h-4 w-32 bg-ink/10 rounded" />
        <div className="h-3 bg-ink/10 rounded" />
        <div className="h-3 bg-ink/10 rounded w-4/5" />
        <div className="h-3 bg-ink/10 rounded w-3/5" />
      </div>
    );
  }

  if (!data) {
    return (
      <p className="text-sm text-ink-mute py-8">
        Devocional indisponível agora. Adicione a chave OpenAI ao{" "}
        <code>.env.local</code> e tente novamente.
      </p>
    );
  }

  return (
    <article className="space-y-6">
      {data.highlight && (
        <p className="font-serif text-xl leading-snug italic text-ink-soft border-l-2 border-ink pl-4">
          {data.highlight}
        </p>
      )}

      <section>
        <p className="text-xs uppercase tracking-widest text-ink-mute mb-2">
          Leitura
        </p>
        <p className="text-sm">{data.passage}</p>
        <Link
          href={`/bible/acf/${slugify(data.reference)}`}
          className="text-xs text-ink-mute hover:text-ink underline mt-1 inline-block"
        >
          Abrir no leitor →
        </Link>
      </section>

      <section>
        <p className="text-xs uppercase tracking-widest text-ink-mute mb-2">
          Reflexão
        </p>
        <p className="reader-text leading-relaxed">{data.reflection}</p>
      </section>

      <section>
        <p className="text-xs uppercase tracking-widest text-ink-mute mb-2">
          Oração
        </p>
        <p className="reader-text leading-relaxed italic">{data.prayer}</p>
      </section>

      <div className="pt-6 border-t border-ink/10 flex items-center justify-between">
        <button
          onClick={toggleDone}
          className={`px-5 py-2.5 text-xs uppercase tracking-wider rounded-md transition-colors ${
            done
              ? "bg-ink/5 text-ink-mute"
              : "bg-ink text-paper hover:opacity-85"
          }`}
        >
          {done ? "✓ concluído" : "marcar como concluído"}
        </button>
        <p className="text-xs text-ink-mute">
          dia {day} de {totalDays}
        </p>
      </div>
    </article>
  );
}

// converte "João 3" → "joao/3", "Salmos 23" → "salmos/23"
function slugify(reference: string): string {
  const m = reference.match(/^(.+?)\s+(\d+)/);
  if (!m) return "genesis/1";
  const name = m[1]
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  return `${name}/${m[2]}`;
}
