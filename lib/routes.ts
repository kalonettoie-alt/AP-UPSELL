/**
 * Registre des pages du site : adresses du fichier sinebox-v2-pages-secondaires.md (version du 25/11/2026).
 *
 * Un lien n'est affiché que si sa page existe (`existe: true`), voir components/LienPage.tsx.
 */
export type CleePage =
  | "accueil"
  | "ccm"
  | "etiquette"
  | "marque"
  | "livraison"
  | "kits"
  | "packs"
  | "tarifs"
  | "conciergeries"
  | "hotes"
  | "faq"
  | "compat"
  | "associe"
  | "apropos"
  | "essai"
  | "appel"
  | "merci"
  | "blog"
  | "rubriqueAccueil"
  | "rubriqueOrganisation"
  | "rubriqueConsommables"
  | "articleNoel"
  | "articleStock"
  | "articleListe"
  | "articleVendrePack"
  | "mentionsLegales"
  | "cgv";

export type Page = { url: string; existe: boolean; nom: string };

export const PAGES: Record<CleePage, Page> = {
  accueil: { url: "/", existe: true, nom: "Accueil" },
  ccm: { url: "/comment-ca-marche/", existe: true, nom: "Comment ça marche" },
  etiquette: { url: "/kit-et-etiquette/", existe: true, nom: "Le kit et son étiquette" },
  marque: { url: "/kits-a-votre-marque/", existe: true, nom: "À votre marque" },
  livraison: { url: "/livraison-ile-de-france/", existe: true, nom: "Livraison Île-de-France" },
  kits: { url: "/kit-accueil-airbnb/", existe: true, nom: "Les kits" },
  packs: { url: "/packs/", existe: true, nom: "Les packs" },
  tarifs: { url: "/tarifs/", existe: true, nom: "Tarifs" },
  conciergeries: { url: "/kits-accueil-conciergerie/", existe: true, nom: "Conciergeries" },
  hotes: { url: "/hotes-multi-logements/", existe: true, nom: "Hôtes multi-logements" },
  faq: { url: "/faq/", existe: true, nom: "FAQ" },
  compat: { url: "/compatibilites/", existe: true, nom: "Compatibilités" },
  associe: { url: "/a-montrer-a-votre-associe/", existe: true, nom: "À montrer à votre associé" },
  apropos: { url: "/a-propos/", existe: true, nom: "À propos" },
  essai: { url: "/kit-essai/", existe: true, nom: "Kit d'essai" },
  appel: { url: "/appel/", existe: true, nom: "Réserver un appel" },
  merci: { url: "/merci/", existe: true, nom: "Merci" },
  blog: { url: "/blog/", existe: true, nom: "Le journal" },
  rubriqueAccueil: { url: "/blog/accueil-des-voyageurs/", existe: true, nom: "Accueil des voyageurs" },
  rubriqueOrganisation: { url: "/blog/organisation-conciergerie/", existe: true, nom: "Organisation d'une conciergerie" },
  // Aucun article publié dans cette rubrique : pas de page (règle 14.1 du .md).
  rubriqueConsommables: { url: "/blog/consommables-et-couts/", existe: false, nom: "Consommables et coûts" },
  articleNoel: {
    url: "/blog/accueil-des-voyageurs/noel-location-airbnb/",
    existe: true,
    nom: "Noël dans une location Airbnb : les attentions qui comptent",
  },
  articleStock: {
    url: "/blog/organisation-conciergerie/gerer-stock-consommables-conciergerie/",
    existe: true,
    nom: "Conciergerie : gérer le stock de consommables sans y passer vos dimanches",
  },
  articleListe: {
    url: "/blog/accueil-des-voyageurs/que-mettre-kit-accueil-airbnb/",
    existe: true,
    nom: "Que mettre dans un kit d'accueil Airbnb : la liste pièce par pièce",
  },
  // Article 9 du plan, pas encore écrit : lien masqué.
  articleVendrePack: {
    url: "/blog/organisation-conciergerie/vendre-pack-accueil-en-option/",
    existe: false,
    nom: "Vendre un pack d'accueil en option",
  },
  mentionsLegales: { url: "/mentions-legales/", existe: true, nom: "Mentions légales" },
  cgv: { url: "/cgv/", existe: true, nom: "Conditions générales de vente" },
};

export function urlPage(cle: CleePage): string | null {
  const p = PAGES[cle];
  return p.existe ? p.url : null;
}
