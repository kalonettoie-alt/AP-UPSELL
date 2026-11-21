/**
 * Envoi des formulaires vers Formspree (sans paquet, en fetch).
 * Les identifiants viennent des variables d'environnement, intégrées au moment du build.
 * Ils doivent être lus en toutes lettres (process.env.NEXT_PUBLIC_...) pour que Next.js les remplace.
 */
export const formspreeIds = {
  essai: process.env.NEXT_PUBLIC_FORMSPREE_ESSAI,
  attente: process.env.NEXT_PUBLIC_FORMSPREE_ATTENTE,
};

/** Renvoie true si Formspree a accepté l'envoi, false sinon (identifiant absent, erreur réseau ou serveur). */
export async function envoyerFormspree(
  identifiant: string | undefined,
  donnees: Record<string, string>,
): Promise<boolean> {
  const id = identifiant?.trim();
  if (!id) return false;
  try {
    const reponse = await fetch(`https://formspree.io/f/${encodeURIComponent(id)}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(donnees),
    });
    return reponse.ok;
  } catch {
    return false;
  }
}

/** Date et heure d'envoi, heure de Paris : « 21/11/2026 14:05 ». */
export function dateHeureEnvoi(): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
}
