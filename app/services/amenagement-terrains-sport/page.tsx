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
    "Aménagement de terrains de sport au Maroc : cadrage des usages, des dimensions, de la surface existante et des besoins d'équipement pour préparer une demande de devis IRONZ.",
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
      "Indiquez le matériel déjà présent et les équipements souhaités selon la pratique. Faites confirmer les références, les caractéristiques et la fourniture proposées pour votre projet.",
    href: "/categories/equipements",
    label: "Consulter les fiches du catalogue",
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
    title: "Description du site",
    description:
      "Décrivez les dimensions connues, le sol existant, les accès, les obstacles et le contexte intérieur, extérieur ou couvert.",
  },
  {
    icon: Ruler,
    title: "Choix des solutions",
    description:
      "Précisez les besoins de surface, de revêtement, de protection éventuelle et d'équipements, puis les caractéristiques restant à vérifier pour le lieu.",
  },
  {
    icon: Sparkles,
    title: "Préparation du devis",
    description:
      "Distinguez les besoins prioritaires, les éléments à conserver et les postes à discuter. Faites préciser les prestations effectivement comprises dans la proposition.",
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
  "la ville et le type de lieu concerné",
  "l'usage prévu du terrain et les sports à pratiquer",
  "les dimensions connues, les limites de la zone et les accès",
  "la nature et l'état du sol existant, les obstacles visibles",
  "les utilisateurs, la fréquence d'usage et les besoins d'entretien",
  "les équipements et protections à conserver ou souhaités",
  "le contexte intérieur, extérieur ou couvert et ses contraintes",
  "le budget indicatif et le délai souhaité, s'ils sont connus",
];

const faqItems = [
  {
    question: "Quels types de projets peut-on présenter à IRONZ ?",
    answer:
      "Précisez s'il s'agit d'un espace multisport, d'une zone d'entraînement ou d'un projet privé, scolaire ou collectif. Indiquez les activités, les utilisateurs et le contexte du lieu. Ces informations servent à discuter du besoin et du périmètre envisagé ; les prestations proposées doivent être confirmées pour votre projet.",
  },
  {
    question: "Comment choisir le revêtement d'un terrain sportif ?",
    answer:
      "Décrivez les pratiques, les équipements, la fréquence d'utilisation et le contexte intérieur, extérieur ou couvert. Précisez la nature et l'état du sol existant et les besoins d'entretien. Les caractéristiques de la solution et les conditions du site doivent être vérifiées pour le projet ; le nom d'un matériau ne suffit pas à confirmer son adéquation.",
  },
  {
    question: "Quelles dimensions et contraintes du site faut-il indiquer ?",
    answer:
      "Indiquez la longueur et la largeur disponibles, les limites de la zone, les accès et les obstacles visibles. Ajoutez la nature et l'état de la surface ainsi que les équipements déjà présents. Une estimation permet de commencer l'échange ; elle ne confirme pas la faisabilité technique ni la conformité à une discipline.",
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
    question: "Comment préciser les équipements souhaités ?",
    answer:
      "Listez séparément le matériel à conserver et les équipements souhaités, avec leurs références ou dimensions si vous les connaissez. Le catalogue peut aider à consulter des fiches, mais la fourniture et l'adéquation des équipements au terrain doivent être confirmées pendant l'échange et dans le devis.",
  },
  {
    question: "Quelles informations préparer pour demander un devis ?",
    answer:
      "Indiquez la ville au Maroc, les activités, les utilisateurs, les dimensions estimées, l'état du site, les accès et les équipements existants ou souhaités. Le budget et le délai souhaité sont facultatifs. Les boutons ouvrent le formulaire avec le service Aménagement de terrains de sport présélectionné. Relisez le message préparé puis envoyez-le dans WhatsApp ; vous pourrez ensuite partager des photos générales, des vues des accès et du sol ou un plan existant.",
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
              Vous préparez un projet de terrain sportif au Maroc ? Décrivez
              les activités, les utilisateurs, les dimensions disponibles et
              l&apos;état du site pour préciser avec IRONZ les besoins de surface,
              de revêtement, de protection et d&apos;équipement à discuter dans le devis.
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
                  Indiquez s&apos;il s&apos;agit d&apos;un nouvel espace, d&apos;une
                  réorganisation ou d&apos;un complément d&apos;équipement.
                  Signalez les installations à conserver et les accès au site,
                  puis distinguez les besoins prioritaires des ajouts envisagés.
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

      {/* Vidéo de présentation */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Un aperçu en{" "}
              <span className="text-yellow-500">vidéo</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Illustration vidéo d&apos;un espace sportif.
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
                aria-label="Vidéo de présentation d'un terrain de sport"
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
              Les points à préciser pour un projet de{" "}
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
              Décrivez le sol existant, les irrégularités ou traces d&apos;eau
              visibles, le contexte intérieur ou extérieur et la fréquence
              d&apos;utilisation. Précisez aussi les besoins d&apos;entretien.
              Les caractéristiques de la solution et les conditions du site
              sont à vérifier selon les activités envisagées.
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
              Rassemblez les informations disponibles et les points encore à
              préciser. Les étapes ci-dessous aident à organiser votre demande ;
              le périmètre technique et les prestations proposées restent à
              confirmer pour votre projet.
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
              Le chiffrage dépend des dimensions, du site, des équipements et
              du périmètre retenu. Indiquez une surface estimée et vos priorités ;
              le budget indicatif et le délai souhaité sont facultatifs dans le
              formulaire. Vous pourrez partager des photos des accès, du sol et
              des installations existantes pendant l&apos;échange sur WhatsApp.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Le bouton présélectionne le service Aménagement de terrains de sport.
              Le formulaire prépare un message à relire et à envoyer dans WhatsApp
              pour transmettre votre demande à IRONZ.
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
              Si votre projet comprend aussi un espace intérieur, consultez
              l&apos;<Link href="/services/amenagement-salle" className="text-yellow-600 dark:text-yellow-400 underline underline-offset-4">aménagement de salle de sport</Link>.
              Les besoins de revêtement et les équipements souhaités peuvent
              être précisés séparément dans votre demande.
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
            Précisez votre ville, les activités, les dimensions estimées et les
            contraintes du site. Préparez votre demande de devis, puis validez
            son envoi dans WhatsApp pour la transmettre à IRONZ.
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
