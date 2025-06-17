"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  AlertTriangle,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { colorMap } from "@/data/product";

export default function CartPageClient() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState(null);
  const [couponSuccess, setCouponSuccess] = useState(null);
  const [discount, setDiscount] = useState(0);

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculer le total du panier
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculer les frais de livraison
  const shippingCost = cartTotal > 500 ? 0 : 50;
  const totalWithShipping = cartTotal + shippingCost - discount;

  const handleQuantityChange = (id, selectedColor, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateQuantity(id, selectedColor, newQuantity);
    }
  };

  const handleRemoveItem = (id, selectedColor) => {
    removeFromCart(id, selectedColor);
  };

  const handleClearCart = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
      clearCart();
    }
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();

    // Réinitialiser les messages
    setCouponError(null);
    setCouponSuccess(null);

    if (!couponCode.trim()) {
      setCouponError("Veuillez saisir un code promo");
      return;
    }

    // Simuler la vérification d'un code promo
    if (couponCode.toLowerCase() === "promo10") {
      setCouponSuccess("Code promo appliqué avec succès ! -10%");
      setDiscount(cartTotal * 0.1);
    } else if (couponCode.toLowerCase() === "promo20") {
      setCouponSuccess("Code promo appliqué avec succès ! -20%");
      setDiscount(cartTotal * 0.2);
    } else if (couponCode.toLowerCase() === "welcome") {
      setCouponSuccess("Code promo appliqué avec succès ! -50 MAD");
      setDiscount(50);
    } else {
      setCouponError("Code promo invalide ou expiré");
      setDiscount(0);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Fonction pour obtenir la couleur hex
  const getColorHex = (colorName) => {
    if (!colorName) return null;
    return colorMap[colorName] || "#808080";
  };

  // Affichage pendant le chargement
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Panier vide
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Votre panier est vide
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Vous n'avez pas encore ajouté de produits à votre panier.
              Découvrez notre catalogue pour trouver des produits qui vous
              plaisent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild className="flex items-center">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button
                asChild
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Link href="/produits">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Parcourir les produits
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 dark:text-white mb-2">
              Mon Panier
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {totalItems} article{totalItems > 1 ? "s" : ""} dans votre panier
            </p>
          </div>
          <Link
            href="/produits"
            className="inline-flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuer mes achats
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles du panier */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
              {/* Header du panier */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Articles ({totalItems})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Vider le panier
                  </Button>
                </div>
              </div>

              {/* Liste des articles */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor || "default"}`}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >
                    {/* Image du produit */}
                    <div className="relative h-24 w-24 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* Informations du produit */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            <Link
                              href={`/produits/${item.slug || item.id}`}
                              className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </h3>

                          {/* Catégorie */}
                          {item.category && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {item.category}
                            </p>
                          )}

                          {/* Couleur sélectionnée */}
                          {item.selectedColor && (
                            <div className="flex items-center mb-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                Couleur:
                              </span>
                              <div className="flex items-center">
                                <div
                                  className={cn(
                                    "w-4 h-4 rounded-full mr-2",
                                    (getColorHex(item.selectedColor) ===
                                      "#FFFFFF" ||
                                      getColorHex(item.selectedColor) ===
                                        "#F5F5DC" ||
                                      getColorHex(item.selectedColor) ===
                                        "#FFFF00") &&
                                      "border border-gray-300 dark:border-gray-600"
                                  )}
                                  style={{
                                    background:
                                      item.selectedColor === "Multicolore"
                                        ? "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
                                        : getColorHex(item.selectedColor),
                                  }}
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {item.selectedColor}
                                </span>
                              </div>
                            </div>
                          )}

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatPrice(item.price)} / unité
                          </p>
                        </div>

                        {/* Prix total de l'article */}
                        <div className="text-right">
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Contrôles de quantité et suppression */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                            className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleRemoveItem(item.id, item.selectedColor)
                          }
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Récapitulatif de commande */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Récapitulatif de commande
              </h2>

              {/* Code promo */}
              {/*
              <form onSubmit={handleCouponSubmit} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Code promo</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Entrez votre code"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <Button type="submit" size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Appliquer
                  </Button>
                </div>

                {couponError && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{couponError}</p>}

                {couponSuccess && <p className="mt-2 text-sm text-green-600 dark:text-green-400">{couponSuccess}</p>}
              </form>
              */}

              {/* Détails des prix */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600 dark:text-gray-400">
                    Sous-total ({totalItems} articles)
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-base">
                    <span className="text-green-600 dark:text-green-400">
                      Réduction
                    </span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-base">
                  <span className="text-gray-600 dark:text-gray-400">
                    Frais de livraison
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {shippingCost === 0 ? "Gratuit" : formatPrice(shippingCost)}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">
                    {formatPrice(totalWithShipping)}
                  </span>
                </div>
              </div>

              {/* Bouton de commande */}
              <Button
                onClick={() => router.push("/checkout")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 mb-6"
                size="lg"
              >
                Passer à la caisse
              </Button>

              {/* Informations de service */}
              <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 flex-shrink-0 text-green-500" />
                  <span>Livraison gratuite à partir de 500 MAD</span>
                </div>

                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
                  <span>Retours gratuits sous 30 jours</span>
                </div>

                <div className="flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2 flex-shrink-0 text-purple-500" />
                  <span>Paiement 100% sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
