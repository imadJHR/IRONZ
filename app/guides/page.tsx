import Link from "next/link";

const PAGE_URL = "https://www.ironz.ma/guides";

type GuideIconName = "dumbbell" | "cardio" | "glove";

interface Guide {
  title: string;
  description: string;
  href: string;
  category: string;
  icon: GuideIconName;
}

const guides: Guide[] = [
  {
    title: "Comment choisir ses haltères, kettlebells et disques au Maroc ?",
    description:
      "Différences entre haltères, kettlebells et disques, comment choisir le poids adapté à votre entraînement et éviter les mauvais achats.",
    href: "/guides/choisir-halteres-kettlebells-disques-maroc",
    category: "Poids libres",
    icon: "dumbbell",
  },
  {
    title: "Tapis roulant, vélo ou rameur : quelle machine cardio choisir au Maroc ?",
    description:
      "Différences entre tapis roulant, vélos et rameur, comment choisir selon votre espace et les caractéristiques à comparer avant d'acheter.",
    href: "/guides/choisir-machine-cardio-tapis-velo-rameur-maroc",
    category: "Cardio",
    icon: "cardio",
  },
  {
    title: "Équipement de boxe débutant au Maroc : par quoi commencer ?",
    description:
      "Quel matériel de boxe acheter en premier, ce qui peut attendre, et comment comparer gants, bandes, sacs et protections avant l'achat au Maroc.",
    href: "/guides/choisir-equipement-boxe-debutant-maroc",
    category: "Boxe",
    icon: "glove",
  },
];

type NeedIconName = "strength" | "cardio" | "combat" | "homegym";

interface Need {
  title: string;
  description: string;
  href: string;
  label: string;
  icon: NeedIconName;
}

const needs: Need[] = [
  {
    title: "Équipement de musculation",
    description: "Haltères, disques, bancs et machines pour le renforcement.",
    href: "/categories/equipements/poids-libres",
    label: "Voir la catégorie",
    icon: "strength",
  },
  {
    title: "Cardio",
    description: "Tapis roulant, vélos et rameurs selon votre espace.",
    href: "/categories/equipements/machine-de-fitness",
    label: "Voir la catégorie",
    icon: "cardio",
  },
  {
    title: "Boxe",
    description: "Gants, bandes, sacs et protections pour débuter.",
    href: "/categories/accessoires/accessoires-de-boxe",
    label: "Voir la catégorie",
    icon: "combat",
  },
  {
    title: "Aménagement / Home Gym",
    description: "Concevoir un espace fitness adapté à votre surface.",
    href: "/services/amenagement-salle/home-gym",
    label: "Voir le service",
    icon: "homegym",
  },
];

const iconCommon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

function GuideIcon({ name }: { name: GuideIconName }) {
  switch (name) {
    case "dumbbell":
      return (
        <svg {...iconCommon}>
          <path d="M6.5 6.5 17.5 17.5" />
          <rect x="2.7" y="4.3" width="5.4" height="2.2" rx="1" transform="rotate(45 5.4 5.4)" />
          <rect x="5.2" y="1.8" width="2.2" height="5.4" rx="1" transform="rotate(45 6.3 4.5)" />
          <rect x="16" y="17.3" width="5.4" height="2.2" rx="1" transform="rotate(45 18.7 18.4)" />
          <rect x="18.5" y="14.8" width="2.2" height="5.4" rx="1" transform="rotate(45 19.6 17.5)" />
        </svg>
      );
    case "cardio":
      return (
        <svg {...iconCommon}>
          <path d="M3 12h4l2.2-5 3 10 2.4-5H21" />
          <path d="M4 20h16" />
        </svg>
      );
    case "glove":
      return (
        <svg {...iconCommon}>
          <path d="M8 13V5.5A1.5 1.5 0 0 1 9.5 4c.83 0 1.5.67 1.5 1.5V11" />
          <path d="M11 11V5.5a1.5 1.5 0 0 1 3 0V11" />
          <path d="M14 11.5V7.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a5 5 0 0 1-5-5v-2.5a1.5 1.5 0 0 1 3 0V13" />
        </svg>
      );
  }
}

