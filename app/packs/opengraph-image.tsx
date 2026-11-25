import { reglages } from "@/content/pages";
import { imagePartage, tailleOg, typeOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = reglages.packs!.titre;
export const size = tailleOg;
export const contentType = typeOg;

export default function Image() {
  const [debut, fin] = reglages.packs!.h1;
  return imagePartage(debut, fin);
}
