"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";

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
  Send,
  Loader2,
  ChevronDown,
  Sparkles,
  Mail,
  Zap,
  CheckCircle,
  TrendingUp,
  Award,
  Truck,
  Flame,
  Package,
  Apple,
  ShieldCheck,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

// Components
import ReferencesSection from "../components/references-section";
import ServicesSection from "../components/ServicesSection";
import BrandsMarquee from "../components/brands-marquee";

// Context & Data
import { useCart } from "../context/cart-context";
import { useFavorites } from "../context/favorites-context";
import { categories, brands } from "../data/product";

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
   ✅ COMPOSANT IMAGE COMPATIBLE CLOUDINARY
------------------------------ */
function CloudImg({ src, alt, fill = false, className = "", priority = false }) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);
  useEffect(() => { setImgSrc(src || PLACEHOLDER); }, [src]);
  
  const source = imgSrc && typeof imgSrc === 'object' && imgSrc.src ? imgSrc.src : imgSrc;

  return (
    <img
      src={source}
      alt={alt || ""}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setImgSrc(PLACEHOLDER)}
      className={cn(fill ? "absolute inset-0 h-full w-full object-contain" : "", className)}
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
        <Star key={`star-${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
      ))}
      {hasHalfStar && <StarHalf className="w-3 h-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-star-${i}`} className="w-3 h-3 text-gray-300" aria-hidden="true" />
      ))}
      <span className="ml-1 text-xs text-gray-500">({r.toFixed(1)})</span>
    </div>
  );
}

