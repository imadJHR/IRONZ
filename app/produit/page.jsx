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
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/cart-context";
import { useFavorites } from "../../context/favorites-context";
import { cn } from "../../lib/utils";

// UI Components imports (Assurez-vous que ces chemins sont corrects dans votre projet)
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
      className={cn(fill ? "absolute inset-0 h-full w-full object-contain" : "", className)}
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

export default function ProductsPage() {
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  // --- HANDLERS ---
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  // ✅ Fonction AddToCart Corrigée et Robuste
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation(); // Empêche le clic de remonter (au cas où la carte devient cliquable)
    
    // On s'assure que l'ID est bien présent pour le contexte du panier
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
    const maxVisiblePages = 5;
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
  }, [currentPage, totalPages]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const activeFiltersCount = (searchQuery ? 1 : 0) + selectedCategories.length + selectedSubCategories.length + (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0);

  // --- RENDER ---
  if (error) {
    return (
      <main className="container mx-auto px-4 py-20 sm:py-24 md:py-28 text-center">
        <div className="mb-4 text-red-500"><AlertCircle className="h-12 w-12 mx-auto" /></div>
        <h3 className="text-xl font-bold mb-2">Erreur de chargement</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Réessayer</Button>
      </main>
    );
  }

  return (
    <>
      <ProductSEO />
      <main className="container mx-auto px-4 py-20 sm:py-24 md:py-28 bg-white dark:bg-gray-950">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white mb-4">
            Tous nos <span className="text-yellow-500">Produits</span>
          </h1>
          <div className="h-1.5 w-20 bg-yellow-500 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez notre gamme complète d'équipements professionnels.
          </p>
        </header>

        {/* Filters Bar */}
        <div className="flex flex-col gap-6 mb-8 sticky top-20 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden gap-2 h-12 rounded-xl font-bold">
                  <Filter className="h-4 w-4" /> Filtres
                  {activeFiltersCount > 0 && <span className="bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFiltersCount}</span>}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-[350px]">
                <SheetHeader><SheetTitle>Filtres</SheetTitle></SheetHeader>
                <div className="py-6 space-y-8">
                  <div>
                    <h3 className="font-bold mb-4">Recherche</h3>
                    <div className="relative">
                      <Input type="text" placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-12 rounded-xl" />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">Catégories</h3>
                    <div className="space-y-3">{categories.map((cat) => (
                      <div key={cat.id} className="flex items-center space-x-2"><Checkbox id={`mob-cat-${cat.id}`} checked={selectedCategories.includes(cat.name)} onCheckedChange={() => handleCategoryToggle(cat.name)} /><label htmlFor={`mob-cat-${cat.id}`} className="text-sm font-medium">{cat.name}</label></div>
                    ))}</div>
                  </div>
                  {availableSubCategories.length > 0 && (
                    <div>
                      <h3 className="font-bold mb-4">Sous-catégories</h3>
                      <div className="space-y-3">{availableSubCategories.map((sub) => (
                        <div key={sub} className="flex items-center space-x-2"><Checkbox id={`mob-sub-${sub}`} checked={selectedSubCategories.includes(sub)} onCheckedChange={() => handleSubCategoryToggle(sub)} /><label htmlFor={`mob-sub-${sub}`} className="text-sm font-medium">{sub}</label></div>
                      ))}</div>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold mb-4">Prix</h3>
                    <Slider value={priceRange} min={minPrice} max={maxPrice} step={10} onValueChange={handlePriceChange} className="mb-4" />
                    <div className="flex justify-between text-sm font-bold"><span>{formatPrice(priceRange[0])}</span><span>{formatPrice(priceRange[1])}</span></div>
                  </div>
                </div>
                <SheetFooter><Button onClick={() => setIsFilterOpen(false)} className="w-full bg-yellow-500 text-black font-bold h-12 rounded-xl">Voir {filteredProducts.length} résultats</Button></SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Desktop Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Input type="text" placeholder="Rechercher un produit..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-12 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 font-medium" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"><X className="h-4 w-4" /></button>}
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-xl gap-2 font-bold border-gray-200 dark:border-gray-800 hover:bg-gray-50">
                  <ArrowUpDown className="h-4 w-4" /> <span className="hidden sm:inline">Trier</span> <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                {SORT_OPTIONS.map((opt) => (
                  <DropdownMenuItem key={opt.value} onClick={() => setSortOption(opt.value)} className="rounded-lg cursor-pointer font-medium">
                    <span className="flex-1">{opt.label}</span>
                    {sortOption === opt.value && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode */}
            <div className="hidden md:flex border border-gray-200 dark:border-gray-800 rounded-xl p-1 bg-white dark:bg-gray-900">
              <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded-lg transition-all", viewMode === "grid" ? "bg-yellow-500 text-black shadow-md" : "text-gray-400 hover:text-black")}><Grid className="h-5 w-5" /></button>
              <button onClick={() => setViewMode("list")} className={cn("p-2 rounded-lg transition-all", viewMode === "list" ? "bg-yellow-500 text-black shadow-md" : "text-gray-400 hover:text-black")}><List className="h-5 w-5" /></button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              {searchQuery && <Badge variant="outline" className="h-8 gap-2 pl-3 pr-2 rounded-full border-yellow-500/30 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">Recherche: {searchQuery} <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} /></Badge>}
              {selectedCategories.map(cat => <Badge key={cat} variant="outline" className="h-8 gap-2 pl-3 pr-2 rounded-full">{cat} <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryToggle(cat)} /></Badge>)}
              {selectedSubCategories.map(sub => <Badge key={sub} variant="outline" className="h-8 gap-2 pl-3 pr-2 rounded-full border-dashed">{sub} <X className="h-3 w-3 cursor-pointer" onClick={() => handleSubCategoryToggle(sub)} /></Badge>)}
              {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && <Badge variant="outline" className="h-8 gap-2 pl-3 pr-2 rounded-full">Prix: {priceRange[0]}-{priceRange[1]} <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([minPrice, maxPrice])} /></Badge>}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-8 text-red-500 font-bold hover:bg-red-50 rounded-full">Tout Effacer</Button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-44 space-y-8 pr-4">
              <div>
                <div className="flex justify-between items-center mb-4"><h3 className="font-black uppercase italic text-lg">Catégories</h3></div>
                <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleCategoryToggle(cat.name)}>
                      <Checkbox id={`cat-${cat.id}`} checked={selectedCategories.includes(cat.name)} />
                      <label htmlFor={`cat-${cat.id}`} className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer">{cat.name}</label>
                    </div>
                  ))}
                </div>
              </div>

              {availableSubCategories.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-4"><h3 className="font-black uppercase italic text-lg">Sous-catégories</h3></div>
                  <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                    {availableSubCategories.map((sub) => (
                      <div key={sub} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleSubCategoryToggle(sub)}>
                        <Checkbox id={`sub-${sub}`} checked={selectedSubCategories.includes(sub)} />
                        <label htmlFor={`sub-${sub}`} className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer">{sub}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />
              <div>
                <h3 className="font-black uppercase italic text-lg mb-4">Prix</h3>
                <Slider value={priceRange} min={minPrice} max={maxPrice} step={10} onValueChange={handlePriceChange} className="mb-4" />
                <div className="flex justify-between text-sm font-bold text-gray-500"><span>{formatPrice(priceRange[0])}</span><span>{formatPrice(priceRange[1])}</span></div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <div key={i} className="h-80 bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse" />)}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-500 mb-6">Essayez de modifier vos filtres.</p>
                <Button onClick={clearFilters} className="bg-black text-white rounded-xl">Réinitialiser</Button>
              </div>
            ) : (
              <>
                <motion.div 
                  className={cn("grid gap-6", viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" : "grid-cols-1")}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {displayedProducts.map((product) => {
                    const productId = product._id || product.id;
                    const imgSrc = product.image || "/placeholder.svg";
                    return (
                      <motion.article
                        key={productId}
                        className={cn(
                          "bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group flex flex-col",
                          viewMode === "list" ? "flex-row h-48" : "h-full"
                        )}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                      >
                        <div className={cn("relative overflow-hidden bg-gray-50 dark:bg-gray-900", viewMode === "list" ? "w-48" : "h-64")}>
                          <Link href={`/produit/${product.slug || productId}`} className="block h-full w-full">
                            <CloudImg 
                              src={imgSrc} 
                              alt={product.name} 
                              className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                              fill 
                            />
                          </Link>
                          
                          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            {product.isNewProduct && <span className="bg-yellow-500 text-black text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm">Nouveau</span>}
                            {Number(product.discount) > 0 && <span className="bg-red-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-sm">-{product.discount}%</span>}
                          </div>
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                          <span className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-1 block">{product.category}</span>
                          <Link href={`/produit/${product.slug || productId}`}>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-yellow-600 transition-colors uppercase italic leading-tight">
                              {product.name}
                            </h3>
                          </Link>
                          
                          {product.rating > 0 && <div className="mb-3">{renderRating(product.rating)}</div>}

                          <div className="mt-auto flex items-end justify-between pt-3 border-t border-gray-50 dark:border-gray-700">
                            <div>
                              <span className="text-xl font-black text-gray-900 dark:text-white block">{formatPrice(product.price)}</span>
                              {product.oldPrice && <span className="text-xs text-gray-400 line-through font-medium">{formatPrice(product.oldPrice)}</span>}
                            </div>
                            
                            {/* ✅ Bouton AddToCart Fixé */}
                            <button 
                              onClick={(e) => handleAddToCart(e, product)}
                              className="h-10 w-10 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all shadow-lg"
                              aria-label="Ajouter au panier"
                            >
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"><ChevronDown className="w-5 h-5 rotate-90" /></button>
                      {getPageNumbers().map((p, i) => (
                        <button key={i} onClick={() => typeof p === 'number' && setCurrentPage(p)} className={cn("w-10 h-10 rounded-xl font-bold text-sm transition", currentPage === p ? "bg-yellow-500 text-black shadow-lg" : "hover:bg-gray-100 text-gray-600")}>{p}</button>
                      ))}
                      <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"><ChevronDown className="w-5 h-5 -rotate-90" /></button>
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