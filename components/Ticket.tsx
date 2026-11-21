import type { ReactNode } from "react";
import styles from "./Ticket.module.css";

/** Ticket de caisse : carte blanche, police DM Mono, séparateurs pointillés. */
export default function Ticket({ titre, children, className }: { titre: string; children: ReactNode; className?: string }) {
  return (
    <div className={[styles.ticket, className ?? ""].join(" ")}>
      <p className={styles.titre}>{titre}</p>
      <TicketSeparateur />
      {children}
    </div>
  );
}

export function TicketSeparateur() {
  return <hr className={styles.separateur} />;
}

export function TicketLigne({ libelle, montant }: { libelle: string; montant?: string }) {
  return (
    <p className={styles.ligne}>
      <span>{libelle}</span>
      <span className={styles.points} aria-hidden="true" />
      {montant ? <span>{montant}</span> : null}
    </p>
  );
}

export function TicketDetail({ lignes }: { lignes: string[] }) {
  return (
    <ul className={styles.detail}>
      {lignes.map((l) => (
        <li key={l}>{l}</li>
      ))}
    </ul>
  );
}

export function TicketTotal({ libelle, montant }: { libelle: string; montant: string }) {
  return (
    <p className={styles.total}>
      <span>{libelle}</span>
      <span className={styles.totalMontant}>{montant}</span>
    </p>
  );
}
