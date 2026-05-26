"use client";

import { useEffect, useState } from "react";
import {
  Copy,
  Bookmark,
  MessageCircle,
  Pen,
  Share2,
  Highlighter,
} from "lucide-react";
import { getChapterNotes } from "@/lib/notes";
import {
  getChapterHighlights,
  setHighlight,
  HIGHLIGHT_COLORS,
  type HighlightColor,
} from "@/lib/highlights";
import {
  getChapterBookmarks,
  toggleBookmark,
} from "@/lib/bookmarks";
import { markReadToday } from "@/lib/streak";
import NotesPanel from "@/components/NotesPanel";
import ShareVerseImage from "@/components/ShareVerseImage";

type Props = {
  versionId: string;
  versionAbbr: string;
  abbrev: string;
  chapter: number;
  bookName: string;
  verses: string[];
};

export default function Reader({
  versionId,
  versionAbbr,
  abbrev,
  chapter,
  bookName,
  verses,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [notedVerses, setNotedVerses] = useState<Set<number>>(new Set());
  const [hl, setHl] = useState<Record<number, HighlightColor>>({});
  const [bm, setBm] = useState<Set<number>>(new Set());
  const [focusedNote, setFocusedNote] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareVerse, setShareVerse] = useState<number | null>(null);

  useEffect(() => {
    markReadToday();
  }, [versionId, abbrev, chapter]);

  useEffect(() => {
    const cn = getChapterNotes(versionId, abbrev, chapter);
    setNotedVerses(
      new Set(Object.keys(cn).map(Number).filter((n) => cn[n]?.trim())),
    );
    setHl(getChapterHighlights(versionId, abbrev, chapter));
    setBm(getChapterBookmarks(versionId, abbrev, chapter));
  }, [versionId, abbrev, chapter, focusedNote]);

  useEffect(() => {
    const id = setInterval(() => {
      const cn = getChapterNotes(versionId, abbrev, chapter);
      const next = new Set(
        Object.keys(cn).map(Number).filter((n) => cn[n]?.trim()),
      );
      setNotedVerses((prev) => {
        if (prev.size === next.size && [...prev].every((x) => next.has(x)))
          return prev;
        return next;
      });
    }, 1500);
    return () => clearInterval(id);
  }, [versionId, abbrev, chapter]);

  const copyVerse = async (v: number, text: string) => {
    try {
      await navigator.clipboard.writeText(
        `"${text}" — ${bookName} ${chapter}:${v} (${versionAbbr})`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const openNote = (v: number) => {
    setSelected(null);
    setFocusedNote(v);
  };

  const onHighlight = (v: number, color: HighlightColor | null) => {
    setHighlight(versionId, abbrev, chapter, v, color);
    setHl((prev) => {
      const next = { ...prev };
      if (color) next[v] = color;
      else delete next[v];
      return next;
    });
  };

  const onBookmark = (v: number, text: string) => {
    const nowBookmarked = toggleBookmark({
      versionId,
      abbrev,
      bookName,
      chapter,
      verse: v,
      text,
    });
    setBm((prev) => {
      const next = new Set(prev);
      if (nowBookmarked) next.add(v);
      else next.delete(v);
      return next;
    });
  };

  return (
    <>
      <article className="reader-text">
        {verses.map((text, i) => {
          const v = i + 1;
          const hasNote = notedVerses.has(v);
          const isSel = selected === v;
          const hlColor = hl[v];
          const isBm = bm.has(v);
          const colorInfo = hlColor
            ? HIGHLIGHT_COLORS.find((c) => c.id === hlColor)
            : null;
          const isFirst = i === 0;
          const firstChar = isFirst ? text.charAt(0) : "";
          const restOfText = isFirst ? text.slice(1) : text;

          return (
            <div key={i} className="group">
              <button
                onClick={() => setSelected(isSel ? null : v)}
                style={
                  colorInfo && !isSel
                    ? { backgroundColor: colorInfo.bg }
                    : undefined
                }
                className={`text-left w-full leading-relaxed py-1 -mx-2 px-2 rounded transition-colors ${
                  isSel
                    ? "bg-ink/10 dark:bg-paper/10"
                    : !colorInfo
                      ? "hover:bg-ink/5 dark:hover:bg-paper/5"
                      : ""
                }`}
              >
                <span className="verse-num">{v}</span>
                {isFirst ? (
                  <>
                    <span
                      className="float-left font-serif text-gold-dark leading-[0.85] mr-2 mt-1"
                      style={{ fontSize: "calc(var(--reader-fs, 18px) * 3.2)" }}
                    >
                      {firstChar}
                    </span>
                    {restOfText}
                  </>
                ) : (
                  text
                )}
                {(hasNote || isBm) && (
                  <span className="ml-1.5 inline-flex items-center gap-1 text-ink-mute">
                    {isBm && (
                      <Bookmark
                        size={11}
                        strokeWidth={2}
                        fill="currentColor"
                        className="text-gold"
                      />
                    )}
                    {hasNote && <Pen size={11} strokeWidth={2} />}
                  </span>
                )}
              </button>

              {isSel && (
                <div className="ml-2 my-2 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    <ActionBtn
                      onClick={() => copyVerse(v, text)}
                      icon={<Copy size={12} />}
                      label={copied ? "copiado" : "copiar"}
                    />
                    <ActionBtn
                      onClick={() => openNote(v)}
                      icon={<Pen size={12} />}
                      label={hasNote ? "editar nota" : "anotar"}
                      primary
                    />
                    <ActionBtn
                      onClick={() => onBookmark(v, text)}
                      icon={
                        <Bookmark size={12} fill={isBm ? "currentColor" : "none"} />
                      }
                      label={isBm ? "favorito" : "favoritar"}
                      active={isBm}
                    />
                    <ActionBtn
                      onClick={() => setShareVerse(v)}
                      icon={<Share2 size={12} />}
                      label="compartilhar"
                    />
                  </div>

                  <div className="flex items-center gap-2 pl-1">
                    <Highlighter
                      size={11}
                      className="text-ink-mute"
                      strokeWidth={1.8}
                    />
                    {HIGHLIGHT_COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() =>
                          onHighlight(v, hlColor === c.id ? null : c.id)
                        }
                        style={{
                          backgroundColor: c.swatch,
                          boxShadow:
                            hlColor === c.id
                              ? `0 0 0 2px rgb(var(--bg)), 0 0 0 4px ${c.ring}`
                              : undefined,
                        }}
                        className="w-5 h-5 rounded-full border border-hairline transition-transform hover:scale-110"
                        title={c.label}
                        aria-label={`Destaque ${c.label}`}
                      />
                    ))}
                    {hlColor && (
                      <button
                        onClick={() => onHighlight(v, null)}
                        className="text-[10px] uppercase tracking-widest text-ink-mute hover:text-ink ml-1"
                      >
                        remover
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </article>

      <NotesPanel
        versionId={versionId}
        abbrev={abbrev}
        chapter={chapter}
        bookName={bookName}
        totalVerses={verses.length}
        focusedVerse={focusedNote}
        onClearFocus={() => setFocusedNote(null)}
      />

      {shareVerse !== null && (
        <ShareVerseImage
          text={verses[shareVerse - 1]}
          reference={`${bookName} ${chapter}:${shareVerse}`}
          versionAbbr={versionAbbr}
          onClose={() => setShareVerse(null)}
        />
      )}
    </>
  );
}

function ActionBtn({
  icon,
  label,
  onClick,
  disabled,
  primary,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  primary?: boolean;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-md transition-colors ${
        disabled
          ? "border border-hairline text-ink-mute cursor-not-allowed"
          : primary
            ? "bg-ink text-paper hover:bg-gold-dark"
            : active
              ? "bg-gold/20 text-gold-dark border border-gold/40"
              : "border border-hairline hover:bg-paper-warm"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
