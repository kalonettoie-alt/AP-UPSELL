"use client";

import { useState } from "react";
import fr from "@/content/fr";
import { urlPage } from "@/lib/routes";
import styles from "./Header.module.css";

type Props = {
  /** Page /kit-essai/ : logo seul, sans menu ni boutons. */
  simple?: boolean;
};

/** Bandeau + en-tête collant de la maquette V2. Menu repliable sur téléphone. */
export default function Header({ simple = false }: Props) {
  const t = fr.site;
  const [ouvert, setOuvert] = useState(false);
  const onglets = t.menu.flatMap((o) => {
    const url = urlPage(o.page);
    return url ? [{ label: o.label, url }] : [];
  });
  const urlAppel = urlPage(t.appel.page);
  const urlEssai = urlPage(t.essai.page);

  return (
    <>
      <aside className={styles.bandeau} aria-label={t.bandeauLabel}>
        {t.bandeau[0]} <span aria-hidden="true">·</span> {t.bandeau[1]}
      </aside>
      <header id="haut" className={`dk ${styles.header} ${ouvert ? styles.ouvert : ""}`}>
        <div className={styles.barre}>
          <a href="/" className={styles.logo} aria-label={t.logoLabel}>
            {t.logo}
          </a>
          {simple ? null : (
            <>
              {onglets.length > 0 ? (
                <nav id="menu-principal" className={`nav ${styles.nav}`} aria-label={t.navLabel}>
                  {onglets.map((o) => (
                    <a key={o.url} href={o.url} onClick={() => setOuvert(false)}>
                      {o.label}
                    </a>
                  ))}
                </nav>
              ) : null}
              <div className={styles.actions}>
                {urlAppel ? (
                  <a href={urlAppel} className={`lk ${styles.appel}`}>
                    {t.appel.label}
                  </a>
                ) : null}
                {onglets.length > 0 ? (
                  <button
                    type="button"
                    className={styles.burger}
                    aria-expanded={ouvert}
                    aria-controls="menu-principal"
                    aria-label={ouvert ? t.fermerMenu : t.ouvrirMenu}
                    onClick={() => setOuvert((o) => !o)}
                  >
                    <span aria-hidden="true">☰</span>
                  </button>
                ) : null}
                {urlEssai ? (
                  <a href={urlEssai} className={`b1 ${styles.essai}`}>
                    {t.essai.label}
                  </a>
                ) : null}
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
