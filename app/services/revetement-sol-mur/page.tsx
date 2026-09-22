import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import img1 from "../../../public/dalles.jpeg";
import img2 from "../../../public/pvc-optimized.webp";
import img3 from "../../../public/poly-optimized.webp";
import img4 from "../../../public/accou-optimized.webp";
import img5 from "../../../public/mir-optimized.webp";
import img6 from "../../../public/plan-optimized.webp";

const PAGE_URL = "https://www.ironz.ma/services/revetement-sol-mur";
const DEVIS_URL = "/demande-devis?service=revetement-sol-mur";
const WHATSAPP_URL =
  "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20de%20revetement%20sportif%20avec%20IRONZ.";

type IconName =
  | "layers"
  | "tile"
  | "impact"
  | "maintenance"
  | "home"
  | "outdoor"
  | "wall"
  | "dimensions"
  | "quote"
  | "check";

type SurfaceCard = { icon: IconName; title: string; text: string };
type Material = { name: string; context: string; image: StaticImageData; note: string };

const materials: Material[] = [
  { name: "Dalles caoutchouc", context: "Zones de charges et musculation", image: img1, note: "À étudier selon les charges, le support, la surface et l'intensité prévue." },
  { name: "PVC sportif", context: "Cardio, fitness et espaces polyvalents", image: img2, note: "Une solution à comparer selon la circulation, l'entretien et le type d'équipement." },
  { name: "Résine polyuréthane", context: "Espaces multifonctionnels", image: img3, note: "Le choix dépend du support existant et du périmètre de mise en œuvre." },
  { name: "Panneaux et protections murales", context: "Murs exposés et finitions", image: img4, note: "À intégrer lorsque les usages et la configuration rendent une protection pertinente." },
  { name: "Miroirs", context: "Coaching, fitness et observation du mouvement", image: img5, note: "Dimensions et emplacement sont à définir avec l'organisation de la salle." },
  { name: "Solutions sur mesure", context: "Projet à composer par zones", image: img6, note: "Plusieurs solutions peuvent être étudiées dans un même projet selon les espaces." },
];

const spaces: SurfaceCard[] = [
  { icon: "home", title: "Home Gym", text: "Protéger le sol existant, tenir compte du bruit, de l'usage de la pièce et des équipements qui pourront être ajoutés." },
  { icon: "impact", title: "Zone poids libres", text: "Relier le choix de surface aux charges, aux mouvements, au support existant et à la facilité d'entretien." },
  { icon: "tile", title: "Cardio et machines", text: "Prévoir une surface cohérente avec les appareils, les déplacements autour des postes et la circulation." },
  { icon: "layers", title: "Training fonctionnel", text: "Garder une zone lisible et confortable pour les mouvements variés, accessoires et exercices au sol." },
  { icon: "wall", title: "Protections murales", text: "Étudier les murs, miroirs ou protections lorsque l'activité, l'équipement et l'identité du lieu le justifient." },
  { icon: "outdoor", title: "Contexte terrain", text: "Pour un projet de terrain complet, le revêtement s'inscrit dans une réflexion plus large sur l'aménagement sportif." },
];

const activities: SurfaceCard[] = [
  { icon: "impact", title: "Charges et poids libres", text: "Les zones de charges demandent une réflexion sur la protection du support, les impacts, le confort et le nettoyage." },
  { icon: "tile", title: "Cardio", text: "Tapis, vélos et elliptiques impliquent de considérer la stabilité, les déplacements et l'entretien quotidien." },
  { icon: "layers", title: "Machines guidées", text: "L'implantation des appareils, leurs accès et les passages autour des postes influencent le choix de surface." },
  { icon: "home", title: "Mobilité et étirements", text: "Une zone au sol peut privilégier le confort, la propreté et une surface agréable pour les exercices de mobilité." },
];

const decisionFactors = [
  "activité et équipements prévus",
  "intensité et fréquence d'utilisation",
  "support existant et état de la surface",
  "espace intérieur ou contexte extérieur",
  "circulation, confort et contraintes de la pièce",
  "nettoyage, maintenance et projet d'évolution",
  "intégration visuelle et budget du projet",
];

