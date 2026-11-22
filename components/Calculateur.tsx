"use client";

import { useState } from "react";
import fr from "@/content/fr";
import { estimerMois, type Livraison } from "@/lib/calcul";
import { formatPrixHT } from "@/lib/prix";
import styles from "./Calculateur.module.css";

/** Calculateur de coût mensuel (page /tarifs/). Le résultat initial est calculé au build, il s'affiche aussi sans JavaScript. */
export default function Calculateur() {
  const t = fr.pages.tarifs.calculateur;
  const [arrivees, setArrivees] = useState(String(t.arriveesParDefaut));
  const [jeux, setJeux] = useState(t.tailles[0].jeux);
  const [livraison, setLivraison] = useState<Livraison>("colis");

  const n = Number(arrivees);
  const valide = arrivees.trim() !== "" && Number.isFinite(n) && n >= 0;
  const e = estimerMois(valide ? n : 0, jeux, livraison);

  return (
    <div className={styles.calculateur}>
      <div className={styles.champs}>
        <div className={styles.champ}>
          <label htmlFor="calc-arrivees" className={styles.label}>
            {t.arrivees}
          </label>
          <input
            id="calc-arrivees"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            value={arrivees}
            onChange={(ev) => setArrivees(ev.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.champ}>
          <label htmlFor="calc-taille" className={styles.label}>
            {t.taille}
          </label>
          <select id="calc-taille" value={jeux} onChange={(ev) => setJeux(Number(ev.target.value))} className={styles.input}>
            {t.tailles.map((o) => (
              <option key={o.jeux} value={o.jeux}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <fieldset className={styles.champ}>
          <legend className={styles.label}>{t.livraison}</legend>
          {(Object.keys(t.modes) as Livraison[]).map((mode) => (
            <label key={mode} className={styles.radio}>
              <input
                type="radio"
                name="calc-livraison"
                value={mode}
                checked={livraison === mode}
                onChange={() => setLivraison(mode)}
              />
              <span>{t.modes[mode]}</span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className={styles.resultat} aria-live="polite">
        <p className={styles.resultatLabel}>{t.resultat}</p>
        <p className={styles.total}>{formatPrixHT(e.total)}</p>
        <p className={styles.detail}>
          {t.detailKits} : {formatPrixHT(e.kits)} · {t.detailEnvoi} : {formatPrixHT(e.envoi)}
        </p>
        <p className={styles.hypothese}>{t.hypothese}</p>
        <p className={styles.estimation}>{t.estimation}</p>
      </div>
    </div>
  );
}
