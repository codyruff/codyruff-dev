// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:  "#0A0E1A",
        steel: "#1E3A5F",
        gold:  "#B8962E",
        sage:  "#7A9E7E",
        cream: "#EDE8DC",
        slate: "#141B2D",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
        },
    },
  },
  plugins: [],
};

export default config;