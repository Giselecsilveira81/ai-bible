"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Version } from "@/lib/bible";

type Props = {
  versions: Version[];
  current: string;
  bookSlug: string;
  chapter: number;
};

export default function VersionPicker({
  versions,
  current,
  bookSlug,
  chapter,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const cur = versions.find((v) => v.id === current);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  const grouped = versions.reduce<Record<string, Version[]>>((acc, v) => {
    (acc[v.group] ??= []).push(v);
    return acc;
  }, {});

  const choose = (id: string) => {
    setOpen(false);
    router.push(`/bible/${id}/${bookSlug}/${chapter}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs uppercase tracking-wider font-medium hover:bg-ink/5 px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 text-ink-mute hover:text-ink"
      >
        {cur?.abbr ?? current}
        <svg
          width="10"
          height="10"
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
            className="bg-paper w-full max-w-sm rounded-lg shadow-2xl max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="border-b border-ink/10 px-5 py-3 flex items-center justify-between">
              <div className="text-sm font-medium">Versão</div>
              <button
                onClick={() => setOpen(false)}
                className="text-ink-mute hover:text-ink text-xs uppercase tracking-wider"
              >
                fechar
              </button>
            </header>
            <div className="overflow-y-auto p-3">
              {Object.entries(grouped).map(([group, vs]) => (
                <div key={group} className="mb-4 last:mb-0">
                  <p className="text-xs uppercase tracking-widest text-ink-mute px-2 py-1.5">
                    {group}
                  </p>
                  <ul className="space-y-0.5">
                    {vs.map((v) => (
                      <li key={v.id}>
                        <button
                          onClick={() => choose(v.id)}
                          className={`w-full text-left p-2.5 rounded-md hover:bg-ink/5 transition-colors flex items-baseline justify-between ${
                            v.id === current ? "bg-ink/5" : ""
                          }`}
                        >
                          <span className="text-sm">{v.name}</span>
                          <span
                            className={`text-xs uppercase tracking-wider ${
                              v.id === current
                                ? "font-semibold"
                                : "text-ink-mute"
                            }`}
                          >
                            {v.abbr}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
