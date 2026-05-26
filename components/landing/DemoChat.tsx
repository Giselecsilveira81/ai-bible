"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

export default function DemoChat() {
  useScrollReveal();
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealed) {
            setTyping(true);
            setTimeout(() => {
              setTyping(false);
              setRevealed(true);
            }, 1800);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [revealed]);

  return (
    <section id="demo" className="section-y border-b border-hairline">
      <div className="container-page max-w-4xl">
        <div className="text-center mb-12 lg:mb-16">
          <div className="section-eyebrow fade-up">
            ✦ DEMONSTRAÇÃO REAL
          </div>
          <h2 className="h-display-md fade-up mt-6">
            A profundidade da IA,
            <br />
            em uma <em className="text-gold-dark">conversa.</em>
          </h2>
        </div>

        <div
          ref={cardRef}
          className="fade-up glass-card p-6 lg:p-10 shadow-soft-md"
          role="region"
          aria-label="Demonstração de chat com IA"
        >
          <ChatMsg
            who="Você"
            time="14:32"
            avatar="V"
            avatarClass="bg-ink text-paper"
            text="O que Romanos 8:28 significa para alguém passando por um momento muito difícil?"
          />

          <div className="flex gap-4 mt-8">
            <div className="shrink-0 w-9 h-9 rounded-full bg-gold-pale text-gold-dark flex items-center justify-center font-serif">
              ✦
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-sm">AI Bible</span>
                <span className="tag-gold text-[9px]">✓ verificado</span>
                <span className="text-xs text-ink-mute">14:32</span>
                {typing && (
                  <span className="typing-dots ml-2" aria-label="IA digitando">
                    <span />
                    <span />
                    <span />
                  </span>
                )}
              </div>
              <div
                className={`prose-sm space-y-3 text-ink-soft leading-relaxed transition-opacity duration-700 ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                <p>
                  Romanos 8:28 não promete que{" "}
                  <em>todas as coisas serão boas</em>, mas que{" "}
                  <em>Deus opera em todas as coisas para o bem</em> daqueles
                  que o amam.
                </p>
                <p>
                  A palavra grega <em>synergei</em> — usada por Paulo —
                  significa <em>&quot;trabalhar junto com&quot;</em>. Mesmo a
                  dor que você vive agora não é desperdiçada; Deus a entrelaça,
                  junto com tudo o mais, em um propósito maior do que você
                  consegue ver deste lado da história.
                </p>
                <p>
                  No contexto da carta aos Romanos, Paulo escreve isso a uma
                  comunidade sob perseguição. Não para minimizar o sofrimento
                  — mas para dar a ele significado eterno. A promessa não é de
                  ausência de dor, mas de{" "}
                  <em>presença redentora de Deus</em> em meio a ela.
                </p>
              </div>
              {revealed && (
                <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                  <span>ROM. 8:28 (NVI)</span>
                  <span>·</span>
                  <span>COMENTÁRIO BARCLAY</span>
                  <span>·</span>
                  <span>GREGO KOINÉ P46</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-hairline flex items-center justify-between gap-3 rounded-xl bg-paper-warm px-5 py-4">
            <span className="text-sm text-ink-mute">
              Pergunte qualquer versículo...
            </span>
            <span className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-sm">
              ↑
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatMsg({
  who,
  time,
  avatar,
  avatarClass,
  text,
}: {
  who: string;
  time: string;
  avatar: string;
  avatarClass: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-medium ${avatarClass}`}
      >
        {avatar}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-sm">{who}</span>
          <span className="text-xs text-ink-mute">{time}</span>
        </div>
        <p className="text-ink leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
