import Link from "next/link";
import { MapPin } from "lucide-react";
import ServiceContactForm from "../../../components/service-contact-form";
import { CITIES, getCityHref } from "../../../lib/cities";

const CANONICAL_URL = "https://www.ironz.ma/services/amenagement-salle";
const DEVIS_URL = "/demande-devis?service=amenagement-salle";
const WHATSAPP_URL =
  "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20d%27am%C3%A9nagement%20de%20salle%20avec%20IRONZ.";

type IconName =
  | "layout"
  | "dumbbell"
  | "cardio"
  | "strength"
  | "surface"
  | "route"
  | "quote"
  | "users"
  | "home"
  | "building"
  | "check"
  | "whatsapp";

const introChecklist = [
  "surface disponible et contraintes du local",
  "profil des utilisateurs et niveau d'usage attendu",
  "zones cardio, musculation, poids libres et mobilité",
  "choix du matériel fitness et cohérence du parcours",
  "revêtement sportif, confort, bruit et entretien",
  "périmètre du projet, priorités et budget indicatif",
];

const projectTypes = [
  {
    icon: "home" as const,
    title: "Home Gym",
    description:
      "Pour une maison, un appartement, un garage ou une pièce dédiée où chaque machine doit justifier sa place.",
    href: "/services/amenagement-salle/home-gym",
    linkLabel: "Voir le service Home Gym",
  },
  {
    icon: "building" as const,
    title: "Salle professionnelle",
    description:
      "Pour un club, une entreprise, un hôtel, une résidence ou un espace collectif avec circulation et usage répété.",
    href: "/services/amenagement-salle/salle-professionnelle",
    linkLabel: "Voir la salle professionnelle",
  },
  {
    icon: "users" as const,
    title: "Espace hôtelier ou entreprise",
    description:
      "Pour un espace fitness compact mais lisible, pensé autour d'un public varié et d'une expérience simple.",
  },
  {
    icon: "route" as const,
    title: "Projet sportif polyvalent",
    description:
      "Pour combiner machines guidées, cardio, poids libres et zone fonctionnelle sans créer un espace confus.",
  },
];

const gymZones = [
  {
    icon: "cardio" as const,
    title: "Zone cardio",
    description:
      "Prévoyez la place des appareils, leurs dégagements et les accès. Le choix du matériel cardio dépend ensuite des pratiques et des utilisateurs.",
  },
  {
    icon: "strength" as const,
    title: "Machines de musculation",
    description:
      "Les machines guidées structurent le parcours et doivent être choisies selon objectifs, niveaux et intensité d'utilisation.",
  },
  {
    icon: "dumbbell" as const,
    title: "Poids libres",
    description:
      "Haltères, bancs, racks et accessoires exigent davantage de dégagement, de rangement et de protection du sol.",
  },
  {
    icon: "layout" as const,
    title: "Mobilité et circulation",
    description:
      "Les passages, zones d'échauffement, étirements et transitions rendent la salle plus agréable et plus sûre à utiliser.",
  },
];

const equipmentFactors = [
  "type de salle : privée, professionnelle, hôtelière ou collective",
  "surface réellement exploitable et dégagements autour des appareils",
  "niveau des utilisateurs : débutants, réguliers ou sportifs avancés",
  "objectifs prioritaires : cardio, force, remise en forme ou préparation physique",
  "fréquence d'utilisation et robustesse attendue",
  "budget disponible et possibilité d'évolution progressive",
];

