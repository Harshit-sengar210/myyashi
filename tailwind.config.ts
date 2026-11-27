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
          dark: "#BE123C",
          light: "#FFF1F2",
        },
        pink: {
          soft: "#FB7185",
          DEFAULT: "#FB7185",
          pastel: "#FCE7F3",
          light: "#FDF2F8",
        },
        blush: {
          DEFAULT: "#3F1D38", // Deep readable romantic text color for light mode
          light: "#FFF5F7",
          dark: "#1F0C1B",
        },
        lavender: {
          DEFAULT: "#A855F7",
          soft: "#F3E8FF",
        },
        gold: {
          accent: "#D97706",
          DEFAULT: "#D97706",
          light: "#FEF3C7",
        },
        night: {
          dark: "#FFF5F7", // Light romantic background
          DEFAULT: "#FFF5F7",
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
        glow: "0 10px 30px -5px rgba(225, 29, 72, 0.25)",
        "glow-gold": "0 10px 30px -5px rgba(217, 119, 6, 0.2)",
        "glow-lavender": "0 10px 30px -5px rgba(168, 85, 247, 0.2)",
        glass: "0 10px 30px 0 rgba(225, 29, 72, 0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
