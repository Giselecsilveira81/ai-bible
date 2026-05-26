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
          DEFAULT: "#0A0A0A",
          soft: "#1C1C1C",
          mute: "#6B6B6B",
        },
        paper: {
          DEFAULT: "#F8F6F1",
          warm: "#F2EFE8",
          soft: "#F0EDE8",
        },
        gold: {
          DEFAULT: "#C9A961",
          dark: "#8B6F2A",
          light: "#E8D5A0",
          pale: "rgba(201, 169, 97, 0.08)",
        },
        hairline: {
          DEFAULT: "rgba(10, 10, 10, 0.08)",
          gold: "rgba(201, 169, 97, 0.25)",
          "gold-strong": "rgba(201, 169, 97, 0.5)",
        },
        accent: {
          DEFAULT: "#C9A961",
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
        "soft-sm": "0 4px 16px rgba(10,10,10,0.06)",
        "soft-md": "0 16px 48px rgba(10,10,10,0.10)",
        "soft-lg": "0 40px 100px rgba(10,10,10,0.15)",
        gold: "0 20px 60px rgba(201,169,97,0.15)",
        mockup:
          "0 60px 120px rgba(10,10,10,0.22), 0 20px 40px rgba(201,169,97,0.08)",
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
