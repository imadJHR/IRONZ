"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  ArrowRight,
  ChevronLeft,
  ZoomIn,
  MessageSquare,
  Send,
  User
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
  "Rouge": "#EF4444", "Bleu": "#3B82F6", "Vert": "#22C55E", "Noir": "#000000", "Blanc": "#FFFFFF",
  "Jaune": "#EAB308", "Orange": "#F97316", "Violet": "#8B5CF6", "Rose": "#EC4899", "Gris": "#6B7280",
  "Marron": "#A52A2A", "Beige": "#F5F5DC", "Or": "#FFD700", "Argent": "#C0C0C0",
  "Multicolore": "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
  "Red": "#EF4444", "Blue": "#3B82F6", "Green": "#22C55E", "Black": "#000000", "White": "#FFFFFF",
  "Yellow": "#EAB308", "Purple": "#8B5CF6", "Pink": "#EC4899", "Gray": "#6B7280", "Brown": "#A52A2A",
  "Gold": "#FFD700", "Silver": "#C0C0C0"
};

const getColor = (colorName) => {
  if (!colorName) return "#E5E7EB";
  if (COLOR_MAP[colorName]) return COLOR_MAP[colorName];
  return colorName;
};

// --- CLOUDINARY IMAGE UTILS ---
const getCloudinaryUrl = (imagePath, options = {}) => {
  if (!imagePath) return PLACEHOLDER;
  if (imagePath.startsWith('http')) return imagePath;
  
  const width = options.width || 'auto';
  const height = options.height || 'auto';
  const quality = options.quality || 'auto';
  const crop = options.crop || 'fill';
  
  if (!imagePath.includes('/uploads/')) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_${crop},w_${width},h_${height},q_${quality}/${imagePath}`;
  }
  
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `/${cleanPath}`;
};

// --- IMAGE COMPONENT ---
function CloudImg({ src, alt, fill = false, className = "", wrapperClassName = "", priority = false, cloudinary = true, width, height }) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => { 
    if (cloudinary && src) {
      setImgSrc(getCloudinaryUrl(src, { width, height }));
    } else {
      setImgSrc(src || PLACEHOLDER);
    }
  }, [src, cloudinary, width, height]);

  const handleError = () => {
    setImgSrc(PLACEHOLDER);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (fill) {
    return (
      <div className={cn("relative", wrapperClassName)}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        )}
        <img
          src={imgSrc}
          alt={alt || ""}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={handleError}
          onLoad={handleLoad}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
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
      onLoad={handleLoad}
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
function RatingStars({ rating, showValue = false, className = "", size = "sm" }) {
  const r = Number(rating) || 0;
  const fullStars = Math.floor(r);
  const hasHalfStar = r % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6"
  };

  const starSize = sizeClasses[size] || sizeClasses.sm;

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Note: ${r} sur 5`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`f-${i}`} className={cn(starSize, "fill-yellow-400 text-yellow-400")} aria-hidden="true" />
      ))}
      {hasHalfStar && <StarHalf className={cn(starSize, "fill-yellow-400 text-yellow-400")} aria-hidden="true" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`e-${i}`} className={cn(starSize, "text-gray-300")} aria-hidden="true" />
      ))}
      {showValue && (
        <span className="ml-1 text-[10px] sm:text-xs text-gray-500 font-bold uppercase">{`(${r.toFixed(1)})`}</span>
      )}
    </div>
  );
}

