"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useDeferredValue,
  ReactNode,
  ChangeEvent,
  memo,
  useRef,
} from "react";
import Link from "next/link";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  ShoppingCart,
  X,
  Check,
  ArrowUpDown,
  Star,
  StarHalf,
  Grid,
  List,
  AlertCircle,
  ArrowRight,
  Flame,
  Loader2,
  RefreshCw,
  CheckCircle,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../../context/cart-context";
import { useFavorites } from "../../../context/favorites-context";
import { cn } from "../../../lib/utils";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Slider } from "../../../components/ui/slider";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";
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

// --- TYPES ---
interface Product {
  _id?: string | number;
  id?: string | number;
  name: string;
  price: string | number;
  oldPrice?: string | number;
  image?: string;
  slug?: string;
  category?: string;
  subCategory?: string;
  description?: string;
  brand?: string;
  rating?: number;
  discount?: number;
  isNewProduct?: boolean;
  isFeatured?: boolean;
  inStock?: boolean;
  stockQuantity?: number;
  createdAt?: string;
}

interface Category {
  id: number;
  name: string;
}

interface CloudImgProps {
  src?: string;
  alt?: string;
  fill?: boolean;
  className?: string;
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  handleAddToCart: (e: React.MouseEvent, product: Product) => void;
}

interface SortOption {
  value: "featured" | "newest" | "price-asc" | "price-desc" | "rating" | "discount";
  label: string;
}

interface ApiResponse {
  success?: boolean;
  data?: Product[];
  products?: Product[];
  total?: number;
  page?: number;
  totalPages?: number;
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

// --- CONSTANTS ---
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://cts4hw2cbnwl4ur7zp6acy6cyy0jnxeo.lambda-url.eu-north-1.on.aws/api";
const PLACEHOLDER = "/placeholder.svg";
const BATCH_LIMIT = 50;
const AUTO_REFRESH_INTERVAL = 90_000; // 90 secondes

const SORT_OPTIONS: SortOption[] = [
  { value: "featured", label: "Mis en avant" },
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Meilleures notes" },
  { value: "discount", label: "Promotions" },
];

// --- UTILITIES ---
function getProductId(product: Product): string | number {
  return product._id ?? product.id ?? "";
}

function CloudImg({ src, alt, fill = false, className = "" }: CloudImgProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || PLACEHOLDER);
  
  useEffect(() => {
    if (src && src.startsWith("http")) {
      setImgSrc(src);
    } else if (src) {
      setImgSrc(`https://res.cloudinary.com/dypjgpisl/image/upload/q_auto,f_auto/${src}`);
    } else {
      setImgSrc(PLACEHOLDER);
    }
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt || ""}
      onError={() => setImgSrc(PLACEHOLDER)}
      className={cn(
        fill ? "absolute inset-0 h-full w-full" : "",
        "object-cover",
        className
      )}
      loading="lazy"
    />
  );
}

const formatPrice = (price: string | number): string =>
  new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
  }).format(Number(price) || 0);

const renderRating = (rating: number | undefined): ReactNode => {
  const r = Number(rating) || 0;
  const fullStars = Math.floor(r);
  const hasHalfStar = r % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Note: ${r} sur 5`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`f-${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" aria-hidden />
      ))}
      {hasHalfStar && <StarHalf className="w-3 h-3 fill-yellow-400 text-yellow-400" aria-hidden />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`e-${i}`} className="w-3 h-3 text-gray-300" aria-hidden />
      ))}
      <span className="ml-1 text-xs text-gray-500 font-medium">({r.toFixed(1)})</span>
    </div>
  );
};

