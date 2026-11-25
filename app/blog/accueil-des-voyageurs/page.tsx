import type { Metadata } from "next";
import Rubrique from "@/components/pages/Rubrique";
import Gabarit from "@/components/v2/Gabarit";
import { reglages } from "@/content/pages";
import { metaReglages } from "@/lib/meta";

export const metadata: Metadata = metaReglages("rubriqueAccueil");

export default function Page() {
  return (
    <Gabarit fil={reglages.rubriqueAccueil!.fil}>
      <Rubrique cle="rubriqueAccueil" />
    </Gabarit>
  );
}
