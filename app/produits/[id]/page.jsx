"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronRight,
  Plus,
  Minus,
  Check,
} from "lucide-react"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/data/products"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import ProductCard from "@/components/product-card"

// Fonction pour générer des images supplémentaires pour un produit
const generateProductImages = (product) => {
  // Utiliser l'image principale comme première image
  const mainImage = product.image || "/placeholder.svg?height=600&width=600"

  // Générer 4 images supplémentaires avec des variations
  return [
    mainImage,
    `/placeholder.svg?height=600&width=600&text=Vue+avant+${product.id}`,
    `/placeholder.svg?height=600&width=600&text=Vue+arrière+${product.id}`,
    `/placeholder.svg?height=600&width=600&text=Vue+détail+${product.id}`,
    `/placeholder.svg?height=600&width=600&text=Vue+utilisation+${product.id}`,
  ]
}

// Fonction pour trouver un produit par son ID
const findProductById = (id) => {
  // Parcourir toutes les catégories de produits
  for (const category in products) {
    const found = products[category].find((product) => product.id === id)
    if (found) return found
  }
  return null
}

// Fonction pour obtenir des produits similaires
const getSimilarProducts = (currentProduct, limit = 4) => {
  if (!currentProduct) return []

  // Trouver des produits de la même catégorie
  const allProducts = Object.values(products).flat()
  return allProducts
    .filter((product) => product.category === currentProduct.category && product.id !== currentProduct.id)
    .slice(0, limit)
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites()

  const [product, setProduct] = useState(null)
  const [productImages, setProductImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [similarProducts, setSimilarProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler un chargement
    setIsLoading(true)

    // Trouver le produit par ID
    const foundProduct = findProductById(id)

    if (foundProduct) {
      setProduct(foundProduct)
      setProductImages(generateProductImages(foundProduct))
      setSimilarProducts(getSimilarProducts(foundProduct))
    }

    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  const handleQuantityChange = (value) => {
    if (value < 1) return
    setQuantity(value)
  }

  const handleAddToCart = () => {
    if (product) {
      // Ajouter le produit au panier avec la quantité sélectionnée
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }

      // Réinitialiser la quantité
      setQuantity(1)
    }
  }

  const toggleFavorite = () => {
    if (!product) return

    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const shareProduct = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    }
  }

  // Si le produit n'est pas trouvé
  if (!isLoading && !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Produit introuvable</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Le produit que vous recherchez n'existe pas.</p>
          <Link href="/">
            <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />

          {product && (
            <>
              <Link
                href={`/categories/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-yellow-600 dark:hover:text-yellow-400"
              >
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                {product?.name || "Chargement..."}
              </span>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Chargement du produit...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Product Images */}
              <div>
                <div className="relative h-[400px] md:h-[500px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={productImages[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />

                  {product.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </div>
                  )}

                  {product.isNew && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                      Nouveau
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-5 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 bg-white dark:bg-gray-800 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-yellow-500 dark:border-yellow-400"
                          : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                {product.category && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.category}</div>
                )}

                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{product.name}</h1>

                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">({product.reviews} avis)</span>
                </div>

                <div className="flex items-center mb-6">
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-xl mr-3">{product.oldPrice.toFixed(2)} €</span>
                  )}
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price.toFixed(2)} €</span>

                  {product.discount && (
                    <span className="ml-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm font-medium px-2 py-1 rounded">
                      Économisez {product.discount}%
                    </span>
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-heading font-semibold text-lg mb-3">Caractéristiques:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  <span
                    className={`inline-flex items-center ${
                      product.inStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    <span
                      className={`h-3 w-3 rounded-full mr-2 ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
                    ></span>
                    {product.inStock ? "En stock" : "Rupture de stock"}
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center mb-6">
                  <span className="text-gray-700 dark:text-gray-300 mr-4">Quantité:</span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 text-gray-700 dark:text-gray-300 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 py-6"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Ajouter au panier
                  </Button>

                  <Button
                    onClick={toggleFavorite}
                    variant="outline"
                    className={`px-4 border-gray-300 dark:border-gray-600 ${
                      isInFavorites(product.id)
                        ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isInFavorites(product.id) ? "fill-red-500" : ""}`} />
                  </Button>

                  <Button
                    onClick={shareProduct}
                    variant="outline"
                    className="px-4 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Shipping & Returns */}
                <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Livraison gratuite</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pour les commandes supérieures à 50€ en France métropolitaine
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <RefreshCw className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Retours sous 30 jours</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Retournez votre produit dans les 30 jours pour un remboursement complet
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Garantie 2 ans</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tous nos produits sont garantis 2 ans pièces et main d'œuvre
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-16">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
                  <TabsTrigger value="description" className="text-sm md:text-base">
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="text-sm md:text-base">
                    Spécifications
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="text-sm md:text-base">
                    Avis ({product.reviews})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-heading font-bold mb-4">Description du produit</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                    tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget
                    ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                </TabsContent>

                <TabsContent value="specifications" className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-heading font-bold mb-4">Spécifications techniques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}

                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">Garantie: 2 ans</span>
                    </div>

                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">Livraison: 2-5 jours ouvrés</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-heading font-bold mb-4">Avis clients ({product.reviews})</h3>

                  <div className="flex items-center mb-6">
                    <div className="flex mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{product.rating}.0</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">sur 5</span>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">il y a 2 semaines</span>
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Thomas M.</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Excellent produit, je suis très satisfait de mon achat. La qualité est au rendez-vous et la
                        livraison a été rapide. Je recommande vivement !
                      </p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">il y a 1 mois</span>
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Sophie L.</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Très bon rapport qualité/prix. Le produit correspond parfaitement à la description. Seul petit
                        bémol, la livraison a pris un jour de plus que prévu.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">il y a 2 mois</span>
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Karim B.</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Parfait ! Je l'utilise quotidiennement depuis 2 mois et je n'ai rien à redire. La qualité est
                        exceptionnelle et le service client très réactif.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-heading font-bold mb-8">Produits similaires</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {similarProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

