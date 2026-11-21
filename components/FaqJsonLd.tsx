import fr from "@/content/fr";

/** Données structurées schema.org FAQPage : mêmes questions et réponses que le bloc 10, mot pour mot. */
export default function FaqJsonLd() {
  const donnees = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fr.faq.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.reponse },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees).replace(/</g, "\\u003c") }}
    />
  );
}
