import fr from "@/content/fr";
import styles from "./Avant.module.css";

export default function Avant() {
  const t = fr.avant;
  return (
    <section className={styles.section} aria-labelledby="titre-avant">
      <div className={`conteneur ${styles.grille}`}>
        <div>
          <p className="petit-titre">{t.petitTitre}</p>
          <h2 id="titre-avant" className={styles.titre}>
            {t.titre}
          </h2>
          <p className={styles.texte}>{t.texte}</p>
        </div>

        <div className={styles.feuilleZone}>
          <div className={styles.feuille}>
            <p className={styles.feuilleTitre}>{t.feuilleTitre}</p>
            <ul className={styles.liste}>
              {t.liste.map((item) => (
                <li key={item}>
                  <s>{item}</s>
                </li>
              ))}
            </ul>
          </div>
          <p className={styles.pastille}>{t.pastille}</p>
        </div>
      </div>
    </section>
  );
}
