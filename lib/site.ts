/** URL publique du site (sans barre finale). Sert à l'URL canonique, au sitemap et à robots.txt. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
