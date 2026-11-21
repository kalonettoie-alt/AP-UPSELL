import type { Metadata } from "next";
import fr from "@/content/fr";
import PageLegale from "@/components/PageLegale";

const t = fr.pagesLegales.cgv;

export const metadata: Metadata = {
  title: `${t.titre} | ${fr.marque}`,
  alternates: { canonical: "/cgv/" },
};

export default function Cgv() {
  return <PageLegale titre={t.titre} contenu={t.contenu} />;
}
