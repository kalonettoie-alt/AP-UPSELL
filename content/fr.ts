/**
 * Tous les textes de la page de vente AP UPSELL (français).
 * Source de vérité : docs/spec-page-de-vente.md.
 * Les textes entre crochets [...] sont des informations pas encore connues :
 * ils restent tels quels.
 * Les prix sont en nombres (HT) ; le format d'affichage est dans lib/prix.ts.
 * Typographie : une espace insécable (U+00A0) précède « : ? ! ; » et suit « « ».
 */

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

/** Couleurs pastel (spec §1). Reprises en variables CSS dans app/globals.css. */
export const pastels: Record<Pastel, string> = {
  rose: "#F6C9C4",
  bleu: "#BFD9F2",
  jaune: "#F7E3A1",
  menthe: "#BFE3D0",
  lavande: "#CFC8F0",
  peche: "#F8D5B8",
  kraftClair: "#E3CDA8",
  sauge: "#D6E5B5",
  corail: "#F4B9A0",
};

/** Prix HT, en euros. */
export const prix = {
  kit: 1.5,
  troisKits: 4.5,
  colisJusqua12: 15,
  colisAuDela: 22,
};

export type KitId = "salleDeBain" | "cuisine" | "entretien" | "troisKits";

export type Kit = {
  id: KitId;
  nom: string;
  /** Nom court affiché sur la boîte dessinée. */
  nomBoite: string;
  couleurs: Pastel[];
  prix: number;
  contenu: string[];
  enAvant?: boolean;
};

export const kits: Kit[] = [
  {
    id: "salleDeBain",
    nom: "Kit Salle de bain",
    nomBoite: "Salle de bain",
    couleurs: ["bleu"],
    prix: prix.kit,
    contenu: ["2 doses de gel douche et shampoing 2-en-1", "1 savonnette emballée"],
  },
  {
    id: "cuisine",
    nom: "Kit Cuisine",
    nomBoite: "Cuisine",
    couleurs: ["jaune"],
    prix: prix.kit,
    contenu: ["2 cafés solubles", "2 sachets de thé", "4 bûchettes de sucre"],
  },
  {
    id: "entretien",
    nom: "Kit Entretien",
    nomBoite: "Entretien",
    couleurs: ["menthe"],
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
    couleurs: ["bleu", "jaune", "menthe"],
    prix: prix.troisKits,
    contenu: ["Kit Salle de bain", "Kit Cuisine", "Kit Entretien", "Par arrivée"],
    enAvant: true,
  },
];

export type JourId = "lun" | "mar" | "mer" | "jeu" | "ven" | "sam" | "dim";

export type Jour = {
  id: JourId;
  court: string;
  long: string;
  couleur: Pastel;
  date: string;
  logement: string;
};

/** Étiquette des 7 jours (spec §6). Exemples de démonstration entre crochets. */
export const jours: Jour[] = [
  { id: "lun", court: "LUN", long: "Lundi", couleur: "bleu", date: "[30/11]", logement: "[Loft Montreuil]" },
  { id: "mar", court: "MAR", long: "Mardi", couleur: "peche", date: "[01/12]", logement: "[T2 Oberkampf]" },
  { id: "mer", court: "MER", long: "Mercredi", couleur: "menthe", date: "[02/12]", logement: "[T3 Bastille]" },
  { id: "jeu", court: "JEU", long: "Jeudi", couleur: "lavande", date: "[03/12]", logement: "[Studio Nation]" },
  { id: "ven", court: "VEN", long: "Vendredi", couleur: "jaune", date: "[04/12]", logement: "[Studio Marais]" },
  { id: "sam", court: "SAM", long: "Samedi", couleur: "rose", date: "[05/12]", logement: "[Maison Vincennes]" },
  { id: "dim", court: "DIM", long: "Dimanche", couleur: "kraftClair", date: "[06/12]", logement: "[T2 République]" },
];

export const jourParDefaut: JourId = "ven";