// --- INSTANT BATCH FETCHING ---
async function fetchAllProductsInstant(): Promise<Product[]> {
  let allProducts: Product[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `${API_URL}/products?page=${page}&limit=${BATCH_LIMIT}&sort=newest`;
    const res = await fetch(url, { cache: "no-store" });
    
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    
    const data: ApiResponse | Product[] = await res.json();
    let batch: Product[] = [];

    if (Array.isArray(data)) {
      batch = data;
    } else if ((data as ApiResponse).data) {
      batch = (data as ApiResponse).data!;
    } else if ((data as ApiResponse).products) {
      batch = (data as ApiResponse).products!;
    }

    if (batch.length === 0) {
      hasMore = false;
      break;
    }

    allProducts = [...allProducts, ...batch];
    if (batch.length < BATCH_LIMIT) hasMore = false;
    else page++;
  }

  return Array.from(
    new Map(allProducts.map((p) => [getProductId(p), p])).values()
  );
}

// --- PRODUCT CARD ---
const ProductCard = memo(function ProductCard({
  product,
  viewMode = "grid",
  handleAddToCart,
}: ProductCardProps) {
  const productId = getProductId(product);
  const imgSrc = product.image || PLACEHOLDER;
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = isInFavorites(productId);

  const handleFavoriteToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isFavorite) removeFromFavorites(productId);
      else addToFavorites({ ...product, id: productId } as any);
    },
    [isFavorite, productId, product, addToFavorites, removeFromFavorites]
  );

  return (
    <motion.article
      layout
      key={productId}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all h-full group",
        viewMode === "list"
          ? "flex flex-col sm:flex-row h-auto sm:h-56 md:h-64 lg:h-72"
          : "flex flex-col"
      )}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -4 }}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-gray-50 dark:bg-gray-900 shrink-0",
          viewMode === "list"
            ? "w-full sm:w-40 md:w-56 h-48 sm:h-full"
            : "w-full h-48 sm:h-52 md:h-60 lg:h-64"
        )}
      >
        <Link href={`/produit/${product.slug || productId}`} className="block w-full h-full">
          <CloudImg
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            fill
          />
        </Link>

        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 sm:gap-2 z-10">
          <button
            onClick={(e) => handleAddToCart(e, product)}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-md hover:bg-yellow-600 transition-all"
            aria-label="Ajouter au panier"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2 z-10">
          {product.isNewProduct && (
            <Badge className="bg-yellow-500 text-black shadow-md border-none text-[10px] sm:text-xs px-2 py-0.5">
              Nouveau
            </Badge>
          )}
          {Number(product.discount) > 0 && (
            <Badge className="bg-red-500 text-white shadow-md border-none text-[10px] sm:text-xs px-2 py-0.5">
              -{product.discount}%
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-black text-yellow-500 shadow-md border-none text-[10px] sm:text-xs px-2 py-0.5">
              <Flame className="w-2.5 h-2.5 inline mr-1" />Populaire
            </Badge>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-[10px] sm:text-xs text-yellow-600 dark:text-yellow-400 font-medium uppercase tracking-wider line-clamp-1">
            {product.brand || product.category}
          </span>
        </div>

        <Link href={`/produit/${product.slug || productId}`}>
          <h2
            className={cn(
              "font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors line-clamp-2",
              viewMode === "list"
                ? "text-sm sm:text-base md:text-lg mb-1 sm:mb-2"
                : "text-sm sm:text-base md:text-lg mb-2 sm:mb-3"
            )}
          >
            {product.name}
          </h2>
        </Link>

        {product.description && (
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-2 sm:pt-3 border-t border-gray-50 dark:border-gray-800">
          <div>
            <span
              className={cn(
                "font-black text-gray-900 dark:text-white",
                viewMode === "list" ? "text-lg sm:text-xl md:text-2xl" : "text-lg sm:text-xl"
              )}
            >
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm line-through text-gray-500">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <Link
            href={`/produit/${product.slug || productId}`}
            className="text-yellow-600 hover:text-yellow-700 font-bold text-xs sm:text-sm flex items-center gap-1 group/link w-fit"
          >
            Détails
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
});

// --- MAIN PAGE ---
interface ProductsPageProps {
  initialProducts?: Product[];
}

export default function ProductsPage({ initialProducts = [] }: ProductsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  // Map URL slug to expected category names (case-insensitive matching)
  const slugToCategory = useMemo(() => {
    const map: Record<string, string[]> = {
      equipements: ["Equipements", "Équipements", "equipements", "équipements"],
      supplement: ["Supplément", "Supplement", "supplément", "supplement"],
      accessoires: ["Accessoires", "accessoires"],
    };
    return map[slug.toLowerCase()] || [];
  }, [slug]);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(initialProducts.length === 0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const [toast, setToast] = useState<ToastState>({ show: false, message: "", type: "success" });

  const [searchQuery, setSearchQuery] = useState<string>(searchParams?.get("search") || "");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortOption, setSortOption] = useState<SortOption["value"]>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;

  const { addToCart } = useCart();
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCallback((message: string, type: ToastState["type"] = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  }, []);

  const updatePriceRange = useCallback((prods: Product[]) => {
    if (prods.length === 0) return;
    const prices = prods.map((p) => parseFloat(String(p.price))).filter((n) => !isNaN(n));
    if (prices.length === 0) return;
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange((prev) => {
      if (prev[0] === 0 && prev[1] === 10000) return [min, max];
      return [Math.max(min, prev[0]), Math.min(max, prev[1])];
    });
  }, []);

  const loadProducts = useCallback(async (silent = false) => {
    if (!silent) {
      setIsLoading(true);
      setError(null);
    } else {
      setIsRefreshing(true);
    }

    try {
      const fresh = await fetchAllProductsInstant();
      setProducts(fresh);
      updatePriceRange(fresh);
      setLastSyncedAt(new Date());
      if (!silent) showNotification(`${fresh.length} produits chargés`, "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Impossible de charger les produits";
      setError(msg);
      if (!silent) showNotification(msg, "error");
      console.error("[Fetch error]", err);
    } finally {
      if (!silent) setIsLoading(false);
      else setIsRefreshing(false);
    }
  }, [updatePriceRange, showNotification]);

  // Initial load & auto-select category from slug
  useEffect(() => {
    if (initialProducts.length > 0) {
      updatePriceRange(initialProducts);
    } else {
      loadProducts(false);
    }
  }, []);

  // Auto-select category based on URL slug once products are loaded
  useEffect(() => {
    if (!slug || slugToCategory.length === 0 || products.length === 0) return;

    // Find which of the expected category names actually exists in the API data
    const apiCategories = [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];
    const matchedCategory = slugToCategory.find((cat) =>
      apiCategories.some((apiCat) => apiCat.toLowerCase() === cat.toLowerCase())
    );

    if (matchedCategory) {
      setSelectedCategories([matchedCategory]);
    }
  }, [slug, slugToCategory, products]);

  // AUTO-REFRESH every 30 seconds (like CategoryPage pattern)
  useEffect(() => {
    pollRef.current = setInterval(() => {
      loadProducts(true); // silent background sync
    }, AUTO_REFRESH_INTERVAL);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [loadProducts]);

  // Sync URL search param
  useEffect(() => {
    const urlSearch = searchParams?.get("search") ?? "";
    setSearchQuery(urlSearch);
    setCurrentPage(1);
  }, [searchParams]);

  // Responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // --- FILTER LOGIC ---
  const categories: Category[] = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return unique.sort().map((name, i) => ({ id: i + 1, name: name as string }));
  }, [products]);

  const availableSubCategories: string[] = useMemo(() => {
    const base = selectedCategories.length > 0
      ? products.filter((p) => selectedCategories.includes(p.category || ""))
      : products;
    return ([...new Set(base.map((p) => p.subCategory).filter(Boolean))] as string[]).sort();
  }, [products, selectedCategories]);

  const filteredProducts: Product[] = useMemo(() => {
    let result = [...products];

    if (deferredSearchQuery.trim()) {
      const q = deferredSearchQuery.toLowerCase().trim();
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0)
      result = result.filter((p) => selectedCategories.includes(p.category || ""));

    if (selectedSubCategories.length > 0)
      result = result.filter((p) => p.subCategory && selectedSubCategories.includes(p.subCategory));

    result = result.filter(
      (p) =>
        parseFloat(String(p.price)) >= priceRange[0] &&
        parseFloat(String(p.price)) <= priceRange[1]
    );

    switch (sortOption) {
      case "price-asc": return result.sort((a, b) => parseFloat(String(a.price)) - parseFloat(String(b.price)));
      case "price-desc": return result.sort((a, b) => parseFloat(String(b.price)) - parseFloat(String(a.price)));
      case "newest": return result.sort((a, b) => {
        if (a.isNewProduct && !b.isNewProduct) return -1;
        if (!a.isNewProduct && b.isNewProduct) return 1;
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
      case "rating": return result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "discount": return result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default: return result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
    }
  }, [deferredSearchQuery, selectedCategories, selectedSubCategories, priceRange, sortOption, products]);

  const displayedProducts: Product[] = useMemo(() => {
    const last = currentPage * productsPerPage;
    const first = last - productsPerPage;
    return filteredProducts.slice(first, last);
  }, [currentPage, filteredProducts, productsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => { setCurrentPage(1); }, [deferredSearchQuery, selectedCategories, selectedSubCategories, priceRange, sortOption]);
  useEffect(() => { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); }, [currentPage]);

  // --- HANDLERS ---
  const handleAddToCart = useCallback((e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, id: getProductId(product), quantity: 1 } as any);
    showNotification("Ajouté au panier ✓", "success");
  }, [addToCart, showNotification]);

  const handleCategoryToggle = useCallback((cat: string) => {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  }, []);

  const handleSubCategoryToggle = useCallback((sub: string) => {
    setSelectedSubCategories((prev) => prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSortOption("featured");
    showNotification("Filtres réinitialisés", "success");
  }, [minPrice, maxPrice, showNotification]);

  const getPageNumbers = useCallback((): (number | string)[] => {
    const max = isMobile ? 3 : 5;
    if (totalPages <= max) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [1];
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  }, [currentPage, totalPages, isMobile]);

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedCategories.length +
    selectedSubCategories.length +
    (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0);

  // --- FILTER SIDEBAR CONTENT ---
  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-black uppercase italic text-base mb-4">Catégories</h3>
        <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleCategoryToggle(cat.name)}>
              <Checkbox id={`cat-${cat.id}`} checked={selectedCategories.includes(cat.name)} />
              <label htmlFor={`cat-${cat.id}`} className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer flex-1">
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {availableSubCategories.length > 0 && (
        <div>
          <h3 className="font-black uppercase italic text-base mb-4">Sous-catégories</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
            {availableSubCategories.map((sub) => (
              <div key={sub} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleSubCategoryToggle(sub)}>
                <Checkbox id={`sub-${sub}`} checked={selectedSubCategories.includes(sub)} />
                <label htmlFor={`sub-${sub}`} className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer flex-1">
                  {sub}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator />

      <div>
        <h3 className="font-black uppercase italic text-base mb-4">Prix</h3>
        <Slider value={priceRange} min={minPrice} max={maxPrice} step={10} onValueChange={(v) => setPriceRange([v[0], v[1]])} className="mb-4" />
        <div className="flex justify-between text-sm font-bold text-gray-500">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );

  // --- RENDER ---
  return (
    <>
      <title>Tous nos produits - IRONZ</title>
      <meta name="description" content="Découvrez notre gamme complète de produits pour l'aménagement et l'équipement de vos espaces sportifs et de loisirs." />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50"
          >
            <div
              className={cn(
                "flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border",
                toast.type === "success"
                  ? "bg-black text-white border-yellow-500"
                  : "bg-red-600 text-white border-red-700"
              )}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-yellow-400" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20 lg:py-28 bg-white dark:bg-gray-950 min-h-screen">
        {/* Header */}
        <header className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white mb-3 sm:mb-4 flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>Tous nos <span className="text-yellow-500">Produits</span></span>
            {!isLoading && (
              <span className="hidden sm:inline-flex items-center justify-center ml-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl rounded-lg font-bold border border-gray-200 dark:border-gray-700">
                ({products.length})
              </span>
            )}
          </h1>

          {/* Auto-sync indicator */}
          <div className="flex items-center justify-center gap-2 mt-1 mb-2 min-h-[24px]">
            {isRefreshing ? (
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <RefreshCw className="w-3 h-3 animate-spin" /> Synchronisation...
              </span>
            ) : lastSyncedAt ? (
              <span className="text-xs text-gray-300 dark:text-gray-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Mis à jour à {lastSyncedAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                <span className="text-[10px] text-gray-400">(auto: 30s)</span>
              </span>
            ) : null}
          </div>

          {searchQuery && !isLoading && (
            <div className="mt-3 mb-1 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500">Résultats pour :</span>
              <Badge className="bg-yellow-500 text-black font-bold text-sm px-3 py-1 rounded-full gap-2 flex items-center">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery("")} aria-label="Effacer la recherche" className="ml-1 hover:text-white transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                ({filteredProducts.length} résultat{filteredProducts.length !== 1 ? "s" : ""})
              </span>
            </div>
          )}

          <div className="h-1.5 w-16 bg-yellow-500 mx-auto rounded-full mt-3" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Découvrez notre gamme complète d&apos;équipements professionnels.
          </p>
        </header>

        {/* Sticky Filter Bar */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8 sticky top-16 sm:top-20 z-30 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">

            {/* Mobile Filter */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden gap-2 h-10 sm:h-12 rounded-xl font-bold px-3 sm:px-4">
                  <Filter className="h-4 w-4" /> Filtres
                  {activeFiltersCount > 0 && (
                    <span className="bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-[350px] p-0 overflow-y-auto">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-xl">Filtres</SheetTitle>
                </SheetHeader>
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                  <FilterContent />
                </div>
                <SheetFooter className="p-6 border-t">
                  <Button onClick={() => setIsFilterOpen(false)} className="w-full bg-yellow-500 text-black font-bold h-12 rounded-xl text-base">
                    Voir {filteredProducts.length} résultats
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Search */}
            <div className="relative flex-1 min-w-[180px] sm:min-w-[240px]">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 sm:pl-12 h-10 sm:h-12 rounded-xl text-sm sm:text-base border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 font-medium"
              />
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="Effacer">
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              )}
            </div>

            {/* Manual refresh */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => loadProducts(true)}
              disabled={isRefreshing || isLoading}
              className="h-10 sm:h-12 w-10 sm:w-12 rounded-xl border-gray-200 dark:border-gray-800"
              aria-label="Rafraîchir maintenant"
              title="Rafraîchir les produits"
            >
              <RefreshCw className={cn("h-4 w-4", (isRefreshing || isLoading) && "animate-spin")} />
            </Button>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 sm:h-12 rounded-xl gap-2 font-bold border-gray-200 dark:border-gray-800 text-sm sm:text-base px-3 sm:px-4">
                  <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden min-[400px]:inline">Trier</span>
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 sm:w-56 rounded-xl p-2">
                {SORT_OPTIONS.map((opt) => (
                  <DropdownMenuItem key={opt.value} onClick={() => setSortOption(opt.value)} className="rounded-lg cursor-pointer font-medium text-sm sm:text-base">
                    <span className="flex-1">{opt.label}</span>
                    {sortOption === opt.value && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View mode */}
            <div className="hidden sm:flex border border-gray-200 dark:border-gray-800 rounded-xl p-1 bg-white dark:bg-gray-900">
              <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded-lg transition-all", viewMode === "grid" ? "bg-yellow-500 text-black shadow-md" : "text-gray-400 hover:text-black")} aria-label="Vue grille">
                <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button onClick={() => setViewMode("list")} className={cn("p-2 rounded-lg transition-all", viewMode === "list" ? "bg-yellow-500 text-black shadow-md" : "text-gray-400 hover:text-black")} aria-label="Vue liste">
                <List className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Active filter badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-800">
              {searchQuery && (
                <Badge variant="outline" className="h-7 sm:h-8 gap-1.5 pl-2.5 pr-1.5 rounded-full border-yellow-500/30 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs">
                  🔍 {searchQuery} <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {selectedCategories.map((cat) => (
                <Badge key={cat} variant="outline" className="h-7 sm:h-8 gap-1.5 pl-2.5 pr-1.5 rounded-full text-xs">
                  {cat} <X className="h-3 w-3 cursor-pointer" onClick={() => handleCategoryToggle(cat)} />
                </Badge>
              ))}
              {selectedSubCategories.map((sub) => (
                <Badge key={sub} variant="outline" className="h-7 sm:h-8 gap-1.5 pl-2.5 pr-1.5 rounded-full border-dashed text-xs">
                  {sub} <X className="h-3 w-3 cursor-pointer" onClick={() => handleSubCategoryToggle(sub)} />
                </Badge>
              ))}
              {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                <Badge variant="outline" className="h-7 sm:h-8 gap-1.5 pl-2.5 pr-1.5 rounded-full text-xs">
                  Prix: {formatPrice(priceRange[0])}–{formatPrice(priceRange[1])} <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([minPrice, maxPrice])} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7 sm:h-8 text-red-500 font-bold hover:bg-red-50 rounded-full px-2 sm:px-3">
                Tout Effacer
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
            <div className="sticky top-36 pr-4">
              <FilterContent />
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Récupération de tous les produits...</p>
                <p className="text-xs text-gray-400 mt-1">Cela peut prendre quelques secondes</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
                {searchQuery && (
                  <p className="text-gray-400 text-sm mb-2">
                    Aucun résultat pour &ldquo;<span className="font-bold text-yellow-600">{searchQuery}</span>&rdquo;
                  </p>
                )}
                <p className="text-gray-500 text-sm sm:text-base mb-6 px-4">Essayez de modifier vos filtres ou votre recherche.</p>
                <Button onClick={clearFilters} className="bg-black text-white rounded-xl px-6">
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-500 font-medium px-1 flex items-center gap-2 flex-wrap">
                  {searchQuery && <span className="text-yellow-600 font-bold">&ldquo;{searchQuery}&rdquo; :</span>}
                  Affichage de{" "}
                  <span className="text-black dark:text-white font-bold">{displayedProducts.length}</span>
                  {" "}sur{" "}
                  <span className="text-black dark:text-white font-bold">{filteredProducts.length}</span>
                  {" "}résultats
                </div>

                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    className={cn(
                      "grid gap-3 sm:gap-4 md:gap-6",
                      viewMode === "grid"
                        ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                    )}
                  >
                    <AnimatePresence>
                      {displayedProducts.map((product) => (
                        <ProductCard
                          key={getProductId(product)}
                          product={product}
                          viewMode={viewMode}
                          handleAddToCart={handleAddToCart}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 sm:mt-12 flex justify-center">
                    <nav className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
                        aria-label="Page précédente"
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" />
                      </button>
                      {getPageNumbers().map((p, i) => (
                        <button
                          key={i}
                          onClick={() => typeof p === "number" && setCurrentPage(p)}
                          className={cn(
                            "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition",
                            currentPage === p
                              ? "bg-yellow-500 text-black shadow-lg"
                              : "hover:bg-gray-100 text-gray-600"
                          )}
                          aria-label={typeof p === "number" ? `Page ${p}` : "Plus de pages"}
                          aria-current={currentPage === p ? "page" : undefined}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
                        aria-label="Page suivante"
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 -rotate-90" />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
    </>
  );
}