import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/routes";
import { SITE_CANONIQUE } from "@/lib/site";

export const dynamic = "force-static";

/** Pages jamais indexées : hors du sitemap. */
const EXCLUES = new Set(["merci"]);

/** Sitemap : toutes les pages existantes du registre (lib/routes.ts), sur https://www.sinebox.fr. */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(PAGES)
    .filter(([cle, p]) => p.existe && !EXCLUES.has(cle))
    .map(([, p]) => ({
      url: `${SITE_CANONIQUE}${p.url}`,
      changeFrequency: "monthly" as const,
      priority: p.url === "/" ? 1 : 0.7,
    }));
}
