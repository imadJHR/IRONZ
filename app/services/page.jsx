"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Users,
  Truck,
  PenToolIcon as Tool,
  Shield,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  Target,
  Zap,
  Heart,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  Dumbbell,
  Trophy,
  Medal,
  Crown,
  Building,
  Globe,
  UsersRound,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Installation d'équipement",
      description:
        "Notre équipe de techniciens certifiés installe votre équipement de fitness premium à domicile ou en salle, garantissant une mise en place sécurisée et optimale pour la performance.",
      icon: <Tool className="h-10 w-10" />,
      features: [
        "Installation professionnelle certifiée",
        "Vérification complète de sécurité",
        "Conseils d'utilisation avancés",
        "Garantie sur l'installation 1 an",
        "Formation à l'équipement inclus",
      ],
      price: "À partir de 999 MAD",
      cta: "Demander un devis",
      color: "from-yellow-500 to-orange-500",
      highlights: ["Installation rapide", "Expert certifié", "Garantie incluse"],
    },
    {
      id: 2,
      title: "Maintenance et réparation",
      description:
        "Service premium de maintenance et réparation pour optimiser la durée de vie de vos équipements IRONZ et assurer des performances optimales.",
      icon: <Tool className="h-10 w-10" />,
      features: [
        "Diagnostic expert complet",
        "Réparation rapide en 24h",
        "Pièces d'origine IRONZ",
        "Contrats de maintenance premium",
        "Service d'urgence disponible",
      ],
      price: "À partir de 799 MAD",
      cta: "Prendre rendez-vous",
      color: "from-blue-500 to-purple-500",
      highlights: ["Urgence 24h", "Pièces originales", "Experts IRONZ"],
    },
    {
      id: 3,
      title: "Coaching personnalisé",
      description:
        "Accompagnement sur mesure par nos coachs élites pour maximiser vos performances avec votre équipement IRONZ et atteindre vos objectifs.",
      icon: <Users className="h-10 w-10" />,
      features: [
        "Programmes élites sur mesure",
        "Suivi nutritionnel premium",
        "Coaching VIP à domicile",
        "Séances en visio HD",
        "Accès à la communauté IRONZ",
      ],
      price: "À partir de 490 MAD/h",
      cta: "Réserver une séance",
      color: "from-green-500 to-emerald-500",
      highlights: ["Coach élite", "Nutrition", "Communauté"],
    },
    {
      id: 4,
      title: "Livraison express premium",
      description:
        "Service de livraison premium avec manipulation soignée et installation rapide de votre équipement IRONZ, selon votre planning.",
      icon: <Truck className="h-10 w-10" />,
      features: [
        "Livraison express 24-48h",
        "Créneaux horaires VIP",
        "Suivi GPS en temps réel",
        "Installation basic incluse",
        "Reprise emballages éco",
      ],
      price: "À partir de 199 MAD",
      cta: "En savoir plus",
      color: "from-red-500 to-pink-500",
      highlights: ["Express 24h", "Suivi GPS", "Installation incluse"],
    },
    {
      id: 5,
      title: "Extension de garantie VIP",
      description:
        "Programme d'extension de garantie exclusive pour une tranquillité d'esprit totale et un service prioritaire sur vos équipements.",
      icon: <Shield className="h-10 w-10" />,
      features: [
        "Couverture complète premium",
        "Remplacement express 48h",
        "Assistance prioritaire 24/7",
        "Transfert de garantie possible",
        "Couverture mondiale disponible",
      ],
      price: "À partir de 599 MAD/an",
      cta: "Souscrire",
      color: "from-indigo-500 to-blue-500",
      highlights: ["Garantie étendue", "Assistance 24/7", "Remplacement rapide"],
    },
    {
      id: 6,
      title: "Conception de salle premium",
      description:
        "Service d'architecture et design premium pour créer votre espace fitness élite, optimisé pour la performance et l'esthétique.",
      icon: <Award className="h-10 w-10" />,
      features: [
        "Étude personnalisée expert",
        "Plans 3D et réalité virtuelle",
        "Sélection équipements élites",
        "Suivi de projet dédié",
        "Gestion complète des travaux",
      ],
      price: "À partir de 1999 MAD",
      cta: "Demander une étude",
      color: "from-purple-500 to-pink-500",
      highlights: ["Design 3D", "Gestion complète", "Solutions sur mesure"],
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Consultation exclusive",
      description: "Analyse approfondie de vos besoins avec nos experts IRONZ",
      icon: <Target className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "Devis personnalisé",
      description: "Proposition sur mesure avec solutions premium adaptées",
      icon: <Award className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Planification élite",
      description: "Organisation détaillée avec planning VIP selon vos attentes",
      icon: <Calendar className="w-8 h-8" />,
    },
    {
      number: "04",
      title: "Exécution expert",
      description: "Réalisation professionnelle par notre équipe certifiée",
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  const faqs = [
    {
      question: "Quels sont les délais d'intervention pour une installation ?",
      answer:
        "Nos services premium sont exécutés sous 24-48h après validation du devis, avec des créneaux horaires VIP disponibles selon vos préférences.",
    },
    {
      question: "Les services sont-ils disponibles partout au Maroc ?",
      answer:
        "Oui, nos services élites couvrent l'ensemble du Maroc avec une équipe dédiée dans chaque région, garantissant le même niveau d'excellence partout.",
    },
    {
      question: "Comment se déroule une séance de coaching personnalisé ?",
      answer:
        "Le coaching IRONZ commence par un bilan complet de performance, suivi de la création d'un programme sur mesure et d'un suivi constant par votre coach élite.",
    },
    {
      question: "Que couvre l'extension de garantie VIP ?",
      answer:
        "Notre garantie VIP couvre l'intégralité des pièces, main d'œuvre et déplacements, avec service prioritaire 24/7 et remplacement temporaire inclus.",
    },
  ];

  const stats = [
    { value: "100%", label: "Satisfaction client", icon: <Star className="w-5 h-5" /> },
    { value: "24h", label: "Délai intervention", icon: <Clock className="w-5 h-5" /> },
    { value: "500+", label: "Installations réalisées", icon: <UsersRound className="w-5 h-5" /> },
    { value: "Élite", label: "Certification équipe", icon: <Medal className="w-5 h-5" /> },
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
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Services élites
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-[0.9]">
              Nos <span className="text-yellow-500">Services</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Découvrez notre gamme complète de services premium pour vous 
              accompagner vers l'excellence, de l'installation à l'optimisation 
              de votre performance.
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
                Demander un devis VIP
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                variants={scaleIn}
                onClick={() => window.location.href = "/contact"}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all border border-white/10"
              >
                <Phone className="w-5 h-5" />
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Services premium
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Nos <span className="text-yellow-500">Services</span> Élites
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Une gamme complète de services premium pour optimiser votre expérience IRONZ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  {/* Service Header */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      
                      <Link href="/demande-devis">
                        <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest rounded-xl transition-all text-sm">
                          Demender un devis
                          <ArrowRight className="ml-2 w-4 h-4 inline" />
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
                Notre processus
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Excellence en <span className="text-yellow-500">4 Étapes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Un parcours d'accompagnement premium pour garantir votre satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-center relative z-10">
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

      {/* FAQ Section */}
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
              <MessageSquare className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                FAQ Premium
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Questions <span className="text-yellow-500">Fréquentes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur nos services premium
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-yellow-500/30 transition-colors"
                >
                  <h3 className="text-xl font-black uppercase italic mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                      <span className="text-sm font-black text-white">?</span>
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
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
              Prêt à accéder à l'excellence ?
            </h2>
            <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
              Contactez notre équipe d'experts pour des services premium sur mesure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis">
                <button className="px-8 py-6 bg-black hover:bg-gray-900 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3">
                  Demander un devis VIP
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-6 bg-white hover:bg-gray-100 text-black font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5" />
                  Nous contacter
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
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