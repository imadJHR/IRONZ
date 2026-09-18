import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import CategoryProductsClient from "./CategoryProductsClient";
import type { Product } from "./CategoryProductsClient";
import { getAllProducts } from "../../../lib/products";
import {
  findTaxonomyCategory,
  productMatchesCategory,
} from "../../../lib/category-taxonomy";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getAllProducts();
  const category = findTaxonomyCategory(products, slug);
  if (!category) notFound();

  const initialProducts = products.filter((product) =>
    productMatchesCategory(product, category.slug),
  );
  const canonicalUrl = `https://www.ironz.ma/categories/${slug}`;
  const subcategories = category.subcategories;
  const introSubcategories = subcategories.slice(0, 3);
  const introParts = category.intro.split("Parcourez les sous-catégories");
  const introTail = introParts.length > 1 ? introParts[1] : "";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://www.ironz.ma/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: canonicalUrl,
      },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.heading,
    itemListElement: category.subcategories.map((subcategory, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: subcategory.name,
      url: `${canonicalUrl}/${subcategory.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {category.subcategories.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <nav
        aria-label="Fil d'Ariane"
        className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-8"
      >
        <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
          <li>
            <Link
              href="/"
              className="hover:text-yellow-600 transition-colors"
            >
              Accueil
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-300">
            /
          </li>
          <li aria-current="page" className="font-medium text-gray-900">
            {category.name}
          </li>
        </ol>
      </nav>
      {category.subcategories.length > 0 && (
        <nav
          aria-label={`Sous-catégories ${category.name}`}
          className="container mx-auto px-3 sm:px-4 pt-8 sm:pt-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {category.subcategories.map((subcategory) => (
              <Link
                key={subcategory.slug}
                href={`/categories/${category.slug}/${subcategory.slug}`}
                className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-600 transition-colors hover:border-yellow-500 hover:text-yellow-600 dark:border-gray-800 dark:text-gray-300 dark:hover:border-yellow-400 dark:hover:text-yellow-400"
              >
                {subcategory.name} ({subcategory.count})
              </Link>
            ))}
          </div>
        </nav>
      )}
      <div className="container mx-auto px-3 sm:px-4 pt-8 sm:pt-10 max-w-3xl">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          {introParts[0]}{" "}
          {subcategories.length > 0 && (
            <>
              Parcourez les sous-catégories pour choisir une famille de
              matériel&nbsp;:{" "}
              {introSubcategories.map((subcategory, index) => (
                <React.Fragment key={subcategory.slug}>
                  {index > 0 && index === introSubcategories.length - 1 && " et "}
                  {index > 0 && index < introSubcategories.length - 1 && ", "}
                  <Link
                    href={`/categories/${category.slug}/${subcategory.slug}`}
                    className="font-medium text-gray-900 dark:text-white underline underline-offset-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                  >
                    {subcategory.name}
                  </Link>
                </React.Fragment>
              ))}
              .&nbsp;{introTail}
            </>
          )}
        </p>
      </div>
      <CategoryProductsClient
        initialProducts={initialProducts as Product[]}
        heading={category.heading}
        intro={introParts[0]}
        initialCategoryName={category.name}
        lockedCategoryName={category.name}
      />
    </>
  );
}
