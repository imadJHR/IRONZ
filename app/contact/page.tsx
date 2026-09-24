import Link from "next/link";
import type { ReactNode } from "react";

const PHONE_HREF = "tel:+212674114446";
const PHONE_LABEL = "+212 674-114446";
const WHATSAPP_URL = "https://wa.me/212674114446";
const CONTACT_EMAIL = "info@ironz.ma";
const ADDRESS = "SAHARA MALL 1ÈRE ÉTAGE C169 & C120, Agadir";

type ContactIconName =
  | "phone"
  | "whatsapp"
  | "mail"
  | "location"
  | "store"
  | "quote"
  | "product"
  | "equipment"
  | "building"
  | "layers"
  | "custom"
  | "message"
  | "check"
  | "arrow-right";

const contactCards = [
  {
    icon: "phone" as const,
    title: "Téléphone",
    value: PHONE_LABEL,
    description: "Pour une question directe sur un produit, un service ou votre passage à Agadir.",
    href: PHONE_HREF,
    external: false,
  },
  {
    icon: "whatsapp" as const,
    title: "WhatsApp",
    value: "Écrire à IRONZ",
    description: "Démarrez une conversation et partagez les informations utiles à votre demande.",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: "mail" as const,
    title: "Email",
    value: CONTACT_EMAIL,
    description: "Envoyez une demande professionnelle ou une question nécessitant un échange par email.",
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
  {
    icon: "location" as const,
    title: "Adresse",
    value: ADDRESS,
    description: "Le point de contact IRONZ se trouve au Sahara Mall à Agadir.",
    href: null,
    external: false,
  },
];

const contactReasons = [
  {
    icon: "product" as const,
    title: "Information produit",
    text: "Une question sur une référence, une caractéristique ou le catalogue.",
  },
  {
    icon: "equipment" as const,
    title: "Équipement fitness",
    text: "Un besoin lié aux machines, accessoires ou familles d'équipements.",
  },
  {
    icon: "building" as const,
    title: "Projet de salle",
    text: "Un échange initial autour d'un Home Gym ou d'une salle professionnelle.",
  },
  {
    icon: "layers" as const,
    title: "Revêtement ou terrain",
    text: "Une question sur une surface sportive ou un projet de terrain.",
  },
  {
    icon: "custom" as const,
    title: "Personnalisation",
    text: "Un besoin de couleurs, identité visuelle ou accessoires personnalisés.",
  },
  {
    icon: "quote" as const,
    title: "Demande de devis",
    text: "Un projet précis à cadrer avec sa ville, sa surface et ses objectifs.",
  },
];

const faqItems = [
  {
    question: "Où se trouve IRONZ ?",
    answer: `IRONZ est situé à ${ADDRESS}. Contactez l'équipe avant votre visite si vous souhaitez confirmer les informations utiles à votre demande.`,
  },
  {
    question: "Comment contacter IRONZ sur WhatsApp ?",
    answer: `Utilisez le lien WhatsApp de cette page pour écrire directement au ${PHONE_LABEL}. Vous pourrez ensuite préciser votre besoin et joindre les documents disponibles.`,
  },
  {
    question: "Comment demander un devis ?",
    answer: "Pour un projet spécifique, utilisez la page Demande de devis. Elle vous aide à préparer le service, la ville, la surface et les détails utiles avant de poursuivre sur WhatsApp.",
  },
  {
    question: "Puis-je contacter IRONZ pour un projet de salle de sport ?",
    answer: "Oui. IRONZ peut être contacté pour discuter d'un Home Gym, d'une salle professionnelle, d'un revêtement, d'un terrain de sport ou d'un besoin d'équipement.",
  },
  {
    question: "Où voir les produits disponibles ?",
    answer: "Consultez la page Produits pour parcourir le catalogue, puis contactez IRONZ si vous avez une question sur une référence ou un besoin particulier.",
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
      name: "Contact",
      item: "https://www.ironz.ma/contact",
    },
  ],
};

