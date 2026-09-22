import Link from "next/link";

const PAGE_URL = "https://www.ironz.ma/services/amenagement-salle/home-gym";
const DEVIS_URL = "/demande-devis?service=home-gym";
const WHATSAPP_URL =
  "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20Home%20Gym%20avec%20IRONZ.";

type IconName =
  | "home"
  | "dumbbell"
  | "cardio"
  | "strength"
  | "surface"
  | "dimensions"
  | "storage"
  | "sound"
  | "target"
  | "route"
  | "quote"
  | "check"
  | "whatsapp"
  | "users"
  | "building"
  | "layers"
  | "clock"
  | "sparkle";

const introChecklist = [
  "surface disponible, hauteur sous plafond et accès à la pièce",
  "vos objectifs d'entraînement et la fréquence prévue",
  "nombre d'utilisateurs et niveaux de pratique",
  "priorité entre cardio, musculation et travail au sol",
  "protection du sol, bruit et contraintes de l'habitation",
  "budget et volonté de faire évoluer l'espace progressivement",
];

const spaceTypes = [
  {
    icon: "home" as const,
    title: "Pièce dédiée",
    description:
      "Une chambre inutilisée ou un espace entièrement consacré à l'entraînement, avec plusieurs postes possibles.",
  },
  {
    icon: "layers" as const,
    title: "Pièce de vie à adapter",
    description:
      "Un bureau, un salon ou un espace partagé où le matériel doit cohabiter avec l'usage quotidien de la pièce.",
  },
  {
    icon: "storage" as const,
    title: "Garage ou sous-sol",
    description:
      "Un volume souvent intéressant, mais à étudier selon le sol, l'humidité, l'accès et le rangement possible.",
  },
  {
    icon: "dimensions" as const,
    title: "Espace fitness plus vaste",
    description:
      "Un grand volume en villa ou grande habitation, qui peut être organisé en plusieurs zones d'entraînement.",
  },
];

const objectives = [
  {
    icon: "strength" as const,
    title: "Musculation et force",
    description:
      "La priorité va aux poids libres, bancs, racks et machines guidées, avec une protection du sol renforcée.",
  },
  {
    icon: "cardio" as const,
    title: "Cardio et endurance",
    description:
      "Le choix se porte sur tapis, vélo ou elliptique selon la place, le bruit accepté et le confort souhaité.",
  },
  {
    icon: "route" as const,
    title: "Entraînement fonctionnel",
    description:
      "L'espace se concentre sur une zone dégagée, des accessoires polyvalents et un sol adapté aux mouvements variés.",
  },
  {
    icon: "sparkle" as const,
    title: "Mobilité et entretien",
    description:
      "Un coin récupération et étirements, avec tapis, accessoires et une surface confortable au sol.",
  },
  {
    icon: "target" as const,
    title: "Entraînement mixte",
    description:
      "Cardio et musculation se partagent la pièce : l'organisation évite que les zones ne se gênent mutuellement.",
  },
];

const equipmentFactors = [
  "surface réellement exploitable et dégagements autour des appareils",
  "objectifs prioritaires et fréquence d'utilisation",
  "polyvalence de chaque appareil pour limiter l'encombrement",
  "possibilité de ranger poids libres et accessoires",
  "bruit et vibrations acceptables dans l'habitation",
  "budget et étapes d'évolution envisagées",
];

const balanceZones = [
  {
    icon: "strength" as const,
    title: "Force et poids libres",
    description:
      "Haltères, barres, banc ou rack : un socle compact qui demande surtout de la protection de sol et du rangement.",
  },
  {
    icon: "cardio" as const,
    title: "Cardio",
    description:
      "Un seul appareil peut suffire. Son choix dépend de la place, du bruit et de l'objectif (marche, vélo, rameur).",
  },
  {
    icon: "dumbbell" as const,
    title: "Accessoires",
    description:
      "Élastiques, kettlebells, tapis et accessoires complètent l'espace sans consommer beaucoup de surface.",
  },
  {
    icon: "route" as const,
    title: "Zone dégagée",
    description:
      "Garder un espace libre au sol reste utile : mouvements fonctionnels, mobilité et circulation autour du matériel.",
  },
];

