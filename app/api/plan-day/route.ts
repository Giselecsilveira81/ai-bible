import { NextResponse } from "next/server";
import { openai, MODEL, hasOpenAI } from "@/lib/openai";
import { getPlan } from "@/lib/plans";

export const runtime = "nodejs";

type Body = { planSlug: string; day: number };

type Devotional = {
  reference: string;
  passage: string;
  reflection: string;
  prayer: string;
  highlight: string;
};

// Cache em memoria por (slug, day)
const cache = new Map<string, Devotional>();

export async function POST(req: Request) {
  const { planSlug, day } = (await req.json()) as Body;
  const plan = getPlan(planSlug);
  if (!plan) {
    return NextResponse.json({ error: "plan_not_found" }, { status: 404 });
  }
  const reading = plan.readings.find((r) => r.day === day);
  if (!reading) {
    return NextResponse.json({ error: "day_not_found" }, { status: 404 });
  }

  const key = `${planSlug}::${day}`;
  const cached = cache.get(key);
  if (cached) {
    return NextResponse.json(cached);
  }

  let devotional: Devotional = {
    reference: reading.reference,
    passage: reading.passage,
    reflection:
      "Leia esta passagem com atenção. Permita que a Palavra penetre no coração e revele o que precisa ser revelado.",
    prayer: "Senhor, abre minha mente para entender Tua Palavra. Amém.",
    highlight: "",
  };

  if (hasOpenAI()) {
    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "Você é um conselheiro bíblico que escreve devocionais profundos em português brasileiro. Tom acolhedor, fundamentado nas Escrituras, sem clichês. Sempre cite versículos exatos pela referência (sem inventar texto). Responda APENAS em JSON válido.",
          },
          {
            role: "user",
            content: `Plano: "${plan.title}". Dia ${day} de ${plan.days}.
Audiência: ${plan.audience.join(", ")}.
Tema: ${plan.topic}.
Leitura do dia: ${reading.passage} (${reading.reference}).

Escreva o devocional do dia em JSON com as chaves:
- "highlight": 1 frase curta (até 90 caracteres) que resume o coração da passagem
- "reflection": reflexão devocional em 4-6 frases, conectando a passagem à vida prática da audiência
- "prayer": oração final em 2-3 frases

Não cite versículos inventados. Use apenas a referência ${reading.reference}.`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.75,
      });

      const raw = completion.choices[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(raw);
      devotional = {
        reference: reading.reference,
        passage: reading.passage,
        reflection: parsed.reflection ?? devotional.reflection,
        prayer: parsed.prayer ?? devotional.prayer,
        highlight: parsed.highlight ?? "",
      };
    } catch (e) {
      console.error("OpenAI plan-day fail:", e);
    }
  }

  cache.set(key, devotional);
  return NextResponse.json(devotional);
}
