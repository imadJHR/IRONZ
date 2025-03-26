"use client"

import { createContext, useContext, useState, useEffect } from "react"

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)

  // Load favorites from localStorage on client side
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (e) {
        console.error("Failed to parse favorites from localStorage")
      }
    }
  }, [])

  // Update localStorage when favorites changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }

    // Calculate total items
    setItemCount(favorites.length)
  }, [favorites])

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const existingItem = prevFavorites.find((item) => item.id === product.id)

      if (existingItem) {
        // If product already exists in favorites, do nothing
        return prevFavorites
      } else {
        // Add new item
        return [...prevFavorites, product]
      }
    })
  }

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== productId))

    // If favorites is empty after removal, remove from localStorage
    if (favorites.length === 1) {
      localStorage.removeItem("favorites")
    }
  }

  const clearFavorites = () => {
    setFavorites([])
    localStorage.removeItem("favorites")
  }

  const toggleFavorites = () => {
    setFavoritesOpen((prev) => !prev)
  }

  const isInFavorites = (productId) => {
    return favorites.some((item) => item.id === productId)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesOpen,
        itemCount,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        toggleFavorites,
        setFavoritesOpen,
        isInFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

