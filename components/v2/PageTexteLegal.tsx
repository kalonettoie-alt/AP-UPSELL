import { Fragment, type CSSProperties, type ReactNode } from "react";
import { lireTexteLegal } from "@/lib/legal";
import type { CleePage } from "@/lib/routes";
import Gabarit from "./Gabarit";

/** Texte en ligne : **gras**, *italique*, adresses e-mail en lien. */
function Ligne({ texte }: { texte: string }) {
  const morceaux: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|([\w.+-]+@[\w-]+\.[a-z]{2,})/g;
  let dernier = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(texte))) {
    if (m.index > dernier) morceaux.push(texte.slice(dernier, m.index));
    if (m[1]) morceaux.push(<strong key={i++} style={{ color: "#231A13" }}>{m[1]}</strong>);
    else if (m[2]) morceaux.push(<em key={i++} style={{ color: "inherit" }}>{m[2]}</em>);
    else morceaux.push(<a key={i++} href={`mailto:${m[3]}`}>{m[3]}</a>);
    dernier = m.index + m[0].length;
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier));
  return <Fragment>{morceaux}</Fragment>;
}

const sTexte: CSSProperties = { fontSize: "17px", lineHeight: "1.7", color: "#4A3D30", margin: 0 };
const sCellule: CSSProperties = { padding: "12px 16px", textAlign: "left", verticalAlign: "top", borderTop: "1px solid rgba(35,26,19,.12)" };

/** CGV et politique de confidentialité (fichiers de content/legal/), dans le gabarit de la maquette V2. */
export default function PageTexteLegal({ fichier, page, sommaire }: { fichier: "cgv" | "confidentialite"; page: CleePage; sommaire?: string }) {
  const blocs = lireTexteLegal(fichier);
  const rubriques = blocs.filter((b) => b.t === "h2");
  return (
    <Gabarit fil={["accueil", page]}>
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 32px 140px", display: "flex", flexDirection: "column", gap: "18px" }} className="m-px m-pt36 m-pb64">
        {blocs.map((b, i) => {
          switch (b.t) {
            case "titre":
              return (
                <Fragment key={i}>
                  <h1 style={{ fontFamily: "var(--f-serif)", fontWeight: 400, fontSize: "72px", lineHeight: ".98", letterSpacing: "-0.03em", margin: "0 0 8px" }} className="m-fs44">
                    {b.texte}
                  </h1>
                </Fragment>
              );
            case "h2":
              return (
                <Fragment key={i}>
                  {sommaire && b === rubriques[0] ? (
                    <nav aria-labelledby="sommaire" style={{ background: "#FFFBF5", borderRadius: "28px", padding: "28px 32px", margin: "16px 0" }} className="m-p26">
                      <p id="sommaire" style={{ fontFamily: "var(--f-mono)", fontSize: "11px", letterSpacing: ".14em", color: "#7A6A58", textTransform: "uppercase", margin: 0 }}>
                        {sommaire}
                      </p>
                      <ol style={{ margin: "12px 0 0", padding: 0, listStyle: "none", columns: "2 260px", columnGap: "32px" }}>
                        {rubriques.map((r) =>
                          r.t === "h2" ? (
                            <li key={r.id} style={{ breakInside: "avoid" }}>
                              <a href={`#${r.id}`} style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", fontSize: "15px" }}>
                                {r.texte}
                              </a>
                            </li>
                          ) : null,
                        )}
                      </ol>
                    </nav>
                  ) : null}
                  <h2 id={b.id} style={{ fontFamily: "var(--f-serif)", fontWeight: 400, fontSize: "40px", lineHeight: "1.05", margin: "36px 0 0", scrollMarginTop: "110px" }}>
                    {b.texte}
                  </h2>
                </Fragment>
              );
            case "h3":
              return (
                <h3 key={i} style={{ fontFamily: "var(--f-serif)", fontWeight: 400, fontSize: "26px", lineHeight: "1.15", margin: "16px 0 0" }}>
                  {b.texte}
                </h3>
              );
            case "p":
              return (
                <p key={i} style={sTexte}>
                  <Ligne texte={b.texte} />
                </p>
              );
            case "ul":
            case "ol": {
              const Liste = b.t;
              return (
                <Liste key={i} style={{ ...sTexte, paddingLeft: "22px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {b.items.map((it) => (
                    <li key={it.texte}>
                      <Ligne texte={it.texte} />
                      {it.sous.length ? (
                        <ul style={{ margin: "8px 0 0", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                          {it.sous.map((s) => (
                            <li key={s}>
                              <Ligne texte={s} />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </Liste>
              );
            }
            case "table":
              return (
                <div key={i} role="region" aria-label={b.entetes.join(", ")} tabIndex={0} style={{ overflowX: "auto", background: "#FFFBF5", borderRadius: "20px" }}>
                  <table style={{ width: "100%", minWidth: b.entetes.length > 2 ? "720px" : undefined, borderCollapse: "collapse", fontSize: "15px", lineHeight: "1.5", color: "#4A3D30" }}>
                    <thead>
                      <tr>
                        {b.entetes.map((e) => (
                          <th key={e} scope="col" style={{ ...sCellule, borderTop: 0, fontFamily: "var(--f-mono)", fontSize: "11px", letterSpacing: ".1em", textTransform: "uppercase", color: "#7A6A58", fontWeight: 500 }}>
                            {e}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.lignes.map((l) => (
                        <tr key={l.join("|")}>
                          {l.map((c, j) =>
                            j === 0 ? (
                              <th key={j} scope="row" style={{ ...sCellule, fontWeight: 600, color: "#231A13" }}>
                                {c}
                              </th>
                            ) : (
                              <td key={j} style={sCellule}>
                                {c}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
          }
        })}
      </section>
    </Gabarit>
  );
}
