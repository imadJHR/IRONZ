"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Palette,
  Scissors,
  Package,
  Shield,
  Heart,
  Sparkles,
  Target,
  Trophy,
  Crown,
  Star,
  Users,
  Zap,
  Globe,
  TargetIcon,
  PhoneCall,
  MailCheck,
  Flame,
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
  Calendar,
  MapPin,
  MessageSquare,
  ChevronRight,
  UsersRound,
  Award,
  ShieldCheck,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import logo from "../../../public/logo.png";
import img1 from "../../../public/acce1.jpeg";
import img2 from "../../../public/acce2.jpeg";
import img3 from "../../../public/acce3.jpeg";

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

export default function PersonnalisationAccessoiresPage() {
  const [activeTab, setActiveTab] = useState("gants");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [videoPlaying]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const accessoryTypes = [
    { id: "gants", name: "Gants d'entraînement" },
    { id: "ceintures", name: "Ceintures fitness" },
    { id: "sangles", name: "Sangles de levage" },
    { id: "genouilleres", name: "Genouillères" },
    { id: "wallball", name: "Wall Ball" },
    { id: "boxjump", name: "Box Jump" },
    { id: "powerbag", name: "Power Bag" },
    { id: "sacbulgare", name: "Sac Bulgare" },
    { id: "accessoires", name: "Autres accessoires" },
  ];

  const stats = [
    { value: "100%", label: "Sur mesure", icon: <Target className="w-5 h-5" /> },
    { value: "500+", label: "Accessoires créés", icon: <Package className="w-5 h-5" /> },
    { value: "50", label: "Matériaux disponibles", icon: <Palette className="w-5 h-5" /> },
    { value: "24h", label: "Devis rapide", icon: <Zap className="w-5 h-5" /> },
  ];

  const customizationOptions = [
    {
      title: "Matériaux premium",
      description:
        "Choisissez parmi une sélection de cuirs, tissus techniques et matériaux innovants pour des performances optimales.",
      image: img1,
      icon: <Shield className="h-8 w-8" />,
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Couleurs & motifs",
      description:
        "Personnalisez les couleurs, ajoutez des motifs ou votre logo pour un style unique qui vous représente.",
      image: img2,
      icon: <Palette className="h-8 w-8" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Ajustement sur mesure",
      description:
        "Adaptez parfaitement l'accessoire à votre morphologie pour un confort et des performances optimales.",
      image: img3,
      icon: <Heart className="h-8 w-8" />,
      color: "from-red-500 to-pink-500",
    },
  ];

  const processSteps = [
    {
      title: "Conception",
      description:
        "Nous définissons ensemble vos besoins spécifiques et créons un design qui correspond à vos attentes esthétiques et fonctionnelles.",
      icon: <Palette />,
      features: [
        "Consultation personnalisée",
        "Choix des matériaux et options",
        "Création de maquettes 3D",
      ],
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Fabrication",
      description:
        "Nos artisans qualifiés fabriquent votre accessoire sur mesure en utilisant des techniques de production avancées et des matériaux premium.",
      icon: <Scissors />,
      features: [
        "Sélection minutieuse des matériaux",
        "Fabrication artisanale de précision",
        "Contrôle qualité rigoureux",
      ],
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Livraison",
      description:
        "Votre accessoire personnalisé est soigneusement emballé et livré directement à votre porte, prêt à être utilisé pour vos entraînements.",
      icon: <Package />,
      features: [
        "Emballage premium éco-responsable",
        "Livraison rapide et sécurisée",
        "Suivi en temps réel",
      ],
      color: "from-green-500 to-emerald-500",
    },
  ];

  const packages = [
    {
      name: "Personnalisation Standard",
      description: "Idéal pour une personnalisation basique",
      icon: <Star className="h-10 w-10" />,
      features: [
        "Choix des couleurs principales",
        "Gravure de logo simple",
        "Matériaux standards",
        "Livraison standard",
        "Garantie 1 an",
      ],
      price: "À partir de 150 MAD",
      popular: false,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Personnalisation Premium",
      description: "Solution complète pour une personnalisation avancée",
      icon: <Trophy className="h-10 w-10" />,
      features: [
        "Personnalisation complète des couleurs",
        "Gravure logo détaillée + texte",
        "Matériaux premium au choix",
        "Ajustement sur mesure",
        "Livraison express",
      ],
      price: "À partir de 300 MAD",
      popular: true,
      color: "from-black to-yellow-500",
    },
    {
      name: "Personnalisation Élite",
      description: "Solution sur mesure pour professionnels et athlètes",
      icon: <Crown className="h-10 w-10" />,
      features: [
        "Design entièrement personnalisé",
        "Combinaison de matériaux premium",
        "Broderies complexes",
        "Consultation design dédiée",
        "Garantie à vie",
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
                Personnalisation
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-[0.9]">
              Accessoires <span className="text-yellow-500">Sur Mesure</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Créez des accessoires fitness uniques qui reflètent votre identité 
              et améliorent vos performances avec notre service de personnalisation premium.
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
                onClick={() => document.getElementById("explorer").scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl transition-all shadow-lg hover:shadow-xl"
              >
                Explorer nos options
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

      {/* Products Section */}
      <section
        id="explorer"
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
        ref={sectionRef}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Package className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Nos produits
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Personnalisez vos <span className="text-yellow-500">accessoires</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez notre gamme d'accessoires entièrement personnalisables 
                pour améliorer vos performances et affirmer votre style.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 pb-4">
            {accessoryTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`px-6 py-3 rounded-xl font-bold uppercase text-sm transition-all ${
                  activeTab === type.id
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInWhenVisible>
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                  <span className="text-sm font-bold uppercase italic tracking-wider text-yellow-500">
                    {activeTab === "gants" && "Protection & Performance"}
                    {activeTab === "ceintures" && "Support & Stabilité"}
                    {activeTab === "sangles" && "Grip & Sécurité"}
                    {activeTab === "genouilleres" && "Protection Articulaire"}
                    {activeTab === "wallball" && "Entraînement Fonctionnel"}
                    {activeTab === "boxjump" && "Entraînement Pliométrique"}
                    {activeTab === "powerbag" && "Force & Conditionnement"}
                    {activeTab === "sacbulgare" && "Force & Puissance"}
                    {activeTab === "accessoires" && "Équipement Spécialisé"}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black uppercase italic mb-6 text-gray-900 dark:text-white leading-tight">
                  {activeTab === "gants" && "Gants d'entraînement personnalisés"}
                  {activeTab === "ceintures" && "Ceintures fitness sur mesure"}
                  {activeTab === "sangles" && "Sangles de levage personnalisées"}
                  {activeTab === "genouilleres" && "Genouillères adaptées à vos besoins"}
                  {activeTab === "wallball" && "Wall Balls personnalisés"}
                  {activeTab === "boxjump" && "Box Jumps sur mesure"}
                  {activeTab === "powerbag" && "Power Bags personnalisés"}
                  {activeTab === "sacbulgare" && "Sacs Bulgares sur mesure"}
                  {activeTab === "accessoires" && "Accessoires fitness personnalisés"}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {activeTab === "gants" &&
                    "Nos gants d'entraînement personnalisés offrent une protection optimale et un style unique. Choisissez les matériaux, les couleurs et les finitions pour créer des gants parfaitement adaptés à votre pratique."}
                  {activeTab === "ceintures" &&
                    "Soutenez votre dos avec style grâce à nos ceintures fitness personnalisées. Sélectionnez l'épaisseur, la largeur, les matériaux et ajoutez votre touche personnelle avec des gravures ou broderies."}
                  {activeTab === "sangles" &&
                    "Améliorez votre grip et protégez vos poignets avec nos sangles de levage sur mesure. Personnalisez la longueur, la rigidité et le design pour des performances optimales."}
                  {activeTab === "genouilleres" &&
                    "Protégez vos articulations avec nos genouillères personnalisées. Adaptez le niveau de compression, le rembourrage et le design pour un confort maximal pendant vos entraînements."}
                  {activeTab === "wallball" &&
                    "Personnalisez vos Wall Balls avec des matériaux durables et des designs uniques. Choisissez le poids, la taille et les couleurs pour des entraînements optimaux et un style distinctif."}
                  {activeTab === "boxjump" &&
                    "Créez des Box Jumps sur mesure adaptés à votre niveau et à votre espace d'entraînement. Personnalisez la hauteur, la stabilité et l'esthétique pour des performances maximales."}
                  {activeTab === "powerbag" &&
                    "Nos Power Bags personnalisables offrent une solution polyvalente pour vos entraînements. Définissez le poids, les matériaux et les poignées pour un équipement parfaitement adapté à vos besoins."}
                  {activeTab === "sacbulgare" &&
                    "Personnalisez vos Sacs Bulgares pour des entraînements de force et de puissance optimaux. Choisissez le poids, la taille et les finitions pour un équipement unique et performant."}
                  {activeTab === "accessoires" &&
                    "Découvrez notre gamme complète d'accessoires fitness personnalisables : bandes de résistance, protège-poignets, straps et bien plus encore."}
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    activeTab === "gants" ? "Protection optimale des mains et des poignets" :
                    activeTab === "ceintures" ? "Soutien lombaire adapté à votre morphologie" :
                    activeTab === "sangles" ? "Amélioration significative de votre grip" :
                    activeTab === "genouilleres" ? "Protection articulaire pendant les exercices intenses" :
                    activeTab === "wallball" ? "Matériaux résistants pour une durabilité maximale" :
                    activeTab === "boxjump" ? "Construction robuste supportant des charges importantes" :
                    activeTab === "powerbag" ? "Poignées ergonomiques pour une prise en main optimale" :
                    activeTab === "sacbulgare" ? "Répartition optimale du poids pour des mouvements fluides" :
                    "Amélioration de vos performances sportives",
                    
                    activeTab === "gants" ? "Matériaux respirants et durables" :
                    activeTab === "ceintures" ? "Matériaux premium pour une durabilité maximale" :
                    activeTab === "sangles" ? "Confort et sécurité pendant les soulevés lourds" :
                    activeTab === "genouilleres" ? "Confort et liberté de mouvement" :
                    activeTab === "wallball" ? "Différentes options de poids disponibles" :
                    activeTab === "boxjump" ? "Surface antidérapante pour une sécurité maximale" :
                    activeTab === "powerbag" ? "Différentes formes et tailles disponibles" :
                    activeTab === "sacbulgare" ? "Matériaux premium pour une longue durée de vie" :
                    "Design unique qui reflète votre personnalité",
                    
                    activeTab === "gants" ? "Design personnalisé avec vos couleurs et logo" :
                    activeTab === "ceintures" ? "Personnalisation complète (couleurs, logo, texte)" :
                    activeTab === "sangles" ? "Options de personnalisation étendues" :
                    activeTab === "genouilleres" ? "Personnalisation esthétique et fonctionnelle" :
                    activeTab === "wallball" ? "Personnalisation complète (logo, couleurs, textures)" :
                    activeTab === "boxjump" ? "Design personnalisable selon vos besoins" :
                    activeTab === "powerbag" ? "Options de personnalisation étendues" :
                    activeTab === "sacbulgare" ? "Finitions personnalisées pour un look unique" :
                    "Fabrication sur mesure selon vos spécifications"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="order-1 lg:order-2">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-2xl">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <Image
                      src={logo}
                      alt="Logo IRONZ PRO"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                      Accessoire {activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Personnalisez cet accessoire selon vos préférences
                    </p>
                    <button
                      onClick={() => window.open('https://wa.me/212674114446', '_blank')}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
                    >
                      <IoLogoWhatsapp className="w-5 h-5" />
                      Demander un devis
                    </button>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Nos solutions
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Options de <span className="text-yellow-500">personnalisation</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Des solutions adaptées à chaque besoin et budget
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

      {/* Customization Options Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Palette className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Possibilités infinies
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Options de <span className="text-yellow-500">personnalisation</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explorez les nombreuses possibilités pour créer des accessoires 
                uniques qui vous ressemblent.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customizationOptions.map((option, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.1}>
                <div className="group h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={option.image || "/placeholder.svg"}
                        alt={option.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center`}>
                          <div className="text-white">
                            {option.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-black uppercase italic mb-3 text-gray-900 dark:text-white">
                        {option.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {option.description}
                      </p>
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
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Comment ça marche
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Notre <span className="text-yellow-500">processus</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Une approche en 3 étapes pour créer des accessoires parfaitement 
                adaptés à vos besoins.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500/30 via-yellow-500/20 to-yellow-500/10 -translate-x-1/2"></div>

            <div className="space-y-12 md:space-y-0 relative">
              {processSteps.map((step, index) => (
                <FadeInWhenVisible key={index} delay={index * 0.2}>
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}>
                    {/* Step Number */}
                    <div className="md:w-1/2 flex md:justify-center">
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-black text-3xl font-black shadow-lg z-10 relative`}>
                          {index + 1}
                        </div>
                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-0.5 bg-gradient-to-r ${step.color}/50 ${index % 2 === 0 ? 'right-full mr-4' : 'left-full ml-4'}`}></div>
                      </div>
                    </div>

                    <div className="md:w-1/2 bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} bg-opacity-20 flex items-center justify-center mr-4`}>
                          <div className={`text-gradient bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                            {step.icon}
                          </div>
                        </div>
                        <h3 className="text-2xl font-black uppercase italic text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-6 text-black">
                Prêt à créer votre accessoire personnalisé ?
              </h2>
              <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
                Contactez-nous dès aujourd'hui pour discuter de votre projet et 
                obtenir un devis gratuit.
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
          onClick={() => window.open('https://wa.me/212674114446', '_blank')}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-2xl transition-all flex items-center justify-center"
        >
          <IoLogoWhatsapp className="w-7 h-7" />
        </button>
      </motion.div>
    </main>
  );
}