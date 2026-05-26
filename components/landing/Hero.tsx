"use client";

import { useEffect } from "react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

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
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, #FAF6EF 0%, #F2EBE0 40%, #EAE0D0 100%)",
      }}
    >
      {/* Warm glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "45%",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(201,169,97,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-page grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-6 items-center min-h-[80vh]">
        {/* Coluna texto */}
        <div>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="tag-mono">✦ Powered by AI</span>
            <span className="tag-border">iOS · Android · Web</span>
          </div>

          <h1 className="h-display-xl">
            <span className="hero-line split-reveal">A Bíblia.</span>
            <span className="hero-line split-reveal">Mais profunda.</span>
            <span className="hero-line split-reveal text-gold-dark italic">
              Mais viva.
            </span>
          </h1>

          <p className="hero-fade fade-up mt-8 text-lg lg:text-xl text-ink-soft leading-relaxed max-w-xl">
            AI Bible é o seu companheiro espiritual diário. Com IA avançada,
            explore escrituras, receba respostas, faça anotações e cresça na
            presença de Deus — onde estiver.
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
            {/* Avatares */}
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-paper"
                  style={{
                    background: `hsl(${35 + i * 15}, 40%, ${70 - i * 5}%)`,
                  }}
                />
              ))}
            </div>
            <div className="flex text-gold" aria-label="5 estrelas">
              ★★★★★
            </div>
            <span className="text-sm text-ink-mute">
              Confiado por 50.000+ cristãos
            </span>
          </div>
        </div>

        {/* Coluna mockup */}
        <div className="hero-fade fade-up flex justify-center lg:justify-end">
          <div className="relative w-full" style={{ maxWidth: 750 }}>
            <Image
              src="/landing/hero-visual.jpg"
              alt="AI Bible app mockup"
              width={1500}
              height={1500}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-auto"
              priority
            />
          </div>
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
