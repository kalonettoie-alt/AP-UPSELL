import fr from "@/content/fr";
import { pastel } from "@/lib/couleurs";
import EtiquetteJours from "./EtiquetteJours";
import styles from "./CommentCaMarche.module.css";

export default function CommentCaMarche() {
  const t = fr.commentCaMarche;
  const total = t.etapes.length;
  return (
    <section className={`conteneur ${styles.section}`} aria-labelledby="titre-etapes">
      <h2 id="titre-etapes" className={styles.titre}>
        {t.titre}
      </h2>

      <ol className={styles.etapes}>
        {t.etapes.map((e, i) => (
          <li key={e.titre} className={styles.fiche} style={{ background: pastel(e.couleur) }}>
            <p className={`petit-titre ${styles.enTete}`}>
              {t.etapeLabel} · {i + 1} / {total}
            </p>
            <h3 className={styles.ficheTitre}>{e.titre}</h3>
            <p className={styles.ficheTexte}>{e.texte}</p>
          </li>
        ))}
      </ol>

      <EtiquetteJours />

      <p className={styles.bientot}>{t.bientot}</p>
    </section>
  );
}
