export type Audience =
  | "mulheres"
  | "homens"
  | "criancas"
  | "jovens"
  | "familia"
  | "casais"
  | "todos";

export type Plan = {
  slug: string;
  title: string;
  audience: Audience[];
  topic: string;
  days: number;
  description: string;
  /** Para cada dia: referencia base (livro+capitulo, ou capitulos especificos). IA gera o devocional. */
  readings: { day: number; reference: string; passage: string }[];
};

export const AUDIENCES: { id: Audience; label: string }[] = [
  { id: "mulheres", label: "Mulheres" },
  { id: "homens", label: "Homens" },
  { id: "criancas", label: "Crianças" },
  { id: "jovens", label: "Jovens" },
  { id: "familia", label: "Família" },
  { id: "casais", label: "Casais" },
];

export const PLANS: Plan[] = [
  {
    slug: "salmos-de-conforto",
    title: "Salmos de conforto",
    audience: ["mulheres", "todos"],
    topic: "Conforto",
    days: 7,
    description:
      "Sete salmos para descansar a alma em meio à ansiedade do cotidiano.",
    readings: [
      { day: 1, reference: "Salmos 23", passage: "Salmos 23" },
      { day: 2, reference: "Salmos 91", passage: "Salmos 91" },
      { day: 3, reference: "Salmos 27", passage: "Salmos 27" },
      { day: 4, reference: "Salmos 46", passage: "Salmos 46" },
      { day: 5, reference: "Salmos 121", passage: "Salmos 121" },
      { day: 6, reference: "Salmos 139", passage: "Salmos 139" },
      { day: 7, reference: "Salmos 103", passage: "Salmos 103" },
    ],
  },
  {
    slug: "provérbios-para-a-mulher-sábia",
    title: "Provérbios para a mulher sábia",
    audience: ["mulheres"],
    topic: "Sabedoria",
    days: 5,
    description:
      "Cinco passagens em Provérbios sobre sabedoria, fé e o coração da mulher.",
    readings: [
      { day: 1, reference: "Provérbios 31", passage: "Provérbios 31" },
      { day: 2, reference: "Provérbios 3", passage: "Provérbios 3" },
      { day: 3, reference: "Provérbios 4", passage: "Provérbios 4" },
      { day: 4, reference: "Provérbios 16", passage: "Provérbios 16" },
      { day: 5, reference: "Provérbios 19", passage: "Provérbios 19" },
    ],
  },
  {
    slug: "homem-segundo-o-coracao-de-deus",
    title: "Homem segundo o coração de Deus",
    audience: ["homens"],
    topic: "Caráter",
    days: 7,
    description:
      "Vidas masculinas marcantes na Escritura — Davi, José, Daniel — e o que aprendemos com elas.",
    readings: [
      { day: 1, reference: "1 Samuel 16", passage: "1 Samuel 16" },
      { day: 2, reference: "1 Samuel 17", passage: "1 Samuel 17" },
      { day: 3, reference: "Salmos 51", passage: "Salmos 51" },
      { day: 4, reference: "Gênesis 39", passage: "Gênesis 39" },
      { day: 5, reference: "Gênesis 50", passage: "Gênesis 50" },
      { day: 6, reference: "Daniel 1", passage: "Daniel 1" },
      { day: 7, reference: "Daniel 6", passage: "Daniel 6" },
    ],
  },
  {
    slug: "fundamentos-da-fe-pra-criancas",
    title: "Fundamentos da fé para crianças",
    audience: ["criancas", "familia"],
    topic: "Crescimento",
    days: 7,
    description:
      "Sete histórias bíblicas explicadas em linguagem simples para os pequenos.",
    readings: [
      { day: 1, reference: "Gênesis 1", passage: "A criação" },
      { day: 2, reference: "Gênesis 6-7", passage: "Noé e a arca" },
      { day: 3, reference: "Êxodo 14", passage: "Moisés e o Mar Vermelho" },
      { day: 4, reference: "1 Samuel 17", passage: "Davi e Golias" },
      { day: 5, reference: "Daniel 6", passage: "Daniel na cova dos leões" },
      { day: 6, reference: "Lucas 2", passage: "O nascimento de Jesus" },
      { day: 7, reference: "João 6", passage: "A multiplicação dos pães" },
    ],
  },
  {
    slug: "jovem-de-paixao",
    title: "Jovem de paixão",
    audience: ["jovens"],
    topic: "Propósito",
    days: 7,
    description:
      "Sete dias sobre vocação, identidade e correr a corrida com propósito.",
    readings: [
      { day: 1, reference: "Jeremias 1", passage: "Jeremias 1" },
      { day: 2, reference: "1 Timóteo 4", passage: "1 Timóteo 4" },
      { day: 3, reference: "Filipenses 3", passage: "Filipenses 3" },
      { day: 4, reference: "Romanos 12", passage: "Romanos 12" },
      { day: 5, reference: "Gálatas 5", passage: "Gálatas 5" },
      { day: 6, reference: "Hebreus 12", passage: "Hebreus 12" },
      { day: 7, reference: "Eclesiastes 12", passage: "Eclesiastes 12" },
    ],
  },
  {
    slug: "amor-do-casamento",
    title: "Amor do casamento",
    audience: ["casais"],
    topic: "Relacionamento",
    days: 5,
    description:
      "Cinco passagens sobre amor, perdão e companheirismo no matrimônio.",
    readings: [
      {
        day: 1,
        reference: "1 Coríntios 13",
        passage: "1 Coríntios 13 (O amor)",
      },
      { day: 2, reference: "Efésios 5", passage: "Efésios 5" },
      { day: 3, reference: "Cânticos 8", passage: "Cânticos dos cânticos 8" },
      { day: 4, reference: "Provérbios 5", passage: "Provérbios 5" },
      { day: 5, reference: "Colossenses 3", passage: "Colossenses 3" },
    ],
  },
  {
    slug: "familia-no-altar",
    title: "Família no altar",
    audience: ["familia", "casais"],
    topic: "Lar",
    days: 5,
    description:
      "Cinco devocionais para reunir a família em torno da Palavra.",
    readings: [
      { day: 1, reference: "Deuteronômio 6", passage: "Deuteronômio 6" },
      { day: 2, reference: "Josué 24", passage: "Josué 24" },
      { day: 3, reference: "Salmos 127", passage: "Salmos 127" },
      { day: 4, reference: "Provérbios 22", passage: "Provérbios 22" },
      { day: 5, reference: "Efésios 6", passage: "Efésios 6" },
    ],
  },
  {
    slug: "vencendo-a-ansiedade",
    title: "Vencendo a ansiedade",
    audience: ["todos"],
    topic: "Ansiedade",
    days: 5,
    description:
      "Cinco textos para acalmar o coração em meio à inquietação.",
    readings: [
      { day: 1, reference: "Filipenses 4", passage: "Filipenses 4" },
      { day: 2, reference: "Mateus 6", passage: "Mateus 6:25-34" },
      { day: 3, reference: "1 Pedro 5", passage: "1 Pedro 5" },
      { day: 4, reference: "Salmos 55", passage: "Salmos 55" },
      { day: 5, reference: "Isaías 41", passage: "Isaías 41" },
    ],
  },
];

export function getPlan(slug: string): Plan | undefined {
  return PLANS.find((p) => p.slug === slug);
}

export function plansByAudience(aud: Audience | "all"): Plan[] {
  if (aud === "all") return PLANS;
  return PLANS.filter((p) => p.audience.includes(aud));
}
