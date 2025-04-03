"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactReason: "question",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      // Reset form
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        contactReason: "question",
      });
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 dark:bg-gray-900 pt-32 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions et vous accompagner dans vos projets.
            </p>
          </motion.div>
        </div>

        {/* Contact Info Cards */}
        <div className="container mx-auto px-4 mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Téléphone</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Notre équipe est disponible du lundi au vendredi de 9h à 18h.
              </p>
              <a
                href="tel:+33123456789"
                className="text-yellow-600 dark:text-yellow-400 font-medium hover:underline flex items-center"
              >
                +212 669510042
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Envoyez-nous un email, nous vous répondrons dans les plus brefs
                délais.
              </p>
              <a
                href="mailto:contact@ironzpro.com"
                className="text-yellow-600 dark:text-yellow-400 font-medium hover:underline flex items-center"
              >
              muscleironz2019@gmail.com
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Adresse</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Venez nous rencontrer dans notre showroom.
              </p>
              <address className="not-italic text-yellow-600 dark:text-yellow-400 font-medium hover:underline flex items-start">
                <span>SAHARA MALL 1 ÈRE ÉTAGE C169 & C120</span>
                <ArrowRight className="ml-1 h-4 w-4 mt-1 flex-shrink-0" />
              </address>
            </motion.div>
          </motion.div>
        </div>

        {/* Map and Form Section */}
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Map Section */}
              <div className="relative h-[300px] lg:h-auto">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Google+Map"
                  alt="Carte"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="font-medium text-lg mb-1">IRONZ PRO</h3>
                    <p className="text-sm text-white/90">
                      123 Rue du Fitness, 75001 Paris
                    </p>
                    <div className="flex items-center mt-2 text-sm text-white/80">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Lun-Ven: 9h-18h | Sam: 10h-16h | Dim: Fermé</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-6 lg:p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Envoyez-nous un message
                </h2>

                {formStatus.isSubmitted ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-green-700 dark:text-green-400 mb-4">
                      Merci de nous avoir contacté. Nous vous répondrons dans
                      les plus brefs délais.
                    </p>
                    <Button
                      onClick={() =>
                        setFormStatus((prev) => ({
                          ...prev,
                          isSubmitted: false,
                        }))
                      }
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formStatus.error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{formStatus.error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleInputChange}
                          placeholder="Votre numéro de téléphone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Sujet *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="Sujet de votre message"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="contactReason">Raison du contact</Label>
                      <RadioGroup
                        id="contactReason"
                        name="contactReason"
                        value={formState.contactReason}
                        onValueChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            contactReason: value,
                          }))
                        }
                        className="flex flex-wrap gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="question" id="question" />
                          <Label htmlFor="question" className="cursor-pointer">
                            Question
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="devis" id="devis" />
                          <Label htmlFor="devis" className="cursor-pointer">
                            Demande de devis
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="support" id="support" />
                          <Label htmlFor="support" className="cursor-pointer">
                            Support technique
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="autre" id="autre" />
                          <Label htmlFor="autre" className="cursor-pointer">
                            Autre
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre message"
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                      disabled={formStatus.isSubmitting}
                    >
                      {formStatus.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Questions fréquentes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Consultez nos réponses aux questions les plus fréquemment posées.
              Si vous ne trouvez pas votre réponse, n'hésitez pas à nous
              contacter.
            </p>
          </div>

          <Tabs defaultValue="general" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="orders">Commandes</TabsTrigger>
              <TabsTrigger value="shipping">Livraison</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2">
                  Comment puis-je contacter le service client ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vous pouvez nous contacter par téléphone au +33 1 23 45 67 89,
                  par email à muscleironz2019@gmail.com, ou en utilisant le
                  formulaire de contact sur cette page.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2">
                  Quels sont vos horaires d'ouverture ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Notre showroom est ouvert du lundi au vendredi de 9h à 18h et
                  le samedi de 10h à 16h. Notre service client est disponible
                  par téléphone et email du lundi au vendredi de 9h à 18h.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2">
                  Proposez-vous des services d'installation ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Oui, nous proposons des services d'installation pour la
                  plupart de nos équipements. Les frais d'installation varient
                  selon le produit et votre localisation. Contactez-nous pour
                  obtenir un devis personnalisé.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2">
                  Comment puis-je suivre ma commande ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vous recevrez un email de confirmation avec un numéro de suivi
                  dès que votre commande sera expédiée. Vous pouvez également
                  suivre votre commande en vous connectant à votre compte sur
                  notre site.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2">
                  Puis-je modifier ou annuler ma commande ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vous pouvez modifier ou annuler votre commande dans les 24
                  heures suivant votre achat. Passé ce délai, veuillez contacter
                  notre service client pour vérifier si des modifications sont
                  encore possibles.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2">
                  Quels modes de paiement acceptez-vous ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nous acceptons les cartes de crédit (Visa, Mastercard,
                  American Express), PayPal, et les virements bancaires. Pour
                  les commandes importantes, nous proposons également des
                  solutions de financement.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2">
                  Quels sont les délais de livraison ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Les délais de livraison varient selon votre localisation et
                  les produits commandés. En général, comptez 2-5 jours ouvrés
                  pour la France métropolitaine, 5-10 jours pour l'Europe, et
                  10-15 jours pour le reste du monde.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2">
                  La livraison est-elle gratuite ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  La livraison est gratuite pour toutes les commandes
                  supérieures à 100€ en France métropolitaine. Pour les
                  commandes inférieures à ce montant, des frais de livraison
                  s'appliquent en fonction du poids et de la destination.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2">
                  Quelle est votre politique de retour ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vous disposez de 30 jours à compter de la réception de votre
                  commande pour retourner un article. Les produits doivent être
                  dans leur état d'origine, non utilisés et dans leur emballage
                  d'origine. Les frais de retour sont à la charge du client,
                  sauf en cas de produit défectueux.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 mt-16">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Besoin d'une assistance personnalisée ?
            </h2>
            <p className="text-black/80 text-lg mb-6 max-w-2xl mx-auto">
              Notre équipe d'experts est à votre disposition pour vous
              accompagner dans tous vos projets fitness et bien-être.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-black hover:bg-gray-800 text-white">
                <Phone className="mr-2 h-4 w-4" />
                Nous appeler
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-black border border-black/20"
              >
                <Mail className="mr-2 h-4 w-4" />
                Envoyer un email
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
