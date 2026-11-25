import type { ReactNode } from "react";
import fr from "@/content/fr";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { CleePage } from "@/lib/routes";
import FilAriane from "./FilAriane";
import PiedAllege from "./PiedAllege";

type Props = {
  /** Étapes du fil d'Ariane (de l'accueil à la page). Absent : pas de fil d'Ariane. */
  fil?: CleePage[];
  /** Gabarit allégé (kit d'essai, appel, merci) : lien affiché à droite de l'en-tête. */
  allege?: { page: CleePage; label: string };
  children: ReactNode;
};

/** Gabarit commun des pages de la maquette V2. */
export default function Gabarit({ fil, allege, children }: Props) {
  return (
    <>
      <a className="lien-evitement" href="#contenu">
        {fr.general.lienEvitement}
      </a>
      {allege ? <Header allege={allege} /> : <Header />}
      <main id="contenu">
        {fil ? <FilAriane etapes={fil} /> : null}
        {children}
      </main>
      {allege ? <PiedAllege /> : <Footer />}
    </>
  );
}
