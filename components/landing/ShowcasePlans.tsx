"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";

const PLANS = [
  { title: "Ansiedade & Fé", meta: "21 DIAS · IA PERSONALIZADO" },
  { title: "Liderança Cristã", meta: "30 DIAS · IA PERSONALIZADO" },
  { title: "Casamento & Amor", meta: "14 DIAS · IA PERSONALIZADO" },
];

export default function ShowcasePlans() {
  useScrollReveal();

  return (
    <section
      id="planos"
      className="section-y bg-paper border-b border-hairline"
    >
      <div className="container-page grid lg:grid-cols-[0.55fr_1.45fr] gap-10 lg:gap-14 items-center">
        <div className="relative">
          <span
            aria-hidden
            className="absolute -top-12 -left-4 font-serif text-transparent leading-none select-none pointer-events-none"
            style={{
              fontSize: "180px",
              WebkitTextStroke: "1px rgba(201,169,97,0.25)",
            }}
          >
            04
          </span>
          <div className="relative">
            <div className="section-eyebrow fade-up">
              — PLANOS DE LEITURA
            </div>
            <h2 className="h-display-md fade-up mt-6">
              Sua jornada.
              <br />
              <em className="text-gold-dark">Desenhada por IA.</em>
            </h2>
            <p className="fade-up mt-6 text-lg text-ink-soft leading-relaxed max-w-xl">
              Esqueça planos genéricos. A AI Bible cria uma jornada de leitura
              única, baseada na sua estação de vida, suas perguntas e seu ritmo
              espiritual.
            </p>
            <ul className="mt-10 space-y-3">
              {PLANS.map((p) => (
                <li key={p.title}>
                  <Link
                    href="/plans"
                    className="fade-up card-soft group flex items-center justify-between p-5 hover:border-gold transition-all"
                    aria-label={`Plano ${p.title}`}
                  >
                    <div>
                      <span className="font-serif text-xl tracking-tight">
                        {p.title}
                      </span>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mt-1">
                        {p.meta}
                      </div>
                    </div>
                    <span className="text-gold-dark text-xl transition-transform group-hover:translate-x-2">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fade-up relative">
          <Image
            src="/landing/showcase-plans.png"
            alt="AI Bible — planos de leitura"
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
