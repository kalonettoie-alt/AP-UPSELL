# SINEBOX — Spécification de la page de vente (pour l'IA de développement)

Version du 21/11/2026. Maquette de référence (à ouvrir à côté) : https://claude.ai/artifact/Rdwnqrvfvw3ZFqb4wCAmsC

Ce document décrit **tout** ce qu'il faut pour coder la page : style, blocs dans l'ordre, textes exacts, interactions, formulaires, SEO. Les textes entre crochets `[...]` sont des informations pas encore connues : les laisser tels quels, ne rien inventer.

---

## 0. Règles générales

- **Une seule page** (landing de vente). Pas d'onglets, pas d'autres pages, sauf Mentions légales et CGV (liens en pied de page, contenu `[à fournir]`).
- **Langue** : français, vouvoiement. Prévoir la traduction anglaise plus tard (textes centralisés dans un fichier de contenu, pas en dur dans les composants).
- **Prix** : toujours en HT.
- **Aucun chiffre, avis ou client inventé.** Pas de logos clients, pas de témoignages.
- **Mobile d'abord**, parfait aussi sur ordinateur. Largeur de contenu max : 1240 px, marges latérales 24 px.
- **Pile technique** : Next.js. Page statique (SSG). Les formulaires envoient un e-mail à l'équipe (voir §15).
- **Deltom Operator** (règles strictes) : toujours écrire « compatible avec Deltom Operator » et « remis à Deltom Operator ». Jamais « nos agents », « notre partenaire », « notre service de ménage ». Nom en texte simple, **sans logo ni couleurs Deltom**. Jamais dans le haut de page.

---

## 1. Style visuel « Épicerie »

### Polices (Google Fonts)

| Usage | Police | Graisses |
| --- | --- | --- |
| Titres (H1, H2, H3, gros chiffres) | Young Serif | 400 |
| Texte courant, boutons | Inter | 400, 500, 600, 700 |
| Petits titres, étiquettes, tickets, prix | DM Mono | 400, 500 |

Tailles : H1 `clamp(44px, 5.6vw, 74px)` · H2 `clamp(36px, 4.2vw, 56px)` · texte 16–18 px, interligne 1.55–1.6 · petits titres DM Mono 12 px, majuscules, espacement 0.12–0.14em.

### Couleurs

| Rôle | Hex |
| --- | --- |
| Encre (texte, boutons, bordures) | `#2B2118` |
| Fond de page (crème) | `#FAF4EA` |
| Kraft (fond des sections « rayon », hero visuel) | `#D9BF97` |
| Carton des boîtes | `#C89A66` |
| Bois de l'étagère | `#8E6A43` |
| Blanc (cartes, tickets) | `#FFFFFF` |
| Texte secondaire | `#5B4632` / `#6B5A47` |
| Lignes du papier ligné | `#E6DCCB` |
| Trait de rature | `#D9614C` |

Pastels (un par kit, pack ou jour) :

| Nom | Hex |
| --- | --- |
| Rose | `#F6C9C4` |
| Bleu ciel | `#BFD9F2` |
| Jaune beurre | `#F7E3A1` |
| Menthe | `#BFE3D0` |
| Lavande | `#CFC8F0` |
| Pêche | `#F8D5B8` |
| Kraft clair | `#E3CDA8` |
| Sauge | `#D6E5B5` |
| Corail | `#F4B9A0` |

### Éléments graphiques récurrents

- **Store rayé** tout en haut : bande de 48 px, rayures verticales de 64 px rose `#F6C9C4` / crème, bordure basse 3 px encre, coins bas arrondis 24 px.
- **Boîtes kraft** dessinées en CSS : rectangle `#C89A66`, coins haut 6 px, bandeau de couleur du kit en haut, ombre intérieure à droite.
- **Étagère** : barre bois `#8E6A43` de 16–18 px sous les boîtes.
- **Étiquettes de prix** suspendues : fil 2 px + étiquette crème bordée encre, police DM Mono.
- **Ticket de caisse** : carte blanche, police DM Mono, séparateurs en pointillés 1.5 px, légère rotation (1–1.5°), ombre douce.
- **Étiquette de colis** : en-tête de la couleur du jour, nom du logement en Young Serif, code-barres dessiné en CSS (rayures).
- Bordures 1.5 px encre, rayons 12–28 px, petites rotations (−2° à +2°) pour l'aspect « fait main ».
- Boutons principaux : fond encre, texte crème, rayon 14 px, padding 18×26 px, hauteur ≥ 44 px.

