import { openai, MODEL, hasOpenAI } from "@/lib/openai";

export const runtime = "nodejs";

const SYSTEM = `Você é um exegeta bíblico em português brasileiro, formado em hermenêutica clássica.
Tarefa: explicar o capítulo informado em 4 blocos curtos:

**Contexto histórico** — autor, audiência original, situação.
**Estrutura** — divisões internas do capítulo, em 2-4 partes.
**Temas centrais** — ideias teológicas dominantes, com versículos-chave entre parênteses.
**Aplicação hoje** — 2-3 pontos práticos pra vida cristã contemporânea.

Regras:
- Use markdown, com **negrito** nos títulos.
- Cite versículos por referência (ex: v. 16, vv. 2-4).
- Sem disclaimers, sem "espero ter ajudado". Texto editorial e direto.
- Profundidade real: cite o grego/hebraico quando relevante, comentaristas (Calvino, Barclay, Chrysostomo) quando útil.
- 300-450 palavras no total.`;

export async function POST(req: Request) {
  if (!hasOpenAI()) {
    return new Response(
      "Configure OPENAI_API_KEY no .env.local pra ativar a explicação.",
      { status: 503 },
    );
  }
  const { bookName, chapter, versionAbbr, text } = (await req.json()) as {
    bookName: string;
    chapter: number;
    versionAbbr: string;
    text: string;
  };

  const user = `Explique ${bookName} ${chapter} (${versionAbbr}).

Texto do capítulo (com numeração de versículos):

${text}`;

  const stream = await openai.chat.completions.create({
    model: MODEL,
    stream: true,
    temperature: 0.4,
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: user },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
        controller.close();
      } catch (err) {
        console.error("explain stream err", err);
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
