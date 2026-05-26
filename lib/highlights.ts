/** Highlights — destaque colorido por versículo. localStorage. */

const KEY = "ai-bible:highlights:v1";

export type HighlightColor = "gold" | "rose" | "sky" | "leaf";

export const HIGHLIGHT_COLORS: {
  id: HighlightColor;
  label: string;
  bg: string; // inline style — não depender de JIT do Tailwind
  ring: string;
  swatch: string; // cor sólida pra ícones/swatches
}[] = [
  {
    id: "gold",
    label: "Dourado",
    bg: "rgba(201, 169, 97, 0.32)",
    ring: "rgba(201, 169, 97, 0.7)",
    swatch: "#C9A961",
  },
  {
    id: "rose",
    label: "Rosa",
    bg: "rgba(244, 173, 173, 0.48)",
    ring: "rgba(244, 173, 173, 0.9)",
    swatch: "#F4ADAD",
  },
  {
    id: "sky",
    label: "Azul",
    bg: "rgba(157, 197, 230, 0.48)",
    ring: "rgba(157, 197, 230, 0.9)",
    swatch: "#9DC5E6",
  },
  {
    id: "leaf",
    label: "Verde",
    bg: "rgba(168, 207, 169, 0.48)",
    ring: "rgba(168, 207, 169, 0.9)",
    swatch: "#A8CFA9",
  },
];

type ChapterHighlights = Record<number, HighlightColor>;
type Store = Record<string, ChapterHighlights>;

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

export function getChapterHighlights(
  v: string,
  abbrev: string,
  chapter: number,
): ChapterHighlights {
  return read()[locKey(v, abbrev, chapter)] ?? {};
}

export function setHighlight(
  v: string,
  abbrev: string,
  chapter: number,
  verse: number,
  color: HighlightColor | null,
) {
  const s = read();
  const k = locKey(v, abbrev, chapter);
  s[k] = s[k] ?? {};
  if (color) {
    s[k][verse] = color;
  } else {
    delete s[k][verse];
    if (Object.keys(s[k]).length === 0) delete s[k];
  }
  write(s);
}

export type HighlightEntry = {
  versionId: string;
  abbrev: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
};

export function getAllHighlights(): HighlightEntry[] {
  const s = read();
  const out: HighlightEntry[] = [];
  for (const [k, ch] of Object.entries(s)) {
    const [versionId, abbrev, chapterStr] = k.split("::");
    const chapter = Number(chapterStr);
    for (const [verseStr, color] of Object.entries(ch)) {
      out.push({
        versionId,
        abbrev,
        chapter,
        verse: Number(verseStr),
        color,
      });
    }
  }
  return out;
}

export function getAllHighlightsCount(): number {
  let n = 0;
  for (const ch of Object.values(read())) n += Object.keys(ch).length;
  return n;
}
