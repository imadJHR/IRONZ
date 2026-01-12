import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Toutes les catégories | IRONZ PRO",
  description:
    "Découvrez toutes nos catégories de produits fitness et arts martiaux",
};

async function getProducts() {
  try {
    const res = await fetch(
      "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api/products",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default async function CategoriesPage() {
  const data = await getProducts();

  let products = [];
  if (Array.isArray(data)) {
    products = data;
  } else if (data && Array.isArray(data.products)) {
    products = data.products;
  } else if (data && Array.isArray(data.data)) {
    products = data.data;
  }

  const categoriesMap = new Map();

  if (products.length > 0) {
    products.forEach((product) => {
      // 1. Skip if no category name
      if (!product.category) return;

      const catName = product.category;

      // 2. Safer image check: Ensure it is a valid string
      let imageUrl = "/placeholder.svg";
      if (product.image && typeof product.image === "string" && product.image.startsWith("http")) {
        imageUrl = product.image;
      }

      if (!categoriesMap.has(catName)) {
        categoriesMap.set(catName, {
          id: catName,
          name: catName,
          image: imageUrl,
          description: `Découvrez notre gamme de ${catName}`,
          productCount: 1,
          slug: slugify(catName),
        });
      } else {
        const cat = categoriesMap.get(catName);
        cat.productCount += 1;
        // Optional: Update image if the current one is a placeholder but this product has a real image
        if (cat.image === "/placeholder.svg" && imageUrl !== "/placeholder.svg") {
          cat.image = imageUrl;
        }
      }
    });
  }

  const categories = Array.from(categoriesMap.values());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <Link
          href="/"
          className="inline-flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">
          Toutes nos catégories
        </h1>

        {categories.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
             <div className="flex flex-col items-center justify-center space-y-3">
               <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                 Aucune catégorie trouvée
               </p>
               <p className="text-gray-500 dark:text-gray-400">
                 Impossible de charger les produits pour le moment.
               </p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    // IMPORTANT: unoptimized bypasses the Next.js image optimization server.
                    // This fixes crashes caused by external domains (Cloudinary) not being in next.config.js
                    unoptimized={true} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl font-heading font-bold text-white mb-1">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {category.productCount} produits
                    </span>
                    <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium group-hover:underline flex items-center">
                      Découvrir
                      <svg
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}