"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Star,
  StarHalf,
  Heart,
  ShoppingCart,
  Share2,
  Check,
  ArrowLeft,
  Plus,
  Minus,
  Info,
  Facebook,
  Twitter,
  Mail,
  Linkedin,
  PhoneIcon as Whatsapp,
  PinIcon as Pinterest,
  CircleCheck,
  AlertCircle,
  X,
  Flame,
  Eye,
  ArrowRight
} from "lucide-react";

import { useCart } from "../../../context/cart-context";
import { useFavorites } from "../../../context/favorites-context";
import { cn } from "../../../lib/utils";

import { Badge } from "../../../components/ui/badge";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your-cloud-name";
const PLACEHOLDER = "/placeholder.svg";

// --- COLOR UTILS ---
const COLOR_MAP = {
  "Rouge": "#EF4444",
  "Bleu": "#3B82F6",
  "Vert": "#22C55E",
  "Noir": "#000000",
  "Blanc": "#FFFFFF",
  "Jaune": "#EAB308",
  "Orange": "#F97316",
  "Violet": "#8B5CF6",
  "Rose": "#EC4899",
  "Gris": "#6B7280",
  "Marron": "#A52A2A",
  "Beige": "#F5F5DC",
  "Or": "#FFD700",
  "Argent": "#C0C0C0",
  "Multicolore": "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
  
  // English fallback
  "Red": "#EF4444",
  "Blue": "#3B82F6",
  "Green": "#22C55E",
  "Black": "#000000",
  "White": "#FFFFFF",
  "Yellow": "#EAB308",
  "Purple": "#8B5CF6",
  "Pink": "#EC4899",
  "Gray": "#6B7280",
  "Brown": "#A52A2A",
  "Gold": "#FFD700",
  "Silver": "#C0C0C0"
};

const getColor = (colorName) => {
  if (!colorName) return "#E5E7EB";
  if (COLOR_MAP[colorName]) return COLOR_MAP[colorName];
  return colorName;
};

// --- CLOUDINARY IMAGE UTILS ---
const getCloudinaryUrl = (imagePath, options = {}) => {
  if (!imagePath) return PLACEHOLDER;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // If it's a Cloudinary public_id or path
  const width = options.width || 'auto';
  const height = options.height || 'auto';
  const quality = options.quality || 'auto';
  const crop = options.crop || 'fill';
  
  // Check if it's a Cloudinary public ID (doesn't contain /uploads/)
  if (!imagePath.includes('/uploads/')) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_${crop},w_${width},h_${height},q_${quality}/${imagePath}`;
  }
  
  // If it's a local upload path, construct the URL
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `/${cleanPath}`;
};

// --- IMAGE COMPONENT ---
function CloudImg({ src, alt, fill = false, className = "", wrapperClassName = "", priority = false, cloudinary = true, width, height }) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);
  
  useEffect(() => { 
    if (cloudinary && src) {
      setImgSrc(getCloudinaryUrl(src, { width, height }));
    } else {
      setImgSrc(src || PLACEHOLDER);
    }
  }, [src, cloudinary, width, height]);

  const handleError = () => {
    setImgSrc(PLACEHOLDER);
  };

  if (fill) {
    return (
      <div className={cn("relative", wrapperClassName)}>
        <img
          src={imgSrc}
          alt={alt || ""}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={handleError}
          className={cn("absolute inset-0 h-full w-full object-cover", className)}
        />
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || ""}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={handleError}
      className={className}
    />
  );
}

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
  }).format(price || 0);
};

// Component RatingStars
function RatingStars({ rating, showValue = false, className = "" }) {
  const r = Number(rating) || 0;
  const fullStars = Math.floor(r);
  const hasHalfStar = r % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Note: ${r} sur 5`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`f-${i}`} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
      ))}
      {hasHalfStar && <StarHalf className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`e-${i}`} className="w-3.5 h-3.5 text-gray-300" aria-hidden="true" />
      ))}
      {showValue && (
        <span className="ml-1 text-xs text-gray-500 font-bold uppercase">{`(${r.toFixed(1)})`}</span>
      )}
    </div>
  );
}

