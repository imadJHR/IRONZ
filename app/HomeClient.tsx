"use client";

import {
  useState,
  useEffect,
  useMemo,
  useRef,
  MouseEvent,
  ChangeEvent,
  CSSProperties,
} from "react";
import Head from "next/head";
import Link from "next/link";
import Image, { ImageProps } from "next/image";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import type { SwiperOptions, Swiper as SwiperType } from "swiper/types";

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
  Zap,
  CheckCircle,
  TrendingUp,
  Award,
  Truck,
  Flame,
  ShieldCheck,
  Sparkles,
  Loader2,
  Clock,
  Grid2X2,
  List,
  Filter,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

// Components
import ReferencesSection from "../components/references-section";
import ServicesSection from "../components/ServicesSection";

// Context & Data
import { useCart } from "../context/cart-context";
import { FavoriteItem, useFavorites } from "../context/favorites-context";
import { categories as categoryData } from "../data/product";

// Static Assets
import logo from "../public/logo.png";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";
const PLACEHOLDER = "/placeholder.svg";

// Site-level SEO constants – update to match your brand
const SITE_NAME = "IRONZ PRO";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ironzpro.ma";
const SITE_DESCRIPTION =
  "IRONZ PRO – Équipements de fitness et musculation professionnels au Maroc. Livraison rapide, qualité garantie, meilleur prix.";
const SITE_OG_IMAGE = `${SITE_URL}/og-image.jpg`; // 1200×630 recommended

// ─── TYPES ───────────────────────────────────────────────────────────────────
export interface Product {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string | { src: string };
  category: string;
  subCategory?: string;
  brand?: string;
  description?: string;
  shortDescription?: string;
  rating?: number;
  isNewProduct?: boolean;
  isFeatured?: boolean;
  features?: string[];
  createdAt?: string;
  [key: string]: unknown;
}

export interface Category {
  id: string;
  name: string;
  href: string;
  image: string;
  count?: number;
}

export interface CloudImgProps extends Omit<ImageProps, "src" | "alt"> {
  src: string | { src: string } | null | undefined;
  alt?: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

export interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: boolean;
}

export interface ProductCardModernProps extends ProductCardProps {
  index: number;
}

export interface HeroBannerSlideProps {
  product: Product;
  index: number;
  totalSlides: number;
}

export interface LatestProductsSectionProps {
  products: Product[];
  addToCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  isInFavorites: (id: string) => boolean;
  loadMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
}

export interface SwiperNavButtonsProps {
  prevRef: React.RefObject<HTMLButtonElement | null>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
  className?: string;
}

export interface HomeClientProps {
  initialProducts?: Product[];
  initialVedetteProducts?: Product[];
  initialLatestProducts?: Product[];
  initialLatestTotal?: number;
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
const cn = (...classes: (string | boolean | undefined | null)[]): string =>
  classes.filter(Boolean).join(" ");

const formatPrice = (price: number | string | undefined | null): string => {
  const n = typeof price === "string" ? parseFloat(price) : price || 0;
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
  }).format(n);
};

const normalizeImage = (
  image: string | { src: string } | null | undefined
): string => {
  if (!image) return PLACEHOLDER;
  if (typeof image === "string") return image;
  if (typeof image === "object" && "src" in image) return image.src;
  return PLACEHOLDER;
};

// ─── JSON-LD helpers ──────────────────────────────────────────────────────────
function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.facebook.com/ironzpro",
      "https://www.instagram.com/ironzpro",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+212-600-000000",
      contactType: "customer service",
      areaServed: "MA",
      availableLanguage: ["French", "Arabic"],
    },
  };
}

