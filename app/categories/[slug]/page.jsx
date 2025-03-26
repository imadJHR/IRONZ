"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, ShoppingCart, Filter, ChevronDown, Heart, SlidersHorizontal } from "lucide-react"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/data/product"
import { useCart } from "@/context/CartContext"
import { useFavorites } from "@/context/FavoritesContext"

export default function CategoryPage() {
  const params = useParams()
  const { slug } = params
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites()

  // État pour les filtres et le tri
  const [filters, setFilters] = useState({
    priceRange: "all",
    sortBy: "featured",
    inStock: false,
  })

  const [filtersOpen, setFiltersOpen] = useState(false)

  // Trouver la catégorie correspondante
  const category = categories.find((cat) => {
    const catSlug = cat.href.split("/").pop()
    return catSlug === slug
  })

  // Si la catégorie n'existe pas, on pourrait rediriger ou afficher un message
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Catégorie introuvable</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">La catégorie que vous recherchez n'existe pas.</p>
          <Link href="/">
            <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Récupérer les produits de cette catégorie
  // On parcourt toutes les catégories de produits pour trouver ceux qui correspondent
  const getCategoryProducts = () => {
    // Aplatir tous les produits en un seul tableau
    const allProducts = Object.values(products).flat()

    // Filtrer les produits par catégorie
    return allProducts.filter((product) => product.category === category.name)
  }

  const categoryProducts = getCategoryProducts()

  // Appliquer les filtres
  const filteredProducts = categoryProducts.filter((product) => {
    // Filtre de prix
    if (filters.priceRange !== "all") {
      const price = product.price
      if (filters.priceRange === "under50" && price >= 50) return false
      if (filters.priceRange === "50to100" && (price < 50 || price > 100)) return false
      if (filters.priceRange === "100to200" && (price < 100 || price > 200)) return false
      if (filters.priceRange === "over200" && price <= 200) return false
    }

    // Filtre de stock
    if (filters.inStock && !product.inStock) return false

    return true
  })

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "priceAsc":
        return a.price - b.price
      case "priceDesc":
        return b.price - a.price
      case "newest":
        return b.isNew ? 1 : -1
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

  const clearFilters = () => {
    setFilters({
      priceRange: "all",
      sortBy: "featured",
      inStock: false,
    })
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

  const priceRanges = [
    { id: "all", name: "Tous les prix" },
    { id: "under50", name: "Moins de 50€" },
    { id: "50to100", name: "50€ - 100€" },
    { id: "100to200", name: "100€ - 200€" },
    { id: "over200", name: "Plus de 200€" },
  ]

  const sortOptions = [
    { id: "featured", name: "En vedette" },
    { id: "priceAsc", name: "Prix croissant" },
    { id: "priceDesc", name: "Prix décroissant" },
    { id: "newest", name: "Nouveautés" },
    { id: "bestseller", name: "Meilleures ventes" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={category.image || "/placeholder.svg?height=1200&width=2000"}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">{category.name}</h1>
            <p className="text-xl text-gray-300 mb-8">{category.description}</p>
            <div className="flex items-center text-sm text-gray-400">
              <span>
                {sortedProducts.length} produit{sortedProducts.length !== 1 ? "s" : ""} disponible
                {sortedProducts.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="h-5 w-5 mr-2" />
              <span>Filtres</span>
              {(filters.priceRange !== "all" || filters.inStock) && (
                <span className="ml-1 bg-yellow-500 dark:bg-yellow-400 text-white dark:text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {(filters.priceRange !== "all" ? 1 : 0) + (filters.inStock ? 1 : 0)}
                </span>
              )}
            </Button>

            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 hidden sm:inline">Trier par:</span>
              <div className="relative">
                <select
                  value={filters.sortBy}
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

          {/* Expanded Filters */}
          {filtersOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Prix</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          filters.priceRange === range.id
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => updateFilter("priceRange", range.id)}
                      >
                        {range.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Disponibilité</h3>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      filters.inStock
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => updateFilter("inStock", !filters.inStock)}
                  >
                    En stock uniquement
                  </button>

                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Réinitialiser les filtres
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-lg shadow-md">
              <SlidersHorizontal className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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
                  className="group bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={`/produits/${product.id}`} className="block">
                    <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
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
      </section>

      {/* Related Categories */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold mb-8 text-center">Autres catégories</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter((cat) => cat.name !== category.name)
              .slice(0, 4)
              .map((cat) => {
                const catSlug = cat.href.split("/").pop()
                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${catSlug}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 relative mb-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <Image
                        src={cat.image || "/placeholder.svg"}
                        alt={cat.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <h3 className="font-heading font-medium text-gray-900 dark:text-white">{cat.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cat.productCount} produits</p>
                  </Link>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  )
}

