"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

// 1. Définition de l'interface pour un article favori
export interface FavoriteItem {
  id: string | number
  name: string
  price: number
  image: string
  slug: string
  category?: string
  [key: string]: any // Permet d'accepter d'autres propriétés si nécessaire
}

// 2. Définition du type pour le contexte
interface FavoritesContextType {
  favorites: FavoriteItem[]
  favoritesOpen: boolean
  itemCount: number
  toggleFavorites: () => void
  addToFavorites: (product: FavoriteItem) => void
  removeFromFavorites: (id: string | number) => void
  isInFavorites: (id: string | number) => boolean
  clearFavorites: () => void
  setFavoritesOpen: (open: boolean) => void
}

// Création du contexte avec une valeur par défaut undefined
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte des favoris
export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [favoritesOpen, setFavoritesOpen] = useState<boolean>(false)
  const [itemCount, setItemCount] = useState<number>(0)
  const [mounted, setMounted] = useState<boolean>(false)

  // Initialisation depuis le localStorage au montage (client-side)
  useEffect(() => {
    setMounted(true)
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

  // Mise à jour du localStorage et du compteur quand les favoris changent
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
    setItemCount(favorites.length)
  }, [favorites, mounted])

  // Basculer l'état ouvert/fermé
  const toggleFavorites = () => {
    setFavoritesOpen((prev) => !prev)
  }

  // Ajouter un article aux favoris
  const addToFavorites = (product: FavoriteItem) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((item) => item.id === product.id)

      if (isAlreadyFavorite) {
        // L'article existe déjà
        return prevFavorites
      } else {
        // Ajouter le nouvel article
        return [...prevFavorites, product]
      }
    })
  }

  // Supprimer un article des favoris
  const removeFromFavorites = (id: string | number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((item) => item.id !== id)
      
      // Gestion du nettoyage du localStorage si vide
      if (newFavorites.length === 0) {
        localStorage.removeItem("favorites")
      }
      
      return newFavorites
    })
  }

  // Vérifier si un article est dans les favoris
  const isInFavorites = (id: string | number): boolean => {
    return favorites.some((item) => item.id === id)
  }

  // Vider les favoris
  const clearFavorites = () => {
    setFavorites([])
    localStorage.removeItem("favorites")
  }

  const value: FavoritesContextType = {
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