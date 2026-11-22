"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import fr from "@/content/fr";
import { actionFormspree, dateHeureEnvoi, envoyerFormspree, formspreeIds } from "@/lib/formspree";
import { estEmail, estVide } from "@/lib/validation";
import PotDeMiel from "./PotDeMiel";
import styles from "./ListeAttente.module.css";

type Etat = "attente" | "envoi" | "reussi" | "erreur";
const m = fr.formulaires;

function verifier(valeur: string): string | undefined {
  if (estVide(valeur)) return m.erreurs.obligatoire;
  return estEmail(valeur) ? undefined : m.erreurs.email;
}

/** Liste d'attente hors Île-de-France (bloc 8), envoyée à Formspree. */
export default function ListeAttente() {
  const t = m.attente;
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [etat, setEtat] = useState<Etat>("attente");
  const [erreur, setErreur] = useState<string | undefined>();
  const [hydrate, setHydrate] = useState(false);
  useEffect(() => setHydrate(true), []);

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (etat === "envoi") return;
    const email = emailRef.current!;
    const msg = verifier(email.value);
    setErreur(msg);
    if (msg) {
      email.focus();
      return;
    }
    setEtat("envoi");
    const gotcha = formRef.current!.elements.namedItem("_gotcha") as HTMLInputElement;
    const ok = await envoyerFormspree(formspreeIds.attente, {
      email: email.value.trim(),
      liste: t.sujet,
      date_heure: dateHeureEnvoi(),
      _subject: t.sujet,
      _gotcha: gotcha.value,
    });
    setEtat(ok ? "reussi" : "erreur");
  }

  return (
    <div className={styles.formulaire}>
      {etat !== "reussi" ? (
        <form
          ref={formRef}
          method="POST"
          action={actionFormspree(formspreeIds.attente)}
          onSubmit={envoyer}
          noValidate={hydrate}
        >
          <input type="hidden" name="_subject" value={t.sujet} readOnly />
          <input type="hidden" name="liste" value={t.sujet} readOnly />
          <label htmlFor="attente-email" className={styles.label}>
            {t.label}
          </label>
          <div className={styles.ligne}>
            <input
              ref={emailRef}
              id="attente-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={t.placeholder}
              className={styles.champ}
              aria-invalid={erreur ? true : undefined}
              aria-describedby={erreur ? "attente-email-erreur" : undefined}
              onChange={(e) => erreur && setErreur(verifier(e.currentTarget.value))}
            />
            <button type="submit" className="bouton" disabled={etat === "envoi"}>
              {etat === "envoi" ? m.envoiEnCours : t.bouton}
            </button>
          </div>
          {erreur ? (
            <p id="attente-email-erreur" className={styles.erreur}>
              {erreur}
            </p>
          ) : null}
          <PotDeMiel id="attente-gotcha" />
          <div role="alert">{etat === "erreur" ? <p className={styles.erreur}>{m.erreurEnvoi}</p> : null}</div>
        </form>
      ) : (
        <p className={styles.label}>{t.label}</p>
      )}
      <div role="status">{etat === "reussi" ? <p className={styles.succes}>{t.succes}</p> : null}</div>
    </div>
  );
}
