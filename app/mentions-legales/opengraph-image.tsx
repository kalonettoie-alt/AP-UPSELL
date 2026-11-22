import fr from "@/content/fr";
import { imagePartage, tailleOg, typeOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = fr.pagesLegales.mentionsLegales.titre;
export const size = tailleOg;
export const contentType = typeOg;

export default function Image() {
  return imagePartage(fr.pagesLegales.mentionsLegales.titre);
}
