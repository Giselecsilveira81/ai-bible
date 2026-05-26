/** Reading streak — sequência de dias lidos. localStorage. */

const KEY = "ai-bible:streak:v1";

type Stored = {
  daysRead: string[]; // ISO yyyy-mm-dd, ordenado decrescente
  longestStreak: number;
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function read(): Stored {
  if (typeof window === "undefined")
    return { daysRead: [], longestStreak: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    return raw
      ? (JSON.parse(raw) as Stored)
      : { daysRead: [], longestStreak: 0 };
  } catch {
    return { daysRead: [], longestStreak: 0 };
  }
}

function write(s: Stored) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
}

function computeCurrentStreak(daysRead: string[]): number {
  const set = new Set(daysRead);
  let count = 0;
  const d = new Date();
  // Conta dias consecutivos retroativos a partir de hoje (ou começa em ontem se hoje ainda não leu)
  if (!set.has(d.toISOString().slice(0, 10))) {
    d.setDate(d.getDate() - 1);
    if (!set.has(d.toISOString().slice(0, 10))) return 0;
  }
  while (set.has(d.toISOString().slice(0, 10))) {
    count += 1;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

export type StreakInfo = {
  currentStreak: number;
  longestStreak: number;
  daysRead: Set<string>;
  todayDone: boolean;
};

export function getStreak(): StreakInfo {
  const s = read();
  return {
    currentStreak: computeCurrentStreak(s.daysRead),
    longestStreak: s.longestStreak,
    daysRead: new Set(s.daysRead),
    todayDone: s.daysRead.includes(today()),
  };
}

export function markReadToday(): StreakInfo {
  const s = read();
  const t = today();
  if (!s.daysRead.includes(t)) {
    s.daysRead.unshift(t);
    if (s.daysRead.length > 730) s.daysRead = s.daysRead.slice(0, 730); // mantém ~2 anos
  }
  const current = computeCurrentStreak(s.daysRead);
  s.longestStreak = Math.max(s.longestStreak, current);
  write(s);
  return {
    currentStreak: current,
    longestStreak: s.longestStreak,
    daysRead: new Set(s.daysRead),
    todayDone: true,
  };
}

export function lastNDays(n: number): { date: string; read: boolean }[] {
  const set = new Set(read().daysRead);
  const out: { date: string; read: boolean }[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    const iso = d.toISOString().slice(0, 10);
    out.unshift({ date: iso, read: set.has(iso) });
    d.setDate(d.getDate() - 1);
  }
  return out;
}

export { today, yesterday };