const homeConstraints = [
  {
    icon: "dimensions" as const,
    title: "Emplacement des appareils",
    description:
      "Chaque machine a un débordement utile : porte, tiroir coulissant, passage de barre et accès pour l'entretien.",
  },
  {
    icon: "sound" as const,
    title: "Bruit et vibrations",
    description:
      "Les chutes de charges et certains cardio transmettent du bruit. Le sol et l'emplacement limitent les nuisances sans les supprimer.",
  },
  {
    icon: "surface" as const,
    title: "Protection du support",
    description:
      "Le revêtement protège le sol d'origine des chocs, des éraflures et de la transpiration, surtout en appartement.",
  },
  {
    icon: "storage" as const,
    title: "Rangement",
    description:
      "Prévoir dès le départ où ranger barres, disques et accessoires évite que la pièce ne devienne encombrée.",
  },
  {
    icon: "route" as const,
    title: "Accès à la pièce",
    description:
      "Largeur des portes, escaliers, ascenseur ou couloir : certains appareils volumineux ne passent pas partout.",
  },
  {
    icon: "home" as const,
    title: "Usage partagé",
    description:
      "La pièce sert souvent à autre chose. L'aménagement doit garder sa fonction première (chambre, bureau, garage).",
  },
];

const compactTips = [
  "privilégier des appareils polyvalents plutôt que plusieurs machines spécialisées",
  "utiliser les poids libres et accessoires, peu encombrants et très combinables",
  "choisir du matériel qui se range ou se déplace facilement",
  "garder un espace de circulation et un mur dégagé pour les mouvements au sol",
  "éviter la duplication : deux appareils proches ne servent souvent qu'un seul objectif",
];

const evolutionSteps = [
  {
    icon: "target" as const,
    title: "Commencer par l'essentiel",
    description:
      "Le premier aménagement couvre vos deux ou trois objectifs principaux sans saturer la pièce.",
  },
  {
    icon: "dimensions" as const,
    title: "Réserver de la place",
    description:
      "L'implantation garde un espace libre pour un ajout futur : une machine, un rack ou un poste supplémentaire.",
  },
  {
    icon: "layers" as const,
    title: "Ajouter progressivement",
    description:
      "Le matériel s'ajoute selon la pratique réelle, quand l'usage des premiers équipements est confirmé.",
  },
  {
    icon: "check" as const,
    title: "Budget et priorités",
    description:
      "L'évolution se planifie selon le budget global : aucun pack imposé, juste des priorités dans le temps.",
  },
];

const processSteps = [
  {
    icon: "quote" as const,
    title: "Comprendre vos objectifs",
    description:
      "Vos pratiques, votre fréquence, vos contraintes de pièce et votre budget guident toute la sélection.",
  },
  {
    icon: "dimensions" as const,
    title: "Étudier l'espace disponible",
    description:
      "Dimensions, hauteur, accès, sol, prises et usage partagé de la pièce sont relevés avant toute proposition.",
  },
  {
    icon: "target" as const,
    title: "Définir les priorités",
    description:
      "On choisit ensemble ce qui compte le plus : cardio, force, fonctionnel, mobilité, rangement ou évolution.",
  },
  {
    icon: "dumbbell" as const,
    title: "Sélectionner les équipements",
    description:
      "Les familles de matériel sont choisies selon la place, le bruit acceptable et la cohérence de l'ensemble.",
  },
  {
    icon: "surface" as const,
    title: "Prévoir le sol",
    description:
      "Le revêtement est adapté aux charges, à la pièce et au support existant pour protéger l'habitation.",
  },
  {
    icon: "check" as const,
    title: "Préparer le devis",
    description:
      "Le devis reprend le périmètre validé, sans prix standard : chaque home gym a son propre périmètre.",
  },
];

const quotePreparation = [
  "ville et type de logement (maison, appartement, garage, pièce dédiée)",
  "dimensions, photos, hauteur sous plafond et accès à la pièce",
  "objectifs d'entraînement et fréquence prévue",
  "nombre d'utilisateurs et niveaux de pratique",
  "matériel déjà disponible et familles d'équipements souhaitées",
  "état du sol, contraintes de bruit et budget indicatif si connu",
];

