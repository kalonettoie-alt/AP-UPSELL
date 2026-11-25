"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import fr from "@/content/fr";
import { actionFormspree, dateHeureEnvoi, envoyerFormspree, lireUtmSource } from "@/lib/formspree";
import { estEmail, estVide } from "@/lib/validation";
import { ChampsCaches } from "./FormulaireV2";

/** Liste d'attente en une ligne (maquette V2, page livraison) : e-mail, puis /merci/?demande=liste-attente. */
export default function ListeAttenteV2({ sujet, prefixe }: { sujet: string; prefixe: string }) {
  const t = fr.listeAttenteV2;
  const ref = useRef<HTMLFormElement>(null);
  const [erreur, setErreur] = useState<string | undefined>();
  const [etat, setEtat] = useState<"attente" | "envoi" | "erreur">("attente");
  const [hydrate, setHydrate] = useState(false);
  const [utm, setUtm] = useState("");
  const [origine, setOrigine] = useState("");
  useEffect(() => {
    setHydrate(true);
    setUtm(lireUtmSource());
    setOrigine(window.location.pathname);
  }, []);

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi") return;
    const champ = ref.current!.elements.namedItem("email") as HTMLInputElement;
    const v = champ.value;
    const msg = estVide(v) ? fr.formulaires.erreurs.obligatoire : estEmail(v) ? undefined : fr.formulaires.erreurs.email;
    setErreur(msg);
    if (msg) {
      champ.focus();
      return;
    }
    setEtat("envoi");
    const ok = await envoyerFormspree({
      email: v.trim(),
      source: utm,
      page_origine: origine,
      date_heure: dateHeureEnvoi(),
      _subject: sujet,
      _gotcha: (ref.current!.elements.namedItem("_gotcha") as HTMLInputElement).value,
    });
    if (ok) window.location.assign("/merci/?demande=liste-attente");
    else setEtat("erreur");
  }

  const id = `${prefixe}-email`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "440px" }}>
      <form
        ref={ref}
        method="POST"
        action={actionFormspree()}
        onSubmit={envoyer}
        noValidate={hydrate}
        style={{ display: "flex", borderBottom: "1.5px solid #231A13" }}
      >
        <ChampsCaches sujet={sujet} utm={utm} origine={origine} prefixe={prefixe} />
        <label htmlFor={id} className="visuellement-cache">
          {t.label}
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t.placeholder}
          aria-invalid={erreur ? true : undefined}
          aria-describedby={erreur ? `${id}-erreur` : undefined}
          style={{ flex: 1, minWidth: 0, border: 0, background: "transparent", font: "inherit", fontSize: "18px", padding: "12px 0" }}
        />
        <button
          type="submit"
          aria-label={t.bouton}
          disabled={etat === "envoi"}
          style={{ border: 0, background: "transparent", fontSize: "22px", cursor: "pointer", minWidth: "44px", minHeight: "44px" }}
        >
          →
        </button>
      </form>
      {erreur ? (
        <span id={`${id}-erreur`} style={{ fontSize: "13px", color: "#9A3A26", fontWeight: 600 }}>
          {erreur}
        </span>
      ) : null}
      <div role="alert">{etat === "erreur" ? <p style={{ fontSize: "13px", color: "#9A3A26", fontWeight: 600 }}>{fr.formulaires.erreurEnvoi}</p> : null}</div>
    </div>
  );
}
