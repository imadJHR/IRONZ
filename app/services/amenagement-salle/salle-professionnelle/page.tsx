import Link from "next/link";
import type { ReactNode } from "react";
import ServiceContactForm from "../../../../components/service-contact-form";

const PAGE_URL = "https://www.ironz.ma/services/amenagement-salle/salle-professionnelle";
const DEVIS_URL = "/demande-devis?service=salle-professionnelle";
const WHATSAPP_URL =
  "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20de%20salle%20de%20sport%20professionnelle%20avec%20IRONZ.";

type IconName =
  | "building"
  | "users"
  | "cardio"
  | "strength"
  | "dumbbell"
  | "zones"
  | "route"
  | "surface"
  | "maintenance"
  | "quote"
  | "check";

type Card = { icon: IconName; title: string; text: string };

const projectTypes: Card[] = [
  { icon: "building", title: "Salle commerciale", text: "Un projet ouvert à plusieurs profils d'adhérents, avec une offre d'entraînement lisible et un parc d'équipements cohérent." },
  { icon: "users", title: "Club fitness", text: "Un espace à organiser autour des habitudes des membres, des zones prioritaires et des périodes de fréquentation." },
  { icon: "building", title: "Hôtel ou résidence", text: "Une salle fitness intégrée à un établissement, pensée pour un public varié et une utilisation simple au quotidien." },
  { icon: "users", title: "Entreprise ou centre sportif", text: "Un espace multi-utilisateur qui doit concilier activités prévues, surface disponible et niveau d'équipement souhaité." },
];

const userProfiles: Card[] = [
  { icon: "users", title: "Profils variés", text: "Débutants, pratiquants réguliers et utilisateurs expérimentés n'attendent pas la même chose des zones et des machines." },
  { icon: "route", title: "Usage et fréquentation", text: "Le projet tient compte de la fréquence prévue, des moments de forte utilisation et des transitions entre activités." },
  { icon: "zones", title: "Offre d'entraînement", text: "Cardio, force, poids libres, fonctionnel ou mobilité : les priorités dépendent du concept de l'établissement." },
  { icon: "maintenance", title: "Praticité au quotidien", text: "L'accès, le rangement, l'entretien et la facilité d'utilisation comptent autant que la liste des équipements." },
];

const zones: Card[] = [
  { icon: "cardio", title: "Cardio", text: "Tapis, vélos ou elliptiques trouvent leur place selon le parcours, la visibilité, la circulation et l'usage attendu." },
  { icon: "strength", title: "Machines guidées", text: "Les postes de musculation structurent l'offre et sont répartis pour rester accessibles sans bloquer les passages." },
  { icon: "dumbbell", title: "Poids libres", text: "Bancs, racks, haltères et disques demandent une zone lisible, du rangement et une surface adaptée à la pratique." },
  { icon: "zones", title: "Fonctionnel et mobilité", text: "Une zone dégagée accueille accessoires, mouvements au sol, échauffement ou étirements selon le projet." },
  { icon: "route", title: "Circulation", text: "Les passages entre les zones restent compréhensibles afin d'éviter un espace surchargé ou difficile à exploiter." },
  { icon: "maintenance", title: "Rangement", text: "Le stockage des accessoires et consommables est prévu pour préserver l'ordre et la disponibilité des équipements." },
];

const equipmentFactors = [
  "profils utilisateurs et activités prévues",
  "surface réellement exploitable et accès aux zones",
  "fréquence et intensité d'utilisation attendues",
  "polyvalence, confort d'utilisation et cohérence du parc",
  "maintenance, rangement et disponibilité des équipements",
  "budget et périmètre réel du projet",
];

const projectSteps = [
  { title: "Définir le projet", text: "Préciser le type d'établissement, la ville, le contexte neuf ou rénovation et le périmètre recherché." },
  { title: "Comprendre les utilisateurs", text: "Identifier les profils, les activités, les habitudes d'utilisation et les priorités de l'offre fitness." },
  { title: "Étudier l'espace", text: "Lire les dimensions, accès, contraintes visibles, zones existantes et possibilités d'implantation." },
  { title: "Organiser les zones", text: "Structurer cardio, machines, poids libres, fonctionnel, mobilité, circulation et rangement." },
  { title: "Sélectionner les solutions", text: "Relier les équipements, le sol et les compléments au niveau d'usage et aux objectifs du lieu." },
  { title: "Préparer le devis", text: "Formaliser le périmètre convenu et les informations utiles à une proposition adaptée au projet." },
];

