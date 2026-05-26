import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SETTINGS_INIT_SCRIPT } from "@/lib/settings";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Bible — A Palavra. Mais profunda do que nunca.",
  description:
    "Estude a Bíblia com IA como ferramenta: comentários, contexto histórico, originais em grego e hebraico, planos personalizados. 50+ traduções. iOS, Android e Web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: SETTINGS_INIT_SCRIPT }}
        />
      </head>
      <body className="min-h-screen antialiased bg-white dark:bg-ink text-ink dark:text-paper transition-colors">
        {children}
      </body>
    </html>
  );
}
