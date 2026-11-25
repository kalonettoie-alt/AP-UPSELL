import type { Metadata } from "next";
import Contenu from "@/components/pages/Merci";
import Gabarit from "@/components/v2/Gabarit";
import { metaReglages } from "@/lib/meta";

export const metadata: Metadata = metaReglages("merci", true);

export default function Page() {
  return (
    <Gabarit allege={{ page: "appel", label: "Une question ? Réserver un appel" }}>
      <Contenu />
    </Gabarit>
  );
}