function ContactIcon({
  name,
  className = "h-6 w-6",
}: {
  name: ContactIconName;
  className?: string;
}) {
  const paths: Record<ContactIconName, ReactNode> = {
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.7-1.4-6.6-4.3-8-8l2-2-2-4Z" />
    ),
    whatsapp: (
      <>
        <path d="M5 19.5 6.2 16A7 7 0 1 1 9 18.3z" />
        <path d="M9.5 8.5c.4 2.3 2 3.9 4.2 4.8l1.3-1.2 2 1.2c-.3 1.5-1.2 2.2-2.7 2.1-3.8-.3-7-3.5-7.4-7.2C6.7 6.8 7.4 5.9 8.8 5.6z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    store: (
      <>
        <path d="M4 10v10h16V10" />
        <path d="M3 10 5 4h14l2 6" />
        <path d="M3 10a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2M9 20v-5h6v5" />
      </>
    ),
    quote: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M15 3v5h4M9 12h6M9 16h6" />
      </>
    ),
    product: (
      <>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
      </>
    ),
    equipment: (
      <path d="M5 8v8M8 7v10M16 7v10M19 8v8M8 12h8M3 10v4M21 10v4" />
    ),
    building: (
      <>
        <path d="M4 20V6l8-3 8 3v14" />
        <path d="M8 20v-5h8v5M8 9h1M12 9h1M16 9h1M8 12h1M12 12h1M16 12h1" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    custom: (
      <>
        <path d="M12 3a9 9 0 1 0 4.6 16.7c1.5-.9 1-3.2-.8-3.2h-1.3a2 2 0 0 1 0-4H17A4 4 0 0 0 17 4a9 9 0 0 0-5-1Z" />
        <path d="M7.5 10h.01M9 6.5h.01M14 6.5h.01" />
      </>
    ),
    message: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L4 20l1.2-3.3A7.5 7.5 0 1 1 20 11.5Z" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </>
    ),
    check: <path d="m20 6-11 11-5-5" />,
    "arrow-right": <path d="M5 12h14M14 7l5 5-5 5" />,
  };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
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
    <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.22em] text-yellow-700 dark:text-yellow-400">
      {children}
    </span>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="transition-colors hover:text-yellow-700 dark:hover:text-yellow-400">
              Accueil
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-gray-950 dark:text-white">
              Contact
            </span>
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden bg-black py-16 text-white sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/[0.04]" aria-hidden="true" />
        <div className="absolute -right-24 top-8 h-64 w-64 rounded-full border-[48px] border-yellow-500/15 sm:h-80 sm:w-80" aria-hidden="true" />
        <div className="absolute -bottom-28 -left-16 h-56 w-56 rotate-12 border-[36px] border-white/[0.04]" aria-hidden="true" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] lg:gap-16">
            <div className="max-w-4xl">
              <span className="mb-6 inline-flex bg-yellow-500 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-black sm:text-sm">
                Contact IRONZ
              </span>
              <h1 className="text-4xl font-display uppercase leading-[0.95] tracking-wide text-white sm:text-5xl md:text-6xl 2xl:text-7xl">
                Contactez IRONZ à <span className="text-yellow-500">Agadir</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
                Une question sur un produit, un équipement fitness, un service ou un projet&nbsp;? Contactez directement IRONZ ou préparez une demande de devis dédiée.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
                >
                  <ContactIcon name="whatsapp" className="h-5 w-5" />
                  WhatsApp
                </a>
                <Link
                  href="/demande-devis"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:border-yellow-500 hover:text-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
                >
                  Demander un devis
                  <ContactIcon name="arrow-right" className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-gray-950 p-6 sm:p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <ContactIcon name="store" className="h-7 w-7" />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                Point de contact à Agadir
              </p>
              <address className="mt-3 not-italic text-xl font-bold leading-relaxed text-white">
                SAHARA MALL 1ÈRE ÉTAGE C169 &amp; C120, Agadir
              </address>
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                Contactez IRONZ avant votre visite pour préciser votre demande.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl sm:mb-12">
            <SectionLabel>Coordonnées</SectionLabel>
            <h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">
              Choisissez votre moyen de contact
            </h2>
            <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">
              Téléphone, WhatsApp, email ou adresse&nbsp;: utilisez le canal le plus adapté à votre question.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {contactCards.map((card) => {
              const content = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                    <ContactIcon name={card.icon} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {card.description}
                  </p>
                  <p className={`mt-5 font-semibold text-gray-950 dark:text-white ${card.title === "Email" ? "break-all" : ""}`}>
                    {card.value}
                  </p>
                </>
              );

              if (!card.href) {
                return (
                  <article key={card.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/60">
                    {content}
                  </article>
                );
              }

              return (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-colors hover:border-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-500 dark:border-gray-800 dark:bg-gray-900/60"
                >
                  {content}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-700 dark:text-yellow-400">
                    Contacter
                    <ContactIcon name="arrow-right" className="h-4 w-4" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionLabel>IRONZ à Agadir</SectionLabel>
              <h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">
                Un point de contact pour vos produits et projets fitness
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  IRONZ accueille les demandes liées aux produits, aux équipements fitness et aux projets sportifs depuis son point de contact au Sahara Mall à Agadir.
                </p>
                <p>
                  Avant de vous déplacer, vous pouvez appeler ou écrire sur WhatsApp pour expliquer votre besoin et savoir quelles informations préparer.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/produit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-400">
                  Voir les produits
                  <ContactIcon name="arrow-right" className="h-5 w-5" />
                </Link>
                <Link href="/a-propos" className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-gray-300 px-6 py-4 font-display uppercase tracking-wide text-gray-950 transition-colors hover:border-yellow-500 dark:border-gray-700 dark:text-white">
                  Découvrir IRONZ
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-black p-7 text-white sm:p-9">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <ContactIcon name="location" className="h-7 w-7" />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                Adresse vérifiée
              </p>
              <address className="mt-3 not-italic text-2xl font-display uppercase leading-tight tracking-wide text-white">
                SAHARA MALL
                <span className="mt-2 block text-yellow-500">1ÈRE ÉTAGE C169 &amp; C120</span>
                <span className="mt-2 block text-lg text-gray-300">Agadir</span>
              </address>
              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                  <ContactIcon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                  Pour une question sur un produit ou un projet, contactez IRONZ avant votre visite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <SectionLabel>Contact ou devis</SectionLabel>
            <h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">
              Utilisez le parcours adapté à votre besoin
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-gray-200 bg-gray-50 p-7 dark:border-gray-800 dark:bg-gray-900/60 sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <ContactIcon name="message" />
              </span>
              <h3 className="mt-6 text-2xl font-display uppercase tracking-wide text-gray-950 dark:text-white">
                Contact général
              </h3>
              <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">
                Pour une information produit, une question commerciale, un support ou un premier échange avec IRONZ.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 font-display uppercase tracking-wide text-white transition-colors hover:bg-gray-900 dark:bg-yellow-500 dark:text-black">
                Écrire sur WhatsApp
                <ContactIcon name="arrow-right" className="h-5 w-5" />
              </a>
            </article>

            <article className="rounded-3xl bg-black p-7 text-white sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black">
                <ContactIcon name="quote" />
              </span>
              <h3 className="mt-6 text-2xl font-display uppercase tracking-wide text-white">
                Demande de devis
              </h3>
              <p className="mt-4 leading-relaxed text-gray-300">
                Pour un projet précis nécessitant le service, la ville, la surface, les équipements et les objectifs disponibles.
              </p>
              <Link href="/demande-devis" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-400">
                Préparer mon projet
                <ContactIcon name="arrow-right" className="h-5 w-5" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl sm:mb-12">
            <SectionLabel>Pourquoi nous contacter ?</SectionLabel>
            <h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">
              Des demandes produits aux projets sportifs
            </h2>
            <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-400">
              Ces catégories vous aident à choisir entre un contact direct, les pages <Link href="/services" className="font-semibold text-yellow-700 underline decoration-yellow-500 underline-offset-4 dark:text-yellow-400">Services</Link> et une demande de devis structurée.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contactReasons.map((reason) => (
              <article key={reason.title} className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-yellow-500/50 dark:border-gray-800 dark:bg-gray-950">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-black">
                  <ContactIcon name={reason.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-gray-950 dark:text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {reason.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <SectionLabel>Questions fréquentes</SectionLabel>
            <h2 className="mt-5 text-3xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-4xl md:text-5xl">
              Contacter IRONZ simplement
            </h2>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-gray-200 bg-gray-50 open:border-yellow-500/50 open:bg-white dark:border-gray-800 dark:bg-gray-900 dark:open:bg-gray-950">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 font-bold text-gray-950 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 dark:text-white sm:px-6">
                  <span>{item.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-black transition-transform group-open:rotate-45" aria-hidden="true">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 7v10M7 12h10" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:px-6 sm:pb-6 sm:text-base">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-yellow-500 py-16 text-black md:py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl">
            Une question pour IRONZ ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/75 sm:text-lg">
            Écrivez directement sur WhatsApp ou appelez le point de contact IRONZ à Agadir.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-black px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:bg-gray-900">
              <ContactIcon name="whatsapp" className="h-5 w-5" />
              WhatsApp
            </a>
            <a href={PHONE_HREF} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-black px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white">
              <ContactIcon name="phone" className="h-5 w-5" />
              Nous appeler
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}