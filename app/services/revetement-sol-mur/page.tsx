"use client";

import React, { useState, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Heart, 
  Zap,
  Sparkles,
  Trophy,
  Crown,
  Target,
  Package as PackageIcon,
  Home,
  PenTool,
  Calendar,
  Star
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";

// Imports d'images
import img1 from "../../../public/dalles.jpeg";
import img2 from "../../../public/pvc.png";
import img3 from "../../../public/poly.png";
import img4 from "../../../public/accou.jpeg";
import img5 from "../../../public/mir.jpeg";
import img6 from "../../../public/plan.png";

// --- Interfaces ---

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
}

interface Stat {
  value: string;
  label: string;
  icon: ReactNode;
}

interface Material {
  id: string;
  name: string;
  description: string;
  image: StaticImageData | string;
  benefits: string[];
  color: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}

interface PricingPackage {
  name: string;
  description: string;
  icon: ReactNode;
  features: string[];
  price: string;
  popular: boolean;
  color: string;
}

// --- Composant de transition ---

const FadeInWhenVisible = ({ children, delay = 0 }: FadeInWhenVisibleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default function RevetementSolMurPage() {
  const [activeMaterial, setActiveMaterial] = useState<string>("caoutchouc");

  const stats: Stat[] = [
    { value: "100%", label: "Sécurité garantie", icon: <Shield className="w-5 h-5" /> },
    { value: "500+", label: "Projets réalisés", icon: <Home className="w-5 h-5" /> },
    { value: "25", label: "Types de revêtements", icon: <PackageIcon className="w-5 h-5" /> },
    { value: "5", label: "Ans de garantie", icon: <Calendar className="w-5 h-5" /> },
  ];

  const materials: Material[] = [
    {
      id: "caoutchouc",
      name: "Dalles caoutchouc",
      description: "Haute densité pour zones de musculation et crossfit",
      image: img1,
      benefits: [
        "Épaisseurs de 10 à 40mm",
        "Résistant aux impacts lourds",
        "Installation facile et rapide",
        "Absorption acoustique optimale",
      ],
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "pvc",
      name: "PVC sportif",
      description: "Parfait pour zones cardio et fitness",
      image: img2,
      benefits: [
        "Surface antidérapante",
        "Résistant à l'usure et aux UV",
        "Large choix de coloris",
        "Facile d'entretien",
      ],
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "polyurethane",
      name: "Résine polyuréthane",
      description: "Solution haut de gamme pour espaces multifonctionnels",
      image: img3,
      benefits: [
        "Surface sans joint",
        "Absorption acoustique exceptionnelle",
        "Personnalisation graphique",
        "Très haute durabilité",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "acoustique",
      name: "Panneaux acoustiques",
      description: "Amélioration acoustique et esthétique",
      image: img4,
      benefits: [
        "Réduction significative du bruit",
        "Design personnalisable",
        "Installation simple",
        "Isolation thermique",
      ],
      color: "from-red-500 to-pink-500",
    },
    {
      id: "miroirs",
      name: "Miroirs de sécurité",
      description: "Sécurité et fonctionnalité pour salles de sport",
      image: img5,
      benefits: [
        "Verre anti-bris sécurisé",
        "Installation professionnelle",
        "Dimensions sur mesure",
        "Traitement anti-buée",
      ],
      color: "from-gray-500 to-blue-500",
    },
    {
      id: "mural",
      name: "Protections murales",
      description: "Protection des murs et amélioration esthétique",
      image: img6,
      benefits: [
        "Résistance aux chocs",
        "Facile à nettoyer",
        "Personnalisation graphique",
        "Installation rapide",
      ],
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const benefits: Benefit[] = [
    {
      title: "Sécurité optimale",
      description: "Nos revêtements minimisent les risques de blessures et offrent une sécurité maximale.",
      icon: <Shield className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Performance accrue",
      description: "Surfaces adaptées pour optimiser les performances et le confort des sportifs.",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Durabilité exceptionnelle",
      description: "Matériaux haute qualité pour une résistance maximale à l'usure et aux impacts.",
      icon: <Heart className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Esthétique personnalisée",
      description: "Large gamme de couleurs et options de personnalisation pour votre espace.",
      icon: <PenTool className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
    },
  ];

  const pricingPackages: PricingPackage[] = [
    {
      name: "Revêtement Standard",
      description: "Solution économique pour petits espaces",
      icon: <Star className="h-10 w-10" />,
      features: [
        "Dalles caoutchouc standard",
        "Installation basique",
        "Garantie 2 ans",
        "Entretien limité",
        "Couleurs standards",
      ],
      price: "À partir de 150 MAD/m²",
      popular: false,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Revêtement Premium",
      description: "Solution complète pour salles professionnelles",
      icon: <Trophy className="h-10 w-10" />,
      features: [
        "Matériaux premium au choix",
        "Installation professionnelle",
        "Personnalisation des couleurs",
        "Garantie 5 ans",
        "Entretien inclus 1 an",
      ],
      price: "À partir de 300 MAD/m²",
      popular: true,
      color: "from-black to-yellow-500",
    },
    {
      name: "Revêtement Élite",
      description: "Solution sur mesure pour projets haut de gamme",
      icon: <Crown className="h-10 w-10" />,
      features: [
        "Matériaux premium combinés",
        "Design personnalisé complet",
        "Installation VIP",
        "Garantie 7 ans",
        "Maintenance 3 ans incluse",
      ],
      price: "Sur devis personnalisé",
      popular: false,
      color: "from-gray-900 to-yellow-600",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative container mx-auto px-4">
          <nav className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-yellow-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux services
            </Link>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Revêtements
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-[0.9]">
              Revêtement <span className="text-yellow-500">Sol & Mur</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Solutions professionnelles de revêtement pour optimiser la sécurité, 
              la performance et l&apos;esthétique de votre espace fitness.
            </p>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mb-10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2 text-yellow-500">
                    {stat.icon}
                    <span className="text-3xl md:text-4xl font-black">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demande-devis">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all shadow-lg"
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => window.open('https://wa.me/212674114446', '_blank')}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all border border-white/10"
              >
                <IoLogoWhatsapp className="w-5 h-5" />
                WhatsApp Direct
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <PackageIcon className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Nos revêtements
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Types de <span className="text-yellow-500">revêtements</span>
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {materials.map((material) => (
              <button
                key={material.id}
                onClick={() => setActiveMaterial(material.id)}
                className={`px-6 py-3 rounded-xl font-bold uppercase text-sm transition-all ${
                  activeMaterial === material.id
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
                }`}
              >
                {material.name}
              </button>
            ))}
          </div>

          <FadeInWhenVisible>
            {materials.map((material) => (
              activeMaterial === material.id && (
                <div key={material.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-80 lg:h-auto">
                      <Image src={material.image} alt={material.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <h3 className="text-3xl font-black uppercase italic text-white">{material.name}</h3>
                      </div>
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${material.color} flex items-center justify-center text-white`}>
                          <PackageIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic text-gray-900 dark:text-white">{material.name}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{material.description}</p>
                      <ul className="space-y-4 mb-8">
                        {material.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/demande-devis" className="w-full">
                        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black uppercase italic tracking-widest px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                          Demander un devis
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            ))}
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Benefits Cards Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 text-white`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Offres <span className="text-yellow-500">sur mesure</span>
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPackages.map((pkg, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.1}>
                <div className={`relative h-full bg-gradient-to-br ${pkg.color} rounded-3xl p-0.5 ${pkg.popular ? 'scale-105 z-10' : ''}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-[1.25rem] p-8 h-full flex flex-col">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4 text-white">
                        {pkg.icon}
                      </div>
                      <h3 className="text-2xl font-black uppercase italic text-gray-900 dark:text-white">{pkg.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{pkg.description}</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-grow">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-center pt-6 border-t dark:border-gray-700">
                      <div className="text-2xl font-black text-gray-900 dark:text-white mb-6">{pkg.price}</div>
                      <Link href="/demande-devis" className="block w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black uppercase italic rounded-xl text-center">
                        Choisir cette offre
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <FadeInWhenVisible>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-6 text-black">
              Transformez votre espace dès maintenant
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis" className="px-8 py-6 bg-black text-white font-black uppercase italic rounded-2xl flex items-center gap-3">
                Demander un devis <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => window.open('https://wa.me/212674114446', '_blank')}
                className="px-8 py-6 bg-white text-black font-black uppercase italic rounded-2xl flex items-center gap-3"
              >
                <IoLogoWhatsapp className="w-6 h-6" /> WhatsApp Direct
              </button>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.open(`https://wa.me/212674114446`, '_blank')}
          className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center"
        >
          <IoLogoWhatsapp className="w-7 h-7" />
        </button>
      </motion.div>
    </main>
  );
}