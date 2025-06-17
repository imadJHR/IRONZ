"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [mounted, setMounted] = useState(false)

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true)
    // Charger le panier depuis localStorage
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

  // Sauvegarder le panier dans localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ironz-cart", JSON.stringify(cart))
    }
  }, [cart, mounted])

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.error("Produit invalide:", product)
      return
    }

    setCart((prevCart) => {
      // Vérifier si le produit avec la même couleur existe déjà
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedColor === product.selectedColor,
      )

      if (existingItemIndex !== -1) {
        // Mettre à jour la quantité si le produit existe
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        }
        return updatedCart
      } else {
        // Ajouter le nouveau produit
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          slug: product.slug,
          category: product.category,
          selectedColor: product.selectedColor || null,
          quantity: quantity,
        }
        return [...prevCart, newItem]
      }
    })
  }

  const updateQuantity = (productId, selectedColor, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, selectedColor)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedColor === selectedColor ? { ...item, quantity } : item,
      ),
    )
  }

  const removeFromCart = (productId, selectedColor) => {
    setCart((prevCart) => {
      if (selectedColor !== undefined) {
        // Supprimer uniquement l'item avec la couleur spécifiée
        return prevCart.filter((item) => !(item.id === productId && item.selectedColor === selectedColor))
      } else {
        // Supprimer tous les items avec cet ID
        return prevCart.filter((item) => item.id !== productId)
      }
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const isInCart = (productId, selectedColor = null) => {
    return cart.some((item) => item.id === productId && item.selectedColor === selectedColor)
  }

  const getCartItem = (productId, selectedColor = null) => {
    return cart.find((item) => item.id === productId && item.selectedColor === selectedColor)
  }

  const value = {
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
