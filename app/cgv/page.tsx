import type { Metadata } from "next";
import fr from "@/content/fr";
import PageLegale from "@/components/PageLegale";
import { canonique } from "@/lib/site";

const t = fr.pagesLegales.cgv;

export const metadata: Metadata = {
  title: `${t.titre} | ${fr.marque}`,
  alternates: canonique("/cgv/"),
  openGraph: { title: `${t.titre} | ${fr.marque}`, url: "/cgv/", type: "website", locale: "fr_FR", siteName: fr.marque },
};

export default function Cgv() {
  return <PageLegale titre={t.titre} contenu={t.contenu} />;
}
