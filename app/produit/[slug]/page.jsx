import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductPageClient from "./product-client";

// API URL (Ensure this matches your .env)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";

/**
 * Helper function to fetch product data on the server
 */
async function getProductBySlug(slug) {
  try {
    // We use no-store to ensure we always get fresh data (or use 'force-cache' for SSG)
    const res = await fetch(`${API_URL}/products/slug/${slug}`, { 
      cache: 'no-store' 
    });

    if (!res.ok) return null;

    const data = await res.json();
    // Assuming your API returns { success: true, data: { ... } }
    return data.data || data; 
  } catch (error) {
    console.error("Error fetching product metadata:", error);
    return null;
  }
}

/* ================================
   METADATA (SEO)
================================ */
export async function generateMetadata({ params }) {
  // 1. Await params (Next.js 15 requirement)
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return { title: "Produit introuvable" };

  // 2. Fetch real data from API
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable - IRONZ",
      description: "Le produit que vous recherchez n'existe pas.",
    };
  }

  // 3. Generate dynamic tags
  return {
    title: `${product.name} - IRONZ`,
    description: product.description?.slice(0, 160) ?? "Détails du produit",
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.image ? [product.image] : [],
      type: 'website',
    }
  };
}

/* ================================
   PAGE (SERVER COMPONENT)
================================ */
export default async function ProductPage({ params }) {
  // 1. Await params
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) notFound();

  // 2. Optional: Pre-fetch on server to check 404 status immediately
  // This ensures Google sees a 404 status code if the product is missing
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  // 3. Pass slug to Client Component to handle interactivity (Cart, Gallery, etc.)
  return (
    <Suspense fallback={<ProductLoading />}>
    
      <ProductPageClient slug={slug} />
    </Suspense>
  );
}

/* ================================
   LOADING STATE
================================ */
function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-20 animate-pulse">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
          
          {/* Image Skeleton */}
          <div className="space-y-6">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="flex flex-col space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="flex gap-4">
               <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
               <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            </div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-4" />
            <div className="space-y-2 mt-8">
               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}