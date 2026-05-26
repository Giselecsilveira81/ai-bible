import { openai, hasOpenAI } from "@/lib/openai";

export const runtime = "nodejs";

/**
 * Text-to-speech via OpenAI TTS.
 * POST { text, voice?, speed? } → audio/mpeg stream.
 */
export async function POST(req: Request) {
  if (!hasOpenAI()) {
    return new Response("OPENAI_API_KEY ausente.", { status: 503 });
  }

  const { text, voice, speed } = (await req.json()) as {
    text: string;
    voice?: string;
    speed?: number;
  };

  if (!text || text.length > 4096) {
    return new Response("Texto vazio ou muito longo (máx 4096).", {
      status: 400,
    });
  }

  try {
    const speech = await openai.audio.speech.create({
      model: "tts-1",
      voice: (voice as "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer") ?? "nova",
      input: text,
      speed: typeof speed === "number" ? Math.min(2, Math.max(0.5, speed)) : 1,
      response_format: "mp3",
    });

    return new Response(speech.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("tts err", err);
    return new Response("Erro ao gerar áudio.", { status: 500 });
  }
}
