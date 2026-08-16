const API_URL = "https://cts4hw2cbnwl4ur7zp6acy6cyy0jnxeo.lambda-url.eu-north-1.on.aws/api";
const slug = "velo-sport-spinning-happygam-velo";

async function fetchProductBySlug(slug) {
  try {
    const direct = await fetch(`${API_URL}/products?slug=${encodeURIComponent(slug)}`);
    if (direct.ok) {
      const data = await direct.json();
      const products = data.data || data.products || data || [];
      const found = products.find((p) => p.slug === slug);
      if (found) return { via: "slug", found };
      else console.log("Etape1: slug pas trouve parmi", products.length, "produits (1er:", products[0]?.slug, ")");
    }
  } catch (e) { console.log("Etape1 err", e.message); }

  try {
    let page = 1; const limit = 100;
    while (true) {
      const res = await fetch(`${API_URL}/products?limit=${limit}&page=${page}`);
      if (!res.ok) break;
      const data = await res.json();
      const batch = data.data || data.products || [];
      for (const p of batch) {
        const pSlug = p.slug || "";
        if (pSlug === slug) return { via: "fallback p" + page, found: p };
      }
      if (batch.length < limit) break;
      const total = data.total || Infinity;
      if (page * limit >= total) break;
      page++;
    }
  } catch (e) { console.log("fallback err", e.message); }
  return null;
}

const r = await fetchProductBySlug(slug);
if (r) console.log("RESULT via", r.via, "| name:", r.found.name, "| reviews:", JSON.stringify(r.found.reviews), "| rating:", r.found.rating, "| reviewCount:", r.found.reviewCount);
else console.log("RESULT: null");
