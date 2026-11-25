"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import fr from "@/content/fr";
import { urlPage } from "@/lib/routes";

/** Pages sans barre : celles qui contiennent déjà le formulaire ou qui le suivent. */
const SANS_BARRE = ["/kit-essai/", "/appel/", "/merci/"];

/**
 * Barre fixe en bas de l'écran, sur téléphone uniquement (CSS, max-width 760px) :
 * « Recevoir mon kit d'essai ». Elle apparaît après un écran de défilement et se retire
 * dès que le bloc final, un formulaire ou le pied de page est visible.
 */
export default function BarreEssaiMobile() {
  const chemin = usePathname() ?? "/";
  const absente = SANS_BARRE.some((c) => chemin === c || chemin === c.slice(0, -1));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (absente) return;
    const main = document.querySelector("main");
    const finals = main ? [...main.querySelectorAll("section")].filter((s) => s.querySelector('a.b1[href^="/kit-essai/"]')) : [];
    const blocFinal = finals.length > 1 ? finals[finals.length - 1] : null;
    const cibles = [blocFinal, ...document.querySelectorAll("main form"), document.querySelector("footer")].filter(Boolean) as Element[];
    const enVue = new Set<Element>();
    let defile = false;
    const maj = () => setVisible(defile && enVue.size === 0);
    const obs = new IntersectionObserver((entrees) => {
      for (const e of entrees) {
        if (e.isIntersecting) enVue.add(e.target);
        else enVue.delete(e.target);
      }
      maj();
    });
    cibles.forEach((c) => obs.observe(c));
    const surDefilement = () => {
      const d = window.scrollY > window.innerHeight;
      if (d !== defile) {
        defile = d;
        maj();
      }
    };
    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", surDefilement);
    };
  }, [absente, chemin]);

  if (absente) return null;
  return (
    <>
      <div className="barre-essai-espace" aria-hidden="true" />
      <div className={`barre-essai${visible ? " visible" : ""}`} aria-hidden={!visible}>
        <a href={urlPage("essai") ?? "/kit-essai/"} className="b1 clair" tabIndex={visible ? undefined : -1}>
          {fr.boutons.essai}
        </a>
      </div>
    </>
  );
}
