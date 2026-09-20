import Link from "next/link";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../lib/og-image";

export const metadata = {
  title: "Équipement de boxe débutant au Maroc : par quoi commencer ? | IRONZ",
  description:
    "Débuter la boxe au Maroc : quel matériel acheter en premier, ce qui peut attendre, et comment comparer gants, bandes, sacs et protections avant l'achat.",
  alternates: { canonical: "/guides/choisir-equipement-boxe-debutant-maroc" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Équipement de boxe débutant au Maroc : par quoi commencer ? | IRONZ",
    description:
      "Débuter la boxe au Maroc : quel matériel acheter en premier, ce qui peut attendre, et comment comparer gants, bandes, sacs et protections avant l'achat.",
    url: "https://www.ironz.ma/guides/choisir-equipement-boxe-debutant-maroc",
    type: "article",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Équipement de boxe débutant au Maroc : par quoi commencer ? | IRONZ",
    description:
      "Débuter la boxe au Maroc : quel matériel acheter en premier, ce qui peut attendre, et comment comparer gants, bandes, sacs et protections avant l'achat.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

const PAGE_URL = "https://www.ironz.ma/guides/choisir-equipement-boxe-debutant-maroc";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.ironz.ma/guides" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Équipement de boxe débutant au Maroc",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Équipement de boxe débutant au Maroc : par quoi commencer ?",
    description:
      "Débuter la boxe au Maroc : quel matériel acheter en premier, ce qui peut attendre, et comment comparer gants, bandes, sacs et protections avant l'achat.",
    publisher: {
      "@type": "Organization",
      name: "IRONZ",
      logo: { "@type": "ImageObject", url: "https://www.ironz.ma/logo-optimized.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  },
];

export default function GuideEquipementBoxeDebutant() {
  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav aria-label="Fil d'Ariane" className="mb-10">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li>
            <Link href="/guides" className="hover:text-yellow-600 dark:hover:text-yellow-400">
              Guides
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li className="font-medium text-gray-900 dark:text-white">Boxe débutant</li>
        </ol>
      </nav>

      <h1 className="mb-8 font-display text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
        Équipement de boxe débutant au Maroc : par quoi commencer ?
      </h1>

      <p className="mb-12 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Il n'existe pas de liste universelle pour commencer la boxe. Le premier achat
        dépend d'une chose simple : allez-vous frapper seul, à la maison, ou avec un
        partenaire ? Ce guide présente le matériel de boxe disponible chez IRONZ, ce qui
        sert à chaque contexte d'entraînement, et ce qui peut tout à fait attendre. À
        l'arrivée, vous saurez quoi acheter en premier et quoi vérifier sur la fiche
        produit avant de commander au Maroc.
      </p>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Le matériel de boxe IRONZ en deux familles
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Tout le matériel de boxe se répartit en deux groupes, et cette distinction
          guide tout le reste. D'un côté, ce que l'on porte pour se protéger : gants,
          bandes, protège-dents, protège-tibias. De l'autre, ce qui sert de cible à
          frapper : sacs de frappe, paos, pads, cibles, plastron, bâtons d'esquive. Un
          pratiquant a besoin des deux, mais pas dans le même ordre ni au même moment.
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Les protections</strong> — gants, bandes de boxe, protège-dents,
            protège-tibias. Elles se portent à chaque séance, seul ou à deux, et se
            choisissez selon la taille et le format déclarés par le fabricant.
          </li>
          <li>
            <strong>Les cibles</strong> — sacs de frappe et sac de boxe pour travailler
            seul, paos, pads, cibles, plastron et bâtons d'esquive pour les exercices à
            deux, avec un partenaire ou un coach.
          </li>
        </ul>
        <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Concrètement, un sac de frappe ne sert à rien si vous n'avez pas de gants, et
          des paos ne servent à rien si vous vous entraînez seul. C'est cet ordre là,
          pas un classement de qualité, qui détermine le premier achat.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Votre contexte d'entraînement change la première liste
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Avant d'acheter, posez-vous la question du contexte. Le matériel utile n'est pas
          le même selon que vous frappez seul à la maison, avec un partenaire, ou en club.
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Seul, à domicile</strong> — la priorité est la frappe sur sac : gants,
            bandes, puis un sac de boxe ou un sac de frappe adapté à l'espace dont vous
            disposez. Les cibles à deux (paos, pads, plastron, bâtons) ne sont pas utiles
            tant que vous êtes seul.
          </li>
          <li>
            <strong>Avec un partenaire</strong> — les protections restent les mêmes, mais
            les exercices se font sur paos, pads, cibles, plastron et bâtons d'esquive. Le
            sac de frappe devient l'outil du travail à la maison, en complément.
          </li>
          <li>
            <strong>En club</strong> — le prêt de matériel y est fréquent, et le matériel
            demandé dépend de chaque structure. Vérifiez auprès du club ce qui est fourni
            avant d'acheter : dans bien des cas, seules les protections personnelles
            restent à acheter. IRONZ ne peut pas lister les exigences d'un club en
            particulier.
          </li>
        </ul>
        <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Ce point de départ est aussi la raison pour laquelle il est inutile d'acheter
          tout en une fois : la suite des achats se déduit de la pratique, pas l'inverse.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Les protections communes à toutes les séances
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Trois protections reviennent dans tous les contextes : les gants, les bandes et
          le protège-dents. C'est le premier poste de dépense, avant la moindre cible.
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Les gants</strong> — le modèle référencé chez IRONZ existe en OZ 4 et
            OZ 6, et sa fiche le présente comme un modèle pour enfants. Pour un adulte,
            IRONZ ne propose pas de gants dans cette taille : ne vous fiez pas à une
            correspondance entre poids du corps et nombre d'onces, et vérifiez la taille
            et le public visé sur la fiche avant de commander.
          </li>
          <li>
            <strong>Les bandes</strong> — la bande de boxe référencée mesure 3,5 m. Elle
            protège poignets et mains sous le gant. Sa fiche indique sa longueur exacte.
          </li>
          <li>
            <strong>Le protège-dents</strong> — décliné en quatre coloris, à choisir selon
            la fiche et ses indications.
          </li>
        </ul>
        <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Les protections ne sont pas un équipement optionnel : sans gants et sans bandes,
          le travail de frappe n'est pas possible, que ce soit sur sac ou sur paos.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Frapper seul : les sacs et leurs dimensions
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Quand on s'entraîne seul, la cible devient le sac. IRONZ référence quatre
          formats clairement différents, et le choix est d'abord une question de place et
          de poids.
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Le sac de boxe compact</strong> — 60 cm, 20 kg, pour les entraînements
            à domicile ou en salle quand l'espace est limité.
          </li>
          <li>
            <strong>Le sac de frappe 1,20 m</strong> — en toile résistante, adapté à la
            boxe Sanda et aux entraînements d'adultes.
          </li>
          <li>
            <strong>Le sac de frappe 1,60 m</strong> — pour les adultes pratiquant la boxe
            ou le kick-boxing, en bâche, pour un usage intensif.
          </li>
          <li>
            <strong>Le Bulgarian bag de 15 kg</strong> — un autre format de travail de
            puissance, qui n'est pas un sac de frappe à proprement parler.
          </li>
        </ul>
        <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Aucun de ces formats n'est le « meilleur » : 60 cm se range plus facilement qu'un
          1,60 m, mais un grand sac offre une zone de frappe différente. Mesurez l'espace
          disponible, notez le poids indiqué, et comparez avec votre plan d'entraînement.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Frapper à deux : paos, pads, cibles, plastron et bâtons
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Dès qu'il y a un partenaire, les exercices changent de support. Les cibles à
          deux se tiennent à la main ou se portent, et chaque format correspond à un
          exercice différent plutôt qu'à un niveau de qualité.
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Les paos et pads</strong> — tenus par le partenaire pour les
            enchaînements de coups de poing et de pied, en cuir synthétique. Le pad de
            frappe et les pads de box IRONZ servent cet usage.
          </li>
          <li>
            <strong>La cible de frappe ronde</strong> — un format circulaire pour le
            travail de précision et de coordination.
          </li>
          <li>
            <strong>Le plastron</strong> — porté par celui qui tient, pour absorber les
            frappes les plus lourdes sur le tronc.
          </li>
          <li>
            <strong>Les bâtons d'esquive</strong> — vendus par paire, en mousse, pour le
            travail d'esquive et de rapidité plutôt que la puissance.
          </li>
        </ul>
        <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Si vous débutez seul, toute cette famille peut attendre. C'est en général
          l'achat qui vient une fois qu'un partenaire ou un coach entre dans la pratique.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Les protège-tibias ne sont pas le premier achat pour tout le monde
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          IRONZ référence deux modèles : une version adulte et une version enfant. Ils
          protègent le tibia et le cou-de-pied, et ils prennent tout leur sens en
          kick-boxing ou en Muay Thai, où les frappes basses sont nombreuses.
        </p>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          En boxe anglaise, où les frappes se font au-dessus de la ceinture, les
          protège-tibias sont moins souvent nécessaires au début. C'est un achat lié à la
          discipline pratiquée, pas un achat systématique — d'où leur place ici, après
          les protections de base et la cible principale.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Ce qui peut attendre
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Plusieurs références ne deviennent utiles qu'avec la pratique. Inutile de les
          anticiper.
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Les cibles à deux</strong> — paos, pads, cibles, plastron et bâtons
            d'esquive n'ont d'intérêt que si vous vous entraînez avec quelqu'un.
          </li>
          <li>
            <strong>Le Bulgarian bag</strong> — un outil de travail de puissance pour
            CrossFit et préparation physique, qui s'ajoute à un équipement déjà en place.
          </li>
          <li>
            <strong>Les protège-tibias</strong> — liés aux disciplines avec frappes basses.
          </li>
          <li>
            <strong>Le second sac de frappe</strong> — les formats se complètent, mais un
            seul suffit pour démarrer.
          </li>
        </ul>
        <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
          La règle de fond reste la même : le matériel suit le contexte, pas l'inverse.
          Chaque achat doit répondre à une séance que vous faites réellement.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Vérifier dimensions, tailles et fiche produit avant d'acheter
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Les erreurs d'achat les plus fréquentes viennent de la taille et de l'espace,
          pas de la qualité. Avant de commander, prenez le temps de vérifier trois choses
          sur la fiche produit.
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Les dimensions et le poids</strong> — un sac de 60 cm et un sac de
            1,60 m n'occupent pas la même pièce, et les poids déclarés vont de 20 kg à
            47 kg. Mesurez votre espace et lisez le poids indiqué.
          </li>
          <li>
            <strong>La taille des gants</strong> — les OZ ne se convertissent pas à partir
            du poids du corps. Les références IRONZ existent en OZ 4 et OZ 6, en modèle
            enfant : vérifiez que c'est bien à vous qu'ils sont destinés.
          </li>
          <li>
            <strong>Le public visé</strong> — certaines références sont déclarées pour les
            enfants ou pour les adultes, d'autres pour un usage intensif. La fiche le
            précise, lisez-la.
          </li>
        </ul>
        <p className="mt-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Les caractéristiques, les prix et la disponibilité évoluent : ce qui est indiqué
          dans ce guide doit être confirmé sur la fiche produit avant l'achat.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Voir le matériel de boxe disponible chez IRONZ
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          IRONZ référence 15 produits dans le rayon boxe, de 55 à 1 499 MAD : gants,
          bandes, protège-dents, protège-tibias en modèles adulte et enfant, sacs de
          boxe et sacs de frappe en plusieurs dimensions, paos, pads, cibles, plastron et
          bâtons d'esquive. Les fiches détaillent dimensions, tailles, coloris et
          caractéristiques.
        </p>
        <Link
          href="/categories/accessoires/accessoires-de-boxe"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-display text-base font-bold uppercase tracking-widest text-black transition-all hover:bg-yellow-500"
        >
          Voir les accessoires de boxe chez IRONZ
        </Link>
      </section>
    </article>
  );
}
