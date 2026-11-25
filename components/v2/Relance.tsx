import fr from "@/content/fr";
import LienPage from "@/components/LienPage";
import type { CleePage } from "@/lib/routes";

type Lien = { page: string; ancre?: string; label: string };
export type CleRelance = keyof typeof fr.relances;

/** Relance discrète en fin de section : une phrase, un bouton, un lien secondaire. Textes : fr.relances. */
export default function Relance({ id, sombre = false }: { id: CleRelance; sombre?: boolean }) {
  const r = fr.relances[id] as { texte: string[]; lien: Lien; second?: Lien };
  return (
    <div className={`relance${sombre ? " relance-sombre" : ""}`}>
      <p className="relance-texte">
        {r.texte[0]}
        <em>{r.texte[1]}</em>
      </p>
      <div className="relance-liens">
        <LienPage page={r.lien.page as CleePage} ancre={r.lien.ancre} className={sombre ? "b1 clair" : "b1"}>
          {r.lien.label}
        </LienPage>
        {r.second ? (
          <LienPage page={r.second.page as CleePage} ancre={r.second.ancre} className="lk relance-second">
            {r.second.label}
          </LienPage>
        ) : null}
      </div>
    </div>
  );
}
