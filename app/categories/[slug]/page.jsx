"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  Search,
  Filter,
  X,
  ArrowUpDown,
  Star,
  StarHalf,
  Heart,
  ShoppingCart,
  ArrowLeft,
  Eye,
  Truck,
  ShieldCheck,
  Package,
  Clock,
  Sparkles,
  Zap,
  Flame,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../../context/cart-context";
import { useFavorites } from "../../../context/favorites-context";
import { cn } from "../../../lib/utils";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Slider } from "../../../components/ui/slider";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../../../components/ui/sheet";
import { Separator } from "../../../components/ui/separator";

// --- HELPERS ---

// 1. Helper to normalize DB categories to URL slugs
// e.g. "Arts Martiaux" -> "arts-martiaux", "Supplément" -> "supplement"
const createSlug = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

// Icons mapping based on partial slug match (visual only)
const CATEGORY_ICONS = {
  musculation: <Flame className="h-5 w-5" />,
  cardio: <Zap className="h-5 w-5" />,
  crossfit: <Award className="h-5 w-5" />,
  boxe: <Sparkles className="h-5 w-5" />,
  accessoires: <Package className="h-5 w-5" />,
  nutrition: <Truck className="h-5 w-5" />,
  equipements: <ShieldCheck className="h-5 w-5" />,
  supplement: <Clock className="h-5 w-5" />,
};

const API_URL = "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";
const PLACEHOLDER = "/placeholder.svg";

/**
 * Cloudinary-safe image component
 */
function CloudImg({ src, alt, fill = false, className = "", cloudinary = true }) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);

  useEffect(() => {
    if (cloudinary && src && typeof src === "string") {
      // Prevent crash if src is not valid, pass through if it's already a full URL
      const transformedSrc = src.startsWith('http') 
        ? src 
        : `https://res.cloudinary.com/dypjgpisl/image/upload/q_auto,f_auto/${src}`; // Adjusted to your likely cloud name or generic
      setImgSrc(transformedSrc);
    } else {
      setImgSrc(PLACEHOLDER);
    }
  }, [src, cloudinary]);

  const handleError = () => {
    setImgSrc(PLACEHOLDER);
  };

  if (fill) {
    return (
      <img
        src={imgSrc}
        alt={alt || ""}
        onError={handleError}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || ""}
      onError={handleError}
      className={className}
    />
  );
}

