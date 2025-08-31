// Version simplifiée sans gestion de la taille
"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [mounted, setMounted] = useState(false)

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

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ironz-cart", JSON.stringify(cart))
    }
  }, [cart, mounted])
  
  const addToCart = (productToAdd) => {
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
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + (productToAdd.quantity || 1),
        }
        return updatedCart
      } else {
        const newItem = {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          image: productToAdd.image,
          slug: productToAdd.slug,
          category: productToAdd.category,
          selectedColor: productToAdd.selectedColor || null,
          quantity: productToAdd.quantity || 1,
        }
        return [...prevCart, newItem]
      }
    })
  }
  
  const updateQuantity = (productId, selectedColor, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, selectedColor);
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && 
        item.selectedColor === selectedColor
          ? { ...item, quantity } 
          : item,
      ),
    )
  }
  
  const removeFromCart = (productId, selectedColor) => {
    setCart((prevCart) => {
        return prevCart.filter((item) => 
            !(item.id === productId && 
              item.selectedColor === selectedColor)
        )
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
    return cart.some(
        (item) => 
            item.id === productId && 
            item.selectedColor === selectedColor
    );
  }

  const getCartItem = (productId, selectedColor = null) => {
    return cart.find(
        (item) => 
            item.id === productId && 
            item.selectedColor === selectedColor
    );
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