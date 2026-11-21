"use client";

import { useRef, useState, type FormEvent } from "react";
import fr from "@/content/fr";
import { dateHeureEnvoi, envoyerFormspree, formspreeIds } from "@/lib/formspree";
import { estEmail, estNombreLogements, estVide } from "@/lib/validation";
import PotDeMiel from "./PotDeMiel";
import styles from "./FormulaireEssai.module.css";

type NomChamp = keyof typeof fr.formulaires.essai.champs;
type Etat = "attente" | "envoi" | "reussi" | "erreur";
type Erreurs = Partial<Record<NomChamp, string>>;

const champs: {
  nom: NomChamp;
  type: string;
  requis: boolean;
  autoComplete?: string;
  inputMode?: "numeric";
}[] = [
  { nom: "nom", type: "text", requis: true, autoComplete: "name" },
  { nom: "societe", type: "text", requis: true, autoComplete: "organization" },
  { nom: "nombre_logements", type: "number", requis: true, inputMode: "numeric" },
  { nom: "ville", type: "text", requis: true, autoComplete: "address-level2" },
  { nom: "email", type: "email", requis: true, autoComplete: "email" },
  { nom: "telephone", type: "tel", requis: false, autoComplete: "tel" },
];

const m = fr.formulaires;

/** Vérifie un champ. Renvoie le message d'erreur, ou undefined si le champ est bon. */
function verifier(nom: NomChamp, input: HTMLInputElement): string | undefined {
  const valeur = input.value;
  if (nom === "nombre_logements") {
    // Saisie non numérique : le navigateur renvoie "" avec validity.badInput.
    if (input.validity.badInput) return m.erreurs.nombreLogements;
    if (estVide(valeur)) return m.erreurs.obligatoire;
    return estNombreLogements(valeur) ? undefined : m.erreurs.nombreLogements;
  }
  const requis = champs.find((c) => c.nom === nom)?.requis;
  if (requis && estVide(valeur)) return m.erreurs.obligatoire;
  if (nom === "email" && !estEmail(valeur)) return m.erreurs.email;
  return undefined;
}

/** Formulaire « Kit d'essai » (bloc 11), envoyé à Formspree. */
export default function FormulaireEssai() {
  const t = m.essai;
  const formRef = useRef<HTMLFormElement>(null);
  const [etat, setEtat] = useState<Etat>("attente");
  const [erreurs, setErreurs] = useState<Erreurs>({});

  function input(nom: string): HTMLInputElement {
    return formRef.current!.elements.namedItem(nom) as HTMLInputElement;
  }

  /** Après une première erreur, le message se met à jour pendant la saisie. */
  function revoir(nom: NomChamp) {
    if (!erreurs[nom]) return;
    setErreurs((e) => ({ ...e, [nom]: verifier(nom, input(nom)) }));
  }

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi") return;

    const nouvelles: Erreurs = {};
    for (const c of champs) {
      const msg = verifier(c.nom, input(c.nom));
      if (msg) nouvelles[c.nom] = msg;
    }
    setErreurs(nouvelles);
    const premier = champs.find((c) => nouvelles[c.nom]);
    if (premier) {
      input(premier.nom).focus();
      return;
    }

    const valeur = (nom: string) => input(nom).value.trim();
    setEtat("envoi");
    const ok = await envoyerFormspree(formspreeIds.essai, {
      nom: valeur("nom"),
      societe: valeur("societe"),
      nombre_logements: valeur("nombre_logements"),
      ville: valeur("ville"),
      email: valeur("email"),
      telephone: valeur("telephone"),
      date_heure: dateHeureEnvoi(),
      _subject: t.sujet(valeur("societe")),
      _gotcha: input("_gotcha").value,
    });
    setEtat(ok ? "reussi" : "erreur");
  }

  return (
    <div className={styles.carte}>
      <div role="status">
        {etat === "reussi" ? (
          <div className={styles.succes}>
            <span className={styles.coche} aria-hidden="true">
              ✓
            </span>
            <p>{t.succes}</p>
          </div>
        ) : null}
      </div>

      {etat !== "reussi" ? (
        <form ref={formRef} onSubmit={envoyer} noValidate>
          <div className={styles.grille}>
            {champs.map((c) => {
              const id = `essai-${c.nom}`;
              const erreur = erreurs[c.nom];
              return (
                <div key={c.nom} className={styles.champ}>
                  <label htmlFor={id} className={styles.label}>
                    {t.champs[c.nom]}
                  </label>
                  <input
                    id={id}
                    name={c.nom}
                    type={c.type}
                    required={c.requis}
                    autoComplete={c.autoComplete}
                    inputMode={c.inputMode}
                    min={c.type === "number" ? 1 : undefined}
                    step={c.type === "number" ? 1 : undefined}
                    className={styles.input}
                    aria-invalid={erreur ? true : undefined}
                    aria-describedby={erreur ? `${id}-erreur` : undefined}
                    onChange={() => revoir(c.nom)}
                  />
                  {erreur ? (
                    <p id={`${id}-erreur`} className={styles.erreur}>
                      {erreur}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <PotDeMiel id="essai-gotcha" />
          <button type="submit" className={`bouton ${styles.bouton}`} disabled={etat === "envoi"}>
            {etat === "envoi" ? m.envoiEnCours : t.bouton}
          </button>
          <div role="alert">{etat === "erreur" ? <p className={styles.erreurEnvoi}>{m.erreurEnvoi}</p> : null}</div>
          <p className={styles.sousBouton}>{t.sousBouton}</p>
        </form>
      ) : null}
    </div>
  );
}