const siblingLinks = [
  {
    href: "/services/amenagement-salle",
    title: "Aménagement de salle",
    description:
      "À consulter si votre projet dépasse la salle maison : espace collectif, ou projet global à structurer avant de choisir les machines.",
  },
  {
    href: "/services/amenagement-salle/salle-professionnelle",
    title: "Salle professionnelle",
    description:
      "À consulter si l'espace est destiné à plusieurs utilisateurs : club, hôtel, entreprise ou centre sportif. Les contraintes n'y sont pas les mêmes.",
  },
];

const internalLinks = [
  {
    href: "/categories/equipements/machine-de-fitness",
    title: "Machines de fitness",
    description:
      "Pour explorer les appareils de cardio et musculation susceptibles d'entrer dans une salle maison.",
  },
  {
    href: "/categories/accessoires/poids-libres",
    title: "Poids libres",
    description:
      "Pour compléter l'espace avec haltères, barres, disques et accessoires adaptés à la force.",
  },
  {
    href: "/categories/accessoires/accessoires-de-fitness",
    title: "Accessoires de fitness",
    description:
      "Pour les compléments utiles au travail au sol, à la mobilité et à la récupération.",
  },
  {
    href: "/services/revetement-sol-mur",
    title: "Revêtement sol & mur",
    description:
      "Pour approfondir le choix de surface, la protection de la pièce et le confort d'usage.",
  },
];

const faqItems = [
  {
    question: "Quel équipement choisir pour un Home Gym ?",
    answer:
      "Tout dépend de vos objectifs et de la place disponible. On part généralement d'un socle (poids libres et accessoires), on ajoute une machine cardio si l'endurance est prioritaire, et on n'ajoute du matériel volumineux que si la pièce le permet réellement.",
  },
  {
    question: "Peut-on aménager un Home Gym dans une petite pièce ?",
    answer:
      "Oui, si l'on privilégie le matériel polyvalent, les poids libres, le rangement et la conservation d'un espace de circulation. Certaines machines sont incompatibles avec de petits volumes : c'est l'occasion de concentrer le projet sur l'essentiel.",
  },
  {
    question: "Comment protéger le sol d'une salle de sport maison ?",
    answer:
      "Le revêtement est choisi selon les charges, les mouvements, le support existant et le niveau sonore accepté. Une zone poids libres demande une protection plus épaisse qu'un simple coin mobilité.",
  },
  {
    question: "Comment choisir entre cardio et musculation ?",
    answer:
      "Aucun choix universel. Si vous hésitez, il est possible de commencer par un appareil polyvalent et des poids libres, puis de compléter selon ce que vous utilisez réellement au quotidien.",
  },
  {
    question: "Que faut-il prévoir avant d'acheter les équipements ?",
    answer:
      "Relevez les dimensions, la hauteur, l'accès, l'usage partagé de la pièce et vos priorités d'entraînement. Un appareil qui ne passe pas la porte ou qui bloque la circulation sert rarement longtemps.",
  },
  {
    question: "Peut-on faire évoluer son Home Gym progressivement ?",
    answer:
      "Oui, c'est même l'approche la plus simple : un premier aménagement cohérent, un espace réservé pour les ajouts futurs, et du matériel supplémentaire selon la pratique réelle et le budget.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.ironz.ma/services" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Aménagement de salle",
      item: "https://www.ironz.ma/services/amenagement-salle",
    },
    { "@type": "ListItem", position: 4, name: "Home Gym", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Aménagement Home Gym au Maroc",
  serviceType: "Aménagement de Home Gym",
  provider: { "@type": "Organization", name: "IRONZ", url: "https://www.ironz.ma/" },
  areaServed: "Maroc",
  url: PAGE_URL,
  description:
    "Service d'aménagement de Home Gym au Maroc : étude de l'espace disponible, objectifs d'entraînement, sélection d'équipements, protection du sol et devis personnalisé pour une salle de sport à domicile.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

function ServiceIcon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    dumbbell: (
      <>
        <path d="M5 8v8M8 7v10M16 7v10M19 8v8" />
        <path d="M8 12h8M3 10v4M21 10v4" />
      </>
    ),
    cardio: (
      <>
        <path d="M4 13h3l2-5 4 10 2-5h5" />
        <path d="M6 20h12" />
      </>
    ),
    strength: (
      <>
        <path d="M7 20V9a4 4 0 0 1 8 0v11" />
        <path d="M5 20h12M9 13h4M9 16h4M17 8h2v12" />
      </>
    ),
    surface: (
      <>
        <path d="M4 17l8 4 8-4" />
        <path d="M4 12l8 4 8-4-8-4-8 4z" />
        <path d="M12 8V3" />
      </>
    ),
    dimensions: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8M8 16h8M8 8v8M16 8v8" />
        <path d="M6 12h12" />
      </>
    ),
    storage: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M4 10h16M4 15h16M9 4v16" />
      </>
    ),
    sound: (
      <>
        <path d="M4 9v6h3l5 4V5L7 9H4z" />
        <path d="M16 8a5 5 0 0 1 0 8" />
        <path d="M19 5a9 9 0 0 1 0 14" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    ),
    route: (
      <>
        <path d="M5 6h5a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h11" />
        <path d="M17 15l3 3-3 3" />
      </>
    ),
    quote: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M15 3v5h4M9 12h6M9 16h6" />
      </>
    ),
    check: (
      <>
        <path d="M20 6 9 17l-5-5" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M5 19.5 6.2 16A7 7 0 1 1 9 18.3z" />
        <path d="M9.5 8.5c.4 2.3 2 3.9 4.2 4.8l1.3-1.2 2 1.2c-.3 1.5-1.2 2.2-2.7 2.1-3.8-.3-7-3.5-7.4-7.2C6.7 6.8 7.4 5.9 8.8 5.6z" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c1-4 4-6 6-6s5 2 6 6" />
        <path d="M15 11a3 3 0 1 0 0-6M17 14c2 .6 3.3 2.5 4 6" />
      </>
    ),
    building: (
      <>
        <path d="M4 20V6l8-3 8 3v14" />
        <path d="M8 20v-5h8v5M8 9h1M12 9h1M16 9h1M8 12h1M12 12h1M16 12h1" />
      </>
    ),
    layers: (
      <>
        <path d="M12 3l9 5-9 5-9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 16l9 5 9-5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
        <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">
      {children}
    </span>
  );
}

