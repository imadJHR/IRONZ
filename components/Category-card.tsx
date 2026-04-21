import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LucideProps } from "lucide-react";

// Types
export interface Category {
  id: string;
  name: string;
  href: string;
  image: string | { src: string } | null;
  description?: string;
  featured?: boolean;
  productCount?: number;
  [key: string]: unknown;
}

export interface CategoryCardProps {
  category: Category;
  className?: string;
  priority?: boolean;
}

export default function CategoryCard({ 
  category, 
  className = "", 
  priority 
}: CategoryCardProps): JSX.Element {
  // Create a clean slug for the URL with fallback handling
  const getSlug = (href: string): string => {
    const parts = href.split("/").filter(Boolean);
    return parts[parts.length - 1] || "uncategorized";
  };

  const slug = getSlug(category.href);
  const imageUrl = typeof category.image === "object" && category.image !== null && "src" in category.image
    ? category.image.src
    : category.image || "/placeholder.svg";

  const isPriority = priority ?? category.featured ?? false;

  return (
    <Link
      href={`/categories/${slug}`}
      className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${className}`}
      aria-label={`Voir la catégorie ${category.name}`}
    >
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={category.description ? `${category.name} - ${category.description}` : category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={isPriority}
          unoptimized={imageUrl.startsWith("http")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" aria-hidden="true" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-heading text-xl font-bold mb-1 drop-shadow-sm">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-sm text-gray-200 mb-2 line-clamp-2 drop-shadow-sm">
            {category.description}
          </p>
        )}
        <div className="flex items-center text-yellow-400 dark:text-yellow-300 font-medium text-sm group-hover:underline focus:underline">
          Découvrir
          <ArrowRight 
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" 
            aria-hidden="true" 
          />
        </div>
        {category.productCount !== undefined && category.productCount > 0 && (
          <span 
            className="absolute top-4 right-4 bg-yellow-500 dark:bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-sm"
            aria-label={`${category.productCount} produits dans cette catégorie`}
          >
            {category.productCount} {category.productCount === 1 ? "produit" : "produits"}
          </span>
        )}
      </div>
    </Link>
  );
}