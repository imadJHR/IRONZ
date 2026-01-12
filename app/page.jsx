"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";

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
  sizes = "100vw"
}) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);

  useEffect(() => {
    setImgSrc(src || PLACEHOLDER);
  }, [src]);

  const source = imgSrc && typeof imgSrc === 'object' && imgSrc.src ? imgSrc.src : imgSrc;

  return (
    <img
      src={source}
      alt={alt || ""}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setImgSrc(PLACEHOLDER)}
      className={cn(
        fill ? "absolute inset-0 h-full w-full object-cover" : "",
        className
      )}
      sizes={sizes}
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
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
      </button>
      <button
        ref={nextRef}
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all shadow-lg group"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
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
   HERO BANNER SLIDE - SPORTIF DESIGN
------------------------------ */
function HeroBannerSlide({ product, index, totalSlides }) {
  const productId = product._id || product.id;

  return (
    <div className="relative h-full w-full">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="h-full w-full"
        >
          <CloudImg
            src={product.image}
            alt={product.name}
            className="object-cover object-center"
            fill
            priority={index === 0}
            sizes="100vw"
          />
        </motion.div>

        {/* Sportif Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Diagonal Lines Pattern - Sportif Element */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(234, 179, 8, 0.3) 10px,
                rgba(234, 179, 8, 0.3) 11px
              )`
            }}
          />
        </div>

        {/* Yellow Accent Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
          <div className="absolute top-0 right-0 w-full h-full bg-yellow-500/20 transform rotate-45 translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative h-full z-10 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href={`/produit/${product.slug || productId}`}
                className="group relative inline-flex items-center justify-center mt-36 overflow-hidden"
              >
                {/* Button Background with Animation */}
                <span className="relative flex items-center gap-3 sm:gap-4 bg-yellow-500 hover:bg-yellow-400 text-black px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:shadow-[0_0_60px_rgba(234,179,8,0.6)]">

                  {/* Shine Effect */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="relative italic z-10">Voir Détails</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                </span>

                {/* Decorative Elements */}
                <span className="absolute -inset-1 bg-yellow-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>

            {/* Slide Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 sm:mt-12 flex items-center gap-4"
            >
              <div className="flex items-center gap-2 text-white/60 text-sm sm:text-base">
                <span className="text-yellow-500 font-bold text-lg sm:text-xl">{String(index + 1).padStart(2, '0')}</span>
                <span className="w-8 sm:w-12 h-px bg-white/30" />
                <span>{String(totalSlides).padStart(2, '0')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Side Decorative Element */}
      <div className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 lg:h-24 bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent" />
          <div className="text-white/40 text-xs uppercase tracking-widest transform -rotate-90 origin-center whitespace-nowrap">
            IRONZ FITNESS
          </div>
          <div className="w-px h-16 lg:h-24 bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent" />
        </div>
      </div>

      {/* Bottom Decorative Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 opacity-80" />
    </div>
  );
}

/* -----------------------------
   MAIN COMPONENT
------------------------------ */
export default function Home() {
  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  const [products, setProducts] = useState([]);
  const [vedetteProducts, setVedetteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // Swiper Navigation Refs
  const featuredPrevRef = useRef(null);
  const featuredNextRef = useRef(null);
  const newArrivalsPrevRef = useRef(null);
  const newArrivalsNextRef = useRef(null);
  const dealsPrevRef = useRef(null);
  const dealsNextRef = useRef(null);
  const categoryPrevRef = useRef(null);
  const categoryNextRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all products
        const pRes = await fetch(`${API_URL}/products?limit=40`);
        const pJson = await pRes.json();
        const pList = pJson.data || [];
        setProducts(pList);

        // Fetch only vedette (featured) products for banner
        try {
          const vRes = await fetch(`${API_URL}/products?isFeatured=true&limit=6`);
          const vJson = await vRes.json();
          const vList = vJson.data || [];

          if (vList.length > 0) {
            setVedetteProducts(vList);
          } else {
            // Fallback: filter from all products
            const featured = pList.filter(p => p.isFeatured && p.image).slice(0, 6);
            setVedetteProducts(featured.length > 0 ? featured : pList.filter(p => p.image).slice(0, 4));
          }
        } catch {
          // Fallback if vedette endpoint fails
          const featured = pList.filter(p => p.isFeatured && p.image).slice(0, 6);
          setVedetteProducts(featured.length > 0 ? featured : pList.filter(p => p.image).slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    // Show newsletter popup after 4 seconds
    const timer = setTimeout(() => setShowPopup(true), 4000);
    return () => clearTimeout(timer);
  }, []);

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
      <section className="relative h-[500px] xs:h-[550px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[750px] 2xl:h-[800px] bg-black">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={vedetteProducts.length > 1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={800}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} !w-3 !h-3 sm:!w-4 sm:!h-4 !rounded-full !bg-white/30 !border-2 !border-transparent transition-all duration-300"></span>`;
            },
            bulletActiveClass: '!bg-yellow-500 !border-yellow-500 !scale-125'
          }}
          navigation={{
            prevEl: '.hero-prev',
            nextEl: '.hero-next',
          }}
          className="h-full"
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

        {/* Navigation Buttons - Sportif Style */}
        <button className="hero-prev absolute left-3 xs:left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-black/30 backdrop-blur-md border-2 border-white/20 text-white flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all duration-300 group">
          <ChevronLeft className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button className="hero-next absolute right-3 xs:right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-black/30 backdrop-blur-md border-2 border-white/20 text-white flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all duration-300 group">
          <ChevronRight className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/50 text-xs uppercase tracking-widest hidden sm:block">Scroll</span>
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500/80" />
          </div>
        </motion.div>
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
      <section className="py-14 sm:py-18 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <span className="text-yellow-500 font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
                Explorez
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight">
                Nos <span className="text-yellow-500">Catégories</span>
              </h2>
            </div>
            <SwiperNavButtons prevRef={categoryPrevRef} nextRef={categoryNextRef} />
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1.15}
            navigation={{
              prevEl: categoryPrevRef.current,
              nextEl: categoryNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = categoryPrevRef.current;
              swiper.params.navigation.nextEl = categoryNextRef.current;
            }}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2.3, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 3.5, spaceBetween: 28 },
            }}
          >
            {categories.map((cat, i) => (
              <SwiperSlide key={i}>
                <Link
                  href={cat.href}
                  className="group relative h-60 xs:h-72 sm:h-80 md:h-96 lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl block bg-gray-100"
                >
                  <CloudImg
                    src={cat.image}
                    alt={cat.name}
                    className="transition-transform duration-700 group-hover:scale-110"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {cat.count || 'Collection'}
                    </span>
                  </div>

                  <div className="absolute bottom-5 xs:bottom-6 left-5 xs:left-6 right-5 xs:right-6 text-white">
                    <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black uppercase italic mb-2 leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-yellow-500 font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 text-sm sm:text-base">
                      Explorer <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-4 border-yellow-500/0 group-hover:border-yellow-500/50 rounded-2xl sm:rounded-3xl transition-all duration-300" />
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

      {/* ===== 5. FEATURED PRODUCT SPOTLIGHT ===== */}
      {featuredVedette && (
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-black text-white relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(234,179,8,0.15)_0%,_transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(234,179,8,0.1)_0%,_transparent_50%)]" />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

              {/* Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex justify-center order-2 lg:order-1"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full animate-pulse" />

                <div className="relative w-full max-w-[300px] xs:max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px]">
                  {/* Image Frame */}
                  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl sm:rounded-3xl overflow-hidden p-4 sm:p-6 shadow-2xl border border-yellow-500/20">
                    <CloudImg
                      src={featuredVedette.image}
                      alt={featuredVedette.name}
                      className="w-full h-auto rounded-xl sm:rounded-2xl aspect-square object-contain hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 35vw"
                    />

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500 rounded-tl-2xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500 rounded-br-2xl" />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-yellow-500 text-black px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-black text-xs sm:text-sm shadow-lg rotate-3">
                    ⭐ BEST SELLER
                  </div>
                </div>
              </motion.div>

              {/* Content Container */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-1 lg:order-2 text-center lg:text-left"
              >
                {/* Section Label */}
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mb-6">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="text-yellow-400 font-bold text-xs sm:text-sm uppercase tracking-wider">Produit Vedette</span>
                </div>

                {/* Product Title */}
                <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-black uppercase italic leading-[0.95] mb-4 sm:mb-6">
                  {featuredVedette.name}
                </h2>
                <div className="h-1 w-24 sm:w-32 bg-yellow-500 mb-6 mx-auto lg:mx-0" />

                {/* Rating */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                  {renderRating(featuredVedette.rating || 5)}
                  <span className="text-gray-400">|</span>
                  <span className="text-yellow-500 font-semibold text-sm">Très populaire</span>
                </div>

                {/* Description */}
                {featuredVedette.description && (
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                    {featuredVedette.description}
                  </p>
                )}

                {/* Price */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-black text-yellow-500">
                      {formatPrice(featuredVedette.price)}
                    </span>
                    {featuredVedette.oldPrice && (
                      <>
                        <span className="text-xl sm:text-2xl text-gray-500 line-through decoration-2">
                          {formatPrice(featuredVedette.oldPrice)}
                        </span>
                        <span className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                          Économisez {formatPrice(featuredVedette.oldPrice - featuredVedette.price)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.button
                    onClick={() => handleAddToCart(featuredVedette)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative bg-yellow-500 text-black px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-yellow-400 transition-all shadow-lg overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative flex items-center justify-center gap-3">
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                      AJOUTER AU PANIER
                    </span>
                  </motion.button>

                  <Link
                    href={`/produit/${featuredVedette.slug || featuredVedette._id}`}
                    className="group inline-flex items-center justify-center gap-3 border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-white hover:text-black transition-all"
                  >
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                    VOIR DÉTAILS
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                  {[
                    { icon: Truck, text: "Livraison 24/48h" },
                    { icon: ShieldCheck, text: "Garantie 2 ans" },
                    { icon: CheckCircle, text: "Retour gratuit" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-2">
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Text */}
          <div className="absolute -bottom-4 left-0 right-0 text-[12vw] font-black text-white/[0.02] leading-none pointer-events-none whitespace-nowrap overflow-hidden">
            IRONZ • PREMIUM • IRONZ • PREMIUM • IRONZ
          </div>
        </section>
      )}

      {/* References Section */}
      <ReferencesSection />

      {/* ===== 6. WHY CHOOSE US ===== */}
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