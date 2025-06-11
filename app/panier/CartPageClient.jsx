"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, ShoppingBag, AlertTriangle } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { colorMap } from "@/data/product"

export default function CartPageClient() {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState(null)
  const [couponSuccess, setCouponSuccess] = useState(null)
  const [discount, setDiscount] = useState(0)

  const handleQuantityChange = (id, selectedColor, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateQuantity(id, newQuantity, selectedColor)
    }
  }

  const handleRemoveItem = (id, selectedColor) => {
    removeFromCart(id, selectedColor)
  }

  const handleCouponSubmit = (e) => {
    e.preventDefault()

    // Réinitialiser les messages
    setCouponError(null)
    setCouponSuccess(null)

    // Simuler la vérification d'un code promo
    if (couponCode.toLowerCase() === "promo10") {
      setCouponSuccess("Code promo appliqué avec succès !")
      setDiscount(totalPrice * 0.1) // 10% de réduction
    } else if (couponCode.toLowerCase() === "promo20") {
      setCouponSuccess("Code promo appliqué avec succès !")
      setDiscount(totalPrice * 0.2) // 20% de réduction
    } else {
      setCouponError("Code promo invalide ou expiré")
      setDiscount(0)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Votre panier est vide</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Vous n'avez pas encore ajouté de produits à votre panier. Découvrez notre catalogue pour trouver des
            produits qui vous plaisent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Link href="/produits">
                <ShoppingBag className="h-4 w-4 mr-2" aria-hidden="true" />
                Parcourir les produits
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Votre panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item) => (
                    <li key={`${item.id}-${item.selectedColor || "default"}`} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex items-center">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                <Link
                                  href={`/produits/${item.slug || item.id}`}
                                  className="hover:text-yellow-600 dark:hover:text-yellow-400"
                                >
                                  {item.name}
                                </Link>
                              </h3>

                              {/* Affichage de la couleur sélectionnée */}
                              {item.selectedColor && (
                                <div className="flex items-center mt-1">
                                  <div
                                    className={cn(
                                      "h-4 w-4 rounded-full mr-2",
                                      (colorMap[item.selectedColor] === "#FFFFFF" ||
                                        colorMap[item.selectedColor] === "#F5F5DC" ||
                                        colorMap[item.selectedColor] === "#FFFF00") &&
                                        "border border-gray-300",
                                    )}
                                    style={{
                                      background:
                                        item.selectedColor === "Multicolore"
                                          ? "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
                                          : colorMap[item.selectedColor] || "#808080",
                                    }}
                                  />
                                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.selectedColor}</span>
                                </div>
                              )}

                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {formatPrice(item.price)} / unité
                              </p>
                            </div>
                            <p className="text-right font-medium text-gray-900 dark:text-white">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.selectedColor, item.quantity - 1)}
                                className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                                disabled={item.quantity <= 1}
                                aria-label="Diminuer la quantité"
                              >
                                <Minus className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <span className="w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.selectedColor, item.quantity + 1)}
                                className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id, item.selectedColor)}
                              className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                              aria-label={`Supprimer ${item.name} du panier`}
                            >
                              <Trash2 className="h-4 w-4 mr-1" aria-hidden="true" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" asChild className="flex items-center">
              <Link href="/produits">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Continuer les achats
              </Link>
            </Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
              onClick={() => {
                if (window.confirm("Êtes-vous sûr de vouloir vider votre panier ?")) {
                  clearCart()
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
              Vider le panier
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Récapitulatif de la commande</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-base">
                  <p className="text-gray-500 dark:text-gray-400">
                    Sous-total ({cart.reduce((total, item) => total + item.quantity, 0)} articles)
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">{formatPrice(totalPrice)}</p>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-base">
                    <p className="text-green-600 dark:text-green-400">Réduction</p>
                    <p className="font-medium text-green-600 dark:text-green-400">-{formatPrice(discount)}</p>
                  </div>
                )}

                <div className="flex justify-between text-base">
                  <p className="text-gray-500 dark:text-gray-400">Livraison</p>
                  <p className="font-medium text-gray-900 dark:text-white">Calculé à l'étape suivante</p>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-medium">
                  <p className="text-gray-900 dark:text-white">Total</p>
                  <p className="text-gray-900 dark:text-white">{formatPrice(totalPrice - discount)}</p>
                </div>
              </div>

              <form onSubmit={handleCouponSubmit} className="mt-6">
                <div className="flex">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Code promo"
                    className="flex-1 min-w-0 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400"
                  />
                  <Button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-l-none"
                  >
                    Appliquer
                  </Button>
                </div>

                {couponError && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{couponError}</p>}

                {couponSuccess && <p className="mt-2 text-sm text-green-600 dark:text-green-400">{couponSuccess}</p>}
              </form>

              <div className="mt-6">
                <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                  <Link href="/checkout">Passer à la caisse</Link>
                </Button>
              </div>

              <div className="mt-6">
                <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-700 dark:text-blue-300 text-sm">
                    Les prix affichés incluent la TVA. La livraison sera calculée à l'étape suivante en fonction de
                    votre adresse.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
