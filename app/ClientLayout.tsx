"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { CartProvider } from "../context/cart-context";
import { FavoritesProvider } from "../context/favorites-context";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  FormEvent,
  ChangeEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  X,
  ShoppingCart,
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
  ArrowUp,
  User,
  LogIn,
  Package,
  Menu as MenuIcon,
  Search,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ─── Types ────────────────────────────────────────────────────────────────────

type Language = "fr" | "en";

interface SubLink {
  name: string;
  path: string;
}

interface ServiceLink {
  name: string;
  path: string;
  subLinks?: SubLink[];
}

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  href: string;
}

interface CategoryLink {
  name: string;
  href: string;
}

interface ContactItem {
  icon: React.ReactNode;
  content: string;
  href?: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active: boolean;
}

interface NavbarProps {
  language: Language;
  toggleLanguage: () => void;
}

interface FooterProps {
  language: Language;
}

interface ConditionalButtonProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

interface ClientLayoutProps {
  children: React.ReactNode;
}

// ─── Clerk Guard Helpers ───────────────────────────────────────────────────────

const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasClerkKeys =
  CLERK_PUBLISHABLE_KEY && CLERK_PUBLISHABLE_KEY !== "pk_test_placeholder";

const ConditionalSignedOut: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!hasClerkKeys) return null;
  return <SignedOut>{children}</SignedOut>;
};

const ConditionalSignedIn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!hasClerkKeys) return null;
  return <SignedIn>{children}</SignedIn>;
};

const ConditionalUserButton: React.FC<
  React.ComponentProps<typeof UserButton>
> = (props) => {
  if (!hasClerkKeys) return null;
  return <UserButton {...props} />;
};

const ConditionalSignInButton: React.FC<ConditionalButtonProps> = ({
  children,
  ...props
}) => {
  if (!hasClerkKeys) return null;
  return <SignInButton {...props}>{children}</SignInButton>;
};

const ConditionalSignUpButton: React.FC<ConditionalButtonProps> = ({
  children,
  ...props
}) => {
  if (!hasClerkKeys) return null;
  return <SignUpButton {...props}>{children}</SignUpButton>;
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [language, setLanguage] = useState<Language>("fr");
  const pathname = usePathname();

  const toggleLanguage = useCallback(() => {
    setLanguage((prev: Language) => (prev === "fr" ? "en" : "fr"));
  }, []);

  const isAdminPath = pathname?.startsWith("/ironz-setup");

  const LayoutContent = (
    <html lang={language} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={
            language === "fr"
              ? "IRONZ – L'élite de l'équipement sportif au Maroc. Matériel de musculation, suppléments et accessoires de qualité professionnelle. Livraison express partout au Maroc."
              : "IRONZ – Morocco's elite sports equipment store. Professional-grade gym equipment, supplements and accessories. Express delivery across Morocco."
          }
        />
        <meta
          name="keywords"
          content="IRONZ, équipement sportif Maroc, musculation, salle de sport, suppléments, accessoires fitness, home gym Maroc, livraison Maroc"
        />
        <meta name="author" content="IRONZ" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#F59E0B" />
        <link rel="canonical" href="https://www.ironz.ma" />

        <meta
          property="og:title"
          content="IRONZ – Équipement Sportif Premium au Maroc"
        />
        <meta
          property="og:description"
          content="Découvrez notre gamme complète d'équipements sportifs professionnels, suppléments et accessoires de fitness. Livraison express au Maroc."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ironz.ma" />
        <meta property="og:image" content="https://www.ironz.ma/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="IRONZ – Équipement Sportif" />
        <meta property="og:site_name" content="IRONZ" />
        <meta property="og:locale" content="fr_MA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="IRONZ – Équipement Sportif Premium au Maroc"
        />
        <meta
          name="twitter:description"
          content="Équipements sportifs professionnels, suppléments et accessoires fitness. Livraison express au Maroc."
        />
        <meta
          name="twitter:image"
          content="https://www.ironz.ma/og-image.jpg"
        />
        <meta name="twitter:site" content="@ironz_official" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportingGoodsStore",
              name: "IRONZ",
              description:
                "L'élite de l'équipement sportif marocain. Matériel de musculation, suppléments et accessoires de qualité professionnelle.",
              url: "https://www.ironz.ma",
              logo: "https://www.ironz.ma/logo.png",
              image: "https://www.ironz.ma/og-image.jpg",
              telephone: "+212669510042",
              email: "info@ironz.ma",
              address: {
                "@type": "PostalAddress",
                streetAddress: "SAHARA MALL 1ÈRE ÉTAGE C169 & C120",
                addressCountry: "MA",
              },
              sameAs: [
                "https://www.instagram.com/ironz_official/",
                "https://www.youtube.com/@ironzofficial",
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "21:00",
              },
              priceRange: "$$",
              currenciesAccepted: "MAD",
              paymentAccepted: "Cash, Credit Card",
            }),
          }}
        />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>

      <body className={cn(inter.variable, "font-sans bg-white dark:bg-gray-950")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <FavoritesProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-yellow-500 focus:text-black focus:rounded-lg focus:font-bold"
              >
                {language === "fr" ? "Aller au contenu" : "Skip to content"}
              </a>

              <div className="flex flex-col min-h-screen">
                {!isAdminPath && (
                  <Navbar language={language} toggleLanguage={toggleLanguage} />
                )}

                <main
                  id="main-content"
                  className={isAdminPath ? "" : "flex-grow"}
                  role="main"
                >
                  {children}
                </main>

                {!isAdminPath && <Footer language={language} />}
                <ScrollToTop />
              </div>
            </FavoritesProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );

  if (hasClerkKeys) {
    return <ClerkProvider>{LayoutContent}</ClerkProvider>;
  }
  return LayoutContent;
}

