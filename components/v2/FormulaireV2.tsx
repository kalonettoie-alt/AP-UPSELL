"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import fr from "@/content/fr";
import { actionFormspree, dateHeureEnvoi, envoyerFormspree, formspreeIds, lireUtmSource } from "@/lib/formspree";
import { estEmail, estNombreLogements, estVide } from "@/lib/validation";

/** Codes postaux livrés : Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). */
const PREFIXES_IDF = ["75", "77", "78", "91", "92", "93", "94", "95"];

export type Champ =
  | {
      nom: string;
      label: string;
      type: "text" | "email" | "tel" | "number" | "textarea" | "codePostal";
      requis?: boolean;
      facultatif?: string;
      aide?: string;
      autoComplete?: string;
      placeholder?: string;
      large?: boolean;
    }
  | { nom: string; label: string; type: "select"; requis?: boolean; options: string[]; large?: boolean }
  | { nom: string; label: string; type: "cases"; options: string[]; large?: boolean }
  | { nom: string; label: string; type: "consentement"; lien?: { label: string; href: string } }
  | { nom: string; type: "note"; texte: ReactNode };

export const styleLabel: CSSProperties = { display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: 500 };
export const styleChamp: CSSProperties = {
  font: "inherit",
  fontSize: "17px",
  padding: "14px 18px",
  border: 0,
  borderRadius: "16px",
  background: "#F6EEE2",
  minHeight: "54px",
  boxSizing: "border-box",
  width: "100%",
};
const styleAide: CSSProperties = { fontSize: "13px", color: "#7A6A58", fontWeight: 400 };
const styleErreur: CSSProperties = { fontSize: "13px", color: "#9A3A26", fontWeight: 600 };

const m = fr.formulaires;

/** Vérifie la valeur d'un champ ; renvoie le message d'erreur (ou un nœud avec lien pour le code postal). */
export function verifierChamp(c: Champ, el: Element | null): ReactNode | undefined {
  if (!el || c.type === "note") return undefined;
  if (c.type === "consentement") return (el as HTMLInputElement).checked ? undefined : m.erreurs.consentement;
  if (c.type === "cases") return undefined;
  const v = (el as HTMLInputElement).value;
  const requis = "requis" in c && c.requis;
  if (c.type === "number" && (el as HTMLInputElement).validity?.badInput) return m.erreurs.nombreLogements;
  if (requis && estVide(v)) return m.erreurs.obligatoire;
  if (estVide(v)) return undefined;
  if (c.type === "email" && !estEmail(v)) return m.erreurs.email;
  if (c.type === "number" && !estNombreLogements(v)) return m.erreurs.nombreLogements;
  if (c.type === "codePostal") {
    const cp = v.trim();
    if (!/^\d{5}$/.test(cp)) return m.erreurs.codePostal;
    if (!PREFIXES_IDF.includes(cp.slice(0, 2)))
      return (
        <>
          {m.erreurs.horsIdf} <a href="/livraison-ile-de-france/#ailleurs">{m.erreurs.horsIdfLien}</a>
        </>
      );
  }
  return undefined;
}

