"use client";

import { useScrollReveal } from "./useScrollReveal";

export default function Manifesto() {
  useScrollReveal();

  return (
    <section
      id="about"
      className="section-y border-b border-hairline"
    >
      <div className="container-page grid lg:grid-cols-12 gap-8 lg:gap-16">
        <div
          className="lg:col-span-3 flex items-start"
          aria-hidden
        >
          <span
            className="font-serif font-extralight text-transparent leading-none"
            style={{
              fontSize: "clamp(120px, 22vw, 280px)",
              WebkitTextStroke: "1px rgba(201,169,97,0.35)",
            }}
          >
            02
          </span>
        </div>
        <div className="lg:col-span-9 max-w-3xl">
          <div className="section-eyebrow fade-up">— MANIFESTO</div>
          <h2 className="h-display-md fade-up mt-6">
            Não é mais uma Bíblia digital.
            <br />É a primeira Bíblia que
            <br />
            <em className="text-gold-dark">pensa com você.</em>
          </h2>
          <div className="fade-up mt-10 grid sm:grid-cols-2 gap-8 text-ink-soft leading-relaxed">
            <p>
              Há séculos a Palavra foi lida da mesma forma — em silêncio, com
              perguntas que ficavam sem resposta. A AI Bible mudou isso. Cada
              versículo agora dialoga, contextualiza, ilumina. Não substitui a
              fé. Aprofunda.
            </p>
            <p>
              Construímos uma inteligência treinada nos manuscritos originais
              em grego e hebraico, nos comentários dos pais da igreja, nas
              traduções mais respeitadas — para que a sua leitura nunca mais
              seja a mesma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
