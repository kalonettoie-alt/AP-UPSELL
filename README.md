# AP UPSELL — page de vente

Site statique Next.js (export statique, sans serveur). Tous les textes sont dans `content/fr.ts`.
La spécification de référence est `docs/spec-page-de-vente.md`.

## Lancer le site en local

Il faut Node.js 20 ou plus récent.

```bash
npm install
npm run dev
```

Ouvrir ensuite http://localhost:3000.

Pour produire la version finale (dossier `out/`) et la regarder :

```bash
npm run build
npm start
```

## Identifiants Formspree

1. Copier `.env.example` en `.env.local` (ce fichier n'est jamais envoyé sur GitHub).
2. Remplir les valeurs :

| Variable | Contenu |
| --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ESSAI` | Identifiant du formulaire Formspree « Kit d'essai » (la fin de l'adresse `https://formspree.io/f/xxxxxxx`, soit `xxxxxxx`) |
| `NEXT_PUBLIC_FORMSPREE_ATTENTE` | Identifiant du formulaire Formspree « Liste d'attente hors Île-de-France » |
| `NEXT_PUBLIC_SITE_URL` | Adresse publique du site, sans barre finale, par ex. `https://www.exemple.fr` |

3. Relancer `npm run dev` (ou `npm run build`) : les valeurs sont intégrées au moment de la construction.

Sans identifiant, le site se construit quand même ; le formulaire concerné affiche alors
« L'envoi n'a pas marché. Réessayez dans un instant. ».

Champs reçus dans Formspree :
- Kit d'essai : `nom`, `societe`, `nombre_logements`, `ville`, `email`, `telephone`, `date_heure`, sujet « Kit d'essai — {Société} ».
- Liste d'attente : `email`, `liste`, `date_heure`, sujet « Liste d'attente hors Île-de-France ».

Le champ caché `_gotcha` sert d'anti-spam : Formspree ignore les envois où il est rempli.

## Mettre en ligne sur Vercel

1. Sur vercel.com : **Add New → Project**, importer le dépôt GitHub.
2. Framework : **Next.js** (détecté automatiquement). Ne rien changer aux commandes de build.
3. Dans **Settings → Environment Variables**, ajouter les 3 variables ci-dessus
   (`NEXT_PUBLIC_FORMSPREE_ESSAI`, `NEXT_PUBLIC_FORMSPREE_ATTENTE`, `NEXT_PUBLIC_SITE_URL`)
   pour l'environnement **Production** (et **Preview** si besoin).
4. Lancer le déploiement. Après toute modification d'une variable, refaire un déploiement
   (**Deployments → Redeploy**) : les valeurs sont lues au moment du build.
5. Brancher le nom de domaine dans **Settings → Domains**, puis vérifier que
   `NEXT_PUBLIC_SITE_URL` correspond bien à cette adresse.

## Organisation

- `content/fr.ts` : tous les textes et les prix (la version anglaise viendra dans un fichier à part).
- `components/` : un composant par bloc, plus les pièces graphiques (boîtes, étagère, étiquettes, ticket).
- `lib/prix.ts` : format des prix (« 4,50 € », « 9 € »).
- `lib/formspree.ts`, `lib/validation.ts` : envoi et vérification des formulaires.
- `app/` : la page, les pages Mentions légales et CGV, `sitemap.xml`, `robots.txt`.

## Reste à fournir

Délai de réponse, adresse e-mail de l'équipe (dans Formspree), coordonnées de contact,
mentions légales et CGV, photos réelles des kits, image de partage (Open Graph, à ajouter
dans `app/layout.tsx`).
