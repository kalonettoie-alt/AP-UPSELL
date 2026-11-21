import fr, { kits, type KitId } from "@/content/fr";
import { formatPrixHT } from "@/lib/prix";
import Boite from "./Boite";
import Etagere from "./Etagere";
import EtiquettePrix from "./EtiquettePrix";
import styles from "./Hero.module.css";

/** Hauteur de chaque boîte (largeur / hauteur) : Cuisine la plus basse, Les 3 kits nettement plus haute. */
const proportions: Record<KitId, string> = {
  salleDeBain: "1 / 1.55",
  cuisine: "1 / 1.2",
  entretien: "1 / 1.55",
  troisKits: "1 / 1.5",
};

export default function Hero() {
  const t = fr.hero;
  const boites = t.boites.map((b) => ({ ...b, kit: kits.find((k) => k.id === b.kit)! }));
  const colonnes = boites.map((b) => (b.kit.enAvant ? "1.35fr" : "1fr")).join(" ");

  return (
    <section className={`conteneur ${styles.hero}`} aria-labelledby="titre-hero">
      <div className={styles.texte}>
        <p className="petit-titre">{t.petitTitre}</p>
        <h1 id="titre-hero" className={styles.titre}>
          {t.titre}
        </h1>
        <p className={styles.sousTitre}>{t.sousTitre}</p>
        <p className={styles.lignePrix}>{t.lignePrix}</p>
        <div className={styles.actions}>
          <a className="bouton" href={t.bouton.href}>
            {t.bouton.label}
          </a>
          <a className={styles.lien} href={t.lien.href}>
            {t.lien.label}
          </a>
        </div>
        <p className={styles.sousBouton}>{t.sousBouton}</p>
      </div>

      <div className={styles.visuel} aria-hidden="true">
        <Etagere
          colonnes={colonnes}
          sansContour
          sous={boites.map((b, i) => (
            <EtiquettePrix key={b.kit.id} texte={formatPrixHT(b.kit.prix)} balance delai={i * 0.25} />
          ))}
        >
          {boites.map((b, i) => (
            <Boite
              key={b.kit.id}
              couleurs={[b.bandeau]}
              titre={b.kit.nomBoite}
              className={styles.boite}
              style={{ aspectRatio: proportions[b.kit.id], animationDelay: `${0.15 + i * 0.08}s` }}
            />
          ))}
        </Etagere>
      </div>
    </section>
  );
}