const processSteps = [
  { title: "Comprendre l'espace", text: "Identifier le lieu, les dimensions disponibles, les usages et le périmètre du projet." },
  { title: "Identifier les contraintes", text: "Observer le support, les accès, l'environnement, la circulation et les équipements prévus." },
  { title: "Définir les zones", text: "Distinguer charges, cardio, machines, mobilité, circulation et éventuelles protections murales." },
  { title: "Choisir une solution", text: "Comparer les matériaux et finitions selon l'usage réel, sans appliquer une solution universelle." },
  { title: "Préparer le devis", text: "Rassembler les informations utiles et préciser la surface, le matériau souhaité et le périmètre." },
  { title: "Mise en œuvre", text: "Avancer selon la solution retenue et le périmètre convenu, sans délai standard annoncé." },
];

const quotePreparation = [
  "ville et type de lieu",
  "surface approximative, dimensions ou plan",
  "photos et état visible du support",
  "activité et équipements prévus",
  "intérieur, extérieur ou espace partagé",
  "zones prioritaires et matériau envisagé si connu",
  "périmètre souhaité et budget indicatif si utile",
];

const faqs = [
  { question: "Comment choisir un revêtement sportif ?", answer: "Il faut partir de l'activité, des équipements, du passage, du support existant, de l'entretien et du confort attendu. Une solution pertinente pour une zone de charges ne répond pas nécessairement aux besoins d'un espace cardio ou mobilité." },
  { question: "Une salle peut-elle utiliser plusieurs surfaces ?", answer: "Oui. Les besoins peuvent différer entre poids libres, machines, cardio, circulation et mobilité. Le choix se fait par zone lorsque le projet le justifie." },
  { question: "Quel sol prévoir pour une zone de poids libres ?", answer: "La surface doit être étudiée selon les charges, les mouvements, le support et le niveau d'impact prévu. Il ne faut pas promettre une isolation acoustique sans connaître la configuration du lieu." },
  { question: "Comment protéger le sol d'un Home Gym ?", answer: "Il faut regarder le sol existant, l'empreinte des équipements, les charges, le bruit, l'usage partagé de la pièce et les ajouts futurs. Le choix s'intègre idéalement à l'aménagement global." },
  { question: "Le revêtement mural fait-il partie du service ?", answer: "Les protections ou finitions murales peuvent être étudiées lorsque la configuration et les usages le rendent pertinent, notamment autour de certaines zones d'entraînement." },
  { question: "Que faut-il fournir pour obtenir un devis ?", answer: "Préparez la ville, le type de lieu, la surface, quelques photos ou un plan, l'état du support, les activités prévues, les équipements et le périmètre souhaité." },
];

function ServiceIcon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
    tile: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 12h16M12 4v16" /></>,
    impact: <><path d="M5 5v14M19 5v14M5 12h14" /><path d="m9 8 3-3 3 3M9 16l3 3 3-3" /></>,
    maintenance: <><path d="m14 7 3-3 3 3-3 3Z" /><path d="m4 20 8-8" /><path d="M6 6h6v6H6zM15 15h5v5h-5z" /></>,
    home: <><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    outdoor: <><path d="M4 20h16M6 20v-7h12v7M8 13V8h8v5M10 8V4h4v4" /></>,
    wall: <><path d="M5 4h14v16H5z" /><path d="M5 9h14M5 15h14M10 4v5M15 9v6M10 15v5" /></>,
    dimensions: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 16h8M8 8v8M16 8v8M6 12h12" /></>,
    quote: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 12h6M9 16h6" /></>,
    check: <path d="m20 6-11 11-5-5" />,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">{children}</span>;
}

