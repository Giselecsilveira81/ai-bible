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
    prompt: `Premium iPhone 15 Pro Max with deep titanium black bezel, standing UPRIGHT on a small CIRCULAR WHITE PEDESTAL DISC (luxury product display platform). Phone is centered, photographed in 3/4 perspective. Isolated on a fully TRANSPARENT background — NO floor, NO walls, NO environment.

The phone screen displays a Bible app in LIGHT MODE with cream/off-white background:
- Top: small fan-shaped gold book icon next to "AI BIBLE" label in mono caps
- Center: large "João 3:16" in elegant black Fraunces serif
- Below: small gold horizontal divider with tiny ✦
- Body: centered Portuguese serif text of John 3:16 — "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
- Below verse: italic gray "Almeida Revista e Corrigida"
- Bottom tab bar: 5 small icons labeled Início, Bíblia, Plano, IA, Perfil with the active one (Início) in gold

AROUND the phone, floating in mid-air at different depths, SIX crisp WHITE UI cards with rounded corners and soft drop shadows:

LEFT of phone (3 cards stacked):
1. "✦ VERSÍCULO DO DIA" header, then "Salmos 118:24" serif title, then "Este é o dia que o Senhor fez; alegremo-nos e exultemos neste dia."
2. "✦ ANOTAÇÃO" header, "Reflexão" title, "Deus nos convida a viver cada dia com propósito e gratidão." timestamp "08:30"
3. "✦ PLANO EM ANDAMENTO" header, "Fé que transforma" title, "Dia 12 de 30", progress bar 40% in gold

RIGHT of phone (3 cards stacked):
4. "✦ EXPLICAÇÃO COM IA" header, paragraph: "João 3:16 é um dos versículos mais conhecidos da Bíblia e resume o evangelho: o amor de Deus que oferece salvação através de Jesus.", tag "✦ Gerado por IA"
5. "✦ VERSÍCULOS RELACIONADOS" header, 3 references listed — "Romanos 5:8", "1 João 4:9", "João 15:13" with small arrows
6. "✦ LEMBRETE" header, "Meditar na Palavra" title, "Todos os dias às 07:00", with small gold toggle switch on

BEHIND the phone: long curved horizontal LIGHT WAVES in warm gold tones, flowing like elegant ribbons.

UNDER the pedestal: glowing gold ring of light around the base.

CRITICAL: fully transparent PNG background, NO floor, NO marble, NO sky, NO wall, NO tagline text. ONLY phone + white pedestal + 6 white cards + golden light waves. Awwwards quality, photorealistic, premium product photography.`,
  },
  {
    name: "showcase-ai",
    size: "1536x1024",
    quality: "high",
    prompt: `Premium iPhone 15 Pro Max with deep titanium black bezel, standing UPRIGHT on a small CIRCULAR WHITE PEDESTAL DISC, slightly rotated counter-clockwise (-4 degrees), photographed in 3/4 perspective. Isolated on fully TRANSPARENT background.

The phone screen displays an AI chat interface in LIGHT MODE with cream background:
- Top: small gold mono label "✦ AI BIBLE — CHAT"
- A user question in a soft cream rounded bubble: "Por que Romanos 8 fala de criação gemendo?"
- Below it, an AI response in a gold-bordered cream bubble: gold ✦ symbol followed by a thoughtful serif paragraph about Romans 8 and the Greek word "systenazo".
- Bottom: an input area with placeholder "Pergunte qualquer versículo..." and a small dark send arrow.

BEHIND the phone: curved horizontal golden LIGHT WAVES flowing like elegant gold ribbons, radiating outward. White pedestal has a glowing gold ring of light at its base.

NO floating cards around the phone. Just the phone on the white circular pedestal with golden light waves behind.

CRITICAL: fully transparent PNG background, NO floor, NO marble, NO sky. Only the phone + white pedestal + golden light waves; rest is transparent alpha. Awwwards quality, photorealistic, premium product photography.`,
  },
  {
    name: "showcase-plans",
    size: "1536x1024",
    quality: "high",
    prompt: `Premium iPhone 15 Pro Max with deep titanium black bezel, standing UPRIGHT on a small CIRCULAR WHITE PEDESTAL DISC, slightly rotated clockwise (+4 degrees), photographed in 3/4 perspective. Isolated on fully TRANSPARENT background.

Phone screen shows a Bible reading plan in LIGHT MODE with cream background:
- Top: gold mono label "✦ SEU PLANO"
- Serif title "Ansiedade & Fé" in deep black
- Gold mono subtitle "Dia 7 de 21"
- Thin horizontal progress bar at 33% filled in gold
- Three rounded cream cards stacked listing: "Salmo 23 — O Senhor é meu pastor", "Filipenses 4 — Paz que excede", "Mateus 6 — Não vos inquieteis"

BEHIND the phone: long curved horizontal golden LIGHT WAVES flowing like elegant gold ribbons, radiating outward. White pedestal has a glowing gold ring of light at its base.

NO floating cards around the phone. Just phone on white circular pedestal with golden light waves behind.

CRITICAL: fully transparent PNG background, NO floor, NO marble, NO sky. Only phone + white pedestal + golden light waves; rest is transparent alpha channel. Awwwards quality, photorealistic, premium product photography.`,
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
