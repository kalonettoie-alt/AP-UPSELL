import fr, { kits, packs, type Faq } from "@/content/fr";
import { SITE_CANONIQUE, urlAbsolue } from "./site";

/** Organization : nom, site, logo, zone desservie, contact. */
export function schemaOrganisation() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CANONIQUE}/#organisation`,
    name: fr.marque,
    url: urlAbsolue("/"),
    logo: urlAbsolue("/apple-icon.png"),
    email: fr.coordonnees.email,
    areaServed: { "@type": "AdministrativeArea", name: fr.coordonnees.zone },
  };
}

/** BreadcrumbList : Accueil > page. */
export function schemaFilAriane(etapes: { nom: string; chemin: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: etapes.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nom,
      item: urlAbsolue(e.chemin),
    })),
  };
}

/** FAQPage, texte identique à la page. */
export function schemaFaq(questions: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.reponse },
    })),
  };
}

function offre(prixHT: number, chemin: string) {
  return {
    "@type": "Offer",
    url: urlAbsolue(chemin),
    price: prixHT.toFixed(2),
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: prixHT.toFixed(2),
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
    },
    seller: { "@id": `${SITE_CANONIQUE}/#organisation` },
  };
}

/** Product pour chaque kit et chaque pack (prix HT). */
export function schemaProduits() {
  const marque = { "@type": "Brand", name: fr.marque };
  return [
    ...kits.map((k) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: k.nom,
      description: k.contenu.join(" · "),
      brand: marque,
      offers: offre(k.prix, "/#kits"),
    })),
    ...packs.map((p) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.nom,
      description: p.contenu.join(" · "),
      brand: marque,
      offers: offre(p.prix, "/#packs"),
    })),
  ];
}
