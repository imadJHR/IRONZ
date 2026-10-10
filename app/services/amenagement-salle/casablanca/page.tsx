import Link from "next/link";
import type { ReactNode } from "react";
import ServiceContactForm from "../../../../components/service-contact-form";

const PAGE_URL = "https://www.ironz.ma/services/amenagement-salle/casablanca";
const DEVIS_URL = "/demande-devis?service=amenagement-salle";
const WHATSAPP_URL =
  "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20d%27am%C3%A9nagement%20de%20salle%20de%20sport%20%C3%A0%20Casablanca%20avec%20IRONZ.";

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
  | "whatsapp"
  | "pin"
  | "dimensions";

type Card = { icon: IconName; title: string; text: string };

const projectTypes: Card[] = [
  { icon: "users", title: "Salle de fitness", text: "Un espace ouvert à plusieurs profils, où l'offre d'entraînement, la circulation et la lisibilité des zones priment." },
  { icon: "strength", title: "Salle de musculation", text: "Un projet centré sur les machines guidées, les bancs, les racks et une zone de poids libres dégagée." },
  { icon: "cardio", title: "Espace cardio", text: "Un parcours construit autour des tapis, vélos ou elliptiques, avec une implantation pensée pour le passage." },
  { icon: "dumbbell", title: "Espace poids libres", text: "Un dégagement suffisant pour les mouvements, le stockage des disques et la protection du sol sous les charges." },
  { icon: "building", title: "Salle professionnelle", text: "Un projet pour un club, une entreprise, un hôtel ou une résidence avec un usage collectif et répété." },
  { icon: "home", title: "Espace fitness privé", text: "Un coin entraînement ou une salle dédiée, en maison ou en entreprise, avec une sélection de matériel ciblée." },
];

const gymZones: Card[] = [
  { icon: "surface", title: "Surface disponible", text: "La surface exploitable conditionne le nombre de postes, les dégagements et la possibilité de faire évoluer la salle." },
  { icon: "route", title: "Circulation", text: "Les passages entre zones restent suffisamment clairs pour éviter un espace chargé mais difficile à utiliser." },
  { icon: "layout", title: "Séparation des zones", text: "Distinguer cardio, machines, poids libres et mobilité aide à lire la salle et à mieux répartir le matériel." },
  { icon: "dimensions", title: "Empreinte des équipements", text: "Chaque appareil occupe de la place au sol et demande un espace d'accès autour de lui, pas seulement sa propre dimension." },
  { icon: "dumbbell", title: "Zone poids libres", text: "Les mouvements de force demandent du recul, du rangement pour les disques et une surface résistante." },
  { icon: "cardio", title: "Zone cardio", text: "L'implantation des tapis et vélos dépend du parcours, de la ventilation et des déplacements autour des postes." },
];

const equipmentFactors = [
  "objectifs prioritaires : cardio, force, remise en forme ou préparation physique",
  "surface réellement exploitable et dégagements autour des appareils",
  "niveaux et profils des utilisateurs concernés",
  "intensité et fréquence d'utilisation prévues",
  "place pour le rangement, l'entretien et les évolutions futures",
  "budget et possibilité de construire la salle progressivement",
];

const processSteps = [
  { title: "Comprendre le projet", text: "Clarifier le type de salle, les utilisateurs, les objectifs d'entraînement et le contexte du lieu." },
  { title: "Étudier l'espace", text: "Lire la surface, les accès, la hauteur et les contraintes visibles pour juger ce qui est réellement exploitable." },
  { title: "Définir zones et équipements", text: "Organiser cardio, machines, poids libres, mobilité et circulation, puis discuter les familles de matériel." },
  { title: "Préparer le périmètre du devis", text: "Transformer les informations utiles en demande claire, sans prix standard ni périmètre inventé." },
  { title: "Échanger sur la mise en œuvre", text: "Avancer selon le périmètre validé ensemble, sans calendrier annoncé avant d'avoir étudié le projet." },
];

