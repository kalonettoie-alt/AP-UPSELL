/**
 * Tous les textes de la page de vente SINEBOX (français).
 * Source de vérité : docs/spec-page-de-vente.md.
 * Aucun texte entre crochets ne doit rester visible à la mise en ligne.
 * Les prix sont en nombres (HT) ; le format d'affichage est dans lib/prix.ts.
 * Typographie : une espace insécable (U+00A0) précède « : ? ! ; » et suit « « ».
 */

/**
 * Adresse e-mail de contact de SINEBOX : seule source, lue partout (pied de page, contact, mentions légales,
 * CGV, page merci, données structurées). Ne jamais l'écrire en dur ailleurs.
 */
const EMAIL_CONTACT = "support@sinebox.fr";

/**
 * Téléphone de SINEBOX : publié uniquement dans les mentions légales (rubrique de l'éditeur).
 * Ne jamais l'afficher ailleurs (pied de page, contact, données structurées…).
 */
export const TELEPHONE_MENTIONS_LEGALES = "06 25 29 93 21";

/**
 * Formspree : une seule adresse pour tous les formulaires (un sujet différent par formulaire).
 * Mettre ici l'identifiant donné par Formspree, la fin de https://formspree.io/f/XXXXXXXX.
 */
export const FORMSPREE_ID = "meagvdbr";
export const FORMSPREE_URL = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "";

/**
 * Lien Calendly de la page /appel/ (bouton « Choisir un créneau », ouvert dans un nouvel onglet,
 * sans intégration dans la page : aucun cookie Calendly sur le site).
 */
export const CALENDLY_URL = "https://calendly.com/sinebox-support/new-meeting";

/** Date de lancement du site, affichée comme date de publication des 3 premiers articles. */
export const DATE_LANCEMENT = "25/11/2026";

/**
 * Informations pas encore fournies par les fondateurs (liste 15 du fichier .md).
 * Elles s'affichent entre crochets tant qu'elles ne sont pas remplies ici : aucune page ne doit être
 * mise en ligne avec un crochet visible.
 */
export const aFournir = {
  delaiKitEssai: "72 heures ouvrées",
  delaiMiseEnPlace: "[délai de mise en place]",
  jourHeureLimite: "le vendredi à 12 h",
  creneauLivraison: "[créneau de livraison]",
  departementsLivres: "[départements livrés]",
  delaiPaiement: "15 jours",
  delaiMaquette: "72 heures ouvrées",
};

/** Délais affichés sur le site. */
export const delais = {
  /** « Nous vous répondons en moins de 24 h. » */
  reponse: "24 h",
};

import type { CleePage } from "@/lib/routes";

export type Pastel =
  | "rose"
  | "bleu"
  | "jaune"
  | "menthe"
  | "lavande"
  | "peche"
  | "kraftClair"
  | "sauge"
  | "corail";


/** Prix HT, en euros. */
export const prix = {
  kit: 1.5,
  troisKits: 4.5,
  colisJusqua12: 15,
  colisAuDela: 22,
  /** Livraison quand les kits sont remis à Deltom Operator. */
  livraisonDeltom: 0,
};

export type KitId = "salleDeBain" | "cuisine" | "entretien" | "troisKits";

export type Kit = {
  id: KitId;
  nom: string;
  /** Nom court affiché sur la boîte dessinée. */
  nomBoite: string;
  /** Couleur du bandeau qui porte le nom, en haut de la boîte. */
  bandeau: Pastel;
  prix: number;
  contenu: string[];
  enAvant?: boolean;
};

export const kits: Kit[] = [
  {
    id: "salleDeBain",
    nom: "Kit Salle de bain",
    nomBoite: "Salle de bain",
    bandeau: "bleu",
    prix: prix.kit,
    contenu: ["2 doses de gel douche et shampoing 2-en-1", "1 savonnette emballée"],
  },
  {
    id: "cuisine",
    nom: "Kit Cuisine",
    nomBoite: "Cuisine",
    bandeau: "jaune",
    prix: prix.kit,
    contenu: ["2 cafés solubles", "2 sachets de thé", "4 bûchettes de sucre"],
  },
  {
    id: "entretien",
    nom: "Kit Entretien",
    nomBoite: "Entretien",
    bandeau: "menthe",
    prix: prix.kit,
    contenu: [
      "1 rouleau de papier toilette",
      "1 grand et 1 petit sac poubelle",
      "1 éponge",
      "1 pastille lave-vaisselle",
    ],
  },
  {
    id: "troisKits",
    nom: "Les 3 kits",
    nomBoite: "Les 3 kits",
    bandeau: "rose",
    prix: prix.troisKits,
    contenu: ["Kit Salle de bain", "Kit Cuisine", "Kit Entretien", "Par arrivée"],
    enAvant: true,
  },
];


