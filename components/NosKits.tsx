import fr, { kits } from "@/content/fr";
import { formatPrixHT } from "@/lib/prix";
import Boite from "./Boite";
import Etagere from "./Etagere";
import styles from "./NosKits.module.css";

export default function NosKits() {
  const t = fr.nosKits;
  return (
    <section id="kits" className={styles.section} aria-labelledby="titre-kits">
      <div className="conteneur">
        <p className="petit-titre">{t.petitTitre}</p>
        <h2 id="titre-kits" className={styles.titre}>
          {t.titre}
        </h2>
        <p className={styles.texte}>{t.texte}</p>

        <ul className={styles.cartes}>
          {kits.map((k) => (
            <li key={k.id} className={[styles.carte, k.enAvant ? styles.enAvant : ""].join(" ")}>
              <div className={styles.visuel} aria-hidden="true">
                <Etagere colonnes="1fr">
                  <Boite
                    titre={k.nomBoite}
                    couleur={k.bandeau}
                    className={styles.boite}
                    style={{ aspectRatio: k.enAvant ? "1 / 1.25" : "1 / 1.3" }}
                  />
                </Etagere>
              </div>
              <div className={styles.entete}>
                <h3 className={styles.nom}>{k.nom}</h3>
                <p className={styles.prix}>{formatPrixHT(k.prix)}</p>
              </div>
              <ul className={styles.contenu}>
                {k.contenu.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className={styles.note}>{t.note}</p>
        <a className={`bouton ${styles.bouton}`} href={t.bouton.href}>
          {t.bouton.label}
        </a>
      </div>
    </section>
  );
}