const quotePreparation = [
  "type de salle envisagée",
  "surface approximative ou dimensions connues",
  "photos ou plan de l'espace si disponibles",
  "activités et objectifs d'entraînement prévus",
  "familles d'équipements souhaitées",
  "budget et timing si vous en avez une idée",
];

const faqs = [
  {
    question: "Peut-on demander un devis pour une salle de sport à Casablanca ?",
    answer: "Oui. Une demande de devis peut être préparée pour un projet de salle à Casablanca en passant par le formulaire dédié, avec le service aménagement de salle présélectionné. La proposition dépend des informations transmises et du périmètre discuté.",
  },
  {
    question: "Quelles informations préparer pour un projet ?",
    answer: "Le type de salle, la surface approximative, quelques photos ou un plan, les activités prévues, les utilisateurs concernés et les familles d'équipements souhaitées. Le budget et le timing sont utiles seulement si vous les connaissez.",
  },
  {
    question: "Faut-il connaître la surface exacte ?",
    answer: "Non. Une estimation suffit pour démarrer la discussion. Les mesures précises interviennent plus tard, lorsque le projet avance et que l'implantation doit être vérifiée.",
  },
  {
    question: "Peut-on inclure les équipements dans le projet ?",
    answer: "Oui. La sélection d'équipements fait partie de la discussion : cardio, machines de musculation, poids libres et accessoires. Le choix reste lié à l'espace, aux utilisateurs et au budget, pas à une liste standard.",
  },
  {
    question: "Le revêtement peut-il faire partie de l'aménagement ?",
    answer: "Oui. Le sol peut être intégré à la réflexion, surtout pour les zones de charges. Le choix dépend de l'activité, de l'équipement et des impacts prévus, et peut être approfondi sur la page revêtement sol et mur.",
  },
  {
    question: "Comment démarrer une demande de devis ?",
    answer: "Le formulaire prépare un message avec le service aménagement de salle présélectionné. Il est ensuite possible d'envoyer les premières informations et d'ajouter photos ou plan au cours de l'échange.",
  },
];

const usefulLinks = [
  { href: "/services/amenagement-salle", title: "Aménagement de salle au Maroc", text: "La page nationale du service, pour le cadrage global d'un projet fitness." },
  { href: "/services/amenagement-salle/home-gym", title: "Home Gym", text: "Pour un projet privé et résidentiel avec un usage personnel de la salle." },
  { href: "/services/amenagement-salle/salle-professionnelle", title: "Salle professionnelle", text: "Pour un projet collectif, commercial, hôtelier ou d'entreprise." },
  { href: "/services/revetement-sol-mur", title: "Revêtement sol & mur", text: "Pour approfondir le choix de surface selon les zones et l'intensité d'usage." },
  { href: "/produit", title: "Catalogue IRONZ", text: "Pour explorer les machines, poids libres et accessoires disponibles." },
];

function ServiceIcon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    layout: <><path d="M4 4h16v16H4z" /><path d="M4 10h16M10 10v10M15 4v6" /></>,
    dumbbell: <><path d="M5 8v8M8 7v10M16 7v10M19 8v8M8 12h8M3 10v4M21 10v4" /></>,
    cardio: <><path d="M4 13h3l2-5 4 10 2-5h5" /><path d="M6 20h12" /></>,
    strength: <><path d="M7 20V9a4 4 0 0 1 8 0v11" /><path d="M5 20h12M9 13h4M9 16h4M17 8h2v12" /></>,
    surface: <><path d="m4 17 8 4 8-4" /><path d="m4 12 8 4 8-4-8-4-8 4Z" /><path d="M12 8V3" /></>,
    route: <><path d="M5 6h5a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h11" /><path d="m17 15 3 3-3 3" /></>,
    quote: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 12h6M9 16h6" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c1-4 4-6 6-6s5 2 6 6" /><path d="M15 11a3 3 0 1 0 0-6M17 14c2 .6 3.3 2.5 4 6" /></>,
    home: <><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    building: <><path d="M4 20V6l8-3 8 3v14" /><path d="M8 20v-5h8v5M8 9h1M12 9h1M16 9h1M8 12h1M12 12h1M16 12h1" /></>,
    check: <path d="m20 6-11 11-5-5" />,
    whatsapp: <><path d="M5 19.5 6.2 16A7 7 0 1 1 9 18.3z" /><path d="M9.5 8.5c.4 2.3 2 3.9 4.2 4.8l1.3-1.2 2 1.2c-.3 1.5-1.2 2.2-2.7 2.1-3.8-.3-7-3.5-7.4-7.2C6.7 6.8 7.4 5.9 8.8 5.6z" /></>,
    pin: <><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
    dimensions: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 16h8M8 8v8M16 8v8" /></>,
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">
      {children}
    </span>
  );
}

