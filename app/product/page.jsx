"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, ChevronDown, Heart, ShoppingCart, X, Check, ArrowUpDown, Star, StarHalf } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Import product data
import { products, categories, filters } from "@/data/product"

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
      <meta property="og:title" content="Tous nos produits - Votre Boutique de Sport" />
      <meta
        property="og:description"
        content="Découvrez notre gamme complète de produits pour l'aménagement et l'équipement de vos espaces sportifs et de loisirs."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://votreboutique.com/produits" />
      <meta property="og:image" content="https://votreboutique.com/og-image.jpg" />
      <link rel="canonical" href="https://votreboutique.com/produits" />
    </>
  )
}

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([filters.price.min, filters.price.max])
  const [sortOption, setSortOption] = useState("featured")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12) // Number of products per page

  const { addToCart } = useCart()
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites()

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Reduced loading time for better UX
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort products
  useEffect(() => {
    let result = [...products]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.category && product.category.toLowerCase().includes(query)) ||
          (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(query))),
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        Number.parseFloat(product.price) >= priceRange[0] && Number.parseFloat(product.price) <= priceRange[1],
    )

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
        break
      case "price-desc":
        result.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
        break
      case "newest":
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return 0
        })
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0))
        break
      // featured is default, no sorting needed
      default:
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return 0
        })
        break
    }

    setFilteredProducts(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedCategories, priceRange, sortOption])

  // Pagination logic
  useEffect(() => {
    // Calculate current products
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    setDisplayedProducts(currentProducts)

    // Scroll to top when page changes
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [currentPage, filteredProducts, productsPerPage])

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handlePriceChange = (value) => {
    setPriceRange(value)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setPriceRange([filters.price.min, filters.price.max])
    setSortOption("featured")
  }

  const toggleFavorite = (product) => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5 // Maximum number of visible page buttons

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)

      // Calculate start and end pages
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're at the beginning
      if (currentPage <= 3) {
        endPage = Math.min(4, totalPages - 1)
      }
      // Adjust if we're at the end
      else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 3, 2)
      }

      // Add ellipsis if needed after first page
      if (startPage > 2) {
        pageNumbers.push("...")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis if needed before last page
      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced for better performance
      },
    },
  }

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
  }

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Render star rating
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center" aria-label={`Note: ${rating} sur 5`}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" aria-hidden="true" />
        ))}
        <span className="ml-1 text-xs text-gray-500">({rating})</span>
      </div>
    )
  }

  return (
    <>
      <ProductSEO />
      <main className="container mx-auto px-4 py-20 sm:py-24 md:py-28">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl text-yellow-500 font-bold mb-2">Tous nos produits</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Découvrez notre gamme complète de produits pour l'aménagement et l'équipement de vos espaces sportifs et de
            loisirs.
          </p>
        </header>

        {/* Filters and Search Bar */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search and Filter Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden flex items-center gap-2 h-10">
                  <Filter className="h-4 w-4" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-[350px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Catégories</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${category.id}`}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() => handleCategoryToggle(category.name)}
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
                        <span className="text-sm">{formatPrice(priceRange[0])}</span>
                        <span className="text-sm">{formatPrice(priceRange[1])}</span>
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
                      <Button className="bg-yellow-500 hover:bg-yellow-600">Appliquer</Button>
                    </SheetClose>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Search Bar */}
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

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 h-10 whitespace-nowrap">
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden xs:inline">Trier par</span>
                  <ChevronDown className="h-4 w-4 ml-0 xs:ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {filters.sortOptions.map((option) => (
                  <DropdownMenuItem key={option.value} onClick={() => setSortOption(option.value)}>
                    <span className="flex items-center w-full">
                      {option.label}
                      {sortOption === option.value && <Check className="ml-auto h-4 w-4" />}
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
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                )}
                aria-label="Vue en grille"
                aria-pressed={viewMode === "grid"}
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
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                )}
                aria-label="Vue en liste"
                aria-pressed={viewMode === "list"}
              >
                <div className="flex flex-col gap-1">
                  <div className="w-4 h-1 rounded-sm bg-current"></div>
                  <div className="w-4 h-1 rounded-sm bg-current"></div>
                  <div className="w-4 h-1 rounded-sm bg-current"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 ||
            priceRange[0] > filters.price.min ||
            priceRange[1] < filters.price.max ||
            searchQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">Filtres:</span>

              <div className="flex flex-wrap gap-2 flex-1">
                {searchQuery && (
                  <Badge variant="outline" className="flex items-center gap-1 max-w-full">
                    <span className="truncate">Recherche: {searchQuery}</span>
                    <button onClick={() => setSearchQuery("")} aria-label="Supprimer le filtre de recherche">
                      <X className="h-3 w-3 flex-shrink-0" />
                    </button>
                  </Badge>
                )}

                {selectedCategories.map((category) => (
                  <Badge key={category} variant="outline" className="flex items-center gap-1 max-w-full">
                    <span className="truncate">{category}</span>
                    <button
                      onClick={() => handleCategoryToggle(category)}
                      aria-label={`Supprimer le filtre de catégorie ${category}`}
                    >
                      <X className="h-3 w-3 flex-shrink-0" />
                    </button>
                  </Badge>
                ))}

                {(priceRange[0] > filters.price.min || priceRange[1] < filters.price.max) && (
                  <Badge variant="outline" className="flex items-center gap-1 max-w-full">
                    <span className="truncate">
                      Prix: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                    <button
                      onClick={() => setPriceRange([filters.price.min, filters.price.max])}
                      aria-label="Supprimer le filtre de prix"
                    >
                      <X className="h-3 w-3 flex-shrink-0" />
                    </button>
                  </Badge>
                )}
              </div>

              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs ml-auto">
                Effacer tout
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() => handleCategoryToggle(category.name)}
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
                    <span className="text-sm">{formatPrice(priceRange[0])}</span>
                    <span className="text-sm">{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <Button variant="outline" onClick={clearFilters} className="w-full">
                Réinitialiser les filtres
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <section className="flex-1" aria-label="Liste des produits">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                <h3 className="text-lg font-medium mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Essayez de modifier vos filtres ou votre recherche.
                </p>
                <Button onClick={clearFilters}>Réinitialiser les filtres</Button>
              </div>
            ) : viewMode === "grid" ? (
              <motion.div
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {displayedProducts.map((product) => (
                  <motion.article
                    key={product.id}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow h-full flex flex-col"
                    variants={itemVariants}
                  >
                    <div className="relative h-40 xs:h-48 overflow-hidden group">
                      <Image
                        src={product.image || "/placeholder.svg?height=192&width=256" || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={currentPage === 1 && product.id <= 4}
                      />
                      <div className="absolute top-2 right-2 z-10">
                        <button
                          onClick={() => toggleFavorite(product)}
                          className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                            isInFavorites(product.id)
                              ? "bg-red-50 text-red-500 hover:bg-red-100"
                              : "bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-red-50",
                          )}
                          aria-label={isInFavorites(product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                        >
                          <Heart className={cn("h-4 w-4", isInFavorites(product.id) && "fill-red-500")} />
                        </button>
                      </div>
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">Nouveau</Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="p-3 xs:p-4 flex flex-col flex-grow">
                      <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">{product.category}</div>
                      <Link href={`/product/${product.slug || product.id}`} className="group">
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
              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                {displayedProducts.map((product) => (
                  <motion.article
                    key={product.id}
                    className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                    variants={itemVariants}
                  >
                    <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg?height=192&width=192" || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 192px"
                        priority={currentPage === 1 && product.id <= 4}
                      />
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">Nouveau</Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-600">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">{product.category}</div>
                      <Link href={`/product/${product.slug || product.id}`} className="group">
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
                                "text-red-500 border-red-200 hover:text-red-600 hover:border-red-300",
                            )}
                            aria-label={isInFavorites(product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                          >
                            <Heart className={cn("h-4 w-4", isInFavorites(product.id) && "fill-red-500")} />
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
                  {displayedProducts.length > 1 ? "s" : ""} sur {filteredProducts.length}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Pagination des produits">
                    <Pagination>
                      <PaginationContent className="flex flex-wrap justify-center">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={cn("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")}
                            aria-disabled={currentPage === 1}
                          />
                        </PaginationItem>

                        {/* On small screens, show fewer page numbers */}
                        {getPageNumbers().map((pageNumber, index) => {
                          // On very small screens, only show current page, first and last
                          const isMobile = typeof window !== "undefined" && window.innerWidth < 480
                          if (
                            isMobile &&
                            pageNumber !== 1 &&
                            pageNumber !== totalPages &&
                            pageNumber !== currentPage &&
                            pageNumber !== "..."
                          ) {
                            return null
                          }

                          return pageNumber === "..." ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                              <span className="px-3 py-1">...</span>
                            </PaginationItem>
                          ) : (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                onClick={() => paginate(pageNumber)}
                                isActive={currentPage === pageNumber}
                                className="cursor-pointer"
                                aria-current={currentPage === pageNumber ? "page" : undefined}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        })}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className={cn(
                              "cursor-pointer",
                              currentPage === totalPages && "pointer-events-none opacity-50",
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
  )
}
