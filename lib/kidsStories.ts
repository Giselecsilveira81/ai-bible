export type KidsStory = {
  slug: string;
  title: string;
  reference: string;
  passage: string;
  emoji: string;
  age: string;
};

export const KIDS_STORIES: KidsStory[] = [
  {
    slug: "a-criacao",
    title: "A Criação",
    reference: "Gênesis 1",
    passage: "Gênesis 1",
    emoji: "🌍",
    age: "4-8",
  },
  {
    slug: "noe-e-a-arca",
    title: "Noé e a arca",
    reference: "Gênesis 6-7",
    passage: "Gênesis 6-7",
    emoji: "🌈",
    age: "4-8",
  },
  {
    slug: "moises-no-mar-vermelho",
    title: "Moisés e o Mar Vermelho",
    reference: "Êxodo 14",
    passage: "Êxodo 14",
    emoji: "🌊",
    age: "6-10",
  },
  {
    slug: "davi-e-golias",
    title: "Davi e Golias",
    reference: "1 Samuel 17",
    passage: "1 Samuel 17",
    emoji: "🪨",
    age: "6-10",
  },
  {
    slug: "daniel-na-cova-dos-leoes",
    title: "Daniel na cova dos leões",
    reference: "Daniel 6",
    passage: "Daniel 6",
    emoji: "🦁",
    age: "6-10",
  },
  {
    slug: "jonas-e-o-grande-peixe",
    title: "Jonas e o grande peixe",
    reference: "Jonas 1-2",
    passage: "Jonas 1-2",
    emoji: "🐋",
    age: "4-8",
  },
  {
    slug: "o-nascimento-de-jesus",
    title: "O nascimento de Jesus",
    reference: "Lucas 2",
    passage: "Lucas 2",
    emoji: "⭐",
    age: "4-8",
  },
  {
    slug: "a-multiplicacao-dos-paes",
    title: "A multiplicação dos pães",
    reference: "João 6",
    passage: "João 6",
    emoji: "🍞",
    age: "4-8",
  },
  {
    slug: "o-bom-samaritano",
    title: "O bom samaritano",
    reference: "Lucas 10",
    passage: "Lucas 10:25-37",
    emoji: "❤️",
    age: "6-10",
  },
  {
    slug: "a-ressurreicao-de-jesus",
    title: "A ressurreição de Jesus",
    reference: "Mateus 28",
    passage: "Mateus 28",
    emoji: "✨",
    age: "6-10",
  },
];

export function getKidsStory(slug: string): KidsStory | undefined {
  return KIDS_STORIES.find((s) => s.slug === slug);
}