export type PackId = "affaires" | "couple" | "chien" | "chat" | "premiereVisite" | "noel";

export type Pack = {
  id: PackId;
  pastille: string;
  nom: string;
  prix: number;
  couleur: Pastel;
  contenu: string[];
  /** Couleur du pack dans la maquette V2. */
  teinte: string;
  /** Texte imprimé sur le sac (maquette V2). */
  etiquetteSac: string;
  /** Nom court affiché sous le sac (maquette V2). */
  nomCourt: string;
};

/** Packs « Qui arrive ? » (spec §8, textes de la maquette V2). */
export const packs: Pack[] = [
  {
    id: "affaires",
    pastille: "Voyage d'affaires",
    nom: "Pack Affaires",
    prix: 11.5,
    couleur: "lavande",
    contenu: ["2 cafés en plus", "1 bouteille d'eau", "1 encas emballé", "1 kit dentaire", "1 kit rasage", "Bouchons d'oreilles"],
    teinte: "#CDDDE8",
    etiquetteSac: "PACK AFFAIRES",
    nomCourt: "Voyage d'affaires",
  },
  {
    id: "couple",
    pastille: "Couple",
    nom: "Pack Couple",
    prix: 21.5,
    couleur: "rose",
    contenu: ["1 boisson pétillante sans alcool", "Chocolats", "1 bougie LED", "2 infusions"],
    teinte: "#F0C4CF",
    etiquetteSac: "PACK COUPLE",
    nomCourt: "Couple",
  },
  {
    id: "chien",
    pastille: "Chien",
    nom: "Pack Chien",
    prix: 9,
    couleur: "kraftClair",
    contenu: ["Sacs de ramassage", "Friandises", "1 lingette pour les pattes", "1 mot « bienvenue à votre chien »"],
    teinte: "#F2E2AC",
    etiquetteSac: "PACK CHIEN",
    nomCourt: "Chien",
  },
  {
    id: "chat",
    pastille: "Chat",
    nom: "Pack Chat",
    prix: 7.5,
    couleur: "sauge",
    contenu: ["1 sachet de litière", "1 sac pour bac", "Friandises"],
    teinte: "#DCD3EA",
    etiquetteSac: "PACK CHAT",
    nomCourt: "Chat",
  },
  {
    id: "premiereVisite",
    pastille: "Première visite",
    nom: "Pack Première visite",
    prix: 12,
    couleur: "bleu",
    contenu: ["1 biscuit d'un producteur de la région", "1 confiture d'un producteur de la région", "1 carte du quartier"],
    teinte: "#CFDFC7",
    etiquetteSac: "PACK 1RE VISITE",
    nomCourt: "Première visite",
  },
  {
    id: "noel",
    pastille: "Noël",
    nom: "Pack Noël",
    prix: 9.5,
    couleur: "corail",
    contenu: ["Papillotes", "1 infusion de Noël", "1 petite décoration", "1 carte de vœux"],
    teinte: "#F3C9B8",
    etiquetteSac: "PACK NOËL",
    nomCourt: "Noël",
  },
];

export const packParDefaut: PackId = "chien";

/** Prix HT d'un pack, lu dans la liste ci-dessus. */
export function prixPack(id: PackId): number {
  return packs.find((p) => p.id === id)!.prix;
}

export type Faq = { question: string; reponse: string };

export type BlocLegal =
  | { t: "h2"; texte: string }
  | { t: "p"; texte: string; lead?: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] };

