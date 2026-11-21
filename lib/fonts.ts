import { DM_Mono, Inter, Young_Serif } from "next/font/google";

export const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
