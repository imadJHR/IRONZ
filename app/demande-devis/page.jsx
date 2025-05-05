"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/logo.png";

export default function DemandeDevisPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef(null);

  const services = [
    {
      id: "amenagement-salle",
      name: "Aménagement de salle",
      image:
        "https://www.optiondinterieur.com/wp-content/uploads/2021/07/espace-musculation-fitness-dans-maison-decoration-naturelle-bois-mur-vegetal.jpg",
      description:
        "Conception et aménagement d'espaces fitness professionnels ou personnels",
    },
    {
      id: "personnalisation-accessoires",
      name: "Personnalisation d'accessoires",
      image: "/placeholder.svg?height=80&width=80&text=Personnalisation",
      description:
        "Création d'accessoires fitness sur mesure selon vos besoins spécifiques",
    },
    {
      id: "espace-enfance",
      name: "Espace enfance",
      image: "/placeholder.svg?height=80&width=80&text=Enfance",
      description:
        "Aménagement d'espaces fitness adaptés aux enfants et adolescents",
    },
    {
      id: "revetement-sol-mur",
      name: "Revêtement sol & mur",
      image: "/placeholder.svg?height=80&width=80&text=Revêtement",
      description:
        "Solutions de revêtement spécialisées pour les espaces sportifs",
    },
    {
      id: "conception-produits",
      name: "Conception de produits",
      image: "/placeholder.svg?height=80&width=80&text=Conception",
      description:
        "Développement de produits fitness innovants et personnalisés",
    },
    {
      id: "autre",
      name: "Autre service",
      image: "/placeholder.svg?height=80&width=80&text=Autre",
      description:
        "Besoin spécifique non listé ? Décrivez votre projet et nous vous répondrons",
    },
  ];

  const budgetOptions = [
    { value: "8000-10000", label: "8 000 MAD - 25 000 MAD" },
    { value: "10000-20000", label: "28 000 MAD - 35 000 MAD" },
    { value: "20000-50000", label: "35 000 MAD - 50 000 MAD" },
    { value: "plus-50000", label: "Plus de 70 000 MAD" },
    { value: "a-definir", label: "À définir" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleServiceSelect = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      service: serviceId,
    }));
    setErrors((prev) => ({ ...prev, service: "" }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis";
      if (!formData.lastName.trim()) newErrors.lastName = "Nom requis";
      if (!formData.email.trim()) {
        newErrors.email = "Email requis";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email invalide";
      }
      if (!formData.phone.trim()) newErrors.phone = "Téléphone requis";
    } else if (step === 2) {
      if (!formData.service)
        newErrors.service = "Veuillez sélectionner un service";
      if (!formData.message.trim()) newErrors.message = "Message requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    // Scroll to top of form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;
    if (!formData.terms) {
      setErrors((prev) => ({
        ...prev,
        terms: "Vous devez accepter les conditions",
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      // Format the message for WhatsApp
      const selectedService =
        services.find((s) => s.id === formData.service)?.name ||
        formData.service;
      const selectedBudget =
        budgetOptions.find((b) => b.value === formData.budget)?.label ||
        "Non spécifié";

      const whatsappMessage = `Nouvelle demande de devis:
      
  *Nom complet:* ${formData.firstName} ${formData.lastName}
  *Email:* ${formData.email}
  *Téléphone:* ${formData.phone}
  *Entreprise:* ${formData.company || "Non spécifié"}
  *Service demandé:* ${selectedService}
  *Budget estimé:* ${selectedBudget}
  
  *Message:*
  ${formData.message}
  
  Envoyé depuis le site web IRONZ PRO`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Your WhatsApp number (replace with your actual number, remove any spaces or special characters)
      const whatsappNumber = "212674114446"; // Example: +212 674-114446 becomes 212674114446

      // Open WhatsApp with the pre-filled message
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
        "_blank"
      );

      // Mark as submitted
      setIsSubmitted(true);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
        terms: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Une erreur est survenue. Veuillez réessayer.",
      }));
    } finally {
      setIsSubmitting(false);
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  const serviceCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={logo}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/30 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
              Demande de Devis
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Obtenez un devis personnalisé pour tous nos services
              professionnels. Notre équipe d'experts vous répondra sous 24h.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="#form-section"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                Demander un devis
              </a>
              <Link
                href="/services"
                className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-yellow-500 text-yellow-500 font-bold rounded-full hover:bg-yellow-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Découvrir nos services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section
        id="form-section"
        className="py-16 md:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Votre Projet, Notre{" "}
                <span className="text-yellow-500">Expertise</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              >
                Remplissez le formulaire ci-dessous pour nous faire part de
                votre projet. Notre équipe vous contactera rapidement avec une
                proposition adaptée à vos besoins.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left Column - Benefits */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg h-full">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Pourquoi nous choisir ?
                  </h3>

                  <ul className="space-y-6">
                    <motion.li
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-yellow-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Expertise professionnelle
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Notre équipe d'experts possède une expérience
                          approfondie dans tous nos domaines de services.
                        </p>
                      </div>
                    </motion.li>

                    <motion.li
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-yellow-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Réponse rapide
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Nous vous répondons sous 24h avec un devis détaillé et
                          personnalisé selon vos besoins.
                        </p>
                      </div>
                    </motion.li>

                    <motion.li
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-yellow-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Tarifs transparents
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Nos devis sont clairs et détaillés, sans frais cachés
                          ni mauvaises surprises.
                        </p>
                      </div>
                    </motion.li>

                    <motion.li
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-yellow-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Satisfaction garantie
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Nous nous engageons à vous offrir un service de
                          qualité qui répond parfaitement à vos attentes.
                        </p>
                      </div>
                    </motion.li>
                  </ul>

                  <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Besoin d'aide ?
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Notre équipe est disponible pour répondre à toutes vos
                      questions.
                    </p>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-yellow-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-gray-900 dark:text-white font-medium">
                        +212 674-114446
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-3"
                ref={formRef}
              >
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-10 h-10 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Demande envoyée avec succès !
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Votre demande a été envoyée sur WhatsApp. Notre équipe va
                      l'étudier et vous contactera dans les plus brefs délais.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
                      >
                        Nouvelle demande
                      </button>
                      <Link href="/">
                        <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-lg transition-colors">
                          Retour à l'accueil
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Votre demande de devis
                        </h3>
                        <div className="flex items-center">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              currentStep >= 1
                                ? "bg-yellow-500"
                                : "bg-gray-300 dark:bg-gray-600"
                            } mr-1`}
                          ></span>
                          <span
                            className={`w-3 h-3 rounded-full ${
                              currentStep >= 2
                                ? "bg-yellow-500"
                                : "bg-gray-300 dark:bg-gray-600"
                            } mr-1`}
                          ></span>
                          <span
                            className={`w-3 h-3 rounded-full ${
                              currentStep >= 3
                                ? "bg-yellow-500"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          ></span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 ease-in-out"
                          style={{ width: `${(currentStep / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={formVariants}
                          >
                            <h4 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                              Vos informations personnelles
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <label
                                  htmlFor="firstName"
                                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                  Prénom *
                                </label>
                                <input
                                  type="text"
                                  id="firstName"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.firstName
                                      ? "border-red-500 dark:border-red-500"
                                      : "border-gray-300 dark:border-gray-600"
                                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors`}
                                  placeholder="Votre prénom"
                                />
                                {errors.firstName && (
                                  <p className="mt-1 text-sm text-red-500">
                                    {errors.firstName}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label
                                  htmlFor="lastName"
                                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                  Nom *
                                </label>
                                <input
                                  type="text"
                                  id="lastName"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.lastName
                                      ? "border-red-500 dark:border-red-500"
                                      : "border-gray-300 dark:border-gray-600"
                                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors`}
                                  placeholder="Votre nom"
                                />
                                {errors.lastName && (
                                  <p className="mt-1 text-sm text-red-500">
                                    {errors.lastName}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                  Email *
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email
                                      ? "border-red-500 dark:border-red-500"
                                      : "border-gray-300 dark:border-gray-600"
                                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors`}
                                  placeholder="votre@email.com"
                                />
                                {errors.email && (
                                  <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label
                                  htmlFor="phone"
                                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                  Téléphone *
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.phone
                                      ? "border-red-500 dark:border-red-500"
                                      : "border-gray-300 dark:border-gray-600"
                                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors`}
                                  placeholder="Votre numéro de téléphone"
                                />
                                {errors.phone && (
                                  <p className="mt-1 text-sm text-red-500">
                                    {errors.phone}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mb-8">
                              <label
                                htmlFor="company"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Entreprise (optionnel)
                              </label>
                              <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                                placeholder="Nom de votre entreprise"
                              />
                            </div>

                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-lg transition-colors flex items-center"
                              >
                                Étape suivante
                                <svg
                                  className="ml-2 w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={formVariants}
                          >
                            <h4 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                              Votre projet
                            </h4>

                            <div className="mb-8">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Service souhaité *
                              </label>

                              {errors.service && (
                                <p className="mb-2 text-sm text-red-500">
                                  {errors.service}
                                </p>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {services.map((service) => (
                                  <motion.div
                                    key={service.id}
                                    variants={serviceCardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`cursor-pointer p-4 rounded-xl border-2 ${
                                      formData.service === service.id
                                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                    } transition-colors`}
                                    onClick={() =>
                                      handleServiceSelect(service.id)
                                    }
                                  >
                                    <div className="flex flex-col items-center text-center">
                                      <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                                        {service.name}
                                      </h5>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {service.description}
                                      </p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            <div className="mb-8">
                              <label
                                htmlFor="budget"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Budget estimé
                              </label>
                              <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                              >
                                <option value="">
                                  Sélectionnez votre budget
                                </option>
                                {budgetOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mb-8">
                              <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                              >
                                Description de votre projet *
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                  errors.message
                                    ? "border-red-500 dark:border-red-500"
                                    : "border-gray-300 dark:border-gray-600"
                                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors`}
                                placeholder="Décrivez votre projet, vos besoins et vos attentes..."
                              ></textarea>
                              {errors.message && (
                                <p className="mt-1 text-sm text-red-500">
                                  {errors.message}
                                </p>
                              )}
                            </div>

                            <div className="flex justify-between">
                              <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex items-center"
                              >
                                <svg
                                  className="mr-2 w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                  />
                                </svg>
                                Retour
                              </button>

                              <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-lg transition-colors flex items-center"
                              >
                                Étape suivante
                                <svg
                                  className="ml-2 w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={formVariants}
                          >
                            <h4 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                              Confirmation de votre demande
                            </h4>

                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
                              <h5 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">
                                Récapitulatif
                              </h5>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Nom complet
                                  </p>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {formData.firstName} {formData.lastName}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Email
                                  </p>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {formData.email}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Téléphone
                                  </p>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {formData.phone}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Entreprise
                                  </p>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {formData.company || "Non spécifié"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Service demandé
                                  </p>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {services.find(
                                      (s) => s.id === formData.service
                                    )?.name || "Non spécifié"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Budget estimé
                                  </p>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {budgetOptions.find(
                                      (b) => b.value === formData.budget
                                    )?.label || "Non spécifié"}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Description du projet
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white whitespace-pre-line">
                                  {formData.message}
                                </p>
                              </div>
                            </div>

                            <div className="mb-8">
                              <div className="flex items-start mb-4">
                                <input
                                  type="checkbox"
                                  id="terms"
                                  name="terms"
                                  checked={formData.terms}
                                  onChange={handleChange}
                                  className="mt-1 h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor="terms"
                                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                >
                                  J'accepte que mes données soient traitées pour
                                  le traitement de ma demande conformément à la
                                  politique de confidentialité d'IRONZ PRO. *
                                </label>
                              </div>
                              {errors.terms && (
                                <p className="text-sm text-red-500">
                                  {errors.terms}
                                </p>
                              )}

                              {errors.submit && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 mb-4">
                                  {errors.submit}
                                </div>
                              )}
                            </div>

                            <div className="flex justify-between">
                              <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex items-center"
                              >
                                <svg
                                  className="mr-2 w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                  />
                                </svg>
                                Retour
                              </button>

                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-lg transition-colors flex items-center ${
                                  isSubmitting
                                    ? "opacity-70 cursor-not-allowed"
                                    : ""
                                }`}
                              >
                                {isSubmitting ? (
                                  <>
                                    <svg
                                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Envoi en cours...
                                  </>
                                ) : (
                                  <>
                                    Envoyer ma demande
                                    <svg
                                      className="ml-2 w-5 h-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          ></motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contactez-nous dès aujourd'hui pour bénéficier d'une consultation
              gratuite et sans engagement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#form-section"
                className="px-8 py-4 bg-white hover:bg-gray-100 text-yellow-500 font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                Demander un devis
              </a>
              <Link href="/contact">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all transform hover:scale-105 shadow-lg">
                  Nous contacter
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
