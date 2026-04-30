// app/produit/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import ProductsPage from "./page-client";

// ─── SEO METADATA (Server Component) ─────────────────────
export const metadata: Metadata = {
  title: "Nos Produits | IRONZ - Équipement Sportif Premium au Maroc",
  description:
    "Découvrez notre gamme complète d'équipements sportifs premium : haltères, barres, machines, accessoires fitness. Livraison rapide partout au Maroc. Qualité professionnelle garantie.",
  keywords: [
    "équipement sportif maroc",
    "matériel fitness maroc",
    "haltères maroc",
    "salle de sport équipement",
    "ironz maroc",
    "musculation équipement",
    "accessoires fitness",
    "livraison maroc sport",
  ],
  authors: [{ name: "IRONZ", url: "https://ironz.ma" }],
  creator: "IRONZ",
  publisher: "IRONZ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ironz.ma/produit",
  },
  openGraph: {
    title: "Nos Produits | IRONZ - Équipement Sportif Premium",
    description:
      "Découvrez notre gamme complète d'équipements sportifs premium. Livraison rapide au Maroc.",
    url: "https://ironz.ma/produit",
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: [
      {
        url: "https://ironz.ma/og-produits.jpg",
        width: 1200,
        height: 630,
        alt: "IRONZ - Équipement Sportif Premium au Maroc",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Produits | IRONZ - Équipement Sportif Premium",
    description:
      "Découvrez notre gamme complète d'équipements sportifs premium. Livraison rapide au Maroc.",
    images: ["https://ironz.ma/og-produits.jpg"],
    creator: "@ironzmaroc",
  },
};

// ─── JSON-LD SCHEMA ───────────────────────────────────────
function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://ironz.ma/produit",
        url: "https://ironz.ma/produit",
        name: "Nos Produits - IRONZ Équipement Sportif Premium",
        description:
          "Découvrez notre gamme complète d'équipements sportifs premium au Maroc.",
        inLanguage: "fr-MA",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://ironz.ma",
          url: "https://ironz.ma",
          name: "IRONZ",
          description: "Équipement Sportif Premium au Maroc",
          publisher: {
            "@type": "Organization",
            name: "IRONZ",
            url: "https://ironz.ma",
            logo: {
              "@type": "ImageObject",
              url: "https://ironz.ma/logo.png",
            },
          },
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: "https://ironz.ma",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Produits",
              item: "https://ironz.ma/produit",
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        "@id": "https://ironz.ma/produit#products",
        name: "Équipements Sportifs IRONZ",
        description:
          "Notre catalogue complet d'équipements sportifs professionnels",
        url: "https://ironz.ma/produit",
        numberOfItems: "100+",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
      },
      {
        "@type": "Organization",
        "@id": "https://ironz.ma#organization",
        name: "IRONZ",
        url: "https://ironz.ma",
        logo: "https://ironz.ma/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["French", "Arabic"],
          areaServed: "MA",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "MA",
          addressLocality: "Maroc",
        },
        sameAs: [
          "https://www.instagram.com/ironzmaroc",
          "https://www.facebook.com/ironzmaroc",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── LOADING SKELETON ─────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header skeleton */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-10 text-center space-y-3">
          <div className="h-8 sm:h-10 w-64 sm:w-80 bg-gray-200 dark:bg-gray-800 rounded-xl mx-auto animate-pulse" />
          <div className="h-1.5 w-16 bg-yellow-500/40 rounded-full mx-auto" />
          <div className="h-4 w-80 sm:w-96 bg-gray-100 dark:bg-gray-800 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 space-y-3"
              >
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-8 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ))}
          </aside>

          {/* Grid skeleton */}
          <main className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />
                  <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Spinner overlay */}
      <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 z-50">
        <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          Chargement...
        </span>
      </div>
    </div>
  );
}

// ─── PAGE (Server Component) ──────────────────────────────
export default function Page() {
  return (
    <>
      <JsonLd />
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductsPage />
      </Suspense>
    </>
  );
}