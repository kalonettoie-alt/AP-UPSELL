import type { Metadata } from "next";
import fr from "@/content/fr";
import PageModele from "@/components/PageModele";
import c from "@/components/Contenu.module.css";
import { metaPage } from "@/lib/meta";
import { ancre } from "@/lib/texte";

const t = fr.pages.aPropos;
const chemin = "/a-propos/";

export const metadata: Metadata = metaPage({ titre: t.titreGoogle, description: t.description, chemin });

export default function APropos() {
  return (
    <PageModele fil={t.fil} chemin={chemin} titre={t.titre} aLireAussi={t.aLireAussi}>
      {t.sections.map((s) => (
        <section key={s.titre} aria-labelledby={ancre(s.titre)}>
          <h2 id={ancre(s.titre)}>{s.titre}</h2>
          {s.paragraphes.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {"photo" in s && s.photo ? (
            <div className={c.photo} role="img" aria-label={s.photo}>
              {s.photo}
            </div>
          ) : null}
        </section>
      ))}
    </PageModele>
  );
}
