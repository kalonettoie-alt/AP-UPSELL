# SINEBOX — site de vente

Site statique Next.js (export statique, sans serveur), hébergé sur Vercel. Tous les textes sont dans `content/fr.ts`.
La spécification de départ est `docs/spec-page-de-vente.md`.

## Pages

Adresses, titres et descriptions Google, H1 : fichier `sinebox-v2-pages-secondaires.md` (25/11/2026).
Textes visibles, mise en page et style : maquette SINEBOX V2.

| Adresse | Page |
| --- | --- |
| `/` | Accueil |
| `/comment-ca-marche/` | Comment ça marche |
| `/kit-et-etiquette/` | Le kit et son étiquette |
| `/kits-a-votre-marque/` | À votre marque (demande de maquette au logo) |
| `/livraison-ile-de-france/` | Livraison (liste d'attente hors Île-de-France, ancre `#ailleurs`) |
| `/kit-accueil-airbnb/` | Les kits (ancres `#salle-de-bain`, `#cuisine`, `#entretien`) |
| `/packs/` | Les packs (ancres `#voyage-affaires`, `#couple`, `#chien`, `#chat`, `#premiere-visite`, `#noel`) |
| `/tarifs/` | Tarifs et calculateur (ancre `#calculateur`) |
| `/kits-accueil-conciergerie/` | Conciergeries |
| `/hotes-multi-logements/` | Hôtes multi-logements |
| `/faq/` | FAQ |
| `/compatibilites/` | Compatibilités |
| `/a-montrer-a-votre-associe/` | À montrer à votre associé (e-mail à copier) |
| `/a-propos/` | À propos |
| `/kit-essai/` | Kit d'essai (formulaire en 3 étapes) |
| `/appel/` | Réserver un appel (formulaire) |
| `/merci/` | Merci, texte selon `?demande=` (noindex, hors sitemap) |
| `/blog/` | Le journal |
| `/blog/accueil-des-voyageurs/`, `/blog/organisation-conciergerie/` | Rubriques |
| `/blog/<rubrique>/<article>/` | 3 articles (Markdown dans `content/blog/`) |
| `/mentions-legales/`, `/cgv/` | Pages légales (noindex, hors sitemap) ; texte des CGV dans `content/legal/cgv.md` |
| `/confidentialite/` | Politique de confidentialité (`content/legal/confidentialite.md`), dans le sitemap |

L'ancienne adresse `/contact/` redirige vers `/appel/` (`vercel.json`).
Le registre `lib/routes.ts` liste toutes les pages : un lien n'apparaît que si sa page existe.

## Informations à fournir

Les valeurs encore inconnues sont dans `content/fr.ts` (objet `aFournir`) et s'affichent entre crochets :
délai d'envoi du kit d'essai, délai de mise en place, jour et heure limite, créneau de livraison,
départements livrés, délai de paiement, délai maquette. Les articles ont une date `[date de publication]`
(en tête de chaque fichier de `content/blog/`). Aucune page ne doit être mise en ligne avec un crochet visible.

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

- Une seule adresse pour tous les formulaires : `FORMSPREE_ID` dans `content/fr.ts` (la fin de `https://formspree.io/f/XXXXXXXX`).
  Chaque formulaire envoie son propre sujet (« Kit d'essai — Société », « Appel — Société », « Maquette à mon logo — Société »,
  « Liste d'attente hors Île-de-France »).
- Lien Calendly de la page /appel/ : `CALENDLY_URL` dans `content/fr.ts` (bouton « Choisir un créneau », nouvel onglet, sans intégration).

- Chaque formulaire a `method="POST"` et `action="https://formspree.io/f/…"`.
- **Avec JavaScript** : le site vérifie les champs, envoie, puis redirige le kit d'essai vers `/merci/`.
- **Sans JavaScript** : le navigateur vérifie les champs obligatoires et envoie directement à Formspree, qui affiche sa propre page de remerciement. La redirection vers `/merci/` sans JavaScript demande une option payante de Formspree : elle n'est pas utilisée.
- Sans identifiant, le site se construit quand même ; le formulaire affiche « L'envoi n'a pas marché. Réessayez dans un instant. ».

Champs reçus :
- Tous les formulaires envoient aussi `source` (valeur de `utm_source` dans l'adresse), `page_origine` et `date_heure`.
- Kit d'essai  : nom, e-mail, téléphone, société, profil, nombre de logements, ville, logiciel, Deltom Operator, `connu_par`, adresse, code postal (Île-de-France vérifiée), ville de livraison, instructions, consentement ; sujet « Kit d'essai — {Société} » ; puis `/merci/?demande=kit-essai`.
- Réserver un appel  : sujet « Appel — {Société} » ; puis `/merci/?demande=appel`.
- Maquette à mon logo  : le logo s'envoie par e-mail (l'offre gratuite de Formspree n'accepte pas les fichiers) ; puis `/merci/?demande=maquette`.
- Listes d'attente  : hors Île-de-France et nouveautés ; puis `/merci/?demande=liste-attente`.

Le champ caché `_gotcha` sert d'anti-spam : Formspree ignore les envois où il est rempli.

## Mettre en ligne sur Vercel

1. Sur vercel.com : **Add New → Project**, importer le dépôt GitHub.
2. Framework : **Next.js** (détecté automatiquement). Ne rien changer aux commandes de build.
3. Dans **Settings → Environment Variables**, ajouter :
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

Voir « Informations à fournir » plus haut, ainsi que la liste 15 du fichier `.md` (photos, marques et origine des produits,
histoire et rôles des fondateurs, TVA, politique de confidentialité, auteur et date des articles).
