import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import { FavoritesProvider } from "@/context/FavoritesContext"
import { ThemeProvider } from "@/components/ThemeProvider"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata = {
  title: "IRONZ PRO | Équipement de Fitness et Suppléments",
  description:
    "Découvrez notre gamme d'équipements de fitness, suppléments alimentaires et accessoires de musculation et d'arts martiaux de qualité professionnelle.",
  keywords: "home gym, équipement fitness, suppléments, musculation, arts martiaux, protéine, BCAA",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, poppins.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <FavoritesProvider>{children}</FavoritesProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

