import type { Metadata } from "next";
import Contenu from "@/components/pages/APropos";
import Gabarit from "@/components/v2/Gabarit";
import { reglages } from "@/content/pages";
import { metaReglages } from "@/lib/meta";

export const metadata: Metadata = metaReglages("apropos");

export default function Page() {
  return (
    <Gabarit fil={reglages.apropos!.fil}>
      <Contenu />
    </Gabarit>
  );
}
