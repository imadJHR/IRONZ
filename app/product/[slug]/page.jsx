import { Suspense } from "react";
import ProductPageClient from "./product-client";
import { products } from "@/data/product";

// Version simplifiée des métadonnées pour éviter les erreurs de type
export async function generateMetadata({ params }) {
  const product = products.find(
    (p) =>
      p.slug &&
      String(p.slug).toLowerCase() === String(params.slug).toLowerCase()
  );

  if (!product) {
    return {
      title: "Produit non trouvé - IRONZ",
    };
  }

  // Métadonnées basiques sans structures complexes
  return {
    title: `${product.name} - IRONZ`,
    description: product.description
      ? product.description.substring(0, 160)
      : "Découvrez nos produits",
  };
}

// Génération des routes statiques pour améliorer les performances
export async function generateStaticParams() {
  return products
    .filter((product) => product.slug)
    .map((product) => ({
      slug: product.slug,
    }));
}

export default function ProductPage({ params }) {
  const { slug } = params;

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductPageClient slug={slug} />
    </Suspense>
  );
}

function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
