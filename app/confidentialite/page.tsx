import type { Metadata } from "next";
import fr from "@/content/fr";
import PageTexteLegal from "@/components/v2/PageTexteLegal";
import { metaPage } from "@/lib/meta";

const t = fr.pagesLegales.confidentialite;

export const metadata: Metadata = metaPage({ titre: t.titreGoogle, description: t.description, chemin: "/confidentialite/" });

export default function Confidentialite() {
  return <PageTexteLegal fichier="confidentialite" page="confidentialite" />;
}
