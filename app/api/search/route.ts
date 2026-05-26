import { NextResponse } from "next/server";
import { getIndex, loadBook } from "@/lib/bible";

export const runtime = "nodejs";

type Hit = {
  reference: string;
  text: string;
  abbrev: string;
  slug: string;
  chapter: number;
  verse: number;
};

// abreviacoes pra reconhecer referencia ex "jo 3:16", "1co 13", "salmos 23"
const ABBREV_MAP: Record<string, string> = {
  gn: "gn", gen: "gn", genesis: "gn",
  ex: "ex", exo: "ex", exodo: "ex",
  lv: "lv", lev: "lv", levitico: "lv",
  nm: "nm", num: "nm", numeros: "nm",
  dt: "dt", deut: "dt", deuteronomio: "dt",
  js: "js", josue: "js",
  jz: "jz", juizes: "jz",
  rt: "rt", rute: "rt",
  "1sm": "1sm", "1samuel": "1sm", "1sam": "1sm",
  "2sm": "2sm", "2samuel": "2sm", "2sam": "2sm",
  "1rs": "1rs", "1reis": "1rs",
  "2rs": "2rs", "2reis": "2rs",
  "1cr": "1cr", "1cronicas": "1cr",
  "2cr": "2cr", "2cronicas": "2cr",
  ed: "ed", esdras: "ed",
  ne: "ne", neemias: "ne",
  et: "et", ester: "et",
  jó: "jó", job: "jó",
  sl: "sl", salmo: "sl", salmos: "sl", ps: "sl",
  pv: "pv", prov: "pv", proverbios: "pv",
  ec: "ec", eclesiastes: "ec",
  ct: "ct", canticos: "ct", cantares: "ct",
  is: "is", isaias: "is",
  jr: "jr", jeremias: "jr",
  lm: "lm", lamentacoes: "lm",
  ez: "ez", ezequiel: "ez",
  dn: "dn", daniel: "dn",
  os: "os", oseias: "os",
  jl: "jl", joel: "jl",
  am: "am", amos: "am",
  ob: "ob", obadias: "ob",
  jn: "jn", jonas: "jn",
  mq: "mq", miqueias: "mq",
  na: "na", naum: "na",
  hc: "hc", habacuque: "hc",
  sf: "sf", sofonias: "sf",
  ag: "ag", ageu: "ag",
  zc: "zc", zacarias: "zc",
  ml: "ml", malaquias: "ml",
  mt: "mt", mateus: "mt",
  mc: "mc", marcos: "mc",
  lc: "lc", lucas: "lc",
  jo: "jo", joao: "jo",
  atos: "atos", at: "atos",
  rm: "rm", romanos: "rm",
  "1co": "1co", "1corintios": "1co",
  "2co": "2co", "2corintios": "2co",
  gl: "gl", galatas: "gl",
  ef: "ef", efesios: "ef",
  fp: "fp", filipenses: "fp",
  cl: "cl", colossenses: "cl",
  "1ts": "1ts", "1tessalonicenses": "1ts",
  "2ts": "2ts", "2tessalonicenses": "2ts",
  "1tm": "1tm", "1timoteo": "1tm",
  "2tm": "2tm", "2timoteo": "2tm",
  tt: "tt", tito: "tt",
  fm: "fm", filemom: "fm",
  hb: "hb", hebreus: "hb",
  tg: "tg", tiago: "tg",
  "1pe": "1pe", "1pedro": "1pe",
  "2pe": "2pe", "2pedro": "2pe",
  "1jo": "1jo", "1joao": "1jo",
  "2jo": "2jo", "2joao": "2jo",
  "3jo": "3jo", "3joao": "3jo",
  jd: "jd", judas: "jd",
  ap: "ap", apocalipse: "ap",
};

function parseReference(q: string): { abbrev: string; chapter?: number; verse?: number } | null {
  const m = q.match(/^([1-3]?\s*[a-záàâãéêíóôõúç]+)\s*(\d+)?\s*(?::|,)?\s*(\d+)?$/i);
  if (!m) return null;
  const rawName = m[1].toLowerCase().replace(/\s+/g, "");
  const abbrev = ABBREV_MAP[rawName];
  if (!abbrev) return null;
  return {
    abbrev,
    chapter: m[2] ? Number(m[2]) : undefined,
    verse: m[3] ? Number(m[3]) : undefined,
  };
}

function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export async function POST(req: Request) {
  const { query, version = "acf" } = await req.json();
  if (!query || typeof query !== "string") {
    return NextResponse.json({ hits: [], type: "empty" });
  }

  const q = query.trim();

  // 1. tenta reconhecer como referencia
  const ref = parseReference(q);
  if (ref) {
    const idx = await getIndex(version);
    const bookMeta = idx.find((b) => b.abbrev === ref.abbrev);
    if (bookMeta) {
      return NextResponse.json({
        type: "reference",
        target: {
          abbrev: bookMeta.abbrev,
          slug: bookMeta.slug,
          name: bookMeta.name,
          chapter: ref.chapter ?? 1,
          verse: ref.verse,
        },
      });
    }
  }

  // 2. busca textual (full-scan, capa 31106 versiculos rapido o suficiente)
  const idx = await getIndex(version);
  const needle = norm(q);
  if (needle.length < 3) {
    return NextResponse.json({ type: "text", hits: [] });
  }

  const hits: Hit[] = [];
  for (const bookMeta of idx) {
    const book = await loadBook(version, bookMeta.abbrev);
    if (!book) continue;
    for (let c = 0; c < book.chapters.length; c++) {
      const verses = book.chapters[c];
      for (let v = 0; v < verses.length; v++) {
        if (norm(verses[v]).includes(needle)) {
          hits.push({
            reference: `${book.name} ${c + 1}:${v + 1}`,
            text: verses[v],
            abbrev: book.abbrev,
            slug: bookMeta.slug,
            chapter: c + 1,
            verse: v + 1,
          });
          if (hits.length >= 80) break;
        }
      }
      if (hits.length >= 80) break;
    }
    if (hits.length >= 80) break;
  }

  return NextResponse.json({ type: "text", hits });
}
