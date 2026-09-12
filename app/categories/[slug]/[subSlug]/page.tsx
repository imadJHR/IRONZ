import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProductsClient from "../CategoryProductsClient";
import type { Product } from "../CategoryProductsClient";
import { getAllProducts, productSlug } from "../../../../lib/products";
import {
  findTaxonomySubcategory,
  productMatchesSubcategory,
} from "../../../../lib/category-taxonomy";

const SITE_URL = "https://www.ironz.ma";

type SubcategoryPageProps = {
  params: Promise<{ slug: string; subSlug: string }>;
};

async function getSubcategoryPageData(slug: string, subSlug: string) {
  const products = await getAllProducts();
  const taxonomy = findTaxonomySubcategory(products, slug, subSlug);
  if (!taxonomy) return null;

  const matchingProducts = products.filter((product) =>
    productMatchesSubcategory(product, taxonomy.category.slug, taxonomy.subcategory.slug),
  );

  if (matchingProducts.length === 0) return null;

  return {
    ...taxonomy,
    products: matchingProducts,
  };
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const data = await getSubcategoryPageData(slug, subSlug);

  if (!data) {
    return {
      title: "Sous-catégorie introuvable | IRONZ",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/categories/${data.category.slug}/${data.subcategory.slug}`;
  const title = `${data.subcategory.name} au Maroc | IRONZ`;
  const description = `Découvrez notre sélection ${data.subcategory.name.toLowerCase()} chez IRONZ, avec des produits adaptés au sport, au fitness et à la musculation au Maroc.`;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: "website",
    },
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug, subSlug } = await params;
  const data = await getSubcategoryPageData(slug, subSlug);
  if (!data) notFound();

  const canonicalUrl = `${SITE_URL}/categories/${data.category.slug}/${data.subcategory.slug}`;
  const heading = `${data.subcategory.name} au Maroc`;
  const intro = `Explorez les produits ${data.subcategory.name.toLowerCase()} disponibles chez IRONZ pour vous équiper avec du matériel adapté à vos entraînements au Maroc.`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.category.name,
        item: `${SITE_URL}/categories/${data.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.subcategory.name,
        item: canonicalUrl,
      },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: heading,
    itemListElement: data.products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${SITE_URL}/produit/${productSlug(product)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <nav
        aria-label="Fil d'Ariane"
        className="container mx-auto px-3 sm:px-4 pt-8 text-sm font-medium text-gray-500 dark:text-gray-400"
      >
        <ol className="flex flex-wrap items-center justify-center gap-2">
          <li>
            <Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/categories/${data.category.slug}`}
              className="hover:text-yellow-600 dark:hover:text-yellow-400"
            >
              {data.category.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 dark:text-white" aria-current="page">
            {data.subcategory.name}
          </li>
        </ol>
      </nav>
      <CategoryProductsClient
        initialProducts={data.products as Product[]}
        heading={heading}
        intro={intro}
        initialCategoryName={data.category.name}
        initialSubCategoryName={data.subcategory.name}
        lockedCategoryName={data.category.name}
        lockedSubCategoryName={data.subcategory.name}
      />
    </>
  );
}
