"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  Phone,
  Building,
  Users,
  Zap,
  Shield,
  Star,
  Award,
  TrendingUp,
  Clock,
  Sparkles,
  Target,
  Trophy,
  Medal,
  Crown,
  Calendar,
  MapPin,
  MessageSquare,
  ChevronRight,
  UsersRound,
  ShieldCheck,
  Heart,
  Globe,
  TargetIcon,
  PhoneCall,
  MailCheck,
  Flame,
  Home,
  Dumbbell,
  PenTool,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import ServiceContactForm from "../../../../components/service-contact-form";

export default function SalleProfessionnellePage() {
  const [activePackage, setActivePackage] = useState(null);

  const sectors = [
    {
      icon: <Building className="h-8 w-8" />,
      title: "Salles de Sport",
      description: "Équipement complet pour salles de fitness, clubs de sport et centres d'entraînement.",
      features: ["Zones cardio et musculation", "Espaces cours collectifs", "Vestiaires et réception"],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Hôtels & Resorts",
      description: "Espaces wellness haut de gamme pour hôtels 4 et 5 étoiles.",
      features: ["Fitness center luxueux", "Spa et bien-être", "Piscines et jacuzzis"],
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Entreprises",
      description: "Espaces fitness d'entreprise pour le bien-être des employés.",
      features: ["Salles de sport corporate", "Espaces détente", "Solutions modulaires"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Centres Sportifs",
      description: "Équipements pour centres municipaux et complexes sportifs.",
      features: ["Équipements multi-sports", "Espaces polyvalents", "Solutions durables"],
      color: "from-red-500 to-pink-500",
    },
  ];

  const services = [
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Étude & Conception",
      description: "Analyse complète de vos besoins et conception de plans détaillés avec visualisation 3D.",
      features: [
        "Audit de l'espace existant",
        "Plans 2D et modélisation 3D",
        "Étude de faisabilité technique",
      ],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Aménagement Complet",
      description: "Réalisation complète de votre projet avec coordination de tous les corps de métier.",
      features: [
        "Gestion de projet clé en main",
        "Coordination des intervenants",
        "Respect des délais et budgets",
      ],
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Équipements Premium",
      description: "Sélection et installation d'équipements professionnels de marques reconnues.",
      features: [
        "Équipements haut de gamme",
        "Installation professionnelle",
        "Formation du personnel",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Maintenance & Support",
      description: "Service après-vente complet avec maintenance préventive et support technique.",
      features: [
        "Maintenance préventive",
        "Support technique 24/7",
        "Garantie étendue",
      ],
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Conseil & Formation",
      description: "Accompagnement stratégique et formation pour optimiser votre activité.",
      features: [
        "Conseil en exploitation",
        "Formation du personnel",
        "Optimisation des revenus",
      ],
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Financement & Leasing",
      description: "Solutions de financement flexibles pour faciliter votre investissement.",
      features: [
        "Leasing équipements",
        "Crédit professionnel",
        "Paiement échelonné",
      ],
      color: "from-purple-500 to-pink-500",
    },
  ];

  const packages = [
    {
      name: "Formule Starter",
      description: "Parfait pour débuter",
      icon: <Building className="h-10 w-10" />,
      features: [
        "100-200 m² équipés",
        "15-20 équipements cardio/muscu",
        "Vestiaires et réception",
        "Système audio/vidéo",
        "Formation équipe",
      ],
      price: "À partir de 150,000 MAD",
      popular: false,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Formule Business",
      description: "Solution complète",
      icon: <Users className="h-10 w-10" />,
      features: [
        "300-500 m² aménagés",
        "40-60 équipements premium",
        "Espaces cours collectifs",
        "Système de gestion intégré",
        "Support 24/7 première année",
      ],
      price: "À partir de 350,000 MAD",
      popular: true,
      color: "from-black to-yellow-500",
    },
    {
      name: "Formule Premium",
      description: "Excellence absolue",
      icon: <Crown className="h-10 w-10" />,
      features: [
        "500+ m² luxueux",
        "80+ équipements haut de gamme",
        "Spa et espaces wellness",
        "Domotique et IA intégrées",
        "Maintenance premium 5 ans",
      ],
      price: "À partir de 750,000 MAD",
      popular: false,
      color: "from-gray-900 to-yellow-600",
    },
  ];

  const stats = [
    { value: "20+", label: "Salles équipées", icon: <Building className="w-5 h-5" /> },
    { value: "5", label: "Ans d'expertise", icon: <Calendar className="w-5 h-5" /> },
    { value: "50+", label: "Marques partenaires", icon: <UsersRound className="w-5 h-5" /> },
    { value: "24/7", label: "Support technique", icon: <ShieldCheck className="w-5 h-5" /> },
  ];

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
              href="/services/amenagement-salle"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-yellow-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l'aménagement de salle
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
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Expertise professionnelle
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-[0.9]">
              Salle <span className="text-yellow-500">Professionnelle</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Créez un espace fitness professionnel de haute qualité qui attire 
              et fidélise votre clientèle avec nos solutions complètes pour salles 
              de sport, hôtels, entreprises et centres sportifs.
            </p>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mb-10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <span className="text-3xl md:text-4xl font-black text-yellow-500">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                variants={scaleIn}
                onClick={() => window.location.href = "/demande-devis"}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all shadow-lg"
              >
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                variants={scaleIn}
                onClick={() => window.open('https://wa.me/212674114446', '_blank')}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all border border-white/10"
              >
                <IoLogoWhatsapp className="w-5 h-5" />
                WhatsApp Pro Direct
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Target Sectors */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Target className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Secteurs d'expertise
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Nos <span className="text-yellow-500">Secteurs</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Des solutions professionnelles adaptées à chaque type d'établissement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${sector.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {sector.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                    {sector.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {sector.description}
                  </p>

                  <ul className="space-y-2">
                    {sector.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Services professionnels
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Nos <span className="text-yellow-500">Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Un accompagnement complet de la conception à la maintenance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Crown className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Formules professionnelles
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Solutions <span className="text-yellow-500">sur mesure</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Des solutions complètes adaptées à la taille et aux besoins de votre établissement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActivePackage(pkg.name)}
                onMouseLeave={() => setActivePackage(null)}
                className="relative group h-full"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-2 rounded-full font-black uppercase italic tracking-widest text-sm">
                      Recommandé
                    </div>
                  </div>
                )}
                
                <div className={`bg-gradient-to-br ${pkg.color} rounded-3xl p-0.5 h-full ${pkg.popular ? 'scale-[1.02]' : ''}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-[1.25rem] p-8 h-full">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                        <div className="text-white">
                          {pkg.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-black uppercase italic mb-2 text-gray-900 dark:text-white">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-8 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-3xl font-black text-gray-900 dark:text-white mb-6">
                        {pkg.price}
                      </div>
                      
                      <Link href="/demande-devis">
                        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-6 py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
                          Demander un devis
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <PhoneCall className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Consultation pro gratuite
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Prêt à lancer votre <span className="text-yellow-500">projet pro</span> ?
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                Nos experts vous accompagnent dans la création de votre espace 
                fitness professionnel. Contactez-nous pour une étude personnalisée 
                et un devis détaillé.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Ligne dédiée professionnels</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">+212 674-114446</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IoLogoWhatsapp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">WhatsApp Pro Direct</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">Réponse rapide garantie</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Showroom IRONZ Pro</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      SAHARA MALL 1 ÈRE ÉTAGE C169 & C120, Agadir
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                  Garanties professionnelles
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Étude gratuite et analyse complète de votre projet
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Assurance décennale incluse dans tous nos contrats
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Support technique et maintenance premium incluse
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                  <MessageSquare className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                    Devis professionnel
                  </span>
                </div>

                <h3 className="text-3xl font-black uppercase italic mb-8 text-white">
                  Demande de <span className="text-yellow-500">devis pro</span>
                </h3>
                
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Remplissez ce formulaire pour obtenir un devis détaillé et personnalisé 
                  pour votre projet professionnel. Notre équipe commerciale vous répond sous 24h.
                </p>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <ServiceContactForm service="Aménagement Salle Professionnelle Premium" />
                </div>
              </div>
            </motion.div>
          </div>
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
              Transformez votre espace en succès commercial
            </h2>
            <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
              Découvrez comment nos solutions d'aménagement professionnel peuvent optimiser 
              votre rentabilité et fidéliser votre clientèle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis">
                <button className="px-8 py-6 bg-black hover:bg-gray-900 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button
                onClick={() => window.open('https://wa.me/212674114446', '_blank')}
                className="px-8 py-6 bg-white hover:bg-gray-100 text-black font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <IoLogoWhatsapp className="w-6 h-6" />
                WhatsApp Pro Direct
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => window.open(`https://wa.me/212674114446`, '_blank')}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-2xl transition-all flex items-center justify-center"
        >
          <IoLogoWhatsapp className="w-7 h-7" />
        </button>
      </motion.div>
    </main>
  );
}