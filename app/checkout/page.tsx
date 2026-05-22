"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Truck,
  ShieldCheck,
  Check,
  AlertCircle,
  Phone,
  Mail,
  User,
  ChevronsRight,
  ArrowLeft,
  CreditCard,
  Package,
  MapPin,
  FileText,
  MessageSquare,
  Clock,
  Smartphone,
  CheckCircle,
  Lock,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { useCart } from "../../context/cart-context";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { cn } from "../../lib/utils";
import { trackFBEvent } from "../../components/FacebookPixel";

// --- TYPES & INTERFACES ---

interface CartItem {
  id: string | number;
  _id?: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedTaille?: string;
  selectedColor?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  shippingMethod: "standard" | "express";
  saveInfo: boolean;
  notes: string;
}

interface FormErrors {
  [key: string]: string | null | undefined;
}

interface CloudImgProps {
  src?: string;
  alt?: string;
  fill?: boolean;
  className?: string;
}

const PLACEHOLDER = "/placeholder.svg";

// --- COMPOSANT IMAGE OPTIMISÉ ---

function CloudImg({ src, alt, fill = false, className = "" }: CloudImgProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || PLACEHOLDER);

  useEffect(() => {
    setImgSrc(src || PLACEHOLDER);
  }, [src]);

  const handleError = () => setImgSrc(PLACEHOLDER);

  if (fill) {
    return (
      <img
        src={imgSrc}
        alt={alt || ""}
        onError={handleError}
        className={cn("absolute inset-0 h-full w-full object-contain", className)}
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

// --- PAGE DE CHECKOUT ---

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();

  const [mounted, setMounted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Maroc",
    paymentMethod: "cashOnDelivery",
    shippingMethod: "standard",
    saveInfo: false,
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Initialisation et Tracking Initial
  useEffect(() => {
    setMounted(true);
    if (cart.length > 0) {
      trackFBEvent("InitiateCheckout", {
        content_ids: cart.map((item: CartItem) => String(item.id || item._id)),
        content_type: "product",
        contents: cart.map((item: CartItem) => ({
          id: String(item.id || item._id),
          quantity: item.quantity,
          item_price: item.price,
        })),
        value: cartTotal,
        currency: "MAD",
      });
    }
  }, [cart, cartTotal]);

  // Redirection si panier vide
  useEffect(() => {
    if (mounted && cart.length === 0 && !orderComplete) {
      router.push("/produit");
    }
  }, [cart, router, orderComplete, mounted]);

  // Scroll to top on success
  useEffect(() => {
    if (orderComplete) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [orderComplete]);

  // Calculs financiers
  const shippingCosts: Record<string, number> = {
    standard: 30,
    express: 50,
  };

  const subtotal = cartTotal;
  const shipping = subtotal >= 500 ? 0 : shippingCosts[formData.shippingMethod];
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "phone",
      "address",
      "city",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || String(formData[field]).trim() === "") {
        newErrors[field] = "Ce champ est requis";
      }
    });

    if (formData.email && formData.email.trim() !== "") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email invalide";
      }
    }

    if (formData.phone && !/^[0-9+\s()-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Téléphone invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const generatedOrderNumber = `CMD-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;

    const orderData = {
      orderNumber: generatedOrderNumber,
      ...formData,
      items: cart.map((item: CartItem) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedTaille: item.selectedTaille || "",
        selectedColor: item.selectedColor || "",
      })),
      subtotal: formatPrice(subtotal),
      total: formatPrice(total),
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderNumber(generatedOrderNumber);

        // Pixel Purchase
        if (typeof window !== "undefined" && (window as any).fbq) {
          trackFBEvent("Purchase", {
            value: total,
            currency: "MAD",
            content_ids: cart.map((i: CartItem) => String(i.id || i._id)),
            content_type: "product",
            order_id: generatedOrderNumber,
          });
        }

        setOrderComplete(true);
        clearCart();
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      alert("Erreur lors de la commande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
              Commande Confirmée !
            </h1>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl mb-8 border border-yellow-200">
              <p className="text-sm font-bold text-yellow-800 dark:text-yellow-400 mb-1">
                NUMÉRO DE COMMANDE
              </p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                {orderNumber}
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Nous vous contacterons par téléphone sous 24h pour confirmer la
              livraison.
            </p>

            <div className="flex flex-col gap-4">
              <Link href="/">
                <Button className="w-full h-14 bg-black text-white rounded-2xl font-black">
                  RETOUR ACCUEIL
                </Button>
              </Link>

              <Link href="/produit">
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl font-black"
                >
                  CONTINUER SHOPPING
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white leading-none">
              Finaliser ma <span className="text-yellow-500">Commande</span>
            </h1>
            <div className="h-2 w-24 bg-yellow-500 mt-4 rounded-full" />
          </div>

          <Link
            href="/panier"
            className="text-gray-400 hover:text-yellow-500 font-black uppercase italic text-sm flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Retour au panier
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm">
              {currentStep === 1 ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-black" />
                    </div>
                    <h2 className="text-2xl font-black uppercase italic">
                      Informations de livraison
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase flex items-center gap-1">
                        <User className="w-3 h-3" /> Prénom *
                      </Label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={cn(
                          "h-12 rounded-xl",
                          errors.firstName && "border-red-500"
                        )}
                        placeholder="Entrez votre prénom"
                      />
                      {errors.firstName && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />{" "}
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase flex items-center gap-1">
                        <User className="w-3 h-3" /> Nom *
                      </Label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={cn(
                          "h-12 rounded-xl",
                          errors.lastName && "border-red-500"
                        )}
                        placeholder="Entrez votre nom"
                      />
                      {errors.lastName && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Téléphone *
                    </Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 rounded-xl",
                        errors.phone && "border-red-500"
                      )}
                      placeholder="06 XX XX XX XX"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email (Optionnel)
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 rounded-xl",
                        errors.email && "border-red-500"
                      )}
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Adresse *
                    </Label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 rounded-xl",
                        errors.address && "border-red-500"
                      )}
                      placeholder="Rue, N°, Quartier"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase">
                        Ville *
                      </Label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={cn(
                          "h-12 rounded-xl",
                          errors.city && "border-red-500"
                        )}
                        placeholder="Casablanca"
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.city}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase">
                        Code Postal
                      </Label>
                      <Input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="h-12 rounded-xl"
                        placeholder="20000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Notes de commande
                      (Optionnel)
                    </Label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full h-24 rounded-xl border border-gray-300 dark:border-gray-700 p-3 text-sm resize-none focus:ring-2 focus:ring-yellow-500 dark:bg-zinc-800"
                      placeholder="Informations supplémentaires (étage, point de repère, etc.)"
                    />
                  </div>

                  <Button
                    onClick={handleNextStep}
                    className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-black uppercase italic rounded-2xl mt-4 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    ÉTAPE SUIVANTE <ChevronsRight className="ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-black" />
                    </div>
                    <h2 className="text-2xl font-black uppercase italic">
                      Mode de Paiement
                    </h2>
                  </div>

                  <div className="p-6 border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Package className="text-black w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-black uppercase text-gray-900 dark:text-white text-base md:text-lg">
                            Paiement à la livraison
                          </p>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Payez le reste de votre commande en espèces lors de
                            la réception.
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" />
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-blue-900 dark:text-blue-300">
                          Informations importantes
                        </p>

                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                          Pour garantir la préparation et la disponibilité de
                          vos consommables, compléments et sauces, un paiement à
                          l&apos;avance est requis pour ces articles. Le reste
                          de vos achats peut être réglé à la livraison.
                        </p>

                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-2">
                          Ce paiement à l&apos;avance ne se fait pas en ligne
                          par carte bancaire. Nous vous contacterons par
                          téléphone pour confirmer votre commande et vous
                          expliquer les modalités avant la livraison.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 h-14 rounded-xl font-black uppercase border-2 hover:bg-gray-50 dark:hover:bg-zinc-800"
                    >
                      <ArrowLeft className="mr-2" /> RETOUR
                    </Button>

                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-[2] h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-black uppercase rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 animate-spin" /> TRAITEMENT...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2" /> CONFIRMER MA
                          COMMANDE
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-black text-white rounded-[2.5rem] p-6 md:p-8 sticky top-28 border-t-8 border-yellow-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <Package className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl md:text-2xl font-black uppercase italic">
                  Votre Panier
                </h2>
              </div>

              <div className="space-y-4 md:space-y-6 max-h-[300px] md:max-h-[350px] overflow-y-auto mb-6 md:mb-8 pr-2 custom-scrollbar">
                {cart.map((item: CartItem) => (
                  <div
                    key={`${item.id}-${item.selectedColor || "default"}`}
                    className="flex gap-3 md:gap-4 items-center p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-zinc-800 rounded-xl flex-shrink-0 overflow-hidden border border-zinc-700">
                      <CloudImg
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-black uppercase truncate">
                        {item.name}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400">
                          {item.quantity} x {formatPrice(item.price)}
                        </p>
                      </div>

                      {(item.selectedTaille || item.selectedColor) && (
                        <div className="flex gap-2 mt-1">
                          {item.selectedTaille && (
                            <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded">
                              {item.selectedTaille}
                            </span>
                          )}

                          {item.selectedColor && (
                            <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded">
                              {item.selectedColor}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-sm md:text-base font-black text-yellow-500">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-white/10">
                <div className="flex justify-between text-gray-400 uppercase text-xs font-black">
                  <span className="flex items-center gap-1">
                    <Package className="w-3 h-3" /> Sous-total
                  </span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-400 uppercase text-xs font-black">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Livraison
                  </span>
                  <span className={shipping === 0 ? "text-green-500" : ""}>
                    {shipping === 0 ? "GRATUIT ✓" : formatPrice(shipping)}
                  </span>
                </div>

                {subtotal < 500 && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3">
                    <p className="text-[10px] md:text-xs text-yellow-500 font-bold">
                      Ajoutez {formatPrice(500 - subtotal)} pour la livraison
                      gratuite !
                    </p>

                    <div className="w-full bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-yellow-500 h-full transition-all duration-300 rounded-full"
                        style={{
                          width: `${Math.min((subtotal / 500) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-white font-black text-xl md:text-2xl pt-3 md:pt-4 border-t border-white/10">
                  <span>TOTAL</span>
                  <span className="text-yellow-500 italic">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <p className="text-xs text-gray-400 uppercase font-black flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Paiement
                  sécurisé
                </p>
                <p className="text-xs text-gray-400">
                  Vos données sont protégées et cryptées
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(234, 179, 8, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(234, 179, 8, 0.7);
        }
      `}</style>
    </div>
  );
}