/**
 * Cliente do bolls.life — usado pra carregar capítulos de versões remotas.
 *
 * Endpoints:
 *   https://bolls.life/get-text/<VERSION>/<BOOK_ID>/<CHAPTER>/
 *     → [{ pk, verse, text }, ...]
 *   https://bolls.life/get-books/<VERSION>/
 *     → [{ bookid, name, chronorder, chapters }, ...]
 */

const BOLLS_BASE = "https://bolls.life";

export type BollsVerse = { pk: number; verse: number; text: string };

export async function fetchBollsChapter(
  bollsId: string,
  bookId: number,
  chapter: number,
): Promise<string[] | null> {
  try {
    const res = await fetch(
      `${BOLLS_BASE}/get-text/${bollsId}/${bookId}/${chapter}/`,
      { next: { revalidate: 60 * 60 * 24 } }, // cache 24h no Next
    );
    if (!res.ok) return null;
    const verses = (await res.json()) as BollsVerse[];
    // Garantir ordem por verse number e retornar só os textos
    return verses
      .sort((a, b) => a.verse - b.verse)
      .map((v) => v.text);
  } catch (e) {
    console.error("bolls fetch error:", e);
    return null;
  }
}

export type BollsBook = {
  bookid: number;
  name: string;
  chronorder: number;
  chapters: number;
};

export async function fetchBollsBooks(
  bollsId: string,
): Promise<BollsBook[] | null> {
  try {
    const res = await fetch(`${BOLLS_BASE}/get-books/${bollsId}/`, {
      next: { revalidate: 60 * 60 * 24 * 7 }, // cache 7d
    });
    if (!res.ok) return null;
    return (await res.json()) as BollsBook[];
  } catch (e) {
    console.error("bolls books error:", e);
    return null;
  }
}
