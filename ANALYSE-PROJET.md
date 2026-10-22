# Analyse technique du projet IRONZ

Audit du dépôt local commencé le 20 octobre 2026 et terminé le 21 octobre 2026. Aucun code applicatif modifié. Les changements déjà présents dans `app/page.tsx` et `app/services/layout.tsx` ont été conservés.

## Conclusion

IRONZ possède une couverture fonctionnelle étendue : boutique de matériel sportif, catalogue, catégories, panier, commande avec paiement à la livraison, avis authentifiés, services, demande de devis et contenus éditoriaux. Le travail SEO côté code est conséquent. Les problèmes les plus urgents concernent cependant les frontières de confiance : administration contrôlée dans le navigateur, montants de commande fournis par le client, données du catalogue insérées sans échappement dans des scripts JSON-LD.

Le dépôt contient le frontend et deux routes API Next.js. Le backend produits AWS Lambda et sa base de données ne sont pas présents. Sa sécurité réelle, ses sauvegardes et ses règles métier ne peuvent donc pas être certifiées par cet audit.

## Périmètre et architecture

- 153 fichiers TypeScript, TSX, CSS et MJS dans `app`, `components`, `context`, `lib` et `data`, environ 39 306 lignes physiques.
- 32 fichiers `page.tsx`, incluant des routes dynamiques, et deux handlers API : commande et avis.
- Next.js installé : 16.3.4 ; React : 19.2.3 ; Clerk Next.js : 6.39.6 ; TypeScript : 5.9.3.
- App Router, Server Components pour une partie des pages et métadonnées, composants clients pour les interactions.
- Tailwind CSS 4, Radix UI, composants de type shadcn, Framer Motion, Swiper.
- Produits et médias distants via une API AWS Lambda et Cloudinary ; médias locaux dans `public`.
- Panier et favoris persistés dans `localStorage`.
- Commandes transmises par SMTP via Nodemailer ; avis associés aux comptes Clerk.
- Hébergement suggéré par la présence de `.vercel`, sans vérification du déploiement réel.

Parcours principal : page serveur → API produits → composants interactifs → panier local → `/api/checkout` → email marchand et copie client facultative. Il n'existe pas de stockage de commande dans ce parcours du dépôt.

## Constats prioritaires

### P0 — La connexion administrateur ne constitue pas une authentification serveur

**Preuves :** `app/ironz-setup/SetupClientLayout.tsx:6`, `:24`, `:91` ; création dans `app/ironz-setup/page.tsx:448`, suppression dans `app/ironz-setup/products/page.tsx:136`, modification dans `app/ironz-setup/products/edit/[id]/page.tsx:683`.

Les identifiants sont écrits en clair dans un composant client. L'accès à l'interface repose sur un booléen dans `localStorage`. Les opérations produits partent directement du navigateur vers Lambda, sans jeton d'authentification explicite. Le middleware ne protège que `/api/*` et ne protège pas `/ironz-setup`.

**Impact certain :** le verrou d'interface est contournable et les identifiants sont exposés dans le code livré au navigateur. **Impact à confirmer côté Lambda :** si le backend accepte ces requêtes sans contrôle supplémentaire, création, modification et suppression de produits sont accessibles sans véritable autorisation. Aucun appel destructif distant n'a été effectué pour le tester.

**Correction :** authentification serveur, rôle administrateur vérifié pour chaque mutation, backend refusant les mutations non authentifiées ; retirer les identifiants du frontend et les renouveler s'ils ont été utilisés ailleurs.

### P1 — Les prix, totaux et numéros de commande sont contrôlés par le client

**Preuves :** `app/checkout/page.tsx:255`, `:261` ; `app/api/checkout/route.ts:46` et suite.

Le client transmet noms, prix, quantités, sous-total, total et numéro de commande. Le serveur vérifie quelques types et bornes, puis reprend ces valeurs dans l'email. Il ne recharge aucun produit, ne vérifie pas le stock et ne recalcule ni les articles ni les frais de livraison. Les articles transmis ne comportent même pas d'identifiant produit.

**Impact :** une requête forgée peut envoyer une commande avec un prix nul ou un total arbitraire ; une ancienne valeur du panier peut aussi être utilisée involontairement. La confirmation n'atteste pas un montant validé par le catalogue.

**Correction :** transmettre identifiants et variantes, charger les valeurs faisant autorité côté serveur, valider disponibilité et quantités, calculer les montants en unités monétaires entières, générer l'identifiant serveur.

