import { imagePartage, tailleOg, typeOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Mentions légales";
export const size = tailleOg;
export const contentType = typeOg;

export default function Image() {
  return imagePartage("Mentions ", "légales");
}
