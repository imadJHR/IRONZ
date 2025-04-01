"use client"

import { useState, useEffect } from "react"
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
  ChevronDown,
  Phone,
  Info,
  Home,
  ShoppingBag,
  Sun,
  Moon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import FavoritesDropdown from "@/components/favorites-dropdown"
import { categories } from "@/data/product"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isHoveringLogo, setIsHoveringLogo] = useState(false)

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
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const isActive = (path) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  const promotionLinks = [
    { name: "Offres du moment", path: "/promotions?type=current" },
    { name: "Soldes d'été", path: "/promotions?type=summer" },
    { name: "Packs économiques", path: "/promotions?type=bundle" },
    { name: "Déstockage", path: "/promotions?type=clearance" },
  ]

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
      }
    }
  }

  const logoVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 10, transition: { type: "spring", stiffness: 300 } }
  }

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-2 border-b border-gray-100 dark:border-gray-800"
        : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-3"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with animation */}
          <motion.div
            onHoverStart={() => setIsHoveringLogo(true)}
            onHoverEnd={() => setIsHoveringLogo(false)}
            animate={isHoveringLogo ? "hover" : "initial"}
            variants={logoVariants}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="IRONZ PRO Logo"
                width={160}
                height={50}
                className="h-10 w-auto object-contain dark:invert"
                priority
              />
              <motion.span 
                className="ml-2 text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
                animate={isHoveringLogo ? { scale: 1.05 } : { scale: 1 }}
              >
                IRONZ PRO
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink href="/" active={isActive("/")}>
              Accueil
            </NavLink>

            {/* Animated dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive("/categories") || isActive("/produits")
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  Produits
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-64 rounded-xl p-2 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                      <Link 
                        href={category.href} 
                        className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        {category.name}
                      </Link>
                    </motion.div>
                  </DropdownMenuItem>
                ))}
                <Separator className="my-1" />
                <DropdownMenuItem asChild>
                  <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/produits"
                      className="flex items-center justify-center px-3 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                    >
                      Voir tous les produits
                    </Link>
                  </motion.div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive("/promotions")
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  Promotions
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-64 rounded-xl p-2 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                {promotionLinks.map((link, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                      <Link 
                        href={link.path} 
                        className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2 text-yellow-500" />
                        {link.name}
                      </Link>
                    </motion.div>
                  </DropdownMenuItem>
                ))}
                <Separator className="my-1" />
                <DropdownMenuItem asChild>
                  <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/promotions"
                      className="flex items-center justify-center px-3 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                    >
                      Toutes les promotions
                    </Link>
                  </motion.div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Services dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors",
                    isActive("/services")
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                  )}
                >
                  Services
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-xl p-1">
                <DropdownMenuItem asChild>
                  <Link href="/services/amenagement-salle" className="flex items-center px-3 py-2 text-sm rounded-lg">
                    Aménagement de salle
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/conception-produits" className="flex items-center px-3 py-2 text-sm rounded-lg">
                    Conception de produits
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/espace-enfance" className="flex items-center px-3 py-2 text-sm rounded-lg">
                    Espace enfance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/revetement-sol-mur" className="flex items-center px-3 py-2 text-sm rounded-lg">
                    Revêtement sol & mur
                  </Link>
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem asChild>
                  <Link
                    href="/services"
                    className="flex items-center justify-center px-3 py-2 text-sm text-yellow-600 dark:text-yellow-400 rounded-lg"
                  >
                    Tous nos services
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/a-propos" active={isActive("/a-propos")}>
              À propos
            </NavLink>

            <NavLink href="/contact" active={isActive("/contact")}>
              Contact
            </NavLink>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
           

            {/* Theme toggle with animation */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>
            )}

            {/* Favorites button with animation */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorites}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors relative"
              aria-label="Favoris"
            >
              <Heart className={cn("h-5 w-5", favoritesCount > 0 ? "text-red-500 fill-red-500" : "")} />
              {favoritesCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full bg-red-500 text-white">
                    {favoritesCount}
                  </Badge>
                </motion.div>
              )}
            </motion.button>

            {/* Cart button with animation */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleCart}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors relative"
              aria-label="Panier"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full bg-yellow-500 text-white">
                    {itemCount}
                  </Badge>
                </motion.div>
              )}
            </motion.button>

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </motion.button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 p-0 bg-white dark:bg-gray-900">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                      <Image
                        src="/logo.png"
                        alt="IRONZ PRO Logo"
                        width={120}
                        height={38}
                        className="h-8 w-auto object-contain dark:invert"
                      />
                      <span className="ml-2 text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                        IRONZ 
                      </span>
                    </Link>
                    <SheetClose asChild>
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <X className="h-5 w-5" />
                      </button>
                    </SheetClose>
                  </div>

                  <div className="flex-1 overflow-y-auto py-6 px-6">
                    

                    <div className="space-y-1">
                      <SheetClose asChild>
                        <MobileNavLink href="/" active={isActive("/")}>
                          <Home className="h-5 w-5" />
                          Accueil
                        </MobileNavLink>
                      </SheetClose>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3 mb-2">Produits</h3>
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <SheetClose key={category.id} asChild>
                            <MobileNavLink href={category.href}>
                              {category.name}
                            </MobileNavLink>
                          </SheetClose>
                        ))}
                        <SheetClose asChild>
                          <MobileNavLink href="/produits" highlight>
                            Voir tous les produits
                          </MobileNavLink>
                        </SheetClose>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3 mb-2">Promotions</h3>
                      <div className="space-y-1">
                        {promotionLinks.map((link, index) => (
                          <SheetClose key={index} asChild>
                            <MobileNavLink href={link.path}>
                              <ShoppingBag className="h-5 w-5" />
                              {link.name}
                            </MobileNavLink>
                          </SheetClose>
                        ))}
                        <SheetClose asChild>
                          <MobileNavLink href="/promotions" highlight>
                            Toutes les promotions
                          </MobileNavLink>
                        </SheetClose>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-1">
                      <SheetClose asChild>
                        <MobileNavLink href="/services" active={isActive("/services")}>
                          Services
                        </MobileNavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <MobileNavLink href="/a-propos" active={isActive("/a-propos")}>
                          À propos
                        </MobileNavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <MobileNavLink href="/contact" active={isActive("/contact")}>
                          Contact
                        </MobileNavLink>
                      </SheetClose>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-1">
                      
                      <SheetClose asChild>
                        <MobileNavLink href="/favoris">
                          <Heart className="h-5 w-5" />
                          Mes favoris
                          {favoritesCount > 0 && (
                            <Badge variant="destructive" className="ml-auto">
                              {favoritesCount}
                            </Badge>
                          )}
                        </MobileNavLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <MobileNavLink href="/panier">
                          <ShoppingCart className="h-5 w-5" />
                          Mon panier
                          {itemCount > 0 && (
                            <Badge className="ml-auto bg-yellow-500">
                              {itemCount}
                            </Badge>
                          )}
                        </MobileNavLink>
                      </SheetClose>
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="rounded-full"
                      >
                        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Phone className="h-5 w-5" />
                      </Button>
                    </div>
                    <SheetClose asChild>
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        Nous contacter
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-xl mx-4 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-16 py-6 text-lg border-none bg-gray-100 dark:bg-gray-800"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Rechercher
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart dropdown */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="fixed right-4 top-20 w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl z-50 border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-medium text-lg text-gray-900 dark:text-white flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2 text-yellow-500" />
                Votre Panier
                {itemCount > 0 && (
                  <Badge className="ml-2 bg-yellow-500 text-white">
                    {itemCount}
                  </Badge>
                )}
              </h3>
              <button
                onClick={toggleCart}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Votre panier est vide
                </h4>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Commencez à ajouter des produits
                </p>
                <Button 
                  variant="outline" 
                  onClick={toggleCart}
                  className="border-gray-200 dark:border-gray-700"
                >
                  Continuer vos achats
                </Button>
              </div>
            ) : (
              <>
                <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="w-16 h-16 relative flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <Link 
                          href={`/produits/${item.slug}`} 
                          onClick={toggleCart}
                          className="text-sm font-medium text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {item.price.toFixed(2)} MAD × {item.quantity}
                        </p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-l-full hover:bg-gray-100 dark:hover:bg-gray-800"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="mx-2 text-xs font-medium w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-r-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {(item.price * item.quantity).toFixed(2)} MAD
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-1 p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Sous-total:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {cartTotal.toFixed(2)} MAD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Livraison:</span>
                      <span className="text-gray-900 dark:text-white">
                        Calculé à la commande
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-medium">
                      <span className="text-gray-900 dark:text-white">Total:</span>
                      <span className="text-gray-900 dark:text-white">
                        {cartTotal.toFixed(2)} MAD
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={toggleCart}
                      className="border-gray-200 dark:border-gray-700"
                    >
                      Continuer
                    </Button>
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                    >
                      <Link href="/checkout" onClick={toggleCart}>
                        Commander
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites dropdown */}
      <FavoritesDropdown />
    </nav>
  )
}

function NavLink({ href, children, active }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
        active
          ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children, active, highlight, icon }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          : highlight
          ? "text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      {children}
    </Link>
  )
}