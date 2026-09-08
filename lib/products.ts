const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://cts4hw2cbnwl4ur7zp6acy6cyy0jnxeo.lambda-url.eu-north-1.on.aws/api";

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

export function productSlug(product: {
  slug?: string;
  name: string;
  _id?: string;
  id?: string;
}): string {
  if (product.slug) return product.slug;

  const base = product.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const id = product._id || product.id;

  return id ? `${base}-${id.slice(-6)}` : base;
}

function productRows(payload: ProductListResponse | ProductRecord[]): ProductRecord[] {
  if (Array.isArray(payload)) return payload;
  return payload.data || payload.products || [];
}

async function requestProducts(url: string): Promise<ProductListResponse | ProductRecord[]> {
  // Prices and promotions must stay current across catalogue and detail queries.
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Product API returned ${response.status}`);
  return response.json();
}

export async function getAllProducts(): Promise<ProductRecord[]> {
  const all: ProductRecord[] = [];
  const limit = 100;

  for (let page = 1; page <= 20; page += 1) {
    const payload = await requestProducts(
      `${API_URL}/products?limit=${limit}&page=${page}`,
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

export async function getProductBySlug(slug: string): Promise<ProductRecord | null> {
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

export function productUpdatedAt(product: ProductRecord): Date | undefined {
  const raw = product.updatedAt || product.createdAt;
  if (!raw) return undefined;
  const value = typeof raw === "object" && raw && "$date" in raw ? raw.$date : raw;
  const date = value ? new Date(String(value)) : new Date(0);
  return Number.isNaN(date.getTime()) ? undefined : date;
}
