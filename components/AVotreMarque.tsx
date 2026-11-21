import fr, { kits } from "@/content/fr";
import Boite from "./Boite";
import styles from "./AVotreMarque.module.css";

export default function AVotreMarque() {
  const t = fr.aVotreMarque;
  const troisKits = kits.find((k) => k.id === "troisKits")!;
  return (
    <section className={`conteneur ${styles.section}`} aria-labelledby="titre-marque">
      <div className={styles.grille}>
        <div className={styles.visuel} aria-hidden="true">
          <div className={styles.boiteZone}>
            <Boite titre={troisKits.nomBoite} couleur={troisKits.bandeau} className={styles.boite}>
              <span className={styles.autocollant}>{t.autocollant}</span>
            </Boite>
          </div>
          <div className={styles.carte}>
            <p className={styles.carteTitre}>{t.carteTitre}</p>
            <p className={styles.carteTexte}>{t.carteTexte}</p>
          </div>
        </div>

        <div>
          <p className="petit-titre">{t.petitTitre}</p>
          <h2 id="titre-marque" className={styles.titre}>
            {t.titre}
          </h2>
          <p className={styles.texte}>{t.texte}</p>
        </div>
      </div>
    </section>
  );
}
