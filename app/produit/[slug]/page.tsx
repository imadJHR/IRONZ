import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductPageClient from "./product-client";

// --- INTERFACES ---

interface Product {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  category?: string;
  price?: number;
  slug?: string;
  reviews?: any[]; // Vous pouvez créer une interface Review si nécessaire
  [key: string]: any;
}

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
}

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

// --- CONFIGURATION ---

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";

export const revalidate = 3600; // Revalidate every hour

// --- HELPERS ---

/**
 * Récupère les données d'un produit par son slug
 */
async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/slug/${slug}`, { 
      next: { revalidate: 3600 } 
    });

    if (!res.ok) return null;

    const data: ApiResponse<Product> | Product = await res.json();
    // Gère le cas où l'API renvoie { data: {...} } ou juste {...}
    return (data as ApiResponse<Product>).data || (data as Product); 
  } catch (error) {
    console.error("Error fetching product metadata:", error);
    return null;
  }
}

/**
 * Récupère les produits liés
 */
async function getRelatedProducts(category: string, excludeId: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products?category=${encodeURIComponent(category)}&limit=8&sort=featured`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) return [];
    
    const data: ApiResponse<Product[]> = await res.json();
    const list = Array.isArray(data?.data) ? data.data : [];
    return list.filter((x) => x._id !== excludeId).slice(0, 4);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

/* ================================
   METADATA (SEO)
================================ */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return { title: "Produit introuvable" };

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable - IRONZ",
      description: "Le produit que vous recherchez n'existe pas.",
    };
  }

  const description = product.description?.slice(0, 160) ?? "Détails du produit";

  return {
    title: `${product.name} - IRONZ`,
    description: description,
    openGraph: {
      title: product.name,
      description: description,
      images: product.image ? [product.image] : [],
      type: 'website',
    }
  };
}

/* ================================
   PAGE (SERVER COMPONENT)
================================ */
export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) notFound();

  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = product.category 
    ? await getRelatedProducts(product.category, product._id)
    : [];

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductPageClient 
        slug={slug} 
        initialProduct={product}
        initialReviews={product.reviews || []}
        initialRelated={relatedProducts}
      />
    </Suspense>
  );
}

/* ================================
   LOADING STATE
================================ */
function ProductLoading(): JSX.Element {
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