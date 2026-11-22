import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import fr from "@/content/fr";

/** Image de partage (Open Graph) : 1200 × 630, générée au moment du build. */
export const tailleOg = { width: 1200, height: 630 };
export const typeOg = "image/png";

const dossierPolices = join(process.cwd(), "assets", "og-fonts");

export async function imagePartage(titre: string) {
  const [serif, mono] = await Promise.all([
    readFile(join(dossierPolices, "YoungSerif-Regular.ttf")),
    readFile(join(dossierPolices, "DMMono-Medium.ttf")),
  ]);
  const rayures = Array.from({ length: 10 }, (_, i) => i);
  const boites = [
    { couleur: "#BFD9F2", h: 150 },
    { couleur: "#F7E3A1", h: 115 },
    { couleur: "#BFE3D0", h: 150 },
    { couleur: "#F6C9C4", h: 200 },
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#FAF4EA", color: "#2B2118" }}>
        <div style={{ display: "flex", height: 48, borderBottom: "4px solid #2B2118" }}>
          {rayures.map((i) => (
            <div key={i} style={{ flex: 1, background: i % 2 === 0 ? "#F6C9C4" : "#FAF4EA" }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", padding: "48px 64px 56px", gap: 48 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "Young Serif", fontSize: 40 }}>{fr.marque}</div>
            <div style={{ fontFamily: "Young Serif", fontSize: titre.length > 60 ? 50 : 58, lineHeight: 1.1 }}>{titre}</div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontFamily: "DM Mono",
                  fontSize: 24,
                  padding: "10px 20px",
                  border: "2px dashed #2B2118",
                  borderRadius: 999,
                }}
              >
                4,50 € HT par arrivée · Kit d'essai offert
              </div>
            </div>
          </div>
          <div
            style={{
              width: 330,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 20px 36px",
              background: "#D9BF97",
              border: "3px solid #2B2118",
              borderRadius: 28,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, padding: "0 10px" }}>
              {boites.map((b, i) => (
                <div
                  key={i}
                  style={{
                    flex: i === 3 ? 1.3 : 1,
                    height: b.h,
                    display: "flex",
                    flexDirection: "column",
                    background: "#C89A66",
                    border: "2px solid #2B2118",
                    borderBottom: "0",
                    borderRadius: "6px 6px 0 0",
                  }}
                >
                  <div style={{ height: 26, background: b.couleur, borderBottom: "2px solid #2B2118" }} />
                </div>
              ))}
            </div>
            <div style={{ height: 18, background: "#8E6A43", borderRadius: 4 }} />
          </div>
        </div>
      </div>
    ),
    {
      ...tailleOg,
      fonts: [
        { name: "Young Serif", data: serif, weight: 400, style: "normal" },
        { name: "DM Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
