"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

// 1. Définition de l'interface pour un article du panier
export interface CartItem {
  id: string | number
  name: string
  price: number
  image: string
  slug: string
  category?: string
  selectedColor?: string | null
  selectedTaille?: string | null  // ✅ ADD THIS
  salePrice?: number              // ✅ ADD THIS
  oldPrice?: number               // ✅ ADD THIS
  quantity: number
}

// 2. Définition du type pour le contexte
interface CartContextType {
  cart: CartItem[]
  addToCart: (productToAdd: CartItem) => void
  updateQuantity: (
    productId: string | number,
    selectedColor: string | null,
    selectedTaille: string | null,  // ✅ ADD THIS
    quantity: number
  ) => void
  removeFromCart: (
    productId: string | number,
    selectedColor: string | null,
    selectedTaille: string | null  // ✅ ADD THIS
  ) => void
  clearCart: () => void
  itemCount: number
  cartTotal: number
  isInCart: (
    productId: string | number,
    selectedColor?: string | null,
    selectedTaille?: string | null  // ✅ ADD THIS
  ) => boolean
  getCartItem: (
    productId: string | number,
    selectedColor?: string | null,
    selectedTaille?: string | null  // ✅ ADD THIS
  ) => CartItem | undefined
  mounted: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState<boolean>(false)

  // Chargement du panier au montage
  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem("ironz-cart")
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart)
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart)
        }
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error)
        localStorage.removeItem("ironz-cart")
      }
    }
  }, [])

  // Sauvegarde automatique du panier
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ironz-cart", JSON.stringify(cart))
    }
  }, [cart, mounted])
  
  const addToCart = (productToAdd: CartItem) => {
    if (!productToAdd || !productToAdd.id) {
      console.error("Produit invalide:", productToAdd)
      return
    }

    setCart((prevCart) => {
      // Normalize missing variant keys to null: stored items persist explicit
      // null, but callers may omit selectedColor/selectedTaille (undefined).
      // Without this, `null === undefined` fails and duplicate lines are added.
      const incomingColor = productToAdd.selectedColor || null;
      const incomingTaille = productToAdd.selectedTaille || null;

      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === productToAdd.id &&
          (item.selectedColor || null) === incomingColor &&
          (item.selectedTaille || null) === incomingTaille
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart]
        const existingItem = updatedCart[existingItemIndex]
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + (productToAdd.quantity || 1),
        }
        return updatedCart
      } else {
        const newItem: CartItem = {
          ...productToAdd,
          quantity: productToAdd.quantity || 1,
          selectedColor: incomingColor,
          selectedTaille: incomingTaille,
        }
        return [...prevCart, newItem]
      }
    })
  }
  
  const updateQuantity = (
    productId: string | number,
    selectedColor: string | null,
    selectedTaille: string | null,  // ✅ ADD THIS
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(productId, selectedColor, selectedTaille)  // ✅ ADD PARAMETER
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId &&
        (item.selectedColor || null) === (selectedColor || null) &&
        (item.selectedTaille || null) === (selectedTaille || null)
          ? { ...item, quantity }
          : item
      )
    )
  }
  
  const removeFromCart = (
    productId: string | number,
    selectedColor: string | null,
    selectedTaille: string | null  // ✅ ADD THIS
  ) => {
    setCart((prevCart) => {
      return prevCart.filter(
        (item) =>
          !(
            item.id === productId &&
            (item.selectedColor || null) === (selectedColor || null) &&
            (item.selectedTaille || null) === (selectedTaille || null)
          )
      )
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartItemCount = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = (): number => {
    return cart.reduce(
      (total, item) =>
        total + (item.salePrice || item.price) * item.quantity,  // ✅ USE salePrice if available
      0
    )
  }
  
  const isInCart = (
      productId: string | number,
      selectedColor: string | null = null,
      selectedTaille: string | null = null  // ✅ ADD THIS
    ): boolean => {
      return cart.some(
        (item) =>
          item.id === productId &&
          (item.selectedColor || null) === (selectedColor || null) &&
          (item.selectedTaille || null) === (selectedTaille || null)
      )
    }

    const getCartItem = (
      productId: string | number,
      selectedColor: string | null = null,
      selectedTaille: string | null = null  // ✅ ADD THIS
    ): CartItem | undefined => {
      return cart.find(
        (item) =>
          item.id === productId &&
          (item.selectedColor || null) === (selectedColor || null) &&
          (item.selectedTaille || null) === (selectedTaille || null)
      )
    }

  const value: CartContextType = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemCount: getCartItemCount(),
    cartTotal: getCartTotal(),
    isInCart,
    getCartItem,
    mounted,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}