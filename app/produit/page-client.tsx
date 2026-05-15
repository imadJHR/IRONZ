"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  ChangeEvent,
  memo,
} from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  ShoppingCart,
  Grid,
  List,
  Flame,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Zap,
  ArrowRight,
  Sparkles,
  Heart,
  Tag,
  Layers,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCart } from "../../context/cart-context";
import { useFavorites } from "../../context/favorites-context";

// ─── TYPES ──────────────────────────────────────────────
interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  oldPrice?: number;
  image?: string;
  slug?: string;
  category?: string;
  subCategory?: string;
  description?: string;
  brand?: string;
  discount?: number;
  isNewProduct?: boolean;
  isFeatured?: boolean;
  inStock?: boolean;
  stockQuantity?: number;
  tags?: string[];
  createdAt?: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

interface FilterState {
  search: string;
  category: string;
  subCategory: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sort: string;
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  handleAddToCart: (e: React.MouseEvent, product: Product) => void;
  index: number;
}

// ─── CONSTANTS ──────────────────────────────────────────
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";

const PLACEHOLDER = "/placeholder.svg";

const SORT_OPTIONS = [
  { value: "featured", label: "Populaires", icon: "🔥" },
  { value: "newest", label: "Nouveautés", icon: "✨" },
  { value: "price-asc", label: "Prix Croissant", icon: "↑" },
  { value: "price-desc", label: "Prix Décroissant", icon: "↓" },
];

const ANIMATION_DURATION = { fast: 0.15, normal: 0.25, slow: 0.4 };

// ─── UTILITIES ──────────────────────────────────────────
const formatPrice = (price: number): string =>
  new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
  }).format(price || 0);

const getProductId = (p: Product): string => p._id || p.id || "";

const getDiscount = (product: Product): number =>
  product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product.discount || 0;

const isProductOutOfStock = (product: Product): boolean =>
  !product.inStock || product.stockQuantity === 0;

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// ─── GENERATE SLUG ─────────────────────────────────────
const generateSlug = (name: string, id?: string): string => {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return id ? `${base}-${id.slice(-6)}` : base;
};

// ─── CLOUD IMAGE ─────────────────────────────────────────
const CloudImg = memo(
  ({
    src,
    alt,
    className = "",
    priority = false,
    fill = false,
  }: {
    src?: string;
    alt: string;
    className?: string;
    priority?: boolean;
    fill?: boolean;
  }) => {
    const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);

    useEffect(() => {
      if (src?.startsWith("http")) setImgSrc(src);
      else if (src)
        setImgSrc(
          `https://res.cloudinary.com/dypjgpisl/image/upload/q_auto,f_auto/${src}`
        );
      else setImgSrc(PLACEHOLDER);
    }, [src]);

    return (
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : 800}
        height={fill ? undefined : 800}
        fill={fill}
        priority={priority}
        onError={() => setImgSrc(PLACEHOLDER)}
        className={`object-cover ${className}`}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }
);
CloudImg.displayName = "CloudImg";

// ─── SKELETON ────────────────────────────────────────────
const Skeleton = memo(({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-xl ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
  </div>
));
Skeleton.displayName = "Skeleton";

// ─── BADGE ───────────────────────────────────────────────
const Badge = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
        className
      )}
    >
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

