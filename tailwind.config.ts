import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          deep: "#E11D48",
          DEFAULT: "#E11D48",
        },
        pink: {
          soft: "#FBCFE8",
          DEFAULT: "#FBCFE8",
        },
        blush: {
          DEFAULT: "#FFF1F2",
          light: "#FFF1F2",
        },
        lavender: {
          DEFAULT: "#C4B5FD",
          soft: "#C4B5FD",
        },
        gold: {
          accent: "#F5D0A9",
          DEFAULT: "#F5D0A9",
        },
        night: {
          dark: "#1B0B2E",
          DEFAULT: "#1B0B2E",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        dancing: ["var(--font-dancing)", "cursive"],
        hindi: ["var(--font-hindi)", "serif"],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(225, 29, 72, 0.35)",
        "glow-gold": "0 0 25px -5px rgba(245, 208, 169, 0.4)",
        "glow-lavender": "0 0 25px -5px rgba(196, 181, 253, 0.35)",
        glass: "0 8px 32px 0 rgba(27, 11, 46, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
