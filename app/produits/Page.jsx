"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Star, ShoppingCart, Filter, SlidersHorizontal, ChevronDown, X, Search, Check, Heart } from "lucide-react"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { products, categories, brands } from "@/data/products"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites()

  // Get all products in a flat array
  const allProducts = Object.values(products).flat()

  // State for filters
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    brand: searchParams.get("brand") || "all",
    priceRange: [0, 2000],
    rating: searchParams.get("rating") || "all",
    inStock: searchParams.get("inStock") === "true",
    search: searchParams.get("q") || "",
    sortBy: searchParams.get("sort") || "featured",
  })

  const [filtersOpen, setFiltersOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [priceRangeValue, setPriceRangeValue] = useState([0, 2000])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.category !== "all") params.set("category", filters.category)
    if (filters.brand !== "all") params.set("brand", filters.brand)
    if (filters.rating !== "all") params.set("rating", filters.rating)
    if (filters.inStock) params.set("inStock", "true")
    if (filters.search) params.set("q", filters.search)
    if (filters.sortBy !== "featured") params.set("sort", filters.sortBy)

    const url = `/produits${params.toString() ? `?${params.toString()}` : ""}`
    router.push(url, { scroll: false })
  }, [filters, router])

  // Apply filters to products
  const filteredProducts = allProducts.filter((product) => {
    // Category filter
    if (filters.category !== "all" && product.category !== filters.category) return false

    // Brand filter (assuming products have a brand property)
    if (filters.brand !== "all" && product.brand !== filters.brand) return false

    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false

    // Rating filter
    if (filters.rating !== "all" && product.rating < Number.parseInt(filters.rating)) return false

    // In stock filter
    if (filters.inStock && !product.inStock) return false

    // Search filter
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "priceAsc":
        return a.price - b.price
      case "priceDesc":
        return b.price - a.price
      case "newest":
        return b.isNew ? 1 : -1
      case "rating":
        return b.rating - a.rating
      case "bestseller":
        return b.isBestseller ? 1 : -1
      default: // featured
        return 0
    }
  })

  const updateFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handlePriceRangeChange = (value) => {
    setPriceRangeValue(value)
  }

  const applyPriceRange = () => {
    setFilters((prev) => ({
      ...prev,
      priceRange: priceRangeValue,
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: "all",
      brand: "all",
      priceRange: [0, 2000],
      rating: "all",
      inStock: false,
      search: "",
      sortBy: "featured",
    })
    setPriceRangeValue([0, 2000])
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateFilter("search", e.target.search.value)
  }

  const toggleFavorite = (e, product) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.category !== "all") count++
    if (filters.brand !== "all") count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) count++
    if (filters.rating !== "all") count++
    if (filters.inStock) count++
    if (filters.search) count++
    return count
  }

  const sortOptions = [
    { id: "featured", name: "En vedette" },
    { id: "priceAsc", name: "Prix croissant" },
    { id: "priceDesc", name: "Prix décroissant" },
    { id: "newest", name: "Nouveautés" },
    { id: "rating", name: "Meilleures notes" },
    { id: "bestseller", name: "Meilleures ventes" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Page Header */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Tous nos produits</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {sortedProducts.length} produit{sortedProducts.length !== 1 ? "s" : ""} disponible
                {sortedProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Rechercher un produit..."
                  defaultValue={filters.search}
                  className="w-full py-2 px-4 pr-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>

              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <Filter className="h-5 w-5 mr-2" />
                <span>Filtres</span>
                {getActiveFilterCount() > 0 && (
                  <span className="ml-1 bg-yellow-500 dark:bg-yellow-400 text-white dark:text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>

              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter("sortBy", e.target.value)}
                  className="appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-3 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500"
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
        </div>
      </section>

      {/* Mobile Filters Button */}
      <div className="md:hidden sticky top-16 z-30 bg-white dark:bg-gray-900 shadow-md p-3 border-b border-gray-200 dark:border-gray-800">
        <Button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Filtres {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </Button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className={`md:w-64 lg:w-72 flex-shrink-0 ${filtersOpen ? "block" : "hidden md:block"}`}>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-5 sticky top-24 border border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-heading font-bold">Filtres</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 h-8 px-2"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-1" />
                  Effacer
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Catégories</h3>
                <div className="space-y-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                      filters.category === "all"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => updateFilter("category", "all")}
                  >
                    <span>Toutes les catégories</span>
                    {filters.category === "all" && <Check className="h-4 w-4" />}
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                        filters.category === category.name
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => updateFilter("category", category.name)}
                    >
                      <span>{category.name}</span>
                      {filters.category === category.name && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Prix</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 2000]}
                    value={priceRangeValue}
                    min={0}
                    max={2000}
                    step={10}
                    onValueChange={handlePriceRangeChange}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{priceRangeValue[0]}€</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{priceRangeValue[1]}€</span>
                  </div>
                  <Button
                    onClick={applyPriceRange}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
                    size="sm"
                  >
                    Appliquer
                  </Button>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Marques</h3>
                <div className="space-y-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                      filters.brand === "all"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => updateFilter("brand", "all")}
                  >
                    <span>Toutes les marques</span>
                    {filters.brand === "all" && <Check className="h-4 w-4" />}
                  </button>

                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                        filters.brand === brand.name
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => updateFilter("brand", brand.name)}
                    >
                      <span>{brand.name}</span>
                      {filters.brand === brand.name && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Note</h3>
                <div className="space-y-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                      filters.rating === "all"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => updateFilter("rating", "all")}
                  >
                    <span>Toutes les notes</span>
                    {filters.rating === "all" && <Check className="h-4 w-4" />}
                  </button>

                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                        filters.rating === rating.toString()
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => updateFilter("rating", rating.toString())}
                    >
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-1">{rating === 1 ? "& plus" : ""}</span>
                      </div>
                      {filters.rating === rating.toString() && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Disponibilité</h3>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                    filters.inStock
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => updateFilter("inStock", !filters.inStock)}
                >
                  <span>En stock uniquement</span>
                  {filters.inStock && <Check className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
                  <h2 className="text-lg font-heading font-bold">Filtres</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 h-8 px-2"
                      onClick={clearFilters}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Effacer
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 h-8 px-2"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Catégories</h3>
                    <div className="space-y-2">
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                          filters.category === "all"
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => updateFilter("category", "all")}
                      >
                        <span>Toutes les catégories</span>
                        {filters.category === "all" && <Check className="h-4 w-4" />}
                      </button>

                      {categories.map((category) => (
                        <button
                          key={category.id}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                            filters.category === category.name
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                          onClick={() => updateFilter("category", category.name)}
                        >
                          <span>{category.name}</span>
                          {filters.category === category.name && <Check className="h-4 w-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Prix</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 2000]}
                        value={priceRangeValue}
                        min={0}
                        max={2000}
                        step={10}
                        onValueChange={handlePriceRangeChange}
                        className="mb-4"
                      />
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{priceRangeValue[0]}€</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{priceRangeValue[1]}€</span>
                      </div>
                      <Button
                        onClick={applyPriceRange}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
                        size="sm"
                      >
                        Appliquer
                      </Button>
                    </div>
                  </div>

                  {/* Brands */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Marques</h3>
                    <div className="space-y-2">
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                          filters.brand === "all"
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => updateFilter("brand", "all")}
                      >
                        <span>Toutes les marques</span>
                        {filters.brand === "all" && <Check className="h-4 w-4" />}
                      </button>

                      {brands.map((brand) => (
                        <button
                          key={brand.id}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                            filters.brand === brand.name
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                          onClick={() => updateFilter("brand", brand.name)}
                        >
                          <span>{brand.name}</span>
                          {filters.brand === brand.name && <Check className="h-4 w-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Note</h3>
                    <div className="space-y-2">
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                          filters.rating === "all"
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => updateFilter("rating", "all")}
                      >
                        <span>Toutes les notes</span>
                        {filters.rating === "all" && <Check className="h-4 w-4" />}
                      </button>

                      {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                          key={rating}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                            filters.rating === rating.toString()
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                          onClick={() => updateFilter("rating", rating.toString())}
                        >
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                                />
                              ))}
                            </div>
                            <span className="ml-1">{rating === 1 ? "& plus" : ""}</span>
                          </div>
                          {filters.rating === rating.toString() && <Check className="h-4 w-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Disponibilité</h3>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                        filters.inStock
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => updateFilter("inStock", !filters.inStock)}
                    >
                      <span>En stock uniquement</span>
                      {filters.inStock && <Check className="h-4 w-4" />}
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
                    >
                      Appliquer les filtres
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                  <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-800 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Link href={`/produits/${product.id}`} className="block">
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                        {product.discount && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{product.discount}%
                          </div>
                        )}

                        {product.isNew && (
                          <div className="absolute top-2 right-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Nouveau
                          </div>
                        )}

                        <button
                          onClick={(e) => toggleFavorite(e, product)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors"
                          aria-label={isInFavorites(product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                        >
                          <Heart
                            className={`h-4 w-4 ${isInFavorites(product.id) ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"}`}
                          />
                        </button>
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
                            <span
                              className={`font-bold text-lg ${product.discount ? "text-red-600 dark:text-red-400" : ""}`}
                            >
                              {product.price.toFixed(2)} €
                            </span>
                          </div>

                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
                            onClick={(e) => handleAddToCart(e, product)}
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
        </div>
      </div>
    </div>
  )
}

