import type { Metadata } from "next";
import fr from "@/content/fr";
import AvantApres from "@/components/accueil/AvantApres";
import EnChiffres from "@/components/accueil/EnChiffres";
import Essai from "@/components/accueil/Essai";
import Etapes from "@/components/accueil/Etapes";
import Etiquette from "@/components/accueil/Etiquette";
import Hero from "@/components/accueil/Hero";
import Journal from "@/components/accueil/Journal";
import Livraison from "@/components/accueil/Livraison";
import Marque from "@/components/accueil/Marque";
import Packs from "@/components/accueil/Packs";
import Questions from "@/components/accueil/Questions";
import Rayon from "@/components/accueil/Rayon";
import VraiCalcul from "@/components/accueil/VraiCalcul";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { metaPage } from "@/lib/meta";
import { schemaFilAriane } from "@/lib/schema";

export const metadata: Metadata = metaPage({ titre: fr.seo.titre, description: fr.seo.description, chemin: "/" });

/** Accueil — maquette SINEBOX V2. */
export default function Page() {
  return (
    <>
      <a className="lien-evitement" href="#contenu">
        {fr.general.lienEvitement}
      </a>
      <Header />
      <main id="contenu">
        <Hero />
        <Rayon />
        <AvantApres />
        <EnChiffres />
        <Etapes />
        <Etiquette />
        <Packs />
        <Marque />
        <VraiCalcul />
        <Livraison />
        <Questions />
        <Journal />
        <Essai />
      </main>
      <Footer />
      <JsonLd donnees={schemaFilAriane([{ nom: "Accueil", chemin: "/" }])} />
    </>
  );
}