function SurfaceGrid({ cards, columns = "md:grid-cols-2 xl:grid-cols-3" }: { cards: SurfaceCard[]; columns?: string }) {
  return <div className={`grid grid-cols-1 gap-6 ${columns}`}>{cards.map((card) => <article key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60 hover:border-yellow-500/40 transition-colors"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name={card.icon} /></div><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{card.title}</h3><p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{card.text}</p></article>)}</div>;
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.ironz.ma/services" },
    { "@type": "ListItem", position: 3, name: "Revêtement sol & mur", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Revêtement de sol sportif au Maroc",
  serviceType: "Revêtement sol et mur sportif",
  provider: { "@type": "Organization", name: "IRONZ", url: "https://www.ironz.ma/" },
  areaServed: "Maroc",
  url: PAGE_URL,
  description: "Service de revêtement de sol et de protections murales pour salles de sport, espaces fitness, Home Gyms et projets sportifs au Maroc.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function RevetementSolMurPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {[breadcrumbJsonLd, serviceJsonLd, faqJsonLd].map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}

      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40"><div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8"><nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Link href="/" className="hover:text-yellow-600">Accueil</Link><span aria-hidden="true">/</span><Link href="/services" className="hover:text-yellow-600">Services</Link><span aria-hidden="true">/</span><span aria-current="page" className="font-medium text-gray-900 dark:text-white">Revêtement sol &amp; mur</span></nav></div></div>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28"><div className="absolute inset-0 bg-yellow-500/5" aria-hidden="true" /><div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-yellow-500/5" aria-hidden="true" /><div className="relative container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-5xl"><span className="mb-6 inline-block bg-yellow-500 px-4 py-1.5 text-xs font-black uppercase italic tracking-wider text-black">Surface sportive sur devis</span><h1 className="mb-6 text-4xl font-display uppercase leading-[0.95] tracking-wide text-white xs:text-5xl sm:text-6xl md:text-7xl">Revêtement de sol sportif <span className="text-yellow-500">au Maroc</span></h1><p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">Le choix d'un revêtement sportif dépend de l'activité, des équipements, de la surface et de l'environnement. IRONZ accompagne les projets de salles de sport, Home Gyms, espaces fitness et zones sportives avec une réflexion par usage.</p><p className="mb-8 max-w-3xl leading-relaxed text-gray-400">Dalles caoutchouc, PVC sportif, résine, protections murales ou miroirs : chaque solution est étudiée selon le support, la circulation, l'entretien et le périmètre du projet.</p><div className="flex flex-col gap-4 sm:flex-row"><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-4 font-display uppercase tracking-wide text-white hover:border-yellow-500/60 hover:text-yellow-400">Échanger sur le projet</a></div></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><SectionLabel>Comprendre le besoin</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Le bon revêtement commence par l'usage</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Un sol sportif ne se choisit pas uniquement pour son apparence. Il doit être replacé dans la réalité de la zone : activité, équipements, passage, support existant, nettoyage et contraintes du lieu.</p><p>Une salle peut réunir plusieurs besoins. Une zone de poids libres, un espace cardio, une zone de mobilité et une circulation ne sollicitent pas nécessairement la surface de la même manière.</p><p>Le revêtement peut donc être étudié avec l'aménagement global, sans annoncer une solution universelle, une isolation acoustique garantie ou une performance non vérifiée.</p></div></div><div className="rounded-3xl border border-yellow-500/20 bg-gray-50 p-6 dark:bg-gray-900/60 sm:p-8"><h3 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">Les premières informations utiles</h3><ul className="space-y-4">{decisionFactors.slice(0, 6).map((factor) => <li key={factor} className="flex items-start gap-3 text-gray-700 dark:text-gray-300"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30"><ServiceIcon name="check" className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" /></span><span>{factor}</span></li>)}</ul></div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Types d'espaces</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Où le revêtement sportif intervient-il ?</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Le service concerne la décision de surface et de protection. Il peut compléter un projet résidentiel, professionnel ou sportif sans remplacer l'étude globale de l'espace.</p></div><SurfaceGrid cards={spaces} /></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Choix par activité</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Une surface différente selon la zone</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Le choix se raisonne avec les pratiques et les équipements. Les éléments ci-dessous servent à cadrer une discussion de projet, pas à remplacer l'étude du support ou des contraintes techniques.</p></div><SurfaceGrid cards={activities} columns="md:grid-cols-2 xl:grid-cols-4" /></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 text-center"><SectionLabel>Solutions de surface</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Comparer les familles de revêtements</h2><p className="mx-auto max-w-3xl leading-relaxed text-gray-600 dark:text-gray-400">Les familles ci-dessous donnent un aperçu des solutions à étudier. La sélection finale dépend du lieu, de la zone, du support et du périmètre convenu.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{materials.map((material) => <article key={material.name} className="overflow-hidden rounded-3xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950"><div className="relative h-56"><Image src={material.image} alt={material.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div><div className="p-6"><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="layers" className="h-6 w-6" /></div><h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{material.name}</h3><p className="mb-3 font-medium text-yellow-600 dark:text-yellow-400">{material.context}</p><p className="leading-relaxed text-gray-600 dark:text-gray-400">{material.note}</p></div></article>)}</div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"><div><SectionLabel>Facteurs de décision</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Choisir une solution cohérente avec le projet</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Le matériau, la finition et le périmètre se décident avec une vision d'ensemble. L'activité et l'équipement donnent le premier niveau de lecture, mais le support, l'entretien, le confort et le budget comptent également.</p><p>Pour une zone de charges, il faut notamment discuter de l'impact, de la protection du sol, de la circulation et des nuisances possibles sans transformer la page en étude d'ingénierie.</p></div><Link href={DEVIS_URL} className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link></div><ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{decisionFactors.map((factor) => <li key={factor} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" /><span>{factor}</span></li>)}</ul></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"><div><SectionLabel>Home Gym et salle professionnelle</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Deux contextes, des contraintes différentes</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Dans un Home Gym, le choix doit tenir compte du sol existant, de l'usage partagé de la pièce, du bruit et des futurs équipements. Dans une salle professionnelle, il faut intégrer la répétition des usages, le multi-utilisateur, les zones et la maintenance pratique.</p><div className="mt-8 flex flex-col gap-4 sm:flex-row"><Link href="/services/amenagement-salle/home-gym" className="inline-flex items-center justify-center rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white">Voir le Home Gym</Link><Link href="/services/amenagement-salle/salle-professionnelle" className="inline-flex items-center justify-center rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white">Voir la salle professionnelle</Link></div></div><div className="rounded-3xl bg-gray-950 p-7 text-white sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="maintenance" /></div><h3 className="mb-4 text-2xl font-display uppercase tracking-wide text-yellow-500">Sol et projet global</h3><p className="leading-relaxed text-gray-300">Le revêtement peut être étudié avec l'organisation d'une salle complète. Consultez le service d'<Link href="/services/amenagement-salle" className="text-yellow-400 underline underline-offset-4">aménagement de salle</Link> pour le cadrage global.</p></div></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"><div><SectionLabel>Process projet</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Comment préparer un projet de revêtement ?</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">La démarche avance par étapes, depuis la compréhension de l'espace jusqu'à la proposition adaptée au périmètre retenu.</p></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{processSteps.map((step, index) => <article key={step.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 font-display text-black">{String(index + 1).padStart(2, "0")}</div><h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3><p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{step.text}</p></article>)}</div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"><div><SectionLabel>Préparer le devis</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Que préparer pour votre projet de revêtement ?</h2><p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Ces informations permettent de comprendre le lieu et de distinguer le besoin de surface du reste du projet sportif.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link></div><ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{quotePreparation.map((item) => <li key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-12 max-w-3xl text-center"><SectionLabel>FAQ revêtement</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Questions fréquentes sur le sol sportif</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Des réponses pratiques pour avancer dans le choix d'une surface ou d'une protection.</p></div><div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">{faqs.map((faq) => <article key={faq.question} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60"><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">{faq.answer}</p></article>)}</div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div><SectionLabel>Projet terrain</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Revêtement ou terrain complet ?</h2><p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Cette page traite la décision de surface et de protection. Si votre besoin concerne la création ou l'aménagement complet d'un terrain de sport, consultez le service dédié.</p><Link href="/services/amenagement-terrains-sport" className="inline-flex items-center justify-center rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white">Aménagement de terrains de sport</Link></div><div className="rounded-3xl bg-gray-950 p-7 text-white sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="outdoor" /></div><h3 className="mb-4 text-2xl font-display uppercase tracking-wide text-yellow-500">Une distinction utile</h3><p className="leading-relaxed text-gray-300">Le revêtement répond à une question de surface. Le service terrain couvre le projet sportif dans son ensemble : implantation, équipement et aménagement du terrain.</p></div></div></section>

      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-20"><div className="container mx-auto px-4 text-center sm:px-6 lg:px-8"><h2 className="mb-6 text-3xl font-display uppercase tracking-wide text-black sm:text-4xl md:text-5xl">Un sol sportif à préparer ?</h2><p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-black/80">Partagez la surface, le lieu, les activités et les équipements prévus. IRONZ vous aide à cadrer le revêtement selon votre projet.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-5 font-display uppercase tracking-wide text-white shadow-2xl hover:bg-gray-900"><ServiceIcon name="quote" />Demander un devis</Link></div></section>
    </main>
  );
}
