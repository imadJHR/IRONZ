"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Star,
  StarHalf,
  ShoppingCart,
  Share2,
  Check,
  ArrowLeft,
  Plus,
  Minus,
  Facebook,
  Twitter,
  Mail,
  Linkedin,
  PhoneIcon as Whatsapp,
  PinIcon as Pinterest,
  AlertCircle,
  X,
  Eye,
  ArrowRight,
  ChevronLeft,
  ZoomIn,
  MessageSquare,
  Send,
  Truck,
  Shield,
  RotateCcw,
  Tag,
} from "lucide-react";
import { useCart } from "../../../context/cart-context";
import { cn } from "../../../lib/utils";
import { trackFBEvent } from "../../../components/FacebookPixel";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your-cloud-name";
const PLACEHOLDER = "/placeholder.svg";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Review {
  _id?: string;
  username?: string;
  rating: number;
  title?: string;
  body?: string;
  date?: string;
  verified?: boolean;
}

interface Product {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  salePrice?: number;
  image?: string;
  gallery?: string[];
  category?: string;
  slug?: string;
  sku?: string;
  inStock?: boolean;
  discount?: number;
  isNewProduct?: boolean;
  colors?: string[];
  taille?: string[];
  features?: string[];
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
}

interface CloudinaryOptions {
  width?: string | number;
  height?: string | number;
  quality?: string;
  crop?: string;
}

interface ShareLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
}

// ---------------------------------------------------------------------------
// Color utils
// ---------------------------------------------------------------------------

const COLOR_MAP: Record<string, string> = {
  Rouge: "#EF4444",
  Bleu: "#3B82F6",
  Vert: "#22C55E",
  Noir: "#000000",
  Blanc: "#FFFFFF",
  Jaune: "#EAB308",
  Orange: "#F97316",
  Violet: "#8B5CF6",
  Rose: "#EC4899",
  Gris: "#6B7280",
  Marron: "#A52A2A",
  Beige: "#F5F5DC",
  Or: "#FFD700",
  Argent: "#C0C0C0",
  Multicolore:
    "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
  Red: "#EF4444",
  Blue: "#3B82F6",
  Green: "#22C55E",
  Black: "#000000",
  White: "#FFFFFF",
  Yellow: "#EAB308",
  Purple: "#8B5CF6",
  Pink: "#EC4899",
  Gray: "#6B7280",
  Brown: "#A52A2A",
  Gold: "#FFD700",
  Silver: "#C0C0C0",
};

const getColor = (colorName?: string): string => {
  if (!colorName) return "#E5E7EB";
  return COLOR_MAP[colorName] ?? colorName;
};

const isLightColor = (colorName?: string): boolean => {
  const light = [
    "Blanc",
    "Jaune",
    "White",
    "Yellow",
    "Beige",
    "Or",
    "Gold",
    "Argent",
    "Silver",
  ];
  return light.includes(colorName ?? "");
};

// ---------------------------------------------------------------------------
// Cloudinary utils
// ---------------------------------------------------------------------------

