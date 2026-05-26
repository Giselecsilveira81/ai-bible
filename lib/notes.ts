/** Notes — persistência local (localStorage). Supabase virá depois. */

const KEY = "ai-bible:notes:v1";

export type ChapterNotes = Record<number, string>; // { 3: "minha nota no verso 3" }

type Store = Record<string, ChapterNotes>; // key = "version::abbrev::chapter"

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function write(s: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
}

function locKey(v: string, abbrev: string, chapter: number) {
  return `${v}::${abbrev}::${chapter}`;
}

export function getChapterNotes(
  v: string,
  abbrev: string,
  chapter: number,
): ChapterNotes {
  const s = read();
  return s[locKey(v, abbrev, chapter)] ?? {};
}

export function setVerseNote(
  v: string,
  abbrev: string,
  chapter: number,
  verse: number,
  text: string,
) {
  const s = read();
  const k = locKey(v, abbrev, chapter);
  s[k] = s[k] ?? {};
  if (text.trim()) {
    s[k][verse] = text;
  } else {
    delete s[k][verse];
    if (Object.keys(s[k]).length === 0) delete s[k];
  }
  write(s);
}

export function getAllNotesCount(): number {
  const s = read();
  let n = 0;
  for (const chap of Object.values(s)) {
    n += Object.keys(chap).length;
  }
  return n;
}