function CardGrid({ cards, columns = "md:grid-cols-2 xl:grid-cols-3" }: { cards: Card[]; columns?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-6 ${columns}`}>
      {cards.map((card) => (
        <article key={card.title} className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900/60">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
            <ServiceIcon name={card.icon} />
          </div>
          <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{card.title}</h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{card.text}</p>
        </article>
      ))}
    </div>
  );
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.ironz.ma/services" },
    { "@type": "ListItem", position: 3, name: "Aménagement de salle", item: "https://www.ironz.ma/services/amenagement-salle" },
    { "@type": "ListItem", position: 4, name: "Casablanca", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Aménagement de salle de sport à Casablanca",
  serviceType: "Aménagement de salle de sport",
  provider: { "@type": "Organization", name: "IRONZ", url: "https://www.ironz.ma/" },
  areaServed: "Casablanca, Maroc",
  url: PAGE_URL,
  description:
    "Service d'aménagement de salle de sport à Casablanca : cadrage du projet, organisation des zones, choix d'équipements, revêtement et préparation d'un devis adapté à l'espace et aux objectifs.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function CasablancaPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {[breadcrumbJsonLd, serviceJsonLd, faqJsonLd].map((schema) => (
        <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="transition-colors hover:text-yellow-600 dark:hover:text-yellow-400">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="transition-colors hover:text-yellow-600 dark:hover:text-yellow-400">Services</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services/amenagement-salle" className="transition-colors hover:text-yellow-600 dark:hover:text-yellow-400">Aménagement de salle</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-gray-900 dark:text-white">Casablanca</span>
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/5" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-yellow-500/5" aria-hidden="true" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <span className="mb-6 inline-block bg-yellow-500 px-4 py-1.5 text-xs font-black uppercase italic tracking-wider text-black">
              Projet fitness sur devis
            </span>
            <h1 className="mb-6 text-4xl font-display uppercase leading-[0.95] tracking-wide text-white xs:text-5xl sm:text-6xl md:text-7xl">
              Aménagement de salle de sport <span className="text-yellow-500">à Casablanca</span>
            </h1>
            <p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
              IRONZ aide les particuliers et les professionnels à structurer un projet de fitness ou de musculation à Casablanca : lecture de l'espace, organisation des zones, choix du matériel et préparation du revêtement.
            </p>
            <p className="mb-8 max-w-3xl leading-relaxed text-gray-400">
              Le projet commence par l'usage, la surface et les objectifs. Les équipements, l'implantation et le sol se discutent ensuite, selon le périmètre que vous souhaitez étudier.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg transition-colors hover:bg-yellow-600">
                <ServiceIcon name="quote" className="h-5 w-5" />
                Demander un devis
              </Link>
              <Link href="/services/amenagement-salle" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:border-yellow-500/60 hover:text-yellow-400">
                <ServiceIcon name="pin" className="h-5 w-5" />
                Découvrir notre service au Maroc
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionLabel>Projet fitness à Casablanca</SectionLabel>
              <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                Un projet commence par l'usage, pas par les machines
              </h2>
              <div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  Une salle de sport se pense d'abord comme un espace où des utilisateurs vont s'entraîner, circuler et progresser. La surface disponible, le profil des utilisateurs et les objectifs d'entraînement précèdent le choix des appareils.
                </p>
                <p>
                  À Casablanca, les projets peuvent concerner une salle privée, un espace professionnel, un coin fitness d'entreprise ou un projet collectif. Chaque contexte appelle une organisation différente, même avec des équipements similaires.
                </p>
                <p>
                  IRONZ vous aide à transformer une intention en demande structurée : zones à prévoir, familles d'équipements, points à protéger et informations utiles pour un devis adapté à votre projet.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-yellow-500/20 bg-gray-50 p-6 dark:bg-gray-900/60 sm:p-8">
              <h3 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
                Les questions à se poser avant le devis
              </h3>
              <ul className="space-y-4">
                {[
                  "qui va utiliser la salle et à quelle fréquence",
                  "surface exploitable et contraintes du lieu",
                  "objectifs : cardio, force, remise en forme, préparation physique",
                  "zones à prévoir et dégagements autour des appareils",
                  "équipements déjà disponibles ou familles souhaitées",
                  "sol existant et besoin de protection sous les charges",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                      <ServiceIcon name="check" className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Types de projets</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Adapter l'aménagement au type de salle
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Le terme salle de sport couvre des réalités différentes. La lecture du projet permet d'orienter vers la bonne organisation et les bons équipements.
            </p>
          </div>
          <CardGrid cards={projectTypes} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Organisation de l'espace</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Réussir l'implantation avant de remplir la salle
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Le zoning relie les pratiques, les déplacements et les équipements. Une salle peut être bien équipée mais peu pratique si les zones ne sont pas pensées ensemble.
            </p>
          </div>
          <CardGrid cards={gymZones} columns="md:grid-cols-2 xl:grid-cols-3" />
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <SectionLabel>Approche équipements</SectionLabel>
              <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                Choisir le matériel selon le projet
              </h2>
              <div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  L'équipement d'une salle peut intégrer cardio, machines de musculation, poids libres, bancs, racks et accessoires. Une salle privée n'a pas les mêmes priorités qu'un espace collectif.
                </p>
                <p>
                  Un appareil pertinent sur le catalogue peut devenir peu pratique si l'implantation, les dégagements ou le sol ne suivent pas. La sélection du matériel reste liée à l'usage réel de l'espace.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/categories/equipements" className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-600">
                  Voir les équipements
                </Link>
                <Link href="/produit" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-4 font-display uppercase tracking-wide text-gray-900 transition-colors hover:border-yellow-500/60 hover:text-yellow-600 dark:border-gray-700 dark:text-white dark:hover:text-yellow-400">
                  Catalogue IRONZ
                </Link>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {equipmentFactors.map((factor) => (
                <li key={factor} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl bg-gray-950 p-7 text-white sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <ServiceIcon name="surface" />
              </div>
              <h2 className="mb-4 text-2xl font-display uppercase tracking-wide text-yellow-500 sm:text-3xl">
                Revêtement et protection du sol
              </h2>
              <p className="mb-6 leading-relaxed text-gray-300">
                Le sol ne doit pas être traité comme une finition de dernière minute. Charges, machines, bruit, entretien et passages influencent le choix de la surface, surtout dans une zone de poids libres.
              </p>
              <p className="leading-relaxed text-gray-300">
                Le revêtement peut faire partie du projet d'aménagement. Pour approfondir le choix par zone, consultez la page dédiée au{" "}
                <Link href="/services/revetement-sol-mur" className="text-yellow-400 underline underline-offset-4">
                  revêtement sol et mur
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Process projet</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Comment avance un projet de salle ?
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              La démarche est progressive : comprendre, étudier, organiser, chiffrer, puis échanger sur la mise en œuvre. Aucune étape ne se substitue à l'étude réelle de votre espace.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 font-display text-black">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <SectionLabel>Préparer votre demande</SectionLabel>
              <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                Pour préparer votre demande
              </h2>
              <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
                Une demande claire évite des échanges inutiles et permet de cadrer plus vite une proposition pertinente. Les éléments ci-dessous suffisent souvent pour démarrer la discussion.
              </p>
              <Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg transition-colors hover:bg-yellow-600">
                <ServiceIcon name="quote" className="h-5 w-5" />
                Demander un devis
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quotePreparation.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel>Le service IRONZ</SectionLabel>
              <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                Pourquoi passer par le service d'aménagement
              </h2>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                Le service aide à structurer la demande avant de choisir les machines : lecture de l'espace, hiérarchisation des zones, cohérence des équipements et intégration du revêtement dans le projet.
              </p>
              <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">
                Cette page concerne les projets de salle à Casablanca. Le service est présenté pour l'ensemble du Maroc sur la{" "}
                <Link href="/services/amenagement-salle" className="font-medium text-yellow-600 underline underline-offset-4 dark:text-yellow-400">
                  page nationale
                </Link>{" "}
                du service d'aménagement de salle.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: "dimensions" as const, title: "Lecture de l'espace", text: "La surface et les contraintes du lieu guident l'organisation, avant la liste des appareils." },
                { icon: "layout" as const, title: "Zones cohérentes", text: "Cardio, machines, poids libres, mobilité et circulation sont pensés ensemble, pas les uns après les autres." },
                { icon: "quote" as const, title: "Devis au périmètre", text: "La proposition est préparée à partir des éléments réels du projet, sans forfait standard appliqué." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-black">
                    <ServiceIcon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Questions fréquentes sur un projet de salle
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Réponses pratiques pour préparer un projet de salle de sport avant la demande de devis.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Liens utiles</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Continuer vers la bonne ressource
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Ces pages permettent de préciser le projet sans disperser la lecture.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {usefulLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group block rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-yellow-500/40 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">{link.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionLabel>Échange projet</SectionLabel>
            <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Décrivez votre salle à Casablanca
            </h2>
            <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
              Le formulaire prépare votre message pour WhatsApp avec le contexte du service aménagement de salle. Vous pouvez aussi écrire directement avec les premières informations du projet.
            </p>
            <div className="space-y-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                  <ServiceIcon name="whatsapp" />
                </span>
                <span>
                  <span className="block font-bold text-gray-900 dark:text-white">WhatsApp</span>
                  <span className="block text-gray-600 dark:text-gray-400">Message prérempli pour votre projet de salle</span>
                </span>
              </a>
              <Link href="/contact" className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                  <ServiceIcon name="quote" />
                </span>
                <span>
                  <span className="block font-bold text-gray-900 dark:text-white">Page contact</span>
                  <span className="block text-gray-600 dark:text-gray-400">Pour une question avant de lancer un projet</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-black p-6 shadow-2xl sm:p-9">
            <h3 className="mb-4 text-2xl font-display uppercase tracking-wide text-white">
              Demande de <span className="text-yellow-500">devis</span>
            </h3>
            <p className="mb-8 leading-relaxed text-gray-300">
              Renseignez les informations disponibles. Le message reste ajustable avant son envoi sur WhatsApp.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <ServiceContactForm service="Aménagement de salle de sport Casablanca" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-display uppercase tracking-wide text-black sm:text-4xl md:text-5xl">
            Un projet de salle à Casablanca ?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-black/80">
            Envoyez les dimensions, photos, objectifs et priorités. IRONZ vous aide à cadrer l'aménagement, les équipements et le revêtement selon votre projet.
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-5 font-display uppercase tracking-wide text-white shadow-2xl transition-colors hover:bg-gray-900">
              <ServiceIcon name="quote" />
              Demander un devis
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-5 font-display uppercase tracking-wide text-black shadow-2xl transition-colors hover:bg-gray-100">
              <ServiceIcon name="whatsapp" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
