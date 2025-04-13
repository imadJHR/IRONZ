"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Heart,
  Shield,
  Users,
  Send,
  ArrowRight,
  Star,
  Play,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Marquee, MarqueeItem } from "@/components/ui/marquee";

const FadeInWhenVisible = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function EspaceEnfanceClientPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("parcours");

  const benefitItems = [
    {
      title: "Développement physique",
      description:
        "Renforcement musculaire, amélioration de l'équilibre, de la coordination et de l'endurance.",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Développement cognitif",
      description:
        "Stimulation de la concentration, de la résolution de problèmes et de la créativité.",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: "Développement social",
      description:
        "Apprentissage du partage, de la coopération et du respect des règles à travers des activités de groupe.",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Développement émotionnel",
      description:
        "Renforcement de la confiance en soi, gestion du stress et développement de la résilience.",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      name: "Marie Dupont",
      role: "Directrice, Centre de loisirs Les Petits Champions",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "L'espace fitness pour enfants conçu par IRONZ PRO a transformé notre centre. Les enfants adorent les parcours moteurs et les murs d'escalade. Nous avons constaté une amélioration significative de leur condition physique et de leur enthousiasme pour l'activité physique.",
    },
    {
      name: "Thomas Martin",
      role: "Propriétaire, Salle de sport FamilyFit",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "Grâce à IRONZ PRO, nous avons pu créer un espace enfants dans notre salle de sport qui attire de nombreuses familles. Les parents peuvent s'entraîner pendant que leurs enfants s'amusent dans un environnement sécurisé et stimulant. Un vrai plus pour notre business!",
    },
    {
      name: "Sophie Leroy",
      role: "Directrice, École primaire Les Tournesols",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "Notre salle de motricité aménagée par IRONZ PRO est un véritable succès auprès des élèves. Les équipements sont parfaitement adaptés à leurs besoins et respectent toutes les normes de sécurité. Un investissement qui a vraiment amélioré la qualité de nos activités physiques.",
    },
    {
      name: "Jean Moreau",
      role: "Responsable, Centre de rééducation pédiatrique",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "Les équipements adaptés fournis par IRONZ PRO ont considérablement amélioré nos séances de rééducation. Les enfants sont plus motivés et les résultats sont visibles plus rapidement. Un partenaire de confiance pour notre établissement.",
    },
  ];

  const solutions = {
    parcours: {
      title: "Parcours moteur",
      description:
        "Des parcours ludiques qui développent l'équilibre, la coordination et la motricité des enfants.",
      image: "/placeholder.svg?height=400&width=600&text=Parcours+moteur",
      features: [
        "Modules modulables et évolutifs",
        "Différents niveaux de difficulté",
        "Matériaux souples et sécurisés",
      ],
    },
    minigym: {
      title: "Mini gym",
      description:
        "Des équipements de fitness adaptés à la morphologie et aux capacités des enfants.",
      image: "/placeholder.svg?height=400&width=600&text=Mini+gym",
      features: [
        "Appareils cardio taille enfant",
        "Poids et résistances adaptés",
        "Design coloré et attrayant",
      ],
    },
    escalade: {
      title: "Murs d'escalade",
      description:
        "Des structures d'escalade sécurisées qui développent la force, la coordination et la confiance en soi.",
      image: "/placeholder.svg?height=400&width=600&text=Murs+d'escalade",
      features: [
        "Hauteurs adaptées aux enfants",
        "Prises colorées et thématiques",
        "Matelas de réception sécurisés",
      ],
    },
    interactif: {
      title: "Zones interactives",
      description:
        "Des espaces qui combinent technologie et activité physique pour une expérience immersive et motivante.",
      image: "/placeholder.svg?height=400&width=600&text=Zones+interactives",
      features: [
        "Jeux vidéo actifs",
        "Sols et murs interactifs",
        "Défis et récompenses virtuels",
      ],
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/placeholder.svg?height=1200&width=2000"
            alt="Espace enfance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux services
          </Link>

          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            >
              Espace <span className="gradient-text">Enfance</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Créez des espaces fitness ludiques et sécurisés pour les enfants,
              favorisant leur développement physique et leur bien-être.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6 btn-3d">
                Demander un devis
              </Button>
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-medium text-lg px-8 py-6"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" /> Voir notre vidéo
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Animated shapes */}
        <motion.div
          className="absolute right-10 bottom-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blob"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute right-40 top-40 w-16 h-16 bg-yellow-400 rounded-full opacity-10 blob"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -left-20 top-20 w-40 h-40 bg-yellow-200 dark:bg-yellow-900/20 rounded-full opacity-30 blob" />
        <div className="absolute right-10 bottom-10 w-60 h-60 bg-yellow-200 dark:bg-yellow-900/20 rounded-full opacity-20 blob" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInWhenVisible>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Des espaces fitness{" "}
                <span className="gradient-text">adaptés aux enfants</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Nous concevons et aménageons des espaces fitness spécialement
                pensés pour les enfants, alliant sécurité, plaisir et
                développement moteur.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInWhenVisible delay={0.1}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-b-4 border-transparent hover:border-yellow-400">
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6 animate-pulse-glow">
                  <Shield className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Sécurité & Confort
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Des espaces conçus avec des matériaux sécurisés et adaptés aux
                  enfants, pour un environnement sans risque.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Revêtements de sol amortissants
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Équipements aux normes de sécurité
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Matériaux non toxiques et hypoallergéniques
                    </span>
                  </li>
                </ul>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-b-4 border-transparent hover:border-yellow-400">
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6 animate-pulse-glow">
                  <Heart className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Ludique & Éducatif
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Des espaces qui stimulent l'imagination et l'apprentissage
                  tout en encourageant l'activité physique.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Parcours moteurs ludiques
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Jeux interactifs et éducatifs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Zones thématiques adaptées aux âges
                    </span>
                  </li>
                </ul>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-b-4 border-transparent hover:border-yellow-400">
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6 animate-pulse-glow">
                  <Users className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Inclusif & Adapté
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Des espaces accessibles à tous les enfants, quelles que soient
                  leurs capacités, pour favoriser l'inclusion.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Équipements adaptés à tous les âges
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Accessibilité pour enfants à mobilité réduite
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Activités adaptées à différents niveaux
                    </span>
                  </li>
                </ul>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Interactive Solutions Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Nos <span className="gradient-text">solutions</span> pour les
                enfants
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Découvrez notre gamme complète d'équipements et d'aménagements
                spécialement conçus pour les enfants.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {Object.keys(solutions).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === key
                    ? "bg-yellow-400 text-black shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
                }`}
              >
                {solutions[key].title}
              </button>
            ))}
          </div>

          <FadeInWhenVisible>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full overflow-hidden">
                  <Image
                    src={solutions[activeTab].image || "/placeholder.svg"}
                    alt={solutions[activeTab].title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-heading font-bold text-white mb-2">
                        {solutions[activeTab].title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    {solutions[activeTab].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {solutions[activeTab].description}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {solutions[activeTab].features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-1 mr-3 flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button className="self-start bg-yellow-400 hover:bg-yellow-500 text-black btn-3d">
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-yellow-400 text-black overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-center text-3xl md:text-4xl font-heading font-bold">
            Nos partenaires font confiance à IRONZ PRO
          </h2>
        </div>
        <Marquee speed={40}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <MarqueeItem key={item} className="mx-8">
              <div className="bg-white rounded-lg shadow-md p-4 w-40 h-20 flex items-center justify-center">
                <Image
                  src={`/placeholder.svg?height=80&width=160&text=Partenaire+${item}`}
                  alt={`Partenaire ${item}`}
                  width={160}
                  height={80}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </MarqueeItem>
          ))}
        </Marquee>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute -right-20 top-20 w-40 h-40 bg-yellow-200 dark:bg-yellow-900/20 rounded-full opacity-30 blob" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInWhenVisible>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Les <span className="gradient-text">bienfaits</span> pour les
                enfants
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Découvrez comment nos espaces fitness contribuent au
                développement et au bien-être des enfants.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-fade-in">
            {benefitItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 relative overflow-hidden shine"
              >
                <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4 animate-float">
                  {item.icon}
                </div>
                <h3 className="text-lg font-heading font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ce que <span className="gradient-text">disent</span> nos clients
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Découvrez les témoignages de nos clients qui ont fait confiance
                à IRONZ PRO pour l'aménagement de leurs espaces enfance.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 relative">
                  <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                    <div className="text-8xl text-yellow-200 dark:text-yellow-900/20 font-serif">
                      "
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-yellow-400"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4 relative z-10">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-yellow-50 to-white dark:from-gray-950 dark:to-gray-900 -z-10" />
        <div className="absolute -left-20 bottom-20 w-40 h-40 bg-yellow-200 dark:bg-yellow-900/20 rounded-full opacity-30 blob" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <FadeInWhenVisible>
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                    Prêt à créer un{" "}
                    <span className="gradient-text">espace fitness</span> pour
                    enfants?
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Contactez-nous dès aujourd'hui pour discuter de votre
                    projet. Notre équipe d'experts vous accompagnera à chaque
                    étape, de la conception à la réalisation.
                  </p>
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0 animate-pulse-glow">
                        <svg
                          className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
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
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Téléphone</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          +33 (0)1 23 45 67 89
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0 animate-pulse-glow">
                        <svg
                          className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Email</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          contact@ironzpro.fr
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0 animate-pulse-glow">
                        <svg
                          className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Adresse</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          123 Avenue des Sports, 75001 Paris, France
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border-t-4 border-yellow-400">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    Contactez-nous
                  </h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Nom
                        </label>
                        <Input
                          id="name"
                          placeholder="Votre nom"
                          className="w-full border-gray-300 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Votre email"
                          className="w-full border-gray-300 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Sujet
                      </label>
                      <Input
                        id="subject"
                        placeholder="Sujet de votre message"
                        className="w-full border-gray-300 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Votre message"
                        className="w-full min-h-[150px] border-gray-300 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400"
                      />
                    </div>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium btn-3d">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-yellow-400 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-10" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-yellow-300 rounded-full opacity-20 blob" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black"
            >
              Transformez votre espace en un lieu d'apprentissage et de plaisir
              pour les enfants
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-black/80 mb-8 max-w-3xl mx-auto"
            >
              Nos experts sont prêts à vous accompagner dans la création d'un
              espace fitness adapté aux enfants, alliant sécurité, plaisir et
              développement.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button className="bg-black hover:bg-gray-800 text-white font-medium text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all">
                Commencer votre projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">IRONZ PRO</h3>
              <p className="text-gray-400 mb-6">
                Spécialiste de l'aménagement d'espaces fitness professionnels et
                adaptés à tous les publics.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/amenagement-salle"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Aménagement de salle
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/conception-produits"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Conception de produits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/espace-enfance"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Espace enfance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/revetement-sol-mur"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Revêtement sol & mur
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Liens utiles</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/a-propos"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/produits"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Produits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Catégories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/promotions"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Promotions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-3 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-400">
                    123 Avenue des Sports, 75001 Paris, France
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-3 mt-0.5"
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
                  <span className="text-gray-400">+33 (0)1 23 45 67 89</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-3 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-400">contact@ironzpro.fr</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} IRONZ PRO. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white rounded-full p-2 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="IRONZ PRO - Espace Enfance"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
