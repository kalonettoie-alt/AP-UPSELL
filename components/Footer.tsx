import { Fragment } from "react";
import fr from "@/content/fr";
import { urlPage } from "@/lib/routes";
import styles from "./Footer.module.css";

/** Pied de page de la maquette V2. Un lien n'apparaît que si sa page existe. */
export default function Footer() {
  const p = fr.site.pied;
  const email = fr.coordonnees.email;
  const annee = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.interieur}>
        <div className={`g2 ${styles.colonnes}`}>
          <div className={styles.slogan}>
            <p className={styles.sloganTitre}>{p.slogan}</p>
            <p className={styles.sloganTexte}>{p.sousSlogan}</p>
          </div>
          {p.colonnes.map((col) => {
            const liens = col.liens.flatMap((l) => {
              const url = urlPage(l.page);
              return url ? [{ ...l, url }] : [];
            });
            if (liens.length === 0) return null;
            return (
              <nav key={col.titre} className={styles.colonne} aria-label={col.titre}>
                <p className={styles.titre}>{col.titre}</p>
                {liens.map((l) => (
                  <Fragment key={l.label}>
                    <a href={l.ancre ? `${l.url}#${l.ancre}` : l.url}>{l.label}</a>
                    {l.email ? <a href={`mailto:${email}`}>{email}</a> : null}
                  </Fragment>
                ))}
              </nav>
            );
          })}
        </div>
        <div className={`m-fs300 ${styles.marque}`} aria-hidden="true">
          {fr.site.logo}
        </div>
        <div className={styles.bas}>
          <span>
            {p.copyright} {annee}
          </span>
          <span>
            {p.legal.map((l, i) => {
              const url = urlPage(l.page);
              if (!url) return null;
              return (
                <Fragment key={l.label}>
                  {i > 0 ? " · " : null}
                  <a href={l.ancre ? `${url}#${l.ancre}` : url}>{l.label}</a>
                </Fragment>
              );
            })}
          </span>
        </div>
      </div>
    </footer>
  );
}
