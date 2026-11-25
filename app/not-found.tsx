import type { Metadata } from "next";
import fr from "@/content/fr";
import Gabarit from "@/components/v2/Gabarit";
import { PAGES, urlPage } from "@/lib/routes";

const t = fr.pages.introuvable;

export const metadata: Metadata = { title: { absolute: t.titreGoogle } };

/** Page 404 (style de la maquette V2) avec des liens utiles. */
export default function Introuvable() {
  const liens = (["accueil", "ccm", "kits", "tarifs", "essai", "appel"] as const).filter((c) => urlPage(c));
  return (
    <Gabarit>
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "96px 32px 140px", display: "flex", flexDirection: "column", gap: "28px" }} className="m-px m-py64">
        <span style={{ fontFamily: "var(--f-mono)", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", color: "#7A6A58" }}>404</span>
        <h1 style={{ fontFamily: "var(--f-serif)", fontWeight: 400, fontSize: "88px", lineHeight: ".95", letterSpacing: "-0.03em", margin: 0 }} className="m-fs44">
          {t.titre}
        </h1>
        <p style={{ margin: 0, fontSize: "19px", lineHeight: "1.6", color: "#4A3D30", maxWidth: "560px" }}>{t.texte}</p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column" }}>
          {liens.map((c) => (
            <li key={c} style={{ borderTop: "1px solid rgba(35,26,19,.12)" }}>
              <a href={PAGES[c].url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "64px", textDecoration: "none", fontFamily: "var(--f-serif)", fontSize: "28px" }}>
                {PAGES[c].nom}
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Gabarit>
  );
}
