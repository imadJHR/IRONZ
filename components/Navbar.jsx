"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import {
  Menu,
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  Search,
  ChevronDown,
  User,
  Phone,
  Info,
  Home,
  Dumbbell,
  Pill,
  ShoppingBag,
  Sun,
  Moon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { useFavorites } from "@/context/FavoritesContext"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import FavoritesDropdown from "@/components/FavoritesDropDown"
import { categories } from "@/data/product"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)
  const [promotionsMenuOpen, setPromotionsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const categoryMenuRef = useRef(null)
  const promotionsMenuRef = useRef(null)

  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const { cart, cartOpen, itemCount, cartTotal, toggleCart, updateQuantity, removeFromCart } = useCart()
  const { favorites, favoritesOpen, itemCount: favoritesCount, toggleFavorites } = useFavorites()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setCategoryMenuOpen(false)
      }
      if (promotionsMenuRef.current && !promotionsMenuRef.current.contains(event.target)) {
        setPromotionsMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setCategoryMenuOpen(false)
    setPromotionsMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const navigateToCategory = (categoryPath) => {
    router.push(categoryPath)
    setCategoryMenuOpen(false)
  }

  const promotionLinks = [
    { name: "Offres du moment", path: "/promotions?type=current", icon: <ShoppingBag className="h-4 w-4 mr-2" /> },
    { name: "Soldes d'été", path: "/promotions?type=summer", icon: <ShoppingBag className="h-4 w-4 mr-2" /> },
    { name: "Packs économiques", path: "/promotions?type=bundle", icon: <ShoppingBag className="h-4 w-4 mr-2" /> },
    { name: "Déstockage", path: "/promotions?type=clearance", icon: <ShoppingBag className="h-4 w-4 mr-2" /> },
  ]

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.15 } },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  }

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-100 dark:border-gray-800 py-2"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-transparent py-3"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-sans font-medium text-xl text-gray-900 dark:text-white tracking-tight">
              IRONZ
            </span>
            <span className="font-sans font-light text-xl text-gray-500 ml-1">PRO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/">
              Accueil
            </NavLink>

            {/* Categories dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Produits
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${categoryMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {categoryMenuOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-20 border border-gray-100 dark:border-gray-700"
                  >
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => navigateToCategory(category.href)}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {category.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Promotions dropdown */}
            <div className="relative" ref={promotionsMenuRef}>
              <button
                onClick={() => setPromotionsMenuOpen(!promotionsMenuOpen)}
                className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Promotions
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${promotionsMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {promotionsMenuOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-20 border border-gray-100 dark:border-gray-700"
                  >
                    {promotionLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.path}
                        className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/services">
              Services
            </NavLink>

            <NavLink href="/a-propos">
              À propos
            </NavLink>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {/* Favorites button */}
            <button
              onClick={toggleFavorites}
              className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors relative"
              aria-label="Favoris"
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors relative"
              aria-label="Panier"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden mt-2"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 pr-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <MobileNavLink href="/">
                Accueil
              </MobileNavLink>

              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                Catégories
              </div>
              
              {categories.slice(0, 4).map((category) => (
                <MobileNavLink key={category.id} href={category.href}>
                  {category.name}
                </MobileNavLink>
              ))}

              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                Promotions
              </div>
              
              {promotionLinks.map((link, index) => (
                <MobileNavLink key={index} href={link.path}>
                  {link.name}
                </MobileNavLink>
              ))}

              <MobileNavLink href="/services">
                Services
              </MobileNavLink>

              <MobileNavLink href="/a-propos">
                À propos
              </MobileNavLink>

              <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                <MobileNavLink href="/mon-compte">
                  Mon compte
                </MobileNavLink>
                <MobileNavLink href="/contact">
                  Contact
                </MobileNavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile cart dropdown */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-4 top-20 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-gray-900 dark:text-white">Votre Panier</h3>
              <button
                onClick={toggleCart}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">Votre panier est vide</div>
            ) : (
              <>
                <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 flex items-center">
                      <div className="w-12 h-12 relative flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.price.toFixed(2)} €</p>
                        <div className="flex items-center mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white p-1"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="mx-1 text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white p-1"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-1 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Total:</span>
                    <span className="text-sm font-medium">{cartTotal.toFixed(2)} €</span>
                  </div>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900">
                    Commander
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile favorites dropdown */}
      <FavoritesDropdown isMobile={true} isOpen={favoritesOpen} />
    </nav>
  )
}

function NavLink({ href, children }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors",
        isActive
          ? "text-gray-900 dark:text-white"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "block px-3 py-2 rounded-lg text-base font-medium transition-colors",
        isActive
          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
      )}
    >
      {children}
    </Link>
  )
}