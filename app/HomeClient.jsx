"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Icons
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  StarHalf,
  ShoppingCart,
  Heart,
  X,
  Mail,
  Zap,
  CheckCircle,
  TrendingUp,
  Award,
  Truck,
  Flame,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Loader2,
  Play,
  Eye,
  Clock,
  Grid2X2,
  List,
  Filter,
  SortAsc,
  SortDesc,
  Search,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

// Components
import ReferencesSection from "../components/references-section";
import ServicesSection from "../components/ServicesSection";

// Context & Data
import { useCart } from "../context/cart-context";
import { useFavorites } from "../context/favorites-context";
import { categories } from "../data/product";

// Static Assets
import logo from "../public/logo.png";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";
const PLACEHOLDER = "/placeholder.svg";

// --- UTILS ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
  }).format(price || 0);
};

/* -----------------------------
   ✅ COMPOSANT IMAGE CLOUDINARY
------------------------------ */
function CloudImg({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
  sizes = "100vw",
  width,
  height
}) {
  const [error, setError] = useState(false);
  let source = (src && typeof src === 'object' && src.src) ? src.src : src;
  if (!source || error) source = PLACEHOLDER;

  const isFill = fill || (!width && !height);

  return (
    <Image
      src={source}
      alt={alt || ""}
      loading={priority ? undefined : "lazy"}
      priority={priority}
      fill={isFill}
      width={isFill ? undefined : (width || 800)}
      height={isFill ? undefined : (height || 800)}
      onError={() => setError(true)}
      className={cn(
        isFill ? "absolute inset-0 h-full w-full object-cover" : "",
        className
      )}
      sizes={sizes}
      style={{ objectFit: isFill ? "cover" : "contain" }}
    />
  );
}

/* -----------------------------
   HELPER COMPONENTS
------------------------------ */
function Badge({ className, children }) {
  return <span className={cn("px-2 py-1 text-xs font-bold rounded-md", className)}>{children}</span>;
}

function renderRating(rating) {
  const r = Number(rating) || 0;
  const fullStars = Math.floor(r);
  const hasHalfStar = r % 1 >= 0.5;

  return (
    <div className="flex items-center" aria-label={`Note: ${r} sur 5`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`star-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
      ))}
      {hasHalfStar && <StarHalf className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-star-${i}`} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" aria-hidden="true" />
      ))}
      <span className="ml-1 text-xs sm:text-sm text-gray-500">({r.toFixed(1)})</span>
    </div>
  );
}

