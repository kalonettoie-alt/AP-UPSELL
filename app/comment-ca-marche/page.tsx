import type { Metadata } from "next";
import Contenu from "@/components/pages/CommentCaMarche";
import Gabarit from "@/components/v2/Gabarit";
import { reglages } from "@/content/pages";
import { metaReglages } from "@/lib/meta";

export const metadata: Metadata = metaReglages("ccm");

export default function Page() {
  return (
    <Gabarit fil={reglages.ccm!.fil}>
      <Contenu />
    </Gabarit>
  );
}
