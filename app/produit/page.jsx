"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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
  StarHalf,
  Grid,
  List,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/cart-context";
import { useFavorites } from "../../context/favorites-context";
import { cn } from "../../lib/utils";

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
  SheetClose,
  SheetFooter,
} from "../../components/ui/sheet";
import { Separator } from "../../components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

// Import product data
import { products, categories, filters } from "../../data/product";

// SEO component for client components
function ProductSEO() {
  return (
    <>
      <title>Tous nos produits - Votre Boutique de Sport</title>
      <meta
        name="description"
        content="Découvrez notre gamme complète de produits pour l'aménagement et l'équipement de vos espaces sportifs et de loisirs. Livraison rapide et service de qualité."
      />
      <meta
        name="keywords"
        content="produits sportifs, équipement sportif, aménagement sportif, loisirs, fitness, musculation"
      />
      <meta
        property="og:title"
        content="Tous nos produits - Votre Boutique de Sport"
      />
      <meta
        property="og:description"
        content="Découvrez notre gamme complète de produits pour l'aménagement et l'équipement de vos espaces sportifs et de loisirs."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://votreboutique.com/produits" />
      <meta
        property="og:image"
        content="https://votreboutique.com/og-image.jpg"
      />
      <link rel="canonical" href="https://votreboutique.com/produits" />
    </>
  );
}

