import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function CategoryCard({ category }) {
  return (
    <Link href={category.href} className="group relative overflow-hidden rounded-xl shadow-lg">
      <div className="relative h-64 w-full">
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-heading text-xl font-bold mb-1">{category.name}</h3>
        <p className="text-sm text-gray-200 mb-2 line-clamp-2">{category.description}</p>
        <div className="flex items-center text-yellow-400 font-medium text-sm group-hover:underline">
          Découvrir
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

