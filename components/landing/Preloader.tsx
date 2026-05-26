"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("aibible:preloaded") === "1") {
      setDone(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 22 + 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            sessionStorage.setItem("aibible:preloaded", "1");
          }, 350);
          return 100;
        }
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] bg-white dark:bg-ink flex items-center justify-center transition-all duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div
          className="text-gold leading-none mb-4 animate-pulse-symbol"
          style={{ fontSize: "44px" }}
        >
          ✦
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-ink-mute mb-5">
          AI BIBLE
        </div>
        <div className="w-32 h-px bg-hairline-gold mx-auto overflow-hidden">
          <div
            className="h-full bg-gold transition-all ease-out-soft duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
