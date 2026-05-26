"use client";

import { useEffect, useState } from "react";

type Devotional = {
  date: string;
  reference: string;
  text: string;
  versionAbbr: string;
  reflection: string;
  prayer: string;
};

export default function VerseOfTheDay() {
  const [data, setData] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/devotional")
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="border-l-2 border-hairline-gold pl-5 animate-pulse">
        <div className="h-3 w-32 bg-ink/10 rounded mb-3" />
        <div className="h-5 bg-ink/10 rounded mb-2" />
        <div className="h-5 w-2/3 bg-ink/10 rounded" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="border-l-2 border-hairline-gold pl-5">
        <p className="section-eyebrow mb-2">Versículo do dia</p>
        <p className="text-sm text-ink-mute">
          Adicione sua chave OpenAI no <code>.env.local</code> pra gerar
          devocionais com IA.
        </p>
      </div>
    );
  }

  return (
    <article className="border-l-2 border-gold pl-5">
      <p className="section-eyebrow mb-3">✦ Versículo do dia</p>
      <p className="font-serif text-2xl lg:text-3xl leading-snug tracking-tight mb-3">
        {data.text}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dark">
        {data.reference} · {data.versionAbbr}
      </p>

      <div className="mt-7 pt-5 border-t border-hairline">
        <p className="section-eyebrow mb-2">Reflexão</p>
        <p className="text-sm leading-relaxed text-ink-soft">
          {data.reflection}
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-hairline">
        <p className="section-eyebrow mb-2">Oração</p>
        <p className="text-sm leading-relaxed italic text-ink-soft">
          {data.prayer}
        </p>
      </div>
    </article>
  );
}
