import type { CSSProperties } from "react";
import fr from "@/content/fr";
import LienPage from "@/components/LienPage";

/** Les deux boutons standard : « Recevoir mon kit d'essai » (principal) et « Réserver un appel » (secondaire). */
export default function BoutonsEssaiAppel({ style }: { style?: CSSProperties }) {
  const b = fr.boutons;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", ...style }}>
      <LienPage page="essai" className="b1">
        {b.essai}
      </LienPage>
      <LienPage page="appel" className="b2">
        {b.appel}
      </LienPage>
    </div>
  );
}
