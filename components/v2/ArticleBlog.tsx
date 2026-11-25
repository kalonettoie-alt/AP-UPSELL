import type { CSSProperties } from "react";
import JsonLd from "@/components/JsonLd";
import LienPage from "@/components/LienPage";
import { lireArticle, rubriqueDe, typo, type CleArticle } from "@/lib/blog";
import { PAGES } from "@/lib/routes";
import { SITE_CANONIQUE, urlAbsolue } from "@/lib/site";
import fr from "@/content/fr";
import AppelFinalArticle from "./AppelFinalArticle";
import CarteArticle from "./CarteArticle";
import { HEROS } from "./HerosArticles";
import TexteMarkdown from "./TexteMarkdown";

const sH2: CSSProperties = {
  fontFamily: "var(--f-serif)",
  fontWeight: 400,
  lineHeight: ".98",
  letterSpacing: "-0.02em",
  margin: 0,
  fontSize: "48px",
  marginTop: "24px",
  scrollMarginTop: "110px",
};
const sH3: CSSProperties = { fontFamily: "var(--f-serif)", fontWeight: 400, fontSize: "30px", lineHeight: "1.1", margin: "12px 0 0" };
const sP: CSSProperties = { fontSize: "18px", lineHeight: "1.75", margin: 0, color: "#4A3D30" };
const sListe: CSSProperties = { margin: 0, padding: "0 0 0 22px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "18px", lineHeight: "1.65", color: "#4A3D30" };
const COULEUR_RUBRIQUE: Record<string, string> = { rubriqueAccueil: "#F3C9B8", rubriqueOrganisation: "#CDDDE8" };

/** Article du journal : gabarit de la maquette V2, texte complet du fichier .md. */
export default function ArticleBlog({ cle }: { cle: CleArticle }) {
  const a = lireArticle(cle);
  const m = a.meta;
  const rubrique = rubriqueDe(cle);
  const [debutH1, finH1] = m.h1.includes(" : ") ? [m.h1.split(" : ")[0] + " : ", m.h1.split(" : ").slice(1).join(" : ")] : [m.h1, ""];
  const h2 = a.blocs.filter((b) => b.t === "h2");
  const aLire = m.aLireAussi.split(",").map((x) => x.trim() as CleArticle);
  let premier = true;

  return (
    <>
      <header
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "56px 32px 40px", display: "flex", flexDirection: "column", gap: "24px", textAlign: "center", alignItems: "center" }}
        className="m-px m-pt36"
      >
        <LienPage page={rubrique} sansPage="texte" style={{ background: COULEUR_RUBRIQUE[rubrique], borderRadius: "999px", padding: "6px 14px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
          {PAGES[rubrique].nom}
        </LienPage>
        <h1 style={{ fontFamily: "var(--f-serif)", fontWeight: 400, fontSize: m.h1.length > 55 ? "64px" : "80px", lineHeight: ".95", letterSpacing: "-0.03em", margin: 0 }} className="m-fs44">
          {debutH1}
          {finH1 ? <em>{finH1}</em> : null}
        </h1>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: "12px", letterSpacing: ".12em", color: "#7A6A58" }}>
          {m.auteur.toUpperCase()} · {m.date}
        </span>
      </header>
      {HEROS[m.illustration]}
      <section
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 32px 120px", display: "grid", gridTemplateColumns: "260px 1fr", gap: "80px", alignItems: "start" }}
        className="m-gtc m-px m-pb64 m-gap32"
      >
        <aside style={{ position: "sticky", top: "120px", display: "flex", flexDirection: "column", gap: "14px" }} className="m-static">
          <nav aria-label="Sommaire" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: "11px", letterSpacing: ".14em", color: "#7A6A58" }}>SOMMAIRE</span>
            {h2.map((b) =>
              b.t === "h2" ? (
                <a key={b.id} href={`#${b.id}`} style={{ textDecoration: "none", fontSize: "15px", lineHeight: "1.4", padding: "6px 0", minHeight: "44px", display: "flex", alignItems: "center", borderTop: "1px solid rgba(35,26,19,.12)" }}>
                  {b.texte}
                </a>
              ) : null,
            )}
          </nav>
          <div style={{ background: "#231A13", color: "#F6EEE2", borderRadius: "22px", padding: "22px", display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
            <span style={{ fontFamily: "var(--f-serif)", fontSize: "24px", lineHeight: "1.1" }}>Les 3 kits, offerts.</span>
            <LienPage page="essai" sansPage="masquer" style={{ color: "#F6EEE2", fontWeight: 600, fontSize: "14px", display: "inline-flex", alignItems: "center", minHeight: "44px" }}>
              {"Recevoir mon kit d'essai →"}
            </LienPage>
          </div>
        </aside>
        <article style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "760px" }}>
          {a.blocs.map((b, i) => {
            switch (b.t) {
              case "h2":
                return (
                  <h2 key={i} id={b.id} style={sH2} className="m-fs44">
                    {b.texte}
                  </h2>
                );
              case "h3":
                return (
                  <h3 key={i} style={sH3}>
                    {b.texte}
                  </h3>
                );
              case "p": {
                const style = premier ? { fontSize: "22px", lineHeight: "1.6", margin: 0 } : sP;
                premier = false;
                return (
                  <p key={i} style={style}>
                    <TexteMarkdown texte={b.texte} />
                  </p>
                );
              }
              case "ul":
              case "ol": {
                const Liste = b.t;
                return (
                  <Liste key={i} style={sListe}>
                    {b.items.map((x) => (
                      <li key={x}>
                        <TexteMarkdown texte={x} />
                      </li>
                    ))}
                  </Liste>
                );
              }
            }
          })}
        </article>
      </section>
      <section style={{ background: "#FFFBF5" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "140px 32px", display: "flex", flexDirection: "column", gap: "56px" }} className="m-px m-py64 m-gap32">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "920px" }}>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", color: "#7A6A58" }}>À lire aussi</span>
            <h2 style={{ fontFamily: "var(--f-serif)", fontWeight: 400, lineHeight: ".98", letterSpacing: "-0.02em", margin: 0, fontSize: "64px" }} className="m-fs44">
              Les autres <em>articles.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "28px" }} className="m-gtc">
            {aLire.map((c) => (
              <CarteArticle key={c} cle={c} />
            ))}
          </div>
        </div>
      </section>
      <AppelFinalArticle petitTitre={typo(m.appelPetitTitre)} titre={typo(m.appelTitre) + " "} italique={typo(m.appelTitreItalique)} texte={typo(m.appelTexte)} />
      <JsonLd
        donnees={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: m.h1,
          description: m.description,
          inLanguage: "fr-FR",
          mainEntityOfPage: urlAbsolue(a.url),
          image: urlAbsolue(`${a.url}opengraph-image`),
          author: m.auteur.split(" · ").map((n) => ({ "@type": "Person", name: n })),
          publisher: { "@id": `${SITE_CANONIQUE}/#organisation`, "@type": "Organization", name: fr.marque },
          ...(m.date.startsWith("[") ? {} : { datePublished: m.date }),
        }}
      />
    </>
  );
}
