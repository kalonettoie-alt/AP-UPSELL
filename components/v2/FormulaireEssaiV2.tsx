"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import fr from "@/content/fr";
import { etapesEssai } from "@/content/formulaires";
import { actionFormspree, dateHeureEnvoi, envoyerFormspree, lireUtmSource } from "@/lib/formspree";
import { ChampsCaches, lireValeurs, RenduChamp, verifierChamp } from "./FormulaireV2";

const m = fr.formulaires;

/** Kit d'essai en trois étapes (maquette V2). Sans JavaScript, les trois étapes s'affichent ensemble. */
export default function FormulaireEssaiV2() {
  const ref = useRef<HTMLFormElement>(null);
  const [etape, setEtape] = useState(1);
  const [erreurs, setErreurs] = useState<Record<string, ReactNode>>({});
  const [etat, setEtat] = useState<"attente" | "envoi" | "erreur">("attente");
  const [hydrate, setHydrate] = useState(false);
  const [utm, setUtm] = useState("");
  const [origine, setOrigine] = useState("");
  useEffect(() => {
    setHydrate(true);
    setUtm(lireUtmSource());
    setOrigine(window.location.pathname);
  }, []);

  const total = etapesEssai.length;
  const nomEtape = etapesEssai[etape - 1].nom;

  /** Vérifie les champs d'une étape ; renvoie true si tout est bon. */
  function verifier(n: number): boolean {
    const f = ref.current!;
    const champs = etapesEssai[n - 1].champs;
    const nouvelles: Record<string, ReactNode> = {};
    for (const c of champs) {
      const msg = verifierChamp(c, f.elements.namedItem(c.nom) as Element | null);
      if (msg) nouvelles[c.nom] = msg;
    }
    setErreurs(nouvelles);
    const premier = champs.find((c) => nouvelles[c.nom]);
    if (premier) (f.elements.namedItem(premier.nom) as HTMLElement | null)?.focus();
    return !premier;
  }

  async function suivant(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi" || !verifier(etape)) return;
    if (etape < total) {
      setEtape(etape + 1);
      return;
    }
    const donnees = lireValeurs(ref.current!);
    setEtat("envoi");
    const ok = await envoyerFormspree({
      ...donnees,
      date_heure: dateHeureEnvoi(),
      _subject: m.essai.sujet(donnees.societe ?? ""),
    });
    if (ok) window.location.assign("/merci/?demande=kit-essai");
    else setEtat("erreur");
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--f-mono)", fontSize: "12px", letterSpacing: ".14em" }}>
          <span>
            ÉTAPE {etape} SUR {total}
          </span>
          <span style={{ color: "#7A6A58" }}>{nomEtape.toUpperCase()}</span>
        </div>
        <div
          role="progressbar"
          aria-label="Avancement de la demande"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={etape}
          style={{ height: "6px", background: "#F6EEE2", borderRadius: "3px" }}
        >
          <div
            style={{
              height: "6px",
              borderRadius: "3px",
              background: "#231A13",
              width: `${(etape * 100) / total}%`,
              transition: "width .5s cubic-bezier(.16,1,.3,1)",
            }}
          />
        </div>
      </div>
      <form
        ref={ref}
        method="POST"
        action={actionFormspree()}
        onSubmit={suivant}
        noValidate={hydrate}
        style={{ display: "flex", flexDirection: "column", gap: "26px" }}
      >
        <ChampsCaches sujet={m.essai.sujetSansJs} utm={utm} origine={origine} prefixe="essai" />
        {etapesEssai.map((et, i) => (
          <div key={et.nom} style={{ display: !hydrate || i + 1 === etape ? "block" : "none" }}>
            <div className="m-gtc" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}>
              {et.champs.map((c) => (
                <RenduChamp key={c.nom} c={c} prefixe="essai" erreur={erreurs[c.nom]} />
              ))}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <button
            type="button"
            onClick={() => setEtape(Math.max(1, etape - 1))}
            style={{
              minHeight: "54px",
              padding: "0 24px",
              border: 0,
              borderRadius: "999px",
              background: "#F6EEE2",
              font: "inherit",
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
              visibility: hydrate && etape > 1 ? "visible" : "hidden",
            }}
          >
            {m.retour}
          </button>
          <button type="submit" className="b1" disabled={etat === "envoi"} style={{ border: 0, cursor: "pointer", font: "inherit", fontWeight: 600 }}>
            {etat === "envoi" ? m.envoiEnCours : !hydrate || etape === total ? m.essai.bouton : m.continuer}
          </button>
        </div>
        <div role="alert">{etat === "erreur" ? <p style={{ fontSize: "14px", color: "#9A3A26", fontWeight: 600 }}>{m.erreurEnvoi}</p> : null}</div>
      </form>
    </>
  );
}
