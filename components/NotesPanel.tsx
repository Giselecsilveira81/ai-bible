"use client";

import { useEffect, useState, useRef } from "react";
import { X, NotebookPen } from "lucide-react";
import {
  getChapterNotes,
  setVerseNote,
  type ChapterNotes,
} from "@/lib/notes";

type Props = {
  versionId: string;
  abbrev: string;
  chapter: number;
  bookName: string;
  totalVerses: number;
  focusedVerse: number | null;
  onClearFocus: () => void;
};

export default function NotesPanel({
  versionId,
  abbrev,
  chapter,
  bookName,
  totalVerses,
  focusedVerse,
  onClearFocus,
}: Props) {
  const [notes, setNotes] = useState<ChapterNotes>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRefs = useRef<Record<number, HTMLTextAreaElement | null>>({});

  useEffect(() => {
    setNotes(getChapterNotes(versionId, abbrev, chapter));
  }, [versionId, abbrev, chapter]);

  useEffect(() => {
    if (focusedVerse) {
      setMobileOpen(true);
      const id = setTimeout(() => {
        const el = inputRefs.current[focusedVerse];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
        }
      }, 150);
      return () => clearTimeout(id);
    }
  }, [focusedVerse]);

  const update = (verse: number, text: string) => {
    setNotes((n) => ({ ...n, [verse]: text }));
    setVerseNote(versionId, abbrev, chapter, verse, text);
  };

  const count = Object.values(notes).filter((t) => t.trim()).length;

  const Body = (
    <div className="flex flex-col h-full">
      <header className="px-5 py-4 border-b border-ink/10 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-mute">
            Anotações
          </p>
          <p className="text-sm font-medium mt-0.5">
            {bookName} {chapter}
            {count > 0 && (
              <span className="ml-2 text-xs text-ink-mute">({count})</span>
            )}
          </p>
        </div>
        <button
          onClick={() => {
            setMobileOpen(false);
            onClearFocus();
          }}
          className="lg:hidden text-ink-mute hover:text-ink p-1"
          aria-label="fechar"
        >
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {Array.from({ length: totalVerses }, (_, i) => i + 1).map((v) => {
          const value = notes[v] ?? "";
          const focused = focusedVerse === v;
          const hasNote = !!value.trim();
          return (
            <div
              key={v}
              className={`transition-colors rounded-md ${
                focused ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""
              }`}
            >
              <div className="flex items-baseline gap-2 mb-1.5">
                <span
                  className={`text-[10px] uppercase tracking-widest ${
                    hasNote ? "text-ink font-semibold" : "text-ink-mute"
                  }`}
                >
                  v. {v}
                </span>
                {hasNote && (
                  <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                )}
              </div>
              <textarea
                ref={(el) => {
                  inputRefs.current[v] = el;
                }}
                value={value}
                onChange={(e) => update(v, e.target.value)}
                placeholder="anote algo…"
                rows={value ? 3 : 1}
                className="w-full text-sm bg-paper-soft/60 hover:bg-paper-soft border border-ink/5 focus:border-ink/30 focus:bg-paper rounded-md px-3 py-2 outline-none resize-none transition-colors"
              />
            </div>
          );
        })}
      </div>

      <footer className="px-5 py-3 border-t border-ink/10">
        <p className="text-[10px] uppercase tracking-widest text-ink-mute">
          Salvo automaticamente
        </p>
      </footer>
    </div>
  );

  return (
    <>
      {/* Desktop: painel direito sempre visivel */}
      <aside className="hidden xl:flex fixed top-0 right-0 bottom-0 w-80 bg-paper-soft/30 border-l border-ink/10 z-10">
        {Body}
      </aside>

      {/* Mobile/Tablet: floating button + drawer */}
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed bottom-24 lg:bottom-6 right-4 z-30 bg-ink text-paper w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:opacity-85"
        aria-label="abrir anotações"
      >
        <NotebookPen size={18} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-paper text-ink text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center border border-ink">
            {count}
          </span>
        )}
      </button>

      {mobileOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => {
            setMobileOpen(false);
            onClearFocus();
          }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-paper shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {Body}
          </div>
        </div>
      )}
    </>
  );
}
