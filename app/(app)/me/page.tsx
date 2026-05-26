"use client";

import Link from "next/link";
import {
  Bookmark,
  Highlighter,
  Flame,
  NotebookPen,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import FontSizeControl from "@/components/FontSizeControl";
import { getAllNotesCount } from "@/lib/notes";
import { getAllHighlightsCount } from "@/lib/highlights";
import { getBookmarks } from "@/lib/bookmarks";
import { getStreak } from "@/lib/streak";

export default function MePage() {
  const [counts, setCounts] = useState({
    notes: 0,
    highlights: 0,
    bookmarks: 0,
    streak: 0,
  });

  useEffect(() => {
    setCounts({
      notes: getAllNotesCount(),
      highlights: getAllHighlightsCount(),
      bookmarks: getBookmarks().length,
      streak: getStreak().currentStreak,
    });
  }, []);

  return (
    <main className="mx-auto max-w-reader px-6 py-12">
      <header className="mb-10">
        <p className="section-eyebrow">Sua conta</p>
        <h1 className="font-serif text-4xl tracking-tight mt-2">Perfil</h1>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <StatTile
          icon={Flame}
          value={counts.streak}
          label="Sequência"
          gold
        />
        <StatTile
          icon={Bookmark}
          value={counts.bookmarks}
          label="Favoritos"
        />
        <StatTile
          icon={Highlighter}
          value={counts.highlights}
          label="Destaques"
        />
        <StatTile
          icon={NotebookPen}
          value={counts.notes}
          label="Anotações"
        />
      </section>

      <section className="space-y-1 mb-10">
        <SectionLabel>Coleções</SectionLabel>
        <CollectionLink
          href="/me/bookmarks"
          icon={Bookmark}
          label="Favoritos"
          count={counts.bookmarks}
        />
        <CollectionLink
          href="/me/highlights"
          icon={Highlighter}
          label="Destaques"
          count={counts.highlights}
        />
        <CollectionLink
          href="/chat"
          icon={MessageCircle}
          label="Conversa com IA"
          count={null}
        />
      </section>

      <section className="space-y-5 mb-10">
        <SectionLabel>Preferências de leitura</SectionLabel>
        <div className="card-soft p-5">
          <p className="text-sm font-medium mb-3">Tema</p>
          <ThemeToggle />
        </div>
        <div className="card-soft p-5">
          <p className="text-sm font-medium mb-3">Tamanho da fonte do leitor</p>
          <FontSizeControl />
          <p className="text-xs text-ink-mute mt-3">
            Aplica-se a todos os capítulos da Bíblia.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <SectionLabel>Conta</SectionLabel>
        <div className="card-soft p-5">
          <p className="text-sm mb-4 text-ink-soft">
            Conecte uma conta pra sincronizar entre dispositivos.
          </p>
          <button
            disabled
            className="w-full px-5 py-3 text-xs uppercase tracking-wider border border-hairline rounded-full text-ink-mute cursor-not-allowed"
            title="Em breve — Supabase auth"
          >
            entrar com Google · em breve
          </button>
        </div>
      </section>

      <p className="mt-12 text-[10px] font-mono uppercase tracking-widest text-ink-mute text-center">
        AI BIBLE · v0.3
      </p>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="section-eyebrow mb-3">{children}</h2>;
}

function StatTile({
  icon: Icon,
  value,
  label,
  gold,
}: {
  icon: typeof Bookmark;
  value: number;
  label: string;
  gold?: boolean;
}) {
  return (
    <div className="card-soft p-4 text-center">
      <Icon
        size={18}
        className={`mx-auto mb-2 ${gold ? "text-gold" : "text-ink-mute"}`}
        strokeWidth={1.5}
      />
      <div className="font-serif text-3xl tracking-tight">{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink-mute mt-1">
        {label}
      </div>
    </div>
  );
}

function CollectionLink({
  href,
  icon: Icon,
  label,
  count,
}: {
  href: string;
  icon: typeof Bookmark;
  label: string;
  count: number | null;
}) {
  return (
    <Link
      href={href}
      className="card-soft flex items-center justify-between p-4 group"
    >
      <div className="flex items-center gap-3">
        <Icon size={16} strokeWidth={1.5} className="text-ink-mute" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-ink-mute group-hover:text-gold-dark">
        {count !== null && <span className="text-xs">{count}</span>}
        <ChevronRight size={14} />
      </div>
    </Link>
  );
}
