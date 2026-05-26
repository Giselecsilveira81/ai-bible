"use client";

import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";

type BentoCard = {
  num: string;
  title: string;
  desc?: string;
  span: string;
  bigText?: string;
  href: string;
};

const CARDS: BentoCard[] = [
  {
    num: "01",
    title: "Leitura Completa em tempo real.",
    desc: "50+ traduções (NVI, ARA, ACF, NTLH, KJV…) com IA explicando cada versículo no momento em que você lê — contexto histórico, cultural e teológico integrado.",
    span: "lg:col-span-7 lg:row-span-2",
    bigText: "LEITURA",
    href: "/bible/acf/genesis/1",
  },
  {
    num: "02",
    title: "Pergunte à IA.",
    desc: "Respostas teológicas profundas, referenciadas nos manuscritos originais e comentários históricos.",
    span: "lg:col-span-5 lg:row-span-2",
    href: "/chat",
  },
  {
    num: "03",
    title: "Planos Inteligentes.",
    span: "lg:col-span-4",
    href: "/plans",
  },
  {
    num: "04",
    title: "Versículo do Dia.",
    desc: "Curado pela IA para o seu momento — não aleatório, intencional.",
    span: "lg:col-span-4 lg:row-span-2",
    href: "/app",
  },
  {
    num: "05",
    title: "Devocional Personalizado.",
    desc: "Gerado pela IA especificamente para você — baseado no seu histórico, estação de vida e intenções de oração.",
    span: "lg:col-span-8",
    href: "/app",
  },
  {
    num: "06",
    title: "Comunidade Inteligente.",
    span: "lg:col-span-4",
    href: "/discover",
  },
  {
    num: "07",
    title: "Áudio Bíblia.",
    span: "lg:col-span-4",
    href: "/bible/acf/genesis/1",
  },
  {
    num: "08",
    title: "Estudo Profundo.",
    span: "lg:col-span-4",
    href: "/bible/acf/genesis/1",
  },
];

export default function Features() {
  useScrollReveal();

  return (
    <section
      id="biblia"
      className="section-y bg-paper border-b border-hairline"
    >
      <div className="container-page">
        <div className="fade-up max-w-3xl mb-16 lg:mb-24">
          <div className="section-eyebrow">03 — RECURSOS</div>
          <h2 className="h-display-md mt-6">
            Tudo da Bíblia.
            <br />
            <em className="text-gold-dark">Mais inteligência.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 auto-rows-[180px] lg:auto-rows-[200px] gap-3">
          {CARDS.map((c) => (
            <BentoItem key={c.num} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoItem({ card }: { card: BentoCard }) {
  return (
    <Link
      href={card.href}
      className={`fade-up relative overflow-hidden card-soft group cursor-pointer transition-all duration-500 hover:shadow-soft-lg hover:-translate-y-1 hover:border-gold ${card.span} col-span-2 block`}
    >
      <div className="relative h-full p-5 lg:p-7 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-gold-dark">
            {card.num}
          </span>
          <span
            aria-hidden
            className="text-gold-dark opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
          >
            →
          </span>
        </div>
        <h3 className="font-serif text-2xl lg:text-3xl leading-tight tracking-tight mb-3">
          {card.title}
        </h3>
        {card.desc && (
          <p className="text-sm text-ink-soft leading-relaxed mb-auto max-w-md">
            {card.desc}
          </p>
        )}
        <div className="mt-6">
          <span className="tag-gold">✦ Powered by AI</span>
        </div>
      </div>

      {card.bigText && (
        <span
          aria-hidden
          className="absolute -right-4 -bottom-12 font-serif text-transparent leading-none opacity-20 select-none pointer-events-none"
          style={{
            fontSize: "180px",
            WebkitTextStroke: "1px rgba(201,169,97,0.4)",
          }}
        >
          {card.bigText}
        </span>
      )}
    </Link>
  );
}
