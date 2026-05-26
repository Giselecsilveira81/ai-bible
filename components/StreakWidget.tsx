"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { getStreak, lastNDays, type StreakInfo } from "@/lib/streak";

export default function StreakWidget() {
  const [info, setInfo] = useState<StreakInfo | null>(null);
  const [days, setDays] = useState<{ date: string; read: boolean }[]>([]);

  useEffect(() => {
    setInfo(getStreak());
    setDays(lastNDays(7));
  }, []);

  if (!info)
    return (
      <div className="card-soft p-5 animate-pulse h-32">
        <div className="h-4 w-24 bg-ink/10 rounded" />
      </div>
    );

  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <div className="card-soft p-5 lg:p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="section-eyebrow">Sequência</p>
          <div className="flex items-baseline gap-2 mt-2">
            <Flame
              size={28}
              className={info.currentStreak > 0 ? "text-gold" : "text-ink-mute"}
              strokeWidth={1.5}
            />
            <span className="font-serif text-4xl tracking-tight">
              {info.currentStreak}
            </span>
            <span className="text-sm text-ink-mute">
              dia{info.currentStreak === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink-mute">
            recorde
          </p>
          <p className="font-serif text-2xl text-gold-dark">
            {info.longestStreak}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d, i) => {
          const dt = new Date(d.date + "T00:00:00");
          const isToday = i === days.length - 1;
          return (
            <div key={d.date} className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-mono uppercase text-ink-mute">
                {weekdays[dt.getDay()]}
              </span>
              <div
                className={`w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-mono transition-colors ${
                  d.read
                    ? "bg-gold/30 text-gold-dark border border-gold/50"
                    : "bg-ink/5 text-ink-mute border border-transparent"
                } ${isToday ? "ring-2 ring-gold/40 ring-offset-1 ring-offset-paper" : ""}`}
              >
                {dt.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {!info.todayDone && (
        <p className="mt-4 text-xs text-ink-mute">
          Leia qualquer capítulo hoje pra continuar a sequência.
        </p>
      )}
    </div>
  );
}
