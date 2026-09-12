import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import ProductDetailClient from "./ProductDetailClient";
import type { Product } from "./ProductDetailClient";
import {
  getCachedAllProducts,
  getCachedProductBySlug,
  isValidProductSlug,
  productSlug,
} from "../../../lib/products";
import { categoryUrl, subcategoryUrl } from "../../../lib/category-taxonomy";

const SITE_URL = "https://www.ironz.ma";
export const revalidate = 600;
export const dynamicParams = true;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const getProductForRequest = cache(async (slug: string) => getCachedProductBySlug(slug));
const getProductsForRequest = cache(async () => getCachedAllProducts());

function plainText(value?: string): string {
  return (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function productDescription(product: Product): string {
  const source = plainText(product.description || product.longDescription);
  if (source) return source.slice(0, 155);
  return `${product.name} disponible chez IRONZ. Équipement sportif livré partout au Maroc.`;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidProductSlug(slug)) {
    return {
      title: "Produit introuvable",
      robots: { index: false, follow: false },
    };
  }

  let product: Product | null = null;
  try {
    product = (await getProductForRequest(slug)) as unknown as Product | null;
  } catch (error) {
    console.error(`[product] Unable to generate metadata for ${slug}.`, error);
    return {
      title: "Produit IRONZ",
      description: "Équipement sportif disponible chez IRONZ au Maroc.",
      alternates: { canonical: `/produit/${slug}` },
      robots: { index: true, follow: true },
    };
  }

  if (!product) {
    return {
      title: "Produit introuvable",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/produit/${productSlug(product)}`;
  const description = productDescription(product);
  const images = [product.image, ...(product.gallery || []), ...(product.images || [])]
    .filter((image): image is string => Boolean(image))
    .slice(0, 4);

  return {
    title: `${product.name} | Prix au Maroc | IRONZ`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${product.name} | Prix au Maroc | IRONZ`,
      description,
      url: canonical,
      type: "website",
      locale: "fr_MA",
      images,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  if (!isValidProductSlug(slug)) notFound();

  const product = (await getProductForRequest(slug)) as unknown as Product | null;
  if (!product) notFound();

  let allProducts: Product[] = [];
  try {
    allProducts = (await getProductsForRequest()) as unknown as Product[];
  } catch (error) {
    console.error(`[product] Unable to load related products for ${slug}.`, error);
  }

  const related = allProducts
    .filter(
      (item) =>
        item.category === product.category && productSlug(item) !== productSlug(product),
    )
    .slice(0, 4);
  const canonicalUrl = `${SITE_URL}/produit/${productSlug(product)}`;
  const images = [product.image, ...(product.gallery || []), ...(product.images || [])].filter(
    (image): image is string => Boolean(image),
  );
  const reviewCount = product.reviewCount || product.reviews?.length || 0;
  const rating = Number(product.rating || 0);
  const inStock = product.inStock !== false && product.stockQuantity !== 0;

  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: productDescription(product),
    image: images,
    url: canonicalUrl,
    sku: product.sku || product._id || product.id,
    brand: { "@type": "Brand", name: product.brand || "IRONZ" },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "MAD",
      price: Number(product.price).toFixed(2),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  if (reviewCount > 0 && rating > 0) {
    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount,
    };
  }

  const categoryPath = categoryUrl(product.category);
  const subcategoryPath = subcategoryUrl(product.category, product.subCategory);
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Produits", item: `${SITE_URL}/produit` },
    ...(categoryPath && product.category
      ? [{
          "@type": "ListItem",
          position: 3,
          name: product.category,
          item: `${SITE_URL}${categoryPath}`,
        }]
      : []),
    ...(subcategoryPath && product.subCategory
      ? [{
          "@type": "ListItem",
          position: categoryPath ? 4 : 3,
          name: product.subCategory,
          item: `${SITE_URL}${subcategoryPath}`,
        }]
      : []),
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...breadcrumbItems,
      {
        "@type": "ListItem",
        position: breadcrumbItems.length + 1,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient initialProduct={product} initialRelated={related} />
    </>
  );
}
