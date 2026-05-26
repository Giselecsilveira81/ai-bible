import { openai, MODEL, hasOpenAI } from "@/lib/openai";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `Você é um conselheiro bíblico respeitoso, em português brasileiro.
- Fundamente cada resposta nas Escrituras, citando versículos por referência (ex: "João 3:16").
- Não invente versículos — se não souber de cor, peça a passagem ou diga "vou recomendar uma leitura".
- Tom acolhedor, sem julgar. Aponte princípios bíblicos, não opiniões pessoais.
- Quando a pergunta for sobre dor ou crise (luto, ansiedade, abuso), seja humano: valide a dor, ofereça versículos de consolo, e sugira buscar apoio profissional quando apropriado.
- Não substituirá o discernimento pastoral nem terapêutico. Diga isso quando relevante.
- Responda em português, parágrafos curtos.`;

export async function POST(req: Request) {
  if (!hasOpenAI()) {
    return new Response(
      "Configure OPENAI_API_KEY no .env.local pra ativar o conselheiro.",
      { status: 503 },
    );
  }
  const { messages, context } = (await req.json()) as {
    messages: Msg[];
    context?: { reference?: string; text?: string };
  };

  const systemWithContext = context?.reference
    ? `${SYSTEM}\n\nContexto atual do usuário (versículo que está lendo): "${context.text ?? ""}" — ${context.reference}`
    : SYSTEM;

  const stream = await openai.chat.completions.create({
    model: MODEL,
    stream: true,
    temperature: 0.5,
    messages: [
      { role: "system", content: systemWithContext },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
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
        console.error("chat stream err", err);
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
