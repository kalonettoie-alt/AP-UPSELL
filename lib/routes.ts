/**
 * Registre des pages du site (maquette SINEBOX V2).
 *
 * Un lien vers une page n'est affiché que si `existe` vaut true (voir components/LienPage.tsx) :
 * on ne publie jamais de lien vers une page qui n'est pas encore construite.
 * Les adresses définitives viendront du fichier sinebox-v2-pages-secondaires.md (étape 2).
 */
export type CleePage =
  | "accueil"
  | "ccm"
  | "etiquette"
  | "kits"
  | "packs"
  | "tarifs"
  | "conciergeries"
  | "hotes"
  | "livraison"
  | "marque"
  | "compat"
  | "faq"
  | "apropos"
  | "associe"
  | "essai"
  | "appel"
  | "contact"
  | "merci"
  | "blog"
  | "rubrique"
  | "article"
  | "mentionsLegales"
  | "cgv";

export const PAGES: Record<CleePage, { url: string; existe: boolean }> = {
  accueil: { url: "/", existe: true },
  ccm: { url: "/comment-ca-marche/", existe: false },
  etiquette: { url: "/etiquette/", existe: false },
  kits: { url: "/kits/", existe: false },
  packs: { url: "/packs/", existe: false },
  tarifs: { url: "/tarifs/", existe: true },
  conciergeries: { url: "/kits-accueil-conciergerie/", existe: true },
  hotes: { url: "/hotes/", existe: false },
  livraison: { url: "/livraison/", existe: false },
  marque: { url: "/a-votre-marque/", existe: false },
  compat: { url: "/compatibilites/", existe: false },
  faq: { url: "/faq/", existe: false },
  apropos: { url: "/a-propos/", existe: true },
  associe: { url: "/associe/", existe: false },
  essai: { url: "/kit-essai/", existe: true },
  appel: { url: "/appel/", existe: false },
  contact: { url: "/contact/", existe: true },
  merci: { url: "/merci/", existe: true },
  blog: { url: "/journal/", existe: false },
  rubrique: { url: "/journal/accueil-des-voyageurs/", existe: false },
  article: { url: "/journal/noel-location-airbnb/", existe: false },
  mentionsLegales: { url: "/mentions-legales/", existe: true },
  cgv: { url: "/cgv/", existe: true },
};

export function urlPage(cle: CleePage): string | null {
  const p = PAGES[cle];
  return p.existe ? p.url : null;
}
