import { reglages } from "@/content/pages";
import type { CleePage } from "@/lib/routes";

/** Texte du H1 d'une page (fichier .md), fin en italique comme dans la maquette. */
export default function TitreH1({ page }: { page: CleePage }) {
  const r = reglages[page];
  if (!r) return null;
  return (
    <>
      {r.h1[0]}
      <em>{r.h1[1]}</em>
    </>
  );
}
