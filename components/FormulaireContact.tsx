"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import fr from "@/content/fr";
import { actionFormspree, dateHeureEnvoi, envoyerFormspree, formspreeIds, lireUtmSource } from "@/lib/formspree";
import { estEmail, estVide } from "@/lib/validation";
import PotDeMiel from "./PotDeMiel";
import styles from "./FormulaireEssai.module.css";

type NomChamp = keyof typeof fr.formulaires.contact.champs;
type Etat = "attente" | "envoi" | "reussi" | "erreur";
const m = fr.formulaires;
const noms: NomChamp[] = ["nom", "email", "message"];

function verifier(nom: NomChamp, valeur: string): string | undefined {
  if (estVide(valeur)) return m.erreurs.obligatoire;
  if (nom === "email" && !estEmail(valeur)) return m.erreurs.email;
  return undefined;
}

/** Formulaire de la page Contact : envoyé au Formspree du kit d'essai, sujet « Contact — {nom} ». */
export default function FormulaireContact() {
  const t = m.contact;
  const formRef = useRef<HTMLFormElement>(null);
  const [etat, setEtat] = useState<Etat>("attente");
  const [erreurs, setErreurs] = useState<Partial<Record<NomChamp, string>>>({});
  const [hydrate, setHydrate] = useState(false);
  const [utm, setUtm] = useState("");

  useEffect(() => {
    setHydrate(true);
    setUtm(lireUtmSource());
  }, []);

  function valeur(nom: string): string {
    return (formRef.current!.elements.namedItem(nom) as HTMLInputElement).value.trim();
  }

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi") return;
    const nouvelles: Partial<Record<NomChamp, string>> = {};
    for (const n of noms) {
      const msg = verifier(n, valeur(n));
      if (msg) nouvelles[n] = msg;
    }
    setErreurs(nouvelles);
    const premier = noms.find((n) => nouvelles[n]);
    if (premier) {
      (formRef.current!.elements.namedItem(premier) as HTMLElement).focus();
      return;
    }
    setEtat("envoi");
    const ok = await envoyerFormspree(formspreeIds.essai, {
      nom: valeur("nom"),
      email: valeur("email"),
      message: valeur("message"),
      utm_source: valeur("utm_source"),
      date_heure: dateHeureEnvoi(),
      _subject: t.sujet(valeur("nom")),
      _gotcha: valeur("_gotcha"),
    });
    setEtat(ok ? "reussi" : "erreur");
  }

  return (
    <div className={styles.carte}>
      <div role="status">
        {etat === "reussi" ? <p className={styles.succesTexte}>{t.succes}</p> : null}
      </div>
      {etat !== "reussi" ? (
        <form ref={formRef} method="POST" action={actionFormspree(formspreeIds.essai)} onSubmit={envoyer} noValidate={hydrate}>
          <input type="hidden" name="_subject" value={t.sujetSansJs} readOnly />
          <input type="hidden" name="utm_source" value={utm} readOnly />
          <div className={styles.grille}>
            {noms.map((n) => {
              const id = `contact-${n}`;
              const erreur = erreurs[n];
              const communs = {
                id,
                name: n,
                required: true,
                className: styles.input,
                "aria-invalid": erreur ? true : undefined,
                "aria-describedby": erreur ? `${id}-erreur` : undefined,
                onChange: () => erreur && setErreurs((e) => ({ ...e, [n]: verifier(n, valeur(n)) })),
              };
              return (
                <div key={n} className={`${styles.champ} ${n === "message" ? styles.large : ""}`}>
                  <label htmlFor={id} className={styles.label}>
                    {t.champs[n]}
                  </label>
                  {n === "message" ? (
                    <textarea {...communs} rows={6} />
                  ) : (
                    <input {...communs} type={n === "email" ? "email" : "text"} autoComplete={n === "email" ? "email" : "name"} />
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
          <PotDeMiel id="contact-gotcha" />
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
