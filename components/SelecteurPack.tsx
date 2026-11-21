"use client";

import { useState } from "react";
import fr, { kits, packParDefaut, packs, prix, type PackId } from "@/content/fr";
import { pastel } from "@/lib/couleurs";
import { additionner, formatPrix } from "@/lib/prix";
import Boite from "./Boite";
import Etagere from "./Etagere";
import EtiquetteColis from "./EtiquetteColis";
import Ticket, { TicketDetail, TicketLigne, TicketSeparateur, TicketTotal } from "./Ticket";
import styles from "./QuiArrive.module.css";

/** Sélecteur « Qui arrive ? » : visuel, étiquette et ticket suivent le pack choisi. */
export default function SelecteurPack() {
  const t = fr.quiArrive;
  const [choix, setChoix] = useState<PackId>(packParDefaut);
  const pack = packs.find((p) => p.id === choix)!;
  const troisKits = kits.find((k) => k.id === "troisKits")!;
  const total = additionner(prix.troisKits, pack.prix);
  const kitAvecPack = `${t.troisKits} + ${pack.nom}`;

  return (
    <div className={styles.interactif}>
      <div className={styles.selecteur} role="group" aria-labelledby="qui-arrive-label">
        <p id="qui-arrive-label" className={styles.selecteurLabel}>
          {t.selecteurLabel}
        </p>
        <div className={styles.pastilles}>
          {packs.map((p) => (
            <button
              key={p.id}
              type="button"
              className={styles.choix}
              style={p.id === choix ? { background: pastel(p.couleur) } : undefined}
              aria-pressed={p.id === choix}
              onClick={() => setChoix(p.id)}
            >
              {p.pastille}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.resultat}>
        <div className={styles.scene} style={{ background: pastel(pack.couleur) }}>
          <div className={styles.etagere} aria-hidden="true">
            <Etagere colonnes="1.25fr 1fr">
              <Boite titre={troisKits.nomBoite} couleur={troisKits.bandeau} style={{ aspectRatio: "1 / 1.15" }} />
              <Boite
                key={pack.id}
                titre={pack.nom}
                couleur={pack.couleur}
                className={styles.boitePack}
                style={{ aspectRatio: "1 / 1.1" }}
              />
            </Etagere>
          </div>
          <EtiquetteColis
            className={styles.etiquette}
            couleur="jaune"
            enTete={`${t.etiquetteJour} ${t.etiquetteDate}`}
            logement={t.etiquetteLogement}
            lignes={[{ libelle: fr.commentCaMarche.etiquette.kitLabel, valeur: kitAvecPack }]}
          />
        </div>

        <div className={styles.ticketZone}>
          <Ticket titre={t.ticketTitre}>
            <TicketLigne libelle={t.troisKits} montant={formatPrix(prix.troisKits)} />
            <TicketLigne libelle={`+ ${pack.nom}`} montant={formatPrix(pack.prix)} />
            <TicketDetail lignes={pack.contenu} />
            <TicketSeparateur />
            <TicketTotal libelle={t.total} montant={formatPrix(total)} />
            <TicketSeparateur />
            <p className={styles.calcul} aria-live="polite">
              {t.troisKits} {formatPrix(prix.troisKits)} + {pack.nom} {formatPrix(pack.prix)} = {formatPrix(total)}{" "}
              {t.pourCetteArrivee}
            </p>
          </Ticket>
          <p className={styles.sousTicket}>{t.sousTicket}</p>
        </div>
      </div>
    </div>
  );
}
