import fr from "@/content/fr";

/** Champ caché anti-spam « _gotcha » : invisible, hors tabulation, ignoré des lecteurs d'écran. */
export default function PotDeMiel({ id }: { id: string }) {
  return (
    <div className="visuellement-cache" aria-hidden="true">
      <label htmlFor={id}>{fr.formulaires.pieges.label}</label>
      <input id={id} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
