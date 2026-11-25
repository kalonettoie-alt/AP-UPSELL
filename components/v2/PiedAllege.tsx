import { Fragment } from "react";
import fr from "@/content/fr";
import { urlPage } from "@/lib/routes";

/** Pied de page réduit des pages kit d'essai, appel et merci (maquette V2). */
export default function PiedAllege() {
  const p = fr.site.pied;
  return (
    <footer style={{ borderTop: "1px solid rgba(35,26,19,.12)" }}>
      <div
        className="m-px pied-allege"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "28px 32px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 24px",
          justifyContent: "space-between",
          fontSize: "13px",
          color: "#7A6A58",
        }}
      >
        <span>
          {p.copyright} {new Date().getFullYear()}
        </span>
        <span>
          {p.legal.map((l, i) => {
            const url = urlPage(l.page);
            if (!url) return null;
            return (
              <Fragment key={l.label}>
                {i > 0 ? " · " : null}
                <a href={l.ancre ? `${url}#${l.ancre}` : url} style={{ color: "#7A6A58" }}>
                  {l.label}
                </a>
              </Fragment>
            );
          })}
        </span>
      </div>
    </footer>
  );
}
