"use client";

import { useScrollReveal } from "./useScrollReveal";
import MagneticButton from "./MagneticButton";

const TIERS = [
  {
    name: "Gratuito",
    currency: "R$",
    value: "0",
    period: "",
    desc: "Tudo que você precisa para começar sua jornada espiritual.",
    features: [
      "5 traduções principais",
      "20 perguntas à IA por mês",
      "Versículo do dia personalizado",
      "Planos de leitura prontos",
      "Comunidade aberta",
    ],
    cta: "Começar grátis",
    featured: false,
  },
  {
    name: "Plus",
    currency: "R$",
    value: "19",
    period: ",90/mês",
    desc: "Toda a profundidade da AI Bible, sem limites.",
    features: [
      "Todas as 50+ traduções",
      "Perguntas ilimitadas à IA",
      "Devocional diário gerado por IA",
      "Planos personalizados infinitos",
      "Grego, hebraico e comentários",
      "Áudio Bíblia com IA premium",
    ],
    cta: "Assinar Plus",
    featured: true,
  },
  {
    name: "Lifetime",
    currency: "R$",
    value: "499",
    period: "",
    desc: "Pague uma vez. Use para sempre. Sem renovações.",
    features: [
      "Tudo do Plus, para sempre",
      "Acesso vitalício",
      "Todas as atualizações futuras",
      "Suporte prioritário",
      "Badge \"Fundador\" na comunidade",
    ],
    cta: "Garantir Lifetime",
    featured: false,
  },
];

export default function Pricing() {
  useScrollReveal();
  return (
    <section className="section-y border-b border-hairline">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="section-eyebrow fade-up">08 — PLANOS E PREÇOS</div>
          <h2 className="h-display-md fade-up mt-6">
            Comece grátis.
            <br />
            <em className="text-gold-dark">Aprofunde quando quiser.</em>
          </h2>
          <p className="fade-up mt-6 text-ink-soft">
            Sem pegadinha. Sem trial enganoso. Use para sempre.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {TIERS.map((t) => (
            <article
              key={t.name}
              tabIndex={0}
              className={`fade-up relative rounded-3xl border p-8 lg:p-10 flex flex-col ${
                t.featured
                  ? "bg-ink text-paper border-ink shadow-soft-lg lg:scale-105"
                  : "bg-white border-hairline shadow-soft-sm"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold text-ink text-[10px] font-mono uppercase tracking-[0.25em]">
                  MAIS POPULAR
                </div>
              )}

              <div
                className={`font-mono text-[11px] uppercase tracking-[0.25em] mb-6 ${
                  t.featured ? "text-gold-light" : "text-ink-mute"
                }`}
              >
                {t.name}
              </div>

              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className={`text-sm ${
                    t.featured ? "text-gold-light" : "text-ink-mute"
                  }`}
                >
                  {t.currency}
                </span>
                <span className="font-serif font-light leading-none text-6xl lg:text-7xl">
                  {t.value}
                </span>
                {t.period && (
                  <span
                    className={`text-sm ${
                      t.featured ? "text-gold-light" : "text-ink-mute"
                    }`}
                  >
                    {t.period}
                  </span>
                )}
              </div>

              <p
                className={`text-sm leading-relaxed mb-8 ${
                  t.featured ? "text-paper/80" : "text-ink-soft"
                }`}
              >
                {t.desc}
              </p>

              <ul className="space-y-3 text-sm mb-10 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                        t.featured ? "bg-gold" : "bg-gold-dark"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {t.featured ? (
                <MagneticButton
                  href="#download"
                  variant="gold"
                  size="default"
                  className="w-full justify-center"
                  ariaLabel="Assinar plano Plus"
                >
                  {t.cta}
                </MagneticButton>
              ) : (
                <a
                  href="#download"
                  className="btn-outline w-full justify-center"
                  aria-label={t.cta}
                >
                  {t.cta}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
