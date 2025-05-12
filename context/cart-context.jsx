"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)

  // Load cart from localStorage on client side
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage")
      }
    }
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }

    // Calculate total items
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)
  }, [cart])

  function addToCart(product, quantity = 1, selectedColor = null) {
    setCart((prevCart) => {
      // Vérifier si le produit avec la même couleur existe déjà dans le panier
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedColor === selectedColor,
      )

      if (existingItemIndex !== -1) {
        // Si le produit existe déjà, mettre à jour la quantité
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        return updatedCart
      } else {
        // Sinon, ajouter le nouveau produit
        const newItem = {
          ...product,
          quantity,
          selectedColor,
        }
        const updatedCart = [...prevCart, newItem]
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        return updatedCart
      }
    })
  }

  const updateQuantity = (productId, selectedColor, quantity) => {
    if (quantity < 1) return

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedColor === selectedColor ? { ...item, quantity } : item,
      ),
    )
  }

  const removeFromCart = (productId, selectedColor) => {
    setCart((prevCart) => {
      // Si une couleur est spécifiée, on supprime uniquement le produit avec cette couleur
      if (selectedColor) {
        return prevCart.filter((item) => !(item.id === productId && item.selectedColor === selectedColor))
      }
      // Sinon, on supprime toutes les variantes du produit (comportement par défaut)
      return prevCart.filter((item) => item.id !== productId)
    })
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
  }

  const toggleCart = () => {
    setCartOpen((prev) => !prev)
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        itemCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleCart,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
