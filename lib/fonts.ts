import {
  Playfair_Display,
  Inter,
  Cormorant_Garamond,
  DM_Sans,
  DM_Mono,
} from "next/font/google";

// ── oghie_blog core fonts ────────────────────────────────────────────────────

export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

// ── geca_pro fonts (luxury editorial stack) ──────────────────────────────────

export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

/** Spread all font CSS variables onto <html> */
export function allFontVariables(...extras: string[]) {
  return [
    playfair.variable,
    inter.variable,
    cormorant.variable,
    dmSans.variable,
    dmMono.variable,
    ...extras,
  ].join(" ");
}
