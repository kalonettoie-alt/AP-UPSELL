"use client";

import type { FormEvent } from "react";
import fr from "@/content/fr";
import styles from "./FormulaireEssai.module.css";

type NomChamp = keyof typeof fr.formulaires.essai.champs;

const champs: {
  nom: NomChamp;
  type: string;
  requis: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "email" | "tel" | "text";
}[] = [
  { nom: "nom", type: "text", requis: true, autoComplete: "name" },
  { nom: "societe", type: "text", requis: true, autoComplete: "organization" },
  { nom: "nombre_logements", type: "number", requis: true, inputMode: "numeric" },
  { nom: "ville", type: "text", requis: true, autoComplete: "address-level2" },
  { nom: "email", type: "email", requis: true, autoComplete: "email" },
  { nom: "telephone", type: "tel", requis: false, autoComplete: "tel" },
];

/** Formulaire « Kit d'essai » (bloc 11). L'envoi est branché à l'étape 4. */
export default function FormulaireEssai() {
  const t = fr.formulaires.essai;

  function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form className={styles.carte} onSubmit={envoyer} noValidate>
      <div className={styles.grille}>
        {champs.map((c) => (
          <div key={c.nom} className={styles.champ}>
            <label htmlFor={`essai-${c.nom}`} className={styles.label}>
              {t.champs[c.nom]}
            </label>
            <input
              id={`essai-${c.nom}`}
              name={c.nom}
              type={c.type}
              required={c.requis}
              autoComplete={c.autoComplete}
              inputMode={c.inputMode}
              min={c.type === "number" ? 1 : undefined}
              step={c.type === "number" ? 1 : undefined}
              className={styles.input}
            />
          </div>
        ))}
      </div>
      <button type="submit" className={`bouton ${styles.bouton}`}>
        {t.bouton}
      </button>
      <p className={styles.sousBouton}>{t.sousBouton}</p>
    </form>
  );
}
