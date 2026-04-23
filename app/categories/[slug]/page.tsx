"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  Search,
  Filter,
  X,
  ArrowUpDown,
  Star,
  StarHalf,
  ShoppingCart,
  ArrowLeft,
  Package,
  Flame,
  Zap,
  Award,
  Sparkles,
  Truck,
  ShieldCheck,
  Clock,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCart } from "../../../context/cart-context";
import { cn } from "../../../lib/utils";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Slider } from "../../../components/ui/slider";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../../../components/ui/sheet";
import { Separator } from "../../../components/ui/separator";

// ─── TYPES ──────────────────────────────────────────────

interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  slug: string;
  category: string;
  subCategory?: string;
  description?: string;
  isNewProduct?: boolean;
  isFeatured?: boolean;
  discount?: number;
  rating?: number;
  tags?: string[];
  createdAt: string;
}

interface CategoryIcons {
  [key: string]: ReactNode;
}

interface CloudImgProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  cloudinary?: boolean;
}

// ─── HELPERS ─────────────────────────────────────────────

const createSlug = (text: string): string => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const CATEGORY_ICONS: CategoryIcons = {
  musculation: <Flame className="h-5 w-5" />,
  cardio: <Zap className="h-5 w-5" />,
  crossfit: <Award className="h-5 w-5" />,
  boxe: <Sparkles className="h-5 w-5" />,
  accessoires: <Package className="h-5 w-5" />,
  nutrition: <Truck className="h-5 w-5" />,
  equipements: <ShieldCheck className="h-5 w-5" />,
  supplement: <Clock className="h-5 w-5" />,
};

const API_URL =
  "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";
const PLACEHOLDER = "/placeholder.svg";

// ─── CLOUD IMAGE COMPONENT ──────────────────────────────

