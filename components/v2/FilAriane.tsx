import { Fragment } from "react";
import JsonLd from "@/components/JsonLd";
import { schemaFilAriane } from "@/lib/schema";
import { PAGES, type CleePage } from "@/lib/routes";

/** Fil d'Ariane de la maquette V2, avec ses données BreadcrumbList. La dernière étape est la page courante. */
export default function FilAriane({ etapes }: { etapes: CleePage[] }) {
  const liste = etapes.map((c) => PAGES[c]);
  return (
    <>
      <nav aria-label="Fil d'Ariane" className="m-px fil-ariane">
        {liste.map((p, i) => {
          const derniere = i === liste.length - 1;
          return (
            <Fragment key={p.url}>
              {i > 0 ? (
                <span aria-hidden="true" style={{ color: "#BBA98F" }}>
                  /
                </span>
              ) : null}
              {derniere ? (
                <span aria-current="page" style={{ color: "#231A13" }}>
                  {p.nom}
                </span>
              ) : (
                <a href={p.url} style={{ textDecoration: "none", color: "#7A6A58" }}>
                  {p.nom}
                </a>
              )}
            </Fragment>
          );
        })}
      </nav>
      <JsonLd donnees={schemaFilAriane(liste.map((p) => ({ nom: p.nom, chemin: p.url })))} />
    </>
  );
}
