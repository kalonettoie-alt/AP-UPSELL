import type { ReactNode } from "react";

type Nom = "maison" | "colis" | "horloge";

const chemins: Record<Nom, ReactNode> = {
  maison: (
    <>
      <path d="M5 11.5 12 5l7 6.5" />
      <path d="M7 10v9h10v-9" />
      <path d="M10.5 19v-4.5h3V19" />
    </>
  ),
  colis: (
    <>
      <path d="M4.5 8 12 4.5 19.5 8v8L12 19.5 4.5 16Z" />
      <path d="M4.5 8 12 11.5 19.5 8" />
      <path d="M12 11.5v8" />
      <path d="m8.2 6.2 7.5 3.6" />
    </>
  ),
  horloge: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v4.3l2.8 1.8" />
    </>
  ),
};

/** Icône ronde au trait (décorative). */
export default function Icone({ nom, className }: { nom: Nom; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {chemins[nom]}
      </svg>
    </span>
  );
}
