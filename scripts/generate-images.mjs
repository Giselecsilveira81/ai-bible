#!/usr/bin/env node
/**
 * Gera mockups do AI Bible via DALL-E 3.
 *
 * Uso:
 *   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs
 *
 * Custo: ~$0.40 (3 imagens HD portrait @ $0.12 + 1 logo @ $0.04).
 * Tempo: ~60-90s no total.
 *
 * Saída:
 *   public/landing/hero-mockup.png       (1024x1792 portrait HD)
 *   public/landing/showcase-ai.png       (1024x1792 portrait HD)
 *   public/landing/showcase-plans.png    (1024x1792 portrait HD)
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "landing");

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error(
    "❌ OPENAI_API_KEY ausente. Rode com:\n   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs",
  );
  process.exit(1);
}

// gpt-image-1: sizes 1024x1024, 1024x1536 (portrait), 1536x1024 (landscape)
// quality: low | medium | high
const IMAGES = [
  {
    name: "hero-mockup",
    size: "1536x1024",
    quality: "high",
    prompt: `Editorial luxury product photography of a single premium iPhone 15 Pro Max with titanium black bezel, standing upright in 3/4 perspective on a thin circular white marble pedestal disc. Around the phone, six small white floating UI widget cards arranged 3 on the left side and 3 on the right side at varied depths, each with subtle drop shadows. Behind the phone, soft elegant horizontal golden light ribbons flow like waves of light, glowing warm. Under the pedestal, a thin glowing ring of gold light.

Phone screen content (in LIGHT MODE with cream background): centered large serif "João 3:16" headline in black Fraunces; below it a thin gold divider line with a tiny ✦ in the middle; centered Portuguese serif body text of John 3:16; italic gray attribution "Almeida Revista e Corrigida"; at top a small gold book icon with "AI BIBLE" caps; bottom tab bar with 5 minimal icons (Início active in gold).

LEFT card 1: gold sun icon + "VERSÍCULO DO DIA" label + "Salmos 118:24" serif + small body text.
LEFT card 2: gold pencil icon + "ANOTAÇÃO" label + "Reflexão" + small body + timestamp "08:30".
LEFT card 3: gold book icon + "PLANO EM ANDAMENTO" label + "Fé que transforma" + "Dia 12 de 30" + gold progress bar at 40%.
RIGHT card 1: gold star + "EXPLICAÇÃO COM IA" + thoughtful paragraph + "Gerado por IA" tag.
RIGHT card 2: gold link icon + "VERSÍCULOS RELACIONADOS" + 3 refs (Romanos 5:8, 1 João 4:9, João 15:13).
RIGHT card 3: gold bell icon + "LEMBRETE" + "Meditar na Palavra" + "Todos os dias às 07:00" + small gold toggle ON.

Style: clean, minimal, awwwards-level editorial composition. Soft cream and gold palette. Sharp focus on phone. Cinematic warm rim light.

CRITICAL: fully transparent PNG background. No floor visible beyond pedestal disc, no walls, no marble surface, no environment. Only the phone, the pedestal disc, the golden light ribbons, and the six floating white cards exist — everything else is fully transparent alpha. No text outside the cards and phone screen. No taglines anywhere.`,
  },
  {
    name: "showcase-ai",
    size: "1536x1024",
    quality: "high",
    prompt: `Editorial luxury product photography of a premium iPhone 15 Pro Max with titanium black bezel, slightly rotated counter-clockwise (-4°), standing on a thin circular white marble pedestal in 3/4 perspective. Behind the phone, soft elegant horizontal golden light ribbons flow like waves of warm light. Thin glowing gold ring of light under the pedestal.

Phone screen (LIGHT MODE, cream background): AI chat interface. Top: gold mono label "✦ AI BIBLE — CHAT". User message bubble in soft cream rounded corners: "Por que Romanos 8 fala de criação gemendo?". Below it, AI response bubble with gold left border: gold ✦ symbol + serif text starting "Paulo usa systenazo — gemer junto — para descrever a criação aguardando a redenção..." Bottom: rounded input field placeholder "Pergunte qualquer versículo..." with small dark circular send arrow on the right.

AROUND the phone, four small white floating UI cards with subtle shadows:
LEFT TOP: gold ✦ + "Respondendo em 2s" small text.
LEFT BOTTOM: gold quote icon + "Grego original: systenazo" italic serif.
RIGHT TOP: gold scroll icon + "Baseado em 4 comentaristas".
RIGHT BOTTOM: small avatars + "Barclay · Calvino · Crisóstomo" mono caps.

Style: minimal, awwwards-level editorial. Soft cream and gold palette. Cinematic warm rim light.

CRITICAL: fully transparent PNG background. No floor, no marble surface beyond pedestal, no walls, no environment. Only phone + pedestal + golden light ribbons + 4 floating cards exist; everything else is transparent alpha. No tagline text anywhere.`,
  },
  {
    name: "showcase-plans",
    size: "1536x1024",
    quality: "high",
    prompt: `Editorial luxury product photography of a premium iPhone 15 Pro Max with titanium black bezel, slightly rotated clockwise (+4°), standing on a thin circular white marble pedestal in 3/4 perspective. Behind the phone, soft elegant horizontal golden light ribbons flowing like warm light waves. Thin glowing gold ring of light under the pedestal.

Phone screen (LIGHT MODE, cream background): Bible reading plan interface. Top: gold mono label "✦ SEU PLANO". Below: large serif title "Ansiedade & Fé" in black. Below: gold mono subtitle "Dia 7 de 21". Then a thin horizontal progress bar at 33% filled in gold, rest in cream. Below that: three rounded cream cards stacked vertically, each containing a Bible reference and quote: "Salmo 23 — O Senhor é meu pastor", "Filipenses 4:6-7 — Paz que excede", "Mateus 6:25-34 — Não vos inquieteis".

AROUND the phone, four small white floating UI cards with subtle shadows:
LEFT TOP: small gold donut chart at 33% + "Progresso 33%" label.
LEFT BOTTOM: gold play arrow + "Próximo: Salmo 23" serif.
RIGHT TOP: gold calendar icon + "21 dias · IA personalizado".
RIGHT BOTTOM: gold checkmark + "Lido: 7 capítulos".

Style: minimal, awwwards-level editorial. Soft cream and gold palette. Cinematic warm rim light.

CRITICAL: fully transparent PNG background. No floor, no marble surface beyond pedestal, no walls, no environment. Only phone + pedestal + golden light ribbons + 4 floating cards exist; everything else is transparent alpha. No tagline text anywhere.`,
  },
];

async function generate(item) {
  console.log(`\n🎨 Gerando: ${item.name}…`);
  const start = Date.now();

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: item.prompt,
      n: 1,
      size: item.size,
      quality: item.quality,
      background: "transparent",
      output_format: "png",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const b64 = data.data[0].b64_json;
  if (!b64) throw new Error("Sem b64_json na resposta.");

  const buffer = Buffer.from(b64, "base64");
  const outPath = path.join(OUT_DIR, `${item.name}.png`);
  await fs.writeFile(outPath, buffer);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`✅ ${item.name}.png salvo (${buffer.length} bytes, ${elapsed}s)`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`📂 Saída: ${OUT_DIR}`);

  const only = process.env.ONLY; // ONLY=hero-mockup gera só essa
  const items = only ? IMAGES.filter((i) => i.name === only) : IMAGES;
  if (only && items.length === 0) {
    console.error(`Nome '${only}' não bate com nenhuma. Disponíveis:`, IMAGES.map((i) => i.name));
    process.exit(1);
  }

  for (const item of items) {
    try {
      await generate(item);
    } catch (e) {
      console.error(`❌ Falha em ${item.name}:`, e.message);
    }
  }

  console.log("\n🎉 Pronto. Recarrega a página pra ver.");
}

main().catch((e) => {
  console.error("❌ Erro fatal:", e);
  process.exit(1);
});
