import { PAGES, urlPage, type CleePage } from "@/lib/routes";

const RUBRIQUES: CleePage[] = ["blog", "rubriqueConsommables", "rubriqueAccueil", "rubriqueOrganisation"];

/** Puces de navigation du journal (maquette V2). Une rubrique sans article publié n'apparaît pas. */
export default function PucesRubriques({ active }: { active: CleePage }) {
  return (
    <nav aria-label="Rubriques du journal" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {RUBRIQUES.map((cle) => {
        const url = urlPage(cle);
        if (!url) return null;
        const on = cle === active;
        return (
          <a
            key={cle}
            href={url}
            aria-current={on ? "page" : undefined}
            style={{
              textDecoration: "none",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
              padding: "0 18px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: 500,
              background: on ? "#231A13" : "rgba(35,26,19,.06)",
              color: on ? "#FFFBF5" : "#231A13",
            }}
          >
            {cle === "blog" ? "Tous" : PAGES[cle].nom}
          </a>
        );
      })}
    </nav>
  );
}
