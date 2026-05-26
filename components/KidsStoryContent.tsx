"use client";

import { useEffect, useState } from "react";

type StoryData = {
  story: string;
  moral: string;
  verseToMemorize: { reference: string; text: string };
  quiz: { question: string; options: string[]; answer: number }[];
};

export default function KidsStoryContent({ slug }: { slug: string }) {
  const [data, setData] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("/api/kids-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <div className="animate-pulse space-y-3 py-8">
        <div className="h-3 bg-ink/10 rounded" />
        <div className="h-3 bg-ink/10 rounded w-4/5" />
        <div className="h-3 bg-ink/10 rounded w-3/5" />
      </div>
    );

  if (!data)
    return (
      <p className="text-sm text-ink-mute py-8">
        História indisponível agora. Adicione sua chave OpenAI no{" "}
        <code>.env.local</code>.
      </p>
    );

  const paragraphs = data.story.split(/\n\n+/).filter(Boolean);
  const score = data.quiz.reduce(
    (acc, q, i) => (answers[i] === q.answer ? acc + 1 : acc),
    0,
  );
  const allAnswered = Object.keys(answers).length === data.quiz.length;

  return (
    <article className="space-y-8">
      <section className="reader-text space-y-4 leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      {data.moral && (
        <section className="border-l-2 border-ink pl-4">
          <p className="text-xs uppercase tracking-widest text-ink-mute mb-2">
            Moral
          </p>
          <p className="font-serif text-lg leading-snug">{data.moral}</p>
        </section>
      )}

      {data.verseToMemorize?.text && (
        <section className="bg-ink/5 rounded-lg p-5">
          <p className="text-xs uppercase tracking-widest text-ink-mute mb-2">
            Versículo para memorizar
          </p>
          <p className="font-serif text-xl leading-snug italic">
            "{data.verseToMemorize.text}"
          </p>
          <p className="text-xs text-ink-mute mt-2">
            {data.verseToMemorize.reference}
          </p>
        </section>
      )}

      {data.quiz.length > 0 && (
        <section>
          <p className="text-xs uppercase tracking-widest text-ink-mute mb-4">
            Vamos brincar?
          </p>
          <div className="space-y-5">
            {data.quiz.map((q, qi) => (
              <div key={qi}>
                <p className="font-medium mb-2">
                  {qi + 1}. {q.question}
                </p>
                <ul className="space-y-1.5">
                  {q.options.map((opt, oi) => {
                    const chosen = answers[qi] === oi;
                    const correct = showResult && oi === q.answer;
                    const wrong = showResult && chosen && oi !== q.answer;
                    return (
                      <li key={oi}>
                        <button
                          disabled={showResult}
                          onClick={() =>
                            setAnswers((a) => ({ ...a, [qi]: oi }))
                          }
                          className={`w-full text-left text-sm p-2.5 rounded-md border transition-colors ${
                            correct
                              ? "border-green-500 bg-green-50"
                              : wrong
                                ? "border-red-500 bg-red-50"
                                : chosen
                                  ? "border-ink bg-ink/5"
                                  : "border-ink/10 hover:bg-ink/5"
                          }`}
                        >
                          {opt}
                          {correct && " ✓"}
                          {wrong && " ✗"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <button
            disabled={!allAnswered || showResult}
            onClick={() => setShowResult(true)}
            className="mt-6 px-5 py-2.5 text-xs uppercase tracking-wider bg-ink text-paper rounded-md disabled:bg-ink/20 disabled:cursor-not-allowed"
          >
            {showResult ? `${score}/${data.quiz.length}` : "ver resultado"}
          </button>
          {showResult && (
            <button
              onClick={() => {
                setAnswers({});
                setShowResult(false);
              }}
              className="mt-6 ml-2 px-5 py-2.5 text-xs uppercase tracking-wider border border-ink/15 rounded-md hover:bg-ink/5"
            >
              tentar de novo
            </button>
          )}
        </section>
      )}
    </article>
  );
}
