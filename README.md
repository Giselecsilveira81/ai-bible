# AI Bible

Bíblia de estudo digital com:

- **Múltiplas versões** (ARC e KJV no MVP)
- **Originais** — hebraico (OSHB), grego (SBLGNT), aramaico
- **Strong's + morfologia** clicáveis em cada palavra
- **Chat conselheiro** com OpenAI
- **Anotações pessoais** por versículo
- **Devocional do dia** gerado por IA

## Stack

- Next.js 15 (App Router)
- Tailwind CSS 3
- Supabase (auth + DB)
- OpenAI API (`gpt-4o-mini`)
- Deploy: Vercel

## Setup

```bash
npm install
cp .env.local.example .env.local
# preencha as chaves no .env.local
npm run dev
```

Abre em `http://localhost:3000`.

## Estrutura

```
app/
  layout.tsx      Root layout + tipografia
  page.tsx        Home com devocional + menu
  globals.css     Tailwind + estilos do reader

bible/            (futuro) leitor por livro/capítulo
study/            (futuro) painel de originais e Strong's
chat/             (futuro) chat conselheiro
notes/            (futuro) anotações
```

## Status

v0.1 — esqueleto inicial. Próximos passos:
1. Carregar texto ARC e KJV+Strong em `/public/bible/`
2. Rota `/bible/[book]/[chapter]` para leitor
3. Painel lateral de Strong's clicável
4. API route `/api/chat` com OpenAI streaming
5. Supabase Auth (Google login) + tabela `notes`
