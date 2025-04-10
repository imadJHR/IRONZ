"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  Truck,
  ShieldCheck,
  ChevronRight,
  Star,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BrandsMarquee from "@/components/brands-marquee";

import { categories, brands, productUtils } from "@/data/product";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    slug: "optimiser-entrainement-musculation",
    title: "Comment optimiser votre entraînement de musculation",
    excerpt:
      "Découvrez les meilleures techniques pour maximiser vos résultats en musculation.",
    image: "/placeholder.svg?height=400&width=600&text=Blog+Post+1",
    category: "Musculation",
    author: "Thomas Dubois",
    date: "2023-11-15",
  },
  {
    id: "2",
    slug: "nutrition-sportive-guide",
    title: "Guide complet de la nutrition sportive",
    excerpt:
      "Tout ce que vous devez savoir sur l'alimentation pour améliorer vos performances.",
    image: "/placeholder.svg?height=400&width=600&text=Blog+Post+2",
    category: "Nutrition",
    author: "Sophie Martin",
    date: "2023-10-28",
  },
  {
    id: "3",
    slug: "equipement-essentiel-home-gym",
    title: "L'équipement essentiel pour votre home gym",
    excerpt:
      "Les indispensables pour créer un espace d'entraînement efficace chez vous.",
    image: "/placeholder.svg?height=400&width=600&text=Blog+Post+3",
    category: "Équipement",
    author: "Marc Leroy",
    date: "2023-10-10",
  },
];

const faqs = [
  {
    question:
      "Comment choisir le bon équipement pour ma salle de sport à domicile ?",
    answer:
      "Pour choisir le bon équipement, considérez d'abord vos objectifs fitness, l'espace disponible et votre budget. Nous recommandons de commencer par des équipements polyvalents comme un banc réglable, des haltères ajustables et un tapis de sol. N'hésitez pas à contacter notre équipe pour des conseils personnalisés.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Nos délais de livraison varient selon votre localisation. En général, comptez 2-3 jours ouvrés pour la France métropolitaine, 3-5 jours pour l'Europe et 5-10 jours pour le reste du monde. Vous recevrez un email de confirmation avec un numéro de suivi dès l'expédition de votre commande.",
  },
  {
    question: "Proposez-vous un service d'installation pour les équipements ?",
    answer:
      "Oui, nous proposons un service d'installation professionnel pour les équipements volumineux comme les stations de musculation et les tapis de course. Ce service est disponible dans certaines régions et peut être ajouté lors de votre commande. Contactez notre service client pour plus d'informations.",
  },
  {
    question: "Quelle est votre politique de retour ?",
    answer:
      "Nous offrons une garantie de satisfaction de 30 jours. Si vous n'êtes pas satisfait de votre achat, vous pouvez retourner le produit dans son emballage d'origine pour un remboursement complet ou un échange. Les frais de retour sont à la charge du client, sauf en cas de produit défectueux.",
  },
  {
    question:
      "Vos suppléments sont-ils testés pour les substances interdites ?",
    answer:
      "Absolument. Tous nos suppléments nutritionnels sont fabriqués dans des installations certifiées et sont testés par des laboratoires indépendants pour garantir leur pureté et l'absence de substances interdites. Nous fournissons des certificats d'analyse sur demande.",
  },
];