// Interactive Star Rater for Form
function StarRater({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none transition-transform hover:scale-110"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(rating)}
        >
          <Star
            className={cn(
              "w-8 h-8 transition-colors",
              star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}

function Alert({ variant = "info", title, children }) {
  const styles =
    variant === "danger"
      ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200"
      : variant === "success"
      ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-200"
      : "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-200";

  return (
    <div className={cn("rounded-xl border p-3 sm:p-4", styles)}>
      {title && <div className="mb-1 text-sm sm:text-base font-bold uppercase italic">{title}</div>}
      <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function ColorSelector({ colors, selectedColor, onChange }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="text-xs sm:text-sm font-black uppercase italic text-gray-900 dark:text-white tracking-wide">
        Couleur:{" "}
        {selectedColor ? (
          <span className="text-yellow-500">{selectedColor}</span>
        ) : (
          <span className="text-gray-400 font-medium normal-case not-italic">Choisir</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
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
                "relative h-9 w-9 sm:h-11 sm:w-11 rounded-full p-0.5 sm:p-1 transition-all duration-300",
                "border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60",
                "hover:scale-110 active:scale-95",
                isSelected && "ring-2 ring-yellow-500 ring-offset-1 sm:ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-110"
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
                  <CircleCheck className={cn("h-4 w-4 sm:h-5 sm:w-5 drop-shadow-md", tickColor)} />
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
    <div className="space-y-2 sm:space-y-3">
      <div className="text-xs sm:text-sm font-black uppercase italic text-gray-900 dark:text-white tracking-wide">
        Taille:{" "}
        {selectedTaille ? (
          <span className="text-yellow-500">{selectedTaille}</span>
        ) : (
          <span className="text-gray-400 font-medium normal-case not-italic">Choisir</span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {tailles.map((t) => {
          const active = t === selectedTaille;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onChange(t)}
              className={cn(
                "rounded-lg border-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition-all",
                "active:scale-95",
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
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-600 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-300">
        <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p className="font-medium">Aucun avis pour le moment.</p>
        <p className="text-sm">Soyez le premier à donner votre avis !</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((r, idx) => (
        <div
          key={r._id || `${r.username || "u"}-${idx}`}
          className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 transition-all hover:border-yellow-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 font-bold text-black shadow-md">
                {(r.username?.[0] || "U").toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {r.username || "Client"}
                  {r.verified && (
                    <Badge variant="success" className="bg-green-100 text-green-700 border-green-200 text-[10px] px-1.5 py-0.5">
                      Achat vérifié
                    </Badge>
                  )}
                </div>
                <RatingStars rating={r.rating} className="mt-1" size="xs" />
              </div>
            </div>
            {r.date && (
              <div className="text-xs text-gray-400 font-medium">
                {new Date(r.date).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            )}
          </div>
          
          <div className="mt-4 pl-[52px]">
            {r.title && (
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                {r.title}
              </h4>
            )}
            {r.body && (
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {r.body}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:py-10">
      <div className="h-4 w-48 sm:w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800 mb-6 sm:mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        <div className="space-y-3 sm:space-y-4">
          <div className="h-[300px] sm:h-[400px] lg:h-[500px] animate-pulse rounded-2xl sm:rounded-3xl bg-gray-200 dark:bg-gray-800" />
          <div className="flex gap-2 sm:gap-3 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 animate-pulse rounded-lg sm:rounded-xl bg-gray-200 dark:bg-gray-800 shrink-0" />
            ))}
          </div>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div className="h-8 sm:h-10 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 sm:h-6 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 sm:h-12 w-32 sm:w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-24 sm:h-32 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-12 sm:h-14 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
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

// Mobile Image Gallery with Swipe
function MobileImageGallery({ images, productName, discount, isNewProduct }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="relative">
      <div 
        className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[280px] xs:h-[320px] sm:h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <CloudImg
                fill
                wrapperClassName="relative h-full w-full p-4"
                src={images[currentIndex] || PLACEHOLDER}
                alt={`${productName} - Image ${currentIndex + 1}`}
                className="object-contain"
                priority={currentIndex === 0}
                cloudinary
              />
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
          {discount > 0 && (
            <Badge variant="danger" className="shadow-lg text-xs">
              -{discount}%
            </Badge>
          )}
          {isNewProduct && (
            <Badge variant="success" className="shadow-lg text-xs">
              Nouveau
            </Badge>
          )}
        </div>
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg transition-opacity",
                currentIndex === 0 ? "opacity-30" : "opacity-100"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(images.length - 1, prev + 1))}
              disabled={currentIndex === images.length - 1}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg transition-opacity",
                currentIndex === images.length - 1 ? "opacity-30" : "opacity-100"
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-2 rounded-full transition-all",
                idx === currentIndex 
                  ? "w-6 bg-yellow-500" 
                  : "w-2 bg-gray-300 dark:bg-gray-600"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductPageClient({ slug }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // Separate state for reviews
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // UI State
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTaille, setSelectedTaille] = useState("");
  const [tab, setTab] = useState("details"); // 'details' or 'reviews'
  const [shareOpen, setShareOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Review Form State
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, username: "", title: "", body: "" });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState(null); // { type: 'success'|'error', text: '' }

  const productId = useMemo(() => product?._id || product?.id, [product]);

  const allImages = useMemo(() => {
    if (!product) return [PLACEHOLDER];
    const gallery = Array.isArray(product.gallery) ? product.gallery : [];
    if (gallery.length > 0) return gallery;
    return [product.image || PLACEHOLDER];
  }, [product]);

  const mainImage = useMemo(() => {
    return allImages[selectedImage] || PLACEHOLDER;
  }, [allImages, selectedImage]);

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

  // Submit Review Handler
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    setReviewMessage(null);

    try {
      const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewForm)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi de l\'avis');
      }

      // Success
      setReviewMessage({ type: 'success', text: 'Merci ! Votre avis a été publié avec succès.' });
      
      // Add new review to local state
      setReviews(prev => [data.data, ...prev]);
      
      // Update product rating stats locally (optimistic)
      // Note: Real recalculation happens on backend, but this updates UI instantly
      setProduct(prev => ({
        ...prev,
        reviewCount: (prev.reviewCount || 0) + 1
      }));

      // Reset form
      setReviewForm({ rating: 5, username: "", title: "", body: "" });
      setTimeout(() => {
        setIsReviewFormOpen(false);
        setReviewMessage(null);
      }, 2000);

    } catch (err) {
      setReviewMessage({ type: 'error', text: err.message });
    } finally {
      setSubmittingReview(false);
    }
  };

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
        setReviews(p.reviews || []); // Initialize reviews from product data

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
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-14">
        <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900/40">
          <div className="mx-auto mb-3 sm:mb-4 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            {error || "Produit non trouvé"}
          </h1>
          <div className="mt-4 sm:mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button 
              onClick={() => router.push("/product")} 
              className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-black hover:bg-yellow-600 active:scale-95 transition-all"
            >
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

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={getCloudinaryUrl(mainImage)}
              alt={product.name}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-white pb-12 sm:pb-16 pt-4 sm:pt-8 dark:bg-gray-950">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-8">
          
          {/* Breadcrumb */}
          <nav
            className="mb-4 sm:mb-6 lg:mb-8 hidden xs:flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-1 text-[10px] sm:text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium overflow-x-auto scrollbar-hide"
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-yellow-500 transition-colors whitespace-nowrap">ACCUEIL</Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
            <Link href="/produit" className="hover:text-yellow-500 transition-colors whitespace-nowrap">PRODUITS</Link>
            {product.category && (
              <>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 hidden sm:block" />
                <Link
                  href={`/produit?category=${encodeURIComponent(product.category)}`}
                  className="hover:text-yellow-500 transition-colors uppercase whitespace-nowrap hidden sm:block"
                >
                  {product.category}
                </Link>
              </>
            )}
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
            <span className="truncate max-w-[120px] sm:max-w-[200px] text-gray-900 dark:text-white font-bold">
              {product.name}
            </span>
          </nav>

          {/* Mobile Back Button */}
          <div className="xs:hidden mb-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          </div>

          {/* Product Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left: Images */}
            <section className="space-y-4 sm:space-y-6">
              {/* Mobile Gallery (swipeable) */}
              <div className="lg:hidden">
                <MobileImageGallery 
                  images={allImages}
                  productName={product.name}
                  discount={product.discount}
                  isNewProduct={product.isNewProduct}
                />
              </div>

              {/* Desktop Gallery */}
              <div className="hidden lg:block">
                <div 
                  className="relative overflow-hidden rounded-[2rem] xl:rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 xl:p-8 shadow-sm group cursor-zoom-in"
                  onClick={() => setIsZoomed(true)}
                >
                  <CloudImg
                    fill
                    wrapperClassName="relative h-[400px] xl:h-[500px] w-full"
                    src={mainImage}
                    alt={product.name}
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    priority
                    cloudinary
                  />
                  
                  {/* Zoom Icon */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>

                  <div className="absolute top-4 xl:top-6 left-4 xl:left-6 flex flex-col gap-2 xl:gap-3 pointer-events-none">
                    {product.discount > 0 && (
                      <Badge variant="danger" className="shadow-lg animate-pulse text-xs xl:text-sm">
                        -{product.discount}%
                      </Badge>
                    )}
                    {product.isNewProduct && (
                      <Badge variant="success" className="shadow-lg text-xs xl:text-sm">
                        Nouveau
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-3 xl:gap-4 overflow-x-auto pb-2 mt-4 scrollbar-hide">
                    {allImages.map((img, idx) => (
                      <button
                        key={`${img}-${idx}`}
                        type="button"
                        onClick={() => setSelectedImage(idx)}
                        className={cn(
                          "relative h-20 w-20 xl:h-24 xl:w-24 shrink-0 overflow-hidden rounded-xl xl:rounded-2xl border-2 transition-all",
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
              </div>
            </section>

            {/* Right: Details */}
            <section className="flex flex-col">
              <div className="mb-2 sm:mb-3 flex items-center justify-between">
                <Badge 
                  variant="outline" 
                  className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-[10px] sm:text-xs"
                >
                  {product.category || "EQUIPEMENT"}
                </Badge>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <button 
                    onClick={toggleFavorite}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      isInFavorites(productId) 
                        ? "text-red-500 bg-red-50 dark:bg-red-900/20" 
                        : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500"
                    )}
                  >
                    <Heart className={cn("h-5 w-5 sm:h-6 sm:w-6", isInFavorites(productId) && "fill-current")} />
                  </button>
                  
                  <div className="relative share-box">
                    <button 
                      onClick={handleShare} 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-black dark:hover:text-white"
                    >
                      <Share2 className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    {shareOpen && (
                      <div className="absolute right-0 top-10 sm:top-12 z-50 w-44 sm:w-48 bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800 p-1.5 sm:p-2">
                        {getShareLinks().map((link) => (
                          <a 
                            key={link.name} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-xs sm:text-sm font-medium"
                          >
                            <link.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase italic text-gray-900 dark:text-white leading-[0.95] tracking-tighter mb-3 sm:mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <RatingStars rating={product.rating} showValue size="sm" />
                <span className="text-xs sm:text-sm font-medium text-gray-400">|</span>
                <span className="text-[10px] sm:text-sm font-bold text-gray-500">{reviews.length} AVIS</span>
              </div>

              <div className="flex items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-500 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 line-through decoration-2 decoration-red-500/50">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              {/* TABS Navigation */}
              <div className="flex gap-6 border-b border-gray-200 dark:border-gray-800 mb-6">
                <button
                  onClick={() => setTab("details")}
                  className={cn(
                    "pb-3 text-sm sm:text-base font-bold uppercase tracking-wider border-b-2 transition-colors",
                    tab === "details" ? "border-yellow-500 text-yellow-500" : "border-transparent text-gray-400 hover:text-gray-600"
                  )}
                >
                  Description
                </button>
                <button
                  onClick={() => setTab("reviews")}
                  className={cn(
                    "pb-3 text-sm sm:text-base font-bold uppercase tracking-wider border-b-2 transition-colors",
                    tab === "reviews" ? "border-yellow-500 text-yellow-500" : "border-transparent text-gray-400 hover:text-gray-600"
                  )}
                >
                  Avis ({reviews.length})
                </button>
              </div>

              {/* TAB CONTENT: DETAILS */}
              {tab === "details" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 border-l-4 border-yellow-500 pl-3 sm:pl-4">
                    {product.description}
                  </p>

                  {/* Selectors */}
                  {(product.taille?.length > 0 || product.colors?.length > 0) && (
                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl sm:rounded-3xl">
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

                  {/* Features List */}
                  {Array.isArray(product.features) && product.features.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <h3 className="font-black uppercase italic mb-3 sm:mb-4 text-base sm:text-lg">Points Forts</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {product.features.slice(0, 6).map((f, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB CONTENT: REVIEWS */}
              {tab === "reviews" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {/* Reviews Summary Header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-black text-gray-900 dark:text-white">
                        {product.rating}<span className="text-lg text-gray-400">/5</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                        <RatingStars rating={product.rating} size="md" />
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        Basé sur {reviews.length} avis
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                      className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black font-bold rounded-xl text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {isReviewFormOpen ? "Fermer" : "Écrire un avis"}
                    </button>
                  </div>

                  {/* Add Review Form */}
                  <AnimatePresence>
                    {isReviewFormOpen && (
                      <motion.form
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        onSubmit={handleSubmitReview}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 overflow-hidden"
                      >
                        <h3 className="font-bold text-lg">Partagez votre expérience</h3>
                        
                        {reviewMessage && (
                          <Alert variant={reviewMessage.type === 'success' ? 'success' : 'danger'}>
                            {reviewMessage.text}
                          </Alert>
                        )}

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Note</label>
                            <StarRater rating={reviewForm.rating} setRating={(r) => setReviewForm({...reviewForm, rating: r})} />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Votre nom</label>
                            <input
                              required
                              type="text"
                              value={reviewForm.username}
                              onChange={(e) => setReviewForm({...reviewForm, username: e.target.value})}
                              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                              placeholder="Votre nom"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Titre</label>
                            <input
                              required
                              type="text"
                              value={reviewForm.title}
                              onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})}
                              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                              placeholder="Résumé de votre avis"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Commentaire</label>
                            <textarea
                              required
                              rows={3}
                              value={reviewForm.body}
                              onChange={(e) => setReviewForm({...reviewForm, body: e.target.value})}
                              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none"
                              placeholder="Dites-nous ce que vous avez aimé ou ce qui pourrait être amélioré..."
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={submittingReview}
                          className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {submittingReview ? (
                            <>Envoi...</>
                          ) : (
                            <>
                              Publier l'avis <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  <ReviewsList reviews={reviews} />
                </motion.div>
              )}

              {/* Actions - Always visible regardless of tab */}
              <div className="flex flex-col gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex gap-3 sm:gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-0.5 sm:p-1">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)} 
                      disabled={quantity <= 1} 
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl hover:bg-white dark:hover:bg-gray-700 transition disabled:opacity-50 active:scale-95"
                    >
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <span className="w-10 sm:w-12 text-center font-black text-base sm:text-lg">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)} 
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl hover:bg-white dark:hover:bg-gray-700 transition active:scale-95"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!canAddToCart}
                    className={cn(
                      "flex-1 h-11 sm:h-14 rounded-xl sm:rounded-2xl font-bold sm:font-black text-sm sm:text-base uppercase tracking-wide sm:tracking-wider flex items-center justify-center gap-2 sm:gap-3 transition-all transform active:scale-95 shadow-lg",
                      canAddToCart
                        ? "bg-yellow-500 text-black hover:bg-yellow-400 hover:shadow-yellow-500/30"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline">
                      {canAddToCart ? "Ajouter au Panier" : "Indisponible"}
                    </span>
                    <span className="xs:hidden">
                      {canAddToCart ? "Ajouter" : "Indisponible"}
                    </span>
                  </button>
                </div>
                
                {/* Buy Now Button */}
                <button
                  onClick={() => {
                    handleAddToCart();
                    router.push('/checkout');
                  }}
                  disabled={!canAddToCart}
                  className={cn(
                    "w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base uppercase tracking-wide flex items-center justify-center gap-2 transition-all transform active:scale-95 border-2",
                    canAddToCart
                      ? "border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                      : "border-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  Acheter Maintenant
                </button>
              </div>

              {/* Stock Alert */}
              {!product.inStock && (
                <div className="mt-4 sm:mt-6">
                  <Alert variant="danger" title="Rupture de stock">
                    Ce produit est victime de son succès. Ajoutez-le aux favoris pour être notifié du réassort.
                  </Alert>
                </div>
              )}
            </section>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12 sm:mt-16 lg:mt-24 pt-8 sm:pt-12 lg:pt-16 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase italic tracking-tighter">
                  Vous aimerez <span className="text-yellow-500">Aussi</span>
                </h2>
                <Link 
                  href="/produit" 
                  className="hidden sm:flex items-center gap-1.5 sm:gap-2 font-bold text-xs sm:text-sm hover:text-yellow-500 transition"
                >
                  VOIR TOUT <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>

              {/* Mobile: Horizontal scroll */}
              <div className="sm:hidden overflow-x-auto scrollbar-hide -mx-3 px-3 pb-4">
                <div className="flex gap-4" style={{ width: 'max-content' }}>
                  {relatedProducts.map((p) => (
                    <motion.div 
                      key={p._id || p.id}
                      whileHover={{ y: -3 }}
                      className="w-[200px] shrink-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
                    >
                      <div className="relative h-40 bg-gray-50 dark:bg-gray-950 p-3 overflow-hidden">
                        <Link href={`/produit/${p.slug || p._id}`}>
                          <CloudImg 
                            src={p.image} 
                            alt={p.name} 
                            className="object-contain" 
                            fill
                            wrapperClassName="relative h-full w-full"
                            cloudinary
                          />
                        </Link>
                        {p.discount > 0 && (
                          <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            -{p.discount}%
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                          {p.category}
                        </div>
                        <Link href={`/produit/${p.slug || p._id}`}>
                          <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2">
                            {p.name}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-black">
                            {formatPrice(p.price)}
                          </span>
                          <button 
                            onClick={() => router.push(`/produit/${p.slug || p._id}`)} 
                            className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tablet and Desktop: Grid */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {relatedProducts.map((p) => (
                  <motion.div 
                    key={p._id || p.id}
                    whileHover={{ y: -5 }}
                    className="group bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="relative h-40 sm:h-48 lg:h-56 bg-gray-50 dark:bg-gray-950 p-3 sm:p-4 overflow-hidden">
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
                        <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded sm:rounded-md">
                          -{p.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-3 sm:p-4 lg:p-5">
                      <div className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">
                        {p.category}
                      </div>
                      <Link href={`/produit/${p.slug || p._id}`}>
                        <h3 className="font-bold text-sm sm:text-base lg:text-lg leading-tight mb-2 sm:mb-3 line-clamp-2 group-hover:text-yellow-500 transition">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-base sm:text-lg lg:text-xl font-black">
                          {formatPrice(p.price)}
                        </span>
                        <button 
                          onClick={() => router.push(`/produit/${p.slug || p._id}`)} 
                          className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-black text-white rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors"
                        >
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile: See All Link */}
              <div className="sm:hidden mt-4 text-center">
                <Link 
                  href="/produit" 
                  className="inline-flex items-center gap-2 font-bold text-sm text-yellow-600 hover:text-yellow-500"
                >
                  VOIR TOUS LES PRODUITS <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )}

          {/* Back Button */}
          <div className="mt-8 sm:mt-12 lg:mt-16 mb-4 sm:mb-8">
            <Link
              href="/produit"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-yellow-500 hover:text-yellow-500 transition-colors active:scale-95"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Retour au catalogue
            </Link>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-3 safe-area-bottom">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Prix</span>
            <span className="text-lg font-black text-yellow-500">{formatPrice(product.price)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className={cn(
              "flex-1 h-12 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg",
              canAddToCart
                ? "bg-yellow-500 text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
            {canAddToCart ? "Ajouter" : "Indisponible"}
          </button>
        </div>
      </div>
    </>
  );
}
