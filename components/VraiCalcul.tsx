import fr from "@/content/fr";
import styles from "./VraiCalcul.module.css";

export default function VraiCalcul() {
  const t = fr.vraiCalcul;
  return (
    <section id="prix" className={styles.section} aria-labelledby="titre-prix">
      <div className="conteneur">
        <p className="petit-titre">{t.petitTitre}</p>
        <h2 id="titre-prix" className={styles.titre}>
          {t.titre}
        </h2>
        <p className={styles.texte}>{t.texte}</p>

        <div className={styles.defilement} role="region" aria-labelledby="legende-calcul" tabIndex={0}>
          <table className={styles.tableau}>
            <caption id="legende-calcul" className="visuellement-cache">
              {t.tableauLegende}
            </caption>
            <thead>
              <tr>
                <th scope="col" className={styles.critere}>
                  <span className="visuellement-cache">{t.colonnes.critere}</span>
                </th>
                <th scope="col" className={styles.teteCartons}>
                  {t.colonnes.cartons}
                </th>
                <th scope="col" className={styles.teteAp}>
                  {t.colonnes.apUpsell}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.lignes.map((l) => (
                <tr key={l.critere}>
                  <th scope="row" className={styles.critere}>
                    {l.critere}
                  </th>
                  <td className={styles.cartons}>{l.cartons}</td>
                  <td className={styles.ap}>
                    <span className={styles.coche} aria-hidden="true">
                      ✓
                    </span>
                    {l.apUpsell}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.phraseFin}>{t.phraseFin}</p>
        <a className={`bouton ${styles.bouton}`} href={t.bouton.href}>
          {t.bouton.label}
        </a>
      </div>
    </section>
  );
}