const getCloudinaryUrl = (
  imagePath?: string,
  options: CloudinaryOptions = {}
): string => {
  if (!imagePath) return PLACEHOLDER;
  if (imagePath.startsWith("http")) return imagePath;

  const width = options.width ?? "auto";
  const height = options.height ?? "auto";
  const quality = options.quality ?? "auto";
  const crop = options.crop ?? "fill";

  if (!imagePath.includes("/uploads/")) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_${crop},w_${width},h_${height},q_${quality}/${imagePath}`;
  }

  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  return `/${cleanPath}`;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const formatPrice = (price?: number): string =>
  new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
  }).format(price ?? 0);

// ---------------------------------------------------------------------------
// RatingStars
// ---------------------------------------------------------------------------

type StarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface RatingStarsProps {
  rating?: number;
  showValue?: boolean;
  className?: string;
  size?: StarSize;
}

function RatingStars({
  rating,
  showValue = false,
  className = "",
  size = "sm",
}: RatingStarsProps) {
  const r = Number(rating) || 0;
  const fullStars = Math.floor(r);
  const hasHalfStar = r % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses: Record<StarSize, string> = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  };

  const starSize = sizeClasses[size];

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`Note: ${r} sur 5`}
    >
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`f-${i}`}
          className={cn(starSize, "fill-yellow-400 text-yellow-400")}
          aria-hidden="true"
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          className={cn(starSize, "fill-yellow-400 text-yellow-400")}
          aria-hidden="true"
        />
      )}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => (
        <Star
          key={`e-${i}`}
          className={cn(starSize, "text-gray-300 dark:text-gray-600")}
          aria-hidden="true"
        />
      ))}
      {showValue && (
        <span className="ml-1.5 text-xs font-bold text-gray-500 dark:text-gray-400">
          {r.toFixed(1)}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// StarRater (interactive)
// ---------------------------------------------------------------------------

interface StarRaterProps {
  rating: number;
  setRating: (rating: number) => void;
}

function StarRater({ rating, setRating }: StarRaterProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            className={cn(
              "w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-150",
              star <= (hover || rating)
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300 dark:text-gray-600"
            )}
          />
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Alert
// ---------------------------------------------------------------------------

type AlertVariant = "info" | "danger" | "success" | "warning";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function Alert({ variant = "info", title, icon, children }: AlertProps) {
  const styles: Record<AlertVariant, string> = {
    danger:
      "border-red-200 bg-red-50 text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300",
    success:
      "border-green-200 bg-green-50 text-green-800 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-300",
    warning:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300",
    info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300",
  };

  return (
    <div className={cn("rounded-2xl border p-4 flex gap-3", styles[variant])}>
      {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
      <div>
        {title && <div className="mb-1 text-sm font-bold">{title}</div>}
        <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ColorSelector
// ---------------------------------------------------------------------------

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

function ColorSelector({
  colors,
  selectedColor,
  onChange,
}: ColorSelectorProps) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Couleur
        </span>
        {selectedColor && (
          <span className="text-xs font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
            {selectedColor}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {colors.map((color) => {
          const isSelected = color === selectedColor;
          const bgStyle = getColor(color);
          const isLight = isLightColor(color);

          return (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              title={color}
              aria-label={`Couleur ${color}`}
              aria-pressed={isSelected}
              className={cn(
                "relative h-10 w-10 sm:h-11 sm:w-11 rounded-full transition-all duration-200",
                "hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                isSelected
                  ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-110"
                  : "ring-1 ring-gray-200 dark:ring-gray-700"
              )}
            >
              <span
                className="block h-full w-full rounded-full border border-black/10"
                style={{ background: bgStyle }}
              />
              {isSelected && (
                <span className="absolute inset-0 grid place-items-center">
                  <Check
                    className={cn(
                      "h-4 w-4 drop-shadow",
                      isLight ? "text-gray-800" : "text-white"
                    )}
                    strokeWidth={3}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TailleSelector
// ---------------------------------------------------------------------------

interface TailleSelectorProps {
  tailles: string[];
  selectedTaille: string;
  onChange: (taille: string) => void;
}

function TailleSelector({
  tailles,
  selectedTaille,
  onChange,
}: TailleSelectorProps) {
  if (!tailles || tailles.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Taille
        </span>
        {selectedTaille && (
          <span className="text-xs font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
            {selectedTaille}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tailles.map((t) => {
          const active = t === selectedTaille;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onChange(t)}
              aria-pressed={active}
              className={cn(
                "min-w-[44px] h-10 sm:h-11 px-3 sm:px-4 rounded-xl border-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-95",
                active
                  ? "border-amber-500 bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-amber-400 hover:text-amber-600 dark:hover:border-amber-500"
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ReviewsList
// ---------------------------------------------------------------------------

interface ReviewsListProps {
  reviews?: Review[];
}

function ReviewsList({ reviews = [] }: ReviewsListProps) {
  if (!reviews.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 grid place-items-center mx-auto mb-4">
          <MessageSquare className="w-7 h-7 text-gray-400" />
        </div>
        <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">
          Aucun avis pour le moment
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Soyez le premier à partager votre expérience !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {reviews.map((r, idx) => (
        <motion.div
          key={r._id ?? `${r.username ?? "u"}-${idx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5 hover:border-amber-200 dark:hover:border-amber-800/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-bold text-sm text-black shadow">
                {(r.username?.[0] ?? "U").toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">
                    {r.username ?? "Client"}
                  </span>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      Vérifié
                    </span>
                  )}
                </div>
                <RatingStars rating={r.rating} className="mt-1" size="xs" />
              </div>
            </div>
            {r.date && (
              <span className="text-[11px] text-gray-400 font-medium shrink-0">
                {new Date(r.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          {(r.title || r.body) && (
            <div className="pl-[52px]">
              {r.title && (
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {r.title}
                </p>
              )}
              {r.body && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {r.body}
                </p>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProductSkeleton
// ---------------------------------------------------------------------------

function ProductSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="h-4 w-56 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-4">
          <div className="h-[320px] sm:h-[420px] lg:h-[520px] animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 w-20 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800 shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 w-4/5 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-8 w-3/5 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-12 w-36 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-28 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-14 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-14 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProductJsonLd
// ---------------------------------------------------------------------------

function ProductJsonLd({ product }: { product: Product | null }) {
  if (!product) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? getCloudinaryUrl(product.image) : PLACEHOLDER,
    sku: product.sku ?? product._id,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "MAD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount ?? 0,
      },
    }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---------------------------------------------------------------------------
// MobileImageGallery
// ---------------------------------------------------------------------------

function MobileImageGallery({
  images,
  productName,
  discount,
  isNewProduct,
}: {
  images: string[];
  productName: string;
  discount?: number;
  isNewProduct?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const goTo = (idx: number) =>
    setCurrentIndex(Math.max(0, Math.min(images.length - 1, idx)));

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dist = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(dist) > 50) {
      if (dist > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-3">
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-50 dark:bg-gray-900"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[280px] xs:h-[320px] sm:h-[400px] md:h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 p-4 sm:p-6 flex items-center justify-center"
            >
              <img
                src={getCloudinaryUrl(images[currentIndex] || PLACEHOLDER)}
                alt={`${productName} ${currentIndex + 1}`}
                className="w-full h-full object-contain"
                loading={currentIndex === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {(discount ?? 0) > 0 && (
            <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-lg">
              -{discount}%
            </span>
          )}
          {isNewProduct && (
            <span className="bg-emerald-500 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-lg">
              NOUVEAU
            </span>
          )}
        </div>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1}/{images.length}
          </div>
        )}

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center disabled:opacity-30 transition-opacity active:scale-90"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === images.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center disabled:opacity-30 transition-opacity active:scale-90"
            >
              <ChevronRight className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all",
                idx === currentIndex
                  ? "border-amber-500 ring-2 ring-amber-500/30 scale-105"
                  : "border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={getCloudinaryUrl(img, { width: 100, height: 100 })}
                alt={`Vue ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TrustBadges
// ---------------------------------------------------------------------------

function TrustBadges() {
  const badges = [
    { icon: Truck, label: "Livraison rapide", sub: "2-4 jours" },
    { icon: Shield, label: "Paiement sécurisé", sub: "100% protégé" },
    { icon: RotateCcw, label: "Retour facile", sub: "Sous 30 jours" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {badges.map(({ icon: Icon, label, sub }) => (
        <div
          key={label}
          className="flex flex-col items-center text-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
        >
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 grid place-items-center">
            <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight">
              {label}
            </p>
            <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-500">
              {sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Types for review form
// ---------------------------------------------------------------------------

interface ReviewFormState {
  rating: number;
  username: string;
  title: string;
  body: string;
}

interface ReviewMessage {
  type: "success" | "error";
  text: string;
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface ProductPageClientProps {
  slug: string;
  initialProduct?: Product | null;
  initialReviews?: Review[];
  initialRelated?: Product[];
}

export default function ProductPageClient({
  slug,
  initialProduct = null,
  initialReviews = [],
  initialRelated = [],
}: ProductPageClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [relatedProducts, setRelatedProducts] =
    useState<Product[]>(initialRelated);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState("");

  // UI State
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTaille, setSelectedTaille] = useState("");
  const [tab, setTab] = useState<"details" | "reviews">("details");
  const [shareOpen, setShareOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Review Form
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormState>({
    rating: 5,
    username: "",
    title: "",
    body: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<ReviewMessage | null>(
    null
  );

  const productId = useMemo(() => product?._id ?? product?.id, [product]);

  const allImages = useMemo<string[]>(() => {
    if (!product) return [PLACEHOLDER];
    const gallery = Array.isArray(product.gallery)
      ? product.gallery.filter(Boolean)
      : [];
    if (gallery.length > 0) return gallery;
    return product.image ? [product.image] : [PLACEHOLDER];
  }, [product]);

  const mainImage = useMemo(
    () => allImages[selectedImage] || PLACEHOLDER,
    [allImages, selectedImage]
  );

  const canAddToCart = useMemo(() => {
    if (!product?.inStock) return false;
    if (product.colors?.length && !selectedColor) return false;
    if (product.taille?.length && !selectedTaille) return false;
    return true;
  }, [product, selectedColor, selectedTaille]);

  const displayPrice = product?.salePrice ?? product?.price ?? 0;
  const savings =
    product?.oldPrice && product.oldPrice > displayPrice
      ? product.oldPrice - displayPrice
      : 0;

  const handleAddToCart = useCallback(() => {
    if (!product || !canAddToCart) return;
    const id = product._id ?? product.id ?? "";
    const price = Number(product.salePrice ?? product.price ?? 0);

    addToCart({
      id,
      name: product.name,
      price: product.price,
      image: product.image || PLACEHOLDER,
      slug: product.slug || "",
      category: product.category,
      quantity,
      selectedColor: selectedColor || null,
      selectedTaille: selectedTaille || null,
      salePrice: product.salePrice,
      oldPrice: product.oldPrice,
    });

    trackFBEvent("AddToCart", {
      content_name: product.name,
      content_ids: [String(id)],
      content_type: "product",
      contents: [{ id: String(id), quantity }],
      value: price * quantity,
      currency: "MAD",
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }, [product, addToCart, quantity, selectedColor, selectedTaille, canAddToCart]);

  const shareLinks = useMemo((): ShareLink[] => {
    if (!product || typeof window === "undefined") return [];
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(product.name ?? "");
    const text = encodeURIComponent(product.description ?? "");
    const image = product.image
      ? encodeURIComponent(getCloudinaryUrl(product.image))
      : "";
    return [
      {
        name: "Facebook",
        icon: Facebook,
        color: "#1877F2",
        url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      },
      {
        name: "Twitter",
        icon: Twitter,
        color: "#1DA1F2",
        url: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      },
      {
        name: "WhatsApp",
        icon: Whatsapp,
        color: "#25D366",
        url: `https://wa.me/?text=${title}%20${url}`,
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        color: "#0A66C2",
        url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
      },
      {
        name: "Pinterest",
        icon: Pinterest,
        color: "#E60023",
        url: `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`,
      },
      {
        name: "Email",
        icon: Mail,
        color: "#6B7280",
        url: `mailto:?subject=${title}&body=${text}%0D%0A${url}`,
      },
    ];
  }, [product]);

  const handleShare = useCallback(() => {
    if (!product) return;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      setShareOpen((v) => !v);
    }
  }, [product]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.rating) return;
    setSubmittingReview(true);
    setReviewMessage(null);
    try {
      const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l'envoi");
      setReviewMessage({
        type: "success",
        text: "Merci ! Votre avis a été publié.",
      });
      setReviews((prev) => [data.data, ...prev]);
      setProduct((prev) =>
        prev ? { ...prev, reviewCount: (prev.reviewCount ?? 0) + 1 } : prev
      );
      setReviewForm({ rating: 5, username: "", title: "", body: "" });
      setTimeout(() => {
        setIsReviewFormOpen(false);
        setReviewMessage(null);
      }, 2500);
    } catch (err) {
      setReviewMessage({
        type: "error",
        text:
          err instanceof Error ? err.message : "Une erreur s'est produite",
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  // Close share on outside click
  useEffect(() => {
    if (!shareOpen) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".share-box")) setShareOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shareOpen]);

  // Close zoom on Escape
  useEffect(() => {
    if (!isZoomed) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isZoomed]);

  // Fetch product
  useEffect(() => {
    if (initialProduct) {
      if (initialProduct.colors?.length)
        setSelectedColor(initialProduct.colors[0]);
      if (initialProduct.taille?.length)
        setSelectedTaille(initialProduct.taille[0]);
      trackFBEvent("ViewContent", {
        content_name: initialProduct.name,
        content_category: initialProduct.category ?? "",
        content_ids: [initialProduct._id ?? initialProduct.id],
        content_type: "product",
        value: initialProduct.salePrice ?? initialProduct.price ?? 0,
        currency: "MAD",
      });
      return;
    }

    const run = async () => {
      if (!slug) return;
      setLoading(true);
      setError("");
      setProduct(null);
      setRelatedProducts([]);
      setSelectedImage(0);
      setQuantity(1);
      setSelectedColor("");
      setSelectedTaille("");

      try {
        const safeSlug = encodeURIComponent(String(slug).toLowerCase());
        const res = await fetch(`${API_URL}/products/slug/${safeSlug}`, {
          cache: "no-store",
        });
        if (!res.ok)
          throw new Error(
            res.status === 404
              ? "Produit non trouvé"
              : `Erreur serveur (${res.status})`
          );
        const json = await res.json();
        const p: Product = json?.data;
        if (!p) throw new Error("Réponse invalide du serveur");

        setProduct(p);
        setReviews(p.reviews ?? []);

        trackFBEvent("ViewContent", {
          content_name: p.name,
          content_category: p.category ?? "",
          content_ids: [p._id ?? p.id],
          content_type: "product",
          value: p.salePrice ?? p.price ?? 0,
          currency: "MAD",
        });

        if (p.colors?.length) setSelectedColor(p.colors[0]);
        if (p.taille?.length) setSelectedTaille(p.taille[0]);

        if (p.category) {
          try {
            const rRes = await fetch(
              `${API_URL}/products?category=${encodeURIComponent(
                p.category
              )}&limit=8&sort=featured`,
              { cache: "no-store" }
            );
            const rJson = await rRes.json();
            const list: Product[] = Array.isArray(rJson?.data)
              ? rJson.data
              : [];
            setRelatedProducts(
              list.filter((x) => x._id !== p._id).slice(0, 4)
            );
          } catch {}
        }
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Une erreur s'est produite"
        );
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [slug, initialProduct]);

  // ---------------------------------------------------------------------------
  // Loading / Error states
  // ---------------------------------------------------------------------------

  if (loading) return <ProductSkeleton />;

  if (error || !product) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 grid place-items-center mx-auto mb-5">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {error || "Produit non trouvé"}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Ce produit n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <button
            onClick={() => router.push("/produit")}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl transition-colors active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux produits
          </button>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <ProductJsonLd product={product} />

      {/* ── Zoom Modal ── */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getCloudinaryUrl(mainImage, {
                  width: 1200,
                  quality: "auto",
                })}
                alt={product.name}
                className="max-w-full max-h-[88vh] object-contain rounded-2xl"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
              {allImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        idx === selectedImage
                          ? "w-6 bg-amber-400"
                          : "w-1.5 bg-white/50"
                      )}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-white dark:bg-gray-950 pb-32 lg:pb-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">

          {/* ── Breadcrumb ── */}
          <nav
            className="hidden sm:flex items-center flex-wrap gap-x-1.5 gap-y-1 text-[11px] sm:text-xs lg:text-sm mb-6 lg:mb-8"
            aria-label="Fil d'Ariane"
          >
            {[
              { href: "/", label: "Accueil" },
              { href: "/produit", label: "Produits" },
              ...(product.category
                ? [
                    {
                      href: `/produit?category=${encodeURIComponent(
                        product.category
                      )}`,
                      label: product.category,
                    },
                  ]
                : []),
            ].map((crumb, i, arr) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <Link
                  href={crumb.href}
                  className="text-gray-400 hover:text-amber-500 transition-colors font-medium uppercase tracking-wide"
                >
                  {crumb.label}
                </Link>
                {i < arr.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                )}
              </span>
            ))}
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
            <span className="text-gray-700 dark:text-gray-300 font-semibold truncate max-w-[180px] sm:max-w-[260px]">
              {product.name}
            </span>
          </nav>

          {/* Mobile back */}
          <div className="sm:hidden mb-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          </div>

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 xl:gap-20">

            {/* ── LEFT: Images ── */}
            <div className="space-y-4">
              {/* Mobile / Tablet */}
              <div className="lg:hidden">
                <MobileImageGallery
                  images={allImages}
                  productName={product.name}
                  discount={product.discount}
                  isNewProduct={product.isNewProduct}
                />
              </div>

              {/* Desktop */}
              <div className="hidden lg:flex gap-4 xl:gap-5">
                {/* Vertical thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex flex-col gap-3 pt-1">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={cn(
                          "relative w-[72px] xl:w-20 h-[72px] xl:h-20 rounded-xl xl:rounded-2xl overflow-hidden border-2 shrink-0 transition-all duration-200",
                          selectedImage === idx
                            ? "border-amber-500 ring-2 ring-amber-500/20 scale-105"
                            : "border-gray-100 dark:border-gray-800 opacity-60 hover:opacity-100 hover:border-gray-300"
                        )}
                      >
                        <img
                          src={getCloudinaryUrl(img, {
                            width: 160,
                            height: 160,
                            crop: "fill",
                          })}
                          alt={`Vue ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main image */}
                <div
                  className="relative flex-1 rounded-2xl xl:rounded-3xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-zoom-in group"
                  onClick={() => setIsZoomed(true)}
                >
                  <div className="relative h-[400px] xl:h-[520px] p-6 xl:p-8 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        src={getCloudinaryUrl(mainImage, {
                          width: 800,
                          quality: "auto",
                        })}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        draggable={false}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                    {(product.discount ?? 0) > 0 && (
                      <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg shadow-red-500/30">
                        -{product.discount}%
                      </span>
                    )}
                    {product.isNewProduct && (
                      <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg shadow-emerald-500/30">
                        NOUVEAU
                      </span>
                    )}
                  </div>

                  {/* Zoom icon hint */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>

                  {/* Desktop nav arrows */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage((p) => Math.max(0, p - 1));
                        }}
                        disabled={selectedImage === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-all active:scale-90"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage((p) =>
                            Math.min(allImages.length - 1, p + 1)
                          );
                        }}
                        disabled={selectedImage === allImages.length - 1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-all active:scale-90"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Trust Badges — desktop */}
              <div className="hidden lg:block">
                <TrustBadges />
              </div>
            </div>

            {/* ── RIGHT: Details ── */}
            <div className="flex flex-col gap-5 sm:gap-6">

              {/* Category + Share */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  <Tag className="w-3 h-3" />
                  {product.category ?? "Équipement"}
                </span>

                {/* Share button */}
                <div className="relative share-box">
                  <button
                    onClick={handleShare}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 transition-all active:scale-90"
                    aria-label="Partager"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {shareOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-3 min-w-[200px]"
                      >
                        <p className="text-xs font-bold text-gray-400 uppercase px-2 mb-2 tracking-widest">
                          Partager
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {shareLinks.map(({ name, icon: Icon, url, color }) => (
                            <a
                              key={name}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${color}20` }}
                              >
                                <Icon
                                  className="w-4 h-4"
                                  style={{ color } as React.CSSProperties}
                                />
                              </div>
                              <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
                                {name}
                              </span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-5xl font-black uppercase italic leading-[0.92] tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h1>
                {product.sku && (
                  <p className="text-[11px] text-gray-400 font-medium mt-2 uppercase tracking-widest">
                    SKU: {product.sku}
                  </p>
                )}
              </div>

              {/* Rating + Stock */}
              <div className="flex items-center gap-3 flex-wrap">
                <RatingStars rating={product.rating} size="md" />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {(product.rating ?? 0).toFixed(1)}
                </span>
                <span className="text-gray-300 dark:text-gray-600">·</span>
                <button
                  onClick={() => setTab("reviews")}
                  className="text-xs sm:text-sm font-medium text-gray-500 hover:text-amber-500 transition-colors"
                >
                  {reviews.length} avis
                </button>
                <span className="text-gray-300 dark:text-gray-600">·</span>
                {product.inStock !== false ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    En stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-500 text-xs font-bold">
                    <X className="w-3.5 h-3.5" strokeWidth={3} />
                    Rupture de stock
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl xl:text-5xl font-black text-yellow-500 leading-none">
                  {formatPrice(displayPrice)}
                </span>
                {product.oldPrice && product.oldPrice > displayPrice && (
                  <div className="flex flex-col pb-0.5">
                    <span className="text-lg sm:text-xl font-bold text-gray-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                    {savings > 0 && (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        Économie: {formatPrice(savings)}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-gray-800" />

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl">
                {(["details", "reviews"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wide rounded-lg transition-all duration-200",
                      tab === t
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    )}
                  >
                    {t === "details"
                      ? "Description"
                      : `Avis (${reviews.length})`}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {tab === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* Description */}
                    {product.description && (
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {product.description}
                      </p>
                    )}

                    {/* Taille + Color */}
                    {(product.taille?.length || product.colors?.length) ? (
                      <div className="p-4 sm:p-5 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-5">
                        {product.taille?.length ? (
                          <TailleSelector
                            tailles={product.taille}
                            selectedTaille={selectedTaille}
                            onChange={setSelectedTaille}
                          />
                        ) : null}
                        {product.colors?.length ? (
                          <ColorSelector
                            colors={product.colors}
                            selectedColor={selectedColor}
                            onChange={setSelectedColor}
                          />
                        ) : null}
                      </div>
                    ) : null}

                    {/* Features */}
                    {Array.isArray(product.features) &&
                      product.features.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                            Points forts
                          </h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {product.features.slice(0, 8).map((f, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                              >
                                <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 grid place-items-center shrink-0 mt-0.5">
                                  <Check
                                    className="w-3 h-3 text-amber-600 dark:text-amber-400"
                                    strokeWidth={3}
                                  />
                                </div>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </motion.div>
                )}

                {tab === "reviews" && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Rating summary */}
                    <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-black text-gray-900 dark:text-white leading-none">
                          {(product.rating ?? 0).toFixed(1)}
                        </div>
                        <div>
                          <RatingStars rating={product.rating} size="md" />
                          <p className="text-xs text-gray-500 mt-1 font-medium">
                            {reviews.length} avis clients
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsReviewFormOpen((v) => !v)}
                        className={cn(
                          "px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95",
                          isReviewFormOpen
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            : "bg-gray-900 dark:bg-white text-white dark:text-black hover:opacity-90"
                        )}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="hidden xs:inline">
                          {isReviewFormOpen ? "Annuler" : "Écrire un avis"}
                        </span>
                        <span className="xs:hidden">
                          {isReviewFormOpen ? "Annuler" : "Avis"}
                        </span>
                      </button>
                    </div>

                    {/* Review form */}
                    <AnimatePresence>
                      {isReviewFormOpen && (
                        <motion.form
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          onSubmit={handleSubmitReview}
                          className="overflow-hidden"
                        >
                          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 space-y-4">
                            <h3 className="font-bold text-base text-gray-900 dark:text-white">
                              Votre expérience
                            </h3>

                            {reviewMessage && (
                              <Alert
                                variant={
                                  reviewMessage.type === "success"
                                    ? "success"
                                    : "danger"
                                }
                                icon={
                                  reviewMessage.type === "success" ? (
                                    <Check className="w-4 h-4" />
                                  ) : (
                                    <AlertCircle className="w-4 h-4" />
                                  )
                                }
                              >
                                {reviewMessage.text}
                              </Alert>
                            )}

                            <div className="space-y-4">
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                                  Note *
                                </label>
                                <StarRater
                                  rating={reviewForm.rating}
                                  setRating={(r) =>
                                    setReviewForm({ ...reviewForm, rating: r })
                                  }
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                                    Nom *
                                  </label>
                                  <input
                                    required
                                    type="text"
                                    value={reviewForm.username}
                                    onChange={(e) =>
                                      setReviewForm({
                                        ...reviewForm,
                                        username: e.target.value,
                                      })
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                                    placeholder="Votre nom"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                                    Titre *
                                  </label>
                                  <input
                                    required
                                    type="text"
                                    value={reviewForm.title}
                                    onChange={(e) =>
                                      setReviewForm({
                                        ...reviewForm,
                                        title: e.target.value,
                                      })
                                    }
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                                    placeholder="Résumé de votre avis"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                                  Commentaire *
                                </label>
                                <textarea
                                  required
                                  rows={3}
                                  value={reviewForm.body}
                                  onChange={(e) =>
                                    setReviewForm({
                                      ...reviewForm,
                                      body: e.target.value,
                                    })
                                  }
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all resize-none"
                                  placeholder="Partagez votre expérience avec ce produit..."
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={submittingReview}
                              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              {submittingReview ? (
                                <span className="flex items-center gap-2">
                                  <svg
                                    className="animate-spin w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                  </svg>
                                  Envoi en cours...
                                </span>
                              ) : (
                                <>
                                  Publier l&apos;avis
                                  <Send className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    <ReviewsList reviews={reviews} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Desktop Cart Actions ── */}
              <div className="hidden lg:flex flex-col gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex gap-3">
                  {/* Quantity */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 gap-1">
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.max(1, q - 1))
                      }
                      disabled={quantity <= 1}
                      className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all disabled:opacity-30 active:scale-90"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-black text-base select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(99, q + 1))
                      }
                      className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all active:scale-90"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to cart */}
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={!canAddToCart}
                    whileTap={canAddToCart ? { scale: 0.97 } : {}}
                    className={cn(
                      "flex-1 h-[50px] rounded-2xl font-bold text-sm sm:text-base uppercase tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-lg",
                      canAddToCart
                        ? addedToCart
                          ? "bg-emerald-500 text-white shadow-emerald-500/30"
                          : "bg-yellow-o500 hover:bg-yellow-400 text-black shadow-amber-500/25"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none"
                    )}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5" strokeWidth={3} />
                        Ajouté !
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        {canAddToCart ? "Ajouter au panier" : "Indisponible"}
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Buy Now */}
                <button
                  onClick={() => {
                    handleAddToCart();
                    router.push("/checkout");
                  }}
                  disabled={!canAddToCart}
                  className={cn(
                    "w-full h-[46px] rounded-2xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-all border-2 active:scale-[0.98]",
                    canAddToCart
                      ? "border-gray-900 dark:border-gray-100 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black"
                      : "border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
                  )}
                >
                  Acheter maintenant
                </button>
              </div>

              {/* Out of stock notice */}
              {product.inStock === false && (
                <Alert
                  variant="warning"
                  icon={<AlertCircle className="w-4 h-4" />}
                  title="Rupture de stock"
                >
                  Ce produit est temporairement indisponible.
                </Alert>
              )}

              {/* Trust badges — mobile/tablet */}
              <div className="lg:hidden">
                <TrustBadges />
              </div>
            </div>
          </div>

          {/* ── Related Products ── */}
          {relatedProducts.length > 0 && (
            <section className="mt-12 sm:mt-16 lg:mt-20 pt-10 sm:pt-12 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic tracking-tight text-gray-900 dark:text-white">
                  Vous aimerez{" "}
                  <span className="text-yellow-500">aussi</span>
                </h2>
                <Link
                  href="/produit"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-yellow-500 transition-colors"
                >
                  Voir tout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mobile: horizontal scroll */}
              <div className="sm:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
                <div
                  className="flex gap-3 pb-3"
                  style={{ width: "max-content" }}
                >
                  {relatedProducts.map((p) => (
                    <Link
                      key={p._id ?? p.id}
                      href={`/produit/${p.slug ?? p._id}`}
                      className="w-[175px] shrink-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:border-yellow-200 dark:hover:border-amber-800/50 transition-colors"
                    >
                      <div className="relative h-40 bg-gray-50 dark:bg-gray-950 p-3 flex items-center justify-center">
                        <img
                          src={getCloudinaryUrl(p.image, {
                            width: 300,
                            height: 300,
                            crop: "fill",
                          })}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                        {(p.discount ?? 0) > 0 && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg">
                            -{p.discount}%
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          {p.category}
                        </p>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-2">
                          {p.name}
                        </h3>
                        <span className="text-sm font-black text-yellow-500">
                          {formatPrice(p.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tablet + Desktop: grid */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {relatedProducts.map((p) => (
                  <motion.div
                    key={p._id ?? p.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:border-yellow-200 dark:hover:border-amber-800/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all"
                  >
                    <div className="relative bg-gray-50 dark:bg-gray-950 overflow-hidden">
                      <div className="h-44 sm:h-48 lg:h-52 p-4 flex items-center justify-center">
                        <img
                          src={getCloudinaryUrl(p.image, {
                            width: 400,
                            height: 400,
                            crop: "fill",
                          })}
                          alt={p.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      {(p.discount ?? 0) > 0 && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-xl">
                          -{p.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        {p.category}
                      </p>
                      <Link href={`/produit/${p.slug ?? p._id}`}>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-3 group-hover:text-yellow-500 transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base sm:text-lg font-black text-yellow-500">
                          {formatPrice(p.price)}
                        </span>
                        <Link
                          href={`/produit/${p.slug ?? p._id}`}
                          className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all active:scale-90"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="sm:hidden mt-5 text-center">
                <Link
                  href="/produit"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Voir tous les produits
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )}

          {/* Back link */}
          <div className="mt-10 sm:mt-12 mb-4">
            <Link
              href="/produit"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-yellow-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour au catalogue
            </Link>
          </div>
        </div>
      </main>

      {/* ── Mobile / Tablet Sticky Bottom Bar ── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50">
        <div className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-4 pt-3 pb-6 safe-area-bottom">
          <div className="max-w-lg mx-auto space-y-2.5">
            {/* Price row */}
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-yellow-500">
                  {formatPrice(displayPrice)}
                </span>
                {product.oldPrice && product.oldPrice > displayPrice && (
                  <span className="text-sm text-gray-400 line-through font-medium">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
                  -{formatPrice(savings)}
                </span>
              )}
            </div>

            {/* Buttons row */}
            <div className="flex items-center gap-2.5">
              {/* Quantity */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-0.5 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-700 transition disabled:opacity-30 active:scale-90"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-black text-sm select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-700 transition active:scale-90"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart */}
              <motion.button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                whileTap={canAddToCart ? { scale: 0.97 } : {}}
                className={cn(
                  "flex-1 h-11 rounded-xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg",
                  canAddToCart
                    ? addedToCart
                      ? "bg-emerald-500 text-white shadow-emerald-500/30"
                      : "bg-yellow-500 text-black shadow-yellow-500/30"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none"
                )}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" strokeWidth={3} />
                    Ajouté !
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    {canAddToCart ? "Ajouter" : "Indisponible"}
                  </>
                )}
              </motion.button>

              {/* Buy Now */}
              <button
                onClick={() => {
                  handleAddToCart();
                  router.push("/checkout");
                }}
                disabled={!canAddToCart}
                className={cn(
                  "h-11 px-3.5 rounded-xl font-bold text-xs uppercase tracking-wide border-2 transition-all active:scale-95 whitespace-nowrap",
                  canAddToCart
                    ? "border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black"
                    : "border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
                )}
              >
                Acheter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}