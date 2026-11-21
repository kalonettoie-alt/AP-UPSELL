import type { CSSProperties } from "react";
import type { Pastel } from "@/content/fr";
import { pastel } from "@/lib/couleurs";
import styles from "./Boite.module.css";

type Props = {
  /** Une couleur par bandeau (3 pour « Les 3 kits »). */
  couleurs: Pastel[];
  /** Petit autocollant écrit sur la boîte. */
  etiquette?: string;
  /** Nom écrit dans un bandeau pleine largeur en haut de la boîte (couleur : couleurs[0]). */
  titre?: string;
  grande?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Boîte kraft dessinée en CSS (décorative : le parent porte aria-hidden). */
export default function Boite({ couleurs, etiquette, titre, grande, className, style }: Props) {
  return (
    <div
      className={[styles.boite, grande ? styles.grande : "", className ?? ""].join(" ")}
      style={style}
    >
      {titre ? (
        <span className={styles.bandeauTitre} style={{ background: pastel(couleurs[0]) }}>
          {titre}
        </span>
      ) : (
        <div className={styles.bandes}>
        {couleurs.map((c, i) => (
          <span key={i} style={{ background: pastel(c) }} />
        ))}
        </div>
      )}
      {etiquette ? <span className={styles.etiquette}>{etiquette}</span> : null}
    </div>
  );
}
