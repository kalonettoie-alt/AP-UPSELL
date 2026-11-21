import type { CSSProperties, ReactNode } from "react";
import type { Pastel } from "@/content/fr";
import { pastel } from "@/lib/couleurs";
import styles from "./Boite.module.css";

type Props = {
  /** Nom écrit dans le bandeau pleine largeur, en haut de la boîte. */
  titre: string;
  /** Couleur du bandeau. */
  couleur: Pastel;
  className?: string;
  /** Pour régler la hauteur : aspectRatio (largeur / hauteur). */
  style?: CSSProperties;
  /** Éléments posés sur la face de la boîte (ex. autocollant « Votre logo »). */
  children?: ReactNode;
};

/** Boîte kraft dessinée en CSS, nom sur un bandeau de couleur (décorative : le parent porte aria-hidden). */
export default function Boite({ titre, couleur, className, style, children }: Props) {
  return (
    <div className={[styles.boite, className ?? ""].join(" ")} style={style}>
      <span className={styles.bandeau} style={{ background: pastel(couleur) }}>
        {titre}
      </span>
      {children}
    </div>
  );
}