const quotePreparation = [
  "ville et type d'établissement",
  "surface utile, dimensions ou plan disponible",
  "photos et accès visibles du local",
  "profils d'utilisateurs et activités prévues",
  "zones et familles d'équipements prioritaires",
  "revêtement existant, contraintes pratiques et budget indicatif si utile",
];

const usefulLinks = [
  { href: "/services/amenagement-salle", title: "Aménagement de salle", text: "Pour revenir au cadrage global d'un projet fitness." },
  { href: "/services/amenagement-salle/home-gym", title: "Home Gym", text: "Pour un espace privé et résidentiel avec un usage personnel." },
  { href: "/services/revetement-sol-mur", title: "Revêtement sol & mur", text: "Pour approfondir les surfaces selon les zones et l'intensité d'usage." },
  { href: "/categories/equipements", title: "Équipements fitness", text: "Pour explorer les familles de matériel disponibles sur le catalogue." },
  { href: "/categories/equipements/machine-de-fitness", title: "Machines de fitness", text: "Pour découvrir les appareils pouvant composer un parc professionnel." },
  { href: "/categories/accessoires/poids-libres", title: "Poids libres", text: "Pour les haltères, barres, disques et solutions liées à la force." },
  { href: "/categories/accessoires/accessoires-de-musculation", title: "Accessoires de musculation", text: "Pour compléter l'équipement selon les usages et les zones." },
];

const faqs = [
  { question: "Comment organiser les zones d'une salle de sport professionnelle ?", answer: "On part du public, des activités et de la surface disponible pour répartir cardio, machines guidées, poids libres, fonctionnel, mobilité, rangement et circulation. L'objectif est de garder un parcours lisible et pratique." },
  { question: "Quels équipements prévoir en priorité ?", answer: "Le mix dépend du concept de l'établissement, des profils d'utilisateurs et de la fréquence d'usage. Il peut combiner cardio, machines de force, poids libres, accessoires et une zone dégagée." },
  { question: "Comment choisir les équipements selon les utilisateurs ?", answer: "Il faut considérer les niveaux de pratique, les activités proposées, les usages de pointe et la polyvalence recherchée. Il n'existe pas de composition universelle ni de capacité à calculer sans étude du projet." },
  { question: "Pourquoi prévoir le revêtement dès la conception ?", answer: "Le sol influence le confort, l'entretien, la protection du support et les contraintes liées aux équipements et aux charges. Les zones peuvent avoir des besoins différents." },
  { question: "Quelle différence avec un Home Gym ?", answer: "Un Home Gym répond à un usage privé avec une sélection souvent plus ciblée. Une salle professionnelle doit organiser un usage multi-utilisateur, une offre plus large, la circulation et une fréquence d'utilisation plus élevée." },
  { question: "Que préparer avant de demander un devis ?", answer: "Préparez la ville, la surface, les dimensions ou un plan, des photos, le type d'établissement, les utilisateurs, les activités, les équipements prioritaires et le périmètre souhaité." },
];

