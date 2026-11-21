import fr from "@/content/fr";
import styles from "./Faq.module.css";

export default function Faq() {
  const t = fr.faq;
  return (
    <section className={`conteneur ${styles.section}`} aria-labelledby="titre-faq">
      <h2 id="titre-faq">{t.titre}</h2>
      <div className={styles.liste}>
        {t.questions.map((q) => (
          <details key={q.question} className={styles.question}>
            <summary className={styles.resume}>
              <span>{q.question}</span>
              <span className={styles.signe} aria-hidden="true" />
            </summary>
            <p className={styles.reponse}>{q.reponse}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
