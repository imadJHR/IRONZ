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
  Home,
  Dumbbell,
  Zap,
  Shield,
  Star,
  Users,
  Sparkles,
  Target,
  Trophy,
  Medal,
  Crown,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  ChevronRight,
  UsersRound,
  Award,
  ShieldCheck,
  Heart,
  Building,
  Globe,
  TargetIcon,
  PhoneCall,
  MailCheck,
  Flame,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import { Button } from "../../../../components/ui/button";

export default function HomeGymPage() {
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const benefits = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Disponibilité 24/7",
      description: "Entraînez-vous quand vous voulez, sans contrainte d'horaires.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Intimité & Confort",
      description: "Entraînez-vous dans l'intimité, dans un environnement qui vous ressemble.",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Économies à Long Terme",
      description: "Investissement rentabilisé avec des années d'utilisation.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Gain de Temps",
      description: "Plus de trajet, maximisation de votre temps d'entraînement.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Équipements Personnalisés",
      description: "Choisissez les équipements correspondant à vos objectifs.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Valeur Immobilière",
      description: "Home gym bien aménagé = augmentation de la valeur de votre propriété.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const packages = [
    {
      name: "Home Gym Compact",
      description: "Idéal pour les petits espaces",
      icon: <Home className="h-10 w-10" />,
      features: [
        "5-15 m² optimisés",
        "Équipements multifonctionnels",
        "Solutions de rangement intégrées",
        "Miroirs et éclairage LED",
        "Sol sportif antidérapant",
      ],
      price: "À partir de 15,000 MAD",
      popular: false,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Home Gym Standard",
      description: "Le parfait équilibre",
      icon: <Dumbbell className="h-10 w-10" />,
      features: [
        "15-30 m² aménagés",
        "Zone cardio + musculation",
        "Système audio intégré",
        "Climatisation et ventilation",
        "Écran TV pour coaching",
      ],
      price: "À partir de 35,000 MAD",
      popular: true,
      color: "from-black to-yellow-500",
    },
    {
      name: "Home Gym Premium",
      description: "L'expérience ultime",
      icon: <Crown className="h-10 w-10" />,
      features: [
        "30+ m² luxueux",
        "Équipements haut de gamme IRONZ",
        "Sauna ou hammam intégré",
        "Domotique et contrôle intelligent",
        "Design sur mesure personnalisé",
      ],
      price: "À partir de 75,000 MAD",
      popular: false,
      color: "from-gray-900 to-yellow-600",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Consultation exclusive",
      description: "Évaluation sur site de votre espace et de vos besoins spécifiques",
      icon: <Phone className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "Conception 3D",
      description: "Création de plans et visualisation 3D de votre futur home gym",
      icon: <Target className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Installation élite",
      description: "Aménagement professionnel par notre équipe certifiée IRONZ",
      icon: <Dumbbell className="w-8 h-8" />,
    },
    {
      number: "04",
      title: "Formation VIP",
      description: "Prise en main complète et coaching d'utilisation",
      icon: <Award className="w-8 h-8" />,
    },
  ];

  const stats = [
    { value: "50+", label: "Home Gyms créés", icon: <Home className="w-5 h-5" /> },
    { value: "100%", label: "Clients satisfaits", icon: <Star className="w-5 h-5" /> },
    { value: "5", label: "Ans d'expérience", icon: <Calendar className="w-5 h-5" /> },
    { value: "24h", label: "Support client", icon: <Clock className="w-5 h-5" /> },
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
                Solution élite
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-[0.9]">
              Home Gym <span className="text-yellow-500">Premium</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Transformez votre espace personnel en une salle de fitness privée 
              et fonctionnelle avec nos solutions d'aménagement home gym sur mesure.
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
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all shadow-lg"
              >
                <IoLogoWhatsapp className="w-6 h-6" />
                WhatsApp Direct
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Avantages exclusifs
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Pourquoi choisir un <span className="text-yellow-500">Home Gym</span> ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Découvrez tous les avantages d'avoir votre propre salle de sport élite à domicile
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {benefit.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Crown className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Nos solutions premium
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Solutions <span className="text-yellow-500">Home Gym</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Des solutions sur mesure adaptées à tous les espaces et budgets
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
                onMouseEnter={() => setHoveredPackage(pkg.name)}
                onMouseLeave={() => setHoveredPackage(null)}
                className="relative group h-full"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-2 rounded-full font-black uppercase italic tracking-widest text-sm">
                      Plus populaire
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

      {/* Process Section */}
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
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Notre processus
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Excellence en <span className="text-yellow-500">4 Étapes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Un parcours d'accompagnement premium pour créer votre home gym idéal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-center relative z-10 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                      <span className="text-lg font-black text-white">{step.number}</span>
                    </div>
                  </div>
                  
                  {/* Step Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 flex items-center justify-center mx-auto mb-6 mt-6">
                    <div className="text-yellow-500">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <h3 className="text-xl font-black uppercase italic mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector line for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transform -translate-y-1/2 -translate-x-4 z-0"></div>
                )}
              </motion.div>
            ))}
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
              Prêt à créer votre Home Gym élite ?
            </h2>
            <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
              Contactez notre équipe d'experts pour une consultation gratuite et un devis sur mesure
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
                WhatsApp Direct
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <PhoneCall className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Contact exclusif
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Consultation <span className="text-yellow-500">Gratuite</span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                Notre équipe d'experts IRONZ vous accompagne dans la création de votre home gym sur mesure, 
                de la conception à l'installation finale.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Téléphone direct</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">+212 674-114446</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IoLogoWhatsapp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">WhatsApp VIP</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">Réponse rapide garantie</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Showroom IRONZ</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      SAHARA MALL 1 ÈRE ÉTAGE C169 & C120, Agadir
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <ShieldCheck className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Nos garanties
                </span>
              </div>

              <h3 className="text-3xl font-black uppercase italic mb-8 text-white">
                Vos <span className="text-yellow-500">Avantages</span> IRONZ
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Devis gratuit et détaillé</h4>
                    <p className="text-gray-400">Transparence totale sur les coûts</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Garantie 5 ans</h4>
                    <p className="text-gray-400">Sur tous nos aménagements home gym</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Support technique 24/7</h4>
                    <p className="text-gray-400">Assistance prioritaire pour nos clients</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Formation incluse</h4>
                    <p className="text-gray-400">Prise en main complète de votre équipement</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <Link href="/contact">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all">
                    Contacter un expert
                    <ArrowRight className="ml-2 w-5 h-5 inline" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
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