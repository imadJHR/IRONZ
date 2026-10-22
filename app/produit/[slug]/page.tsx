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
import { productMetaDescription, productMetaTitle } from "../../../lib/product-meta";
import { OG_LOGO_URL } from "../../../lib/og-image";
import { productBrandSchema } from "../../../lib/product-brand";
import { productAggregateRatingSchema } from "../../../lib/product-review-summary";
import { productOfferSchema } from "../../../lib/product-offer";
import { productIdentifierSchema } from "../../../lib/product-identifiers";

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

function stringScore(value: string): number {
  return Array.from(value).reduce(
    (score, character) => (score * 31 + character.charCodeAt(0)) % 100000,
    7,
  );
}

function sortFromProductSeed(products: Product[], seed: string): Product[] {
  const offset = stringScore(seed);
  return [...products].sort((left, right) => {
    const leftScore = stringScore(`${seed}:${productSlug(left)}`) + offset;
    const rightScore = stringScore(`${seed}:${productSlug(right)}`) + offset;
    return leftScore - rightScore;
  });
}

function selectRelatedProducts(product: Product, products: Product[]): Product[] {
  const currentSlug = productSlug(product);
  const related = new Map<string, Product>();
  const addCandidates = (candidates: Product[]) => {
    for (const candidate of sortFromProductSeed(candidates, currentSlug)) {
      const candidateSlug = productSlug(candidate);
      if (candidateSlug === currentSlug || related.has(candidateSlug)) continue;
      related.set(candidateSlug, candidate);
      if (related.size >= 4) break;
    }
  };

  addCandidates(
    products.filter(
      (item) =>
        item.subCategory &&
        product.subCategory &&
        item.subCategory === product.subCategory,
    ),
  );

  if (related.size < 4) {
    addCandidates(
      products.filter((item) => item.category === product.category),
    );
  }

  return Array.from(related.values()).slice(0, 4);
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
  const description = productMetaDescription(product, productDescription(product));
  const title = productMetaTitle(product);
  const images = [product.image, ...(product.gallery || []), ...(product.images || [])]
    .filter((image): image is string => Boolean(image))
    .slice(0, 4);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: "fr_MA",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // A Twitter Card renders a single image; the primary product photo is
      // the same one Open Graph leads with. Logo fallback when none exists.
      images: [images[0] ?? OG_LOGO_URL],
      creator: "@ironz_official",
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

  const related = selectRelatedProducts(product, allProducts);
  const canonicalUrl = `${SITE_URL}/produit/${productSlug(product)}`;
  const images = [product.image, ...(product.gallery || []), ...(product.images || [])].filter(
    (image): image is string => Boolean(image),
  );
  const { offers } = productOfferSchema(product, canonicalUrl);

  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: productDescription(product),
    image: images,
    url: canonicalUrl,
    ...productIdentifierSchema(product),
    ...productBrandSchema(product),
    ...productAggregateRatingSchema(product),
    ...(offers && { offers: {
      ...offers,
      itemCondition: "https://schema.org/NewCondition",
    } }),
  };

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
