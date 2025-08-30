"use client"

import { createContext, useContext, useState, useEffect, useMemo } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on initial mount
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
        console.error("Error loading cart from localStorage:", error)
        localStorage.removeItem("ironz-cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ironz-cart", JSON.stringify(cart))
    }
  }, [cart, mounted])

  const addToCart = (productToAdd) => {
    if (!productToAdd || !productToAdd.id) {
      console.error("Invalid product added to cart:", productToAdd)
      return
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === productToAdd.id &&
          item.selectedColor === productToAdd.selectedColor &&
          item.selectedTaille === productToAdd.selectedTaille
      )

      if (existingItemIndex !== -1) {
        // If the exact item exists, update its quantity
        const updatedCart = [...prevCart]
        const existingItem = updatedCart[existingItemIndex]
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + productToAdd.quantity,
        }
        return updatedCart
      } else {
        // Otherwise, add the new product with all its details
        const newItem = {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          image: productToAdd.image,
          slug: productToAdd.slug,
          category: productToAdd.category,
          selectedColor: productToAdd.selectedColor || null,
          selectedTaille: productToAdd.selectedTaille || null,
          quantity: productToAdd.quantity,
        }
        return [...prevCart, newItem]
      }
    })
  }

  const updateQuantity = (productId, selectedColor, selectedTaille, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, selectedColor, selectedTaille)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedTaille === selectedTaille
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeFromCart = (productId, selectedColor, selectedTaille) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedTaille === selectedTaille
          )
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (productId, selectedColor = null, selectedTaille = null) => {
    return cart.some(
      (item) =>
        item.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedTaille === selectedTaille
    )
  }

  const getCartItem = (productId, selectedColor = null, selectedTaille = null) => {
    return cart.find(
      (item) =>
        item.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedTaille === selectedTaille
    )
  }
  
  // FIX 1: Use `useMemo` for efficient and correct calculation of derived state.
  // These values will now be correctly updated only when the `cart` changes.
  const itemCount = useMemo(() => {
    // FIX 2: Add robust parsing to prevent NaN errors.
    return cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0)
  }, [cart])

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    )
  }, [cart])


  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getCartItem,
    mounted,
    itemCount,
    cartTotal,
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