// ─── Scroll-to-Top ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShow(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 lg:right-8 lg:bottom-8 p-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-2xl shadow-yellow-500/30 z-50 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Retour en haut de page"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = React.memo(function Navbar({
  language,
  toggleLanguage,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { itemCount: favoritesCount } = useFavorites();

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      const t = e.target as Node;
      if (searchOpen && searchRef.current && !searchRef.current.contains(t))
        setSearchOpen(false);
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(t)
      )
        setMobileMenuOpen(false);
      if (authDropdownOpen && authRef.current && !authRef.current.contains(t))
        setAuthDropdownOpen(false);
      if (
        mobileSearchOpen &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(t)
      )
        setMobileSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen, mobileMenuOpen, authDropdownOpen, mobileSearchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produit?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleMobileSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(
        `/produit?search=${encodeURIComponent(mobileSearchQuery.trim())}`
      );
      setMobileSearchOpen(false);
      setMobileSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname?.startsWith(path) ?? false;

  const serviceLinks = useMemo<ServiceLink[]>(
    () => [
      {
        name: language === "fr" ? "Aménagement de salle" : "Room Setup",
        path: "/services/amenagement-salle",
        subLinks: [
          {
            name: "Home Gym",
            path: "/services/amenagement-salle/home-gym",
          },
          {
            name:
              language === "fr"
                ? "Salle Professionnelle"
                : "Professional Gym",
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
          language === "fr"
            ? "Revêtement sol & mur"
            : "Floor & Wall Covering",
        path: "/services/revetement-sol-mur",
      },
    ],
    [language]
  );

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -8, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 28 },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  };

  const mobileMenuVariants: Variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 32 },
    },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.22 } },
  };

  const submenuVariants: Variants = {
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

  const searchDropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, scaleY: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: { type: "spring", stiffness: 400, damping: 28 },
    },
    exit: {
      opacity: 0,
      y: -10,
      scaleY: 0.95,
      transition: { duration: 0.15 },
    },
  };

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div
        role="banner"
        aria-label="Promotion"
        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs sm:text-sm font-black uppercase italic tracking-wider py-2 px-4 text-center"
      >
        <p className="container mx-auto">
          {language === "fr"
            ? "🚀 LIVRAISON EXPRESS PARTOUT AU MAROC"
            : "🚀 EXPRESS DELIVERY ACROSS MOROCCO"}
        </p>
      </div>

      {/* ── Main Navbar ── */}
      <header role="banner">
        <nav
          aria-label="Navigation principale"
          className={cn(
            "sticky top-0 w-full z-[100] transition-all duration-300 border-b",
            scrolled
              ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg py-1 border-gray-200 dark:border-gray-800"
              : "bg-white dark:bg-gray-900 py-2 border-transparent"
          )}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
              {/* Logo */}
              <motion.div
                onHoverStart={() => setIsHoveringLogo(true)}
                onHoverEnd={() => setIsHoveringLogo(false)}
                animate={isHoveringLogo ? { rotate: 5 } : { rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-shrink-0 z-10"
              >
                <Link
                  href="/"
                  aria-label="IRONZ – Accueil"
                  className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-lg"
                >
                  <Image
                    src="/logo.png"
                    alt="IRONZ – Équipement Sportif Maroc"
                    width={160}
                    height={54}
                    className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
                    priority
                    unoptimized
                  />
                </Link>
              </motion.div>

              {/* ── Desktop Navigation ── */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                <NavLink href="/" active={isActive("/")}>
                  {language === "fr" ? "Accueil" : "Home"}
                </NavLink>

                {/* Products Mega Dropdown */}
                <div
                  className="relative group"
                  role="navigation"
                  aria-label="Produits"
                >
                  <button
                    aria-haspopup="true"
                    aria-expanded="false"
                    className={cn(
                      "flex items-center gap-1 px-3 xl:px-4 py-2.5 rounded-xl text-sm font-black uppercase italic transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
                      isActive("/categories") || isActive("/produit")
                        ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    {language === "fr" ? "Produits" : "Products"}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-2 w-64 rounded-2xl p-2 shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={cat.href}
                        role="menuitem"
                        className="flex items-center px-3 py-2.5 text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium focus:outline-none focus-visible:bg-gray-50"
                      >
                        <ChevronRight className="h-4 w-4 mr-2 text-yellow-500 opacity-0 group-focus:opacity-100" />
                        {cat.name}
                      </Link>
                    ))}
                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                    <Link
                      href="/produit"
                      role="menuitem"
                      className="flex items-center justify-center px-3 py-2.5 text-sm font-black uppercase italic text-yellow-600 dark:text-yellow-400 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                    >
                      {language === "fr"
                        ? "Voir tous les produits"
                        : "View All Products"}
                    </Link>
                  </div>
                </div>

                {/* Services Dropdown */}
                <div
                  className="relative group"
                  role="navigation"
                  aria-label="Services"
                >
                  <button
                    aria-haspopup="true"
                    aria-expanded="false"
                    className={cn(
                      "flex items-center gap-1 px-3 xl:px-4 py-2.5 rounded-xl text-sm font-black uppercase italic transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
                      isActive("/services")
                        ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    {language === "fr" ? "Services" : "Services"}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-2 w-72 rounded-2xl p-2 shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  >
                    {serviceLinks.map((link, i) => (
                      <div key={i}>
                        <Link
                          href={link.path}
                          role="menuitem"
                          className="flex items-center px-3 py-2.5 text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                        >
                          {link.name}
                        </Link>
                        {link.subLinks && (
                          <div className="ml-4 space-y-0.5 mb-1">
                            {link.subLinks.map((sub, si) => (
                              <Link
                                key={si}
                                href={sub.path}
                                role="menuitem"
                                className="flex items-center px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                              >
                                <ChevronRight className="h-3 w-3 mr-1 text-orange-400" />
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                    <Link
                      href="/services"
                      role="menuitem"
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
                  Contact
                </NavLink>

                <Link href="/demande-devis">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="ml-2 px-4 xl:px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 font-black uppercase italic tracking-widest transition-all shadow-lg shadow-yellow-500/25 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                  >
                    {language === "fr" ? "Demande devis" : "Request Quote"}
                  </motion.button>
                </Link>
              </div>

              {/* ── Right Icons ── */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Desktop Search */}
                <div className="hidden lg:block relative" ref={searchRef}>
                  <AnimatePresence>
                    {searchOpen ? (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={searchDropdownVariants}
                        className="absolute right-0 top-1/2 -translate-y-1/2 origin-top-right"
                      >
                        <form
                          onSubmit={handleSearch}
                          className="flex items-center gap-2 bg-white dark:bg-gray-800 border-2 border-yellow-500 rounded-xl shadow-xl px-3 py-1.5 min-w-[280px] xl:min-w-[340px]"
                        >
                          <Search className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                          <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setSearchQuery(e.target.value)
                            }
                            placeholder={
                              language === "fr"
                                ? "Rechercher un produit..."
                                : "Search a product..."
                            }
                            className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                            autoComplete="off"
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={() => setSearchQuery("")}
                              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                              aria-label="Effacer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors ml-1 pl-2 border-l border-gray-200 dark:border-gray-600"
                            aria-label="Fermer la recherche"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="search-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSearchOpen(true)}
                        aria-label={
                          language === "fr"
                            ? "Ouvrir la recherche"
                            : "Open search"
                        }
                        className="p-2 sm:p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                      >
                        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Search Button */}
                <div className="lg:hidden relative" ref={mobileSearchRef}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileSearchOpen((p) => !p)}
                    aria-label={
                      language === "fr"
                        ? "Ouvrir la recherche"
                        : "Open search"
                    }
                    aria-expanded={mobileSearchOpen}
                    className="p-2 sm:p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                  >
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.button>

                  {/* Mobile Search Dropdown */}
                  <AnimatePresence>
                    {mobileSearchOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={searchDropdownVariants}
                        className="absolute right-0 top-full mt-2 w-[85vw] max-w-sm origin-top-right z-50"
                      >
                        <form
                          onSubmit={handleMobileSearch}
                          className="flex items-center gap-2 bg-white dark:bg-gray-900 border-2 border-yellow-500 rounded-2xl shadow-2xl px-3 py-2"
                        >
                          <Search className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                          <input
                            type="text"
                            value={mobileSearchQuery}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setMobileSearchQuery(e.target.value)
                            }
                            placeholder={
                              language === "fr"
                                ? "Rechercher un produit..."
                                : "Search a product..."
                            }
                            className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                            autoFocus
                            autoComplete="off"
                          />
                          {mobileSearchQuery && (
                            <button
                              type="button"
                              onClick={() => setMobileSearchQuery("")}
                              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                              aria-label="Effacer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="submit"
                            className="ml-1 px-3 py-1.5 rounded-lg bg-yellow-500 text-black text-xs font-black uppercase italic hover:bg-yellow-600 transition-colors flex-shrink-0"
                          >
                            {language === "fr" ? "OK" : "Go"}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cart */}
                <Link
                  href="/panier"
                  aria-label={`Panier (${itemCount} articles)`}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative p-2 sm:p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    {itemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center rounded-full bg-yellow-500 text-white text-[10px] sm:text-xs font-black"
                        aria-hidden="true"
                      >
                        {itemCount > 9 ? "9+" : itemCount}
                      </motion.span>
                    )}
                  </motion.button>
                </Link>

                {/* Auth – Desktop */}
                <div className="hidden lg:flex items-center">
                  <ConditionalSignedOut>
                    <div className="relative" ref={authRef}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAuthDropdownOpen((p) => !p)}
                        aria-expanded={authDropdownOpen}
                        aria-haspopup="true"
                        className="flex items-center gap-2 px-3 xl:px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm font-black uppercase italic hidden xl:block">
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
                            role="menu"
                            className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                          >
                            <div className="p-2 space-y-1">
                              <ConditionalSignInButton mode="modal">
                                <button
                                  role="menuitem"
                                  className="w-full flex items-center px-4 py-3 text-sm text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                  <LogIn className="h-4 w-4 mr-3 text-yellow-500" />
                                  {language === "fr"
                                    ? "Se connecter"
                                    : "Sign In"}
                                </button>
                              </ConditionalSignInButton>
                              <ConditionalSignUpButton mode="modal">
                                <button
                                  role="menuitem"
                                  className="w-full flex items-center px-4 py-3 text-sm text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                  <User className="h-4 w-4 mr-3 text-orange-500" />
                                  {language === "fr"
                                    ? "S'inscrire"
                                    : "Sign Up"}
                                </button>
                              </ConditionalSignUpButton>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ConditionalSignedOut>

                  <ConditionalSignedIn>
                    <ConditionalUserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-9 w-9 xl:h-10 xl:w-10",
                        },
                      }}
                    />
                  </ConditionalSignedIn>
                </div>

                {/* Mobile Hamburger */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Ouvrir le menu"
                  aria-expanded={mobileMenuOpen}
                  className="lg:hidden p-2 sm:p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                >
                  <MenuIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-[150] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              ref={mobileMenuRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="absolute inset-y-0 right-0 w-full xs:w-[90vw] sm:w-[420px] bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="IRONZ – Accueil"
                >
                  <Image
                    src="/logo.png"
                    alt="IRONZ Logo"
                    width={130}
                    height={44}
                    className="h-11 sm:h-14 w-auto object-contain"
                    unoptimized
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Fermer le menu"
                  className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain py-4 sm:py-6 px-4 sm:px-5">
                {/* Mobile Menu Search */}
                <div className="mb-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.currentTarget.querySelector("input");
                      const query = input?.value?.trim();
                      if (query) {
                        router.push(
                          `/produit?search=${encodeURIComponent(query)}`
                        );
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus-within:border-yellow-500 rounded-xl px-3 py-2 transition-colors"
                  >
                    <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder={
                        language === "fr"
                          ? "Rechercher un produit..."
                          : "Search a product..."
                      }
                      className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-yellow-500 text-black text-xs font-black uppercase italic hover:bg-yellow-600 transition-colors flex-shrink-0"
                    >
                      {language === "fr" ? "Chercher" : "Search"}
                    </button>
                  </form>
                </div>

                {/* Auth */}
                <ConditionalSignedOut>
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <ConditionalSignInButton mode="modal">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-yellow-500 hover:text-yellow-600 transition-colors text-sm font-semibold"
                      >
                        <LogIn className="h-4 w-4" />
                        {language === "fr" ? "Connexion" : "Sign In"}
                      </button>
                    </ConditionalSignInButton>
                    <ConditionalSignUpButton mode="modal">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-black uppercase italic"
                      >
                        <User className="h-4 w-4" />
                        {language === "fr" ? "Inscription" : "Sign Up"}
                      </button>
                    </ConditionalSignUpButton>
                  </div>
                </ConditionalSignedOut>

                <ConditionalSignedIn>
                  <div className="mb-6 flex justify-center">
                    <ConditionalUserButton afterSignOutUrl="/" />
                  </div>
                </ConditionalSignedIn>

                {/* Nav Links */}
                <nav aria-label="Navigation mobile">
                  <ul className="space-y-1 mb-6">
                    <li>
                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all",
                          isActive("/")
                            ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        <Home className="h-5 w-5 flex-shrink-0" />
                        {language === "fr" ? "Accueil" : "Home"}
                      </Link>
                    </li>
                  </ul>

                  {/* Products Accordion */}
                  <div className="mb-3">
                    <button
                      onClick={() => setMobileProductsOpen((p) => !p)}
                      aria-expanded={mobileProductsOpen}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                        <span className="font-black uppercase italic text-gray-900 dark:text-white text-sm">
                          {language === "fr" ? "Produits" : "Products"}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-gray-500 transition-transform duration-200",
                          mobileProductsOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileProductsOpen && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={submenuVariants}
                          className="pl-4 pt-1 space-y-0.5"
                        >
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={cat.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                              {cat.name}
                            </Link>
                          ))}
                          <Link
                            href="/produit"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black uppercase italic text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors mt-1"
                          >
                            {language === "fr"
                              ? "Voir tous les produits →"
                              : "View All Products →"}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Services Accordion */}
                  <div className="mb-3">
                    <button
                      onClick={() => setMobileServicesOpen((p) => !p)}
                      aria-expanded={mobileServicesOpen}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-orange-500 flex-shrink-0" />
                        <span className="font-black uppercase italic text-gray-900 dark:text-white text-sm">
                          {language === "fr" ? "Services" : "Services"}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-gray-500 transition-transform duration-200",
                          mobileServicesOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={submenuVariants}
                          className="pl-4 pt-1 space-y-0.5"
                        >
                          {serviceLinks.map((link, i) => (
                            <div key={i}>
                              <Link
                                href={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                              >
                                <ChevronRight className="h-4 w-4 text-orange-400 flex-shrink-0" />
                                {link.name}
                              </Link>
                              {link.subLinks && (
                                <div className="ml-4 space-y-0.5">
                                  {link.subLinks.map((sub, si) => (
                                    <Link
                                      key={si}
                                      href={sub.path}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                      <ChevronRight className="h-3 w-3 text-gray-400" />
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          <Link
                            href="/services"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black uppercase italic text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors mt-1"
                          >
                            {language === "fr"
                              ? "Tous nos services →"
                              : "All Services →"}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Static Links */}
                  <ul className="space-y-1 mt-3">
                    {[
                      {
                        href: "/a-propos",
                        icon: <Info className="h-5 w-5 flex-shrink-0" />,
                        label: language === "fr" ? "À propos" : "About",
                      },
                      {
                        href: "/contact",
                        icon: <Phone className="h-5 w-5 flex-shrink-0" />,
                        label: "Contact",
                      },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all",
                            isActive(item.href)
                              ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          )}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Footer CTA */}
              <div className="p-4 sm:p-5 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-gray-900">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/demande-devis"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <button className="w-full py-3 px-3 rounded-xl border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-black uppercase italic text-xs sm:text-sm tracking-wider transition-colors">
                      {language === "fr" ? "Devis" : "Quote"}
                    </button>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <button className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black uppercase italic text-xs sm:text-sm tracking-wider">
                      {language === "fr" ? "Contacter" : "Contact"}
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

// ─── NavLink ──────────────────────────────────────────────────────────────────

function NavLink({ href, children, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 xl:px-4 py-2.5 rounded-xl text-sm font-black uppercase italic transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
        active
          ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
      )}
    >
      {children}
    </Link>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = React.memo(function Footer({ language }: FooterProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentYear = new Date().getFullYear();

  const socialLinks = useMemo<SocialLink[]>(
    () => [
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
    ],
    []
  );

  const footerCategories = useMemo<CategoryLink[]>(
    () => [
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
      {
        name: language === "fr" ? "Tous les produits" : "All Products",
        href: "/produit",
      },
    ],
    [language]
  );

  const infoLinks = useMemo<CategoryLink[]>(
    () => [
      { name: language === "fr" ? "À propos" : "About", href: "/a-propos" },
      { name: "Contact", href: "/contact" },
      {
        name: language === "fr" ? "Demande de devis" : "Quote Request",
        href: "/demande-devis",
      },
      { name: "FAQ", href: "/faq" },
    ],
    [language]
  );

  const contactInfo = useMemo<ContactItem[]>(
    () => [
      {
        icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
        content: "SAHARA MALL 1ÈRE ÉTAGE C169 & C120",
      },
      {
        icon: <Phone className="h-5 w-5" aria-hidden="true" />,
        content: "+212 669 51 00 42",
        href: "tel:+212669510042",
      },
      {
        icon: <Mail className="h-5 w-5" aria-hidden="true" />,
        content: "info@ironz.ma",
        href: "mailto:info@ironz.ma",
      },
    ],
    []
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  if (!mounted) return null;

  return (
    <footer
      className="bg-black text-white relative overflow-hidden border-t border-gray-900"
      aria-label="Pied de page IRONZ"
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-yellow-500/8 rounded-full blur-[80px] sm:blur-[100px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-orange-500/8 rounded-full blur-[100px] sm:blur-[120px] translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Brand */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 lg:col-span-1 space-y-5"
          >
            <Link href="/" aria-label="IRONZ – Accueil">
              <Image
                src="/logo.png"
                alt="IRONZ – Équipement Sportif Maroc"
                width={160}
                height={60}
                className="h-14 sm:h-16 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              {language === "fr"
                ? "L'élite de l'équipement sportif marocain. Forgez votre avenir avec notre matériel de qualité professionnelle."
                : "Morocco's elite sports equipment. Forge your future with our professional-grade gear."}
            </p>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`IRONZ sur ${social.name}`}
                  className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                language === "fr" ? "🚀 Livraison rapide" : "🚀 Fast delivery",
                language === "fr"
                  ? "✅ Qualité garantie"
                  : "✅ Quality guaranteed",
              ].map((badge, i) => (
                <span
                  key={i}
                  className="text-xs text-gray-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Catalog */}
          <motion.div variants={itemVariants}>
            <h2 className="text-base font-black uppercase italic tracking-wider mb-5 flex items-center gap-2">
              <span
                className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                aria-hidden="true"
              />
              {language === "fr" ? "Catalogue" : "Catalog"}
            </h2>
            <ul className="space-y-3" role="list">
              {footerCategories.map((cat, i) => (
                <li key={i}>
                  <Link
                    href={cat.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-yellow-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h2 className="text-base font-black uppercase italic tracking-wider mb-5 flex items-center gap-2">
              <span
                className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                aria-hidden="true"
              />
              {language === "fr" ? "Support" : "Support"}
            </h2>
            <ul className="space-y-3" role="list">
              {infoLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h2 className="text-base font-black uppercase italic tracking-wider mb-5 flex items-center gap-2">
              <span
                className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                aria-hidden="true"
              />
              Contact
            </h2>
            <address className="not-italic space-y-3">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                  whileHover={{ y: -2 }}
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-black text-gray-500 group-hover:text-yellow-500 group-hover:bg-yellow-500/10 transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors leading-snug block truncate"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-300 leading-snug block">
                        {item.content}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </address>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-gray-500 text-xs sm:text-sm font-medium tracking-wide text-center sm:text-left">
            <span className="text-yellow-500 font-bold">&copy;</span>{" "}
            {currentYear} IRONZ.{" "}
            {language === "fr"
              ? "Tous droits réservés."
              : "All rights reserved."}
          </p>

          <nav aria-label="Liens légaux">
            <ul className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              {[
                {
                  label: language === "fr" ? "Confidentialité" : "Privacy",
                  href: "/confidentialite",
                },
                {
                  label: language === "fr" ? "Conditions" : "Terms",
                  href: "/conditions",
                },
                { label: "FAQ", href: "/faq" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-xs font-black uppercase tracking-wider text-gray-600 hover:text-yellow-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
});