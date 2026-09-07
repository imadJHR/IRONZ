import type { MetadataRoute } from "next";
import { categories } from "../data/product";
import { getAllProducts, productSlug, productUpdatedAt } from "../lib/products";

const baseUrl = "https://www.ironz.ma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/produit`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/demande-devis`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/a-propos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/conditions`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = [
    "/services/personnalisation-accessoires",
    "/services/amenagement-salle",
    "/services/amenagement-salle/home-gym",
    "/services/amenagement-salle/salle-professionnelle",
    "/services/revetement-sol-mur",
    "/services/espace-enfance",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productRoutes = products.map((product) => {
      const lastModified = productUpdatedAt(product);
      return {
        url: `${baseUrl}/produit/${productSlug(product)}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });
  } catch {
    // Keep the static sitemap available if the catalogue API is temporarily down.
  }

  return [...routes, ...categoryRoutes, ...serviceRoutes, ...productRoutes];
}