const processSteps = [
  {
    icon: "quote" as const,
    title: "Comprendre le projet",
    description:
      "Clarifier le type de salle, les utilisateurs, les objectifs d'entraînement, la ville et le périmètre souhaité.",
  },
  {
    icon: "layout" as const,
    title: "Étudier l'espace",
    description:
      "Lire la surface, les accès, la hauteur, les prises, les zones existantes, les contraintes de bruit et de circulation.",
  },
  {
    icon: "route" as const,
    title: "Définir les zones",
    description:
      "Organiser cardio, machines, poids libres, mobilité, rangement et passage pour éviter une salle chargée mais peu pratique.",
  },
  {
    icon: "dumbbell" as const,
    title: "Sélectionner les équipements",
    description:
      "Choisir les familles de matériel, le niveau de finition et les compléments selon l'usage attendu.",
  },
  {
    icon: "surface" as const,
    title: "Prévoir le revêtement",
    description:
      "Relier le choix du sol aux zones d'entraînement, aux charges, au confort, au bruit et à l'entretien.",
  },
  {
    icon: "check" as const,
    title: "Préparer le devis",
    description:
      "Préciser les équipements, le revêtement et les priorités à chiffrer, en distinguant les besoins immédiats des ajouts envisagés plus tard.",
  },
];

const quotePreparation = [
  "ville et type de lieu : maison, club, hôtel, entreprise ou local commercial",
  "surface approximative, dimensions si connues, hauteur et accès au local",
  "public attendu et fréquence d'utilisation envisagée",
  "priorités d'entraînement : cardio, musculation, poids libres, mobilité",
  "matériel déjà disponible ou familles d'équipements souhaitées",
  "état du sol, budget indicatif et délai souhaité, si vous les connaissez",
];

const internalLinks = [
  {
    href: "/services/amenagement-salle/home-gym",
    title: "Home Gym",
    description:
      "À consulter si le projet concerne une salle privée à domicile, une pièce dédiée ou un garage transformé.",
  },
  {
    href: "/services/amenagement-salle/salle-professionnelle",
    title: "Salle professionnelle",
    description:
      "À consulter pour un club, hôtel, entreprise ou espace recevant plusieurs utilisateurs avec un usage plus fréquent.",
  },
  {
    href: "/services/revetement-sol-mur",
    title: "Revêtement sol & mur",
    description:
      "Pour approfondir le choix de surface, la protection du sol, le confort, le bruit et l'entretien.",
  },
  {
    href: "/categories/equipements",
    title: "Équipements fitness",
    description:
      "Pour comparer les équipements cardio et de musculation, leurs dimensions et leurs caractéristiques sur les fiches produits.",
  },
];

