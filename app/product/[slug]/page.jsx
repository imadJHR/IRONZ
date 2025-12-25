import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductPageClient from "./product-client";
import { products } from "../../../data/product";

/* ================================
   METADATA
================================ */
export async function generateMetadata({ params = {} }) {
  const slug = params.slug;

  if (!slug) {
    return {
      title: "Produit non trouvé - IRONZ",
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
      title: "Produit non trouvé - IRONZ",
      description: "Produit introuvable",
    };
  }

  return {
    title: `${product.name} - IRONZ`,
    description: product.description?.slice(0, 160) ?? "Découvrez nos produits",
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
   PAGE
================================ */
export default function ProductPage({ params = {} }) {
  const slug = params.slug;

  // 🔒 Sécurité absolue SSR + Turbopack
  if (!slug) {
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
