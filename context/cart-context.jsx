"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the cart context
const CartContext = createContext()

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

// Cart provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  // Initialize cart from localStorage on client side
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        setCart([])
      }
    }
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }

    // Calculate item count and total
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setCartTotal(total)
  }, [cart])

  // Toggle cart open/close
  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))

    // Remove from localStorage if cart becomes empty
    if (cart.length === 1) {
      localStorage.removeItem("cart")
    }
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
  }

  // Context value
  const value = {
    cart,
    cartOpen,
    itemCount,
    cartTotal,
    toggleCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

