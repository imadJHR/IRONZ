import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductPageClient from "./product-client";
import { products } from "../../../data/product";

/* ================================
   METADATA
================================ */
export async function generateMetadata({ params }) {
  // AWAIT les params (Compatible Next.js 15)
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Produit introuvable - IRONZ",
      description: "Produit introuvable",
    };
  }

  const product = products.find(
    (p) =>
      p.slug &&
      String(p.slug).toLowerCase() === String(slug).toLowerCase()
  );

  if (!product) {
    return {
      title: "Produit introuvable - IRONZ",
      description: "Aucun produit ne correspond à cette recherche.",
    };
  }

  return {
    title: `${product.name} - IRONZ`,
    description: product.description?.slice(0, 160) ?? "Découvrez nos produits",
    // Ajout recommandé pour le SEO :
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      // images: [product.image], // Si tu as une image
    }
  };
}

/* ================================
   STATIC PARAMS
================================ */
export async function generateStaticParams() {
  return products
    .filter((p) => typeof p.slug === "string")
    .map((p) => ({
      slug: p.slug,
    }));
}

/* ================================
   PAGE (SERVER COMPONENT)
================================ */
// Le composant doit être 'async' pour pouvoir 'await' les params
export default async function ProductPage({ params }) {
  // 1. Récupération asynchrone des params
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  // 2. Sécurité : Si pas de slug dans l'URL (rare mais possible)
  if (!slug) {
    notFound();
  }

  // 3. Vérification : Est-ce que le produit existe VRAIMENT ?
  // C'est mieux de le faire ici (Serveur) pour renvoyer une vraie 404 HTTP
  const productExists = products.some(
    (p) => String(p.slug).toLowerCase() === String(slug).toLowerCase()
  );

  if (!productExists) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductPageClient slug={slug} />
    </Suspense>
  );
}

/* ================================
   LOADING
================================ */
function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-16 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Partie Image */}
        <div className="space-y-4">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Partie Info */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </div>
      </div>
    </div>
  );
}