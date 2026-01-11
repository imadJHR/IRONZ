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
  ArrowRight,
  Star,
  Play,
  X,
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
  Award,
  ShieldCheck,
  Globe,
  TargetIcon,
  PhoneCall,
  MailCheck,
  Flame,
  Zap,
  Home,
  Dumbbell,
  PenTool,
  Truck,
  Baby,
  Gamepad2,
  Puzzle,
  Rocket,
  Brain,
  Smile,
  Building,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import { Button } from "../../../components/ui/button";
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
      description: "Renforcement musculaire, amélioration de l'équilibre, de la coordination et de l'endurance.",
      icon: <Dumbbell className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Développement cognitif",
      description: "Stimulation de la concentration, de la résolution de problèmes et de la créativité.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Développement social",
      description: "Apprentissage du partage, de la coopération et du respect des règles à travers des activités de groupe.",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Développement émotionnel",
      description: "Renforcement de la confiance en soi, gestion du stress et développement de la résilience.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
    },
  ];

  const testimonials = [
    {
      name: "Marie Dupont",
      role: "Directrice, Centre de loisirs Les Petits Champions",
      quote: "L'espace fitness pour enfants conçu par IRONZ PRO a transformé notre centre. Les enfants adorent les parcours moteurs et les murs d'escalade.",
    },
    {
      name: "Thomas Martin",
      role: "Propriétaire, Salle de sport FamilyFit",
      quote: "Grâce à IRONZ PRO, nous avons pu créer un espace enfants dans notre salle qui attire de nombreuses familles.",
    },
    {
      name: "Sophie Leroy",
      role: "Directrice, École primaire Les Tournesols",
      quote: "Notre salle de motricité aménagée par IRONZ PRO est un véritable succès auprès des élèves.",
    },
  ];

  const solutions = {
    parcours: {
      title: "Parcours moteur",
      description: "Des parcours ludiques qui développent l'équilibre, la coordination et la motricité des enfants.",
      image: img1,
      features: [
        "Modules modulables et évolutifs",
        "Différents niveaux de difficulté",
        "Matériaux souples et sécurisés",
        "Thèmes variés et attractifs",
        "Installation professionnelle",
      ],
      icon: <Target className="w-10 h-10" />,
    },
    mur: {
      title: "Mur d'escalade",
      description: "Murs d'escalade adaptés aux enfants pour développer force et agilité en toute sécurité.",
      features: [
        "Prise ergonomiques pour petites mains",
        "Hauteurs adaptées par âge",
        "Système de sécurité intégré",
        "Thèmes ludiques et colorés",
      ],
      icon: <Gamepad2 className="w-10 h-10" />,
    },
    motricite: {
      title: "Salle de motricité",
      description: "Espaces complets pour le développement psychomoteur des jeunes enfants.",
      features: [
        "Équipements multi-activités",
        "Zones thématiques adaptées",
        "Sols amortissants certifiés",
        "Éclairage et ambiance douce",
      ],
      icon: <Rocket className="w-10 h-10" />,
    },
    sensoriel: {
      title: "Espace sensoriel",
      description: "Zones dédiées à l'éveil des sens et au développement perceptif.",
      features: [
        "Panels sensoriels variés",
        "Éclairages doux et colorés",
        "Sons et textures adaptés",
        "Zones de calme et détente",
      ],
      icon: <Puzzle className="w-10 h-10" />,
    },
  };

  const packages = [
    {
      name: "Espace Découverte",
      description: "Idéal pour initier les enfants à l'activité physique",
      icon: <Star className="h-10 w-10" />,
      features: [
        "Parcours moteur basique",
        "2-3 activités principales",
        "Revêtement de sol sécurisé",
        "Formation du personnel",
        "Garantie 2 ans",
      ],
      price: "À partir de 35,000 MAD",
      popular: false,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Espace Aventure",
      description: "Solution complète pour un développement optimal",
      icon: <Trophy className="h-10 w-10" />,
      features: [
        "Parcours complet + mur d'escalade",
        "5-7 activités variées",
        "Salle de motricité basique",
        "Design thématique personnalisé",
        "Formation complète du personnel",
      ],
      price: "À partir de 75,000 MAD",
      popular: true,
      color: "from-black to-yellow-500",
    },
    {
      name: "Espace Élite",
      description: "Centre premium pour un développement complet",
      icon: <Crown className="h-10 w-10" />,
      features: [
        "Toutes les zones d'activités",
        "10+ activités premium",
        "Espace sensoriel intégré",
        "Design personnalisé sur mesure",
        "Formation et suivi annuel",
      ],
      price: "À partir de 150,000 MAD",
      popular: false,
      color: "from-gray-900 to-yellow-600",
    },
  ];

  const stats = [
    { value: "100%", label: "Sécurité garantie", icon: <Shield className="w-5 h-5" /> },
    { value: "500+", label: "Enfants équipés", icon: <Baby className="w-5 h-5" /> },
    { value: "25", label: "Écoles partenaires", icon: <Building className="w-5 h-5" /> },
    { value: "5", label: "Ans d'expertise", icon: <Calendar className="w-5 h-5" /> },
  ];

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
                Espace enfant
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-[0.9]">
              Espace <span className="text-yellow-500">Enfance</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Créez des espaces fitness ludiques et sécurisés qui favorisent 
              le développement physique, cognitif et émotionnel des enfants.
            </p>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mb-10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut",
                      },
                    },
                  }}
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

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => window.location.href = "/demande-devis"}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all shadow-lg"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
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

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Solutions adaptées
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Des espaces <span className="text-yellow-500">adaptés</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Nous concevons et aménageons des espaces fitness spécialement 
                pensés pour les enfants, alliant sécurité, plaisir et développement.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInWhenVisible delay={0.1}>
              <div className="group h-full">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                    Sécurité & Confort
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Des espaces conçus avec des matériaux sécurisés et adaptés 
                    aux enfants, pour un environnement sans risque.
                  </p>

                  <ul className="space-y-3">
                    {["Revêtements de sol amortissants", "Équipements aux normes de sécurité", "Matériaux non toxiques"].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="group h-full">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                    Ludique & Éducatif
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Des espaces qui stimulent l'imagination et l'apprentissage 
                    tout en encourageant l'activité physique.
                  </p>

                  <ul className="space-y-3">
                    {["Parcours moteurs ludiques", "Jeux interactifs et éducatifs", "Zones thématiques adaptées"].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="group h-full">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                    Inclusif & Adapté
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Des espaces accessibles à tous les enfants, quelles que soient 
                    leurs capacités, pour favoriser l'inclusion.
                  </p>

                  <ul className="space-y-3">
                    {["Équipements adaptés à tous âges", "Accessibilité pour mobilité réduite", "Activités adaptées par niveau"].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Target className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Les bienfaits
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Développement <span className="text-yellow-500">complet</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez comment nos espaces fitness contribuent au 
                développement et au bien-être des enfants.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitItems.map((item, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.1}>
                <div className="group h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Nos solutions
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Espaces <span className="text-yellow-500">sur mesure</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Des solutions adaptées à chaque établissement et budget
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.1}>
                <div className="relative group h-full">
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
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Tabs Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Nos équipements
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Solutions <span className="text-yellow-500">détaillées</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez notre gamme complète d'équipements spécialement conçus pour les enfants
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {Object.keys(solutions).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-xl font-bold uppercase text-sm transition-all ${
                  activeTab === key
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
                }`}
              >
                {solutions[key].title}
              </button>
            ))}
          </div>

          <FadeInWhenVisible>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-96 md:h-full">
                  <Image
                    src={solutions[activeTab].image || "/placeholder.svg"}
                    alt={solutions[activeTab].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <h3 className="text-3xl font-black uppercase italic text-white">
                      {solutions[activeTab].title}
                    </h3>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                      {solutions[activeTab].icon}
                    </div>
                    <h3 className="text-2xl font-black uppercase italic text-gray-900 dark:text-white">
                      {solutions[activeTab].title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {solutions[activeTab].description}
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {solutions[activeTab].features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/demande-devis">
                    <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-6 py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
                      Demander un devis
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Témoignages
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Ils nous font <span className="text-yellow-500">confiance</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez ce que nos clients disent de nos espaces pour enfants
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                      <span className="text-lg font-black text-white">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-6 text-black">
                Créez un espace magique pour les enfants
              </h2>
              <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
                Transformez votre établissement en un lieu d'apprentissage, 
                de plaisir et de développement pour les enfants
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demande-devis">
                  <button className="px-8 py-6 bg-black hover:bg-gray-900 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3">
                    Demander un devis
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
            </div>
          </FadeInWhenVisible>
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