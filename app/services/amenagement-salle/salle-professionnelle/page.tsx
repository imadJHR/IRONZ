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
  { icon: "building", title: "Salle commerciale", text: "Pour une création ou une réorganisation, précisez les activités proposées, les profils d'adhérents et les équipements déjà présents." },
  { icon: "users", title: "Club fitness", text: "Décrivez les pratiques des membres et les périodes d'affluence pour repérer les zones et les postes les plus sollicités." },
  { icon: "building", title: "Hôtel ou résidence", text: "Indiquez à qui l'espace sera accessible, comment il sera utilisé et quelles contraintes de bruit, de rangement ou d'accès sont à prendre en compte." },
  { icon: "users", title: "Entreprise ou centre sportif", text: "Précisez les activités, les groupes d'utilisateurs et les horaires envisagés pour expliquer les besoins d'un espace partagé." },
];

const userProfiles: Card[] = [
  { icon: "users", title: "Profils variés", text: "Débutants, pratiquants réguliers et utilisateurs expérimentés n'attendent pas la même chose des zones et des machines." },
  { icon: "route", title: "Usage et fréquentation", text: "Estimez le nombre de personnes présentes au même moment et les périodes d'affluence, en distinguant les différents groupes si nécessaire." },
  { icon: "zones", title: "Offre d'entraînement", text: "Cardio, force, poids libres, fonctionnel ou mobilité : les priorités dépendent du concept de l'établissement." },
  { icon: "maintenance", title: "Praticité au quotidien", text: "L'accès, le rangement, l'entretien et la facilité d'utilisation comptent autant que la liste des équipements." },
];

const zones: Card[] = [
  { icon: "cardio", title: "Cardio", text: "Listez les activités cardio recherchées, puis comparez les dimensions, les accès et l'usage prévu des appareils envisagés." },
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
  "conditions d'entretien et d'usage indiquées pour chaque référence",
  "budget et périmètre réel du projet",
];

const projectSteps = [
  { title: "Définir le projet", text: "Préciser le type d'établissement, la ville, le contexte neuf ou rénovation et le périmètre recherché." },
  { title: "Comprendre les utilisateurs", text: "Identifier les profils, les activités, les habitudes d'utilisation et les priorités de l'offre fitness." },
  { title: "Décrire le local", text: "Relever la surface utile, la hauteur, les accès, les obstacles et les contraintes visibles ; joindre un plan existant si disponible pendant l'échange." },
  { title: "Lister les activités par zone", text: "Distinguer cardio, machines, poids libres, fonctionnel et mobilité, avec les besoins de passage et de rangement." },
  { title: "Comparer le matériel envisagé", text: "Noter les références, dimensions et conditions d'utilisation indiquées, ainsi que les caractéristiques restant à confirmer." },
  { title: "Délimiter la demande de devis", text: "Séparer le matériel à conserver, les besoins immédiats et les ajouts ultérieurs, puis préciser les postes à discuter avec IRONZ." },
];

const quotePreparation = [
  "ville et type d'établissement",
  "surface utile estimée, hauteur et dimensions connues",
  "étage, accès, portes et obstacles visibles du local",
  "profils d'utilisateurs, affluence attendue et activités prévues",
  "zones et familles d'équipements prioritaires",
  "matériel à conserver, références et dimensions si connues",
  "état du sol et contraintes de bruit ou d'entretien",
  "budget indicatif et délai souhaité, s'ils sont connus",
];

const usefulLinks = [
  { href: "/services/amenagement-salle", title: "Aménagement de salle", text: "Pour revenir au cadrage global d'un projet fitness." },
  { href: "/services/amenagement-salle/home-gym", title: "Home Gym", text: "Pour un espace privé et résidentiel avec un usage personnel." },
  { href: "/services/revetement-sol-mur", title: "Revêtement sol & mur", text: "Pour approfondir les surfaces selon les zones et l'intensité d'usage." },
  { href: "/categories/equipements", title: "Équipements fitness", text: "Pour explorer les familles de matériel disponibles sur le catalogue." },
  { href: "/categories/equipements/machine-de-fitness", title: "Machines de fitness", text: "Pour consulter les caractéristiques des appareils et les points à confirmer selon l'usage prévu dans votre établissement." },
  { href: "/categories/accessoires/poids-libres", title: "Poids libres", text: "Pour les haltères, barres, disques et solutions liées à la force." },
  { href: "/categories/accessoires/accessoires-de-musculation", title: "Accessoires de musculation", text: "Pour compléter l'équipement selon les usages et les zones." },
];

