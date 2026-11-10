# IRONZ — Plan de mesure SEO & conversions (B3)

Date : 10/11/2026 · Statut : **proposition, rien n'est implémenté.**

Objectif : savoir quels mots-clés et quelles pages produisent des demandes, sans stocker de données personnelles sans autorisation.

---

## 1. Les trois niveaux à ne pas confondre

| Niveau | Définition | Mesurable par |
|---|---|---|
| **Clic** | L'internaute clique sur un lien (CTA, WhatsApp, téléphone) | GA4 event `click` + GSC (impressions/clics) |
| **Demande préparée** | Le formulaire est rempli et l'utilisateur a cliqué « Préparer sur WhatsApp » (le message est généré, pas encore envoyé) | GA4 event `generate_lead` (si implémenté) |
| **Demande envoyée** | L'utilisateur a appuyé sur « Envoyer » **dans WhatsApp** | **Non mesurable par le site** — seul IRONZ peut le savoir (réception du message) |

> Le site ne peut pas savoir si un message a été envoyé dans WhatsApp. Toute promesse de « suivi des demandes » doit reposer sur un canal mesurable (clics) et sur le suivi humain des messages reçus.

---

## 2. Google Search Console

**Mise en place (gratuit, ~15 min)**
1. Créer un compte GSC avec le domaine `ironz.ma` (pas l'URL-prefix).
2. Vérifier la propriété : balise HTML ou enregistrement DNS chez l'hébergeur.
3. Soumettre `https://www.ironz.ma/sitemap.xml`.

**À surveiller chaque mois**
| Rapport | Ce qu'il apporte |
|---|---|
| **Performance** | requêtes (mots-clés), impressions, clics, CTR, position moyenne |
| **Requêtes** | vérifier que `aménagement salle de sport`, `salle de sport Agadir`, etc. apparaissent |
| **Couverture** | pages indexées / exclues, erreurs 404, pages sans index |
| **Améliorations** | BreadcrumbList, FAQPage, Service : erreurs de structured data |
| **Liens** | liens internes (le maillage « Villes d'intervention ») et backlinks |

**Seuils d'alerte**
- Page sans impression après 30 jours → revoir le titre/H1 ou l'intention.
- CTR < 2 % sur un mot-clé à forte impression → retravailler la meta description.
- Position moyenne > 20 → contenu à renforcer (pas de promesse de classement).

---

## 3. GA4

**Événements utiles (existant ou à ajouter)**
| Événement | Déclencheur | Utilité |
|---|---|---|
| `page_view` | automatique | trafic par page |
| `click` | clic sur un CTA / WhatsApp / téléphone | canal qui génère l'action |
| `generate_lead` | clic « Préparer sur WhatsApp » (formulaire complété) | demande préparée |
| `view_item_list` | consultation des catégories | intention d'achat |

**Paramètres à ajouter aux liens**
- `utm_source=ironz_site`, `utm_medium=cta`, `utm_campaign=amenagement-salle`, `utm_content=agadir`
- Permet de savoir quelle page et quel CTA génèrent les demandes.

**Ce qu'il faut éviter**
- Aucun stockage de nom, téléphone ou email dans GA4 (les envoyer en paramètre d'URL violerait les règles GA4).
- Pas de cookie consent manquant (le site doit déjà avoir un bandeau).

---

## 4. Suivi WhatsApp

**Clics**
- Mesurables via GA4 (`click` avec `utm_content=whatsapp`) et via les `wa.me` links.
- Le numéro est aujourd'hui `+212 674-114446` — **à confirmer par le client** avant d'en faire l'unique canal mesuré.

**Demandes préparées**
- Le formulaire génère le message mais n'envoie rien : c'est un **clic** mesurable.
- Le site affiche déjà « La demande n'est pas envoyée par le site » — c'est exact et à conserver.

**Demandes envoyées**
- Non mesurables techniquement.
- Solution minimale : un suivi manuel (tableur partagé) alimenté par les messages reçus, avec la date, la ville, le service et l'origine (page consultée).

---

## 5. Plan minimal recommandé (dans l'ordre)

1. **GSC** — le seul outil qui donne les mots-clés réels des internautes marocains. Priorité absolue.
2. **GA4** — mesurer les clics sur les CTA et le formulaire.
3. **Tableur de suivi manuel** — pour les demandes réellement reçues.
4. **Rapport mensuel** — impressions, clics, pages les plus consultées, demandes reçues.

**Pas de stockage de données personnelles** : le formulaire ne persiste rien côté serveur. Tout stockage futur (CRM, base de leads) demande une autorisation explicite et une mise en conformité (loi marocaine 09-08).

---

## 6. Indicateurs de réussite réalistes (à 6 mois)

| Indicateur | Cible minimal |
|---|---|
| Pages indexées | 100 % des pages services + villes |
| Erreurs GSC | 0 |
| Impressions sur « aménagement salle de sport » | progression mensuelle visible |
| Clics mensuels sur les CTA | > 0 chaque mois (valeur de référence à établir) |
| Demandes reçues | suivi manuel, pas de promesse chiffrée |

Aucune promesse de positionnement ou de trafic : ces chiffres dépendent de la concurrence et du temps d'indexation.
