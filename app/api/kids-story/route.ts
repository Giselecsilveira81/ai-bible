import { NextResponse } from "next/server";
import { openai, MODEL, hasOpenAI } from "@/lib/openai";
import { getKidsStory } from "@/lib/kidsStories";

export const runtime = "nodejs";

type StoryResponse = {
  story: string;
  moral: string;
  verseToMemorize: { reference: string; text: string };
  quiz: { question: string; options: string[]; answer: number }[];
};

const cache = new Map<string, StoryResponse>();

export async function POST(req: Request) {
  const { slug } = await req.json();
  const meta = getKidsStory(slug);
  if (!meta) {
    return NextResponse.json({ error: "story_not_found" }, { status: 404 });
  }

  const cached = cache.get(slug);
  if (cached) {
    return NextResponse.json(cached);
  }

  let resp: StoryResponse = {
    story: "Em breve a história aparecerá aqui — adicione sua chave OpenAI.",
    moral: "Deus te ama muito!",
    verseToMemorize: { reference: meta.reference, text: "" },
    quiz: [],
  };

  if (hasOpenAI()) {
    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "Você é um contador de histórias bíblicas para crianças (idade 4-10 anos). Escreva em português brasileiro, linguagem simples, frases curtas, vocabulário acessível. Cite versículos por referência (sem inventar texto). Responda APENAS em JSON válido.",
          },
          {
            role: "user",
            content: `História bíblica: "${meta.title}" (${meta.reference}).

Crie em JSON:
- "story": narração da história em 5-7 parágrafos curtos (3 frases cada), tom acolhedor, sem violência gráfica, adaptado para crianças
- "moral": 1 frase com a moral/lição (ex: "Deus cuida de quem confia Nele")
- "verseToMemorize": { "reference": "...", "text": "versículo curto e simples para memorizar (até 80 caracteres, em PT-BR)" }
- "quiz": array com 3 perguntas. Cada pergunta: { "question": "...", "options": ["A", "B", "C"], "answer": 0 } onde answer é o índice (0-based) da opção correta.`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.75,
      });

      const raw = completion.choices[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(raw);
      resp = {
        story: parsed.story ?? resp.story,
        moral: parsed.moral ?? resp.moral,
        verseToMemorize: parsed.verseToMemorize ?? resp.verseToMemorize,
        quiz: Array.isArray(parsed.quiz) ? parsed.quiz : [],
      };
    } catch (e) {
      console.error("OpenAI kids-story fail:", e);
    }
  }

  cache.set(slug, resp);
  return NextResponse.json(resp);
}
