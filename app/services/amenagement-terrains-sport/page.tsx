import Link from "next/link";
import {
  Calendar,
  ClipboardCheck,
  Compass,
  Fence,
  MessageCircle,
  Phone,
  Ruler,
  Sparkles,
} from "lucide-react";

const CANONICAL_URL =
  "https://www.ironz.ma/services/amenagement-terrains-sport";

const WHATSAPP_URL = "https://wa.me/212674114446";
const DEVIS_URL = "/demande-devis?service=amenagement-terrains-sport";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.ironz.ma/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://www.ironz.ma/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Aménagement de terrains de sport",
      item: CANONICAL_URL,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Aménagement de terrains de sport au Maroc",
  serviceType: "Aménagement de terrains de sport",
  provider: {
    "@type": "Organization",
    name: "IRONZ",
    url: "https://www.ironz.ma/",
  },
  areaServed: "Maroc",
  url: CANONICAL_URL,
  description:
    "Service d'aménagement de terrains de sport au Maroc : étude du projet, surface sportive, clôture périphérique et équipement adapté sur devis.",
};

const projectTypes = [
  {
    title: "Terrains multisport",
    description:
      "Un même espace peut être pensé pour plusieurs usages sportifs lorsque la surface, les équipements et la circulation le permettent.",
  },
  {
    title: "Espaces d'entraînement",
    description:
      "Zones extérieures ou couvertes dédiées à la préparation physique, aux exercices collectifs ou à l'activité sportive régulière.",
  },
  {
    title: "Projets scolaires ou collectifs",
    description:
      "Espaces destinés à accueillir des utilisateurs variés, avec une attention portée à l'organisation, au passage et aux équipements.",
  },
  {
    title: "Terrains privés ou professionnels",
    description:
      "Projet pour résidence, hôtel, club, entreprise ou complexe sportif, étudié selon l'espace disponible et le niveau d'usage prévu.",
  },
];

const audienceProfiles = [
  "complexes sportifs et salles avec espace extérieur",
  "établissements scolaires ou structures d'accueil",
  "hôtels, résidences et entreprises",
  "clubs, associations et porteurs de projet",
  "propriétaires privés avec un projet sportif dédié",
];

const projectElements = [
  {
    title: "Surface sportive",
    description:
      "Le choix de la surface dépend du sport pratiqué, de l'intensité d'usage, du contexte intérieur ou extérieur et du budget du projet.",
  },
  {
    title: "Revêtement adapté",
    description:
      "Le revêtement influence le confort, l'entretien et l'usage quotidien. IRONZ peut orienter le projet vers des solutions de revêtement sportif cohérentes avec le besoin.",
    href: "/services/revetement-sol-mur",
    label: "Voir les solutions de revêtement sportif",
  },
  {
    title: "Équipements sportifs",
    description:
      "Paniers, buts, zones d'entraînement ou matériel complémentaire doivent être choisis selon la discipline, l'âge des utilisateurs et la configuration du terrain.",
    href: "/categories/equipements",
    label: "Explorer les équipements sportifs",
  },
  {
    title: "Protection périphérique",
    description:
      "Selon l'emplacement, la clôture et les protections autour du terrain peuvent aider à mieux organiser l'usage et limiter les sorties de balle.",
  },
  {
    title: "Organisation de l'espace",
    description:
      "Accès, zones de circulation, recul autour de la surface de jeu et emplacement du matériel sont étudiés pour rendre l'espace pratique au quotidien.",
  },
];

const projectSteps = [
  {
    icon: ClipboardCheck,
    title: "Compréhension du besoin",
    description:
      "Nous partons de votre usage prévu : sports pratiqués, utilisateurs, surface disponible, contraintes et objectif du projet.",
  },
  {
    icon: Compass,
    title: "Étude du terrain",
    description:
      "La configuration, les accès, le contexte intérieur ou extérieur et les éléments existants sont pris en compte avant la proposition.",
  },
  {
    icon: Ruler,
    title: "Choix des solutions",
    description:
      "Surface, revêtement, clôture éventuelle, équipements et organisation de l'espace sont ajustés selon le projet.",
  },
  {
    icon: Sparkles,
    title: "Devis & mise en place",
    description:
      "Le devis est préparé après étude. La mise en place suit le périmètre validé ensemble, sans promesse de délai standardisée.",
  },
];

const surfaceFactors = [
  "sport pratiqué et gestes attendus",
  "usage intérieur, extérieur ou couvert",
  "fréquence d'utilisation et intensité de passage",
  "confort recherché pour les utilisateurs",
  "entretien souhaité dans le temps",
  "budget et périmètre global du projet",
];

const quoteTopics = [
  "l'usage prévu du terrain et les sports à pratiquer",
  "la surface disponible et sa configuration",
  "le type de surface sportive envisagé",
  "les besoins en clôture ou protection périphérique",
  "le matériel et les équipements à prévoir",
  "le budget indicatif ou le niveau de finition attendu",
];