### P1 — Les commandes ne sont pas enregistrées durablement

**Preuve :** `app/api/checkout/route.ts:224` : l'acceptation SMTP est suivie d'une réponse de succès, sans écriture de commande. Aucun modèle ou service de persistance des commandes n'est présent.

Il n'y a pas d'idempotence serveur. Si SMTP accepte l'email mais que la réponse HTTP est perdue, une nouvelle tentative peut produire un doublon. La protection contre les doubles clics dans le client est utile mais ne résout pas ce cas.

**Correction :** enregistrer d'abord une commande avec une clé d'idempotence unique, puis notifier avec un statut d'envoi et des reprises contrôlées. Conserver un historique exploitable par le marchand.

### P1 — Injection possible dans les scripts JSON-LD

**Preuves :** `app/produit/[slug]/page.tsx:249`, `app/produit/page.tsx:169`, `app/categories/[slug]/[subSlug]/page.tsx:789`.

Des champs provenant du catalogue sont sérialisés par `JSON.stringify`, puis injectés avec `dangerouslySetInnerHTML` dans une balise `script`. Le caractère `<` n'est pas échappé : une donnée contenant une fermeture de balise script peut sortir du bloc JSON-LD. `JSON.stringify` seul n'est pas un échappement sûr pour ce contexte HTML.

**Impact :** risque de XSS persistante si une personne ou une source compromise peut modifier ces champs. Le code d'administration rend ce point particulièrement prioritaire.

**Correction :** centraliser une sérialisation JSON-LD qui transforme notamment `<` en `\u003c`, et l'utiliser sur toutes les données dynamiques. Vérifier le comportement avec une valeur malveillante dans un test local.

### P1 — Endpoint de commande exploitable pour des envois abusifs

**Preuves :** `app/api/checkout/route.ts:36`, `:117`, `:219`.

Aucune limitation de fréquence applicative, clé d'idempotence ou protection anti-automatisation n'est présente dans ce handler public. L'email client facultatif est utilisé comme destinataire en copie. Les chaînes utilisateur et noms de produits sont interpolés dans le HTML sans échappement. La taille des champs et du tableau d'articles n'est pas bornée par ce code.

**Impact :** saturation de la boîte marchand, utilisation de l'identité d'envoi pour expédier du contenu à des adresses tierces et falsification visuelle des emails. Il s'agit d'injection HTML dans un email ; l'exécution de JavaScript dans un client mail n'est pas démontrée.

**Correction :** quotas adaptés au checkout invité, limites de taille et de nombre d'articles, validation structurée de tous les champs et échappement HTML. Des protections d'infrastructure peuvent exister, mais ne sont pas visibles ici.

## Fiabilité des avis et du catalogue

### P1 — L'onglet avis dépend d'un provider Clerk qui peut être absent

`app/ClientLayout.tsx:135` n'active Clerk que pour une clé commençant par `pk_live_`. `components/reviews/reviews-section.tsx:66` appelle pourtant `useUser()` sans garde. `app/produit/[slug]/ProductDetailClient.tsx:1335` monte ce composant lorsque l'onglet avis est ouvert.

Avec une clé de développement ou sans clé, le provider manque et l'onglet peut déclencher une erreur de contexte. Un import depuis `@clerk/clerk-react`, package non déclaré directement, ajoute une dépendance implicite. Prévoir un rendu de lecture seule sans Clerk et une configuration explicite par environnement.

### P2 — Propriété des avis non transactionnelle

`app/api/reviews/route.ts` stocke l'avis dans Lambda, puis mémorise son propriétaire dans `publicMetadata` Clerk. L'échec de cette seconde opération est ignoré. Deux requêtes concurrentes peuvent aussi lire la même ancienne map puis écraser des entrées ou créer des doublons.

Même problème après suppression : une map non mise à jour conserve un identifiant obsolète. De plus, les mutations de `lib/reviews.ts` n'envoient aucune authentification explicite au backend ; sa protection doit être vérifiée indépendamment de celle de Next.js.

Placer l'identité de l'auteur et une contrainte d'unicité `(productId, userId)` dans le stockage des avis. Tester les requêtes concurrentes et les échecs partiels. Aucun rate limiter n'est implémenté malgré la présence d'un code d'erreur `rate-limited`.

### P2 — Règles de stock et de prix dispersées

