import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  Dumbbell,
  Mail,
  MapPin,
  Package,
  Phone,
  Target,
  Users,
} from "lucide-react";
import {
  getCanonicalServiceCards,
  type ServiceHubIconName,
} from "../../lib/services";

const PAGE_URL = "https://www.ironz.ma/a-propos";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "À propos", item: PAGE_URL },
  ],
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "À propos d'IRONZ",
  description:
    "Découvrez IRONZ, son univers fitness au Maroc, ses produits et ses services d'aménagement sportif.",
  url: PAGE_URL,
  isPartOf: { "@type": "WebSite", name: "IRONZ", url: "https://www.ironz.ma/" },
  about: { "@type": "Organization", name: "IRONZ", url: "https://www.ironz.ma/" },
  inLanguage: "fr-MA",
};

const focusPoints = [
  {
    icon: <Package className="h-6 w-6" aria-hidden="true" />,
    title: "Produits fitness",
    text: "Machines, matériel de musculation, accessoires et suppléments pour différents objectifs et usages.",
    href: "/produit",
    label: "Explorer le catalogue",
  },
  {
    icon: <Building2 className="h-6 w-6" aria-hidden="true" />,
    title: "Projets sportifs",
    text: "Des services pour cadrer un Home Gym, une salle professionnelle ou un espace sportif.",
    href: "/services",
    label: "Découvrir les services",
  },
  {
    icon: <Users className="h-6 w-6" aria-hidden="true" />,
    title: "Accompagnement",
    text: "Une première orientation pour relier le besoin, l’espace, les équipements et le projet.",
    href: "/contact",
    label: "Parler à IRONZ",
  },
];

const steps = [
  {
    number: "01",
    title: "Comprendre le besoin",
    text: "Identifier le type d’usage, l’espace concerné, les objectifs et les priorités du projet.",
  },
  {
    number: "02",
    title: "Orienter les choix",
    text: "Relier les équipements, accessoires, surfaces et services aux contraintes réelles du lieu.",
  },
  {
    number: "03",
    title: "Construire la suite",
    text: "Explorer le catalogue, consulter un service ou demander un échange selon le niveau de précision nécessaire.",
  },
];

function ServiceIcon({ name }: { name: ServiceHubIconName }) {
  const common = {
    className: "h-8 w-8",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
  };

  switch (name) {
    case "home":
      return <svg {...common}><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></svg>;
    case "building":
      return <svg {...common}><path d="M4 21V5l8-2 8 2v16" /><path d="M8 8h1M15 8h1M8 12h1M15 12h1M8 16h1M15 16h1" /><path d="M10 21v-3h4v3" /></svg>;
    case "palette":
      return <svg {...common}><path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h2a7 7 0 0 0 0-10Z" /><path d="M7.5 10h.01M9 6.5h.01M14 6.5h.01M17 10h.01" /></svg>;
    case "activity":
      return <svg {...common}><circle cx="12" cy="5" r="2" /><path d="m9 21 1.5-7L7 11l2-3 3 2 3-2 2 3-3.5 3 1.5 7" /><path d="M10.5 14h3" /></svg>;
    case "layers":
      return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></svg>;
    case "outdoor":
      return <svg {...common}><path d="M4 20h16M6 20V9h12v11M9 9V5h6v4M8 13h8M9 17h6" /></svg>;
    case "layout":
    default:
      return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 10v10" /></svg>;
  }
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">
      {children}
    </span>
  );
}

