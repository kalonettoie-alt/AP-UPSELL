/**
 * URL publique du site (sans barre finale). Sert à l'URL canonique, au sitemap et à robots.txt.
 * Ordre : NEXT_PUBLIC_SITE_URL, sinon le domaine de production fourni par Vercel, sinon localhost.
 */
function urlDuSite(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const SITE_URL = urlDuSite().replace(/\/+$/, "");
