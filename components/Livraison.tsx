import fr from "@/content/fr";
import { pastel } from "@/lib/couleurs";
import Icone from "./Icone";
import ListeAttente from "./ListeAttente";
import styles from "./Livraison.module.css";

export default function Livraison() {
  const t = fr.livraison;
  const dm = t.derniereMinute;
  return (
    <section id="livraison" className={`conteneur ${styles.section}`} aria-labelledby="titre-livraison">
      <h2 id="titre-livraison" className={styles.titre}>
        {t.titre}
      </h2>

      <ul className={styles.cartes}>
        {t.cartes.map((c) => (
          <li key={c.titre} className={styles.carte} style={{ background: pastel(c.couleur) }}>
            <div className={styles.haut}>
              <Icone nom={c.icone} className={styles.icone} />
              <p className={styles.pastille}>{c.pastille}</p>
            </div>
            <h3 className={styles.carteTitre}>{c.titre}</h3>
            <p className={styles.carteTexte}>{c.texte}</p>
          </li>
        ))}
        <li className={`${styles.carte} ${styles.large}`} style={{ background: pastel(dm.couleur) }}>
          <Icone nom={dm.icone} className={styles.icone} />
          <div>
            <h3 className={styles.carteTitre}>{dm.titre}</h3>
            <p className={styles.carteTexte}>{dm.texte}</p>
          </div>
        </li>
      </ul>

      <p className={styles.lienDeltom}>
        <a href={t.lienDeltom.href} target="_blank" rel="noopener">
          {t.lienDeltom.label}
          <span className="visuellement-cache"> {t.lienDeltom.nouvelOnglet}</span>
        </a>
      </p>

      <ListeAttente />
    </section>
  );
}
