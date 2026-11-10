import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../lib/og-image";

import childSpaceImage from "../../../public/enfant1-optimized.webp";

const PAGE_URL = "https://www.ironz.ma/services/espace-enfance";
const PAGE_TITLE = "Aménagement d'espace enfant au Maroc | IRONZ";
const PAGE_DESCRIPTION =
  "Espace enfant sportif au Maroc : zones d'activité, organisation, équipements et surfaces selon l'usage. Devis personnalisé IRONZ.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/services/espace-enfance" },
  robots: { index: true, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

const DEVIS_URL = "/demande-devis?service=espace-enfance";
const WHATSAPP_URL =
  "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20d%27espace%20enfant%20avec%20IRONZ.";

type IconName = "activity" | "layout" | "surface" | "equipment" | "dimensions" | "route" | "users" | "brief" | "quote" | "check";
type Card = { icon: IconName; title: string; text: string };

const projectContexts: Card[] = [
  { icon: "users", title: "École ou structure d'accueil", text: "Une zone d'activité à organiser selon l'espace disponible, les activités prévues et le contexte d'encadrement." },
  { icon: "activity", title: "Centre sportif", text: "Un espace enfant intégré à un équipement sportif, avec une séparation claire des usages et des circulations." },
  { icon: "layout", title: "Hôtel ou résidence", text: "Une zone d'activité physique destinée à un public familial, à cadrer selon le lieu et le périmètre souhaité." },
  { icon: "users", title: "Club ou espace communautaire", text: "Un projet pouvant réunir mouvement, jeux encadrés et zone libre selon la configuration retenue." },
];

const spaceZones: Card[] = [
  { icon: "activity", title: "Zone de mouvement", text: "Prévoir une surface dégagée pour les activités physiques, parcours simples ou exercices au sol." },
  { icon: "equipment", title: "Zone équipements", text: "Recenser les équipements présents ou envisagés, leurs dimensions et les indications d'usage disponibles pour préciser les besoins." },
  { icon: "layout", title: "Espace libre", text: "Conserver une zone flexible permet d'adapter l'activité sans remplir toute la pièce avec du matériel." },
  { icon: "route", title: "Circulation", text: "Les transitions entre les zones doivent rester compréhensibles pour les utilisateurs et les encadrants." },
  { icon: "surface", title: "Surface", text: "Le sol se choisit avec l'activité, le support existant, le confort attendu et le niveau de sollicitation." },
  { icon: "brief", title: "Rangement", text: "Lorsque le projet le nécessite, prévoir où placer accessoires et éléments mobiles aide à garder la zone lisible." },
];

const activityFactors: Card[] = [
  { icon: "activity", title: "Mouvement et motricité", text: "Les activités prévues orientent l'espace libre, les transitions et les équipements à étudier." },
  { icon: "route", title: "Coordination et parcours", text: "Un parcours doit être replacé dans la surface disponible et dans la manière dont la zone sera utilisée." },
  { icon: "equipment", title: "Activités physiques légères", text: "Les accessoires et modules sont à sélectionner selon l'usage, le contexte et le niveau d'encadrement." },
  { icon: "layout", title: "Zone flexible", text: "Une organisation polyvalente peut faciliter l'adaptation de l'espace à plusieurs activités prévues." },
];

const equipmentFactors = [
  "activité et usage réellement prévus",
  "surface et empreinte des équipements",
  "tranches d'âge attendues et organisation d'usage décrites par la structure",
  "circulation et espace libre conservé",
  "nettoyage et maintenance de la zone",
  "possibilité d'évolution du projet",
  "budget et périmètre souhaité",
];

const processSteps = [
  { title: "Comprendre l'usage", text: "Préciser le contexte, les activités, l'encadrement et le type d'espace recherché." },
  { title: "Décrire le lieu", text: "Indiquer les dimensions connues, les accès, le sol, les obstacles et les équipements existants ; partager des photos du local pendant l'échange." },
  { title: "Définir les zones", text: "Organiser mouvement, équipements, espace libre, circulation, surface et rangement si nécessaire." },
  { title: "Préciser les solutions envisagées", text: "Identifier les références et les caractéristiques à vérifier pour les activités, le public attendu et le lieu concerné." },
  { title: "Valider le périmètre", text: "Clarifier ce qui relève de l'espace enfant, du sol, des équipements et des finitions." },
  { title: "Préparer le devis", text: "Rassembler les informations utiles à une proposition adaptée au projet." },
];

const quotePreparation = [
  "ville et type de structure",
  "surface approximative, dimensions connues et obstacles",
  "accès au lieu et installations déjà présentes",
  "usage prévu et activités souhaitées",
  "tranches d'âge attendues et organisation prévue par la structure",
  "équipements à conserver, références envisagées et zones prioritaires",
  "état du sol et contraintes pratiques",
  "périmètre, budget indicatif et délai souhaité s'ils sont connus",
];

const faqs = [
  { question: "Comment organiser un espace d'activité pour enfants ?", answer: "Décrivez le type de structure, les activités envisagées et l'organisation d'usage prévue par votre établissement. Indiquez la surface disponible, les accès, les obstacles, les équipements présents et les besoins de rangement. Ces informations permettent de discuter du projet ; les conditions techniques et les exigences applicables restent à vérifier pour le lieu et le matériel retenus." },
  { question: "Quels équipements prévoir ?", answer: "Listez le matériel à conserver et les équipements envisagés, avec leurs références, dimensions et notices si vous les avez. Faites vérifier leur adéquation aux activités et aux utilisateurs attendus à partir de leurs caractéristiques documentées et des exigences applicables au projet. Une image ou une présence au catalogue ne confirme pas un usage pour enfants ni une certification." },
  { question: "Comment choisir le revêtement ?", answer: "Précisez la nature et l'état du sol, les activités, les équipements envisagés et les besoins de nettoyage. Faites confirmer les caractéristiques nécessaires pour cette configuration à partir de données techniques. Le nom d'un matériau ou son épaisseur ne suffit pas à établir une performance de protection contre les chutes ou une conformité." },
  { question: "Faut-il préciser l'âge des utilisateurs ?", answer: "Indiquez les tranches d'âge attendues comme une information sur le public visé, en signalant si elles sont estimées. Décrivez aussi l'organisation prévue par votre structure. Ces éléments ne valident pas l'adéquation d'un équipement à ces âges : les indications du fabricant et les exigences applicables doivent être vérifiées pour la référence et le projet concernés." },
  { question: "Peut-on adapter l'espace à plusieurs activités ?", answer: "Oui, lorsque la surface et l'implantation le permettent. Il faut conserver une zone libre et choisir les équipements en fonction des usages prioritaires et de leur évolution." },
  { question: "Quelles informations fournir pour un devis ?", answer: "Indiquez la ville au Maroc, le type de structure, les dimensions estimées, les accès, le sol, les activités et les tranches d'âge attendues. Précisez les équipements existants ou envisagés et les priorités. Le budget et le délai souhaité sont facultatifs. Les boutons présélectionnent le service Espace enfance ; le formulaire prépare un message à relire et à envoyer dans WhatsApp. Vous pourrez ensuite y partager des vues du local, du sol et des accès ou un plan existant." },
];

function ServiceIcon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    activity: <><circle cx="12" cy="5" r="2" /><path d="M9 21v-6l3-3 3 3v6M12 10V7M7 13h10M5 21h14" /></>,
    layout: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="4" rx="1" /><rect x="13" y="11" width="7" height="9" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /></>,
    surface: <><path d="m4 17 8 4 8-4" /><path d="m4 12 8 4 8-4-8-4-8 4Z" /><path d="M12 8V3" /></>,
    equipment: <><rect x="5" y="6" width="14" height="9" rx="2" /><path d="M8 19h8M12 15v4M8 9h8" /></>,
    dimensions: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 16h8M8 8v8M16 8v8M6 12h12" /></>,
    route: <><path d="M5 6h5a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h11" /><path d="m17 15 3 3-3 3" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c1-4 4-6 6-6s5 2 6 6" /><path d="M15 11a3 3 0 1 0 0-6M17 14c2 .6 3.3 2.5 4 6" /></>,
    brief: <><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M9 6V4h6v2M4 11h16M10 11v2h4v-2" /></>,
    quote: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 12h6M9 16h6" /></>,
    check: <path d="m20 6-11 11-5-5" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">{children}</span>;
}

