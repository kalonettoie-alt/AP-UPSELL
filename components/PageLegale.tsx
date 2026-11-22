import type { BlocLegal } from "@/content/fr";
import { ancre, TexteRiche } from "@/lib/texte";
import PageModele from "./PageModele";
import styles from "./PageLegale.module.css";

type Props = {
  titre: string;
  chemin: string;
  blocs: BlocLegal[];
  /** Titre du sommaire cliquable (CGV). */
  sommaire?: string;
};

export default function PageLegale({ titre, chemin, blocs, sommaire }: Props) {
  const rubriques = blocs.filter((b): b is Extract<BlocLegal, { t: "h2" }> => b.t === "h2");
  return (
    <PageModele fil={titre} chemin={chemin} titre={titre} cta={false}>
      <div className={styles.texte}>
        {sommaire ? (
          <nav aria-labelledby="sommaire" className={styles.sommaire}>
            <p id="sommaire" className={styles.sommaireTitre}>
              {sommaire}
            </p>
            <ol>
              {rubriques.map((r) => (
                <li key={r.texte}>
                  <a href={`#${ancre(r.texte)}`}>{r.texte}</a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {blocs.map((b, i) => {
          switch (b.t) {
            case "h2":
              return (
                <h2 key={i} id={ancre(b.texte)}>
                  {b.texte}
                </h2>
              );
            case "p":
              return (
                <p key={i}>
                  {b.lead ? <strong>{b.lead} </strong> : null}
                  <TexteRiche texte={b.texte} />
                </p>
              );
            case "ul":
            case "ol": {
              const Liste = b.t;
              return (
                <Liste key={i}>
                  {b.items.map((item) => (
                    <li key={item}>
                      <TexteRiche texte={item} />
                    </li>
                  ))}
                </Liste>
              );
            }
          }
        })}
      </div>
    </PageModele>
  );
}

