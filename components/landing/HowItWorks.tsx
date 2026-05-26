"use client";

import { useScrollReveal } from "./useScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "Baixe o app.",
    desc: "iOS, Android ou Web. Gratuito para começar. Sem cartão de crédito.",
  },
  {
    num: "02",
    title: "Escolha sua tradução.",
    desc: "A IA recomenda a melhor para o seu perfil. Troque a qualquer momento.",
  },
  {
    num: "03",
    title: "Comece a conversar.",
    desc: "Toque em qualquer versículo. Pergunte. Receba. Aplique. Transforme.",
  },
];

export default function HowItWorks() {
  useScrollReveal();
  return (
    <section className="section-y bg-paper border-b border-hairline">
      <div className="container-page">
        <div className="max-w-2xl mb-16 lg:mb-24">
          <div className="section-eyebrow fade-up">05 — COMO FUNCIONA</div>
          <h2 className="h-display-md fade-up mt-6">
            Simples.
            <br />
            <em className="text-gold-dark">Profundo.</em>
          </h2>
          <p className="fade-up mt-6 text-lg text-ink-soft leading-relaxed">
            Três passos para uma das experiências mais transformadoras com a
            Palavra.
          </p>
        </div>

        <ol className="relative grid lg:grid-cols-3 gap-12 lg:gap-8">
          <div
            aria-hidden
            className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          {STEPS.map((s) => (
            <li key={s.num} className="fade-up relative">
              <div className="relative w-24 h-24 rounded-full bg-white border border-hairline-gold flex items-center justify-center mb-8 shadow-soft-sm">
                <span className="font-serif text-3xl text-gold-dark">
                  {s.num}
                </span>
              </div>
              <h3 className="font-serif text-2xl tracking-tight mb-3">
                {s.title}
              </h3>
              <p className="text-ink-soft leading-relaxed max-w-xs">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
