import type { Metadata } from "next";
import Contenu from "@/components/pages/Appel";
import Gabarit from "@/components/v2/Gabarit";
import { metaReglages } from "@/lib/meta";

export const metadata: Metadata = metaReglages("appel");

export default function Page() {
  return (
    <Gabarit allege={{ page: "essai", label: "Kit d'essai offert" }}>
      <Contenu />
    </Gabarit>
  );
}
