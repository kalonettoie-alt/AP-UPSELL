import { groupesFaq } from "@/content/faq";

/** Un groupe de questions de la FAQ (style de la maquette V2), lu depuis content/faq.ts. */
export default function GroupeFaqV2({ ancre }: { ancre: string }) {
  const g = groupesFaq.find((x) => x.ancre === ancre)!;
  return (
    <div
      id={g.ancre}
      style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "60px", paddingTop: "40px", borderTop: "1px solid rgba(35,26,19,.12)", scrollMarginTop: "110px" }}
      className="m-gtc"
    >
      <h2 style={{ fontFamily: "var(--f-serif)", fontWeight: 400, lineHeight: ".98", letterSpacing: "-0.02em", margin: 0, fontSize: "44px" }} className="m-fs44">
        {g.titre}
      </h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {g.questions.map((q) => (
          <details key={q.question} style={{ borderTop: "1px solid rgba(35,26,19,.12)" }}>
            <summary
              style={{
                listStyle: "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "24px",
                padding: "24px 0",
                fontFamily: "var(--f-serif)",
                fontSize: "27px",
                lineHeight: "1.15",
              }}
            >
              <span>{q.question}</span>
              <span
                aria-hidden="true"
                style={{
                  flex: "0 0 40px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "20px",
                  background: "rgba(35,26,19,.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--f-sans)",
                  fontSize: "22px",
                }}
                className="pl"
              >
                +
              </span>
            </summary>
            <p style={{ margin: 0, padding: "0 60px 26px 0", fontSize: "17px", lineHeight: "1.65", color: "#4A3D30" }}>{q.reponse}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
