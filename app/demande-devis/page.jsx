"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ShieldCheck,
  Star,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Zap,
  Award,
  Users,
  Target,
  ChevronRight,
  ArrowRight,
  Send,
  Check,
  Calendar,
  DollarSign,
  Package,
  Building,
  User,
  PhoneCall,
  MailCheck,
  MessageCircle,
} from "lucide-react";

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
      icon: <Building className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      description: "Conception d'espaces fitness professionnels ou personnels",
      features: ["Plan 3D", "Installation complète", "Formation incluse"]
    },
    {
      id: "personnalisation-accessoires",
      name: "Personnalisation d'accessoires",
      icon: <Package className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500",
      description: "Création d'accessoires fitness sur mesure",
      features: ["Logo gravé", "Couleurs personnalisées", "Matériaux premium"]
    },
    {
      id: "espace-enfance",
      name: "Espace enfance",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      description: "Aménagement d'espaces adaptés aux enfants",
      features: ["Sécurité certifiée", "Design ludique", "Équipement adapté"]
    },
    {
      id: "revetement-sol-mur",
      name: "Revêtement sol & mur",
      icon: <Target className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
      description: "Solutions de revêtement spécialisées sportives",
      features: ["Antidérapant", "Facile à nettoyer", "Résistance aux chocs"]
    },
    {
      id: "conception-produits",
      name: "Conception de produits",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500",
      description: "Développement de produits fitness innovants",
      features: ["Prototypage", "Test qualité", "Production sur mesure"]
    },
    {
      id: "autre",
      name: "Autre service",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "from-gray-500 to-gray-700",
      description: "Besoin spécifique non listé ? Parlons-en",
      features: ["Étude personnalisée", "Devis gratuit", "Accompagnement"]
    },
  ];

  const budgetOptions = [
    { value: "8000-25000", label: "8 000 MAD - 25 000 MAD", icon: <DollarSign className="w-4 h-4" /> },
    { value: "28000-35000", label: "28 000 MAD - 35 000 MAD", icon: <DollarSign className="w-4 h-4" /> },
    { value: "35000-50000", label: "35 000 MAD - 50 000 MAD", icon: <DollarSign className="w-4 h-4" /> },
    { value: "100000-plus", label: "Plus de 100 000 MAD", icon: <DollarSign className="w-4 h-4" /> },
    { value: "a-definir", label: "À définir avec notre équipe", icon: <MessageCircle className="w-4 h-4" /> },
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
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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
      const selectedService =
        services.find((s) => s.id === formData.service)?.name ||
        formData.service;
      const selectedBudget =
        budgetOptions.find((b) => b.value === formData.budget)?.label ||
        "Non spécifié";

      const whatsappMessage = `📋 NOUVELLE DEMANDE DE DEVIS IRONZ PRO

👤 *Informations client:*
• Nom: ${formData.firstName} ${formData.lastName}
• Email: ${formData.email}
• Téléphone: ${formData.phone}
• Entreprise: ${formData.company || "Non spécifié"}

🎯 *Détails du projet:*
• Service: ${selectedService}
• Budget: ${selectedBudget}

💬 *Description du projet:*
${formData.message}

📅 *Envoyé le:* ${new Date().toLocaleDateString('fr-FR')}
🕒 *À:* ${new Date().toLocaleTimeString('fr-FR')}

🔗 *Source:* Site web IRONZ PRO`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappNumber = "212674114446";

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
        "_blank"
      );

      setIsSubmitted(true);
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
        damping: 12,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      x: 30,
      transition: {
        duration: 0.2,
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
        damping: 15,
      },
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const stepIndicatorVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-yellow-500 transition-colors group"
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
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-600">
                Devis personnalisé
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">
              Demande de <span className="text-yellow-500">Devis</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transformez votre vision en réalité avec notre expertise premium.
              Obtenez un devis personnalisé sous <span className="font-bold text-yellow-500">24 heures</span>.
            </p>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
            >
              {[
                { icon: <Clock className="w-5 h-5" />, value: "24h", label: "Réponse rapide" },
                { icon: <CheckCircle className="w-5 h-5" />, value: "100%", label: "Satisfaction" },
                { icon: <ShieldCheck className="w-5 h-5" />, value: "Gratuit", label: "Devis offert" },
                { icon: <Star className="w-5 h-5" />, value: "500+", label: "Projets réalisés" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <span className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#form-section"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-yellow-500/20"
              >
                <FileText className="w-5 h-5" />
                Obtenir mon devis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-500 text-gray-900 dark:text-white font-black uppercase italic tracking-widest rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-sm"
              >
                <PhoneCall className="w-5 h-5" />
                Nous contacter
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Form Section */}
      <section id="form-section" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Benefits & Process */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="sticky top-32 space-y-8">
                  {/* Process Steps */}
                  <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-lg">
                    <h3 className="text-2xl font-black uppercase italic mb-6 text-gray-900 dark:text-white">
                      Comment ça marche ?
                    </h3>
                    
                    <div className="space-y-6">
                      {[
                        { step: "1", title: "Formulaire", desc: "Remplissez votre demande", icon: <FileText className="w-5 h-5" /> },
                        { step: "2", title: "Analyse", desc: "Étude par notre équipe d'experts", icon: <Users className="w-5 h-5" /> },
                        { step: "3", title: "Devis", desc: "Proposition personnalisée", icon: <DollarSign className="w-5 h-5" /> },
                        { step: "4", title: "Validation", desc: "Démarrage du projet", icon: <CheckCircle className="w-5 h-5" /> },
                      ].map((item) => (
                        <div key={item.step} className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= parseInt(item.step) ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                            <span className="text-sm font-bold">{item.step}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/5 dark:to-orange-500/5 border border-yellow-500/20 dark:border-yellow-500/10 rounded-3xl p-8">
                    <h4 className="font-black uppercase italic text-yellow-600 dark:text-yellow-400 mb-6">
                      <MessageCircle className="inline w-5 h-5 mr-2" />
                      Besoin d'aide ?
                    </h4>
                    
                    <div className="space-y-4">
                      <a href="tel:+212674114446" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-yellow-500 transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Appelez-nous</div>
                          <div className="font-bold">+212 674-114446</div>
                        </div>
                      </a>
                      
                      <a href="mailto:muscleironz2019@gmail.com" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-yellow-500 transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Écrivez-nous</div>
                          <div className="font-bold">muscleironz2019@gmail.com</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2"
                ref={formRef}
              >
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 md:p-12 text-center shadow-xl"
                  >
                    <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Check className="w-12 h-12 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                      Demande envoyée avec succès !
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
                      Votre demande a été transférée sur WhatsApp. Notre équipe d'experts l'étudiera et vous contactera dans les <span className="font-bold text-yellow-500">24 heures</span> pour discuter de votre projet.
                    </p>

                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5 border border-green-500/20 dark:border-green-500/10 rounded-2xl p-6 mb-8 max-w-md mx-auto">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Clock className="w-5 h-5 text-green-500" />
                        <span className="font-bold text-green-600 dark:text-green-400">Prochaines étapes</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Notre commercial vous appellera pour discuter des détails et vous proposer un rendez-vous avec notre équipe technique.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-2xl transition-colors"
                      >
                        Nouvelle demande
                      </button>
                      <Link href="/">
                        <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-2xl transition-colors">
                          Retour à l'accueil
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 shadow-xl">
                    {/* Form Header */}
                    <div className="mb-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-3xl font-black uppercase italic text-gray-900 dark:text-white">
                          Votre projet, <span className="text-yellow-500">notre expertise</span>
                        </h3>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3].map((step) => (
                            <motion.div
                              key={step}
                              variants={stepIndicatorVariants}
                              initial="hidden"
                              animate="visible"
                              className={`w-3 h-3 rounded-full ${currentStep >= step ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                          initial={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                          animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                      </div>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={formVariants}
                          >
                            <h4 className="text-2xl font-black uppercase italic mb-8 text-gray-900 dark:text-white">
                              <User className="inline w-6 h-6 mr-3 text-yellow-500" />
                              Vos informations
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                              <div>
                                <label className="block text-sm font-bold uppercase italic text-gray-500 dark:text-gray-400 mb-3">
                                  Prénom *
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleChange}
                                  className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.firstName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors`}
                                  placeholder="Votre prénom"
                                />
                                {errors.firstName && (
                                  <p className="mt-2 text-sm text-red-500">{errors.firstName}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-bold uppercase italic text-gray-500 dark:text-gray-400 mb-3">
                                  Nom *
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleChange}
                                  className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.lastName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors`}
                                  placeholder="Votre nom"
                                />
                                {errors.lastName && (
                                  <p className="mt-2 text-sm text-red-500">{errors.lastName}</p>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                              <div>
                                <label className="block text-sm font-bold uppercase italic text-gray-500 dark:text-gray-400 mb-3">
                                  Email *
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors`}
                                  placeholder="votre@email.com"
                                />
                                {errors.email && (
                                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-bold uppercase italic text-gray-500 dark:text-gray-400 mb-3">
                                  Téléphone *
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors`}
                                  placeholder="+212 6 00 00 00 00"
                                />
                                {errors.phone && (
                                  <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
                                )}
                              </div>
                            </div>

                            <div className="mb-10">
                              <label className="block text-sm font-bold uppercase italic text-gray-500 dark:text-gray-400 mb-3">
                                Entreprise (optionnel)
                              </label>
                              <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                placeholder="Nom de votre entreprise"
                              />
                            </div>

                            <div className="flex justify-end">
                              <motion.button
                                type="button"
                                onClick={nextStep}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg shadow-yellow-500/20 flex items-center gap-3"
                              >
                                Étape suivante
                                <ArrowRight className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Project Details */}
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={formVariants}
                          >
                            <h4 className="text-2xl font-black uppercase italic mb-8 text-gray-900 dark:text-white">
                              <Target className="inline w-6 h-6 mr-3 text-yellow-500" />
                              Détails du projet
                            </h4>

                            <div className="mb-10">
                              <label className="block text-sm font-bold uppercase italic text-gray-500 dark:text-gray-400 mb-4">
                                Service souhaité *
                              </label>

                              {errors.service && (
                                <p className="mb-4 text-sm text-red-500">{errors.service}</p>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {services.map((service) => (
                                  <motion.button
                                    key={service.id}
                                    type="button"
                                    variants={serviceCardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={() => handleServiceSelect(service.id)}
                                    className={`p-5 rounded-2xl border-2 text-left ${formData.service === service.id ? `border-yellow-500 bg-gradient-to-r ${service.color}/10` : 'border-gray-200 dark:border-gray-700 hover:border-yellow-500'} transition-all`}
                                  >
                                    <div className="flex items-start gap-4">
                                      <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white`}>
                                        {service.icon}
                                      </div>
                                      <div>
                                        <h5 className="font-bold text-gray-900 dark:text-white mb-1">
                                          {service.name}
                                        </h5>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                          {service.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                          {service.features.map((feature, idx) => (
                                            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                                              {feature}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            <div className="mb-8">
                              <label className="block text-sm font-bold uppercase italic text-gray-500 dark:text-gray-400 mb-3">
                                Budget estimé
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {budgetOptions.map((option) => (
                                  <label
                                    key={option.value}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ${formData.budget === option.value ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-yellow-500'}`}
                                  >
                                    <input
                                      type="radio"
                                      name="budget"
                                      value={option.value}
                                      checked={formData.budget === option.value}
                                      onChange={handleChange}
                                      className="hidden"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.budget === option.value ? 'border-yellow-500 bg-yellow-500' : 'border-gray-300 dark:border-gray-600'}`}>
                                      {formData.budget === option.value && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                     
                                      <span className="font-medium">{option.label}</span>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="mb-10">
                              <label className="block text-sm font-bold uppercase italic text-gray-500 dark:text-gray-400 mb-3">
                                Description de votre projet *
                              </label>
                              <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className={`w-full px-5 py-4 rounded-2xl border-2 ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none`}
                                placeholder="Décrivez votre projet en détail : objectifs, contraintes, délais, spécifications techniques..."
                              />
                              {errors.message && (
                                <p className="mt-2 text-sm text-red-500">{errors.message}</p>
                              )}
                            </div>

                            <div className="flex justify-between">
                              <motion.button
                                type="button"
                                onClick={prevStep}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-500 text-gray-700 dark:text-gray-300 font-bold rounded-2xl transition-colors flex items-center gap-3"
                              >
                                <ArrowLeft className="w-5 h-5" />
                                Retour
                              </motion.button>

                              <motion.button
                                type="button"
                                onClick={nextStep}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg shadow-yellow-500/20 flex items-center gap-3"
                              >
                                Étape suivante
                                <ArrowRight className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Confirmation */}
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={formVariants}
                          >
                            <h4 className="text-2xl font-black uppercase italic mb-8 text-gray-900 dark:text-white">
                              <CheckCircle className="inline w-6 h-6 mr-3 text-yellow-500" />
                              Confirmation
                            </h4>

                            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 mb-10">
                              <h5 className="text-xl font-black uppercase italic mb-6 text-gray-900 dark:text-white">
                                Récapitulatif de votre demande
                              </h5>

                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl">
                                    <h6 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Client</h6>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                      {formData.firstName} {formData.lastName}
                                    </p>
                                  </div>
                                  
                                  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl">
                                    <h6 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Contact</h6>
                                    <div className="space-y-1">
                                      <p className="font-medium text-gray-900 dark:text-white">{formData.email}</p>
                                      <p className="font-medium text-gray-900 dark:text-white">{formData.phone}</p>
                                    </div>
                                  </div>

                                  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl">
                                    <h6 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Service</h6>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                      {services.find(s => s.id === formData.service)?.name || "Non spécifié"}
                                    </p>
                                  </div>

                                  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl">
                                    <h6 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Budget</h6>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                      {budgetOptions.find(b => b.value === formData.budget)?.label || "À définir"}
                                    </p>
                                  </div>
                                </div>

                                {formData.company && (
                                  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl">
                                    <h6 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Entreprise</h6>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{formData.company}</p>
                                  </div>
                                )}

                                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl">
                                  <h6 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Description du projet</h6>
                                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{formData.message}</p>
                                </div>
                              </div>
                            </div>

                            <div className="mb-10">
                              <label className="flex items-start gap-3 cursor-pointer">
                                <div className={`flex-shrink-0 w-5 h-5 mt-1 border-2 rounded ${formData.terms ? 'bg-yellow-500 border-yellow-500' : 'border-gray-300 dark:border-gray-600'}`}>
                                  {formData.terms && <Check className="w-full h-full text-white" />}
                                </div>
                                <input
                                  type="checkbox"
                                  name="terms"
                                  checked={formData.terms}
                                  onChange={handleChange}
                                  className="hidden"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  J'accepte que mes données soient traitées pour le traitement de ma demande conformément à la politique de confidentialité d'IRONZ PRO. *
                                </span>
                              </label>
                              {errors.terms && (
                                <p className="mt-2 text-sm text-red-500">{errors.terms}</p>
                              )}

                              {errors.submit && (
                                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-300">
                                  {errors.submit}
                                </div>
                              )}
                            </div>

                            <div className="flex justify-between">
                              <motion.button
                                type="button"
                                onClick={prevStep}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-500 text-gray-700 dark:text-gray-300 font-bold rounded-2xl transition-colors flex items-center gap-3"
                              >
                                <ArrowLeft className="w-5 h-5" />
                                Retour
                              </motion.button>

                              <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                className={`px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg shadow-yellow-500/20 flex items-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-yellow-600 hover:to-orange-600'}`}
                              >
                                {isSubmitting ? (
                                  <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Envoi en cours...
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-5 h-5" />
                                    Envoyer ma demande
                                  </>
                                )}
                              </motion.button>
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

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-6 text-white">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour bénéficier d'une consultation gratuite et sans engagement avec nos experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#form-section"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-yellow-500 font-black uppercase italic tracking-widest rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                <FileText className="w-5 h-5" />
                Obtenir mon devis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact">
                <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-black uppercase italic tracking-widest rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                  <PhoneCall className="w-5 h-5" />
                  Nous appeler
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}