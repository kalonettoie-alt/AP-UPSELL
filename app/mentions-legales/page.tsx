import type { Metadata } from "next";
import fr from "@/content/fr";
import PageLegale from "@/components/PageLegale";
import { metaPage } from "@/lib/meta";

const t = fr.pagesLegales.mentionsLegales;
const chemin = "/mentions-legales/";

export const metadata: Metadata = metaPage({ titre: t.titreGoogle, description: t.description, chemin });

export default function MentionsLegales() {
  return <PageLegale titre={t.titre} page="mentionsLegales" blocs={t.blocs} />;
}
