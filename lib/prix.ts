/**
 * Format des prix en français : virgule décimale, espace insécable avant « € ».
 * 4.5 → « 4,50 € » · 9 → « 9 € » (jamais « 9,00 € »).
 */
const NBSP = " ";

export function formatPrix(montant: number): string {
  const centimes = Math.round(montant * 100);
  const entier = Math.trunc(centimes / 100);
  const reste = Math.abs(centimes % 100);
  const partieEntiere = String(entier).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  const texte = reste === 0 ? partieEntiere : `${partieEntiere},${String(reste).padStart(2, "0")}`;
  return `${texte}${NBSP}€`;
}

/** « 4,50 € HT » */
export function formatPrixHT(montant: number): string {
  return `${formatPrix(montant)}${NBSP}HT`;
}

/** Somme en centimes pour éviter les erreurs d'arrondi (4,5 + 9 = 13,5). */
export function additionner(...montants: number[]): number {
  return montants.reduce((total, m) => total + Math.round(m * 100), 0) / 100;
}

/** Prix toujours avec deux décimales : 9 → « 9,00 € » (écriture des textes juridiques fournis). */
export function formatPrixDecimales(montant: number): string {
  if (montant === 0) return formatPrix(0);
  return `${montant.toFixed(2).replace(".", ",")} €`;
}
