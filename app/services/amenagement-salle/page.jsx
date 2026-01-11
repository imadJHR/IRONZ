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
  Zap,
  Star,
  Home,
  Dumbbell,
  Users,
  PenTool,
  Truck,
  Shield,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import ServiceContactForm from "../../../components/service-contact-form";

export default function AmenagementSallePage() {
  const [activeStep, setActiveStep] = useState(null);

  const services = [
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Étude & Conception",
      description: "Analyse de vos besoins, étude de l'espace disponible et conception de plans détaillés.",
      features: [
        "Plans 2D et 3D personnalisés",
        "Optimisation des flux de circulation",
        "Respect des normes de sécurité",
        "Visualisation immersive 3D",
        "Conception sur mesure",
      ],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Aménagement & Installation",
      description: "Mise en place complète de votre espace fitness, de la préparation à l'installation.",
      features: [
        "Installation professionnelle certifiée",
        "Gestion de projet complète",
        "Coordination des corps de métier",
        "Suivi qualité rigoureux",
        "Respect des délais",
      ],
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Équipement & Finition",
      description: "Sélection et installation des équipements adaptés avec finitions personnalisées.",
      features: [
        "Sélection d'équipements premium",
        "Personnalisation des finitions",
        "Formation à l'utilisation",
        "Garantie étendue incluse",
        "Service après-vente premium",
      ],
      color: "from-green-500 to-emerald-500",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Consultation exclusive",
      description: "Analyse approfondie de vos besoins et objectifs spécifiques",
      icon: <Phone className="w-8 h-8" />,
      features: [
        "Analyse des besoins sur site",
        "Définition du budget personnalisé",
        "Visite technique des lieux",
        "Étude de faisabilité détaillée",
      ],
    },
    {
      number: "02",
      title: "Conception & Design",
      description: "Élaboration de plans détaillés et visualisations 3D de votre futur espace",
      icon: <Target className="w-8 h-8" />,
      features: [
        "Plans 2D et 3D haute définition",
        "Sélection des matériaux premium",
        "Proposition d'équipements sur mesure",
        "Visualisation immersive VR",
      ],
    },
    {
      number: "03",
      title: "Validation & Planification",
      description: "Finalisation du projet et établissement du calendrier d'exécution",
      icon: <Calendar className="w-8 h-8" />,
      features: [
        "Validation finale du projet",
        "Planification détaillée des travaux",
        "Commande des équipements",
        "Coordination logistique",
      ],
    },
    {
      number: "04",
      title: "Réalisation & Installation",
      description: "Exécution des travaux d'aménagement et installation professionnelle",
      icon: <Dumbbell className="w-8 h-8" />,
      features: [
        "Préparation du site",
        "Installation des équipements IRONZ",
        "Contrôle qualité rigoureux",
        "Tests de fonctionnement",
      ],
    },
    {
      number: "05",
      title: "Livraison & Suivi VIP",
      description: "Remise des clés et mise en place du suivi premium",
      icon: <Award className="w-8 h-8" />,
      features: [
        "Formation complète à l'utilisation",
        "Remise des documents garantie",
        "Service après-vente prioritaire",
        "Suivi de satisfaction",
      ],
    },
  ];

  const stats = [
    { value: "200+", label: "Projets réalisés", icon: <Trophy className="w-5 h-5" /> },
    { value: "100%", label: "Satisfaction client", icon: <Star className="w-5 h-5" /> },
    { value: "5", label: "Ans d'expertise", icon: <Calendar className="w-5 h-5" /> },
    { value: "24h", label: "Support technique", icon: <Clock className="w-5 h-5" /> },
  ];

  const projectTypes = [
    {
      title: "Home Gym Élite",
      description: "Transformez votre espace personnel en salle de fitness privée",
      link: "/services/amenagement-salle/home-gym",
      icon: <Home className="w-6 h-6" />,
    },
    {
      title: "Salle Professionnelle",
      description: "Créez une salle de sport d'entreprise ou commerciale",
      link: "/services/amenagement-salle/professionnelle",
      icon: <Building className="w-6 h-6" />,
    },
    {
      title: "Espace Hôtelier",
      description: "Aménagez des espaces fitness pour hôtels et résidences",
      link: "/services/amenagement-salle/hotelier",
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: "Centre de Rééducation",
      description: "Solutions sur mesure pour la rééducation fonctionnelle",
      link: "/services/amenagement-salle/reeducation",
      icon: <Heart className="w-6 h-6" />,
    },
  ];

  const packages = [
    {
      name: "Aménagement Standard",
      description: "Idéal pour débuter votre projet fitness",
      icon: <Dumbbell className="h-10 w-10" />,
      features: [
        "Étude de faisabilité complète",
        "Plans 2D et visualisation 3D",
        "Sélection d'équipements essentiels",
        "Installation professionnelle de base",
        "Formation à l'utilisation",
      ],
      price: "À partir de 25,000 MAD",
      popular: false,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Aménagement Premium",
      description: "Solution complète pour une salle optimisée",
      icon: <Crown className="h-10 w-10" />,
      features: [
        "Conception architecturale complète",
        "Plans 3D haute définition",
        "Équipements IRONZ premium",
        "Installation complète clé en main",
        "Formation et suivi personnalisé",
      ],
      price: "À partir de 50,000 MAD",
      popular: true,
      color: "from-black to-yellow-500",
    },
    {
      name: "Aménagement Élite",
      description: "Solution sur mesure pour projets complexes",
      icon: <Trophy className="h-10 w-10" />,
      features: [
        "Design et architecture d'intérieur",
        "Visualisation VR immersive",
        "Équipements haut de gamme exclusifs",
        "Gestion complète de projet",
        "Service après-vente VIP 24/7",
      ],
      price: "À partir de 100,000 MAD",
      popular: false,
      color: "from-gray-900 to-yellow-600",
    },
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
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-yellow-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux services
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
                Expertise élite
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-[0.9]">
              Aménagement de <span className="text-yellow-500">Salle</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Transformez votre espace en une salle de fitness élite et fonctionnelle 
              avec notre expertise premium en aménagement d'espaces sportifs sur mesure.
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
                WhatsApp Direct
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
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
                Nos services premium
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Créez l'espace <span className="text-yellow-500">fitness idéal</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Expertise complète en aménagement d'espaces sportifs, de la conception à la livraison clé en main
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

      {/* Project Types */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Target className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Types de projets
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Solutions <span className="text-yellow-500">sur mesure</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Des solutions d'aménagement adaptées à tous les types d'espaces et besoins spécifiques
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {projectTypes.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={project.link}>
                  <div className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-xl cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <div className="text-white">
                        {project.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-black uppercase italic mb-3 text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center text-yellow-500 font-medium text-sm">
                      Découvrir
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section - Like Home Gym */}
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
                Nos solutions premium
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Solutions <span className="text-yellow-500">d'aménagement</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Des packages sur mesure adaptés à tous les budgets et besoins
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
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Notre processus élite
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Excellence en <span className="text-yellow-500">5 Étapes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Une approche méthodique et transparente pour garantir la réussite de votre projet
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setActiveStep(step.number)}
                  onMouseLeave={() => setActiveStep(null)}
                  className="relative"
                >
                  {/* Step Connector */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-yellow-500/50 to-transparent"></div>
                  )}
                  
                  <div className="flex items-start gap-6 bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center transition-all duration-300 ${activeStep === step.number ? 'scale-110' : ''}`}>
                          <div className="text-white">
                            {step.icon}
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm">
                          {step.number}
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-grow">
                      <div className="mb-4">
                        <h3 className="text-2xl font-black uppercase italic mb-2 text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
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
                  Consultation gratuite
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Prêt à <span className="text-yellow-500">transformer</span> votre espace ?
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                Contactez notre équipe d'experts IRONZ pour une consultation gratuite 
                et sans engagement. Nous vous accompagnons de la conception à la réalisation.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Téléphone direct</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">+212 674-114446</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IoLogoWhatsapp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">WhatsApp VIP</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">Réponse rapide garantie</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 group hover:border-yellow-500 transition-colors">
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

              {/* Opening Hours */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                  Horaires d'ouverture
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Lundi - Vendredi</span>
                    <span className="font-bold text-gray-900 dark:text-white">9h - 18h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Samedi</span>
                    <span className="font-bold text-gray-900 dark:text-white">10h - 16h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Dimanche</span>
                    <span className="font-bold text-gray-900 dark:text-white">Fermé</span>
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
                    Devis personnalisé
                  </span>
                </div>

                <h3 className="text-3xl font-black uppercase italic mb-8 text-white">
                  Demande de <span className="text-yellow-500">devis premium</span>
                </h3>
                
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Remplissez ce formulaire pour obtenir un devis détaillé et personnalisé 
                  pour votre projet d'aménagement. Notre équipe vous répond sous 24h.
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
              Transformez votre vision en réalité
            </h2>
            <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
              Découvrez comment nos solutions d'aménagement peuvent optimiser votre espace et booster vos performances
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