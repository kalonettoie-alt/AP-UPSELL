"use client";

import type { FormEvent } from "react";
import fr from "@/content/fr";
import styles from "./ListeAttente.module.css";

/** Liste d'attente hors Île-de-France (bloc 8). L'envoi est branché à l'étape 4. */
export default function ListeAttente() {
  const t = fr.formulaires.attente;

  function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form className={styles.formulaire} onSubmit={envoyer} noValidate>
      <label htmlFor="attente-email" className={styles.label}>
        {t.label}
      </label>
      <div className={styles.ligne}>
        <input
          id="attente-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t.placeholder}
          className={styles.champ}
        />
        <button type="submit" className="bouton">
          {t.bouton}
        </button>
      </div>
    </form>
  );
}
