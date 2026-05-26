"use client";

import { useEffect, useState } from "react";

const PRODUTO = [
  { href: "#biblia", label: "Bíblia" },
  { href: "#ia", label: "Pergunte à IA" },
  { href: "#planos", label: "Planos" },
  { href: "#devocional", label: "Devocional" },
  { href: "#", label: "Áudio Bíblia" },
];
const EMPRESA = [
  { href: "#", label: "Sobre nós" },
  { href: "#", label: "Manifesto" },
  { href: "#", label: "Carreiras" },
  { href: "#", label: "Imprensa" },
];
const RECURSOS = [
  { href: "#", label: "Blog" },
  { href: "#comunidade", label: "Comunidade" },
  { href: "#", label: "Suporte" },
  { href: "#", label: "Status" },
];
const LEGAL = [
  { href: "#", label: "Privacidade" },
  { href: "#", label: "Termos" },
  { href: "#", label: "Cookies" },
];

function LiveClock() {
  const [time, setTime] = useState("00:00:00 BRT");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const s = now.toLocaleTimeString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(`${s} BRT`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className="font-mono text-xs text-ink-mute" aria-live="polite">
      {time}
    </time>
  );
}

function Newsletter() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const email = String(fd.get("email") || "");
        if (!email.includes("@")) {
          setStatus("err");
          setTimeout(() => setStatus("idle"), 2500);
          return;
        }
        setStatus("ok");
        e.currentTarget.reset();
      }}
      aria-label="Newsletter AI Bible"
      className="mt-8"
    >
      <label
        htmlFor="newsletterEmail"
        className="block text-xs font-mono uppercase tracking-widest text-ink-mute mb-3"
      >
        ✦ Versículo do dia no seu email
      </label>
      <div className="flex items-center border-b border-hairline focus-within:border-gold transition-colors">
        <input
          type="email"
          name="email"
          id="newsletterEmail"
          required
          placeholder={
            status === "err"
              ? "Email inválido — tente novamente"
              : status === "ok"
                ? "✦ Inscrito! Verifique seu email."
                : "seu@email.com"
          }
          className="flex-1 bg-transparent py-3 outline-none text-sm placeholder:text-ink-mute"
        />
        <button
          type="submit"
          aria-label="Assinar newsletter"
          className="text-gold text-lg px-3 hover:text-gold-dark transition-colors"
        >
          {status === "ok" ? "✦" : "→"}
        </button>
      </div>
    </form>
  );
}

export default function MarketingFooter() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-hairline bg-paper-warm"
    >
      <div className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="col-span-2 lg:col-span-2">
            <h3 className="font-serif text-3xl lg:text-4xl leading-tight">
              A Palavra.
              <br />
              <em className="text-gold-dark">Mais profunda do que nunca.</em>
            </h3>
            <Newsletter />
          </div>

          <FooterCol title="Produto" links={PRODUTO} />
          <FooterCol title="Empresa" links={EMPRESA} />
          <FooterCol title="Recursos" links={RECURSOS} />
          <FooterCol title="Legal" links={LEGAL} />
        </div>

        <div className="mt-16 pt-8 border-t border-hairline flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            © 2026 AI BIBLE · TODOS OS DIREITOS RESERVADOS
          </span>
          <LiveClock />
          <ul className="flex items-center gap-3" aria-label="Redes sociais">
            {["IG", "X", "YT", "TT"].map((s) => (
              <li key={s}>
                <a
                  href="#"
                  aria-label={s}
                  className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-[10px] font-mono tracking-widest hover:border-gold hover:text-gold-dark transition-colors"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-mute mb-5">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-ink hover:text-gold-dark transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
