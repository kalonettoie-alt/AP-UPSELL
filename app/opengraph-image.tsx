import { imagePartage, tailleOg, typeOg } from "@/lib/og";
import fr from "@/content/fr";

export const dynamic = "force-static";
export const alt = fr.seo.titre;
export const size = tailleOg;
export const contentType = typeOg;

/** Accueil : H1 de la maquette (« Conciergeries : un kit d'accueil par arrivée, livré chaque semaine. »). */
export default function Image() {
  return imagePartage("Conciergeries\u00a0: un kit d'accueil par arrivée, ", "livré chaque semaine.");
}