const faqItems = [
  {
    question: "Quels types de terrains de sport IRONZ peut-il étudier ?",
    answer:
      "IRONZ peut étudier des projets de terrains multisport, espaces d'entraînement, terrains privés, espaces scolaires ou projets professionnels, selon la surface disponible et l'usage prévu.",
  },
  {
    question: "Comment choisir le revêtement d'un terrain sportif ?",
    answer:
      "Le revêtement se choisit selon le sport, le contexte intérieur ou extérieur, l'intensité d'utilisation, le confort souhaité, l'entretien et le budget du projet.",
  },
  {
    question: "Quels éléments faut-il prévoir dans un projet de terrain ?",
    answer:
      "Il faut préciser l'usage, la surface disponible, le type de terrain, le revêtement, les équipements sportifs, la circulation et, si nécessaire, les protections périphériques.",
  },
  {
    question: "Le prix d'un terrain de sport est-il standard ?",
    answer:
      "Non. Le prix dépend de la surface, des matériaux, des équipements, de la configuration et du niveau de finition. IRONZ établit donc un devis personnalisé.",
  },
  {
    question: "Quelle différence entre un terrain multisport et un espace dédié ?",
    answer:
      "Un terrain multisport doit concilier plusieurs usages dans le même espace. Un espace dédié peut être optimisé autour d'une seule discipline ou d'un besoin d'entraînement précis.",
  },
  {
    question: "IRONZ peut-il fournir les équipements liés au projet ?",
    answer:
      "Oui, le projet peut intégrer le choix d'équipements sportifs adaptés lorsque cela correspond au besoin : matériel, zones d'entraînement ou accessoires complémentaires.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function TerrainSportPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb visible */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Accueil</Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Services</Link>
            <span aria-hidden>/</span>
            <span className="text-gray-900 dark:text-white font-medium">Aménagement de terrains de sport</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/5" aria-hidden />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 -skew-x-12 pointer-events-none" aria-hidden />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block bg-yellow-500 text-black px-4 py-1.5 text-xs sm:text-sm font-black uppercase italic tracking-wider transform skew-x-6 mb-6">
              Sur devis
            </span>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-display uppercase leading-[0.95] text-white mb-6 tracking-wide">
              Aménagement de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                terrains de sport
              </span>{" "}
              au Maroc
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
              IRONZ accompagne les projets de terrain sportif au Maroc : étude
              de l&apos;usage, choix de la surface, revêtement, clôture périphérique
              si nécessaire et équipements adaptés. Chaque projet est étudié
              avant devis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={DEVIS_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-yellow-500 text-black font-display uppercase tracking-wide rounded-xl text-center hover:bg-yellow-600 transition-colors shadow-lg"
              >
                <Calendar className="w-5 h-5" aria-hidden />
                Demander un devis
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white font-display uppercase tracking-wide rounded-xl text-center hover:border-yellow-500/60 hover:text-yellow-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden />
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
            <div>
              <span className="text-yellow-600 dark:text-yellow-400 font-display uppercase tracking-widest text-sm">Projet sportif sur mesure</span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">
                Bien préparer son{" "}
                <span className="text-yellow-500">terrain sportif</span>
              </h2>
              <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Un terrain de sport ne se résume pas à une surface de jeu. Le
                  projet doit tenir compte du sport pratiqué, du nombre
                  d&apos;utilisateurs, de l&apos;espace disponible, des accès et du niveau
                  d&apos;usage attendu.
                </p>
                <p>
                  IRONZ vous aide à cadrer le besoin avant le devis : surface
                  sportive, revêtement, protections périphériques lorsque cela
                  est utile, équipements et organisation de l&apos;espace.
                </p>
                <p>
                  L&apos;objectif est de construire une proposition cohérente avec
                  votre réalité au Maroc, sans pack standard imposé ni promesse
                  technique non vérifiée.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-yellow-500/20 bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                À clarifier avant le devis
              </h3>
              <ul className="space-y-4">
                {quoteTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mt-0.5">
                      <Fence className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" aria-hidden />
                    </span>
                    <span className="leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Video proof */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Un de nos{" "}
              <span className="text-yellow-500">chantiers</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Découvrez en images un projet de terrain de sport réalisé par
              IRONZ.
            </p>
          </div>
          <div className="max-w-sm sm:max-w-md mx-auto">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-yellow-500/20 bg-black">
              <video
                className="block w-full h-auto aspect-[9/16] object-cover"
                loop
                muted
                playsInline
                preload="none"
                poster="/terrain-poster.webp"
                controls
                aria-label="Projet de terrain de sport réalisé par IRONZ"
              >
                <source src="/terrain-optimized.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Types de projets */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Types de projets de{" "}
              <span className="text-yellow-500">terrain</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Le périmètre dépend du site et de l&apos;usage. Ces profils aident à
              préciser le besoin sans limiter le projet à une liste fermée.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {projectTypes.map((type) => (
              <div key={type.title} className="p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {type.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publics */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
                Pour quels{" "}
                <span className="text-yellow-500">projets ?</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                La page s&apos;adresse aux porteurs de projet qui veulent structurer
                un espace sportif utile, lisible et cohérent avec leur activité.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {audienceProfiles.map((profile) => (
                <li key={profile} className="rounded-2xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-5 text-gray-800 dark:text-gray-200 leading-relaxed">
                  {profile}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Composants */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Ce que comprend un projet de{" "}
              <span className="text-yellow-500">terrain</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Un projet bien cadré permet de relier la surface, l&apos;équipement et
              l&apos;organisation de l&apos;espace avant de parler budget.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {projectElements.map((element) => (
              <div key={element.title} className="p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {element.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base mb-4">
                  {element.description}
                </p>
                {element.href && element.label ? (
                  <Link href={element.href} className="inline-flex text-sm font-semibold text-yellow-600 dark:text-yellow-400 underline underline-offset-4 hover:text-yellow-500">
                    {element.label}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surface / revêtement */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Choisir la bonne{" "}
              <span className="text-yellow-500">surface sportive</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Le choix d&apos;une surface doit rester lié au projet réel : sport
              pratiqué, contexte du site, fréquence d&apos;utilisation, entretien,
              confort et budget. IRONZ évite les réponses génériques et oriente
              la discussion vers une solution adaptée à votre terrain.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {surfaceFactors.map((factor) => (
                <div key={factor} className="flex items-start gap-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-4 text-gray-700 dark:text-gray-300">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-500" aria-hidden />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
            <Link href="/services/revetement-sol-mur" className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-yellow-500/40 text-gray-900 dark:text-white font-display uppercase tracking-wide rounded-xl hover:bg-yellow-500 hover:text-black transition-colors">
              Solutions de revêtement sportif
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Comment se déroule votre{" "}
              <span className="text-yellow-500">projet ?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Le processus reste simple : comprendre, étudier, choisir, chiffrer
              puis avancer selon le périmètre validé.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {projectSteps.map((step) => (
              <div
                key={step.title}
                className="group p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 hover:border-yellow-500/40 transition-colors"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:bg-yellow-500 transition-colors">
                  <step.icon
                    className="w-6 h-6 text-yellow-500 group-hover:text-black transition-colors"
                    aria-hidden
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prix / Sur devis */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Prix d&apos;un terrain de sport :{" "}
              <span className="text-yellow-500">sur devis</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Nous ne publions pas de barème tarifaire. Le prix dépend de la
              surface, du revêtement, des équipements, de la configuration et du
              niveau de finition. La demande de devis sert à cadrer ces éléments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={DEVIS_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-yellow-500 text-black font-display uppercase tracking-wide rounded-xl hover:bg-yellow-600 transition-colors shadow-lg"
              >
                <Calendar className="w-5 h-5" aria-hidden />
                Demander mon devis
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-display uppercase tracking-wide rounded-xl hover:border-yellow-500/60 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-5 h-5" aria-hidden />
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Complémentarité — internal links */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Au-delà du{" "}
              <span className="text-yellow-500">terrain</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Un projet extérieur peut aussi s&apos;inscrire dans une réflexion plus
              large : salle intérieure, revêtement, équipement ou parcours de
              demande de devis.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/services"
              className="group block p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-yellow-500/40 hover:shadow-xl transition-all"
            >
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                Tous les services IRONZ
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                Revenir à la vue complète des services d&apos;aménagement et
                d&apos;équipement.
              </p>
            </Link>
            <Link
              href="/services/amenagement-salle"
              className="group block p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-yellow-500/40 hover:shadow-xl transition-all"
            >
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                Aménagement de salle
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                Pour les espaces intérieurs : home gym, salles professionnelles,
                hôtels et centres sportifs.
              </p>
            </Link>
            <Link
              href="/services/revetement-sol-mur"
              className="group block p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-yellow-500/40 hover:shadow-xl transition-all"
            >
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                Revêtement sol & mur
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                Pour choisir une surface ou une protection cohérente avec le
                projet sportif.
              </p>
            </Link>
            <Link
              href="/categories/equipements"
              className="group block p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-yellow-500/40 hover:shadow-xl transition-all"
            >
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                Équipements sportifs
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                Parcourir le catalogue lorsque le projet nécessite aussi du
                matériel sportif.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Questions fréquentes sur les{" "}
              <span className="text-yellow-500">terrains sportifs</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Réponses courtes pour préparer une demande de devis plus précise.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-black mb-6">
            Un projet de terrain en tête ?
          </h2>
          <p className="text-black/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Parlez-nous de votre surface, des sports visés, des équipements et
            de vos contraintes. IRONZ vous répond avec un devis personnalisé.
          </p>
          <Link
            href={DEVIS_URL}
            className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-black text-white font-display uppercase tracking-wide rounded-xl hover:bg-gray-900 transition-colors shadow-2xl"
          >
            <Calendar className="w-5 h-5" aria-hidden />
            Demander un devis
          </Link>
        </div>
      </section>
    </main>
  );
}