La fiche serveur considère un produit disponible si `inStock !== false`, tandis que `ProductDetailClient.tsx` utilise `!product?.inStock` pour détecter une rupture : un champ absent produit donc des interprétations différentes. `context/cart-context.tsx` utilise `salePrice || price`, mais le checkout envoie `item.price`. Si `salePrice` existe, l'email peut présenter des lignes qui ne correspondent pas au total.

Le panier recharge un tableau JSON sans valider les éléments. Les prix et quantités sont conservés sans rapprochement avec le catalogue ; les erreurs d'accès au stockage navigateur ne sont pas toutes interceptées. Centraliser les règles de prix, disponibilité, variantes et schémas de panier.

## Performance et résilience

- `lib/products.ts:101` charge jusqu'à 20 pages de 100 produits, séquentiellement. `getAllProducts()` utilise par défaut `no-store`. Le catalogue et les pages catégories peuvent donc charger le catalogue entier pour chaque requête serveur, y compris pour un rayon réduit. La limite de 2 000 produits tronque le résultat si le catalogue grandit au-delà.
- Les fiches utilisent un cache de 600 secondes, l'accueil 60 secondes et le sitemap 3 600 secondes. Aucun appel d'invalidation de cache après mutation n'a été trouvé. Un changement de prix ou de stock peut être visible à des moments différents selon la page.
- Les appels produits n'ont pas de délai maximal explicite. Une API lente peut retarder longtemps une page. Les pages catalogue et catégorie ne disposent pas d'une frontière d'erreur locale.
- Le fallback `Suspense` de `app/produit/page.tsx` arrive après l'attente de `getAllProducts()` : il ne couvre pas cette attente. Les fichiers `Loading.tsx` avec majuscule ne constituent pas la convention spéciale `loading.tsx`.
- `app/ClientLayout.tsx` rassemble HTML racine, providers, navigation, pied de page et interactions dans un gros module client. Cela justifie un découpage, sans signifier que toutes les pages enfants deviennent des Client Components.
- 306 fichiers dans `public`, pour environ 158,9 Mio. Des originaux atteignent 24,86 Mio (`accessoire.jpg`) et 19,37 Mio (`equipement.jpg`). Plusieurs références actives utilisent déjà des versions WebP optimisées : le poids total du dossier ne représente pas le poids chargé par une page. Vérifier les usages restants avant toute suppression.

**Direction :** pagination et filtrage serveur, cache partagé avec invalidation après mutation, délais maximaux, gestion des erreurs et composants interactifs plus petits. Les gains LCP, INP et CLS doivent être mesurés dans un navigateur ; aucun score Lighthouse n'est affirmé ici.

## SEO, contenu et expérience

Points solides : métadonnées serveur, canoniques, Open Graph, Twitter Cards, sitemap dynamique, redirections des anciennes URL, redirection vers le domaine avec `www`, fil d'Ariane et schémas produit, articles et pages services. Les évaluations structurées de la fiche sont calculées à partir des vrais avis.

Points à améliorer :

- Le sitemap ignore les URLs produits si son chargement échoue et peut publier un résultat partiel ; surveiller cette situation et garder un dernier résultat valide.
- Des textes SEO contiennent des prix et nombres de produits figés ; ils peuvent diverger du catalogue.
- Le changement FR/EN est principalement local au layout ; les pages restent largement en français tandis que `html lang` peut passer à `en`. Il n'existe pas de vraie stratégie de routes localisées visible.
- `ServiceContactForm` ouvre WhatsApp, efface les champs et passe en état de réussite sans preuve d'envoi du message ni traitement du blocage de fenêtre. La page de devis gère mieux cette distinction et propose un lien de reprise. Uniformiser sur une demande « préparée », puis laisser la personne confirmer l'envoi dans WhatsApp.
- Meta Pixel est chargé globalement, y compris via le layout racine, sans condition de consentement visible. C'est un comportement technique à revoir selon la politique de confidentialité choisie ; cet audit ne conclut pas à une infraction juridique.
- La présence d'un lien d'évitement, de labels et de composants Radix est positive. Une validation réelle au clavier, lecteur d'écran et sur téléphone reste nécessaire.

## Maintenance, configuration et tests

