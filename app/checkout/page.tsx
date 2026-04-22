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
        // FIXED: Added explicit type to item
        content_ids: cart.map((item: CartItem) => String(item.id || item._id)),
        content_type: "product",
        // FIXED: Added explicit type to item
        contents: cart.map((item: CartItem) => ({
          id: String(item.id || item._id),
          quantity: item.quantity,
          item_price: item.price
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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    const requiredFields: (keyof FormData)[] = ["firstName", "lastName", "phone", "address", "city"];

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
    const generatedOrderNumber = `CMD-${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`;

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
                // FIXED: Added explicit type to i
                content_ids: cart.map((i: CartItem) => String(i.id || i._id)),
                content_type: "product",
                order_id: generatedOrderNumber
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

  // ... (Rest of the component remains the same)
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">Commande Confirmée !</h1>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl mb-8 border border-yellow-200">
              <p className="text-sm font-bold text-yellow-800 dark:text-yellow-400 mb-1">NUMÉRO DE COMMANDE</p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">{orderNumber}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Nous vous contacterons par téléphone sous 24h pour confirmer la livraison.</p>
            <div className="flex flex-col gap-4">
              <Link href="/"><Button className="w-full h-14 bg-black text-white rounded-2xl font-black">RETOUR ACCUEIL</Button></Link>
              <Link href="/produit"><Button variant="outline" className="w-full h-14 rounded-2xl font-black">CONTINUER SHOPPING</Button></Link>
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
          <Link href="/panier" className="text-gray-400 hover:text-yellow-500 font-black uppercase italic text-sm flex items-center gap-2">
            <ArrowLeft size={18} /> Retour au panier
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm">
              {currentStep === 1 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black uppercase italic mb-6">Informations de livraison</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase">Prénom *</Label>
                      <Input name="firstName" value={formData.firstName} onChange={handleInputChange} className={cn("h-12 rounded-xl", errors.firstName && "border-red-500")} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase">Nom *</Label>
                      <Input name="lastName" value={formData.lastName} onChange={handleInputChange} className={cn("h-12 rounded-xl", errors.lastName && "border-red-500")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase">Téléphone *</Label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} className={cn("h-12 rounded-xl", errors.phone && "border-red-500")} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase">Email (Optionnel)</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} className={cn("h-12 rounded-xl", errors.email && "border-red-500")} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase">Adresse *</Label>
                    <Input name="address" value={formData.address} onChange={handleInputChange} className={cn("h-12 rounded-xl", errors.address && "border-red-500")} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase">Ville *</Label>
                      <Input name="city" value={formData.city} onChange={handleInputChange} className={cn("h-12 rounded-xl", errors.city && "border-red-500")} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase">Code Postal</Label>
                      <Input name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="h-12 rounded-xl" />
                    </div>
                  </div>
                  <Button onClick={handleNextStep} className="w-full h-14 bg-yellow-500 text-black font-black uppercase italic rounded-2xl mt-4">
                    ÉTAPE SUIVANTE <ChevronsRight className="ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black uppercase italic">Mode de Paiement</h2>
                  <div className="p-6 border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CreditCard className="text-yellow-600" />
                      <div>
                        <p className="font-black uppercase text-gray-900 dark:text-white">Paiement à la livraison</p>
                        <p className="text-xs text-gray-500">Payez en espèces lors de la réception</p>
                      </div>
                    </div>
                    <CheckCircle className="text-green-500" />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1 h-14 rounded-xl font-black">RETOUR</Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-[2] h-14 bg-yellow-500 text-black font-black uppercase rounded-xl">
                      {isSubmitting ? "CHARGEMENT..." : "CONFIRMER MA COMMANDE"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-black text-white rounded-[2.5rem] p-8 sticky top-28 border-t-8 border-yellow-500 shadow-2xl">
              <h2 className="text-2xl font-black uppercase italic mb-8">Votre Panier.</h2>
              <div className="space-y-6 max-h-[350px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                {cart.map((item: CartItem) => (
                  <div key={`${item.id}-${item.selectedColor || 'default'}`} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-zinc-800 rounded-xl flex-shrink-0 overflow-hidden">
                      <CloudImg src={item.image} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black uppercase truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.quantity} x {formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between text-gray-400 uppercase text-xs font-black">
                  <span>Sous-total</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-400 uppercase text-xs font-black">
                  <span>Livraison</span><span>{shipping === 0 ? "GRATUIT" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-white font-black text-2xl pt-4 border-t border-white/10">
                  <span>TOTAL</span><span className="text-yellow-500 italic">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}