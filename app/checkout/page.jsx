"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Truck,
  ShieldCheck,
  Check,
  AlertCircle,
  Home,
  Phone,
  Mail,
  User,
  ChevronsRight,
  ArrowLeft,
  CreditCard,
  Package,
  MapPin,
  Globe,
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
import { Checkbox } from "../../components/ui/checkbox";
import { cn } from "../../lib/utils";

const PLACEHOLDER = "/placeholder.svg";

/**
 * ✅ Cloudinary-safe image component
 */
function CloudImg({ src, alt, fill = false, className = "" }) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);

  useEffect(() => {
    setImgSrc(src || PLACEHOLDER);
  }, [src]);

  if (fill) {
    return (
      <img
        src={imgSrc}
        alt={alt || ""}
        onError={() => setImgSrc(PLACEHOLDER)}
        className={cn("absolute inset-0 h-full w-full object-contain", className)}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || ""}
      onError={() => setImgSrc(PLACEHOLDER)}
      className={className}
    />
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && cart.length === 0 && !orderComplete) {
      router.push("/product");
    }
  }, [cart, router, orderComplete, mounted]);

  // ✅ AJOUT : Scroll to top quand la commande est complétée
  useEffect(() => {
    if (orderComplete) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [orderComplete]);

  const shippingCosts = {
    standard: 30,
    express: 50,
    free: 0,
  };

  const subtotal = cartTotal;
  const shipping = subtotal >= 500 ? 0 : shippingCosts[formData.shippingMethod];
  const total = subtotal + shipping;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "address",
      "city",
      "country",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Ce champ est requis";
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Adresse email invalide";
    }

    if (formData.phone && !/^[0-9+\s()-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    if (
      formData.country === "Maroc" &&
      formData.postalCode &&
      !/^[0-9]{5}$/.test(formData.postalCode)
    ) {
      newErrors.postalCode = "Code postal invalide (5 chiffres)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const randomOrderNumber = `CMD-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    setOrderNumber(randomOrderNumber);

    const orderData = {
      orderNumber: randomOrderNumber,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      paymentMethod: formData.paymentMethod,
      shippingMethod: formData.shippingMethod,
      notes: formData.notes,
      items: cart.map((item) => ({
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setOrderComplete(true);
        // Le scroll vers le haut est géré par le useEffect [orderComplete]
        clearCart();
      } else {
        throw new Error(result.message || "Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Une erreur est survenue lors de la commande. Veuillez réessayer ou nous contacter sur WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white leading-none">
                  Commande <span className="text-yellow-500">Confirmée!</span>
                </h1>
                <div className="h-2 w-24 bg-yellow-500 mt-4 rounded-full" />
              </div>
            </div>

            {/* Success Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 md:p-12 shadow-xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100 dark:bg-green-900/30 mb-8 border-4 border-white dark:border-zinc-800 shadow-lg">
                  <Check className="h-10 w-10 md:h-12 md:w-12 text-green-600 dark:text-green-400" />
                </div>
                
                <div className="bg-gradient-to-r from-green-500/5 to-yellow-500/5 dark:from-green-500/5 dark:to-yellow-500/5 border border-green-200 dark:border-green-800 rounded-2xl p-6 mb-8">
                  <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">
                   N° Commande: {orderNumber}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                    Notre service commercial va vous contacter dans les <span className="font-bold text-yellow-600 dark:text-yellow-400">24 heures</span> par téléphone pour confirmer votre commande.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                    En cas de non réponse de notre part, veuillez nous contacter directement par WhatsApp au <span className="font-bold text-green-600 dark:text-green-400">0669510042</span>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <span className="font-black uppercase text-sm text-gray-900 dark:text-white">Contact sous 24h</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Notre équipe vous appelle rapidement</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Truck className="w-5 h-5 text-yellow-500" />
                      <span className="font-black uppercase text-sm text-gray-900 dark:text-white">Livraison rapide</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Expédition après confirmation</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/" className="flex-1">
                    <Button className="w-full bg-black text-white hover:bg-yellow-500 hover:text-black py-4 rounded-2xl font-black uppercase italic tracking-widest transition-all shadow-xl">
                      Retour à l'accueil
                    </Button>
                  </Link>
                  <Link href="/produit" className="flex-1">
                    <Button variant="outline" className="w-full border-2 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white hover:border-yellow-500 hover:text-yellow-500 py-4 rounded-2xl font-black uppercase italic tracking-widest transition-all">
                      Continuer mes achats
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

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
            className="text-gray-400 hover:text-yellow-500 font-black uppercase italic text-sm transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Retour au panier
          </Link>
        </div>

        {/* Information importante */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/5 dark:to-orange-500/5 border-2 border-yellow-500/30 dark:border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex shrink-0">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="sm:hidden">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-black uppercase italic text-gray-900 dark:text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-yellow-500" />
                    Information importante
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">
                        Paiement à la livraison :
                      </span>{" "}
                      Payez en espèces ou par carte bancaire à la réception de votre commande.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">
                        Contact rapide :
                      </span>{" "}
                      Notre équipe vous contactera sous 24h pour confirmer votre commande.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center w-full max-w-2xl">
              <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-yellow-500' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${currentStep >= 1 ? 'bg-yellow-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  <User className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="mt-2 text-xs font-black uppercase">Informations</span>
              </div>
              <div className={`flex-1 h-1 mx-2 md:mx-4 ${currentStep >= 2 ? 'bg-yellow-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
              <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-yellow-500' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${currentStep >= 2 ? 'bg-yellow-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="mt-2 text-xs font-black uppercase">Paiement</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {currentStep === 1 && (
              <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-8">
                  Informations de <span className="text-yellow-500">livraison</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest text-gray-500">
                      Prénom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 rounded-xl border-gray-200 dark:border-zinc-700 text-base",
                        errors.firstName && "border-red-500"
                      )}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-black uppercase tracking-widest text-gray-500">
                      Nom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 rounded-xl border-gray-200 dark:border-zinc-700 text-base",
                        errors.lastName && "border-red-500"
                      )}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-gray-500">
                      Email <span className="text-gray-400 font-normal lowercase not-italic tracking-normal">(optionnel)</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 rounded-xl border-gray-200 dark:border-zinc-700 text-base",
                        errors.email && "border-red-500"
                      )}
                      placeholder="email@exemple.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-gray-500">
                      Téléphone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 rounded-xl border-gray-200 dark:border-zinc-700 text-base",
                        errors.phone && "border-red-500"
                      )}
                      placeholder="06 00 00 00 00"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Pour les notifications de livraison</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-gray-500">
                    Adresse complète <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={cn(
                      "h-12 rounded-xl border-gray-200 dark:border-zinc-700 text-base",
                      errors.address && "border-red-500"
                    )}
                    placeholder="N° Rue, Quartier"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-xs font-black uppercase tracking-widest text-gray-500">
                      Code postal <span className="text-gray-400 font-normal lowercase not-italic tracking-normal">(optionnel)</span>
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 rounded-xl border-gray-200 dark:border-zinc-700 text-base",
                        errors.postalCode && "border-red-500"
                      )}
                      placeholder="20000"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="city" className="text-xs font-black uppercase tracking-widest text-gray-500">
                      Ville <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 rounded-xl border-gray-200 dark:border-zinc-700 text-base",
                        errors.city && "border-red-500"
                      )}
                      placeholder="Votre ville"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <Label htmlFor="notes" className="text-xs font-black uppercase tracking-widest text-gray-500">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Notes de commande (optionnel)
                  </Label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-2xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                    placeholder="Instructions spéciales pour la livraison, code d'accès, interphone..."
                  />
                </div>
                <Button
                  onClick={handleNextStep}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-black dark:text-gray-900 py-4 md:py-6 rounded-2xl font-black uppercase italic tracking-widest text-base md:text-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-yellow-500/10"
                >
                  Continuer vers le paiement
                  <ChevronsRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-8">
                  Mode de <span className="text-yellow-500">paiement</span>
                </h2>
                
                <div className="mb-8">
                  <div className="border-2 border-yellow-500/30 dark:border-yellow-500/20 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-gray-900 dark:text-white mb-1">
                          Paiement à la livraison
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Payez en espèces ou par carte bancaire directement au livreur
                        </p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-xl font-black uppercase italic mb-6">
                    Méthode de <span className="text-yellow-500">livraison</span>
                  </h3>
                  <RadioGroup
                    value={formData.shippingMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, shippingMethod: value })
                    }
                    className="space-y-4"
                  >
                    <div className={`flex items-center justify-between p-5 border-2 rounded-2xl transition-all ${formData.shippingMethod === 'standard' ? 'border-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10' : 'border-gray-100 dark:border-zinc-800 hover:border-yellow-500/50'}`}>
                      <div className="flex items-center space-x-4">
                        <RadioGroupItem value="standard" id="shipping-standard" className="border-gray-300 data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500" />
                        <Label htmlFor="shipping-standard" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                          Livraison standard
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <span className="font-black text-gray-900 dark:text-white">
                          {subtotal >= 500 ? (
                            <span className="text-green-600 dark:text-green-400">GRATUIT</span>
                          ) : (
                            formatPrice(shippingCosts.standard)
                          )}
                        </span>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Client Information Summary */}
                <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl p-6 mb-8">
                  <h3 className="font-black uppercase italic text-lg mb-6">
                    Récapitulatif des <span className="text-yellow-500">informations</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-900 rounded-xl">
                      <User className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <div className="text-xs font-black uppercase text-gray-400 mb-1">Client</div>
                        <div className="font-medium">{formData.firstName} {formData.lastName}</div>
                      </div>
                    </div>
                    {formData.email && (
                      <div className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-900 rounded-xl">
                        <Mail className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <div className="text-xs font-black uppercase text-gray-400 mb-1">Email</div>
                          <div className="font-medium">{formData.email}</div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-900 rounded-xl">
                      <Smartphone className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <div className="text-xs font-black uppercase text-gray-400 mb-1">Téléphone</div>
                        <div className="font-medium">{formData.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-zinc-900 rounded-xl">
                      <MapPin className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <div className="text-xs font-black uppercase text-gray-400 mb-1">Adresse</div>
                        <div className="font-medium">
                          {formData.address}, {formData.city} {formData.postalCode}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1 border-2 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:border-yellow-500 hover:text-yellow-500 py-4 rounded-2xl font-black uppercase italic tracking-widest transition-all"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-black dark:text-gray-900 py-4 md:py-6 rounded-2xl font-black uppercase italic tracking-widest text-base md:text-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-yellow-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-3"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        Confirmer la commande
                        <ChevronsRight className="ml-3 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black text-white rounded-[2.5rem] p-6 md:p-8 sticky top-28 shadow-2xl border-t-4 md:border-t-8 border-yellow-500">
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-8 text-white leading-none">
                Récapitulatif <br /> <span className="text-yellow-500">Total.</span>
              </h2>
              
              <div className="max-h-[400px] overflow-y-auto mb-8 pr-2">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor}-${item.selectedTaille}`}
                    className="flex items-center py-4 border-b border-white/10 last:border-0 group"
                  >
                    <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 group-hover:border-yellow-500 transition-colors">
                      <CloudImg
                        fill
                        src={item.image || PLACEHOLDER}
                        alt={item.name}
                        className="object-cover p-2"
                      />
                      <div className="absolute top-1 right-1 bg-yellow-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <h4 className="text-sm font-black uppercase italic text-white truncate">
                        {item.name}
                      </h4>
                      {(item.selectedTaille || item.selectedColor) && (
                        <p className="text-xs text-gray-400">
                          {item.selectedTaille && `Taille: ${item.selectedTaille}`}
                          {item.selectedTaille && item.selectedColor && " / "}
                          {item.selectedColor && `Couleur: ${item.selectedColor}`}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-black italic text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Sous-total
                  </span>
                  <span className="font-black italic text-lg">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Expédition
                  </span>
                  <span className="font-black italic text-lg">
                    {shipping === 0 ? (
                      <span className="text-green-400">GRATUIT</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <span className="text-yellow-500 font-black uppercase italic text-xl tracking-tighter">
                    Net à payer
                  </span>
                  <span className="text-3xl md:text-4xl font-black italic tracking-tighter text-white">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400">
                  <ShieldCheck size={14} className="text-yellow-500" /> Paiement sécurisé
                </div>
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400">
                  <Truck size={14} className="text-yellow-500" /> Livraison Express
                </div>
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400">
                  <Package size={14} className="text-yellow-500" /> Retours sous 14 jours
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h4 className="font-black uppercase italic text-gray-900 dark:text-white">
                Paiement 100% sécurisé
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Vos informations de paiement sont cryptées et protégées.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h4 className="font-black uppercase italic text-gray-900 dark:text-white">
                Livraison rapide
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Livraison en 24-48h dans les grandes villes marocaines.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h4 className="font-black uppercase italic text-gray-900 dark:text-white">
                Facture incluse
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Facture détaillée incluse dans chaque colis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}