function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function buildProductJsonLd(product: Product) {
  const id = product._id || product.id || "";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.shortDescription || "",
    image: normalizeImage(product.image),
    url: `${SITE_URL}/produit/${product.slug || id}`,
    brand: {
      "@type": "Brand",
      name: product.brand || SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/produit/${product.slug || id}`,
    },
    ...(product.rating != null && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        bestRating: 5,
        ratingCount: 42,
      },
    }),
  };
}

// ─── SEO HEAD ─────────────────────────────────────────────────────────────────
/**
 * Drop this inside <Head> from next/head on each page.
 * For Next.js 13+ App Router, use generateMetadata() instead.
 */
export function HomeHead({ featuredProduct }: { featuredProduct?: Product }) {
  const title = `${SITE_NAME} | Équipements Fitness & Musculation au Maroc`;
  const description = SITE_DESCRIPTION;

  return (
    <Head>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={SITE_URL} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content={SITE_OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fr_MA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE_OG_IMAGE} />

      {/* Geo targeting */}
      <meta name="geo.region" content="MA" />
      <meta name="geo.placename" content="Maroc" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebsiteJsonLd()),
        }}
      />
      {featuredProduct && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildProductJsonLd(featuredProduct)),
          }}
        />
      )}
    </Head>
  );
}

// ─── CLOUD IMAGE ──────────────────────────────────────────────────────────────
function CloudImg({
  src,
  alt = "",
  fill = false,
  className = "",
  priority = false,
  sizes = "100vw",
  width,
  height,
  ...props
}: CloudImgProps) {
  const [error, setError] = useState(false);
  let source = PLACEHOLDER;
  if (src) {
    if (typeof src === "object" && "src" in src) source = src.src;
    else if (typeof src === "string") source = src;
  }
  if (error || !source) source = PLACEHOLDER;
  const isFill = fill || (!width && !height);

  return (
    <Image
      src={source}
      alt={alt}
      loading={priority ? undefined : "lazy"}
      priority={priority}
      fill={isFill}
      width={isFill ? undefined : width || 800}
      height={isFill ? undefined : height || 800}
      onError={() => setError(true)}
      className={cn(
        isFill ? "absolute inset-0 h-full w-full object-cover" : "",
        className
      )}
      sizes={sizes}
      style={
        { objectFit: isFill ? "cover" : "contain", ...props.style } as CSSProperties
      }
      {...(props as Omit<
        ImageProps,
        | "src"
        | "alt"
        | "fill"
        | "width"
        | "height"
        | "className"
        | "sizes"
        | "style"
        | "onError"
        | "loading"
        | "priority"
      >)}
    />
  );
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
function Badge({ className, children }: BadgeProps) {
  return (
    <span className={cn("px-2 py-1 text-xs font-bold rounded-md", className)}>
      {children}
    </span>
  );
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function renderRating(rating: number | string | null | undefined) {
  const r =
    typeof rating === "string" ? parseFloat(rating) : rating || 0;
  const full = Math.floor(r);
  const half = r % 1 >= 0.5;

  return (
    <div
      className="flex items-center"
      aria-label={`Note: ${r} sur 5`}
      itemProp="aggregateRating"
      itemScope
      itemType="https://schema.org/AggregateRating"
    >
      <meta itemProp="ratingValue" content={String(r)} />
      <meta itemProp="bestRating" content="5" />
      {[...Array(full)].map((_, i) => (
        <Star
          key={`f${i}`}
          className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
          aria-hidden
        />
      ))}
      {half && (
        <StarHalf
          className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
          aria-hidden
        />
      )}
      {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
        <Star
          key={`e${i}`}
          className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300"
          aria-hidden
        />
      ))}
      <span className="ml-1 text-xs sm:text-sm text-gray-500">
        ({r.toFixed(1)})
      </span>
    </div>
  );
}

// ─── SWIPER NAV ───────────────────────────────────────────────────────────────
function SwiperNavButtons({
  prevRef,
  nextRef,
  className = "",
}: SwiperNavButtonsProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <button
        ref={prevRef}
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all shadow-md group"
        aria-label="Précédent"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rounded-full group-hover:scale-110 transition-transform" />
      </button>
      <button
        ref={nextRef}
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all shadow-md group"
        aria-label="Suivant"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rounded-full sm:h-5 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

// ─── PRODUCT CARD (compact) ───────────────────────────────────────────────────
function ProductCard({
  product,
  addToCart,
  toggleFavorite,
  isFavorite,
}: ProductCardProps) {
  const id = product._id || product.id || "";

  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all h-full flex flex-col group"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content={product.name} />
      {product.brand && <meta itemProp="brand" content={product.brand} />}

      <div className="relative h-32 xs:h-40 sm:h-48 overflow-hidden">
        <Link href={`/produit/${product.slug || id}`} className="block h-full" tabIndex={-1} aria-hidden>
          <CloudImg
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width:640px) 100vw,(max-width:768px) 50vw,(max-width:1024px) 33vw,25vw"
            itemProp="image"
          />
        </Link>
        {product.isNewProduct && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-black text-[10px] xs:text-xs">
            Nouveau
          </Badge>
        )}
        {Number(product.discount || 0) > 0 && (
          <Badge className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] xs:text-xs">
            -{product.discount}%
          </Badge>
        )}
      </div>

      <div className="p-3 xs:p-4 flex flex-col flex-grow">
        <div className="mb-1 text-[10px] xs:text-xs text-gray-500 dark:text-gray-400 truncate">
          <span itemProp="category">{product.category}</span>
          {product.subCategory && ` • ${product.subCategory}`}
        </div>

        <Link href={`/produit/${product.slug || id}`}>
          <h2 className="font-medium text-gray-900 dark:text-white mb-1 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-2 text-sm xs:text-base leading-tight min-h-[2.5rem]">
            {product.name}
          </h2>
        </Link>

        <div
          className="mt-auto pt-2 flex items-center justify-between gap-2"
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content="MAD" />
          <meta itemProp="price" content={String(product.price)} />
          <meta
            itemProp="availability"
            content="https://schema.org/InStock"
          />
          <div className="flex flex-col xs:flex-row xs:items-center gap-1">
            <span
              className="text-sm xs:text-base font-bold text-gray-900 dark:text-white"
              itemProp="price"
            >
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] xs:text-xs line-through text-gray-500">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              addToCart({ ...product, id });
            }}
            className="h-7 w-7 xs:h-8 xs:w-8 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md flex items-center justify-center transition-colors shrink-0"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart className="h-3 w-3 xs:h-4 xs:w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── PRODUCT CARD (large / new arrivals) ─────────────────────────────────────
function ProductCardLarge({
  product,
  addToCart,
  toggleFavorite,
  isFavorite,
}: ProductCardProps) {
  const id = product._id || product.id || "";

  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all h-full flex flex-col group"
      whileHover={{ y: -6 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content={product.name} />

      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Link href={`/produit/${product.slug || id}`} className="block h-full" tabIndex={-1} aria-hidden>
          <CloudImg
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            itemProp="image"
          />
        </Link>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              addToCart({ ...product, id });
            }}
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
          {Number(product.discount || 0) > 0 && (
            <Badge className="bg-red-500 text-white shadow-md text-xs sm:text-sm">
              -{product.discount}%
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-black text-yellow-500 shadow-md text-xs sm:text-sm">
              <Flame className="w-2 h-2 sm:w-3 sm:h-3 inline mr-1" aria-hidden />
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

        </div>

        <Link href={`/produit/${product.slug || id}`}>
          <h2 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-2 hover:text-yellow-600 transition-colors line-clamp-2 leading-tight min-h-[2.5rem] sm:min-h-[3rem]">
            {product.name}
          </h2>
        </Link>

        {product.description && (
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div
          className="mt-auto flex items-center justify-between gap-2"
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content="MAD" />
          <meta itemProp="price" content={String(product.price)} />
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
            href={`/produit/${product.slug || id}`}
            className="text-yellow-600 hover:text-yellow-700 font-bold text-xs sm:text-sm flex items-center gap-1 group/link whitespace-nowrap"
            aria-label={`Voir détails de ${product.name}`}
          >
            Détails
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── PRODUCT CARD (modern grid) ───────────────────────────────────────────────
function ProductCardModern({
  product,
  addToCart,
  toggleFavorite,
  isFavorite,
  index,
}: ProductCardModernProps) {
  const id = product._id || product.id || "";

  return (
    <motion.article
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-yellow-500/50 h-full grid grid-rows-[auto_1fr_auto]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content={product.name} />

      {/* Decorative Number */}
      <div className="absolute -top-4 -right-4 z-0 pointer-events-none" aria-hidden>
        <span className="text-7xl font-black italic text-gray-100 dark:text-gray-800/50 opacity-50">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Link href={`/produit/${product.slug || id}`} className="block h-full" tabIndex={-1} aria-hidden>
          <CloudImg
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width:640px) 100vw,(max-width:768px) 50vw,(max-width:1024px) 33vw,25vw"
            itemProp="image"
          />
        </Link>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNewProduct && (
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-black uppercase rounded-full shadow-lg">
              Nouveau
            </span>
          )}
          {Number(product.discount || 0) > 0 && (
            <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black uppercase rounded-full shadow-lg">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({ ...product, id });
            }}
            className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all",
              isFavorite
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-white hover:bg-gray-100 text-gray-700"
            )}
            aria-label={
              isFavorite
                ? `Retirer ${product.name} des favoris`
                : `Ajouter ${product.name} aux favoris`
            }
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative z-10 bg-white dark:bg-gray-900">
        <div className="mb-2">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" aria-hidden />
            <span itemProp="category">{product.category}</span>
          </span>
        </div>

        <Link href={`/produit/${product.slug || id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>

        {product.shortDescription && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        )}



        <div
          className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800"
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content="MAD" />
          <meta itemProp="price" content={String(product.price)} />
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
              href={`/produit/${product.slug || id}`}
              className="text-sm font-bold text-yellow-600 hover:text-yellow-700 flex items-center gap-2 group/link"
              aria-label={`Voir ${product.name}`}
            >
              Voir
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hover border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/30 rounded-2xl pointer-events-none transition-all duration-500" />
    </motion.article>
  );
}

