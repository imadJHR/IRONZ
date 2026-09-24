import type { Metadata } from "next";
import Link from "next/link";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../lib/og-image";

const PAGE_URL = "https://www.ironz.ma/confidentialite";
const WHATSAPP_URL = "https://wa.me/212674114446";
const PHONE_LABEL = "+212 674-114446";
const CONTACT_EMAIL = "info@ironz.ma";
const ADDRESS = "Sahara Mall 1er étage C169 & C120, Agadir";

export const metadata: Metadata = {
  title: "Politique de confidentialité | IRONZ",
  description:
    "Comment le site IRONZ traite les informations personnelles : commandes, demandes de devis, comptes et avis, données de navigation, stockage local et services externes.",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Politique de confidentialité | IRONZ",
    description:
      "Traitement des informations personnelles sur le site IRONZ : commandes, devis, comptes, avis et services externes.",
    url: PAGE_URL,
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de confidentialité | IRONZ",
    description:
      "Traitement des informations personnelles sur le site IRONZ : commandes, devis, comptes, avis et services externes.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

type SectionIconName =
  | "data"
  | "cart"
  | "quote"
  | "account"
  | "browser"
  | "external"
  | "purpose"
  | "retention"
  | "contact";

interface PrivacySection {
  id: string;
  icon: SectionIconName;
  title: string;
  intro?: React.ReactNode;
  blocks: { heading: string; text: React.ReactNode }[];
}

const sections: PrivacySection[] = [
  {
    id: "donnees",
    icon: "data",
    title: "Données traitées par le site",
    blocks: [
      {
        heading: "Périmètre de cette page",
        text: (
          <>
            Cette page décrit comment le site <strong>ironz.ma</strong> traite
            les informations personnelles que vous y saisissez. Elle ne couvre
            pas les pratiques d’éventuels partenaires ou plateformes externes
            au-delà des points mentionnés dans la section « Services externes ».
          </>
        ),
      },
      {
        heading: "Informations que vous fournissez",
        text: (
          <>
            Il s’agit des informations saisies dans les formulaires et pages du
            site : données de commande, demande de devis, demande de service,
            et contenu d’un avis produit. Le détail de chaque cas est décrit
            plus bas dans cette page.
          </>
        ),
      },
    ],
  },
  {
    id: "commandes",
    icon: "cart",
    title: "Commandes de produits",
    blocks: [
      {
        heading: "Informations collectées",
        text: (
          <>
            Lors d’une commande, le site demande votre prénom, nom, numéro de
            téléphone, adresse et ville. L’email est demandé mais reste
            facultatif. Les produits commandés, les quantités et le total de la
            commande accompagnent la demande.
          </>
        ),
      },
      {
        heading: "Devenir de la commande",
        text: (
          <>
            La commande validée est transmise à IRONZ par email afin de préparer
            le suivi, la confirmation et la livraison. Aucune base de données
            de commandes n’est enregistrée par le site dans ce flux.
          </>
        ),
      },
    ],
  },
  {
    id: "devis",
    icon: "quote",
    title: "Demandes de devis et de service",
    blocks: [
      {
        heading: "Demande de devis",
        text: (
          <>
            La page de demande de devis rassemble le type de projet, la ville,
            la surface, vos coordonnées et une description. Ces informations
            restent dans votre navigateur : le formulaire construit un message
            WhatsApp prérempli et ne transmet rien tant que vous n’avez pas
            confirmé l’envoi vous-même dans WhatsApp.
          </>
        ),
      },
      {
        heading: "Formulaires de service",
        text: (
          <>
            Les formulaires de certaines pages de service préparent eux aussi un
            message WhatsApp à partir des informations que vous renseignez
            (nom, email, téléphone, message). L’envoi n’a lieu que lorsque
            vous l’effectuez depuis WhatsApp.
          </>
        ),
      },
    ],
  },
  {
    id: "comptes",
    icon: "account",
    title: "Comptes & avis produits",
    blocks: [
      {
        heading: "Connexion au site",
        text: (
          <>
            La connexion, l’inscription et la gestion du compte sont gérées par
            Clerk, un service externe d’authentification. L’identification se
            fait directement entre vous et Clerk : IRONZ reçoit de Clerk les
            éléments nécessaires à la gestion de votre session et de votre
            compte.
          </>
        ),
      },
      {
        heading: "Avis produits",
        text: (
          <>
            Publier un avis nécessite d’être connecté. L’avis conserve une note,
            un titre, un commentaire et un nom affiché dérivé des informations
            publiques de votre compte IRONZ. La correspondance entre un avis et
            son auteur est enregistrée dans les métadonnées de votre compte
            pour permettre la modification et la suppression de{" "}
            <em>votre</em> avis.
          </>
        ),
      },
    ],
  },
  {
    id: "navigateur",
    icon: "browser",
    title: "Données de navigation",
    blocks: [
      {
        heading: "Mesure d’audience",
        text: (
          <>
            Le site charge le pixel Meta (Facebook), qui mesure la fréquentation
            des pages et certaines actions comme l’ouverture du panier ou la
            validation d’une commande. Les données générées transitent vers
            Meta, qui en dispose selon ses propres règles.
          </>
        ),
      },
      {
        heading: "Stockage local",
        text: (
          <>
            Votre navigateur enregistre localement les informations nécessaires
            au fonctionnement du site : contenu du panier, liste de favoris,
            et le code d’accès de l’espace administrateur. Ce stockage reste
            dans votre navigateur et vous pouvez l’effacer à tout moment depuis
            les réglages de celui-ci.
          </>
        ),
      },
      {
        heading: "Cookies",
        text: (
          <>
            Le site ne définit lui-même aucun cookie. Des cookies peuvent être
            déposés par les services externes qu’il utilise, notamment le pixel
            Meta et Clerk.
          </>
        ),
      },
    ],
  },
  {
    id: "services",
    icon: "external",
    title: "Services externes",
    intro: (
      <>
        Le site IRONZ s’appuie sur les services externes suivants. Chacun
        traite les données reçues selon ses propres conditions.
      </>
    ),
    blocks: [
      {
        heading: "Clerk",
        text: "Authentification et gestion des comptes utilisateurs.",
      },
      {
        heading: "Meta (Facebook Pixel)",
        text: "Mesure d’audience des pages et de certaines actions du site.",
      },
      {
        heading: "WhatsApp",
        text: (
          <>
            Canal d’échange utilisé pour les demandes de devis et les demandes
            de service : les messages que vous y envoyez relèvent alors des
            conditions de WhatsApp.
          </>
        ),
      },
      {
        heading: "Service email",
        text: (
          <>
            Transport des emails sortants du site (notamment les notifications
            de commande).
          </>
        ),
      },
      {
        heading: "Hébergement",
        text: "Hébergement du site et de ses APIs.",
      },
    ],
  },
  {
    id: "finalites",
    icon: "purpose",
    title: "Utilisation des données",
    blocks: [
      {
        heading: "Pourquoi ces données",
        text: (
          <ul className="mt-3 space-y-2.5">
            <li>traiter et confirmer une commande ;</li>
            <li>organiser la livraison et le suivi associé ;</li>
            <li>préparer l’échange autour d’un projet ou d’un devis ;</li>
            <li>créer un compte, s’y connecter et le gérer ;</li>
            <li>publier, modifier et supprimer un avis produit ;</li>
            <li>garder le panier et les favoris entre deux visites ;</li>
            <li>mesurer la fréquentation et le fonctionnement du site.</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: "conservation",
    icon: "retention",
    title: "Conservation & sécurité",
    blocks: [
      {
        heading: "Durées de conservation",
        text: (
          <>
            Le site public ne définit pas lui-même de durée de conservation
            précise pour les données traitées. Les informations qui transitent
            par les services externes (Clerk, Meta, WhatsApp, hébergement) sont
            conservées selon leurs propres règles. Pour une demande précise,
            écrivez à IRONZ aux coordonnées ci-dessous.
          </>
        ),
      },
      {
        heading: "Sécurité",
        text: (
          <>
            Aucune mesure de sécurité spécifique n’est garantie par cette page.
            Pour une question sur la protection d’une donnée particulière,
            contactez IRONZ avant de la transmettre.
          </>
        ),
      },
    ],
  },
  {
    id: "contact",
    icon: "contact",
    title: "Questions sur vos données",
    blocks: [
      {
        heading: "Comment contacter IRONZ",
        text: (
          <>
            Pour une question, une demande d’information, de modification ou de
            suppression concernant vos données, écrivez à l’adresse{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="break-all font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              {CONTACT_EMAIL}
            </a>
            , appelez le {PHONE_LABEL}, ou écrivez sur WhatsApp. Aucun délai de
            réponse n’est garanti par avance.
          </>
        ),
      },
      {
        heading: "Coordonnées",
        text: (
          <>
            IRONZ — {ADDRESS}. Téléphone {PHONE_LABEL}, WhatsApp au même numéro,
            email {CONTACT_EMAIL}. Voir aussi la page{" "}
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
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "Confidentialité", item: PAGE_URL },
  ],
};

function PrivacyIcon({
  name,
  className = "h-6 w-6",
}: {
  name: SectionIconName;
  className?: string;
}) {
  const paths: Record<SectionIconName, React.ReactNode> = {
    data: (
      <>
        <path d="M12 3c4.97 0 9 2.24 9 5s-4.03 5-9 5-9-2.24-9-5 4.03-5 9-5Z" />
        <path d="M3 12c0 2.76 4.03 5 9 5s9-2.24 9-5" />
        <path d="M3 17c0 2.76 4.03 5 9 5s9-2.24 9-5" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.2 11.2A2 2 0 0 0 9.2 17h7.8a2 2 0 0 0 2-1.6L20.5 8H6" />
        <circle cx="10" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
      </>
    ),
    quote: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M15 3v5h4M9 12h6M9 16h6" />
      </>
    ),
    account: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    browser: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
      </>
    ),
    external: (
      <>
        <path d="M12 3v8h8" />
        <path d="M12 11 19 4" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
    purpose: (
      <>
        <path d="M12 3v18" />
        <path d="M12 8 8 5M12 8l4-3" />
        <path d="M6 21h12" />
      </>
    ),
    retention: (
      <>
        <path d="M12 21a9 9 0 1 0-9-9" />
        <path d="M3 3v6h6" />
        <path d="M12 12l4 2" />
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

export default function ConfidentialitePage() {
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
              Confidentialité
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
              Politique de <span className="text-yellow-500">confidentialité</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Cette page décrit comment le site ironz.ma traite les informations
              personnelles que vous y transmettez : commandes, demandes de devis
              et de service, comptes, avis, données de navigation et services
              externes.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">
              Il s’agit d’une description factuelle des données traitées par le
              site actuel, pas d’un document juridique exhaustif.
            </p>
          </div>
        </div>
      </section>

      {/* Sommaire */}
      <div className="border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <nav aria-label="Sommaire de la politique" className="flex flex-wrap gap-3">
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
                  <PrivacyIcon name={section.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
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
                {section.blocks.map((block, indexBlock) => (
                  <div
                    key={`${section.id}-${indexBlock}`}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-7 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <h3 className="text-base font-bold text-gray-950 sm:text-lg dark:text-white">
                      {block.heading}
                    </h3>
                    <div className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
                      {block.text}
                    </div>
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
            Une question sur vos données ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/75 sm:text-lg">
            Écrivez à IRONZ par email, sur WhatsApp, ou par téléphone : toute
            demande concernant vos informations personnelles est traitée au cas
            par cas.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-black px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:bg-gray-900"
            >
              <PrivacyIcon name="contact" className="h-5 w-5" />
              Écrire à IRONZ
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-black px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white"
            >
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-black px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white"
            >
              Page Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
