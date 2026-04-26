// app/produit/[slug]/page.tsx
"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Flame,
  CheckCircle,
  AlertCircle,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Heart,
  Share2,
  Package,
  Tag,
  Minus,
  Plus,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Info,
  MessageSquare,
  List,
  Award,
} from "lucide-react";
import { useCart } from "../../../context/cart-context";
import { useFavorites } from "../../../context/favorites-context";

// ─── CONSTANTS ──────────────────────────────────────────
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";
const PLACEHOLDER = "/placeholder.svg";

// ─── TYPES ──────────────────────────────────────────────
interface Review {
  username: string;
  title: string;
  body: string;
  rating: number;
  verified: boolean;
  date?: { $date: string } | string;
  createdAt?: { $date: string } | string;
}

interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  oldPrice?: number;
  image?: string;
  gallery?: string[];
  images?: string[];
  slug?: string;
  category?: string;
  subCategory?: string;
  description?: string;
  longDescription?: string;
  features?: string[];
  brand?: string;
  rating?: number;
  reviewCount?: number;
  discount?: number;
  isNewProduct?: boolean;
  isFeatured?: boolean;
  inStock?: boolean;
  stockQuantity?: number;
  tags?: string[];
  specs?: Record<string, string>;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
  };
  shipping?: {
    dimensions?: string;
    weight?: number;
    estimatedDelivery?: string;
  };
  colors?: string[];
  sku?: string;
  warranty?: string;
  materials?: string[];
  reviews?: Review[];
  createdAt?: string | { $date: string };
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

// ─── UTILITIES ──────────────────────────────────────────
const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
  }).format(price || 0);

const getProductId = (p: Product) => p._id || p.id || "";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const getDiscount = (product: Product): number =>
  product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : product.discount || 0;

const formatDate = (date?: { $date: string } | string): string => {
  if (!date) return "";
  const d = typeof date === "object" && "$date" in date ? date.$date : date;
  return new Date(d).toLocaleDateString("fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

// ─── SKELETON ─────────────────────────────────────────────
const Skeleton = memo(({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-xl ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
  </div>
));
Skeleton.displayName = "Skeleton";

// ─── STAR RATING ─────────────────────────────────────────
const StarRating = memo(
  ({
    rating,
    size = "sm",
    interactive = false,
    onChange,
  }: {
    rating: number;
    size?: "xs" | "sm" | "md";
    interactive?: boolean;
    onChange?: (r: number) => void;
  }) => {
    const sizes = { xs: "w-3 h-3", sm: "w-4 h-4", md: "w-5 h-5" };
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            onClick={() => interactive && onChange?.(i + 1)}
            className={cn(
              sizes[size],
              i < Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700",
              interactive && "cursor-pointer hover:fill-yellow-300 hover:text-yellow-300 transition-colors"
            )}
          />
        ))}
      </div>
    );
  }
);
StarRating.displayName = "StarRating";

// ─── BADGE ────────────────────────────────────────────────
const Badge = memo(
  ({
    children,
    variant = "default",
  }: {
    children: React.ReactNode;
    variant?: "yellow" | "red" | "green" | "gray" | "default";
  }) => {
    const styles = {
      yellow: "bg-yellow-500 text-black border-yellow-600",
      red: "bg-red-500 text-white border-red-600",
      green: "bg-emerald-500 text-white border-emerald-600",
      gray: "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white",
      default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    };
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border",
          styles[variant]
        )}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

// ─── FETCH FUNCTIONS ──────────────────────────────────────
async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products?slug=${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const products = data.data || data.products || data || [];
    return (
      products.find((p: Product) => p.slug === slug) || products[0] || null
    );
  } catch {
    return null;
  }
}

