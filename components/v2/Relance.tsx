import fr from "@/content/fr";
import LienPage from "@/components/LienPage";

export type CleRelance = keyof typeof fr.relances;

/** Relance discrète en fin de section : une phrase, puis les deux boutons standard. Textes : fr.relances, fr.boutons. */
export default function Relance({ id }: { id: CleRelance }) {
  const [debut, fin] = fr.relances[id];
  return (
    <div className="relance">
      <p className="relance-texte">
        {debut}
        <em>{fin}</em>
      </p>
      <div className="relance-liens">
        <LienPage page="essai" className="b1">
          {fr.boutons.essai}
        </LienPage>
        <LienPage page="appel" className="lk relance-second">
          {fr.boutons.appel}
        </LienPage>
      </div>
    </div>
  );
}
