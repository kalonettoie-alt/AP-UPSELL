import type { Metadata } from "next";
import Contenu from "@/components/pages/KitEssai";
import Gabarit from "@/components/v2/Gabarit";
import { metaReglages } from "@/lib/meta";

export const metadata: Metadata = metaReglages("essai");

export default function Page() {
  return (
    <Gabarit allege={{ page: "appel", label: "Une question ? Réserver un appel" }}>
      <Contenu />
    </Gabarit>
  );
}
