/**
 * Envoi des formulaires vers Formspree (sans paquet, en fetch).
 * Les identifiants viennent des variables d'environnement, intégrées au moment du build.
 * Ils doivent être lus en toutes lettres (process.env.NEXT_PUBLIC_...) pour que Next.js les remplace.
 *
 * Les formulaires ont method="POST" et action="https://formspree.io/f/…" : sans JavaScript, le navigateur envoie
 * directement à Formspree, qui affiche sa propre page de remerciement (la redirection vers /merci/ sans JavaScript
 * demande une option payante de Formspree). Avec JavaScript, l'envoi passe par fetch, puis le kit d'essai redirige
 * vers /merci/.
 */
export const formspreeIds = {
  essai: process.env.NEXT_PUBLIC_FORMSPREE_ESSAI,
  attente: process.env.NEXT_PUBLIC_FORMSPREE_ATTENTE,
};

/** Adresse d'envoi (attribut action du formulaire), ou undefined si l'identifiant manque. */
export function actionFormspree(identifiant: string | undefined): string | undefined {
  const id = identifiant?.trim();
  return id ? `https://formspree.io/f/${encodeURIComponent(id)}` : undefined;
}

/** Valeur de utm_source dans l'adresse de la page (vide si absente). */
export function lireUtmSource(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("utm_source")?.slice(0, 200) ?? "";
}

/** Renvoie true si Formspree a accepté l'envoi, false sinon (identifiant absent, erreur réseau ou serveur). */
export async function envoyerFormspree(
  identifiant: string | undefined,
  donnees: Record<string, string>,
): Promise<boolean> {
  const action = actionFormspree(identifiant);
  if (!action) return false;
  try {
    const reponse = await fetch(action, {
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
