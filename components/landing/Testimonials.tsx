"use client";

import { useScrollReveal } from "./useScrollReveal";

const ITEMS = [
  {
    text: "Em vinte anos de ministério, nunca vi uma ferramenta que aprofundasse tanto a leitura da Palavra. A AI Bible não substituiu o estudo — ela o multiplicou.",
    name: "Pr. Ricardo Melo",
    role: "Pastor — Igreja Batista, Belo Horizonte",
  },
  {
    text: "Eu lia a Bíblia há anos sem entender muita coisa. Agora pergunto e a IA me explica em segundos. Foi o que faltava para minha fé crescer de verdade.",
    name: "Júlia Andrade",
    role: "Estudante, 22 anos — Curitiba",
  },
  {
    text: "Uso para preparar minhas aulas de escola dominical. Os comentários sobre o grego original mudaram completamente a profundidade do que ensino. Indispensável.",
    name: "Carla Teixeira",
    role: "Professora — Recife, PE",
  },
];

export default function Testimonials() {
  useScrollReveal();
  return (
    <section
      id="comunidade"
      className="section-y bg-paper border-b border-hairline"
    >
      <div className="container-page">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <div className="section-eyebrow fade-up">07 — DEPOIMENTOS</div>
          <h2 className="h-display-md fade-up mt-6">
            Histórias de{" "}
            <em className="text-gold-dark">transformação.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {ITEMS.map((t) => (
            <article
              key={t.name}
              tabIndex={0}
              className="fade-up glass-card p-7 lg:p-8 relative"
            >
              <span
                aria-hidden
                className="absolute -top-2 left-4 font-serif text-7xl text-gold-dark/30 leading-none select-none"
              >
                &ldquo;
              </span>
              <blockquote className="font-serif text-lg leading-relaxed mt-4 mb-8">
                {t.text}
              </blockquote>
              <footer className="border-t border-hairline pt-4">
                <div className="font-medium text-sm">{t.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mt-1">
                  {t.role}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
