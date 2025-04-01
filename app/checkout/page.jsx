"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, CreditCard, Truck, ShieldCheck, Check, Plus, Minus, Trash2, Info } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    paymentMethod: "card",
    shippingMethod: "standard",
    saveInfo: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      router.push("/produits")
    }
  }, [cart, router, orderComplete])

  // Shipping costs
  const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    free: 0,
  }

  // Calculate totals
  const subtotal = cartTotal
  const shipping = shippingCosts[formData.shippingMethod]
  const tax = subtotal * 0.2 // 20% VAT
  const total = subtotal + shipping + tax

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "postalCode", "country"]
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Ce champ est requis"
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Adresse email invalide"
    }

    // Phone validation
    if (formData.phone && !/^[0-9+\s()-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Numéro de téléphone invalide"
    }

    // Postal code validation for France
    if (formData.country === "France" && formData.postalCode && !/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Code postal invalide (5 chiffres)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Generate random order number
      const randomOrderNumber =
        "ORD-" +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")
      setOrderNumber(randomOrderNumber)
      setOrderComplete(true)
      clearCart()
      setIsSubmitting(false)
    }, 1500)
  }

  if (orderComplete) {
    return (
      <>
        <Navbar />
        <main className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Commande confirmée !</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Merci pour votre commande. Votre numéro de commande est{" "}
                <span className="font-medium text-gray-900 dark:text-white">{orderNumber}</span>. Vous recevrez un email
                de confirmation avec les détails de votre commande.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-8">
                <h2 className="font-medium text-gray-900 dark:text-white mb-2">Récapitulatif</h2>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Total</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatPrice(total)}</span>
                </div>
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
                  <Link href="/mon-compte/commandes">Voir mes commandes</Link>
                </Button>
                <Button asChild>
                  <Link href="/produits">Continuer mes achats</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finaliser votre commande</h1>
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
                        <Label htmlFor="firstName" className={cn(errors.firstName && "text-red-500")}>
                          Prénom *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={cn(errors.firstName && "border-red-500")}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>

                      <div>
                        <Label htmlFor="lastName" className={cn(errors.lastName && "text-red-500")}>
                          Nom *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={cn(errors.lastName && "border-red-500")}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>

                      <div>
                        <Label htmlFor="email" className={cn(errors.email && "text-red-500")}>
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
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <Label htmlFor="phone" className={cn(errors.phone && "text-red-500")}>
                          Téléphone *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={cn(errors.phone && "border-red-500")}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor="address" className={cn(errors.address && "text-red-500")}>
                          Adresse *
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={cn(errors.address && "border-red-500")}
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                      </div>

                      <div>
                        <Label htmlFor="city" className={cn(errors.city && "text-red-500")}>
                          Ville *
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={cn(errors.city && "border-red-500")}
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <Label htmlFor="postalCode" className={cn(errors.postalCode && "text-red-500")}>
                          Code postal *
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className={cn(errors.postalCode && "border-red-500")}
                        />
                        {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                      </div>

                      <div>
                        <Label htmlFor="country" className={cn(errors.country && "text-red-500")}>
                          Pays *
                        </Label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            errors.country && "border-red-500",
                          )}
                        >
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Allemagne">Allemagne</option>
                          <option value="Espagne">Espagne</option>
                          <option value="Italie">Italie</option>
                        </select>
                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Méthode de livraison</h2>

                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={(value) => setFormData({ ...formData, shippingMethod: value })}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between space-x-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="shipping-standard" />
                          <Label htmlFor="shipping-standard" className="font-medium cursor-pointer">
                            Livraison standard
                          </Label>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">2-5 jours ouvrés</span>
                          <span className="font-medium">{formatPrice(shippingCosts.standard)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between space-x-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="shipping-express" />
                          <Label htmlFor="shipping-express" className="font-medium cursor-pointer">
                            Livraison express
                          </Label>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">1-2 jours ouvrés</span>
                          <span className="font-medium">{formatPrice(shippingCosts.express)}</span>
                        </div>
                      </div>

                      {subtotal >= 100 && (
                        <div className="flex items-center justify-between space-x-2 p-3 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="free" id="shipping-free" />
                            <Label htmlFor="shipping-free" className="font-medium cursor-pointer">
                              Livraison gratuite
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">3-7 jours ouvrés</span>
                            <span className="font-medium text-green-600 dark:text-green-400">Gratuit</span>
                          </div>
                        </div>
                      )}
                    </RadioGroup>

                    {subtotal < 100 && (
                      <Alert className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Ajoutez {formatPrice(100 - subtotal)} d'articles supplémentaires pour bénéficier de la
                          livraison gratuite !
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Méthode de paiement</h2>

                    <Tabs
                      defaultValue="card"
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    >
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="card" className="flex items-center justify-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Carte
                        </TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        <TabsTrigger value="bank">Virement</TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Numéro de carte</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Date d'expiration</Label>
                            <Input id="expiryDate" placeholder="MM/AA" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName">Nom sur la carte</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                      </TabsContent>

                      <TabsContent value="paypal" className="text-center py-6">
                        <div className="mb-4">
                          <Image
                            src="/placeholder.svg?height=60&width=120&text=PayPal"
                            alt="PayPal"
                            width={120}
                            height={60}
                            className="mx-auto"
                          />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Vous serez redirigé vers PayPal pour effectuer votre paiement en toute sécurité.
                        </p>
                        <Button variant="outline" type="button">
                          Continuer avec PayPal
                        </Button>
                      </TabsContent>

                      <TabsContent value="bank" className="space-y-4 py-2">
                        <Alert className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            Votre commande sera traitée une fois le paiement reçu. Les détails du virement bancaire vous
                            seront envoyés par email.
                          </AlertDescription>
                        </Alert>

                        <div>
                          <Label htmlFor="bankName">Nom de votre banque</Label>
                          <Input id="bankName" />
                        </div>

                        <div>
                          <Label htmlFor="accountName">Nom du titulaire du compte</Label>
                          <Input id="accountName" />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex items-center mt-6">
                      <input
                        type="checkbox"
                        id="saveInfo"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <Label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        Sauvegarder ces informations pour la prochaine fois
                      </Label>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      type="submit"
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Traitement en cours..." : "Confirmer la commande"}
                    </Button>

                    <div className="flex items-center justify-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      <span>Paiement sécurisé</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Récapitulatif de commande</h2>

                  <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-start">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg?height=64&width=64"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                          <div className="flex items-center mt-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="mx-1 text-xs w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                    <span className="text-gray-600 dark:text-gray-400">Sous-total</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Livraison</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formData.shippingMethod === "free" ? "Gratuit" : formatPrice(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">TVA (20%)</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatPrice(tax)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">Total</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span>Livraison estimée: 2-5 jours ouvrés</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <ShieldCheck className="h-4 w-4 text-gray-500" />
                    <span>Garantie de remboursement 30 jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

