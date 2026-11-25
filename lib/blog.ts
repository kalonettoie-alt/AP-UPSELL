import { readFileSync } from "node:fs";
import { join } from "node:path";
import { packs, prix, type PackId } from "@/content/fr";
import { formatPrix } from "./prix";
import type { CleePage } from "./routes";

/** Les articles publiés (fichiers Markdown de content/blog/), dans l'ordre de publication. */
export const ARTICLES = [
  { cle: "articleNoel", rubrique: "accueil-des-voyageurs", slug: "noel-location-airbnb" },
  { cle: "articleStock", rubrique: "organisation-conciergerie", slug: "gerer-stock-consommables-conciergerie" },
  { cle: "articleListe", rubrique: "accueil-des-voyageurs", slug: "que-mettre-kit-accueil-airbnb" },
] as const;

export type CleArticle = (typeof ARTICLES)[number]["cle"];

export type Bloc =
  | { t: "h2"; texte: string; id: string }
  | { t: "h3"; texte: string }
  | { t: "p"; texte: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] };

export type Article = {
  cle: CleArticle;
  url: string;
  meta: Record<string, string>;
  blocs: Bloc[];
};

/** Remplace les repères de prix ({{prix.troisKits}}, {{pack.noel}}…) par les prix de content/fr.ts. */
function prixDansTexte(t: string): string {
  return t
    .replace(/\{\{prix\.(\w+)\}\}/g, (_, k: keyof typeof prix) => formatPrix(prix[k]))
    .replace(/\{\{pack\.(\w+)\}\}/g, (_, k: PackId) => formatPrix(packs.find((p) => p.id === k)!.prix));
}

/** Typographie française : espace insécable avant « : ; ? ! » et après « « ». */
export function typo(t: string): string {
  return t.replace(/ ([:;?!»])/g, " $1").replace(/« /g, "« ").replace(/(\d) (h|€)/g, "$1 $2");
}

function ancre(t: string): string {
  return t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Lit un article : en-tête (clé: valeur) puis Markdown simple (##, ###, paragraphes, listes - et 1.). */
export function lireArticle(cle: CleArticle): Article {
  const a = ARTICLES.find((x) => x.cle === cle)!;
  const brut = readFileSync(join(process.cwd(), "content", "blog", a.rubrique, `${a.slug}.md`), "utf8");
  const [, entete, corps] = brut.split(/^---$/m);
  const meta: Record<string, string> = {};
  for (const l of entete.trim().split("\n")) {
    const i = l.indexOf(":");
    meta[l.slice(0, i).trim()] = l.slice(i + 1).trim();
  }
  const blocs: Bloc[] = [];
  for (const morceau of prixDansTexte(corps).trim().split(/\n\s*\n/)) {
    const lignes = morceau.trim().split("\n");
    const l0 = lignes[0];
    if (l0.startsWith("### ")) blocs.push({ t: "h3", texte: typo(l0.slice(4)) });
    else if (l0.startsWith("## ")) blocs.push({ t: "h2", texte: typo(l0.slice(3)), id: ancre(l0.slice(3)) });
    else if (/^- /.test(l0)) blocs.push({ t: "ul", items: lignes.map((x) => typo(x.replace(/^- /, ""))) });
    else if (/^\d+\. /.test(l0)) blocs.push({ t: "ol", items: lignes.map((x) => typo(x.replace(/^\d+\. /, ""))) });
    else blocs.push({ t: "p", texte: typo(lignes.join(" ")) });
  }
  return { cle, url: `/blog/${a.rubrique}/${a.slug}/`, meta, blocs };
}

/** Clé de la rubrique d'un article dans le registre des pages. */
export function rubriqueDe(cle: CleArticle): CleePage {
  const r = ARTICLES.find((x) => x.cle === cle)!.rubrique;
  return r === "accueil-des-voyageurs" ? "rubriqueAccueil" : "rubriqueOrganisation";
}
