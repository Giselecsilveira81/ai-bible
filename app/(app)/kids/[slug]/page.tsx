import Link from "next/link";
import { notFound } from "next/navigation";
import { getKidsStory } from "@/lib/kidsStories";
import KidsStoryContent from "@/components/KidsStoryContent";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = getKidsStory(slug);
  return { title: s ? `${s.title} · Crianças · AI Bible` : "AI Bible" };
}

export default async function KidsStoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const story = getKidsStory(slug);
  if (!story) notFound();

  return (
    <main className="mx-auto max-w-reader px-6 py-10">
      <Link
        href="/kids"
        className="text-xs uppercase tracking-widest text-ink-mute hover:text-ink"
      >
        ← Crianças
      </Link>

      <header className="mt-4 mb-8">
        <div className="text-5xl mb-3">{story.emoji}</div>
        <p className="text-xs uppercase tracking-widest text-ink-mute">
          {story.reference} · {story.age} anos
        </p>
        <h1 className="text-3xl font-serif tracking-tight mt-1">
          {story.title}
        </h1>
      </header>

      <KidsStoryContent slug={slug} />
    </main>
  );
}
