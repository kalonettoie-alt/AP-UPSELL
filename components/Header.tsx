"use client";

import { useState } from "react";
import fr from "@/content/fr";
import StoreRaye from "./StoreRaye";
import styles from "./Header.module.css";

type Props = {
  /** Page /kit-essai/ : logo seul, sans menu ni bouton. */
  simple?: boolean;
};

export default function Header({ simple = false }: Props) {
  const t = fr.header;
  const [ouvert, setOuvert] = useState(false);
  const onglets = t.menu.filter((o): o is { label: string; href: string } => o.href !== null);

  return (
    <header id="haut" className={styles.header}>
      <StoreRaye />
      <div className={`conteneur ${styles.barre}`}>
        <a href="/" className={styles.marque}>
          {fr.marque}
        </a>
        <p className={styles.baseline}>{fr.baseline}</p>

        {simple ? null : (
          <>
            <a className={`bouton ${styles.bouton}`} href={t.bouton.href}>
              {t.bouton.label}
            </a>
            {onglets.length > 0 ? (
              <>
                <button
                  type="button"
                  className={styles.burger}
                  aria-expanded={ouvert}
                  aria-controls="menu-principal"
                  onClick={() => setOuvert((o) => !o)}
                >
                  <span className={styles.burgerIcone} aria-hidden="true" />
                  <span className={styles.burgerTexte}>{ouvert ? t.fermerMenu : t.ouvrirMenu}</span>
                </button>
                <nav
                  id="menu-principal"
                  aria-label={t.navLabel}
                  className={styles.nav}
                  data-ouvert={ouvert ? "oui" : "non"}
                >
                  <ul className={styles.liens}>
                    {onglets.map((o) => (
                      <li key={o.href}>
                        <a href={o.href}>{o.label}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            ) : null}
          </>
        )}
      </div>
    </header>
  );
}
