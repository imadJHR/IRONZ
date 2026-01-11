"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  Info,
  CreditCard,
  Clock,
} from "lucide-react";
import { useCart } from "../../context/cart-context";
import { cn } from "../../lib/utils";

const PLACEHOLDER = "/placeholder.svg";

// --- COLOR MAP FIXÉ ---
const COLOR_MAP = {
  Rouge: "#EF4444",
  Bleu: "#3B82F6",
  Vert: "#22C55E",
  Noir: "#000000",
  Blanc: "#FFFFFF",
  Jaune: "#EAB308",
  Orange: "#F97316",
  Violet: "#8B5CF6",
  Rose: "#EC4899",
  Gris: "#6B7280",
  Multicolore: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
};

/* -----------------------------
   ✅ COMPOSANT IMAGE SÉCURISÉ
------------------------------ */
function CloudImg({ src, alt, fill = false, className = "", priority = false }) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);
  useEffect(() => { setImgSrc(src || PLACEHOLDER); }, [src]);

  if (fill) {
    return (
      <img
        src={imgSrc}
        alt={alt || ""}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setImgSrc(PLACEHOLDER)}
        className={cn("absolute inset-0 h-full w-full object-contain", className)}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || ""}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setImgSrc(PLACEHOLDER)}
      className={className}
    />
  );
}

