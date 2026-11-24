"use client";

import { useState } from "react";

/**
 * Curseur invisible posé sur l'illustration avant / après.
 * Il règle la variable CSS --split du bloc parent .comparateur : l'illustration reste rendue côté serveur.
 */
export default function CurseurComparateur({ label }: { label: string }) {
  const [valeur, setValeur] = useState(50);
  return (
    <input
      type="range"
      min={2}
      max={98}
      value={valeur}
      aria-label={label}
      onChange={(e) => {
        const v = Number(e.target.value);
        setValeur(v);
        e.currentTarget.closest<HTMLElement>(".comparateur")?.style.setProperty("--split", `${v}%`);
      }}
      style={{ position: "absolute", inset: 0, zIndex: 4, width: "100%", height: "100%", opacity: 0, cursor: "ew-resize", margin: 0 }}
    />
  );
}
