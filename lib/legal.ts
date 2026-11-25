import { readFileSync } from "node:fs";
import { join } from "node:path";
import { packs, prix, type PackId } from "@/content/fr";
import { formatPrix, formatPrixDecimales } from "./prix";
import { typo } from "./blog";

/**
 * Textes juridiques (CGV, politique de confidentialité) : fichiers Markdown de content/legal/,
 * publiés tels quels. Les prix y sont des repères lus dans content/fr.ts.
 */
export type BlocTexte =
  | { t: "titre"; texte: string }
  | { t: "h2"; texte: string; id: string }
  | { t: "h3"; texte: string }
  | { t: "p"; texte: string }
  | { t: "ul" | "ol"; items: { texte: string; sous: string[] }[] }
  | { t: "table"; entetes: string[]; lignes: string[][] };

function ancre(t: string): string {
  return t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function prixDansTexte(t: string): string {
  return t
    .replace(/\{\{prix2\.(\w+)\}\}/g, (_, k: keyof typeof prix) => formatPrixDecimales(prix[k]))
    .replace(/\{\{pack2\.(\w+)\}\}/g, (_, k: PackId) => formatPrixDecimales(packs.find((p) => p.id === k)!.prix))
    .replace(/\{\{prix\.(\w+)\}\}/g, (_, k: keyof typeof prix) => formatPrix(prix[k]));
}

export function lireTexteLegal(fichier: "cgv" | "confidentialite"): BlocTexte[] {
  const brut = prixDansTexte(readFileSync(join(process.cwd(), "content", "legal", `${fichier}.md`), "utf8"));
  const blocs: BlocTexte[] = [];
  for (const morceau of brut.trim().split(/\n\s*\n/)) {
    const lignes = morceau.split("\n").filter((l) => l.trim() !== "");
    const l0 = lignes[0];
    if (l0.startsWith("# ")) blocs.push({ t: "titre", texte: typo(l0.slice(2)) });
    else if (l0.startsWith("### ")) blocs.push({ t: "h3", texte: typo(l0.slice(4)) });
    else if (l0.startsWith("## ")) blocs.push({ t: "h2", texte: typo(l0.slice(3)), id: ancre(l0.slice(3)) });
    else if (l0.startsWith("|")) {
      const cellules = (l: string) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => typo(c.trim()));
      blocs.push({ t: "table", entetes: cellules(l0), lignes: lignes.slice(2).map(cellules) });
    } else if (/^(- |\d+\. )/.test(l0)) {
      const ordonnee = /^\d+\. /.test(l0);
      const items: { texte: string; sous: string[] }[] = [];
      for (const l of lignes) {
        if (/^\s{2,}- /.test(l)) items[items.length - 1].sous.push(typo(l.trim().slice(2)));
        else items.push({ texte: typo(l.replace(/^(- |\d+\. )/, "")), sous: [] });
      }
      blocs.push({ t: ordonnee ? "ol" : "ul", items });
    } else blocs.push({ t: "p", texte: typo(lignes.join(" ")) });
  }
  return blocs;
}
