"use client";

import { forwardRef } from "react";
import {
  Sun,
  Pencil,
  BookOpen,
  Sparkles,
  Link as LinkIcon,
  Bell,
  Home,
  Calendar,
  Settings,
  User,
  Bookmark,
} from "lucide-react";
import { useParallax } from "./useParallax";

export default function PhoneScene() {
  const phoneRef = useParallax<HTMLDivElement>(0.03);
  const c1 = useParallax<HTMLDivElement>(0.14);
  const c2 = useParallax<HTMLDivElement>(-0.12);
  const c3 = useParallax<HTMLDivElement>(0.1);
  const c4 = useParallax<HTMLDivElement>(-0.15);
  const c5 = useParallax<HTMLDivElement>(0.13);
  const c6 = useParallax<HTMLDivElement>(-0.08);

  return (
    <div
      className="relative w-full mx-auto"
      style={{ maxWidth: 860, minHeight: 680 }}
    >
      <GoldenWaves />

      <Pedestal />

      {/* Phone — centered */}
      <div
        ref={phoneRef}
        className="absolute left-1/2 -translate-x-1/2 will-change-transform"
        style={{ top: "8%", animation: "float-y-key 7s ease-in-out infinite" }}
      >
        <Phone />
      </div>

      {/* ── Left cards ── */}
      <FloatingCard
        ref={c1}
        style={{ left: 0, top: "2%" }}
        delay="0.4s"
        duration="5.2s"
      >
        <CardHeader icon={<Sun size={11} />} label="VERSÍCULO DO DIA" />
        <div className="font-serif text-[15px] font-medium mt-2 leading-tight">
          Salmos 118:24
        </div>
        <p className="text-[11px] text-ink-soft leading-snug mt-1.5">
          Este é o dia que o Senhor fez
        </p>
      </FloatingCard>

      <FloatingCard
        ref={c2}
        style={{ left: 0, top: "33%" }}
        delay="1s"
        duration="6s"
      >
        <CardHeader icon={<Pencil size={11} />} label="ANOTAÇÃO" />
        <div className="text-[13px] font-medium mt-2">Reflexão</div>
        <p className="text-[11px] text-ink-soft leading-snug mt-1">
          Deus nos convida a viver cada dia com propósito e gratidão.
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[9px] font-mono uppercase tracking-widest text-ink-mute">
            Hoje, 08:30
          </span>
          <span className="text-ink-mute text-[12px]">···</span>
        </div>
      </FloatingCard>

      <FloatingCard
        ref={c3}
        style={{ left: 0, top: "64%" }}
        delay="0s"
        duration="6.8s"
      >
        <CardHeader
          icon={<BookOpen size={11} />}
          label="PLANO EM ANDAMENTO"
        />
        <div className="text-[13px] font-medium mt-2">Fé que transforma</div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-mono text-ink-mute">
            Dia 12 de 30
          </span>
          <span className="text-[10px] font-mono text-gold-dark font-medium">
            40%
          </span>
        </div>
        <div className="h-1 bg-paper-warm rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full"
            style={{
              width: "40%",
              background:
                "linear-gradient(90deg, #C9A961 0%, #E8D5A0 100%)",
            }}
          />
        </div>
      </FloatingCard>

      {/* ── Right cards ── */}
      <FloatingCard
        ref={c4}
        style={{ right: 0, top: "2%" }}
        delay="0.6s"
        duration="5.5s"
      >
        <CardHeader
          icon={<Sparkles size={11} />}
          label="EXPLICAÇÃO COM IA"
        />
        <p className="text-[11px] text-ink-soft leading-snug mt-2">
          João 3:16 é um dos versículos mais conhecidos da Bíblia e resume o
          evangelho: o amor de Deus que oferece salvação através de Jesus.
        </p>
        <div className="text-[9px] font-mono uppercase tracking-widest text-gold-dark mt-2 inline-flex items-center gap-1">
          <Sparkles size={9} />
          Gerado por IA
        </div>
      </FloatingCard>

      <FloatingCard
        ref={c5}
        style={{ right: 0, top: "33%" }}
        delay="1.2s"
        duration="6.4s"
      >
        <CardHeader
          icon={<LinkIcon size={11} />}
          label="VERSÍCULOS RELACIONADOS"
        />
        <ul className="mt-2 space-y-1.5">
          {["Romanos 5:8", "1 João 4:9", "João 15:13"].map((r) => (
            <li
              key={r}
              className="flex items-center justify-between text-[11px] py-0.5"
            >
              <span>{r}</span>
              <span className="text-gold-dark">›</span>
            </li>
          ))}
        </ul>
      </FloatingCard>

      <FloatingCard
        ref={c6}
        style={{ right: 0, top: "64%" }}
        delay="0.3s"
        duration="5.4s"
      >
        <CardHeader icon={<Bell size={11} />} label="LEMBRETE" />
        <div className="text-[13px] font-medium mt-2">Meditar na Palavra</div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-mono text-ink-mute">
            Todos os dias às 07:00
          </span>
          <span
            className="relative inline-block w-6 h-3 rounded-full shrink-0"
            style={{
              background:
                "linear-gradient(90deg, #C9A961 0%, #E8D5A0 100%)",
            }}
          >
            <span className="absolute right-0.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm" />
          </span>
        </div>
      </FloatingCard>
    </div>
  );
}

