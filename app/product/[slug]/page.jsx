import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductPageClient from "./product-client";
import { products } from "../../../data/product";

/* ================================
   HELPER: FIND PRODUCT
================================ */
function findProductBySlug(slug) {
  if (!slug) return null;
  
  return products.find(
    (p) =>
      p.slug &&
      String(p.slug).toLowerCase() === String(slug).toLowerCase()
  );
}

/* ================================
   METADATA
================================ */
export async function generateMetadata({ params = {} }) {
  const { slug } = params;
  const product = findProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit non trouvé - IRONZ",
      description: "Produit introuvable",
    };
  }

  return {
    title: `${product.name} - IRONZ`,
    description: product.description?.slice(0, 160) ?? "Découvrez nos produits",
    openGraph: {
      title: `${product.name} - IRONZ`,
      description: product.description?.slice(0, 160) ?? "Découvrez nos produits",
      images: product.images ? [product.images[0]] : [],
    },
  };
}

/* ================================
   STATIC PARAMS
================================ */
export async function generateStaticParams() {
  return products
    .filter((p) => p.slug && typeof p.slug === "string")
    .map((p) => ({
      slug: p.slug,
    }));
}

/* ================================
   PAGE
================================ */
export default function ProductPage({ params = {} }) {
  const { slug } = params;
  
  // 🔒 Validation SSR
  const product = findProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductPageClient 
        slug={slug} 
        initialProduct={product} // ✅ Passez le produit déjà trouvé
      />
    </Suspense>
  );
}

/* ================================
   LOADING
================================ */
function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-16 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="h-[500px] bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 w-24 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Infos produit */}
        <div className="space-y-6">
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          </div>
          
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
          </div>
          
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl w-full mt-8" />
        </div>
      </div>
    </div>
  );
}