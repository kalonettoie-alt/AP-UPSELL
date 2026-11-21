import type { ReactNode } from "react";
import styles from "./Etagere.module.css";

type Props = {
  /** Valeur CSS grid-template-columns, partagée par les boîtes et ce qui pend sous la planche. */
  colonnes: string;
  children: ReactNode;
  /** Éléments suspendus sous la planche (étiquettes de prix), alignés sur les boîtes. */
  sous?: ReactNode;
  className?: string;
  /** Planche sans contour noir, qui dépasse nettement des boîtes de chaque côté. */
  sansContour?: boolean;
};

/** Étagère en bois avec boîtes posées dessus (décorative). */
export default function Etagere({ colonnes, children, sous, className, sansContour }: Props) {
  return (
    <div className={[styles.etagere, sansContour ? styles.sansContour : "", className ?? ""].join(" ")}>
      <div className={styles.rangee} style={{ gridTemplateColumns: colonnes }}>
        {children}
      </div>
      <div className={styles.planche} />
      {sous ? (
        <div className={styles.sous} style={{ gridTemplateColumns: colonnes }}>
          {sous}
        </div>
      ) : null}
    </div>
  );
}