- Plusieurs fichiers dépassent 1 000 lignes : accueil, catalogue, layout, fiche produit et administration. Les types `Product`, les fonctions de slug, les constantes API et les règles de prix se répètent.
- `lib/api.ts` conserve une URL localhost, tandis que d'autres modules utilisent Lambda ou une variable d'environnement. Vérifier les imports avant retrait ; tous les helpers historiques ne sont pas nécessairement utilisés.
- `components/Product-Card.tsx` contient un formatage EUR alors que la boutique vend en MAD ; vérifier ses usages avant d'en déduire une erreur visible en production.
- `app/Providers.tsx` et `context/LanquageContext.tsx` doublonnent une partie de la logique actuelle. Le dossier littéral `@/components` contient aussi des composants JSX à clarifier.
- `tsconfig.json` désactive `strict`. ESLint abaisse plusieurs règles en avertissements. Des casts `as unknown as` masquent les désaccords de modèles.
- TypeScript et certains types sont installés mais non déclarés explicitement dans `package.json`. Déclarer les dépendances directes réellement utilisées et la version Node attendue, puis vérifier une installation propre.
- Le README reste celui de create-next-app ; aucune documentation métier de configuration ou de déploiement, aucun `.env.example` et aucun workflow CI suivi dans `.github` n'ont été trouvés.
- Les fichiers `.env*` et `.clerk` sont ignorés par Git ; aucun fichier d'environnement suivi n'a été trouvé. Cela ne constitue pas une recherche complète de secrets dans l'historique Git.
- `middleware.ts` est déprécié dans la version Next installée au profit de `proxy.ts`. La documentation locale et le build confirment cette dépréciation ; ce n'est pas à lui seul une panne actuelle.
- 18 tests passent : 5 sur les promotions, 8 sur SMTP/validation de commande et 5 sur les échecs et doubles soumissions côté client. Les appels réseau et SMTP y sont simulés. Aucun test navigateur de bout en bout n'a été trouvé ; le script `test` manque dans `package.json`.

## Plan d'action

1. **Sécuriser les mutations** : authentification admin réelle et vérification du backend Lambda, suppression des identifiants client, sérialisation JSON-LD sûre.
2. **Fiabiliser la commande** : identifiants produits, recalcul serveur, stock, persistance, idempotence, validation, échappement et protection anti-abus.
3. **Stabiliser les avis** : mode sans Clerk, propriété enregistrée dans le backend, tests d'échecs partiels et de concurrence.
4. **Réduire les coûts de chargement** : pagination serveur, cache invalidable, timeouts, frontières d'erreur et conventions de chargement correctes.
5. **Faciliter l'évolution** : domaine produit commun, découpage des gros modules, documentation, dépendances explicites, CI et tests des parcours d'achat essentiels.

## Limites de validation

Audit statique et commandes locales, sans modification des produits, sans soumission de commande réelle et sans envoi d'email réel. Le backend distant, la base de données, les réglages Vercel, les métriques réelles de trafic, l'indexation Google, les contrôles d'infrastructure et le rendu navigateur n'ont pas été audités directement.

### Contrôles exécutés

- `node --test lib/product-pricing.test.mjs lib/checkout.test.mjs lib/checkout-client.test.mjs` : **18 tests réussis, aucun échec**.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false` : **réussi, aucune erreur**.
- `npm run lint -- --format json --output-file .next/audit-eslint.json` : **réussi, 0 erreur et 422 avertissements** sur 159 fichiers analysés. Principaux groupes : 291 échappements de texte JSX, 65 variables inutilisées, 20 mises à jour d'état dans un effet, 14 balises `img`, 10 types objet vides, 9 avertissements de pureté, 8 `any` explicites et 3 dépendances de hooks. Les avertissements n'ont donc pas tous la même gravité.
- Une simulation supplémentaire a exécuté le vrai handler checkout transpilé avec un transport mail factice : **réponse HTTP 200 et `success: true` pour un article arbitraire à 0 MAD et un nom contenant du HTML**, conservé sans échappement dans l'email. Aucun appel réseau ou SMTP réel n'a été effectué.
- `npm run build` : **réussi avec accès réseau**, compilation en 7,7 secondes, TypeScript en 16,5 secondes et génération de **49/49 pages**. Le premier essai en environnement réseau restreint a été interrompu après plusieurs minutes ; sa sortie signalait l'impossibilité de télécharger les polices Google Inter et Anton. La relance autorisée avec accès réseau s'est terminée avec le code 0. Avertissements restants : convention `middleware` dépréciée et `module.register()` déprécié dans l'environnement Node utilisé.

Le build confirme que les routes de catalogue, catégories dynamiques et fiches produit sont rendues à la demande ; les contenus éditoriaux et services sont majoritairement prérendus. La génération des pages ne valide pas à elle seule tous les parcours interactifs ni les autorisations du backend.
