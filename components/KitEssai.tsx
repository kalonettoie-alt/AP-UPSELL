import fr from "@/content/fr";
import FormulaireEssai from "./FormulaireEssai";
import styles from "./KitEssai.module.css";

export default function KitEssai() {
  const t = fr.kitEssai;
  return (
    <section id="essai" className={`conteneur ${styles.section}`} aria-labelledby="titre-essai">
      <div className={styles.encadre}>
        <div className={styles.texteZone}>
          <h2 id="titre-essai" className={styles.titre}>
            {t.titre}
          </h2>
          <p className={styles.texte}>{t.texte}</p>
        </div>
        <FormulaireEssai />
      </div>
    </section>
  );
}
