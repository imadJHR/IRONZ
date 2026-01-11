"use client";

import { useState, useEffect } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Clock,
  ArrowRight,
  CheckCircle,
  Loader2,
  AlertCircle,
  MessageSquare,
  MapPin,
  Sparkles,
  Users,
  Target,
  Award,
  ShieldCheck,
  Star,
  Zap,
  ChevronRight,
  ArrowLeft,
  Dumbbell,
  Trophy,
  Heart,
  Building,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Alert, AlertDescription } from "../../components/ui/alert";
import Link from "next/link";

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    // Structured data for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact IRONZ PRO",
      description: "Contactez l'équipe IRONZ PRO pour toutes vos questions sur le fitness premium",
      url: "https://www.ironz.ma/contact",
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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

    try {
      // Format the message for WhatsApp
      const whatsappMessage = formatWhatsAppMessage(formState);

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // WhatsApp phone number
      const phoneNumber = "212674114446";

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      // Set form as submitted
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

  // Format message for WhatsApp
  const formatWhatsAppMessage = (data) => {
    return `*Nouveau message de contact IRONZ PRO*
*Nom:* ${data.name}
*Email:* ${data.email}
*Téléphone:* ${data.phone || "Non fourni"}
*Sujet:* ${data.subject}
*Raison du contact:* ${data.contactReason}
*Message:*
${data.message}`;
  };

  // Direct WhatsApp contact
  const contactViaWhatsApp = () => {
    const phoneNumber = "212674114446";
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Téléphone",
      description: "Notre équipe est disponible du lundi au vendredi de 9h à 18h.",
      value: "+212 674-114446",
      action: () => (window.location.href = "tel:+212674114446"),
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "Envoyez-nous un email, nous vous répondrons dans les plus brefs délais.",
      value: "muscleironz2019@gmail.com",
      action: () => (window.location.href = "mailto:muscleironz2019@gmail.com"),
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: <IoLogoWhatsapp className="h-6 w-6" />,
      title: "WhatsApp",
      description: "Contactez-nous directement sur WhatsApp pour une réponse rapide.",
      value: "WhatsApp Direct",
      action: contactViaWhatsApp,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const faqSections = [
    {
      value: "general",
      label: "Général",
      items: [
        {
          question: "Comment puis-je contacter le service client ?",
          answer: "Vous pouvez nous contacter par téléphone au +212 674-114446, par email à muscleironz2019@gmail.com, ou via WhatsApp en cliquant sur le bouton 'Discuter sur WhatsApp'."
        },
        {
          question: "Quels sont vos horaires d'ouverture ?",
          answer: "Notre showroom est ouvert du lundi au vendredi de 9h à 18h et le samedi de 10h à 16h. Notre service client est disponible par téléphone et email du lundi au vendredi de 9h à 18h."
        },
        {
          question: "Proposez-vous des services d'installation ?",
          answer: "Oui, nous proposons des services d'installation professionnelle pour tous nos équipements. Les frais d'installation varient selon le produit et votre localisation."
        },
      ]
    },
    {
      value: "orders",
      label: "Commandes",
      items: [
        {
          question: "Comment puis-je suivre ma commande ?",
          answer: "Vous recevrez un email de confirmation avec un numéro de suivi dès que votre commande sera expédiée. Vous pouvez également suivre votre commande en vous connectant à votre compte."
        },
        {
          question: "Puis-je modifier ou annuler ma commande ?",
          answer: "Vous pouvez modifier ou annuler votre commande dans les 24 heures suivant votre achat. Passé ce délai, contactez notre service client pour vérifier les possibilités."
        },
        {
          question: "Quels modes de paiement acceptez-vous ?",
          answer: "Nous acceptons les cartes de crédit (Visa, Mastercard), virements bancaires, et paiement à la livraison pour certaines zones."
        },
      ]
    },
    {
      value: "shipping",
      label: "Livraison",
      items: [
        {
          question: "Quels sont les délais de livraison ?",
          answer: "Les délais varient selon votre localisation. En général, comptez 2-5 jours pour les grandes villes et 5-10 jours pour les zones rurales."
        },
        {
          question: "La livraison est-elle gratuite ?",
          answer: "La livraison est gratuite pour toutes les commandes supérieures à 5000 DHS. Des frais de livraison s'appliquent en dessous de ce montant."
        },
        {
          question: "Livrez-vous dans tout le Maroc ?",
          answer: "Oui, nous livrons dans toutes les villes du Maroc via nos partenaires logistiques professionnels."
        },
      ]
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-yellow-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>
          </nav>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <MessageSquare className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Contact & Support
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-[0.9]">
              Contactez-<span className="text-yellow-500">nous</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions 
              et vous accompagner dans vos projets fitness. Performance, expertise et service premium.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                variants={scaleIn}
                onClick={contactViaWhatsApp}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all shadow-lg"
              >
                <IoLogoWhatsapp className="w-6 h-6" />
                WhatsApp Direct
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                variants={scaleIn}
                onClick={() => window.location.href = "tel:+212674114446"}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all shadow-lg"
              >
                <Phone className="w-6 h-6" />
                Nous appeler
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={info.action}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {info.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {info.description}
                  </p>
                  <div className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                    {info.value}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map and Form Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Map Section */}
              <div className="relative h-[400px] lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                      <MapPin className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                        Notre Showroom
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-black uppercase italic mb-4 text-white">
                      IRONZ <span className="text-yellow-500">PRO</span>
                    </h3>
                    <p className="text-gray-300 mb-6">
                      SAHARA MALL 1 ÈRE ÉTAGE C169 & C120, Agadir
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Lun-Ven: 9h-18h | Sam: 10h-16h | Dim: Fermé</span>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex justify-center gap-4">
                    <a
                      href="https://www.facebook.com/muscle.ironz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                    >
                      <FaFacebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/ironz_official/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.youtube.com/@muscleironz8921"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                    >
                      <FaYoutube className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
                    <MessageSquare className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                      Formulaire de contact
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                    Envoyez-nous un <span className="text-yellow-500">message</span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                </div>

                {formStatus.isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5 rounded-2xl p-8 text-center border border-green-500/20"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black uppercase italic mb-3 text-green-600 dark:text-green-400">
                      Message envoyé !
                    </h3>
                    <p className="text-green-700 dark:text-green-300 mb-6">
                      Merci de nous avoir contacté. Notre équipe vous répondra sur WhatsApp très rapidement.
                    </p>
                    <button
                      onClick={() =>
                        setFormStatus((prev) => ({
                          ...prev,
                          isSubmitted: false,
                        }))
                      }
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black uppercase italic tracking-widest px-8 py-4 rounded-2xl transition-all"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formStatus.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 dark:from-red-500/5 dark:to-pink-500/5 rounded-2xl p-4 border border-red-500/20">
                          <div className="flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <p className="text-red-700 dark:text-red-300">{formStatus.error}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-bold uppercase tracking-widest mb-2 block">
                          Nom complet *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Votre nom"
                          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl py-6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-bold uppercase tracking-widest mb-2 block">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          placeholder="votre@email.com"
                          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl py-6"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-bold uppercase tracking-widest mb-2 block">
                          Téléphone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleInputChange}
                          placeholder="Votre numéro de téléphone"
                          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl py-6"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-sm font-bold uppercase tracking-widest mb-2 block">
                          Sujet *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="Sujet de votre message"
                          className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl py-6"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-bold uppercase tracking-widest mb-2 block">
                        Raison du contact
                      </Label>
                      <RadioGroup
                        value={formState.contactReason}
                        onValueChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            contactReason: value,
                          }))
                        }
                        className="flex flex-wrap gap-4"
                      >
                        {[
                          { value: "question", label: "Question" },
                          { value: "devis", label: "Demande de devis" },
                          { value: "support", label: "Support technique" },
                          { value: "partnership", label: "Partenariat" },
                          { value: "other", label: "Autre" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                              className="border-gray-300 data-[state=checked]:bg-yellow-500"
                            />
                            <Label htmlFor={option.value} className="cursor-pointer text-sm font-medium">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-bold uppercase tracking-widest mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Décrivez votre projet ou votre question..."
                        className="min-h-[150px] bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl py-4"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
                    >
                      {formStatus.isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <IoLogoWhatsapp className="w-6 h-6" />
                          Envoyer sur WhatsApp
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Questions fréquentes
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              FAQ - <span className="text-yellow-500">IRONZ</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur nos produits, services et support
            </p>
          </motion.div>

          <Tabs defaultValue="general" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl">
              {faqSections.map((section) => (
                <TabsTrigger
                  key={section.value}
                  value={section.value}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white font-bold uppercase tracking-wider rounded-xl py-3"
                >
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {faqSections.map((section) => (
              <TabsContent key={section.value} value={section.value} className="space-y-4">
                {section.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-yellow-500/30 transition-colors"
                  >
                    <h3 className="text-xl font-black uppercase italic mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                        <span className="text-sm font-black text-white">{index + 1}</span>
                      </div>
                      {item.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-6 text-black">
              Prêt à transformer votre passion en performance ?
            </h2>
            <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
              Contactez notre équipe d'experts pour des conseils personnalisés et des solutions sur mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={contactViaWhatsApp}
                className="px-8 py-6 bg-black hover:bg-gray-900 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <IoLogoWhatsapp className="w-6 h-6" />
                Discuter sur WhatsApp
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.location.href = "tel:+212674114446"}
                className="px-8 py-6 bg-white hover:bg-gray-100 text-black font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Nous appeler
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}