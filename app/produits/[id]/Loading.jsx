import { Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-heading font-medium text-gray-700 dark:text-gray-300">
            Chargement du produit...
          </h2>
        </div>
      </div>
    </div>
  )
}

