"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Jour = { court: string; long: string; couleur: string; date: string; logement: string; kit: string };

type Etat = { jours: Jour[]; choix: number; choisir: (i: number) => void };
const Contexte = createContext<Etat | null>(null);

/** État partagé du sélecteur de jour (les boutons et l'étiquette sont à deux endroits de la page). */
export function JoursProvider({ jours, parDefaut, children }: { jours: Jour[]; parDefaut: number; children: ReactNode }) {
  const [choix, choisir] = useState(parDefaut);
  return <Contexte.Provider value={{ jours, choix, choisir }}>{children}</Contexte.Provider>;
}

function useJours(): Etat {
  const e = useContext(Contexte);
  if (!e) throw new Error("JoursProvider manquant");
  return e;
}

/** Boutons LUN…DIM (style de la maquette). */
export function BoutonsJours({ label, taille = 48, police = 14, lettres }: { label: string; taille?: number; police?: number; lettres?: boolean }) {
  const { jours, choix, choisir } = useJours();
  return (
    <div role="group" aria-label={label} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {jours.map((d, i) => {
        const actif = i === choix;
        return (
          <button
            key={d.long}
            type="button"
            aria-pressed={actif}
            aria-label={lettres ? d.long.charAt(0) + d.long.slice(1).toLowerCase() : undefined}
            onClick={() => choisir(i)}
            style={{
              width: `${taille}px`,
              height: `${taille}px`,
              borderRadius: `${taille / 2}px`,
              border: 0,
              cursor: "pointer",
              fontFamily: "var(--f-mono)",
              fontSize: `${police}px`,
              color: "#231A13",
              background: d.couleur,
              transition: "transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s",
              transform: actif ? "scale(1.15)" : "scale(1)",
              boxShadow: actif ? `0 0 0 3px #231A13, 0 0 0 5px ${d.couleur}` : "none",
            }}
          >
            {d.court}
          </button>
        );
      })}
    </div>
  );
}

/** En-tête coloré de l'étiquette (jour en toutes lettres et date). */
export function EnteteJour() {
  const { jours, choix } = useJours();
  const d = jours[choix];
  return (
    <div
      style={{
        background: d.couleur,
        padding: "14px 26px",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "var(--f-mono)",
        fontSize: "13px",
        letterSpacing: ".14em",
        transition: "background .4s ease",
      }}
    >
      <span>{d.long}</span>
      <span>{d.date}</span>
    </div>
  );
}

/** Une valeur du jour choisi. */
export function ChampJour({ champ }: { champ: "logement" | "arrivee" | "kit" | "long" | "date" }) {
  const { jours, choix } = useJours();
  const d = jours[choix];
  if (champ === "arrivee") return <>{`${d.long.charAt(0)}${d.long.slice(1).toLowerCase()} ${d.date}`}</>;
  return <>{d[champ]}</>;
}
