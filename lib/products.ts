import { unstable_cache } from "next/cache";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://cts4hw2cbnwl4ur7zp6acy6cyy0jnxeo.lambda-url.eu-north-1.on.aws/api";
export const PRODUCT_DETAIL_REVALIDATE_SECONDS = 600;
const PRODUCT_CACHE_NAMESPACE = "v2-taxonomy-output";
const PRODUCT_CACHE_TAGS = ["product-detail", "product-taxonomy"];

export interface ProductRecord {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  longDescription?: string;
  price: number;
  oldPrice?: number;
  image?: string;
  gallery?: string[];
  images?: string[];
  category?: string;
  subCategory?: string;
  brand?: string;
  sku?: string;
  inStock?: boolean;
  stockQuantity?: number;
  rating?: number;
  reviewCount?: number;
  reviews?: Array<{
    username: string;
    title: string;
    body: string;
    rating: number;
    verified: boolean;
    date?: string | { $date: string };
    createdAt?: string | { $date: string };
  }>;
  updatedAt?: string | { $date: string };
  createdAt?: string | { $date: string };
  [key: string]: unknown;
}

interface ProductListResponse {
  data?: ProductRecord[];
  products?: ProductRecord[];
  total?: number;
  pagination?: { totalItems?: number };
}

type ProductSlugSource = {
  slug?: string;
  name?: string;
  _id?: string;
  id?: string;
};

export function productSlug(product: ProductSlugSource): string {
  if (product.slug) return product.slug;

  const base = (product.name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const id = product._id || product.id;

  return id ? `${base}-${id.slice(-6)}` : base;
}

export function isValidProductSlug(slug: string): boolean {
  return Boolean(
    slug &&
      slug !== "undefined" &&
      slug !== "null" &&
      !slug.includes("/") &&
      !slug.includes("?") &&
      !slug.includes("#"),
  );
}

function productRows(payload: ProductListResponse | ProductRecord[]): ProductRecord[] {
  if (Array.isArray(payload)) return payload;
  return payload.data || payload.products || [];
}

async function requestProducts(
  url: string,
  init: RequestInit = { cache: "no-store" },
): Promise<ProductListResponse | ProductRecord[]> {
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(`Product API returned ${response.status}`);
  return response.json();
}

async function fetchAllProducts(init?: RequestInit): Promise<ProductRecord[]> {
  const all: ProductRecord[] = [];
  const limit = 100;

  for (let page = 1; page <= 20; page += 1) {
    const payload = await requestProducts(
      `${API_URL}/products?limit=${limit}&page=${page}`,
      init,
    );
    const rows = productRows(payload);
    all.push(...rows);

    const total = Array.isArray(payload)
      ? rows.length
      : payload.total || payload.pagination?.totalItems;
    if (rows.length < limit || (total && all.length >= total)) break;
  }

  return Array.from(
    new Map(all.map((product) => [product._id || product.id || productSlug(product), product])).values(),
  );
}

export async function getAllProducts(): Promise<ProductRecord[]> {
  // Prices and promotions must stay current across catalogue and detail queries.
  return fetchAllProducts();
}

export async function getProductBySlug(slug: string): Promise<ProductRecord | null> {
  if (!isValidProductSlug(slug)) return null;

  try {
    const directPayload = await requestProducts(
      `${API_URL}/products?slug=${encodeURIComponent(slug)}`,
    );
    const direct = productRows(directPayload).find(
      (product) => productSlug(product) === slug,
    );
    if (direct) return { ...direct, slug };
  } catch {
    // Fall through to the paginated lookup so legacy products remain reachable.
  }

  const products = await getAllProducts();
  const product = products.find((item) => productSlug(item) === slug);
  return product ? { ...product, slug } : null;
}

const cachedAllProducts = unstable_cache(
  async () =>
    fetchAllProducts({
      next: {
        revalidate: PRODUCT_DETAIL_REVALIDATE_SECONDS,
        tags: PRODUCT_CACHE_TAGS,
      },
    }),
  ["ironz-product-detail-list", PRODUCT_CACHE_NAMESPACE],
  {
    revalidate: PRODUCT_DETAIL_REVALIDATE_SECONDS,
    tags: PRODUCT_CACHE_TAGS,
  },
);

export async function getCachedAllProducts(): Promise<ProductRecord[]> {
  return cachedAllProducts();
}

export const getCachedProductBySlug = unstable_cache(
  async (slug: string): Promise<ProductRecord | null> => {
    if (!isValidProductSlug(slug)) return null;

    const directPayload = await requestProducts(
      `${API_URL}/products?slug=${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: PRODUCT_DETAIL_REVALIDATE_SECONDS,
          tags: [...PRODUCT_CACHE_TAGS, `product-detail:${slug}`],
        },
      },
    );
    const direct = productRows(directPayload).find(
      (product) => productSlug(product) === slug,
    );
    if (direct) return { ...direct, slug };

    const products = await cachedAllProducts();
    const product = products.find((item) => productSlug(item) === slug);
    return product ? { ...product, slug } : null;
  },
  ["ironz-product-detail-by-slug", PRODUCT_CACHE_NAMESPACE],
  {
    revalidate: PRODUCT_DETAIL_REVALIDATE_SECONDS,
    tags: PRODUCT_CACHE_TAGS,
  },
);

export function productUpdatedAt(product: ProductRecord): Date | undefined {
  const raw = product.updatedAt || product.createdAt;
  if (!raw) return undefined;
  const value = typeof raw === "object" && raw && "$date" in raw ? raw.$date : raw;
  const date = value ? new Date(String(value)) : new Date(0);
  return Number.isNaN(date.getTime()) ? undefined : date;
}
