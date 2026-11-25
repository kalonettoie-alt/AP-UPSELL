/**
 * Adresse publique du site et règles d'indexation.
 *
 * Le site est ouvert aux moteurs de recherche (lancement du 25/11/2026) :
 * balise robots « index, follow » partout sauf /merci/, robots.txt ouvert, sitemap rempli.
 * Pour le refermer : passer INDEXABLE à false et redéployer.
 */
export const INDEXABLE = true;

/** Domaine officiel : adresses canoniques, sitemap, robots.txt, images de partage. */
export const SITE_CANONIQUE = "https://www.sinebox.fr";

export const SITE_URL = SITE_CANONIQUE;

/** URL canonique d'une page, toujours sur https://www.sinebox.fr. */
export function canonique(chemin: string): { canonical: string } {
  return { canonical: `${SITE_CANONIQUE}${chemin}` };
}

/** Adresse absolue d'un chemin du site, sur le domaine officiel (données structurées). */
export function urlAbsolue(chemin: string): string {
  return `${SITE_CANONIQUE}${chemin.startsWith("/") ? chemin : `/${chemin}`}`;
}

export const ROBOTS_FERME = { index: false, follow: false } as const;
export const ROBOTS_OUVERT = { index: true, follow: true } as const;

/** Règle robots d'une page : fermée si le site n'est pas lancé, ou si la page ne doit jamais être indexée. */
export function robotsPage(jamaisIndexee = false) {
  return INDEXABLE && !jamaisIndexee ? ROBOTS_OUVERT : ROBOTS_FERME;
}
