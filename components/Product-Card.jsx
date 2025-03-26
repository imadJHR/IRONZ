"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product, variant = "default" }) {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);
  const isFavorite = isInFavorites(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Compact variant for horizontal layouts
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-16 w-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{product.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < product.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews})
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="font-bold text-sm">
              {product.price.toFixed(2)} €
            </span>
            <Button
              onClick={handleAddToCart}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Ajouter au panier</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Special offer variant
  if (variant === "offer") {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-md overflow-hidden border border-yellow-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/produits/${product.id}`} className="block">
          <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-black py-1 px-3 text-xs font-bold text-center">
            OFFRE SPÉCIALE
          </div>

          <div className="relative h-64 overflow-hidden bg-gray-100 pt-6">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <button
              onClick={toggleFavorite}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              />
            </button>
          </div>

          <div className="p-4">
            {product.category && (
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                {product.category}
              </p>
            )}

            <h3 className="font-heading font-semibold text-lg mb-1 line-clamp-1">
              {product.name}
            </h3>

            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < product.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviews})
              </span>
            </div>

            <p className="text-sm text-yellow-700 font-medium mb-2">
              {product.offerText}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-sm mr-2">
                    {product.oldPrice.toFixed(2)} €
                  </span>
                )}
                <span className="text-xl font-bold text-red-600">
                  {product.specialPrice.toFixed(2)} €
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>Ajouter</span>
              </Button>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/produits/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </div>
          )}

          {product.isNew && (
            <Badge className="absolute top-2 right-10 bg-green-500 hover:bg-green-600">
              Nouveau
            </Badge>
          )}

          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            />
          </button>

          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="secondary" size="sm" className="mx-1">
                <Eye className="h-4 w-4 mr-1" />
                Aperçu
              </Button>
            </div>
          )}
        </div>

        <div className="p-4">
          {product.category && (
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {product.category}
            </p>
          )}

          <h3 className="font-heading font-semibold text-lg mb-1 line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-sm mr-2">
                  {product.oldPrice.toFixed(2)} €
                </span>
              )}
              <span className="font-bold text-lg">
                {product.price.toFixed(2)} €
              </span>
            </div>

            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              <span className="sr-only md:not-sr-only md:inline-block">
                Ajouter
              </span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