async function fetchRelatedProducts(
  category?: string,
  currentId?: string
): Promise<Product[]> {
  if (!category) return [];
  try {
    const res = await fetch(
      `${API_URL}/products?category=${encodeURIComponent(category)}&limit=10`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const products = data.data || data.products || data || [];
    return products
      .filter((p: Product) => getProductId(p) !== currentId)
      .slice(0, 4);
  } catch {
    return [];
  }
}

// ─── MAIN PAGE ────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });
  const [activeTab, setActiveTab] = useState<
    "desc" | "features" | "specs" | "reviews"
  >("desc");
  const [imgZoom, setImgZoom] = useState(false);

  const { addToCart } = useCart();
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();

  // Fetch
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchProductBySlug(slug)
      .then(async (prod) => {
        setProduct(prod);
        if (prod?.category) {
          const rel = await fetchRelatedProducts(
            prod.category,
            getProductId(prod)
          );
          setRelated(rel);
        }
      })
      .catch(() => showToast("Erreur de chargement", "error"))
      .finally(() => setLoading(false));
  }, [slug]);

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

  const handleAddToCart = useCallback(() => {
    if (!product || isOutOfStock) return;
    addToCart({
      id: getProductId(product),
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      quantity,
    });
    showToast("Ajouté au panier ✓", "success");
  }, [product, quantity, addToCart, showToast]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    router.push("/panier");
  }, [handleAddToCart, router]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      await navigator.share({ title: product?.name, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Lien copié ✓", "success");
    }
  }, [product, showToast]);

  const handleFavoriteToggle = useCallback(() => {
    if (!product) return;
    const id = getProductId(product);
    if (isInFavorites(id)) {
      removeFromFavorites(id);
      showToast("Retiré des favoris", "success");
    } else {
      addToFavorites({ ...product, id } as any);
      showToast("Ajouté aux favoris ♥", "success");
    }
  }, [product, isInFavorites, addToFavorites, removeFromFavorites, showToast]);

  // ── Loading ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <style jsx global>{`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
        <div className="container mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <Skeleton className="h-4 w-24 rounded-lg" />
              <Skeleton className="h-10 w-3/4 rounded-xl" />
              <Skeleton className="h-5 w-32 rounded-lg" />
              <Skeleton className="h-14 w-48 rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            Produit introuvable
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
            Ce produit n'existe plus ou a été déplacé.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-bold text-sm rounded-xl hover:border-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <Link
              href="/produit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-xl transition-colors"
            >
              Voir les produits
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isOutOfStock = !product.inStock || product.stockQuantity === 0;
  const isFav = isInFavorites(getProductId(product));
  const discount = getDiscount(product);
  const productImages = [
    product.image,
    ...(product.gallery || []),
    ...(product.images || []),
  ].filter(Boolean) as string[];

  const tabs = [
    { id: "desc", label: "Description", icon: Info },
    ...(product.features?.length
      ? [{ id: "features", label: "Caractéristiques", icon: List }]
      : []),
    ...(product.specs && Object.keys(product.specs).length
      ? [{ id: "specs", label: "Spécifications", icon: Package }]
      : []),
    {
      id: "reviews",
      label: `Avis (${product.reviewCount || product.reviews?.length || 0})`,
      icon: MessageSquare,
    },
  ];

  const seoTitle = `${product.name} - IRONZ`;
  const seoDescription =
    product.description || "Équipement sportif premium. Livraison au Maroc.";
  const seoUrl = `https://ironz.ma/produit/${product.slug || slug}`;
  const seoImage = product.image?.startsWith("http")
    ? product.image
    : `https://ironz.ma${product.image}`;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content={`${product.category}, ${product.brand}, équipement sportif, Maroc, IRONZ`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:image" content={seoImage} />
        <meta
          property="product:price:amount"
          content={String(product.price)}
        />
        <meta property="product:price:currency" content="MAD" />
        <meta
          property="product:availability"
          content={product.inStock ? "in stock" : "out of stock"}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              image: seoImage,
              description: product.description,
              sku: product.sku,
              brand: {
                "@type": "Brand",
                name: product.brand || "IRONZ",
              },
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "MAD",
                availability: product.inStock
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
                url: seoUrl,
              },
              aggregateRating: product.rating
                ? {
                  "@type": "AggregateRating",
                  ratingValue: product.rating,
                  reviewCount:
                    product.reviewCount || product.reviews?.length || 0,
                  bestRating: 5,
                  worstRating: 1,
                }
                : undefined,
            }),
          }}
        />
      </Head>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-up {
          animation: fadeUp 0.35s ease-out forwards;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* ── TOAST ──────────────────────────────────── */}
        {toast.show && (
          <div className="fixed top-5 right-5 z-50 fade-up">
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border font-semibold text-sm",
                toast.type === "success"
                  ? "bg-emerald-600 border-emerald-700 text-white"
                  : "bg-red-600 border-red-700 text-white"
              )}
              role="alert"
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              {toast.message}
            </div>
          </div>
        )}

        <main className="container mx-auto px-4 sm:px-6 py-6 md:py-10">
          {/* ── BREADCRUMB ────────────────────────────── */}
          <nav
            className="flex items-center gap-1.5 mb-6 sm:mb-8 text-xs font-medium text-gray-500 dark:text-gray-400 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Accueil
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600" />
            <Link
              href="/produit"
              className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              Produits
            </Link>
            {product.category && (
              <>
                <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                <Link
                  href={`/produit?category=${encodeURIComponent(product.category)}`}
                  className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                >
                  {product.category}
                </Link>
              </>
            )}
            {product.subCategory && (
              <>
                <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                <Link
                  href={`/produit?category=${encodeURIComponent(product.category || "")}&subCategory=${encodeURIComponent(product.subCategory)}`}
                  className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                >
                  {product.subCategory}
                </Link>
              </>
            )}
            <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600" />
            <span className="text-gray-900 dark:text-white font-semibold truncate max-w-[180px] sm:max-w-xs">
              {product.name}
            </span>
          </nav>

          {/* ── PRODUCT GRID ──────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20">
            {/* Images Column */}
            <div className="space-y-3">
              {/* Main image */}
              <div
                className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm cursor-zoom-in"
                onClick={() => setImgZoom(true)}
              >
                {productImages.length > 0 ? (
                  <CloudImg
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full transition-transform duration-500 hover:scale-105"
                    fill
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-20 h-20 text-gray-300 dark:text-gray-700" />
                  </div>
                )}

                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.isNewProduct && (
                    <Badge variant="yellow">
                      <Sparkles className="w-2.5 h-2.5" />
                      Nouveau
                    </Badge>
                  )}
                  {discount > 0 && (
                    <Badge variant="red">
                      <Zap className="w-2.5 h-2.5" />-{discount}%
                    </Badge>
                  )}
                  {product.isFeatured && discount === 0 && !product.isNewProduct && (
                    <Badge variant="gray">
                      <Flame className="w-2.5 h-2.5" />
                      Populaire
                    </Badge>
                  )}
                </div>

                {/* Out of stock overlay */}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-20">
                    <span className="text-white font-black text-lg uppercase tracking-widest px-5 py-2 border border-white/40 rounded-xl bg-black/20">
                      Rupture de stock
                    </span>
                  </div>
                )}

                {/* Image counter */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    {selectedImage + 1} / {productImages.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "relative w-18 h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all",
                        selectedImage === idx
                          ? "border-yellow-500 shadow-md shadow-yellow-500/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-yellow-400 opacity-70 hover:opacity-100"
                      )}
                      style={{ width: 72, height: 72 }}
                      aria-label={`Image ${idx + 1}`}
                    >
                      <CloudImg
                        src={img}
                        alt={`${product.name} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust badges - desktop only under image */}
              <div className="hidden lg:grid grid-cols-3 gap-3 pt-2">
                {[
                  {
                    icon: Truck,
                    title: "Livraison rapide",
                    sub: "24 – 48h",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Garantie",
                    sub: "2 ans",
                  },
                  {
                    icon: RotateCcw,
                    title: "Retour gratuit",
                    sub: "30 jours",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-center"
                  >
                    <div className="w-9 h-9 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
                      <item.icon className="w-4.5 h-4.5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Column */}
            <div className="space-y-5">
              {/* Brand + Category */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  {product.brand && (
                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">
                      {product.brand}
                    </span>
                  )}
                  {product.brand && product.category && (
                    <span className="text-gray-300 dark:text-gray-700">·</span>
                  )}
                  {product.category && (
                    <Link
                      href={`/produit?category=${encodeURIComponent(product.category)}`}
                      className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {product.category}
                    </Link>
                  )}
                  {product.subCategory && (
                    <>
                      <span className="text-gray-300 dark:text-gray-700">·</span>
                      <Link
                        href={`/produit?category=${encodeURIComponent(product.category || "")}&subCategory=${encodeURIComponent(product.subCategory)}`}
                        className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                      >
                        {product.subCategory}
                      </Link>
                    </>
                  )}
                </div>
                {product.sku && (
                  <span className="text-[10px] text-gray-400 dark:text-gray-600 font-mono">
                    REF: {product.sku}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                {product.name}
              </h1>



              {/* Price */}
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-none">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && product.oldPrice > product.price && (
                    <span className="text-xl text-gray-400 dark:text-gray-600 line-through font-medium mb-0.5">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                {discount > 0 && product.oldPrice && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-2.5 py-1 rounded-lg text-xs font-bold">
                      <Zap className="w-3 h-3" />
                      Économisez {formatPrice(product.oldPrice - product.price)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      soit {discount}% de réduction
                    </span>
                  </div>
                )}
              </div>

              {/* Stock status */}
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border",
                  product.inStock
                    ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30"
                    : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30"
                )}
              >
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full shrink-0",
                    product.inStock ? "bg-emerald-500" : "bg-red-500"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-bold",
                    product.inStock
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-red-700 dark:text-red-400"
                  )}
                >
                  {product.inStock
                    ? `${product.stockQuantity ? `${product.stockQuantity} unité${product.stockQuantity > 1 ? "s" : ""} disponible${product.stockQuantity > 1 ? "s" : ""}` : "En stock"}`
                    : "Rupture de stock"}
                </span>
                {product.inStock && product.stockQuantity && product.stockQuantity <= 5 && (
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                    — Plus que {product.stockQuantity} !
                  </span>
                )}
              </div>

              {/* Short description */}
              {product.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description.length > 200
                    ? product.description.slice(0, 200) + "..."
                    : product.description}
                </p>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Couleur
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to cart */}
              <div className="space-y-3">
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Quantité
                  </span>
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center font-black text-gray-900 dark:text-white text-base select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      disabled={
                        product.stockQuantity
                          ? quantity >= product.stockQuantity
                          : false
                      }
                      className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {product.stockQuantity && (
                    <span className="text-xs text-gray-400 dark:text-gray-600">
                      max {product.stockQuantity}
                    </span>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={cn(
                      "flex-1 h-12 rounded-xl flex items-center justify-center gap-2.5 font-black text-sm uppercase tracking-wider border-2 transition-all",
                      isOutOfStock
                        ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm hover:shadow-md"
                    )}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isOutOfStock ? "Indisponible" : "Ajouter au panier"}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    className={cn(
                      "flex-1 h-12 rounded-xl flex items-center justify-center gap-2.5 font-black text-sm uppercase tracking-wider border-2 transition-all",
                      isOutOfStock
                        ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-400 border-yellow-600 hover:border-yellow-500 text-black shadow-sm hover:shadow-lg hover:shadow-yellow-500/20"
                    )}
                  >
                    <Zap className="w-4 h-4" />
                    Achat rapide
                  </button>
                </div>

               
              </div>

              {/* Trust badges - mobile */}
              <div className="grid grid-cols-3 gap-2 lg:hidden">
                {[
                  { icon: Truck, title: "Livraison", sub: "24 – 48h" },
                  { icon: ShieldCheck, title: "Garantie", sub: "2 ans" },
                  { icon: RotateCcw, title: "Retour", sub: "30 jours" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1.5 p-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              {product.tags?.length && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/produit?q=${encodeURIComponent(tag)}`}
                      className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 text-gray-600 dark:text-gray-400 hover:text-yellow-700 dark:hover:text-yellow-400 rounded-lg text-[11px] font-semibold transition-colors border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── TABS SECTION ──────────────────────────── */}
          <div className="mt-12 lg:mt-16">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              {/* Tab headers */}
              <div className="flex border-b border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all",
                      activeTab === tab.id
                        ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-200 dark:hover:border-gray-700"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-5 sm:p-6 md:p-8">
                {/* Description */}
                {activeTab === "desc" && (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                      {product.longDescription ||
                        product.description ||
                        "Aucune description disponible."}
                    </p>
                  </div>
                )}

                {/* Features */}
                {activeTab === "features" && product.features && (
                  <ul className="space-y-3">
                    {product.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0 mt-0.5">
                          <BadgeCheck className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Specs */}
                {activeTab === "specs" && (
                  <div className="space-y-6">
                    {product.specs && Object.keys(product.specs).length > 0 && (
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                          Spécifications
                        </h3>
                        <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                          {Object.entries(product.specs).map(
                            ([key, value], i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                              >
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  {key}
                                </span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {value}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Dimensions */}
                    {product.dimensions && (
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                          Dimensions
                        </h3>
                        <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                          {[
                            { key: "Largeur", value: product.dimensions.width, unit: "mm" },
                            { key: "Hauteur", value: product.dimensions.height, unit: "mm" },
                            { key: "Profondeur", value: product.dimensions.depth, unit: "mm" },
                            { key: "Poids max", value: product.dimensions.weight, unit: "kg" },
                          ]
                            .filter((d) => d.value)
                            .map((d, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900"
                              >
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  {d.key}
                                </span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {d.value} {d.unit}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Shipping */}
                    {product.shipping && (
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                          Livraison
                        </h3>
                        <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                          {[
                            {
                              key: "Dimensions colis",
                              value: product.shipping.dimensions,
                            },
                            {
                              key: "Poids colis",
                              value: product.shipping.weight
                                ? `${product.shipping.weight} kg`
                                : null,
                            },
                            {
                              key: "Délai estimé",
                              value: product.shipping.estimatedDelivery
                                ? `${product.shipping.estimatedDelivery} jours`
                                : null,
                            },
                          ]
                            .filter((d) => d.value)
                            .map((d, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900"
                              >
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  {d.key}
                                </span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {d.value}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews */}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {/* Rating summary */}
                    {product.rating && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div className="text-center shrink-0">
                          <p className="text-6xl font-black text-gray-900 dark:text-white leading-none">
                            {product.rating.toFixed(1)}
                          </p>
                          <StarRating rating={product.rating} size="md" />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                            {product.reviewCount ||
                              product.reviews?.length ||
                              0}{" "}
                            avis
                          </p>
                        </div>
                        <div className="flex-1 w-full space-y-1.5">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count =
                              product.reviews?.filter(
                                (r) => Math.round(r.rating) === star
                              ).length || 0;
                            const total =
                              product.reviews?.length || 1;
                            const pct = Math.round((count / total) * 100);
                            return (
                              <div
                                key={star}
                                className="flex items-center gap-2"
                              >
                                <span className="text-xs font-bold text-gray-500 w-4">
                                  {star}
                                </span>
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />
                                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-yellow-400 rounded-full transition-all"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-400 w-8 text-right">
                                  {pct}%
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Reviews list */}
                    {product.reviews && product.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {product.reviews.map((review, i) => (
                          <div
                            key={i}
                            className="p-4 sm:p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800"
                          >
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0">
                                  <span className="text-yellow-700 dark:text-yellow-400 font-black text-sm">
                                    {review.username
                                      ?.charAt(0)
                                      .toUpperCase() || "?"}
                                  </span>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                      {review.username}
                                    </p>
                                    {review.verified && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                        <BadgeCheck className="w-3 h-3" />
                                        Vérifié
                                      </span>
                                    )}
                                  </div>
                                  <StarRating
                                    rating={review.rating}
                                    size="xs"
                                  />
                                </div>
                              </div>
                              <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0">
                                {formatDate(
                                  review.createdAt || review.date
                                )}
                              </span>
                            </div>
                            {review.title && (
                              <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                                {review.title}
                              </p>
                            )}
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {review.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
                          <MessageSquare className="w-7 h-7 text-gray-400" />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                          Aucun avis pour le moment
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                          Soyez le premier à donner votre avis !
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RELATED PRODUCTS ──────────────────────── */}
          {related.length > 0 && (
            <section className="mt-12 lg:mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest mb-1">
                    Vous aimerez aussi
                  </p>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                    Produits similaires
                  </h2>
                </div>
                <Link
                  href={`/produit?category=${encodeURIComponent(product.category || "")}`}
                  className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors"
                >
                  Voir tout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {related.map((prod) => {
                  const pDiscount = getDiscount(prod);
                  return (
                    <Link
                      key={getProductId(prod)}
                      href={`/produit/${prod.slug || getProductId(prod)}`}
                      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-yellow-200 dark:hover:border-yellow-900/50 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
                        <CloudImg
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          fill
                        />
                        {pDiscount > 0 && (
                          <div className="absolute top-2 left-2">
                            <span className="inline-flex items-center gap-0.5 bg-red-500 text-white px-2 py-0.5 rounded-md text-[10px] font-bold border border-red-600">
                              <Zap className="w-2 h-2" />-{pDiscount}%
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div className="p-3">
                        <p className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-1 truncate">
                          {prod.brand || prod.category}
                        </p>
                        <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors mb-2 leading-tight">
                          {prod.name}
                        </h3>
                        {prod.rating && (
                          <div className="mb-2">
                            <StarRating rating={prod.rating} size="xs" />
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-black text-gray-900 dark:text-white">
                            {formatPrice(prod.price)}
                          </span>
                          {prod.oldPrice && prod.oldPrice > prod.price && (
                            <span className="text-xs line-through text-gray-400 dark:text-gray-600">
                              {formatPrice(prod.oldPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 text-center sm:hidden">
                <Link
                  href={`/produit?category=${encodeURIComponent(product.category || "")}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-bold text-sm rounded-xl hover:border-yellow-400 hover:text-yellow-600 transition-colors"
                >
                  Voir plus de produits
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )}

          {/* ── BACK BUTTON ───────────────────────────── */}
          <div className="mt-10 sm:mt-12">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux produits
            </button>
          </div>
        </main>

        {/* ── IMAGE ZOOM MODAL ──────────────────────── */}
        {imgZoom && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setImgZoom(false)}
          >
            <button
              onClick={() => setImgZoom(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-45" />
            </button>
            <div
              className="relative max-w-3xl max-h-[90vh] w-full aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <CloudImg
                src={productImages[selectedImage]}
                alt={product.name}
                className="rounded-2xl"
                fill
                priority
              />
            </div>
            {productImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(idx);
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      selectedImage === idx
                        ? "bg-yellow-500 w-5"
                        : "bg-white/50 hover:bg-white/80"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}