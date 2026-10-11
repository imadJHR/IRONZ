import Link from "next/link";

const PAGE_URL = "https://www.ironz.ma/guides";

type GuideIconName = "dumbbell" | "cardio" | "glove";

interface Guide {
  title: string;
  description: string;
  href: string;
  category: string;
  icon: GuideIconName;
  readTime: string;
  decision: string;
}

const guides: Guide[] = [
  {
    title: "Comment choisir ses haltères, kettlebells et disques au Maroc ?",
    description:
      "Différences entre haltères, kettlebells et disques, comment choisir le poids adapté à votre entraînement et éviter les mauvais achats.",
    href: "/guides/choisir-halteres-kettlebells-disques-maroc",
    category: "Poids libres",
    icon: "dumbbell",
    readTime: "7 min",
    decision: "Quel poids et quelle forme de charge acheter en premier",
  },
  {
    title: "Tapis roulant, vélo ou rameur : quelle machine cardio choisir au Maroc ?",
    description:
      "Différences entre tapis roulant, vélos et rameur, comment choisir selon votre espace et les caractéristiques à comparer avant d'acheter.",
    href: "/guides/choisir-machine-cardio-tapis-velo-rameur-maroc",
    category: "Cardio",
    icon: "cardio",
    readTime: "8 min",
    decision: "Quelle machine cardio correspond à votre espace et votre usage",
  },
  {
    title: "Équipement de boxe débutant au Maroc : par quoi commencer ?",
    description:
      "Quel matériel de boxe acheter en premier, ce qui peut attendre, et comment comparer gants, bandes, sacs et protections avant l'achat au Maroc.",
    href: "/guides/choisir-equipement-boxe-debutant-maroc",
    category: "Boxe",
    icon: "glove",
    readTime: "7 min",
    decision: "Quels accessoires de boxe acheter en priorité",
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

/**
 * Pro SVG icon set (template style, no icon library).
 * Stroke-based, 24x24, currentColor. Presented in yellow medallions.
 */
function ProSvg({
  className = "h-full w-full",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable={false}
      className={className}
    >
      {children}
    </svg>
  );
}

/** Yellow medallion wrapping any icon — the site-wide pro presentation. */
function IconMedallion({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-black shadow-md shadow-yellow-500/25">
      <span className="h-6 w-6">{children}</span>
    </span>
  );
}

function DumbbellPaths() {
  return <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11" />;
}

function CardioPaths() {
  return (
    <>
      <path d="M3 12h4l2.2-5 3 10 2.4-5H21" />
      <path d="M4 20h16" />
    </>
  );
}

/** Gant de boxe pro (filled) — référence validée, fill currentColor. */
function FilledGloveIcon({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 -2.09 122.88 122.88"
      fill="currentColor"
      aria-hidden="true"
      focusable={false}
      className={className}
    >
      <g>
        <path d="M51.31,31.23c2.55-4.65,5.15-8.64,7.79-12c0.1-0.13,0.2-0.25,0.3-0.38c3.19-5.52,5.43-11.01,2.84-12.81l0,0 c-1.68-1.16-4.12-1.2-6.67-0.64c-3.81,0.83-7.67,2.93-9.99,4.82c-3.04,2.47-5.75,5.62-8.07,8.98c-2.76,4.01-4.93,8.28-6.38,12.04 c-1.48,3.85-2.54,7.96-3.15,12.36c-0.59,4.29-0.75,8.85-0.44,13.69c2.83,7.42,6.63,14,11.44,19.69c0.36,0.41,0.72,0.81,1.09,1.21 c5.54,5.96,12.31,10.72,20.21,14.36l0,0c0.09,0.04,0.18,0.09,0.27,0.15c0.95-0.07,1.92-0.16,2.9-0.28c1.7-0.21,3.35-0.48,4.96-0.81 c5.3-1.09,9.78-2.69,14.01-4.83c4.28-2.16,8.34-4.88,12.77-8.15c2.16-1.6,4.31-3.32,6.44-5.17c2.12-1.84,4.14-3.75,6.05-5.74l0,0 c4.16-4.7,7.01-9.24,8.61-13.63c1.55-4.26,1.91-8.38,1.11-12.38c-0.74-3.73-3.16-8.11-6.22-12.32c-3.91-5.38-8.82-10.38-12.66-13.4 c-1.65-1.3-3.28-2.39-4.88-3.27c-5.18-2.83-10.31-3.58-15.3-2.11c-5.09,1.5-10.16,5.29-15.11,11.53c-2.06,3.59-4.37,6.95-6.13,9.51 c-0.48,0.7-0.9,1.31-1.55,2.3c-0.77,1.16-2.34,1.48-3.5,0.71C50.93,33.91,50.6,32.38,51.31,31.23L51.31,31.23z M19.5,66.5 c-0.17,6.41,0.83,9.06,5.6,15.25c1.68,2.18,3.51,4.36,5.5,6.54c3.73,2.86,4.32,5.71,1.4,8.57l-1.4,1.56 c-2.52,1.56-5.31,1.85-9.04-2.34l-5.54-7.03c-2.49-3.16-5.72-6.19-5.96-10.43c-0.04-0.79-0.01-1.6,0.09-2.44l-2.43,2.51 c-0.79,1-1.43,2.03-1.88,3.1C5.39,82.82,5.12,83.89,5.06,85c-0.21,3.71,3.45,9.41,8.27,14.78c5.86,6.53,13.25,12.32,17.65,13.58 c6.96,2.01,14.64-6.88,21.08-14.32c0.88-1.02,1.74-2.01,2.58-2.96c-7.18-3.96-13.31-8.84-18.42-14.59 c-0.42-0.47-0.83-0.94-1.23-1.42c-4.53-5.21-8.26-11.21-11.14-18.04L19.5,66.5L19.5,66.5z M59.89,97.79 c-1.27,1.37-2.62,2.93-4.03,4.56c-7.4,8.56-16.22,18.76-26.28,15.87c-5.24-1.51-13.61-7.92-20.02-15.07 C3.96,96.9-0.28,89.91,0.01,84.72c0.1-1.74,0.51-3.39,1.18-4.95c0.65-1.51,1.54-2.95,2.64-4.32l0,0c0.05-0.06,0.1-0.12,0.16-0.18 l18.43-19.06c-0.22-4.66-0.02-9.1,0.56-13.31c0.66-4.75,1.82-9.23,3.44-13.46c1.59-4.12,3.95-8.78,6.93-13.11 c2.57-3.72,5.61-7.24,9.04-10.03c2.82-2.29,7.5-4.84,12.11-5.84c3.79-0.83,7.62-0.64,10.61,1.44l0.01,0l0,0 c2.78,1.93,3.45,4.96,2.9,8.44c2.92-2.16,5.89-3.68,8.91-4.56c6.33-1.86,12.74-0.96,19.13,2.53c1.89,1.03,3.76,2.27,5.59,3.72 c4.15,3.27,9.43,8.64,13.63,14.41c3.44,4.73,6.19,9.79,7.09,14.31c0.97,4.89,0.55,9.91-1.33,15.06c-1.82,5-5.02,10.11-9.65,15.33 c-0.02,0.03-0.05,0.05-0.07,0.08l0,0c-2.09,2.16-4.21,4.17-6.37,6.05c-2.15,1.87-4.4,3.67-6.75,5.41c-4.65,3.44-8.94,6.3-13.5,8.6 c-4.61,2.33-9.49,4.08-15.27,5.27c-1.83,0.38-3.63,0.67-5.37,0.89C62.7,97.59,61.31,97.71,59.89,97.79L59.89,97.79z" />
      </g>
    </svg>
  );
}

function HomePaths() {
  return (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </>
  );
}

function GuideIcon({ name, className }: { name: GuideIconName; className?: string }) {
  if (name === "glove") return <FilledGloveIcon className={className} />;
  return (
    <ProSvg className={className}>
      {name === "dumbbell" ? <DumbbellPaths /> : <CardioPaths />}
    </ProSvg>
  );
}

function NeedIcon({ name, className }: { name: NeedIconName; className?: string }) {
  if (name === "combat") return <FilledGloveIcon className={className} />;
  return (
    <ProSvg className={className}>
      {name === "strength" ? (
        <DumbbellPaths />
      ) : name === "cardio" ? (
        <CardioPaths />
      ) : (
        <HomePaths />
      )}
    </ProSvg>
  );
}

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <ProSvg className={className}>
      <path d="M9.5 6 15.5 12l-6 6" />
    </ProSvg>
  );
}

