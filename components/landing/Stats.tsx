"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "./useScrollReveal";

type Stat = {
  value: string;
  label: string;
  numeric?: number;
  suffix?: string;
};

const STATS: Stat[] = [
  { value: "50+", label: "Traduções disponíveis", numeric: 50, suffix: "+" },
  { value: "31.102", label: "Versículos com IA", numeric: 31102 },
  { value: "∞", label: "Perguntas que pode fazer" },
  { value: "1", label: "Palavra que transforma", numeric: 1 },
];

function AnimatedNumber({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || stat.numeric == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = stat.value;
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = stat.numeric!;
            const duration = 1800;
            const start = performance.now();
            function step(now: number) {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = Math.round(eased * target);
              if (target >= 1000) {
                el!.textContent =
                  current.toLocaleString("pt-BR") +
                  (t === 1 ? "" : "");
              } else {
                el!.textContent = current + (stat.suffix && t === 1 ? "" : "");
              }
              if (t < 1) requestAnimationFrame(step);
              else el!.textContent = stat.value;
            }
            requestAnimationFrame(step);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stat]);

  return <span ref={ref}>{stat.value}</span>;
}

export default function Stats() {
  useScrollReveal();
  return (
    <section
      aria-label="Estatísticas do AI Bible"
      className="section-y border-b border-hairline"
    >
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="fade-up text-center lg:text-left">
              <div
                className="font-serif font-light text-gold-dark leading-none mb-4"
                style={{ fontSize: "clamp(56px, 9vw, 140px)" }}
              >
                <AnimatedNumber stat={s} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-mute">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
