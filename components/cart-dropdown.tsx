"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, X, Plus, Minus, ArrowRight, LucideProps } from "lucide-react";
import { useCart, type CartItem } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { colorMap } from "@/data/product";

// Types
type ColorKey = keyof typeof colorMap;

interface CartDropdownProps {
  className?: string;
  onCartOpen?: () => void;
  onCartClose?: () => void;
}

interface QuantityButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  ariaLabel: string;
  icon: React.ComponentType<LucideProps>;
  variant: "decrement" | "increment";
}

function QuantityButton({ onClick, disabled = false, ariaLabel, icon: Icon, variant }: QuantityButtonProps){
  const baseClasses = "p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors";
  const disabledClasses = disabled ? " opacity-50 cursor-not-allowed" : "";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses}${disabledClasses}`}
      aria-label={ariaLabel}
      type="button"
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
    </button>
  );
}

export default function CartDropdown({ className = "", onCartOpen, onCartClose }: CartDropdownProps): JSX.Element {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Avoid hydration errors by only rendering cart content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle open/close callbacks
  useEffect(() => {
    if (isOpen) {
      onCartOpen?.();
    } else {
      onCartClose?.();
    }
  }, [isOpen, onCartOpen, onCartClose]);

  const cartItemCount = mounted ? cart.reduce((total: number, item: CartItem) => total + item.quantity, 0) : 0;

  const handleQuantityChange = (item: CartItem, newQuantity: number): void => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, item.selectedColor, newQuantity);
  };

  const handleRemoveItem = (item: CartItem, e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    removeFromCart(item.id, item.selectedColor);
  };

  const handleSheetOpenChange = (open: boolean): void => {
    setIsOpen(open);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const getColorBackground = (color: string): string => {
    if (color === "Multicolore") {
      return "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
    }
    return colorMap[color as ColorKey] || "#808080";
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`relative ${className}`} 
          aria-label={`Panier (${cartItemCount} articles)`}
          type="button"
        >
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          {cartItemCount > 0 && (
            <span 
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black animate-in zoom-in"
              aria-hidden="true"
            >
              {cartItemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="border-b pb-4 px-6 pt-6">
          <SheetTitle className="text-xl font-heading">Votre Panier</SheetTitle>
        </SheetHeader>

        {mounted && cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12 px-6">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
              <ShoppingCart className="h-6 w-6 text-gray-500 dark:text-gray-400" aria-hidden="true" />
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
            <div className="flex-1 overflow-y-auto py-4 px-6">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700" role="list">
                {mounted &&
                  cart.map((item: CartItem) => {
                    const itemKey = `${item.id}-${item.selectedColor || "default"}`;
                    const itemTotal = item.price * item.quantity;
                    
                    return (
                      <li key={itemKey} className="py-4" role="listitem">
                        <div className="flex items-start space-x-4">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                              unoptimized={item.image?.startsWith("http")}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate" title={item.name}>
                              {item.name}
                            </h4>
                            {item.selectedColor && (
                              <div className="flex items-center mt-1" title={`Couleur: ${item.selectedColor}`}>
                                <div
                                  className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 mr-1 flex-shrink-0"
                                  style={{
                                    background: getColorBackground(item.selectedColor),
                                  }}
                                  aria-hidden="true"
                                />
                                <span className="text-xs text-gray-500 dark:text-gray-400">{item.selectedColor}</span>
                              </div>
                            )}
                            <div className="flex items-center mt-2">
                              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded" role="group" aria-label="Contrôle de quantité">
                                <QuantityButton
                                  onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  ariaLabel="Diminuer la quantité"
                                  icon={Minus}
                                  variant="decrement"
                                />
                                <span className="px-3 text-xs text-gray-700 dark:text-gray-300 font-medium min-w-[2rem] text-center" aria-live="polite">
                                  {item.quantity}
                                </span>
                                <QuantityButton
                                  onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                  disabled={false}
                                  ariaLabel="Augmenter la quantité"
                                  icon={Plus}
                                  variant="increment"
                                />
                              </div>
                              <span className="ml-auto text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                {formatPrice(itemTotal)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleRemoveItem(item, e)}
                            className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1"
                            aria-label={`Supprimer ${item.name} du panier`}
                            type="button"
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-6 px-6 bg-gray-50/50 dark:bg-gray-900/50">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Sous-total</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Livraison</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Gratuite</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-yellow-600 dark:text-yellow-400">{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Taxes incluses. Livraison gratuite au Maroc.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  asChild
                  className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/panier" className="flex items-center justify-center">
                    Voir le panier
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800" 
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/checkout">Commander</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}