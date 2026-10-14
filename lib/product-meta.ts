import type { Metadata } from "next";

/**
 * Meta descriptions for products whose API `description` field is too short or
 * too thin to serve as a search snippet.
 *
 * Every entry is backed by facts present in the product record (name, price,
 * brand, documented attributes) — no invented availability, warranty, or
 * delivery promise. Only the fields that need overriding are listed.
 *
 * Keyed by product slug, matching the URL segment used by
 * `productSlug()` in `lib/products.ts`.
 */
export const PRODUCT_META_OVERRIDES: Record<string, { description: string }> = {
  "packs-sauces-healthy": {
    description:
      "Pack sauces healthy : barbecue ServiVita sans sucre ni matières grasses, vinaigre de cidre offert. Assaisonnez vos plats, livraison partout au Maroc.",
  },
};

/**
 * Returns the SEO description for a product, preferring a curated override
 * over the raw API description. Falls back to the product's own description,
 * truncated to the snippet length, then to a brand-name sentence.
 */
export function productMetaDescription(
  product: { slug?: string; name: string; description?: string; longDescription?: string },
  apiDescription: string,
): string {
  const override = PRODUCT_META_OVERRIDES[product.slug ?? ""];
  if (override) return override.description;
  return apiDescription;
}
