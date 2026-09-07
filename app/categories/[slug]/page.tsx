import { notFound } from "next/navigation";
import CategoryProductsClient from "./CategoryProductsClient";
import type { Product } from "./CategoryProductsClient";
import { getAllProducts } from "../../../lib/products";

const categoryConfig: Record<
  string,
  { names: string[]; heading: string; intro: string }
> = {
  equipements: {
    names: ["equipements", "équipements"],
    heading: "Équipements fitness et musculation",
    intro:
      "Découvrez nos machines et équipements de fitness pour la maison, les salles de sport et les espaces professionnels au Maroc.",
  },
  supplement: {
    names: ["supplement", "supplément"],
    heading: "Suppléments et nutrition sportive",
    intro:
      "Découvrez notre sélection de suppléments et produits de nutrition sportive disponibles avec livraison au Maroc.",
  },
  accessoires: {
    names: ["accessoires"],
    heading: "Accessoires de fitness et musculation",
    intro:
      "Retrouvez nos accessoires pour le fitness, la musculation, la récupération et l'entraînement quotidien au Maroc.",
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = categoryConfig[slug];
  if (!config) notFound();

  const products = await getAllProducts();
  const initialProducts = products.filter((product) =>
    config.names.includes(String(product.category || "").toLowerCase()),
  );
  const canonicalUrl = `https://www.ironz.ma/categories/${slug}`;
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
        name: config.heading,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryProductsClient
        initialProducts={initialProducts as Product[]}
        heading={config.heading}
        intro={config.intro}
      />
    </>
  );
}
