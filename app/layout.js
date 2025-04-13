import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { FavoritesProvider } from "@/context/favorites-context"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "IRONZ PRO - Équipements Professionnels et Matériaux",
  description:
    "Votre partenaire de confiance pour tous vos besoins en équipements professionnels et matériaux de construction.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <FavoritesProvider>
              <div className="flex flex-col min-h-screen">
               
                <main className="flex-grow pt-24">{children}</main>
              
              </div>
            </FavoritesProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
