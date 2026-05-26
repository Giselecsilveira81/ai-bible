#!/usr/bin/env node
/**
 * Baixa traduções da Bíblia do mirror wldeh/bible-api via jsDelivr CDN
 * e converte pro formato AI Bible.
 *
 * Uso:
 *   node scripts/download-versions.mjs
 *   ONLY=en-asv,en-web node scripts/download-versions.mjs   (filtrar)
 *
 * URL pattern:
 *   https://cdn.jsdelivr.net/gh/wldeh/bible-api@main/bibles/<id>/books/<book>/chapters/<ch>.json
 * Formato:
 *   { data: [{ book, chapter, verse, text }, ...] }
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BIBLE_DIR = path.join(ROOT, "public", "bible");

const CDN = "https://cdn.jsdelivr.net/gh/wldeh/bible-api@main/bibles";

// Versões a baixar (escolhi públicas + amplamente conhecidas)
const VERSIONS = [
  { id: "en-asv",      localId: "asv",       name: "American Standard Version",   abbr: "ASV",  lang: "en",    group: "English" },
  { id: "en-web",      localId: "web",       name: "World English Bible",          abbr: "WEB",  lang: "en",    group: "English" },
  { id: "en-bsb",      localId: "bsb",       name: "Berean Standard Bible",        abbr: "BSB",  lang: "en",    group: "English" },
  { id: "en-dra",      localId: "dra",       name: "Douay-Rheims",                 abbr: "DRA",  lang: "en",    group: "English" },
  { id: "en-gnv",      localId: "gnv",       name: "Geneva Bible 1599",            abbr: "GNV",  lang: "en",    group: "English" },
  { id: "en-rv",       localId: "rv",        name: "Revised Version 1885",         abbr: "RV",   lang: "en",    group: "English" },
  { id: "es-rv09",     localId: "rv09",      name: "Reina-Valera 1909",            abbr: "RV09", lang: "es",    group: "Español" },
  { id: "es-bes",      localId: "es-bes",    name: "Biblia Española Sefarad",      abbr: "BES",  lang: "es",    group: "Español" },
  { id: "de-luther1912", localId: "luther",  name: "Lutero 1912",                  abbr: "LUT",  lang: "de",    group: "Deutsch" },
  { id: "de-elo",      localId: "elb",       name: "Elberfelder",                   abbr: "ELB",  lang: "de",    group: "Deutsch" },
];

// Mapa OSIS-like → { abbrev local, slug, testament, chapters }
const BOOK_MAP = [
  { osis: "genesis",          abbrev: "gn",   slug: "genesis",                    chapters: 50, testament: "AT" },
  { osis: "exodus",           abbrev: "ex",   slug: "exodo",                      chapters: 40, testament: "AT" },
  { osis: "leviticus",        abbrev: "lv",   slug: "levitico",                   chapters: 27, testament: "AT" },
  { osis: "numbers",          abbrev: "nm",   slug: "numeros",                    chapters: 36, testament: "AT" },
  { osis: "deuteronomy",      abbrev: "dt",   slug: "deuteronomio",               chapters: 34, testament: "AT" },
  { osis: "joshua",           abbrev: "js",   slug: "josue",                      chapters: 24, testament: "AT" },
  { osis: "judges",           abbrev: "jz",   slug: "juizes",                     chapters: 21, testament: "AT" },
  { osis: "ruth",             abbrev: "rt",   slug: "rute",                       chapters: 4,  testament: "AT" },
  { osis: "1samuel",          abbrev: "1sm",  slug: "1-samuel",                   chapters: 31, testament: "AT" },
  { osis: "2samuel",          abbrev: "2sm",  slug: "2-samuel",                   chapters: 24, testament: "AT" },
  { osis: "1kings",           abbrev: "1rs",  slug: "1-reis",                     chapters: 22, testament: "AT" },
  { osis: "2kings",           abbrev: "2rs",  slug: "2-reis",                     chapters: 25, testament: "AT" },
  { osis: "1chronicles",      abbrev: "1cr",  slug: "1-cronicas",                 chapters: 29, testament: "AT" },
  { osis: "2chronicles",      abbrev: "2cr",  slug: "2-cronicas",                 chapters: 36, testament: "AT" },
  { osis: "ezra",             abbrev: "ed",   slug: "esdras",                     chapters: 10, testament: "AT" },
  { osis: "nehemiah",         abbrev: "ne",   slug: "neemias",                    chapters: 13, testament: "AT" },
  { osis: "esther",           abbrev: "et",   slug: "ester",                      chapters: 10, testament: "AT" },
  { osis: "job",              abbrev: "jó",   slug: "jo",                         chapters: 42, testament: "AT" },
  { osis: "psalms",           abbrev: "sl",   slug: "salmos",                     chapters: 150, testament: "AT" },
  { osis: "proverbs",         abbrev: "pv",   slug: "proverbios",                 chapters: 31, testament: "AT" },
  { osis: "ecclesiastes",     abbrev: "ec",   slug: "eclesiastes",                chapters: 12, testament: "AT" },
  { osis: "songofsolomon",    abbrev: "ct",   slug: "canticos",                   chapters: 8,  testament: "AT" },
  { osis: "isaiah",           abbrev: "is",   slug: "isaias",                     chapters: 66, testament: "AT" },
  { osis: "jeremiah",         abbrev: "jr",   slug: "jeremias",                   chapters: 52, testament: "AT" },
  { osis: "lamentations",     abbrev: "lm",   slug: "lamentacoes-de-jeremias",    chapters: 5,  testament: "AT" },
  { osis: "ezekiel",          abbrev: "ez",   slug: "ezequiel",                   chapters: 48, testament: "AT" },
  { osis: "daniel",           abbrev: "dn",   slug: "daniel",                     chapters: 12, testament: "AT" },
  { osis: "hosea",            abbrev: "os",   slug: "oseias",                     chapters: 14, testament: "AT" },
  { osis: "joel",             abbrev: "jl",   slug: "joel",                       chapters: 3,  testament: "AT" },
  { osis: "amos",             abbrev: "am",   slug: "amos",                       chapters: 9,  testament: "AT" },
  { osis: "obadiah",          abbrev: "ob",   slug: "obadias",                    chapters: 1,  testament: "AT" },
  { osis: "jonah",            abbrev: "jn",   slug: "jonas",                      chapters: 4,  testament: "AT" },
  { osis: "micah",            abbrev: "mq",   slug: "miqueias",                   chapters: 7,  testament: "AT" },
  { osis: "nahum",            abbrev: "na",   slug: "naum",                       chapters: 3,  testament: "AT" },
  { osis: "habakkuk",         abbrev: "hc",   slug: "habacuque",                  chapters: 3,  testament: "AT" },
  { osis: "zephaniah",        abbrev: "sf",   slug: "sofonias",                   chapters: 3,  testament: "AT" },
  { osis: "haggai",           abbrev: "ag",   slug: "ageu",                       chapters: 2,  testament: "AT" },
  { osis: "zechariah",        abbrev: "zc",   slug: "zacarias",                   chapters: 14, testament: "AT" },
  { osis: "malachi",          abbrev: "ml",   slug: "malaquias",                  chapters: 4,  testament: "AT" },
  { osis: "matthew",          abbrev: "mt",   slug: "mateus",                     chapters: 28, testament: "NT" },
  { osis: "mark",             abbrev: "mc",   slug: "marcos",                     chapters: 16, testament: "NT" },
  { osis: "luke",             abbrev: "lc",   slug: "lucas",                      chapters: 24, testament: "NT" },
  { osis: "john",             abbrev: "jo",   slug: "joao",                       chapters: 21, testament: "NT" },
  { osis: "acts",             abbrev: "atos", slug: "atos",                       chapters: 28, testament: "NT" },
  { osis: "romans",           abbrev: "rm",   slug: "romanos",                    chapters: 16, testament: "NT" },
  { osis: "1corinthians",     abbrev: "1co",  slug: "1-corintios",                chapters: 16, testament: "NT" },
  { osis: "2corinthians",     abbrev: "2co",  slug: "2-corintios",                chapters: 13, testament: "NT" },
  { osis: "galatians",        abbrev: "gl",   slug: "galatas",                    chapters: 6,  testament: "NT" },
  { osis: "ephesians",        abbrev: "ef",   slug: "efesios",                    chapters: 6,  testament: "NT" },
  { osis: "philippians",      abbrev: "fp",   slug: "filipenses",                 chapters: 4,  testament: "NT" },
  { osis: "colossians",       abbrev: "cl",   slug: "colossenses",                chapters: 4,  testament: "NT" },
  { osis: "1thessalonians",   abbrev: "1ts",  slug: "1-tessalonicenses",          chapters: 5,  testament: "NT" },
  { osis: "2thessalonians",   abbrev: "2ts",  slug: "2-tessalonicenses",          chapters: 3,  testament: "NT" },
  { osis: "1timothy",         abbrev: "1tm",  slug: "1-timoteo",                  chapters: 6,  testament: "NT" },
  { osis: "2timothy",         abbrev: "2tm",  slug: "2-timoteo",                  chapters: 4,  testament: "NT" },
  { osis: "titus",            abbrev: "tt",   slug: "tito",                       chapters: 3,  testament: "NT" },
  { osis: "philemon",         abbrev: "fm",   slug: "filemom",                    chapters: 1,  testament: "NT" },
  { osis: "hebrews",          abbrev: "hb",   slug: "hebreus",                    chapters: 13, testament: "NT" },
  { osis: "james",            abbrev: "tg",   slug: "tiago",                      chapters: 5,  testament: "NT" },
  { osis: "1peter",           abbrev: "1pe",  slug: "1-pedro",                    chapters: 5,  testament: "NT" },
  { osis: "2peter",           abbrev: "2pe",  slug: "2-pedro",                    chapters: 3,  testament: "NT" },
  { osis: "1john",            abbrev: "1jo",  slug: "1-joao",                     chapters: 5,  testament: "NT" },
  { osis: "2john",            abbrev: "2jo",  slug: "2-joao",                     chapters: 1,  testament: "NT" },
  { osis: "3john",            abbrev: "3jo",  slug: "3-joao",                     chapters: 1,  testament: "NT" },
  { osis: "jude",             abbrev: "jd",   slug: "judas",                      chapters: 1,  testament: "NT" },
  { osis: "revelation",       abbrev: "ap",   slug: "apocalipse",                 chapters: 22, testament: "NT" },
];

async function fetchJson(url, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 400 * (i + 1)));
    }
  }
}

async function pMap(items, limit, fn) {
  const out = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      out[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

async function downloadVersion(version) {
  console.log(`\n📥 ${version.abbr} — ${version.name} (${version.id})`);
  const outDir = path.join(BIBLE_DIR, version.localId);
  await fs.mkdir(outDir, { recursive: true });

  let totalCh = 0;
  let booksDone = 0;
  const index = [];

  for (const book of BOOK_MAP) {
    const chapterIds = Array.from({ length: book.chapters }, (_, i) => i + 1);

    const chapters = await pMap(chapterIds, 8, async (ch) => {
      const url = `${CDN}/${version.id}/books/${book.osis}/chapters/${ch}.json`;
      const data = await fetchJson(url);
      if (!data || !Array.isArray(data.data)) return null;
      return data.data.map(v => v.text.trim());
    });

    // Se TODOS forem null, livro não existe nessa versão (ex: NT-only)
    if (chapters.every(c => c === null)) continue;

    // Substituir nulls (capítulos faltantes) por arrays vazios
    const filled = chapters.map(c => c ?? []);

    // Pegar nome do livro a partir do primeiro versículo encontrado (heurística)
    let bookName = book.osis; // fallback
    for (const ch of chapters) {
      if (ch && ch.length > 0) {
        // O nome veio do `data[0].book` (vou recuperar de um fetch)
        const firstUrl = `${CDN}/${version.id}/books/${book.osis}/chapters/1.json`;
        const firstData = await fetchJson(firstUrl);
        if (firstData?.data?.[0]?.book) {
          bookName = firstData.data[0].book;
        }
        break;
      }
    }

    const bookData = {
      abbrev: book.abbrev,
      name: bookName,
      chapters: filled,
    };
    await fs.writeFile(
      path.join(outDir, `${book.abbrev}.json`),
      JSON.stringify(bookData),
    );

    index.push({
      abbrev: book.abbrev,
      name: bookName,
      slug: book.slug,
      chapters: book.chapters,
      testament: book.testament,
    });

    booksDone++;
    totalCh += book.chapters;
    process.stdout.write(`\r  ${booksDone}/${BOOK_MAP.length} livros · ${totalCh} caps`);
  }

  if (index.length === 0) {
    console.log("\n  ✗ Nenhum livro baixado.");
    await fs.rm(outDir, { recursive: true });
    return null;
  }

  await fs.writeFile(
    path.join(outDir, "_index.json"),
    JSON.stringify(index, null, 2),
  );
  console.log(`\n  ✅ ${version.abbr}: ${index.length} livros, ${totalCh} capítulos`);

  return {
    id: version.localId,
    name: version.name,
    abbr: version.abbr,
    lang: version.lang,
    group: version.group,
  };
}

async function updateVersionsJson(added) {
  const p = path.join(BIBLE_DIR, "_versions.json");
  const existing = JSON.parse(await fs.readFile(p, "utf-8"));
  const byId = new Map(existing.map(v => [v.id, v]));
  for (const a of added) if (a) byId.set(a.id, a);
  const sorted = [...byId.values()].sort((a, b) => {
    const g = a.group.localeCompare(b.group);
    return g !== 0 ? g : a.name.localeCompare(b.name);
  });
  await fs.writeFile(p, JSON.stringify(sorted, null, 2));
  console.log(`\n📝 _versions.json: ${sorted.length} versões total`);
}

async function main() {
  const only = process.env.ONLY ? process.env.ONLY.split(",") : null;
  const target = only ? VERSIONS.filter(v => only.includes(v.id) || only.includes(v.localId)) : VERSIONS;
  console.log(`Vou baixar ${target.length} versões.`);

  const added = [];
  for (const v of target) {
    try {
      const r = await downloadVersion(v);
      added.push(r);
    } catch (e) {
      console.error(`\n❌ Falha em ${v.id}:`, e.message);
    }
  }
  await updateVersionsJson(added);
  console.log("\n🎉 Pronto.");
}

main().catch(e => { console.error(e); process.exit(1); });
