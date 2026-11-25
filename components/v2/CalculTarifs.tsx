"use client";

import { createContext, useContext, useState, type CSSProperties, type ReactNode } from "react";
import { prix } from "@/content/fr";
import { SEUIL_ARRIVEES_SEMAINE } from "@/lib/calcul";

/**
 * Calculateur « Votre vrai coût par arrivée » (maquette V2, page Tarifs).
 * Vos produits (prix d'un carton ÷ nombre d'unités, plus la part perdue) + votre temps de préparation par arrivée,
 * comparés à SINEBOX : 4,50 € HT + la livraison de la semaine répartie sur vos arrivées.
 */
type Cle = "cp" | "cn" | "hh" | "hr" | "loss" | "arr";
type Etat = { valeurs: Record<Cle, number | null>; deltom: boolean; fixer: (k: Cle, v: number | null) => void; setDeltom: (v: boolean) => void };
const Contexte = createContext<Etat | null>(null);

export function CalculProvider({ children }: { children: ReactNode }) {
  const [valeurs, setValeurs] = useState<Record<Cle, number | null>>({ cp: null, cn: null, hh: null, hr: null, loss: null, arr: null });
  const [deltom, setDeltom] = useState(false);
  return (
    <Contexte.Provider value={{ valeurs, deltom, fixer: (k, v) => setValeurs((x) => ({ ...x, [k]: v })), setDeltom }}>{children}</Contexte.Provider>
  );
}

function useCalcul() {
  const e = useContext(Contexte);
  if (!e) throw new Error("CalculProvider manquant");
  return e;
}

function lire(v: string): number | null {
  const t = v.trim();
  if (t === "") return null;
  const n = parseFloat(t.replace(",", "."));
  return Number.isNaN(n) || n < 0 ? null : n;
}

export function ChampCalcul({ cle, style }: { cle: Cle; style: CSSProperties }) {
  const { valeurs, fixer } = useCalcul();
  const v = valeurs[cle];
  return <input type="number" min={0} step="any" value={v ?? ""} onChange={(e) => fixer(cle, lire(e.target.value))} style={style} />;
}

export function BoutonsLivraison({ libelles }: { libelles: [string, string] }) {
  const { deltom, setDeltom } = useCalcul();
  return (
    <div role="group" aria-label="Livraison SINEBOX" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {([false, true] as const).map((v, i) => {
        const actif = v === deltom;
        return (
          <button
            key={libelles[i]}
            type="button"
            aria-pressed={actif}
            onClick={() => setDeltom(v)}
            style={{
              minHeight: "44px",
              padding: "0 18px",
              borderRadius: "999px",
              font: "inherit",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              border: 0,
              transition: "all .25s",
              background: actif ? "#231A13" : "#F6EEE2",
              color: actif ? "#FFFBF5" : "#231A13",
            }}
          >
            {libelles[i]}
          </button>
        );
      })}
    </div>
  );
}

const fmt = (n: number | null) => (n == null ? "—" : `${n.toFixed(2).replace(".", ",")} €`);

/** Une valeur du résultat : « you » (votre coût), « sb » (SINEBOX), « prod », « time », « liv ». */
export function ResultatCalcul({ cle }: { cle: "you" | "sb" | "prod" | "time" | "liv" }) {
  const { valeurs: v, deltom } = useCalcul();
  const prod = v.cp != null && v.cn ? (v.cp / v.cn) * (1 + (v.loss ?? 0) / 100) : null;
  const temps = v.arr && v.hh != null && v.hr != null ? (v.hh * v.hr) / v.arr : v.arr ? 0 : null;
  const liv = deltom ? prix.livraisonDeltom : v.arr != null && v.arr <= SEUIL_ARRIVEES_SEMAINE ? prix.colisJusqua12 : prix.colisAuDela;
  const livParArrivee = v.arr ? liv / v.arr : null;
  const r = {
    you: prod == null || temps == null ? null : prod + temps,
    sb: livParArrivee == null ? null : prix.troisKits + livParArrivee,
    prod,
    time: temps,
    liv: livParArrivee,
  };
  return <>{fmt(r[cle])}</>;
}
