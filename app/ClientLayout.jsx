"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/cart-context";
import { FavoritesProvider } from "@/context/favorites-context";
import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { categories } from "@/data/product";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }) {
  const [language, setLanguage] = useState("fr");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "fr" ? "en" : "fr"));
  };

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <FavoritesProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar language={language} toggleLanguage={toggleLanguage} />
                <main className="flex-grow pt-24">{children}</main>
                <Footer language={language} />
              </div>
            </FavoritesProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Navbar Component
function Navbar({ language, toggleLanguage }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobilePromotionsOpen, setMobilePromotionsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const {
    cart,
    cartOpen,
    itemCount,
    cartTotal,
    toggleCart,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const {
    favorites,
    favoritesOpen,
    itemCount: favoritesCount,
    toggleFavorites,
    removeFromFavorites,
  } = useFavorites();

  // Refs for handling clicks outside
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const cartRef = useRef(null);
  const favoritesRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
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
        cartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        toggleCart();
      }
      if (
        favoritesOpen &&
        favoritesRef.current &&
        !favoritesRef.current.contains(event.target)
      ) {
        toggleFavorites();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [
    searchOpen,
    mobileMenuOpen,
    cartOpen,
    favoritesOpen,
    toggleCart,
    toggleFavorites,
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const promotionLinks = [
    {
      name: language === "fr" ? "Offres du moment" : "Current Offers",
      path: "/promotions?type=current",
    },
    {
      name: language === "fr" ? "Soldes d'été" : "Summer Sales",
      path: "/promotions?type=summer",
    },
    {
      name: language === "fr" ? "Packs économiques" : "Economy Packs",
      path: "/promotions?type=bundle",
    },
    {
      name: language === "fr" ? "Déstockage" : "Clearance",
      path: "/promotions?type=clearance",
    },
  ];

  const serviceLinks = [
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
  ];

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
      <nav
        className={cn(
          "fixed top-0 w-full z-[100] transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm py-2 border-b border-gray-100 dark:border-gray-800"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-3"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
                  className="h-20 w-auto object-contain dark:invert"
                  priority
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
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive("/categories") || isActive("/product")
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {language === "fr" ? "Produits" : "Products"}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-xl p-2 shadow-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.href}
                      className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
                  <Link
                    href="/product"
                    className="flex items-center justify-center px-3 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
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
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive("/services")
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {language === "fr" ? "Services" : "Services"}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-xl p-2 shadow-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {serviceLinks.map((link, index) => (
                    <div key={index}>
                      <Link
                        href={link.path}
                        className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        {link.name}
                      </Link>
                      {link.subLinks && (
                        <div className="ml-4 space-y-1">
                          {link.subLinks.map((subLink, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subLink.path}
                              className="flex items-center px-3 py-1 text-xs text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              <ChevronRight className="h-3 w-3 mr-1" />
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
                  <Link
                    href="/services"
                    className="flex items-center justify-center px-3 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
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
                <button className="ml-1 px-4 py-2 rounded-lg bg-white border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-medium transition-colors flex items-center">
                  {language === "fr" ? "Demande devis" : "Request Quote"}
                </button>
              </Link>

             
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-3">
             

              {/* Favorites button with animation */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFavorites}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors relative"
                aria-label="Favoris"
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    favoritesCount > 0 ? "text-red-500 fill-red-500" : ""
                  )}
                />
                {favoritesCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <span className="h-5 w-5 p-0 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-medium">
                      {favoritesCount}
                    </span>
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
                    <span className="h-5 w-5 p-0 flex items-center justify-center rounded-full bg-yellow-500 text-white text-xs font-medium">
                      {itemCount}
                    </span>
                  </motion.div>
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu - Now outside the nav element */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[999] lg:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Menu panel */}
            <motion.div
              ref={mobileMenuRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="absolute inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl flex flex-col max-h-full"
              style={{ maxWidth: "100%" }}
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 z-10 flex-shrink-0">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src="/logo.png"
                      alt="IRONZ PRO Logo"
                      width={120}
                      height={38}
                      className="h-18 w-auto object-contain dark:invert"
                    />
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-4 max-h-[calc(100vh-140px)]">
                  <div className="space-y-1">
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive("/")
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <Home className="h-5 w-5 mr-3" />
                      {language === "fr" ? "Accueil" : "Home"}
                    </Link>
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-4" />

                  {/* Products dropdown for mobile */}
                  <div>
                    <div
                      className="flex items-center justify-between px-3 mb-2 cursor-pointer"
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    >
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {language === "fr" ? "Produits" : "Products"}
                      </h3>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200",
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
                          className="space-y-1 pl-3"
                        >
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={category.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                              {category.name}
                            </Link>
                          ))}
                          <Link
                            href="/product"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                          >
                            {language === "fr"
                              ? "Voir tous les produits"
                              : "View All Products"}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!mobileProductsOpen && (
                      <Link
                        href="/product"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive("/product")
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {language === "fr" ? "Produits" : "Products"}
                      </Link>
                    )}
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-4" />

                  {/* Promotions dropdown for mobile */}
                  <div>
                    <div
                      className="flex items-center justify-between px-3 mb-2 cursor-pointer"
                      onClick={() =>
                        setMobilePromotionsOpen(!mobilePromotionsOpen)
                      }
                    >
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {language === "fr" ? "Promotions" : "Promotions"}
                      </h3>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200",
                          mobilePromotionsOpen ? "rotate-180" : ""
                        )}
                      />
                    </div>

                    <AnimatePresence>
                      {mobilePromotionsOpen && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={mobileSubmenuVariants}
                          className="space-y-1 pl-3"
                        >
                          {promotionLinks.map((link, index) => (
                            <Link
                              key={index}
                              href={link.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <ShoppingBag className="h-5 w-5 mr-3 text-yellow-500" />
                              {link.name}
                            </Link>
                          ))}
                          <Link
                            href="/promotions"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                          >
                            {language === "fr"
                              ? "Toutes les promotions"
                              : "All Promotions"}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!mobilePromotionsOpen && (
                      <Link
                        href="/promotions"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive("/promotions")
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {language === "fr" ? "Promotions" : "Promotions"}
                      </Link>
                    )}
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-4" />

                  {/* Services dropdown for mobile */}
                  <div>
                    <div
                      className="flex items-center justify-between px-3 mb-2 cursor-pointer"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {language === "fr" ? "Services" : "Services"}
                      </h3>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200",
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
                          className="space-y-1 pl-3"
                        >
                          {serviceLinks.map((link, index) => (
                            <div key={index}>
                              <Link
                                href={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              >
                                <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                                {link.name}
                              </Link>
                              {link.subLinks && (
                                <div className="ml-6 space-y-1">
                                  {link.subLinks.map((subLink, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      href={subLink.path}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center px-3 py-1 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
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
                            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                          >
                            {language === "fr"
                              ? "Tous nos services"
                              : "All Services"}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!mobileServicesOpen && (
                      <Link
                        href="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive("/services")
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {language === "fr" ? "Services" : "Services"}
                      </Link>
                    )}
                  </div>

                  <div className="space-y-1 mt-4">
                    <Link
                      href="/a-propos"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
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
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive("/contact")
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      {language === "fr" ? "Contact" : "Contact"}
                    </Link>
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-4" />

                  <div className="space-y-1">
                    <Link
                      href="/favoris"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center">
                        <Heart className="h-5 w-5 mr-3" />
                        {language === "fr" ? "Mes favoris" : "My Favorites"}
                      </div>
                      {favoritesCount > 0 && (
                        <span className="ml-auto px-2 py-1 text-xs font-medium rounded-full bg-red-500 text-white">
                          {favoritesCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/panier"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-3" />
                        {language === "fr" ? "Mon panier" : "My Cart"}
                      </div>
                      {itemCount > 0 && (
                        <span className="ml-auto px-2 py-1 text-xs font-medium rounded-full bg-yellow-500 text-white">
                          {itemCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <button
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                      onClick={() => {
                        router.push("/contact");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/demande-devis"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="w-full py-2 px-4 rounded-lg bg-white border border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-medium transition-colors">
                        {language === "fr" ? "Demande devis" : "Request Quote"}
                      </button>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium">
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

      {/* Search modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[102] flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              ref={searchRef}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-xl mx-4 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder={
                    language === "fr"
                      ? "Rechercher des produits..."
                      : "Search for products..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-16 py-6 text-lg rounded-lg border-none bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 outline-none"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                >
                  {language === "fr" ? "Rechercher" : "Search"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart dropdown */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            ref={cartRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="fixed right-4 top-20 w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl z-[101] border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-medium text-lg text-gray-900 dark:text-white flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2 text-yellow-500" />
                {language === "fr" ? "Votre Panier" : "Your Cart"}
                {itemCount > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-yellow-500 text-white">
                    {itemCount}
                  </span>
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
                  {language === "fr"
                    ? "Votre panier est vide"
                    : "Your cart is empty"}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {language === "fr"
                    ? "Commencez à ajouter des produits"
                    : "Start adding products"}
                </p>
                <button
                  onClick={toggleCart}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {language === "fr"
                    ? "Continuer vos achats"
                    : "Continue Shopping"}
                </button>
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
                          href={`/product/${item.slug}`}
                          onClick={toggleCart}
                          className="text-sm font-medium text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {item.price} MAD × {item.quantity}
                        </p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-l-full hover:bg-gray-100 dark:hover:bg-gray-800"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="mx-2 text-xs font-medium w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
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
                      <span className="text-gray-600 dark:text-gray-400">
                        {language === "fr" ? "Sous-total:" : "Subtotal:"}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {cartTotal.toFixed(2)} MAD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {language === "fr" ? "Livraison:" : "Shipping:"}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {language === "fr"
                          ? "Calculé à la commande"
                          : "Calculated at checkout"}
                      </span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700" />
                    <div className="flex justify-between text-lg font-medium">
                      <span className="text-gray-900 dark:text-white">
                        {language === "fr" ? "Total:" : "Total:"}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {cartTotal.toFixed(2)} MAD
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={toggleCart}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {language === "fr" ? "Continuer" : "Continue"}
                    </button>
                    <Link href="/checkout" onClick={toggleCart}>
                      <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium">
                        {language === "fr" ? "Commander" : "Checkout"}
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites dropdown */}
      <AnimatePresence>
        {favoritesOpen && (
          <motion.div
            ref={favoritesRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="fixed right-4 top-20 w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl z-[101] border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-medium text-lg text-gray-900 dark:text-white flex items-center">
                <Heart className="h-6 w-6 mr-2 text-red-500" />
                {language === "fr" ? "Vos Favoris" : "Your Favorites"}
                {favoritesCount > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-500 text-white">
                    {favoritesCount}
                  </span>
                )}
              </h3>
              <button
                onClick={toggleFavorites}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {favorites.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {language === "fr"
                    ? "Vous n'avez pas de favoris"
                    : "You have no favorites"}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {language === "fr"
                    ? "Ajoutez des produits à vos favoris"
                    : "Add products to your favorites"}
                </p>
                <button
                  onClick={toggleFavorites}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {language === "fr"
                    ? "Découvrir des produits"
                    : "Discover Products"}
                </button>
              </div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                {favorites.map((item) => (
                  <div
                    key={item.id}
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
                        href={`/product/${item.id}`}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors line-clamp-1"
                        onClick={toggleFavorites}
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.price.toFixed(2)} MAD
                      </p>
                    </div>
                    <div className="ml-2 flex flex-col space-y-2">
                      <button
                        onClick={() => {
                          // Add to cart logic would go here
                          toggleFavorites();
                        }}
                        className="p-1 text-yellow-500 hover:text-yellow-600 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                        title={
                          language === "fr"
                            ? "Ajouter au panier"
                            : "Add to Cart"
                        }
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          removeFromFavorites(item.id);
                        }}
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        title={
                          language === "fr"
                            ? "Retirer des favoris"
                            : "Remove from Favorites"
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed right-4 bottom-4 p-3 rounded-full bg-yellow-500 text-white shadow-lg z-50 hover:bg-yellow-600 transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

// NavLink Component for Navbar
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
  );
}

// Footer Component
function Footer({ language }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/ironz_official/",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      href: "https://www.youtube.com/@muscleironz8921",
    },
  ];

  const categories = [
    {
      name: language === "fr" ? "Home Gym" : "Home Gym",
      href: "/categories/home-gym",
    },
    {
      name: language === "fr" ? "Équipements" : "Equipment",
      href: "/categories/equipements",
    },
    {
      name: language === "fr" ? "Supplément" : "Supplement",
      href: "/categories/supplement",
    },
    {
      name: language === "fr" ? "Accessoires" : "Accessories",
      href: "/categories/accessoires",
    },
  ];

  const infoLinks = [
    {
      name: language === "fr" ? "À propos de nous" : "About Us",
      href: "/a-propos",
    },
    { name: language === "fr" ? "Contact" : "Contact", href: "/contact" },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-yellow-500" />,
      content: "SAHARA MALL 1 ÈRE ÉTAGE C169 & C120",
    },
    {
      icon: <Phone className="h-5 w-5 text-yellow-500" />,
      content: "+212669510042",
      href: "tel:+212669510042",
    },
    {
      icon: <Mail className="h-5 w-5 text-yellow-500" />,
      content: "muscleironz2019@gmail.com",
      href: "mailto:muscleironz2019@gmail.com",
    },
  ];

  if (!mounted) return null;

  return (
    <footer className="relative">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-[-1px]">
        <svg
          className="relative block w-full h-12 sm:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-900"
          ></path>
        </svg>
      </div>

      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pt-24 pb-12 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-yellow-500 blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-orange-500 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-yellow-600 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 h-full">
                <h3 className="font-heading text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  IRONZ
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {language === "fr"
                    ? "Votre partenaire pour tous vos besoins en équipement de fitness, suppléments et accessoires de sport."
                    : "Your partner for all your fitness equipment, supplements, and sports accessories needs."}
                </p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/50 hover:bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-300 hover:text-white transition-all duration-300 border border-gray-600 hover:border-transparent"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-lg font-bold mb-5 text-white flex items-center">
                <span className="w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 mr-3"></span>
                {language === "fr" ? "Catégories" : "Categories"}
              </h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={category.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {category.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-lg font-bold mb-5 text-white flex items-center">
                <span className="w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 mr-3"></span>
                {language === "fr" ? "Informations" : "Information"}
              </h3>
              <ul className="space-y-3">
                {infoLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 h-full">
                <h3 className="font-heading text-lg font-bold mb-5 text-white">
                  {language === "fr" ? "Contactez-nous" : "Contact Us"}
                </h3>
                <address className="not-italic text-gray-300 space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="mr-3 mt-1 p-2 rounded-lg bg-gray-700/50 group-hover:bg-gradient-to-r from-yellow-500 to-orange-500 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-gray-300 hover:text-yellow-400 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <span>{item.content}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </address>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {currentYear} IRONZ.{" "}
                {language === "fr"
                  ? "Tous droits réservés."
                  : "All rights reserved."}
              </p>
              <motion.a
                href="#top"
                className="flex items-center text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                {language === "fr" ? "Retour en haut" : "Back to top"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