/* -----------------------------
   SWIPER NAV BUTTONS
------------------------------ */
function SwiperNavButtons({ prevRef, nextRef, className = "" }) {
  return (
    <div className={cn("flex gap-2", className)}>
      <button ref={prevRef} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all shadow-lg group" aria-label="Previous"><ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" /></button>
      <button ref={nextRef} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all shadow-lg group" aria-label="Next"><ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" /></button>
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

  const handleToggleFavorite = () => {
    toggleFavorite({ ...product, id: productId });
  };

  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all h-full flex flex-col group"
      whileHover={{ y: -4 }}
    >
      <div className="relative h-40 xs:h-48 overflow-hidden">
        <Link href={`/produit/${product.slug || productId}`}>
          <CloudImg
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            fill
          />
        </Link>
       
        {product.isNewProduct && <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">Nouveau</Badge>}
        {Number(product.discount) > 0 && <Badge className="absolute bottom-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>}
      </div>
      <div className="p-3 xs:p-4 flex flex-col flex-grow">
        <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
          {product.category}
          {product.subCategory && ` • ${product.subCategory}`}
        </div>
        <Link href={`/produit/${product.slug || productId}`} className="group">
          <h2 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 text-sm xs:text-base">
            {product.name}
          </h2>
        </Link>
        {product.rating != null && <div className="mb-2">{renderRating(product.rating)}</div>}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col xs:flex-row xs:items-center">
            <span className="text-base xs:text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="xs:ml-2 text-xs line-through text-gray-500">{formatPrice(product.oldPrice)}</span>}
          </div>
          <button
            onClick={handleAddToCart}
            className="h-8 w-8 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md flex items-center justify-center transition-colors p-0"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart className="h-4 w-4" />
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

  const handleToggleFavorite = () => {
    toggleFavorite({ ...product, id: productId });
  };
  
  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all h-full flex flex-col group"
      whileHover={{ y: -6 }}
    >
      <div className="relative h-56 md:h-64 overflow-hidden">
        <Link href={`/produit/${product.slug || productId}`}>
          <CloudImg
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            fill
          />
        </Link>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
         
          <button
            onClick={handleAddToCart}
            className="h-10 w-10 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-md hover:bg-yellow-600 transition-all"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNewProduct && (
            <Badge className="bg-yellow-500 text-black shadow-md">Nouveau</Badge>
          )}
          {Number(product.discount) > 0 && (
            <Badge className="bg-red-500 text-white shadow-md">-{product.discount}%</Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-black text-yellow-500 shadow-md">
              <Flame className="w-3 h-3 inline mr-1" />
              Populaire
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium uppercase tracking-wider">
            {product.brand || product.category}
          </span>
          {product.rating != null && renderRating(product.rating)}
        </div>
        
        <Link href={`/produit/${product.slug || productId}`}>
          <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
            {product.name}
          </h2>
        </Link>
        
        {product.description && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="ml-2 text-sm line-through text-gray-500">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <Link 
            href={`/produit/${product.slug || productId}`}
            className="text-yellow-600 hover:text-yellow-700 font-bold text-sm flex items-center gap-1 group/link"
          >
            Détails 
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* -----------------------------
   BANNER PRODUCT SLIDE
------------------------------ */
function BannerProductSlide({ product, addToCart, index }) {
  const productId = product._id || product.id;

  const handleAddToCart = () => {
    addToCart({ ...product, id: productId });
  };

  return (
    <div className="relative h-full w-full flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <CloudImg 
          src={product.image} 
          alt={product.name} 
          className="object-cover opacity-40" 
          fill 
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              {product.isNewProduct && (
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Nouveau
                </span>
              )}
              {Number(product.discount) > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                  -{product.discount}% OFF
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase border border-white/30">
                {product.category}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic leading-[1.1] mb-6 tracking-tighter">
              {product.name}
            </h2>
            
            {product.description && (
              <p className="text-gray-300 text-lg mb-6 line-clamp-2 max-w-xl">
                {product.description}
              </p>
            )}
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl md:text-6xl font-black text-yellow-500">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleAddToCart}
                className="inline-flex items-center gap-3 bg-yellow-500 text-black px-8 py-4 rounded-xl font-black hover:bg-yellow-400 transition-all hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                AJOUTER AU PANIER
              </button>
              <Link 
                href={`/produit/${product.slug || productId}`}
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-black hover:bg-gray-100 transition-all"
              >
                VOIR DÉTAILS
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/30 blur-[100px] rounded-full" />
              <CloudImg 
                src={product.image} 
                alt={product.name} 
                className="relative z-10 w-[400px] h-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
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
  const [banners, setBanners] = useState([]);
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
        const [pRes, bRes] = await Promise.all([
          fetch(`${API_URL}/products?limit=40`),
          fetch(`${API_URL}/banners`).catch(() => null)
        ]);

        const pJson = await pRes.json();
        const pList = pJson.data || [];
        setProducts(pList);

        if (bRes && bRes.ok) {
          const bJson = await bRes.json();
          setBanners(bJson.data || []);
        } else {
          // Fallback banners construction
          const featured = pList.filter(p => p.image && (p.isFeatured || p.isNewProduct)).slice(0, 4);
          setBanners(featured.map(p => ({
            _id: p._id || p.id, // Fallback ID
            title: p.name,
            image: p.image,
            link: `/produit/${p.slug || p._id || p.id}`,
            highlight: "Exclusivité Ironz"
          })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    setTimeout(() => setShowPopup(true), 4000);
  }, []);

  // Memoized product lists
  const featuredVedette = useMemo(() => products.find(p => p.isFeatured && p.discount > 0) || products[0], [products]);
  const newArrivals = useMemo(() => products.filter(p => p.isNewProduct).slice(0, 12), [products]);
  const discountedProducts = useMemo(() => products.filter(p => Number(p.discount) > 0).slice(0, 12), [products]);
  const bannerProducts = useMemo(() => products.filter(p => p.isFeatured || Number(p.discount) > 15).slice(0, 6), [products]);
  // All Products
  const allProducts = useMemo(() => products.slice(0, 12), [products]);

  const toggleFavorite = (product) => {
    const id = product._id || product.id;
    if (isInFavorites(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ ...product, id }); // Force ID
    }
  };

  const handleAddToCart = (product) => {
    const id = product._id || product.id;
    addToCart({ ...product, id }); // Force ID
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="animate-spin text-yellow-500 mx-auto mb-4" size={48} />
          <p className="text-white text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      
      {/* 1. HERO PRODUCT BANNER SWIPER */}
      <section className="relative h-[600px] lg:h-[90vh] bg-black">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          loop={bannerProducts.length > 1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-yellow-500 !w-8'
          }}
          navigation={{
            prevEl: '.hero-prev',
            nextEl: '.hero-next',
          }}
          className="h-full"
        >
          {bannerProducts.map((product, i) => (
            <SwiperSlide key={product._id || i}>
              <BannerProductSlide product={product} addToCart={handleAddToCart} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* 2. ✅ FLASH DEALS / PROMOTIONS SWIPER (UPDATED SECTION) */}
      {discountedProducts.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-red-600 to-orange-500">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic">
                    Offres Flash
                  </h2>
                  <p className="text-white/80 text-sm">Jusqu'à -50% sur les produits sélectionnés</p>
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
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="!overflow-visible"
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

      {/* 3. CATEGORIES SWIPER */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic">
              Nos <span className="text-yellow-500">Catégories</span>
            </h2>
            <SwiperNavButtons prevRef={categoryPrevRef} nextRef={categoryNextRef} />
          </div>
          
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{
              prevEl: categoryPrevRef.current,
              nextEl: categoryNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = categoryPrevRef.current;
              swiper.params.navigation.nextEl = categoryNextRef.current;
            }}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {categories.map((cat, i) => (
              <SwiperSlide key={i}>
                <Link 
                  href={cat.href} 
                  className="group relative h-72 md:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl block bg-gray-100"
                >
                  <CloudImg 
                    src={cat.image} 
                    alt={cat.name} 
                    className="transition-transform duration-700 group-hover:scale-110" 
                    fill 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-2">{cat.name}</h3>
                    <p className="text-yellow-500 font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                      Explorer <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <ServicesSection />

      {/* 4. NEW ARRIVALS SWIPER (COLORS UPDATED TO YELLOW) */}
      {newArrivals.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  <span className="text-yellow-500 font-bold uppercase text-sm">Nouveautés</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
                  Arrivages <span className="text-yellow-500">Récents</span>
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <Link 
                  href="/product?filter=new"
                  className="text-yellow-600 hover:text-yellow-700 font-bold flex items-center gap-1"
                >
                  Voir tout <ArrowRight className="w-4 h-4" />
                </Link>
                <SwiperNavButtons prevRef={newArrivalsPrevRef} nextRef={newArrivalsNextRef} />
              </div>
            </div>
            
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
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
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
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

      {/* 5. FEATURED PRODUCT (Vedette) */}
      {featuredVedette && (
        <section className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex justify-center order-2 lg:order-1"
              >
                <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full animate-pulse" />
                <CloudImg 
                  src={featuredVedette.image} 
                  alt={featuredVedette.name} 
                  className="relative z-10 w-full max-w-md h-[400px] md:h-[500px] object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-500" 
                />
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="bg-yellow-500 text-black px-3 py-1 text-xs font-bold uppercase rounded">
                    Produit du Mois
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic mb-6 leading-[1.1]">
                  {featuredVedette.name}
                </h2>
                
                <div className="flex items-center gap-3 mb-6">
                  {renderRating(featuredVedette.rating || 5)}
                  <span className="text-gray-400 text-sm">| Best Seller</span>
                </div>
                
                {featuredVedette.description && (
                  <p className="text-gray-400 text-lg mb-8 line-clamp-3 leading-relaxed border-l-4 border-yellow-500 pl-4">
                    {featuredVedette.description}
                  </p>
                )}
                
                <div className="flex items-baseline gap-4 mb-10">
                  <span className="text-5xl md:text-6xl font-black text-yellow-500">
                    {formatPrice(featuredVedette.price)}
                  </span>
                  {featuredVedette.oldPrice && (
                    <span className="text-xl text-gray-500 line-through decoration-2 decoration-red-500">
                      {formatPrice(featuredVedette.oldPrice)}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => handleAddToCart(featuredVedette)} 
                    className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-black hover:bg-yellow-400 transition-all flex items-center gap-3 hover:scale-105"
                  >
                    <ShoppingCart className="w-5 h-5" /> AJOUTER AU PANIER
                  </button>
                  <Link 
                    href={`/produit/${featuredVedette.slug || featuredVedette._id}`} 
                    className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all"
                  >
                    VOIR DÉTAILS
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Background Text */}
          <div className="absolute bottom-0 left-0 text-[15vw] font-black text-white/5 leading-none pointer-events-none whitespace-nowrap">
            IRONZ
          </div>
        </section>
      )}

      {/* 6. BRANDS */}
      

      <ReferencesSection />

      {/* 7. WeartY CHOOSE US */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header SEO-Friendly */}
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest text-sm block mb-3">
              Nos Engagements
            </span>
            <h2 className="text-4xl md:text-5xl font-black italic text-gray-900 dark:text-white mb-6 tracking-tight">
              Pourquoi Choisir <span className="text-yellow-500">IRONZ</span> ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Nous ne vendons pas seulement du matériel, nous vous offrons l'assurance d'atteindre vos objectifs avec des équipements professionnels testés et approuvés par les meilleurs athlètes au Maroc.
            </p>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: CheckCircle, 
                title: "Qualité Professionnelle Garantie", 
                text: "Chaque produit est rigoureusement sélectionné pour sa durabilité et sa performance. Nous garantissons l'authenticité de toutes nos marques partenaires." 
              },
              { 
                icon: Truck, 
                title: "Livraison Rapide & Sécurisée", 
                text: "Profitez d'une expédition express sous 24/48h partout au Maroc. Emballage renforcé et suivi en temps réel de votre commande." 
              },
              { 
                icon: TrendingUp, 
                title: "Expertise & Conseils Gratuits", 
                text: "Notre équipe de coachs et d'experts vous guide gratuitement pour choisir l'équipement parfaitement adapté à votre niveau et vos objectifs." 
              },
              { 
                icon: Award, 
                title: "Meilleur Rapport Qualité/Prix", 
                text: "Nous négocions directement avec les fabricants pour vous offrir des prix compétitifs sans compromis sur la qualité." 
              },
              { 
                icon: ShieldCheck, 
                title: "Service Après-Vente Réactif", 
                text: "Une question ou un problème ? Notre SAV basé au Maroc est disponible 7j/7 pour vous apporter une solution immédiate." 
              },
              { 
                icon: Heart, 
                title: "Satisfait ou Remboursé", 
                text: "Essayez nos produits en toute sérénité. Si vous n'êtes pas convaincu, vous disposez de 14 jours pour nous les retourner." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-yellow-500/30 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-yellow-500" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* SEO Footer Text */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400 max-w-4xl mx-auto">
              Ironz est le leader marocain de la vente d'équipements de musculation, cardio et fitness. Que vous soyez un particulier ou une salle de sport, nous vous accompagnons dans l'aménagement de vos espaces d'entraînement avec des marques de renommée mondiale.
            </p>
          </div>
        </div>
      </section>

     

     

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-black text-white p-4 rounded-full shadow-2xl hover:bg-yellow-500 hover:text-black transition-all hover:scale-110">
          <CloudImg src={logo} alt="logo" className="w-8 h-8" />
        </button>
      </div>
      
     

     
    </main>
  );
}