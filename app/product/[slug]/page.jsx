"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Check,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Plus,
  Minus,
  Info,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Import product data
import { products, categories } from "@/data/product";

// Fonction optimisée pour trouver un produit par slug
const findProductBySlug = (slug) => {
  // Normaliser le slug pour la comparaison
  const searchSlug = String(slug).toLowerCase();

  return products.find(
    (product) =>
      product.slug && String(product.slug).toLowerCase() === searchSlug
  );
};


const getCategoryInfo = (categoryId) => {
  return categories.find((cat) => cat.id === categoryId);
};


const getRelatedProducts = (product, limit = 4) => {
  if (!product || !product.categoryId) return [];

  
  return products
    .filter((p) => {
      // Si le produit a des produits liés spécifiés, les utiliser en priorité
      if (product.relatedProducts && product.relatedProducts.includes(p.id)) {
        return true;
      }
      // Sinon, utiliser les produits de la même catégorie
      return p.categoryId === product.categoryId && p.id !== product.id;
    })
    .slice(0, limit);
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState(null);

  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  // Trouver le produit par slug
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const foundProduct = findProductBySlug(slug);

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(0);

        // Obtenir les informations de la catégorie
        const catInfo = getCategoryInfo(foundProduct.categoryId);
        setCategoryInfo(catInfo);

        // Obtenir les produits similaires
        const related = getRelatedProducts(foundProduct);
        setRelatedProducts(related);

        setLoading(false);
      } else {
        setError("Produit non trouvé");
        setLoading(false);
      }
    } catch (err) {
      console.error("Erreur lors de la recherche du produit:", err);
      setError("Une erreur s'est produite lors du chargement du produit");
      setLoading(false);
    }
  }, [slug, router]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const toggleFavorite = () => {
    if (product) {
      if (isInFavorites(product.id)) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
    }
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
    if (!rating) return null;

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
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <p className="mb-8">
            {error ||
              "Le produit que vous recherchez n'existe pas ou a été supprimé."}
          </p>
          <Button asChild>
            <Link href="/produits">Voir tous les produits</Link>
          </Button>
        </div>
        
      </>
    );
  }

  return (
    <>
      <main className="bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-6">
          <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-gray-900 dark:hover:text-white"
            >
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href="/product"
              className="hover:text-gray-900 dark:hover:text-white"
            >
              Produits
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            {categoryInfo && (
              <>
                <Link
                  href={categoryInfo.href}
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  {categoryInfo.name}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
              </>
            )}
            <span className="text-gray-900 dark:text-white font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={
                      product.gallery?.[selectedImage] ||
                      product.image ||
                      "/placeholder.svg?height=384&width=384"
                    }
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Nouveau
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.gallery && product.gallery.length > 0 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {product.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2",
                          selectedImage === index
                            ? "border-yellow-500 dark:border-yellow-400"
                            : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    {product.category && (
                      <Badge
                        variant="outline"
                        className="text-xs font-medium text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                      >
                        {product.category}
                      </Badge>
                    )}
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={toggleFavorite}
                              className={cn(
                                "p-2 rounded-full transition-colors",
                                isInFavorites(product.id)
                                  ? "bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
                                  : "bg-gray-100 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/20"
                              )}
                              aria-label={
                                isInFavorites(product.id)
                                  ? "Retirer des favoris"
                                  : "Ajouter aux favoris"
                              }
                            >
                              <Heart
                                className={cn(
                                  "h-5 w-5",
                                  isInFavorites(product.id) && "fill-red-500"
                                )}
                              />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isInFavorites(product.id)
                              ? "Retirer des favoris"
                              : "Ajouter aux favoris"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                              aria-label="Partager"
                            >
                              <Share2 className="h-5 w-5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Partager ce produit</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {product.name}
                  </h1>

                  <div className="flex items-center mt-2 space-x-4">
                    {product.rating && (
                      <div className="flex items-center">
                        {renderRating(product.rating)}
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          ({product.reviewCount || 0} avis)
                        </span>
                      </div>
                    )}

                    <Badge
                      variant={product.inStock ? "outline" : "secondary"}
                      className={cn(
                        "text-xs font-medium",
                        product.inStock
                          ? "border-green-500 text-green-600 dark:border-green-500 dark:text-green-400"
                          : "border-red-500 text-red-600 dark:border-red-500 dark:text-red-400"
                      )}
                    >
                      {product.inStock ? "En stock" : "Rupture de stock"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="ml-3 text-lg text-gray-500 line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  {product.discount > 0 && product.oldPrice && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Économisez {formatPrice(product.oldPrice - product.price)}{" "}
                      ({product.discount}%)
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>

                  {/* Product Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Caractéristiques principales:
                      </h3>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Add to Cart Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            Number.parseInt(e.target.value) || 1
                          )
                        }
                        className="w-12 text-center border-0 focus:ring-0 text-gray-900 dark:text-white bg-transparent"
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Ajouter au panier
                    </Button>
                  </div>

                  {!product.inStock && (
                    <Alert variant="destructive">
                      <Info className="h-4 w-4 mr-2" />
                      <AlertDescription>
                        Ce produit est actuellement en rupture de stock. Vous
                        pouvez l'ajouter à vos favoris pour être notifié
                        lorsqu'il sera à nouveau disponible.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Livraison
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Livraison estimée:{" "}
                        {product.shipping?.estimatedDelivery ||
                          "2-5 jours ouvrés"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Garantie
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {product.warranty || "Garantie 1 an"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-8">
              <Tabs defaultValue="details">
                <TabsList className="w-full justify-start border-b border-gray-200 dark:border-gray-700 pb-px mb-6">
                  <TabsTrigger value="details" className="text-sm">
                    Détails du produit
                  </TabsTrigger>
                  <TabsTrigger value="specs" className="text-sm">
                    Spécifications
                  </TabsTrigger>
                  <TabsTrigger value="shipping" className="text-sm">
                    Livraison & Retours
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>

                  {product.features && product.features.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Caractéristiques
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="specs" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Spécifications techniques
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Dimensions */}
                      {product.dimensions && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Dimensions
                          </h4>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Largeur
                              </span>
                              <span className="text-gray-900 dark:text-white">
                                {product.dimensions.width} cm
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Hauteur
                              </span>
                              <span className="text-gray-900 dark:text-white">
                                {product.dimensions.height} cm
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Profondeur
                              </span>
                              <span className="text-gray-900 dark:text-white">
                                {product.dimensions.depth} cm
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">
                                Poids
                              </span>
                              <span className="text-gray-900 dark:text-white">
                                {product.dimensions.weight} kg
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Materials */}
                      {product.materials && product.materials.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Matériaux
                          </h4>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <ul className="space-y-1">
                              {product.materials.map((material, index) => (
                                <li
                                  key={index}
                                  className="text-gray-600 dark:text-gray-300"
                                >
                                  {material}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Colors */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Couleurs disponibles
                          </h4>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex flex-wrap gap-2">
                              {product.colors.map((color, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-white dark:bg-gray-700"
                                >
                                  {color}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SKU & Stock */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Informations produit
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">
                              Référence (SKU)
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {product.sku || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">
                              Disponibilité
                            </span>
                            <span
                              className={cn(
                                "font-medium",
                                product.inStock
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              )}
                            >
                              {product.inStock
                                ? `En stock (${
                                    product.stockQuantity || "Disponible"
                                  })`
                                : "Rupture de stock"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">
                              Date d'ajout
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {new Date(product.date).toLocaleDateString(
                                "fr-FR",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Livraison
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
                      <div className="flex items-start">
                        <Truck className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Délais de livraison
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Livraison estimée:{" "}
                            {product.shipping?.estimatedDelivery ||
                              "2-5 jours ouvrés"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Informations de livraison
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Dimensions du colis:{" "}
                            {product.shipping?.dimensions || "N/A"}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            Poids du colis: {product.shipping?.weight || "N/A"}{" "}
                            kg
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            Méthode d'expédition:{" "}
                            {product.shipping?.method || "Standard"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Politique de retour
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        Vous disposez de 30 jours à compter de la réception de
                        votre commande pour retourner un article. L'article doit
                        être dans son état d'origine, non utilisé et dans son
                        emballage d'origine.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Pour plus d'informations, veuillez consulter notre{" "}
                        <Link
                          href="/retours"
                          className="text-yellow-600 dark:text-yellow-400 hover:underline"
                        >
                          politique de retour
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="container mx-auto px-4 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Produits similaires
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={
                        relatedProduct.image ||
                        "/placeholder.svg?height=192&width=256"
                      }
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {relatedProduct.discount > 0 && (
                      <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{relatedProduct.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {relatedProduct.category}
                    </div>
                    <Link
                      href={`/produits/${
                        relatedProduct.slug || relatedProduct.id
                      }`}
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      {renderRating(relatedProduct.rating)}
                      <span className="text-xs text-gray-500 ml-1">
                        ({relatedProduct.reviewCount || 0})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {relatedProduct.oldPrice ? (
                          <div className="flex items-center">
                            <span className="font-bold text-gray-900 dark:text-white">
                              {formatPrice(relatedProduct.price)}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {formatPrice(relatedProduct.oldPrice)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-gray-900 dark:text-white">
                            {formatPrice(relatedProduct.price)}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(relatedProduct)}
                        className="h-8 w-8 p-0 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Products */}
        <div className="container mx-auto px-4 mt-12">
          <Button variant="outline" asChild className="flex items-center">
            <Link href="/produits">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux produits
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
