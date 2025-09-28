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
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { colorMap } from "@/data/product";

export default function CartPageClient() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState(null);
  const [couponSuccess, setCouponSuccess] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Avoid hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug: log cart contents to console
  useEffect(() => {
    console.log("Cart contents:", cart);
    console.log("Cart length:", cart.length);
  }, [cart]);

  // Safely calculate the cart total, preventing NaN errors
  const cartTotal = cart.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
  const totalItems = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  // Recalculate discount if the cart total changes
  useEffect(() => {
    if (!appliedCoupon) {
      setDiscount(0);
      return;
    }
    // Re-apply the correct discount based on the current cart total
    if (appliedCoupon === "promo10") {
      setDiscount(cartTotal * 0.1);
    } else if (appliedCoupon === "promo20") {
      setDiscount(cartTotal * 0.2);
    } else if (appliedCoupon === "welcome") {
      setDiscount(50);
    }
  }, [cartTotal, appliedCoupon]);

  // Calculate shipping cost
  const shippingCost = cartTotal > 500 ? 0 : 30;
  const totalWithShipping = cartTotal + shippingCost - discount;

  const handleQuantityChange = (id, selectedColor, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      // Trouver l'article pour obtenir sa taille
      const item = cart.find(item =>
        item.id === id && item.selectedColor === selectedColor
      );

      if (item) {
        updateQuantity(id, selectedColor, newQuantity, item.selectedTaille || null);
      }
    }
  };

  const handleRemoveItem = (id, selectedColor) => {
    // Trouver l'article pour obtenir sa taille
    const item = cart.find(item =>
      item.id === id && item.selectedColor === selectedColor
    );

    if (item) {
      removeFromCart(id, selectedColor, item.selectedTaille || null);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
      clearCart();
    }
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();

    // Reset messages
    setCouponError(null);
    setCouponSuccess(null);
    setAppliedCoupon(null);
    setDiscount(0);

    const trimmedCode = couponCode.trim();
    if (!trimmedCode) {
      setCouponError("Veuillez saisir un code promo");
      return;
    }

    // Simulate coupon verification
    if (trimmedCode.toLowerCase() === "promo10") {
      setCouponSuccess("Code promo appliqué avec succès ! -10%");
      setDiscount(cartTotal * 0.1);
      setAppliedCoupon("promo10");
    } else if (trimmedCode.toLowerCase() === "promo20") {
      setCouponSuccess("Code promo appliqué avec succès ! -20%");
      setDiscount(cartTotal * 0.2);
      setAppliedCoupon("promo20");
    } else if (trimmedCode.toLowerCase() === "welcome") {
      setCouponSuccess("Code promo appliqué avec succès ! -50 MAD");
      setDiscount(50);
      setAppliedCoupon("welcome");
    } else {
      setCouponError("Code promo invalide ou expiré");
    }
  };

  const formatPrice = (price) => {
    // Ensure price is a number before formatting
    const numericPrice = Number(price) || 0;
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  // Function to get the color hex code
  const getColorHex = (colorName) => {
    if (!colorName) return "#808080"; // Default gray
    return colorMap[colorName] || "#808080";
  };

  // Display a loading spinner until the component is mounted on the client
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Display "Empty Cart" message if there are no items
  if (!cart || cart.length === 0) {
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
              <Button
                variant="outline"
                asChild
                className="flex items-center bg-transparent"
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button
                asChild
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Link href="/product">
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

  // Main cart view
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
            href="/product"
            className="inline-flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuer mes achats
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
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

              {/* Items List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {cart.map((item) => {
                  // Create a unique key for each item
                  const itemKey = `${item.id}-${item.selectedColor || "default"}`;
                  const itemPrice = Number(item.price) || 0;
                  const itemQuantity = Number(item.quantity) || 0;
                  const itemTotal = itemPrice * itemQuantity;

                  return (
                    <div
                      key={itemKey}
                      className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                      <div className="relative h-24 w-24 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

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

                            {item.category && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {item.category}
                              </p>
                            )}

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
                              {formatPrice(itemPrice)} / unité
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {formatPrice(itemTotal)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.selectedColor,
                                  itemQuantity - 1
                                )
                              }
                              disabled={itemQuantity <= 1}
                              className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium min-w-[50px] text-center">
                              {itemQuantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.selectedColor,
                                  itemQuantity + 1
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
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Récapitulatif de commande
              </h2>

              <form onSubmit={handleCouponSubmit} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Code promo
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Entrez votre code"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Appliquer
                  </Button>
                </div>

                {couponError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {couponError}
                  </p>
                )}

                {couponSuccess && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    {couponSuccess}
                  </p>
                )}
              </form>

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

              <Button
                onClick={() => router.push("/checkout")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 mb-6"
                size="lg"
              >
                Passer à la caisse
              </Button>

              <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 flex-shrink-0 text-green-500" />
                  <span>Livraison rapide et sécurisée</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 flex-shrink-0 text-orange-500" />
                  <span>Retours faciles sous 14 jours</span>
                </div>
              </div>

              <div className="border-l-4 mt-6 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <svg
                    className="h-5 w-5 text-yellow-500 dark:text-yellow-300 mt-0.5 mr-3 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-0.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-100 mb-1.5">
                      Information importante
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-200/90 text-base leading-snug">
                      Certains produits nécessitent un paiement d'avance. Le
                      montant exact vous sera communiqué lors de la
                      confirmation de commande.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}