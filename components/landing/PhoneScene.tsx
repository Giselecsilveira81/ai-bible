"use client";

import { useParallax } from "./useParallax";

/**
 * Cena hero: celular preto sobre pedestal circular branco,
 * ondas de luz dourada atrás, 6 cards flutuantes em volta.
 * Tudo construído em código — cada elemento se move independentemente.
 */
export default function PhoneScene() {
  const phoneRef = useParallax<HTMLDivElement>(0.04);
  const card1Ref = useParallax<HTMLDivElement>(0.14);
  const card2Ref = useParallax<HTMLDivElement>(-0.12);
  const card3Ref = useParallax<HTMLDivElement>(0.1);
  const card4Ref = useParallax<HTMLDivElement>(-0.15);
  const card5Ref = useParallax<HTMLDivElement>(0.13);
  const card6Ref = useParallax<HTMLDivElement>(-0.08);

  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: 760 }}>
      <div
        className="relative mx-auto"
        style={{ aspectRatio: "1 / 1.05", maxWidth: 720 }}
      >
        {/* Ondas de luz dourada atrás */}
        <GoldenWaves />

        {/* Pedestal circular embaixo */}
        <Pedestal />

        {/* Celular flutuante */}
        <div
          ref={phoneRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] will-change-transform"
          style={{ animation: "float-y-key 6s ease-in-out infinite" }}
        >
          <Phone />
        </div>

        {/* Cards flutuantes — LADO ESQUERDO */}
        <FloatingCard
          ref={card1Ref}
          className="left-0 top-[12%]"
          delay="0.4s"
          duration="5s"
        >
          <CardHeader icon="☀" label="VERSÍCULO DO DIA" />
          <div className="font-serif text-base font-medium mt-2">
            Salmos 118:24
          </div>
          <p className="text-[11px] text-ink-soft leading-snug mt-1.5">
            Este é o dia que o Senhor fez; alegremo-nos e exultemos neste dia.
          </p>
        </FloatingCard>

        <FloatingCard
          ref={card2Ref}
          className="left-0 top-[42%]"
          delay="1s"
          duration="6s"
        >
          <CardHeader icon="✎" label="ANOTAÇÃO" />
          <div className="text-[13px] font-medium mt-2">Reflexão</div>
          <p className="text-[11px] text-ink-soft leading-snug mt-1">
            Deus nos convida a viver cada dia com propósito e gratidão.
          </p>
          <div className="text-[9px] font-mono uppercase tracking-widest text-ink-mute mt-2">
            Hoje, 08:30
          </div>
        </FloatingCard>

        <FloatingCard
          ref={card3Ref}
          className="left-0 top-[72%]"
          delay="0s"
          duration="7s"
        >
          <CardHeader icon="📖" label="PLANO EM ANDAMENTO" />
          <div className="text-[13px] font-medium mt-2">Fé que transforma</div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-mono text-ink-mute">
              Dia 12 de 30
            </span>
            <span className="text-[10px] font-mono text-gold-dark">40%</span>
          </div>
          <div className="h-1 bg-paper-warm rounded-full mt-1.5 overflow-hidden">
            <div className="h-full bg-gold" style={{ width: "40%" }} />
          </div>
        </FloatingCard>

        {/* Cards flutuantes — LADO DIREITO */}
        <FloatingCard
          ref={card4Ref}
          className="right-0 top-[10%]"
          delay="0.6s"
          duration="5.5s"
        >
          <CardHeader icon="✦" label="EXPLICAÇÃO COM IA" />
          <p className="text-[11px] text-ink-soft leading-snug mt-2">
            João 3:16 é um dos versículos mais conhecidos e resume o evangelho:
            o amor de Deus que oferece salvação através de Jesus.
          </p>
          <div className="text-[9px] font-mono uppercase tracking-widest text-gold-dark mt-2">
            ✦ Gerado por IA
          </div>
        </FloatingCard>

        <FloatingCard
          ref={card5Ref}
          className="right-0 top-[42%]"
          delay="1.2s"
          duration="6.5s"
        >
          <CardHeader icon="🔗" label="VERSÍCULOS RELACIONADOS" />
          <ul className="mt-2 space-y-1">
            {["Romanos 5:8", "1 João 4:9", "João 15:13"].map((r) => (
              <li
                key={r}
                className="flex items-center justify-between text-[11px]"
              >
                <span>{r}</span>
                <span className="text-gold-dark">›</span>
              </li>
            ))}
          </ul>
        </FloatingCard>

        <FloatingCard
          ref={card6Ref}
          className="right-0 top-[72%]"
          delay="0.3s"
          duration="5.2s"
        >
          <CardHeader icon="🔔" label="LEMBRETE" />
          <div className="text-[13px] font-medium mt-2">Meditar na Palavra</div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-mono text-ink-mute">
              Todos os dias às 07:00
            </span>
            <span className="w-6 h-3 rounded-full bg-gold relative shrink-0">
              <span className="absolute right-0.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
            </span>
          </div>
        </FloatingCard>
      </div>
    </div>
  );
}

/* ─────────────────────── Sub-componentes ─────────────────────── */

import { forwardRef } from "react";

const FloatingCard = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    delay?: string;
    duration?: string;
    children: React.ReactNode;
  }
