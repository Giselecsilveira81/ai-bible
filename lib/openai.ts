import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey
  ? new OpenAI({ apiKey })
  : (null as unknown as OpenAI);

export const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export function hasOpenAI(): boolean {
  return !!apiKey;
}
