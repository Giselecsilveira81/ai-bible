import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  findBook,
  getVersions,
  loadChapter,
} from "@/lib/bible";
import CompareVersionSwitcher from "@/components/CompareVersionSwitcher";

type SP = {
  v1?: string;
  v2?: string;
  book?: string;
  ch?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  return {
    title: `Comparar versões · ${sp.book?.toUpperCase() ?? ""} ${
      sp.ch ?? ""
    } · AI Bible`,
  };
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const v1 = sp.v1 || "acf";
  const v2 = sp.v2 || "nvi";
  const book = sp.book || "gn";
  const chapter = Number(sp.ch || 1);

  if (!Number.isInteger(chapter) || chapter < 1)
    redirect("/bible/compare?v1=acf&v2=nvi&book=gn&ch=1");

  const versions = await getVersions();
  const meta1 = versions.find((v) => v.id === v1);
  const meta2 = versions.find((v) => v.id === v2);
  if (!meta1 || !meta2) notFound();

  const book1 = await findBook(v1, book);
  const book2 = await findBook(v2, book);
  if (!book1 || !book2) notFound();

  const [verses1, verses2] = await Promise.all([
    loadChapter(v1, book1.abbrev, chapter),
    loadChapter(v2, book2.abbrev, chapter),
  ]);
  if (!verses1 || !verses2) notFound();

  const totalRows = Math.max(verses1.length, verses2.length);

  return (
    <div>
      <header className="sticky top-0 z-30 bg-paper/90 dark:bg-ink/90 backdrop-blur-xl border-b border-hairline">
        <div className="max-w-page mx-auto px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/bible/${v1}/${book1.slug}/${chapter}`}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute hover:text-gold-dark inline-flex items-center gap-2"
          >
            <ArrowLeft size={12} />
            voltar
          </Link>
          <div className="font-serif text-base tracking-tight">
            {book1.name} {chapter}
          </div>
          <CompareVersionSwitcher
            versions={versions}
            v1={v1}
            v2={v2}
            bookSlug={book1.slug}
            chapter={chapter}
          />
        </div>
      </header>

      <main className="max-w-page mx-auto px-4 lg:px-8 py-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline">
          <ColumnHeader name={meta1.name} abbr={meta1.abbr} />
          <ColumnHeader name={meta2.name} abbr={meta2.abbr} />

          {Array.from({ length: totalRows }, (_, i) => {
            const v = i + 1;
            return (
              <VerseRow
                key={`row-${v}`}
                num={v}
                text1={verses1[i] ?? ""}
                text2={verses2[i] ?? ""}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

function ColumnHeader({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div className="bg-paper-warm px-5 py-3 flex items-baseline justify-between sticky top-[57px] z-10">
      <span className="font-serif text-base">{name}</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-gold-dark">
        {abbr}
      </span>
    </div>
  );
}

function VerseRow({
  num,
  text1,
  text2,
}: {
  num: number;
  text1: string;
  text2: string;
}) {
  return (
    <>
      <div className="bg-paper p-5 reader-text border-r border-hairline md:border-r-0">
        {text1 && (
          <>
            <span className="verse-num">{num}</span>
            {text1}
          </>
        )}
      </div>
      <div className="bg-paper p-5 reader-text">
        {text2 && (
          <>
            <span className="verse-num">{num}</span>
            {text2}
          </>
        )}
      </div>
    </>
  );
}