export default function Home() {
  const { addToCart } = useCart();
  const { addToFavorites, isInFavorites, removeFromFavorites } = useFavorites();

  const featuredProducts = productUtils.getFeaturedProducts().slice(0, 8);
  const newArrivals = productUtils.getNewProducts().slice(0, 8);
  const bestSellers = productUtils.getFeaturedProducts().slice(0, 8);
  const specialOffers = productUtils.getDiscountedProducts().slice(0, 6);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
    }).format(price);
  };

  const toggleFavorite = (product) => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const featuredProduct =
    specialOffers.length > 0 ? specialOffers[0] : featuredProducts[0];

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-18 bg-gray-50">
        <section className="relative  pt-16 pb-20 md:pt-24 md:pb-32 bg-black text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1200&width=2000"
              alt="Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Équipement de Fitness{" "}
                <span className="text-yellow-400">Professionnel</span> pour Tous
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Découvrez notre gamme complète d'équipements de fitness,
                suppléments alimentaires et accessoires de musculation et d'arts
                martiaux de qualité professionnelle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6"
                >
                  <Link href="/produits">Découvrir nos produits</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-medium text-lg px-8 py-6"
                >
                  <Link href="/promotions">Nos promotions</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 bg-gradient-to-r from-yellow-500 to-yellow-400">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white rounded-full p-2 mr-4">
                  <TrendingUp className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-black text-xl">
                    Offres Spéciales
                  </h3>
                  <p className="text-black/80">
                    Jusqu'à 30% de réduction sur une sélection de produits
                  </p>
                </div>
              </div>
              <Button asChild className="bg-black hover:bg-gray-800 text-white">
                <Link href="/produits?sort=discount">
                  Voir toutes les offres
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Nos Catégories
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explorez notre large sélection de produits pour tous vos besoins
                en fitness et arts martiaux
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="group relative rounded-xl overflow-hidden h-60 bg-gray-100 dark:bg-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={index < 2}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-white font-medium text-xl mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                      {category.description ||
                        "Découvrez notre sélection de produits"}
                    </p>
                    <Link
                      href={category.href}
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                    >
                      Découvrir
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Nos Produits
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez notre sélection de produits de qualité professionnelle
              </p>
            </div>

            <Tabs defaultValue="featured" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto pb-2">
                <TabsList className="bg-gray-100 dark:bg-gray-800 flex-nowrap">
                  <TabsTrigger
                    value="featured"
                    className="text-sm md:text-base whitespace-nowrap"
                  >
                    Populaires
                  </TabsTrigger>
                  <TabsTrigger
                    value="new"
                    className="text-sm md:text-base whitespace-nowrap"
                  >
                    Nouveautés
                  </TabsTrigger>
                  <TabsTrigger
                    value="bestsellers"
                    className="text-sm md:text-base whitespace-nowrap"
                  >
                    Meilleures Ventes
                  </TabsTrigger>
                  <TabsTrigger
                    value="offers"
                    className="text-sm md:text-base whitespace-nowrap"
                  >
                    Offres Spéciales
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="featured">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
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
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Nouveau
                          </div>
                        )}
                        {product.discount > 0 && (
                          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {product.category}
                        </div>
                        <Link href={`/produits/${product.slug}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.oldPrice ? (
                              <div className="flex items-center">
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  {formatPrice(product.oldPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-8 bg-yellow-500 w-8 p-0 rounded-full"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="new">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {newArrivals.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
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
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Nouveau
                        </div>
                        {product.discount > 0 && (
                          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {product.category}
                        </div>
                        <Link href={`/produits/${product.slug}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.oldPrice ? (
                              <div className="flex items-center">
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  {formatPrice(product.oldPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-8 bg-yellow-500 w-8 p-0 rounded-full"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bestsellers">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {bestSellers.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
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
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Nouveau
                          </div>
                        )}
                        {product.discount > 0 && (
                          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {product.category}
                        </div>
                        <Link href={`/produits/${product.slug}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.oldPrice ? (
                              <div className="flex items-center">
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  {formatPrice(product.oldPrice)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-8 bg-yellow-500 w-8 p-0 rounded-full"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="offers">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {specialOffers.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
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
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Nouveau
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {product.category}
                        </div>
                        <Link href={`/produits/${product.slug}`}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className="font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                {formatPrice(product.oldPrice)}
                              </span>
                            </div>
                            <div className="text-xs text-green-600 font-medium">
                              Économisez{" "}
                              {formatPrice(product.oldPrice - product.price)}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-8 bg-yellow-500 w-8 p-0 rounded-full"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-10">
              <Button
                asChild
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                <Link href="/produits">
                  Voir tous les produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src={
                    featuredProduct.image ||
                    "/placeholder.svg?height=1000&width=800"
                  }
                  alt={featuredProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Produit Vedette
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  {featuredProduct.name}
                </h2>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(featuredProduct.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-600"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 ml-2">
                    ({featuredProduct.reviewCount || 0} avis)
                  </span>
                </div>
                <p className="text-gray-300 mb-6">
                  {featuredProduct.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {featuredProduct.features &&
                    featuredProduct.features
                      .slice(0, 4)
                      .map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                </ul>
                <div className="flex items-center mb-6">
                  {featuredProduct.oldPrice && (
                    <span className="text-gray-400 line-through text-xl mr-3">
                      {formatPrice(featuredProduct.oldPrice)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(featuredProduct.price)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6"
                    onClick={() => addToCart(featuredProduct)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-white text-white hover:bg-white/10 font-medium text-lg px-8 py-6"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Nos Marques Partenaires
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nous collaborons avec les meilleures marques du marché pour vous
                offrir des produits d'exception
              </p>
            </div>

            {/* Marquee component for brands */}
            <BrandsMarquee brands={brands} />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Pourquoi Choisir <span className="text-yellow-500">IRONZ</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nous nous engageons à vous offrir les meilleurs produits et
                services pour atteindre vos objectifs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  Qualité Garantie
                </h3>
                <p className="text-gray-600">
                  Tous nos produits sont sélectionnés avec soin et testés pour
                  garantir une qualité professionnelle.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  Expertise Fitness
                </h3>
                <p className="text-gray-600">
                  Notre équipe d'experts est là pour vous conseiller et vous
                  aider à choisir les produits adaptés à vos besoins.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  Marques Premium
                </h3>
                <p className="text-gray-600">
                  Nous collaborons avec les meilleures marques du marché pour
                  vous offrir des produits d'exception.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  Livraison Rapide
                </h3>
                <p className="text-gray-600">
                  Livraison rapide et sécurisée partout en France et en Europe,
                  avec suivi en temps réel.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  Satisfaction Client
                </h3>
                <p className="text-gray-600">
                  Votre satisfaction est notre priorité, avec un service client
                  disponible 7j/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Conseils & Actualités
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  Découvrez nos derniers articles, conseils et guides pour
                  optimiser votre entraînement
                </p>
              </div>
              <Link
                href="/blog"
                className="mt-4 md:mt-0 inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700 group"
              >
                Voir tous les articles
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-0 left-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <span>
                          {new Date(post.date).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{post.author}</span>
                      </div>
                      <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-yellow-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-yellow-600 font-medium group-hover:underline">
                        Lire l'article
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Questions Fréquentes
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trouvez rapidement des réponses à vos questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-heading font-medium text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Vous ne trouvez pas la réponse à votre question ?
                </p>
                <Button
                  asChild
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  <Link href="/contact">Contactez-nous</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Restez informé
              </h2>
              <p className="text-gray-800 mb-8">
                Inscrivez-vous à notre newsletter pour recevoir nos offres
                exclusives et nos conseils fitness
              </p>

              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <Button className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-3">
                  S'inscrire
                </Button>
              </form>
              <p className="text-sm text-gray-700 mt-4">
                En vous inscrivant, vous acceptez de recevoir nos emails
                marketing. Vous pouvez vous désinscrire à tout moment.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
