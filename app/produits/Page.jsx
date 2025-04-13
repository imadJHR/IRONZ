"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { cn } from "@/lib/utils";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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

// Import product data
import { products, categories, filters, productUtils } from "@/data/product";

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([
    filters.price.min,
    filters.price.max,
  ]);
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  const featuredProducts = productUtils.getFeaturedProducts();
  const newProducts = productUtils.getNewProducts();
  const discountedProducts = productUtils.getDiscountedProducts();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

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
      // featured is default, no sorting needed
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategories, priceRange, sortOption]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([filters.price.min, filters.price.max]);
    setSortOption("featured");
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
          <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-1 text-xs text-gray-500">({rating})</span>
      </div>
    );
  };

  return (
    <>
      
      <div className="container mx-auto px-4 py-28">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tous nos produits</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Découvrez notre gamme complète de produits pour l'aménagement et
            l'équipement de vos espaces sportifs et de loisirs.
          </p>
        </div>

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
                          <Checkbox
                            id={`mobile-category-${category.id}`}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() =>
                              handleCategoryToggle(category.name)
                            }
                          />
                          <label
                            htmlFor={`mobile-category-${category.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
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
                Prix: {formatPrice(priceRange[0])} -{" "}
                {formatPrice(priceRange[1])}
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
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() =>
                          handleCategoryToggle(category.name)
                        }
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                className="w-full"
              >
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
                <div className="mb-4 text-gray-400">
                  <Search className="h-12 w-12 mx-auto" />
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
                          product.image ||
                          "/placeholder.svg?height=192&width=256"
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
                      {product.discount > 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                        {product.category}
                      </div>
                      <Link href={`/produits/${product.slug || product.id}`}>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="mb-2">{renderRating(product.rating)}</div>
                      <div className="flex items-center justify-between mt-2">
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
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="h-8 w-8 p-0"
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
                          product.image ||
                          "/placeholder.svg?height=192&width=192"
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
                      {product.discount > 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                        {product.category}
                      </div>
                      <Link href={`/produits/${product.slug || product.id}`}>
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
                {filteredProducts.length > 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
