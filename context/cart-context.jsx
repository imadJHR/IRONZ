"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [mounted, setMounted] = useState(false)

  // Éviter les erreurs d'hydratation
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

  // Sauvegarder le panier dans localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ironz-cart", JSON.stringify(cart))
    }
  }, [cart, mounted])
  
  // MODIFICATION 1 : La fonction addToCart est maintenant entièrement corrigée
  const addToCart = (productToAdd) => {
    if (!productToAdd || !productToAdd.id) {
      console.error("Produit invalide:", productToAdd)
      return
    }

    setCart((prevCart) => {
      // Un produit est unique par son ID, sa TAILLE et sa COULEUR.
      const existingItemIndex = prevCart.findIndex(
        (item) => 
          item.id === productToAdd.id && 
          item.selectedColor === productToAdd.selectedColor &&
          item.selectedTaille === productToAdd.selectedTaille, // On vérifie aussi la taille !
      )

      if (existingItemIndex !== -1) {
        // Mettre à jour la quantité si le produit exact (même id, couleur et taille) existe
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + productToAdd.quantity,
        }
        return updatedCart
      } else {
        // Ajouter le nouveau produit avec toutes ses options
        const newItem = {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          image: productToAdd.image,
          slug: productToAdd.slug,
          category: productToAdd.category,
          selectedColor: productToAdd.selectedColor || null,
          selectedTaille: productToAdd.selectedTaille || null, // On sauvegarde la taille !
          quantity: productToAdd.quantity,
        }
        return [...prevCart, newItem]
      }
    })
  }
  
  // MODIFICATION 2 : UpdateQuantity prend maintenant la taille en compte
  const updateQuantity = (productId, selectedColor, selectedTaille, quantity) => {
    const uniqueIdentifier = { id: productId, color: selectedColor, taille: selectedTaille };
    
    if (quantity < 1) {
      removeFromCart(uniqueIdentifier.id, uniqueIdentifier.color, uniqueIdentifier.taille);
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === uniqueIdentifier.id && 
        item.selectedColor === uniqueIdentifier.color &&
        item.selectedTaille === uniqueIdentifier.taille
          ? { ...item, quantity } 
          : item,
      ),
    )
  }
  
  // MODIFICATION 3 : RemoveFromCart prend maintenant la taille en compte
  const removeFromCart = (productId, selectedColor, selectedTaille) => {
    setCart((prevCart) => {
        // Supprimer l'item qui correspond à l'id, la couleur ET la taille
        return prevCart.filter((item) => 
            !(item.id === productId && 
              item.selectedColor === selectedColor &&
              item.selectedTaille === selectedTaille)
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
  
  // MODIFICATION 4 : Les fonctions d'aide prennent maintenant la taille en compte
  const isInCart = (productId, selectedColor = null, selectedTaille = null) => {
    return cart.some(
        (item) => 
            item.id === productId && 
            item.selectedColor === selectedColor && 
            item.selectedTaille === selectedTaille
    );
  }

  const getCartItem = (productId, selectedColor = null, selectedTaille = null) => {
    return cart.find(
        (item) => 
            item.id === productId && 
            item.selectedColor === selectedColor && 
            item.selectedTaille === selectedTaille
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