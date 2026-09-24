import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../lib/og-image";

const PAGE_URL = "https://www.ironz.ma/faq";
const WHATSAPP_URL = "https://wa.me/212674114446";
const PHONE_HREF = "tel:+212674114446";
const PHONE_LABEL = "+212 674-114446";
const ADDRESS = "Sahara Mall 1er étage C169 & C120, Agadir";

export const metadata: Metadata = {
  title: "FAQ | Questions fréquentes | IRONZ",
  description:
    "Réponses aux questions fréquentes IRONZ : produits et disponibilité, commandes et paiement, livraison, services fitness, demande de devis et contact au Maroc.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "FAQ | Questions fréquentes | IRONZ",
    description:
      "Trouvez les réponses IRONZ sur les produits, les commandes, la livraison, les services fitness, le devis et le contact.",
    url: PAGE_URL,
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Questions fréquentes | IRONZ",
    description:
      "Trouvez les réponses IRONZ sur les produits, les commandes, la livraison, les services fitness, le devis et le contact.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

type CategoryIconName =
  | "product"
  | "payment"
  | "delivery"
  | "project"
  | "quote"
  | "contact";

interface FaqCategory {
  id: string;
  icon: CategoryIconName;
  label: string;
  title: string;
  items: { question: string; answer: React.ReactNode }[];
}

const faqCategories: FaqCategory[] = [
  {
    id: "produits",
    icon: "product",
    label: "Produits & disponibilité",
    title: "Produits & disponibilité",
    items: [
      {
        question: "Où voir les produits disponibles ?",
        answer: (
          <>
            Le{" "}
            <Link
              href="/produit"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              catalogue produits
            </Link>{" "}
            présente les équipements, accessoires et suppléments IRONZ. La
            disponibilité est indiquée sur chaque fiche produit, et le filtre
            « En stock uniquement » permet d’afficher uniquement les références
            disponibles.
          </>
        ),
      },
      {
        question: "Comment vérifier la disponibilité d’un produit ?",
        answer:
          "Chaque fiche produit affiche l’état du stock et la quantité disponible. Avant un déplacement ou une décision, vous pouvez aussi écrire à IRONZ par WhatsApp ou par téléphone pour confirmer la disponibilité d’une référence précise.",
      },
      {
        question: "Les prix affichés sont-ils à jour ?",
        answer:
          "Les prix sont indiqués en dirhams marocains (MAD) sur chaque fiche produit. Une commande est validée après confirmation des informations communiquées, ce qui permet de vérifier le prix et la disponibilité avant l’expédition.",
      },
      {
        question: "Peut-on demander conseil avant de choisir un équipement ?",
        answer: (
          <>
            Oui. Pour une question sur une référence, une caractéristique ou un
            besoin particulier, écrivez à IRONZ sur WhatsApp, par téléphone ou
            par email depuis la page{" "}
            <Link
              href="/contact"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Contact
            </Link>
            . L’équipe peut aussi vous orienter vers le service adapté à votre
            projet.
          </>
        ),
      },
    ],
  },
  {
    id: "commandes",
    icon: "payment",
    label: "Commandes & paiement",
    title: "Commandes & paiement",
    items: [
      {
        question: "Comment passer une commande ?",
        answer: (
          <>
            Ajoutez vos produits au panier, puis finalisez la commande depuis la
            page de paiement en renseignant vos informations de livraison. Une
            fois la commande reçue, IRONZ vous appelle pour la confirmer avant
            l’expédition.
          </>
        ),
      },
      {
        question: "Quels moyens de paiement sont disponibles ?",
        answer:
          "Le paiement se fait à la livraison, en espèces lors de la réception. Il n’y a pas de paiement par carte bancaire en ligne sur le site. Pour certains articles comme les compléments et consommables, un paiement à l’avance est demandé : il ne se fait pas en ligne et les modalités vous sont expliquées par téléphone avant la livraison.",
      },
      {
        question: "Peut-on commander directement via WhatsApp ?",
        answer: (
          <>
            La commande elle-même se finalise par le panier du site. WhatsApp
            sert à préciser une référence, un besoin ou un projet : pour un
            aménagement ou un projet d’espace, la page{" "}
            <Link
              href="/demande-devis"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Demande de devis
            </Link>{" "}
            prépare un message WhatsApp prérempli avec les détails utiles.
          </>
        ),
      },
      {
        question: "Comment modifier une commande avant confirmation ?",
        answer: (
          <>
            Comme chaque commande est confirmée par téléphone avec IRONZ, les
            modifications peuvent être demandées lors de cet échange. Écrivez
            vite sur WhatsApp ou appelez le {PHONE_LABEL} juste après avoir
            validé le formulaire.
          </>
        ),
      },
    ],
  },
  {
    id: "livraison",
    icon: "delivery",
    label: "Livraison",
    title: "Livraison",
    items: [
      {
        question: "Livrez-vous partout au Maroc ?",
        answer:
          "IRONZ assure la livraison au Maroc selon le produit et la destination. Les conditions exactes dépendent de la référence commandée et de votre ville : elles sont confirmées avec vous avant l’expédition.",
      },
      {
        question: "La livraison est-elle gratuite ?",
        answer:
          "La livraison est offerte à partir de 500 MAD de produits dans votre commande. En dessous, le montant de la livraison est indiqué sur la page de paiement avant validation, avec le total mis à jour.",
      },
      {
        question: "Quels sont les délais de livraison ?",
        answer:
          "Les délais dépendent du produit, du stock et de la destination. Aucun délai standard n’est promis par avance : les informations de livraison sont confirmées avec vous par téléphone avant l’expédition.",
      },
      {
        question: "Comment se passe la confirmation d’une commande ?",
        answer: (
          <>
            Après validation de votre commande, IRONZ vous appelle pour confirmer
            les produits, la disponibilité, la destination et les modalités de
            paiement à la livraison. Pour toute question sur une commande en
            cours, la page{" "}
            <Link
              href="/contact"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Contact
            </Link>{" "}
            indique les canaux disponibles.
          </>
        ),
      },
    ],
  },
  {
    id: "services",
    icon: "project",
    label: "Services & projets",
    title: "Services & projets fitness",
    items: [
      {
        question: "Quels services IRONZ propose-t-elle ?",
        answer: (
          <>
            IRONZ accompagne les projets d’espaces sportifs :{" "}
            <Link
              href="/services/amenagement-salle"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              aménagement de salle
            </Link>
            ,{" "}
            <Link
              href="/services/revetement-sol-mur"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              revêtement sol &amp; mur
            </Link>
            ,{" "}
            <Link
              href="/services/personnalisation-accessoires"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              personnalisation d’accessoires
            </Link>
            ,{" "}
            <Link
              href="/services/espace-enfance"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              espace enfance
            </Link>{" "}
            et{" "}
            <Link
              href="/services/amenagement-terrains-sport"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              terrains de sport
            </Link>
            .
          </>
        ),
      },
      {
        question: "Quelle différence entre un Home Gym et une salle professionnelle ?",
        answer: (
          <>
            Le{" "}
            <Link
              href="/services/amenagement-salle/home-gym"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Home Gym
            </Link>{" "}
            concerne un usage privé à domicile, avec une sélection compacte et
            des objectifs personnels. La{" "}
            <Link
              href="/services/amenagement-salle/salle-professionnelle"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              salle professionnelle
            </Link>{" "}
            concerne un club, une entreprise ou un hôtel, avec plusieurs profils
            d’utilisateurs, plus de circulation et un mix d’équipements plus
            large.
          </>
        ),
      },
      {
        question: "Que comprend l’aménagement d’une salle ?",
        answer:
          "Le cadrage du projet, l’organisation des zones, la sélection des équipements, le choix du revêtement et la préparation d’un devis adapté au périmètre discuté. Le périmètre réel dépend de votre espace et de vos objectifs.",
      },
      {
        question: "IRONZ installe-t-elle les équipements ?",
        answer:
          "Les prestations varient selon le produit et le projet. Ce point est précisé avec IRONZ pendant l’échange : la page Demande de devis permet de décrire votre besoin pour une réponse adaptée.",
      },
    ],
  },
  {
    id: "devis",
    icon: "quote",
    label: "Devis",
    title: "Devis",
    items: [
      {
        question: "Comment demander un devis ?",
        answer: (
          <>
            Utilisez la page{" "}
            <Link
              href="/demande-devis"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Demande de devis
            </Link>
            . Le formulaire en trois étapes prépare un message WhatsApp prérempli
            avec votre projet. Rien n’est envoyé tant que vous ne le confirmez
            pas dans WhatsApp.
          </>
        ),
      },
      {
        question: "Quelles informations préparer pour un devis ?",
        answer:
          "Le type de projet, la ville et le type de lieu, la surface ou les dimensions, le public et les objectifs, le matériel déjà disponible ou souhaité, ainsi qu’un budget indicatif si vous en avez un. Les photos ou plans peuvent être partagés ensuite sur WhatsApp.",
      },
      {
        question: "Puis-je demander un devis sans connaître la surface exacte ?",
        answer:
          "Oui. Une estimation suffit et vous pouvez laisser certains champs vides : les dimensions, les photos ou le plan se précisent pendant l’échange sur WhatsApp.",
      },
      {
        question: "Comment se poursuit l’échange après la demande ?",
        answer:
          "WhatsApp s’ouvre avec votre message prérempli. Vérifiez-le, envoyez-le, puis l’équipe IRONZ revient vers vous pour préciser le projet et le périmètre du devis.",
      },
    ],
  },
  {
    id: "contact",
    icon: "contact",
    label: "Contact",
    title: "Contact & support",
    items: [
      {
        question: "Comment contacter IRONZ ?",
        answer: (
          <>
            Par téléphone ({PHONE_LABEL}), par WhatsApp au même numéro, par
            email ou depuis la page{" "}
            <Link
              href="/contact"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              Contact
            </Link>{" "}
            qui rassemble toutes les coordonnées.
          </>
        ),
      },
      {
        question: "Où se trouve IRONZ ?",
        answer: (
          <>
            Le point de contact IRONZ se trouve au {ADDRESS}. Avant de vous
            déplacer, appelez ou écrivez sur WhatsApp pour expliquer votre
            besoin et préparer les informations utiles.
          </>
        ),
      },
      {
        question: "Puis-je écrire à IRONZ sur WhatsApp ?",
        answer: (
          <>
            Oui. WhatsApp est utilisé pour les questions produit comme pour les
            projets :{" "}
            <Link
              href="/contact"
              className="font-semibold text-yellow-700 underline decoration-yellow-500/50 underline-offset-4 hover:text-yellow-600 dark:text-yellow-400"
            >
              la page Contact
            </Link>{" "}
            donne le lien direct vers la conversation.
          </>
        ),
      },
    ],
  },
];

const allQuestions = faqCategories.flatMap((category) =>
  category.items.map((item) => ({
    question: item.question,
    answer: extractText(item.answer),
  })),
);

function extractText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma/" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: PAGE_URL },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQuestions.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

function FaqIcon({ name, className = "h-6 w-6" }: { name: CategoryIconName; className?: string }) {
  const paths: Record<CategoryIconName, React.ReactNode> = {
    product: (
      <>
        <path d="M5 8v8M8 7v10M16 7v10M19 8v8" />
        <path d="M8 12h8M3 10v4M21 10v4" />
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
    project: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 10h16M10 10v10" />
      </>
    ),
    quote: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M15 3v5h4M9 12h6M9 16h6" />
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

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
              FAQ
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-16 text-white sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-yellow-500/[0.04]" aria-hidden="true" />
        <div
          className="absolute -right-24 top-8 h-64 w-64 rounded-full border-[48px] border-yellow-500/15 sm:h-80 sm:w-80"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-28 -left-16 h-56 w-56 rotate-12 border-[36px] border-white/[0.04]"
          aria-hidden="true"
        />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="mb-6 inline-flex bg-yellow-500 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-black sm:text-sm">
              FAQ IRONZ
            </span>
            <h1 className="text-4xl font-display uppercase leading-[0.95] tracking-wide text-white sm:text-5xl md:text-6xl">
              Questions <span className="text-yellow-500">fréquentes</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
              Produits et disponibilité, commandes et paiement, livraison,
              services et projets fitness, demande de devis et contact&nbsp;:
              les réponses utiles, organisées par thème.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
              >
                <FaqIcon name="contact" className="h-5 w-5" />
                Nous contacter
              </Link>
              <Link
                href="/demande-devis"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:border-yellow-500 hover:text-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation par thème */}
      <div className="border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <nav aria-label="Thèmes de la FAQ" className="flex flex-wrap gap-3">
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:border-yellow-500 hover:text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <FaqIcon
                  name={category.icon}
                  className="h-4 w-4 text-yellow-600 dark:text-yellow-400"
                />
                {category.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Sections FAQ */}
      {faqCategories.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          aria-labelledby={`${category.id}-title`}
          className="scroll-mt-24 py-14 md:py-20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center gap-4 sm:gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-black sm:h-14 sm:w-14">
                  <FaqIcon name={category.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <div>
                  <span className="block text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2
                    id={`${category.id}-title`}
                    className="text-2xl font-display uppercase leading-tight tracking-wide text-gray-950 dark:text-white sm:text-3xl"
                  >
                    {category.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {category.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-gray-200 bg-gray-50 open:border-yellow-500/50 open:bg-white dark:border-gray-800 dark:bg-gray-900 dark:open:bg-gray-950"
                  >
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 font-bold text-gray-950 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 dark:text-white sm:px-6">
                      <span>{item.question}</span>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-black transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M12 7v10M7 12h10" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:px-6 sm:pb-6 sm:text-base">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Bloc support final */}
      <section className="bg-yellow-500 py-16 text-black md:py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl">
            Vous n’avez pas trouvé votre réponse ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/75 sm:text-lg">
            Écrivez directement sur WhatsApp, appelez IRONZ à Agadir, ou préparez
            une demande de devis pour un projet.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-black px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:bg-gray-900"
            >
              <FaqIcon name="contact" className="h-5 w-5" />
              WhatsApp
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-black px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white"
            >
              Nous appeler
            </a>
            <Link
              href="/demande-devis"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-black px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
