import Link from "next/link";
import {
  MapPin,
  Home,
  Building2,
  Hotel,
  Dumbbell,
  Quote,
  MessageCircle,
  Check,
  ArrowRight,
  Phone,
} from "lucide-react";
import ServiceContactForm from "../../../../components/service-contact-form";
import { SITE_CONTACTS, SITE_ADDRESS } from "../../../../lib/site";

const PAGE_URL = "https://www.ironz.ma/services/amenagement-salle/agadir";
const DEVIS_URL = "/demande-devis?service=amenagement-salle&ville=Agadir";
const WHATSAPP_URL =
  "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20d%27am%C3%A9nagement%20de%20salle%20de%20sport%20%C3%A0%20Agadir%20avec%20IRONZ.";

const SHOWROOM_ADDRESS = `${SITE_ADDRESS.streetAddress}, ${SITE_ADDRESS.addressLocality}`;

const projectTypes = [
  {
    icon: Home,
    title: "Maison ou villa",
    text: "Une pièce dédiée, un garage ou une dépendance à aménager pour un usage personnel et familial.",
  },
  {
    icon: Building2,
    title: "Appartement",
    text: "Un espace compact où la surface, le bruit et le sol conditionnent le choix du matériel et du revêtement.",
  },
  {
    icon: Hotel,
    title: "Hôtel ou résidence",
    text: "Un espace fitness ouvert à des utilisateurs variés, avec des contraintes de circulation et d'usage répété.",
  },
  {
    icon: Dumbbell,
    title: "Club ou entreprise",
    text: "Un projet collectif à structurer : zones, équipements, revêtement et organisation de l'espace.",
  },
];

const steps = [
  {
    title: "Décrire le projet",
    text: "Précisez le lieu, la surface disponible, les utilisateurs et les activités prévues.",
  },
  {
    title: "Étudier l'espace",
    text: "Relevez les accès, la hauteur, le sol existant et les contraintes visibles du local.",
  },
  {
    title: "Organiser les zones",
    text: "Cardio, machines, poids libres, mobilité et circulation sont pensés ensemble.",
  },
  {
    title: "Sélectionner le matériel",
    text: "Les familles d'équipements sont choisies selon l'usage, la surface et le budget.",
  },
  {
    title: "Préparer le devis",
    text: "Le périmètre à chiffrer est clarifié avant la proposition, sans forfait standard appliqué.",
  },
];

const preparation = [
  "type de lieu et localisation à Agadir",
  "surface approximative, dimensions si vous les connaissez",
  "accès au local : étage, ascenseur, portes et passages",
  "activités et objectifs d'entraînement prévus",
  "matériel déjà présent ou familles d'équipements souhaitées",
  "état du sol et contraintes de bruit",
  "budget indicatif et calendrier souhaité, si vous les connaissez",
];

