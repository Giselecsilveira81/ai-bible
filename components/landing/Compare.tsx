"use client";

import { useScrollReveal } from "./useScrollReveal";

const ROWS = [
  {
    label: "Perguntas sobre versículos",
    old: "Sem resposta",
    novo: "Respondidas em segundos",
  },
  {
    label: "Planos de leitura",
    old: "Genéricos",
    novo: "Únicos para você",
  },
  {
    label: "Grego e Hebraico",
    old: "Inacessível",
    novo: "Traduzido em contexto",
  },
  {
    label: "Versículo do dia",
    old: "Aleatório",
    novo: "Para o seu momento",
  },
  {
    label: "Comentários bíblicos",
    old: "Em livros caros",
    novo: "Instantâneos e gratuitos",
  },
];

export default function Compare() {
  useScrollReveal();
  return (
    <section className="section-y border-b border-hairline">
      <div className="container-page">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <div className="section-eyebrow fade-up">06 — COMPARAÇÃO</div>
          <h2 className="h-display-md fade-up mt-6">
            Antes <em className="text-gold-dark">e depois.</em>
          </h2>
        </div>

        <div
          role="table"
          aria-label="Comparação entre Bíblias tradicionais e AI Bible"
          className="border border-hairline rounded-2xl overflow-hidden bg-white"
        >
          <div
            role="row"
            className="hidden sm:grid grid-cols-3 border-b border-hairline bg-paper-warm"
          >
            <div role="columnheader" />
            <div
              role="columnheader"
              className="p-5 lg:p-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute"
            >
              Bíblias Tradicionais
            </div>
            <div
              role="columnheader"
              className="p-5 lg:p-6 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dark"
            >
              AI Bible
            </div>
          </div>

          {ROWS.map((r, i) => (
            <div
              key={r.label}
              role="row"
              className={`fade-up grid grid-cols-1 sm:grid-cols-3 ${
                i < ROWS.length - 1 ? "border-b border-hairline" : ""
              }`}
            >
              <div
                role="rowheader"
                className="p-5 lg:p-6 font-serif text-base sm:text-lg sm:border-r border-hairline"
              >
                {r.label}
              </div>
              <div
                role="cell"
                className="p-5 lg:p-6 text-sm text-ink-mute flex items-center gap-3 sm:border-r border-hairline"
              >
                <span aria-hidden className="text-red-400 text-lg">
                  ✗
                </span>
                {r.old}
              </div>
              <div
                role="cell"
                className="p-5 lg:p-6 text-sm flex items-center gap-3"
              >
                <span aria-hidden className="text-gold-dark text-lg">
                  ✓
                </span>
                {r.novo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
