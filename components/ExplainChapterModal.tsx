"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Loader2 } from "lucide-react";

type Props = {
  bookName: string;
  chapter: number;
  versionAbbr: string;
  verses: string[];
};

export default function ExplainChapterModal({
  bookName,
  chapter,
  versionAbbr,
  verses,
}: Props) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!open) return;
    if (content || loading) return; // cache: já gerou pra este capítulo
    explain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    // reset cache se mudar capítulo
    setContent("");
    setError(null);
    abortRef.current?.abort();
  }, [bookName, chapter, versionAbbr]);

  const explain = async () => {
    setLoading(true);
    setError(null);
    setContent("");
    const text = verses.map((v, i) => `${i + 1} ${v}`).join("\n");
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/explain-chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({
          bookName,
          chapter,
          versionAbbr,
          text,
        }),
      });
      if (!res.ok || !res.body) {
        setError(await res.text());
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setContent(acc);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError")
        setError("Erro ao gerar explicação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink text-paper text-xs uppercase tracking-wider hover:bg-gold-dark transition-colors"
      >
        <Sparkles size={12} className="text-gold" />
        explicar capítulo
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-16 px-4 overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-paper w-full max-w-2xl rounded-2xl shadow-soft-lg overflow-hidden my-8 dark:bg-ink-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="px-6 py-5 border-b border-hairline flex items-center justify-between sticky top-0 bg-paper dark:bg-ink-soft z-10">
              <div>
                <p className="section-eyebrow text-gold-dark">
                  ✦ Explicação com IA
                </p>
                <p className="font-serif text-2xl tracking-tight mt-1">
                  {bookName} {chapter}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-ink-mute hover:text-ink p-2"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </header>

            <div className="px-6 py-6">
              {error ? (
                <div className="text-sm text-rose-600">{error}</div>
              ) : loading && !content ? (
                <div className="flex items-center gap-2 text-sm text-ink-mute">
                  <Loader2 size={14} className="animate-spin" />
                  Pensando…
                </div>
              ) : (
                <article className="prose-explain">
                  <FormattedMarkdown text={content} />
                  {loading && (
                    <span className="inline-block w-2 h-4 bg-gold align-middle animate-pulse ml-1" />
                  )}
                </article>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Markdown minimal: **bold** e parágrafos. */
function FormattedMarkdown({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  return (
    <>
      {blocks.map((b, i) => {
        const html = b
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, "<em>$1</em>");
        return (
          <p
            key={i}
            className="text-[15px] leading-relaxed text-ink-soft mb-4 last:mb-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </>
  );
}
