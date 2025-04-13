"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  RefreshCw,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

export default function CartPageClient() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } =
    useCart();
  const [mounted, setMounted] = useState(false);

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculer les frais de livraison
  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const totalWithShipping = cartTotal + shippingCost;

  // Vérifier si le panier est vide
  const isCartEmpty = !mounted || cart.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuer mes achats
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">
          Mon Panier
        </h1>

        {isCartEmpty ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <ShoppingCart className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-xl font-heading font-semibold mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explorez notre catalogue et ajoutez des produits à votre panier
            </p>
            <Link href="/">
              <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900">
                Découvrir nos produits
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-heading font-semibold">
                      Articles (
                      {cart.reduce((total, item) => total + item.quantity, 0)})
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Vider le panier
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 flex flex-col sm:flex-row items-start sm:items-center"
                    >
                      <div className="relative h-24 w-24 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-4 sm:mb-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      <div className="flex-1 sm:ml-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                              <Link
                                href={`/produits/${item.id}`}
                                className="hover:text-yellow-600 dark:hover:text-yellow-400"
                              >
                                {item.name}
                              </Link>
                            </h3>
                            {item.category && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {item.category}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center mt-2 sm:mt-0">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {item.price.toFixed(2)} MAD
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 text-gray-700 dark:text-gray-300 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span>Supprimer</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-heading font-semibold mb-6">
                  Récapitulatif de commande
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Sous-total
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {cartTotal.toFixed(2)} MAD
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Frais de livraison
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {shippingCost === 0
                        ? "Gratuit"
                        : `${shippingCost.toFixed(2)} €`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="font-bold text-xl text-gray-900 dark:text-white">
                      {totalWithShipping.toFixed(2)} MAD
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 py-6"
                >
                  Passer à la caisse
                </Button>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Truck className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Livraison gratuite à partir de 500 MAD d'achat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
