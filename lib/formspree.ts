/**
 * Envoi des formulaires vers Formspree (sans paquet, en fetch), à une seule adresse : FORMSPREE_URL (content/fr.ts).
 * Chaque formulaire a son propre sujet (_subject).
 *
 * Les formulaires ont method="POST" et action="https://formspree.io/f/…" : sans JavaScript, le navigateur envoie
 * directement à Formspree, qui affiche sa propre page de remerciement (la redirection vers /merci/ sans JavaScript
 * demande une option payante de Formspree). Avec JavaScript, l'envoi passe par fetch, puis redirige vers /merci/.
 */
import { FORMSPREE_URL } from "@/content/fr";

/** Adresse d'envoi (attribut action du formulaire), ou undefined si l'identifiant n'est pas encore renseigné. */
export function actionFormspree(): string | undefined {
  return FORMSPREE_URL || undefined;
}

/** Valeur de utm_source dans l'adresse de la page (vide si absente). */
export function lireUtmSource(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("utm_source")?.slice(0, 200) ?? "";
}

/** Renvoie true si Formspree a accepté l'envoi, false sinon (adresse absente, erreur réseau ou serveur). */
export async function envoyerFormspree(donnees: Record<string, string>): Promise<boolean> {
  const action = actionFormspree();
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
