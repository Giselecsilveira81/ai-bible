"use client";

import { useEffect } from "react";
import MagneticButton from "./MagneticButton";
import PhoneScene from "./PhoneScene";

export default function Hero() {
  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>(
      ".hero-line.split-reveal",
    );
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add("in"), 200 + i * 160);
    });
    const fades = document.querySelectorAll<HTMLElement>(".hero-fade.fade-up");
    fades.forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), 700 + i * 120);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-32 lg:pt-40 pb-16"
    >
      <div className="container-page grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-12 items-center min-h-[80vh]">
        {/* Coluna texto */}
        <div>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="tag-mono">✦ Powered by AI</span>
            <span className="tag-border">iOS · Android · Web</span>
          </div>

          <h1 className="h-display-xl">
            <span className="hero-line split-reveal">A Palavra.</span>
            <span className="hero-line split-reveal">Mais profunda</span>
            <span className="hero-line split-reveal text-gold-dark italic">
              do que nunca.
            </span>
          </h1>

          <p className="hero-fade fade-up mt-8 text-lg lg:text-xl text-ink-soft leading-relaxed max-w-xl">
            Aprofunde sua fé, estude a Bíblia e fortaleça sua caminhada com a
            inteligência artificial como ferramenta — comentários, contexto
            histórico, originais em grego e hebraico, planos personalizados. A
            iluminação vem do Senhor.
          </p>

          <div className="hero-fade fade-up mt-10 flex flex-wrap gap-3">
            <MagneticButton href="/app" variant="primary" size="lg">
              Abrir o app
            </MagneticButton>
            <MagneticButton
              href="/bible/acf/genesis/1"
              variant="ghost"
              size="lg"
              ariaLabel="Abrir a Bíblia"
            >
              Abrir a Bíblia →
            </MagneticButton>
          </div>

          <div className="hero-fade fade-up mt-10 flex items-center gap-3">
            <div className="flex text-gold" aria-label="5 estrelas">
              ★★★★★
            </div>
            <span className="text-sm text-ink-mute">
              Confiado por 50.000+ cristãos
            </span>
          </div>
        </div>

        {/* Coluna mockup — cena construída em código (sem PNG) */}
        <div className="hero-fade fade-up">
          <PhoneScene />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-ink/20" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
          role
        </span>
      </div>
    </section>
  );
}
