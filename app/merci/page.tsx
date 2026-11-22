import type { Metadata } from "next";
import fr from "@/content/fr";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { metaPage } from "@/lib/meta";
import styles from "../kit-essai/page.module.css";
import contenu from "@/components/Contenu.module.css";

const t = fr.pages.merci;

// Jamais indexée, et hors du sitemap.
export const metadata: Metadata = metaPage({ titre: t.titreGoogle, description: t.texte, chemin: "/merci/", jamaisIndexee: true });

export default function Merci() {
  return (
    <>
      <Header />
      <main id="contenu" className={`conteneur ${styles.main}`}>
        <div className={styles.encadre} style={{ background: "var(--menthe)" }}>
          <div>
            <h1 className={styles.titre}>{t.titre}</h1>
            <p className={styles.texte}>{t.texte}</p>
            <ul className={contenu.liensSimples}>
              {t.liens.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
