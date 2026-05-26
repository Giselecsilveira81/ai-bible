"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";
import { useParallax } from "./useParallax";

const POINTS = [
  "Explicações teológicas em linguagem acessível",
  "Referências cruzadas automáticas em toda a Escritura",
  "Contexto histórico, cultural e linguístico",
  "Manuscritos originais em grego e hebraico",
  "Aplicações práticas para a sua vida hoje",
];

export default function ShowcaseAI() {
  useScrollReveal();
  const mockupRef = useParallax<HTMLDivElement>(0.08, "rotate(-3deg)");
  const [useImage, setUseImage] = useState(false);

  useEffect(() => {
    fetch("/landing/showcase-ai.png", { method: "HEAD" })
      .then((r) => setUseImage(r.ok))
      .catch(() => setUseImage(false));
  }, []);

  return (
    <section
      id="ia"
      className="section-y bg-paper border-b border-hairline"
    >
      <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="fade-up relative order-2 lg:order-1" aria-hidden>
          {!useImage && (
            <div
              className="absolute inset-0 blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,169,97,0.45) 0%, transparent 65%)",
              }}
            />
          )}
          {useImage ? (
            <div
              ref={mockupRef}
              className="relative mx-auto w-full max-w-[640px]"
              style={{ transform: "rotate(-2deg)" }}
            >
              <div
                className="float-y"
                style={{ willChange: "transform" }}
              >
                <Image
                  src="/landing/showcase-ai.png"
                  alt="AI Bible — celular pedestal mostrando chat IA"
                  width={1536}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ) : (
            <>
              <div
                ref={mockupRef}
                className="relative mx-auto max-w-[360px] aspect-[9/16] rounded-[32px] border border-hairline bg-white shadow-mockup overflow-hidden"
                style={{ transform: "rotate(-3deg)" }}
              >
                <div className="px-5 pt-6">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-gold-dark mb-2">
                    ✦ AI BIBLE — CHAT
                  </div>
                  <div className="rounded-2xl bg-paper-warm px-4 py-3 text-xs leading-relaxed">
                    Por que Romanos 8 fala de criação gemendo?
                  </div>
                  <div className="mt-3 rounded-2xl border border-hairline-gold bg-gold-pale px-4 py-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-gold-dark mb-2">
                      ✦ resposta
                    </div>
                    <p className="text-xs leading-relaxed">
                      Paulo usa <em>systenazo</em> — &ldquo;gemer junto&rdquo; — para
                      descrever a criação aguardando a redenção. Imagem de parto:
                      dor que prenuncia nova vida.
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex absolute -right-2 top-1/3 glass-card px-4 py-3 items-center gap-3 shadow-soft-md">
                <span className="text-gold text-xl">✦</span>
                <div>
                  <div className="text-xs">Respondendo em 2s</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-ink-mute">
                    Baseado em 4 comentaristas
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

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
      </div>
    </section>
  );
}
