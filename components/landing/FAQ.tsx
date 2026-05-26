"use client";

import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

const ITEMS = [
  {
    q: "A IA substitui o estudo bíblico tradicional?",
    a: "Não. A AI Bible é uma ferramenta de aprofundamento, não de substituição. Ela traz acesso instantâneo a comentários, traduções e contextos que antes exigiam anos de estudo — mas o encontro com Deus continua sendo seu, pessoal e indelegável.",
  },
  {
    q: "As respostas da IA são teologicamente seguras?",
    a: "Sim. Nossa IA foi treinada e validada por teólogos de diversas tradições cristãs. Toda resposta é referenciada com fontes verificáveis e marcamos quando há divergência entre tradições.",
  },
  {
    q: "Funciona offline?",
    a: "A leitura e os planos funcionam 100% offline. As funções de IA exigem conexão — mas você pode salvar respostas favoritas para consultar a qualquer momento.",
  },
  {
    q: "Posso cancelar a assinatura quando quiser?",
    a: "Sim, sempre. Sem multa, sem fidelidade, sem perguntas. Cancele com um clique e mantenha acesso até o fim do período pago.",
  },
  {
    q: "Quais traduções estão em português?",
    a: "NVI, ARA, ARC, ACF, NTLH, NVT, KJA, A21 e mais. No total, 12 traduções em português brasileiro e 38+ em outros idiomas.",
  },
];

export default function FAQ() {
  useScrollReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-y bg-paper border-b border-hairline">
      <div className="container-page grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="section-eyebrow fade-up">09 — DÚVIDAS</div>
          <h2 className="h-display-md fade-up mt-6">
            Perguntas <em className="text-gold-dark">frequentes.</em>
          </h2>
          <p className="fade-up mt-6 text-ink-soft leading-relaxed">
            Não encontrou? Fale com a gente. Respondemos em 24h.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ul role="list" className="border-t border-hairline">
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={item.q}
                  role="listitem"
                  className="border-b border-hairline"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span className="font-serif text-xl lg:text-2xl tracking-tight">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 w-9 h-9 rounded-full border border-hairline flex items-center justify-center transition-all ${
                        isOpen
                          ? "bg-gold border-gold rotate-45"
                          : "group-hover:border-gold"
                      }`}
                    >
                      <span
                        className={`text-lg leading-none ${
                          isOpen ? "text-ink" : "text-ink-soft"
                        }`}
                      >
                        +
                      </span>
                    </span>
                  </button>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    aria-hidden={!isOpen}
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pb-6"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-ink-soft leading-relaxed max-w-2xl">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
