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
  quantity: number
}

// 2. Définition du type pour le contexte
interface CartContextType {
  cart: CartItem[]
  addToCart: (productToAdd: CartItem) => void
  updateQuantity: (productId: string | number, selectedColor: string | null, quantity: number) => void
  removeFromCart: (productId: string | number, selectedColor: string | null) => void
  clearCart: () => void
  itemCount: number
  cartTotal: number
  isInCart: (productId: string | number, selectedColor?: string | null) => boolean
  getCartItem: (productId: string | number, selectedColor?: string | null) => CartItem | undefined
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
      const existingItemIndex = prevCart.findIndex(
        (item) => 
          item.id === productToAdd.id && 
          item.selectedColor === productToAdd.selectedColor
      )

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
          selectedColor: productToAdd.selectedColor || null,
        }
        return [...prevCart, newItem]
      }
    })
  }
  
  const updateQuantity = (
    productId: string | number, 
    selectedColor: string | null, 
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(productId, selectedColor)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity } 
          : item
      )
    )
  }
  
  const removeFromCart = (productId: string | number, selectedColor: string | null) => {
    setCart((prevCart) => {
        return prevCart.filter((item) => 
            !(item.id === productId && item.selectedColor === selectedColor)
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
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }
  
  const isInCart = (productId: string | number, selectedColor: string | null = null): boolean => {
    return cart.some(
        (item) => item.id === productId && item.selectedColor === selectedColor
    )
  }

  const getCartItem = (productId: string | number, selectedColor: string | null = null): CartItem | undefined => {
    return cart.find(
        (item) => item.id === productId && item.selectedColor === selectedColor
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