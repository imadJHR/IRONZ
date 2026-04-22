"use client";

import React, { useState, useEffect, ReactNode } from "react";
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
  Package,
  Flame,
  Zap,
  Award,
  Sparkles,
  Truck,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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

// --- TYPES & INTERFACES ---

interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  slug: string;
  category: string;
  subCategory?: string;
  description?: string;
  isNewProduct?: boolean;
  isFeatured?: boolean;
  discount?: number;
  rating?: number;
  tags?: string[];
  createdAt: string;
}

interface CategoryIcons {
  [key: string]: ReactNode;
}

interface CloudImgProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  cloudinary?: boolean;
}

// --- HELPERS ---

const createSlug = (text: string): string => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const CATEGORY_ICONS: CategoryIcons = {
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

function CloudImg({ src, alt, fill = false, className = "", cloudinary = true }: CloudImgProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || PLACEHOLDER);

  useEffect(() => {
    if (cloudinary && src && typeof src === "string") {
      const transformedSrc = src.startsWith("http")
        ? src
        : `https://res.cloudinary.com/dypjgpisl/image/upload/q_auto,f_auto/${src}`;
      setImgSrc(transformedSrc);
    } else {
      setImgSrc(PLACEHOLDER);
    }
  }, [src, cloudinary]);

  const handleError = () => setImgSrc(PLACEHOLDER);

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
  const slug = params?.slug?.toString();

  // --- STATE ---
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryIcon, setCategoryIcon] = useState<ReactNode>(<Package className="h-5 w-5" />);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([]);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("featured");
  
  // UI
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
        
        let allProducts: Product[] = [];
        if (Array.isArray(json)) allProducts = json;
        else if (json.data && Array.isArray(json.data)) allProducts = json.data;
        else if (json.products && Array.isArray(json.products)) allProducts = json.products;

        const targetSlug = slug.toLowerCase();
        
        const catProducts = allProducts.filter(p => {
            if (!p.category) return false;
            return createSlug(p.category) === targetSlug;
        });

        setProducts(catProducts);
        setFilteredProducts(catProducts);

        if (catProducts.length > 0) {
            setCategoryName(catProducts[0].category);
        } else {
            setCategoryName(slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "));
        }

        const matchedIconKey = Object.keys(CATEGORY_ICONS).find(key => targetSlug.includes(key));
        if (matchedIconKey) {
            setCategoryIcon(CATEGORY_ICONS[matchedIconKey]);
        }

        const subCats = [...new Set(catProducts.map(p => p.subCategory).filter((s): s is string => !!s))];
        setAvailableSubCategories(subCats.sort());

        if (catProducts.length > 0) {
            const maxP = Math.max(...catProducts.map(p => p.price || 0));
            setPriceRange([0, Math.ceil(maxP * 1.1)]);
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

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          (p.tags && p.tags.some((tag) => tag?.toLowerCase().includes(query)))
      );
    }

    result = result.filter(
      (p) => (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]
    );

    if (selectedSubCategories.length > 0) {
      result = result.filter(p => 
        p.subCategory && selectedSubCategories.includes(p.subCategory)
      );
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? 1 : -1));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, priceRange, sortOption, selectedSubCategories]);

  // --- HANDLERS ---
  const handlePriceChange = (value: number[]) => setPriceRange(value);
  
  const handleSubCategoryToggle = (subCat: string) => {
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

  const toggleFavorite = (product: Product) => {
    const id = (product._id || product.id) as string;
    if (isInFavorites(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ 
        id, 
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug
      });
    }
  };

  const onAddToCart = (product: Product) => {
    addToCart({ 
      ...product, 
      id: (product._id || product.id) as string, 
      quantity: 1 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  const renderRating = (rating: number | undefined) => {
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  // --- RENDER LOADING ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-48 md:w-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 md:pt-32 pb-16">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="mb-12">
          <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-yellow-500 transition-colors">ACCUEIL</Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            <Link href="/categories" className="hover:text-yellow-500 transition-colors">CATÉGORIES</Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-gray-900 dark:text-white font-bold uppercase truncate max-w-[150px] md:max-w-none">
              {categoryName}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <div className="flex items-start md:items-center gap-4 mb-4">
                <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-yellow-500/30">
                  {categoryIcon}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white leading-none break-words">
                  {categoryName} <span className="text-yellow-500 block sm:inline">Collection</span>
                </h1>
              </div>
              <div className="h-2 w-24 bg-yellow-500 mt-4 rounded-full" />
            </div>
            <Link href="/produit" className="text-gray-400 hover:text-yellow-500 font-black uppercase italic text-xs md:text-sm transition-colors flex items-center gap-2">
              <ArrowLeft size={16} /> Voir tous les produits
            </Link>
          </div>
          <div className="max-w-3xl">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg border-l-4 border-yellow-500 pl-6 py-2">
              Découvrez notre sélection premium pour {categoryName}. 
              Des produits de qualité professionnelle pour vos entraînements.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-2xl md:text-3xl font-black text-yellow-500 mb-1 md:mb-2">{products.length}</div>
            <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Produits</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-2xl md:text-3xl font-black text-yellow-500 mb-1 md:mb-2">{availableSubCategories.length}</div>
            <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Sous-catégories</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-lg md:text-3xl font-black text-yellow-500 mb-1 md:mb-2 truncate">
              {products.length > 0 ? formatPrice(Math.min(...products.map(p => p.price || 0))) : "-"}
            </div>
            <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Prix min</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-lg md:text-3xl font-black text-yellow-500 mb-1 md:mb-2 truncate">
               {products.length > 0 ? formatPrice(Math.max(...products.map(p => p.price || 0))) : "-"}
            </div>
            <div className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Prix max</div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-4 md:p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden w-full sm:w-auto gap-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 h-12">
                    <Filter className="h-4 w-4" /> Filtres
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] sm:w-[400px] overflow-y-auto bg-white dark:bg-gray-900 z-[100] p-6">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-xl font-black uppercase italic text-left">Filtres</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-8">
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
                              />
                              <Label htmlFor={`mobile-sub-${sub}`} className="text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300 py-1">{sub}</Label>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-6" />
                      </div>
                    )}
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
                        <div className="flex items-center justify-between text-sm font-black text-gray-900 dark:text-white">
                          <span>{formatPrice(priceRange[0])}</span>
                          <span>{formatPrice(priceRange[1])}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SheetFooter className="mt-8 pb-8">
                    <Button onClick={() => setIsFilterOpen(false)} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black py-6 rounded-xl">
                      Voir {filteredProducts.length} produits
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <div className="relative w-full sm:flex-1 lg:w-[320px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-yellow-500 w-full"
                />
                {searchQuery && (
                  <X 
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" 
                    onClick={() => setSearchQuery("")} 
                  />
                )}
              </div>
            </div>

            <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 w-full sm:min-w-[160px] justify-between rounded-xl border-2 border-gray-200 h-12">
                    <span className="truncate font-medium">
                      {sortOption === "featured" && "Populaires"}
                      {sortOption === "newest" && "Nouveautés"}
                      {sortOption === "price-asc" && "Prix croissant"}
                      {sortOption === "price-desc" && "Prix décroissant"}
                      {sortOption === "rating" && "Mieux notés"}
                    </span>
                    <ArrowUpDown className="h-4 w-4 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] z-[50]">
                  <DropdownMenuItem onClick={() => setSortOption("featured")}>Populaires</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("newest")}>Nouveautés</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("price-asc")}>Prix croissant</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("price-desc")}>Prix décroissant</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("rating")}>Mieux notés</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button 
                  onClick={() => setViewMode("grid")} 
                  className={cn(
                    "p-2 rounded-lg transition-colors", 
                    viewMode === "grid" 
                      ? "bg-white dark:bg-gray-700 text-yellow-500 shadow-sm" 
                      : "text-gray-500"
                  )}
                  aria-label="Vue grille"
                >
                  <Package className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode("list")} 
                  className={cn(
                    "p-2 rounded-lg transition-colors", 
                    viewMode === "list" 
                      ? "bg-white dark:bg-gray-700 text-yellow-500 shadow-sm" 
                      : "text-gray-500"
                  )}
                  aria-label="Vue liste"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Badges */}
        <AnimatePresence>
          {(priceRange[0] > 0 || priceRange[1] < 20000 || searchQuery || selectedSubCategories.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }} 
              className="flex flex-wrap items-center gap-2 mb-8 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
            >
              <span className="text-sm font-black uppercase text-gray-500">Filtres:</span>
              {searchQuery && (
                <Badge className="gap-2 rounded-xl">
                  &quot;{searchQuery}&quot;
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {selectedSubCategories.map(sub => (
                <Badge key={sub} className="gap-2 rounded-xl">
                  {sub}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleSubCategoryToggle(sub)} />
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 20000) && (
                <Badge className="gap-2 rounded-xl">
                  Prix: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 20000])} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500 text-xs">
                Tout effacer
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="text-xl font-black uppercase italic mb-6">
                  <Filter className="inline h-5 w-5 mr-2" />Filtres
                </h3>
                {availableSubCategories.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-black uppercase text-sm mb-4">Sous-catégories</h4>
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                      {availableSubCategories.map((sub) => (
                        <div key={sub} className="flex items-center space-x-3">
                          <Checkbox 
                            id={`desktop-sub-${sub}`} 
                            checked={selectedSubCategories.includes(sub)} 
                            onCheckedChange={() => handleSubCategoryToggle(sub)} 
                          />
                          <Label 
                            htmlFor={`desktop-sub-${sub}`} 
                            className="text-sm font-medium cursor-pointer hover:text-yellow-500 transition-colors"
                          >
                            {sub}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-6" />
                  </div>
                )}
                <div>
                  <h4 className="font-black uppercase text-sm mb-4">Prix</h4>
                  <Slider 
                    defaultValue={[0, 20000]} 
                    min={0} 
                    max={20000} 
                    step={100} 
                    value={priceRange} 
                    onValueChange={handlePriceChange} 
                    className="mb-8" 
                  />
                  <div className="flex items-center justify-between text-sm font-black">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200">
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-6" />
                <h3 className="text-xl font-black mb-4">Aucun produit trouvé</h3>
                <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <motion.div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                )}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.map((product) => {
                  const id = (product._id || product.id) as string;
                  return (
                    <motion.div
                      key={id}
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className={cn(
                        "group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500",
                        viewMode === "list" && "flex flex-col sm:flex-row"
                      )}
                    >
                      <div className={cn(
                        "relative overflow-hidden bg-gray-50", 
                        viewMode === "grid" ? "h-64 sm:h-72" : "w-full sm:w-64 h-64 sm:h-auto flex-shrink-0"
                      )}>
                        <Link href={`/produit/${product.slug || id}`}>
                          <CloudImg 
                            fill 
                            src={product.image} 
                            alt={product.name} 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                        </Link>
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.isNewProduct && (
                            <span className="bg-green-500 text-white text-xs font-black uppercase px-2 py-1 rounded-lg">
                              Nouveau
                            </span>
                          )}
                          {Number(product.discount) > 0 && (
                            <span className="bg-red-500 text-white text-xs font-black uppercase px-2 py-1 rounded-lg">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => toggleFavorite(product)} 
                          className={cn(
                            "absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all", 
                            isInFavorites(id) ? "text-red-500" : "text-gray-400"
                          )}
                          aria-label={isInFavorites(id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                        >
                          <Heart className={cn("w-5 h-5", isInFavorites(id) && "fill-current")} />
                        </button>
                      </div>

                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">
                          {product.subCategory || product.category}
                        </div>
                        <Link href={`/produit/${product.slug || id}`} className="mb-3">
                          <h3 className="font-black text-lg md:text-xl text-gray-900 dark:text-white line-clamp-2 min-h-[3rem] group-hover:text-yellow-500 transition">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="mb-4">{renderRating(product.rating)}</div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                          <div>
                            <div className="font-black text-xl text-gray-900 dark:text-white">
                              {formatPrice(product.price)}
                            </div>
                            {product.oldPrice > 0 && (
                              <div className="text-xs text-gray-400 line-through">
                                {formatPrice(product.oldPrice)}
                              </div>
                            )}
                          </div>
                          <Button 
                            size="icon" 
                            className="rounded-full bg-yellow-500 text-black shadow-lg hover:bg-yellow-600" 
                            onClick={() => onAddToCart(product)}
                            aria-label={`Ajouter ${product.name} au panier`}
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm font-medium">
                Affichage de <span className="font-black text-gray-900 dark:text-white">{filteredProducts.length}</span> produits
              </p>
              <Button variant="outline" onClick={clearFilters} className="rounded-xl w-full sm:w-auto">
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}