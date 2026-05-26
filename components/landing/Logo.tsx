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
  const dim = size === "sm" ? 22 : size === "lg" ? 40 : 30;
  const box = dim * 1.55;

  return (
    <span
      className={`inline-flex items-center ${
        layout === "stack" ? "flex-col gap-1.5" : "gap-2.5"
      } font-serif tracking-tight text-ink`}
    >
      <span
        className="relative inline-flex items-center justify-center"
        aria-hidden
        style={{ width: box, height: box }}
      >
        <span className="absolute inset-0 rounded-[10px] border border-hairline-gold bg-paper-warm" />
        <BookFan size={dim} />
      </span>
      {withName && (
        <span
          className="leading-none"
          style={{
            fontSize: layout === "stack" ? dim * 0.46 : dim * 0.66,
            letterSpacing: layout === "stack" ? "0.04em" : "normal",
          }}
        >
          {layout === "stack" ? (
            <>
              <span className="font-light">AI</span>{" "}
              <span className="font-medium">Bible</span>
            </>
          ) : (
            <>
              <span className="font-light">AI</span>{" "}
              <span className="font-medium">Bible</span>
            </>
          )}
        </span>
      )}
    </span>
  );
}

/** Livro aberto em forma de leque, gradient dourado, com ✦ no topo */
function BookFan({ size }: { size: number }) {
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
          <stop offset="0%" stopColor="#E8D5A0" />
          <stop offset="55%" stopColor="#C9A961" />
          <stop offset="100%" stopColor="#8B6F2A" />
        </linearGradient>
      </defs>
      {/* Páginas em leque — 5 traços saindo do mesmo ponto base */}
      <g
        stroke="url(#logoGold)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M24 39 L 9 18" />
        <path d="M24 39 L 16 11" />
        <path d="M24 39 L 24 8" />
        <path d="M24 39 L 32 11" />
        <path d="M24 39 L 39 18" />
      </g>
      {/* Base do livro — linha sólida */}
      <path
        d="M9 39 L 39 39"
        stroke="url(#logoGold)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Lombada (centro) — pequeno tick */}
      <path
        d="M24 39 L 24 42"
        stroke="#8B6F2A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Estrela ✦ acima do leque */}
      <g transform="translate(24 5)">
        <path
          d="M0 -3 L 0.6 -0.6 L 3 0 L 0.6 0.6 L 0 3 L -0.6 0.6 L -3 0 L -0.6 -0.6 Z"
          fill="#C9A961"
        />
      </g>
    </svg>
  );
}
