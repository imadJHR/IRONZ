"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import { Star, ShoppingCart, Heart, Eye, LucideProps } from "lucide-react";
import { useCart, type CartItem } from "@/context/cart-context";
import { useFavorites, type FavoriteItem } from "@/context/favorites-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Types
export type ProductVariant = "default" | "compact" | "offer";

export interface Product {
  id: string;
  name: string;
  slug?: string;
  image: string | { src: string } | null;
  price: number;
  oldPrice?: number;
  specialPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  category?: string;
  description?: string;
  offerText?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  inStock?: boolean;
  [key: string]: unknown;
}

export interface ProductCardProps {
  product: Product;
  variant?: ProductVariant;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
}

interface ProductCartItem extends Product, Partial<CartItem> {
  quantity?: number;
}

export default function ProductCard({ 
  product, 
  variant = "default", 
  className = "",
  onAddToCart,
  onToggleFavorite 
}: ProductCardProps): JSX.Element {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  const isFavorite = isInFavorites(product.id);

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem: ProductCartItem = {
      ...product,
      quantity: 1,
    };
    addToCart(cartItem);
    onAddToCart?.(product);
  };

  const toggleFavorite = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
    onToggleFavorite?.(product);
  };

  const renderStars = (rating: number): JSX.Element[] => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
          i < Math.floor(rating) 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-gray-300 dark:text-gray-600"
        }`}
        aria-hidden="true"
      />
    ));
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const getImageUrl = (): string => {
    if (!product.image) return "/placeholder.svg";
    if (typeof product.image === "object" && "src" in product.image) {
      return product.image.src;
    }
    return product.image;
  };

  // Compact variant for horizontal layouts
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}>
        <Link href={`/produits/${product.slug || product.id}`} className="relative h-16 w-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
          <Image
            src={getImageUrl()}
            alt={product.name}
            fill
            className="object-cover"
            sizes="64px"
            unoptimized={getImageUrl().startsWith("http")}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/produits/${product.slug || product.id}`} className="block">
            <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center mt-1" aria-label={`Note: ${product.rating} sur 5`}>
            <div className="flex" role="img">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="font-bold text-sm text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <Button
                onClick={toggleFavorite}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                type="button"
              >
                <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} aria-hidden="true" />
                <span className="sr-only">Favoris</span>
              </Button>
              <Button
                onClick={handleAddToCart}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-500/20"
                aria-label="Ajouter au panier"
                type="button"
              >
                <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">Panier</span>
              </Button>
            </div>
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
        className={`group relative bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950/20 dark:to-gray-900 rounded-xl shadow-md overflow-hidden border border-yellow-200 dark:border-yellow-800 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/produits/${product.slug || product.id}`} className="block">
          <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-black py-1 px-3 text-xs font-bold text-center z-10">
            OFFRE SPÉCIALE
          </div>

          <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800 pt-6">
            <Image
              src={getImageUrl()}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={getImageUrl().startsWith("http")}
            />

            <button
              onClick={toggleFavorite}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 transition-colors z-10 shadow-sm"
              aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              type="button"
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"}`}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="p-4">
            {product.category && (
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                {product.category}
              </p>
            )}

            <h3 className="font-heading font-semibold text-lg mb-1 line-clamp-1 text-gray-900 dark:text-white">
              {product.name}
            </h3>

            <div className="flex items-center mb-2" aria-label={`Note: ${product.rating} sur 5`}>
              <div className="flex" role="img">
                {renderStars(product.rating)}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviews})</span>
            </div>

            {product.offerText && (
              <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium mb-2">
                {product.offerText}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {product.oldPrice && (
                  <span className="text-gray-400 dark:text-gray-500 line-through text-sm mr-2">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-xl font-bold text-red-600 dark:text-red-400">
                  {formatPrice(product.specialPrice ?? product.price)}
                </span>
              </div>

              <Button 
                onClick={handleAddToCart} 
                size="sm" 
                className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-black"
                type="button"
              >
                <ShoppingCart className="h-4 w-4 mr-1" aria-hidden="true" />
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
      className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/produits/${product.slug || product.id}`} className="block">
        <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={getImageUrl()}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={getImageUrl().startsWith("http")}
          />

          {product.discount && product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white shadow-sm">
              -{product.discount}%
            </Badge>
          )}

          {product.isNew && (
            <Badge className="absolute top-2 right-10 bg-green-500 hover:bg-green-600 text-white shadow-sm">
              Nouveau
            </Badge>
          )}

          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 transition-colors z-10 shadow-sm"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            type="button"
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"}`}
              aria-hidden="true"
            />
          </button>

          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <Button variant="secondary" size="sm" className="mx-1 bg-white/90 hover:bg-white text-gray-900">
                <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                Aperçu
              </Button>
            </motion.div>
          )}
        </div>

        <div className="p-4">
          {product.category && (
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              {product.category}
            </p>
          )}

          <h3 className="font-heading font-semibold text-lg mb-1 line-clamp-1 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center mb-2" aria-label={`Note: ${product.rating} sur 5`}>
            <div className="flex" role="img">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-gray-400 dark:text-gray-500 line-through text-sm mr-2">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
            </div>

            <Button 
              onClick={handleAddToCart} 
              size="sm" 
              className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-black"
              type="button"
            >
              <ShoppingCart className="h-4 w-4 mr-1" aria-hidden="true" />
              <span className="sr-only md:not-sr-only md:inline-block">Ajouter</span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}