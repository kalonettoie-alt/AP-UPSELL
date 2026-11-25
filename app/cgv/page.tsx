import type { Metadata } from "next";
import fr from "@/content/fr";
import PageTexteLegal from "@/components/v2/PageTexteLegal";
import { metaPage } from "@/lib/meta";

const t = fr.pagesLegales.cgv;

// Jamais indexée, et hors du sitemap.
export const metadata: Metadata = metaPage({ titre: t.titreGoogle, description: t.description, chemin: "/cgv/" });

export default function Cgv() {
  return <PageTexteLegal fichier="cgv" page="cgv" sommaire={t.sommaire} />;
}