function NeedIcon({ name }: { name: NeedIconName }) {
  switch (name) {
    case "strength":
      return (
        <svg {...iconCommon}>
          <path d="M6.5 6.5 17.5 17.5" />
          <path d="M3.5 4.5 4.5 3.5 7 6 6 7Z" />
          <path d="M3 7.5 4.5 6 7 8.5 5.5 10Z" />
          <path d="M17 16l1.5-1.5 2.5 2.5-1.5 1.5z" />
          <path d="M19.5 12.5 21 14l-2 2-1.5-1.5z" />
        </svg>
      );
    case "cardio":
      return (
        <svg {...iconCommon}>
          <path d="M3 12h4l2.2-5 3 10 2.4-5H21" />
          <path d="M4 20h16" />
        </svg>
      );
    case "combat":
      return (
        <svg {...iconCommon}>
          <path d="M8 13V5.5A1.5 1.5 0 0 1 9.5 4c.83 0 1.5.67 1.5 1.5V11" />
          <path d="M11 11V5.5a1.5 1.5 0 0 1 3 0V11" />
          <path d="M14 11.5V7.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a5 5 0 0 1-5-5v-2.5a1.5 1.5 0 0 1 3 0V13" />
        </svg>
      );
    case "homegym":
      return (
        <svg {...iconCommon}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
  }
}

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma" },
      { "@type": "ListItem", position: 2, name: "Guides", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guides fitness et musculation au Maroc",
    description:
      "Guides d’achat IRONZ pour choisir son matériel de fitness et de musculation au Maroc.",
    url: PAGE_URL,
    publisher: {
      "@type": "Organization",
      name: "IRONZ",
      logo: { "@type": "ImageObject", url: "https://www.ironz.ma/logo-optimized.png" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guides fitness et musculation IRONZ",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: `https://www.ironz.ma${guide.href}`,
    })),
  },
];

export default function GuidesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-950 px-4 pb-16 pt-28 text-white sm:px-6 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-600/10" aria-hidden="true" />
        <div className="absolute -top-1/2 right-0 h-96 w-96 translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Fil d’Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition-colors hover:text-yellow-500">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li className="font-medium text-white">Guides</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">
              <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
                Guides IRONZ
              </span>
            </div>

            <h1 className="mb-6 font-display text-4xl uppercase leading-[0.95] tracking-wide sm:text-5xl md:text-6xl">
              Guides fitness et musculation au Maroc
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300">
              Des guides pratiques pour comparer les équipements, comprendre ce qui change
              d’une machine à l’autre et faire le bon choix avant d’acheter. Chaque guide
              se concentre sur une décision d’équipement précise.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#guides"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-yellow-500 px-8 py-5 font-display uppercase tracking-widest text-black transition-all hover:bg-yellow-400"
              >
                Découvrir les guides
              </a>
              <Link
                href="/produit"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/10 px-8 py-5 font-display uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Voir les produits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guides grid ──────────────────────────────────────── */}
      <section id="guides" className="bg-white px-4 py-16 dark:bg-gray-950 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl">
              Nos <span className="text-yellow-500">guides pratiques</span>
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Chaque guide porte sur une décision d’équipement précise : comparer les
              modèles, comprendre les différences et éviter les erreurs courantes avant
              l’achat.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-display uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                    {guide.category}
                  </span>
                  <span className="h-10 w-10 text-gray-300 transition-colors group-hover:text-yellow-500 dark:text-gray-700">
                    <GuideIcon name={guide.icon} />
                  </span>
                </div>

                <h3 className="mb-4 text-xl font-bold leading-snug text-gray-900 dark:text-white">
                  {guide.title}
                </h3>

                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {guide.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-2 border-t border-gray-100 pt-6 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  Lire le guide
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Choisir selon votre besoin ───────────────────────── */}
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-900 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl">
              Choisir selon votre <span className="text-yellow-500">besoin</span>
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Vous savez déjà quel type d’équipement vous cherche ? Accédez directement
              aux rayons et services IRONZ correspondants.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {needs.map((need) => (
              <Link
                key={need.href}
                href={need.href}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-xl dark:border-gray-800 dark:bg-gray-800"
              >
                <span className="mb-6 h-10 w-10 text-yellow-500 transition-transform group-hover:scale-110">
                  <NeedIcon name={need.icon} />
                </span>

                <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900 dark:text-white">
                  {need.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {need.description}
                </p>

                <span className="mt-auto text-sm font-medium text-gray-900 transition-colors group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">
                  {need.label} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-black sm:text-4xl">
            Vous cherchez plutôt un produit ou un projet fitness ?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl leading-relaxed text-black/80">
            Parcourez le catalogue IRONZ ou parlez de votre projet à notre équipe.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/produit"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-black px-8 py-5 font-display uppercase tracking-widest text-white transition-all hover:bg-zinc-800"
            >
              Voir les produits
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-5 font-display uppercase tracking-widest text-black transition-all hover:bg-gray-100"
            >
              Découvrir les services
            </Link>
            <Link
              href="/demande-devis"
              className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-black px-8 py-5 font-display uppercase tracking-widest text-black transition-all hover:bg-black/10"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