/** Affiche un champ au style de la maquette. */
export function RenduChamp({ c, prefixe, erreur }: { c: Champ; prefixe: string; erreur?: ReactNode }) {
  if (c.type === "note") return <p style={{ fontSize: "15px", color: "#4A3D30" }}>{c.texte}</p>;
  const id = `${prefixe}-${c.nom}`;
  const aria = { "aria-invalid": erreur ? true : undefined, "aria-describedby": erreur ? `${id}-erreur` : undefined };
  const msg = erreur ? (
    <span id={`${id}-erreur`} style={styleErreur}>
      {erreur}
    </span>
  ) : null;
  const grille: CSSProperties = "large" in c && c.large ? { gridColumn: "1 / -1" } : {};

  if (c.type === "consentement") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "1 / -1" }}>
        <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "14px", color: "#4A3D30", cursor: "pointer" }}>
          <input type="checkbox" id={id} name={c.nom} required value="oui" style={{ width: "22px", height: "22px", flex: "none", accentColor: "#231A13" }} {...aria} />
          <span>
            {c.label}
            {c.lien ? (
              <>
                {" "}
                <a href={c.lien.href}>{c.lien.label}</a>
              </>
            ) : null}
          </span>
        </label>
        {msg}
      </div>
    );
  }
  if (c.type === "cases") {
    return (
      <fieldset style={{ ...grille, border: 0, margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
        <legend style={{ ...styleLabel, padding: 0, marginBottom: "8px" }}>{c.label}</legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {c.options.map((o) => (
            <label
              key={o}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", padding: "0 16px", borderRadius: "999px", background: "#F6EEE2", cursor: "pointer", fontSize: "15px" }}
            >
              <input type="checkbox" name={c.nom} value={o} style={{ accentColor: "#231A13" }} />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
  const requis = "requis" in c && c.requis;
  return (
    <div style={{ ...grille, display: "flex", flexDirection: "column", gap: "6px", minWidth: 0 }}>
      <label htmlFor={id} style={styleLabel}>
        <span>
          {c.label}
          {"facultatif" in c && c.facultatif ? <span style={styleAide}> {c.facultatif}</span> : null}
        </span>
      </label>
      {c.type === "select" ? (
        <select id={id} name={c.nom} required={requis} defaultValue="" style={{ ...styleChamp, cursor: "pointer" }} {...aria}>
          <option value="" disabled>
            {m.choisir}
          </option>
          {c.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : c.type === "textarea" ? (
        <textarea id={id} name={c.nom} required={requis} rows={4} style={{ ...styleChamp, resize: "vertical" }} {...aria} />
      ) : (
        <input
          id={id}
          name={c.nom}
          type={c.type === "codePostal" ? "text" : c.type}
          inputMode={c.type === "codePostal" || c.type === "number" ? "numeric" : undefined}
          min={c.type === "number" ? 1 : undefined}
          required={requis}
          autoComplete={c.autoComplete}
          placeholder={c.placeholder}
          style={styleChamp}
          {...aria}
        />
      )}
      {"aide" in c && c.aide ? <span style={styleAide}>{c.aide}</span> : null}
      {msg}
    </div>
  );
}

type Props = {
  prefixe: string;
  formspree: "essai" | "attente";
  /** Sujet de l'e-mail reçu, complété par la valeur du champ `champSujet` (« Appel — Société »). */
  sujet: string;
  champSujet?: string;
  champs: Champ[];
  bouton: string;
  /** Valeur de ?demande= sur la page /merci/. */
  demande: string;
  /** Nombre de colonnes sur ordinateur. */
  colonnes?: 1 | 2;
  sousBouton?: ReactNode;
  style?: CSSProperties;
  className?: string;
};

/** Formulaire au style de la maquette V2 : POST Formspree, vérification, puis /merci/?demande=… */
export default function FormulaireV2({ prefixe, formspree, sujet, champSujet, champs, bouton, demande, colonnes = 1, sousBouton, style, className }: Props) {
  const ref = useRef<HTMLFormElement>(null);
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

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi") return;
    const f = ref.current!;
    const nouvelles: Record<string, ReactNode> = {};
    for (const c of champs) {
      const msg = verifierChamp(c, f.elements.namedItem(c.nom) as Element | null);
      if (msg) nouvelles[c.nom] = msg;
    }
    setErreurs(nouvelles);
    const premier = champs.find((c) => nouvelles[c.nom]);
    if (premier) {
      (f.elements.namedItem(premier.nom) as HTMLElement | null)?.focus();
      return;
    }
    const donnees = lireValeurs(f);
    setEtat("envoi");
    const ok = await envoyerFormspree(formspreeIds[formspree], {
      ...donnees,
      date_heure: dateHeureEnvoi(),
      _subject: champSujet && donnees[champSujet] ? `${sujet} — ${donnees[champSujet]}` : sujet,
    });
    if (ok) window.location.assign(`/merci/?demande=${demande}`);
    else setEtat("erreur");
  }

  return (
    <form
      ref={ref}
      method="POST"
      action={actionFormspree(formspreeIds[formspree])}
      onSubmit={envoyer}
      noValidate={hydrate}
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "18px", ...style }}
    >
      <ChampsCaches sujet={sujet} utm={utm} origine={origine} prefixe={prefixe} />
      <div className={colonnes === 2 ? "m-gtc" : undefined} style={{ display: "grid", gridTemplateColumns: colonnes === 2 ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)", gap: "16px" }}>
        {champs.map((c) => (
          <RenduChamp key={c.nom} c={c} prefixe={prefixe} erreur={erreurs[c.nom]} />
        ))}
      </div>
      <button type="submit" className="b1" disabled={etat === "envoi"} style={{ border: 0, cursor: "pointer", font: "inherit", fontWeight: 600, alignSelf: "flex-start" }}>
        {etat === "envoi" ? m.envoiEnCours : bouton}
      </button>
      <div role="alert">{etat === "erreur" ? <p style={styleErreur}>{m.erreurEnvoi}</p> : null}</div>
      {sousBouton ? <p style={{ fontSize: "14px", color: "#7A6A58" }}>{sousBouton}</p> : null}
    </form>
  );
}

/** Champs cachés communs : sujet, source (utm_source), page d'origine, piège anti-robots. */
export function ChampsCaches({ sujet, utm, origine, prefixe }: { sujet: string; utm: string; origine: string; prefixe: string }) {
  return (
    <>
      <input type="hidden" name="_subject" value={sujet} readOnly />
      <input type="hidden" name="source" value={utm} readOnly />
      <input type="hidden" name="page_origine" value={origine} readOnly />
      <div className="visuellement-cache" aria-hidden="true">
        <label htmlFor={`${prefixe}-gotcha`}>{m.pieges.label}</label>
        <input id={`${prefixe}-gotcha`} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
    </>
  );
}

/** Valeurs du formulaire (les cases multiples sont réunies, séparées par des virgules). */
export function lireValeurs(f: HTMLFormElement): Record<string, string> {
  const donnees: Record<string, string> = {};
  new FormData(f).forEach((v, k) => {
    const t = String(v).trim();
    donnees[k] = donnees[k] ? `${donnees[k]}, ${t}` : t;
  });
  return donnees;
}
