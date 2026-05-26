"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlan, AUDIENCES } from "@/lib/plans";
import PlanDayContent from "@/components/PlanDayContent";

type Params = { slug: string };

export default function PlanPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = use(params);
  const plan = getPlan(slug);
  if (!plan) notFound();

  const [day, setDay] = useState(1);

  return (
    <main className="mx-auto max-w-reader px-6 py-10">
      <Link
        href="/plans"
        className="text-xs uppercase tracking-widest text-ink-mute hover:text-ink"
      >
        ← Planos
      </Link>

      <header className="mt-4 mb-8">
        <p className="text-xs uppercase tracking-widest text-ink-mute">
          {plan.topic}
        </p>
        <h1 className="text-3xl font-serif tracking-tight mt-1">
          {plan.title}
        </h1>
        <p className="text-sm text-ink-mute mt-2">{plan.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {plan.audience
            .filter((a) => a !== "todos")
            .map((a) => (
              <span
                key={a}
                className="text-[10px] uppercase tracking-wider bg-ink/5 px-2 py-0.5 rounded"
              >
                {AUDIENCES.find((x) => x.id === a)?.label ?? a}
              </span>
            ))}
        </div>
      </header>

      <div className="mb-6 -mx-6 px-6 overflow-x-auto">
        <div className="flex gap-1.5 pb-1">
          {plan.readings.map((r) => (
            <button
              key={r.day}
              onClick={() => setDay(r.day)}
              className={`shrink-0 w-10 h-10 text-sm rounded-md transition-colors ${
                day === r.day
                  ? "bg-ink text-paper"
                  : "border border-ink/15 text-ink-mute hover:bg-ink/5"
              }`}
            >
              {r.day}
            </button>
          ))}
        </div>
      </div>

      <PlanDayContent
        planSlug={plan.slug}
        day={day}
        totalDays={plan.days}
      />
    </main>
  );
}
