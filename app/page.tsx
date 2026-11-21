import fr from "@/content/fr";

export default function Page() {
  return (
    <main className="conteneur" style={{ padding: "80px 24px" }}>
      <p className="petit-titre">{fr.hero.petitTitre}</p>
      <h1>{fr.hero.titre}</h1>
      <p style={{ marginTop: 24 }}>{fr.hero.sousTitre}</p>
      <h2 style={{ marginTop: 48 }}>{fr.avant.titre}</h2>
      <p className="petit-titre" style={{ marginTop: 24 }}>{fr.hero.lignePrix}</p>
      <a className="bouton" style={{ marginTop: 24 }} href="#essai">{fr.hero.bouton.label}</a>
    </main>
  );
}
