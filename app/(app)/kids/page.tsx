import Link from "next/link";
import { KIDS_STORIES } from "@/lib/kidsStories";

export const metadata = { title: "Crianças · AI Bible" };

export default function KidsHome() {
  return (
    <main className="mx-auto max-w-reader px-6 py-12">
      <header className="mb-10">
        <p className="section-eyebrow text-gold-dark">✦ Para a família</p>
        <h1 className="font-serif text-4xl lg:text-5xl tracking-tight mt-2">
          Crianças
        </h1>
        <p className="text-sm text-ink-soft mt-3 max-w-md leading-relaxed">
          Histórias bíblicas em linguagem simples, versículo pra memorizar e
          quiz divertido no final.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-3">
        {KIDS_STORIES.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/kids/${s.slug}`}
              className="card-soft block p-5 lg:p-6 h-full group hover:border-gold transition-all"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                {s.emoji}
              </div>
              <p className="font-serif text-lg leading-tight mb-2">
                {s.title}
              </p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-hairline">
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-dark">
                  {s.reference}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-mute">
                  {s.age} anos
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
