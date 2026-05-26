import { NextResponse } from "next/server";
import { openai, MODEL, hasOpenAI } from "@/lib/openai";
import { loadChapter, findBook } from "@/lib/bible";

export const runtime = "nodejs";
export const revalidate = 0;

type Devotional = {
  date: string;
  reference: string;
  text: string;
  versionAbbr: string;
  reflection: string;
  prayer: string;
};

// Cache simples em memoria por dia (servidor)
let cache: { date: string; data: Devotional } | null = null;

// Pool de versiculos do dia (referencias seguras, com bom apelo devocional)
const POOL: { abbrev: string; chapter: number; verse: number }[] = [
  { abbrev: "sl", chapter: 23, verse: 1 },
  { abbrev: "sl", chapter: 91, verse: 1 },
  { abbrev: "sl", chapter: 46, verse: 10 },
  { abbrev: "sl", chapter: 121, verse: 1 },
  { abbrev: "jr", chapter: 29, verse: 11 },
  { abbrev: "is", chapter: 41, verse: 10 },
  { abbrev: "is", chapter: 40, verse: 31 },
  { abbrev: "pv", chapter: 3, verse: 5 },
  { abbrev: "fp", chapter: 4, verse: 13 },
  { abbrev: "fp", chapter: 4, verse: 6 },
  { abbrev: "rm", chapter: 8, verse: 28 },
  { abbrev: "rm", chapter: 12, verse: 2 },
  { abbrev: "jo", chapter: 3, verse: 16 },
  { abbrev: "jo", chapter: 14, verse: 27 },
  { abbrev: "mt", chapter: 11, verse: 28 },
  { abbrev: "mt", chapter: 6, verse: 33 },
  { abbrev: "1co", chapter: 13, verse: 4 },
  { abbrev: "ef", chapter: 2, verse: 8 },
  { abbrev: "hb", chapter: 11, verse: 1 },
  { abbrev: "tg", chapter: 1, verse: 5 },
];

function todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getUTCDate().toString().padStart(2, "0")}`;
}

function pickForToday() {
  const d = new Date();
  const seed = d.getUTCFullYear() * 1000 + d.getUTCMonth() * 100 + d.getUTCDate();
  return POOL[seed % POOL.length];
}

export async function GET() {
  const key = todayKey();
  if (cache && cache.date === key) {
    return NextResponse.json(cache.data);
  }

  const pick = pickForToday();
  const book = await findBook("acf", pick.abbrev);
  const verses = await loadChapter("acf", pick.abbrev, pick.chapter);

  if (!book || !verses) {
    return NextResponse.json({ error: "verse_lookup_failed" }, { status: 500 });
  }

  const verseText = verses[pick.verse - 1] ?? "";
  const reference = `${book.name} ${pick.chapter}:${pick.verse}`;

  let reflection =
    "Em silêncio diante deste versículo, deixa que Deus fale ao teu coração hoje.";
  let prayer = "Senhor, abre o meu coração para a Tua Palavra. Amém.";

  if (hasOpenAI()) {
    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "Você é um conselheiro bíblico devocional. Escreva em português brasileiro, com tom acolhedor e fundamentado nas Escrituras, sem clichês evangélicos forçados. Não invente versículos. Responda APENAS em JSON válido com as chaves 'reflexao' (2-3 frases) e 'oracao' (1-2 frases).",
          },
          {
            role: "user",
            content: `Versículo do dia: "${verseText}" — ${reference} (ACF).\n\nEscreva uma curta reflexão devocional (2-3 frases) e uma oração final (1-2 frases). Responda apenas com JSON: { "reflexao": "...", "oracao": "..." }`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const raw = completion.choices[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(raw);
      if (parsed.reflexao) reflection = parsed.reflexao;
      if (parsed.oracao) prayer = parsed.oracao;
    } catch (e) {
      console.error("OpenAI devocional fail:", e);
    }
  }

  const data: Devotional = {
    date: key,
    reference,
    text: verseText,
    versionAbbr: "ACF",
    reflection,
    prayer,
  };
  cache = { date: key, data };
  return NextResponse.json(data);
}
