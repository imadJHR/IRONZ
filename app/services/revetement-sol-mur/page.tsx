"use client";

import React, { useState, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Heart, 
  Zap,
  Trophy,
  Crown,
  Package as PackageIcon,
  PenTool,
  Star
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";

// Imports d'images
import img1 from "../../../public/dalles.jpeg";
import img2 from "../../../public/pvc-optimized.webp";
import img3 from "../../../public/poly-optimized.webp";
import img4 from "../../../public/accou-optimized.webp";
import img5 from "../../../public/mir-optimized.webp";
import img6 from "../../../public/plan-optimized.webp";

// --- Interfaces ---

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://www.ironz.ma/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.ironz.ma/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Revêtement sol & mur",
        item: "https://www.ironz.ma/services/revetement-sol-mur",
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Revêtement de sol sportif au Maroc",
    serviceType: "Revêtement sol et mur sportif",
    provider: {
      "@type": "Organization",
      name: "IRONZ",
      url: "https://www.ironz.ma",
    },
    areaServed: "Maroc",
    url: "https://www.ironz.ma/services/revetement-sol-mur",
    description:
      "Service de revêtement de sol et mur sportif pour salles de sport, espaces fitness, home gyms et projets professionnels au Maroc.",
  };

  const projectSignals = [
    "Sol sportif",
    "Murs & protections",
    "Home gym",
    "Salle professionnelle",
  ];

  const materials: Material[] = [
    {
      id: "caoutchouc",
      name: "Dalles caoutchouc",
      description: "Haute densité pour zones de musculation et crossfit",
      image: img1,
      benefits: [
        "Solution adaptée aux zones de charges selon le projet",
        "Choix du format selon l'usage de la zone",
        "Mise en place étudiée selon la surface",
        "Convient aux espaces de musculation et de préparation physique",
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
        "Solution adaptée aux zones cardio et fitness",
        "Coloris à définir selon le projet",
        "Entretien à prévoir selon l'usage",
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
        "Solution à étudier pour espaces multifonctionnels",
        "Personnalisation graphique",
        "Choix technique à valider selon le support existant",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "acoustique",
      name: "Panneaux acoustiques",
      description: "Amélioration acoustique et esthétique",
      image: img4,
      benefits: [
        "Confort sonore à étudier selon la configuration",
        "Design personnalisable",
        "Installation simple",
        "Intégration possible dans les zones d'entraînement",
      ],
      color: "from-red-500 to-pink-500",
    },
    {
      id: "miroirs",
      name: "Miroirs de sécurité",
      description: "Sécurité et fonctionnalité pour salles de sport",
      image: img5,
      benefits: [
        "Choix du miroir selon l'usage et l'emplacement",
        "Installation professionnelle",
        "Dimensions sur mesure",
        "Adapté aux espaces coaching, fitness et musculation",
      ],
      color: "from-gray-500 to-blue-500",
    },
    {
      id: "mural",
      name: "Protections murales",
      description: "Protection des murs et amélioration esthétique",
      image: img6,
      benefits: [
        "Protection à définir selon les zones exposées",
        "Facile à nettoyer",
        "Personnalisation graphique",
        "Mise en place selon la configuration des murs",
      ],
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const benefits: Benefit[] = [
    {
      title: "Choix adapté",
      description: "Le revêtement se choisit selon l'usage de la zone, la surface disponible et les équipements prévus.",
      icon: <Shield className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Confort d'usage",
      description: "Les solutions proposées visent un espace plus lisible, pratique et confortable pour l'entraînement.",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Usage quotidien",
      description: "Chaque matériau doit être choisi selon le passage, les charges et le niveau de sollicitation prévu.",
      icon: <Heart className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Esthétique personnalisée",
      description: "Les couleurs, finitions et protections murales peuvent être étudiées selon l'identité du projet.",
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
        "Pose selon la surface",
        "Choix adapté aux petits espaces",
        "Conseils d'entretien selon l'usage",
        "Couleurs standards",
      ],
      price: "Sur devis",
      popular: false,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Revêtement Premium",
      description: "Solution complète pour salles professionnelles",
      icon: <Trophy className="h-10 w-10" />,
      features: [
        "Matériaux adaptés au projet",
        "Installation professionnelle",
        "Personnalisation des couleurs",
        "Coordination avec l'aménagement de la salle",
        "Conseils d'usage et d'entretien",
      ],
      price: "Selon la surface et le matériau",
      popular: true,
      color: "from-black to-yellow-500",
    },
    {
      name: "Revêtement Élite",
      description: "Solution sur mesure pour projets haut de gamme",
      icon: <Crown className="h-10 w-10" />,
      features: [
        "Combinaison de solutions selon les zones",
        "Design personnalisé complet",
        "Préparation avec les contraintes du projet",
        "Coordination avec les équipements",
        "Devis détaillé après échange",
      ],
      price: "Sur devis",
      popular: false,
      color: "from-gray-900 to-yellow-600",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative container mx-auto px-4">
          <nav aria-label="Fil d'Ariane" className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium text-gray-400">
            <Link href="/" className="hover:text-yellow-500 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-yellow-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-yellow-500" aria-current="page">
              Revêtement sol & mur
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
                Revêtements
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-wide mb-6 text-white leading-[0.9]">
              Revêtement de sol sportif pour salle de sport au Maroc
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              IRONZ accompagne les projets de revêtement de sol et de mur pour les salles de sport, espaces fitness, home gyms et salles professionnelles. Le choix entre dalles caoutchouc, PVC sportif, résine polyuréthane, protections murales, panneaux acoustiques ou miroirs dépend de la surface, de l&apos;usage prévu et des équipements installés.
            </p>

            <p className="text-base md:text-lg text-gray-400 mb-10 max-w-3xl leading-relaxed">
              Pour intégrer le sol dans un projet complet, consultez aussi notre service d&apos;
              <Link href="/services/amenagement-salle" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4">
                aménagement de salle de sport
              </Link>
              . Vous pouvez demander un devis ou contacter l&apos;équipe IRONZ sur WhatsApp avec la surface, la ville et le type d&apos;espace à équiper.
            </p>

            {/* Project signals */}
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
              {projectSignals.map((signal, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 text-center"
                >
                  <span className="text-xs md:text-sm font-display uppercase tracking-widest text-gray-300">
                    {signal}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demande-devis?service=revetement-sol-mur">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all shadow-lg"
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <motion.a
                href="https://wa.me/212674114446"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all border border-white/10"
              >
                <IoLogoWhatsapp className="w-5 h-5" />
                WhatsApp Direct
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use cases Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <span className="text-sm font-display uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                  Usage & projet
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
                Quel revêtement pour <span className="text-yellow-500">quel espace ?</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Le revêtement n&apos;a pas le même rôle dans une zone de poids libres, une zone cardio, un home gym ou une salle professionnelle. L&apos;objectif est de choisir une solution cohérente avec l&apos;usage, les équipements et la circulation dans l&apos;espace.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Zones poids libres",
                text: "Prévoir un sol adapté aux haltères, disques et charges selon l'intensité d'utilisation.",
                href: "/categories/accessoires/poids-libres",
                label: "Voir les poids libres",
              },
              {
                title: "Cardio & machines",
                text: "Tenir compte des machines, du passage et de l'organisation de la zone cardio.",
                href: "/categories/equipements/machine-de-fitness",
                label: "Voir les machines",
              },
              {
                title: "Home gym",
                text: "Adapter le choix du sol à une surface privée, au bruit, à l'espace disponible et aux équipements choisis.",
                href: "/services/amenagement-salle/home-gym",
                label: "Home gym",
              },
              {
                title: "Salle professionnelle",
                text: "Préparer les zones de travail, la circulation et la cohérence avec l'aménagement global.",
                href: "/services/amenagement-salle/salle-professionnelle",
                label: "Salle professionnelle",
              },
              {
                title: "Murs & protections",
                text: "Intégrer protections murales, panneaux ou miroirs selon les contraintes du lieu.",
                href: "/categories/equipements",
                label: "Voir les équipements",
              },
            ].map((item) => (
              <FadeInWhenVisible key={item.title}>
                <div className="h-full rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
                  <h3 className="text-lg font-display uppercase tracking-wide text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{item.text}</p>
                  <Link href={item.href} className="text-sm font-display uppercase tracking-widest text-yellow-600 dark:text-yellow-400 hover:text-yellow-500">
                    {item.label}
                  </Link>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
                  Nos revêtements
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
                Types de <span className="text-yellow-500">revêtements</span>
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {materials.map((material) => (
              <button
                key={material.id}
                onClick={() => setActiveMaterial(material.id)}
                className={`px-6 py-3 rounded-xl font-display uppercase tracking-widest text-sm transition-all ${
                  activeMaterial === material.id
                    ? "bg-yellow-500 text-black shadow-lg"
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
                        <h3 className="text-3xl font-display uppercase tracking-wide text-white">{material.name}</h3>
                      </div>
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-black">
                          <PackageIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-display uppercase tracking-wide text-gray-900 dark:text-white">{material.name}</h3>
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
                      <Link href="/demande-devis?service=revetement-sol-mur" className="w-full">
                        <button className="w-full bg-yellow-500 text-black font-display uppercase tracking-widest px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
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
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center mb-6 text-black">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-display uppercase tracking-wide mb-4 text-gray-900 dark:text-white">{benefit.title}</h3>
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
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
                Offres <span className="text-yellow-500">sur mesure</span>
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPackages.map((pkg, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.1}>
                <div className={`relative h-full bg-yellow-500 rounded-3xl p-0.5 ${pkg.popular ? 'scale-105 z-10' : ''}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-[1.25rem] p-8 h-full flex flex-col">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center mx-auto mb-4 text-black">
                        {pkg.icon}
                      </div>
                      <h3 className="text-2xl font-display uppercase tracking-wide text-gray-900 dark:text-white">{pkg.name}</h3>
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
                      <div className="text-2xl font-display tracking-wide text-gray-900 dark:text-white mb-6">{pkg.price}</div>
                      <Link href="/demande-devis?service=revetement-sol-mur" className="block w-full py-4 bg-yellow-500 text-black font-display uppercase tracking-wide rounded-xl text-center">
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

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeInWhenVisible>
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                  <span className="text-sm font-display uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                    Méthode
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
                  Préparer le <span className="text-yellow-500">devis</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  Le choix du revêtement se prépare avec le contexte du projet. Pour une salle complète, le sol peut être étudié avec les machines, les zones de poids libres, la circulation et les finitions murales.
                </p>
                <Link href="/services/amenagement-salle" className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-display uppercase tracking-widest hover:text-yellow-500">
                  Voir l&apos;aménagement complet
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInWhenVisible>

            <div className="space-y-6">
              {[
                ["01", "Compréhension du projet", "Type d'espace, ville, surface approximative et usage principal."],
                ["02", "Choix de la solution", "Sélection du matériau selon les zones : poids libres, cardio, machines, murs ou miroirs."],
                ["03", "Devis", "Préparation d'une proposition selon la surface, le matériau et les contraintes du lieu."],
                ["04", "Mise en place", "Installation ou coordination selon la solution retenue et le périmètre validé."],
              ].map(([number, title, text]) => (
                <FadeInWhenVisible key={number}>
                  <div className="flex gap-5 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-500 text-black font-display tracking-wide">
                      {number}
                    </div>
                    <div>
                      <h3 className="text-xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-2">{title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>

          <FadeInWhenVisible>
            <div className="mt-12 rounded-3xl bg-gray-900 text-white p-8 md:p-10">
              <h3 className="text-2xl font-display uppercase tracking-wide mb-4">Informations utiles à envoyer</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Pour accélérer l&apos;échange, préparez si possible la surface approximative, la ville, le type d&apos;espace, l&apos;usage principal, quelques photos ou un plan, et le délai souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demande-devis?service=revetement-sol-mur" className="px-6 py-4 bg-yellow-500 text-black font-display uppercase tracking-wide rounded-xl text-center">
                  Demander un devis
                </Link>
                <a
                  href="https://wa.me/212674114446"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-white/10 text-white font-display uppercase tracking-wide rounded-xl border border-white/10 flex items-center justify-center gap-3"
                >
                  <IoLogoWhatsapp className="w-5 h-5" /> WhatsApp Direct
                </a>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <FadeInWhenVisible>
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-black">
              Transformez votre espace dès maintenant
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis?service=revetement-sol-mur" className="px-8 py-6 bg-black text-white font-display uppercase tracking-wide rounded-2xl flex items-center gap-3">
                Demander un devis <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/212674114446"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-6 bg-white text-black font-display uppercase tracking-wide rounded-2xl flex items-center gap-3"
              >
                <IoLogoWhatsapp className="w-6 h-6" /> WhatsApp Direct
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/212674114446"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center"
        >
          <IoLogoWhatsapp className="w-7 h-7" />
        </a>
      </motion.div>
    </main>
  );
}
