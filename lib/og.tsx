import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import fr, { prix } from "@/content/fr";
import { formatPrix } from "./prix";

/** Image de partage (Open Graph) : 1200 × 630, générée au build, dans le style de la maquette V2. */
export const tailleOg = { width: 1200, height: 630 };
export const typeOg = "image/png";

const dossier = join(process.cwd(), "assets");

/** `titre` : début du titre, `italique` : fin en italique (comme les H1 de la maquette). */
export async function imagePartage(titre: string, italique = "") {
  const [serif, serifItalique, mono, sac] = await Promise.all([
    readFile(join(dossier, "og-fonts", "InstrumentSerif-Regular.ttf")),
    readFile(join(dossier, "og-fonts", "InstrumentSerif-Italic.ttf")),
    readFile(join(dossier, "og-fonts", "DMMono-Medium.ttf")),
    readFile(join(dossier, "og-sac.png")),
  ]);
  const sacSrc = `data:image/png;base64,${sac.toString("base64")}`;
  const longueur = titre.length + italique.length;
  const taille = longueur > 70 ? 58 : longueur > 45 ? 68 : 80;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F6EEE2", color: "#231A13", padding: "56px 64px", gap: "48px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "Instrument Serif", fontSize: 64, letterSpacing: "-0.04em", lineHeight: 0.8 }}>{fr.site.logo}</div>
          <div style={{ display: "flex", flexWrap: "wrap", fontFamily: "Instrument Serif", fontSize: taille, lineHeight: 0.98, letterSpacing: "-0.02em" }}>
            <span>{titre}</span>
            {italique ? <span style={{ fontFamily: "Instrument Serif Italic", color: "#9A5B3C" }}>{italique}</span> : null}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[`${formatPrix(prix.troisKits)} HT par arrivée`, "Kit d'essai offert"].map((t) => (
              <div key={t} style={{ fontFamily: "DM Mono", fontSize: 22, padding: "10px 20px", background: "#FFFBF5", borderRadius: 999 }}>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            width: 360,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 48,
            borderRadius: "180px 180px 36px 36px",
            background: "radial-gradient(90% 80% at 60% 30%, #F7ECCB 0%, #F2E2AC 55%, #E5CF8A 100%)",
          }}
        >
          <img src={sacSrc} width={240} height={300} alt="" />
        </div>
      </div>
    ),
    {
      ...tailleOg,
      fonts: [
        { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
        { name: "Instrument Serif Italic", data: serifItalique, weight: 400, style: "normal" },
        { name: "DM Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
