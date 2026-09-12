import type { ProductRecord } from "./products";

export const CATEGORY_SLUGS = ["equipements", "supplement", "accessoires"] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

type CategoryDefinition = {
  slug: CategorySlug;
  name: string;
  aliases: string[];
  heading: string;
  intro: string;
  title: string;
  description: string;
};

export type TaxonomySubcategory = {
  name: string;
  slug: string;
  count: number;
};

export type TaxonomyCategory = {
  slug: CategorySlug;
  name: string;
  heading: string;
  intro: string;
  title: string;
  description: string;
  count: number;
  subcategories: TaxonomySubcategory[];
};

export const CATEGORY_DEFINITIONS: Record<CategorySlug, CategoryDefinition> = {
  equipements: {
    slug: "equipements",
    name: "Equipements",
    aliases: ["equipements", "équipements"],
    heading: "Équipements fitness et musculation",
    intro:
      "Découvrez nos machines et équipements de fitness pour la maison, les salles de sport et les espaces professionnels au Maroc.",
    title: "Équipements fitness professionnels au Maroc",
    description:
      "Découvrez les équipements IRONZ pour salles de sport, fitness, musculation et remise en forme au Maroc.",
  },
  supplement: {
    slug: "supplement",
    name: "Supplément",
    aliases: ["supplement", "supplément"],
    heading: "Suppléments et nutrition sportive",
    intro:
      "Découvrez notre sélection de suppléments et produits de nutrition sportive disponibles avec livraison au Maroc.",
    title: "Suppléments et nutrition sportive au Maroc",
    description:
      "Découvrez les suppléments et produits de nutrition sportive IRONZ pour accompagner vos objectifs de performance.",
  },
  accessoires: {
    slug: "accessoires",
    name: "Accessoires",
    aliases: ["accessoires"],
    heading: "Accessoires de fitness et musculation",
    intro:
      "Retrouvez nos accessoires pour le fitness, la musculation, la récupération et l'entraînement quotidien au Maroc.",
    title: "Accessoires de sport et fitness au Maroc",
    description:
      "Découvrez les accessoires IRONZ pour le sport, le fitness, la musculation et le bien-être au Maroc.",
  },
};

export function normalizeTaxonomyValue(value?: string | null): string {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function taxonomySlug(value?: string | null): string {
  return normalizeTaxonomyValue(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidTaxonomySlug(slug?: string | null): slug is string {
  return Boolean(
    slug &&
      slug !== "undefined" &&
      slug !== "null" &&
      !slug.includes("/") &&
      !slug.includes("?") &&
      !slug.includes("#"),
  );
}

export function categorySlugForValue(value?: string | null): CategorySlug | null {
  const normalized = normalizeTaxonomyValue(value);
  if (!normalized) return null;

  for (const definition of Object.values(CATEGORY_DEFINITIONS)) {
    if (definition.aliases.map(normalizeTaxonomyValue).includes(normalized)) {
      return definition.slug;
    }
  }

  return null;
}

export function categoryUrl(value?: string | null): string | null {
  const slug = categorySlugForValue(value);
  return slug ? `/categories/${slug}` : null;
}

export function subcategoryUrl(
  category?: string | null,
  subcategory?: string | null,
): string | null {
  const categoryPath = categoryUrl(category);
  const subcategorySlug = taxonomySlug(subcategory);
  if (!categoryPath || !isValidTaxonomySlug(subcategorySlug)) return null;
  return `${categoryPath}/${subcategorySlug}`;
}

export function productMatchesCategory(
  product: ProductRecord,
  categorySlug: string,
): boolean {
  return categorySlugForValue(product.category) === categorySlug;
}

export function productMatchesSubcategory(
  product: ProductRecord,
  categorySlug: string,
  subcategorySlug: string,
): boolean {
  return (
    productMatchesCategory(product, categorySlug) &&
    taxonomySlug(product.subCategory) === subcategorySlug
  );
}

export function buildCategoryTaxonomy(products: ProductRecord[]): TaxonomyCategory[] {
  const taxonomy = new Map<CategorySlug, TaxonomyCategory>();
  const subcategoryMaps = new Map<CategorySlug, Map<string, TaxonomySubcategory>>();

  for (const slug of CATEGORY_SLUGS) {
    const definition = CATEGORY_DEFINITIONS[slug];
    taxonomy.set(slug, {
      slug,
      name: definition.name,
      heading: definition.heading,
      intro: definition.intro,
      title: definition.title,
      description: definition.description,
      count: 0,
      subcategories: [],
    });
    subcategoryMaps.set(slug, new Map());
  }

  for (const product of products) {
    const categorySlug = categorySlugForValue(product.category);
    if (!categorySlug) continue;

    const category = taxonomy.get(categorySlug);
    const subcategories = subcategoryMaps.get(categorySlug);
    if (!category || !subcategories) continue;

    category.count += 1;

    const subcategoryName = String(product.subCategory || "").trim();
    const subSlug = taxonomySlug(subcategoryName);
    if (!isValidTaxonomySlug(subSlug)) continue;

    const existing = subcategories.get(subSlug);
    if (existing) {
      existing.count += 1;
    } else {
      subcategories.set(subSlug, {
        name: subcategoryName,
        slug: subSlug,
        count: 1,
      });
    }
  }

  return CATEGORY_SLUGS.map((slug) => {
    const category = taxonomy.get(slug);
    const subcategories = Array.from(subcategoryMaps.get(slug)?.values() || []).sort((a, b) =>
      a.name.localeCompare(b.name, "fr"),
    );

    return {
      ...category!,
      subcategories,
    };
  }).filter((category) => category.count > 0);
}

export function findTaxonomyCategory(
  products: ProductRecord[],
  slug: string,
): TaxonomyCategory | null {
  if (!CATEGORY_SLUGS.includes(slug as CategorySlug)) return null;
  return buildCategoryTaxonomy(products).find((category) => category.slug === slug) || null;
}

export function findTaxonomySubcategory(
  products: ProductRecord[],
  categorySlug: string,
  subcategorySlug: string,
): { category: TaxonomyCategory; subcategory: TaxonomySubcategory } | null {
  if (!isValidTaxonomySlug(subcategorySlug)) return null;

  const category = findTaxonomyCategory(products, categorySlug);
  const subcategory = category?.subcategories.find((item) => item.slug === subcategorySlug);
  return category && subcategory ? { category, subcategory } : null;
}