export const fr = {
  marque: "SINEBOX",
  seo: {
    titre: "Kits d'accueil Airbnb pour conciergeries, livrés chaque semaine",
    description:
      "Conciergeries d'Île-de-France : un kit d'accueil prêt à poser par arrivée, livré chaque dimanche selon vos réservations. 4,50 € HT. Kit d'essai offert.",
  },

  general: {
    ht: "HT",
    lienEvitement: "Aller au contenu",
  },

  /** En-tête, bandeau et pied de page de la maquette V2. Les liens ne s'affichent que si la page existe (lib/routes.ts). */
  site: {
    bandeau: ["Livraison en Île-de-France", "Kit d'essai offert aux professionnels"],
    bandeauLabel: "À savoir",
    logo: "sinebox",
    logoLabel: "SINEBOX, retour à l'accueil",
    navLabel: "Navigation principale",
    menu: [
      { label: "Comment ça marche", page: "ccm" },
      { label: "Les kits", page: "kits" },
      { label: "Les packs", page: "packs" },
      { label: "Tarifs", page: "tarifs" },
      { label: "Ressources", page: "blog" },
    ] as { label: string; page: CleePage }[],
    appel: { label: "Réserver un appel", page: "appel" as CleePage },
    essai: { label: "Kit d'essai offert", page: "essai" as CleePage },
    ouvrirMenu: "Ouvrir le menu",
    fermerMenu: "Fermer le menu",
    pied: {
      slogan: "Des kits d'accueil prêts pour chaque arrivée.",
      sousSlogan: "Préparés et livrés en Île-de-France.",
      navLabel: "Plan du site",
      colonnes: [
        {
          titre: "SINEBOX",
          liens: [
            { label: "Comment ça marche", page: "ccm" },
            { label: "Tarifs", page: "tarifs" },
            { label: "Livraison Île-de-France", page: "livraison" },
            { label: "À votre marque", page: "marque" },
            { label: "Compatibilités", page: "compat" },
            { label: "À propos", page: "apropos" },
            { label: "Nous contacter", page: "appel", email: true },
          ],
        },
        {
          titre: "KITS D'ACCUEIL",
          liens: [
            { label: "Kit d'accueil Airbnb", page: "kits" },
            { label: "Kit salle de bain", page: "kits", ancre: "salle-de-bain" },
            { label: "Kit cuisine", page: "kits", ancre: "cuisine" },
            { label: "Kit entretien", page: "kits", ancre: "entretien" },
            { label: "Les packs", page: "packs" },
          ],
        },
        {
          titre: "POUR QUI",
          liens: [
            { label: "Conciergeries", page: "conciergeries" },
            { label: "Hôtes multi-logements", page: "hotes" },
          ],
        },
        {
          titre: "RESSOURCES",
          liens: [
            { label: "Le journal", page: "blog" },
            { label: "FAQ", page: "faq" },
            { label: "À montrer à votre associé", page: "associe" },
          ],
        },
      ] as { titre: string; liens: { label: string; page: CleePage; email?: boolean; ancre?: string }[] }[],
      copyright: "© SINEBOX",
      legal: [
        { label: "Mentions légales", page: "mentionsLegales" },
        { label: "CGV", page: "cgv" },
        { label: "Confidentialité", page: "confidentialite" },
      ] as { label: string; page: CleePage; ancre?: string }[],
    },
  },

  /** Accueil V2 : étiquette interactive (jour sélectionné par défaut : vendredi). */
  /**
   * Relances discrètes en fin de section (components/v2/Relance.tsx).
   * texte : [début, fin en italique] ; lien : page du site (lib/routes.ts) ; second : lien secondaire, plus discret.
   */
  relances: {
    essayer: { texte: ["Le plus simple, c'est d'essayer. ", "Les 3 kits sont offerts."], lien: { page: "essai", label: "Recevoir mon kit d'essai" }, second: { page: "appel", label: "ou réserver un appel" } },
    calculer: { texte: ["Combien pour vos logements ? ", "Faites le calcul."], lien: { page: "tarifs", ancre: "calculateur", label: "Estimer mon coût" }, second: { page: "essai", label: "ou recevoir un kit d'essai" } },
    question: { texte: ["Une autre question ? ", "Parlons-en."], lien: { page: "appel", label: "Réserver un appel" }, second: { page: "essai", label: "ou recevoir un kit d'essai" } },
    etiquette: { texte: ["L'étiquette se juge ", "en main."], lien: { page: "essai", label: "Recevoir mon kit d'essai" }, second: { page: "appel", label: "ou réserver un appel" } },
    produits: { texte: ["Touchez les produits ", "avant de décider."], lien: { page: "essai", label: "Recevoir mon kit d'essai" }, second: { page: "tarifs", label: "ou voir les tarifs" } },
    maquette: { texte: ["Votre logo, ", "sur une maquette gratuite."], lien: { page: "marque", ancre: "maquette", label: "Demander ma maquette" }, second: { page: "essai", label: "ou recevoir un kit d'essai" } },
    pack: { texte: ["Un pack vous tente ? ", "Parlons de vos voyageurs."], lien: { page: "appel", label: "Réserver un appel" }, second: { page: "essai", label: "ou recevoir un kit d'essai" } },
    outil: { texte: ["Un doute sur votre outil ? ", "Posez-nous la question."], lien: { page: "appel", label: "Réserver un appel" }, second: { page: "essai", label: "ou recevoir un kit d'essai" } },
    parler: { texte: ["Le mieux, c'est ", "de se parler."], lien: { page: "appel", label: "Réserver un appel" }, second: { page: "essai", label: "ou recevoir un kit d'essai" } },
    associe: { texte: ["Votre associé préfère nous parler ", "directement ?"], lien: { page: "appel", label: "Réserver un appel" }, second: { page: "essai", label: "ou recevoir un kit d'essai" } },
    livraison: { texte: ["Vous êtes en Île-de-France ? ", "Le kit d'essai part chez vous."], lien: { page: "essai", label: "Recevoir mon kit d'essai" }, second: { page: "appel", label: "ou réserver un appel" } },
    facture: { texte: ["Une question sur la facturation ? ", "On vous répond."], lien: { page: "appel", label: "Réserver un appel" }, second: { page: "essai", label: "ou recevoir un kit d'essai" } },
    journal: { texte: ["Envie de voir le kit ", "en vrai ?"], lien: { page: "essai", label: "Recevoir mon kit d'essai" }, second: { page: "appel", label: "ou réserver un appel" } },
  },
  etiquetteV2: {
    groupeLabel: "Jour d'arrivée",
    arrivee: "ARRIVÉE",
    dansLeKit: "DANS LE KIT",
    logo: "LOGO",
    parDefaut: 4,
    jours: [
      { court: "LUN", long: "LUNDI", couleur: "#F3C9B8", date: "30/11", logement: "Studio Oberkampf", kit: "Les 3 kits" },
      { court: "MAR", long: "MARDI", couleur: "#F2E2AC", date: "01/12", logement: "Duplex Vincennes", kit: "Les 3 kits" },
      { court: "MER", long: "MERCREDI", couleur: "#CFDFC7", date: "02/12", logement: "T2 Montreuil", kit: "Les 3 kits + Pack Chien" },
      { court: "JEU", long: "JEUDI", couleur: "#CDDDE8", date: "03/12", logement: "Loft Pantin", kit: "Les 3 kits" },
      { court: "VEN", long: "VENDREDI", couleur: "#DCD3EA", date: "04/12", logement: "Studio Marais", kit: "Les 3 kits" },
      { court: "SAM", long: "SAMEDI", couleur: "#F0C4CF", date: "05/12", logement: "Appartement Bastille", kit: "Les 3 kits + Pack Couple" },
      { court: "DIM", long: "DIMANCHE", couleur: "#E8D5C0", date: "06/12", logement: "Maison Saint-Maur", kit: "Les 3 kits + Pack Première visite" },
    ],
  },

  /** Page « Le kit et son étiquette » (maquette V2) : sélecteur de jour, samedi par défaut. */
  etiquettePageV2: {
    groupeLabel: "Jour d'arrivée",
    parDefaut: 5,
    jours: [
      { court: "L", long: "LUNDI", couleur: "#F3C9B8", date: "24 nov.", logement: "Studio Oberkampf", kit: "Salle de bain · Cuisine" },
      { court: "M", long: "MARDI", couleur: "#F2E2AC", date: "25 nov.", logement: "Duplex Vincennes", kit: "Les 3 kits" },
      { court: "M", long: "MERCREDI", couleur: "#CFDFC7", date: "26 nov.", logement: "T2 Montreuil", kit: "Les 3 kits + pack Chien" },
      { court: "J", long: "JEUDI", couleur: "#CDDDE8", date: "27 nov.", logement: "Loft Pantin", kit: "Salle de bain · Entretien" },
      { court: "V", long: "VENDREDI", couleur: "#DCD3EA", date: "28 nov.", logement: "T3 Nation", kit: "Les 3 kits + pack Couple" },
      { court: "S", long: "SAMEDI", couleur: "#F0C4CF", date: "29 nov.", logement: "Appartement Bastille", kit: "Les 3 kits" },
      { court: "D", long: "DIMANCHE", couleur: "#E8D5C0", date: "30 nov.", logement: "Maison Saint-Maur", kit: "Les 3 kits + pack Première visite" },
    ],
  },

  /** Page « Réserver un appel » : formulaire (pas d'outil de prise de rendez-vous). */
  appelV2: {
    petitTitreCreneau: "15 MIN · TÉLÉPHONE OU VISIO",
    boutonCreneau: "Choisir un créneau",
    nouvelOnglet: "(s'ouvre dans un nouvel onglet)",
    titreRappel: "Vous préférez qu'on vous rappelle ?",
    petitTitre: "VOS DISPONIBILITÉS",
    sujet: "Appel",
    bouton: "Réserver un appel",
    sousBouton: `Nous vous répondons en moins de ${delais.reponse} pour fixer l'heure exacte.`,
  },

  /** Page « À votre marque » : demande de maquette au logo. */
  maquetteV2: {
    sujet: "Maquette à mon logo",
    bouton: "Recevoir ma maquette",
  },

  /** Listes d'attente (maquette V2). */
  listeAttenteV2: {
    label: "Votre e-mail",
    placeholder: "votre@email.fr",
    bouton: "Rejoindre la liste d'attente",
    sujetHorsIdf: "Liste d'attente hors Île-de-France",
    sujetNouveautes: "Liste d'attente — nouveautés (logiciels, packs automatiques)",
  },

  /** Rubriques du journal : textes de la maquette (Accueil des voyageurs) et du .md (Organisation d'une conciergerie). */
  rubriques: {
    rubriqueAccueil: {
      intro: "Ce qui compte à l'arrivée, pièce par pièce et saison par saison.",
      articles: ["articleNoel", "articleListe"] as ("articleNoel" | "articleListe" | "articleStock")[],
      appel: ["Un accueil soigné, ", "sans stock."],
      appelTexte: "Les kits et les packs arrivent avec le colis du dimanche. Commencez par le kit d'essai.",
    },
    rubriqueOrganisation: {
      intro: "Les méthodes qui font gagner des heures chaque semaine, du stock de consommables à l'équipe de ménage.",
      articles: ["articleStock"] as ("articleNoel" | "articleListe" | "articleStock")[],
      appel: ["Plus de stock à gérer : ", "un kit par arrivée, livré le dimanche."],
      appelTexte: "Les kits et les packs arrivent avec le colis du dimanche. Commencez par le kit d'essai.",
    },
  },

  /** Accueil V2 : ticket des packs (pack sélectionné par défaut : Chien). */
  ticketV2: {
    titre: "TICKET · ARRIVÉE",
    jour: "VENDREDI 04/12",
    troisKits: "Les 3 kits",
    prefixePack: "Pack",
    total: "TOTAL HT",
    groupeLabel: "Choisir un pack",
  },

  /** Coordonnées réelles. */
  coordonnees: {
    /** Adresse e-mail de contact (voir EMAIL_CONTACT en haut du fichier). Pas de téléphone publié. */
    email: EMAIL_CONTACT,
    zone: "Île-de-France",
    horaires: "[horaires]",
  },

  /**
   * Mentions légales et CGV : texte fourni le 22/11/2026, mots et crochets inchangés.
   * Format des blocs : h2 (titre de rubrique), p (paragraphe, avec « lead » en gras), ul, ol.
   * Liens dans le texte : [libellé](https://…).
   */
  pagesLegales: {
    mentionsLegales: {
      titre: "Mentions légales",
      titreGoogle: "Mentions légales | SINEBOX",
      description: "Mentions légales du site SINEBOX : éditeur, hébergeur, propriété intellectuelle, données personnelles et cookies.",
      blocs: [
        { t: "h2", texte: "Éditeur du site" },
        {
          t: "p",
          texte:
            "Le site [www.sinebox.fr](https://www.sinebox.fr) est édité par SINEBOX, société en cours de création, représentée par Armand Auclair et Perrine Gozzi, 21 bis avenue du Maréchal de Lattre de Tassigny, 94000 Créteil. Numéro d'immatriculation : en cours d'attribution.",
        },
        { t: "p", texte: "Directeur de la publication : Armand Auclair." },
        { t: "p", texte: `Contact : ${EMAIL_CONTACT} · Téléphone : ${TELEPHONE_MENTIONS_LEGALES}.` },
        { t: "h2", texte: "Hébergeur" },
        {
          t: "p",
          texte: "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.",
        },
        { t: "h2", texte: "Propriété intellectuelle" },
        {
          t: "p",
          texte:
            "Les textes, dessins, logos et le nom SINEBOX présents sur ce site sont la propriété de SINEBOX et de ses fondateurs. Toute reproduction, même partielle, sans autorisation écrite est interdite.",
        },
        {
          t: "p",
          texte:
            "Deltom Operator est une marque de DELTOM GROUPE SAS, société distincte de SINEBOX. Elle est citée sur ce site uniquement pour indiquer la compatibilité des deux services.",
        },
        { t: "h2", texte: "Données personnelles" },
        {
          t: "p",
          texte: "Pour savoir comment nous utilisons vos données, consultez notre [politique de confidentialité](/confidentialite/).",
        },
        { t: "h2", texte: "Cookies" },
        {
          t: "p",
          texte:
            "Ce site ne dépose aucun cookie et n'utilise aucun outil de suivi publicitaire.",
        },
      ] as BlocLegal[],
    },
    /** Texte : content/legal/cgv.md (fichier du 25/11/2026). */
    cgv: {
      titreGoogle: "Conditions générales de vente | SINEBOX",
      description: "Conditions générales de vente de SINEBOX : commande, prix, livraison, facturation, réclamations et arrêt du service.",
      sommaire: "Sommaire",
    },
    /** Texte : content/legal/confidentialite.md (fichier du 25/11/2026). */
    confidentialite: {
      titreGoogle: "Politique de confidentialité | SINEBOX",
      description: "Les données que SINEBOX collecte, pourquoi, combien de temps, qui les reçoit, et comment exercer vos droits.",
    },
  },

  /** Textes des formulaires (spec §10, §13, §15). */
  formulaires: {
    erreurEnvoi: "L'envoi n'a pas marché. Réessayez dans un instant.",
    envoiEnCours: "Envoi en cours…",
    erreurs: {
      obligatoire: "Ce champ est obligatoire.",
      email: "Indiquez une adresse e-mail valide.",
      nombreLogements: "Indiquez un nombre entier, au moins 1.",
      consentement: "Cochez la case pour que nous puissions traiter votre demande.",
      codePostal: "Indiquez un code postal à 5 chiffres.",
      horsIdf: "Nous ne livrons pas encore hors d'Île-de-France.",
      horsIdfLien: "Être prévenu à l'ouverture",
    },
    choisir: "Choisir…",
    continuer: "Continuer",
    retour: "Retour",
    pieges: { label: "Ne pas remplir ce champ" },
    essai: {
      sujet: (societe: string) => `Kit d'essai — ${societe}`,
      /** Sujet quand le formulaire part sans JavaScript (la société n'est pas connue à l'avance). */
      sujetSansJs: "Kit d'essai",
      champs: {
        nom: "Nom",
        societe: "Société",
        nombre_logements: "Nombre de logements",
        ville: "Ville",
        email: "E-mail",
        telephone: "Téléphone (facultatif)",
        source: "Comment nous avez-vous connus ?",
      },
      sourceChoisir: "Choisir…",
      sources: ["Google", "Facebook", "Deltom Operator", "Bouche-à-oreille", "Salon", "Autre"],
      bouton: "Recevoir mon kit d'essai",
      sousBouton: "Réponse sous 24 h ouvrées. Sans engagement.",
      succes: "C'est noté. Nous vous écrivons sous 24 h ouvrées pour confirmer l'adresse d'envoi.",
    },
  },

  pages: {
    merci: {
      question: "Une question d'ici là ? Écrivez à",
    },
    introuvable: {
      titreGoogle: "Page introuvable | SINEBOX",
      titre: "Cette page n'existe pas (ou plus).",
      texte: "L'adresse est peut-être mal tapée, ou la page a changé de place. Voici où trouver l'essentiel :",
    },
  },
};

export type Contenu = typeof fr;
export default fr;
