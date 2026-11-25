import { Fragment, type ReactNode } from "react";

/** Texte en ligne : **gras** et [lien](/adresse/). */
export default function TexteMarkdown({ texte }: { texte: string }) {
  const morceaux: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let dernier = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(texte))) {
    if (m.index > dernier) morceaux.push(texte.slice(dernier, m.index));
    if (m[1]) morceaux.push(<b key={i++} style={{ fontWeight: 600, color: "#231A13" }}>{m[1]}</b>);
    else
      morceaux.push(
        <a key={i++} href={m[3]} className="lk">
          {m[2]}
        </a>,
      );
    dernier = m.index + m[0].length;
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier));
  return <Fragment>{morceaux}</Fragment>;
}
