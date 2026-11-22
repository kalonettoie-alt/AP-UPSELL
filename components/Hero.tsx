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
  const boites = t.boites.map((id) => ({ kit: kits.find((k) => k.id === id)! }));

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
        {/* Ordinateur et tablette : une étagère de 4 boîtes. Téléphone : deux étagères de 2 boîtes (textes lisibles à 12 px). */}
        {[
          { cle: "large", rangees: [boites], classe: styles.uneEtagere },
          { cle: "etroit", rangees: [boites.slice(0, 2), boites.slice(2)], classe: styles.deuxEtageres },
        ].map((v) => (
          <div key={v.cle} className={v.classe}>
            {v.rangees.map((rangee, r) => (
              <Etagere
                key={r}
                colonnes={rangee.map((b) => (b.kit.enAvant ? "1.35fr" : "1fr")).join(" ")}
                sansContour
                sous={rangee.map((b, i) => (
                  <EtiquettePrix key={b.kit.id} texte={formatPrixHT(b.kit.prix)} balance delai={i * 0.25} />
                ))}
              >
                {rangee.map((b, i) => (
                  <Boite
                    key={b.kit.id}
                    couleur={b.kit.bandeau}
                    titre={b.kit.nomBoite}
                    className={styles.boite}
                    style={{ aspectRatio: proportions[b.kit.id], animationDelay: `${0.15 + i * 0.08}s` }}
                  />
                ))}
              </Etagere>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