// Extract all unique subcategories from products
const allSubCategories = [...new Set(products
  .map(product => product.subCategory)
  .filter(Boolean)
  .sort())];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([filters.price.min, filters.price.max]);
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.subCategory?.toLowerCase().includes(query) ||
          (product.tags && product.tags.some(tag => 
            tag?.toLowerCase().includes(query)
          ))
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply subcategory filter - FIXED LOGIC
    // Only filter by subcategories if at least one is selected
    // This allows products to appear when subcategory filters are active
    if (selectedSubCategories.length > 0) {
      result = result.filter((product) => {
        // Include products that have a matching subcategory
        return product.subCategory && selectedSubCategories.includes(product.subCategory);
      });
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        Number.parseFloat(product.price) >= priceRange[0] &&
        Number.parseFloat(product.price) <= priceRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        return result.sort(
          (a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price)
        );
      case "price-desc":
        return result.sort(
          (a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price)
        );
      case "newest":
        return result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
      case "rating":
        return result.sort((a, b) => b.rating - a.rating);
      case "discount":
        return result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default: // "featured"
        return result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
    }
  }, [searchQuery, selectedCategories, selectedSubCategories, priceRange, sortOption]);

  // Pagination logic
  const displayedProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, filteredProducts, productsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedSubCategories, priceRange, sortOption]);

  // Scroll to top when page changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  const handleCategoryToggle = useCallback((category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleSubCategoryToggle = useCallback((subCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((sc) => sc !== subCategory)
        : [...prev, subCategory]
    );
  }, []);

  const handlePriceChange = useCallback((value) => {
    setPriceRange(value);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setPriceRange([filters.price.min, filters.price.max]);
    setSortOption("featured");
  }, []);

  const toggleFavorite = useCallback((product) => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }, [isInFavorites, addToFavorites, removeFromFavorites]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(4, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 3, 2);
      }

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const renderRating = useCallback((rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center" aria-label={`Note: ${rating} sur 5`}>
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
            aria-hidden="true"
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
            aria-hidden="true"
          />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star
            key={`empty-star-${i}`}
            className="w-4 h-4 text-gray-300"
            aria-hidden="true"
          />
        ))}
        <span className="ml-1 text-xs text-gray-500">({rating})</span>
      </div>
    );
  }, []);

  // Get active filters count for badge
  const activeFiltersCount = 
    (searchQuery ? 1 : 0) +
    selectedCategories.length +
    selectedSubCategories.length +
    (priceRange[0] > filters.price.min || priceRange[1] < filters.price.max ? 1 : 0);

  return (
    <>
      <ProductSEO />
      <main className="container mx-auto px-4 py-20 sm:py-24 md:py-28">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl text-yellow-500 font-bold mb-2">
            Tous nos produits
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Découvrez notre gamme complète de produits pour l'aménagement et
            l'équipement de vos espaces sportifs et de loisirs.
          </p>
        </header>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden flex items-center gap-2 h-10 relative"
                >
                  <Filter className="h-4 w-4" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[85vw] max-w-[350px] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Recherche</h3>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label="Effacer la recherche"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Catégories</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${category.id}`}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() =>
                              handleCategoryToggle(category.name)
                            }
                          />
                          <label
                            htmlFor={`mobile-category-${category.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Sous-catégories</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {allSubCategories.map((subCategory) => (
                        <div key={subCategory} className="flex items-center">
                          <Checkbox
                            id={`mobile-subcategory-${subCategory}`}
                            checked={selectedSubCategories.includes(subCategory)}
                            onCheckedChange={() => handleSubCategoryToggle(subCategory)}
                          />
                          <label
                            htmlFor={`mobile-subcategory-${subCategory}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {subCategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Prix</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={priceRange}
                        min={filters.price.min}
                        max={filters.price.max}
                        step={filters.price.step}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {formatPrice(priceRange[0])}
                        </span>
                        <span className="text-sm">
                          {formatPrice(priceRange[1])}
                        </span>
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
                      <Button className="bg-yellow-500 hover:bg-yellow-600">
                        Appliquer
                      </Button>
                    </SheetClose>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <div className="relative flex-1 min-w-[200px]">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
                aria-label="Rechercher un produit"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Effacer la recherche"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-10 whitespace-nowrap"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden xs:inline">Trier par</span>
                  <ChevronDown className="h-4 w-4 ml-0 xs:ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {filters.sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortOption(option.value)}
                    className="cursor-pointer"
                  >
                    <span className="flex items-center w-full justify-between">
                      {option.label}
                      {sortOption === option.value && (
                        <Check className="h-4 w-4" />
                      )}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden md:flex items-center border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "grid"
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
                aria-label="Vue en grille"
                aria-pressed={viewMode === "grid"}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "list"
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
                aria-label="Vue en liste"
                aria-pressed={viewMode === "list"}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">
                Filtres actifs:
              </span>

              <div className="flex flex-wrap gap-2 flex-1">
                {searchQuery && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 max-w-full"
                  >
                    <span className="truncate">Recherche: {searchQuery}</span>
                    <button
                      onClick={() => setSearchQuery("")}
                      aria-label="Supprimer le filtre de recherche"
                      className="hover:text-red-500"
                    >
                      <X className="h-3 w-3 flex-shrink-0" />
                    </button>
                  </Badge>
                )}

                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="flex items-center gap-1 max-w-full"
                  >
                    <span className="truncate">{category}</span>
                    <button
                      onClick={() => handleCategoryToggle(category)}
                      aria-label={`Supprimer le filtre de catégorie ${category}`}
                      className="hover:text-red-500"
                    >
                      <X className="h-3 w-3 flex-shrink-0" />
                    </button>
                  </Badge>
                ))}

                {selectedSubCategories.map((subCategory) => (
                  <Badge
                    key={subCategory}
                    variant="outline"
                    className="flex items-center gap-1 max-w-full"
                  >
                    <span className="truncate">{subCategory}</span>
                    <button
                      onClick={() => handleSubCategoryToggle(subCategory)}
                      aria-label={`Supprimer le filtre de sous-catégorie ${subCategory}`}
                      className="hover:text-red-500"
                    >
                      <X className="h-3 w-3 flex-shrink-0" />
                    </button>
                  </Badge>
                ))}

                {(priceRange[0] > filters.price.min ||
                  priceRange[1] < filters.price.max) && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 max-w-full"
                  >
                    <span className="truncate">
                      Prix: {formatPrice(priceRange[0])} -{" "}
                      {formatPrice(priceRange[1])}
                    </span>
                    <button
                      onClick={() =>
                        setPriceRange([filters.price.min, filters.price.max])
                      }
                      aria-label="Supprimer le filtre de prix"
                      className="hover:text-red-500"
                    >
                      <X className="h-3 w-3 flex-shrink-0" />
                    </button>
                  </Badge>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs ml-auto hover:text-red-500 hover:bg-red-50"
              >
                Effacer tout
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Recherche</h3>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Catégories</h3>
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={() => setSelectedCategories([])}
                      className="text-xs text-gray-500 hover:text-red-500"
                    >
                      Effacer
                    </button>
                  )}
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() =>
                          handleCategoryToggle(category.name)
                        }
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Sous-catégories</h3>
                  {selectedSubCategories.length > 0 && (
                    <button
                      onClick={() => setSelectedSubCategories([])}
                      className="text-xs text-gray-500 hover:text-red-500"
                    >
                      Effacer
                    </button>
                  )}
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {allSubCategories.map((subCategory) => (
                    <div key={subCategory} className="flex items-center">
                      <Checkbox
                        id={`subcategory-${subCategory}`}
                        checked={selectedSubCategories.includes(subCategory)}
                        onCheckedChange={() => handleSubCategoryToggle(subCategory)}
                      />
                      <label
                        htmlFor={`subcategory-${subCategory}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        {subCategory}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Prix</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={priceRange}
                    min={filters.price.min}
                    max={filters.price.max}
                    step={filters.price.step}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {formatPrice(priceRange[0])}
                    </span>
                    <span className="text-sm">
                      {formatPrice(priceRange[1])}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                Réinitialiser tous les filtres
              </Button>
            </div>
          </aside>

          <section className="flex-1" aria-label="Liste des produits">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse"
                    aria-hidden="true"
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
                <div className="mb-4 text-gray-400">
                  <Search className="h-12 w-12 mx-auto" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Essayez de modifier vos filtres ou votre recherche.
                </p>
                <Button onClick={clearFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <motion.div
                className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {displayedProducts.map((product) => (
                  <motion.article
                    key={`${product.id}-${product.name}`}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow h-full flex flex-col group"
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                  >
                    <div className="relative h-40 xs:h-48 overflow-hidden">
                      <Link href={`/produit/${product.slug || product.id}`}>
                        <Image
                          src={
                            product.image ||
                            "/placeholder.svg?height=192&width=256" ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          priority={currentPage === 1 && product.id <= 4}
                        />
                      </Link>
                      <div className="absolute top-2 right-2 z-10">
                        <button
                          onClick={() => toggleFavorite(product)}
                          className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200",
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
                              "h-4 w-4 transition-transform duration-200",
                              isInFavorites(product.id) && "fill-red-500"
                            )}
                          />
                        </button>
                      </div>
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 border-0">
                          Nouveau
                        </Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600 border-0">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="p-3 xs:p-4 flex flex-col flex-grow">
                      <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                        {product.category}
                        {product.subCategory && ` • ${product.subCategory}`}
                      </div>
                      <Link
                        href={`/produit/${product.slug || product.id}`}
                        className="group"
                      >
                        <h2 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 text-sm xs:text-base">
                          {product.name}
                        </h2>
                      </Link>
                      <div className="mb-2">{renderRating(product.rating)}</div>
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <div className="flex flex-col xs:flex-row xs:items-center">
                          <span className="text-base xs:text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(product.price)}
                          </span>
                          {product.oldPrice && (
                            <span className="xs:ml-2 text-xs line-through text-gray-500">
                              {formatPrice(product.oldPrice)}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="h-8 bg-yellow-500 hover:bg-yellow-600 w-8 p-0"
                          aria-label={`Ajouter ${product.name} au panier`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {displayedProducts.map((product) => (
                  <motion.article
                    key={product.id}
                    className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group"
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                  >
                    <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden">
                      <Link href={`/produit/${product.slug || product.id}`}>
                        <Image
                          src={
                            product.image ||
                            "/placeholder.svg?height=192&width=192" ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 192px"
                          priority={currentPage === 1 && product.id <= 4}
                        />
                      </Link>
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 border-0">
                          Nouveau
                        </Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600 border-0">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                        {product.category}
                        {product.subCategory && ` • ${product.subCategory}`}
                      </div>
                      <Link
                        href={`/produit/${product.slug || product.id}`}
                        className="group"
                      >
                        <h2 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                          {product.name}
                        </h2>
                      </Link>
                      <div className="mb-2">{renderRating(product.rating)}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center">
                          {product.oldPrice ? (
                            <>
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </span>
                              <span className="ml-2 text-sm line-through text-gray-500">
                                {formatPrice(product.oldPrice)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {formatPrice(product.price)}
                            </span>
                          )}
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
                          </Button>
                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600"
                            onClick={() => addToCart(product)}
                            aria-label={`Ajouter ${product.name} au panier`}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}

            {!isLoading && filteredProducts.length > 0 && (
              <div className="mt-8">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Affichage de {displayedProducts.length} produit
                  {displayedProducts.length > 1 ? "s" : ""} sur{" "}
                  {filteredProducts.length}
                </div>

                {totalPages > 1 && (
                  <nav aria-label="Pagination des produits">
                    <Pagination>
                      <PaginationContent className="flex flex-wrap justify-center">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            className={cn(
                              "cursor-pointer",
                              currentPage === 1 &&
                                "pointer-events-none opacity-50"
                            )}
                            aria-disabled={currentPage === 1}
                          />
                        </PaginationItem>

                        {getPageNumbers().map((pageNumber, index) => {
                          const isMobile =
                            typeof window !== "undefined" &&
                            window.innerWidth < 480;
                          if (
                            isMobile &&
                            pageNumber !== 1 &&
                            pageNumber !== totalPages &&
                            pageNumber !== currentPage &&
                            pageNumber !== "..."
                          ) {
                            return null;
                          }

                          return pageNumber === "..." ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                              <span className="px-3 py-1">...</span>
                            </PaginationItem>
                          ) : (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                onClick={() => setCurrentPage(pageNumber)}
                                isActive={currentPage === pageNumber}
                                className="cursor-pointer"
                                aria-current={
                                  currentPage === pageNumber
                                    ? "page"
                                    : undefined
                                }
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            className={cn(
                              "cursor-pointer",
                              currentPage === totalPages &&
                                "pointer-events-none opacity-50"
                            )}
                            aria-disabled={currentPage === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </nav>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}