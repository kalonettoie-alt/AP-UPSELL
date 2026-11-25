import type { Metadata } from "next";
import Contenu from "@/components/pages/Packs";
import JsonLd from "@/components/JsonLd";
import Gabarit from "@/components/v2/Gabarit";
import { reglages } from "@/content/pages";
import { metaReglages } from "@/lib/meta";
import { schemaProduits } from "@/lib/schema";

export const metadata: Metadata = metaReglages("packs");

export default function Page() {
  return (
    <Gabarit fil={reglages.packs!.fil}>
      <Contenu />
      {schemaProduits("packs").map((p) => (
        <JsonLd key={p.name} donnees={p} />
      ))}
    </Gabarit>
  );
}
