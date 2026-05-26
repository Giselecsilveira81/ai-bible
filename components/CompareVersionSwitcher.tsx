"use client";

import { useRouter } from "next/navigation";
import type { Version } from "@/lib/bible";

type Props = {
  versions: Version[];
  v1: string;
  v2: string;
  bookSlug: string;
  chapter: number;
};

export default function CompareVersionSwitcher({
  versions,
  v1,
  v2,
  bookSlug,
  chapter,
}: Props) {
  const router = useRouter();

  const navigate = (newV1: string, newV2: string) => {
    router.push(
      `/bible/compare?v1=${newV1}&v2=${newV2}&book=${bookSlug}&ch=${chapter}`,
    );
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={v1}
        onChange={(e) => navigate(e.target.value, v2)}
        className="bg-transparent text-xs font-mono uppercase tracking-widest text-ink-soft border border-hairline rounded-full px-3 py-1.5 cursor-pointer hover:border-gold"
        aria-label="Versão esquerda"
      >
        {versions.map((v) => (
          <option key={v.id} value={v.id}>
            {v.abbr}
          </option>
        ))}
      </select>
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
        vs
      </span>
      <select
        value={v2}
        onChange={(e) => navigate(v1, e.target.value)}
        className="bg-transparent text-xs font-mono uppercase tracking-widest text-ink-soft border border-hairline rounded-full px-3 py-1.5 cursor-pointer hover:border-gold"
        aria-label="Versão direita"
      >
        {versions.map((v) => (
          <option key={v.id} value={v.id}>
            {v.abbr}
          </option>
        ))}
      </select>
    </div>
  );
}
