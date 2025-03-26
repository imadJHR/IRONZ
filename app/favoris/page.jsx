import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import Navbar from "@/components/navbar"
import FavoritesList from "./favorites-list"

export const metadata = {
  title: "Mes Favoris | IRONZ PRO",
  description: "Gérez vos produits favoris IRONZ PRO",
}

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mt-4 mb-2">Mes Favoris</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez votre liste de produits favoris</p>
        </div>

        <FavoritesList />
      </div>
    </main>
  )
}

