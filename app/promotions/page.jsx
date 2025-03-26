"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Star, ShoppingCart, Filter, ChevronDown, X, Percent, Tag, Package, TrendingDown } from "lucide-react"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/data/product"

// This is a client component for filtering
export function PromotionsClient() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type")

  const [activeFilters, setActiveFilters] = useState({
    type: typeParam || "all",
    category: "all",
    priceRange: "all",
    discount: "all",
    sortBy: "discount",
  })

  const [filtersOpen, setFiltersOpen] = useState(false)

  // Flatten all products into a single array
  const allProducts = Object.values(products).flat()

  // Filter products with discounts
  const discountedProducts = allProducts.filter((product) => product.discount || product.oldPrice)

  // Apply filters
  const filteredProducts = discountedProducts.filter((product) => {
    // Filter by promotion type
    if (activeFilters.type !== "all") {
      if (activeFilters.type === "current" && !product.isNew) return false
      if (activeFilters.type === "summer" && product.discount < 15) return false
      if (activeFilters.type === "bundle" && !product.name.toLowerCase().includes("pack")) return false
      if (activeFilters.type === "clearance" && product.discount < 20) return false
    }

    // Filter by category
    if (activeFilters.category !== "all" && product.category !== activeFilters.category) return false

    // Filter by price range
    if (activeFilters.priceRange !== "all") {
      const price = product.price
      if (activeFilters.priceRange === "under50" && price >= 50) return false
      if (activeFilters.priceRange === "50to100" && (price < 50 || price > 100)) return false
      if (activeFilters.priceRange === "100to200" && (price < 100 || price > 200)) return false
      if (activeFilters.priceRange === "over200" && price <= 200) return false
    }

    // Filter by discount percentage
    if (activeFilters.discount !== "all") {
      const discount = product.discount || 0
      if (activeFilters.discount === "under10" && discount >= 10) return false
      if (activeFilters.discount === "10to20" && (discount < 10 || discount > 20)) return false
      if (activeFilters.discount === "20to30" && (discount < 20 || discount > 30)) return false
      if (activeFilters.discount === "over30" && discount <= 30) return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (activeFilters.sortBy === "discount") {
      return (b.discount || 0) - (a.discount || 0)
    } else if (activeFilters.sortBy === "priceAsc") {
      return a.price - b.price
    } else if (activeFilters.sortBy === "priceDesc") {
      return b.price - a.price
    } else if (activeFilters.sortBy === "newest") {
      return b.isNew ? 1 : -1
    }
    return 0
  })

  const updateFilter = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const clearFilters = () => {
    setActiveFilters({
      type: "all",
      category: "all",
      priceRange: "all",
      discount: "all",
      sortBy: "discount",
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (activeFilters.type !== "all") count++
    if (activeFilters.category !== "all") count++
    if (activeFilters.priceRange !== "all") count++
    if (activeFilters.discount !== "all") count++
    return count
  }

  const promotionTypes = [
    { id: "all", name: "Toutes les promotions", icon: <Percent className="h-5 w-5 mr-2" /> },
    { id: "current", name: "Offres du moment", icon: <Tag className="h-5 w-5 mr-2" /> },
    { id: "summer", name: "Soldes d'été", icon: <TrendingDown className="h-5 w-5 mr-2" /> },
    { id: "bundle", name: "Packs économiques", icon: <Package className="h-5 w-5 mr-2" /> },
    { id: "clearance", name: "Déstockage", icon: <ShoppingCart className="h-5 w-5 mr-2" /> },
  ]

  const priceRanges = [
    { id: "all", name: "Tous les prix" },
    { id: "under50", name: "Moins de 50€" },
    { id: "50to100", name: "50€ - 100€" },
    { id: "100to200", name: "100€ - 200€" },
    { id: "over200", name: "Plus de 200€" },
  ]

  const discountRanges = [
    { id: "all", name: "Toutes les réductions" },
    { id: "under10", name: "Moins de 10%" },
    { id: "10to20", name: "10% - 20%" },
    { id: "20to30", name: "20% - 30%" },
    { id: "over30", name: "Plus de 30%" },
  ]

  const sortOptions = [
    { id: "discount", name: "Réduction (décroissante)" },
    { id: "priceAsc", name: "Prix (croissant)" },
    { id: "priceDesc", name: "Prix (décroissant)" },
    { id: "newest", name: "Nouveautés" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-gray-900">
              Nos <span className="text-white">Promotions</span>
            </h1>
            <p className="text-xl text-gray-800 mb-8">
              Découvrez nos offres spéciales, réductions et bonnes affaires sur une large sélection de produits.
            </p>
          </div>
        </div>
      </section>

      {/* Promotion Types Section */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {promotionTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={activeFilters.type === type.id ? "default" : "outline"}
                  className={`
                    flex items-center transition-all
                    ${
                      activeFilters.type === type.id
                        ? "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
                        : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                  onClick={() => updateFilter("type", type.id)}
                >
                  {type.icon}
                  <span className="hidden sm:inline">{type.name}</span>
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Filtres</span>
              {getActiveFilterCount() > 0 && (
                <span className="ml-1 bg-yellow-500 dark:bg-yellow-400 text-white dark:text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      {filtersOpen && (
        <section className="py-6 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-heading font-bold">Filtres</h2>
              <Button
                variant="ghost"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={clearFilters}
              >
                <X className="h-4 w-4 mr-1" />
                Effacer les filtres
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Categories Filter */}
              <div>
                <h3 className="font-medium mb-2">Catégories</h3>
                <div className="space-y-1">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      activeFilters.category === "all"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => updateFilter("category", "all")}
                  >
                    Toutes les catégories
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        activeFilters.category === category.name
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => updateFilter("category", category.name)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-2">Prix</h3>
                <div className="space-y-1">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        activeFilters.priceRange === range.id
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => updateFilter("priceRange", range.id)}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Filter */}
              <div>
                <h3 className="font-medium mb-2">Réduction</h3>
                <div className="space-y-1">
                  {discountRanges.map((range) => (
                    <button
                      key={range.id}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        activeFilters.discount === range.id
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => updateFilter("discount", range.id)}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-medium mb-2">Trier par</h3>
                <div className="space-y-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        activeFilters.sortBy === option.id
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => updateFilter("sortBy", option.id)}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading font-bold">
              {sortedProducts.length} produit{sortedProducts.length !== 1 ? "s" : ""} en promotion
            </h2>

            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 hidden sm:inline">Trier par:</span>
              <div className="relative">
                <select
                  value={activeFilters.sortBy}
                  onChange={(e) => updateFilter("sortBy", e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <Tag className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Aucun produit ne correspond à vos critères de recherche.
              </p>
              <Button
                onClick={clearFilters}
                className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={`/produits/${product.id}`} className="block">
                    <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </div>
                      )}

                      {product.isNew && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Nouveau
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      {product.category && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                          {product.category}
                        </p>
                      )}

                      <h3 className="font-heading font-semibold text-lg mb-1 line-clamp-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {product.oldPrice && (
                            <span className="text-gray-400 line-through text-sm mr-2">
                              {product.oldPrice.toFixed(2)} €
                            </span>
                          )}
                          <span className="font-bold text-lg text-red-600 dark:text-red-400">
                            {product.price.toFixed(2)} €
                          </span>
                        </div>

                        <Button
                          size="sm"
                          className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          <span className="sr-only sm:not-sr-only">Ajouter</span>
                        </Button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function PromotionsPage() {
  return <PromotionsClient />
}

