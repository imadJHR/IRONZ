import type { Metadata } from "next";
import Link from "next/link";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../lib/og-image";

const PAGE_URL = "https://www.ironz.ma/conditions";
const WHATSAPP_URL = "https://wa.me/212674114446";
const PHONE_HREF = "tel:+212674114446";
const PHONE_LABEL = "+212 674-114446";
const CONTACT_EMAIL = "info@ironz.ma";
const ADDRESS = "Sahara Mall 1er étage C169 & C120, Agadir";

export const metadata: Metadata = {
  title: "Conditions de vente et de service | IRONZ",
  description:
    "Conditions applicables aux commandes de produits IRONZ et aux demandes de services : prix en dirhams, paiement à la livraison, disponibilité, livraison, confirmation et projets fitness.",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Conditions de vente et de service | IRONZ",
    description:
      "Conditions applicables aux commandes de produits IRONZ et aux demandes de services au Maroc.",
    url: PAGE_URL,
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Conditions de vente et de service | IRONZ",
    description:
      "Conditions applicables aux commandes de produits IRONZ et aux demandes de services au Maroc.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

type SectionIconName =
  | "cart"
  | "price"
  | "payment"
  | "delivery"
  | "confirm"
  | "project"
  | "contact";

interface ConditionSection {
  id: string;
  icon: SectionIconName;
  title: string;
  intro?: React.ReactNode;
  blocks: { heading: string; text: React.ReactNode }[];
}

const sections: ConditionSection[] = [
  {
    id: "commandes",
    icon: "cart",
    title: "Commandes de produits",
    blocks: [
      {
        heading: "Passer une commande",
        text: (
          <>
            Les commandes passent par le panier du site puis par la page de
            paiement, qui demande les informations nécessaires à la livraison :
            nom, téléphone, adresse et ville. Le numéro de commande est généré
            après validation du formulaire.
          </>
        ),
      },
      {
        heading: "Portée de la commande",
        text: (
          <>
            La soumission du formulaire transmet votre demande à IRONZ par
            email. Une commande n’est définitivement acceptée qu’après
            confirmation avec IRONZ : disponibilité des produits, destination et
            modalités finales sont revues avec vous avant l’expédition.
          </>
        ),
      },
      {
        heading: "Avant la confirmation",
        text: (
          <>
            Pour modifier une commande, écrivez sur WhatsApp ou appelez le{" "}
            {PHONE_LABEL} dès que possible après l’avoir validée. Aucun paiement
            n’est réalisé en ligne à cette étape.
          </>
        ),
      },
    ],
  },
  {
    id: "prix",
    icon: "price",
    title: "Prix & disponibilité",
    blocks: [
      {
        heading: "Prix affichés",
        text: (
          <>
            Les prix sont indiqués en dirhams marocains (MAD) sur chaque fiche
            produit et au panier. Le prix pris en compte est celui affiché au
            moment de la commande ; la livraison est calculée séparément et
            affichée avant validation (voir la section Livraison).
          </>
        ),
      },
      {
        heading: "Disponibilité des produits",
        text: (
          <>
            L’état du stock est indiqué sur les fiches produits, mais la
            disponibilité peut évoluer. La disponibilité définitive est
            confirmée avec vous dans le cadre de la confirmation de la commande.
          </>
        ),
      },
    ],
  },
  {
    id: "paiement",
    icon: "payment",
    title: "Paiement",
    blocks: [
      {
        heading: "Paiement à la livraison",
        text: (
          <>
            Le paiement s’effectue à la livraison, en espèces, lors de la
            réception de votre commande. Aucun règlement n’est demandé en ligne
            par carte bancaire sur le site.
          </>
        ),
      },
      {
        heading: "Produits à paiement à l’avance",
        text: (
          <>
            Pour certains articles, comme les compléments et consommables, un
            paiement à l’avance est demandé. Ce paiement ne se fait pas en
            ligne par carte bancaire : IRONZ vous contacte par téléphone pour
            confirmer la commande et en expliquer les modalités avant la
            livraison.
          </>
        ),
      },
    ],
  },
  {
    id: "livraison",
    icon: "delivery",
    title: "Livraison",
    blocks: [
      {
        heading: "Livraison offerte",
        text: (
          <>
            La livraison est offerte à partir de 500 MAD de produits dans votre
            commande. En dessous de ce montant, le coût de la livraison est
            ajouté à votre total et affiché avant validation.
          </>
        ),
      },
      {
        heading: "Délais et destination",
        text: (
          <>
            Les délais dépendent du produit, du stock et de la destination.
            Aucun délai standard n’est garanti par avance : les informations de
            livraison sont confirmées avec vous avant l’expédition.
          </>
        ),
      },
    ],
  },
  {
    id: "confirmation",
    icon: "confirm",
    title: "Confirmation & suivi",
    blocks: [
      {
        heading: "Confirmation par IRONZ",
        text: (
          <>
            Après validation de votre commande, IRONZ peut vous contacter pour
            confirmer les informations de livraison, la disponibilité et les
            modalités de paiement à la livraison.
          </>
        ),
      },
      {
        heading: "Questions sur une commande",
        text: (
          <>
            Pour toute question relative à une commande, une livraison ou un
            produit, écrivez à IRONZ par WhatsApp, appelez le {PHONE_LABEL} ou
            consultez la page{" "}
            <Link
              href="/contact"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Contact
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "services",
    icon: "project",
    title: "Projets & services",
    intro: (
      <>
        Les demandes de projets (aménagement de salle, Home Gym, salle
        professionnelle, revêtement, terrain de sport, personnalisation, espace
        enfance) suivent un parcours différent des commandes de produits.
      </>
    ),
    blocks: [
      {
        heading: "De la demande au devis",
        text: (
          <>
            La page{" "}
            <Link
              href="/demande-devis"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Demande de devis
            </Link>{" "}
            prépare un message WhatsApp prérempli avec votre projet. La demande
            n’est envoyée que lorsque vous confirmez l’envoi du message dans
            WhatsApp.
          </>
        ),
      },
      {
        heading: "Périmètre et prix",
        text: (
          <>
            Le périmètre, le prix et le calendrier d’un projet dépendent des
            informations que vous partagez et de ce qui est convenu avec IRONZ
            dans le devis. Il n’existe pas de prix standard pour un projet : la
            proposition est adaptée à votre espace, vos objectifs et le matériel
            choisi.
          </>
        ),
      },
      {
        heading: "Découvrir les services",
        text: (
          <>
            Les services IRONZ sont présentés sur la page{" "}
            <Link
              href="/services"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Services
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "contact",
    icon: "contact",
    title: "Contact",
    blocks: [
      {
        heading: "Coordonnées",
        text: (
          <>
            IRONZ est joignable par téléphone au {PHONE_LABEL}, sur WhatsApp au
            même numéro, et par email à l’adresse {CONTACT_EMAIL}. Le point de
            contact se trouve au {ADDRESS}.
          </>
        ),
      },
      {
        heading: "Autres pages utiles",
        text: (
          <>
            Les réponses aux questions les plus courantes se trouvent sur la{" "}
            <Link
              href="/faq"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              FAQ
            </Link>
            , et le traitement de vos données sur la page{" "}
            <Link
              href="/confidentialite"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Politique de confidentialité
            </Link>
            .
          </>
        ),
      },
    ],
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "Conditions", item: PAGE_URL },
  ],
};

function ConditionIcon({
  name,
  className = "h-6 w-6",
}: {
  name: SectionIconName;
  className?: string;
}) {
  const paths: Record<SectionIconName, React.ReactNode> = {
    cart: (
      <>
        <path d="M3 4h2l2.2 11.2A2 2 0 0 0 9.2 17h7.8a2 2 0 0 0 2-1.6L20.5 8H6" />
        <circle cx="10" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
      </>
    ),
    price: (
      <>
        <path d="M12 3v18" />
        <path d="M16.5 7.5c0-1.4-2-2.5-4.5-2.5S7.5 6.1 7.5 7.5 9 10 12 10.5s4.5 1.1 4.5 2.5-2 2.5-4.5 2.5S7.5 14.4 7.5 13" />
      </>
    ),
    payment: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
    delivery: (
      <>
        <path d="M3 7h10v9H3z" />
        <path d="M13 10h4l4 3v3h-8z" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </>
    ),
    confirm: (
      <>
        <path d="M4 5h16v11H8l-4 4z" />
        <path d="M9 10h6M9 13h4" />
      </>
    ),
    project: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 10h16M10 10v10" />
      </>
    ),
    contact: (
      <>
        <path d="M5 19.5 6.2 16A7 7 0 1 1 9 18.3z" />
        <path d="M9.5 8.5c.4 2.3 2 3.9 4.2 4.8l1.3-1.2 2 1.2c-.3 1.5-1.2 2.2-2.7 2.1-3.8-.3-7-3.5-7.4-7.2C6.7 6.8 7.4 5.9 8.8 5.6z" />
      </>
    ),
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

export default function ConditionsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Fil d'Ariane */}
      <div className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Fil d'Ariane"
            className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <Link href="/" className="transition-colors hover:text-yellow-700 dark:hover:text-yellow-400">
              Accueil
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-gray-950 dark:text-white">
              Conditions
            </span>
          </nav>
        </div>
      </div>

      {/* Hero compact */}
      <section className="relative overflow-hidden bg-black py-14 text-white sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-yellow-500/[0.04]" aria-hidden="true" />
        <div
          className="absolute -right-24 top-8 h-64 w-64 rounded-full border-[48px] border-yellow-500/15 sm:h-80 sm:w-80"
          aria-hidden="true"
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="mb-6 inline-flex bg-yellow-500 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-black sm:text-sm">
              IRONZ
            </span>
            <h1 className="text-4xl font-display uppercase leading-[0.95] tracking-wide text-white sm:text-5xl">
              Conditions de vente <span className="text-yellow-500">et de service</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Cette page présente les conditions principales applicables aux
              commandes de produits IRONZ et aux demandes de services et de
              projets fitness au Maroc.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">
              Elle ne constitue pas un document juridique exhaustif : en cas de
              doute, contactez IRONZ pour clarifier un point avant de commander
              ou de lancer un projet.
            </p>
          </div>
        </div>
      </section>

      {/* Sommaire */}
      <div className="border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <nav aria-label="Sommaire des conditions" className="flex flex-wrap gap-3">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:border-yellow-500 hover:text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <span className="font-display text-yellow-600 dark:text-yellow-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-title`}
          className="scroll-mt-24 py-14 md:py-20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center gap-4 sm:gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-black sm:h-14 sm:w-14">
                  <ConditionIcon name={section.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <div>
                  <span className="block text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2
                    id={`${section.id}-title`}
                    className="text-2xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-3xl"
                  >
                    {section.title}
                  </h2>
                </div>
              </div>

              {section.intro ? (
                <p className="mb-8 max-w-3xl leading-relaxed text-gray-600 dark:text-gray-400">
                  {section.intro}
                </p>
              ) : null}

              <div className="space-y-4">
                {section.blocks.map((block) => (
                  <div
                    key={block.heading}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-7 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <h3 className="text-base font-bold text-gray-950 sm:text-lg dark:text-white">
                      {block.heading}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Bloc aide final */}
      <section className="bg-yellow-500 py-16 text-black md:py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl">
            Une question sur ces conditions ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/75 sm:text-lg">
            Écrivez sur WhatsApp, appelez IRONZ à Agadir, ou consultez la FAQ
            avant de commander ou de lancer un projet.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-black px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:bg-gray-900"
            >
              <ConditionIcon name="contact" className="h-5 w-5" />
              WhatsApp
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-black px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white"
            >
              Nous appeler
            </a>
            <Link
              href="/faq"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-black px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white"
            >
              Voir la FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
