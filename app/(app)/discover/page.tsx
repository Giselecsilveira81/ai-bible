"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, Loader2 } from "lucide-react";

type Hit = {
  reference: string;
  text: string;
  abbrev: string;
  slug: string;
  chapter: number;
  verse: number;
};

const TOPICS = [
  { label: "Amor", query: "amor" },
  { label: "Esperança", query: "esperança" },
  { label: "Medo", query: "temas" },
  { label: "Cura", query: "cura" },
  { label: "Perdão", query: "perdoar" },
  { label: "Fé", query: "fé" },
  { label: "Paz", query: "paz" },
  { label: "Sabedoria", query: "sabedoria" },
  { label: "Oração", query: "oração" },
  { label: "Família", query: "família" },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (q: string) => {
    const text = q.trim();
    if (!text) return;
    setQuery(text);
    setLoading(true);
    setDone(false);
    setHits([]);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, version: "acf" }),
      });
      const data = await res.json();
      if (data.type === "reference" && data.target) {
        router.push(`/bible/acf/${data.target.slug}/${data.target.chapter}`);
        return;
      }
      if (data.type === "text") {
        setHits(data.hits ?? []);
        setDone(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-reader px-6 py-12">
      <header className="mb-8">
        <p className="section-eyebrow text-gold-dark">✦ Buscar</p>
        <h1 className="font-serif text-4xl lg:text-5xl tracking-tight mt-2">
          Descobrir
        </h1>
        <p className="text-sm text-ink-soft mt-3 max-w-md leading-relaxed">
          Digite uma referência (ex: <em>João 3:16</em>) ou uma palavra (ex:{" "}
          <em>esperança</em>) pra encontrar versículos.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 px-5 py-1 rounded-full border border-hairline focus-within:border-gold transition-colors bg-paper">
          <Search size={16} className="text-ink-mute shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar na ACF…"
            className="flex-1 bg-transparent text-sm py-3 outline-none placeholder:text-ink-mute"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-5 py-2 text-[10px] font-mono uppercase tracking-widest bg-ink text-paper rounded-full disabled:opacity-30 transition-opacity"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : "buscar"}
          </button>
        </div>
      </form>

      {!done && !loading && (
        <section>
          <p className="section-eyebrow mb-4">Tópicos populares</p>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button
                key={t.label}
                onClick={() => submit(t.query)}
                className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-hairline rounded-full text-ink hover:border-gold hover:bg-gold-pale hover:text-gold-dark transition-all"
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {loading && (
        <div className="py-10 text-center">
          <Loader2
            size={20}
            className="mx-auto text-gold animate-spin mb-3"
          />
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink-mute">
            procurando…
          </p>
        </div>
      )}

      {done && (
        <section>
          <p className="section-eyebrow mb-4">
            {hits.length} resultado{hits.length === 1 ? "" : "s"} ·{" "}
            <span className="text-gold-dark">{query}</span>
          </p>
          <ul className="space-y-3">
            {hits.map((h, i) => (
              <li key={i}>
                <Link
                  href={`/bible/acf/${h.slug}/${h.chapter}`}
                  className="card-soft block p-5 group hover:border-gold transition-all"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gold-dark">
                      {h.reference}
                    </p>
                    <ArrowRight
                      size={12}
                      className="text-ink-mute opacity-0 group-hover:opacity-100 group-hover:text-gold-dark transition-all"
                    />
                  </div>
                  <p className="reader-text text-base leading-relaxed">
                    {h.text}
                  </p>
                </Link>
              </li>
            ))}
            {hits.length === 0 && (
              <li className="text-sm text-ink-mute py-8 text-center font-mono uppercase tracking-widest">
                Nenhum resultado pra &ldquo;{query}&rdquo;.
              </li>
            )}
          </ul>
        </section>
      )}
    </main>
  );
}