export default function CartPageClient() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState(null);
  const [couponSuccess, setCouponSuccess] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartTotal = cart.reduce(
    (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  useEffect(() => {
    if (!appliedCoupon) { setDiscount(0); return; }
    if (appliedCoupon === "promo10") setDiscount(cartTotal * 0.1);
    else if (appliedCoupon === "welcome") setDiscount(50);
  }, [cartTotal, appliedCoupon]);

  const shippingCost = cartTotal > 500 ? 0 : 30;
  const totalWithShipping = cartTotal + shippingCost - discount;

  const handleQuantityChange = (id, color, taille, newQty) => {
    if (newQty >= 1 && newQty <= 99) {
      updateQuantity(id, color, newQty, taille || null);
    }
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);
    const code = couponCode.trim().toLowerCase();
    if (!code) return;

    if (code === "ironz10") {
      setCouponSuccess("-10% appliqués avec succès !");
      setDiscount(cartTotal * 0.1);
      setAppliedCoupon("promo10");
    } else {
      setCouponError("Code promo invalide ou expiré");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(Number(price) || 0);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-40 text-center px-4">
        <ShoppingCart className="mx-auto h-24 w-24 text-gray-100 dark:text-zinc-800 mb-8" />
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
          Ton Panier est <span className="text-yellow-500">Vide</span>
        </h1>
        <p className="text-gray-500 mb-10 font-bold uppercase italic text-xs tracking-widest">
          N'attends pas demain pour tes objectifs.
        </p>
        <Link
          href="/produit"
          className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-yellow-500 hover:text-black transition-all shadow-xl"
        >
          Découvrir le catalogue <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-16">
      <div className="container mx-auto px-4">
        
        {/* Header Style B */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white leading-none">
              Mon <span className="text-yellow-500">Panier</span>
            </h1>
            <div className="h-2 w-24 bg-yellow-500 mt-4 rounded-full" />
          </div>
          <Link
            href="/produit"
            className="text-gray-400 hover:text-yellow-500 font-black uppercase italic text-sm transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Continuer mes achats
          </Link>
        </div>

        {/* Information importante - Bannière en haut */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/5 dark:to-orange-500/5 border-2 border-yellow-500/30 dark:border-yellow-500/20 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex shrink-0">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="sm:hidden">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-black uppercase italic text-gray-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-yellow-500" />
                    Information importante
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">
                        Certains produits nécessitent un paiement d'avance.
                      </span>{" "}
                      Le montant exact vous sera communiqué lors de la confirmation de commande.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">
                        Traitement rapide :
                      </span>{" "}
                      Votre commande est traitée sous 24h après confirmation du paiement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Articles */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
              <div className="p-6 md:p-8 border-b border-gray-50 dark:border-zinc-800 flex justify-between items-center">
                <h2 className="text-xl font-black uppercase italic tracking-tighter">
                  Récapitulatif ({totalItems})
                </h2>
                <button
                  onClick={() => window.confirm("Vider le panier ?") && clearCart()}
                  className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  <Trash2 size={14} /> Vider
                </button>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                {cart.map((item, idx) => {
                  const id = item._id || item.id;
                  const itemKey = `${id}-${item.selectedColor || 'none'}-${item.selectedTaille || 'none'}-${idx}`;
                  
                  return (
                    <div
                      key={itemKey}
                      className="p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row items-center gap-6 md:gap-8 group transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/30"
                    >
                      {/* Image du produit */}
                      <div className="relative h-28 w-28 md:h-32 md:w-32 shrink-0 bg-gray-50 dark:bg-gray-800 rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800 transition-transform group-hover:scale-105">
                        <CloudImg fill src={item.image} alt={item.name} className="p-4" />
                      </div>

                      <div className="flex-1 text-center sm:text-left min-w-0">
                        <span className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-1 block">
                          {item.category}
                        </span>
                        <Link
                          href={`/produit/${item.slug || id}`}
                          className="text-xl md:text-2xl font-black uppercase italic text-gray-900 dark:text-white hover:text-yellow-500 transition-colors line-clamp-1 leading-none mb-3"
                        >
                          {item.name}
                        </Link>
                        
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-4 md:mb-6">
                          {item.selectedTaille && (
                            <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500">
                              Taille: {item.selectedTaille}
                            </div>
                          )}
                          {item.selectedColor && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500">
                              Couleur:{" "}
                              <div
                                className="w-3 h-3 rounded-full border border-white"
                                style={{ background: COLOR_MAP[item.selectedColor] || item.selectedColor }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                          <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-1 border border-gray-100 dark:border-zinc-700">
                            <button
                              onClick={() => handleQuantityChange(id, item.selectedColor, item.selectedTaille, item.quantity - 1)}
                              className="p-2 hover:text-yellow-600 disabled:opacity-20"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-10 md:w-12 text-center font-black italic text-base md:text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(id, item.selectedColor, item.selectedTaille, item.quantity + 1)}
                              className="p-2 hover:text-yellow-600"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(id, item.selectedColor, item.selectedTaille)}
                            className="text-gray-300 hover:text-red-500 transition-colors px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="text-center sm:text-right sm:ml-auto w-full sm:w-auto mt-4 sm:mt-0">
                        <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white italic tracking-tighter">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          P.U: {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Information complémentaire - Mobile seulement */}
            <div className="lg:hidden bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/5 dark:to-purple-500/5 border-2 border-blue-500/20 dark:border-blue-500/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold uppercase text-sm text-gray-900 dark:text-white">
                  Paiement sécurisé
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                Pour les produits nécessitant un paiement d'avance, nous vous contacterons directement pour organiser le paiement sécurisé. Aucun paiement ne sera effectué sans votre confirmation préalable.
              </p>
            </div>
          </div>

          {/* Checkout Block Style B */}
          <div className="lg:col-span-1">
            <div className="bg-black text-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 lg:p-10 sticky top-24 md:top-28 shadow-2xl border-t-4 md:border-t-8 border-yellow-500">
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-8 md:mb-10 text-white leading-none">
                Paiement <br /> <span className="text-yellow-500">Total.</span>
              </h2>

              <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
                <div className="flex justify-between items-end border-b border-white/10 pb-3 md:pb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    Sous-total
                  </span>
                  <span className="font-black italic text-base md:text-lg">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-end border-b border-white/10 pb-3 md:pb-4 text-yellow-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Réduction
                    </span>
                    <span className="font-black italic text-base md:text-lg">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-end border-b border-white/10 pb-3 md:pb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    Expédition
                  </span>
                  <span className="font-black italic text-base md:text-lg">
                    {shippingCost === 0 ? "GRATUIT" : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="pt-4 md:pt-6 flex justify-between items-end">
                  <span className="text-yellow-500 font-black uppercase italic text-xl md:text-2xl tracking-tighter">
                    Net à payer
                  </span>
                  <span className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter text-white">
                    {formatPrice(totalWithShipping)}
                  </span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleCouponSubmit} className="mb-8 md:mb-10 group">
                <div className="flex bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 focus-within:border-yellow-500 transition-all">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="CODE PROMO"
                    className="flex-1 bg-transparent px-4 md:px-5 py-3 md:py-4 text-xs font-black uppercase italic outline-none text-white placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black px-4 md:px-6 font-black text-[10px] uppercase hover:bg-yellow-500 transition-colors"
                  >
                    Appliquer
                  </button>
                </div>
                {couponError && (
                  <p className="text-red-500 text-[10px] font-black uppercase mt-2 px-2">
                    {couponError}
                  </p>
                )}
                {couponSuccess && (
                  <p className="text-green-500 text-[10px] font-black uppercase mt-2 px-2">
                    {couponSuccess}
                  </p>
                )}
              </form>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-yellow-500 text-black py-4 md:py-6 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-yellow-500/10 mb-6 md:mb-8 text-sm md:text-base"
              >
                Passer la commande
              </button>

              {/* Trust badges */}
              <div className="space-y-3 md:space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 md:gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <Truck size={14} className="text-yellow-500" /> Livraison Express
                </div>
                <div className="flex items-center gap-3 md:gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <ShieldCheck size={14} className="text-yellow-500" /> Paiement sécurisé
                </div>
                
              </div>

             
            </div>
          </div>
        </div>

        {/* Pied de page avec informations supplémentaires */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-black uppercase italic text-gray-900 dark:text-white">
                Livraison Express
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Livraison en 24-48h dans les grandes villes marocaines. Suivi en temps réel.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-black uppercase italic text-gray-900 dark:text-white">
                Paiement Sécurisé
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Transactions 100% sécurisées. Paiement à la livraison disponible pour la plupart des produits.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-black uppercase italic text-gray-900 dark:text-white">
                Satisfaction Garantie
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Retours acceptés sous 14 jours. Assistance client dédiée 7j/7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}