const faqs = [
  { question: "Comment organiser les zones d'une salle de sport professionnelle ?", answer: "Décrivez les activités et le nombre de personnes susceptibles de s'entraîner au même moment. Distinguez les zones cardio, machines, poids libres et exercices au sol, puis les passages et le rangement. Pour chaque appareil envisagé, vérifiez l'espace nécessaire à son utilisation, au-delà de ses dimensions au sol." },
  { question: "Quels équipements prévoir en priorité ?", answer: "Partez des activités proposées et des postes les plus sollicités aux heures d'affluence. Listez les besoins cardio, musculation, poids libres ou fonctionnels, puis comparez les dimensions et les conditions d'utilisation indiquées pour les références envisagées. Faites confirmer leur adéquation à l'usage collectif ou intensif prévu avant de retenir une sélection." },
  { question: "Quelle surface indiquer pour préparer le devis ?", answer: "Indiquez la surface réellement disponible pour l'entraînement, en distinguant si possible l'accueil, les vestiaires et les autres espaces. Une estimation suffit pour commencer : la surface est facultative dans le formulaire. Les dimensions, la hauteur et un plan existant pourront être précisés pendant l'échange ; aucun nombre de postes ne se déduit de la surface seule." },
  { question: "Pourquoi prévoir le revêtement dès la conception ?", answer: "Le sol influence le confort, l'entretien, la protection du support et les contraintes liées aux équipements et aux charges. Les zones peuvent avoir des besoins différents." },
  { question: "Quelle différence avec un Home Gym ?", answer: "Un Home Gym répond à un usage privé avec une sélection souvent plus ciblée. Une salle professionnelle doit organiser un usage multi-utilisateur, une offre plus large, la circulation et une fréquence d'utilisation plus élevée." },
  { question: "Que préparer avant de demander un devis ?", answer: "Précisez la ville au Maroc, le type d'établissement, la surface estimée, les profils d'utilisateurs et l'affluence attendue. Ajoutez les activités, les équipements prioritaires, le matériel à conserver et les contraintes d'accès. Le budget et le délai souhaité sont facultatifs ; les photos et plans existants peuvent être partagés ensuite sur WhatsApp." },
  { question: "Peut-on mentionner du matériel déjà présent ?", answer: "Oui. Listez les appareils et accessoires que vous souhaitez conserver, avec leurs références, dimensions et état connu. Signalez aussi ce que vous envisagez de remplacer. Ces informations permettent d'expliquer les besoins complémentaires et les contraintes d'implantation dans votre demande, sans présumer de la compatibilité des équipements." },
  { question: "Faut-il avoir défini un budget avant de contacter IRONZ ?", answer: "Non. Le budget indicatif est facultatif dans le formulaire de demande de devis. Si vous connaissez une enveloppe, précisez les besoins qu'elle doit couvrir et distinguez les achats prioritaires des ajouts ultérieurs. Le montant du devis dépendra du périmètre et des références discutés pour votre projet." },
  { question: "Quelles contraintes d'accès faut-il signaler ?", answer: "Indiquez l'étage, les dimensions connues des portes et passages, les escaliers, les obstacles et les particularités du local. Des photos peuvent compléter ces informations pendant l'échange sur WhatsApp. Précisez vos besoins de mise en place dans la demande et faites confirmer le périmètre retenu dans le devis." },
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
  description: "Aménagement de salle de sport professionnelle au Maroc : cadrage des usages collectifs, de la surface, des équipements et du revêtement pour préparer la demande de devis IRONZ.",
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
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-5xl"><span className="mb-6 inline-block bg-yellow-500 px-4 py-1.5 text-xs font-black uppercase italic tracking-wider text-black">Projet fitness professionnel</span><h1 className="mb-6 text-4xl font-display uppercase leading-[0.95] tracking-wide text-white xs:text-5xl sm:text-6xl md:text-7xl">Aménagement de salle de sport <span className="text-yellow-500">professionnelle au Maroc</span></h1><p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">Vous préparez l&apos;ouverture d&apos;une salle, la réorganisation d&apos;un club ou un espace fitness partagé dans un établissement au Maroc ? Présentez à IRONZ votre local, les utilisateurs attendus et les activités prévues pour préciser les besoins d&apos;aménagement et d&apos;équipement.</p><p className="mb-8 max-w-3xl leading-relaxed text-gray-400">Pour préparer votre devis, distinguez les équipements à conserver, les achats prioritaires et les contraintes de surface, d&apos;accès et de revêtement. Le formulaire prépare un message que vous validez ensuite dans WhatsApp pour l&apos;envoyer à IRONZ.</p><div className="flex flex-col gap-4 sm:flex-row"><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg transition-colors hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:border-yellow-500/60 hover:text-yellow-400">Échanger sur le projet</a></div></div></div>
      </section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><SectionLabel>Projet multi-utilisateur</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Définir les besoins d&apos;une salle professionnelle</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Commencez par préciser s&apos;il s&apos;agit d&apos;une ouverture, d&apos;un espace existant à réorganiser ou d&apos;un complément d&apos;équipement. Indiquez les zones concernées et celles qui resteront en place.</p><p>Pour la conception d&apos;une salle de sport professionnelle, la surface utile et l&apos;affluence attendue se lisent ensemble. Distinguez les postes sollicités en même temps, les passages et le rangement avant d&apos;envisager le nombre d&apos;appareils.</p><p>Dans votre demande, précisez le type d&apos;établissement et les modalités d&apos;usage : adhérents d&apos;un club, clients d&apos;un hôtel, résidents ou salariés. Ces informations expliquent le contexte du projet et les besoins des utilisateurs.</p></div></div><div className="rounded-3xl border border-yellow-500/20 bg-gray-50 p-6 dark:bg-gray-900/60 sm:p-8"><h3 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">À clarifier avant le devis</h3><ul className="space-y-4">{quotePreparation.slice(0, 6).map((item) => <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30"><ServiceIcon name="check" className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" /></span><span>{item}</span></li>)}</ul></div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Types de projets</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Adapter l&apos;aménagement au contexte du lieu</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Les objectifs et les contraintes changent selon l&apos;établissement. Le point commun reste une organisation pensée pour plusieurs utilisateurs.</p></div><CardGrid cards={projectTypes} /></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Utilisateurs et usage</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Concevoir pour des usages différents</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Décrivez les niveaux de pratique, les horaires envisagés et les moments où plusieurs activités se dérouleront en parallèle. Si la fréquentation reste une estimation, indiquez-le : elle sert à expliquer le besoin.</p></div><CardGrid cards={userProfiles} /></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Zonage fonctionnel</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Organiser les zones avant de remplir la salle</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Repérez où se dérouleront les exercices cardio, les mouvements avec charges et les activités au sol. Conservez des passages entre les postes et identifiez les accessoires à ranger à proximité de chaque zone.</p></div><CardGrid cards={zones} columns="md:grid-cols-2 xl:grid-cols-3" /></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"><div><SectionLabel>Équipement professionnel</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Choisir le matériel selon les usages prévus</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Listez les familles nécessaires à votre offre : cardio, machines de musculation, poids libres et accessoires. Pour chaque référence envisagée, relevez les dimensions, les réglages et les conditions d&apos;utilisation indiquées dans la fiche ou la documentation disponible.</p><p>La présence d&apos;un appareil au catalogue ne confirme pas son adéquation à un usage collectif ou intensif. Faites préciser les caractéristiques manquantes, l&apos;usage prévu et les conditions applicables à la référence avant de la retenir pour votre établissement.</p></div><div className="mt-8 flex flex-col gap-4 sm:flex-row"><Link href="/categories/equipements" className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black hover:bg-yellow-600">Voir les équipements</Link><Link href="/categories/equipements/machine-de-fitness" className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:border-yellow-500/60 dark:border-gray-700 dark:text-white">Machines de fitness</Link></div></div><ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{equipmentFactors.map((factor) => <li key={factor} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" /><span>{factor}</span></li>)}</ul></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"><div><SectionLabel>Circulation et implantation</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Estimer la surface utile et décrire les accès</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Distinguez la surface d&apos;entraînement de l&apos;accueil, des vestiaires et des espaces annexes. Notez les poteaux, les portes, la hauteur disponible et le matériel déjà présent. Une estimation suffit pour le premier échange ; des dimensions et un plan existant peuvent la préciser ensuite.</p></div><div className="rounded-3xl bg-gray-950 p-7 text-white sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="route" /></div><h3 className="mb-4 text-2xl font-display uppercase tracking-wide">Dégagements et accès aux équipements</h3><p className="leading-relaxed text-gray-300">Les dimensions au sol ne décrivent pas tout l&apos;espace nécessaire pour utiliser un appareil. Vérifiez aussi les dégagements indiqués et signalez les contraintes du trajet jusqu&apos;au local : étage, escaliers, portes et passages étroits.</p></div></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><div><SectionLabel>Usage et revêtement</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Prévoir le sol selon les zones</h2><div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-400"><p>Une salle professionnelle peut réunir plusieurs contraintes de sol : machines, charges, déplacements, confort, entretien et usage répété. Toutes les zones ne demandent pas nécessairement la même approche.</p><p>Signalez l&apos;état du support, les zones accueillant des charges et les contraintes de bruit avec les espaces voisins. Ces informations aident à préciser les questions à poser sur le revêtement adapté aux usages envisagés.</p></div><Link href="/services/revetement-sol-mur" className="mt-8 inline-flex items-center justify-center rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white">Découvrir le revêtement sportif</Link></div><div className="rounded-3xl border border-gray-800 bg-gray-950 p-7 text-white sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="surface" /></div><h3 className="mb-4 text-2xl font-display uppercase tracking-wide text-yellow-500">Entretien et usage prévu</h3><p className="leading-relaxed text-gray-300">Comparez les indications d&apos;entretien du matériel et du sol. Pour un usage répété, demandez les informations manquantes sur les conditions d&apos;utilisation et l&apos;accès aux éléments à entretenir ; elles font partie des points à clarifier avant votre sélection.</p></div></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Préparer les décisions</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Les informations à réunir pour le devis</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Organisez votre demande autour des points ci-dessous. Indiquez ce qui est déjà décidé et ce qui reste à discuter avec IRONZ pour délimiter les besoins d&apos;aménagement, de matériel et de revêtement.</p></div><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{projectSteps.map((step, index) => <article key={step.title} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 sm:p-8"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 font-display text-black">{String(index + 1).padStart(2, "0")}</div><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">{step.text}</p></article>)}</div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"><div><SectionLabel>Préparer le devis</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Que préparer pour votre projet de salle professionnelle ?</h2><p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Décrivez le local et l&apos;usage avec les informations disponibles. La surface peut être approximative ; le budget et le délai souhaité sont facultatifs dans le formulaire. Séparez les besoins immédiats des ajouts envisagés plus tard. Les photos et plans existants peuvent être partagés ensuite sur WhatsApp.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black shadow-lg hover:bg-yellow-600"><ServiceIcon name="quote" className="h-5 w-5" />Demander un devis</Link></div><ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">{quotePreparation.map((item) => <li key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-500" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Usage collectif ou personnel</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Salle professionnelle ou Home Gym ?</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Cette demande concerne les usages collectifs ou commerciaux, y compris un espace partagé en résidence, en hôtel ou en entreprise. Si votre projet est une salle personnelle à domicile, les conseils Home Gym correspondent mieux à ce contexte.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2"><Link href="/services/amenagement-salle/home-gym" className="group rounded-3xl border border-gray-100 bg-white p-7 dark:border-gray-800 dark:bg-gray-950 sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="users" /></div><h3 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Home Gym</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Pour une salle privée, une pièce dédiée, un garage ou un espace résidentiel organisé autour d&apos;objectifs personnels.</p></Link><Link href="/services/amenagement-salle" className="group rounded-3xl border border-gray-100 bg-white p-7 dark:border-gray-800 dark:bg-gray-950 sm:p-9"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black"><ServiceIcon name="building" /></div><h3 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">Aménagement de salle</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">Pour préciser les besoins généraux d&apos;aménagement lorsque le type de salle ou les usages restent à définir.</p></Link></div></div></section>

      <section className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><SectionLabel>Liens utiles</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Poursuivre la préparation du projet</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Consultez les caractéristiques des équipements et les conseils de préparation avant de préciser vos priorités. Vous pouvez aussi lire l&apos;article sur <Link href="/blog/salle-sport-professionnelle-maroc" className="text-yellow-600 dark:text-yellow-400 underline underline-offset-4">l&apos;ouverture d&apos;une salle de sport professionnelle au Maroc</Link> pour préparer vos questions.</p></div><div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{usefulLinks.map((link) => <Link key={link.href} href={link.href} className="group rounded-2xl border border-gray-100 p-6 transition-all hover:border-yellow-500/50 hover:shadow-lg dark:border-gray-800"><h3 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">{link.title}</h3><p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{link.text}</p></Link>)}</div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-12 max-w-3xl text-center"><SectionLabel>FAQ professionnelle</SectionLabel><h2 className="mb-5 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Questions fréquentes sur les salles professionnelles</h2><p className="leading-relaxed text-gray-600 dark:text-gray-400">Réponses pratiques pour cadrer un projet fitness multi-utilisateur.</p></div><div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">{faqs.map((faq) => <article key={faq.question} className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"><h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3><p className="leading-relaxed text-gray-600 dark:text-gray-400">{faq.answer}</p></article>)}</div></div></section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24"><div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div><SectionLabel>Échange projet</SectionLabel><h2 className="mb-6 mt-5 text-3xl font-display uppercase tracking-wide text-gray-900 dark:text-white sm:text-4xl md:text-5xl">Décrivez votre salle professionnelle</h2><p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">Décrivez la ville, le local, l&apos;affluence attendue et les équipements prioritaires. Ce formulaire prépare un message pour le service « Aménagement Salle Professionnelle ». Relisez-le puis validez son envoi dans WhatsApp pour transmettre votre demande à IRONZ.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-yellow-500/40 px-6 py-4 font-display uppercase tracking-wide text-gray-900 hover:bg-yellow-500 hover:text-black dark:text-white">Échanger sur WhatsApp</a></div><div className="rounded-3xl bg-gradient-to-br from-gray-900 to-black p-6 shadow-2xl sm:p-9"><h3 className="mb-4 text-2xl font-display uppercase tracking-wide text-white">Demande de <span className="text-yellow-500">devis</span></h3><p className="mb-8 leading-relaxed text-gray-300">Renseignez les éléments disponibles. Le message reste ajustable avant son envoi sur WhatsApp.</p><div className="rounded-2xl border border-white/10 bg-white/5 p-5"><ServiceContactForm service="Aménagement Salle Professionnelle" /></div></div></div></section>

      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-20"><div className="container mx-auto px-4 text-center sm:px-6 lg:px-8"><h2 className="mb-6 text-3xl font-display uppercase tracking-wide text-black sm:text-4xl md:text-5xl">Un projet fitness professionnel à structurer ?</h2><p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-black/80">Précisez votre ville, la surface estimée et les besoins prioritaires. Préparez votre demande de devis pour une salle professionnelle, puis envoyez le message dans WhatsApp.</p><Link href={DEVIS_URL} className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-5 font-display uppercase tracking-wide text-white shadow-2xl hover:bg-gray-900"><ServiceIcon name="quote" />Demander un devis</Link></div></section>
    </main>
  );
}
