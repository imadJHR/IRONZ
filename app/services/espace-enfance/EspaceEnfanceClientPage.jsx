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
import img1 from "../../../public/enfant1.webp";

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
      image: img1,
      features: [
        "Modules modulables et évolutifs",
        "Différents niveaux de difficulté",
        "Matériaux souples et sécurisés",
      ],
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={img1}
            alt="Espace enfance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 " />
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
              <Link href="/demande-devis">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6 btn-3d">
                  Demander un devis
                </Button>
              </Link>
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
              <h2 className="text-3xl text-yellow-400 md:text-4xl font-heading font-bold mb-6">
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
              <h2 className="text-3xl text-yellow-400 md:text-4xl font-heading font-bold mb-6">
                Nos <span className="gradient-text ">solutions</span> pour les
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
                  <Link href="/demande-devis">
                    <Button className="self-start bg-yellow-400 hover:bg-yellow-500 text-black btn-3d">
                      Ddemander un devis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute -right-20 top-20 w-40 h-40 bg-yellow-200 dark:bg-yellow-900/20 rounded-full opacity-30 blob" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInWhenVisible>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl text-yellow-400 font-heading font-bold mb-6">
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
              <Link href="/demande-devis">
                <Button className="bg-black hover:bg-gray-800 text-white font-medium text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all">
                  Commencer votre projet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

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
