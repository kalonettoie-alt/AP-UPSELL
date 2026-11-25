/**
 * Réglages Google et H1 de chaque page : fichier sinebox-v2-pages-secondaires.md (version du 25/11/2026).
 * Le H1 est découpé en deux : la fin est affichée en italique, comme dans la maquette.
 * Les textes visibles des pages viennent de la maquette (components/pages/).
 */
import type { CleePage } from "@/lib/routes";

export type ReglagesPage = {
  titre: string;
  description: string;
  h1: [string, string];
  /** Fil d'Ariane (étapes du registre lib/routes.ts). */
  fil?: CleePage[];
};

export const reglages: Partial<Record<CleePage, ReglagesPage>> = {
  ccm: {
    titre: "Kits d'accueil livrés selon votre calendrier | SINEBOX",
    description:
      "Connectez vos calendriers Airbnb et Booking : chaque dimanche, un kit prêt à poser par arrivée. Sans stock, sans courses, 4,50 € HT par arrivée.",
    h1: ["Vous n'avez pas ouvert une conciergerie ", "pour compter des rouleaux de papier toilette."],
    fil: ["accueil", "ccm"],
  },
  etiquette: {
    titre: "Kits d'accueil étiquetés par logement et par jour | SINEBOX",
    description:
      "Chaque kit porte le nom du logement, le jour d'arrivée et une couleur par jour. Votre équipe de ménage prend la bonne couleur et pose le kit.",
    h1: ["Le kit qui dit à votre équipe ", "où il va."],
    fil: ["accueil", "ccm", "etiquette"],
  },
  marque: {
    titre: "Kit d'accueil personnalisé à votre logo | SINEBOX",
    description:
      "Votre logo sur chaque kit d'accueil et une carte à votre nom. Le voyageur retient votre conciergerie, pas la nôtre. Sans engagement de durée.",
    h1: ["Le voyageur retient votre nom, ", "pas le nôtre."],
    fil: ["accueil", "ccm", "marque"],
  },
  livraison: {
    titre: "Livraison de kits d'accueil en Île-de-France | SINEBOX",
    description:
      "Un colis chaque dimanche, au bureau ou dans un logement : 15 € HT jusqu'à 12 arrivées, 22 € HT au-delà, 0 € si compatible avec Deltom Operator.",
    h1: ["Vos kits arrivent le dimanche, ", "partout en Île-de-France."],
    fil: ["accueil", "ccm", "livraison"],
  },
  kits: {
    titre: "Kit d'accueil Airbnb : contenu, prix et photos | SINEBOX",
    description:
      "Salle de bain, cuisine, entretien : trois kits d'accueil prêts à poser, à 1,50 € HT chacun, 4,50 € HT les trois par arrivée. Voyez le contenu.",
    h1: ["Le kit d'accueil Airbnb, ", "prêt à poser."],
    fil: ["accueil", "kits"],
  },
  packs: {
    titre: "Packs d'accueil Airbnb : chien, chat, Noël, couple | SINEBOX",
    description:
      "Ajoutez un pack à l'arrivée de votre choix : voyage d'affaires, couple, chien, chat, première visite ou Noël. Livré dans le même colis que vos kits.",
    h1: ["Un chien, un couple, Noël ? ", "Ajoutez le pack qui va avec."],
    fil: ["accueil", "kits", "packs"],
  },
  tarifs: {
    titre: "Prix des kits d'accueil Airbnb : 4,50 € HT | SINEBOX",
    description:
      "Tous nos prix HT : 4,50 € par arrivée pour les 3 kits, packs de 7,50 € à 21,50 €, livraison dès 15 € par colis. Une facture par mois, sans engagement.",
    h1: ["Tous nos prix, ", "sans rendez-vous."],
    fil: ["accueil", "tarifs"],
  },
  conciergeries: {
    titre: "Kits d'accueil pour conciergeries Airbnb | SINEBOX",
    description:
      "Le fournisseur de kits d'accueil des conciergeries d'Île-de-France : un kit étiqueté par arrivée, livré chaque dimanche, sans stock. 4,50 € HT.",
    h1: ["Le fournisseur de kits d'accueil des conciergeries, ", "sans stock ni carton."],
    fil: ["accueil", "conciergeries"],
  },
  hotes: {
    titre: "Kits d'accueil pour hôtes Airbnb multi-logements | SINEBOX",
    description:
      "Vous gérez plusieurs logements Airbnb ou Booking ? Vos kits d'accueil arrivent seuls chaque dimanche, un par arrivée. 4,50 € HT, sans engagement.",
    h1: ["Vos kits d'accueil arrivent tout seuls, ", "même pour trois logements."],
    fil: ["accueil", "hotes"],
  },
  faq: {
    titre: "Questions sur nos kits d'accueil Airbnb | SINEBOX",
    description:
      "Calendriers, dernière minute, annulations, produits, prix, livraison, logo : toutes les réponses sur les kits d'accueil SINEBOX pour conciergeries.",
    h1: ["Vos questions ", "sur les kits d'accueil SINEBOX."],
    fil: ["accueil", "faq"],
  },
  compat: {
    titre: "Kits d'accueil compatibles Airbnb et Booking | SINEBOX",
    description:
      "SINEBOX lit le lien de calendrier de vos logements Airbnb et Booking. Seules les dates d'arrivée. Connexion directe aux logiciels de gestion : bientôt.",
    h1: ["Si votre outil donne un lien de calendrier, ", "ça marche."],
    fil: ["accueil", "compat"],
  },
  associe: {
    titre: "Présenter SINEBOX à votre associé | SINEBOX",
    description:
      "Une fiche d'une page et un e-mail prêt à transférer pour présenter les kits d'accueil SINEBOX à la personne qui décide dans votre conciergerie.",
    h1: ["Vous êtes convaincu. ", "Voici de quoi convaincre la personne qui décide."],
    fil: ["accueil", "associe"],
  },
  apropos: {
    titre: "À propos de SINEBOX, kits d'accueil en Île-de-France",
    description:
      "SINEBOX prépare et livre des kits d'accueil pour les conciergeries et les hôtes d'Île-de-France. Qui nous sommes, pourquoi ce service, ce que nous croyons.",
    h1: ["Deux personnes, des kits, ", "et vos dimanches."],
    fil: ["accueil", "apropos"],
  },
  essai: {
    titre: "Kit d'essai offert aux conciergeries | SINEBOX",
    description:
      "Recevez gratuitement les 3 kits d'accueil SINEBOX, envoi compris. Réservé aux professionnels d'Île-de-France, un kit par société. Sans engagement.",
    h1: ["Jugez sur pièce : ", "vos 3 kits, offerts."],
  },
  appel: {
    titre: "Réserver un appel de 15 minutes | SINEBOX",
    description:
      "15 minutes pour regarder vos arrivées, calculer votre coût par semaine et vous dire franchement si les kits d'accueil SINEBOX valent le coup pour vous.",
    h1: ["15 minutes pour voir si SINEBOX ", "vous fait gagner du temps."],
  },
  merci: {
    titre: "Merci | SINEBOX",
    description: "Votre demande a bien été envoyée.",
    h1: ["Merci, ", "c'est noté."],
  },
  blog: {
    titre: "Conseils pour conciergeries et hôtes Airbnb | SINEBOX",
    description:
      "Consommables, coûts, accueil des voyageurs, organisation : des conseils concrets pour les conciergeries et les hôtes de locations courte durée.",
    h1: ["Conseils pour faire tourner vos locations, ", "sans y passer vos dimanches."],
    fil: ["accueil", "blog"],
  },
  rubriqueAccueil: {
    titre: "Accueillir vos voyageurs Airbnb : nos conseils | SINEBOX",
    description:
      "Que mettre dans un kit d'accueil, comment accueillir un chien, que prévoir à Noël : des conseils simples pour un accueil soigné dans chaque logement.",
    h1: ["Accueil des ", "voyageurs."],
    fil: ["accueil", "blog", "rubriqueAccueil"],
  },
  rubriqueOrganisation: {
    titre: "Organiser sa conciergerie Airbnb : méthodes | SINEBOX",
    description:
      "Stock de consommables, équipe de ménage, packs à revendre : des méthodes concrètes pour gagner du temps dans une conciergerie de location courte durée.",
    h1: ["Organisation ", "d'une conciergerie."],
    fil: ["accueil", "blog", "rubriqueOrganisation"],
  },
};

/** Textes de /merci/ selon le paramètre ?demande= (par défaut : kit-essai). */
export const merciDemandes = {
  "kit-essai": {
    h1: ["Merci, ", "votre demande de kit d'essai est envoyée."],
    texte: "Nous vous répondons en moins de {reponse}. Vous recevez le kit sous {delaiKitEssai}, puis nous vous appelons pour avoir votre avis.",
  },
  appel: {
    h1: ["Merci, ", "nous vous rappelons."],
    texte: "Nous vous répondons en moins de {reponse} pour fixer l'heure de l'appel.",
  },
  maquette: {
    h1: ["Merci, ", "votre logo est bien reçu."],
    texte: "Nous vous envoyons la maquette de l'autocollant et de la carte sous {delaiMaquette}.",
  },
  "liste-attente": {
    h1: ["Merci, ", "vous êtes sur la liste."],
    texte: "Nous vous écrivons dès que la nouveauté est disponible. Pas d'autre e-mail.",
  },
} as const;
