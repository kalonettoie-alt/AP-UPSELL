const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function estVide(valeur: string): boolean {
  return valeur.trim() === "";
}

export function estEmail(valeur: string): boolean {
  return EMAIL.test(valeur.trim());
}

/** Nombre entier, au moins 1 (« 3 » oui ; « 0 », « 2,5 », « 1.5 », « abc » non). */
export function estNombreLogements(valeur: string): boolean {
  const v = valeur.trim();
  return /^\d+$/.test(v) && Number(v) >= 1;
}