const faqs = [
  {
    question: "Peut-on voir le matériel avant de se décider ?",
    answer:
      "Oui. Le showroom IRONZ se trouve au Sahara Mall à Agadir. Vous pouvez y voir une partie du matériel et échanger sur votre projet. Appelez avant de vous déplacer pour confirmer les horaires et la disponibilité des références qui vous intéressent.",
  },
  {
    question: "Peut-on demander un devis pour un projet à Agadir ?",
    answer:
      "Oui. Le formulaire prépare une demande avec le service Aménagement de salle présélectionné et la ville indiquée. Relisez le message puis validez son envoi dans WhatsApp pour la transmettre à IRONZ.",
  },
  {
    question: "Faut-il connaître la surface exacte du local ?",
    answer:
      "Non. Une estimation suffit pour commencer. Les dimensions précises, la hauteur et les accès seront précisés pendant l'échange, avant de retenir les équipements.",
  },
  {
    question: "Le revêtement de sol peut-il être intégré au projet ?",
    answer:
      "Oui. Le sol peut être étudié avec les zones d'entraînement, les charges prévues et les contraintes du support. Les caractéristiques nécessaires restent à confirmer pour le lieu concerné.",
  },
  {
    question: "Quels équipements pour un appartement à Agadir ?",
    answer:
      "Cela dépend de la surface, du sol et des usages. Les références compactes et les poids libres demandent moins de place que les machines guidées. Les dimensions et les dégagements de chaque appareil sont à vérifier avant toute commande.",
  },
  {
    question: "Comment se passe l'intervention après la demande de devis ?",
    answer:
      "Après l'envoi de la demande, l'équipe IRONZ revient vers vous pour préciser le projet. Les prestations possibles, les conditions et le calendrier sont ensuite définis selon le périmètre retenu.",
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
    { "@type": "ListItem", position: 4, name: "Agadir", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Aménagement de salle de sport à Agadir",
  serviceType: "Aménagement de salle de sport",
  provider: { "@type": "Organization", name: "IRONZ", url: "https://www.ironz.ma/" },
  areaServed: { "@type": "City", name: "Agadir" },
  url: PAGE_URL,
  description:
    "Aménagement de salle de sport à Agadir par IRONZ : étude de l'espace, organisation des zones, sélection d'équipements et revêtement. Le périmètre et les conditions sont précisés dans le devis.",
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-800 dark:text-yellow-400">
      {children}
    </span>
  );
}

export default function AgadirPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {[breadcrumbJsonLd, serviceJsonLd, faqJsonLd].map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
            <Link href="/" className="transition-colors hover:text-yellow-600 dark:hover:text-yellow-400">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="transition-colors hover:text-yellow-600 dark:hover:text-yellow-400">Services</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services/amenagement-salle" className="transition-colors hover:text-yellow-600 dark:hover:text-yellow-400">Aménagement de salle</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-gray-900 dark:text-white">Agadir</span>
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/5" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-yellow-500/5" aria-hidden="true" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="mb-6 inline-flex items-center gap-2 bg-yellow-500 px-4 py-1.5 text-xs font-black uppercase italic tracking-wider text-black">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Salle fitness sur devis à Agadir
            </span>
            <h1 className="mb-6 text-4xl font-display uppercase leading-[0.95] tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Aménagement de salle de sport <span className="text-yellow-500">à Agadir</span>
            </h1>
            <p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
              IRONZ est basé à Agadir. Le showroom du Sahara Mall permet de voir une partie du matériel et d'échanger sur votre projet avant de le chiffrer.
            </p>
            <p className="mb-8 max-w-3xl leading-relaxed text-gray-400">
              Décrivez le lieu, la surface et les équipements recherchés. L'étude des zones, la sélection du matériel et le revêtement se préparent ensuite, selon le périmètre que vous souhaitez retenir.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={DEVIS_URL}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg transition-colors hover:bg-yellow-600"
              >
                <Quote className="h-5 w-5" aria-hidden="true" />
                Demander un devis
              </Link>
              <Link
                href="/services/amenagement-salle"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:border-yellow-500/60 hover:text-yellow-400"
              >
                <MapPin className="h-5 w-5" aria-hidden="true" />
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
              <SectionLabel>Le point de contact local</SectionLabel>
              <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                Le showroom <span className="text-yellow-700">IRONZ</span> à Agadir
              </h2>
              <div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  Le showroom est le point de contact IRONZ à Agadir. Il permet de voir une partie du matériel disponible, de comparer les formats et de poser les questions utiles avant de chiffrer un projet.
                </p>
                <p>
                  Avant de vous déplacer, appelez ou écrivez sur WhatsApp : les horaires d'ouverture et la disponibilité des références doivent être confirmés. Le showroom ne remplace pas une étude du lieu, mais il aide à préparer la demande.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${SITE_CONTACTS[0].href.replace("tel:", "")}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-4 font-display uppercase tracking-wide text-gray-900 transition-colors hover:border-yellow-500/60 hover:text-yellow-600 dark:border-gray-700 dark:text-white dark:hover:text-yellow-400"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {SITE_CONTACTS[0].label}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-600"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-yellow-500/20 bg-gray-50 p-6 dark:bg-gray-900/60 sm:p-8">
              <h3 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">Avant votre visite</h3>
              <ul className="space-y-4">
                {[
                  "appeler pour confirmer les horaires du showroom",
                  "indiquer le type de projet et la surface estimée",
                  "noter les références qui vous intéressent",
                  "préparer une photo ou un plan du local si vous en avez",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                      <Check className="h-3.5 w-3.5 text-yellow-700 dark:text-yellow-400" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-gray-200 pt-5 text-sm leading-relaxed text-gray-600 dark:border-gray-700 dark:text-gray-400">
                Adresse : {SHOWROOM_ADDRESS}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Types de projets</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Adapter l'aménagement au <span className="text-yellow-700">type de lieu</span>
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              À Agadir, les projets concernent aussi bien les maisons et les appartements que les hôtels, les résidences et les entreprises. Le type de lieu oriente les zones, le matériel et le revêtement.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {projectTypes.map((type) => (
              <article key={type.title} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                  <type.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{type.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{type.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <SectionLabel>Équipements</SectionLabel>
              <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                Choisir le matériel selon l'espace
              </h2>
              <div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  Un appareil pertinent au catalogue peut devenir peu pratique si la surface, les dégagements ou le sol ne conviennent pas. La sélection du matériel reste liée à l'usage réel du lieu et à ses contraintes.
                </p>
                <p>
                  Les {" "}
                  <Link href="/categories/equipements" className="font-medium text-yellow-700 underline underline-offset-4 dark:text-yellow-400">
                    équipements fitness
                  </Link>{" "}
                  et les {" "}
                  <Link href="/categories/accessoires/poids-libres" className="font-medium text-yellow-700 underline underline-offset-4 dark:text-yellow-400">
                    poids libres
                  </Link>{" "}
                  sont à comparer à partir de leurs dimensions et de leurs caractéristiques documentées.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/produit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-600"
                >
                  Voir le catalogue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services/revetement-sol-mur"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-4 font-display uppercase tracking-wide text-gray-900 transition-colors hover:border-yellow-500/60 hover:text-yellow-600 dark:border-gray-700 dark:text-white dark:hover:text-yellow-400"
                >
                  Revêtement sol & mur
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-gray-950 p-6 text-white sm:p-8">
              <h3 className="mb-4 text-xl font-display uppercase tracking-wide text-yellow-500">
                Le revêtement, poste à part
              </h3>
              <p className="mb-4 leading-relaxed text-gray-300">
                Le sol conditionne l'emplacement des charges, le ressenti sous les pieds, la protection du local et le niveau sonore.
              </p>
              <p className="leading-relaxed text-gray-300">
                Pour un appartement ou un immeuble, les contraintes de bruit et de charge sont à préciser avant de retenir une solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Déroulement</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Comment avance un projet à Agadir ?
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              La démarche est la même que partout au Maroc : comprendre le besoin, étudier le lieu, organiser les zones, choisir le matériel et préparer le périmètre du devis.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {steps.map((step, index) => (
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
              <SectionLabel>Préparer la demande</SectionLabel>
              <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
                Que préparer avant le devis ?
              </h2>
              <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
                Plus la description est précise, plus la proposition est adaptée. La surface peut être approximative ; le budget et le calendrier sont facultatifs.
              </p>
              <Link
                href={DEVIS_URL}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg transition-colors hover:bg-yellow-600"
              >
                <Quote className="h-5 w-5" aria-hidden="true" />
                Demander un devis
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {preparation.map((item) => (
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
          <div className="mb-12 max-w-3xl">
            <SectionLabel>Autres villes</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              IRONZ intervient aussi ailleurs au Maroc
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              L'aménagement de salle de sport se prépare de la même manière dans les autres villes. Précisez votre lieu dans la demande pour adapter l'étude au projet.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/services/amenagement-salle/casablanca"
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">Casablanca</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">Page dédiée au projet de salle à Casablanca.</p>
            </Link>
            <Link
              href="/services/amenagement-salle"
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">Rabat, Marrakech et Tanger</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Villes d'intervention : précisez votre lieu dans la demande de devis.
              </p>
            </Link>
            <Link
              href={DEVIS_URL}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <Quote className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">Demande de devis</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Le formulaire prépare un message WhatsApp à relire avant envoi.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Questions fréquentes
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Des réponses pratiques pour préparer un projet de salle de sport à Agadir.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionLabel>Échange projet</SectionLabel>
            <h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Parlez-nous de votre salle à Agadir
            </h2>
            <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
              Le formulaire prépare un message pour WhatsApp avec le contexte de votre projet. Relisez-le puis validez son envoi pour transmettre la demande.
            </p>
            <div className="space-y-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-gray-900 dark:text-white">WhatsApp</span>
                  <span className="block text-gray-600 dark:text-gray-400">Message prérempli pour votre projet de salle</span>
                </span>
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-colors hover:border-yellow-500/40 dark:border-gray-800 dark:bg-gray-900"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-gray-900 dark:text-white">Showroom et contact</span>
                  <span className="block text-gray-600 dark:text-gray-400">Sahara Mall, Agadir</span>
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
              <ServiceContactForm service="Aménagement de salle de sport Agadir" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-display uppercase tracking-wide text-black sm:text-4xl md:text-5xl">
            Un projet de salle à Agadir ?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-black/80">
            Précisez la localisation, les accès, la surface et les équipements souhaités. Échangez avec IRONZ pour cadrer le projet.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={DEVIS_URL}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-5 font-display uppercase tracking-wide text-white shadow-2xl transition-colors hover:bg-gray-900"
            >
              <Quote className="h-5 w-5" aria-hidden="true" />
              Demander un devis
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-5 font-display uppercase tracking-wide text-black shadow-2xl transition-colors hover:bg-gray-100"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
