import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        serif: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
        hebrew: ["SBL Hebrew", "Ezra SIL", "serif"],
        greek: ["SBL Greek", "Cardo", "serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#2A2A2A",
          mute: "#8B7D6B",
        },
        paper: {
          DEFAULT: "#F5F0E8",
          warm: "#E8DFD0",
          soft: "#EFE7D8",
        },
        gold: {
          DEFAULT: "#B8960C",
          dark: "#8C6F08",
          light: "#D9B83E",
          pale: "rgba(184, 150, 12, 0.10)",
        },
        hairline: {
          DEFAULT: "rgba(26, 26, 26, 0.08)",
          gold: "rgba(184, 150, 12, 0.28)",
          "gold-strong": "rgba(184, 150, 12, 0.55)",
        },
        accent: {
          DEFAULT: "#B8960C",
        },
      },
      maxWidth: {
        reader: "38rem",
        page: "1560px",
      },
      borderRadius: {
        pill: "9999px",
      },
      boxShadow: {
        "soft-sm": "0 4px 16px rgba(26,26,26,0.05)",
        "soft-md": "0 18px 48px rgba(26,26,26,0.08)",
        "soft-lg": "0 40px 100px rgba(26,26,26,0.12)",
        gold: "0 24px 70px rgba(184,150,12,0.22)",
        mockup:
          "0 60px 120px rgba(26,26,26,0.18), 0 20px 50px rgba(184,150,12,0.18)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.65, 0.05, 0.36, 1)",
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-symbol": {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.95)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "typing-dot": {
          "0%, 60%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "30%": { opacity: "1", transform: "translateY(-3px)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-symbol": "pulse-symbol 1.2s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "spin-slow": "spin-slow 30s linear infinite",
        "typing-dot": "typing-dot 1.4s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