const HUB_FAQ: { question: string; answer: string }[] = [
  {
    question: "Pourquoi lire un guide IRONZ avant d'acheter du matériel de fitness au Maroc ?",
    answer:
      "Chaque guide porte sur une décision d'équipement précise : choisir entre haltères, kettlebells et disques, entre tapis, vélo et rameur, ou démarrer en boxe. Il présente les différences entre les familles de matériel, les critères à comparer selon votre espace et votre entraînement, et les erreurs à éviter avant de commander au Maroc.",
  },
  {
    question: "Les conseils des guides IRONZ sont-ils adaptés à un débutant ?",
    answer:
      "Oui. Les guides sont rédigés pour un premier achat : ils partent de l'usage réel et de l'espace disponible avant les caractéristiques techniques. Les informations restent utiles pour un pratiquant régulier qui souhaite compléter ou remplacer un équipement.",
  },
  {
    question: "Les guides IRONZ sont-ils gratuits ?",
    answer:
      "Tous les guides IRONZ sont gratuits et accessibles sans inscription. Ils sont publiés pour aider à comparer le matériel disponible au Maroc avant de passer commande.",
  },
  {
    question: "Les caractéristiques indiquées dans les guides sont-elles garanties ?",
    answer:
      "Les guides présentent les critères à comparer, mais les références, les stocks et les caractéristiques précises évoluent. La fiche produit reste la source à confirmer au moment de l'achat pour le modèle qui vous intéresse.",
  },
  {
    question: "Peut-on voir les produits conseillés dans un guide directement sur le site ?",
    answer:
      "Chaque guide se termine par un lien vers les catégories ou les services IRONZ concernés. Vous pouvez comparer les modèles disponibles dans le catalogue ou demander un devis pour un projet d'aménagement.",
  },
  {
    question: "IRONZ propose-t-il des guides pour l'aménagement d'une salle de sport ?",
    answer:
      "Les guides couvrent le choix du matériel. Pour l'aménagement d'une salle à domicile ou professionnelle, la section services détaille l'accompagnement IRONZ : home gym, salle professionnelle, revêtement de sol et de mur sportif, et terrains de sport.",
  },
];

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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HUB_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
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
              <li aria-hidden="true">
                <ChevronIcon />
              </li>
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
                  <IconMedallion>
                    <GuideIcon name={guide.icon} />
                  </IconMedallion>
                  <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-display uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                    {guide.category}
                  </span>
                </div>

                <h3 className="mb-4 text-xl font-bold leading-snug text-gray-900 dark:text-white">
                  {guide.title}
                </h3>

                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {guide.description}
                </p>

                <p className="mb-6 text-sm font-medium text-gray-900 dark:text-white">
                  {guide.decision}
                </p>

                <span className="mt-auto inline-flex items-center justify-between gap-2 border-t border-gray-100 pt-6 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  <span className="inline-flex items-center gap-2">
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
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                    {guide.readTime}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparatif des guides ───────────────────────────── */ }
      <section className="bg-white px-4 pb-16 dark:bg-gray-950 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl">
              Quel <span className="text-yellow-500">guide</span> vous correspond ?
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Chaque guide répond à une question d’achat différent. Ce tableau compare
              les trois décisions couvertes pour vous orienter directement vers la
              bonne lecture.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <th scope="col" className="px-6 py-4 font-display uppercase tracking-wide text-gray-900 dark:text-white">
                    Décision à prendre
                  </th>
                  <th scope="col" className="px-6 py-4 font-display uppercase tracking-wide text-gray-900 dark:text-white">
                    Guide à lire
                  </th>
                  <th scope="col" className="px-6 py-4 font-display uppercase tracking-wide text-gray-900 dark:text-white">
                    Famille de matériel
                  </th>
                  <th scope="col" className="hidden px-6 py-4 font-display uppercase tracking-wide text-gray-900 dark:text-white sm:table-cell">
                    Temps de lecture
                  </th>
                </tr>
              </thead>
              <tbody>
                {guides.map((guide) => (
                  <tr
                    key={guide.href}
                    className="border-t border-gray-200 dark:border-gray-800"
                  >
                    <td className="px-6 py-4 align-top font-medium text-gray-900 dark:text-white">
                      {guide.decision}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <Link
                        href={guide.href}
                        className="font-medium text-yellow-600 underline underline-offset-2 hover:text-yellow-500 dark:text-yellow-400"
                      >
                        {guide.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 align-top text-gray-600 dark:text-gray-400">
                      {guide.category}
                    </td>
                    <td className="hidden px-6 py-4 align-top text-gray-600 dark:text-gray-400 sm:table-cell">
                      {guide.readTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Pour un projet d’aménagement complet plutôt qu’un achat de matériel isolé,
            consultez la section services : aménagement de salle, home gym, salle
            professionnelle, revêtement sportif et terrains de sport.
          </p>
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
                <span className="mb-6 transition-transform group-hover:scale-110">
                  <IconMedallion>
                    <NeedIcon name={need.icon} />
                  </IconMedallion>
                </span>

                <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900 dark:text-white">
                  {need.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {need.description}
                </p>

                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">
                  {need.label}
                  <ChevronIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Questions fréquentes ─────────────────────────────── */ }
      <section className="bg-white px-4 py-16 dark:bg-gray-950 sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl">
              Questions <span className="text-yellow-500">fréquentes</span>
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Tout ce qu’il faut savoir avant de lire un guide IRONZ ou d’acheter du
              matériel de fitness au Maroc.
            </p>
          </div>

          <div className="space-y-6">
            {HUB_FAQ.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
              >
                <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900 dark:text-white">
                  {item.question}
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.answer}
                </p>
              </div>
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

          <p className="mt-10 text-sm leading-relaxed text-black/70">
            Pour aller plus loin, consultez aussi le{" "}
            <Link
              href="/blog"
              className="font-medium text-black underline underline-offset-2 hover:text-black/70"
            >
              blog IRONZ
            </Link>{" "}
            : 16 articles sur le matériel de musculation, le cardio, la nutrition et
            l’aménagement de salle de sport au Maroc.
          </p>
        </div>
      </section>
    </>
  );
}
