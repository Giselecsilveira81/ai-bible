"use client";

import { useScrollReveal } from "./useScrollReveal";
import MagneticButton from "./MagneticButton";

export default function CTAFinal() {
  useScrollReveal();
  return (
    <section
      id="download"
      className="relative overflow-hidden section-y bg-ink text-paper"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,97,0.5) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(232,213,160,0.4) 0%, transparent 65%)",
          }}
        />
        <span className="absolute top-16 left-1/2 -translate-x-1/2 text-gold/60 text-4xl float-y">
          ✦
        </span>
      </div>

      <div className="container-page max-w-5xl text-center relative">
        <div
          className="fade-up font-mono text-[11px] uppercase tracking-[0.3em] text-gold"
        >
          — COMECE HOJE
        </div>
        <h2
          className="fade-up h-display mt-8"
          style={{ fontSize: "clamp(64px, 12vw, 200px)" }}
        >
          Comece sua
          <br />
          <em className="text-gold">jornada.</em>
        </h2>
        <p className="fade-up mt-10 text-lg lg:text-xl text-paper/70 leading-relaxed max-w-2xl mx-auto">
          A Palavra está esperando. A inteligência está pronta.
          <br />
          Falta apenas você.
        </p>

        <div
          className="fade-up mt-14 flex flex-wrap items-center justify-center gap-3"
          role="group"
          aria-label="Como começar"
        >
          <MagneticButton
            href="/app"
            variant="gold"
            size="lg"
            ariaLabel="Abrir o app"
          >
            Abrir o app
          </MagneticButton>
          <MagneticButton
            href="/bible/acf/genesis/1"
            variant="gold"
            size="lg"
            ariaLabel="Abrir a Bíblia"
          >
            Abrir a Bíblia
          </MagneticButton>
          <MagneticButton
            href="/chat"
            variant="gold"
            size="lg"
            ariaLabel="Abrir o chat"
          >
            Falar com a IA
          </MagneticButton>
        </div>

        <div className="fade-up mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50">
          Gratuito para começar · Sem cartão de crédito · Disponível em 2026
        </div>
      </div>
    </section>
  );
}
