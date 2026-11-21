import type { Pastel } from "@/content/fr";
import { pastel } from "@/lib/couleurs";
import styles from "./EtiquetteColis.module.css";

type Props = {
  couleur: Pastel;
  enTete: string;
  logement: string;
  lignes: { libelle: string; valeur: string }[];
  logo?: string;
  className?: string;
};

/** Étiquette de colis : en-tête de la couleur du jour, nom du logement, code-barres. */
export default function EtiquetteColis({ couleur, enTete, logement, lignes, logo, className }: Props) {
  return (
    <div className={[styles.etiquette, className ?? ""].join(" ")}>
      <p className={styles.enTete} style={{ background: pastel(couleur) }}>
        {enTete}
      </p>
      <div className={styles.corps}>
        <p className={styles.logement}>{logement}</p>
        <dl className={styles.lignes}>
          {lignes.map((l) => (
            <div key={l.libelle}>
              <dt>{l.libelle}</dt>
              <dd>{l.valeur}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.pied}>
          {logo ? <span className={styles.logo}>{logo}</span> : null}
          <span className={styles.codeBarre} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
