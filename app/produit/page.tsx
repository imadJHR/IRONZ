import { Suspense } from "react";
import { Metadata } from "next";
import ProductsPageClient from "./products-client";

// --- INTERFACES ---

interface Product {
  _id: string | number;
  id?: string | number;
  name: string;
  price: string | number;
  image?: string;
  slug?: string;
  category?: string;
  subCategory?: string;
  [key: string]: any; // Pour les autres champs optionnels
}

interface ApiResponse {
  success?: boolean;
  data?: Product[];
}

// --- CONSTANTS ---

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

/**
 * Fetch all products on the server for SEO
 */
async function getAllProducts(): Promise<Product[]> {
  try {
    let allProducts: Product[] = [];
    let page = 1;
    let hasMore = true;
    const batchLimit = 50;

    while (hasMore) {
      const response = await fetch(`${API_URL}/products?page=${page}&limit=${batchLimit}&sort=newest`, {
        next: { revalidate: 3600 } // ISR: Revalidate every hour
      });
      
      if (!response.ok) break;

      const data: ApiResponse | Product[] = await response.json();
      
      // Gestion flexible de la réponse API (objet avec data ou tableau direct)
      const batch = (data as ApiResponse).success && (data as ApiResponse).data 
        ? (data as ApiResponse).data! 
        : Array.isArray(data) ? data : [];

      if (batch.length === 0) {
        hasMore = false;
        break;
      }

      allProducts = [...allProducts, ...batch];

      if (batch.length < batchLimit) {
        hasMore = false;
      } else {
        page++;
      }
    }

    // De-duplicate using _id
    const uniqueProducts = Array.from(
      new Map(allProducts.map((item) => [item._id, item])).values()
    );
    
    return uniqueProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const products = await getAllProducts();
  
  return {
    title: `Tous nos produits (${products.length}) - IRONZ`,
    description: "Découvrez notre gamme complète de produits pour l'aménagement et l'équipement de vos espaces sportifs et de loisirs. Équipements professionnels de qualité.",
    openGraph: {
      title: `Catalogue IRONZ - ${products.length} produits`,
      description: "Équipements sportifs et de loisirs professionnels",
      type: 'website',
    }
  };
}

/**
 * Server Component - Products Page
 */
export default async function ProductsPage(){
  // Fetch products on the server
  const initialProducts = await getAllProducts();

  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsPageClient initialProducts={initialProducts} />
    </Suspense>
  );
}

/**
 * Loading State
 */
function ProductsLoading() {
  return (
    <main className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 lg:py-28 bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Chargement du catalogue...</p>
      </div>
    </main>
  );
}