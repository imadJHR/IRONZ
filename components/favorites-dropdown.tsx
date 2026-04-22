"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Trash2, ShoppingCart, LucideProps } from "lucide-react";
import { useFavorites, type FavoriteItem } from "../context/favorites-context";
import { useCart, type CartItem } from "../context/cart-context";
import { Button } from "../components/ui/button";
import { MouseEvent } from "react";

// Types
export interface FavoritesDropdownProps {
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

interface FavoriteCartItem extends FavoriteItem, Partial<CartItem> {
  quantity?: number;
}

// Animation variants with proper Framer Motion typing
const dropdownVariants: Variants = {
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
};

export default function FavoritesDropdown({ 
  className = "", 
  onOpen, 
  onClose 
}: FavoritesDropdownProps) {
  const { favorites, favoritesOpen, toggleFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleClose = (): void => {
    toggleFavorites();
    onClose?.();
  };

  const handleAddToCart = (item: FavoriteItem, e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem: FavoriteCartItem = {
      ...item,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  const handleRemoveFavorite = (id: string, e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    removeFromFavorites(id);
  };

  const handleToggleFavorites = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    toggleFavorites();
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {favoritesOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
          className={`fixed right-4 top-20 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 border border-gray-100 dark:border-gray-700 overflow-hidden md:absolute md:right-4 md:top-16 md:w-96 ${className}`}
          role="dialog"
          aria-label="Liste des favoris"
          aria-modal="true"
        >
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-white" id="favorites-title">
              Vos Favoris
            </h3>
            <button
              onClick={handleToggleFavorites}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-1 rounded"
              aria-label="Fermer la liste des favoris"
              type="button"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {favorites.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p className="mb-3">Votre liste de favoris est vide</p>
              <Link 
                href="/produits" 
                className="text-yellow-600 dark:text-yellow-400 hover:underline text-sm font-medium"
                onClick={handleClose}
              >
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            <>
              <div 
                className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700"
                role="list"
                aria-labelledby="favorites-title"
              >
                {favorites.map((item: FavoriteItem) => (
                  <div 
                    key={item.id} 
                    className="p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    role="listitem"
                  >
                    <div className="w-16 h-16 relative flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized={item.image?.startsWith("http")}
                      />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate" title={item.name}>
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <button
                          onClick={(e) => handleAddToCart(item, e)}
                          className="text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 flex items-center transition-colors"
                          aria-label={`Ajouter ${item.name} au panier`}
                          type="button"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" aria-hidden="true" />
                          Ajouter
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemoveFavorite(item.id, e)}
                      className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-1 ml-2 rounded transition-colors"
                      aria-label={`Retirer ${item.name} des favoris`}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleClose} 
                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    type="button"
                  >
                    Continuer
                  </Button>
                  <Link href="/favoris" onClick={handleClose}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900">
                      Voir tous
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}