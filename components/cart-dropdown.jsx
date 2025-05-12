"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, X, Plus, Minus, ArrowRight } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { colorMap } from "@/data/product"

export default function CartDropdown() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItemCount = mounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={`Panier (${cartItemCount} articles)`}>
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black">
              {cartItemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-heading">Votre Panier</SheetTitle>
        </SheetHeader>

        {mounted && cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
              <ShoppingCart className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-900 dark:text-white">Votre panier est vide</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Commencez vos achats pour ajouter des produits
              </p>
            </div>
            <Button
              asChild
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/produits">Découvrir nos produits</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {mounted &&
                  cart.map((item) => (
                    <li key={`${item.id}-${item.selectedColor || "default"}`} className="py-4">
                      <div className="flex items-start space-x-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</h4>
                          {item.selectedColor && (
                            <div className="flex items-center mt-1">
                              <div
                                className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 mr-1"
                                style={{
                                  background:
                                    item.selectedColor === "Multicolore"
                                      ? "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
                                      : colorMap[item.selectedColor] || "#808080",
                                }}
                              />
                              <span className="text-xs text-gray-500 dark:text-gray-400">{item.selectedColor}</span>
                            </div>
                          )}
                          <div className="flex items-center mt-1">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50"
                                aria-label="Diminuer la quantité"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 text-xs text-gray-700 dark:text-gray-300">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="ml-auto text-sm font-medium text-gray-900 dark:text-white">
                              {(item.price * item.quantity).toFixed(2)} €
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedColor)}
                          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                          aria-label="Supprimer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Sous-total</span>
                  <span className="font-medium text-gray-900 dark:text-white">{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Livraison</span>
                  <span className="font-medium text-gray-900 dark:text-white">Calculé à la commande</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-medium">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">{cartTotal.toFixed(2)} €</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Taxes incluses. Frais de livraison calculés à l'étape suivante.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  asChild
                  className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/panier">
                    Voir le panier
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  <Link href="/checkout">Commander</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
