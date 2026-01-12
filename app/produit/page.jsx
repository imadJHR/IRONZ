"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronDown,
  ShoppingCart,
  X,
  Check,
  ArrowUpDown,
  Star,
  StarHalf,
  Grid,
  List,
  AlertCircle,
  ArrowRight,
  Flame,
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/cart-context";
import { useFavorites } from "../../context/favorites-context";
import { cn } from "../../lib/utils";

// UI Components imports
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Slider } from "../../components/ui/slider";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../../components/ui/sheet";
import { Separator } from "../../components/ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";
const PLACEHOLDER = "/placeholder.svg";

// --- UTILS ---
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
      className={cn(
        fill ? "absolute inset-0 h-full w-full" : "",
        "object-cover",
        className
      )}
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

const renderRating = (rating) => {
  const r = Number(rating) || 0;
  const fullStars = Math.floor(r);
  const hasHalfStar = r % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5" aria-label={`Note: ${r} sur 5`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`f-${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
      ))}
      {hasHalfStar && <StarHalf className="w-3 h-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`e-${i}`} className="w-3 h-3 text-gray-300" aria-hidden="true" />
      ))}
      <span className="ml-1 text-xs text-gray-500 font-medium">({r.toFixed(1)})</span>
    </div>
  );
};

// Options de tri
const SORT_OPTIONS = [
  { value: "featured", label: "Mis en avant" },
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Meilleures notes" },
  { value: "discount", label: "Promotions" },
];

function ProductSEO() {
  return (
    <>
      <title>Tous nos produits - IRONZ</title>
      <meta
        name="description"
        content="Découvrez notre gamme complète de produits pour l'aménagement et l'équipement de vos espaces sportifs et de loisirs."
      />
    </>
  );
}