/* ─────────────────────── Sub-componentes ─────────────────────── */

const FloatingCard = forwardRef<
  HTMLDivElement,
  {
    style?: React.CSSProperties;
    className?: string;
    delay?: string;
    duration?: string;
    children: React.ReactNode;
  }
>(function FloatingCard(
  { style = {}, className = "", delay = "0s", duration = "5s", children },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`absolute z-10 w-[175px] lg:w-[195px] p-3.5 ${className}`}
      style={{
        ...style,
        animation: `float-y-key ${duration} ease-in-out infinite`,
        animationDelay: delay,
        willChange: "transform",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(248,246,241,0.85) 100%)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.6)",
        borderRadius: 16,
        boxShadow:
          "0 12px 32px rgba(10,10,10,0.08), 0 4px 8px rgba(201,169,97,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {children}
    </div>
  );
});

function CardHeader({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-gold-dark">{icon}</span>
      <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink-mute">
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
        width: 260,
        aspectRatio: "9 / 19.5",
        borderRadius: 42,
        padding: 5,
        background:
          "linear-gradient(135deg, #2a2620 0%, #15120e 30%, #0a0805 70%, #1c1814 100%)",
        boxShadow:
          "0 50px 100px rgba(10,10,10,0.45), " +
          "0 25px 50px rgba(10,10,10,0.3), " +
          "0 12px 24px rgba(201,169,97,0.15), " +
          "inset 0 0 0 1px rgba(201,169,97,0.25), " +
          "inset 0 2px 4px rgba(255,232,176,0.15)",
      }}
    >
      {/* Brilho do frame */}
      <div
        aria-hidden
        className="absolute inset-[3px] rounded-[40px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,232,176,0.08) 0%, transparent 30%, transparent 70%, rgba(255,232,176,0.04) 100%)",
        }}
      />

      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          borderRadius: 37,
          background:
            "linear-gradient(180deg, #fbf9f4 0%, #f8f6f1 50%, #f5f1e8 100%)",
        }}
      >
        {/* Notch dynamic island */}
        <div
          className="absolute top-2.5 left-1/2 -translate-x-1/2 rounded-full z-20"
          style={{
            width: 85,
            height: 24,
            background: "#0a0805",
            boxShadow:
              "inset 0 0 8px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.2)",
          }}
        />

        {/* Status bar */}
        <div className="absolute top-3.5 left-7 right-7 flex justify-between items-center text-[9px] font-medium text-ink z-10">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* App header */}
        <div className="pt-14 pb-3 flex items-center justify-center border-b border-hairline mx-5">
          <div className="inline-flex items-center gap-1.5">
            <BookFan size={14} />
            <span className="font-serif text-[11px] tracking-tight font-medium">
              AI BIBLE
            </span>
          </div>
        </div>

        {/* Reading content */}
        <div className="px-5 pt-5 pb-3">
          <h3 className="text-center font-serif text-[26px] tracking-tight leading-none">
            João 3:16
          </h3>
          <div className="flex items-center justify-center gap-2 mt-3 mb-4">
            <span
              className="h-px"
              style={{
                width: 24,
                background:
                  "linear-gradient(90deg, transparent, rgba(201,169,97,0.6))",
              }}
            />
            <span className="text-gold text-[9px] leading-none">✦</span>
            <span
              className="h-px"
              style={{
                width: 24,
                background:
                  "linear-gradient(90deg, rgba(201,169,97,0.6), transparent)",
              }}
            />
          </div>
          <p className="font-serif text-[11px] leading-[1.55] text-ink text-center">
            Porque Deus amou o mundo de tal maneira que deu o seu Filho
            unigênito, para que todo aquele que nele crê não pereça, mas tenha
            a vida eterna.
          </p>
          <p className="font-serif italic text-[9px] text-ink-mute text-center mt-4">
            Almeida Revista e Corrigida
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="absolute bottom-0 left-0 right-0 flex justify-around items-center py-2.5 px-4"
          style={{
            borderTop: "1px solid rgba(10,10,10,0.06)",
            background:
              "linear-gradient(180deg, rgba(248,246,241,0.6) 0%, rgba(255,255,255,0.95) 100%)",
            backdropFilter: "blur(8px)",
          }}
        >
          {[
            { icon: <Home size={11} />, label: "Início", active: true },
            { icon: <BookOpen size={11} />, label: "Bíblia" },
            { icon: <Calendar size={11} />, label: "Plano" },
            { icon: <Sparkles size={11} />, label: "IA" },
            { icon: <User size={11} />, label: "Perfil" },
          ].map((t) => (
            <div
              key={t.label}
              className="flex flex-col items-center gap-0.5"
              style={{ color: t.active ? "#8B6F2A" : "#9b9b9b" }}
            >
              <span style={{ strokeWidth: t.active ? 2.2 : 1.5 }}>
                {t.icon}
              </span>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 7,
                  letterSpacing: "0.1em",
                  fontWeight: t.active ? 600 : 400,
                }}
              >
                {t.label}
              </span>
            </div>
          ))}
        </div>

        {/* Reflexo da tela */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.4) 0%, transparent 18%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}

