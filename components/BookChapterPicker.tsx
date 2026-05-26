"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { BookIndex } from "@/lib/bible";

type Props = {
  versionId: string;
  index: BookIndex[];
  current: { abbrev: string; chapter: number };
};

export default function BookChapterPicker({
  versionId,
  index,
  current,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [testament, setTestament] = useState<"AT" | "NT">(
    index.find((b) => b.abbrev === current.abbrev)?.testament ?? "AT",
  );
  const [pickedBook, setPickedBook] = useState<BookIndex | null>(null);

  useEffect(() => {
    if (!open) {
      setPickedBook(null);
      const cur = index.find((b) => b.abbrev === current.abbrev);
      if (cur) setTestament(cur.testament);
    }
  }, [open, current.abbrev, index]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  const currentBook = index.find((b) => b.abbrev === current.abbrev);
  const label = currentBook ? `${currentBook.name} ${current.chapter}` : "Bíblia";

  const filtered = index.filter((b) => b.testament === testament);

  const choose = (slug: string, chapter: number) => {
    setOpen(false);
    router.push(`/bible/${versionId}/${slug}/${chapter}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-medium hover:bg-ink/5 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
      >
        {label}
        <svg
          width="12"
          height="12"
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
            className="bg-paper w-full max-w-xl rounded-lg shadow-2xl max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="border-b border-ink/10 px-5 py-3 flex items-center justify-between">
              <div className="text-sm font-medium">
                {pickedBook ? pickedBook.name : "Escolher livro"}
              </div>
              <button
                onClick={() => (pickedBook ? setPickedBook(null) : setOpen(false))}
                className="text-ink-mute hover:text-ink text-xs uppercase tracking-wider"
              >
                {pickedBook ? "← voltar" : "fechar"}
              </button>
            </header>

            {!pickedBook && (
              <div className="border-b border-ink/10 px-5 py-2 flex gap-1">
                {(["AT", "NT"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTestament(t)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-md transition-colors ${
                      testament === t
                        ? "bg-ink text-paper"
                        : "text-ink-mute hover:bg-ink/5"
                    }`}
                  >
                    {t === "AT" ? "Antigo" : "Novo"}
                  </button>
                ))}
              </div>
            )}

            <div className="overflow-y-auto flex-1 p-3">
              {!pickedBook ? (
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                  {filtered.map((b) => (
                    <li key={b.abbrev}>
                      <button
                        onClick={() => setPickedBook(b)}
                        className={`w-full text-left text-sm py-2 px-3 rounded-md hover:bg-ink/5 transition-colors ${
                          b.abbrev === current.abbrev
                            ? "font-semibold"
                            : ""
                        }`}
                      >
                        {b.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 p-1">
                  {Array.from(
                    { length: pickedBook.chapters },
                    (_, i) => i + 1,
                  ).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => choose(pickedBook.slug, ch)}
                      className={`aspect-square text-sm rounded-md hover:bg-ink/10 transition-colors ${
                        pickedBook.abbrev === current.abbrev &&
                        ch === current.chapter
                          ? "bg-ink text-paper"
                          : "bg-ink/5"
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
