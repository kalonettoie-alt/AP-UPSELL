/**
 * Adresse publique du site (sans barre finale), lue dans NEXT_PUBLIC_SITE_URL au moment du build.
 *
 * Tant qu'elle n'est pas définie, le site est fermé aux moteurs de recherche :
 * balise <meta name="robots" content="noindex, nofollow">, robots.txt « Disallow: / »,
 * pas d'URL canonique et sitemap vide. Cela évite qu'un déploiement de test soit indexé par Google.
 */
const brute = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ?? "";

/** true seulement si NEXT_PUBLIC_SITE_URL est renseignée : le site peut alors être indexé. */
export const INDEXABLE = brute !== "";

export const SITE_URL = INDEXABLE ? brute : "http://localhost:3000";

/** URL canonique d'une page, ou rien tant que l'adresse du site n'est pas définie. */
export function canonique(chemin: string): { canonical: string } | undefined {
  return INDEXABLE ? { canonical: chemin } : undefined;
}
