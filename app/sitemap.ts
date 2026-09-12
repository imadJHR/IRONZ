import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import { categories } from "../data/product";
import { productSlug, productUpdatedAt, type ProductRecord } from "../lib/products";
import { buildCategoryTaxonomy } from "../lib/category-taxonomy";

const baseUrl = "https://www.ironz.ma";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://cts4hw2cbnwl4ur7zp6acy6cyy0jnxeo.lambda-url.eu-north-1.on.aws/api";
const SITEMAP_REVALIDATE_SECONDS = 3600;
const SITEMAP_CACHE_NAMESPACE = "v2-taxonomy-output";
const SITEMAP_CACHE_TAGS = ["sitemap-products", "product-taxonomy"];

export const revalidate = 3600;

interface ProductListResponse {
  data?: ProductRecord[];
  products?: ProductRecord[];
  total?: number;
  pagination?: { totalItems?: number; totalPages?: number };
}

function productRows(payload: ProductListResponse | ProductRecord[]): ProductRecord[] {
  if (Array.isArray(payload)) return payload;
  return payload.data || payload.products || [];
}

async function fetchProductPage(
  page: number,
  limit: number,
): Promise<ProductListResponse | ProductRecord[]> {
  const response = await fetch(`${API_URL}/products?limit=${limit}&page=${page}`, {
    next: {
      revalidate: SITEMAP_REVALIDATE_SECONDS,
      tags: SITEMAP_CACHE_TAGS,
    },
  });

  if (!response.ok) {
    throw new Error(`Product API returned ${response.status} for sitemap page ${page}`);
  }

  return response.json();
}

async function fetchSitemapProducts(): Promise<ProductRecord[]> {
  const all: ProductRecord[] = [];
  const limit = 100;

  for (let page = 1; page <= 20; page += 1) {
    const payload = await fetchProductPage(page, limit);
    const rows = productRows(payload);
    all.push(...rows);

    const total = Array.isArray(payload)
      ? rows.length
      : payload.total || payload.pagination?.totalItems;
    if (rows.length < limit || (total && all.length >= total)) break;
  }

  return Array.from(
    new Map(
      all.map((product) => [
        product._id || product.id || safeProductSlug(product) || product.name,
        product,
      ]),
    ).values(),
  );
}

const getCachedSitemapProducts = unstable_cache(
  fetchSitemapProducts,
  ["ironz-sitemap-products", SITEMAP_CACHE_NAMESPACE],
  {
    revalidate: SITEMAP_REVALIDATE_SECONDS,
    tags: SITEMAP_CACHE_TAGS,
  },
);

function safeProductSlug(product: ProductRecord): string | null {
  try {
    if (!product.slug && !product.name) return null;

    const slug = productSlug({
      ...product,
      name: product.name || "",
    }).trim();

    if (
      !slug ||
      slug === "undefined" ||
      slug === "null" ||
      slug.includes("/") ||
      slug.includes("?") ||
      slug.includes("#")
    ) {
      return null;
    }

    return slug;
  } catch {
    return null;
  }
}

function uniqueRoutes(routes: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return Array.from(new Map(routes.map((route) => [route.url, route])).values());
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/produit`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/demande-devis`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/a-propos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/conditions`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = [
    "/services/personnalisation-accessoires",
    "/services/amenagement-salle",
    "/services/amenagement-salle/home-gym",
    "/services/amenagement-salle/salle-professionnelle",
    "/services/revetement-sol-mur",
    "/services/espace-enfance",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  let subcategoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getCachedSitemapProducts();
    subcategoryRoutes = buildCategoryTaxonomy(products).flatMap((category) =>
      category.subcategories.map((subcategory) => ({
        url: `${baseUrl}/categories/${category.slug}/${subcategory.slug}`,
        changeFrequency: "weekly",
        priority: 0.75,
      })),
    );
    productRoutes = products.flatMap((product) => {
      const slug = safeProductSlug(product);
      if (!slug) return [];

      const lastModified = productUpdatedAt(product);
      return [{
        url: `${baseUrl}/produit/${slug}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "weekly",
        priority: 0.7,
      }];
    });
  } catch (error) {
    console.error("[sitemap] Unable to load product URLs for sitemap.", error);
  }

  return uniqueRoutes([
    ...routes,
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...serviceRoutes,
    ...productRoutes,
  ]);
}