const faqItems = [
  {
    question: "Comment aménager une salle de sport ?",
    answer:
      "Commencez par préciser qui utilisera la salle, pour quelles activités et dans quel espace. Relevez la surface disponible, les accès et le matériel déjà présent. Ces informations permettent de discuter avec IRONZ des zones, des équipements et du revêtement à prévoir dans la demande de devis.",
  },
  {
    question: "Quels équipements prévoir dans une salle de sport ?",
    answer:
      "Le choix dépend des exercices, du nombre d'utilisateurs et de l'espace disponible. Distinguez les besoins cardio, musculation, poids libres, mobilité et rangement. Consultez les dimensions et caractéristiques des références envisagées ; la présence d'un appareil dans le catalogue ne suffit pas à confirmer qu'il convient à votre local.",
  },
  {
    question: "Faut-il connaître la surface exacte avant de demander un devis ?",
    answer:
      "Vous pouvez commencer avec une surface approximative et préciser les dimensions pendant l'échange. Dans le formulaire de demande de devis, la surface est facultative. Des photos ou un plan existant peuvent être partagés ensuite sur WhatsApp pour expliquer les accès, les passages et les contraintes du local.",
  },
  {
    question: "Quelle différence entre Home Gym et salle professionnelle ?",
    answer:
      "Un Home Gym privilégie un usage privé, une sélection compacte et des objectifs personnels. Une salle professionnelle doit prévoir plusieurs profils d'utilisateurs, plus de circulation et un mix d'équipements plus large.",
  },
  {
    question: "Peut-on intégrer du matériel déjà présent dans la salle ?",
    answer:
      "Indiquez le matériel que vous souhaitez conserver, avec ses dimensions et son emplacement actuel si vous les connaissez. Il pourra ainsi être pris en compte dans la discussion sur les zones, les dégagements et le sol, avant de définir les équipements complémentaires à envisager.",
  },
  {
    question: "Que préparer avant de demander un devis ?",
    answer:
      "Indiquez la ville au Maroc, le type de lieu, la surface estimée, les utilisateurs et vos priorités d'entraînement. Ajoutez le matériel existant ou souhaité, l'état du sol et les contraintes d'accès. Le budget indicatif et le délai souhaité peuvent être précisés si vous les connaissez ; les photos et plans se partagent ensuite sur WhatsApp.",
  },
  {
    question: "Puis-je demander un devis sans budget défini ?",
    answer:
      "Oui. Le budget est facultatif dans le formulaire de demande de devis. Décrivez d'abord les usages et les équipements prioritaires. Si vous avez une enveloppe indicative, elle aide à distinguer les besoins à traiter maintenant des ajouts envisagés plus tard. Le chiffrage dépend du périmètre discuté pour votre projet.",
  },
  {
    question: "Comment transmettre ma demande à IRONZ ?",
    answer:
      "Les boutons « Demander un devis » ouvrent le formulaire avec le service Aménagement de salle présélectionné. Ce formulaire et le formulaire de cette page préparent un message pour WhatsApp. Relisez-le puis validez son envoi dans WhatsApp pour transmettre la demande à IRONZ. Vous pouvez ensuite y partager des photos ou un plan existant.",
  },
];

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
      name: "Aménagement de salle de sport",
      item: CANONICAL_URL,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Aménagement de salle de sport au Maroc",
  serviceType: "Aménagement de salle de sport",
  provider: {
    "@type": "Organization",
    name: "IRONZ",
    url: "https://www.ironz.ma/",
  },
  areaServed: "Maroc",
  url: CANONICAL_URL,
  description:
    "Service d'aménagement de salle de sport au Maroc : cadrage du projet, organisation des zones, sélection d'équipements fitness, revêtement et devis personnalisé.",
};

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

function ServiceIcon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    layout: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2.5" />
        <path d="M4 10h16M10 10v10M15 4v6" />
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
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c1-4 4-6 6-6s5 2 6 6" />
        <path d="M15 11a3 3 0 1 0 0-6M17 14c2 .6 3.3 2.5 4 6" />
      </>
    ),
    home: (
      <>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    building: (
      <>
        <path d="M4 20V6l8-3 8 3v14" />
        <path d="M8 20v-5h8v5M8 9h1M12 9h1M16 9h1M8 12h1M12 12h1M16 12h1" />
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
    <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-800 dark:text-yellow-400">
      {children}
    </span>
  );
}

