import { lireArticle } from "@/lib/blog";
import { imagePartage, tailleOg, typeOg } from "@/lib/og";

const a = lireArticle("articleStock");

export const dynamic = "force-static";
export const alt = a.meta.h1;
export const size = tailleOg;
export const contentType = typeOg;

export default function Image() {
  const [debut, ...fin] = a.meta.h1.split(" : ");
  return imagePartage(fin.length ? `${debut} : ` : debut, fin.join(" : "));
}
