import fr from "@/content/fr";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = fr.footer;
  return (
    <footer className={styles.footer}>
      <div className={`conteneur ${styles.grille}`}>
        <div>
          <p className={styles.marque}>{fr.marque}</p>
          <p className={styles.texte}>{t.texte}</p>
        </div>
        <nav aria-label={t.navLabel}>
          <ul className={styles.liens}>
            {t.liens.map((l) => (
              <li key={l.label}>{l.href ? <a href={l.href}>{l.label}</a> : <span>{l.label}</span>}</li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
