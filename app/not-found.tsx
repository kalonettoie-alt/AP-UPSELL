import type { Metadata } from "next";
import fr from "@/content/fr";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "./kit-essai/page.module.css";
import contenu from "@/components/Contenu.module.css";

const t = fr.pages.introuvable;

export const metadata: Metadata = { title: { absolute: t.titreGoogle } };

export default function Introuvable() {
  return (
    <>
      <Header />
      <main id="contenu" className={`conteneur ${styles.main}`}>
        <div className={styles.encadre} style={{ background: "var(--jaune)" }}>
          <div>
            <h1 className={styles.titre}>{t.titre}</h1>
            <p className={styles.texte}>{t.texte}</p>
            <ul className={contenu.liensSimples}>
              {t.liens.map((cle) => {
                const l = fr.liensPages[cle];
                return (
                  <li key={cle}>
                    <a href={l.href}>{l.titre}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