>(function FloatingCard({ className = "", delay = "0s", duration = "5s", children }, ref) {
  return (
    <div
      ref={ref}
      className={`absolute z-10 w-[180px] lg:w-[210px] rounded-2xl bg-white border border-hairline shadow-soft-md p-3.5 ${className}`}
      style={{
        animation: `float-y-key ${duration} ease-in-out infinite`,
        animationDelay: delay,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
});

function CardHeader({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-gold-dark text-sm leading-none">{icon}</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-mute">
        {label}
      </span>
    </div>
  );
}

function Phone() {
  return (
    <div
      className="relative"
      style={{
        width: 280,
        aspectRatio: "9 / 19",
        borderRadius: 42,
        background: "linear-gradient(145deg, #1a1815 0%, #0a0908 100%)",
        padding: 6,
        boxShadow:
          "0 60px 120px rgba(10,10,10,0.32), 0 20px 40px rgba(201,169,97,0.18), inset 0 0 0 1px rgba(201,169,97,0.18)",
      }}
    >
      <div
        className="relative w-full h-full overflow-hidden bg-paper"
        style={{ borderRadius: 36 }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-ink z-10" />

        {/* Status bar */}
        <div className="absolute top-3 left-5 right-5 flex justify-between items-center font-mono text-[9px] text-ink z-10">
          <span>9:41</span>
          <span className="opacity-60">●●● 5G 99%</span>
        </div>

        {/* App header */}
        <div className="pt-11 px-5 pb-3 flex items-center justify-center border-b border-hairline">
          <div className="inline-flex items-center gap-1.5">
            <span className="text-gold text-sm leading-none">✦</span>
            <span className="font-serif text-[11px] tracking-tight font-medium">
              AI BIBLE
            </span>
          </div>
        </div>

        {/* Reading content */}
        <div className="px-5 pt-5 pb-3 flex-1">
          <h3 className="text-center font-serif text-2xl tracking-tight leading-none">
            João 3:16
          </h3>
          <div className="flex items-center justify-center gap-2 mt-3 mb-4">
            <span className="w-6 h-px bg-hairline-gold" />
            <span className="text-gold text-[10px] leading-none">✦</span>
            <span className="w-6 h-px bg-hairline-gold" />
          </div>
          <p className="font-serif text-[11px] leading-relaxed text-ink text-center">
            Porque Deus amou o mundo de tal maneira que deu o seu Filho
            unigênito, para que todo aquele que nele crê não pereça, mas tenha
            a vida eterna.
          </p>
          <p className="font-serif italic text-[9px] text-ink-mute text-center mt-3">
            Almeida Revista e Corrigida
          </p>
        </div>

        {/* Tab bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-hairline bg-paper/90 backdrop-blur-sm flex justify-around items-center py-2">
          {[
            { i: "🏠", l: "Início", active: true },
            { i: "📖", l: "Bíblia" },
            { i: "📅", l: "Plano" },
            { i: "✦", l: "IA" },
            { i: "○", l: "Perfil" },
          ].map((t) => (
            <div
              key={t.l}
              className="flex flex-col items-center gap-0.5"
              style={{ color: t.active ? "#8B6F2A" : "#6B6B6B" }}
            >
              <span className="text-[10px] leading-none">{t.i}</span>
              <span className="font-mono text-[7px] uppercase tracking-widest">
                {t.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pedestal() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ bottom: "3%", width: 360 }}
    >
      {/* Disco branco */}
      <div
        className="mx-auto rounded-full"
        style={{
          width: "100%",
          aspectRatio: "5 / 1.4",
          background:
            "radial-gradient(ellipse at center top, #ffffff 0%, #f5f1e8 70%, #e8d5a0 100%)",
          boxShadow:
            "0 20px 60px rgba(201,169,97,0.35), inset 0 -1px 0 rgba(201,169,97,0.4)",
        }}
      />
      {/* Anel de luz dourada */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: -6,
          width: "85%",
          height: 14,
          background:
            "radial-gradient(ellipse at center, rgba(232,213,160,0.9) 0%, rgba(201,169,97,0.5) 40%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}

function GoldenWaves() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 800"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="goldWave" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#C9A961" stopOpacity="0" />
          <stop offset="50%" stopColor="#E8D5A0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g style={{ filter: "blur(1.5px)" }}>
        <path
          d="M 0 380 Q 200 320 400 380 T 800 380"
          stroke="url(#goldWave)"
          strokeWidth="2"
          fill="none"
          style={{
            animation: "wave-flow 8s ease-in-out infinite",
            transformOrigin: "center",
          }}
        />
        <path
          d="M 0 430 Q 250 360 500 430 T 800 430"
          stroke="url(#goldWave)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
          style={{
            animation: "wave-flow 10s ease-in-out infinite reverse",
          }}
        />
        <path
          d="M 0 480 Q 180 420 400 480 T 800 480"
          stroke="url(#goldWave)"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
          style={{
            animation: "wave-flow 12s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
        <path
          d="M 0 530 Q 220 460 500 530 T 800 530"
          stroke="url(#goldWave)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.4"
          style={{
            animation: "wave-flow 11s ease-in-out infinite reverse",
            animationDelay: "0.5s",
          }}
        />
      </g>
    </svg>
  );
}
