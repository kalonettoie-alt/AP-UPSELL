import fr, { kits } from "@/content/fr";
import { formatPrixHT } from "@/lib/prix";
import Boite from "./Boite";
import Etagere from "./Etagere";
import EtiquettePrix from "./EtiquettePrix";
import styles from "./Hero.module.css";

export default function Hero() {
  const t = fr.hero;
  const boites = t.boites.map((id) => kits.find((k) => k.id === id)!);
  const colonnes = boites.map((k) => (k.enAvant ? "1.45fr" : "1fr")).join(" ");

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
          sous={boites.map((k, i) => (
            <EtiquettePrix key={k.id} texte={formatPrixHT(k.prix)} balance delai={i * -0.7} />
          ))}
        >
          {boites.map((k, i) => (
            <Boite
              key={k.id}
              couleurs={k.couleurs}
              etiquette={k.nomBoite}
              grande={k.enAvant}
              className={k.enAvant ? styles.boiteGrande : styles.boite}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            />
          ))}
        </Etagere>
      </div>
    </section>
  );
}
