import type { Metadata } from "next";
import Contenu from "@/components/pages/Kits";
import JsonLd from "@/components/JsonLd";
import Gabarit from "@/components/v2/Gabarit";
import { reglages } from "@/content/pages";
import { metaReglages } from "@/lib/meta";
import { schemaProduits } from "@/lib/schema";

export const metadata: Metadata = metaReglages("kits");

export default function Page() {
  return (
    <Gabarit fil={reglages.kits!.fil}>
      <Contenu />
      {schemaProduits("kits").map((p) => (
        <JsonLd key={p.name} donnees={p} />
      ))}
    </Gabarit>
  );
}