// ─── PRODUCT CARD ─────────────────────────────────────────
const ProductCard = memo(function ProductCard({
  product,
  viewMode = "grid",
  handleAddToCart,
  index,
}: ProductCardProps) {
  const productId = getProductId(product);
  const imgSrc = product.image || PLACEHOLDER;
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = isInFavorites(productId);
  const discount = getDiscount(product);
  const isOutOfStock = isProductOutOfStock(product);

  const handleFavoriteToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isFavorite) removeFromFavorites(productId);
      else addToFavorites({ ...product, id: productId } as any);
    },
    [isFavorite, productId, product, addToFavorites, removeFromFavorites]
  );

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATION.normal,
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // ── LIST MODE ─────────────────────────────────────────
  if (viewMode === "list") {
    return (
      <motion.article
        layout
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-yellow-200 dark:hover:border-yellow-900/50 transition-all duration-300 flex"
      >
        {/* Image – largeur adaptative */}
        <div className="relative w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] shrink-0 overflow-hidden bg-gray-50 dark:bg-gray-800">
          <Link
            href={`/produit/${product.slug || productId}`}
            className="block w-full h-full min-h-[140px] sm:min-h-[180px]"
          >
            <CloudImg
              src={imgSrc}
              alt={product.name}
              className="w-full h-full group-hover:scale-105 transition-transform duration-500"
              fill
            />
          </Link>
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {discount > 0 && (
              <Badge className="bg-red-500 text-white shadow-sm">
                <Zap className="w-2.5 h-2.5" />
                -{discount}%
              </Badge>
            )}
            {product.isNewProduct && (
              <Badge className="bg-yellow-500 text-black shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
                <span className="hidden xs:inline">Nouveau</span>
              </Badge>
            )}
          </div>
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 backdrop-blur-sm">
              <span className="text-white font-black text-xs sm:text-sm uppercase tracking-widest px-2 sm:px-3 py-1 border border-white/50 rounded-lg">
                Rupture
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
            <span className="text-[10px] sm:text-[11px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider truncate">
              {product.brand || product.category}
            </span>
            {product.subCategory && (
              <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                {product.subCategory}
              </span>
            )}
          </div>

          <Link href={`/produit/${product.slug || productId}`}>
            <h2 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors leading-tight">
              {product.name}
            </h2>
          </Link>

          {product.description && (
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed hidden xs:block">
              {product.description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between flex-wrap gap-2 sm:gap-3">
            <div>
              <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-base sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-xs sm:text-sm line-through text-gray-400 dark:text-gray-600">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
              {product.inStock !== undefined && (
                <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      product.inStock ? "bg-emerald-500" : "bg-red-500"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs font-medium",
                      product.inStock
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {product.inStock
                      ? `${product.stockQuantity || "En"} en stock`
                      : "Rupture"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleAddToCart(e, product)}
                disabled={isOutOfStock}
                className={cn(
                  "h-8 sm:h-9 px-2.5 sm:px-4 rounded-xl flex items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-xs uppercase tracking-wider border-2 transition-all",
                  isOutOfStock
                    ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-400 border-yellow-600 hover:border-yellow-500 text-black shadow-sm hover:shadow-md"
                )}
              >
                <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="hidden sm:inline">Ajouter</span>
              </motion.button>

              <Link
                href={`/produit/${product.slug || productId}`}
                className="h-8 sm:h-9 px-2.5 sm:px-4 rounded-xl flex items-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-xs uppercase tracking-wider border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all"
              >
                <span className="hidden sm:inline">Voir</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // ── GRID MODE ─────────────────────────────────────────
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-yellow-200 dark:hover:border-yellow-900/50 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 aspect-[4/3]">
        <Link
          href={`/produit/${product.slug || productId}`}
          className="block w-full h-full"
        >
          <CloudImg
            src={imgSrc}
            alt={product.name}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            fill
            priority={index < 8}
          />
        </Link>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-[1]" />

        {/* Action buttons */}
        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 flex flex-col gap-1.5 z-10 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200">

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleAddToCart(e, product)}
            disabled={isOutOfStock}
            className={cn(
              "h-7 w-7 sm:h-8 sm:w-8 rounded-xl flex items-center justify-center shadow-md transition-all",
              isOutOfStock
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-400 text-black"
            )}
          >
            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </motion.button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10">
          {product.isNewProduct && (
            <Badge className="bg-yellow-500 text-black shadow-sm">
              <Sparkles className="w-2.5 h-2.5" />
              <span className="hidden xs:inline">Nouveau</span>
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-red-500 text-white shadow-sm">
              <Zap className="w-2.5 h-2.5" />
              -{discount}%
            </Badge>
          )}
          {product.isFeatured && discount === 0 && !product.isNewProduct && (
            <Badge className="bg-gray-900 dark:bg-white text-yellow-400 dark:text-gray-900 shadow-sm">
              <Flame className="w-2.5 h-2.5" />
              Top
            </Badge>
          )}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-white font-black text-xs sm:text-sm uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 border border-white/40 rounded-lg">
              Rupture
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-[11px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider truncate">
            {product.brand || product.category}
          </span>
          {product.subCategory && (
            <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
              {product.subCategory}
            </span>
          )}
        </div>

        <Link href={`/produit/${product.slug || productId}`}>
          <h2 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h2>
        </Link>

        <div className="flex-grow" />

        <div className="border-t border-gray-100 dark:border-gray-800 pt-2.5 sm:pt-3 mt-2 space-y-2 sm:space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-[10px] sm:text-xs line-through text-gray-400 dark:text-gray-600 ml-1.5 sm:ml-2">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            {product.inStock !== undefined && (
              <div className="flex items-center gap-1">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full shrink-0",
                    product.inStock ? "bg-emerald-500" : "bg-red-500"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] sm:text-[11px] font-medium",
                    product.inStock
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {product.inStock ? "En stock" : "Rupture"}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={(e) => handleAddToCart(e, product)}
              disabled={isOutOfStock}
              className={cn(
                "flex-1 h-8 sm:h-9 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all",
                isOutOfStock
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-gray-700"
                  : "bg-yellow-500 hover:bg-yellow-400 text-black border border-yellow-600 hover:border-yellow-500 shadow-sm hover:shadow-md"
              )}
            >
              <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate">
                {isOutOfStock ? "Indisponible" : "Panier"}
              </span>
            </motion.button>

            <Link
              href={`/produit/${product.slug || productId}`}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all shrink-0"
            >
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
});
ProductCard.displayName = "ProductCard";

// ─── CATEGORY PILLS ──────────────────────────────────────
interface CategoryPillsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (cat: string) => void;
}

const CategoryPills = memo(
  ({ categories, selectedCategory, onSelect }: CategoryPillsProps) => (
    <div className="flex flex-nowrap gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect("")}
        className={cn(
          "px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap",
          selectedCategory === ""
            ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md"
            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
        )}
      >
        Tous
      </motion.button>
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat)}
          className={cn(
            "px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap",
            selectedCategory === cat
              ? "bg-yellow-500 text-black border-yellow-600 shadow-md"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:text-yellow-600"
          )}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  )
);
CategoryPills.displayName = "CategoryPills";

// ─── SUBCATEGORY PILLS ───────────────────────────────────
interface SubCategoryPillsProps {
  subCategories: string[];
  selectedSubCategory: string;
  onSelect: (sub: string) => void;
}

const SubCategoryPills = memo(
  ({ subCategories, selectedSubCategory, onSelect }: SubCategoryPillsProps) => {
    if (!subCategories.length) return null;
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-nowrap gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar"
      >
        <button
          onClick={() => onSelect("")}
          className={cn(
            "px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap",
            selectedSubCategory === ""
              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700"
              : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-yellow-300 hover:text-yellow-600"
          )}
        >
          <Layers className="w-3 h-3" />
          Toutes
        </button>
        {subCategories.map((sub) => (
          <button
            key={sub}
            onClick={() => onSelect(sub)}
            className={cn(
              "px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap",
              selectedSubCategory === sub
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700"
                : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-yellow-300 hover:text-yellow-600"
            )}
          >
            <Tag className="w-3 h-3" />
            {sub}
          </button>
        ))}
      </motion.div>
    );
  }
);
SubCategoryPills.displayName = "SubCategoryPills";

// ─── FILTER CHIP ─────────────────────────────────────────
const colorMap = {
  yellow:
    "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300",
  blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  purple:
    "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300",
  green:
    "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
  emerald:
    "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
};

const FilterChip = memo(
  ({
    label,
    color,
    onRemove,
  }: {
    label: string;
    color: keyof typeof colorMap;
    onRemove: () => void;
  }) => (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={cn(
        "inline-flex items-center gap-1 sm:gap-1.5 pl-2 sm:pl-3 pr-1 sm:pr-1.5 py-0.5 sm:py-1 rounded-full border text-[10px] sm:text-xs font-semibold",
        colorMap[color]
      )}
    >
      <span className="truncate max-w-[120px] sm:max-w-none">{label}</span>
      <button
        onClick={onRemove}
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors shrink-0"
      >
        <X className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
      </button>
    </motion.span>
  )
);
FilterChip.displayName = "FilterChip";

// ─── FETCH ────────────────────────────────────────────────
export async function getProducts(query?: string): Promise<Product[]> {
  try {
    const allProducts: Product[] = [];
    let page = 1;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const base = query
        ? `${API_URL}/products?${query}`
        : `${API_URL}/products?`;
      const url = `${base}&limit=${limit}&page=${page}`;

      const res = await fetch(url, {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      let batch: Product[] =
        data.data || data.products || (Array.isArray(data) ? data : []);

      // Ensure every product has a slug (generate if missing)
      batch = batch.map((p: Product) => ({
        ...p,
        slug: p.slug || generateSlug(p.name, p._id || p.id),
      }));

      allProducts.push(...batch);

      if (batch.length < limit) {
        hasMore = false;
      } else if (data.total && allProducts.length >= data.total) {
        hasMore = false;
      } else if (
        data.pagination?.totalPages &&
        page >= data.pagination.totalPages
      ) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allProducts;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products?slug=${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const product = data.data?.[0] || data.products?.[0] || null;
    if (product && !product.slug) {
      product.slug = slug;
    }
    return product;
  } catch {
    return null;
  }
}

// ─── MAIN PAGE ────────────────────────────────────────────
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [maxProductPrice, setMaxProductPrice] = useState(100000);

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams?.get("q") || "",
    category: searchParams?.get("category") || "",
    subCategory: searchParams?.get("subCategory") || "",
    minPrice: 0,
    maxPrice: 100000,
    inStockOnly: false,
    sort: "featured",
  });

  // ── Fetch ──────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setIsSyncing(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setFiltered(data);
        setLastSyncedAt(new Date());
        if (data.length) {
          const prices = data.map((p) => p.price).filter(Boolean);
          const max = Math.ceil(Math.max(...prices));
          setMaxProductPrice(max);
          setFilters((prev) => ({ ...prev, maxPrice: max }));
        }
      } catch {
        showToast("Erreur de chargement", "error");
      } finally {
        setLoading(false);
        setIsSyncing(false);
      }
    };
    load();
  }, []);

  // ── Filter & Sort ──────────────────────────────────────
  useEffect(() => {
    let result = [...products];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (filters.category)
      result = result.filter((p) => p.category === filters.category);
    if (filters.subCategory)
      result = result.filter((p) => p.subCategory === filters.subCategory);
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );
    if (filters.inStockOnly) result = result.filter((p) => p.inStock);
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
      default:
        result.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
    }
    setFiltered(result);
  }, [products, filters]);

  const showToast = useCallback(
    (message: string, type: ToastState["type"]) => {
      setToast({ show: true, message, type });
      setTimeout(
        () => setToast({ show: false, message: "", type: "success" }),
        3000
      );
    },
    []
  );

  const handleAddToCart = useCallback(
    (e: React.MouseEvent, product: Product) => {
      e.preventDefault();
      e.stopPropagation();
      if (isProductOutOfStock(product)) return;
      addToCart({
        id: getProductId(product),
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        quantity: 1,
      });
      showToast("Ajouté au panier ✓", "success");
    },
    [addToCart, showToast]
  );

  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: any) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleCategoryChange = useCallback((cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat, subCategory: "" }));
  }, []);

  const handleSubCategoryChange = useCallback((sub: string) => {
    setFilters((prev) => ({ ...prev, subCategory: sub }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "",
      subCategory: "",
      minPrice: 0,
      maxPrice: maxProductPrice,
      inStockOnly: false,
      sort: "featured",
    });
  }, [maxProductPrice]);

  // ── Derived ────────────────────────────────────────────
  const categories = useMemo(
    () =>
      [
        ...new Set(products.map((p) => p.category).filter(Boolean)),
      ].sort() as string[],
    [products]
  );

  const subCategories = useMemo(() => {
    const base = filters.category
      ? products.filter((p) => p.category === filters.category)
      : products;
    return [
      ...new Set(base.map((p) => p.subCategory).filter(Boolean)),
    ].sort() as string[];
  }, [products, filters.category]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    products.forEach((p) => {
      if (p.category) stats[p.category] = (stats[p.category] || 0) + 1;
    });
    return stats;
  }, [products]);

  const activeFilterCount =
    (filters.search ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.subCategory ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < maxProductPrice ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const seoTitle = "Nos Produits - IRONZ | Équipement Sportif Premium";
  const seoDescription =
    "Découvrez notre gamme complète d'équipements sportifs premium. Livraison rapide au Maroc.";

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ironz.ma/produit" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
      </Head>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        /* Hide scrollbar for pills */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* ── TOAST ─────────────────────────────────────── */}
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-4 right-4 z-50 max-w-[calc(100vw-2rem)] break-words"
            >
              <div
                className={cn(
                  "flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl shadow-2xl border font-semibold text-xs sm:text-sm",
                  toast.type === "success"
                    ? "bg-emerald-600 border-emerald-700 text-white"
                    : "bg-red-600 border-red-700 text-white"
                )}
              >
                {toast.type === "success" ? (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                {toast.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HEADER ────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 lg:py-12">
            <header className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
                Tous nos{" "}
                <span className="text-yellow-500">Produits</span>
              </h1>

              {/* Sync indicator */}
              <div className="flex items-center justify-center gap-2 mt-1 mb-2 min-h-[20px] sm:min-h-[24px]">
                {isSyncing ? (
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 dark:text-gray-500">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Synchronisation...
                  </span>
                ) : lastSyncedAt ? (
                  <span className="text-[11px] sm:text-xs text-gray-300 dark:text-gray-600">
                    Mis à jour à{" "}
                    {lastSyncedAt.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                ) : null}
              </div>

              {/* Active search indicator */}
              {filters.search && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 sm:mt-3 mb-1 flex items-center justify-center gap-2 flex-wrap px-4"
                >
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Résultats pour :
                  </span>
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-yellow-500 text-black font-bold text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    &ldquo;{filters.search}&rdquo;
                    <button
                      onClick={() => handleFilterChange("search", "")}
                      aria-label="Effacer la recherche"
                      className="hover:text-black/60 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                    ({filtered.length} résultat
                    {filtered.length !== 1 ? "s" : ""})
                  </span>
                </motion.div>
              )}

              <div className="h-1 sm:h-1.5 w-12 sm:w-16 bg-yellow-500 mx-auto rounded-full mt-3 sm:mt-4" />

              <p className="mt-3 sm:mt-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
                Découvrez notre gamme complète d&apos;équipements
                professionnels pour la performance et la qualité.
              </p>
            </header>
          </div>
        </div>

        {/* ── MAIN LAYOUT ───────────────────────────────── */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-5 sm:py-6 md:py-8 lg:py-10">
          <div className="flex gap-5 lg:gap-8">
            {/* ── SIDEBAR ─────────────────────────────── */}
            <aside className="hidden lg:flex flex-col gap-4 xl:gap-5 w-56 xl:w-64 2xl:w-72 shrink-0">
              {/* Search */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3 xl:p-4 shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Rechercher..."
                    value={filters.search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-9 pr-8 py-2 xl:py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-yellow-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-colors"
                  />
                  {filters.search && (
                    <button
                      onClick={() => handleFilterChange("search", "")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-3 xl:px-4 py-2.5 xl:py-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-[10px] xl:text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Layers className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                    Catégories
                  </h3>
                </div>
                <div className="p-1.5 xl:p-2">
                  <button
                    onClick={() => handleCategoryChange("")}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all",
                      filters.category === ""
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    <span className="truncate">Toutes</span>
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 xl:px-2 py-0.5 rounded-full shrink-0 ml-1",
                        filters.category === ""
                          ? "bg-white/20 dark:bg-black/20 text-white dark:text-gray-900"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      )}
                    >
                      {products.length}
                    </span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={cn(
                        "w-full flex items-center justify-between px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all",
                        filters.category === cat
                          ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      )}
                    >
                      <span className="truncate">{cat}</span>
                      <span
                        className={cn(
                          "text-[10px] font-bold px-1.5 xl:px-2 py-0.5 rounded-full shrink-0 ml-1",
                          filters.category === cat
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                        )}
                      >
                        {categoryStats[cat] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-categories */}
              <AnimatePresence>
                {subCategories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
                  >
                    <div className="px-3 xl:px-4 py-2.5 xl:py-3 border-b border-gray-100 dark:border-gray-800">
                      <h3 className="text-[10px] xl:text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <Tag className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                        Sous-catégories
                      </h3>
                    </div>
                    <div className="p-1.5 xl:p-2">
                      <button
                        onClick={() => handleSubCategoryChange("")}
                        className={cn(
                          "w-full flex items-center px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all text-left gap-2",
                          filters.subCategory === ""
                            ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        )}
                      >
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full shrink-0",
                            filters.subCategory === ""
                              ? "bg-yellow-500"
                              : "bg-gray-300 dark:bg-gray-600"
                          )}
                        />
                        Toutes
                      </button>
                      {subCategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleSubCategoryChange(sub)}
                          className={cn(
                            "w-full flex items-center px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all text-left gap-2",
                            filters.subCategory === sub
                              ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                          )}
                        >
                          <div
                            className={cn(
                              "w-1.5 h-1.5 rounded-full shrink-0",
                              filters.subCategory === sub
                                ? "bg-yellow-500"
                                : "bg-gray-300 dark:bg-gray-600"
                            )}
                          />
                          <span className="truncate">{sub}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Price */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3 xl:p-4 shadow-sm">
                <h3 className="text-[10px] xl:text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2.5 xl:mb-3 flex items-center gap-2">
                  <SlidersHorizontal className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                  Prix (MAD)
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="text-[9px] xl:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                      Min
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={filters.minPrice}
                      onChange={(e) =>
                        handleFilterChange(
                          "minPrice",
                          Number(e.target.value) || 0
                        )
                      }
                      className="w-full px-2 xl:px-3 py-1.5 xl:py-2 border border-gray-200 dark:border-gray-700 text-xs xl:text-sm font-semibold rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="pt-5 text-gray-400 font-bold text-sm">—</div>
                  <div className="flex-1">
                    <label className="text-[9px] xl:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                      Max
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handleFilterChange(
                          "maxPrice",
                          Number(e.target.value) || maxProductPrice
                        )
                      }
                      className="w-full px-2 xl:px-3 py-1.5 xl:py-2 border border-gray-200 dark:border-gray-700 text-xs xl:text-sm font-semibold rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500"
                      placeholder={String(maxProductPrice)}
                    />
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3 xl:p-4 shadow-sm">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative shrink-0">
                    <input
                      type="checkbox"
                      checked={filters.inStockOnly}
                      onChange={(e) =>
                        handleFilterChange("inStockOnly", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 xl:w-10 xl:h-5 rounded-full bg-gray-200 dark:bg-gray-700 peer-checked:bg-yellow-500 transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4 xl:peer-checked:translate-x-5" />
                  </div>
                  <div>
                    <p className="text-xs xl:text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-yellow-600 transition-colors">
                      En stock uniquement
                    </p>
                    <p className="text-[10px] xl:text-[11px] text-gray-400">
                      {products.filter((p) => p.inStock).length} produits
                    </p>
                  </div>
                </label>
              </div>

              {/* Clear */}
              {activeFilterCount > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClearFilters}
                  className="w-full py-2 xl:py-2.5 border-2 border-dashed border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold text-[10px] xl:text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                  Effacer ({activeFilterCount})
                </motion.button>
              )}
            </aside>

            {/* ── MAIN CONTENT ────────────────────────── */}
            <main className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4 sm:mb-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
                    {loading ? (
                      <Skeleton className="h-6 sm:h-7 w-28 sm:w-32" />
                    ) : (
                      <>
                        <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                          {filtered.length}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                          résultat{filtered.length !== 1 ? "s" : ""}
                          {filtered.length !== products.length && (
                            <> sur {products.length}</>
                          )}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Category + Subcategory pills — mobile/tablet */}
                  <div className="lg:hidden space-y-2">
                    <CategoryPills
                      categories={categories}
                      selectedCategory={filters.category}
                      onSelect={handleCategoryChange}
                    />
                    <AnimatePresence>
                      {subCategories.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <SubCategoryPills
                            subCategories={subCategories}
                            selectedSubCategory={filters.subCategory}
                            onSelect={handleSubCategoryChange}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right: sort + view + mobile filter */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                  <div className="relative">
                    <select
                      value={filters.sort}
                      onChange={(e) =>
                        handleFilterChange("sort", e.target.value)
                      }
                      className="appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-2 text-xs sm:text-sm font-semibold border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-yellow-500 cursor-pointer shadow-sm"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.icon} {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-1 shadow-sm">
                    {(["grid", "list"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={cn(
                          "p-1 sm:p-1.5 rounded-lg transition-all",
                          viewMode === mode
                            ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        )}
                      >
                        {mode === "grid" ? (
                          <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:border-yellow-400 transition-colors whitespace-nowrap"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Filtres</span>
                    {activeFilterCount > 0 && (
                      <span className="bg-yellow-500 text-black text-[9px] sm:text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Active filter chips */}
              <AnimatePresence>
                {activeFilterCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5"
                  >
                    {filters.search && (
                      <FilterChip
                        label={`"${filters.search}"`}
                        color="yellow"
                        onRemove={() => handleFilterChange("search", "")}
                      />
                    )}
                    {filters.category && (
                      <FilterChip
                        label={filters.category}
                        color="blue"
                        onRemove={() => {
                          handleFilterChange("category", "");
                          handleFilterChange("subCategory", "");
                        }}
                      />
                    )}
                    {filters.subCategory && (
                      <FilterChip
                        label={filters.subCategory}
                        color="purple"
                        onRemove={() => handleFilterChange("subCategory", "")}
                      />
                    )}
                    {(filters.minPrice > 0 ||
                      filters.maxPrice < maxProductPrice) && (
                        <FilterChip
                          label={`${formatPrice(filters.minPrice)} – ${formatPrice(filters.maxPrice)}`}
                          color="green"
                          onRemove={() => {
                            handleFilterChange("minPrice", 0);
                            handleFilterChange("maxPrice", maxProductPrice);
                          }}
                        />
                      )}
                    {filters.inStockOnly && (
                      <FilterChip
                        label="En stock"
                        color="emerald"
                        onRemove={() =>
                          handleFilterChange("inStockOnly", false)
                        }
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Products */}
              {loading ? (
                <div
                  className={cn(
                    "grid gap-3 sm:gap-4 md:gap-5",
                    viewMode === "grid"
                      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
                      : "grid-cols-1"
                  )}
                >
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2 sm:space-y-3">
                      <Skeleton className="aspect-[4/3] rounded-2xl" />
                      <Skeleton className="h-3 sm:h-4 w-3/4 rounded-lg" />
                      <Skeleton className="h-2.5 sm:h-3 w-1/2 rounded-lg" />
                      <Skeleton className="h-8 sm:h-9 w-full rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-28 text-center px-4"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 sm:mb-5">
                    <Search className="w-7 h-7 sm:w-9 sm:h-9 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-2">
                    Aucun produit trouvé
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-5 sm:mb-6 max-w-xs sm:max-w-sm">
                    Modifiez vos critères de recherche ou vos filtres pour
                    afficher des résultats.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center gap-2"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Réinitialiser les filtres
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    layout
                    className={cn(
                      "grid gap-3 sm:gap-4 md:gap-5",
                      viewMode === "grid"
                        ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
                        : "grid-cols-1"
                    )}
                  >
                    <AnimatePresence mode="popLayout">
                      {filtered.map((product, index) => (
                        <ProductCard
                          key={getProductId(product)}
                          product={product}
                          handleAddToCart={handleAddToCart}
                          viewMode={viewMode}
                          index={index}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {filtered.length}
                      </span>{" "}
                      produit{filtered.length !== 1 ? "s" : ""} affiché
                      {filtered.length !== 1 ? "s" : ""}
                      {filtered.length !== products.length && (
                        <>
                          {" "}
                          sur{" "}
                          <span className="font-bold text-gray-900 dark:text-white">
                            {products.length}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>

        {/* ── MOBILE FILTER DRAWER ──────────────────────── */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilters(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-[85vw] max-w-xs bg-white dark:bg-gray-900 z-50 lg:hidden flex flex-col shadow-2xl"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-yellow-500" />
                    Filtres
                    {activeFilterCount > 0 && (
                      <span className="bg-yellow-500 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Drawer content */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-5">
                  {/* Search */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1.5 sm:mb-2">
                      Recherche
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                      <input
                        type="search"
                        value={filters.search}
                        onChange={(e) =>
                          handleFilterChange("search", e.target.value)
                        }
                        placeholder="Rechercher..."
                        className="w-full pl-8 sm:pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-yellow-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1.5 sm:mb-2">
                      Trier par
                    </label>
                    <div className="relative">
                      <select
                        value={filters.sort}
                        onChange={(e) =>
                          handleFilterChange("sort", e.target.value)
                        }
                        className="w-full appearance-none pl-3 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500"
                      >
                        {SORT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.icon} {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1.5 sm:mb-2">
                      Catégorie
                    </label>
                    <div className="space-y-0.5 sm:space-y-1">
                      {[
                        { value: "", label: "Toutes" },
                        ...categories.map((c) => ({ value: c, label: c })),
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleCategoryChange(opt.value)}
                          className={cn(
                            "w-full flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left",
                            filters.category === opt.value
                              ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                          )}
                        >
                          <span className="truncate">{opt.label}</span>
                          <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 ml-2">
                            {opt.value === ""
                              ? products.length
                              : categoryStats[opt.value] || 0}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sub-category */}
                  <AnimatePresence>
                    {subCategories.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1.5 sm:mb-2">
                          Sous-catégorie
                        </label>
                        <div className="space-y-0.5 sm:space-y-1">
                          {[
                            { value: "", label: "Toutes" },
                            ...subCategories.map((s) => ({
                              value: s,
                              label: s,
                            })),
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() =>
                                handleSubCategoryChange(opt.value)
                              }
                              className={cn(
                                "w-full flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left",
                                filters.subCategory === opt.value
                                  ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full shrink-0",
                                  filters.subCategory === opt.value
                                    ? "bg-yellow-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                )}
                              />
                              <span className="truncate">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Price */}
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1.5 sm:mb-2">
                      Prix (MAD)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        value={filters.minPrice}
                        onChange={(e) =>
                          handleFilterChange(
                            "minPrice",
                            Number(e.target.value) || 0
                          )
                        }
                        placeholder="Min"
                        className="flex-1 px-2.5 sm:px-3 py-2 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm font-medium rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 text-center"
                      />
                      <span className="text-gray-400 font-bold">—</span>
                      <input
                        type="number"
                        min={0}
                        value={filters.maxPrice}
                        onChange={(e) =>
                          handleFilterChange(
                            "maxPrice",
                            Number(e.target.value) || maxProductPrice
                          )
                        }
                        placeholder="Max"
                        className="flex-1 px-2.5 sm:px-3 py-2 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm font-medium rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 text-center"
                      />
                    </div>
                  </div>

                  {/* Stock toggle */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative shrink-0">
                      <input
                        type="checkbox"
                        checked={filters.inStockOnly}
                        onChange={(e) =>
                          handleFilterChange("inStockOnly", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 rounded-full bg-gray-200 dark:bg-gray-700 peer-checked:bg-yellow-500 transition-colors" />
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                      En stock uniquement
                    </span>
                  </label>
                </div>

                {/* Drawer footer */}
                <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-800 flex gap-2 sm:gap-3">
                  <button
                    onClick={handleClearFilters}
                    className="flex-1 py-2 sm:py-2.5 border border-gray-200 dark:border-gray-700 font-bold text-xs sm:text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Effacer
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-2 sm:py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs sm:text-sm rounded-xl transition-colors"
                  >
                    Voir ({filtered.length})
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}