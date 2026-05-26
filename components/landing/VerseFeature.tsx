"use client";

import { useScrollReveal } from "./useScrollReveal";

export default function VerseFeature() {
  useScrollReveal();

  return (
    <section
      id="devocional"
      className="section-y relative overflow-hidden border-b border-hairline"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <span className="absolute top-16 left-8 text-gold/40 text-3xl">✦</span>
        <span className="absolute bottom-20 right-12 text-gold/30 text-2xl">
          ✦
        </span>
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,97,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(232,213,160,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-page max-w-4xl text-center relative">
        <div className="fade-up mb-12">
          <span className="tag-gold">✦ HOJE — CURADO PARA VOCÊ</span>
        </div>

        <blockquote
          className="fade-up font-serif font-light leading-[1.1] tracking-tight italic"
          style={{ fontSize: "clamp(40px, 7vw, 110px)" }}
        >
          &ldquo;Porque Deus amou o mundo de tal maneira que deu o seu Filho
          unigênito, para que todo aquele que nele crê não pereça, mas tenha a
          vida eterna.&rdquo;
        </blockquote>

        <cite className="fade-up not-italic mt-8 inline-block font-mono text-sm uppercase tracking-[0.3em] text-gold-dark">
          — JOÃO 3:16
        </cite>

        <div
          className="fade-up mt-16 flex flex-wrap items-center justify-center gap-8"
          role="group"
          aria-label="Ações do versículo"
        >
          {["COMPARTILHAR", "SALVAR", "EXPLICAR COM IA"].map((label) => (
            <button
              key={label}
              type="button"
              className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft hover:text-gold-dark transition-colors"
            >
              <span
                className="w-8 h-px bg-current transition-all group-hover:w-12"
                aria-hidden
              />
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
