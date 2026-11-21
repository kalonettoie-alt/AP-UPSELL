"use client";

import { useState } from "react";
import fr, { jourParDefaut, jours, type JourId } from "@/content/fr";
import { pastel } from "@/lib/couleurs";
import EtiquetteColis from "./EtiquetteColis";
import styles from "./EtiquetteJours.module.css";

/** Encadré interactif de l'étape 3 : une couleur par jour. */
export default function EtiquetteJours() {
  const t = fr.commentCaMarche.etiquette;
  const [choix, setChoix] = useState<JourId>(jourParDefaut);
  const jour = jours.find((j) => j.id === choix)!;

  return (
    <div className={styles.encadre}>
      <div className={styles.texte}>
        <p className="petit-titre">{t.petitTitre}</p>
        <h3 className={styles.titre}>{t.titre}</h3>
        <div className={styles.jours} role="group" aria-label={t.groupeLabel}>
          {jours.map((j) => (
            <button
              key={j.id}
              type="button"
              className={styles.jour}
              style={{ background: pastel(j.couleur) }}
              aria-pressed={j.id === choix}
              onClick={() => setChoix(j.id)}
            >
              {j.court}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.etiquetteZone} aria-live="polite">
        <EtiquetteColis
          className={styles.etiquette}
          couleur={jour.couleur}
          enTete={`${jour.long} ${jour.date}`}
          logement={jour.logement}
          lignes={[
            { libelle: t.arrivee, valeur: `${jour.long} ${jour.date}` },
            { libelle: t.kitLabel, valeur: t.kitNom },
          ]}
          logo={t.logo}
        />
      </div>
    </div>
  );
}
