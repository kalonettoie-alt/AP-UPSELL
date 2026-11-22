import type { Metadata } from "next";
import fr from "@/content/fr";
import JsonLd from "@/components/JsonLd";
import PageModele from "@/components/PageModele";
import c from "@/components/Contenu.module.css";
import { estimerMois } from "@/lib/calcul";
import { metaPage } from "@/lib/meta";
import { formatPrix } from "@/lib/prix";
import { schemaFaq } from "@/lib/schema";
import { ancre } from "@/lib/texte";

const t = fr.pages.conciergerie;
const chemin = "/kits-accueil-conciergerie/";

export const metadata: Metadata = metaPage({ titre: t.titreGoogle, description: t.description, chemin });

const nombre = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

export default function PageConciergerie() {
  const ex = t.exemple;
  const lignes = ex.arrivees.map((n) => ({
    n,
    colis: estimerMois(n, 1, "colis"),
    deltom: estimerMois(n, 1, "deltom"),
  }));

  return (
    <PageModele fil={t.fil} chemin={chemin} titre={t.titre} intro={<p>{t.intro}</p>} aLireAussi={t.aLireAussi}>
      {t.sections.map((s) => (
        <section key={s.titre} aria-labelledby={ancre(s.titre)}>
          <h2 id={ancre(s.titre)}>{s.titre}</h2>
          {"paragraphes" in s && s.paragraphes ? s.paragraphes.map((p) => <p key={p}>{p}</p>) : null}
          {"etapes" in s && s.etapes ? (
            <ol className={c.etapes}>
              {s.etapes.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ol>
          ) : null}
        </section>
      ))}

      <section aria-labelledby="exemple">
        <h2 id="exemple">{ex.titre}</h2>
        <p>{ex.hypothese}</p>
        <div className={c.defilement} role="region" aria-labelledby="exemple-legende" tabIndex={0}>
          <table className={`${c.tableau} ${c.large}`}>
            <caption id="exemple-legende" className="visuellement-cache">
              {ex.legende}
            </caption>
            <thead>
              <tr>
                <th scope="col">{ex.colonnes.arrivees}</th>
                <th scope="col">{ex.colonnes.parSemaine}</th>
                <th scope="col">{ex.colonnes.kits}</th>
                <th scope="col">{ex.colonnes.colis}</th>
                <th scope="col">{ex.colonnes.totalColis}</th>
                <th scope="col">{ex.colonnes.totalDeltom}</th>
              </tr>
            </thead>
            <tbody>
              {lignes.map((l) => (
                <tr key={l.n}>
                  <th scope="row" className={c.nombre}>
                    {nombre.format(l.n)}
                  </th>
                  <td className={c.nombre}>{nombre.format(l.colis.arriveesParSemaine)}</td>
                  <td className={c.nombre}>{formatPrix(l.colis.kits)}</td>
                  <td className={c.nombre}>{formatPrix(l.colis.envoi)}</td>
                  <td className={c.nombre}>{formatPrix(l.colis.total)}</td>
                  <td className={c.nombre}>{formatPrix(l.deltom.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={c.note}>{ex.note}</p>
      </section>

      <section aria-labelledby="deltom">
        <div className={c.encadre} style={{ background: "var(--bleu)" }}>
          <h2 id="deltom">{t.deltom.titre}</h2>
          <p>{t.deltom.texte}</p>
        </div>
      </section>

      <section aria-labelledby="faq-conciergerie">
        <h2 id="faq-conciergerie">{t.faqTitre}</h2>
        <div className={c.faq}>
          {t.faq.map((q) => (
            <details key={q.question}>
              <summary>{q.question}</summary>
              <p>{q.reponse}</p>
            </details>
          ))}
        </div>
      </section>
      <JsonLd donnees={schemaFaq(t.faq)} />
    </PageModele>
  );
}