// Responsive Product Card Component
function ProductCard({ product, viewMode = "grid", handleAddToCart }) {
  const productId = product._id || product.id;
  const imgSrc = product.image || "/placeholder.svg";
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isFavorite = isInFavorites(productId);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <motion.article
      key={productId}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all h-full group",
        viewMode === "list" 
          ? "flex flex-col sm:flex-row h-auto sm:h-56 md:h-64 lg:h-72" 
          : "flex flex-col"
      )}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
      }}
      whileHover={{ y: -6 }}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-gray-50 dark:bg-gray-900 shrink-0",
        viewMode === "list" 
          ? "w-full sm:w-40 md:w-56 h-48 sm:h-full" 
          : "w-full h-48 sm:h-52 md:h-60 lg:h-64"
      )}>
        <Link href={`/produit/${product.slug || productId}`} className="block w-full h-full">
          <CloudImg
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            fill
          />
        </Link>
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 sm:gap-2 z-10">
          <button
            onClick={(e) => handleAddToCart(e, product)}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-md hover:bg-yellow-600 transition-all"
            aria-label="Ajouter au panier"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={handleFavoriteClick}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-red-50 transition-all"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Star className={cn(
              "h-4 w-4 sm:h-5 sm:w-5",
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            )} />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2 z-10">
          {product.isNewProduct && (
            <Badge className="bg-yellow-500 text-black shadow-md border-none text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
              Nouveau
            </Badge>
          )}
          {Number(product.discount) > 0 && (
            <Badge className="bg-red-500 text-white shadow-md border-none text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
              -{product.discount}%
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-black text-yellow-500 shadow-md border-none text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-1" />
              Populaire
            </Badge>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-[10px] sm:text-xs text-yellow-600 dark:text-yellow-400 font-medium uppercase tracking-wider line-clamp-1">
            {product.brand || product.category}
          </span>
          {product.rating != null && renderRating(product.rating)}
        </div>
        
        <Link href={`/produit/${product.slug || productId}`}>
          <h2 className={cn(
            "font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors line-clamp-2",
            viewMode === "list"
              ? "text-sm sm:text-base md:text-lg mb-1 sm:mb-2"
              : "text-sm sm:text-base md:text-lg mb-2 sm:mb-3"
          )}>
            {product.name}
          </h2>
        </Link>
        
        {product.description && viewMode === "list" && (
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 hidden sm:block">
            {product.description}
          </p>
        )}

        {product.description && viewMode === "grid" && (
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-50 dark:border-gray-800">
          <div>
            <span className={cn(
              "font-black text-gray-900 dark:text-white",
              viewMode === "list" ? "text-lg sm:text-xl md:text-2xl" : "text-lg sm:text-xl"
            )}>
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm line-through text-gray-500">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <Link 
            href={`/produit/${product.slug || productId}`}
            className="text-yellow-600 hover:text-yellow-700 font-bold text-xs sm:text-sm flex items-center gap-1 group/link"
          >
            Détails 
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductsPage() {
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  // --- CONTEXT ---
  const { addToCart } = useCart();

  // --- RESPONSIVE CHECK ---
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- HANDLERS ---
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      ...product,
      id: product._id || product.id,
      quantity: 1
    };
    
    addToCart(cartItem);
  };

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/products?limit=1000`);
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        
        const data = await response.json();
        const productsData = data.success && data.data ? data.data : Array.isArray(data) ? data : [];
        
        setProducts(productsData);

        if (productsData.length > 0) {
          const prices = productsData.map((p) => parseFloat(p.price)).filter((p) => !isNaN(p));
          if (prices.length > 0) {
            const min = Math.floor(Math.min(...prices));
            const max = Math.ceil(Math.max(...prices));
            setMinPrice(min);
            setMaxPrice(max);
            setPriceRange([min, max]);
          }
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError(err.message || "Impossible de charger les produits");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- FILTERING LOGIC ---
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return uniqueCategories.sort().map((name, index) => ({ id: index + 1, name }));
  }, [products]);

  const availableSubCategories = useMemo(() => {
    let relevantProducts = products;
    if (selectedCategories.length > 0) {
      relevantProducts = products.filter(p => selectedCategories.includes(p.category));
    }
    const uniqueSubs = [...new Set(relevantProducts.map((p) => p.subCategory).filter(Boolean))];
    return uniqueSubs.sort();
  }, [products, selectedCategories]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.subCategory?.toLowerCase().includes(query)
      );
    }

    // Categories
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    // SubCategories
    if (selectedSubCategories.length > 0) {
      result = result.filter((product) => product.subCategory && selectedSubCategories.includes(product.subCategory));
    }

    // Price
    result = result.filter((product) => parseFloat(product.price) >= priceRange[0] && parseFloat(product.price) <= priceRange[1]);

    // Sorting
    switch (sortOption) {
      case "price-asc": return result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-desc": return result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "newest": return result.sort((a, b) => {
          if (a.isNewProduct && !b.isNewProduct) return -1;
          if (!a.isNewProduct && b.isNewProduct) return 1;
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
      case "rating": return result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "discount": return result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default: return result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
    }
  }, [searchQuery, selectedCategories, selectedSubCategories, priceRange, sortOption, products]);

  // Pagination Logic
  const displayedProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, filteredProducts, productsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategories, selectedSubCategories, priceRange, sortOption]);
  useEffect(() => { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); }, [currentPage]);

  const handleCategoryToggle = useCallback((category) => {
    setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]);
  }, []);

  const handleSubCategoryToggle = useCallback((subCategory) => {
    setSelectedSubCategories((prev) => prev.includes(subCategory) ? prev.filter((sc) => sc !== subCategory) : [...prev, subCategory]);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSortOption("featured");
  }, [minPrice, maxPrice]);

  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push("...");
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
      if (endPage < totalPages - 1) pageNumbers.push("...");
      if (totalPages > 1) pageNumbers.push(totalPages);
    }
    return pageNumbers;
  }, [currentPage, totalPages, isMobile]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const activeFiltersCount = (searchQuery ? 1 : 0) + selectedCategories.length + selectedSubCategories.length + (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0);

  // Mobile Filter Component
  const MobileFilterSheet = () => (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden gap-2 h-10 sm:h-12 rounded-xl font-bold px-3 sm:px-4">
          <Filter className="h-4 w-4" /> Filtres
          {activeFiltersCount > 0 && <span className="bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFiltersCount}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-[350px] p-0 overflow-y-auto">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-xl">Filtres</SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div>
            <h3 className="font-bold mb-4 text-base">Recherche</h3>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Rechercher..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="pl-10 h-12 rounded-xl text-base" 
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-base">Catégories</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`mob-cat-${cat.id}`} 
                    checked={selectedCategories.includes(cat.name)} 
                    onCheckedChange={() => handleCategoryToggle(cat.name)} 
                  />
                  <label 
                    htmlFor={`mob-cat-${cat.id}`} 
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {availableSubCategories.length > 0 && (
            <div>
              <h3 className="font-bold mb-4 text-base">Sous-catégories</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {availableSubCategories.map((sub) => (
                  <div key={sub} className="flex items-center space-x-3">
                    <Checkbox 
                      id={`mob-sub-${sub}`} 
                      checked={selectedSubCategories.includes(sub)} 
                      onCheckedChange={() => handleSubCategoryToggle(sub)} 
                    />
                    <label 
                      htmlFor={`mob-sub-${sub}`} 
                      className="text-sm font-medium cursor-pointer flex-1"
                    >
                      {sub}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="font-bold mb-4 text-base">Prix</h3>
            <Slider 
              value={priceRange} 
              min={minPrice} 
              max={maxPrice} 
              step={10} 
              onValueChange={handlePriceChange} 
              className="mb-4" 
            />
            <div className="flex justify-between text-sm font-bold">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>
        <SheetFooter className="p-6 border-t">
          <Button 
            onClick={() => setIsFilterOpen(false)} 
            className="w-full bg-yellow-500 text-black font-bold h-12 rounded-xl text-base"
          >
            Voir {filteredProducts.length} résultats
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  // --- RENDER ---
  if (error) {
    return (
      <main className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 lg:py-24 text-center">
        <div className="mb-4 text-red-500"><AlertCircle className="h-12 w-12 mx-auto" /></div>
        <h3 className="text-lg sm:text-xl font-bold mb-2">Erreur de chargement</h3>
        <p className="text-gray-500 mb-4 text-sm sm:text-base">{error}</p>
        <Button onClick={() => window.location.reload()}>Réessayer</Button>
      </main>
    );
  }

  return (
    <>
      <ProductSEO />
      <main className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 lg:py-28 bg-white dark:bg-gray-950">
        {/* Header */}
        <header className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white mb-3 sm:mb-4">
            Tous nos <span className="text-yellow-500">Produits</span>
          </h1>
          <div className="h-1.5 w-12 sm:w-16 md:w-20 bg-yellow-500 mx-auto rounded-full" />
          <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Découvrez notre gamme complète d'équipements professionnels.
          </p>
        </header>

        {/* Filters Bar */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8 sticky top-16 sm:top-20 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Mobile Filter Button */}
            <MobileFilterSheet />

            {/* Desktop Search */}
            <div className="relative flex-1 min-w-[180px] sm:min-w-[240px]">
              <Input 
                type="text" 
                placeholder="Rechercher un produit..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="pl-10 sm:pl-12 h-10 sm:h-12 rounded-xl text-sm sm:text-base border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 font-medium" 
              />
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  aria-label="Effacer la recherche"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 sm:h-12 rounded-xl gap-2 font-bold border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-sm sm:text-base px-3 sm:px-4">
                  <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" /> 
                  <span className="hidden xs:inline">Trier</span> 
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 sm:w-56 rounded-xl p-2">
                {SORT_OPTIONS.map((opt) => (
                  <DropdownMenuItem 
                    key={opt.value} 
                    onClick={() => setSortOption(opt.value)} 
                    className="rounded-lg cursor-pointer font-medium text-sm sm:text-base"
                  >
                    <span className="flex-1">{opt.label}</span>
                    {sortOption === opt.value && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode */}
            <div className="hidden sm:flex border border-gray-200 dark:border-gray-800 rounded-xl p-1 bg-white dark:bg-gray-900">
              <button 
                onClick={() => setViewMode("grid")} 
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === "grid" 
                    ? "bg-yellow-500 text-black shadow-md" 
                    : "text-gray-400 hover:text-black"
                )}
                aria-label="Vue grille"
              >
                <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button 
                onClick={() => setViewMode("list")} 
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === "list" 
                    ? "bg-yellow-500 text-black shadow-md" 
                    : "text-gray-400 hover:text-black"
                )}
                aria-label="Vue liste"
              >
                <List className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-800">
              {searchQuery && (
                <Badge variant="outline" className="h-7 sm:h-8 gap-1.5 sm:gap-2 pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 rounded-full border-yellow-500/30 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs">
                  {searchQuery} 
                  <X 
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 cursor-pointer" 
                    onClick={() => setSearchQuery("")} 
                  />
                </Badge>
              )}
              {selectedCategories.map(cat => (
                <Badge key={cat} variant="outline" className="h-7 sm:h-8 gap-1.5 sm:gap-2 pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 rounded-full text-xs">
                  {cat} 
                  <X 
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 cursor-pointer" 
                    onClick={() => handleCategoryToggle(cat)} 
                  />
                </Badge>
              ))}
              {selectedSubCategories.map(sub => (
                <Badge key={sub} variant="outline" className="h-7 sm:h-8 gap-1.5 sm:gap-2 pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 rounded-full border-dashed text-xs">
                  {sub} 
                  <X 
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 cursor-pointer" 
                    onClick={() => handleSubCategoryToggle(sub)} 
                  />
                </Badge>
              ))}
              {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                <Badge variant="outline" className="h-7 sm:h-8 gap-1.5 sm:gap-2 pl-2.5 sm:pl-3 pr-1.5 sm:pr-2 rounded-full text-xs">
                  Prix: {priceRange[0]}-{priceRange[1]} 
                  <X 
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 cursor-pointer" 
                    onClick={() => setPriceRange([minPrice, maxPrice])} 
                  />
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters} 
                className="text-xs h-7 sm:h-8 text-red-500 font-bold hover:bg-red-50 rounded-full px-2 sm:px-3"
              >
                Tout Effacer
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
            <div className="sticky top-36 space-y-6 sm:space-y-8 pr-4">
              <div>
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h3 className="font-black uppercase italic text-base sm:text-lg">Catégories</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                  {categories.map((cat) => (
                    <div 
                      key={cat.id} 
                      className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer" 
                      onClick={() => handleCategoryToggle(cat.name)}
                    >
                      <Checkbox id={`cat-${cat.id}`} checked={selectedCategories.includes(cat.name)} />
                      <label 
                        htmlFor={`cat-${cat.id}`} 
                        className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer flex-1"
                      >
                        {cat.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {availableSubCategories.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h3 className="font-black uppercase italic text-base sm:text-lg">Sous-catégories</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                    {availableSubCategories.map((sub) => (
                      <div 
                        key={sub} 
                        className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer" 
                        onClick={() => handleSubCategoryToggle(sub)}
                      >
                        <Checkbox id={`sub-${sub}`} checked={selectedSubCategories.includes(sub)} />
                        <label 
                          htmlFor={`sub-${sub}`} 
                          className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer flex-1"
                        >
                          {sub}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />
              <div>
                <h3 className="font-black uppercase italic text-base sm:text-lg mb-3 sm:mb-4">Prix</h3>
                <Slider 
                  value={priceRange} 
                  min={minPrice} 
                  max={maxPrice} 
                  step={10} 
                  onValueChange={handlePriceChange} 
                  className="mb-4" 
                />
                <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-500">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-48 sm:h-52 md:h-60 lg:h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" 
                  />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl sm:rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <Search className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6 px-4">
                  Essayez de modifier vos filtres.
                </p>
                <Button onClick={clearFilters} className="bg-black text-white rounded-xl px-6">
                  Réinitialiser
                </Button>
              </div>
            ) : (
              <>
                <motion.div 
                  className={cn(
                    "grid gap-3 sm:gap-4 md:gap-6", 
                    viewMode === "grid" 
                      ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" 
                      : "grid-cols-1"
                  )}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {displayedProducts.map((product) => (
                    <ProductCard 
                      key={product._id || product.id}
                      product={product}
                      viewMode={viewMode}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 sm:mt-12 flex justify-center">
                    <nav className="flex items-center gap-1.5 sm:gap-2">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                        disabled={currentPage === 1} 
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
                        aria-label="Page précédente"
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" />
                      </button>
                      {getPageNumbers().map((p, i) => (
                        <button 
                          key={i} 
                          onClick={() => typeof p === 'number' && setCurrentPage(p)} 
                          className={cn(
                            "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition",
                            currentPage === p 
                              ? "bg-yellow-500 text-black shadow-lg" 
                              : "hover:bg-gray-100 text-gray-600"
                          )}
                          aria-label={typeof p === 'number' ? `Page ${p}` : 'Plus de pages'}
                          aria-current={currentPage === p ? 'page' : undefined}
                        >
                          {p}
                        </button>
                      ))}
                      <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                        disabled={currentPage === totalPages} 
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
                        aria-label="Page suivante"
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 -rotate-90" />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}