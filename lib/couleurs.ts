import type { Pastel } from "@/content/fr";

/** Variable CSS d'une couleur pastel (définie dans app/globals.css). */
export function pastel(p: Pastel): string {
  return `var(--${p})`;
}
