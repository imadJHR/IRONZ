"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Check,
  ArrowLeft,
  Plus,
  Minus,
  Info,
  Facebook,
  Twitter,
  Mail,
  Linkedin,
  PhoneIcon as Whatsapp,
  PinIcon as Pinterest,
  CircleCheck,
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

import { products, categories, colorMap } from "@/data/product";

// Composant de sélection de couleur
function ColorSelector({ colors, selectedColor, onChange }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        Couleur:{" "}
        {selectedColor && <span className="font-bold">{selectedColor}</span>}
      </h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const bgColor = colorMap[color] || "#808080";
          const isSelected = color === selectedColor;
          const isMulticolor = color === "Multicolore";
          const textColor =
            color === "Blanc" || color === "Jaune"
              ? "text-black"
              : "text-white";

          return (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={cn(
                "relative w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center",
                isSelected
                  ? "ring-2 ring-offset-2 ring-yellow-500 scale-110"
                  : "hover:scale-105"
              )}
              aria-label={`Couleur ${color}`}
              title={color}
            >
              <span
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
                style={{
                  background: isMulticolor
                    ? "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
                    : bgColor,
                }}
              />
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <CircleCheck className={`h-4 w-4 ${textColor}`} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Ajout du schéma JSON-LD directement dans le composant client
function ProductJsonLd({ product }) {
  if (!product) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image || "/placeholder.svg",
    sku: String(product.id),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "MAD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

export default function ProductPageClient({ slug }) {
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  // État pour la couleur sélectionnée
  const [selectedColor, setSelectedColor] = useState("");

  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const foundProduct = findProductBySlug(slug);

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(0);

        // Définir la couleur par défaut si disponible
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }

        const catInfo = getCategoryInfo(foundProduct.categoryId);
        setCategoryInfo(catInfo);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showShareDropdown &&
        !event.target.closest(".share-dropdown-container")
      ) {
        setShowShareDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareDropdown]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      // Vérifier si une couleur est sélectionnée
      if (product.colors && product.colors.length > 0 && !selectedColor) {
        alert("Veuillez sélectionner une couleur avant d'ajouter au panier");
        return;
      }

      // Ajouter la couleur sélectionnée au produit
      const productWithColor = {
        ...product,
        selectedColor: selectedColor,
      };

      addToCart(productWithColor, quantity);

      // Notification
      alert(
        `${product.name} ${
          selectedColor ? `(${selectedColor})` : ""
        } ajouté au panier`
      );
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

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      setShowShareDropdown(!showShareDropdown);
    }
  };

  const getShareLinks = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(product.name);
    const text = encodeURIComponent(product.description);
    const image = product.image ? encodeURIComponent(product.image) : "";

    return [
      {
        name: "Facebook",
        icon: <Facebook className="h-4 w-4 mr-2" aria-hidden="true" />,
        url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        label: "Partager sur Facebook",
      },
      {
        name: "Twitter",
        icon: <Twitter className="h-4 w-4 mr-2" aria-hidden="true" />,
        url: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        label: "Partager sur Twitter",
      },
      {
        name: "WhatsApp",
        icon: <Whatsapp className="h-4 w-4 mr-2" aria-hidden="true" />,
        url: `https://wa.me/?text=${title}%20${url}`,
        label: "Partager sur WhatsApp",
      },
      {
        name: "LinkedIn",
        icon: <Linkedin className="h-4 w-4 mr-2" aria-hidden="true" />,
        url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`,
        label: "Partager sur LinkedIn",
      },
      {
        name: "Pinterest",
        icon: <Pinterest className="h-4 w-4 mr-2" aria-hidden="true" />,
        url: `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`,
        label: "Partager sur Pinterest",
      },
      {
        name: "Email",
        icon: <Mail className="h-4 w-4 mr-2" aria-hidden="true" />,
        url: `mailto:?subject=${title}&body=${text}%0D%0A%0D%0A${url}`,
        label: "Partager par email",
      },
    ];
  };

  const findProductBySlug = (slug) => {
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
        if (product.relatedProducts && product.relatedProducts.includes(p.id)) {
          return true;
        }
        return p.categoryId === product.categoryId && p.id !== product.id;
      })
      .slice(0, limit);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderRating = (rating) => {
    if (!rating) return null;
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
          <Star
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
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse" aria-hidden="true">
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
        <div className="sr-only">Chargement du produit...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="mb-8">
          {error ||
            "Le produit que vous recherchez n'existe pas ou a été supprimé."}
        </p>
        <Button asChild>
          <Link href="/product">Voir tous les produits</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Ajout du schema.org JSON-LD */}
      <ProductJsonLd product={product} />

      <main className="bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
        <div className="container mx-auto px-4 mb-6">
          <nav
            className="flex items-center text-sm text-gray-500 dark:text-gray-400"
            aria-label="Fil d'Ariane"
          >
            <Link
              href="/"
              className="hover:text-gray-900 dark:hover:text-white"
            >
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" aria-hidden="true" />
            <Link
              href="/product"
              className="hover:text-gray-900 dark:hover:text-white"
            >
              Produits
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" aria-hidden="true" />
            {categoryInfo && (
              <>
                <Link
                  href={categoryInfo.href || `/categories/${categoryInfo.id}`}
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  {categoryInfo.name}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" aria-hidden="true" />
              </>
            )}
            <span
              className="text-gray-900 dark:text-white font-medium truncate"
              aria-current="page"
            >
              {product.name}
            </span>
          </nav>
        </div>

        <div className="container mx-auto px-4">
          <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="space-y-4">
                <div className="relative h-96 bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={
                      product.gallery?.[selectedImage] ||
                      product.image ||
                      "/placeholder.svg?height=384&width=384" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
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

                {product.gallery && product.gallery.length > 0 && (
                  <div
                    className="flex space-x-2 overflow-x-auto pb-2"
                    role="group"
                    aria-label="Galerie d'images du produit"
                  >
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
                        aria-label={`Image ${index + 1} du produit`}
                        aria-pressed={selectedImage === index}
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
                                aria-hidden="true"
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
                            <div className="relative share-dropdown-container">
                              <button
                                onClick={handleShare}
                                className="p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                                aria-label="Partager"
                                aria-expanded={showShareDropdown}
                                aria-haspopup="true"
                              >
                                <Share2
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>

                              {showShareDropdown && (
                                <div
                                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="share-button"
                                >
                                  <div className="py-1">
                                    {getShareLinks().map((platform) => (
                                      <a
                                        key={platform.name}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() =>
                                          setShowShareDropdown(false)
                                        }
                                        aria-label={platform.label}
                                        role="menuitem"
                                      >
                                        {platform.icon}
                                        <span>{platform.name}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
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

                  {product.features && product.features.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Caractéristiques principales:
                      </h3>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check
                              className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
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

                {product.colors && product.colors.length > 0 && (
                  <ColorSelector
                    colors={product.colors}
                    selectedColor={selectedColor}
                    onChange={setSelectedColor}
                  />
                )}

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                        disabled={quantity <= 1}
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
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
                        aria-label="Quantité"
                      />
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                      disabled={
                        !product.inStock ||
                        (product.colors &&
                          product.colors.length > 0 &&
                          !selectedColor)
                      }
                      aria-label="Ajouter au panier"
                    >
                      <ShoppingCart
                        className="h-5 w-5 mr-2"
                        aria-hidden="true"
                      />
                      Ajouter au panier
                    </Button>
                  </div>
                  {!product.inStock && (
                    <Alert variant="destructive">
                      <Info className="h-4 w-4 mr-2" aria-hidden="true" />
                      <AlertDescription>
                        Ce produit est actuellement en rupture de stock. Vous
                        pouvez l'ajouter à vos favoris pour être notifié
                        lorsqu'il sera à nouveau disponible.
                      </AlertDescription>
                    </Alert>
                  )}

                  {product.colors &&
                    product.colors.length > 0 &&
                    !selectedColor && (
                      <Alert>
                        <Info className="h-4 w-4 mr-2" aria-hidden="true" />
                        <AlertDescription>
                          Veuillez sélectionner une couleur avant d'ajouter au
                          panier.
                        </AlertDescription>
                      </Alert>
                    )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-8">
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="specs">Spécifications</TabsTrigger>
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
                            <Check
                              className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
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
                      {product.colors && product.colors.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Couleurs disponibles
                          </h4>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex flex-wrap gap-2">
                              {product.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <div
                                    className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                                    style={{
                                      background:
                                        color === "Multicolore"
                                          ? "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
                                          : colorMap[color] || "#808080",
                                    }}
                                  />
                                  <Badge
                                    variant="outline"
                                    className="bg-white dark:bg-gray-700"
                                  >
                                    {color}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Informations produit
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Marque:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {product.brand}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Catégorie:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {product.category}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Référence:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                REF-{product.id}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Garantie:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                2 ans
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </article>
        </div>

        {relatedProducts.length > 0 && (
          <section
            className="container mx-auto px-4 mt-16"
            aria-labelledby="related-products-heading"
          >
            <h2
              id="related-products-heading"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Produits similaires
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <article
                  key={relatedProduct.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={
                        relatedProduct.image ||
                        "/placeholder.svg?height=192&width=256" ||
                        "/placeholder.svg"
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
                      href={`/product/${
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
                        onClick={() =>
                          router.push(
                            `/product/${
                              relatedProduct.slug || relatedProduct.id
                            }`
                          )
                        }
                        className="h-8 w-8 p-0 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black"
                        aria-label={`Voir ${relatedProduct.name}`}
                      >
                        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 mt-12">
          <Button variant="outline" asChild className="flex items-center">
            <Link href="/product">
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Retour aux produits
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
