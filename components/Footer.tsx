import { Fragment } from "react";
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
                    <Fragment key={l.href}>
                      <li>
                        <a href={l.href}>{l.label}</a>
                      </li>
                      {/* Adresse e-mail juste sous le lien de contact. */}
                      {col.avecCoordonnees && l.href === "/contact/" ? (
                        <li>
                          <a href={`mailto:${c.email}`}>{c.email}</a>
                        </li>
                      ) : null}
                    </Fragment>
                  ))}
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
