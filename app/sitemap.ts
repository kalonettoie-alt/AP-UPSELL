import type { MetadataRoute } from "next";
import { INDEXABLE, urlAbsolue } from "@/lib/site";

export const dynamic = "force-static";

/** Pages indexables. Exclues : /merci/, /mentions-legales/, /cgv/ (toujours en noindex). */
const PAGES = ["/", "/kits-accueil-conciergerie/", "/tarifs/", "/kit-essai/", "/contact/", "/a-propos/"];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return [];
  return PAGES.map((chemin) => ({
    url: urlAbsolue(chemin),
    changeFrequency: "monthly",
    priority: chemin === "/" ? 1 : 0.7,
  }));
}
