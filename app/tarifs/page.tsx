import type { Metadata } from "next";
import fr, { kits, packs } from "@/content/fr";
import Calculateur from "@/components/Calculateur";
import PageModele from "@/components/PageModele";
import c from "@/components/Contenu.module.css";
import { metaPage } from "@/lib/meta";
import { formatPrix } from "@/lib/prix";

const t = fr.pages.tarifs;
const chemin = "/tarifs/";

export const metadata: Metadata = metaPage({ titre: t.titreGoogle, description: t.description, chemin });

function TableauProduits({
  id,
  legende,
  colonnes,
  lignes,
}: {
  id: string;
  legende: string;
  colonnes: { nom: string; contenu: string; prix: string };
  lignes: { nom: string; contenu: string[]; prix: number }[];
}) {
  return (
    <div className={c.defilement} role="region" aria-labelledby={id} tabIndex={0}>
      <table className={`${c.tableau} ${c.large}`}>
        <caption id={id} className="visuellement-cache">
          {legende}
        </caption>
        <thead>
          <tr>
            <th scope="col">{colonnes.nom}</th>
            <th scope="col">{colonnes.contenu}</th>
            <th scope="col" className={c.nombre}>
              {colonnes.prix}
            </th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((l) => (
            <tr key={l.nom}>
              <th scope="row">{l.nom}</th>
              <td>{l.contenu.join(" · ")}</td>
              <td className={c.nombre}>{formatPrix(l.prix)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Tarifs() {
  return (
    <PageModele fil={t.fil} chemin={chemin} titre={t.titre} intro={<p>{t.intro}</p>} aLireAussi={t.aLireAussi}>
      <section aria-labelledby="tarifs-kits">
        <h2 id="tarifs-kits">{t.kits.titre}</h2>
        <TableauProduits id="legende-kits" legende={t.kits.legende} colonnes={t.kits.colonnes} lignes={kits} />
      </section>

      <section aria-labelledby="tarifs-packs">
        <h2 id="tarifs-packs">{t.packs.titre}</h2>
        <TableauProduits id="legende-packs" legende={t.packs.legende} colonnes={t.packs.colonnes} lignes={packs} />
        <p className={c.note}>{t.packs.note}</p>
      </section>

      <section aria-labelledby="tarifs-envoi">
        <h2 id="tarifs-envoi">{t.envoi.titre}</h2>
        <div className={c.defilement}>
          <table className={c.tableau}>
            <caption className="visuellement-cache">{t.envoi.legende}</caption>
            <thead>
              <tr>
                <th scope="col">{t.envoi.colonnes.mode}</th>
                <th scope="col" className={c.nombre}>
                  {t.envoi.colonnes.prix}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.envoi.lignes.map((l) => (
                <tr key={l.mode}>
                  <th scope="row">{l.mode}</th>
                  <td className={c.nombre}>{formatPrix(l.prix)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={c.note}>{t.envoi.note}</p>
      </section>

      <section aria-labelledby="tarifs-facturation">
        <h2 id="tarifs-facturation">{t.facturation.titre}</h2>
        <ul className={c.puces}>
          {t.facturation.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tarifs-calcul">
        <h2 id="tarifs-calcul">{t.calculateur.titre}</h2>
        <Calculateur />
      </section>
    </PageModele>
  );
}
