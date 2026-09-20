import Link from "next/link";
import { Calendar, ClipboardCheck, Compass, Fence, MessageCircle, Ruler, Sparkles, Phone } from "lucide-react";

const CANONICAL_URL =
  "https://www.ironz.ma/services/amenagement-terrains-sport";

const WHATSAPP_URL = "https://wa.me/212674114446";

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
  serviceType: "Aménagement de terrains de sport",
  provider: {
    "@type": "Organization",
    name: "IRONZ",
    url: "https://www.ironz.ma/",
  },
  url: CANONICAL_URL,
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const projectSteps = [
  {
    icon: ClipboardCheck,
    title: "Échange & analyse du besoin",
    description:
      "Nous partons de votre projet : usage prévu, utilisateurs, surface disponible et contraintes du terrain.",
  },
  {
    icon: Compass,
    title: "Étude & configuration",
    description:
      "Étude de la configuration du terrain, des accès et des solutions envisageables, puis proposition adaptée à votre projet.",
  },
  {
    icon: Ruler,
    title: "Devis personnalisé",
    description:
      "Chaque terrain est différent : le devis est établi après étude, en fonction des choix validés ensemble.",
  },
  {
    icon: Sparkles,
    title: "Réalisation & livraison",
    description:
      "Coordination du projet jusqu'à la livraison du terrain, en lien avec l'équipement sportif dont vous avez besoin.",
  },
];

const quoteTopics = [
  "L'usage prévu du terrain et les sports à pratiquer",
  "La surface disponible et sa configuration",
  "La surface sportive envisagée",
  "Les besoins en clôture périphérique",
  "Le matériel et l'équipement à prévoir",
];

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
              IRONZ conçoit et aménage des terrains de sport sur mesure :
              étude de votre projet, choix de la surface sportive, clôture
              périphérique et équipement. Un projet pensé avec vous, du premier
              échange à la livraison.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demande-devis?service=terrain-sport"
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

      {/* Ce que comprend un projet */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-5">
              Ce que comprend un projet de{" "}
              <span className="text-yellow-500">terrain</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Un terrain de sport est un projet complet. Nous abordons chaque
              point avec vous avant d'établir un devis.
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
              Prix d'un terrain de sport :{" "}
              <span className="text-yellow-500">sur devis</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Nous ne publions pas de barème tarifaire. Le prix d'un terrain
              dépend de votre projet, et chaque projet est différent. Nous
              établissons un devis personnalisé après avoir étudié votre besoin.
            </p>
            <p className="text-gray-900 dark:text-white font-medium mb-8">
              Pour préparer votre demande, réfléchissez à :
            </p>
            <ul className="space-y-3 mb-10">
              {quoteTopics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                >
                  <span className="flex-shrink-0 w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mt-0.5">
                    <Fence className="w-3 h-3 text-yellow-600 dark:text-yellow-400" aria-hidden />
                  </span>
                  <span className="leading-relaxed">{topic}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demande-devis?service=terrain-sport"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-yellow-500 text-black font-display uppercase tracking-wide rounded-xl hover:bg-yellow-600 transition-colors shadow-lg"
              >
                <Calendar className="w-5 h-5" aria-hidden />
                Demander mon devis
              </Link>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-display uppercase tracking-wide rounded-xl hover:border-yellow-500/60 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-5 h-5" aria-hidden />
                Nous contacter
              </a>
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
              IRONZ vous accompagne aussi sur les espaces intérieurs et leurs
              revêtements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <Link
              href="/services/amenagement-salle"
              className="group block p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-yellow-500/40 hover:shadow-xl transition-all"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                Aménagement de salle de sport
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Pour les espaces intérieurs : home gym, salles professionnelles,
                hôtels et centres sportifs.
              </p>
            </Link>
            <Link
              href="/services/revetement-sol-mur"
              className="group block p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-yellow-500/40 hover:shadow-xl transition-all"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                Revêtement de sol et mur sportif
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                Pour les sols et murs des espaces sportifs couverts : dalles
                caoutchouc, PVC sportif et protections murales.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-wide text-black mb-6">
            Un projet de terrain en tête ?
          </h2>
          <p className="text-black/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Parlez-nous de votre projet : nous l'étudions et nous vous
            établissons un devis personnalisé.
          </p>
          <Link
            href="/demande-devis?service=terrain-sport"
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
