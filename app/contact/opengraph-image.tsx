import fr from "@/content/fr";
import { imagePartage, tailleOg, typeOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = fr.pages.contact.titre;
export const size = tailleOg;
export const contentType = typeOg;

export default function Image() {
  return imagePartage(fr.pages.contact.titre);
}
