import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import logo from "../../../public/logo-optimized.png";
import img1 from "../../../public/acce1-optimized.webp";
import img2 from "../../../public/acce2.jpeg";
import img3 from "../../../public/acce3.jpeg";

const PAGE_URL = "https://www.ironz.ma/services/personnalisation-accessoires";
const DEVIS_URL = "/demande-devis?service=personnalisation-accessoires";
const WHATSAPP_URL =
  "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20de%20personnalisation%20d%27accessoires%20avec%20IRONZ.";

type IconName = "palette" | "badge" | "layers" | "sliders" | "product" | "brief" | "users" | "quote" | "check";
type Card = { icon: IconName; title: string; text: string };
type VisualCard = { title: string; context: string; image: StaticImageData; text: string };

const personalizationOptions: Card[] = [
  { icon: "palette", title: "Couleurs", text: "Définir une palette cohérente avec une salle, un club, une équipe ou une identité visuelle, selon le produit." },
  { icon: "badge", title: "Logo et identité", text: "Préparer un logo, un marquage ou un élément d'identification à étudier selon la surface et l'accessoire concernés." },
  { icon: "layers", title: "Finitions", text: "Préciser le rendu recherché : sobre, identifiable, coordonné ou plus marqué, sous réserve de faisabilité." },
  { icon: "sliders", title: "Configuration du projet", text: "Rassembler les options, quantités, usages et contraintes qui permettront de préparer une demande claire." },
];

const projectProfiles: Card[] = [
  { icon: "users", title: "Salles et clubs", text: "Harmoniser certains accessoires avec l'identité d'un espace d'entraînement ou d'un club." },
  { icon: "badge", title: "Entreprises et événements", text: "Étudier des accessoires identifiables pour un projet ponctuel, une animation ou un usage collectif." },
  { icon: "product", title: "Marques et associations", text: "Préparer une demande liée à une identité visuelle, toujours selon le produit et la faisabilité du projet." },
  { icon: "brief", title: "Projets sportifs", text: "Clarifier l'usage, le contexte, les accessoires concernés et le niveau de personnalisation souhaité." },
];

const compatibilityFactors: Card[] = [
  { icon: "product", title: "Type d'accessoire", text: "Les possibilités ne sont pas identiques pour chaque famille de produit. Le produit concerné doit être identifié en premier." },
  { icon: "layers", title: "Surface et finition", text: "La matière, la forme et la finition influencent les options à étudier et le rendu final possible." },
  { icon: "sliders", title: "Usage prévu", text: "Un accessoire personnel, un usage en salle et une série pour un projet collectif ne se cadrent pas de la même manière." },
  { icon: "brief", title: "Périmètre", text: "Quantité souhaitée, ville, budget indicatif et niveau de détail aident à préparer un devis pertinent." },
];

const visualExamples: VisualCard[] = [
  { title: "Accessoire fitness", context: "Couleurs et identité à étudier", image: img1, text: "Une demande peut commencer par une référence produit, une palette et un objectif d'identification." },
  { title: "Accessoire d'entraînement", context: "Projet selon le produit", image: img2, text: "Les détails visuels et les finitions sont à confirmer selon l'accessoire et son usage." },
  { title: "Série ou projet de groupe", context: "Cadrage sur devis", image: img3, text: "Pour un club, une entreprise ou une association, le contexte et le périmètre doivent être précisés." },
];

const processSteps = [
  { title: "Définir le besoin", text: "Préciser l'accessoire, l'usage et la raison de la personnalisation." },
  { title: "Identifier le produit", text: "Partager une référence, une famille d'accessoires ou une description suffisamment précise." },
  { title: "Préparer l'identité", text: "Fournir couleurs, logo, texte ou exemple visuel lorsque ces éléments sont disponibles." },
  { title: "Vérifier la faisabilité", text: "Les options sont étudiées selon le produit, la surface, la finition et le périmètre." },
  { title: "Valider les spécifications", text: "Confirmer les éléments importants avant la préparation de la proposition." },
  { title: "Préparer le devis", text: "Le devis est établi selon la demande et les options retenues, sans prix standard inventé." },
];

const quotePreparation = [
  "type d'accessoire ou référence concernée",
  "usage prévu : personnel, salle, club, événement ou équipe",
  "logo, couleurs et références visuelles si disponibles",
  "finitions ou éléments à personnaliser",
  "quantité ou périmètre du projet",
  "ville, photos et contraintes utiles",
  "budget indicatif si cela aide à cadrer la demande",
];

