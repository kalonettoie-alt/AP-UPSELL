/**
 * Questions de la page FAQ (textes de la maquette V2). La page et les données FAQPage lisent cette liste :
 * le texte est donc identique des deux côtés.
 */
import { formatPrix } from "@/lib/prix";
import { delais, prix, prixPack } from "./fr";

export type GroupeFaq = { titre: string; ancre: string; questions: { question: string; reponse: string }[] };

export const groupesFaq: GroupeFaq[] = [
  {
    titre: "Commande et livraison",
    ancre: "commande-livraison",
    questions: [
      { question: "Comment savez-vous quand mes voyageurs arrivent ?", reponse: "Vous nous envoyez le lien de calendrier de chaque logement, Airbnb ou Booking, par e-mail ou pendant l'appel. Nous y lisons les dates d'arrivée, sans accès aux noms des voyageurs ni à vos revenus. La connexion à votre logiciel de gestion arrive bientôt." },
      { question: "Quand arrive le colis ?", reponse: "Chaque dimanche, avec les kits de la semaine qui vient. Une semaine sans arrivée : pas de colis." },
      { question: "Vous livrez où ?", reponse: "En Île-de-France pour le moment : 75, 77, 78, 91, 92, 93, 94 et 95. Le reste de la France arrive : laissez-nous votre e-mail." },
      { question: "Et si une réservation tombe à la dernière minute ?", reponse: "Chaque colis contient 1 ou 2 kits d'avance. Vous ne les payez que si vous les utilisez." },
      { question: "Et si une réservation est annulée après l'envoi ?", reponse: "Le kit reste chez vous comme kit d'avance. Il n'est facturé que s'il est utilisé." },
    ],
  },
  {
    titre: "Les kits et les packs",
    ancre: "kits-packs",
    questions: [
      { question: "Quels produits y a-t-il dans les kits ?", reponse: "Des produits d'accueil en format individuel, emballés un par un. Le détail de chaque kit est sur la page Les kits. Le plus simple est de juger sur pièce : le kit d'essai est offert." },
      { question: "Mon logement accueille 6 personnes. Un kit suffit ?", reponse: "Vous indiquez une fois la capacité de chaque logement. Jusqu'à 3 voyageurs : un jeu de 3 kits. De 4 à 6 : deux jeux. 7 et plus : trois jeux." },
      { question: "Comment ajouter un pack ?", reponse: "Vous choisissez le pack pour l'arrivée qui vous intéresse. L'ajout automatique selon le profil du voyageur arrive bientôt." },
    ],
  },
  {
    titre: "Prix et facturation",
    ancre: "prix",
    questions: [
      { question: "C'est plus cher que d'acheter des cartons, non ?", reponse: "À l'unité, oui. Mais un carton, il faut le commander, le payer d'avance, le ranger, le recompter et en faire des sachets logement par logement. Nos kits arrivent prêts, étiquetés, au bon nombre. Vous payez ce qui est livré, rien d'autre." },
      { question: "Y a-t-il un abonnement ou un engagement ?", reponse: "Non. Vous payez les kits livrés, avec une facture par mois. Pour arrêter, prévenez-nous avant le dimanche : le colis suivant ne part pas." },
      { question: "Combien coûtent les frais d'envoi ?", reponse: formatPrix(prix.colisJusqua12) + " HT par colis jusqu'à 12 arrivées dans la semaine, " + formatPrix(prix.colisAuDela) + " HT au-delà. " + formatPrix(prix.livraisonDeltom) + " si vos kits sont remis à Deltom Operator." },
    ],
  },
  {
    titre: "Votre marque",
    ancre: "marque",
    questions: [
      { question: "Puis-je mettre mon logo ?", reponse: "Oui : votre logo sur l'étiquette et une carte d'accueil à votre nom. Sans engagement de durée." },
      { question: "Je vois une maquette avant ?", reponse: "Oui. Vous nous envoyez votre logo, nous vous renvoyons une maquette de l'étiquette. Vous validez avant toute impression." },
    ],
  },
  {
    titre: "Compatibilités",
    ancre: "compatibilites",
    questions: [
      { question: "Ça marche avec Airbnb et Booking ?", reponse: "Oui, avec le lien de calendrier de chaque logement." },
      { question: "Et avec mon logiciel de gestion ?", reponse: "La connexion directe aux logiciels de gestion arrive bientôt. En attendant, le lien de calendrier suffit." },
      { question: "Mes ménages passent par Deltom Operator.", reponse: "SINEBOX est compatible avec Deltom Operator : vos kits sont remis à Deltom Operator et arrivent dans le logement avec le ménage. Livraison " + formatPrix(prix.livraisonDeltom) + "." },
    ],
  },
];
