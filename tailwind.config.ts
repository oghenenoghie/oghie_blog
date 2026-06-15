// Tailwind v4 — theme is defined via @theme {} in app/globals.css.
// This file is kept for editor IntelliSense only; plugins are not needed.
// @tailwindcss/line-clamp is built into v4; @tailwindcss/typography uses @plugin in CSS.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
};

export default config;
