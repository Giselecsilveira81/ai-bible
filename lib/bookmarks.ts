/** Bookmarks — favoritos por versículo. localStorage. */

const KEY = "ai-bible:bookmarks:v1";

export type Bookmark = {
  versionId: string;
  abbrev: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  addedAt: number;
};

function read(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Bookmark[]) : [];
  } catch {
    return [];
  }
}

function write(arr: Bookmark[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(arr));
}

function same(a: Bookmark, b: Omit<Bookmark, "addedAt" | "text" | "bookName">) {
  return (
    a.versionId === b.versionId &&
    a.abbrev === b.abbrev &&
    a.chapter === b.chapter &&
    a.verse === b.verse
  );
}

export function getBookmarks(): Bookmark[] {
  return read().sort((a, b) => b.addedAt - a.addedAt);
}

export function isBookmarked(
  versionId: string,
  abbrev: string,
  chapter: number,
  verse: number,
): boolean {
  return read().some((b) =>
    same(b, { versionId, abbrev, chapter, verse }),
  );
}

export function toggleBookmark(b: Omit<Bookmark, "addedAt">): boolean {
  const arr = read();
  const idx = arr.findIndex((x) => same(x, b));
  if (idx >= 0) {
    arr.splice(idx, 1);
    write(arr);
    return false;
  }
  arr.push({ ...b, addedAt: Date.now() });
  write(arr);
  return true;
}

export function getChapterBookmarks(
  versionId: string,
  abbrev: string,
  chapter: number,
): Set<number> {
  return new Set(
    read()
      .filter(
        (b) =>
          b.versionId === versionId &&
          b.abbrev === abbrev &&
          b.chapter === chapter,
      )
      .map((b) => b.verse),
  );
}
