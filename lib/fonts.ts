import { Caveat, DM_Mono, Inter, Instrument_Serif } from "next/font/google";

/** Titres (maquette V2). */
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--f-serif",
});

/** Texte courant et boutons. */
export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--f-sans",
});

/** Étiquettes, tickets, petits titres. */
export const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--f-mono",
});

/** Écriture à la main (inscriptions sur les cartons de l'illustration avant/après). */
export const caveat = Caveat({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  variable: "--f-main",
});