### Animations (peu, discrètes)

1. Hero : le texte et les boîtes **montent en fondu** à l'ouverture (0,7 s, décalage 0,08 s par boîte).
2. Hero : les **étiquettes de prix se balancent** doucement (rotation −5° ↔ +3°, 4 s, en boucle).
3. Petites transitions (0,2–0,25 s) sur les boutons sélectionnés (soulèvement de 2–4 px).

Tout est coupé si l'utilisateur a activé « réduire les animations » (`prefers-reduced-motion: reduce`).

---

## 2. Ordre des blocs (12)

1. En-tête
2. Haut de page (H1)
3. Avant
4. Comment ça marche (contient l'étiquette des 7 jours)
5. Nos kits — ancre `#kits`
6. Qui arrive ? — ancre `#packs`
7. Le vrai calcul (cartons ou kits) — ancre `#prix`
8. La livraison — ancre `#livraison`
9. À votre marque
10. Vos questions (FAQ)
11. Kit d'essai (formulaire) — ancre `#essai`
12. Pied de page

Un seul H1 (bloc 2). Chaque titre de bloc en H2. Les titres de cartes en H3.

---

## 3. Bloc 1 — En-tête

- Store rayé au-dessus (voir §1).
- Gauche : **SINEBOX** (Young Serif 28 px) ; dessous en DM Mono 11 px majuscules : « Kits d'accueil pour locations courte durée ».
- Droite (balise `nav`) : liens ancres « Les kits » → `#kits`, « Les prix » → `#prix`, « La livraison » → `#livraison` ; bouton « Kit d'essai offert » → `#essai`.
- Mobile : les éléments passent à la ligne.

## 4. Bloc 2 — Haut de page

Colonne texte (gauche) :

- Petit titre : « Pour les conciergeries et les hôtes · Île-de-France »
- **H1** : « Un kit d'accueil par arrivée, livré chaque semaine. »
- Sous-titre : « Connectez vos calendriers Airbnb et Booking. Chaque dimanche, vous recevez un colis avec un kit prêt à poser pour chaque arrivée de la semaine. Plus de courses, plus de stock, plus de sachets à préparer. »
- Ligne prix (pastille pointillée, DM Mono) : « 4,50 € HT par arrivée pour les 3 kits »
- Bouton principal : « Recevoir mon kit d'essai » → `#essai`. À côté, lien texte : « Voir le contenu des kits » → `#kits`.
- Sous le bouton : « Offert, envoi compris. »
- **Pas de mention de Deltom Operator ici.**

Visuel (droite) : fond kraft arrondi 28 px ; étagère avec 4 boîtes (Salle de bain, Cuisine, Entretien, Les 3 kits — cette dernière plus grande avec 3 bandeaux de couleur) ; étiquettes de prix suspendues : « 1,50 € HT » ×3, « 4,50 € HT ». Visuel décoratif : `aria-hidden`.

## 5. Bloc 3 — Avant

- Petit titre : « Avant »
- H2 : « Votre liste de courses de la semaine. Rayez tout. »
- Texte : « Acheter, stocker, compter, préparer, repartir en urgence parce qu'il manque du café. Avec SINEBOX, cette liste n'existe plus. »
- Visuel : feuille de papier ligné blanche (marge rose à gauche, légère rotation), titre « À faire cette semaine », 5 lignes **rayées en rouge** :
  1. Acheter les savons
  2. Recompter le stock de café
  3. Préparer les sachets d'accueil
  4. Ranger les cartons
  5. Course de dernière minute
- Pastille menthe en bas à droite, penchée : « Fait par nous ».

## 6. Bloc 4 — Comment ça marche

- H2 : « Trois étapes, puis vous n'y pensez plus. »
- 3 fiches (rose, menthe, jaune), en-tête DM Mono « ÉTAPE · 1 / 3 » :
  1. **Vous connectez vos calendriers** — « Collez le lien de calendrier de chaque logement, Airbnb ou Booking. Nous voyons les dates d'arrivée, rien d'autre. »
  2. **Chaque dimanche, vous recevez vos kits** — « Un seul colis, avec un kit par arrivée de la semaine. »
  3. **Votre équipe de ménage le pose** — « Chaque kit porte le nom du logement et la date d'arrivée, avec une couleur par jour. Impossible de se tromper. »
- Sous l'étape 3 : encadré foncé (fond encre) avec **l'étiquette interactive** :
  - Petit titre : « L'étiquette de l'étape 3 ». Titre : « Une couleur par jour. Choisissez un jour. »
  - 7 boutons LUN à DIM (couleurs ci-dessous). Le jour sélectionné se soulève et a une bordure crème.
  - L'étiquette affiche : en-tête de la couleur du jour avec le jour en toutes lettres et la date ; nom du logement ; « ARRIVÉE » (jour + date) ; « KIT : Les 3 kits » ; pastille « LOGO » ; code-barres.
  - Jour sélectionné par défaut : vendredi.
- Petite ligne : « Connexion directe à votre logiciel de gestion : bientôt. »

Couleurs et exemples des jours (exemples de démonstration, entre crochets) :

| Jour | Couleur | Date | Logement |
| --- | --- | --- | --- |
| LUN | `#BFD9F2` | [30/11] | [Loft Montreuil] |
| MAR | `#F8D5B8` | [01/12] | [T2 Oberkampf] |
| MER | `#BFE3D0` | [02/12] | [T3 Bastille] |
| JEU | `#CFC8F0` | [03/12] | [Studio Nation] |
| VEN | `#F7E3A1` | [04/12] | [Studio Marais] |
| SAM | `#F6C9C4` | [05/12] | [Maison Vincennes] |
| DIM | `#E3CDA8` | [06/12] | [T2 République] |

## 7. Bloc 5 — Nos kits (`#kits`)

- Fond kraft `#D9BF97`.
- Petit titre : « Le rayon ». H2 : « L'essentiel pour bien commencer un séjour. »
- Texte : « Trois kits, un prix rond. Le même prix que le séjour dure 2 nuits ou 3 semaines. »
- 4 cartes, **contenu visible sans clic** (important sur téléphone). Chaque carte : boîte dessinée posée sur une étagère, nom (H3), prix, liste à puces.

| Carte | Couleur | Prix | Contenu |
| --- | --- | --- | --- |
| Kit Salle de bain | `#BFD9F2` | 1,50 € HT | 2 doses de gel douche et shampoing 2-en-1 · 1 savonnette emballée |
| Kit Cuisine | `#F7E3A1` | 1,50 € HT | 2 cafés solubles · 2 sachets de thé · 4 bûchettes de sucre |
| Kit Entretien | `#BFE3D0` | 1,50 € HT | 1 rouleau de papier toilette · 1 grand et 1 petit sac poubelle · 1 éponge · 1 pastille lave-vaisselle |
| Les 3 kits | 3 bandeaux | 4,50 € HT | Kit Salle de bain · Kit Cuisine · Kit Entretien · Par arrivée |

La carte « Les 3 kits » est mise en avant (bordure plus épaisse, fond crème).

- Sous les cartes : « Le kit sert à démarrer le séjour. Il n'y a pas de réassort pendant le séjour. »
- Bouton : « Recevoir mon kit d'essai » → `#essai`.

## 8. Bloc 6 — Qui arrive ? (`#packs`) — bloc à mettre en avant

- Petit titre (pastille rose) : « En plus, quand vous voulez »
- H2 : « Un couple, un chien, Noël ? Ajoutez le pack qui va avec. »
- Texte : « L'essentiel part à chaque arrivée. Pour les séjours qui méritent plus, ajoutez un pack en un clic : par logement, par dates, ou réservation par réservation. Il arrive dans le même colis, avec la même étiquette. »
- Sélecteur : libellé « Qui arrive ? » + **6 pastilles** (boutons). La pastille sélectionnée prend la couleur du pack et penche légèrement. **Sélection par défaut : Chien.**

| Pastille | Nom du pack | Prix HT | Couleur | Contenu |
| --- | --- | --- | --- | --- |
| Voyage d'affaires | Pack Affaires | 11,50 € | `#CFC8F0` | 2 cafés en plus · 1 bouteille d'eau · 1 encas emballé · 1 kit dentaire · 1 kit rasage · bouchons d'oreilles |
| Couple | Pack Couple | 21,50 € | `#F6C9C4` | 1 boisson pétillante sans alcool · chocolats · 1 bougie · 2 infusions |
| Chien | Pack Chien | 9 € | `#E3CDA8` | sacs de ramassage · friandises · 1 lingette pour les pattes · 1 mot « bienvenue à votre chien » |
| Chat | Pack Chat | 7,50 € | `#D6E5B5` | 1 sachet de litière · 1 sac pour bac · friandises |
| Première visite | Pack Première visite | 12 € | `#BFD9F2` | 1 biscuit et 1 confiture d'un producteur de la région · 1 carte du quartier |
| Noël | Pack Noël | 9,50 € | `#F4B9A0` | papillotes · 1 infusion de Noël · 1 petite décoration · 1 carte de vœux |

- Zone visuelle (fond = couleur du pack) : la boîte « Les 3 kits » + une boîte pack qui apparaît, et une étiquette de colis « VENDREDI [04/12] · [Studio Marais] · Les 3 kits + Pack Chien ».
  **L'étiquette affiche le nom du pack, JAMAIS un nombre de voyageurs.**
- Ticket de caisse « TICKET · CETTE ARRIVÉE » :
  - « Les 3 kits … 4,50 € »
  - « + Pack Chien … 9 € », puis le contenu du pack en lignes indentées
  - TOTAL HT (gros) : 4,50 € + prix du pack. Exemple : **13,50 €**
  - Ligne de calcul : « Les 3 kits 4,50 € + Pack Chien 9 € = 13,50 € HT pour cette arrivée »
- Sous le ticket : « Vous ne payez un pack que pour les arrivées où vous l'ajoutez. Vous pouvez aussi le proposer en option à vos voyageurs, à votre prix. »
- Petite ligne : « Ajout automatique selon la réservation : bientôt. »
- **Ne jamais promettre que l'ajout est automatique aujourd'hui.**

Format des prix : virgule décimale, « 4,50 € », « 9 € » (pas de « ,00 »).

## 9. Bloc 7 — Le vrai calcul (`#prix`)

- Fond blanc, bordures haut et bas encre.
- Petit titre : « Le vrai calcul ». H2 : « Moins cher au carton. Plus cher au total. »
- Texte : « Oui, un carton de produits coûte moins cher à l'unité. Mais le carton n'arrive pas trié, compté et étiqueté dans vos logements. Quelqu'un le fait, et ce quelqu'un, vous le payez. »
- Tableau (vrai `<table>`, défilement horizontal sur mobile) : 1re colonne = critère (DM Mono), puis « Avec des cartons » (fond `#EFE6D8` / cellules `#F7F1E7`, texte secondaire) et « Avec SINEBOX » (fond `#BFE3D0` / cellules `#E4F3EA`, gras, coche ✓).

| Critère | Avec des cartons | Avec SINEBOX |
| --- | --- | --- |
| Commande | Vous commandez à l'avance, par grosses quantités | Rien à commander : le calendrier suffit |
| Paiement | Vous payez tout le carton d'avance | Vous payez les kits livrés, une facture par mois |
| Stock | Des cartons à ranger et à recompter | Aucun stock |
| Préparation | Quelqu'un fait les sachets, logement par logement | Les kits arrivent prêts, étiquetés |
| Dernière minute | Une course en urgence si le stock est vide | 1 ou 2 kits d'avance dans chaque colis |

- Phrase de fin (Young Serif 22 px) : « Comptez le temps que votre équipe passe chaque semaine à acheter, compter et préparer. C'est ce temps-là que vous récupérez. »
- Bouton : « Recevoir mon kit d'essai » → `#essai`.
- Ne citer aucun concurrent (ni nom ni prix).

## 10. Bloc 8 — La livraison (`#livraison`)

- H2 : « Deux façons de recevoir vos kits. »
- Deux cartes côte à côte, **même taille** (empilées sur mobile), chacune avec une icône ronde (trait, pas d'emoji) et une pastille en haut à droite :
  1. Fond `#BFD9F2`, icône maison, pastille « 0 € de livraison ».
     H3 : « Compatible avec Deltom Operator »
     Texte : « Vos ménages passent par Deltom Operator ? Vos kits sont remis à Deltom Operator et arrivent dans le logement avec le ménage. Pas de colis à réceptionner, pas de frais de livraison. »
  2. Fond `#F8D5B8`, icône colis, pastille « Dès 15 € HT le colis ».
     H3 : « Par colis, chaque dimanche »
     Texte : « Un seul colis par semaine, livré à votre bureau ou dans un logement. 15 € HT par colis jusqu'à 12 arrivées dans la semaine, 22 € HT au-delà. »
- Carte pleine largeur dessous, fond `#BFE3D0`, icône horloge.
  H3 : « Prêt pour la dernière minute » — « Dans les deux cas, vous avez 1 ou 2 kits d'avance. Vous ne les payez que si vous les utilisez. »
- Lien discret (texte secondaire) : « Vous ne connaissez pas Deltom Operator ? » → https://www.deltomops.com (nouvel onglet, `rel="noopener"`).
- Liste d'attente (séparateur pointillé au-dessus) :
  - Texte (label du champ) : « Livraison en Île-de-France pour le moment. Ailleurs en France : laissez-nous votre e-mail, nous vous prévenons à l'ouverture. »
  - Champ e-mail (placeholder « Votre e-mail ») + bouton « Me prévenir ».
  - Après envoi, remplacer le champ par : « C'est noté, nous vous prévenons à l'ouverture. »

## 11. Bloc 9 — À votre marque

- Visuel (fond lavande arrondi) : boîte kraft avec autocollant rond « Votre logo » + carte « Bienvenue chez [Nom du logement]. Wifi, consignes, bonnes adresses. »
- Petit titre : « À votre marque ». H2 : « Votre nom sur chaque kit. »
- Texte : « Un autocollant à votre logo sur la boîte et une carte d'accueil à votre nom. Le voyageur voit votre marque, pas la nôtre. Les produits gardent leur emballage d'origine. Sans engagement de durée. »

## 12. Bloc 10 — Vos questions (FAQ)

H2 : « Vos questions ». Accordéons (`<details>/<summary>`), fermés par défaut, séparés par un trait encre.

1. **C'est plus cher que d'acheter des cartons, non ?** — À l'unité, oui. Mais un carton, il faut le commander, le payer d'avance, le ranger, le recompter et en faire des sachets logement par logement. Nos kits arrivent prêts, étiquetés, au bon nombre. Vous payez ce qui est livré, rien d'autre.
2. **Y a-t-il un abonnement ou un engagement ?** — Non. Vous payez les kits livrés, avec une facture par mois. Pour arrêter, prévenez-nous avant le dimanche : le colis suivant ne part pas.
3. **Combien coûtent les frais d'envoi ?** — 15 € HT par colis jusqu'à 12 arrivées dans la semaine, 22 € HT au-delà. 0 € si vos ménages passent par Deltom Operator.
4. **Comment savez-vous quand mes voyageurs arrivent ?** — Vous collez le lien de calendrier de chaque logement, Airbnb ou Booking. Nous y lisons les dates d'arrivée. Nous n'avons accès ni aux noms des voyageurs ni à vos revenus.
5. **Et si une réservation tombe à la dernière minute ?** — Chaque colis contient 1 ou 2 kits d'avance. Vous ne les payez que si vous les utilisez.
6. **Et si une réservation est annulée après l'envoi ?** — Le kit reste chez vous comme kit d'avance. Il n'est facturé que s'il est utilisé.
7. **Mon logement accueille 6 personnes. Un kit suffit ?** — Vous indiquez une fois la capacité de chaque logement. Jusqu'à 3 voyageurs : un jeu de 3 kits. De 4 à 6 : deux jeux. 7 et plus : trois jeux.
8. **Quels produits y a-t-il dans les kits ?** — Des produits d'accueil en format individuel, emballés un par un. Le plus simple est de juger sur pièce : le kit d'essai est offert.
9. **Puis-je mettre mon logo ?** — Oui : un autocollant à votre logo sur la boîte et une carte d'accueil à votre nom. Sans engagement de durée.
10. **Vous livrez où ?** — En Île-de-France pour le moment. Le reste de la France arrive : laissez-nous votre e-mail.

## 13. Bloc 11 — Kit d'essai (`#essai`)

- Grand encadré rose `#F6C9C4`, arrondi 32 px.
- H2 : « Jugez sur pièce : votre premier kit est offert. »
- Texte : « Dites-nous où l'envoyer. Vous recevez les 3 kits, envoi compris, vous regardez les produits, vous décidez ensuite. Réservé aux professionnels d'Île-de-France, un kit par société. »
- Formulaire (carte blanche bordée encre, légère rotation −1°), 2 colonnes sur ordinateur, 1 sur mobile. Libellés en DM Mono majuscules, champs fond crème avec trait bas.

| Champ | Type | Obligatoire |
| --- | --- | --- |
| Nom | texte | oui |
| Société | texte | oui |
| Nombre de logements | nombre | oui |
| Ville | texte | oui |
| E-mail | e-mail | oui |
| Téléphone (facultatif) | téléphone | non |

- Bouton pleine largeur : « Recevoir mon kit d'essai »
- Sous le bouton : « Réponse sous [délai]. Sans engagement. »
- Après envoi réussi : le formulaire est remplacé par une coche menthe et le message « C'est noté. Nous vous écrivons sous [délai] pour confirmer l'adresse d'envoi. » (`role="status"`).

## 14. Bloc 12 — Pied de page

Fond encre, texte crème.
Gauche : « SINEBOX » (Young Serif) + « Kits d'accueil pour locations courte durée · Livraison en Île-de-France ».
Droite : [Contact] · Mentions légales · CGV · English (bientôt).

---

## 15. Formulaires : ce qu'il faut brancher

1. **Kit d'essai** : à l'envoi, envoyer un e-mail à l'équipe à `[adresse e-mail de l'équipe]` avec les 6 champs + date/heure. Validation côté navigateur et côté serveur. Protection anti-spam simple (champ caché « pot de miel »). En cas d'erreur, afficher : « L'envoi n'a pas marché. Réessayez dans un instant. »
2. **Liste d'attente France** : envoyer l'e-mail saisi à la même adresse (ou le stocker dans une liste), avec la mention « Liste d'attente hors Île-de-France ».
3. Pas de paiement sur cette page.

## 16. SEO

- `<title>` : « Kits d'accueil Airbnb livrés chaque semaine | SINEBOX »
- `<meta name="description">` : « Un kit d'accueil prêt à poser pour chaque arrivée, livré chaque dimanche selon vos réservations. 4,50 € HT par arrivée. Kit d'essai offert. »
- `lang="fr"`. Un seul H1 (bloc 2). Chaque titre de bloc en H2, titres de cartes en H3.
- Données structurées **schema.org FAQPage** (JSON-LD) avec les 10 questions et réponses du bloc 10, mot pour mot.
- Balises Open Graph (titre et description identiques), image de partage : `[à fournir]`.

## 17. Accessibilité

- Vrais `<button>`, `<a href>`, `<input>` avec `<label>`. Les boutons de sélection (jours, packs) ont `aria-pressed`.
- Visuels décoratifs (boîtes, étagère, store) en `aria-hidden="true"`.
- Contraste du texte ≥ 4,5:1 (l'encre `#2B2118` sur tous les pastels passe).
- Cibles tactiles ≥ 44 px.
- Respect de `prefers-reduced-motion`.

## 18. Ce qui reste à fournir

| Information | Où |
| --- | --- |
| Délai de réponse au formulaire | Bloc 11 (deux fois) |
| Adresse e-mail de l'équipe qui reçoit les formulaires | §15 |
| Coordonnées de contact | Pied de page |
| Mentions légales et CGV | Pied de page |
| Photos réelles des kits (pour remplacer les boîtes dessinées) | Blocs 2, 5, 9 |
| Image de partage (réseaux sociaux) | §16 |
