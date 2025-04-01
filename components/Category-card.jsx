import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function CategoryCard({ category }) {
  // Création d'un slug propre pour l'URL
  const slug = category.href.split("/").pop()

  return (
    <Link
      href={`/categories/${slug}`}
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-64 w-full">
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={category.featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-heading text-xl font-bold mb-1">{category.name}</h3>
        <p className="text-sm text-gray-200 mb-2 line-clamp-2">{category.description}</p>
        <div className="flex items-center text-yellow-400 dark:text-yellow-300 font-medium text-sm group-hover:underline">
          Découvrir
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
        {category.productCount && (
          <div className="absolute top-4 right-4 bg-yellow-500 dark:bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
            {category.productCount} produits
          </div>
        )}
      </div>
    </Link>
  )
}

