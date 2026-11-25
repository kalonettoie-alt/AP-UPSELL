import type { Metadata } from "next";
import ArticleBlog from "@/components/v2/ArticleBlog";
import Gabarit from "@/components/v2/Gabarit";
import { lireArticle } from "@/lib/blog";
import { metaPage } from "@/lib/meta";

const a = lireArticle("articleListe");

export const metadata: Metadata = metaPage({ titre: a.meta.titreGoogle, description: a.meta.description, chemin: a.url });

export default function Page() {
  return (
    <Gabarit fil={["accueil", "blog", "rubriqueAccueil", "articleListe"]}>
      <ArticleBlog cle="articleListe" />
    </Gabarit>
  );
}
