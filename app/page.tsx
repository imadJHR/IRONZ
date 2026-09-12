import HomeClient from "./HomeClient";
import type { Product } from "./HomeClient";
import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cts4hw2cbnwl4ur7zp6acy6cyy0jnxeo.lambda-url.eu-north-1.on.aws/api";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export const metadata: Metadata = {
  title: "Équipement fitness et musculation au Maroc | IRONZ",
  description:
    "Achetez votre matériel de fitness et musculation au Maroc: machines, accessoires, suppléments et solutions d'aménagement IRONZ.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "IRONZ | Équipement fitness et musculation au Maroc",
    description:
      "Machines, accessoires, suppléments et aménagement de salles avec livraison partout au Maroc.",
    url: "/",
    locale: "fr_MA",
    type: "website",
  },
};

// Type for API response structure
interface ApiListResponse<T = Product> {
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

// Type for fetch result with proper error handling
type FetchResult<T> = 
  | { status: 'fulfilled'; value: Response; data: T }
  | { status: 'rejected'; reason: unknown };

export default async function Page() {
  // Try to fetch all data in parallel to maximize performance
  const fetchPromises = [
    fetch(`${API_URL}/products?limit=40`, { next: { revalidate: 60 } }),
    fetch(`${API_URL}/products?isFeatured=true&limit=6`, { next: { revalidate: 60 } }),
    fetch(`${API_URL}/products?page=1&limit=12&sort=-createdAt`, { next: { revalidate: 60 } })
  ] as const;

  const [productsRes, vedetteRes, latestRes] = await Promise.allSettled(fetchPromises);

  let products: Product[] = [];
  let vedetteProducts: Product[] = [];
  let latestProducts: Product[] = [];
  let latestTotal = 0;

  try {
    // Process products response
    if (productsRes.status === 'fulfilled' && productsRes.value.ok) {
      const pJson = await productsRes.value.json() as ApiListResponse;
      products = Array.isArray(pJson.data) ? pJson.data : [];
    } else if (productsRes.status === 'rejected') {
      console.error("Failed to fetch products:", productsRes.reason);
    }

    // Process vedette (featured) response
    if (vedetteRes.status === 'fulfilled' && vedetteRes.value.ok) {
      const vJson = await vedetteRes.value.json() as ApiListResponse;
      vedetteProducts = Array.isArray(vJson.data) ? vJson.data : [];
    } else if (vedetteRes.status === 'rejected') {
      console.error("Failed to fetch featured products:", vedetteRes.reason);
    }

    // Process latest products response
    if (latestRes.status === 'fulfilled' && latestRes.value.ok) {
      const lJson = await latestRes.value.json() as ApiListResponse;
      latestProducts = Array.isArray(lJson.data) ? lJson.data : [];
      latestTotal = typeof lJson.total === 'number' ? lJson.total : 0;
    } else if (latestRes.status === 'rejected') {
      console.error("Failed to fetch latest products:", latestRes.reason);
    }

    // Fallback: If no featured products but we have general products, derive some
    if (vedetteProducts.length === 0 && products.length > 0) {
      const featured = products.filter(
        (p: Product) => p.isFeatured && p.image && p.name
      ).slice(0, 6);
      vedetteProducts = featured.length > 0 
        ? featured 
        : products.filter((p: Product) => p.image && p.name).slice(0, 4);
    }
  } catch (err) {
    console.error("Error parsing initial data:", err instanceof Error ? err.message : String(err));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "IRONZ",
            url: "https://www.ironz.ma/",
            inLanguage: "fr-MA",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://www.ironz.ma/produit?search={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <HomeClient
        initialProducts={products}
        initialVedetteProducts={vedetteProducts}
        initialLatestProducts={latestProducts}
        initialLatestTotal={latestTotal}
      />
    </>
  );
}
