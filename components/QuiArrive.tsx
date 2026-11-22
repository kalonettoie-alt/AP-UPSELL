import fr, { packs } from "@/content/fr";
import { pastel } from "@/lib/couleurs";
import { formatPrixHT } from "@/lib/prix";
import SelecteurPack from "./SelecteurPack";
import styles from "./QuiArrive.module.css";

export default function QuiArrive() {
  const t = fr.quiArrive;
  return (
    <section id="packs" className={`conteneur ${styles.section}`} aria-labelledby="titre-packs">
      <div className={styles.panneau}>
        <p className={`petit-titre ${styles.pastille}`}>{t.petitTitre}</p>
        <h2 id="titre-packs" className={styles.titre}>
          {t.titre}
        </h2>
        <p className={styles.texte}>{t.texte}</p>

        <SelecteurPack />

        <div className={styles.detail}>
          <p className={`petit-titre ${styles.detailTitre}`}>{t.detailTitre}</p>
          <ul className={styles.detailListe}>
            {packs.map((p) => (
              <li key={p.id} className={styles.pack}>
                <div className={styles.packTete} style={{ background: pastel(p.couleur) }}>
                  <h3 className={styles.packNom}>{p.nom}</h3>
                  <p className={styles.packPrix}>{formatPrixHT(p.prix)}</p>
                </div>
                <ul className={styles.packContenu}>
                  {p.contenu.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.bientot}>{t.bientot}</p>
      </div>
    </section>
  );
}
