"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useFavorites } from "@/context/FavoritesContext"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"

export default function FavoritesDropdown({ isMobile = false }) {
  const { favorites, favoritesOpen, toggleFavorites, removeFromFavorites, clearFavorites } = useFavorites()
  const { addToCart } = useCart()

  if (!favoritesOpen) return null

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: isMobile ? -20 : 10, scale: 0.95 },
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
      y: isMobile ? -20 : 10,
      scale: 0.95,
      transition: {
        duration: 0.15,
      },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={dropdownVariants}
        className={`
          fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700
          ${isMobile ? "top-16 left-0 right-0 mx-4" : "absolute right-0 mt-2 w-80"}
        `}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-heading font-bold text-lg">Vos Favoris</h3>
          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                aria-label="Vider les favoris"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={toggleFavorites}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
              <svg
                className="h-6 w-6 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Votre liste de favoris est vide</p>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFavorites}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Continuer mes achats
            </Button>
          </div>
        ) : (
          <>
            <div className="max-h-[60vh] overflow-y-auto">
              {favorites.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center">
                  <div className="w-16 h-16 relative flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <Link
                      href={`/produits/${item.id}`}
                      className="font-medium text-sm hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-1"
                      onClick={toggleFavorites}
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{item.price.toFixed(2)} €</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Button
                        onClick={() => removeFromFavorites(item.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">Retirer</span>
                      </Button>

                      <Button
                        onClick={() => {
                          addToCart(item)
                          removeFromFavorites(item.id)
                        }}
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        <span className="text-xs">Ajouter au panier</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={toggleFavorites}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Fermer
                </Button>
                <Link href="/favoris" onClick={toggleFavorites}>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900">
                    Voir tous
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

