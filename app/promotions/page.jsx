"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Heart,
  ShoppingCart,
  X,
  Check,
  ArrowUpDown,
  Star,
  Tag,
  Sparkles,
  Flame,
  Package,
  Percent,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import product data
import { categories, filters, productUtils } from "@/data/product";
import { useSearchParams } from "next/navigation";

// Main page component with Suspense boundary
export default function PromotionsPage() {
  return (
    <Suspense fallback={<PromotionsLoading />}>
      <PromotionsContent />
    </Suspense>
  );
}

// Loading state component
function PromotionsLoading() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-lg">
          Chargement des promotions...
        </div>
      </div>
    </div>
  );
}

// Main content component
function PromotionsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([
    filters.price.min,
    filters.price.max,
  ]);
  const [sortOption, setSortOption] = useState("discount");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  const searchParams = useSearchParams();
  const promotionType = searchParams.get("type");

  // Get discounted products
  const discountedProducts = useMemo(
    () => productUtils.getDiscountedProducts(),
    []
  );

  // Filter products based on promotion type from URL
  const typeFilteredProducts = useMemo(() => {
    if (!promotionType) return discountedProducts;

    switch (promotionType) {
      case "summer":
        return discountedProducts.filter(
          (product) =>
            product.tags?.includes("summer") ||
            product.discount >= 20 ||
            product.category === "Textiles" ||
            product.name.toLowerCase().includes("été")
        );
      case "current":
        return discountedProducts.filter(
          (product) => product.isNew || product.isFeatured
        );
      case "bundle":
        return discountedProducts.filter(
          (product) =>
            product.tags?.includes("bundle") ||
            product.tags?.includes("pack") ||
            product.name.toLowerCase().includes("pack") ||
            product.name.toLowerCase().includes("ensemble")
        );
      case "clearance":
        return discountedProducts.filter((product) => product.discount >= 30);
      default:
        return discountedProducts;
    }
  }, [discountedProducts, promotionType]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...typeFilteredProducts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.category && product.category.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        break;
    }

    return result;
  }, [
    typeFilteredProducts,
    searchQuery,
    selectedCategories,
    priceRange,
    sortOption,
  ]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([filters.price.min, filters.price.max]);
    setSortOption("discount");
  };

  const toggleFavorite = (product) => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
    }).format(price);
  };

  // Render star rating
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-1 text-xs text-gray-500">({rating})</span>
      </div>
    );
  };

  // Get promotion banner based on type
  const getPromotionBanner = () => {
    if (!promotionType) {
      return (
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-12 bg-gradient-to-r from-red-600 to-yellow-500">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Offres Spéciales
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-6 max-w-xl">
              Jusqu'à <span className="font-bold text-white">40%</span> de
              réduction sur une sélection de produits
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/promotions?type=summer">
                <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30">
                  Soldes d'été
                </Button>
              </Link>
              <Link href="/promotions?type=current">
                <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30">
                  Offres du moment
                </Button>
              </Link>
              <Link href="/promotions?type=bundle">
                <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30">
                  Packs économiques
                </Button>
              </Link>
              <Link href="/promotions?type=clearance">
                <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30">
                  Déstockage
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 opacity-20">
            <Tag className="w-full h-full" />
          </div>
        </div>
      );
    }

    switch (promotionType) {
      case "summer":
        return (
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-12 bg-gradient-to-r from-blue-500 to-cyan-400">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                <Sparkles className="h-4 w-4 mr-1" /> Promotion saisonnière
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Soldes d'Été
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-6 max-w-xl">
                Profitez de nos offres spéciales d'été avec jusqu'à{" "}
                <span className="font-bold text-white">30%</span> de réduction
                sur une sélection de produits.
              </p>
              <div className="flex gap-3">
                <Link href="/promotions">
                  <Button
                    variant="outline"
                    className="border-white  text-blue-500 hover:bg-white/20"
                  >
                    Toutes les promotions
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 md:w-64 md:h-64 opacity-20">
              <svg viewBox="0 0 24 24" className="w-full h-full text-white">
                <path
                  fill="currentColor"
                  d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z"
                />
              </svg>
            </div>
          </div>
        );
      case "current":
        return (
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-12 bg-gradient-to-r from-green-500 to-emerald-400">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                <Flame className="h-4 w-4 mr-1" /> Tendances
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Offres du Moment
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-6 max-w-xl">
                Découvrez nos promotions en cours sur nos nouveautés et produits
                les plus populaires.
              </p>
              <div className="flex gap-3">
                <Link href="/promotions">
                  <Button
                    variant="outline"
                    className="border-white text-green-500 hover:bg-white/20"
                  >
                    Toutes les promotions
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 md:w-64 md:h-64 opacity-20">
              <Flame className="w-full h-full" />
            </div>
          </div>
        );
      case "bundle":
        return (
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-12 bg-gradient-to-r from-purple-600 to-indigo-500">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                <Package className="h-4 w-4 mr-1" /> Économies
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Packs Économiques
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-6 max-w-xl">
                Économisez en achetant nos packs et ensembles spécialement
                conçus pour répondre à tous vos besoins.
              </p>
              <Link href={"/promotions"}>
                <div className="flex gap-3">
                  <Button className="bg-white text-purple-600 hover:bg-purple-50">
                    Toutes les promotions
                  </Button>
                </div>
              </Link>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 md:w-64 md:h-64 opacity-20">
              <Package className="w-full h-full" />
            </div>
          </div>
        );
      case "clearance":
        return (
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-12 bg-gradient-to-r from-red-600 to-orange-500">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                <Percent className="h-4 w-4 mr-1" /> Prix cassés
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Déstockage
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-6 max-w-xl">
                Dernières pièces à prix cassés ! Profitez de remises
                exceptionnelles sur nos produits en fin de série.
              </p>
              <div className="flex gap-3">
                <Link href="/promotions">
                  <Button
                    variant="outline"
                    className="border-white  text-red-500 hover:bg-white/20"
                  >
                    Toutes les promotions
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 md:w-64 md:h-64 opacity-20">
              <Percent className="w-full h-full" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-32">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-yellow-400 font-bold mb-2">Promotions</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Découvrez nos offres spéciales et profitez de réductions
          exceptionnelles sur une sélection de produits.
        </p>
      </div>

      {/* Hero Banner */}
      {getPromotionBanner()}

      {/* Promotion Types Tabs */}
      <Tabs defaultValue={promotionType || "all"} className="mb-8">
        <TabsList className="w-full justify-start overflow-x-auto pb-px mb-6 flex-nowrap">
          <TabsTrigger value="all" asChild>
            <Link href="/promotions" className="text-sm">
              Toutes les promotions
            </Link>
          </TabsTrigger>
          <TabsTrigger value="summer" asChild>
            <Link href="/promotions?type=summer" className="text-sm">
              Soldes d'été
            </Link>
          </TabsTrigger>
          <TabsTrigger value="current" asChild>
            <Link href="/promotions?type=current" className="text-sm">
              Offres du moment
            </Link>
          </TabsTrigger>
          <TabsTrigger value="bundle" asChild>
            <Link href="/promotions?type=bundle" className="text-sm">
              Packs économiques
            </Link>
          </TabsTrigger>
          <TabsTrigger value="clearance" asChild>
            <Link href="/promotions?type=clearance" className="text-sm">
              Déstockage
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="w-full md:w-auto flex items-center gap-2">
          {/* Mobile Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="md:hidden flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[350px] overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Catégories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => handleCategoryToggle(category.name)}
                          className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <label
                          htmlFor={`mobile-category-${category.id}`}
                          className="ml-2 text-sm font-medium"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Prix</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor="minPrice"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Min
                      </label>
                      <Input
                        type="number"
                        id="minPrice"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        min={filters.price.min}
                        max={priceRange[1]}
                        className="w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="maxPrice"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Max
                      </label>
                      <Input
                        type="number"
                        id="maxPrice"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        min={priceRange[0]}
                        max={filters.price.max}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={clearFilters}>
                    Réinitialiser
                  </Button>
                  <SheetClose asChild>
                    <Button>Appliquer</Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Search Bar */}
          <div className="relative w-full md:w-[300px]">
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="w-full md:w-auto flex items-center gap-2">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Trier par
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {filters.sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortOption(option.value)}
                >
                  <span className="flex items-center w-full">
                    {option.label}
                    {sortOption === option.value && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center border rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "grid"
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              )}
              aria-label="Grid view"
            >
              <div className="grid grid-cols-2 gap-1">
                <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "list"
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              )}
              aria-label="List view"
            >
              <div className="flex flex-col gap-1">
                <div className="w-4 h-1 rounded-sm bg-current"></div>
                <div className="w-4 h-1 rounded-sm bg-current"></div>
                <div className="w-4 h-1 rounded-sm bg-current"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 ||
        priceRange[0] > filters.price.min ||
        priceRange[1] < filters.price.max ||
        searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Filtres actifs:
          </span>

          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              Recherche: {searchQuery}
              <button onClick={() => setSearchQuery("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="flex items-center gap-1"
            >
              {category}
              <button onClick={() => handleCategoryToggle(category)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          {(priceRange[0] > filters.price.min ||
            priceRange[1] < filters.price.max) && (
            <Badge variant="outline" className="flex items-center gap-1">
              Prix: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              <button
                onClick={() =>
                  setPriceRange([filters.price.min, filters.price.max])
                }
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            Effacer tous les filtres
          </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Catégories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryToggle(category.name)}
                      className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-medium"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Prix</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="desktopMinPrice"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Min
                    </label>
                    <Input
                      type="number"
                      id="desktopMinPrice"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      min={filters.price.min}
                      max={priceRange[1]}
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="desktopMaxPrice"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Max
                    </label>
                    <Input
                      type="number"
                      id="desktopMaxPrice"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      min={priceRange[0]}
                      max={filters.price.max}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <Button variant="outline" onClick={clearFilters} className="w-full">
              Réinitialiser les filtres
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4 text-yellow-400">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg text-yellow-400 font-medium mb-2">
                Aucun produit en promotion trouvé
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Essayez de modifier vos filtres ou votre recherche.
              </p>
              <Button onClick={clearFilters} className="bg-yellow-400">Réinitialiser les filtres</Button>
            </div>
          ) : viewMode === "grid" ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  variants={itemVariants}
                >
                  <div className="relative h-48 overflow-hidden group">
                    <Image
                      src={
                        product.image || "/placeholder.svg?height=192&width=256"
                      }
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        onClick={() => toggleFavorite(product)}
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                          isInFavorites(product.id)
                            ? "bg-red-50 text-red-500 hover:bg-red-100"
                            : "bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-red-50"
                        )}
                        aria-label={
                          isInFavorites(product.id)
                            ? "Retirer des favoris"
                            : "Ajouter aux favoris"
                        }
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            isInFavorites(product.id) && "fill-red-500"
                          )}
                        />
                      </button>
                    </div>
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                        Nouveau
                      </Badge>
                    )}
                    <Badge className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600">
                      -{product.discount}%
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                      {product.category}
                    </div>
                    <Link href={`/product/${product.slug || product.id}`}>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mb-2">{renderRating(product.rating)}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(product.price)}
                        </span>
                        <span className="ml-2 text-sm line-through text-gray-500">
                          {formatPrice(product.oldPrice)}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="h-8 bg-yellow-500 w-8 p-0"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  variants={itemVariants}
                >
                  <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden">
                    <Image
                      src={
                        product.image || "/placeholder.svg?height=192&width=192"
                      }
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 192px"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                        Nouveau
                      </Badge>
                    )}
                    <Badge className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600">
                      -{product.discount}%
                    </Badge>
                  </div>
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                      {product.category}
                    </div>
                    <Link href={`/product/${product.slug || product.id}`}>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mb-2">{renderRating(product.rating)}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(product.price)}
                        </span>
                        <span className="ml-2 text-sm line-through text-gray-500">
                          {formatPrice(product.oldPrice)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleFavorite(product)}
                          className={cn(
                            "h-8 w-8 p-0",
                            isInFavorites(product.id) &&
                              "text-red-500 border-red-200 hover:text-red-600 hover:border-red-300"
                          )}
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4",
                              isInFavorites(product.id) && "fill-red-500"
                            )}
                          />
                        </Button>
                        <Button size="sm" onClick={() => addToCart(product)}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Results count */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Affichage de {filteredProducts.length} produit
              {filteredProducts.length > 1 ? "s" : ""} en promotion
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
