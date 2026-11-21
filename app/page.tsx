import fr from "@/content/fr";
import AVotreMarque from "@/components/AVotreMarque";
import Avant from "@/components/Avant";
import CommentCaMarche from "@/components/CommentCaMarche";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KitEssai from "@/components/KitEssai";
import Livraison from "@/components/Livraison";
import NosKits from "@/components/NosKits";
import QuiArrive from "@/components/QuiArrive";
import VraiCalcul from "@/components/VraiCalcul";

export default function Page() {
  return (
    <>
      <a className="lien-evitement" href="#contenu">
        {fr.general.lienEvitement}
      </a>
      <Header />
      <main id="contenu">
        <Hero />
        <Avant />
        <CommentCaMarche />
        <NosKits />
        <QuiArrive />
        <VraiCalcul />
        <Livraison />
        <AVotreMarque />
        <Faq />
        <KitEssai />
      </main>
      <Footer />
    </>
  );
}
