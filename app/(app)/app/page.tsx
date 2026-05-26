import Link from "next/link";
import {
  BookOpen,
  Calendar,
  MessageCircle,
  Baby,
  Search,
  ArrowRight,
} from "lucide-react";
import VerseOfTheDay from "@/components/VerseOfTheDay";
import StreakWidget from "@/components/StreakWidget";
import { PLANS } from "@/lib/plans";

export default function HomePage() {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const featured = PLANS.slice(0, 3);

  return (
    <main className="mx-auto max-w-4xl px-6 lg:px-10 py-10 lg:py-14">
      <header className="mb-10 flex items-baseline justify-between gap-4">
        <div>
          <p className="label-eyebrow">{today}</p>
          <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mt-1">
            Boa leitura.
          </h1>
        </div>
        <Link
          href="/discover"
          className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-wider text-ink-mute hover:text-ink p-2 rounded-md hover:bg-ink/5"
        >
          <Search size={14} /> buscar
        </Link>
      </header>

      <section className="mb-12 grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <VerseOfTheDay />
        </div>
        <div>
          <StreakWidget />
        </div>
      </section>

      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="label-eyebrow">Continuar lendo</h2>
          <Link
            href="/bible/acf/genesis/1"
            className="text-xs uppercase tracking-wider text-ink-mute hover:text-ink inline-flex items-center gap-1"
          >
            tudo <ArrowRight size={12} />
          </Link>
        </div>
        <Link
          href="/bible/acf/genesis/1"
          className="card-soft block p-5 lg:p-6 group"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-serif text-xl lg:text-2xl tracking-tight">
                Gênesis 1
              </p>
              <p className="text-xs text-ink-mute mt-1">
                ACF · começar do princípio
              </p>
            </div>
            <BookOpen
              size={20}
              className="text-ink-mute group-hover:text-ink transition-colors mt-1"
            />
          </div>
        </Link>
      </section>

      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="label-eyebrow">Planos sugeridos</h2>
          <Link
            href="/plans"
            className="text-xs uppercase tracking-wider text-ink-mute hover:text-ink inline-flex items-center gap-1"
          >
            todos <ArrowRight size={12} />
          </Link>
        </div>
        <ul className="grid sm:grid-cols-3 gap-3">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/plans/${p.slug}`}
                className="card-soft block p-4 h-full"
              >
                <p className="font-serif text-lg leading-snug">{p.title}</p>
                <p className="text-xs text-ink-mute mt-1">
                  {p.days} dias · {p.topic}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="label-eyebrow mb-4">Explorar</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <NavCard href="/plans" icon={Calendar} label="Planos" />
          <NavCard href="/chat" icon={MessageCircle} label="Conselheiro" />
          <NavCard href="/kids" icon={Baby} label="Crianças" />
          <NavCard href="/discover" icon={Search} label="Descobrir" />
        </ul>
      </section>
    </main>
  );
}

function NavCard({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="card-soft flex flex-col items-center justify-center text-center p-5 gap-2 h-full"
      >
        <Icon size={20} strokeWidth={1.5} />
        <span className="text-sm">{label}</span>
      </Link>
    </li>
  );
}