function Alert({ variant = "info", title, children }) {
  const styles =
    variant === "danger"
      ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200"
      : "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200";

  return (
    <div className={cn("rounded-xl border p-4", styles)}>
      {title && <div className="mb-1 font-bold uppercase italic">{title}</div>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function ColorSelector({ colors, selectedColor, onChange }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="text-sm font-black uppercase italic text-gray-900 dark:text-white tracking-wide">
        Couleur:{" "}
        {selectedColor ? (
          <span className="text-yellow-500">{selectedColor}</span>
        ) : (
          <span className="text-gray-400 font-medium normal-case not-italic">Choisir</span>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = color === selectedColor;
          const bgStyle = getColor(color);
          const tickColor = ["Blanc", "Jaune", "White", "Yellow", "Beige"].includes(color) ? "text-black" : "text-white";

          return (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={cn(
                "relative h-11 w-11 rounded-full p-1 transition-all duration-300",
                "border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60",
                "hover:scale-110",
                isSelected && "ring-2 ring-yellow-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-110"
              )}
              aria-label={`Couleur ${color}`}
              title={color}
            >
              <span
                className="block h-full w-full rounded-full border border-gray-200 dark:border-gray-700"
                style={{ background: bgStyle }}
              />
              {isSelected && (
                <span className="absolute inset-0 grid place-items-center">
                  <CircleCheck className={cn("h-5 w-5 drop-shadow-md", tickColor)} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TailleSelector({ tailles, selectedTaille, onChange }) {
  if (!tailles || tailles.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="text-sm font-black uppercase italic text-gray-900 dark:text-white tracking-wide">
        Taille:{" "}
        {selectedTaille ? (
          <span className="text-yellow-500">{selectedTaille}</span>
        ) : (
          <span className="text-gray-400 font-medium normal-case not-italic">Choisir</span>
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
              className={cn(
                "rounded-lg border-2 px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all",
                active
                  ? "border-yellow-500 bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                  : "border-gray-200 bg-white text-gray-800 hover:border-yellow-500 hover:text-yellow-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
              )}
              aria-pressed={active}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReviewsList({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-300">
        Aucun avis pour le moment. Soyez le premier à laisser un avis !
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((r, idx) => (
        <div
          key={r._id || `${r.username || "u"}-${idx}`}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/40"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-yellow-500 font-black text-black text-lg">
                {(r.username?.[0] || "U").toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                  {r.username || "Client"}
                </div>
                <RatingStars rating={r.rating} className="mt-1" />
              </div>
            </div>

            {r.verified && (
              <Badge variant="success" className="shrink-0 bg-green-500 text-white">
                ✓ Vérifié
              </Badge>
            )}
          </div>

          {r.title && (
            <div className="mt-4 text-base font-bold text-gray-900 dark:text-white">
              {r.title}
            </div>
          )}

          {r.body && (
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {r.body}
            </p>
          )}

          {r.date && (
            <div className="mt-4 text-xs text-gray-400 dark:text-gray-500 font-medium">
              {new Date(r.date).toLocaleDateString("fr-FR")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="h-5 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800 mb-8" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="h-[500px] animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 w-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-12 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-32 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-14 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

function ProductJsonLd({ product }) {
  if (!product) return null;
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? getCloudinaryUrl(product.image) : PLACEHOLDER,
    sku: product.sku || product._id,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "MAD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />;
}

export default function ProductPageClient({ slug }) {
  const router = useRouter();

  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTaille, setSelectedTaille] = useState("");

  const [tab, setTab] = useState("details");
  const [shareOpen, setShareOpen] = useState(false);

  const productId = useMemo(() => product?._id || product?.id, [product]);

  const mainImage = useMemo(() => {
    if (!product) return PLACEHOLDER;
    const gallery = Array.isArray(product.gallery) ? product.gallery : [];
    if (gallery.length > 0 && gallery[selectedImage]) return gallery[selectedImage];
    return product.image || PLACEHOLDER;
  }, [product, selectedImage]);

  const canAddToCart = useMemo(() => {
    if (!product) return false;
    if (!product.inStock) return false;
    if (product.colors?.length > 0 && !selectedColor) return false;
    if (product.taille?.length > 0 && !selectedTaille) return false;
    return true;
  }, [product, selectedColor, selectedTaille]);

  const handleQuantityChange = (next) => {
    const v = Math.max(1, Math.min(99, Number(next) || 1));
    setQuantity(v);
  };

  const toggleFavorite = useCallback(() => {
    if (!product) return;
    const id = product._id || product.id;
    if (!id) return;
    if (isInFavorites(id)) removeFromFavorites(id);
    else addToFavorites({ ...product, id });
  }, [product, isInFavorites, removeFromFavorites, addToFavorites]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    if (product.taille?.length > 0 && !selectedTaille) {
      alert("Veuillez sélectionner une taille avant d'ajouter au panier");
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      alert("Veuillez sélectionner une couleur avant d'ajouter au panier");
      return;
    }
    const id = product._id || product.id;
    addToCart({ ...product, id, quantity, selectedColor, selectedTaille });
  }, [product, addToCart, quantity, selectedColor, selectedTaille]);

  const getShareLinks = useCallback(() => {
    if (!product) return [];
    const url = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
    const title = encodeURIComponent(product.name || "");
    const text = encodeURIComponent(product.description || "");
    const image = product.image ? encodeURIComponent(getCloudinaryUrl(product.image)) : "";

    return [
      { name: "Facebook", icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
      { name: "Twitter", icon: Twitter, url: `https://twitter.com/intent/tweet?url=${url}&text=${title}` },
      { name: "WhatsApp", icon: Whatsapp, url: `https://wa.me/?text=${title}%20${url}` },
      { name: "LinkedIn", icon: Linkedin, url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}` },
      { name: "Pinterest", icon: Pinterest, url: `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}` },
      { name: "Email", icon: Mail, url: `mailto:?subject=${title}&body=${text}%0D%0A%0D%0A${url}` },
    ];
  }, [product]);

  const handleShare = useCallback(() => {
    if (!product) return;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: product.name, text: product.description, url: window.location.href }).catch(() => {});
    } else {
      setShareOpen((v) => !v);
    }
  }, [product]);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!shareOpen) return;
      if (!e.target.closest(".share-box")) setShareOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [shareOpen]);

  // Fetch product by slug + related
  useEffect(() => {
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
        const res = await fetch(`${API_URL}/products/slug/${safeSlug}`, { cache: "no-store" });

        if (!res.ok) {
          if (res.status === 404) throw new Error("Produit non trouvé");
          throw new Error(`Erreur serveur (${res.status})`);
        }

        const json = await res.json();
        const p = json?.data;

        if (!p) throw new Error("Réponse invalide du serveur");
        setProduct(p);

        if (p.colors?.length > 0) setSelectedColor(p.colors[0]);
        if (p.taille?.length > 0) setSelectedTaille(p.taille[0]);

        if (p.category) {
          try {
            const rRes = await fetch(`${API_URL}/products?category=${encodeURIComponent(p.category)}&limit=8&sort=featured`, { cache: "no-store" });
            const rJson = await rRes.json();
            const list = Array.isArray(rJson?.data) ? rJson.data : [];
            setRelatedProducts(list.filter((x) => x._id !== p._id).slice(0, 4));
          } catch {}
        }
      } catch (e) {
        setError(e?.message || "Une erreur s'est produite");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [slug]);

  if (loading) return <ProductSkeleton />;

  if (error || !product) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900/40">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {error || "Produit non trouvé"}
          </h1>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button onClick={() => router.push("/product")} className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-600">
              Retour aux produits
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <ProductJsonLd product={product} />

      <main className="bg-white pb-16 pt-8 dark:bg-gray-950">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav
            className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400 font-medium"
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-yellow-500 transition-colors">
              ACCUEIL
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/produit" className="hover:text-yellow-500 transition-colors">
              PRODUITS
            </Link>
            {product.category && (
              <>
                <ChevronRight className="h-4 w-4" />
                <Link
                  href={`/produit?category=${encodeURIComponent(product.category)}`}
                  className="hover:text-yellow-500 transition-colors uppercase"
                >
                  {product.category}
                </Link>
              </>
            )}
            <ChevronRight className="h-4 w-4" />
            <span className="truncate max-w-[200px] text-gray-900 dark:text-white font-bold">
              {product.name}
            </span>
          </nav>

          {/* Product Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left: Images */}
            <section className="space-y-6">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 shadow-sm group">
                <CloudImg
                  fill
                  wrapperClassName="relative h-[400px] sm:h-[500px] w-full"
                  src={mainImage}
                  alt={product.name}
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  priority
                  cloudinary
                />

                <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none">
                  {product.discount > 0 && (
                    <Badge variant="danger" className="shadow-lg animate-pulse">
                      -{product.discount}%
                    </Badge>
                  )}
                  {product.isNewProduct && (
                    <Badge variant="success" className="shadow-lg">
                      Nouveau
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {Array.isArray(product.gallery) && product.gallery.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all",
                        selectedImage === idx
                          ? "border-yellow-500 ring-2 ring-yellow-500/30 scale-105"
                          : "border-gray-100 dark:border-gray-800 hover:border-yellow-500/50"
                      )}
                    >
                      <CloudImg
                        fill
                        wrapperClassName="relative h-full w-full"
                        src={img || PLACEHOLDER}
                        alt={`${product.name} - view ${idx}`}
                        className="object-cover"
                        cloudinary
                        width="200"
                        height="200"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Right: Details */}
            <section className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20">
                  {product.category || "EQUIPEMENT"}
                </Badge>
                
                <div className="flex items-center gap-3">
                 
                  <div className="relative share-box">
                    <button onClick={handleShare} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-black dark:hover:text-white">
                      <Share2 className="h-6 w-6" />
                    </button>
                    {shareOpen && (
                      <div className="absolute right-0 top-12 z-50 w-48 bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800 p-2">
                        {getShareLinks().map((link) => (
                          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium">
                            <link.icon className="h-4 w-4" /> {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic text-gray-900 dark:text-white leading-[0.9] tracking-tighter mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <RatingStars rating={product.rating} showValue />
                <span className="text-sm font-medium text-gray-400">|</span>
                <span className="text-sm font-bold text-gray-500">{product.reviewCount || 0} AVIS</span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-black text-yellow-500 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-2xl font-bold text-gray-400 line-through decoration-2 decoration-red-500/50">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 border-l-4 border-yellow-500 pl-4">
                {product.description}
              </p>

              {/* Selectors */}
              {(product.taille?.length > 0 || product.colors?.length > 0) && (
                <div className="space-y-6 mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl">
                  {product.taille?.length > 0 && (
                    <TailleSelector
                      tailles={product.taille}
                      selectedTaille={selectedTaille}
                      onChange={setSelectedTaille}
                    />
                  )}
                  {product.colors?.length > 0 && (
                    <ColorSelector
                      colors={product.colors}
                      selectedColor={selectedColor}
                      onChange={setSelectedColor}
                    />
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 w-fit">
                  <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1} className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-700 transition disabled:opacity-50"><Minus className="w-5 h-5" /></button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <button onClick={() => handleQuantityChange(quantity + 1)} className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-700 transition"><Plus className="w-5 h-5" /></button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className={cn(
                    "flex-1 h-14 rounded-2xl font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg",
                    canAddToCart
                      ? "bg-yellow-500 text-black hover:bg-yellow-400 hover:shadow-yellow-500/30"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {canAddToCart ? "Ajouter au Panier" : "Indisponible"}
                </button>
              </div>

              {/* Stock Alert */}
              {!product.inStock && (
                <div className="mt-6">
                  <Alert variant="danger" title="Rupture de stock">
                    Ce produit est victime de son succès. Ajoutez-le aux favoris pour être notifié du réassort.
                  </Alert>
                </div>
              )}

              {/* Features List */}
              {Array.isArray(product.features) && product.features.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="font-black uppercase italic mb-4 text-lg">Points Forts</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.slice(0, 6).map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Check className="w-5 h-5 text-yellow-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-24 pt-16 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
                  Vous aimerez <span className="text-yellow-500">Aussi</span>
                </h2>
                <Link href="/produit" className="hidden sm:flex items-center gap-2 font-bold text-sm hover:text-yellow-500 transition">
                  VOIR TOUT <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                  <motion.div 
                    key={p._id || p.id}
                    whileHover={{ y: -5 }}
                    className="group bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="relative h-56 bg-gray-50 dark:bg-gray-950 p-4 overflow-hidden">
                      <Link href={`/produit/${p.slug || p._id}`}>
                        <CloudImg 
                          src={p.image} 
                          alt={p.name} 
                          className="object-contain group-hover:scale-110 transition-transform duration-500" 
                          fill
                          wrapperClassName="relative h-full w-full"
                          cloudinary
                        />
                      </Link>
                      {p.discount > 0 && (
                        <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                          -{p.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        {p.category}
                      </div>
                      <Link href={`/produit/${p.slug || p._id}`}>
                        <h3 className="font-bold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-yellow-500 transition">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black">
                          {formatPrice(p.price)}
                        </span>
                        <button 
                          onClick={() => router.push(`/produit/${p.slug || p._id}`)} 
                          className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Back Button */}
          <div className="mt-16 mb-8">
            <Link
              href="/produit"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 dark:border-gray-800 px-6 py-3 text-sm font-bold uppercase tracking-wider hover:border-yellow-500 hover:text-yellow-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au catalogue
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}