const faqs = [
  { question: "Quels accessoires sportifs peuvent être personnalisés ?", answer: "Le périmètre dépend du produit concerné. Une demande peut porter sur des couleurs, un logo, une finition ou un élément visuel lorsque cela est applicable et faisable pour l'accessoire choisi." },
  { question: "Peut-on ajouter un logo ?", answer: "Un logo peut être étudié selon l'accessoire, sa surface, sa matière et le rendu recherché. Il faut fournir le visuel et préciser l'emplacement souhaité." },
  { question: "Peut-on choisir les couleurs ?", answer: "Les couleurs peuvent être discutées selon le produit et les options disponibles. Une palette ou des références visuelles facilitent l'étude." },
  { question: "La personnalisation dépend-elle du produit ?", answer: "Oui. La surface, la matière, la forme, la finition et l'usage influencent les options réellement possibles. La validation se fait donc projet par projet." },
  { question: "Peut-on personnaliser une série pour une salle ou un club ?", answer: "C'est un cas de demande possible. Il faut préciser les accessoires, l'identité visuelle, la quantité souhaitée et le périmètre afin d'étudier la faisabilité." },
  { question: "Que faut-il fournir pour demander un devis ?", answer: "Indiquez le produit, l'usage, les couleurs, le logo ou visuel, les finitions souhaitées, la quantité, la ville et toute contrainte importante." },
];

function ServiceIcon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    palette: <><path d="M12 3a9 9 0 0 0 0 18h2a2 2 0 0 0 1.5-3.3 1.8 1.8 0 0 1 1.3-3.1H18a6 6 0 0 0 0-12z" /><circle cx="8" cy="10" r="1" /><circle cx="11" cy="7" r="1" /><circle cx="15" cy="8" r="1" /></>,
    badge: <><path d="M12 3 19 6v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" /><path d="m8.5 12 2.3 2.3 4.7-5" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
    sliders: <><path d="M5 6h14M5 12h14M5 18h14" /><circle cx="9" cy="6" r="2" /><circle cx="15" cy="12" r="2" /><circle cx="11" cy="18" r="2" /></>,
    product: <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M8 9h8M8 13h5M8 17h8" /></>,
    brief: <><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M9 6V4h6v2M4 11h16M10 11v2h4v-2" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c1-4 4-6 6-6s5 2 6 6" /><path d="M15 11a3 3 0 1 0 0-6M17 14c2 .6 3.3 2.5 4 6" /></>,
    quote: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 12h6M9 16h6" /></>,
    check: <path d="m20 6-11 11-5-5" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">{children}</span>;
}

