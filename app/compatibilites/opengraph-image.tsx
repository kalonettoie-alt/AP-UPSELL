import { reglages } from "@/content/pages";
import { imagePartage, tailleOg, typeOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = reglages.compat!.titre;
export const size = tailleOg;
export const contentType = typeOg;

export default function Image() {
  const [debut, fin] = reglages.compat!.h1;
  return imagePartage(debut, fin);
}
