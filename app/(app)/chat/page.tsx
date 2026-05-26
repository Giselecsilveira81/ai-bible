"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowUp, Eraser } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  { q: "Como lidar com ansiedade?", topic: "Vida emocional" },
  { q: "O que a Bíblia diz sobre perdoar?", topic: "Relacionamentos" },
  { q: "Estou em luto. O que posso ler?", topic: "Dor & consolo" },
  { q: "Como começar a orar?", topic: "Vida espiritual" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || streaming) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setStreaming(true);

    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text();
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = {
            role: "assistant",
            content: errText || "Erro de comunicação. Tente novamente.",
          };
          return updated;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = { role: "assistant", content: acc };
          return updated;
        });
      }
    } finally {
      setStreaming(false);
    }
  };

  return (
    <main className="mx-auto max-w-reader h-[calc(100vh-72px)] lg:h-screen flex flex-col px-6 pt-10">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <p className="section-eyebrow text-gold-dark">✦ Conselheiro</p>
          <h1 className="font-serif text-4xl tracking-tight mt-2">
            Converse com a IA
          </h1>
          <p className="text-sm text-ink-soft mt-1.5 max-w-md">
            Respostas teológicas profundas, com base nas Escrituras e
            referências históricas.
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink-mute hover:text-gold-dark transition-colors"
          >
            <Eraser size={12} />
            limpar
          </button>
        )}
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto -mx-6 px-6 pb-6 space-y-5"
      >
        {messages.length === 0 ? (
          <div className="py-4">
            <div className="card-soft p-5 mb-7 bg-gold-pale border-hairline-gold">
              <p className="text-xs text-ink-soft leading-relaxed">
                <span className="text-gold-dark font-medium">
                  ✦ Lembrete:
                </span>{" "}
                a IA não substitui um pastor ou terapeuta. Em crise, procure
                ajuda profissional.
              </p>
            </div>

            <p className="section-eyebrow mb-4">Comece com uma pergunta</p>
            <ul className="space-y-2">
              {SUGGESTIONS.map((s) => (
                <li key={s.q}>
                  <button
                    onClick={() => send(s.q)}
                    className="card-soft w-full text-left p-4 group flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm">{s.q}</p>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-ink-mute mt-1">
                        {s.topic}
                      </p>
                    </div>
                    <span className="text-gold-dark text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i}>
              {m.role === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-ink text-paper rounded-2xl rounded-tr-md px-5 py-3 max-w-[80%]">
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                      {m.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 items-start">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-gold-pale text-gold-dark flex items-center justify-center font-serif border border-hairline-gold mt-1">
                    ✦
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-medium">AI Bible</span>
                      <span className="tag-gold text-[9px]">
                        <Sparkles size={9} />
                        verificado
                      </span>
                    </div>
                    <div className="reader-text text-[15px] leading-relaxed text-ink-soft whitespace-pre-wrap">
                      {m.content || (
                        <span className="text-ink-mute italic">
                          pensando…
                        </span>
                      )}
                      {streaming &&
                        i === messages.length - 1 &&
                        m.content && (
                          <span className="inline-block w-2 h-4 bg-gold align-middle animate-pulse ml-1" />
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-hairline pt-4 pb-6 flex gap-2"
      >
        <div className="flex-1 rounded-full border border-hairline focus-within:border-gold transition-colors flex items-center pl-5 pr-2 py-1 bg-paper">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte qualquer coisa sobre a Bíblia…"
            disabled={streaming}
            className="flex-1 bg-transparent text-sm py-2 outline-none disabled:opacity-50 placeholder:text-ink-mute"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="w-9 h-9 rounded-full bg-gold text-ink flex items-center justify-center disabled:bg-ink/10 disabled:text-ink-mute transition-colors"
            aria-label="Enviar"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </main>
  );
}