function CloudImg({
  src,
  alt,
  fill = false,
  className = "",
  cloudinary = true,
}: CloudImgProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || PLACEHOLDER);

  useEffect(() => {
    if (cloudinary && src && typeof src === "string") {
      const transformedSrc = src.startsWith("http")
        ? src
        : `https://res.cloudinary.com/dypjgpisl/image/upload/q_auto,f_auto/${src}`;
      setImgSrc(transformedSrc);
    } else {
      setImgSrc(PLACEHOLDER);
    }
  }, [src, cloudinary]);

  const handleError = () => setImgSrc(PLACEHOLDER);

  if (fill) {
    return (
      <img
        src={imgSrc}
        alt={alt || ""}
        onError={handleError}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          className
        )}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || ""}
      onError={handleError}
      className={className}
    />
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug?.toString();

  // ── State ────────────────────────────────────────────
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryIcon, setCategoryIcon] = useState<ReactNode>(
    <Package className="h-5 w-5" />
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [availableSubCategories, setAvailableSubCategories] = useState<
    string[]
  >([]);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    string[]
  >([]);
  const [sortOption, setSortOption] = useState<string>("featured");

  // UI
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { addToCart } = useCart();

  // ── Fetch Data ───────────────────────────────────────

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!slug) return;

      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/products?limit=1000`);
        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();

        let allProducts: Product[] = [];
        if (Array.isArray(json)) allProducts = json;
        else if (json.data && Array.isArray(json.data))
          allProducts = json.data;
        else if (json.products && Array.isArray(json.products))
          allProducts = json.products;

        const targetSlug = slug.toLowerCase();

        const catProducts = allProducts.filter((p) => {
          if (!p.category) return false;
          return createSlug(p.category) === targetSlug;
        });

        setProducts(catProducts);
        setFilteredProducts(catProducts);

        if (catProducts.length > 0) {
          setCategoryName(catProducts[0].category);
        } else {
          setCategoryName(
            slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
          );
        }

        const matchedIconKey = Object.keys(CATEGORY_ICONS).find((key) =>
          targetSlug.includes(key)
        );
        if (matchedIconKey) {
          setCategoryIcon(CATEGORY_ICONS[matchedIconKey]);
        }

        const subCats = [
          ...new Set(
            catProducts
              .map((p) => p.subCategory)
              .filter((s): s is string => !!s)
          ),
        ];
        setAvailableSubCategories(subCats.sort());

        if (catProducts.length > 0) {
          const maxP = Math.max(
            ...catProducts.map((p) => p.price || 0)
          );
          setPriceRange([0, Math.ceil(maxP * 1.1)]);
        }
      } catch (err) {
        console.error("Error loading category:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  // ── Filtering Logic ──────────────────────────────────

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          (p.tags && p.tags.some((tag) => tag?.toLowerCase().includes(query)))
      );
    }

    result = result.filter(
      (p) =>
        (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]
    );

    if (selectedSubCategories.length > 0) {
      result = result.filter(
        (p) => p.subCategory && selectedSubCategories.includes(p.subCategory)
      );
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        result.sort((a, b) =>
          b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? 1 : -1
        );
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, priceRange, sortOption, selectedSubCategories]);

  // ── Handlers ─────────────────────────────────────────

  const handlePriceChange = (value: number[]) => setPriceRange(value);

  const handleSubCategoryToggle = (subCat: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCat)
        ? prev.filter((sc) => sc !== subCat)
        : [...prev, subCat]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSubCategories([]);
    if (products.length > 0) {
      const maxP = Math.max(...products.map((p) => p.price || 0));
      setPriceRange([0, Math.ceil(maxP * 1.1)]);
    } else {
      setPriceRange([0, 20000]);
    }
    setSortOption("featured");
  };

  const onAddToCart = (product: Product) => {
    addToCart({
      ...product,
      id: (product._id || product.id) as string,
      quantity: 1,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  const renderRating = (rating: number | undefined) => {
    const r = Number(rating) || 0;
    const full = Math.floor(r);
    const half = r - full >= 0.5;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => (
          <Star
            key={`f-${i}`}
            className="w-3 h-3 md:w-3.5 md:h-3.5 fill-yellow-400 text-yellow-400"
          />
        ))}
        {half && (
          <StarHalf className="w-3 h-3 md:w-3.5 md:h-3.5 fill-yellow-400 text-yellow-400" />
        )}
        {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
          <Star key={`e-${i}`} className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-300" />
        ))}
        <span className="ml-1 text-[10px] md:text-xs text-gray-500">
          ({r.toFixed(1)})
        </span>
      </div>
    );
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedSubCategories.length +
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0);

  // ── Loading Skeleton ─────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="animate-pulse space-y-6 md:space-y-8">
            <div className="h-6 w-32 md:w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-8 md:h-12 w-48 md:w-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 md:h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 h-56 md:h-80"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        {/* ─── Breadcrumb ──────────────────────────────── */}
        <nav
          className="mb-4 md:mb-8 flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium overflow-x-auto whitespace-nowrap scrollbar-hide"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-yellow-500 transition-colors shrink-0">
            ACCUEIL
          </Link>
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
          <Link href="/categories" className="hover:text-yellow-500 transition-colors shrink-0">
            CATÉGORIES
          </Link>
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
          <span className="text-gray-900 dark:text-white font-bold uppercase truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">
            {categoryName}
          </span>
        </nav>

        {/* ─── Header ──────────────────────────────────── */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6 mb-4 md:mb-8">
            <div className="flex items-start sm:items-center gap-3 md:gap-4">
              <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-yellow-500/30">
                {categoryIcon}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white leading-none">
                {categoryName}{" "}
                <span className="text-yellow-500">Collection</span>
              </h1>
            </div>
            <Link
              href="/produit"
              className="text-gray-400 hover:text-yellow-500 font-black uppercase italic text-[10px] md:text-xs lg:text-sm transition-colors flex items-center gap-2 shrink-0"
            >
              <ArrowLeft size={14} className="md:w-4 md:h-4" /> Voir tous les produits
            </Link>
          </div>
          <div className="max-w-3xl">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg border-l-2 md:border-l-4 border-yellow-500 pl-3 md:pl-6 py-2">
              Découvrez notre sélection premium pour {categoryName}. Des
              produits de qualité professionnelle pour vos entraînements.
            </p>
          </div>
        </div>

        {/* ─── Stats Bar ───────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-yellow-500 mb-0.5 md:mb-1">
              {products.length}
            </div>
            <div className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
              Produits
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-yellow-500 mb-0.5 md:mb-1">
              {availableSubCategories.length}
            </div>
            <div className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
              Sous-catégories
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-sm sm:text-lg md:text-2xl font-black text-yellow-500 mb-0.5 md:mb-1 truncate">
              {products.length > 0
                ? formatPrice(Math.min(...products.map((p) => p.price || 0)))
                : "-"}
            </div>
            <div className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
              Prix min
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className="text-sm sm:text-lg md:text-2xl font-black text-yellow-500 mb-0.5 md:mb-1 truncate">
              {products.length > 0
                ? formatPrice(Math.max(...products.map((p) => p.price || 0)))
                : "-"}
            </div>
            <div className="text-[10px] md:text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400">
              Prix max
            </div>
          </div>
        </div>

        {/* ─── Controls Bar ────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-gray-800 p-3 sm:p-4 md:p-6 mb-4 md:mb-8 shadow-sm">
          {/* Row 1: Search + Mobile Filter Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 mb-3 md:mb-0">
            {/* Mobile / Tablet Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden gap-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 h-11 md:h-12"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="font-bold text-xs md:text-sm">Filtres</span>
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-yellow-500 text-black text-[10px] font-black">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[85vw] sm:w-[380px] md:w-[420px] overflow-y-auto bg-white dark:bg-gray-900 z-[100] p-4 md:p-6"
              >
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-lg md:text-xl font-black uppercase italic text-left">
                    Filtres
                  </SheetTitle>
                </SheetHeader>

                <div className="space-y-6 md:space-y-8">
                  {/* Sub-categories */}
                  {availableSubCategories.length > 0 && (
                    <div>
                      <h3 className="font-black uppercase italic text-xs md:text-sm mb-3 md:mb-4 text-gray-900 dark:text-white">
                        Sous-catégories
                      </h3>
                      <div className="space-y-2 md:space-y-3">
                        {availableSubCategories.map((sub) => (
                          <div
                            key={sub}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={`mobile-sub-${sub}`}
                              checked={selectedSubCategories.includes(sub)}
                              onCheckedChange={() =>
                                handleSubCategoryToggle(sub)
                              }
                            />
                            <Label
                              htmlFor={`mobile-sub-${sub}`}
                              className="text-xs md:text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300 py-1"
                            >
                              {sub}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4 md:my-6" />
                    </div>
                  )}

                  {/* Price */}
                  <div>
                    <h3 className="font-black uppercase italic text-xs md:text-sm mb-3 md:mb-4 text-gray-900 dark:text-white">
                      Prix
                    </h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 20000]}
                        min={0}
                        max={20000}
                        step={100}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="mb-4 md:mb-6"
                      />
                      <div className="flex items-center justify-between text-xs md:text-sm font-black text-gray-900 dark:text-white">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <SheetFooter className="mt-6 md:mt-8 pb-6 md:pb-8">
                  <Button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black py-5 md:py-6 rounded-xl text-xs md:text-sm"
                  >
                    Voir {filteredProducts.length} produits
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 md:pl-12 pr-10 h-11 md:h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-yellow-500 w-full text-sm"
              />
              {searchQuery && (
                <X
                  className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => setSearchQuery("")}
                />
              )}
            </div>
          </div>

          {/* Row 2: Sort + View Mode */}
          <div className="flex items-center justify-between gap-2 md:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 min-w-[120px] sm:min-w-[160px] justify-between rounded-xl border-2 border-gray-200 dark:border-gray-700 h-10 md:h-12"
                >
                  <span className="truncate font-medium text-xs md:text-sm">
                    {sortOption === "featured" && "Populaires"}
                    {sortOption === "newest" && "Nouveautés"}
                    {sortOption === "price-asc" && "Prix croissant"}
                    {sortOption === "price-desc" && "Prix décroissant"}
                    {sortOption === "rating" && "Mieux notés"}
                    {sortOption === "discount" && "Meilleure réduction"}
                  </span>
                  <ArrowUpDown className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] z-[50]">
                <DropdownMenuItem onClick={() => setSortOption("featured")}>
                  Populaires
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("newest")}>
                  Nouveautés
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-asc")}>
                  Prix croissant
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-desc")}>
                  Prix décroissant
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("rating")}>
                  Mieux notés
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("discount")}>
                  Meilleure réduction
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 text-yellow-500 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
                aria-label="Vue grille"
              >
                <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 text-yellow-500 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
                aria-label="Vue liste"
              >
                <List className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Active Filter Badges ────────────────────── */}
        <AnimatePresence>
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-4 md:mb-8 p-3 md:p-4 bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-100 dark:border-gray-800"
            >
              <span className="text-[10px] md:text-xs font-black uppercase text-gray-400 mr-1">
                Filtres:
              </span>
              {searchQuery && (
                <Badge className="gap-1.5 rounded-full text-[10px] md:text-xs px-2 md:px-3 py-1">
                  &quot;{searchQuery}&quot;
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
              {selectedSubCategories.map((sub) => (
                <Badge
                  key={sub}
                  className="gap-1.5 rounded-full text-[10px] md:text-xs px-2 md:px-3 py-1"
                >
                  {sub}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleSubCategoryToggle(sub)}
                  />
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 20000) && (
                <Badge className="gap-1.5 rounded-full text-[10px] md:text-xs px-2 md:px-3 py-1">
                  {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setPriceRange([0, 20000])}
                  />
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-500 text-[10px] md:text-xs font-bold ml-auto"
              >
                Tout effacer
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Main Layout: Sidebar + Products ─────────── */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">

          {/* ── Desktop Sidebar ──────────────────────── */}
          <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-32">
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-5 xl:p-6 shadow-sm">
                <h3 className="text-lg xl:text-xl font-black uppercase italic mb-5 xl:mb-6 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-yellow-500" /> Filtres
                </h3>

                {availableSubCategories.length > 0 && (
                  <div className="mb-6 xl:mb-8">
                    <h4 className="font-black uppercase text-[10px] xl:text-xs mb-3 xl:mb-4 tracking-widest text-gray-400">
                      Sous-catégories
                    </h4>
                    <div className="space-y-2.5 max-h-60 xl:max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                      {availableSubCategories.map((sub) => (
                        <div
                          key={sub}
                          className="flex items-center space-x-3 group"
                        >
                          <Checkbox
                            id={`desktop-sub-${sub}`}
                            checked={selectedSubCategories.includes(sub)}
                            onCheckedChange={() =>
                              handleSubCategoryToggle(sub)
                            }
                          />
                          <Label
                            htmlFor={`desktop-sub-${sub}`}
                            className="text-xs xl:text-sm font-bold cursor-pointer group-hover:text-yellow-500 transition-colors uppercase"
                          >
                            {sub}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-5 xl:my-6" />
                  </div>
                )}

                <div className="mb-6 xl:mb-8">
                  <h4 className="font-black uppercase text-[10px] xl:text-xs mb-3 xl:mb-4 tracking-widest text-gray-400">
                    Budget (MAD)
                  </h4>
                  <Slider
                    defaultValue={[0, 20000]}
                    min={0}
                    max={20000}
                    step={100}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-4 xl:mb-6"
                  />
                  <div className="flex items-center justify-between text-xs xl:text-sm font-black">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                <Separator className="my-5 xl:my-6" />

                <Button
                  variant="outline"
                  className="w-full rounded-xl border-2 font-black uppercase italic text-[10px] xl:text-xs h-10 xl:h-11 gap-2"
                  onClick={clearFilters}
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
                </Button>
              </div>
            </div>
          </div>

          {/* ── Product Grid ─────────────────────────── */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 md:py-20 bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                <Search className="h-12 w-12 md:h-16 md:w-16 mx-auto text-gray-300 mb-4 md:mb-6" />
                <h3 className="text-lg md:text-xl font-black mb-2 md:mb-4 uppercase italic">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 px-4">
                  Essayez de modifier vos filtres ou votre recherche.
                </p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="rounded-xl font-bold text-xs md:text-sm gap-2"
                >
                  <RotateCcw className="h-4 w-4" /> Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <motion.div
                className={cn(
                  "grid gap-3 sm:gap-4 md:gap-5 lg:gap-6",
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.map((product) => {
                  const id = (product._id || product.id) as string;
                  return (
                    <motion.div
                      key={id}
                      variants={itemVariants}
                      whileHover={{ y: -6 }}
                      className={cn(
                        "group bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl md:hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500",
                        viewMode === "list" && "flex flex-col sm:flex-row"
                      )}
                    >
                      {/* Image */}
                      <div
                        className={cn(
                          "relative overflow-hidden bg-gray-50 dark:bg-gray-800",
                          viewMode === "grid"
                            ? "aspect-square"
                            : "w-full sm:w-52 md:w-60 lg:w-64 aspect-square sm:aspect-auto sm:h-full flex-shrink-0"
                        )}
                      >
                        <Link href={`/produit/${product.slug || id}`}>
                          <CloudImg
                            fill
                            src={product.image}
                            alt={product.name}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </Link>

                        {/* Badges */}
                        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1 md:gap-1.5">
                          {product.isNewProduct && (
                            <span className="bg-green-500 text-white text-[8px] md:text-[10px] lg:text-xs font-black uppercase px-1.5 py-0.5 md:px-2 md:py-1 rounded-md lg:rounded-lg shadow-sm">
                              Nouveau
                            </span>
                          )}
                          {Number(product.discount) > 0 && (
                            <span className="bg-red-500 text-white text-[8px] md:text-[10px] lg:text-xs font-black uppercase px-1.5 py-0.5 md:px-2 md:py-1 rounded-md lg:rounded-lg shadow-sm">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-1 min-w-0">
                        <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-gray-400 uppercase font-black tracking-widest mb-1.5 md:mb-2 truncate">
                          {product.subCategory || product.category}
                        </div>

                        <Link
                          href={`/produit/${product.slug || id}`}
                          className="mb-1.5 md:mb-3 block"
                        >
                          <h3 className="font-black text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 dark:text-white line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] group-hover:text-yellow-500 transition-colors leading-tight md:leading-snug">
                            {product.name}
                          </h3>
                        </Link>

                       

                        {/* Price + Cart */}
                        <div className="flex items-end justify-between pt-3 md:pt-4 border-t border-gray-50 dark:border-gray-800 mt-auto gap-2">
                          <div className="min-w-0">
                            <div className="font-black text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-white leading-none">
                              {formatPrice(product.price)}
                            </div>
                            {product.oldPrice > product.price && (
                              <div className="text-[9px] md:text-xs text-gray-400 line-through font-bold mt-0.5">
                                {formatPrice(product.oldPrice)}
                              </div>
                            )}
                          </div>
                          <Button
                            size="icon"
                            className="shrink-0 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 transition-all duration-300"
                            onClick={() => onAddToCart(product)}
                            aria-label={`Ajouter ${product.name} au panier`}
                          >
                            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* ── Footer / Pagination ────────────────── */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
              <p className="text-gray-400 text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-widest text-center sm:text-left">
                Affichage de{" "}
                <span className="text-gray-900 dark:text-white font-black">
                  {filteredProducts.length}
                </span>{" "}
                produits
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="rounded-xl font-bold text-[10px] md:text-xs gap-2 h-9 md:h-10"
              >
                <RotateCcw className="h-3 w-3 md:h-3.5 md:w-3.5" />{" "}
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}