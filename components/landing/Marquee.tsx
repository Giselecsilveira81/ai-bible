const VERSES = [
  "No princípio era o Verbo",
  "Eu sou o caminho, a verdade e a vida",
  "Em tudo dai graças",
  "Tudo posso naquele que me fortalece",
  "O Senhor é o meu pastor",
  "Amarás o teu próximo como a ti mesmo",
  "Pedi e recebereis",
  "Deus é amor",
];

function Strip({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center"
      style={{ paddingRight: "clamp(32px, 4vw, 80px)" }}
    >
      {VERSES.map((v, i) => (
        <li
          key={i}
          className="font-serif italic font-light flex items-center text-ink-soft"
          style={{
            fontSize: "clamp(20px, 2.6vw, 42px)",
            paddingRight: "clamp(28px, 3vw, 56px)",
          }}
        >
          <span>{v}</span>
          <span
            className="text-gold ml-[clamp(28px,3vw,56px)]"
            aria-hidden
            style={{ fontSize: "0.7em" }}
          >
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div
      className="border-y border-hairline overflow-hidden py-5 lg:py-7 bg-paper"
      aria-label="Versículos famosos rolando"
    >
      <div className="marquee-track">
        <Strip />
        <Strip ariaHidden />
      </div>
    </div>
  );
}
