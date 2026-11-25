import type { Metadata } from "next";
import Contenu from "@/components/pages/Associe";
import Gabarit from "@/components/v2/Gabarit";
import { reglages } from "@/content/pages";
import { metaReglages } from "@/lib/meta";

export const metadata: Metadata = metaReglages("associe");

export default function Page() {
  return (
    <Gabarit fil={reglages.associe!.fil}>
      <Contenu />
    </Gabarit>
  );
}
