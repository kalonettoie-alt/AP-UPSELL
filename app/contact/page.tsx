import type { Metadata } from "next";
import fr from "@/content/fr";
import FormulaireContact from "@/components/FormulaireContact";
import PageModele from "@/components/PageModele";
import c from "@/components/Contenu.module.css";
import { metaPage } from "@/lib/meta";

const t = fr.pages.contact;
const co = fr.coordonnees;
const chemin = "/contact/";

export const metadata: Metadata = metaPage({ titre: t.titreGoogle, description: t.description, chemin });

export default function Contact() {
  const k = t.coordonnees;
  return (
    <PageModele fil={t.fil} chemin={chemin} titre={t.titre} aLireAussi={t.aLireAussi}>
      <div className={c.deuxColonnes}>
        <section aria-labelledby="coordonnees">
          <h2 id="coordonnees">{k.titre}</h2>
          <dl className={c.coordonnees}>
            <div>
              <dt>{k.telephone}</dt>
              <dd>
                <a href={`tel:${co.telephoneLien}`}>{co.telephone}</a>
              </dd>
            </div>
            <div>
              <dt>{k.email}</dt>
              <dd>
                <a href={`mailto:${co.email}`}>{co.email}</a>
              </dd>
            </div>
            <div>
              <dt>{k.horaires}</dt>
              <dd>{co.horaires}</dd>
            </div>
            <div>
              <dt>{k.zone}</dt>
              <dd>
                {k.zoneTexte}{" "}
                <a href={k.zoneLien.href}>{k.zoneLien.label}</a>
              </dd>
            </div>
          </dl>
        </section>
        <section aria-labelledby="ecrire">
          <h2 id="ecrire">{t.formulaireTitre}</h2>
          <div style={{ marginTop: 20 }}>
            <FormulaireContact />
          </div>
        </section>
      </div>
    </PageModele>
  );
}
