import type { Metadata } from "next";
import fr from "@/content/fr";
import Footer from "@/components/Footer";
import FormulaireEssai from "@/components/FormulaireEssai";
import Header from "@/components/Header";
import { metaPage } from "@/lib/meta";
import styles from "./page.module.css";

const t = fr.pages.kitEssai;

export const metadata: Metadata = metaPage({ titre: t.titreGoogle, description: t.description, chemin: "/kit-essai/" });

/** Page du kit d'essai : formulaire seul, sans menu. Après envoi réussi : /merci/. */
export default function KitEssaiPage() {
  return (
    <>
      <Header simple />
      <main id="contenu" className={`conteneur ${styles.main}`}>
        <div className={styles.encadre}>
          <div>
            <h1 className={styles.titre}>{t.titre}</h1>
            <p className={styles.texte}>{t.texte}</p>
          </div>
          <FormulaireEssai prefixe="page-essai" />
        </div>
        <p className={styles.retour}>
          <a href="/">{t.retour}</a>
        </p>
      </main>
      <Footer />
    </>
  );
}
