"use client"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Trash2, Star } from "lucide-react"
import { motion } from "framer-motion"

import { useFavorites } from "@/context/favorites-context"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"

export default function FavoritesList() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites()
  const { addToCart } = useCart()

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <Heart className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-heading font-semibold mb-2">Votre liste de favoris est vide</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Explorez notre catalogue et ajoutez des produits à vos favoris
        </p>
        <Link href="/">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Découvrir nos produits</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          {favorites.length} {favorites.length > 1 ? "produits" : "produit"} dans vos favoris
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={clearFavorites}
          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Vider la liste
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative">
              <Link href={`/produits/${product.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </Link>
              <button
                onClick={() => removeFromFavorites(product.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              </button>
            </div>

            <div className="p-4">
              {product.category && (
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {product.category}
                </p>
              )}

              <Link href={`/produits/${product.id}`}>
                <h3 className="font-heading font-semibold text-lg mb-1 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm mr-2">{product.oldPrice.toFixed(2)} €</span>
                  )}
                  <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => removeFromFavorites(product.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <Button
                    onClick={() => addToCart(product)}
                    size="sm"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only md:inline-block">Ajouter</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

