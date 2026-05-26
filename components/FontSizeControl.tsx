"use client";

import { useEffect, useState } from "react";
import { Type } from "lucide-react";
import {
  FONT_SIZE_MIN,
  FONT_SIZE_MAX,
  FONT_SIZE_DEFAULT,
  getFontSize,
  setFontSize,
} from "@/lib/settings";

export default function FontSizeControl() {
  const [size, setSize] = useState(FONT_SIZE_DEFAULT);

  useEffect(() => {
    setSize(getFontSize());
  }, []);

  const change = (n: number) => {
    setSize(n);
    setFontSize(n);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-ink-mute">
        <Type size={14} />
        <span className="text-xs uppercase tracking-wider font-mono">
          {size}px
        </span>
      </div>
      <input
        type="range"
        min={FONT_SIZE_MIN}
        max={FONT_SIZE_MAX}
        step={1}
        value={size}
        onChange={(e) => change(Number(e.target.value))}
        className="flex-1 accent-gold"
        aria-label="Tamanho da fonte do leitor"
      />
      <button
        onClick={() => change(FONT_SIZE_DEFAULT)}
        className="text-[10px] font-mono uppercase tracking-widest text-ink-mute hover:text-gold-dark"
      >
        reset
      </button>
    </div>
  );
}