export type PackId = "affaires" | "couple" | "chien" | "chat" | "premiereVisite" | "noel";

export type Pack = {
  id: PackId;
  pastille: string;
  nom: string;
  prix: number;
  couleur: Pastel;
  contenu: string[];
};

/** Packs « Qui arrive ? » (spec §8). */
export const packs: Pack[] = [
  {
    id: "affaires",
    pastille: "Voyage d'affaires",
    nom: "Pack Affaires",
    prix: 11.5,
    couleur: "lavande",
    contenu: [
      "2 cafés en plus",
      "1 bouteille d'eau",
      "1 encas emballé",
      "1 kit dentaire",
      "1 kit rasage",
      "bouchons d'oreilles",
    ],
  },
  {
    id: "couple",
    pastille: "Couple",
    nom: "Pack Couple",
    prix: 21.5,
    couleur: "rose",
    contenu: ["1 boisson pétillante sans alcool", "chocolats", "1 bougie", "2 infusions"],
  },
  {
    id: "chien",
    pastille: "Chien",
    nom: "Pack Chien",
    prix: 9,
    couleur: "kraftClair",
    contenu: [
      "sacs de ramassage",
      "friandises",
      "1 lingette pour les pattes",
      "1 mot « bienvenue à votre chien »",
    ],
  },
  {
    id: "chat",
    pastille: "Chat",
    nom: "Pack Chat",
    prix: 7.5,
    couleur: "sauge",
    contenu: ["1 sachet de litière", "1 sac pour bac", "friandises"],
  },
  {
    id: "premiereVisite",
    pastille: "Première visite",
    nom: "Pack Première visite",
    prix: 12,
    couleur: "bleu",
    contenu: ["1 biscuit et 1 confiture d'un producteur de la région", "1 carte du quartier"],
  },
  {
    id: "noel",
    pastille: "Noël",
    nom: "Pack Noël",
    prix: 9.5,
    couleur: "corail",
    contenu: ["papillotes", "1 infusion de Noël", "1 petite décoration", "1 carte de vœux"],
  },
];

export const packParDefaut: PackId = "chien";

export type Faq = { question: string; reponse: string };

