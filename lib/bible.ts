import { promises as fs } from "fs";
import path from "path";

export type Testament = "AT" | "NT";

export type BookIndex = {
  abbrev: string;
  name: string;
  slug: string;
  chapters: number;
  testament: Testament;
};

export type Version = {
  id: string;
  name: string;
  abbr: string;
  lang: string;
  group: string;
};

export type Book = {
  abbrev: string;
  name: string;
  chapters: string[][];
};

const BIBLE_DIR = path.join(process.cwd(), "public", "bible");

let _versions: Version[] | null = null;
const _indexCache = new Map<string, BookIndex[]>();

export async function getVersions(): Promise<Version[]> {
  if (_versions) return _versions;
  const raw = await fs.readFile(
    path.join(BIBLE_DIR, "_versions.json"),
    "utf-8",
  );
  _versions = JSON.parse(raw) as Version[];
  return _versions;
}

export async function getIndex(versionId: string): Promise<BookIndex[]> {
  const cached = _indexCache.get(versionId);
  if (cached) return cached;
  const raw = await fs.readFile(
    path.join(BIBLE_DIR, versionId, "_index.json"),
    "utf-8",
  );
  const idx = JSON.parse(raw) as BookIndex[];
  _indexCache.set(versionId, idx);
  return idx;
}

export async function findBook(
  versionId: string,
  slugOrAbbrev: string,
): Promise<BookIndex | null> {
  const idx = await getIndex(versionId);
  return (
    idx.find((b) => b.slug === slugOrAbbrev || b.abbrev === slugOrAbbrev) ??
    null
  );
}

export async function loadBook(
  versionId: string,
  abbrev: string,
): Promise<Book | null> {
  try {
    const raw = await fs.readFile(
      path.join(BIBLE_DIR, versionId, `${abbrev}.json`),
      "utf-8",
    );
    return JSON.parse(raw) as Book;
  } catch {
    return null;
  }
}

export async function loadChapter(
  versionId: string,
  abbrev: string,
  chapter: number,
): Promise<string[] | null> {
  const book = await loadBook(versionId, abbrev);
  if (!book) return null;
  return book.chapters[chapter - 1] ?? null;
}

export async function nextLocation(
  versionId: string,
  abbrev: string,
  chapter: number,
): Promise<{ abbrev: string; slug: string; chapter: number } | null> {
  const idx = await getIndex(versionId);
  const i = idx.findIndex((b) => b.abbrev === abbrev);
  if (i < 0) return null;
  const cur = idx[i];
  if (chapter < cur.chapters) {
    return { abbrev: cur.abbrev, slug: cur.slug, chapter: chapter + 1 };
  }
  const next = idx[i + 1];
  if (!next) return null;
  return { abbrev: next.abbrev, slug: next.slug, chapter: 1 };
}

export async function prevLocation(
  versionId: string,
  abbrev: string,
  chapter: number,
): Promise<{ abbrev: string; slug: string; chapter: number } | null> {
  const idx = await getIndex(versionId);
  const i = idx.findIndex((b) => b.abbrev === abbrev);
  if (i < 0) return null;
  if (chapter > 1) {
    return { abbrev, slug: idx[i].slug, chapter: chapter - 1 };
  }
  const prev = idx[i - 1];
  if (!prev) return null;
  return { abbrev: prev.abbrev, slug: prev.slug, chapter: prev.chapters };
}
