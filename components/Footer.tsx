import fr from "@/content/fr";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = fr.footer;
  const c = fr.coordonnees;
  return (
    <footer className={styles.footer}>
      <div className="conteneur">
        <nav aria-label={t.navLabel}>
          <div className={styles.colonnes}>
            {t.colonnes.map((col) => (
              <div key={col.titre}>
                <p className={styles.titre}>{col.titre}</p>
                <ul className={styles.liens}>
                  {col.liens.map((l) => (
                    <li key={l.href}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                  {col.avecCoordonnees ? (
                    <>
                      <li>
                        <a href={`mailto:${c.email}`}>{c.email}</a>
                      </li>
                      <li>
                        <a href={`tel:${c.telephoneLien}`}>{c.telephone}</a>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        <div className={styles.bas}>
          <p className={styles.marque}>{fr.marque}</p>
          <p className={styles.texte}>{t.texte}</p>
        </div>
      </div>
    </footer>
  );
}
