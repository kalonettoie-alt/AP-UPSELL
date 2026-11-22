import { prix } from "@/content/fr";
import { additionner } from "./prix";

/** Nombre de semaines par mois retenu pour les estimations. */
export const SEMAINES_PAR_MOIS = 4;
/** Seuil d'arrivées par semaine au-delà duquel le colis passe à 22 € HT. */
export const SEUIL_ARRIVEES_SEMAINE = 12;

export type Livraison = "colis" | "deltom";

export type Estimation = {
  arriveesParSemaine: number;
  kits: number;
  envoi: number;
  total: number;
};

/**
 * Coût mensuel estimé, livraison comprise, hors packs.
 * Hypothèses : 4 semaines par mois, arrivées réparties également, un colis par semaine.
 * Kits : 4,50 € HT par jeu de 3 kits ; envoi : 15 € HT par colis jusqu'à 12 arrivées dans la semaine, 22 € au-delà ;
 * 0 € avec Deltom Operator.
 */
export function estimerMois(arriveesParMois: number, jeuxParArrivee: number, livraison: Livraison): Estimation {
  const arrivees = Math.max(0, Math.floor(arriveesParMois || 0));
  const arriveesParSemaine = arrivees / SEMAINES_PAR_MOIS;
  const kits = Math.round(arrivees * jeuxParArrivee * prix.troisKits * 100) / 100;
  let envoi = 0;
  if (livraison === "colis" && arrivees > 0) {
    const colis = arriveesParSemaine <= SEUIL_ARRIVEES_SEMAINE ? prix.colisJusqua12 : prix.colisAuDela;
    envoi = colis * SEMAINES_PAR_MOIS;
  }
  return { arriveesParSemaine, kits, envoi, total: additionner(kits, envoi) };
}