/* -----------------------------
   SWIPER NAV BUTTONS
------------------------------ */
function SwiperNavButtons({ prevRef, nextRef, className = "" }) {
  return (
    <div className={cn("flex gap-2", className)}>
      <button
        ref={prevRef}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all shadow-lg group"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rounded-full group-hover:scale-110 transition-transform" />
      </button>
      <button
        ref={nextRef}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all shadow-lg group"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 bg-yellow-500 rounded-full sm:h-5 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

/* -----------------------------
   PRODUCT CARD (Standard)
------------------------------ */
function ProductCard({ product, addToCart, toggleFavorite, isFavorite }) {
  const productId = product._id || product.id;

  const handleAddToCart = () => {
    addToCart({ ...product, id: productId });
  };

  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all h-full flex flex-col group"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="relative h-32 xs:h-40 sm:h-48 overflow-hidden">
        <Link href={`/produit/${product.slug || productId}`} className="block h-full">
          <CloudImg
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {product.isNewProduct && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-black text-[10px] xs:text-xs">
            Nouveau
          </Badge>
        )}
        {Number(product.discount) > 0 && (
          <Badge className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] xs:text-xs">
            -{product.discount}%
          </Badge>
        )}
      </div>

      <div className="p-3 xs:p-4 flex flex-col flex-grow">
        <div className="mb-1 text-[10px] xs:text-xs text-gray-500 dark:text-gray-400 truncate">
          {product.category}
          {product.subCategory && ` • ${product.subCategory}`}
        </div>

        <Link href={`/produit/${product.slug || productId}`} className="group">
          <h2 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 text-sm xs:text-base leading-tight min-h-[2.5rem]">
            {product.name}
          </h2>
        </Link>

        {product.rating != null && (
          <div className="mb-2">
            {renderRating(product.rating)}
          </div>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="flex flex-col xs:flex-row xs:items-center gap-1">
            <span className="text-sm xs:text-base font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] xs:text-xs line-through text-gray-500">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="h-7 w-7 xs:h-8 xs:w-8 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md flex items-center justify-center transition-colors p-0 shrink-0"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart className="h-3 w-3 xs:h-4 xs:w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* -----------------------------
   PRODUCT CARD (Large/Featured)
------------------------------ */
function ProductCardLarge({ product, addToCart, toggleFavorite, isFavorite }) {
  const productId = product._id || product.id;

  const handleAddToCart = () => {
    addToCart({ ...product, id: productId });
  };

  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all h-full flex flex-col group"
      whileHover={{ y: -6 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Link href={`/produit/${product.slug || productId}`} className="block h-full">
          <CloudImg
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleAddToCart}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-md hover:bg-yellow-600 transition-all"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNewProduct && (
            <Badge className="bg-yellow-500 text-black shadow-md text-xs sm:text-sm">
              Nouveau
            </Badge>
          )}
          {Number(product.discount) > 0 && (
            <Badge className="bg-red-500 text-white shadow-md text-xs sm:text-sm">
              -{product.discount}%
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-black text-yellow-500 shadow-md text-xs sm:text-sm">
              <Flame className="w-2 h-2 sm:w-3 sm:h-3 inline mr-1" />
              Populaire
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400 font-medium uppercase tracking-wider truncate">
            {product.brand || product.category}
          </span>
          {product.rating != null && renderRating(product.rating)}
        </div>

        <Link href={`/produit/${product.slug || productId}`}>
          <h2 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2 leading-tight min-h-[2.5rem] sm:min-h-[3rem]">
            {product.name}
          </h2>
        </Link>

        {product.description && (
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs sm:text-sm line-through text-gray-500">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <Link
            href={`/produit/${product.slug || productId}`}
            className="text-yellow-600 hover:text-yellow-700 font-bold text-xs sm:text-sm flex items-center gap-1 group/link whitespace-nowrap"
          >
            Détails
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* -----------------------------
   PRODUCT CARD (Modern Grid Style)
------------------------------ */
function ProductCardModern({ product, addToCart, toggleFavorite, isFavorite, index }) {
  const productId = product._id || product.id;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, id: productId });
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <motion.article
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-yellow-500/50 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      {/* Decorative Number */}
      <div className="absolute -top-4 -right-4 z-0">
        <span className="text-7xl font-black italic text-gray-100 dark:text-gray-800/50 opacity-50">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Link href={`/produit/${product.slug || productId}`} className="block h-full">
          <CloudImg
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNewProduct && (
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-black uppercase rounded-full shadow-lg">
              Nouveau
            </span>
          )}
          {Number(product.discount) > 0 && (
            <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black uppercase rounded-full shadow-lg">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={handleToggleFavorite}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all ${isFavorite
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-white hover:bg-gray-100 text-gray-700'
              }`}
            aria-label={isFavorite ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative z-10 bg-white dark:bg-gray-900">
        {/* Category */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            {product.category}
          </span>
        </div>

        {/* Title */}
        <Link href={`/produit/${product.slug || productId}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.shortDescription && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        )}

        {/* Rating */}
        {product.rating != null && (
          <div className="mb-4">
            {renderRating(product.rating)}
          </div>
        )}

        {/* Price & Actions */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <Link
              href={`/produit/${product.slug || productId}`}
              className="text-sm font-bold text-yellow-600 hover:text-yellow-700 flex items-center gap-2 group/link"
            >
              Voir
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/30 rounded-2xl pointer-events-none transition-all duration-500" />
    </motion.article>
  );
}

/* -----------------------------
   HERO BANNER SLIDE - SPORTIF DESIGN
------------------------------ */
function HeroBannerSlide({ product, index, totalSlides }) {
  const productId = product._id || product.id;

  return (
    <div className="relative  h-full w-full overflow-hidden bg-white ">
      {/* --- LAYER 1: IMAGE --- */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="h-full w-full"
        >
          <CloudImg
            src={product.image}
            alt={product.name}
            // IMPORTANT : object-center force l'image à rester centrée
            className="h-full w-full object-contain object-center "
            width={1280}
            height={500}
            priority={index === 0}
          />
        </motion.div>
        {/* Texture Mesh */}

      </div>

      {/* --- LAYER 2: CONTENT --- */}
      <div className="relative h-full  z-10 flex items-center justify-center sm:justify-start">
        <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl relative mt-58 text-center sm:text-left">

            {/* Tag Ironz */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center sm:justify-start gap-3 mb-2 sm:mb-4"
            >
              <span className="h-1 w-6 sm:w-8 bg-yellow-500"></span>
              <span className="text-yellow-500 font-black italic uppercase tracking-widest text-xs sm:text-sm">
                Ironz Collection
              </span>
            </motion.div>



            {/* BOUTON */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center sm:justify-start"
            >
              <Link
                href={`/produit/${product.slug || productId}`}
                className="group relative inline-block"
              >
                <div className="absolute inset-0 bg-yellow-500 -skew-x-12 transform transition-transform duration-300 group-hover:bg-white shadow-[0_0_20px_rgba(234,179,8,0.4)]" />

                <div className="relative flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4">
                  <span className="font-black italic uppercase text-black text-base sm:text-lg tracking-wide">
                    Voir le produit
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* --- LAYER 3: COMPTEUR MOBILE --- */}
      <div className="absolute bottom-4 left-4 sm:left-8 z-20">
        <div className="flex items-center gap-1 font-mono text-xs sm:text-sm bg-black/50 backdrop-blur px-2 py-1 rounded">
          <span className="text-yellow-500 font-bold">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/40">{String(totalSlides).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
/* -----------------------------
   LATEST PRODUCTS SECTION
------------------------------ */
function LatestProductsSection({ products, addToCart, toggleFavorite, isInFavorites, loadMore, hasMore, loadingMore }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price-low', 'price-high', 'rating'
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = products.reduce((acc, product) => {
      if (product.category && !acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, ['all']);
    return cats;
  }, [products]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(product => {
      const price = Number(product.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, priceRange]);

  // Get price limits
  const priceLimits = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 10000 };
    const prices = products.map(p => Number(p.price) || 0).filter(p => p > 0);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [products]);

  return (
    <section className="py-14 sm:py-18 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-4">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-600 dark:text-yellow-400 font-bold uppercase text-sm tracking-wider">
              Dernières Arrivées
            </span>
          </div>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tight text-gray-900 dark:text-white mb-4">
            Découvrez Nos <span className="text-yellow-500">Nouveautés</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explorez notre collection régulièrement mise à jour avec les derniers équipements de fitness et de musculation.
          </p>
        </div>

        {/* Filters & Controls */}
        <div className="mb-8 sm:mb-12 bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-3">Vue:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                aria-label="Vue grille"
              >
                <Grid2X2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                aria-label="Vue liste"
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex-1 max-w-md">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  Tous
                </button>
                {categories.filter(cat => cat !== 'all').slice(0, 4).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="newest">Nouveautés</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Fourchette de prix</span>
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </span>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                min={priceLimits.min}
                max={priceLimits.max}
                step={100}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
              <input
                type="range"
                min={priceLimits.min}
                max={priceLimits.max}
                step={100}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={{
                    width: `${((priceRange[1] - priceRange[0]) / (priceLimits.max - priceLimits.min)) * 100}%`,
                    marginLeft: `${((priceRange[0] - priceLimits.min) / (priceLimits.max - priceLimits.min)) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <X className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">Essayez de modifier vos filtres de recherche.</p>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCardModern
                    key={product._id || product.id}
                    product={product}
                    addToCart={addToCart}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isInFavorites(product._id || product.id)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-6">
                {filteredProducts.map((product, index) => (
                  <motion.article
                    key={product._id || product.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="sm:w-48 md:w-56 h-48 sm:h-auto relative overflow-hidden">
                        <Link href={`/produit/${product.slug || product._id}`} className="block h-full">
                          <CloudImg
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 200px"
                          />
                        </Link>
                        {product.isNewProduct && (
                          <Badge className="absolute top-3 left-3 bg-yellow-500 text-black text-xs">
                            Nouveau
                          </Badge>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">
                                {product.category}
                              </span>
                              {product.rating != null && renderRating(product.rating)}
                            </div>
                            <Link href={`/produit/${product.slug || product._id}`}>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-yellow-600 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            {product.description && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {product.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {product.features && product.features.slice(0, 3).map((feature, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Price & Actions */}
                          <div className="flex flex-col items-end gap-4">
                            <div className="text-right">
                              <div className="text-2xl font-black text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </div>
                              {product.oldPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.oldPrice)}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => addToCart(product)}
                                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Ajouter
                              </button>
                              <button
                                onClick={() => toggleFavorite(product)}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${isInFavorites(product._id || product.id)
                                  ? 'bg-red-500 hover:bg-red-600 text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                                  }`}
                              >
                                <Heart className={`w-5 h-5 ${isInFavorites(product._id || product.id) ? 'fill-current' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Results Count */}
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative flex items-center gap-3">
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Chargement...
                      </>
                    ) : (
                      <>
                        Voir plus de produits
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* -----------------------------
   MAIN COMPONENT
------------------------------ */
export default function HomeClient({
  initialProducts = [],
  initialVedetteProducts = [],
  initialLatestProducts = [],
  initialLatestTotal = 0
}) {
  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  const [products, setProducts] = useState(initialProducts);
  const [vedetteProducts, setVedetteProducts] = useState(initialVedetteProducts);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Latest products pagination
  const [latestProducts, setLatestProducts] = useState(initialLatestProducts);
  const [latestPage, setLatestPage] = useState(1);
  const [hasMoreLatest, setHasMoreLatest] = useState(initialLatestProducts.length === 12);
  const [loadingLatest, setLoadingLatest] = useState(false);
  const [latestTotal, setLatestTotal] = useState(initialLatestTotal);

  // Swiper Navigation Refs
  const featuredPrevRef = useRef(null);
  const featuredNextRef = useRef(null);
  const newArrivalsPrevRef = useRef(null);
  const newArrivalsNextRef = useRef(null);
  const dealsPrevRef = useRef(null);
  const dealsNextRef = useRef(null);
  const categoryPrevRef = useRef(null);
  const categoryNextRef = useRef(null);

  // Load initial data
  useEffect(() => {
    // Show newsletter popup after 4 seconds
    const timer = setTimeout(() => setShowPopup(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Load latest products with pagination
  const loadLatestProducts = async (page = 1) => {
    if (loadingLatest) return;

    setLoadingLatest(true);
    try {
      const res = await fetch(`${API_URL}/products?page=${page}&limit=12&sort=-createdAt`);
      const json = await res.json();
      const newProducts = json.data || [];
      const total = json.total || 0;

      if (page === 1) {
        setLatestProducts(newProducts);
      } else {
        setLatestProducts(prev => [...prev, ...newProducts]);
      }

      setLatestPage(page);
      setLatestTotal(total);
      setHasMoreLatest(newProducts.length === 12);
    } catch (err) {
      console.error('Failed to load latest products:', err);
    } finally {
      setLoadingLatest(false);
    }
  };

  // Load more latest products
  const loadMoreLatestProducts = () => {
    if (!loadingLatest && hasMoreLatest) {
      loadLatestProducts(latestPage + 1);
    }
  };

  // Memoized product lists
  const featuredVedette = useMemo(() => products.find(p => p.isFeatured && p.discount > 0) || products[0], [products]);
  const newArrivals = useMemo(() => products.filter(p => p.isNewProduct).slice(0, 12), [products]);
  const discountedProducts = useMemo(() => products.filter(p => Number(p.discount) > 0).slice(0, 12), [products]);

  const toggleFavorite = (product) => {
    const id = product._id || product.id;
    if (isInFavorites(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ ...product, id });
    }
  };

  const handleAddToCart = (product) => {
    const id = product._id || product.id;
    addToCart({ ...product, id });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="animate-spin text-yellow-500 mx-auto mb-4 w-16 h-16 sm:w-20 sm:h-20" />
            <div className="absolute inset-0 animate-ping">
              <Loader2 className="text-yellow-500/30 mx-auto w-16 h-16 sm:w-20 sm:h-20" />
            </div>
          </div>
          <p className="text-white text-lg sm:text-xl font-bold tracking-wider">CHARGEMENT...</p>
          <p className="text-gray-500 text-sm mt-2">Préparation de votre expérience fitness</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">

      {/* ===== 1. HERO BANNER - SPORTIF DESIGN ===== */}
      <section className="relative w-full bg-zinc-950 h-[380px] xs:h-[420px] sm:h-[480px] lg:h-[650px] group overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={vedetteProducts.length > 1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1000}
          pagination={{
            clickable: true,
            el: '.custom-pagination', // On garde la barre jaune
          }}
          navigation={{
            prevEl: '.nav-prev',
            nextEl: '.nav-next',
          }}
          className="h-full w-full"
        >
          {vedetteProducts.map((product, i) => (
            <SwiperSlide key={product._id || i}>
              <HeroBannerSlide
                product={product}
                index={i}
                totalSlides={vedetteProducts.length}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- NAVIGATION BUTTONS (Mobile & Desktop) --- */}
        {/* Position : Bottom Right (Coin inférieur droit) */}
        <div className="absolute bottom-0 right-0 z-30 flex">
          {/* BOUTON PRECEDENT */}
          <button className="nav-prev w-12 h-12 sm:w-16 sm:h-16 bg-zinc-900/90 backdrop-blur border-l border-t border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-all duration-300 active:scale-95">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {/* BOUTON SUIVANT */}
          <button className="nav-next w-12 h-12 sm:w-16 sm:h-16 bg-zinc-900/90 backdrop-blur border-l border-r border-t border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-all duration-300 active:scale-95">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

        </div>

        {/* Barre de progression jaune en bas (elle passera SOUS les boutons grâce au z-index) */}
        <div className="absolute bottom-0 left-0 h-1 bg-yellow-500 z-20 custom-pagination-progressbar" />
      </section>

      {/* ===== 2. FLASH DEALS ===== */}
      {discountedProducts.length > 0 && (
        <section className="py-10 sm:py-14 md:py-16 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 20px,
                  rgba(255,255,255,0.1) 20px,
                  rgba(255,255,255,0.1) 21px
                )`
              }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight">
                    Offres Flash
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base mt-1">
                    Jusqu'à -50% sur les produits sélectionnés
                  </p>
                </div>
              </div>
              <SwiperNavButtons prevRef={dealsPrevRef} nextRef={dealsNextRef} />
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              navigation={{
                prevEl: dealsPrevRef.current,
                nextEl: dealsNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = dealsPrevRef.current;
                swiper.params.navigation.nextEl = dealsNextRef.current;
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                360: { slidesPerView: 1.4, spaceBetween: 12 },
                480: { slidesPerView: 2, spaceBetween: 16 },
                640: { slidesPerView: 2.5, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
                1280: { slidesPerView: 5, spaceBetween: 24 },
              }}
              className="!pb-4"
            >
              {discountedProducts.map((product) => (
                <SwiperSlide key={product._id || product.id} className="h-auto">
                  <ProductCard
                    product={product}
                    addToCart={handleAddToCart}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isInFavorites(product._id || product.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* ===== 3. CATEGORIES ===== */}
      <section className="py-16 sm:py-24 bg-neutral-900 text-white overflow-hidden relative">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 -skew-x-12 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1 w-12 bg-yellow-500 skew-x-[-20deg]" />
                <span className="text-yellow-500 font-black uppercase tracking-[0.2em] text-sm italic">
                  Explorez
                </span>
              </div>
              <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
                Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Catégories</span>
              </h2>
            </div>
            {/* Custom navigation buttons would go here - styled angular */}
            <SwiperNavButtons prevRef={categoryPrevRef} nextRef={categoryNextRef} />
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1.15}
            className="!overflow-visible"
            navigation={{
              prevEl: categoryPrevRef.current,
              nextEl: categoryNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = categoryPrevRef.current;
              swiper.params.navigation.nextEl = categoryNextRef.current;
            }}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 24 },
              640: { slidesPerView: 2, spaceBetween: 28 },
              768: { slidesPerView: 2.3, spaceBetween: 32 },
              1024: { slidesPerView: 3, spaceBetween: 36 },
              1280: { slidesPerView: 3.5, spaceBetween: 40 },
            }}
          >
            {categories.map((cat, i) => (
              <SwiperSlide key={i} className="pt-4 pb-8 pl-2">
                <Link
                  href={cat.href}
                  className="group relative h-[400px] xs:h-[450px] sm:h-[500px] block w-full"
                >
                  {/* The Skewed Card Container */}
                  <div className="absolute inset-0 transform -skew-x-6 border-r-4 border-b-4 border-transparent hover:border-yellow-500 transition-all duration-300 bg-neutral-800 overflow-hidden group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0px_0px_rgba(234,179,8,0.2)]">

                    {/* Image Background */}
                    <CloudImg
                      src={cat.image}
                      alt={cat.name}
                      className="transition-transform duration-700 ease-out group-hover:scale-110 group-hover:skew-x-3 opacity-80 group-hover:opacity-100"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Heavy Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Decorative Big Number (Outline) */}
                    <div className="absolute -top-4 -right-2 z-0">
                      <span className="text-9xl font-black italic text-transparent opacity-20 group-hover:opacity-10 transition-opacity duration-300"
                        style={{ WebkitTextStroke: '2px #fff' }}>
                        0{i + 1}
                      </span>
                    </div>

                    {/* Content Wrapper - Unskewing text slightly for readability if desired, or keeping it for effect */}
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10">

                      {/* Badge */}
                      <div className="mb-auto">
                        <span className="inline-block bg-yellow-500 text-black px-3 py-1 text-xs font-black uppercase italic tracking-wider transform skew-x-6">
                          {cat.count || 'Collection'}
                        </span>
                      </div>

                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic leading-[0.85] text-white mb-4 drop-shadow-md">
                          {cat.name}
                        </h3>

                        <div className="h-[2px] w-0 group-hover:w-full bg-yellow-500 transition-all duration-500 ease-out mb-4" />

                        <p className="text-yellow-400 font-bold italic tracking-wide uppercase inline-flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-300 delay-75">
                          S'entrainer <ArrowRight className="w-5 h-5 animate-pulse" />
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* ===== 4. NEW ARRIVALS ===== */}
      {newArrivals.length > 0 && (
        <section className="py-14 sm:py-18 md:py-24 lg:py-28 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                  <span className="text-yellow-500 font-bold uppercase text-xs sm:text-sm tracking-widest">Nouveautés</span>
                </div>
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight">
                  Arrivages <span className="text-yellow-500">Récents</span>
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/product?filter=new"
                  className="text-yellow-600 hover:text-yellow-700 font-bold flex items-center gap-1 text-sm sm:text-base group"
                >
                  Voir tout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <SwiperNavButtons prevRef={newArrivalsPrevRef} nextRef={newArrivalsNextRef} />
              </div>
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: newArrivalsPrevRef.current,
                nextEl: newArrivalsNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = newArrivalsPrevRef.current;
                swiper.params.navigation.nextEl = newArrivalsNextRef.current;
              }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              breakpoints={{
                480: { slidesPerView: 1.3 },
                640: { slidesPerView: 1.5, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 3.5, spaceBetween: 28 },
              }}
            >
              {newArrivals.map((product) => (
                <SwiperSlide key={product._id || product.id} className="h-auto">
                  <ProductCardLarge
                    product={product}
                    addToCart={handleAddToCart}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isInFavorites(product._id || product.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* ===== 5. LATEST PRODUCTS WITH SHOW MORE ===== */}
      <LatestProductsSection
        products={latestProducts}
        addToCart={handleAddToCart}
        toggleFavorite={toggleFavorite}
        isInFavorites={isInFavorites}
        loadMore={loadMoreLatestProducts}
        hasMore={hasMoreLatest}
        loadingMore={loadingLatest}
      />

      {/* ===== 6. FEATURED PRODUCT SPOTLIGHT ===== */}
      {featuredVedette && (
        <section className="py-20 sm:py-28 lg:py-32 bg-gray-950 relative overflow-hidden flex items-center min-h-[800px]">
          {/* Dynamic Background Elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="premium-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M0 60L60 0H30L0 30M60 60V30L30 60" stroke="currentColor" strokeWidth="1" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#premium-grid)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

              {/* Product Image Side - Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="w-full lg:w-1/2 relative"
              >
                {/* Image Backdrop/Pedestal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-full blur-3xl opacity-60 pointer-events-none" />

                <div className="relative z-10 aspect-square max-w-[600px] mx-auto group">
                  <motion.div
                    animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full relative flex items-center justify-center p-8 sm:p-12"
                  >
                    {/* Subdued Glow behind image */}
                    <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-colors duration-700" />

                    <CloudImg
                      src={featuredVedette.image}
                      alt={featuredVedette.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-700 z-10"
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 800px"
                    />
                  </motion.div>

                  {/* Floating Badges */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute top-10 right-0 sm:-right-8 bg-zinc-900/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl shadow-2xl z-20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-500/20 p-2 rounded-full">
                        <Flame className="w-5 h-5 text-yellow-500 animate-pulse" />
                      </div>
                      <span className="text-white font-black italic tracking-wider uppercase text-sm">Best Seller</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="absolute bottom-16 left-0 sm:-left-8 bg-zinc-900/90 backdrop-blur-xl border border-white/10 px-6 py-5 rounded-3xl shadow-2xl z-20 flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Star className="w-7 h-7 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div>
                      <div className="text-white font-black text-2xl leading-none mb-1">4.9<span className="text-gray-500 text-lg">/5</span></div>
                      <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">Avis Clients</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Product Content Side - Right */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Subtle Label */}
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 mb-8 backdrop-blur-sm shadow-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                    </span>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
                      Équipement Vedette
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter text-white mb-6 leading-[0.9]">
                    {featuredVedette.name}
                  </h2>

                  {/* Underline Accent */}
                  <div className="w-24 h-1 bg-yellow-500 mb-8" />

                  {/* Description */}
                  {featuredVedette.description && (
                    <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl font-medium">
                      {featuredVedette.description}
                    </p>
                  )}

                  {/* Price Block */}
                  <div className="flex flex-wrap items-end gap-5 sm:gap-8 mb-12 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800/50 inline-flex">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Prix Exclusif</span>
                      <span className="text-5xl sm:text-6xl font-black text-yellow-500 leading-none">
                        {formatPrice(featuredVedette.price)}
                      </span>
                    </div>
                    {featuredVedette.oldPrice && (
                      <div className="flex flex-col pb-1">
                        <span className="text-xl sm:text-2xl text-gray-500 line-through decoration-2 decoration-red-500/50 mb-2">
                          {formatPrice(featuredVedette.oldPrice)}
                        </span>
                        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Économisez {formatPrice(featuredVedette.oldPrice - featuredVedette.price)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-5 mb-14">
                    <button
                      onClick={(e) => { e.preventDefault(); handleAddToCart(featuredVedette); }}
                      className="group relative flex items-center justify-center gap-3 px-8 sm:px-10 py-5 bg-yellow-500 text-black font-black text-lg uppercase tracking-widest rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.2)] hover:shadow-[0_0_60px_rgba(234,179,8,0.4)] transition-all duration-500 transform hover:-translate-y-1 flex-1 sm:flex-none"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      <ShoppingCart className="w-6 h-6 relative z-10 transition-transform group-hover:scale-110 duration-500" />
                      <span className="relative z-10">Ajouter au panier</span>
                    </button>

                    <Link
                      href={`/produit/${featuredVedette.slug || featuredVedette._id}`}
                      className="group flex items-center justify-center gap-3 px-8 sm:px-10 py-5 bg-zinc-900 text-white border border-zinc-700 hover:border-yellow-500 hover:text-yellow-500 font-bold text-lg uppercase tracking-widest rounded-2xl transition-all duration-500 flex-1 sm:flex-none"
                    >
                      <span>Voir Détails</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                  </div>

                  {/* Trust Indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 border-t border-zinc-800 pt-8">
                    {[
                      { icon: Truck, title: "Livraison Rapide", desc: "Sous 24/48h au Maroc" },
                      { icon: ShieldCheck, title: "Garantie", desc: "2 ans inclus" },
                      { icon: Sparkles, title: "Qualité", desc: "Équipement Premium" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center sm:flex-col sm:items-start gap-4 sm:gap-2">
                        <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 flex-shrink-0">
                          <item.icon className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm tracking-wide">{item.title}</div>
                          <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                </motion.div>
              </div>
            </div>
          </div>

          {/* Background Typography */}
          <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none z-0 opacity-[0.02] -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none mix-blend-overlay">
            <h2 className="text-[20vw] font-black uppercase italic whitespace-nowrap text-white text-center leading-none tracking-tighter">
              IRONZ
            </h2>
            <h2 className="text-[20vw] font-black uppercase italic whitespace-nowrap text-transparent text-center leading-none tracking-tighter" style={{ WebkitTextStroke: '2px white' }}>
              PRO GEAR
            </h2>
          </div>
        </section>
      )}

      {/* References Section */}
      <ReferencesSection />

      {/* ===== 7. WHY CHOOSE US ===== */}
      <section className="py-14 sm:py-18 md:py-24 lg:py-28 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
            <span className="text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest text-xs sm:text-sm block mb-3">
              Nos Engagements
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black italic text-gray-900 dark:text-white mb-6 tracking-tight">
              Pourquoi Choisir <span className="text-yellow-500">IRONZ</span> ?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Nous ne vendons pas seulement du matériel, nous vous offrons l'assurance d'atteindre vos objectifs avec des équipements professionnels.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Qualité Professionnelle Garantie",
                text: "Chaque produit est rigoureusement sélectionné pour sa durabilité et sa performance."
              },
              {
                icon: Truck,
                title: "Livraison Rapide & Sécurisée",
                text: "Expédition express sous 24/48h partout au Maroc avec suivi en temps réel."
              },
              {
                icon: TrendingUp,
                title: "Expertise & Conseils Gratuits",
                text: "Notre équipe d'experts vous guide pour choisir l'équipement adapté à vos objectifs."
              },
              {
                icon: Award,
                title: "Meilleur Rapport Qualité/Prix",
                text: "Prix compétitifs négociés directement avec les fabricants."
              },
              {
                icon: ShieldCheck,
                title: "Service Après-Vente Réactif",
                text: "SAV basé au Maroc disponible 7j/7 pour vous apporter une solution immédiate."
              },
              {
                icon: Heart,
                title: "Satisfait ou Remboursé",
                text: "14 jours pour retourner vos produits si vous n'êtes pas convaincu."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-yellow-500/30 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-gray-700 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-sm group-hover:scale-110 group-hover:bg-yellow-500 transition-all duration-300">
                  <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500 group-hover:text-black transition-colors" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-black hover:bg-yellow-500 text-white hover:text-black p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Retour en haut"
      >
        <CloudImg src={logo} alt="logo" className="w-6 h-6 sm:w-8 sm:h-8" />
      </motion.button>

    </main>
  );
}