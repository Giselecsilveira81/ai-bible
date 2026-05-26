"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";
import { useParallax } from "./useParallax";

const PLANS = [
  { title: "Ansiedade & Fé", meta: "21 DIAS · IA PERSONALIZADO" },
  { title: "Liderança Cristã", meta: "30 DIAS · IA PERSONALIZADO" },
  { title: "Casamento & Amor", meta: "14 DIAS · IA PERSONALIZADO" },
];

export default function ShowcasePlans() {
  useScrollReveal();
  const mockupRef = useParallax<HTMLDivElement>(0.08, "rotate(3deg)");
  const [useImage, setUseImage] = useState(false);

  useEffect(() => {
    fetch("/landing/showcase-plans.png", { method: "HEAD" })
      .then((r) => setUseImage(r.ok))
      .catch(() => setUseImage(false));
  }, []);

  return (
    <section
      id="planos"
      className="section-y bg-paper border-b border-hairline"
    >
      <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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

        <div className="fade-up relative" aria-hidden>
          {!useImage && (
            <div
              className="absolute inset-0 blur-3xl opacity-25"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,213,160,0.5) 0%, transparent 65%)",
              }}
            />
          )}
          {useImage ? (
            <div
              ref={mockupRef}
              className="relative mx-auto w-full max-w-[640px]"
              style={{ transform: "rotate(2deg)" }}
            >
              <div
                className="float-y"
                style={{ willChange: "transform" }}
              >
                <Image
                  src="/landing/showcase-plans.png"
                  alt="AI Bible — celular pedestal mostrando plano de leitura"
                  width={1536}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ) : (
          <div
            ref={mockupRef}
            className="relative mx-auto max-w-[360px] aspect-[9/16] rounded-[32px] border border-hairline bg-white shadow-mockup overflow-hidden"
            style={{ transform: "rotate(3deg)" }}
          >
            <div className="px-5 pt-6">
              <div className="font-mono text-[9px] uppercase tracking-widest text-gold-dark mb-2">
                ✦ SEU PLANO
              </div>
              <div className="font-serif text-2xl leading-tight mb-1">
                Ansiedade & Fé
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                Dia 7 de 21
              </div>
              <div className="mt-4 h-1 rounded-full bg-paper-warm overflow-hidden">
                <div className="h-full bg-gold" style={{ width: "33%" }} />
              </div>
              <div className="mt-6 space-y-3">
                {[
                  "Salmo 23 — O Senhor é meu pastor",
                  "Filipenses 4:6-7 — Paz que excede",
                  "Mateus 6:25-34 — Não vos inquieteis",
                ].map((t, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-hairline px-4 py-3 text-xs"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
