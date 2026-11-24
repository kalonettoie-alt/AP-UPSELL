# Conversion de la maquette SINEBOX V2

Outils utilisés pour reprendre la maquette HTML (styles en ligne, modèles `<template>`) en composants React.

1. `split.py modele.html dossier/` : découpe un modèle de page en blocs de premier niveau.
2. `convert.py bloc.html > bloc.jsx` : convertit un bloc en JSX (styles en ligne → objets style,
   réglages mobiles → classes `m-*` définies dans `app/globals.css`, prix → `formatPrix(...)` depuis
   `content/fr.ts`, liens → `<LienPage>`, image du sac → `next/image`). Les parties dynamiques
   (`{{…}}`, `sc-for`, événements) sont signalées par `DYN` et reprises à la main.

Les blocs générés sont ensuite relus et corrigés à la main dans `components/`.
