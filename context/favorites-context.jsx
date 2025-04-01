"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the favorites context
const FavoritesContext = createContext()

// Custom hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

// Favorites provider component
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)

  // Initialize favorites from localStorage on client side
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error)
        setFavorites([])
      }
    }
  }, [])

  // Update localStorage when favorites changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }

    // Calculate item count
    setItemCount(favorites.length)
  }, [favorites])

  // Toggle favorites open/close
  const toggleFavorites = () => {
    setFavoritesOpen(!favoritesOpen)
  }

  // Add item to favorites
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const existingItem = prevFavorites.find((item) => item.id === product.id)

      if (existingItem) {
        // Item already exists in favorites
        return prevFavorites
      } else {
        // Add new item
        return [...prevFavorites, product]
      }
    })
  }

  // Remove item from favorites
  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== id))

    // Remove from localStorage if favorites becomes empty
    if (favorites.length === 1) {
      localStorage.removeItem("favorites")
    }
  }

  // Check if item is in favorites
  const isInFavorites = (id) => {
    return favorites.some((item) => item.id === id)
  }

  // Clear favorites
  const clearFavorites = () => {
    setFavorites([])
    localStorage.removeItem("favorites")
  }

  // Context value
  const value = {
    favorites,
    favoritesOpen,
    itemCount,
    toggleFavorites,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    clearFavorites,
    setFavoritesOpen,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