export default function HomeGymPage() {
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

      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Accueil</Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Services</Link>
            <span aria-hidden>/</span>
            <Link href="/services/amenagement-salle" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Aménagement de salle</Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-gray-900 dark:text-white">Home Gym</span>
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/5" aria-hidden />
        <div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-yellow-500/5 pointer-events-none" aria-hidden />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block bg-yellow-500 text-black px-4 py-1.5 text-xs sm:text-sm font-black uppercase italic tracking-wider transform skew-x-6 mb-6">
              Salle maison sur devis
            </span>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-display uppercase leading-[0.95] text-white mb-6 tracking-wide">
              Aménagement Home Gym{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                au Maroc
              </span>
            </h1>
            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              IRONZ aménage votre salle de sport à domicile : lecture de
              l'espace disponible, objectifs d'entraînement, sélection du
              matériel, protection du sol et devis adapté à la pièce.
            </p>
            <p className="max-w-2xl text-gray-400 leading-relaxed mb-8">
              Ce service est dédié aux espaces privés : pièce dédiée, chambre,
              garage, appartement ou coin fitness. Pour un espace collectif,
              consultez la{" "}
              <Link href="/services/amenagement-salle/salle-professionnelle" className="text-yellow-400 underline underline-offset-4 hover:text-yellow-300">salle professionnelle</Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={DEVIS_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-yellow-500 text-black font-display uppercase tracking-wide rounded-xl text-center hover:bg-yellow-600 transition-colors shadow-lg"
              >
                <ServiceIcon name="quote" />
                Demander un devis
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white font-display uppercase tracking-wide rounded-xl text-center hover:border-yellow-500/60 hover:text-yellow-400 transition-colors"
              >
                <ServiceIcon name="whatsapp" />
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start">
            <div>
              <SectionLabel>Projet home gym</SectionLabel>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">
                Un home gym utile, pas une accumulation de{" "}
                <span className="text-yellow-500">machines</span>
              </h2>
              <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Un projet de salle de sport maison réussit rarement en
                  empilant des appareils. Il part de la pièce dont vous
                  disposez, de vos objectifs réels et de la manière dont vous
                  allez utiliser l'espace au quotidien.
                </p>
                <p>
                  Surface, accès, hauteur, bruit, sol, rangement, nombre
                  d'utilisateurs et budget : ces éléments décident quels
                  équipements ont du sens chez vous, et lesquels finiraient par
                  encombrer la pièce.
                </p>
                <p>
                  IRONZ vous aide à cadrer le projet avant d'acheter, pour que
                  chaque appareil ait sa place et reste utilisé.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-yellow-500/20 bg-gray-50 p-6 sm:p-8 dark:bg-gray-900/60">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                À clarifier avant le devis
              </h3>
              <ul className="space-y-4">
                {introChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mt-0.5">
                      <ServiceIcon name="check" className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Espace disponible</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Quelle place pour votre salle ?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Le point de départ reste la pièce. La configuration guide l'implantation, le choix du matériel et la part réservée à la circulation. Aucune règle de surface minimale ne s'applique à tous les projets : ce qui compte, c'est la cohérence entre dimensions, équipements et dégagements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {spaceTypes.map((type) => (
              <div key={type.title} className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-950">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                  <ServiceIcon name={type.icon} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Objectifs d'entraînement</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Vos objectifs décident du matériel
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Deux pièces identiques peuvent recevoir des équipements différents selon les objectifs. Cette étape évite d'acheter ce qui ne sert pas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {objectives.map((o) => (
              <div key={o.title} className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60 hover:border-yellow-500/40 transition-colors">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-yellow-600 shadow-sm dark:bg-gray-800 dark:text-yellow-400 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <ServiceIcon name={o.icon} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{o.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{o.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-start">
            <div>
              <SectionLabel>Choix des équipements</SectionLabel>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">
                Sélectionner le bon matériel pour la pièce
              </h2>
              <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  L'équipement d'un home gym combine souvent machines de fitness, poids libres et accessoires. Le bon choix dépend plus de l'usage et de la place que de la liste produit.
                </p>
                <p>
                  Un appareil volumineux dans une pièce trop petite finit par être contourné. IRONZ relie chaque sélection aux dimensions, au bruit accepté et au reste de la pièce.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/categories/equipements/machine-de-fitness" className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black hover:bg-yellow-600 transition-colors">
                  Voir les machines fitness
                </Link>
                <Link href="/categories/accessoires/poids-libres" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:border-yellow-500/60 hover:text-yellow-600 dark:border-gray-700 dark:text-white dark:hover:text-yellow-400 transition-colors">
                  Voir les poids libres
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {equipmentFactors.map((factor) => (
                <div key={factor} className="flex items-start gap-3 rounded-xl bg-white p-4 text-gray-700 border border-gray-100 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-500" aria-hidden />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Équilibre de la salle</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Composer force, cardio et accessoires
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Il n'y a pas de bon équilibre universel. Certaines salles se passent très bien de cardio, d'autres n'ont besoin que de poids libres et d'une zone dégagée.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {balanceZones.map((zone) => (
              <div key={zone.title} className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60 hover:border-yellow-500/40 transition-colors">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-yellow-600 shadow-sm dark:bg-gray-800 dark:text-yellow-400 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <ServiceIcon name={zone.icon} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{zone.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{zone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-start">
            <div>
              <SectionLabel>Revêtement maison</SectionLabel>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">
                Protéger le sol de votre pièce
              </h2>
              <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Dans une habitation, le sol sert à autre chose qu'à s'entraîner. Le revêtement sportif protège le support des charges, des chocs, des éraflures et de l'humidité de la transpiration.
                </p>
                <p>
                  Il participe aussi au confort d'usage et, selon les cas, au bruit perçu dans le reste du logement. C'est un point à intégrer avant l'installation, pas après.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/services/revetement-sol-mur" className="inline-flex items-center justify-center gap-2 rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white transition-colors">
                  Solutions de revêtement sportif
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-gray-950 text-white p-6 sm:p-8">
              <h3 className="text-xl font-display uppercase tracking-wide text-yellow-500 mb-4">Le sol selon l'usage</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                    <ServiceIcon name="strength" className="h-3.5 w-3.5 text-yellow-400" />
                  </span>
                  <span>Zone poids libres : protection renforcée contre les chutes de charges et les frottements.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                    <ServiceIcon name="cardio" className="h-3.5 w-3.5 text-yellow-400" />
                  </span>
                  <span>Zone cardio : stabilité de l'appareil et amorti des répétitions.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                    <ServiceIcon name="sparkle" className="h-3.5 w-3.5 text-yellow-400" />
                  </span>
                  <span>Zone mobilité et sol : surface souple et confortable pour les exercices au sol.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                    <ServiceIcon name="home" className="h-3.5 w-3.5 text-yellow-400" />
                  </span>
                  <span>Pièce partagée : revêtement compatible avec l'usage quotidien de la pièce.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Contraintes de l'habitation</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Les contraintes d'une salle chez soi
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Une salle maison n'est pas une salle commerciale. Quelques points pratiques décident de la faisabilité du projet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {homeConstraints.map((item) => (
              <div key={item.title} className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60 hover:border-yellow-500/40 transition-colors">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-yellow-600 shadow-sm dark:bg-gray-800 dark:text-yellow-400 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <ServiceIcon name={item.icon} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-start">
            <div>
              <SectionLabel>Petits espaces</SectionLabel>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">
                Un home gym dans un espace réduit
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                L'espace limité n'empêche pas le projet. Il impose de choisir des équipements qui servent souvent, plutôt que plusieurs appareils qui se ressemblent.
              </p>
              <Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black hover:bg-yellow-600 transition-colors shadow-lg">
                <ServiceIcon name="quote" />
                Demander un devis
              </Link>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {compactTips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 rounded-xl bg-white p-4 text-gray-700 border border-gray-100 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-500" aria-hidden />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Faire évoluer l'espace</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">Prévoir le Home Gym dans le temps</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Un projet résidentiel peut commencer par les équipements réellement utiles aujourd'hui, tout en gardant une implantation capable d'évoluer. Cette approche évite de saturer la pièce et permet d'ajouter du matériel lorsque les habitudes d'entraînement se précisent.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {evolutionSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name={step.icon} /></div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Notre méthode</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">Comment préparer un projet Home Gym ?</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">La démarche commence par vos usages et la lecture de la pièce. Elle permet de passer d'une envie générale à un périmètre clair, sans imposer une configuration identique à chaque habitation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-950">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black font-display">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div>
              <SectionLabel>Préparer le devis</SectionLabel>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">Que préparer pour votre projet Home Gym ?</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">Ces informations aident à comprendre votre espace et à distinguer l'équipement souhaité du périmètre d'aménagement réellement utile.</p>
              <Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black hover:bg-yellow-600 transition-colors shadow-lg"><ServiceIcon name="quote" />Demander un devis</Link>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quotePreparation.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 text-gray-700 border border-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800"><span className="mt-1 h-2 w-2 rounded-full bg-yellow-500" aria-hidden /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Pour aller plus loin</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">Les ressources adaptées à votre projet</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Le Home Gym concerne un espace privé. Si votre besoin change de dimension, ces pages permettent de poursuivre la réflexion au bon niveau.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...siblingLinks, ...internalLinks].map((link) => (
              <Link key={link.href} href={link.href} className="group block rounded-2xl border border-gray-100 bg-white p-6 hover:border-yellow-500/50 hover:shadow-lg transition-all dark:border-gray-800 dark:bg-gray-950"><h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{link.title}</h3><p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{link.description}</p></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionLabel>FAQ Home Gym</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">Questions fréquentes sur la salle de sport maison</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Des réponses concrètes pour cadrer l'espace, le matériel et le devis.</p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl bg-gray-50 border border-gray-100 p-6 dark:bg-gray-900/60 dark:border-gray-800"><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{item.question}</h3><p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-black mb-6">Un Home Gym à aménager ?</h2>
          <p className="text-black/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">Partagez votre espace, vos objectifs et vos priorités. IRONZ vous aide à cadrer une salle de sport maison cohérente avec votre habitation.</p>
          <Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-black text-white font-display uppercase tracking-wide rounded-xl hover:bg-gray-900 transition-colors shadow-2xl"><ServiceIcon name="quote" />Demander un devis</Link>
        </div>
      </section>
    </main>
  );
}
