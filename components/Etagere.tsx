import type { ReactNode } from "react";
import styles from "./Etagere.module.css";

type Props = {
  /** Valeur CSS grid-template-columns, partagée par les boîtes et ce qui pend sous la planche. */
  colonnes: string;
  children: ReactNode;
  /** Éléments suspendus sous la planche (étiquettes de prix), alignés sur les boîtes. */
  sous?: ReactNode;
  className?: string;
};

/** Étagère en bois avec boîtes posées dessus (décorative). */
export default function Etagere({ colonnes, children, sous, className }: Props) {
  return (
    <div className={[styles.etagere, className ?? ""].join(" ")}>
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