function Pedestal() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ bottom: "2%", width: 380, zIndex: 5 }}
    >
      {/* Reflexão dourada embaixo do disco (chão) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: -20,
          width: "120%",
          height: 50,
          background:
            "radial-gradient(ellipse at center, rgba(232,213,160,0.5) 0%, rgba(201,169,97,0.2) 35%, transparent 70%)",
          filter: "blur(14px)",
        }}
      />

      {/* Disco */}
      <div
        className="mx-auto rounded-full relative"
        style={{
          width: "100%",
          aspectRatio: "5 / 1.5",
          background:
            "radial-gradient(ellipse at 50% 20%, #ffffff 0%, #faf6ed 50%, #f0e6cf 100%)",
          boxShadow:
            "0 22px 55px rgba(201,169,97,0.4), " +
            "inset 0 1px 0 rgba(255,255,255,0.95), " +
            "inset 0 -2px 4px rgba(201,169,97,0.3)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 30px rgba(201,169,97,0.25)",
          }}
        />
      </div>

      {/* Anel de luz dourada externo (glow) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: -8,
          width: "92%",
          height: 14,
          background:
            "radial-gradient(ellipse at center, rgba(232,213,160,0.95) 0%, rgba(201,169,97,0.6) 30%, transparent 75%)",
          filter: "blur(5px)",
        }}
      />
    </div>
  );
}

function GoldenWaves() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 1000"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="goldFlow1" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#C9A961" stopOpacity="0" />
          <stop offset="35%" stopColor="#E8D5A0" stopOpacity="0.55" />
          <stop offset="65%" stopColor="#E8D5A0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="goldFlow2" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#C9A961" stopOpacity="0" />
          <stop offset="50%" stopColor="#C9A961" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
        </linearGradient>
        <filter id="soft-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <g filter="url(#soft-blur)">
        <path
          d="M -50 460 Q 250 380 500 460 T 1050 460"
          stroke="url(#goldFlow1)"
          strokeWidth="2.5"
          fill="none"
          style={{
            animation: "wave-flow 9s ease-in-out infinite",
          }}
        />
        <path
          d="M -50 510 Q 280 430 560 510 T 1050 510"
          stroke="url(#goldFlow2)"
          strokeWidth="2"
          fill="none"
          opacity="0.75"
          style={{
            animation: "wave-flow 11s ease-in-out infinite reverse",
          }}
        />
        <path
          d="M -50 560 Q 220 490 480 560 T 1050 560"
          stroke="url(#goldFlow1)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.55"
          style={{
            animation: "wave-flow 13s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
        <path
          d="M -50 610 Q 260 540 520 610 T 1050 610"
          stroke="url(#goldFlow2)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.4"
          style={{
            animation: "wave-flow 14s ease-in-out infinite reverse",
            animationDelay: "0.5s",
          }}
        />
      </g>
    </svg>
  );
}

/* SVG icons da status bar */
function SignalIcon() {
  return (
    <svg width="11" height="8" viewBox="0 0 11 8" fill="currentColor">
      <rect x="0" y="6" width="1.5" height="2" rx="0.4" />
      <rect x="2.5" y="4" width="1.5" height="4" rx="0.4" />
      <rect x="5" y="2" width="1.5" height="6" rx="0.4" />
      <rect x="7.5" y="0" width="1.5" height="8" rx="0.4" />
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M5 6.2 L 5 6.2" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M2.5 4.2 Q 5 2.5 7.5 4.2" />
      <path d="M0.5 2.2 Q 5 -1 9.5 2.2" />
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="11"
        height="6"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <rect x="12" y="2.5" width="1" height="2" fill="currentColor" rx="0.3" />
      <rect x="1.5" y="1.5" width="9" height="4" fill="currentColor" rx="0.4" />
    </svg>
  );
}

function BookFan({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id="ps-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8D5A0" />
          <stop offset="100%" stopColor="#8B6F2A" />
        </linearGradient>
      </defs>
      <g stroke="url(#ps-gold)" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M24 39 L 10 18" />
        <path d="M24 39 L 16 11" />
        <path d="M24 39 L 24 8" />
        <path d="M24 39 L 32 11" />
        <path d="M24 39 L 38 18" />
      </g>
      <path
        d="M10 39 L 38 39"
        stroke="url(#ps-gold)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
