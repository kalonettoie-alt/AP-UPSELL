import fr from "@/content/fr";
import FormulaireV2 from "@/components/v2/FormulaireV2";
import { champsAppel } from "@/content/formulaires";
import TitreH1 from "@/components/v2/TitreH1";
import LienPage from "@/components/LienPage";

/** Page « Appel » — blocs générés depuis la maquette SINEBOX V2 (styles fidèles à la maquette). */
export default function Appel() {
  return (
    <>
<section style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 32px 120px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "64px", alignItems: "start" }} className="m-gtc m-px m-pb64 m-pt36 m-gap32">{" "}<div style={{ display: "flex", flexDirection: "column", gap: "26px" }}><span style={{ fontFamily: "var(--f-mono)", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", color: "#7A6A58" }}>{"Réserver un appel"}</span><h1 style={{ fontFamily: "var(--f-serif)", fontWeight: "400", fontSize: "64px", lineHeight: ".9", letterSpacing: "-0.03em", margin: "0" }} className="m-fs44"><TitreH1 page="appel" /></h1><p style={{ margin: "0", fontSize: "19px", lineHeight: "1.6", color: "#4A3D30" }}>{"On regarde ensemble vos logements, votre nombre d'arrivées et le lieu de livraison. Vous repartez avec votre prix par semaine."}</p><ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column" }}><li style={{ display: "flex", gap: "14px", padding: "16px 0", borderTop: "1px solid rgba(35,26,19,.12)", fontSize: "17px", lineHeight: "1.5" }}><span aria-hidden="true" style={{ color: "#7E9A74", fontWeight: "700" }}>{"✓"}</span><span>{"Votre nombre de logements et d'arrivées"}</span></li><li style={{ display: "flex", gap: "14px", padding: "16px 0", borderTop: "1px solid rgba(35,26,19,.12)", fontSize: "17px", lineHeight: "1.5" }}><span aria-hidden="true" style={{ color: "#7E9A74", fontWeight: "700" }}>{"✓"}</span><span>{"Le bon nombre de jeux selon la capacité"}</span></li><li style={{ display: "flex", gap: "14px", padding: "16px 0", borderTop: "1px solid rgba(35,26,19,.12)", fontSize: "17px", lineHeight: "1.5" }}><span aria-hidden="true" style={{ color: "#7E9A74", fontWeight: "700" }}>{"✓"}</span><span>{"Où livrer : bureau, logement ou Deltom Operator"}</span></li><li style={{ display: "flex", gap: "14px", padding: "16px 0", borderTop: "1px solid rgba(35,26,19,.12)", fontSize: "17px", lineHeight: "1.5" }}><span aria-hidden="true" style={{ color: "#7E9A74", fontWeight: "700" }}>{"✓"}</span><span>{"Votre étiquette à votre marque, si vous voulez"}</span></li></ul></div>{" "}<div style={{ background: "#FFFBF5", borderRadius: "36px", padding: "40px", boxShadow: "0 50px 80px -60px rgba(35,26,19,.5)", display: "flex", flexDirection: "column", gap: "24px" }} className="m-p26">{" "}<span style={{ fontFamily: "var(--f-mono)", fontSize: "11px", letterSpacing: ".14em", color: "#7A6A58" }}>{fr.appelV2.petitTitre}</span>{" "}<FormulaireV2
  prefixe="appel"
  formspree="essai"
  sujet={fr.appelV2.sujet}
  champSujet="societe"
  champs={champsAppel}
  bouton={fr.appelV2.bouton}
  demande="appel"
  colonnes={2}
  sousBouton={fr.appelV2.sousBouton}
/>{" "}</div>{" "}</section>
    </>
  );
}
