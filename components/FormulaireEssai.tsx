"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import fr from "@/content/fr";
import { actionFormspree, dateHeureEnvoi, envoyerFormspree, formspreeIds, lireUtmSource } from "@/lib/formspree";
import { estEmail, estNombreLogements, estVide } from "@/lib/validation";
import PotDeMiel from "./PotDeMiel";
import styles from "./FormulaireEssai.module.css";

type NomChamp = keyof typeof fr.formulaires.essai.champs;
type Etat = "attente" | "envoi" | "erreur";
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
  { nom: "source", type: "select", requis: true },
];

const m = fr.formulaires;
/** Page de remerciement après un envoi réussi. */
const PAGE_MERCI = "/merci/";

/** Vérifie un champ. Renvoie le message d'erreur, ou undefined si le champ est bon. */
function verifier(nom: NomChamp, input: HTMLInputElement | HTMLSelectElement): string | undefined {
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

/**
 * Formulaire « Kit d'essai » (bloc 11 et page /kit-essai/), envoyé à Formspree.
 * Sans JavaScript : envoi direct en POST (vérification du navigateur). Avec JavaScript : vérification, envoi, puis /merci/.
 */
export default function FormulaireEssai({ prefixe = "essai" }: { prefixe?: string }) {
  const t = m.essai;
  const formRef = useRef<HTMLFormElement>(null);
  const [etat, setEtat] = useState<Etat>("attente");
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [hydrate, setHydrate] = useState(false);
  const [utm, setUtm] = useState("");

  useEffect(() => {
    setHydrate(true);
    setUtm(lireUtmSource());
  }, []);

  function champ(nom: string): HTMLInputElement {
    return formRef.current!.elements.namedItem(nom) as HTMLInputElement;
  }

  /** Après une première erreur, le message se met à jour pendant la saisie. */
  function revoir(nom: NomChamp) {
    if (!erreurs[nom]) return;
    setErreurs((e) => ({ ...e, [nom]: verifier(nom, champ(nom)) }));
  }

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi") return;

    const nouvelles: Erreurs = {};
    for (const c of champs) {
      const msg = verifier(c.nom, champ(c.nom));
      if (msg) nouvelles[c.nom] = msg;
    }
    setErreurs(nouvelles);
    const premier = champs.find((c) => nouvelles[c.nom]);
    if (premier) {
      champ(premier.nom).focus();
      return;
    }

    const valeur = (nom: string) => champ(nom).value.trim();
    setEtat("envoi");
    const ok = await envoyerFormspree(formspreeIds.essai, {
      nom: valeur("nom"),
      societe: valeur("societe"),
      nombre_logements: valeur("nombre_logements"),
      ville: valeur("ville"),
      email: valeur("email"),
      telephone: valeur("telephone"),
      source: valeur("source"),
      utm_source: valeur("utm_source"),
      date_heure: dateHeureEnvoi(),
      _subject: t.sujet(valeur("societe")),
      _gotcha: champ("_gotcha").value,
    });
    if (ok) {
      window.location.assign(PAGE_MERCI);
    } else {
      setEtat("erreur");
    }
  }

  return (
    <div className={styles.carte}>
      <form
        ref={formRef}
        method="POST"
        action={actionFormspree(formspreeIds.essai)}
        onSubmit={envoyer}
        noValidate={hydrate}
      >
        <input type="hidden" name="_subject" value={t.sujetSansJs} readOnly />
        <input type="hidden" name="utm_source" value={utm} readOnly />
        <div className={styles.grille}>
          {champs.map((c) => {
            const id = `${prefixe}-${c.nom}`;
            const erreur = erreurs[c.nom];
            const communs = {
              id,
              name: c.nom,
              required: c.requis,
              className: styles.input,
              "aria-invalid": erreur ? true : undefined,
              "aria-describedby": erreur ? `${id}-erreur` : undefined,
              onChange: () => revoir(c.nom),
            };
            return (
              <div key={c.nom} className={`${styles.champ} ${c.type === "select" ? styles.large : ""}`}>
                <label htmlFor={id} className={styles.label}>
                  {t.champs[c.nom]}
                </label>
                {c.type === "select" ? (
                  <select {...communs} defaultValue="">
                    <option value="" disabled>
                      {t.sourceChoisir}
                    </option>
                    {t.sources.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    {...communs}
                    type={c.type}
                    autoComplete={c.autoComplete}
                    inputMode={c.inputMode}
                    min={c.type === "number" ? 1 : undefined}
                    step={c.type === "number" ? 1 : undefined}
                  />
                )}
                {erreur ? (
                  <p id={`${id}-erreur`} className={styles.erreur}>
                    {erreur}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
        <PotDeMiel id={`${prefixe}-gotcha`} />
        <button type="submit" className={`bouton ${styles.bouton}`} disabled={etat === "envoi"}>
          {etat === "envoi" ? m.envoiEnCours : t.bouton}
        </button>
        <div role="alert">{etat === "erreur" ? <p className={styles.erreurEnvoi}>{m.erreurEnvoi}</p> : null}</div>
        <p className={styles.sousBouton}>{t.sousBouton}</p>
      </form>
    </div>
  );
}
