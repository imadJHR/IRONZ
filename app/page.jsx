import HomeClient from "./HomeClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function Page() {
  // Try to fetch all data in parallel to maximize performance
  const [productsRes, vedetteRes, latestRes] = await Promise.allSettled([
    fetch(`${API_URL}/products?limit=40`, { next: { revalidate: 60 } }),
    fetch(`${API_URL}/products?isFeatured=true&limit=6`, { next: { revalidate: 60 } }),
    fetch(`${API_URL}/products?page=1&limit=12&sort=-createdAt`, { next: { revalidate: 60 } })
  ]);

  let products = [];
  let vedetteProducts = [];
  let latestProducts = [];
  let latestTotal = 0;

  try {
    if (productsRes.status === 'fulfilled' && productsRes.value.ok) {
      const pJson = await productsRes.value.json();
      products = pJson.data || [];
    }

    if (vedetteRes.status === 'fulfilled' && vedetteRes.value.ok) {
      const vJson = await vedetteRes.value.json();
      vedetteProducts = vJson.data || [];
    }

    if (latestRes.status === 'fulfilled' && latestRes.value.ok) {
      const lJson = await latestRes.value.json();
      latestProducts = lJson.data || [];
      latestTotal = lJson.total || 0;
    }

    // Fallbacks
    if (vedetteProducts.length === 0 && products.length > 0) {
      const featured = products.filter(p => p.isFeatured && p.image).slice(0, 6);
      vedetteProducts = featured.length > 0 ? featured : products.filter(p => p.image).slice(0, 4);
    }
  } catch (err) {
    console.error("Error parsing initial data:", err);
  }

  return (
    <HomeClient
      initialProducts={products}
      initialVedetteProducts={vedetteProducts}
      initialLatestProducts={latestProducts}
      initialLatestTotal={latestTotal}
    />
  );
}