"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Loader2, X } from "lucide-react";

type Props = {
  text: string; // texto a ler (sem números de versículo idealmente)
  title?: string; // mostrado no player
};

export default function AudioPlayer({ text, title }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">(
    "idle",
  );
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  const load = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.slice(0, 4000), speed }),
      });
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      const audio = new Audio(url);
      audio.playbackRate = speed;
      audio.onended = () => setState("idle");
      audio.onpause = () => setState((s) => (s === "playing" ? "paused" : s));
      audio.onplay = () => setState("playing");
      audioRef.current = audio;
      await audio.play();
    } catch (e) {
      console.error(e);
      setState("idle");
    }
  };

  const toggle = async () => {
    if (state === "idle") return load();
    const a = audioRef.current;
    if (!a) return;
    if (state === "playing") a.pause();
    else if (state === "paused") await a.play();
  };

  const stop = () => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    setState("idle");
  };

  const changeSpeed = (s: number) => {
    setSpeed(s);
    if (audioRef.current) audioRef.current.playbackRate = s;
  };

  if (state === "idle") {
    return (
      <button
        onClick={toggle}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline text-xs uppercase tracking-wider hover:border-gold hover:text-gold-dark transition-colors"
        aria-label="Ouvir capítulo"
      >
        <Play size={12} fill="currentColor" />
        ouvir
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper border border-hairline-gold">
      <button
        onClick={toggle}
        className="w-6 h-6 rounded-full bg-ink text-paper flex items-center justify-center disabled:opacity-50"
        disabled={state === "loading"}
        aria-label={state === "playing" ? "Pausar" : "Tocar"}
      >
        {state === "loading" ? (
          <Loader2 size={12} className="animate-spin" />
        ) : state === "playing" ? (
          <Pause size={11} fill="currentColor" />
        ) : (
          <Play size={11} fill="currentColor" />
        )}
      </button>
      {title && (
        <span className="text-xs text-ink-mute truncate max-w-[140px]">
          {title}
        </span>
      )}
      <select
        value={speed}
        onChange={(e) => changeSpeed(Number(e.target.value))}
        className="text-[10px] font-mono uppercase bg-transparent border-none outline-none cursor-pointer text-ink-mute"
        aria-label="Velocidade"
      >
        <option value={0.75}>0.75×</option>
        <option value={1}>1×</option>
        <option value={1.25}>1.25×</option>
        <option value={1.5}>1.5×</option>
        <option value={2}>2×</option>
      </select>
      <button
        onClick={stop}
        className="text-ink-mute hover:text-ink"
        aria-label="Fechar player"
      >
        <X size={12} />
      </button>
    </div>
  );
}
