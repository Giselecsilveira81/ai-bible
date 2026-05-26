"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";

const POINTS = [
  "Explicações teológicas em linguagem acessível",
  "Referências cruzadas automáticas em toda a Escritura",
  "Contexto histórico, cultural e linguístico",
  "Manuscritos originais em grego e hebraico",
  "Aplicações práticas para a sua vida hoje",
];

export default function ShowcaseAI() {
  useScrollReveal();

  return (
    <section
      id="ia"
      className="section-y bg-paper border-b border-hairline"
    >
      <div className="container-page grid lg:grid-cols-[1.45fr_0.55fr] gap-10 lg:gap-14 items-center">
        <div className="order-1 lg:order-2 relative">
          <span
            aria-hidden
            className="absolute -top-12 -left-4 font-serif text-transparent leading-none select-none pointer-events-none"
            style={{
              fontSize: "180px",
              WebkitTextStroke: "1px rgba(201,169,97,0.25)",
            }}
          >
            03
          </span>
          <div className="relative">
            <div className="section-eyebrow fade-up">— RECURSO PRINCIPAL</div>
            <h2 className="h-display-md fade-up mt-6">
              Converse <em className="text-gold-dark">com a Palavra.</em>
            </h2>
            <p className="fade-up mt-6 text-lg text-ink-soft leading-relaxed max-w-xl">
              Toque em qualquer versículo. Faça qualquer pergunta. Receba
              respostas profundas, contextualizadas e referenciadas em segundos
              — não em semanas de estudo.
            </p>
            <ul className="mt-10 space-y-3">
              {POINTS.map((p) => (
                <li
                  key={p}
                  className="fade-up flex items-start gap-3 text-ink-soft"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/chat"
              className="fade-up inline-flex items-center gap-3 mt-10 group font-mono text-xs uppercase tracking-[0.25em] border-b border-ink/30 hover:border-gold pb-2 transition-colors"
              aria-label="Abrir o chat conselheiro"
            >
              <span>Abrir o chat</span>
              <span className="transition-transform group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="fade-up order-2 lg:order-1 relative">
          <Image
            src="/landing/showcase-chat.png"
            alt="AI Bible — chat com IA"
            width={1200}
            height={1200}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
