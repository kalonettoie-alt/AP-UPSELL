/**
 * Adresse publique du site (sans barre finale) et règles d'indexation.
 *
 * Adresse utilisée, dans l'ordre :
 * 1. NEXT_PUBLIC_SITE_URL (le nom de domaine, une fois le site lancé) ;
 * 2. l'adresse de production fournie par Vercel (VERCEL_PROJECT_PRODUCTION_URL), puis celle du déploiement (VERCEL_URL) ;
 * 3. uniquement en local, hors Vercel : http://localhost:3000.
 *
 * Tant que NEXT_PUBLIC_SITE_URL n'est pas définie, le site est fermé aux moteurs de recherche :
 * balise robots « noindex, nofollow », robots.txt « Disallow: / », sitemap vide, pas d'URL canonique.
 */
function nettoyer(url: string | undefined): string {
  return (url ?? "").trim().replace(/\/+$/, "");
}

const domaine = nettoyer(process.env.NEXT_PUBLIC_SITE_URL);
const vercel = nettoyer(process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL);

/** true seulement si NEXT_PUBLIC_SITE_URL est renseignée : le site peut alors être indexé. */
export const INDEXABLE = domaine !== "";

export const SITE_URL = domaine || (vercel ? `https://${vercel.replace(/^https?:\/\//, "")}` : "http://localhost:3000");

/** Domaine officiel : sert aux adresses canoniques et au sitemap, même tant que le site est fermé à Google. */
export const SITE_CANONIQUE = "https://www.sinebox.fr";

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
