import fr from "@/content/fr";
import StoreRaye from "./StoreRaye";
import styles from "./Header.module.css";

export default function Header() {
  const t = fr.header;
  return (
    <header id="haut" className={styles.header}>
      <StoreRaye />
      <div className={`conteneur ${styles.barre}`}>
        <a href="#haut" className={styles.marque}>
          <span className={styles.nom}>{fr.marque}</span>
          <span className={styles.baseline}>{fr.baseline}</span>
        </a>
        <nav aria-label={t.navLabel} className={styles.nav}>
          <ul className={styles.liens}>
            {t.liens.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a className={`bouton ${styles.bouton}`} href={t.bouton.href}>
            {t.bouton.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