function ServiceIcon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    building: <><path d="M4 20V6l8-3 8 3v14" /><path d="M8 20v-5h8v5M8 9h1M12 9h1M16 9h1M8 12h1M12 12h1M16 12h1" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c1-4 4-6 6-6s5 2 6 6" /><path d="M15 11a3 3 0 1 0 0-6M17 14c2 .6 3.3 2.5 4 6" /></>,
    cardio: <><path d="M4 13h3l2-5 4 10 2-5h5" /><path d="M6 20h12" /></>,
    strength: <><path d="M7 20V9a4 4 0 0 1 8 0v11" /><path d="M5 20h12M9 13h4M9 16h4M17 8h2v12" /></>,
    dumbbell: <><path d="M5 8v8M8 7v10M16 7v10M19 8v8M8 12h8M3 10v4M21 10v4" /></>,
    zones: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="4" rx="1" /><rect x="13" y="11" width="7" height="9" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /></>,
    route: <><path d="M5 6h5a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h11" /><path d="m17 15 3 3-3 3" /></>,
    surface: <><path d="m4 17 8 4 8-4" /><path d="m4 12 8 4 8-4-8-4-8 4Z" /><path d="M12 8V3" /></>,
    maintenance: <><path d="m14 7 3-3 3 3-3 3Z" /><path d="m4 20 8-8" /><path d="M6 6h6v6H6zM15 15h5v5h-5z" /></>,
    quote: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h4M9 12h6M9 16h6" /></>,
    check: <path d="m20 6-11 11-5-5" />,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name]}</svg>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">{children}</span>;
}

