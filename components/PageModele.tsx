import type { ReactNode } from "react";
import fr from "@/content/fr";
import { schemaFilAriane } from "@/lib/schema";
import Footer from "./Footer";
import Header from "./Header";
import JsonLd from "./JsonLd";
import styles from "./PageModele.module.css";

type CleLien = keyof typeof fr.liensPages;

type Props = {
  /** Nom de la page dans le fil d'Ariane. */
  fil: string;
  chemin: string;
  titre: string;
  intro?: ReactNode;
  children: ReactNode;
  aLireAussi?: readonly CleLien[];
  /** Bloc d'appel vers /kit-essai/ (affiché par défaut). */
  cta?: boolean;
};

/** Modèle commun des pages intérieures : fil d'Ariane, un seul H1, « À lire aussi », bouton vers /kit-essai/. */
export default function PageModele({ fil, chemin, titre, intro, children, aLireAussi = [], cta = true }: Props) {
  const m = fr.modele;
  return (
    <>
      <a className="lien-evitement" href="#contenu">
        {fr.general.lienEvitement}
      </a>
      <Header />
      <main id="contenu" className={styles.main}>
        <div className="conteneur">
          <nav aria-label={m.filAriane} className={styles.fil}>
            <ol>
              <li>
                <a href="/">{m.accueil}</a>
              </li>
              <li aria-current="page">{fil}</li>
            </ol>
          </nav>
          <h1 className={styles.titre}>{titre}</h1>
          {intro ? <div className={styles.intro}>{intro}</div> : null}
        </div>

        <div className={`conteneur ${styles.corps}`}>{children}</div>

        {cta ? (
          <div className="conteneur">
            <aside className={styles.cta} aria-label={m.cta.bouton.label}>
              <p className={styles.ctaTitre}>{m.cta.titre}</p>
              <p>{m.cta.texte}</p>
              <a className="bouton" href={m.cta.bouton.href}>
                {m.cta.bouton.label}
              </a>
            </aside>
          </div>
        ) : null}

        {aLireAussi.length > 0 ? (
          <section className={`conteneur ${styles.aLire}`} aria-labelledby="a-lire-aussi">
            <h2 id="a-lire-aussi" className={styles.aLireTitre}>
              {m.aLireAussi}
            </h2>
            <ul className={styles.aLireListe}>
              {aLireAussi.map((cle) => {
                const l = fr.liensPages[cle];
                return (
                  <li key={cle}>
                    <a href={l.href} className={styles.carteLien}>
                      <span className={styles.carteTitre}>{l.titre}</span>
                      <span className={styles.carteTexte}>{l.texte}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </main>
      <Footer />
      <JsonLd
        donnees={schemaFilAriane([
          { nom: m.accueil, chemin: "/" },
          { nom: fil, chemin },
        ])}
      />
    </>
  );
}