function CardGrid({ cards }: { cards: Card[] }) {
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <article key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60 hover:border-yellow-500/40 transition-colors"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name={card.icon} /></div><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{card.title}</h3><p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{card.text}</p></article>)}</div>;
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.ironz.ma/services" },
    { "@type": "ListItem", position: 3, name: "Personnalisation d'accessoires", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Personnalisation d'accessoires sportifs au Maroc",
  serviceType: "Personnalisation d'équipement sportif",
  provider: { "@type": "Organization", name: "IRONZ", url: "https://www.ironz.ma/" },
  areaServed: "Maroc",
  url: PAGE_URL,
  description: "Service de personnalisation d'accessoires sportifs au Maroc : couleurs, logo, finitions et configuration visuelle selon le produit et la faisabilité du projet.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function PersonnalisationAccessoiresPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {[breadcrumbJsonLd, serviceJsonLd, faqJsonLd].map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}

      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40"><div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8"><nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Link href="/" className="hover:text-yellow-600">Accueil</Link><span aria-hidden="true">/</span><Link href="/services" className="hover:text-yellow-600">Services</Link><span aria-hidden="true">/</span><span aria-current="page" className="font-medium text-gray-900 dark:text-white">Personnalisation d'accessoires</span></nav></div></div>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28"><div className="absolute inset-0 bg-yellow-500/5" aria-hidden="true" /><div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-yellow-500/5" aria-hidden="true" /><div className="relative container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-5xl"><span className="mb-6 inline-block bg-yellow-500 px-4 py-1.5 text-xs font-black uppercase italic tracking-wider text-black">Personnalisation sur devis</span><h1 className="mb-6 text-4xl font-display uppercase leading-[0.95] tracking-wide text-white xs:text-5xl sm:text-6xl md:text-7xl">Personnalisation d'accessoires <span className="text-yellow-500">sportifs au Maroc</span></h1><p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">IRONZ vous aide à préparer un projet d'accessoires sportifs personnalisé autour d'une identité visuelle, de couleurs, d'un logo ou de finitions à étudier selon le produit concerné.</p><p className="mb-8 max-w-3xl leading-relaxed text-gray-400">Le service commence par le besoin et la compatibilité de l'accessoire. Les options, la faisabilité et le devis sont cadrés projet par projet, sans promesse de procédé ou de délai non confirmé.</p><div className="flex flex-col gap-4 sm:flex-row"><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 font-display uppercase tracking-wide text-white hover:border-yellow-500/60 hover:text-yellow-400">Échanger sur le projet</a></div></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><SectionLabel>Projet basé sur le besoin</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Personnaliser, ce n'est pas seulement ajouter un logo</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Une demande de personnalisation commence par l'accessoire, son usage et l'identité que le projet doit exprimer. Les couleurs, le logo, les finitions et les détails visuels viennent ensuite.</p><p>Le produit, sa surface, sa matière, son usage, la quantité souhaitée et le niveau de finition influencent les options à étudier. La faisabilité doit donc être vérifiée avant de promettre un rendu.</p><p>Cette page aide à préparer une demande claire pour une salle, un club, une entreprise, une association, un événement ou un projet de marque.</p></div></div><div className="rounded-3xl border border-yellow-500/20 bg-gray-50 p-6 dark:bg-gray-900/60 sm:p-8"><div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-4 dark:bg-gray-950"><Image src={logo} alt="Logo IRONZ" className="h-full w-full object-contain" /></div><h3 className="mb-5 text-center text-xl font-bold text-gray-900 dark:text-white">À clarifier avant le devis</h3><ul className="space-y-4">{quotePreparation.slice(0, 6).map((item) => <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30"><ServiceIcon name="check" className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" /></span><span>{item}</span></li>)}</ul></div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Options à étudier</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Quels éléments peuvent être personnalisés ?</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Les options ci-dessous sont des axes de discussion. Leur disponibilité dépend du produit, de la matière, de la finition et de la faisabilité du projet.</p></div><CardGrid cards={personalizationOptions} /></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Profils de projet</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">À qui ce service peut-il être utile ?</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Ces contextes sont des cas d'usage possibles, pas des références de clients ou des installations revendiquées.</p></div><CardGrid cards={projectProfiles} /></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 text-center"><SectionLabel>Exemples visuels</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Construire une identité cohérente</h2><p className="mx-auto max-w-3xl leading-relaxed text-gray-600 dark:text-gray-400">Une référence, une couleur ou un logo aide à cadrer l'intention. Le rendu final reste à confirmer selon le produit et les options disponibles.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-3">{visualExamples.map((item) => <article key={item.title} className="overflow-hidden rounded-3xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950"><div className="relative h-56"><Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div><div className="p-6"><div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="palette" className="h-6 w-6" /></div><h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3><p className="mb-3 font-medium text-yellow-600 dark:text-yellow-400">{item.context}</p><p className="leading-relaxed text-gray-600 dark:text-gray-400">{item.text}</p></div></article>)}</div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"><div><SectionLabel>Compatibilité</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Pourquoi les options dépendent-elles du produit ?</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Un accessoire n'offre pas la même surface, la même matière ou la même finition qu'un autre. La personnalisation doit rester compatible avec le produit et son usage.</p><p>Cette vérification permet de distinguer ce qui est essentiel pour l'identité visuelle de ce qui doit rester flexible jusqu'à l'étude du projet.</p></div><Link href="/categories/accessoires" className="mt-8 inline-flex items-center justify-center rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white">Explorer les accessoires</Link></div><CardGrid cards={compatibilityFactors} /></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Process personnalisation</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">De l'idée au devis</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Le projet avance par clarification successive. Aucune technologie, quantité minimale ou échéance n'est présumée avant vérification.</p></div><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{processSteps.map((step, index) => <article key={step.title} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 sm:p-8"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 font-display text-black">{String(index + 1).padStart(2, "0")}</div><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">{step.text}</p></article>)}</div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"><div><SectionLabel>Brief projet</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Que préparer pour une demande de personnalisation ?</h2><p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Un brief simple permet de comprendre l'accessoire, l'identité recherchée et le niveau de personnalisation à étudier.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link></div><ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{quotePreparation.map((item) => <li key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Catalogue et services</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Relier la personnalisation au bon projet</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Commencez par explorer les accessoires concernés, puis précisez votre demande si le projet nécessite une adaptation visuelle ou une identité de groupe.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-3"><Link href="/categories/accessoires" className="group rounded-3xl border border-gray-100 bg-white p-7 dark:border-gray-800 dark:bg-gray-950"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="product" /></div><h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Accessoires de sport</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Explorer la famille d'accessoires avant de cadrer une personnalisation.</p></Link><Link href="/categories/accessoires/poids-libres" className="group rounded-3xl border border-gray-100 bg-white p-7 dark:border-gray-800 dark:bg-gray-950"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="layers" /></div><h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Poids libres</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Voir une famille d'équipements pouvant entrer dans un projet de salle ou de club.</p></Link><Link href="/services/amenagement-salle" className="group rounded-3xl border border-gray-100 bg-white p-7 dark:border-gray-800 dark:bg-gray-950"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="brief" /></div><h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Aménagement de salle</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Pour intégrer les accessoires à un projet global d'espace fitness.</p></Link></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-12 max-w-3xl text-center"><SectionLabel>FAQ personnalisation</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Questions fréquentes sur les accessoires personnalisés</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Des réponses pour préparer une demande réaliste et exploitable.</p></div><div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">{faqs.map((faq) => <article key={faq.question} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60"><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">{faq.answer}</p></article>)}</div></div></section>

      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-20"><div className="container mx-auto px-4 text-center sm:px-6 lg:px-8"><h2 className="mb-6 text-3xl font-display uppercase tracking-wide text-black sm:text-4xl md:text-5xl">Un accessoire à personnaliser ?</h2><p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-black/80">Partagez le produit, l'identité visuelle, l'usage et les options souhaitées. IRONZ vous aide à cadrer la demande selon la faisabilité du projet.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-5 font-display uppercase tracking-wide text-white shadow-2xl hover:bg-gray-900"><ServiceIcon name="quote" />Demander un devis</Link></div></section>
    </main>
  );
}
