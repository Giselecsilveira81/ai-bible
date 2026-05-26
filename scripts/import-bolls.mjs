#!/usr/bin/env node
/**
 * Importa todas as versões/idiomas do bolls.life como versões REMOTE
 * (chamada API em runtime — sem baixar capítulos).
 *
 * Uso:
 *   node scripts/import-bolls.mjs
 *
 * Resultado:
 *   - _versions.json atualizado com 600+ versões
 *   - public/bible/<versionId>/_index.json criado para cada (lista de livros)
 *   - Capítulos NÃO baixados — virão via bolls.life em runtime
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BIBLE_DIR = path.join(ROOT, "public", "bible");

const BOLLS_LANGS = "https://bolls.life/static/bolls/app/views/languages.json";

// Mapa bolls bookid (1-66) → abbrev/slug local
const BOOK_BY_BOLLS_ID = {
  1: { abbrev: "gn",   slug: "genesis",                  testament: "AT" },
  2: { abbrev: "ex",   slug: "exodo",                    testament: "AT" },
  3: { abbrev: "lv",   slug: "levitico",                 testament: "AT" },
  4: { abbrev: "nm",   slug: "numeros",                  testament: "AT" },
  5: { abbrev: "dt",   slug: "deuteronomio",             testament: "AT" },
  6: { abbrev: "js",   slug: "josue",                    testament: "AT" },
  7: { abbrev: "jz",   slug: "juizes",                   testament: "AT" },
  8: { abbrev: "rt",   slug: "rute",                     testament: "AT" },
  9: { abbrev: "1sm",  slug: "1-samuel",                 testament: "AT" },
  10: { abbrev: "2sm", slug: "2-samuel",                 testament: "AT" },
  11: { abbrev: "1rs", slug: "1-reis",                   testament: "AT" },
  12: { abbrev: "2rs", slug: "2-reis",                   testament: "AT" },
  13: { abbrev: "1cr", slug: "1-cronicas",               testament: "AT" },
  14: { abbrev: "2cr", slug: "2-cronicas",               testament: "AT" },
  15: { abbrev: "ed",  slug: "esdras",                   testament: "AT" },
  16: { abbrev: "ne",  slug: "neemias",                  testament: "AT" },
  17: { abbrev: "et",  slug: "ester",                    testament: "AT" },
  18: { abbrev: "jó",  slug: "jo",                       testament: "AT" },
  19: { abbrev: "sl",  slug: "salmos",                   testament: "AT" },
  20: { abbrev: "pv",  slug: "proverbios",               testament: "AT" },
  21: { abbrev: "ec",  slug: "eclesiastes",              testament: "AT" },
  22: { abbrev: "ct",  slug: "canticos",                 testament: "AT" },
  23: { abbrev: "is",  slug: "isaias",                   testament: "AT" },
  24: { abbrev: "jr",  slug: "jeremias",                 testament: "AT" },
  25: { abbrev: "lm",  slug: "lamentacoes-de-jeremias",  testament: "AT" },
  26: { abbrev: "ez",  slug: "ezequiel",                 testament: "AT" },
  27: { abbrev: "dn",  slug: "daniel",                   testament: "AT" },
  28: { abbrev: "os",  slug: "oseias",                   testament: "AT" },
  29: { abbrev: "jl",  slug: "joel",                     testament: "AT" },
  30: { abbrev: "am",  slug: "amos",                     testament: "AT" },
  31: { abbrev: "ob",  slug: "obadias",                  testament: "AT" },
  32: { abbrev: "jn",  slug: "jonas",                    testament: "AT" },
  33: { abbrev: "mq",  slug: "miqueias",                 testament: "AT" },
  34: { abbrev: "na",  slug: "naum",                     testament: "AT" },
  35: { abbrev: "hc",  slug: "habacuque",                testament: "AT" },
  36: { abbrev: "sf",  slug: "sofonias",                 testament: "AT" },
  37: { abbrev: "ag",  slug: "ageu",                     testament: "AT" },
  38: { abbrev: "zc",  slug: "zacarias",                 testament: "AT" },
  39: { abbrev: "ml",  slug: "malaquias",                testament: "AT" },
  40: { abbrev: "mt",  slug: "mateus",                   testament: "NT" },
  41: { abbrev: "mc",  slug: "marcos",                   testament: "NT" },
  42: { abbrev: "lc",  slug: "lucas",                    testament: "NT" },
  43: { abbrev: "jo",  slug: "joao",                     testament: "NT" },
  44: { abbrev: "atos",slug: "atos",                     testament: "NT" },
  45: { abbrev: "rm",  slug: "romanos",                  testament: "NT" },
  46: { abbrev: "1co", slug: "1-corintios",              testament: "NT" },
  47: { abbrev: "2co", slug: "2-corintios",              testament: "NT" },
  48: { abbrev: "gl",  slug: "galatas",                  testament: "NT" },
  49: { abbrev: "ef",  slug: "efesios",                  testament: "NT" },
  50: { abbrev: "fp",  slug: "filipenses",               testament: "NT" },
  51: { abbrev: "cl",  slug: "colossenses",              testament: "NT" },
  52: { abbrev: "1ts", slug: "1-tessalonicenses",        testament: "NT" },
  53: { abbrev: "2ts", slug: "2-tessalonicenses",        testament: "NT" },
  54: { abbrev: "1tm", slug: "1-timoteo",                testament: "NT" },
  55: { abbrev: "2tm", slug: "2-timoteo",                testament: "NT" },
  56: { abbrev: "tt",  slug: "tito",                     testament: "NT" },
  57: { abbrev: "fm",  slug: "filemom",                  testament: "NT" },
  58: { abbrev: "hb",  slug: "hebreus",                  testament: "NT" },
  59: { abbrev: "tg",  slug: "tiago",                    testament: "NT" },
  60: { abbrev: "1pe", slug: "1-pedro",                  testament: "NT" },
  61: { abbrev: "2pe", slug: "2-pedro",                  testament: "NT" },
  62: { abbrev: "1jo", slug: "1-joao",                   testament: "NT" },
  63: { abbrev: "2jo", slug: "2-joao",                   testament: "NT" },
  64: { abbrev: "3jo", slug: "3-joao",                   testament: "NT" },
  65: { abbrev: "jd",  slug: "judas",                    testament: "NT" },
  66: { abbrev: "ap",  slug: "apocalipse",               testament: "NT" },
};

const LANG_CODE = {
  Portuguese: "pt",
  English: "en",
  Spanish: "es",
  French: "fr",
  German: "de",
  Italian: "it",
  Dutch: "nl",
  Polish: "pl",
  Russian: "ru",
  Romanian: "ro",
  Swedish: "sv",
  Norwegian: "no",
  Hungarian: "hu",
  Greek: "el",
  Hebrew: "he",
  Latin: "la",
  Vietnamese: "vi",
  Korean: "ko",
  Japanese: "ja",
  Chinese: "zh",
  Hindi: "hi",
  Tamil: "ta",
  Indonesian: "id",
  Swahili: "sw",
  Farsi: "fa",
  Nepali: "ne",
  Kannada: "kn",
  Malayalam: "ml",
  Czech: "cs",
  Bulgarian: "bg",
  Cherokee: "chr",
};

// IDs locais que já existem (não sobrescrever)
const LOCAL_IDS = ["acf", "aa", "nvi", "kjv", "asv", "web", "dra", "gnv"];

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

function langToCode(name) {
  return LANG_CODE[name] ?? name.toLowerCase().slice(0, 3);
}

async function main() {
  console.log("📥 Buscando languages.json do bolls.life…");
  const langs = await fetchJson(BOLLS_LANGS);
  console.log(`  ${langs.length} idiomas encontrados`);

  // Carrega versões existentes (preserva as locais)
  const versionsPath = path.join(BIBLE_DIR, "_versions.json");
  let existing = [];
  try {
    existing = JSON.parse(await fs.readFile(versionsPath, "utf-8"));
  } catch {}
  const finalVersions = existing.filter((v) => LOCAL_IDS.includes(v.id));

  let bookIndexCount = 0;
  let bookIndexFailed = 0;

  for (const lang of langs) {
    const langName = lang.language;
    const langCode = langToCode(langName);
    const group = langName;

    for (const t of lang.translations) {
      const bollsId = t.short_name;
      const id = `b-${bollsId.toLowerCase()}`; // prefixar com "b-" pra não conflitar

      if (LOCAL_IDS.includes(id) || LOCAL_IDS.includes(bollsId.toLowerCase()))
        continue;

      finalVersions.push({
        id,
        name: t.full_name,
        abbr: bollsId,
        lang: langCode,
        group,
        remote: true,
        bollsId,
      });

      // Tenta criar _index.json local (lista de livros via bolls)
      const indexPath = path.join(BIBLE_DIR, id, "_index.json");
      try {
        await fs.access(indexPath);
        bookIndexCount++;
        continue; // já existe
      } catch {}

      try {
        const books = await fetchJson(
          `https://bolls.life/get-books/${bollsId}/`,
        );
        const index = books
          .map((b) => {
            const local = BOOK_BY_BOLLS_ID[b.bookid];
            if (!local) return null;
            return {
              abbrev: local.abbrev,
              name: b.name,
              slug: local.slug,
              chapters: b.chapters,
              testament: local.testament,
              bollsBookId: b.bookid,
            };
          })
          .filter(Boolean);

        if (index.length === 0) {
          console.error(`  ✗ ${bollsId}: sem livros mapeados`);
          bookIndexFailed++;
          continue;
        }

        await fs.mkdir(path.dirname(indexPath), { recursive: true });
        await fs.writeFile(indexPath, JSON.stringify(index, null, 2));
        bookIndexCount++;
        if (bookIndexCount % 10 === 0)
          process.stdout.write(`\r  ${bookIndexCount} índices criados…`);
      } catch (e) {
        bookIndexFailed++;
        console.error(`\n  ✗ ${bollsId}: ${e.message}`);
      }
    }
  }

  // Ordena: locais primeiro, depois por idioma + nome
  finalVersions.sort((a, b) => {
    if (LOCAL_IDS.includes(a.id) && !LOCAL_IDS.includes(b.id)) return -1;
    if (!LOCAL_IDS.includes(a.id) && LOCAL_IDS.includes(b.id)) return 1;
    const g = a.group.localeCompare(b.group);
    return g !== 0 ? g : a.name.localeCompare(b.name);
  });

  await fs.writeFile(versionsPath, JSON.stringify(finalVersions, null, 2));

  console.log(`\n\n📝 _versions.json: ${finalVersions.length} versões total`);
  console.log(`  ${bookIndexCount} índices criados`);
  console.log(`  ${bookIndexFailed} falhas`);
  console.log("\n🎉 Pronto. Próximo passo: ajustar lib/bible.ts pra ler remote.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
