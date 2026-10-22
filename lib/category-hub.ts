import { unstable_cache } from "next/cache";
import { getAllProducts, productSlug, type ProductRecord } from "./products";
import {
  CATEGORY_DEFINITIONS,
  CATEGORY_SLUGS,
  categorySlugForValue,
} from "./category-taxonomy";

export const CATEGORY_HUB_REVALIDATE_SECONDS = 3600;

export function buildCategoryHub(products: ProductRecord[]) {
  const uniqueProducts = new Map(
    products.map((product) => [product._id || product.id || productSlug(product), product]),
  );
  const categories = CATEGORY_SLUGS.map((slug) => ({
    id: slug,
    slug,
    name: CATEGORY_DEFINITIONS[slug].name,
    image: "/placeholder.svg",
    description: `Découvrez notre gamme de ${CATEGORY_DEFINITIONS[slug].name}`,
    productCount: 0,
  }));

  for (const product of uniqueProducts.values()) {
    const slug = categorySlugForValue(product.category);
    const category = categories.find((item) => item.slug === slug);
    if (!category) continue;
    category.productCount += 1;
    if (category.image === "/placeholder.svg" &&
      typeof product.image === "string" && product.image.startsWith("http")) {
      category.image = product.image;
    }
  }
  return categories;
}

// Cache only a successfully loaded aggregate. An API failure must propagate:
// it must not replace a complete snapshot with empty or partial counts.
export const getCategoryHub = unstable_cache(
  async () => buildCategoryHub(await getAllProducts()),
  ["ironz-category-hub-v1"],
  {
    revalidate: CATEGORY_HUB_REVALIDATE_SECONDS,
    tags: ["category-hub", "product-taxonomy"],
  },
);
