import { imagePartage, tailleOg, typeOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Politique de confidentialité";
export const size = tailleOg;
export const contentType = typeOg;

export default function Image() {
  return imagePartage("Politique de ", "confidentialité");
}
