import fr from "@/content/fr";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./PageLegale.module.css";

export default function PageLegale({ titre, contenu }: { titre: string; contenu: string }) {
  return (
    <>
      <a className="lien-evitement" href="#contenu">
        {fr.general.lienEvitement}
      </a>
      <Header surAutrePage />
      <main id="contenu" className={`conteneur ${styles.page}`}>
        <h1>{titre}</h1>
        <p className={styles.contenu}>{contenu}</p>
        <a className={styles.retour} href="/">
          {fr.pagesLegales.retour}
        </a>
      </main>
      <Footer />
    </>
  );
}