function CardGrid({ cards, columns = "md:grid-cols-2 xl:grid-cols-4" }: { cards: Card[]; columns?: string }) {
  return <div className={`grid grid-cols-1 gap-6 ${columns}`}>{cards.map((card) => <article key={card.title} className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60 hover:border-yellow-500/40 transition-colors"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name={card.icon} /></div><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{card.title}</h3><p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{card.text}</p></article>)}</div>;
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.ironz.ma/services" },
    { "@type": "ListItem", position: 3, name: "Aménagement de salle", item: "https://www.ironz.ma/services/amenagement-salle" },
    { "@type": "ListItem", position: 4, name: "Salle professionnelle", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Aménagement de salle de sport professionnelle au Maroc",
  serviceType: "Aménagement de salle de sport professionnelle",
  provider: { "@type": "Organization", name: "IRONZ", url: "https://www.ironz.ma/" },
  areaServed: "Maroc",
  url: PAGE_URL,
  description: "Service d'aménagement de salle de sport professionnelle au Maroc : étude des utilisateurs et de l'espace, zonage, sélection d'équipements, revêtement et préparation du devis.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function SalleProfessionnellePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {[breadcrumbJsonLd, serviceJsonLd, faqJsonLd].map((schema) => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}

      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8"><nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Link href="/" className="hover:text-yellow-600">Accueil</Link><span aria-hidden="true">/</span><Link href="/services" className="hover:text-yellow-600">Services</Link><span aria-hidden="true">/</span><Link href="/services/amenagement-salle" className="hover:text-yellow-600">Aménagement de salle</Link><span aria-hidden="true">/</span><span aria-current="page" className="font-medium text-gray-900 dark:text-white">Salle professionnelle</span></nav></div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/5" aria-hidden="true" /><div className="absolute right-0 top-0 h-full w-1/3 -skew-x-12 bg-yellow-500/5" aria-hidden="true" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-5xl"><span className="mb-6 inline-block bg-yellow-500 px-4 py-1.5 text-xs font-black uppercase italic tracking-wider text-black">Projet fitness professionnel</span><h1 className="mb-6 text-4xl font-display uppercase leading-[0.95] tracking-wide text-white xs:text-5xl sm:text-6xl md:text-7xl">Aménagement de salle de sport <span className="text-yellow-500">professionnelle au Maroc</span></h1><p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">Un projet professionnel doit relier les utilisateurs, les activités, l'espace, le zonage et le choix du matériel. IRONZ vous aide à structurer une salle de sport multi-utilisateur, un club fitness ou un espace fitness d'établissement.</p><p className="mb-8 max-w-3xl leading-relaxed text-gray-400">Cardio, machines guidées, poids libres, fonctionnel, circulation et revêtement sont étudiés selon le périmètre convenu, sans imposer une configuration identique à chaque lieu.</p><div className="flex flex-col gap-4 sm:flex-row"><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg transition-colors hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:border-yellow-500/60 hover:text-yellow-400">Échanger sur le projet</a></div></div></div>
      </section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><SectionLabel>Projet multi-utilisateur</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Une salle professionnelle ne se résume pas aux machines</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Un projet de salle de sport professionnelle commence par le public visé, les activités proposées et la manière dont les utilisateurs vont circuler dans l'espace.</p><p>La surface, l'intensité d'utilisation, le mix d'équipements, le rangement, la maintenance et le revêtement influencent la composition du projet. Un appareil pertinent seul peut devenir peu pratique si l'implantation d'ensemble n'est pas cohérente.</p><p>Cette page concerne les projets commerciaux, hôteliers, d'entreprise, de résidence ou de centre sportif. Les contextes sont présentés comme des types de projet, pas comme des références réalisées.</p></div></div><div className="rounded-3xl border border-yellow-500/20 bg-gray-50 p-6 dark:bg-gray-900/60 sm:p-8"><h3 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">À clarifier avant le devis</h3><ul className="space-y-4">{quotePreparation.slice(0, 6).map((item) => <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30"><ServiceIcon name="check" className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" /></span><span>{item}</span></li>)}</ul></div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Types de projets</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Adapter l'aménagement au contexte du lieu</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Les objectifs et les contraintes changent selon l'établissement. Le point commun reste une organisation pensée pour plusieurs utilisateurs.</p></div><CardGrid cards={projectTypes} /></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Utilisateurs et usage</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Concevoir pour des usages différents</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Une salle professionnelle accueille rarement un seul profil. Les décisions d'équipement doivent rester liées à l'usage réel et au niveau de service attendu.</p></div><CardGrid cards={userProfiles} /></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Zonage fonctionnel</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Organiser les zones avant de remplir la salle</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Le zonage rend l'offre lisible, facilite le parcours et aide à sélectionner les équipements qui ont réellement leur place dans le projet.</p></div><CardGrid cards={zones} columns="md:grid-cols-2 xl:grid-cols-3" /></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"><div><SectionLabel>Équipement professionnel</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Composer un mix d'équipements cohérent</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Un parc professionnel peut combiner cardio, machines de force, poids libres, accessoires fonctionnels et équipements complémentaires. La composition dépend du public, de la surface, des activités et de l'intensité d'utilisation.</p><p>La polyvalence, la facilité d'entretien, le rangement et la praticité comptent autant que la famille de produit. Le budget et le périmètre du projet déterminent ensuite les priorités.</p></div><div className="mt-8 flex flex-col gap-4 sm:flex-row"><Link href="/categories/equipements" className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black hover:bg-yellow-600">Voir les équipements</Link><Link href="/categories/equipements/machine-de-fitness" className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:border-yellow-500/60 dark:border-gray-700 dark:text-white">Machines de fitness</Link></div></div><ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{equipmentFactors.map((factor) => <li key={factor} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" /><span>{factor}</span></li>)}</ul></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"><div><SectionLabel>Circulation et implantation</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Garder un espace lisible et praticable</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">L'implantation doit laisser des accès clairs entre les zones, éviter les postes qui se gênent et tenir compte de l'emplacement des équipements, du rangement et des transitions. Ces principes restent généraux : les dimensions exactes dépendent du local et des équipements retenus.</p></div><div className="rounded-3xl bg-gray-950 p-7 text-white sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="route" /></div><h3 className="mb-4 text-2xl font-display uppercase tracking-wide">Une circulation pensée avec le parc matériel</h3><p className="leading-relaxed text-gray-300">Le plan d'implantation ne doit pas être séparé de la sélection des machines. Les passages, les zones de travail et les équipements sont étudiés ensemble pour éviter une salle surchargée.</p></div></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><SectionLabel>Usage et revêtement</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Prévoir le sol selon les zones</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Une salle professionnelle peut réunir plusieurs contraintes de sol : machines, charges, déplacements, confort, entretien et usage répété. Toutes les zones ne demandent pas nécessairement la même approche.</p><p>Le revêtement est à intégrer dès la conception, sans promettre une isolation acoustique ou une performance non vérifiée.</p></div><Link href="/services/revetement-sol-mur" className="mt-8 inline-flex items-center justify-center rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white">Découvrir le revêtement sportif</Link></div><div className="rounded-3xl border border-gray-800 bg-gray-950 p-7 text-white sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="surface" /></div><h3 className="mb-4 text-2xl font-display uppercase tracking-wide text-yellow-500">Durabilité pratique</h3><p className="leading-relaxed text-gray-300">La fréquence d'utilisation influence le choix des équipements, la facilité de maintenance et les solutions de surface. Le bon niveau de robustesse se définit avec le périmètre du lieu, pas avec une promesse standard.</p></div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Process professionnel</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">De l'étude du lieu à la proposition</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Le processus avance par décisions successives. Aucune échéance ou formule standard n'est promise : le périmètre est défini avec le projet.</p></div><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{projectSteps.map((step, index) => <article key={step.title} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 sm:p-8"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 font-display text-black">{String(index + 1).padStart(2, "0")}</div><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">{step.text}</p></article>)}</div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"><div><SectionLabel>Préparer le devis</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Que préparer pour votre projet de salle professionnelle ?</h2><p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Une demande documentée aide à comprendre le lieu, l'usage et le périmètre souhaité avant de sélectionner les équipements.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link></div><ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{quotePreparation.map((item) => <li key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Choisir la bonne page</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Salle professionnelle ou Home Gym ?</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Un Home Gym répond à un usage privé et personnel. Une salle professionnelle doit gérer plusieurs utilisateurs, une offre plus large, le zonage, la circulation et une utilisation plus fréquente.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2"><Link href="/services/amenagement-salle/home-gym" className="group rounded-3xl border border-gray-100 bg-white p-7 dark:border-gray-800 dark:bg-gray-950 sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="users" /></div><h3 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Home Gym</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Pour une salle privée, une pièce dédiée, un garage ou un espace résidentiel organisé autour d'objectifs personnels.</p></Link><Link href="/services/amenagement-salle" className="group rounded-3xl border border-gray-100 bg-white p-7 dark:border-gray-800 dark:bg-gray-950 sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="building" /></div><h3 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Aménagement de salle</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Pour revenir au service parent lorsque le projet doit encore être cadré à un niveau plus général.</p></Link></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Liens utiles</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Poursuivre la préparation du projet</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Explorez uniquement les ressources utiles à la définition d'une salle professionnelle et de son parc matériel.</p></div><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{usefulLinks.map((link) => <Link key={link.href} href={link.href} className="group rounded-2xl border border-gray-100 p-6 transition-all hover:border-yellow-500/50 hover:shadow-lg dark:border-gray-800"><h3 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">{link.title}</h3><p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{link.text}</p></Link>)}</div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-12 max-w-3xl text-center"><SectionLabel>FAQ professionnelle</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Questions fréquentes sur les salles professionnelles</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Réponses pratiques pour cadrer un projet fitness multi-utilisateur.</p></div><div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">{faqs.map((faq) => <article key={faq.question} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">{faq.answer}</p></article>)}</div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div><SectionLabel>Échange projet</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Décrivez votre salle professionnelle</h2><p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Le formulaire permet de transmettre les premières informations du projet et de préciser le contexte de la demande.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white">Échanger sur WhatsApp</a></div><div className="rounded-3xl bg-gradient-to-br from-gray-900 to-black p-6 shadow-2xl sm:p-9"><h3 className="mb-4 text-2xl font-display uppercase tracking-wide text-white">Demande de <span className="text-yellow-500">devis</span></h3><p className="mb-8 leading-relaxed text-gray-300">Renseignez les éléments disponibles. Le message reste ajustable avant son envoi sur WhatsApp.</p><div className="rounded-2xl border border-white/10 bg-white/5 p-5"><ServiceContactForm service="Aménagement Salle Professionnelle" /></div></div></div></section>

      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-20"><div className="container mx-auto px-4 text-center sm:px-6 lg:px-8"><h2 className="mb-6 text-3xl font-display uppercase tracking-wide text-black sm:text-4xl md:text-5xl">Un projet fitness professionnel à structurer ?</h2><p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-black/80">Partagez le lieu, les utilisateurs, les activités et le périmètre souhaité. IRONZ vous aide à préparer une demande adaptée.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-5 font-display uppercase tracking-wide text-white shadow-2xl hover:bg-gray-900"><ServiceIcon name="quote" />Demander un devis</Link></div></section>
    </main>
  );
}
