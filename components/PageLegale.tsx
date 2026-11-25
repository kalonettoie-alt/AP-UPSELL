import type { BlocLegal } from "@/content/fr";
import type { CleePage } from "@/lib/routes";
import { ancre, TexteRiche } from "@/lib/texte";
import Gabarit from "./v2/Gabarit";

type Props = {
  titre: string;
  page: CleePage;
  blocs: BlocLegal[];
  /** Titre du sommaire cliquable (CGV). */
  sommaire?: string;
};

/** Mentions légales et CGV, dans le gabarit de la maquette V2. */
export default function PageLegale({ titre, page, blocs, sommaire }: Props) {
  const rubriques = blocs.filter((b): b is Extract<BlocLegal, { t: "h2" }> => b.t === "h2");
  return (
    <Gabarit fil={["accueil", page]}>
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 32px 140px", display: "flex", flexDirection: "column", gap: "18px" }} className="m-px m-pt36 m-pb64 legal">
        <h1 style={{ fontFamily: "var(--f-serif)", fontWeight: 400, fontSize: "80px", lineHeight: ".95", letterSpacing: "-0.03em", margin: "0 0 24px" }} className="m-fs44">
          {titre}
        </h1>
        {sommaire ? (
          <nav aria-labelledby="sommaire" style={{ background: "#FFFBF5", borderRadius: "28px", padding: "28px 32px", marginBottom: "24px" }} className="m-p26">
            <p id="sommaire" style={{ fontFamily: "var(--f-mono)", fontSize: "11px", letterSpacing: ".14em", color: "#7A6A58", textTransform: "uppercase" }}>
              {sommaire}
            </p>
            <ol style={{ margin: "12px 0 0", padding: 0, listStyle: "none", columns: "2 260px", columnGap: "32px" }}>
              {rubriques.map((r) => (
                <li key={r.texte} style={{ breakInside: "avoid" }}>
                  <a href={`#${ancre(r.texte)}`} style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", fontSize: "15px" }}>
                    {r.texte}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {blocs.map((b, i) => {
          switch (b.t) {
            case "h2":
              return (
                <h2 key={i} id={ancre(b.texte)} style={{ fontFamily: "var(--f-serif)", fontWeight: 400, fontSize: "40px", lineHeight: "1.05", margin: "36px 0 0", scrollMarginTop: "110px" }}>
                  {b.texte}
                </h2>
              );
            case "p":
              return (
                <p key={i} style={{ fontSize: "17px", lineHeight: "1.7", color: "#4A3D30" }}>
                  {b.lead ? <strong style={{ color: "#231A13" }}>{b.lead} </strong> : null}
                  <TexteRiche texte={b.texte} />
                </p>
              );
            case "ul":
            case "ol": {
              const Liste = b.t;
              return (
                <Liste key={i} style={{ margin: 0, paddingLeft: "22px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "17px", lineHeight: "1.65", color: "#4A3D30" }}>
                  {b.items.map((item) => (
                    <li key={item}>
                      <TexteRiche texte={item} />
                    </li>
                  ))}
                </Liste>
              );
            }
          }
        })}
      </section>
    </Gabarit>
  );
}
