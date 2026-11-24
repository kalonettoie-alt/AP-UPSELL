/**
 * Tous les textes de la page de vente SINEBOX (français).
 * Source de vérité : docs/spec-page-de-vente.md.
 * Les textes entre crochets [...] sont des informations pas encore connues :
 * ils restent tels quels.
 * Les prix sont en nombres (HT) ; le format d'affichage est dans lib/prix.ts.
 * Typographie : une espace insécable (U+00A0) précède « : ? ! ; » et suit « « ».
 */

/**
 * Adresse e-mail de contact de SINEBOX : seule source, lue partout (pied de page, contact, mentions légales,
 * CGV, page merci, données structurées). Ne jamais l'écrire en dur ailleurs.
 */
const EMAIL_CONTACT = "contact@sinebox.fr";

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

export type BlocLegal =
  | { t: "h2"; texte: string }
  | { t: "p"; texte: string; lead?: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] };

export const fr = {
  marque: "SINEBOX",
  baseline: "Kits d'accueil pour locations courte durée",

  seo: {
    titre: "Kits d'accueil Airbnb pour conciergeries, livrés chaque semaine",
    description:
      "Conciergeries d'Île-de-France : un kit d'accueil prêt à poser par arrivée, livré chaque dimanche selon vos réservations. 4,50 € HT. Kit d'essai offert.",
  },

  general: {
    ht: "HT",
    lienEvitement: "Aller au contenu",
  },

  header: {
    navLabel: "Navigation principale",
    /** Onglets du menu. Un onglet n'apparaît que si sa page existe (href non nul). */
    menu: [
      { label: "Les kits", href: null },
      { label: "Les packs", href: null },
      { label: "Conciergeries", href: "/kits-accueil-conciergerie/" },
      { label: "Tarifs", href: "/tarifs/" },
      { label: "Livraison", href: null },
      { label: "Conseils", href: null },
    ] as { label: string; href: string | null }[],
    bouton: { label: "Kit d'essai offert", href: "/kit-essai/" },
    ouvrirMenu: "Menu",
    fermerMenu: "Fermer",
  },

  hero: {
    petitTitre: "Pour les conciergeries et les hôtes · Île-de-France",
    titre: "Conciergeries : un kit d'accueil par arrivée, livré chaque semaine.",
    sousTitre:
      "Pour vos logements en location courte durée ou en location saisonnière : connectez vos calendriers Airbnb et Booking. Chaque dimanche, vous recevez un colis avec un kit de bienvenue prêt à poser pour chaque arrivée de la semaine. Plus de courses, plus de stock de consommables, plus de sachets à préparer.",
    lignePrix: "4,50 € HT par arrivée pour les 3 kits",
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
      "Acheter, stocker, compter, préparer, repartir en urgence parce qu'il manque du café. Avec SINEBOX, cette liste n'existe plus.",
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
    titre: "Le contenu des kits d'accueil : salle de bain, cuisine, entretien",
    texte:
      "Trois kits, un prix rond : votre kit de bienvenue pour chaque arrivée, en location courte durée comme en location saisonnière. Le même prix que le séjour dure 2 nuits ou 3 semaines.",
    note: "Les consommables du kit servent à démarrer le séjour. Il n'y a pas de réassort pendant le séjour.",
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
    detailTitre: "Les 6 packs en détail",
    bientot: "Ajout automatique selon la réservation : bientôt.",
  },

  vraiCalcul: {
    petitTitre: "Le vrai calcul",
    titre: "Moins cher au carton. Plus cher au total.",
    texte:
      "Oui, un carton de produits coûte moins cher à l'unité. Mais le carton n'arrive pas trié, compté et étiqueté dans vos logements. Quelqu'un le fait, et ce quelqu'un, vous le payez.",
    tableauLegende: "Comparaison : avec des cartons ou avec SINEBOX",
    colonnes: { critere: "Critère", cartons: "Avec des cartons", sinebox: "Avec SINEBOX" },
    lignes: [
      {
        critere: "Commande",
        cartons: "Vous commandez à l'avance, par grosses quantités",
        sinebox: "Rien à commander : le calendrier suffit",
      },
      {
        critere: "Paiement",
        cartons: "Vous payez tout le carton d'avance",
        sinebox: "Vous payez les kits livrés, une facture par mois",
      },
      {
        critere: "Stock",
        cartons: "Des cartons à ranger et à recompter",
        sinebox: "Aucun stock",
      },
      {
        critere: "Préparation",
        cartons: "Quelqu'un fait les sachets, logement par logement",
        sinebox: "Les kits arrivent prêts, étiquetés",
      },
      {
        critere: "Dernière minute",
        cartons: "Une course en urgence si le stock est vide",
        sinebox: "1 ou 2 kits d'avance dans chaque colis",
      },
    ],
    phraseFin:
      "Comptez le temps que votre équipe passe chaque semaine à acheter, compter et préparer. C'est ce temps-là que vous récupérez.",
    bouton: { label: "Recevoir mon kit d'essai", href: "#essai" },
  },

  livraison: {
    titre: "Livraison des kits en Île-de-France",
    cartes: [
      {
        icone: "maison" as const,
        couleur: "bleu" as Pastel,
        pastille: "0 € de livraison",
        titre: "Compatible avec Deltom Operator",
        texte:
          "Vos ménages passent par Deltom Operator ? Vos kits sont remis à Deltom Operator et arrivent dans le logement avec le ménage. Pas de colis à réceptionner, pas de frais de livraison.",
      },
      {
        icone: "colis" as const,
        couleur: "peche" as Pastel,
        pastille: "Dès 15 € HT le colis",
        titre: "Par colis, chaque dimanche",
        texte:
          "Un seul colis par semaine, livré à votre bureau ou dans un logement. 15 € HT par colis jusqu'à 12 arrivées dans la semaine, 22 € HT au-delà.",
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
    titre: "Questions fréquentes sur les kits d'accueil",
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
          "15 € HT par colis jusqu'à 12 arrivées dans la semaine, 22 € HT au-delà. 0 € si vos ménages passent par Deltom Operator.",
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

  /** Coordonnées réelles. */
  coordonnees: {
    /** Adresse e-mail de contact (voir EMAIL_CONTACT en haut du fichier). Pas de téléphone publié. */
    email: EMAIL_CONTACT,
    zone: "Île-de-France",
    horaires: "[horaires]",
  },

  footer: {
    texte: "Kits d'accueil pour locations courte durée · Livraison en Île-de-France",
    navLabel: "Plan du site",
    /** 4 colonnes. Liens null = page pas encore créée (non affichés). */
    colonnes: [
      {
        titre: "Les kits et packs",
        liens: [
          { label: "Les kits", href: "/#kits" },
          { label: "Les packs", href: "/#packs" },
          { label: "Kit d'essai offert", href: "/kit-essai/" },
        ],
      },
      {
        titre: "Pour qui",
        liens: [{ label: "Conciergeries", href: "/kits-accueil-conciergerie/" }],
      },
      {
        titre: "Livraison et tarifs",
        liens: [
          { label: "Tarifs", href: "/tarifs/" },
          { label: "Livraison", href: "/#livraison" },
        ],
      },
      {
        titre: "L'entreprise",
        avecCoordonnees: true,
        liens: [
          { label: "À propos", href: "/a-propos/" },
          { label: "Contact", href: "/contact/" },
          { label: "Mentions légales", href: "/mentions-legales/" },
          { label: "CGV", href: "/cgv/" },
        ],
      },
    ] as { titre: string; avecCoordonnees?: boolean; liens: { label: string; href: string }[] }[],
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
            "Le site [www.sinebox.fr](https://www.sinebox.fr) est édité par SINEBOX, société en cours de création, représentée par ses fondateurs :",
        },
        {
          t: "ul",
          items: [
            "Armand Auclair",
            "Perrine Gozzi",
            "Adresse : 21 bis avenue du Maréchal de Lattre de Tassigny, 94000 Créteil",
            `E-mail : ${EMAIL_CONTACT}`,
          ],
        },
        { t: "p", texte: "Directeur de la publication : Armand Auclair." },
        {
          t: "p",
          texte:
            "Dès l'immatriculation de la société, cette rubrique sera complétée par : forme et capital, siège social, numéro RCS / SIREN, numéro de TVA intracommunautaire.",
        },
        { t: "h2", texte: "Hébergeur" },
        {
          t: "p",
          texte:
            "Le site est hébergé par : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com [Adresse à vérifier sur le site de Vercel au moment de la mise en ligne.]",
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
          lead: "Responsables du traitement :",
          texte:
            `Armand Auclair et Perrine Gozzi, fondateurs de SINEBOX (société en cours de création), joignables à ${EMAIL_CONTACT}. La société SINEBOX deviendra responsable du traitement dès son immatriculation.`,
        },
        {
          t: "p",
          lead: "Données collectées :",
          texte:
            "par les formulaires du site (kit d'essai, liste d'attente, contact) : nom, société, nombre de logements, ville, adresse e-mail, téléphone (facultatif), origine de la visite, message.",
        },
        {
          t: "p",
          lead: "Pourquoi :",
          texte:
            "répondre à votre demande, vous envoyer un kit d'essai, vous prévenir de l'ouverture de la livraison dans votre zone, et vous proposer nos services. La base légale est votre demande (mesures précontractuelles) et notre intérêt légitime à prospecter des professionnels.",
        },
        {
          t: "p",
          lead: "Durée de conservation :",
          texte:
            "3 ans après notre dernier échange, sauf si vous devenez client (durée du contrat, puis durées légales de conservation des documents comptables).",
        },
        {
          t: "p",
          lead: "Destinataires :",
          texte:
            "l'équipe de SINEBOX uniquement. Les formulaires sont transmis par notre prestataire Formspree (États-Unis), et le site est hébergé par Vercel (États-Unis). Ces transferts hors de l'Union européenne sont encadrés par [les clauses contractuelles types de la Commission européenne / le cadre de protection des données UE–États-Unis — à vérifier pour chaque prestataire].",
        },
        {
          t: "p",
          lead: "Vos droits :",
          texte:
            `vous pouvez accéder à vos données, les faire corriger ou supprimer, vous opposer à leur utilisation ou en limiter l'usage, en écrivant à ${EMAIL_CONTACT}. Vous pouvez aussi déposer une réclamation auprès de la CNIL ([www.cnil.fr](https://www.cnil.fr)).`,
        },
        { t: "h2", texte: "Cookies" },
        {
          t: "p",
          texte:
            "Ce site ne dépose aucun cookie et n'utilise aucun outil de suivi publicitaire. [À mettre à jour si un outil de mesure d'audience est ajouté.]",
        },
      ] as BlocLegal[],
    },
    cgv: {
      titre: "Conditions générales de vente",
      titreGoogle: "Conditions générales de vente | SINEBOX",
      description: "Conditions générales de vente de SINEBOX : commande, prix, livraison, facturation, réclamations et arrêt du service.",
      sommaire: "Sommaire",
      blocs: [
        {
          t: "p",
          texte:
            "En vigueur au [date]. Ces conditions s'appliquent à toutes les ventes de [SINEBOX] et prévalent sur tout autre document du client, sauf accord écrit contraire.",
        },
        { t: "h2", texte: "1. Qui peut commander" },
        {
          t: "p",
          texte:
            "Nos services sont réservés aux professionnels : conciergeries, gestionnaires de locations courte durée, hôtes agissant dans le cadre de leur activité professionnelle. Ils ne sont pas proposés aux consommateurs.",
        },
        { t: "h2", texte: "2. Ce que nous vendons" },
        { t: "p", texte: "[SINEBOX] prépare et livre des kits de produits d'accueil pour locations courte durée :" },
        {
          t: "ul",
          items: [
            "Kit Salle de bain, Kit Cuisine, Kit Entretien, vendus à l'unité ou ensemble (« Les 3 kits ») ;",
            "des packs en complément (par exemple Chien, Chat, Couple, Voyage d'affaires, Première visite, Noël).",
          ],
        },
        {
          t: "p",
          texte:
            "Le contenu de chaque kit et de chaque pack est décrit sur le site. Si un produit n'est plus disponible, nous pouvons le remplacer par un produit équivalent, de même usage et de qualité au moins égale, sans changement de prix.",
        },
        {
          t: "p",
          texte:
            "Le kit sert à démarrer un séjour. Il n'y a pas de réassort pendant le séjour, sauf commande d'un pack prévu à cet effet.",
        },
        { t: "h2", texte: "3. Fonctionnement de la commande" },
        {
          t: "ol",
          items: [
            "Le client nous communique le lien de calendrier de chaque logement et sa capacité d'accueil.",
            "À partir des dates d'arrivée, nous préparons chaque semaine un kit par arrivée prévue, étiqueté avec le nom du logement et la date d'arrivée.",
            "Nombre de jeux de kits par arrivée selon la capacité du logement : jusqu'à 3 voyageurs, un jeu ; de 4 à 6 voyageurs, deux jeux ; 7 voyageurs et plus, trois jeux.",
            "Le client peut ajouter un pack pour un logement, pour une période ou pour une réservation, au plus tard [jour et heure limite] pour la livraison suivante.",
          ],
        },
        {
          t: "p",
          texte:
            "Le client reste responsable de l'exactitude des informations qu'il nous transmet (calendriers, capacités, adresse de livraison).",
        },
        { t: "h2", texte: "4. Prix" },
        { t: "p", texte: "Les prix sont indiqués hors taxes (HT). La TVA au taux en vigueur s'ajoute." },
        {
          t: "ul",
          items: [
            "1,50 € HT par kit, 4,50 € HT les 3 kits, par arrivée ;",
            "prix des packs : selon la grille du site au jour de la livraison ;",
            "frais d'envoi : 15 € HT par colis jusqu'à 12 arrivées dans la semaine, 22 € HT au-delà ;",
            "aucuns frais d'envoi lorsque les kits sont remis à Deltom Operator pour les clients qui utilisent ce service.",
          ],
        },
        {
          t: "p",
          texte: "Nous pouvons modifier nos prix. Le client en est informé par e-mail au moins [30] jours avant leur application.",
        },
        { t: "h2", texte: "5. Livraison" },
        {
          t: "ul",
          items: [
            "Zone : Île-de-France.",
            "Un colis par semaine, livré le [dimanche], à l'adresse indiquée par le client (bureau ou logement).",
            "Pour les clients de Deltom Operator : les kits sont remis à Deltom Operator, qui les dépose dans le logement lors du ménage.",
            "Chaque colis contient 1 ou 2 kits d'avance pour les réservations de dernière minute.",
          ],
        },
        {
          t: "p",
          texte:
            "Le transfert des risques a lieu à la remise du colis au client ou à Deltom Operator. Un retard de livraison ne donne pas droit à une indemnité, sauf faute grave de notre part.",
        },
        { t: "h2", texte: "6. Kits d'avance et réservations annulées" },
        {
          t: "ul",
          items: [
            "Les kits d'avance ne sont facturés que s'ils sont utilisés.",
            "Si une réservation est annulée après l'envoi du colis, le kit reste chez le client comme kit d'avance et n'est facturé que s'il est utilisé.",
            "[Les kits d'avance non utilisés au moment de l'arrêt du service sont : restitués / facturés / laissés au client — à décider.]",
          ],
        },
        { t: "h2", texte: "7. Facturation et paiement" },
        {
          t: "ul",
          items: [
            "Une facture par mois, établie au début du mois suivant, pour les kits et packs utilisés et les frais d'envoi du mois.",
            "Paiement à [30] jours à compter de la date de la facture, par [virement / prélèvement].",
            "En cas de retard de paiement : pénalités au taux de trois fois le taux d'intérêt légal, et indemnité forfaitaire de 40 € pour frais de recouvrement (article L441-10 du Code de commerce). Nous pouvons aussi suspendre les livraisons jusqu'au paiement.",
          ],
        },
        { t: "h2", texte: "8. Réclamations" },
        {
          t: "p",
          texte:
            `Le client vérifie le colis à sa réception. Un produit manquant, abîmé ou non conforme doit nous être signalé par e-mail à ${EMAIL_CONTACT} dans les [48 heures], avec une photo. Nous remplaçons alors le produit dans le colis suivant, ou nous ne le facturons pas.`,
        },
        { t: "h2", texte: "9. Produits et responsabilité" },
        {
          t: "p",
          texte:
            "Les produits sont fournis dans leur emballage d'origine, avec l'étiquetage de leur fabricant (composition, précautions d'emploi, dates). [SINEBOX] n'est pas le fabricant des produits.",
        },
        {
          t: "p",
          texte:
            "Le client informe ses voyageurs, si besoin, de la présence de produits alimentaires ou cosmétiques dans le logement. [SINEBOX] ne peut pas être tenue responsable d'une allergie ou d'une mauvaise utilisation d'un produit dont la composition figure sur l'emballage.",
        },
        { t: "p", texte: "Notre responsabilité est limitée au montant facturé au client sur les trois derniers mois." },
        { t: "h2", texte: "10. Personnalisation à votre marque" },
        {
          t: "p",
          texte:
            "Le client qui demande un autocollant à son logo et une carte d'accueil à son nom nous fournit les fichiers nécessaires. Il garantit qu'il a le droit d'utiliser ce logo et ces textes. Les produits gardent leur emballage d'origine.",
        },
        { t: "h2", texte: "11. Kit d'essai" },
        {
          t: "p",
          texte:
            "Le kit d'essai est offert, envoi compris, aux professionnels d'Île-de-France, à raison d'un kit par société. Il ne vaut pas engagement de commander.",
        },
        { t: "h2", texte: "12. Durée et arrêt du service" },
        {
          t: "p",
          texte:
            "Le service est sans engagement de durée. Le client peut l'arrêter à tout moment, par e-mail, avant le [samedi midi] : le colis suivant n'est alors pas envoyé. Les kits déjà livrés et utilisés restent dus.",
        },
        { t: "p", texte: "Nous pouvons arrêter le service avec un préavis de [30] jours, ou sans préavis en cas de non-paiement." },
        { t: "h2", texte: "13. Force majeure" },
        {
          t: "p",
          texte:
            "Aucune des parties n'est responsable d'un retard ou d'un manquement dû à un événement de force majeure au sens de l'article 1218 du Code civil.",
        },
        { t: "h2", texte: "14. Données personnelles" },
        {
          t: "p",
          texte:
            "Le traitement des données du client est décrit dans les mentions légales du site, rubrique « Données personnelles ».",
        },
        { t: "h2", texte: "15. Droit applicable et litiges" },
        {
          t: "p",
          texte:
            "Ces conditions sont soumises au droit français. En cas de litige, les parties cherchent d'abord une solution amiable. À défaut, le tribunal compétent est celui du ressort du siège de [SINEBOX].",
        },
      ] as BlocLegal[],
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
    },
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
    attente: {
      sujet: "Liste d'attente hors Île-de-France",
      label:
        "Livraison en Île-de-France pour le moment. Ailleurs en France : laissez-nous votre e-mail, nous vous prévenons à l'ouverture.",
      placeholder: "Votre e-mail",
      bouton: "Me prévenir",
      succes: "C'est noté, nous vous prévenons à l'ouverture.",
    },
    contact: {
      sujet: (nom: string) => `Contact — ${nom}`,
      sujetSansJs: "Contact",
      champs: { nom: "Nom", email: "E-mail", message: "Message" },
      bouton: "Envoyer le message",
      sousBouton: "Réponse sous 24 h ouvrées.",
      succes: "C'est noté. Nous vous répondons sous 24 h ouvrées.",
    },
  },

  /** Éléments communs aux pages intérieures. */
  modele: {
    filAriane: "Fil d'Ariane",
    accueil: "Accueil",
    aLireAussi: "À lire aussi",
    cta: {
      titre: "Le kit d'essai est offert, envoi compris.",
      texte: "Les 3 kits, à l'adresse de votre choix en Île-de-France. Un kit par société.",
      bouton: { label: "Recevoir mon kit d'essai", href: "/kit-essai/" },
    },
  },

  /** Liens « À lire aussi » : une courte présentation de chaque page. */
  liensPages: {
    accueil: { titre: "Comment ça marche", texte: "Les 3 étapes, le contenu des kits et les packs.", href: "/" },
    conciergerie: {
      titre: "Kits d'accueil pour conciergeries",
      texte: "Comment SINEBOX s'intègre au travail d'une conciergerie, avec un exemple chiffré.",
      href: "/kits-accueil-conciergerie/",
    },
    tarifs: { titre: "Tous nos prix", texte: "Kits, packs, frais d'envoi et calculateur de coût mensuel.", href: "/tarifs/" },
    kitEssai: { titre: "Le kit d'essai offert", texte: "Recevez les 3 kits pour juger sur pièce.", href: "/kit-essai/" },
    contact: { titre: "Nous contacter", texte: "E-mail et formulaire.", href: "/contact/" },
    aPropos: { titre: "Qui sommes-nous", texte: "L'équipe et la préparation des kits.", href: "/a-propos/" },
  },

  pages: {
    kitEssai: {
      titreGoogle: "Kit d'essai offert | SINEBOX",
      description:
        "Recevez gratuitement les 3 kits d'accueil SINEBOX, envoi compris. Réservé aux professionnels d'Île-de-France, un kit par société. Réponse sous 24 h ouvrées.",
      titre: "Recevez votre kit d'essai offert",
      texte:
        "Les 3 kits (salle de bain, cuisine, entretien), envoyés gratuitement à l'adresse de votre choix en Île-de-France. Un kit par société, réservé aux professionnels.",
      retour: "Retour à l'accueil",
    },
    merci: {
      titreGoogle: "Merci | SINEBOX",
      titre: "C'est noté.",
      texte: "Nous vous écrivons sous 24 h ouvrées pour confirmer l'adresse d'envoi.",
      /** Suivi de l'adresse e-mail de contact, en lien. */
      question: "Une question d'ici là ? Écrivez à",
      liens: [
        { label: "Voir tous nos prix", href: "/tarifs/" },
        { label: "Retour à l'accueil", href: "/" },
      ],
    },
    conciergerie: {
      fil: "Conciergeries",
      titreGoogle: "Kits d'accueil pour conciergerie Airbnb : fournisseur sans stock",
      description:
        "Conciergeries d'Île-de-France : des kits d'accueil livrés chaque dimanche selon vos calendriers Airbnb et Booking, étiquetés par logement et par jour. Une facture par mois.",
      titre: "Le fournisseur de kits d'accueil des conciergeries, sans stock ni carton",
      intro:
        "Vous gérez des logements pour leurs propriétaires. À chaque arrivée, il faut du savon, du café, du papier toilette. SINEBOX prépare ces kits pour vous et les livre chaque semaine, au bon nombre.",
      sections: [
        {
          titre: "Le problème : des produits à gérer pour chaque logement",
          paragraphes: [
            "Sans fournisseur dédié, quelqu'un dans l'équipe achète les produits, les stocke, les recompte et prépare des sachets logement par logement. Quand le stock est vide un samedi, il faut repartir en course.",
            "Plus le nombre de logements augmente, plus ce travail prend de place dans la semaine.",
          ],
        },
        {
          titre: "Comment ça marche, en 3 étapes",
          etapes: [
            "Vous collez le lien de calendrier de chaque logement, Airbnb ou Booking, et vous indiquez une fois sa capacité. Nous lisons les dates d'arrivée, rien d'autre.",
            "Chaque dimanche, un seul colis part avec un kit par arrivée de la semaine.",
            "Votre équipe de ménage pose le bon kit dans le bon logement.",
          ],
        },
        {
          titre: "Une étiquette par logement et par jour",
          paragraphes: [
            "Chaque kit porte le nom du logement et la date d'arrivée. Chaque jour de la semaine a sa couleur : l'équipe de ménage voit d'un coup d'œil quel kit va où, même quand plusieurs arrivées tombent le même jour.",
          ],
        },
        {
          titre: "Une facture par mois, sans engagement",
          paragraphes: [
            "Vous payez les kits livrés, avec une seule facture par mois. Il n'y a pas d'abonnement : pour arrêter, prévenez-nous avant le dimanche et le colis suivant ne part pas.",
          ],
        },
        {
          titre: "Des kits d'avance pour la dernière minute",
          paragraphes: [
            "Chaque colis contient 1 ou 2 kits d'avance. Une réservation tombe le vendredi pour le soir même ? Le kit est déjà là.",
            "Un kit d'avance n'est facturé que s'il est utilisé. Si une réservation est annulée après l'envoi, son kit reste chez vous comme kit d'avance.",
          ],
        },
        {
          titre: "Le logo de votre conciergerie sur chaque kit",
          paragraphes: [
            "Un autocollant à votre logo sur la boîte et une carte d'accueil au nom de votre conciergerie : le voyageur voit votre nom, pas le nôtre. Les produits restent dans leur emballage d'origine.",
          ],
        },
      ],
      exemple: {
        titre: "Exemple chiffré : 100, 500 et 2 000 arrivées par mois",
        hypothese:
          "Hypothèse : logements jusqu'à 3 voyageurs (un jeu de 3 kits par arrivée), sans pack, 4 semaines par mois, arrivées réparties également, un colis par semaine. Les kits d'avance ne sont pas comptés : ils ne sont facturés que s'ils sont utilisés.",
        legende: "Coût mensuel estimé selon le nombre d'arrivées",
        colonnes: {
          arrivees: "Arrivées par mois",
          parSemaine: "Arrivées par semaine",
          kits: "Kits (4,50 € HT par arrivée)",
          colis: "Envoi par colis (4 colis)",
          totalColis: "Total par colis",
          totalDeltom: "Total compatible avec Deltom Operator",
        },
        arrivees: [100, 500, 2000],
        note: "Montants HT, hors packs. Avec Deltom Operator, les kits sont remis à Deltom Operator : 0 € de livraison.",
      },
      deltom: {
        titre: "Compatible avec Deltom Operator",
        texte:
          "Si vos ménages passent par Deltom Operator, vos kits sont remis à Deltom Operator et arrivent dans le logement avec le ménage. Vous n'avez pas de colis à réceptionner, et la livraison est à 0 €.",
      },
      faqTitre: "Questions des conciergeries",
      faq: [
        {
          question: "Comment savez-vous combien de kits envoyer chaque semaine ?",
          reponse:
            "À partir des dates d'arrivée lues dans le calendrier de chaque logement, et de la capacité que vous avez indiquée : un jeu de 3 kits jusqu'à 3 voyageurs, deux jeux de 4 à 6, trois jeux à partir de 7.",
        },
        {
          question: "Comment l'équipe de ménage sait-elle quel kit poser dans quel logement ?",
          reponse:
            "Chaque kit porte une étiquette avec le nom du logement et la date d'arrivée, dans la couleur du jour. Il suffit de prendre le kit du jour qui porte le nom du logement.",
        },
        {
          question: "Comment la conciergerie est-elle facturée ?",
          reponse:
            "Une facture par mois, pour les kits livrés et les frais d'envoi. Les kits d'avance ne sont facturés que s'ils sont utilisés. Il n'y a ni abonnement ni engagement de durée.",
        },
        {
          question: "Les voyageurs voient-ils le nom SINEBOX ?",
          reponse:
            "Non, si vous le souhaitez : la boîte porte un autocollant à votre logo et la carte d'accueil est à votre nom. Les produits gardent leur emballage d'origine.",
        },
        {
          question: "Nos ménages passent par Deltom Operator : comment sont livrés les kits ?",
          reponse:
            "Vos kits sont remis à Deltom Operator et arrivent dans le logement avec le ménage. La livraison est alors à 0 €.",
        },
      ] as Faq[],
      aLireAussi: ["tarifs", "kitEssai", "accueil"] as const,
    },
    tarifs: {
      fil: "Tarifs",
      titreGoogle: "Prix des kits d'accueil Airbnb : 4,50 € HT par arrivée",
      description:
        "Tous les prix SINEBOX en HT : 4,50 € les 3 kits par arrivée, packs de 7,50 € à 21,50 €, envoi 15 € ou 22 € par colis, 0 € avec Deltom Operator. Calculez votre coût par mois.",
      titre: "Tous nos prix, sans surprise",
      intro:
        "Tous les prix sont hors taxes. Vous payez les kits livrés, avec une facture par mois, sans engagement.",
      kits: {
        titre: "Les kits",
        legende: "Prix des kits",
        colonnes: { nom: "Kit", contenu: "Contenu", prix: "Prix HT par arrivée" },
      },
      packs: {
        titre: "Les packs",
        legende: "Prix des packs",
        colonnes: { nom: "Pack", contenu: "Contenu", prix: "Prix HT" },
        note: "Un pack n'est facturé que pour les arrivées où vous l'ajoutez.",
      },
      envoi: {
        titre: "Les frais d'envoi",
        legende: "Frais d'envoi",
        colonnes: { mode: "Mode de livraison", prix: "Prix HT" },
        lignes: [
          { mode: "Par colis, jusqu'à 12 arrivées dans la semaine", prix: 15 },
          { mode: "Par colis, au-delà de 12 arrivées dans la semaine", prix: 22 },
          { mode: "Compatible avec Deltom Operator : kits remis à Deltom Operator", prix: 0 },
        ],
        note: "Un seul colis par semaine, livré le dimanche à votre bureau ou dans un logement.",
      },
      facturation: {
        titre: "Facturation",
        points: [
          "Une facture par mois, pour les kits livrés et les frais d'envoi.",
          "Les kits d'avance ne sont facturés que s'ils sont utilisés.",
          "Sans engagement : prévenez-nous avant le dimanche pour arrêter, le colis suivant ne part pas.",
        ],
      },
      calculateur: {
        titre: "Estimez votre coût mensuel",
        arrivees: "Arrivées par mois",
        taille: "Taille des logements",
        tailles: [
          { jeux: 1, label: "Jusqu'à 3 voyageurs (1 jeu)" },
          { jeux: 2, label: "De 4 à 6 voyageurs (2 jeux)" },
          { jeux: 3, label: "7 voyageurs et plus (3 jeux)" },
        ],
        livraison: "Mode de livraison",
        modes: { colis: "Par colis, chaque dimanche", deltom: "Compatible avec Deltom Operator" },
        resultat: "Coût estimé par mois, livraison comprise",
        detailKits: "Kits",
        detailEnvoi: "Envoi",
        hypothese: "Calcul sur 4 semaines par mois, arrivées réparties également.",
        estimation: "Estimation, hors packs.",
        arriveesParDefaut: 40,
      },
      aLireAussi: ["conciergerie", "kitEssai", "contact"] as const,
    },
    contact: {
      fil: "Contact",
      titreGoogle: "Contact | SINEBOX",
      description:
        `Contactez SINEBOX par e-mail à ${EMAIL_CONTACT} ou par le formulaire. Kits d'accueil livrés en Île-de-France.`,
      titre: "Nous contacter",
      coordonnees: {
        titre: "Nos coordonnées",
        email: "E-mail",
        horaires: "Horaires",
        zone: "Zone livrée",
        zoneTexte: "Île-de-France pour le moment.",
        zoneLien: { label: "Ailleurs en France : rejoindre la liste d'attente", href: "/#livraison" },
      },
      formulaireTitre: "Écrivez-nous",
      aLireAussi: ["kitEssai", "tarifs", "aPropos"] as const,
    },
    aPropos: {
      fil: "À propos",
      titreGoogle: "À propos de SINEBOX, kits d'accueil en Île-de-France",
      description:
        "SINEBOX est une petite équipe francilienne qui prépare et livre chaque semaine des kits d'accueil pour les conciergeries et les hôtes.",
      titre: "Qui sommes-nous",
      sections: [
        {
          titre: "Une petite équipe francilienne",
          paragraphes: ["SINEBOX est une petite équipe basée en Île-de-France : [prénoms de l'équipe]."],
          photo: "[photo de l'équipe]",
        },
        {
          titre: "Pourquoi ce service",
          paragraphes: [
            "Dans une conciergerie, préparer les produits d'accueil revient chaque semaine : acheter, stocker, compter, faire des sachets, logement par logement.",
            "Nous avons créé SINEBOX pour sortir ce travail de votre semaine : vous connectez vos calendriers, les kits arrivent prêts et étiquetés.",
          ],
        },
        {
          titre: "Où sont préparés les kits",
          paragraphes: ["Les kits sont préparés [lieu de préparation des kits], puis livrés chaque dimanche en Île-de-France."],
        },
        {
          titre: "D'où viennent les produits",
          paragraphes: [
            "[origine des produits]. Ce sont des produits en format individuel, emballés un par un, qui gardent leur emballage d'origine.",
          ],
        },
      ],
      aLireAussi: ["conciergerie", "contact", "kitEssai"] as const,
    },
    introuvable: {
      titreGoogle: "Page introuvable | SINEBOX",
      titre: "Cette page n'existe pas (ou plus).",
      texte: "L'adresse est peut-être mal tapée, ou la page a changé de place. Voici où trouver l'essentiel :",
      liens: ["accueil", "conciergerie", "tarifs", "kitEssai", "contact"] as const,
    },
  },
};

export type Contenu = typeof fr;
export default fr;