// ─── HERO SLIDE ───────────────────────────────────────────────────────────────
function HeroBannerSlide({ product, index, totalSlides }: HeroBannerSlideProps) {
  const id = product._id || product.id || "";

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* Image */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="h-full w-full"
        >
          <CloudImg
            src={product.image}
            alt={`${product.name} – ${SITE_NAME}`}
            className="h-full w-full object-contain object-center"
            width={1280}
            height={500}
            priority={index === 0}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative h-full z-10 flex items-center justify-center sm:justify-start">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl relative mt-58 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center sm:justify-start gap-3 mb-2 sm:mb-4"
            >
              <span className="h-1 w-6 sm:w-8 bg-yellow-500" aria-hidden />
              <span className="text-yellow-500 font-black italic uppercase tracking-widest text-xs sm:text-sm">
                Ironz Collection
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center sm:justify-start"
            >
              <Link
                href={`/produit/${product.slug || id}`}
                className="group relative inline-block"
                aria-label={`Voir le produit ${product.name}`}
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

      {/* Slide counter */}
      <div className="absolute bottom-4 left-4 sm:left-8 z-20" aria-hidden>
        <div className="flex items-center gap-1 font-mono text-xs sm:text-sm bg-black/50 backdrop-blur px-2 py-1 rounded">
          <span className="text-yellow-500 font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-white/40">/</span>
          <span className="text-white/40">
            {String(totalSlides).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── LATEST PRODUCTS SECTION ─────────────────────────────────────────────────
function LatestProductsSection({
  products,
  addToCart,
  toggleFavorite,
  isInFavorites,
  loadMore,
  hasMore,
  loadingMore,
}: LatestProductsSectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<
    "newest" | "price-low" | "price-high" | "rating"
  >("newest");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const uniqueCategories = useMemo(() => {
    const cats = products.reduce((acc: string[], p) => {
      if (p.category && !acc.includes(p.category)) acc.push(p.category);
      return acc;
    }, ["all"]);
    return cats;
  }, [products]);

  useEffect(() => {
    let r = [...products];
    if (selectedCategory !== "all")
      r = r.filter((p) => p.category === selectedCategory);
    r = r.filter((p) => {
      const pr = Number(p.price) || 0;
      return pr >= priceRange[0] && pr <= priceRange[1];
    });
    switch (sortBy) {
      case "price-low":
        r.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case "price-high":
        r.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case "rating":
        r.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        break;
      default:
        r.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
    }
    setFilteredProducts(r);
  }, [products, selectedCategory, sortBy, priceRange]);

  const priceLimits = useMemo(() => {
    if (!products.length) return { min: 0, max: 10000 };
    const prices = products.map((p) => Number(p.price) || 0).filter(Boolean);
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 10000,
    };
  }, [products]);

  return (
    <section
      className="py-14 sm:py-18 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
      aria-label="Dernières arrivées"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16">

          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tight text-gray-900 dark:text-white mb-4">
            Découvrez Nos{" "}
            <span className="text-yellow-500">Nouveautés</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explorez notre collection régulièrement mise à jour avec les
            derniers équipements de fitness et de musculation.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-8 sm:mb-12 bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* View toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-3">
                Vue:
              </span>
              {(["grid", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    viewMode === mode
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  )}
                  aria-label={mode === "grid" ? "Vue grille" : "Vue liste"}
                  aria-pressed={viewMode === mode}
                >
                  {mode === "grid" ? (
                    <Grid2X2 className="w-5 h-5" />
                  ) : (
                    <List className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>

            {/* Category pills */}
            <div className="flex-1 max-w-md">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
                {["all", ...uniqueCategories.filter((c) => c !== "all").slice(0, 4)].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        selectedCategory === cat
                          ? "bg-yellow-500 text-black"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      )}
                      aria-pressed={selectedCategory === cat}
                    >
                      {cat === "all" ? "Tous" : cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-400" aria-hidden />
              <label htmlFor="sort-select" className="sr-only">
                Trier par
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSortBy(e.target.value as typeof sortBy)
                }
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="newest">Nouveautés</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>
          </div>

          {/* Price range */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Fourchette de prix
              </span>
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
              </span>
            </div>
            <div className="relative pt-1">
              {(["min", "max"] as const).map((type) => (
                <input
                  key={type}
                  type="range"
                  min={priceLimits.min}
                  max={priceLimits.max}
                  step={100}
                  value={type === "min" ? priceRange[0] : priceRange[1]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPriceRange(
                      type === "min"
                        ? [Number(e.target.value), priceRange[1]]
                        : [priceRange[0], Number(e.target.value)]
                    )
                  }
                  aria-label={type === "min" ? "Prix minimum" : "Prix maximum"}
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />
              ))}
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={
                    {
                      width: `${((priceRange[1] - priceRange[0]) /
                          (priceLimits.max - priceLimits.min)) *
                        100
                        }%`,
                      marginLeft: `${((priceRange[0] - priceLimits.min) /
                          (priceLimits.max - priceLimits.min)) *
                        100
                        }%`,
                    } as CSSProperties
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product list */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <X className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos filtres de recherche.
            </p>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((product, i) => (
                  <ProductCardModern
                    key={product._id || product.id || i}
                    product={product}
                    addToCart={addToCart}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isInFavorites(
                      product._id || product.id || ""
                    )}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product, i) => (
                  <motion.article
                    key={product._id || product.id || i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                    itemScope
                    itemType="https://schema.org/Product"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 md:w-56 h-48 sm:h-auto relative overflow-hidden shrink-0">
                        <Link
                          href={`/produit/${product.slug || product._id}`}
                          className="block h-full"
                          tabIndex={-1}
                          aria-hidden
                        >
                          <CloudImg
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width:640px) 100vw,200px"
                            itemProp="image"
                          />
                        </Link>
                        {product.isNewProduct && (
                          <Badge className="absolute top-3 left-3 bg-yellow-500 text-black text-xs">
                            Nouveau
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1 p-5 sm:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">
                                {product.category}
                              </span>
                            </div>
                            <Link
                              href={`/produit/${product.slug || product._id}`}
                            >
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-yellow-600 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            {product.description && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {product.description}
                              </p>
                            )}
                            {product.features && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {product.features.slice(0, 3).map((f, fi) => (
                                  <span
                                    key={fi}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                                  >
                                    {f}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-start sm:items-end gap-4">
                            <div
                              itemProp="offers"
                              itemScope
                              itemType="https://schema.org/Offer"
                            >
                              <meta
                                itemProp="priceCurrency"
                                content="MAD"
                              />
                              <meta
                                itemProp="price"
                                content={String(product.price)}
                              />
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
                                className="px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors flex items-center gap-2 text-sm"
                                aria-label={`Ajouter ${product.name} au panier`}
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Ajouter
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

            {/* Count */}
            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {filteredProducts.length} produit
              {filteredProducts.length > 1 ? "s" : ""} trouvé
              {filteredProducts.length > 1 ? "s" : ""}
            </p>

            {/* Load more */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Charger plus de produits"
                >
                  <span className="relative flex items-center gap-3">
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Chargement…
                      </>
                    ) : (
                      <>
                        Voir plus de produits
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </span>
                  <span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700"
                    aria-hidden
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function HomeClient({
  initialProducts = [],
  initialVedetteProducts = [],
  initialLatestProducts = [],
  initialLatestTotal = 0,
}: HomeClientProps) {
  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  const [products] = useState<Product[]>(initialProducts);
  const [vedetteProducts] = useState<Product[]>(initialVedetteProducts);
  const [loading] = useState(false);

  const [latestProducts, setLatestProducts] =
    useState<Product[]>(initialLatestProducts);
  const [latestPage, setLatestPage] = useState(1);
  const [hasMoreLatest, setHasMoreLatest] = useState(
    initialLatestProducts.length === 12
  );
  const [loadingLatest, setLoadingLatest] = useState(false);

  // Swiper nav refs
  const featuredPrevRef = useRef<HTMLButtonElement>(null);
  const featuredNextRef = useRef<HTMLButtonElement>(null);
  const newArrivalsPrevRef = useRef<HTMLButtonElement>(null);
  const newArrivalsNextRef = useRef<HTMLButtonElement>(null);
  const dealsPrevRef = useRef<HTMLButtonElement>(null);
  const dealsNextRef = useRef<HTMLButtonElement>(null);
  const categoryPrevRef = useRef<HTMLButtonElement>(null);
  const categoryNextRef = useRef<HTMLButtonElement>(null);

  // Memoised lists
  const featuredVedette = useMemo(
    () => products.find((p) => p.isFeatured && Number(p.discount) > 0) || products[0],
    [products]
  );
  const newArrivals = useMemo(
    () => products.filter((p) => p.isNewProduct).slice(0, 12),
    [products]
  );
  const discountedProducts = useMemo(
    () => products.filter((p) => Number(p.discount) > 0).slice(0, 12),
    [products]
  );

  const loadLatestProducts = async (page = 1) => {
    if (loadingLatest) return;
    setLoadingLatest(true);
    try {
      const res = await fetch(
        `${API_URL}/products?page=${page}&limit=12&sort=-createdAt`
      );
      const json = (await res.json()) as {
        data?: Product[];
        total?: number;
      };
      const newProds = json.data || [];
      setLatestProducts((prev) =>
        page === 1 ? newProds : [...prev, ...newProds]
      );
      setLatestPage(page);
      setHasMoreLatest(newProds.length === 12);
    } catch (err) {
      console.error("Failed to load latest products:", err);
    } finally {
      setLoadingLatest(false);
    }
  };

  const loadMoreLatestProducts = () => {
    if (!loadingLatest && hasMoreLatest) loadLatestProducts(latestPage + 1);
  };

  const toggleFavorite = (product: Product) => {
    const id = product._id || product.id || "";
    if (isInFavorites(id)) {
      removeFromFavorites(id);
    } else {
      const fav: FavoriteItem = {
        id,
        name: product.name,
        price: product.price,
        image: normalizeImage(product.image),
        slug: product.slug ?? "",
      };
      addToFavorites(fav);
    }
  };

  const handleAddToCart = (product: Product) => {
    const id = product._id || product.id || "";
    addToCart({
      ...product,
      id,
      slug: product.slug ?? "",
      image: normalizeImage(product.image),
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black" role="status" aria-live="polite">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="animate-spin text-yellow-500 mx-auto mb-4 w-16 h-16 sm:w-20 sm:h-20" />
            <div className="absolute inset-0 animate-ping">
              <Loader2 className="text-yellow-500/30 mx-auto w-16 h-16 sm:w-20 sm:h-20" />
            </div>
          </div>
          <p className="text-white text-lg sm:text-xl font-bold tracking-wider">
            CHARGEMENT…
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Préparation de votre expérience fitness
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── SEO Head ─────────────────────────────────────────────────────── */}
      <HomeHead featuredProduct={featuredVedette} />

      <main className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">

        {/* ═══ 1. HERO BANNER ═══════════════════════════════════════════════ */}
        <section
          className="relative w-full bg-zinc-950 h-[380px] xs:h-[420px] sm:h-[480px] lg:h-[650px] overflow-hidden"
          aria-label="Bannière principale"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={vedetteProducts.length > 1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={1000}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            navigation={{ prevEl: ".nav-prev", nextEl: ".nav-next" }}
            className="h-full w-full"
            a11y={{
              prevSlideMessage: "Diapositive précédente",
              nextSlideMessage: "Diapositive suivante",
            }}
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

          <div className="absolute bottom-0 right-0 z-30 flex" role="group" aria-label="Navigation du slider">
            <button
              className="nav-prev w-12 h-12 sm:w-16 sm:h-16 bg-zinc-900/90 backdrop-blur border-l border-t border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-all duration-300 active:scale-95"
              aria-label="Diapositive précédente"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              className="nav-next w-12 h-12 sm:w-16 sm:h-16 bg-zinc-900/90 backdrop-blur border-l border-r border-t border-white/10 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-all duration-300 active:scale-95"
              aria-label="Diapositive suivante"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 h-1 bg-yellow-500 z-20" aria-hidden />
        </section>

        {/* ═══ 2. FLASH DEALS ═══════════════════════════════════════════════ */}
        {discountedProducts.length > 0 && (
          <section
            className="py-10 sm:py-14 md:py-16 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 relative overflow-hidden"
            aria-label="Offres flash"
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              aria-hidden
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)",
              }}
            />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" aria-hidden />
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
                onBeforeInit={(swiper: SwiperType) => {
                  if (
                    swiper.params.navigation &&
                    typeof swiper.params.navigation === "object"
                  ) {
                    swiper.params.navigation.prevEl = dealsPrevRef.current;
                    swiper.params.navigation.nextEl = dealsNextRef.current;
                  }
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={
                  {
                    360: { slidesPerView: 1.4, spaceBetween: 12 },
                    480: { slidesPerView: 2, spaceBetween: 16 },
                    640: { slidesPerView: 2.5, spaceBetween: 16 },
                    768: { slidesPerView: 3, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                    1280: { slidesPerView: 5, spaceBetween: 24 },
                  } as SwiperOptions["breakpoints"]
                }
                className="!pb-4"
                a11y={{
                  prevSlideMessage: "Offre précédente",
                  nextSlideMessage: "Offre suivante",
                }}
              >
                {discountedProducts.map((product) => (
                  <SwiperSlide
                    key={product._id || product.id || Math.random()}
                    className="h-auto"
                  >
                    <ProductCard
                      product={product}
                      addToCart={handleAddToCart}
                      toggleFavorite={toggleFavorite}
                      isFavorite={isInFavorites(product._id || product.id || "")}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        )}

        {/* ═══ 3. CATEGORIES ════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-24 bg-neutral-900 text-white overflow-hidden relative"
          aria-label="Catégories de produits"
        >
          <div
            className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 -skew-x-12 pointer-events-none"
            aria-hidden
          />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1 w-12 bg-yellow-500 skew-x-[-20deg]" aria-hidden />
                  <span className="text-yellow-500 font-black uppercase tracking-[0.2em] text-sm italic">
                    Explorez
                  </span>
                </div>
                <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
                  Nos{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    Catégories
                  </span>
                </h2>
              </div>
              <SwiperNavButtons
                prevRef={categoryPrevRef}
                nextRef={categoryNextRef}
              />
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
              onBeforeInit={(swiper: SwiperType) => {
                if (
                  swiper.params.navigation &&
                  typeof swiper.params.navigation === "object"
                ) {
                  swiper.params.navigation.prevEl = categoryPrevRef.current;
                  swiper.params.navigation.nextEl = categoryNextRef.current;
                }
              }}
              breakpoints={
                {
                  480: { slidesPerView: 1.5, spaceBetween: 24 },
                  640: { slidesPerView: 2, spaceBetween: 28 },
                  768: { slidesPerView: 2.3, spaceBetween: 32 },
                  1024: { slidesPerView: 3, spaceBetween: 36 },
                  1280: { slidesPerView: 3.5, spaceBetween: 40 },
                } as SwiperOptions["breakpoints"]
              }
            >
              {categoryData.map((cat, i) => (
                <SwiperSlide key={cat.id || i} className="pt-4 pb-8 pl-2">
                  <Link
                    href={cat.href}
                    className="group relative h-[400px] xs:h-[450px] sm:h-[500px] block w-full"
                    aria-label={`Explorer la catégorie ${cat.name}`}
                  >
                    <div className="absolute inset-0 transform -skew-x-6 border-r-4 border-b-4 border-transparent hover:border-yellow-500 transition-all duration-300 bg-neutral-800 overflow-hidden group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0px_0px_rgba(234,179,8,0.2)]">
                      <CloudImg
                        src={cat.image}
                        alt={`Équipements ${cat.name} – ${SITE_NAME}`}
                        className="transition-transform duration-700 ease-out group-hover:scale-110 group-hover:skew-x-3 opacity-80 group-hover:opacity-100"
                        fill
                        sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
                      <div
                        className="absolute -top-4 -right-2 z-0 pointer-events-none"
                        aria-hidden
                      >
                        <span
                          className="text-9xl font-black italic text-transparent opacity-20"
                          style={
                            { WebkitTextStroke: "2px #fff" } as CSSProperties
                          }
                        >
                          0{i + 1}
                        </span>
                      </div>

                      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                        <div className="mb-auto">
                          <span className="inline-block bg-yellow-500 text-black px-3 py-1 text-xs font-black uppercase italic tracking-wider transform skew-x-6">
                            {cat.count || "Collection"}
                          </span>
                        </div>
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic leading-[0.85] text-white mb-4 drop-shadow-md">
                            {cat.name}
                          </h3>
                          <div className="h-[2px] w-0 group-hover:w-full bg-yellow-500 transition-all duration-500 ease-out mb-4" />
                          <p className="text-yellow-400 font-bold italic tracking-wide uppercase inline-flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-x-[-20px] group-hover:translate-x-0 transition-all duration-300 delay-75">
                            S'entraîner{" "}
                            <ArrowRight className="w-5 h-5 animate-pulse" />
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

        {/* Services */}
        <ServicesSection />

        {/* ═══ 4. NEW ARRIVALS ══════════════════════════════════════════════ */}
        {newArrivals.length > 0 && (
          <section
            className="py-14 sm:py-18 md:py-24 lg:py-28 bg-gray-50 dark:bg-gray-900"
            aria-label="Nouveaux arrivages"
          >
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
                <div>
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight">
                    Arrivages{" "}
                    <span className="text-yellow-500">Récents</span>
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/product?filter=new"
                    className="text-yellow-600 hover:text-yellow-700 font-bold flex items-center gap-1 text-sm sm:text-base group"
                    aria-label="Voir tous les nouveaux produits"
                  >
                    Voir tout{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <SwiperNavButtons
                    prevRef={newArrivalsPrevRef}
                    nextRef={newArrivalsNextRef}
                  />
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
                onBeforeInit={(swiper: SwiperType) => {
                  if (
                    swiper.params.navigation &&
                    typeof swiper.params.navigation === "object"
                  ) {
                    swiper.params.navigation.prevEl =
                      newArrivalsPrevRef.current;
                    swiper.params.navigation.nextEl =
                      newArrivalsNextRef.current;
                  }
                }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                breakpoints={
                  {
                    480: { slidesPerView: 1.3 },
                    640: { slidesPerView: 1.5, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                    1280: { slidesPerView: 3.5, spaceBetween: 28 },
                  } as SwiperOptions["breakpoints"]
                }
                a11y={{
                  prevSlideMessage: "Produit précédent",
                  nextSlideMessage: "Produit suivant",
                }}
              >
                {newArrivals.map((product) => (
                  <SwiperSlide
                    key={product._id || product.id || Math.random()}
                    className="h-auto"
                  >
                    <ProductCardLarge
                      product={product}
                      addToCart={handleAddToCart}
                      toggleFavorite={toggleFavorite}
                      isFavorite={isInFavorites(
                        product._id || product.id || ""
                      )}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        )}

        {/* ═══ 5. LATEST PRODUCTS ═══════════════════════════════════════════ */}
        <LatestProductsSection
          products={latestProducts}
          addToCart={handleAddToCart}
          toggleFavorite={toggleFavorite}
          isInFavorites={isInFavorites}
          loadMore={loadMoreLatestProducts}
          hasMore={hasMoreLatest}
          loadingMore={loadingLatest}
        />

        {/* ═══ 6. FEATURED PRODUCT SPOTLIGHT ═══════════════════════════════ */}
        {featuredVedette && (
          <section
            className="py-20 sm:py-28 lg:py-32 bg-gray-950 relative overflow-hidden flex items-center min-h-[700px] sm:min-h-[800px]"
            aria-label={`Produit vedette : ${featuredVedette.name}`}
            itemScope
            itemType="https://schema.org/Product"
          >
            <meta itemProp="name" content={featuredVedette.name} />
            {featuredVedette.description && (
              <meta itemProp="description" content={featuredVedette.description} />
            )}

            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" aria-hidden />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" aria-hidden />

            {/* Grid texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden>
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="premium-grid"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 60L60 0H30L0 30M60 60V30L30 60"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#premium-grid)" />
              </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                  className="w-full lg:w-1/2 relative"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-full blur-3xl opacity-60 pointer-events-none" aria-hidden />

                  <div className="relative z-10 aspect-square max-w-[500px] mx-auto group">
                    <motion.div
                      animate={{ y: [-15, 15, -15] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-full h-full relative flex items-center justify-center p-8 sm:p-12"
                    >
                      <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-colors duration-700" aria-hidden />
                      <CloudImg
                        src={featuredVedette.image}
                        alt={`${featuredVedette.name} – ${SITE_NAME}`}
                        className="w-full h-full object-contain rounded-xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-700 z-10"
                        sizes="(max-width:768px) 90vw,(max-width:1024px) 50vw,800px"
                        itemProp="image"
                      />
                    </motion.div>

                    {/* Floating badges */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute top-8 right-0 sm:-right-8 bg-zinc-900/90 backdrop-blur-xl border border-white/10 px-5 py-3 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl shadow-2xl z-20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-500/20 p-2 rounded-full">
                          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-pulse" />
                        </div>
                        <span className="text-white font-black italic tracking-wider uppercase text-xs sm:text-sm">
                          Best Seller
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -20 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="absolute bottom-12 sm:bottom-16 left-0 sm:-left-8 bg-zinc-900/90 backdrop-blur-xl border border-white/10 px-5 py-4 sm:px-6 sm:py-5 rounded-2xl sm:rounded-3xl shadow-2xl z-20 flex items-center gap-3 sm:gap-4"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                        <Star className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500 fill-yellow-500" />
                      </div>
                      <div>
                        <div className="text-white font-black text-xl sm:text-2xl leading-none mb-1">
                          4.9
                          <span className="text-gray-500 text-lg">/5</span>
                        </div>
                        <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                          Avis Clients
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 mb-6 sm:mb-8 backdrop-blur-sm shadow-sm">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" aria-hidden />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500" />
                      </span>
                      <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
                        Équipement Vedette
                      </span>
                    </div>

                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase italic tracking-tighter text-white mb-6 leading-[0.9]"
                      itemProp="name"
                    >
                      {featuredVedette.name}
                    </h2>

                    <div className="w-24 h-1 bg-yellow-500 mb-6 sm:mb-8" aria-hidden />

                    {featuredVedette.description && (
                      <p
                        className="text-gray-400 text-base sm:text-lg xl:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl font-medium"
                        itemProp="description"
                      >
                        {featuredVedette.description}
                      </p>
                    )}

                    {/* Price */}
                    <div
                      className="flex flex-wrap items-end gap-5 sm:gap-8 mb-10 sm:mb-12 bg-zinc-900/50 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-zinc-800/50"
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <meta itemProp="priceCurrency" content="MAD" />
                      <meta
                        itemProp="price"
                        content={String(featuredVedette.price)}
                      />
                      <meta
                        itemProp="availability"
                        content="https://schema.org/InStock"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                          Prix Exclusif
                        </span>
                        <span className="text-4xl sm:text-5xl xl:text-6xl font-black text-yellow-500 leading-none">
                          {formatPrice(featuredVedette.price)}
                        </span>
                      </div>
                      {featuredVedette.oldPrice && (
                        <div className="flex flex-col pb-1">
                          <span className="text-xl sm:text-2xl text-gray-500 line-through decoration-2 decoration-red-500/50 mb-2">
                            {formatPrice(featuredVedette.oldPrice)}
                          </span>
                          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider">
                            <TrendingUp className="w-3.5 h-3.5" aria-hidden />
                            Économisez{" "}
                            {formatPrice(
                              featuredVedette.oldPrice - featuredVedette.price
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-10 sm:mb-14">
                      <button
                        onClick={() => handleAddToCart(featuredVedette)}
                        className="group relative flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-yellow-500 text-black font-black text-base sm:text-lg uppercase tracking-widest rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.2)] hover:shadow-[0_0_60px_rgba(234,179,8,0.4)] transition-all duration-500 hover:-translate-y-1 flex-1 sm:flex-none"
                        aria-label={`Ajouter ${featuredVedette.name} au panier`}
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" aria-hidden />
                        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform group-hover:scale-110 duration-500" />
                        <span className="relative z-10">Ajouter au panier</span>
                      </button>

                      <Link
                        href={`/produit/${featuredVedette.slug || featuredVedette._id}`}
                        className="group flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-zinc-900 text-white border border-zinc-700 hover:border-yellow-500 hover:text-yellow-500 font-bold text-base sm:text-lg uppercase tracking-widest rounded-2xl transition-all duration-500 flex-1 sm:flex-none"
                        aria-label={`Voir les détails de ${featuredVedette.name}`}
                      >
                        <span>Voir Détails</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-500" />
                      </Link>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 border-t border-zinc-800 pt-6 sm:pt-8">
                      {[
                        {
                          icon: Truck,
                          title: "Livraison Rapide",
                          desc: "Sous 24/48h au Maroc",
                        },
                        { icon: ShieldCheck, title: "Garantie", desc: "2 ans inclus" },
                        {
                          icon: Sparkles,
                          title: "Qualité",
                          desc: "Équipement Premium",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center sm:flex-col sm:items-start gap-4 sm:gap-2"
                        >
                          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 shrink-0">
                            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" aria-hidden />
                          </div>
                          <div>
                            <div className="text-white font-bold text-sm tracking-wide">
                              {item.title}
                            </div>
                            <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* BG typography */}
            <div
              className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none z-0 opacity-[0.02] -translate-y-1/2 flex flex-col items-center"
              aria-hidden
            >
              <h2 className="text-[20vw] font-black uppercase italic whitespace-nowrap text-white text-center leading-none tracking-tighter">
                IRONZ
              </h2>
              <h2
                className="text-[20vw] font-black uppercase italic whitespace-nowrap text-transparent text-center leading-none tracking-tighter"
                style={{ WebkitTextStroke: "2px white" } as CSSProperties}
              >
                PRO GEAR
              </h2>
            </div>
          </section>
        )}

        {/* References */}
        <ReferencesSection />

        {/* ═══ 7. WHY CHOOSE US ═════════════════════════════════════════════ */}
        <section
          className="py-14 sm:py-18 md:py-24 lg:py-28 bg-white dark:bg-gray-900"
          aria-label="Pourquoi choisir IRONZ PRO"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
              <span className="text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest text-xs sm:text-sm block mb-3">
                Nos Engagements
              </span>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black italic text-gray-900 dark:text-white mb-6 tracking-tight">
                Pourquoi Choisir{" "}
                <span className="text-yellow-500">IRONZ</span>&nbsp;?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Nous ne vendons pas seulement du matériel, nous vous offrons
                l'assurance d'atteindre vos objectifs avec des équipements
                professionnels.
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: CheckCircle,
                  title: "Qualité Professionnelle Garantie",
                  text: "Chaque produit est rigoureusement sélectionné pour sa durabilité et sa performance.",
                },
                {
                  icon: Truck,
                  title: "Livraison Rapide & Sécurisée",
                  text: "Expédition express sous 24/48h partout au Maroc avec suivi en temps réel.",
                },
                {
                  icon: TrendingUp,
                  title: "Expertise & Conseils Gratuits",
                  text: "Notre équipe d'experts vous guide pour choisir l'équipement adapté à vos objectifs.",
                },
                {
                  icon: Award,
                  title: "Meilleur Rapport Qualité/Prix",
                  text: "Prix compétitifs négociés directement avec les fabricants.",
                },
                {
                  icon: ShieldCheck,
                  title: "Service Après-Vente Réactif",
                  text: "SAV basé au Maroc disponible 7j/7 pour vous apporter une solution immédiate.",
                },
                {
                  icon: Heart,
                  title: "Satisfait ou Remboursé",
                  text: "14 jours pour retourner vos produits si vous n'êtes pas convaincu.",
                },
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
                    <item.icon
                      className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500 group-hover:text-black transition-colors"
                      aria-hidden
                    />
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

        {/* ═══ BACK TO TOP ══════════════════════════════════════════════════ */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-black hover:bg-yellow-500 text-white hover:text-black p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Retour en haut de page"
        >
          <Image
            src={logo}
            alt={`${SITE_NAME} logo`}
            className="w-6 h-6 sm:w-8 sm:h-8"
            width={32}
            height={32}
          />
        </motion.button>
      </main>
    </>
  );
}