export const fr = {
  marque: "AP UPSELL",
  baseline: "Kits d'accueil pour locations courte durée",

  seo: {
    titre: "Kits d'accueil Airbnb livrés chaque semaine | AP UPSELL",
    description:
      "Un kit d'accueil prêt à poser pour chaque arrivée, livré chaque dimanche selon vos réservations. 4,50 € HT par arrivée. Kit d'essai offert.",
  },

  general: {
    ht: "HT",
    lienEvitement: "Aller au contenu",
  },

  header: {
    navLabel: "Navigation principale",
    liens: [
      { label: "Les kits", href: "#kits" },
      { label: "Les prix", href: "#prix" },
      { label: "La livraison", href: "#livraison" },
    ],
    bouton: { label: "Kit d'essai offert", href: "#essai" },
  },

  hero: {
    petitTitre: "Pour les conciergeries et les hôtes · Île-de-France",
    titre: "Un kit d'accueil par arrivée, livré chaque semaine.",
    sousTitre:
      "Connectez vos calendriers Airbnb et Booking. Chaque dimanche, vous recevez un colis avec un kit prêt à poser pour chaque arrivée de la semaine. Plus de courses, plus de stock, plus de sachets à préparer.",
    lignePrix: "4,50 € HT par arrivée pour les 3 kits",
    bouton: { label: "Recevoir mon kit d'essai", href: "#essai" },
    lien: { label: "Voir le contenu des kits", href: "#kits" },
    sousBouton: "Offert, envoi compris.",
    /** Boîtes du visuel, dans l'ordre de l'étagère. */
    boites: ["salleDeBain", "cuisine", "entretien", "troisKits"] as KitId[],
  },

  avant: {
    petitTitre: "Avant",
    titre: "Votre liste de courses de la semaine. Rayez tout.",
    texte:
      "Acheter, stocker, compter, préparer, repartir en urgence parce qu'il manque du café. Avec AP UPSELL, cette liste n'existe plus.",
    feuilleTitre: "À faire cette semaine",
    liste: [
      "Acheter les savons",
      "Recompter le stock de café",
      "Préparer les sachets d'accueil",
      "Ranger les cartons",
      "Course de dernière minute",
    ],
    pastille: "Fait par nous",
  },

  commentCaMarche: {
    titre: "Trois étapes, puis vous n'y pensez plus.",
    etapeLabel: "ÉTAPE",
    etapes: [
      {
        couleur: "rose" as Pastel,
        titre: "Vous connectez vos calendriers",
        texte:
          "Collez le lien de calendrier de chaque logement, Airbnb ou Booking. Nous voyons les dates d'arrivée, rien d'autre.",
      },
      {
        couleur: "menthe" as Pastel,
        titre: "Chaque dimanche, vous recevez vos kits",
        texte: "Un seul colis, avec un kit par arrivée de la semaine.",
      },
      {
        couleur: "jaune" as Pastel,
        titre: "Votre équipe de ménage le pose",
        texte:
          "Chaque kit porte le nom du logement et la date d'arrivée, avec une couleur par jour. Impossible de se tromper.",
      },
    ],
    etiquette: {
      petitTitre: "L'étiquette de l'étape 3",
      titre: "Une couleur par jour. Choisissez un jour.",
      groupeLabel: "Jour d'arrivée",
      arrivee: "ARRIVÉE",
      kitLabel: "KIT",
      kitNom: "Les 3 kits",
      logo: "LOGO",
    },
    bientot: "Connexion directe à votre logiciel de gestion : bientôt.",
  },

  nosKits: {
    petitTitre: "Le rayon",
    titre: "L'essentiel pour bien commencer un séjour.",
    texte: "Trois kits, un prix rond. Le même prix que le séjour dure 2 nuits ou 3 semaines.",
    note: "Le kit sert à démarrer le séjour. Il n'y a pas de réassort pendant le séjour.",
    bouton: { label: "Recevoir mon kit d'essai", href: "#essai" },
  },

  quiArrive: {
    petitTitre: "En plus, quand vous voulez",
    titre: "Un couple, un chien, Noël ? Ajoutez le pack qui va avec.",
    texte:
      "L'essentiel part à chaque arrivée. Pour les séjours qui méritent plus, ajoutez un pack en un clic : par logement, par dates, ou réservation par réservation. Il arrive dans le même colis, avec la même étiquette.",
    selecteurLabel: "Qui arrive ?",
    /** Étiquette de colis d'exemple (vendredi). */
    etiquetteJour: "VENDREDI",
    etiquetteDate: "[04/12]",
    etiquetteLogement: "[Studio Marais]",
    troisKits: "Les 3 kits",
    ticketTitre: "TICKET · CETTE ARRIVÉE",
    total: "TOTAL HT",
    /** Ligne de calcul : « Les 3 kits 4,50 € + Pack Chien 9 € = 13,50 € HT pour cette arrivée » */
    pourCetteArrivee: "HT pour cette arrivée",
    sousTicket:
      "Vous ne payez un pack que pour les arrivées où vous l'ajoutez. Vous pouvez aussi le proposer en option à vos voyageurs, à votre prix.",
    bientot: "Ajout automatique selon la réservation : bientôt.",
  },

  vraiCalcul: {
    petitTitre: "Le vrai calcul",
    titre: "Moins cher au carton. Plus cher au total.",
    texte:
      "Oui, un carton de produits coûte moins cher à l'unité. Mais le carton n'arrive pas trié, compté et étiqueté dans vos logements. Quelqu'un le fait, et ce quelqu'un, vous le payez.",
    tableauLegende: "Comparaison : avec des cartons ou avec AP UPSELL",
    colonnes: { critere: "Critère", cartons: "Avec des cartons", apUpsell: "Avec AP UPSELL" },
    lignes: [
      {
        critere: "Commande",
        cartons: "Vous commandez à l'avance, par grosses quantités",
        apUpsell: "Rien à commander : le calendrier suffit",
      },
      {
        critere: "Paiement",
        cartons: "Vous payez tout le carton d'avance",
        apUpsell: "Vous payez les kits livrés, une facture par mois",
      },
      {
        critere: "Stock",
        cartons: "Des cartons à ranger et à recompter",
        apUpsell: "Aucun stock",
      },
      {
        critere: "Préparation",
        cartons: "Quelqu'un fait les sachets, logement par logement",
        apUpsell: "Les kits arrivent prêts, étiquetés",
      },
      {
        critere: "Dernière minute",
        cartons: "Une course en urgence si le stock est vide",
        apUpsell: "1 ou 2 kits d'avance dans chaque colis",
      },
    ],
    phraseFin:
      "Comptez le temps que votre équipe passe chaque semaine à acheter, compter et préparer. C'est ce temps-là que vous récupérez.",
    bouton: { label: "Recevoir mon kit d'essai", href: "#essai" },
  },

  livraison: {
    titre: "Deux façons de recevoir vos kits.",
    cartes: [
      {
        icone: "maison" as const,
        couleur: "bleu" as Pastel,
        pastille: "0 € de livraison",
        titre: "Compatible avec Deltom Operator",
        texte:
          "Vos ménages passent par Deltom Operator ? Vos kits sont remis à Deltom Operator et arrivent dans le logement avec le ménage. Pas de colis à réceptionner, pas de frais de livraison.",
      },
      {
        icone: "colis" as const,
        couleur: "peche" as Pastel,
        pastille: "Dès 15 € HT le colis",
        titre: "Par colis, chaque dimanche",
        texte:
          "Un seul colis par semaine, livré à votre bureau ou dans un logement. 15 € HT par colis jusqu'à 12 arrivées dans la semaine, 22 € HT au-delà.",
      },
    ],
    derniereMinute: {
      icone: "horloge" as const,
      couleur: "menthe" as Pastel,
      titre: "Prêt pour la dernière minute",
      texte:
        "Dans les deux cas, vous avez 1 ou 2 kits d'avance. Vous ne les payez que si vous les utilisez.",
    },
    lienDeltom: {
      label: "Vous ne connaissez pas Deltom Operator ?",
      href: "https://www.deltomops.com",
      nouvelOnglet: "(s'ouvre dans un nouvel onglet)",
    },
  },

  aVotreMarque: {
    petitTitre: "À votre marque",
    titre: "Votre nom sur chaque kit.",
    texte:
      "Un autocollant à votre logo sur la boîte et une carte d'accueil à votre nom. Le voyageur voit votre marque, pas la nôtre. Les produits gardent leur emballage d'origine. Sans engagement de durée.",
    autocollant: "Votre logo",
    carteTitre: "Bienvenue chez [Nom du logement].",
    carteTexte: "Wifi, consignes, bonnes adresses.",
  },

  faq: {
    titre: "Vos questions",
    questions: [
      {
        question: "C'est plus cher que d'acheter des cartons, non ?",
        reponse:
          "À l'unité, oui. Mais un carton, il faut le commander, le payer d'avance, le ranger, le recompter et en faire des sachets logement par logement. Nos kits arrivent prêts, étiquetés, au bon nombre. Vous payez ce qui est livré, rien d'autre.",
      },
      {
        question: "Y a-t-il un abonnement ou un engagement ?",
        reponse:
          "Non. Vous payez les kits livrés, avec une facture par mois. Pour arrêter, prévenez-nous avant le dimanche : le colis suivant ne part pas.",
      },
      {
        question: "Combien coûtent les frais d'envoi ?",
        reponse:
          "15 € HT par colis jusqu'à 12 arrivées dans la semaine, 22 € HT au-delà. 0 € si vos ménages passent par Deltom Operator.",
      },
      {
        question: "Comment savez-vous quand mes voyageurs arrivent ?",
        reponse:
          "Vous collez le lien de calendrier de chaque logement, Airbnb ou Booking. Nous y lisons les dates d'arrivée. Nous n'avons accès ni aux noms des voyageurs ni à vos revenus.",
      },
      {
        question: "Et si une réservation tombe à la dernière minute ?",
        reponse: "Chaque colis contient 1 ou 2 kits d'avance. Vous ne les payez que si vous les utilisez.",
      },
      {
        question: "Et si une réservation est annulée après l'envoi ?",
        reponse: "Le kit reste chez vous comme kit d'avance. Il n'est facturé que s'il est utilisé.",
      },
      {
        question: "Mon logement accueille 6 personnes. Un kit suffit ?",
        reponse:
          "Vous indiquez une fois la capacité de chaque logement. Jusqu'à 3 voyageurs : un jeu de 3 kits. De 4 à 6 : deux jeux. 7 et plus : trois jeux.",
      },
      {
        question: "Quels produits y a-t-il dans les kits ?",
        reponse:
          "Des produits d'accueil en format individuel, emballés un par un. Le plus simple est de juger sur pièce : le kit d'essai est offert.",
      },
      {
        question: "Puis-je mettre mon logo ?",
        reponse:
          "Oui : un autocollant à votre logo sur la boîte et une carte d'accueil à votre nom. Sans engagement de durée.",
      },
      {
        question: "Vous livrez où ?",
        reponse:
          "En Île-de-France pour le moment. Le reste de la France arrive : laissez-nous votre e-mail.",
      },
    ] as Faq[],
  },

  kitEssai: {
    titre: "Jugez sur pièce : votre premier kit est offert.",
    texte:
      "Dites-nous où l'envoyer. Vous recevez les 3 kits, envoi compris, vous regardez les produits, vous décidez ensuite. Réservé aux professionnels d'Île-de-France, un kit par société.",
  },

  footer: {
    texte: "Kits d'accueil pour locations courte durée · Livraison en Île-de-France",
    liens: [
      { label: "[Contact]", href: null },
      { label: "Mentions légales", href: "/mentions-legales/" },
      { label: "CGV", href: "/cgv/" },
      { label: "English (bientôt)", href: null },
    ] as { label: string; href: string | null }[],
    navLabel: "Liens utiles",
  },

  pagesLegales: {
    mentionsLegales: { titre: "Mentions légales", contenu: "[à fournir]" },
    cgv: { titre: "CGV", contenu: "[à fournir]" },
    retour: "Retour à l'accueil",
  },

  /** Textes des formulaires (spec §10, §13, §15). */
  formulaires: {
    erreurEnvoi: "L'envoi n'a pas marché. Réessayez dans un instant.",
    envoiEnCours: "Envoi en cours…",
    erreurs: {
      obligatoire: "Ce champ est obligatoire.",
      email: "Indiquez une adresse e-mail valide.",
      nombreLogements: "Indiquez un nombre entier, au moins 1.",
    },
    pieges: { label: "Ne pas remplir ce champ" },
    essai: {
      sujet: (societe: string) => `Kit d'essai — ${societe}`,
      champs: {
        nom: "Nom",
        societe: "Société",
        nombre_logements: "Nombre de logements",
        ville: "Ville",
        email: "E-mail",
        telephone: "Téléphone (facultatif)",
      },
      bouton: "Recevoir mon kit d'essai",
      sousBouton: "Réponse sous [délai]. Sans engagement.",
      succes: "C'est noté. Nous vous écrivons sous [délai] pour confirmer l'adresse d'envoi.",
    },
    attente: {
      sujet: "Liste d'attente hors Île-de-France",
      label:
        "Livraison en Île-de-France pour le moment. Ailleurs en France : laissez-nous votre e-mail, nous vous prévenons à l'ouverture.",
      placeholder: "Votre e-mail",
      bouton: "Me prévenir",
      succes: "C'est noté, nous vous prévenons à l'ouverture.",
    },
  },
};

export type Contenu = typeof fr;
export default fr;
