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
    heading: "Équipements pour cardio et musculation",
    intro:
      "Un espace d'entraînement se construit autour du matériel adapté à vos exercices. Cette catégorie réunit les équipements IRONZ pour le cardio et la musculation : vélos, rameur, tapis roulant, machines de travail des jambes, rack et banc. Vous y trouverez aussi un Reformer Pilates, une barre de traction et des haltères. Parcourez les sous-catégories pour choisir une famille de matériel, puis consultez les dimensions et caractéristiques indiquées sur chaque fiche avant d'équiper votre espace au Maroc.",
    title: "Équipements de cardio et musculation au Maroc | IRONZ",
    description:
      "Équipez votre espace avec IRONZ : vélos, rameur, tapis roulant, banc et machines de musculation. Parcourez les familles d'équipements au Maroc.",
  },
  supplement: {
    slug: "supplement",
    name: "Supplément",
    aliases: ["supplement", "supplément"],
    heading: "Suppléments et nutrition sportive",
    intro:
      "La nutrition sportive regroupe ici plusieurs familles de produits : whey, isolat de whey, gainer, multivitamines, zinc et oméga-3. Le rayon comprend également une boisson énergisante, de la crème de riz, des sauces et des sirops. Utilisez les sous-catégories pour accéder au type de produit recherché, puis consultez sa composition, son format et ses indications d'utilisation sur la fiche. Ce catalogue IRONZ au Maroc permet de distinguer les compléments alimentaires des produits destinés à vos préparations culinaires.",
    title: "Suppléments et nutrition sportive au Maroc | IRONZ",
    description:
      "Whey, isolat, gainer, vitamines et oméga-3 : parcourez la nutrition sportive IRONZ au Maroc, ainsi que les crèmes de riz, sauces et sirops.",
  },
  accessoires: {
    slug: "accessoires",
    name: "Accessoires",
    aliases: ["accessoires"],
    heading: "Accessoires de sport et d'entraînement",
    intro:
      "Complétez votre matériel selon votre pratique : fitness, musculation, boxe ou entraînement avec poids libres. Ce rayon rassemble des accessoires aussi variés que les tapis, bandes de résistance, cordes à sauter, poignées de tirage, haltères et protections de boxe. Des vêtements, sacs et accessoires de natation sont également présents. Les sous-catégories vous orientent vers les produits propres à chaque activité ; consultez ensuite les formats, charges et détails de chaque référence pour préparer votre achat chez IRONZ au Maroc.",
    title: "Accessoires de sport et fitness au Maroc | IRONZ",
    description:
      "Trouvez vos accessoires chez IRONZ : fitness, boxe, poids libres, poignées de musculation, vêtements et sacs. Un rayon organisé par pratique sportive.",
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
