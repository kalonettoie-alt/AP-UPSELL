import fr from "@/content/fr";
import Avant from "@/components/Avant";
import CommentCaMarche from "@/components/CommentCaMarche";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NosKits from "@/components/NosKits";
import QuiArrive from "@/components/QuiArrive";

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
      </main>
    </>
  );
}
