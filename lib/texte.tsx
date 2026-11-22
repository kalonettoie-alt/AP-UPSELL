import type { ReactNode } from "react";

const LIEN = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|([\w.+-]+@[\w-]+\.[\w.]+[a-z])/g;

/**
 * Affiche un texte de content/fr.ts en transformant :
 * - les liens écrits [libellé](https://…) en liens externes ;
 * - les adresses e-mail en liens mailto.
 * Les crochets sans lien ([à fournir], [30]…) restent tels quels.
 */
export function TexteRiche({ texte }: { texte: string }) {
  const morceaux: ReactNode[] = [];
  let dernier = 0;
  for (const m of texte.matchAll(LIEN)) {
    const debut = m.index ?? 0;
    if (debut > dernier) morceaux.push(texte.slice(dernier, debut));
    if (m[1] && m[2]) {
      morceaux.push(
        <a key={debut} href={m[2]} target="_blank" rel="noopener">
          {m[1]}
        </a>,
      );
    } else if (m[3]) {
      morceaux.push(
        <a key={debut} href={`mailto:${m[3]}`}>
          {m[3]}
        </a>,
      );
    }
    dernier = debut + m[0].length;
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier));
  return <>{morceaux}</>;
}

/** Identifiant d'ancre à partir d'un titre : « 1. Qui peut commander » → « qui-peut-commander ». */
export function ancre(titre: string): string {
  return titre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
