"use client";

import { useState } from "react";
import fr from "@/content/fr";

/** Étiquette interactive de l'accueil (maquette V2) : une couleur par jour d'arrivée. */
export default function EtiquetteJours() {
  const t = fr.etiquetteV2;
  const [choix, setChoix] = useState(t.parDefaut);
  const j = t.jours[choix];
  const arrivee = `${j.long.charAt(0)}${j.long.slice(1).toLowerCase()} ${j.date}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px", alignItems: "center" }}>
      <div
        className="ill"
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "460px",
          borderRadius: "300px 300px 36px 36px",
          background: "radial-gradient(100% 80% at 50% 10%, #3A2E24 0%, #2B2119 100%)",
        }}
      >
        <div
          aria-live="polite"
          style={{
            width: "420px",
            background: "#FFFBF5",
            color: "#231A13",
            borderRadius: "16px",
            overflow: "hidden",
            transform: "rotate(-3deg)",
            boxShadow: "0 50px 80px -30px rgba(0,0,0,.7)",
          }}
        >
          <div
            style={{
              background: j.couleur,
              padding: "14px 26px",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--f-mono)",
              fontSize: "13px",
              letterSpacing: ".14em",
              transition: "background .4s ease",
            }}
          >
            <span>{j.long}</span>
            <span>{j.date}</span>
          </div>
          <div style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--f-serif)", fontSize: "42px", lineHeight: "1" }}>{j.logement}</span>
              <span
                style={{
                  flex: "none",
                  width: "52px",
                  height: "52px",
                  borderRadius: "26px",
                  border: "1px dashed #7A6A58",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--f-mono)",
                  fontSize: "9px",
                  color: "#7A6A58",
                }}
              >
                {t.logo}
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
                fontFamily: "var(--f-mono)",
                fontSize: "11px",
                letterSpacing: ".1em",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ color: "#7A6A58" }}>{t.arrivee}</span>
                <span style={{ fontSize: "14px", letterSpacing: "0" }}>{arrivee}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ color: "#7A6A58" }}>{t.dansLeKit}</span>
                <span style={{ fontSize: "14px", letterSpacing: "0" }}>{j.kit}</span>
              </div>
            </div>
            <div
              aria-hidden="true"
              style={{
                height: "30px",
                background:
                  "repeating-linear-gradient(90deg, #231A13 0 2px, transparent 2px 4px, #231A13 4px 7px, transparent 7px 9px)",
                opacity: ".85",
              }}
            />
          </div>
        </div>
      </div>
      <div role="group" aria-label={t.groupeLabel} style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        {t.jours.map((d, i) => {
          const actif = i === choix;
          return (
            <button
              key={d.court}
              type="button"
              aria-pressed={actif}
              onClick={() => setChoix(i)}
              style={{
                minWidth: "56px",
                height: "48px",
                padding: "0 12px",
                borderRadius: "24px",
                border: 0,
                cursor: "pointer",
                fontFamily: "var(--f-mono)",
                fontSize: "13px",
                color: "#231A13",
                background: d.couleur,
                transition: "transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s",
                transform: actif ? "scale(1.12)" : "scale(1)",
                boxShadow: actif ? `0 0 0 3px #231A13, 0 0 0 5px ${d.couleur}` : "none",
              }}
            >
              {d.court}
            </button>
          );
        })}
      </div>
    </div>
  );
}
