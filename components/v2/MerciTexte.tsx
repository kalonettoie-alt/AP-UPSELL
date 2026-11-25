"use client";

import { useEffect, useState } from "react";
import { aFournir, delais } from "@/content/fr";
import { merciDemandes } from "@/content/pages";

type Demande = keyof typeof merciDemandes;

function lireDemande(): Demande {
  const d = new URLSearchParams(window.location.search).get("demande");
  return d && d in merciDemandes ? (d as Demande) : "kit-essai";
}

function remplir(t: string): string {
  return t
    .replace("{reponse}", delais.reponse)
    .replace("{delaiKitEssai}", aFournir.delaiKitEssai)
    .replace("{delaiMaquette}", aFournir.delaiMaquette);
}

/** Titre de /merci/ selon ?demande= (par défaut : kit-essai). */
export function MerciTitre() {
  const [d, setD] = useState<Demande>("kit-essai");
  useEffect(() => setD(lireDemande()), []);
  const h1 = merciDemandes[d].h1;
  return (
    <>
      {h1[0]}
      <em>{h1[1]}</em>
    </>
  );
}

/** Phrase sous le titre de /merci/ selon ?demande=. */
export function MerciPhrase() {
  const [d, setD] = useState<Demande>("kit-essai");
  useEffect(() => setD(lireDemande()), []);
  return <>{remplir(merciDemandes[d].texte)}</>;
}
