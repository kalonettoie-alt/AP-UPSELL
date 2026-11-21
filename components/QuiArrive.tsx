import fr from "@/content/fr";
import SelecteurPack from "./SelecteurPack";
import styles from "./QuiArrive.module.css";

export default function QuiArrive() {
  const t = fr.quiArrive;
  return (
    <section id="packs" className={`conteneur ${styles.section}`} aria-labelledby="titre-packs">
      <div className={styles.panneau}>
        <p className={`petit-titre ${styles.pastille}`}>{t.petitTitre}</p>
        <h2 id="titre-packs" className={styles.titre}>
          {t.titre}
        </h2>
        <p className={styles.texte}>{t.texte}</p>

        <SelecteurPack />

        <p className={styles.bientot}>{t.bientot}</p>
      </div>
    </section>
  );
}