function CardGrid({ cards, columns = "md:grid-cols-2 xl:grid-cols-3" }: { cards: Card[]; columns?: string }) {
  return <div className={`grid grid-cols-1 gap-6 ${columns}`}>{cards.map((card) => <article key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60 hover:border-yellow-500/40 transition-colors"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name={card.icon} /></div><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{card.title}</h3><p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{card.text}</p></article>)}</div>;
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.ironz.ma/services" },
    { "@type": "ListItem", position: 3, name: "Espace enfance", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Aménagement d'espace enfant au Maroc",
  serviceType: "Aménagement d'espace enfant sportif",
  provider: { "@type": "Organization", name: "IRONZ", url: "https://www.ironz.ma/" },
  areaServed: "Maroc",
  url: PAGE_URL,
  description: "Service d'aménagement d'espaces enfants sportifs au Maroc : organisation, zones d'activité, équipements et surfaces selon l'usage du projet.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function EspaceEnfancePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {[breadcrumbJsonLd, serviceJsonLd, faqJsonLd].map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}

      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40"><div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8"><nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Link href="/" className="hover:text-yellow-600">Accueil</Link><span aria-hidden="true">/</span><Link href="/services" className="hover:text-yellow-600">Services</Link><span aria-hidden="true">/</span><span aria-current="page" className="font-medium text-gray-900 dark:text-white">Espace enfance</span></nav></div></div>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28"><div className="absolute inset-0 bg-yellow-500/5" aria-hidden="true" /><div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-yellow-500/5" aria-hidden="true" /><div className="relative container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-5xl"><span className="mb-6 inline-block bg-yellow-500 px-4 py-1.5 text-xs font-black uppercase italic tracking-wider text-black">Espace d'activité sur devis</span><h1 className="mb-6 text-4xl font-display uppercase leading-[0.95] tracking-wide text-white xs:text-5xl sm:text-6xl md:text-7xl">Aménagement d'espace enfant <span className="text-yellow-500">au Maroc</span></h1><p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">IRONZ accompagne les projets d'espaces destinés à l'activité physique et à la motricité des enfants : organisation des zones, équipements, circulation et surface selon l'usage prévu.</p><p className="mb-8 max-w-3xl leading-relaxed text-gray-400">Présentez le lieu, les activités et le public attendu, puis précisez les équipements présents et les besoins prioritaires. L&apos;organisation d&apos;usage prévue par votre structure et les caractéristiques du matériel sont à examiner pour ce projet.</p><div className="flex flex-col gap-4 sm:flex-row"><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 font-display uppercase tracking-wide text-white hover:border-yellow-500/60 hover:text-yellow-400">Échanger sur le projet</a></div></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><SectionLabel>Comprendre le projet</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Un espace enfant se pense autour de l'usage</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Un espace d'activité enfant ne se résume pas à installer des modules. Il faut d'abord comprendre les activités prévues, la surface disponible, la circulation et le contexte dans lequel la zone sera utilisée.</p><p>L'âge approximatif des utilisateurs, l'encadrement, les équipements, le sol, le rangement et la possibilité de faire évoluer l'espace influencent les choix du projet.</p><p>Pour préparer votre demande à IRONZ, distinguez les éléments à conserver, les besoins complémentaires et les points à faire vérifier. Le périmètre et les prestations proposés devront être précisés dans le devis.</p></div></div><div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gray-50 dark:bg-gray-900/60"><div className="relative h-64"><Image src={childSpaceImage} alt="Espace d'activité physique pour enfants" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /></div><div className="p-6 sm:p-8"><h3 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">À clarifier avant le devis</h3><ul className="space-y-4">{quotePreparation.slice(0, 6).map((item) => <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30"><ServiceIcon name="check" className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" /></span><span>{item}</span></li>)}</ul></div></div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Contextes possibles</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Adapter l'espace au lieu et à son usage</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Ces contextes sont des exemples de projets possibles. Ils ne constituent pas des références d'installations réalisées.</p></div><CardGrid cards={projectContexts} columns="md:grid-cols-2 xl:grid-cols-4" /></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Organisation de l'espace</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Créer une zone lisible et flexible</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Relevez les dimensions réellement disponibles après prise en compte du mobilier et du rangement. Indiquez les portes, les accès et les obstacles visibles. Les emplacements et dégagements nécessaires sont à vérifier selon le lieu et les équipements envisagés.</p></div><CardGrid cards={spaceZones} /></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Activités et mouvement</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Relier l'équipement à l'activité prévue</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Décrivez les activités envisagées, la manière dont l&apos;espace sera partagé et les autres usages du lieu. Identifiez le matériel déjà présent et les besoins à discuter avant d&apos;envisager de nouvelles références.</p></div><CardGrid cards={activityFactors} columns="md:grid-cols-2 xl:grid-cols-4" /></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"><div><SectionLabel>Équipements</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Identifier le matériel et les points à vérifier</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Pour chaque équipement présent ou envisagé, indiquez la référence, les dimensions et les notices disponibles. Les activités et les âges attendus décrivent votre besoin ; l&apos;adéquation du matériel doit être vérifiée à partir de ses caractéristiques documentées et des exigences applicables au projet.</p><p>Précisez les contraintes de rangement et les besoins de nettoyage. Faites confirmer les conditions d&apos;utilisation et d&apos;entretien propres aux références envisagées, ainsi que les prestations retenues pour votre demande.</p></div><Link href={DEVIS_URL} className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link></div><ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{equipmentFactors.map((factor) => <li key={factor} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" /><span>{factor}</span></li>)}</ul></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"><div><SectionLabel>Sol et confort d'usage</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Intégrer le revêtement dès le départ</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Décrivez la nature et l&apos;état du sol, les équipements envisagés et les activités. Les caractéristiques requises du revêtement et sa compatibilité avec cette configuration doivent être vérifiées à partir de données techniques, y compris les performances spécifiques recherchées.</p><Link href="/services/revetement-sol-mur" className="mt-8 inline-flex items-center justify-center rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white">Voir le revêtement sol &amp; mur</Link></div><div className="rounded-3xl bg-gray-950 p-7 text-white sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="surface" /></div><h3 className="mb-4 text-2xl font-display uppercase tracking-wide text-yellow-500">Une surface liée à l'usage</h3><p className="leading-relaxed text-gray-300">Précisez vos besoins de nettoyage et les contraintes du support. Le <Link href="/services/revetement-sol-mur" className="text-yellow-400 underline underline-offset-4">service de revêtement sol et mur</Link> aide à préparer les questions sur la surface envisagée ; les caractéristiques nécessaires restent à confirmer pour le projet enfant.</p></div></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Préparer le projet</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">De l'usage au devis</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">La préparation avance par étapes afin de relier l'activité, la surface, les équipements et le périmètre demandé.</p></div><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{processSteps.map((step, index) => <article key={step.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900 sm:p-8"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 font-display text-black">{String(index + 1).padStart(2, "0")}</div><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">{step.text}</p></article>)}</div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"><div><SectionLabel>Préparer le devis</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Que préparer pour votre projet d'espace enfant ?</h2><p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Commencez avec la ville, le type de structure, les activités, les âges attendus et les mesures disponibles. La surface peut être approximative ; le budget et le délai souhaité sont facultatifs dans le formulaire. Précisez les équipements à conserver et les besoins prioritaires.</p><p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Le bouton présélectionne le service Espace enfance. Le formulaire prépare un message à relire et à envoyer dans WhatsApp. Vous pourrez ensuite y partager des vues du local, du sol et des accès ou un plan existant pour préciser le besoin.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link></div><ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{quotePreparation.map((item) => <li key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Liens utiles</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Relier l'espace enfant au projet global</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Retrouvez les services associés pour préciser le périmètre du projet et préparer les questions sur le lieu ou le revêtement.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-3"><Link href="/services" className="group rounded-3xl border border-gray-100 bg-gray-50 p-7 dark:border-gray-800 dark:bg-gray-900"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="brief" /></div><h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Tous les services</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Revenir à la vue d'ensemble des prestations IRONZ.</p></Link><Link href="/services/amenagement-salle" className="group rounded-3xl border border-gray-100 bg-gray-50 p-7 dark:border-gray-800 dark:bg-gray-900"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="layout" /></div><h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Aménagement de salle</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Pour intégrer l'espace enfant à un projet sportif plus large.</p></Link><Link href={DEVIS_URL} className="group rounded-3xl border border-gray-100 bg-gray-50 p-7 dark:border-gray-800 dark:bg-gray-900"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="quote" /></div><h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Préparer un devis</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Transmettre les premières informations du projet.</p></Link></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-12 max-w-3xl text-center"><SectionLabel>FAQ espace enfance</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Questions fréquentes sur les espaces enfants</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Des réponses pratiques pour cadrer un projet d'activité physique et de motricité.</p></div><div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">{faqs.map((faq) => <article key={faq.question} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">{faq.answer}</p></article>)}</div></div></section>

      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-20"><div className="container mx-auto px-4 text-center sm:px-6 lg:px-8"><h2 className="mb-6 text-3xl font-display uppercase tracking-wide text-black sm:text-4xl md:text-5xl">Un espace enfant à structurer ?</h2><p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-black/80">Décrivez votre lieu, les activités et les besoins prioritaires. Préparez votre demande de devis Espace enfance, puis validez son envoi dans WhatsApp pour la transmettre à IRONZ.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-5 font-display uppercase tracking-wide text-white shadow-2xl hover:bg-gray-900"><ServiceIcon name="quote" />Demander un devis</Link></div></section>
    </main>
  );
}
