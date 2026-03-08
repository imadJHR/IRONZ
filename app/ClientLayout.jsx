"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { CartProvider } from "../context/cart-context";
import { FavoritesProvider } from "../context/favorites-context";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  ChevronDown,
  ChevronRight,
  Phone,
  Info,
  Home,
  ShoppingBag,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUp,
  User,
  LogIn,
  Search,
  Star,
  Package,
  ShieldCheck,
  Truck,
  Clock,
  Sparkles,
  Menu as MenuIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/cart-context";
import { useFavorites } from "../context/favorites-context";
import { useTheme } from "next-themes";
import { cn } from "../lib/utils";
import { categories } from "../data/product";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }) {
  const [language, setLanguage] = useState("fr");
  // Use the hook instead of window.location to prevent hydration errors
  const pathname = usePathname();

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLanguage) => (prevLanguage === "fr" ? "en" : "fr"));
  }, []);

  // Determine if we are on an admin path safely
  const isAdminPath = pathname?.startsWith("/ironz-setup");

  return (
    <ClerkProvider>
      <html lang={language} suppressHydrationWarning>
        <body className={cn(inter.className, "bg-white dark:bg-gray-950")}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <CartProvider>
              <FavoritesProvider>
                <div className="flex flex-col min-h-screen">
                  {!isAdminPath && (
                    <Navbar
                      language={language}
                      toggleLanguage={toggleLanguage}
                    />
                  )}

                  <main className={isAdminPath ? "" : "flex-grow"}>
                    {children}
                  </main>

                  {!isAdminPath && <Footer language={language} />}

                  {/* Scroll to Top Button */}
                  <ScrollToTop />
                </div>
              </FavoritesProvider>
            </CartProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// Scroll to Top Component
function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 lg:right-8 lg:bottom-8 p-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-2xl shadow-yellow-500/30 z-50 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-110 active:scale-95"
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Navbar Component
const Navbar = React.memo(function Navbar({ language, toggleLanguage }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const [favoritesDropdownOpen, setFavoritesDropdownOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { itemCount } = useCart(); // Only need itemCount now
  const {
    favorites,
    itemCount: favoritesCount,
    removeFromFavorites,
  } = useFavorites();

  // Refs for handling clicks outside
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const favoritesRef = useRef(null);
  const authRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside of menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
      if (
        favoritesDropdownOpen &&
        favoritesRef.current &&
        !favoritesRef.current.contains(event.target)
      ) {
        setFavoritesDropdownOpen(false);
      }
      if (
        authDropdownOpen &&
        authRef.current &&
        !authRef.current.contains(event.target)
      ) {
        setAuthDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [
    searchOpen,
    mobileMenuOpen,
    favoritesDropdownOpen,
    authDropdownOpen,
  ]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const serviceLinks = useMemo(() => [
    {
      name: language === "fr" ? "Aménagement de salle" : "Room Setup",
      path: "/services/amenagement-salle",
      subLinks: [
        {
          name: language === "fr" ? "Home Gym" : "Home Gym",
          path: "/services/amenagement-salle/home-gym",
        },
        {
          name:
            language === "fr" ? "Salle Professionnelle" : "Professional Gym",
          path: "/services/amenagement-salle/salle-professionnelle",
        },
      ],
    },
    {
      name:
        language === "fr"
          ? "Personnalisation d'accessoires"
          : "Accessory Customization",
      path: "/services/personnalisation-accessoires",
    },
    {
      name: language === "fr" ? "Espace enfance" : "Kids Area",
      path: "/services/espace-enfance",
    },
    {
      name:
        language === "fr" ? "Revêtement sol & mur" : "Floor & Wall Covering",
      path: "/services/revetement-sol-mur",
    },
  ], [language]);

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
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
      },
    },
  };

  const logoVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 10, transition: { type: "spring", stiffness: 300 } },
  };

  const mobileSubmenuVariants = {
    closed: { height: 0, opacity: 0, overflow: "hidden" },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-black uppercase italic tracking-wider py-2 px-4 text-center">
        <div className="container mx-auto flex items-center justify-center gap-3">
          <span className="animate-pulse">
            {language === "fr"
              ? "LIVRAISON EXPRESS AU MAROC"
              : "EXPRESS DELIVERY IN MOROCCO"}
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          "sticky top-0 w-full z-[100] transition-all duration-300 border-b",
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg py-2 border-gray-100 dark:border-gray-800"
            : "bg-white dark:bg-gray-900 py-3 border-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
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
                  alt="IRONZ Logo"
                  width={180}
                  height={60}
                  className="h-16 w-auto object-contain dark:invert"
                  priority
                  unoptimized={true} // Fix for Cloudinary crash
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavLink href="/" active={isActive("/")}>
                {language === "fr" ? "Accueil" : "Home"}
              </NavLink>

              {/* Products dropdown */}
              <div className="relative group">
                <button
                  className={cn(
                    "flex items-center px-4 py-2.5 rounded-xl text-sm font-black uppercase italic transition-all group",
                    isActive("/categories") || isActive("/produit")
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {language === "fr" ? "Produits" : "Products"}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-2xl p-2 shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.href}
                      className="flex items-center px-3 py-2.5 text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                  <Link
                    href="/produit"
                    className="flex items-center justify-center px-3 py-2.5 text-sm font-black uppercase italic text-yellow-600 dark:text-yellow-400 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                  >
                    {language === "fr"
                      ? "Voir tous les produits"
                      : "View All Products"}
                  </Link>
                </div>
              </div>

              {/* Services dropdown */}
              <div className="relative group">
                <button
                  className={cn(
                    "flex items-center px-4 py-2.5 rounded-xl text-sm font-black uppercase italic transition-all group",
                    isActive("/services")
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {language === "fr" ? "Services" : "Services"}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-2xl p-2 shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {serviceLinks.map((link, index) => (
                    <div key={index}>
                      <Link
                        href={link.path}
                        className="flex items-center px-3 py-2.5 text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                      >
                        {link.name}
                      </Link>
                      {link.subLinks && (
                        <div className="ml-4 space-y-1">
                          {link.subLinks.map((subLink, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subLink.path}
                              className="flex items-center px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              <ChevronRight className="h-3 w-3 mr-1" />
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                  <Link
                    href="/services"
                    className="flex items-center justify-center px-3 py-2.5 text-sm font-black uppercase italic text-yellow-600 dark:text-yellow-400 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                  >
                    {language === "fr" ? "Tous nos services" : "All Services"}
                  </Link>
                </div>
              </div>

              <NavLink href="/a-propos" active={isActive("/a-propos")}>
                {language === "fr" ? "À propos" : "About"}
              </NavLink>

              <NavLink href="/contact" active={isActive("/contact")}>
                {language === "fr" ? "Contact" : "Contact"}
              </NavLink>

              <Link href="/demande-devis">
                <button className="ml-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 font-black uppercase italic tracking-widest transition-all shadow-lg shadow-yellow-500/20">
                  {language === "fr" ? "Demande devis" : "Request Quote"}
                </button>
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-3">
              {/* Favorites button */}
              <div className="relative" ref={favoritesRef}></div>

              {/* Cart button (Direct Link - Dropdown Removed) */}
              <Link href="/panier" className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1"
                    >
                      <span className="h-5 w-5 p-0 flex items-center justify-center rounded-full bg-yellow-500 text-white text-xs font-black">
                        {itemCount}
                      </span>
                    </motion.div>
                  )}
                </motion.button>
              </Link>

              {/* Auth buttons - Desktop */}
              <div className="hidden lg:flex items-center space-x-2">
                <SignedOut>
                  <div className="relative" ref={authRef}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                      className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span className="text-sm font-black uppercase italic">
                        {language === "fr" ? "Compte" : "Account"}
                      </span>
                    </motion.button>

                    <AnimatePresence>
                      {authDropdownOpen && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                        >
                          <div className="p-2">
                            <SignInButton mode="modal">
                              <button className="w-full flex items-center px-4 py-3 text-sm text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <LogIn className="h-4 w-4 mr-3" />
                                {language === "fr"
                                  ? "Se connecter"
                                  : "Sign In"}
                              </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                              <button className="w-full flex items-center px-4 py-3 text-sm text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <User className="h-4 w-4 mr-3" />
                                {language === "fr" ? "S'inscrire" : "Sign Up"}
                              </button>
                            </SignUpButton>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </SignedOut>
                <SignedIn>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center"
                  >
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-10 w-10",
                          userButtonPopoverCard:
                            "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-2xl",
                        },
                      }}
                    />
                  </motion.div>
                </SignedIn>
              </div>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                aria-label="Menu"
              >
                <MenuIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-start justify-center pt-32"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              ref={searchRef}
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl mx-4 p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder={
                    language === "fr"
                      ? "Rechercher des produits, catégories..."
                      : "Search for products, categories..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-24 py-5 text-xl rounded-2xl border-none bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 outline-none placeholder-gray-500"
                  autoFocus
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black uppercase italic tracking-widest transition-all"
                >
                  {language === "fr" ? "Rechercher" : "Search"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[150] lg:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu panel */}
            <motion.div
              ref={mobileMenuRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="absolute inset-y-0 right-0 w-full sm:w-[420px] bg-white dark:bg-gray-900 shadow-2xl flex flex-col max-h-full"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src="/logo.png"
                      alt="IRONZ Logo"
                      width={140}
                      height={47}
                      className="h-14 w-auto object-contain dark:invert"
                      unoptimized={true} // Fix for Cloudinary
                    />
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto py-6 px-5">
                  {/* Mobile Auth */}
                  <SignedOut>
                    <div className="mb-8 grid grid-cols-2 gap-3">
                      <SignInButton mode="modal">
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full flex items-center justify-center px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-yellow-500 hover:text-yellow-500 transition-colors font-medium"
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          {language === "fr" ? "Connexion" : "Sign In"}
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full flex items-center justify-center px-4 py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black uppercase italic tracking-widest"
                        >
                          <User className="h-4 w-4 mr-2" />
                          {language === "fr" ? "Inscription" : "Sign Up"}
                        </button>
                      </SignUpButton>
                    </div>
                  </SignedOut>

                  <SignedIn>
                    <div className="mb-8 flex justify-center">
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "h-12 w-12",
                            userButtonPopoverCard:
                              "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-2xl",
                          },
                        }}
                      />
                    </div>
                  </SignedIn>

                  {/* Navigation Links */}
                  <div className="space-y-1 mb-8">
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all",
                        isActive("/")
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <Home className="h-5 w-5 mr-3" />
                      {language === "fr" ? "Accueil" : "Home"}
                    </Link>
                  </div>

                  {/* Products Section */}
                  <div className="mb-8">
                    <div
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 cursor-pointer mb-2"
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    >
                      <div className="flex items-center">
                        <ShoppingBag className="h-5 w-5 mr-3 text-gray-500" />
                        <span className="font-black uppercase italic text-gray-900 dark:text-white">
                          {language === "fr" ? "Produits" : "Products"}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-gray-500 transition-transform duration-200",
                          mobileProductsOpen ? "rotate-180" : ""
                        )}
                      />
                    </div>

                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={mobileSubmenuVariants}
                          className="space-y-1 pl-6 mt-2"
                        >
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={category.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                              {category.name}
                            </Link>
                          ))}
                          <Link
                            href="/produit"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center px-4 py-2.5 rounded-xl text-sm font-black uppercase italic text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors mt-2"
                          >
                            {language === "fr"
                              ? "Voir tous les produits"
                              : "View All Products"}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Services Section */}
                  <div className="mb-8">
                    <div
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 cursor-pointer mb-2"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      <div className="flex items-center">
                        <Package className="h-5 w-5 mr-3 text-gray-500" />
                        <span className="font-black uppercase italic text-gray-900 dark:text-white">
                          {language === "fr" ? "Services" : "Services"}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-gray-500 transition-transform duration-200",
                          mobileServicesOpen ? "rotate-180" : ""
                        )}
                      />
                    </div>

                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={mobileSubmenuVariants}
                          className="space-y-1 pl-6 mt-2"
                        >
                          {serviceLinks.map((link, index) => (
                            <div key={index}>
                              <Link
                                href={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              >
                                <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                                {link.name}
                              </Link>
                              {link.subLinks && (
                                <div className="ml-4 space-y-1 mt-1">
                                  {link.subLinks.map((subLink, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      href={subLink.path}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center px-4 py-1.5 rounded-xl text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                      <ChevronRight className="h-3 w-3 mr-1" />
                                      {subLink.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          <Link
                            href="/services"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center px-4 py-2.5 rounded-xl text-sm font-black uppercase italic text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors mt-2"
                          >
                            {language === "fr"
                              ? "Tous nos services"
                              : "All Services"}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Additional Links */}
                  <div className="space-y-1">
                    <Link
                      href="/a-propos"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all",
                        isActive("/a-propos")
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <Info className="h-5 w-5 mr-3" />
                      {language === "fr" ? "À propos" : "About"}
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all",
                        isActive("/contact")
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      {language === "fr" ? "Contact" : "Contact"}
                    </Link>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/demande-devis"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="w-full py-3 px-4 rounded-xl bg-white border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-black uppercase italic tracking-widest transition-colors">
                        {language === "fr" ? "Demande devis" : "Request Quote"}
                      </button>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black uppercase italic tracking-widest">
                        {language === "fr" ? "Nous contacter" : "Contact Us"}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

// NavLink Component for Navbar
function NavLink({ href, children, active }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2.5 rounded-xl text-sm font-black uppercase italic transition-all",
        active
          ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
      )}
    >
      {children}
    </Link>
  );
}

// Footer Component
const Footer = React.memo(function Footer({ language }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = useMemo(() => [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/ironz_official/",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      href: "https://www.youtube.com/@ironzofficial",
    },
  ], []);

  const categories = useMemo(() => [
    {
      name: language === "fr" ? "Équipements" : "Equipment",
      href: "/categories/equipements",
    },
    {
      name: language === "fr" ? "Suppléments" : "Supplements",
      href: "/categories/supplement",
    },
    {
      name: language === "fr" ? "Accessoires" : "Accessories",
      href: "/categories/accessoires",
    },
  ], [language]);

  const infoLinks = useMemo(() => [
    {
      name: language === "fr" ? "À propos" : "About",
      href: "/a-propos",
    },
    {
      name: language === "fr" ? "Contact" : "Contact",
      href: "/contact",
    },
    {
      name: language === "fr" ? "Demande de devis" : "Quote Request",
      href: "/demande-devis",
    },
  ], [language]);

  const contactInfo = useMemo(() => [
    {
      icon: <MapPin className="h-5 w-5" />,
      content: "SAHARA MALL 1 ÈRE ÉTAGE C169 & C120",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      content: "+212 669 51 00 42",
      href: "tel:+212669510042",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      content: "info@ironz.ma",
      href: "mailto:info@ironz.ma",
    },
  ], []);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (!mounted) return null;

  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-gray-900">
      {/* Decorative Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] transform translate-y-1/2"></div>
      </div>

      {/* Trust Badges Strip (Glassmorphism) */}
      <div className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                <Truck className="h-6 w-6 text-yellow-500" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-wider text-center">{language === "fr" ? "Livraison Express" : "Express Delivery"}</h4>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                <ShieldCheck className="h-6 w-6 text-yellow-500" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-wider text-center">{language === "fr" ? "Paiement Sécurisé" : "Secure Payment"}</h4>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                <Package className="h-6 w-6 text-yellow-500" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-wider text-center">{language === "fr" ? "Retour Facile" : "Easy Returns"}</h4>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300"
            >
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-wider text-center">{language === "fr" ? "Support 7j/7" : "24/7 Support"}</h4>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand & Socials */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="IRONZ Logo"
                width={180}
                height={70}
                className="h-16 w-auto object-contain invert"
                unoptimized={true}
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm pr-4">
              {language === "fr"
                ? "L'élite de l'équipement sportif marocain. Forgez votre avenir avec notre matériel de qualité professionnelle et nos suppléments haut de gamme."
                : "The elite of Moroccan sports equipment. Forge your future with our professional-grade gear and premium supplements."}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 shadow-lg"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Catalog Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-black uppercase italic tracking-wider mb-6 flex items-center">
              <span className="w-2 h-2 bg-yellow-500 mr-3 rounded-full animate-pulse"></span>
              {language === "fr" ? "Catalogue" : "Catalog"}
            </h3>
            <ul className="space-y-4">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={category.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <motion.span
                      className="mr-2 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.span>
                    <motion.span whileHover={{ x: 4 }} className="transition-transform">
                      {category.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-black uppercase italic tracking-wider mb-6 flex items-center">
              <span className="w-2 h-2 bg-orange-500 mr-3 rounded-full animate-pulse"></span>
              {language === "fr" ? "Support" : "Support"}
            </h3>
            <ul className="space-y-4">
              {infoLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <motion.span
                      className="mr-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.span>
                    <motion.span whileHover={{ x: 4 }} className="transition-transform">
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Cards */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-black uppercase italic tracking-wider mb-6 flex items-center">
              <span className="w-2 h-2 bg-yellow-500 mr-3 rounded-full animate-pulse"></span>
              {language === "fr" ? "Contact" : "Contact"}
            </h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                  whileHover={{ y: -2 }}
                >
                  <div className="mr-4 p-2 rounded-lg bg-black text-gray-400 group-hover:text-yellow-500 group-hover:bg-yellow-500/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    {item.href ? (
                      <a href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors block leading-tight">
                        {item.content}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-300 leading-tight block">{item.content}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-bold">&copy;</span>
            <span className="text-gray-500 text-sm font-medium tracking-wide">
              {currentYear} IRONZ. {language === "fr" ? "Tous droits réservés." : "All rights reserved."}
            </span>
          </div>
          <div className="flex items-center gap-6">
            {["Confidentialité", "Conditions", "FAQ"].map((text, i) => (
              <Link
                key={i}
                href={`/${text.toLowerCase()}`}
                className="text-xs font-black uppercase tracking-wider text-gray-600 hover:text-yellow-500 transition-colors"
              >
                {text}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
});
