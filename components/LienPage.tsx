import type { CSSProperties, ReactNode } from "react";
import { urlPage, type CleePage } from "@/lib/routes";

type Props = {
  page: CleePage;
  /** Ancre dans la page cible (sans #). */
  ancre?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /**
   * Si la page n'existe pas encore : « masquer » retire le lien et son texte (liens « … → »),
   * « texte » garde le contenu sans lien (cartes, éléments de mise en page).
   */
  sansPage?: "masquer" | "texte";
  "aria-label"?: string;
};

/** Lien vers une page du site ; aucun lien n'est publié vers une page qui n'existe pas encore. */
export default function LienPage({ page, ancre, className, style, children, sansPage = "masquer", ...rest }: Props) {
  const url = urlPage(page);
  if (!url) {
    if (sansPage === "masquer") return null;
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <a href={ancre ? `${url}#${ancre}` : url} className={className} style={style} aria-label={rest["aria-label"]}>
      {children}
    </a>
  );
}
