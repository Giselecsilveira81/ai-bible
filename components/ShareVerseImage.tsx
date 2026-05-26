"use client";

import { useEffect, useRef, useState } from "react";
import { Download, X } from "lucide-react";

type Props = {
  text: string;
  reference: string;
  versionAbbr: string;
  onClose: () => void;
};

export default function ShareVerseImage({
  text,
  reference,
  versionAbbr,
  onClose,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const W = 1080;
    const H = 1080;
    c.width = W;
    c.height = H;

    // Background gradient (paper warm → gold pale)
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#F8F6F1");
    bgGrad.addColorStop(0.6, "#F2EFE8");
    bgGrad.addColorStop(1, "#E8D5A0");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle radial glow (top right)
    const glow = ctx.createRadialGradient(
      W * 0.85,
      H * 0.2,
      0,
      W * 0.85,
      H * 0.2,
      W * 0.6,
    );
    glow.addColorStop(0, "rgba(201, 169, 97, 0.35)");
    glow.addColorStop(1, "rgba(201, 169, 97, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Borda fina dourada
    ctx.strokeStyle = "rgba(201,169,97,0.45)";
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, W - 96, H - 96);

    // Estrela top
    ctx.fillStyle = "#C9A961";
    ctx.font = '64px "Fraunces", Georgia, serif';
    ctx.textAlign = "center";
    ctx.fillText("✦", W / 2, 200);

    // Texto do versículo
    ctx.fillStyle = "#0A0A0A";
    const fontSize = pickFontSize(text.length);
    ctx.font = `300 italic ${fontSize}px "Fraunces", Georgia, serif`;
    ctx.textAlign = "center";
    const lineHeight = fontSize * 1.25;
    const wrapped = wrapText(ctx, `"${text}"`, W - 220);
    const totalH = wrapped.length * lineHeight;
    const startY = (H - totalH) / 2 + 40;
    wrapped.forEach((line, i) => {
      ctx.fillText(line, W / 2, startY + i * lineHeight);
    });

    // Linha divisória
    ctx.strokeStyle = "rgba(201,169,97,0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 40, H - 220);
    ctx.lineTo(W / 2 + 40, H - 220);
    ctx.stroke();

    // Referência
    ctx.fillStyle = "#8B6F2A";
    ctx.font = '500 28px "JetBrains Mono", "Courier New", monospace';
    ctx.textAlign = "center";
    ctx.fillText(reference.toUpperCase(), W / 2, H - 175);

    // Versão
    ctx.fillStyle = "#6B6B6B";
    ctx.font = '400 18px "JetBrains Mono", "Courier New", monospace';
    ctx.fillText(versionAbbr.toUpperCase(), W / 2, H - 140);

    // Footer marca
    ctx.fillStyle = "#6B6B6B";
    ctx.font = '400 16px "JetBrains Mono", "Courier New", monospace';
    ctx.fillText("AI BIBLE · aibible.app", W / 2, H - 80);

    setReady(true);
  }, [text, reference, versionAbbr]);

  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    const link = document.createElement("a");
    link.download = `aibible-${reference.replace(/\W+/g, "-")}.png`;
    link.href = c.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-paper rounded-2xl max-w-md w-full p-6 shadow-soft-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between mb-5">
          <p className="section-eyebrow">Compartilhar</p>
          <button
            onClick={onClose}
            className="text-ink-mute hover:text-ink p-1"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </header>

        <div className="aspect-square w-full bg-paper-warm rounded-xl overflow-hidden border border-hairline mb-5">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ imageRendering: "auto" }}
          />
        </div>

        <button
          onClick={download}
          disabled={!ready}
          className="btn-primary w-full justify-center disabled:opacity-50"
        >
          <Download size={14} />
          Baixar imagem
        </button>
      </div>
    </div>
  );
}

function pickFontSize(len: number): number {
  if (len < 80) return 60;
  if (len < 160) return 50;
  if (len < 280) return 42;
  if (len < 420) return 34;
  return 28;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}
