type Props = {
  size?: "sm" | "md" | "lg";
  withName?: boolean;
  layout?: "row" | "stack";
};

export default function Logo({
  size = "md",
  withName = true,
  layout = "row",
}: Props) {
  const dim = size === "sm" ? 22 : size === "lg" ? 40 : 28;
  const box = dim * 1.5;

  return (
    <span
      className={`inline-flex items-center ${
        layout === "stack" ? "flex-col gap-1.5" : "gap-2.5"
      } text-ink`}
    >
      <span
        className="relative inline-flex items-center justify-center"
        aria-hidden
        style={{ width: box, height: box }}
      >
        <span
          className="absolute inset-0 rounded-[10px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(184,150,12,0.10) 0%, rgba(184,150,12,0.03) 100%)",
            border: "1px solid rgba(184,150,12,0.32)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        />
        <BookCross size={dim} />
      </span>
      {withName && (
        <span
          className="font-serif leading-none tracking-[0.18em] uppercase"
          style={{
            fontSize: layout === "stack" ? dim * 0.42 : dim * 0.5,
            fontWeight: 500,
            color: "#1A1A1A",
          }}
        >
          AI <span style={{ color: "#B8960C" }}>Bible</span>
        </span>
      )}
    </span>
  );
}

/** Ícone: livro aberto com cruz fina no topo, gradient dourado */
function BookCross({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative"
      aria-hidden
    >
      <defs>
        <linearGradient id="logoGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9B83E" />
          <stop offset="60%" stopColor="#B8960C" />
          <stop offset="100%" stopColor="#8C6F08" />
        </linearGradient>
      </defs>

      {/* Livro aberto (V invertido suave) */}
      <g
        stroke="url(#logoGold)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Páginas esquerda */}
        <path d="M 10 36 L 10 18 Q 17 16 24 17 L 24 35 Q 17 34 10 36 Z" />
        {/* Páginas direita */}
        <path d="M 24 17 Q 31 16 38 18 L 38 36 Q 31 34 24 35 Z" />
        {/* Lombada / centro */}
        <line x1="24" y1="17" x2="24" y2="35" />
      </g>

      {/* Cruz acima */}
      <g stroke="url(#logoGold)" strokeWidth="1.8" strokeLinecap="round">
        <line x1="24" y1="5" x2="24" y2="13" />
        <line x1="20" y1="9" x2="28" y2="9" />
      </g>
    </svg>
  );
}