export default function AmenagementSallePage() {
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
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
            <Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Accueil</Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">Services</Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-gray-900 dark:text-white">Aménagement de salle</span>
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/5" aria-hidden />
        <div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-yellow-500/5 pointer-events-none" aria-hidden />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block bg-yellow-500 text-black px-4 py-1.5 text-xs sm:text-sm font-black uppercase italic tracking-wider transform skew-x-6 mb-6">
              Salle fitness sur devis
            </span>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-display uppercase leading-[0.95] text-white mb-6 tracking-wide">
              Aménagement de salle de sport{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                au Maroc
              </span>
            </h1>
            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              IRONZ accompagne les projets de salle de sport au Maroc : cadrage
              du besoin, organisation de l&apos;espace, sélection du matériel fitness,
              revêtement sportif et préparation d&apos;un devis adapté au périmètre
              réel du projet.
            </p>
            <p className="max-w-2xl text-gray-400 leading-relaxed mb-8">
              Vous aménagez une pièce chez vous ? Consultez le{" "}
              <Link href="/services/amenagement-salle/home-gym" className="text-yellow-400 underline underline-offset-4 hover:text-yellow-300">service Home Gym</Link>.
              Pour un club, un hôtel ou un espace d&apos;entreprise, consultez la{" "}
              <Link href="/services/amenagement-salle/salle-professionnelle" className="text-yellow-400 underline underline-offset-4 hover:text-yellow-300">salle professionnelle</Link>.
              Pour un projet à Casablanca, consultez la{" "}
              <Link href="/services/amenagement-salle/casablanca" className="text-yellow-400 underline underline-offset-4 hover:text-yellow-300">page consacrée à l’aménagement de salle de sport à Casablanca</Link>.
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
              <SectionLabel>Projet fitness structuré</SectionLabel>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">
                Définir les besoins et les contraintes de{" "}
                <span className="text-yellow-700">votre espace</span>
              </h2>
              <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Décrivez les activités prévues et le nombre de personnes qui
                  pourraient s&apos;entraîner en même temps. Une pièce réservée à
                  quelques séances personnelles et un espace partagé ne demandent
                  pas la même organisation.
                </p>
                <p>
                  Relevez la surface utile, les portes, les passages et la hauteur
                  disponible. Signalez les obstacles, le matériel à conserver et
                  les contraintes de bruit : ces éléments orientent l&apos;implantation
                  et le choix du sol.
                </p>
                <p>
                  IRONZ aide à transformer une idée générale en demande claire :
                  zones à prévoir, familles d&apos;équipements, points à protéger et
                  informations utiles pour un devis personnalisé.
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
                      <ServiceIcon name="check" className="h-3.5 w-3.5 text-yellow-700 dark:text-yellow-400" />
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
            <SectionLabel>Types de projets</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Adapter l&apos;aménagement au{" "}
              <span className="text-yellow-700">contexte du projet</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Précisez si la salle est destinée à un usage personnel, aux adhérents d&apos;un club ou aux utilisateurs d&apos;un établissement. Le nombre de personnes présentes et la fréquence d&apos;utilisation orientent les besoins en matériel et en circulation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {projectTypes.map((type) => (
              <div key={type.title} className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-950">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                  <ServiceIcon name={type.icon} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{type.description}</p>
                {type.href && type.linkLabel ? (
                  <Link href={type.href} className="inline-flex text-sm font-semibold text-yellow-700 dark:text-yellow-400 underline underline-offset-4 hover:text-yellow-500">
                    {type.linkLabel}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Organisation intérieure</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Organiser les zones avant de remplir la salle
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Répartissez les activités en conservant des passages entre les appareils et une place pour le rangement. Vérifiez les dégagements nécessaires à l&apos;utilisation de chaque équipement : la surface occupée au sol ne décrit pas tout l&apos;espace nécessaire à l&apos;entraînement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {gymZones.map((zone) => (
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
              <SectionLabel>Équipements fitness</SectionLabel>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">
                Choisir les équipements selon vos activités et la surface
              </h2>
              <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  L&apos;équipement d&apos;une salle de sport au Maroc peut intégrer cardio, machines de musculation, poids libres, bancs, racks et accessoires. Le bon choix dépend du type de salle, de la surface et du public.
                </p>
                <p>
                  IRONZ relie la sélection du matériel à l&apos;implantation : un appareil pertinent sur catalogue peut devenir peu pratique si les dégagements, le passage ou le sol ne suivent pas.
                </p>
                <p>
                  Pour préparer votre sélection, consultez le{" "}
                  <Link href="/guides/choisir-machine-cardio-tapis-velo-rameur-maroc" className="text-yellow-700 dark:text-yellow-400 underline underline-offset-4">guide pour comparer tapis, vélo et rameur</Link>.
                  Pour les charges et le petit matériel, explorez les{" "}
                  <Link href="/categories/accessoires/poids-libres" className="text-yellow-700 dark:text-yellow-400 underline underline-offset-4">poids libres</Link>.
                  Notez les références qui vous intéressent pour en discuter dans votre demande.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/categories/equipements" className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black hover:bg-yellow-600 transition-colors">
                  Voir les équipements
                </Link>
                <Link href="/categories/equipements/machine-de-fitness" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:border-yellow-500/60 hover:text-yellow-600 dark:border-gray-700 dark:text-white dark:hover:text-yellow-400 transition-colors">
                  Machines fitness
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
          <div className="max-w-3xl mx-auto">
            <SectionLabel>Revêtement et confort</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Prévoir le sol dès la conception de la salle
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Décrivez le sol existant et les activités prévues dans chaque zone : appareils cardio, machines, charges ou exercices au sol. Pour préparer les questions sur la protection du support, le confort et l&apos;entretien, consultez le service de <Link href="/services/revetement-sol-mur" className="text-yellow-700 dark:text-yellow-400 underline underline-offset-4">revêtement sol et mur</Link>.
            </p>
            <div className="rounded-3xl bg-gray-950 text-white p-6 sm:p-8">
              <h3 className="text-xl font-display uppercase tracking-wide text-yellow-500 mb-4">Pourquoi l&apos;intégrer tôt ?</h3>
              <p className="text-gray-300 leading-relaxed">
                Le sol conditionne l&apos;emplacement des charges, le ressenti sous les pieds, la protection du local, le niveau sonore et la cohérence entre zones cardio, musculation et poids libres.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Usage privé ou collectif</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Home Gym ou salle professionnelle ?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Pour un espace personnel, commencez par vos habitudes d&apos;entraînement et les contraintes du logement. Pour un espace collectif, précisez aussi les profils d&apos;utilisateurs, les périodes d&apos;affluence et les besoins de circulation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Link href="/services/amenagement-salle/home-gym" className="group rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 dark:bg-gray-950 dark:border-gray-800 hover:border-yellow-500/50 hover:shadow-xl transition-all">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <ServiceIcon name="home" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Home Gym</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                À privilégier pour une salle privée : espace compact, objectifs personnels, rangement, bruit, choix sélectif des machines et évolution progressive.
              </p>
            </Link>
            <Link href="/services/amenagement-salle/salle-professionnelle" className="group rounded-3xl bg-white p-6 sm:p-8 border border-gray-100 dark:bg-gray-950 dark:border-gray-800 hover:border-yellow-500/50 hover:shadow-xl transition-all">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <ServiceIcon name="building" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Salle professionnelle</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                À privilégier pour un usage collectif : plusieurs profils d&apos;utilisateurs, circulation plus forte, zones lisibles, mix d&apos;équipements plus large et usage plus fréquent.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Villes d&apos;intervention</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              IRONZ intervient dans les <span className="text-yellow-700">principales villes</span> du Maroc
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              L&apos;aménagement d&apos;une salle de sport répond aux mêmes questions partout au Maroc : surface, usages, équipements et revêtement. La ville change surtout les contraintes d&apos;accès, d&apos;approvisionnement et de déplacement. Précisez votre lieu dans la demande pour adapter l&apos;étude au projet.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CITIES.map((city) => (
              <article key={city.id} className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-black">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{city.name}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{city.coverage}</p>
                {city.id === "casablanca" ? (
                  <span className="mt-4 inline-flex text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Page dédiée dans l&apos;introduction
                  </span>
                ) : (
                  <Link
                    href={getCityHref(city)}
                    className="mt-4 inline-flex text-sm font-semibold text-yellow-700 dark:text-yellow-400 underline underline-offset-4 hover:text-yellow-500"
                  >
                    {city.hasPage ? `Voir la page ${city.name}` : `Devis à ${city.name}`}
                  </Link>
                )}
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            IRONZ n&apos;a pas de bureau local dans chaque ville : les projets sont cadrés à distance, et les déplacements sont confirmés selon le périmètre retenu.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Du besoin au devis</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Comment se déroule un projet de salle ?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Les points ci-dessous servent à préciser la demande : usages, espace, équipements et revêtement. Le périmètre à chiffrer se définit à partir de ces informations et des priorités discutées avec IRONZ.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {processSteps.map((step) => (
              <div key={step.title} className="group rounded-2xl bg-gray-50 p-6 sm:p-8 border border-gray-100 dark:bg-gray-900/60 dark:border-gray-800 hover:border-yellow-500/40 transition-colors">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-yellow-600 shadow-sm dark:bg-gray-800 dark:text-yellow-400 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                  <ServiceIcon name={step.icon} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-start">
            <div>
              <SectionLabel>Préparer la demande</SectionLabel>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">
                Que préparer avant de demander un devis ?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Commencez avec les informations disponibles. La surface peut être approximative ; le budget et le délai souhaité sont facultatifs dans le formulaire. Distinguez ce que vous souhaitez conserver, acheter maintenant ou envisager plus tard.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Le formulaire prépare un message à relire et à envoyer dans WhatsApp. Vous pourrez ensuite y partager des photos ou un plan existant pour préciser les contraintes du local.
              </p>
              <Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black hover:bg-yellow-600 transition-colors shadow-lg">
                <ServiceIcon name="quote" />
                Demander un devis
              </Link>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quotePreparation.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl bg-white p-4 text-gray-700 border border-gray-100 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionLabel>Liens utiles</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Approfondir le matériel et les services utiles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Retrouvez les conseils adaptés à votre usage et les caractéristiques du matériel avant de préciser votre demande de devis.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group block rounded-2xl border border-gray-100 p-6 hover:border-yellow-500/40 hover:shadow-xl transition-all dark:border-gray-800">
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{link.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-7xl mx-auto items-start">
            <div>
              <SectionLabel>Échanger avec IRONZ</SectionLabel>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-6">
                Parlez-nous de votre salle de sport
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Décrivez votre ville, votre espace et vos priorités dans le message. Ce formulaire prépare une demande pour le service « Aménagement de salle de sport » ; validez ensuite son envoi dans WhatsApp pour la transmettre à IRONZ.
              </p>
              <div className="space-y-4">
                <a href="tel:+212674114446" className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 hover:border-yellow-500/40 transition-colors">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                    <ServiceIcon name="quote" />
                  </span>
                  <span>
                    <span className="block font-bold text-gray-900 dark:text-white">Téléphone direct</span>
                    <span className="block text-gray-600 dark:text-gray-400">+212 674-114446</span>
                  </span>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 hover:border-yellow-500/40 transition-colors">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                    <ServiceIcon name="whatsapp" />
                  </span>
                  <span>
                    <span className="block font-bold text-gray-900 dark:text-white">WhatsApp</span>
                    <span className="block text-gray-600 dark:text-gray-400">Message prérempli pour votre projet de salle</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 lg:p-10 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-display uppercase tracking-wide mb-4 text-white">
                Demande de <span className="text-yellow-500">devis</span>
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Renseignez les informations disponibles. Le message reste ajustable avant l&apos;envoi sur WhatsApp.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <ServiceContactForm service="Aménagement de salle de sport" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Questions fréquentes sur l&apos;aménagement de salle
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Réponses pratiques pour cadrer une salle de sport avant la demande de devis.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl bg-gray-50 border border-gray-100 p-6 dark:bg-gray-900/60 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-black mb-6">
            Un projet de salle à structurer ?
          </h2>
          <p className="text-black/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Indiquez votre ville, la surface estimée et vos priorités. Préparez votre demande de devis, puis envoyez-la dans WhatsApp. Les photos et plans existants pourront compléter l&apos;échange.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-black text-white font-display uppercase tracking-wide rounded-xl hover:bg-gray-900 transition-colors shadow-2xl">
              <ServiceIcon name="quote" />
              Demander un devis
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white text-black font-display uppercase tracking-wide rounded-xl hover:bg-gray-100 transition-colors shadow-2xl">
              <ServiceIcon name="whatsapp" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
