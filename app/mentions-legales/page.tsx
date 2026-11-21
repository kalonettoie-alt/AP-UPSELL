import type { Metadata } from "next";
import fr from "@/content/fr";
import PageLegale from "@/components/PageLegale";

const t = fr.pagesLegales.mentionsLegales;

export const metadata: Metadata = {
  title: `${t.titre} | ${fr.marque}`,
  alternates: { canonical: "/mentions-legales/" },
};

export default function MentionsLegales() {
  return <PageLegale titre={t.titre} contenu={t.contenu} />;
}
