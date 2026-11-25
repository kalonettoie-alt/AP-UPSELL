import type { Metadata } from "next";
import fr from "@/content/fr";
import { reglages } from "@/content/pages";
import { PAGES, type CleePage } from "./routes";
import { canonique, robotsPage } from "./site";

type Options = {
  titre: string;
  description: string;
  chemin: string;
  /** Page à ne jamais indexer (merci, mentions légales, CGV). */
  jamaisIndexee?: boolean;
};

/**
 * Métadonnées d'une page : titre et description Google, URL canonique (si le domaine est défini),
 * règle robots, Open Graph et carte de partage. L'image de partage vient du fichier opengraph-image.tsx de la page.
 */
export function metaPage({ titre, description, chemin, jamaisIndexee = false }: Options): Metadata {
  return {
    title: { absolute: titre },
    description,
    alternates: canonique(chemin),
    robots: robotsPage(jamaisIndexee),
    openGraph: {
      title: titre,
      description,
      url: chemin,
      type: "website",
      locale: "fr_FR",
      siteName: fr.marque,
    },
    twitter: { card: "summary_large_image", title: titre, description },
  };
}

/** Métadonnées d'une page du registre, avec les réglages du fichier .md (content/pages.ts). */
export function metaReglages(cle: CleePage, jamaisIndexee = false): Metadata {
  const r = reglages[cle];
  if (!r) throw new Error(`Réglages manquants pour la page ${cle}`);
  return metaPage({ titre: r.titre, description: r.description, chemin: PAGES[cle].url, jamaisIndexee });
}
