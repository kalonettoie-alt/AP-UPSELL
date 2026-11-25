"use client";

import { useState, type CSSProperties } from "react";

/** Copie l'objet et le texte d'un e-mail (élément #cible) dans le presse-papiers. */
export default function BoutonCopier({ cible, objet, label, labelCopie, style }: { cible: string; objet: string; label: string; labelCopie: string; style?: CSSProperties }) {
  const [copie, setCopie] = useState(false);
  return (
    <button
      type="button"
      style={style}
      aria-live="polite"
      onClick={async () => {
        const texte = document.getElementById(cible)?.textContent ?? "";
        try {
          await navigator.clipboard.writeText(`${objet}\n\n${texte}`);
          setCopie(true);
        } catch {
          setCopie(false);
        }
      }}
    >
      {copie ? labelCopie : label}
    </button>
  );
}
