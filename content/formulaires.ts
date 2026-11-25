/**
 * Champs des formulaires (textes de la maquette V2, champs complétés par le fichier .md).
 * Décisions : pas de LinkedIn dans « Comment nous avez-vous connus ? » ; pas d'envoi de fichier
 * (l'offre gratuite de Formspree ne le permet pas) : le logo s'envoie par e-mail.
 */
import type { Champ } from "@/components/v2/FormulaireV2";
import fr from "./fr";

const lienConfidentialite = { label: "Politique de confidentialité", href: "/mentions-legales/#donnees-personnelles" };
const consentement: Champ = {
  nom: "consentement",
  type: "consentement",
  label: "J'accepte que SINEBOX utilise ces informations pour traiter ma demande et me recontacter.",
  lien: lienConfidentialite,
};

/** Kit d'essai : trois étapes (maquette), « Vous », « Votre activité », « Livraison ». */
export const etapesEssai: { nom: string; champs: Champ[] }[] = [
  {
    nom: "Vous",
    champs: [
      { nom: "nom", label: "Prénom et nom", type: "text", requis: true, autoComplete: "name" },
      { nom: "email", label: "E-mail professionnel", type: "email", requis: true, autoComplete: "email" },
      { nom: "telephone", label: "Téléphone", type: "tel", requis: true, autoComplete: "tel", aide: "Pour vous appeler après la réception du kit." },
    ],
  },
  {
    nom: "Votre activité",
    champs: [
      { nom: "societe", label: "Société", type: "text", requis: true, autoComplete: "organization" },
      { nom: "profil", label: "Vous êtes", type: "select", requis: true, options: ["Conciergerie", "Hôte avec plusieurs logements", "Autre"] },
      { nom: "nombre_logements", label: "Nombre de logements gérés", type: "number", requis: true },
      { nom: "ville", label: "Ville principale de vos logements", type: "text", requis: true },
      { nom: "logiciel", label: "Logiciel de gestion utilisé", type: "text", facultatif: "(facultatif)" },
      { nom: "deltom_operator", label: "Vos ménages passent par Deltom Operator ?", type: "select", options: ["Oui", "Non", "Je ne sais pas"] },
      {
        nom: "connu_par",
        label: "Comment nous avez-vous connus ?",
        type: "select",
        requis: true,
        options: ["Google", "Facebook", "Bouche-à-oreille", "Deltom Operator", "Salon ou événement", "Autre"],
      },
    ],
  },
  {
    nom: "Livraison",
    champs: [
      { nom: "adresse", label: "Adresse", type: "text", requis: true, autoComplete: "street-address" },
      { nom: "code_postal", label: "Code postal", type: "codePostal", requis: true, autoComplete: "postal-code", aide: "Île-de-France : 75, 77, 78, 91, 92, 93, 94 ou 95." },
      { nom: "ville_livraison", label: "Ville", type: "text", requis: true, autoComplete: "address-level2" },
      { nom: "instructions", label: "Instructions de livraison", type: "text", facultatif: "(facultatif)", aide: "Digicode, étage, horaires." },
      consentement,
    ],
  },
];

/** Réserver un appel (champs du fichier .md : la maquette n'a qu'un exemple de créneaux). */
export const champsAppel: Champ[] = [
  { nom: "nom", label: "Prénom et nom", type: "text", requis: true, autoComplete: "name" },
  { nom: "societe", label: "Société", type: "text", requis: true, autoComplete: "organization" },
  { nom: "telephone", label: "Téléphone", type: "tel", requis: true, autoComplete: "tel" },
  { nom: "email", label: "E-mail", type: "email", requis: true, autoComplete: "email" },
  { nom: "nombre_logements", label: "Nombre de logements gérés", type: "number", facultatif: "(facultatif)" },
  { nom: "jours", label: "Jours qui vous arrangent", type: "cases", options: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"], large: true },
  { nom: "moment", label: "Moment préféré", type: "select", requis: true, options: ["Matin", "Midi", "Fin de journée"] },
  { nom: "question", label: "Votre question, si vous en avez une", type: "textarea", facultatif: "(facultatif)", large: true },
  consentement,
];

/** Recevoir une maquette à mon logo (textes de la maquette, logo par e-mail). */
export const champsMaquette: Champ[] = [
  { nom: "societe", label: "Nom de la conciergerie", type: "text", requis: true, autoComplete: "organization" },
  { nom: "email", label: "E-mail professionnel", type: "email", requis: true, autoComplete: "email" },
  {
    nom: "note_logo",
    type: "note",
    texte: `Votre logo : envoyez-le à ${fr.coordonnees.email} (PNG, SVG ou PDF), en indiquant le nom de votre conciergerie.`,
  },
  { nom: "petit_mot", label: "Votre petit mot pour le voyageur", type: "text", facultatif: "(facultatif)", large: true },
];

/** Liste d'attente hors Île-de-France (page livraison, ancre #ailleurs). */
export const champsAilleurs: Champ[] = [
  { nom: "email", label: "E-mail", type: "email", requis: true, autoComplete: "email" },
  { nom: "ville", label: "Ville", type: "text", requis: true, autoComplete: "address-level2" },
];

/** Liste d'attente des nouveautés (page compatibilités). */
export const champsNouveautes: Champ[] = [{ nom: "email", label: "E-mail", type: "email", requis: true, autoComplete: "email" }];
