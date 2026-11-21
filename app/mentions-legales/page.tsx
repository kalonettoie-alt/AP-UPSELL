import type { Metadata } from "next";
import fr from "@/content/fr";
import PageLegale from "@/components/PageLegale";
import { canonique } from "@/lib/site";

const t = fr.pagesLegales.mentionsLegales;

export const metadata: Metadata = {
  title: `${t.titre} | ${fr.marque}`,
  alternates: canonique("/mentions-legales/"),
  openGraph: { title: `${t.titre} | ${fr.marque}`, url: "/mentions-legales/", type: "website", locale: "fr_FR", siteName: fr.marque },
};

export default function MentionsLegales() {
  return <PageLegale titre={t.titre} contenu={t.contenu} />;
}