export default function CategoryPage() {
  const params = useParams();
  // Get slug from URL (e.g., "supplement")
  const slug = params?.slug?.toString(); 

  // --- STATE ---
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(<Package className="h-5 w-5" />);
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState("featured");
  
  // UI
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/products?limit=1000`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const json = await res.json();
        
        // Handle API response structure (array vs { products: [] } vs { data: [] })
        let allProducts = [];
        if (Array.isArray(json)) allProducts = json;
        else if (json.data && Array.isArray(json.data)) allProducts = json.data;
        else if (json.products && Array.isArray(json.products)) allProducts = json.products;

        // --- CORE LOGIC FIX ---
        // Filter products where the "slugified" category matches the URL slug
        const targetSlug = slug.toLowerCase();
        
        const catProducts = allProducts.filter(p => {
            if (!p.category) return false;
            // Compare URL slug with generated slug of DB category
            // e.g. URL: "arts-martiaux" === DB: "Arts Martiaux" (slugified)
            return createSlug(p.category) === targetSlug;
        });

        setProducts(catProducts);
        setFilteredProducts(catProducts);

        // Update Category Name and Icon based on found data or slug
        if (catProducts.length > 0) {
            // Use the actual casing from the database (e.g. "Supplément")
            setCategoryName(catProducts[0].category);
        } else {
            // Fallback: capitalize the slug
            setCategoryName(slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "));
        }

        // Set Icon dynamically based on keywords in the slug
        const matchedIconKey = Object.keys(CATEGORY_ICONS).find(key => targetSlug.includes(key));
        if (matchedIconKey) {
            setCategoryIcon(CATEGORY_ICONS[matchedIconKey]);
        }

        // Extract Subcategories
        const subCats = [...new Set(catProducts.map(p => p.subCategory).filter(Boolean))];
        setAvailableSubCategories(subCats.sort());

        // Adjust Price Range
        if (catProducts.length > 0) {
            const maxP = Math.max(...catProducts.map(p => p.price || 0));
            setPriceRange([0, Math.ceil(maxP * 1.1)]); // 10% buffer
        }

      } catch (err) {
        console.error("Error loading category:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  // --- FILTERING LOGIC ---
  useEffect(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          (p.tags && p.tags.some((tag) => tag?.toLowerCase().includes(query)))
      );
    }

    // Price
    result = result.filter(
      (p) => (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]
    );

    // Subcategories
    if (selectedSubCategories.length > 0) {
      result = result.filter(p => 
        p.subCategory && selectedSubCategories.includes(p.subCategory)
      );
    }

    // Sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default: // featured / popularity
        result.sort((a, b) => (b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? 1 : -1));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, priceRange, sortOption, selectedSubCategories]);

  // --- HANDLERS ---

  const handlePriceChange = (value) => setPriceRange(value);
  
  const handleSubCategoryToggle = (subCat) => {
    setSelectedSubCategories(prev => 
      prev.includes(subCat) 
        ? prev.filter(sc => sc !== subCat)
        : [...prev, subCat]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSubCategories([]);
    if (products.length > 0) {
        const maxP = Math.max(...products.map(p => p.price || 0));
        setPriceRange([0, Math.ceil(maxP * 1.1)]);
    } else {
        setPriceRange([0, 20000]);
    }
    setSortOption("featured");
  };

  const toggleFavorite = (product) => {
    const id = product._id || product.id;
    if (isInFavorites(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ ...product, id });
    }
  };

  const onAddToCart = (product) => {
    addToCart({ ...product, id: product._id || product.id });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  const renderRating = (rating) => {
    const r = Number(rating) || 0;
    const full = Math.floor(r);
    const half = r - full >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => (
          <Star key={`f-${i}`} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
        {half && <StarHalf className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />}
        {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
          <Star key={`e-${i}`} className="w-3.5 h-3.5 text-gray-300" />
        ))}
        <span className="ml-1 text-xs text-gray-500">({r.toFixed(1)})</span>
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  // --- RENDER LOADING ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
            <div className="h-4 w-full max-w-2xl bg-gray-200 dark:bg-gray-800 rounded-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 h-80" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER CONTENT ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-16">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="mb-12">
          {/* Breadcrumb */}
          <nav
            className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400 font-medium"
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-yellow-500 transition-colors">
              ACCUEIL
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/categories" className="hover:text-yellow-500 transition-colors">
              CATÉGORIES
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white font-bold uppercase">
              {categoryName}
            </span>
          </nav>

          {/* Category Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-yellow-500/30">
                  {categoryIcon}
                </div>
                <h1 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white leading-none">
                  {categoryName} <span className="text-yellow-500">Collection</span>
                </h1>
              </div>
              <div className="h-2 w-24 bg-yellow-500 mt-4 rounded-full" />
            </div>
            <Link href="/product" className="text-gray-400 hover:text-yellow-500 font-black uppercase italic text-sm transition-colors flex items-center gap-2">
              <ArrowLeft size={18} /> Voir tous les produits
            </Link>
          </div>

          {/* Category Description */}
          <div className="max-w-3xl">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg border-l-4 border-yellow-500 pl-6 py-2">
              Découvrez notre sélection premium pour {categoryName}. 
              Des produits de qualité professionnelle pour vos entraînements.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-3xl font-black text-yellow-500 mb-2">{products.length}</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Produits</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-3xl font-black text-yellow-500 mb-2">{availableSubCategories.length}</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Sous-catégories</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-3xl font-black text-yellow-500 mb-2">
              {products.length > 0 ? formatPrice(Math.min(...products.map(p => p.price || 0))) : "-"}
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Prix minimum</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-3xl font-black text-yellow-500 mb-2">
               {products.length > 0 ? formatPrice(Math.max(...products.map(p => p.price || 0))) : "-"}
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Prix maximum</div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-4 md:p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            
            {/* Mobile Filter Button & Search */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden w-full sm:w-auto gap-2 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                    <Filter className="h-4 w-4" /> Filtres
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto bg-white dark:bg-gray-900 z-[100]">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-xl font-black uppercase italic">Filtres</SheetTitle>
                  </SheetHeader>
                  
                  <div className="py-4 space-y-8">
                    {/* Mobile Subcategories */}
                    {availableSubCategories.length > 0 && (
                      <div>
                        <h3 className="font-black uppercase italic text-sm mb-4 text-gray-900 dark:text-white">Sous-catégories</h3>
                        <div className="space-y-3">
                          {availableSubCategories.map((sub) => (
                            <div key={sub} className="flex items-center space-x-3">
                              <Checkbox 
                                id={`mobile-sub-${sub}`} 
                                checked={selectedSubCategories.includes(sub)}
                                onCheckedChange={() => handleSubCategoryToggle(sub)}
                                className="border-gray-300 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                              />
                              <Label htmlFor={`mobile-sub-${sub}`} className="text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300">
                                {sub}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-6" />
                      </div>
                    )}

                    {/* Mobile Price */}
                    <div>
                      <h3 className="font-black uppercase italic text-sm mb-4 text-gray-900 dark:text-white">Prix</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 20000]}
                          min={0}
                          max={20000}
                          step={100}
                          value={priceRange}
                          onValueChange={handlePriceChange}
                          className="mb-6"
                        />
                        <div className="flex items-center justify-between text-sm font-black">
                          <span className="text-gray-900 dark:text-white">{formatPrice(priceRange[0])}</span>
                          <span className="text-gray-900 dark:text-white">{formatPrice(priceRange[1])}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <SheetFooter className="mt-8">
                    <Button 
                      onClick={() => setIsFilterOpen(false)} 
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black uppercase italic tracking-widest py-6 rounded-xl"
                    >
                      Voir {filteredProducts.length} produits
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <div className="relative w-full sm:w-[320px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-yellow-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Sort & View Controls */}
            <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Trier :</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 min-w-[160px] justify-between rounded-xl border-2 border-gray-200 dark:border-gray-700 h-12">
                      <span className="truncate font-medium">
                        {sortOption === "featured" && "Populaires"}
                        {sortOption === "newest" && "Nouveautés"}
                        {sortOption === "price-asc" && "Prix croissant"}
                        {sortOption === "price-desc" && "Prix décroissant"}
                        {sortOption === "rating" && "Mieux notés"}
                      </span>
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
                    <DropdownMenuItem onClick={() => setSortOption("featured")} className="cursor-pointer py-3">
                      Populaires
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("newest")} className="cursor-pointer py-3">
                      Nouveautés
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("price-asc")} className="cursor-pointer py-3">
                      Prix croissant
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("price-desc")} className="cursor-pointer py-3">
                      Prix décroissant
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("rating")} className="cursor-pointer py-3">
                      Mieux notés
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    viewMode === "grid" 
                      ? "bg-white dark:bg-gray-700 shadow-sm text-yellow-500" 
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <div className="grid grid-cols-2 gap-1 w-5 h-5">
                    <div className="bg-current rounded-[2px]" />
                    <div className="bg-current rounded-[2px]" />
                    <div className="bg-current rounded-[2px]" />
                    <div className="bg-current rounded-[2px]" />
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    viewMode === "list" 
                      ? "bg-white dark:bg-gray-700 shadow-sm text-yellow-500" 
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <div className="flex flex-col gap-1 w-5 h-5">
                    <div className="bg-current h-1 rounded-[2px]" />
                    <div className="bg-current h-1 rounded-[2px]" />
                    <div className="bg-current h-1 rounded-[2px]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Badges */}
        <AnimatePresence>
          {(priceRange[0] > 0 || priceRange[1] < 20000 || searchQuery || selectedSubCategories.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap items-center gap-2 mb-8 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
            >
              <span className="text-sm font-black uppercase italic text-gray-500 dark:text-gray-400">Filtres actifs:</span>
              
              {searchQuery && (
                <Badge className="gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border-0">
                  "{searchQuery}"
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}

              {selectedSubCategories.map(sub => (
                <Badge key={sub} className="gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border-0">
                  {sub}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleSubCategoryToggle(sub)} />
                </Badge>
              ))}

              {(priceRange[0] > 0 || priceRange[1] < 20000) && (
                <Badge className="gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border-0">
                  Prix: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <button onClick={() => setPriceRange([0, 20000])}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters} 
                className="text-xs h-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
              >
                Tout effacer
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="text-xl font-black uppercase italic mb-6 text-gray-900 dark:text-white">
                  <Filter className="inline h-5 w-5 mr-2" />
                  Filtres
                </h3>

                {/* Subcategories Filter */}
                {availableSubCategories.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-black uppercase italic text-sm mb-4 text-gray-900 dark:text-white">Sous-catégories</h4>
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                      {availableSubCategories.map((sub) => (
                        <div key={sub} className="flex items-center space-x-3">
                          <Checkbox 
                            id={`desktop-sub-${sub}`} 
                            checked={selectedSubCategories.includes(sub)}
                            onCheckedChange={() => handleSubCategoryToggle(sub)}
                            className="border-gray-300 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                          />
                          <Label htmlFor={`desktop-sub-${sub}`} className="text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors">
                            {sub}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-6" />
                  </div>
                )}

                {/* Price Filter */}
                <div>
                  <h4 className="font-black uppercase italic text-sm mb-4 text-gray-900 dark:text-white">Prix</h4>
                  <Slider
                    defaultValue={[0, 20000]}
                    min={0}
                    max={20000}
                    step={100}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-8"
                  />
                  <div className="flex items-center justify-between text-sm font-black text-gray-900 dark:text-white">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/5 dark:to-orange-500/5 p-6 rounded-3xl border border-yellow-500/30 dark:border-yellow-500/20">
                <h4 className="font-black uppercase italic text-yellow-600 dark:text-yellow-400 mb-3">Besoin d'aide ?</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Nos experts sont disponibles pour vous conseiller sur le meilleur équipement pour vos besoins.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black uppercase italic tracking-widest rounded-xl py-5">
                    Contactez-nous
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <Search className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
                <h3 className="text-2xl font-black uppercase italic mb-4">Aucun produit trouvé</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Essayez d'ajuster vos filtres ou votre recherche.</p>
                <Button 
                  onClick={clearFilters} 
                  variant="outline" 
                  className="border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-yellow-500 hover:text-yellow-500 rounded-xl px-8 py-6"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.map((product) => {
                  const id = product._id || product.id;
                  const isFav = isInFavorites(id);
                  
                  return (
                    <motion.div
                      key={id}
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-500"
                    >
                      {/* Image Area */}
                      <div className="relative h-72 overflow-hidden bg-gray-50 dark:bg-gray-950">
                        <Link href={`/produit/${product.slug || id}`}>
                          <CloudImg
                            fill
                            src={product.image}
                            alt={product.name}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </Link>
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.isNewProduct && (
                            <span className="bg-green-500 text-white text-xs font-black uppercase px-3 py-1.5 rounded-lg shadow-lg">
                              Nouveau
                            </span>
                          )}
                          {Number(product.discount) > 0 && (
                            <span className="bg-red-500 text-white text-xs font-black uppercase px-3 py-1.5 rounded-lg shadow-lg">
                              -{product.discount}%
                            </span>
                          )}
                        </div>

                        {/* Fav Button */}
                        <button
                          onClick={() => toggleFavorite(product)}
                          className={cn(
                            "absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10",
                            isFav 
                              ? "bg-red-500 text-white" 
                              : "bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 hover:scale-110"
                          )}
                        >
                          <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
                        </button>

                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Link href={`/produit/${product.slug || id}`}>
                            <Button className="bg-white text-black hover:bg-yellow-500 font-black uppercase italic tracking-widest rounded-xl px-6 py-3">
                              <Eye className="h-4 w-4 mr-2" />
                              Voir le produit
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase font-black tracking-widest">
                          {product.subCategory || product.category}
                        </div>
                        
                        <Link href={`/produit/${product.slug || id}`} className="block mb-4">
                          <h3 className="font-black text-xl text-gray-900 dark:text-white leading-tight group-hover:text-yellow-500 transition line-clamp-2 min-h-[3.5rem]">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="mb-6">
                          {renderRating(product.rating)}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div>
                            <div className="font-black text-2xl text-gray-900 dark:text-white">
                              {formatPrice(product.price)}
                            </div>
                            {product.oldPrice > 0 && (
                              <div className="text-sm text-gray-400 line-through">
                                {formatPrice(product.oldPrice)}
                              </div>
                            )}
                          </div>
                          
                          <Button 
                            size="icon" 
                            className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black shadow-lg h-12 w-12 hover:scale-110 transition-all"
                            onClick={() => onAddToCart(product)}
                          >
                            <ShoppingCart className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              // LIST VIEW
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.map((product) => {
                  const id = product._id || product.id;
                  
                  return (
                    <motion.div
                      key={id}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all flex flex-col sm:flex-row"
                    >
                      <div className="relative w-full sm:w-64 h-64 sm:h-auto bg-gray-50 dark:bg-gray-950 flex-shrink-0">
                        <Link href={`/produit/${product.slug || id}`}>
                          <CloudImg
                            fill
                            src={product.image}
                            alt={product.name}
                            className="object-cover"
                          />
                        </Link>
                        {Number(product.discount) > 0 && (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black uppercase px-3 py-1 rounded-lg">
                            -{product.discount}%
                          </span>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-black tracking-widest mb-2">
                                {product.subCategory || product.category}
                              </div>
                              <Link href={`/produit/${product.slug || id}`}>
                                <h3 className="font-black text-2xl text-gray-900 dark:text-white group-hover:text-yellow-500 transition mb-3">
                                  {product.name}
                                </h3>
                              </Link>
                              <div className="mb-4">{renderRating(product.rating)}</div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 max-w-2xl">
                                {product.description}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleFavorite(product)}
                              className={cn(
                                "p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-4",
                                isInFavorites(id) ? "text-red-500" : "text-gray-400"
                              )}
                            >
                              <Heart className={cn("h-5 w-5", isInFavorites(id) && "fill-current")} />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-baseline gap-3">
                            <span className="font-black text-3xl text-gray-900 dark:text-white">
                              {formatPrice(product.price)}
                            </span>
                            {product.oldPrice > 0 && (
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(product.oldPrice)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Link href={`/produit/${product.slug || id}`}>
                              <Button variant="outline" className="border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-yellow-500 hover:text-yellow-500 rounded-xl">
                                <Eye className="h-4 w-4 mr-2" />
                                Voir
                              </Button>
                            </Link>
                            <Button 
                              onClick={() => onAddToCart(product)}
                              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black uppercase italic tracking-widest rounded-xl"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Ajouter
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Results Count */}
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  Affichage de <span className="font-black text-gray-900 dark:text-white">{filteredProducts.length}</span> produits
                  {filteredProducts.length !== products.length && ` sur ${products.length}`}
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-yellow-500 hover:text-yellow-500 rounded-xl"
                >
                  Réinitialiser tous les filtres
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}