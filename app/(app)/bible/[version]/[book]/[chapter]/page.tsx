import Link from "next/link";
import { notFound } from "next/navigation";
import { Columns } from "lucide-react";
import {
  findBook,
  getIndex,
  getVersions,
  loadChapter,
  nextLocation,
  prevLocation,
} from "@/lib/bible";
import BookChapterPicker from "@/components/BookChapterPicker";
import VersionPicker from "@/components/VersionPicker";
import Reader from "@/components/Reader";
import AudioPlayer from "@/components/AudioPlayer";
import ExplainChapterModal from "@/components/ExplainChapterModal";

type Params = { version: string; book: string; chapter: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { version, book, chapter } = await params;
  const versions = await getVersions();
  const v = versions.find((x) => x.id === version);
  if (!v) return { title: "AI Bible" };
  const b = await findBook(version, book);
  if (!b) return { title: "AI Bible" };
  return { title: `${b.name} ${chapter} (${v.abbr}) · AI Bible` };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { version, book, chapter: chapterStr } = await params;
  const chapter = Number(chapterStr);
  if (!Number.isInteger(chapter) || chapter < 1) notFound();

  const versions = await getVersions();
  const versionMeta = versions.find((v) => v.id === version);
  if (!versionMeta) notFound();

  const meta = await findBook(version, book);
  if (!meta) notFound();

  const verses = await loadChapter(version, meta.abbrev, chapter);
  if (!verses) notFound();

  const index = await getIndex(version);
  const [prev, next] = await Promise.all([
    prevLocation(version, meta.abbrev, chapter),
    nextLocation(version, meta.abbrev, chapter),
  ]);

  const audioText = `${meta.name}, capítulo ${chapter}. ${verses.join(" ")}`;

  return (
    <div className="xl:mr-80">
      <header className="sticky top-0 z-30 bg-paper/90 dark:bg-ink/90 backdrop-blur-xl border-b border-hairline">
        <div className="max-w-reader mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
            {versionMeta.lang === "pt-BR" ? "Português" : "English"}
          </span>
          <div className="flex items-center gap-1">
            <BookChapterPicker
              versionId={version}
              index={index}
              current={{ abbrev: meta.abbrev, chapter }}
            />
            <VersionPicker
              versions={versions}
              current={version}
              bookSlug={meta.slug}
              chapter={chapter}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-reader px-6 py-10 pb-40">
        {/* Cabeçalho editorial */}
        <div className="text-center mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dark mb-3">
            ✦ {versionMeta.abbr} · {meta.testament === "AT" ? "Antigo Testamento" : "Novo Testamento"}
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl tracking-tight leading-none">
            {meta.name} <span className="text-gold-dark italic">{chapter}</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="w-12 h-px bg-hairline-gold" />
            <span className="text-gold text-xs leading-none">✦</span>
            <span className="w-12 h-px bg-hairline-gold" />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-8 border-b border-hairline">
          <ExplainChapterModal
            bookName={meta.name}
            chapter={chapter}
            versionAbbr={versionMeta.abbr}
            verses={verses}
          />
          <AudioPlayer
            text={audioText}
            title={`${meta.name} ${chapter}`}
          />
          <Link
            href={`/bible/compare?v1=${version}&v2=${
              version === "acf" ? "nvi" : "acf"
            }&book=${meta.slug}&ch=${chapter}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline text-xs uppercase tracking-wider hover:border-gold hover:text-gold-dark transition-colors"
          >
            <Columns size={12} />
            comparar
          </Link>
        </div>

        <Reader
          versionId={version}
          versionAbbr={versionMeta.abbr}
          abbrev={meta.abbrev}
          chapter={chapter}
          bookName={meta.name}
          verses={verses}
        />

        {/* Decoração de fim */}
        <div className="flex items-center justify-center gap-3 mt-16">
          <span className="w-16 h-px bg-hairline-gold" />
          <span className="text-gold text-sm leading-none">✦</span>
          <span className="w-16 h-px bg-hairline-gold" />
        </div>

        <nav className="mt-10 pt-6 border-t border-hairline flex items-center justify-between text-sm">
          {prev ? (
            <Link
              href={`/bible/${version}/${prev.slug}/${prev.chapter}`}
              className="group font-mono text-xs uppercase tracking-widest text-ink-mute hover:text-gold-dark transition-colors inline-flex items-center gap-2"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              anterior
            </Link>
          ) : (
            <span />
          )}
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
            cap. {chapter} de {meta.chapters}
          </span>
          {next ? (
            <Link
              href={`/bible/${version}/${next.slug}/${next.chapter}`}
              className="group font-mono text-xs uppercase tracking-widest text-ink-mute hover:text-gold-dark transition-colors inline-flex items-center gap-2"
            >
              próximo
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
    </div>
  );
}
