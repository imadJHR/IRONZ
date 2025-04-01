"use client"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, ShoppingCart } from "lucide-react"
import { useFavorites } from "@/context/favorites-context"
import { useCart } from "@/context/cart-context"

import { Button } from "@/components/ui/button"

export default function FavoritesDropdown() {
  const { favorites, favoritesOpen, toggleFavorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.15,
      },
    },
  }

  return (
    <AnimatePresence>
      {favoritesOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
          className="fixed right-4 top-20 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 border border-gray-100 dark:border-gray-700 overflow-hidden md:absolute md:right-4 md:top-16 md:w-96"
        >
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-white">Vos Favoris</h3>
            <button
              onClick={toggleFavorites}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {favorites.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">Votre liste de favoris est vide</div>
          ) : (
            <>
              <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                {favorites.map((item) => (
                  <div key={item.id} className="p-4 flex items-center">
                    <div className="w-16 h-16 relative flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.price.toFixed(2)} €</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <button
                          onClick={() => addToCart(item)}
                          className="text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 flex items-center"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-1 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={toggleFavorites} className="border-gray-200 dark:border-gray-700">
                    Continuer
                  </Button>
                  <Link href="/favoris">
                    <Button className="w-full">Voir tous</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

