import styles from "./EtiquettePrix.module.css";

type Props = { texte: string; balance?: boolean; delai?: number };

/** Étiquette de prix suspendue à un fil. */
export default function EtiquettePrix({ texte, balance, delai = 0 }: Props) {
  return (
    <span
      className={[styles.prix, balance ? styles.balance : ""].join(" ")}
      style={balance ? { animationDelay: `${delai}s` } : undefined}
    >
      <span className={styles.fil} />
      <span className={styles.carte}>{texte}</span>
    </span>
  );
}
