"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, X } from "lucide-react";
import { getBookmarks, toggleBookmark, type Bookmark as BM } from "@/lib/bookmarks";

export default function BookmarksPage() {
  const [items, setItems] = useState<BM[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(getBookmarks());
    setLoaded(true);
  }, []);

  const remove = (b: BM) => {
    toggleBookmark(b);
    setItems((arr) => arr.filter((x) => x.addedAt !== b.addedAt));
  };

  return (
    <main className="mx-auto max-w-reader px-6 py-12">
      <Link
        href="/me"
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute hover:text-gold-dark inline-flex items-center gap-2 mb-6"
      >
        <ArrowLeft size={12} />
        voltar
      </Link>
      <header className="mb-8 flex items-baseline justify-between">
        <div>
          <p className="section-eyebrow">Coleção</p>
          <h1 className="font-serif text-4xl tracking-tight mt-2">Favoritos</h1>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
          {items.length} {items.length === 1 ? "versículo" : "versículos"}
        </span>
      </header>

      {loaded && items.length === 0 && (
        <div className="card-soft p-8 text-center">
          <Bookmark
            size={28}
            strokeWidth={1.3}
            className="mx-auto mb-4 text-ink-mute"
          />
          <p className="text-sm text-ink-soft mb-2">Nenhum favorito ainda.</p>
          <p className="text-xs text-ink-mute">
            Toque em um versículo no leitor e use{" "}
            <span className="font-medium text-ink">favoritar</span>.
          </p>
        </div>
      )}

      <ul className="space-y-3">
        {items.map((b) => (
          <li key={b.addedAt} className="group">
            <article className="card-soft p-5 relative">
              <button
                onClick={() => remove(b)}
                className="absolute top-3 right-3 text-ink-mute hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                aria-label="Remover dos favoritos"
              >
                <X size={14} />
              </button>
              <Link href={`/bible/${b.versionId}/${b.abbrev}/${b.chapter}`}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold-dark mb-2">
                  {b.bookName} {b.chapter}:{b.verse}
                </p>
                <p className="reader-text" style={{ fontSize: "17px" }}>
                  {b.text}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mt-3">
                  {b.versionId.toUpperCase()} ·{" "}
                  {new Date(b.addedAt).toLocaleDateString("pt-BR")}
                </p>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
