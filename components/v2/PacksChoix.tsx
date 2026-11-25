"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import fr, { packParDefaut, packs, prix } from "@/content/fr";
import { additionner, formatPrix } from "@/lib/prix";

const Contexte = createContext<{ choix: number; choisir: (i: number) => void } | null>(null);

/** État partagé du choix de pack (boutons et ticket sont à deux endroits de la page). */
export function PacksProvider({ children }: { children: ReactNode }) {
  const [choix, choisir] = useState(packs.findIndex((p) => p.id === packParDefaut));
  return <Contexte.Provider value={{ choix, choisir }}>{children}</Contexte.Provider>;
}

function usePacks() {
  const e = useContext(Contexte);
  if (!e) throw new Error("PacksProvider manquant");
  return e;
}

/** Les six boutons de pack (sacs rendus côté serveur, passés en props). */
export function BoutonsPacks({ sacs }: { sacs: ReactNode[] }) {
  const { choix, choisir } = usePacks();
  return (
    <div
      role="group"
      aria-label={fr.ticketV2.groupeLabel}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        gap: "10px",
        padding: "26px 22px 0",
        borderRadius: "28px",
        background: "linear-gradient(180deg, #F6EEE2 0%, #EFE4D3 100%)",
      }}
      className="pk6 m-gtc"
    >
      {packs.map((p, i) => {
        const actif = i === choix;
        return (
          <button
            key={p.id}
            type="button"
            aria-pressed={actif}
            onClick={() => choisir(i)}
            style={{
              background: "transparent",
              border: 0,
              cursor: "pointer",
              font: "inherit",
              color: "#231A13",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "0 0 26px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <span
              style={{
                display: "block",
                transition: "transform .45s cubic-bezier(.16,1,.3,1), filter .3s",
                transform: actif ? "translateY(-14px) rotate(-3deg)" : "none",
                filter: actif ? "none" : "saturate(.75) opacity(.85)",
              }}
            >
              {sacs[i]}
            </span>
            <span style={{ fontFamily: "var(--f-serif)", fontSize: "22px", lineHeight: "1.05", textAlign: "center" }}>{p.nomCourt}</span>
            <span style={{ fontSize: "13px", fontWeight: 600 }}>{formatPrix(p.prix)} HT</span>
          </button>
        );
      })}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "14px", borderRadius: "0 0 28px 28px", background: "linear-gradient(180deg, #D9C4A6, #C9B08C)" }}
      />
    </div>
  );
}

/** Ticket de l'arrivée : Les 3 kits + pack choisi, total calculé depuis content/fr.ts. */
export function TicketPack() {
  const t = fr.ticketV2;
  const { choix } = usePacks();
  const pack = packs[choix];
  return (
    <div
      aria-live="polite"
      style={{ background: "#FFFBF5", borderRadius: "24px", overflow: "hidden", boxShadow: "0 40px 60px -40px rgba(35,26,19,.5)", fontFamily: "var(--f-mono)" }}
    >
      <div style={{ background: pack.teinte, padding: "14px 26px", display: "flex", justifyContent: "space-between", fontSize: "12px", letterSpacing: ".14em", transition: "background .4s" }}>
        <span>{t.titre}</span>
        <span>{t.jour}</span>
      </div>
      <div style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{t.troisKits}</span>
          <span>{formatPrix(prix.troisKits)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            {t.prefixePack} {pack.nomCourt}
          </span>
          <span>{formatPrix(pack.prix)}</span>
        </div>
        <ul style={{ margin: 0, padding: "0 0 0 14px", fontFamily: "var(--f-sans)", fontSize: "14px", color: "#4A3D30", lineHeight: "1.7" }}>
          {pack.contenu.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div style={{ borderTop: "1px dashed #BBA98F" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span>{t.total}</span>
          <span style={{ fontFamily: "var(--f-serif)", fontSize: "44px" }}>{formatPrix(additionner(prix.troisKits, pack.prix))}</span>
        </div>
        <div
          aria-hidden="true"
          style={{ height: "26px", background: "repeating-linear-gradient(90deg, #231A13 0 2px, transparent 2px 4px, #231A13 4px 7px, transparent 7px 9px)", opacity: ".8" }}
        />
      </div>
    </div>
  );
}
