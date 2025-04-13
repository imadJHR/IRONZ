"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Trash2,
  Info,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } =
    useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Maroc",
    paymentMethod: "card",
    shippingMethod: "standard",
    saveInfo: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      router.push("/produits");
    }
  }, [cart, router, orderComplete]);

  // Shipping costs
  const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    free: 0,
  };

  // Calculate totals
  const subtotal = cartTotal;
  const shipping = shippingCosts[formData.shippingMethod];
  const tax = subtotal * 0.2; // 20% VAT
  const total = subtotal;

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "MAD",
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
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

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Adresse email invalide";
    }

    // Phone validation
    if (formData.phone && !/^[0-9+\s()-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    // Postal code validation for France
    if (
      formData.country === "France" &&
      formData.postalCode &&
      !/^[0-9]{5}$/.test(formData.postalCode)
    ) {
      newErrors.postalCode = "Code postal invalide (5 chiffres)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Generate random order number

    // Create order details message for WhatsApp
    const orderDetails = `
Nouvelle commande! 📨
Client: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Téléphone: ${formData.phone}
Adresse: ${formData.address}, ${formData.city}, ${formData.postalCode}, ${
      formData.country
    }

Articles:
${cart
  .map(
    (item) =>
      `- ${item.name} (x${item.quantity}) - ${formatPrice(
        item.price * item.quantity
      )}`
  )
  .join("\n")}

Livraison: ${formatPrice(shipping)}
Total: ${formatPrice(total)}
    `;

    const whatsappNumber = "+212674114446"; // Example: 212 for Morocco, followed by your number

    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      orderDetails
    )}`;

    // Open WhatsApp in a new tab
    window.open(whatsappLink, "_blank");

    // Complete the order
    setOrderNumber(randomOrderNumber);
    setOrderComplete(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (orderComplete) {
    return (
      <>
        <main className="bg-gray-50 dark:bg-gray-900 py-28">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Commande confirmée !
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Merci pour votre commande. Nous vous contacterons bientôt.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Date</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date().toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/produits">Continuer mes achats</Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <a
                    href={`https://wa.me/212123456789?text=Bonjour,%20je%20viens%20de%20passer%20la%20commande%20${orderNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Nous contacter sur WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </main>
      
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/produits">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Retour
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Finaliser votre commande
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit}>
                  {/* Shipping Information */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Informations de livraison
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className={cn(errors.firstName && "text-red-500")}
                        >
                          Prénom *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={cn(errors.firstName && "border-red-500")}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="lastName"
                          className={cn(errors.lastName && "text-red-500")}
                        >
                          Nom *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={cn(errors.lastName && "border-red-500")}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="email"
                          className={cn(errors.email && "text-red-500")}
                        >
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={cn(errors.email && "border-red-500")}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="phone"
                          className={cn(errors.phone && "text-red-500")}
                        >
                          Téléphone *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={cn(errors.phone && "border-red-500")}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <Label
                          htmlFor="address"
                          className={cn(errors.address && "text-red-500")}
                        >
                          Adresse *
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={cn(errors.address && "border-red-500")}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="city"
                          className={cn(errors.city && "text-red-500")}
                        >
                          Ville *
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={cn(errors.city && "border-red-500")}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="postalCode"
                          className={cn(errors.postalCode && "text-red-500")}
                        >
                          Code postal *
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className={cn(errors.postalCode && "border-red-500")}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.postalCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Méthode de livraison
                    </h2>

                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={(value) =>
                        setFormData({ ...formData, shippingMethod: value })
                      }
                      className="space-y-3"
                    >
                      {subtotal >= 100 && (
                        <div className="flex items-center justify-between space-x-2 p-3 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="free" id="shipping-free" />
                            <Label
                              htmlFor="shipping-free"
                              className="font-medium cursor-pointer"
                            >
                              Paiement à la livraison
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium text-green-600 dark:text-green-400">
                              Gratuit
                            </span>
                          </div>
                        </div>
                      )}
                    </RadioGroup>
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      type="submit"
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Traitement en cours..."
                        : "Confirmer la commande"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Récapitulatif de commande
                  </h2>

                  <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-start">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                          <Image
                            src={
                              item.image ||
                              "/placeholder.svg?height=64&width=64"
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                          <div className="flex items-center mt-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="mx-1 text-xs w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-1 mt-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Livraison
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Gratuit
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
