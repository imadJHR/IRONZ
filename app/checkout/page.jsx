"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
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
  CurrencyIcon as Cash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, color } =
    useCart();
  console.log("CONTENU DU PANIER SUR LA PAGE CHECKOUT:", cart);
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
      minimumFractionDigits: 2,
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
      "email",
      "phone",
      "address",
      "city",
      "postalCode",
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
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
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
      _replyto: formData.email,
      _subject: "Nouvelle commande ",
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
      orderNumber: randomOrderNumber,
      // MODIFICATION 1 : Ajout de la taille et de la couleur dans les données envoyées
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        // On ajoute la taille et la couleur seulement si elles existent
        ...(item.selectedTaille && { taille: item.selectedTaille }),
        ...(item.selectedColor && { couleur: item.selectedColor }),
        total: item.price * item.quantity,
      })),
      subtotal: formatPrice(subtotal),
      shipping: shipping === 0 ? "Gratuit" : formatPrice(shipping),
      total: formatPrice(total),
    };

    try {
      const response = await fetch("https://formspree.io/f/meozjkdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderComplete(true);
        clearCart();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-heading font-bold mb-4">
              Commande confirmée!
            </h1>
           {/* <p className="text-gray-600 dark:text-gray-400 mb-2">
              Notre service commerciale va vous contacter dans 24 heures par
              téléphone. On cas de non réponse de notre part veuillez nous
              contacter par whatsapp au 0669510042.
            </p> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900">
                  Retour à l'accueil
                </Button>
              </Link>
              <Link href="/product">
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600"
                >
                  Continuer mes achats
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex items-center mb-8">
          <Link
            href="/panier"
            className="inline-flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Retour au panier
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">
          Finaliser ma commande
        </h1>

        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1
                  ? "bg-yellow-500 dark:bg-yellow-400 text-white dark:text-gray-900"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-sm font-medium">1</span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                currentStep >= 2
                  ? "bg-yellow-500 dark:bg-yellow-400"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            ></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2
                  ? "bg-yellow-500 dark:bg-yellow-400 text-white dark:text-gray-900"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-sm font-medium">2</span>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Informations
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Paiement
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-heading font-semibold mb-6">
                  Informations de livraison
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="firstName" className="mb-1">
                      Prénom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="mb-1">
                      Nom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="email" className="mb-1">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-1">
                      Téléphone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Utilisé pour les notifications
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <Label htmlFor="address" className="mb-1">
                    Adresse <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label htmlFor="postalCode" className="mb-1">
                      Code postal <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={errors.postalCode ? "border-red-500" : ""}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="city" className="mb-1">
                      Ville <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <Label htmlFor="notes" className="mb-1">
                    Notes de commande (optionnel)
                  </Label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Instructions spéciales pour la livraison..."
                  ></textarea>
                </div>
                <div className="flex items-center mb-6">
                  <Checkbox
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, saveInfo: checked })
                    }
                  />
                  <Label htmlFor="saveInfo" className="ml-2 cursor-pointer">
                    Sauvegarder ces informations pour la prochaine fois
                  </Label>
                </div>
                <Button
                  onClick={handleNextStep}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 py-6"
                >
                  Continuer vers le paiement
                  <ChevronsRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-heading font-semibold mb-6">
                  Mode de paiement
                </h2>
                <div className="mb-6">
                  <div className="border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="flex items-center">
                      <Cash className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Paiement à la livraison
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Payez en espèces à la réception de votre commande
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-4">
                    Méthode de livraison
                  </h3>
                  <RadioGroup
                    value={formData.shippingMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, shippingMethod: value })
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between space-x-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="standard"
                          id="shipping-standard"
                        />
                        <Label
                          htmlFor="shipping-standard"
                          className="font-medium cursor-pointer"
                        >
                          Livraison standard
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {subtotal >= 500
                            ? "Gratuit"
                            : formatPrice(shippingCosts.standard)}
                        </span>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                  <h3 className="font-medium text-lg mb-4">
                    Récapitulatif de la commande
                  </h3>
                  <div className="space-y-4 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Sous-total
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Frais de livraison
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {shipping === 0 ? "Gratuit" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="font-bold text-xl text-gray-900 dark:text-white">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formData.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formData.phone}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Home className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formData.address}, {formData.postalCode}{" "}
                          {formData.city}, {formData.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Retour
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        Confirmer la commande
                        <ChevronsRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-heading font-semibold mb-6">
                Récapitulatif de commande
              </h2>
              <div className="max-h-[300px] overflow-y-auto mb-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor}-${item.selectedTaille}`} // Clé plus unique
                    className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                      <Image
                        src={
                          item.image || "/placeholder.svg?height=64&width=64"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <div className="absolute top-0 right-0 bg-yellow-500 dark:bg-yellow-400 text-white dark:text-gray-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      {/* MODIFICATION 2 : Affichage de la taille et de la couleur dans le récapitulatif */}
                      {(item.selectedTaille || item.selectedColor) && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.selectedTaille &&
                            `Taille: ${item.selectedTaille}`}
                          {item.selectedTaille && item.selectedColor && " / "}
                          {item.selectedColor &&
                            `Couleur: ${item.selectedColor}`}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Sous-total
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Frais de livraison
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {shipping === 0 ? "Gratuit" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