export default function AboutPage() {
  const serviceCards = getCanonicalServiceCards();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d&apos;Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-yellow-600">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-gray-900 dark:text-white">À propos</span>
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/5" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-yellow-500/5" aria-hidden="true" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <SectionLabel>À propos d&apos;IRONZ</SectionLabel>
            <h1 className="mb-6 mt-6 text-4xl font-display uppercase leading-[0.95] tracking-wide text-white sm:text-5xl md:text-7xl">
              IRONZ, votre univers fitness <span className="text-yellow-500">au Maroc</span>
            </h1>
            <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
              IRONZ rassemble un catalogue de produits fitness et un ensemble de services pour accompagner les usages individuels, les espaces privés et les projets sportifs professionnels.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/produit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-400">
                Découvrir nos produits <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-display uppercase tracking-wide text-white hover:border-yellow-500/60 hover:text-yellow-400">
                Découvrir nos services <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionLabel>Qui est IRONZ&nbsp;?</SectionLabel>
              <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                Plus qu&apos;une boutique <span className="text-yellow-500">fitness</span>
              </h2>
              <div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400">
                <p>IRONZ propose du matériel de fitness, de musculation, des accessoires et des suppléments sportifs à travers un catalogue accessible en ligne.</p>
                <p>L&apos;entreprise accompagne également des projets d&apos;aménagement et de personnalisation d&apos;espaces sportifs. Le besoin peut concerner un produit précis, une pièce à équiper ou un projet plus global.</p>
                <p>Cette page présente l&apos;identité et le rôle d&apos;IRONZ. Les pages produits, catégories et services détaillent ensuite les solutions correspondantes.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-yellow-500/20 bg-gray-50 p-6 dark:bg-gray-900/60 sm:p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mb-4 text-2xl font-display uppercase tracking-wide text-gray-900 dark:text-white">Notre rôle</h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">Mettre en relation un objectif fitness, un espace et des solutions adaptées, avec une orientation claire vers le catalogue, les services ou un échange avec IRONZ.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Ce que propose IRONZ</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Des solutions selon votre <span className="text-yellow-500">projet</span></h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">Commencez par le besoin qui vous concerne. Chaque parcours renvoie vers une page dédiée pour éviter de mélanger catalogue, conseil et aménagement.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {focusPoints.map((point) => (
              <article key={point.title} className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">{point.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{point.title}</h3>
                <p className="mb-6 flex-1 leading-relaxed text-gray-600 dark:text-gray-400">{point.text}</p>
                <Link href={point.href} className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-yellow-600 hover:text-yellow-500 dark:text-yellow-400">{point.label} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Nos services fitness</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Du Home Gym aux <span className="text-yellow-500">projets sportifs</span></h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">Les services IRONZ couvrent l&apos;aménagement, les surfaces, la personnalisation et différents contextes d&apos;usage. Consultez la page qui correspond à votre projet.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((service) => (
              <article key={service.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name={service.icon} /></div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                <p className="mb-5 leading-relaxed text-gray-600 dark:text-gray-400">{service.desc}</p>
                <Link href={service.href} className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-yellow-600 hover:text-yellow-500 dark:text-yellow-400">Voir le service <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionLabel>Une démarche lisible</SectionLabel>
              <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Avancer étape par <span className="text-yellow-500">étape</span></h2>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">Le parcours dépend du projet. Les étapes ci-dessous donnent un cadre simple pour passer d&apos;une intention à une prochaine action utile.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {steps.map((step) => (
                <article key={step.number} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 font-display text-black">{step.number}</div>
                  <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel>IRONZ au Maroc</SectionLabel>
              <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Une présence accessible à <span className="text-yellow-500">Agadir</span></h2>
              <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Pour une question sur un produit, un projet d&apos;équipement ou un service, vous pouvez consulter les pages dédiées ou contacter directement IRONZ.</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-yellow-500" aria-hidden="true" />
                  <p className="text-gray-700 dark:text-gray-300">SAHARA MALL 1ÈRE ÉTAGE C169 &amp; C120, Agadir</p>
                </div>
                <a href="tel:+212674114446" className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-gray-700 hover:border-yellow-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                  <Phone className="h-5 w-5 shrink-0 text-yellow-500" aria-hidden="true" />+212 674-114446
                </a>
                <a href="mailto:muscleironz2019@gmail.com" className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-gray-700 hover:border-yellow-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                  <Mail className="h-5 w-5 shrink-0 text-yellow-500" aria-hidden="true" />muscleironz2019@gmail.com
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-gray-950 p-7 text-white sm:p-9">
              <Dumbbell className="mb-6 h-9 w-9 text-yellow-500" aria-hidden="true" />
              <h3 className="mb-4 text-2xl font-display uppercase tracking-wide">Besoin d&apos;une orientation&nbsp;?</h3>
              <p className="mb-8 leading-relaxed text-gray-300">Décrivez votre besoin et IRONZ pourra vous orienter vers le catalogue, le service ou la page la plus pertinente.</p>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black hover:bg-yellow-400">Nous contacter <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-500 py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-5 text-3xl font-display uppercase tracking-wide text-black sm:text-4xl md:text-5xl">Construisons la suite de votre projet</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-black/75">Explorez les produits disponibles ou demandez un échange pour un projet fitness plus spécifique.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/produit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-7 py-4 font-display uppercase tracking-wide text-white hover:bg-gray-900">Voir le catalogue <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
            <Link href="/demande-devis" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-display uppercase tracking-wide text-black hover:bg-gray-100">Demander un devis <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
