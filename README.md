# SINEBOX — site de vente

Site statique Next.js (export statique, sans serveur), hébergé sur Vercel. Tous les textes sont dans `content/fr.ts`.
La spécification de départ est `docs/spec-page-de-vente.md`.

## Pages

| Adresse | Page | Indexée par Google |
| --- | --- | --- |
| `/` | Accueil (page de vente) | oui |
| `/kits-accueil-conciergerie/` | Kits d'accueil pour conciergeries | oui |
| `/tarifs/` | Tarifs et calculateur | oui |
| `/kit-essai/` | Formulaire du kit d'essai, sans menu | oui |
| `/contact/` | Contact | oui |
| `/a-propos/` | À propos | oui |
| `/merci/` | Remerciement après le kit d'essai | non (noindex, hors sitemap) |
| `/mentions-legales/` | Mentions légales | non (noindex, hors sitemap) |
| `/cgv/` | Conditions générales de vente | non (noindex, hors sitemap) |
| toute autre adresse | Page 404 | non |

« Indexée » ne s'applique qu'une fois `NEXT_PUBLIC_SITE_URL` définie (voir plus bas). Avant, tout le site est fermé à Google.

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

## Variables d'environnement

Copier `.env.example` en `.env.local` (ce fichier n'est jamais envoyé sur GitHub) pour travailler en local.

| Variable | Contenu |
| --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ESSAI` | Identifiant du formulaire Formspree « Kit d'essai » (la fin de `https://formspree.io/f/xxxxxxx`). Sert aussi au formulaire de la page Contact. |
| `NEXT_PUBLIC_FORMSPREE_ATTENTE` | Identifiant du formulaire Formspree « Liste d'attente hors Île-de-France ». |
| `NEXT_PUBLIC_SITE_URL` | Nom de domaine du site, sans barre finale, par ex. `https://www.sinebox.fr`. **Tant qu'elle est vide, le site est fermé à Google.** |

Les valeurs sont intégrées au moment du build : après chaque changement, relancer le build (ou redéployer sur Vercel).

### Ce que change `NEXT_PUBLIC_SITE_URL`

| | Vide | Définie |
| --- | --- | --- |
| Balise robots | `noindex, nofollow` partout | `index, follow` (sauf merci, mentions légales, CGV) |
| `robots.txt` | `Disallow: /` | `Allow: /` + lien vers le sitemap |
| `sitemap.xml` | vide | 6 pages |
| URL canonique | absente | sur chaque page |
| Adresses de partage (og:url, image) | adresse de production fournie par Vercel | le domaine |

Hors Vercel, en local uniquement, l'adresse de repli est `http://localhost:3000`.

## Formulaires (Formspree)

- Chaque formulaire a `method="POST"` et `action="https://formspree.io/f/…"`.
- **Avec JavaScript** : le site vérifie les champs, envoie, puis redirige le kit d'essai vers `/merci/`.
- **Sans JavaScript** : le navigateur vérifie les champs obligatoires et envoie directement à Formspree, qui affiche sa propre page de remerciement. La redirection vers `/merci/` sans JavaScript demande une option payante de Formspree : elle n'est pas utilisée.
- Sans identifiant, le site se construit quand même ; le formulaire affiche « L'envoi n'a pas marché. Réessayez dans un instant. ».

Champs reçus :
- Kit d'essai : `nom`, `societe`, `nombre_logements`, `ville`, `email`, `telephone`, `source` (« Comment nous avez-vous connus ? »), `utm_source` (recopié de l'adresse de la page), `date_heure`, sujet « Kit d'essai — {Société} ».
- Contact : `nom`, `email`, `message`, `utm_source`, `date_heure`, sujet « Contact — {nom} » (même Formspree que le kit d'essai).
- Liste d'attente : `email`, `liste`, `date_heure`, sujet « Liste d'attente hors Île-de-France ».

Le champ caché `_gotcha` sert d'anti-spam : Formspree ignore les envois où il est rempli.

## Mettre en ligne sur Vercel

1. Sur vercel.com : **Add New → Project**, importer le dépôt GitHub.
2. Framework : **Next.js** (détecté automatiquement). Ne rien changer aux commandes de build.
3. Dans **Settings → Environment Variables**, ajouter :
   - `NEXT_PUBLIC_FORMSPREE_ESSAI` et `NEXT_PUBLIC_FORMSPREE_ATTENTE` pour **Production** et **Preview** ;
   - `NEXT_PUBLIC_SITE_URL` pour **Production** seulement, **et seulement le jour du lancement** (les versions Preview restent ainsi fermées à Google).
4. Lancer le déploiement. Après toute modification d'une variable : **Deployments → Redeploy**.

### Le jour du lancement

1. **Settings → Domains** : ajouter le domaine (par ex. `www.sinebox.fr`).
2. Toujours dans **Domains**, sur la ligne de l'adresse `….vercel.app` de production : **Edit → Redirect to** le domaine, en redirection permanente (308).
   Le site étant un export statique, cette redirection se règle dans Vercel et non dans le code.
3. Renseigner `NEXT_PUBLIC_SITE_URL` (Production) avec le domaine, puis **Redeploy**.

### Images de partage

Une image 1200 × 630 est générée au build pour chaque page (fichiers `opengraph-image.tsx`, polices dans `assets/og-fonts/`, licence OFL).
Le fichier `vercel.json` les sert avec le bon type (`image/png`).

## Organisation

- `content/fr.ts` : tous les textes, les prix, les coordonnées, les mentions légales et les CGV.
- `components/` : un composant par bloc de l'accueil, le modèle des pages intérieures (`PageModele`), l'en-tête, le pied de page, les formulaires, le calculateur.
- `lib/` : prix (`prix.ts`), estimation mensuelle (`calcul.ts`), Formspree (`formspree.ts`), adresse du site et indexation (`site.ts`), métadonnées (`meta.ts`), données structurées (`schema.ts`), images de partage (`og.tsx`).
- `app/` : les pages, `sitemap.xml`, `robots.txt`, les icônes (`favicon.ico`, `icon.svg`, `apple-icon.png`).

## Reste à fournir

Horaires (page Contact), prénoms et photo de l'équipe, lieu de préparation et origine des produits (page À propos),
photos réelles des kits, et les éléments entre crochets des mentions légales et des CGV.
