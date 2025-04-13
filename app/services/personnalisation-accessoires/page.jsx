"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Palette,
  Scissors,
  Package,
  ChevronDown,
  Play,
  Pause,
  X,
  Star,
  Zap,
  Shield,
  Heart,
} from "lucide-react";

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

  const handlePlayVideo = (videoSrc) => {
    setSelectedVideo(videoSrc);
    setShowModal(true);
  };

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
    { id: "ceintures", name: "Ceintures de musculation" },
    { id: "sangles", name: "Sangles de levage" },
    { id: "genouilleres", name: "Genouillères" },
    { id: "accessoires", name: "Autres accessoires" },
  ];

  const customizationOptions = [
    {
      title: "Matériaux premium",
      description:
        "Choisissez parmi une sélection de cuirs, tissus techniques et matériaux innovants pour des performances optimales.",
      image: "/placeholder.svg?height=400&width=600&text=Matériaux+Premium",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Couleurs & motifs",
      description:
        "Personnalisez les couleurs, ajoutez des motifs ou votre logo pour un style unique qui vous représente.",
      image: "/placeholder.svg?height=400&width=600&text=Couleurs+et+Motifs",
      icon: <Palette className="h-6 w-6" />,
    },
    {
      title: "Ajustement sur mesure",
      description:
        "Adaptez parfaitement l'accessoire à votre morphologie pour un confort et des performances optimales.",
      image: "/placeholder.svg?height=400&width=600&text=Ajustement+Sur+Mesure",
      icon: <Heart className="h-6 w-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Alexandre Dupont",
      role: "Coach CrossFit",
      image: "/placeholder.svg?height=100&width=100",
      text: "Les gants personnalisés IRONZ PRO ont transformé mes entraînements. Le confort et la durabilité sont incomparables, et le design personnalisé motive mes clients!",
    },
    {
      name: "Sarah Legrand",
      role: "Athlète professionnelle",
      image: "/placeholder.svg?height=100&width=100",
      text: "J'ai fait personnaliser ma ceinture de powerlifting aux couleurs de mon équipe. La qualité est exceptionnelle et elle me suit dans toutes mes compétitions.",
    },
    {
      name: "Team FitnessPro",
      role: "Salle de sport",
      image: "/placeholder.svg?height=100&width=100",
      text: "Nous avons équipé toute notre équipe avec des accessoires personnalisés. L'impact sur notre image de marque est considérable, et nos membres adorent!",
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
    },
  ];

  return (
    <>
      {/* SEO Head Tags */}
      <Head>
        <title>Personnalisation d'Accessoires Fitness | IRONZ PRO</title>
        <meta
          name="description"
          content="Créez des accessoires fitness uniques qui reflètent votre identité et répondent parfaitement à vos besoins spécifiques. Gants, ceintures, sangles personnalisés."
        />
        <meta
          name="keywords"
          content="personnalisation, accessoires fitness, gants d'entraînement, ceintures musculation, sangles levage, genouillères, équipement fitness personnalisé"
        />
        <meta
          property="og:title"
          content="Personnalisation d'Accessoires Fitness | IRONZ PRO"
        />
        <meta
          property="og:description"
          content="Créez des accessoires fitness uniques qui reflètent votre identité et répondent parfaitement à vos besoins spécifiques."
        />
        <meta
          property="og:image"
          content="https://www.ironzpro.com/images/personnalisation-accessoires.jpg"
        />
        <meta
          property="og:url"
          content="https://www.ironzpro.com/services/personnalisation-accessoires"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Personnalisation d'Accessoires Fitness | IRONZ PRO"
        />
        <meta
          name="twitter:description"
          content="Créez des accessoires fitness uniques qui reflètent votre identité et répondent parfaitement à vos besoins spécifiques."
        />
        <meta
          name="twitter:image"
          content="https://www.ironzpro.com/images/personnalisation-accessoires.jpg"
        />
        <link
          rel="canonical"
          href="https://www.ironzpro.com/services/personnalisation-accessoires"
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b bg-white text-black overflow-x-hidden">
        {/* Hero Section with Video Background */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="/placeholder.svg?height=1080&width=1920"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Animated Particles Background */}
          <div className="absolute inset-0 z-5">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-yellow-400/20"
                ></div>
              ))}
            </div>
          </div>

          {/* Hero Content */}
          <motion.div
            style={{ opacity, scale }}
            className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            {/* Breadcrumb Navigation */}
            <nav
              className="flex justify-center mb-8 text-sm"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      Services
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-yellow-400">
                      Personnalisation d'Accessoires
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Hero Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              Service Premium
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            >
              <span className="inline-block relative">
                Personnalisation
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></span>
              </span>{" "}
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
                d'Accessoires Fitness
              </span>
            </motion.h1>

            {/* Hero Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Créez des accessoires fitness uniques qui reflètent votre identité
              et répondent parfaitement à vos besoins spécifiques.
            </motion.p>

            {/* Hero Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("explorer")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Explorer nos options
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </button>

              <button
                onClick={() =>
                  handlePlayVideo("/placeholder.svg?height=1080&width=1920")
                }
                className="group relative px-8 py-4 bg-transparent border-2 border-yellow-400/50 hover:border-yellow-400 text-yellow-400 font-bold rounded-full flex items-center transition-all transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Voir notre processus
                </span>
                <span className="absolute inset-0 bg-yellow-400/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-sm text-gray-400 mb-2">Découvrir</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              >
                <ChevronDown className="h-8 w-8 text-yellow-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-5"></div>
        </section>
        {/* Accessory Types Section */}
        <section id="explorer" className="py-24 relative" ref={sectionRef}>
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-4">
                Nos produits
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Personnalisez vos{" "}
                <span className="text-yellow-400">accessoires</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Découvrez notre gamme d'accessoires entièrement personnalisables
                pour améliorer vos performances et affirmer votre style.
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-16 overflow-x-auto pb-4 scrollbar-hide">
              {accessoryTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all ${
                    activeTab === type.id
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/20"
                      : "bg-zinc-800/80 text-gray-300 hover:bg-zinc-700/80 backdrop-blur-sm"
                  }`}
                >
                  {type.name}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="order-2 md:order-1"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-medium mb-4">
                  {activeTab === "gants" && "Protection & Performance"}
                  {activeTab === "ceintures" && "Support & Stabilité"}
                  {activeTab === "sangles" && "Grip & Sécurité"}
                  {activeTab === "genouilleres" && "Protection Articulaire"}
                  {activeTab === "accessoires" && "Équipement Spécialisé"}
                </span>

                <h3 className="text-3xl font-bold mb-4 leading-tight">
                  {activeTab === "gants" &&
                    "Gants d'entraînement personnalisés"}
                  {activeTab === "ceintures" &&
                    "Ceintures de musculation sur mesure"}
                  {activeTab === "sangles" &&
                    "Sangles de levage personnalisées"}
                  {activeTab === "genouilleres" &&
                    "Genouillères adaptées à vos besoins"}
                  {activeTab === "accessoires" &&
                    "Accessoires fitness personnalisés"}
                </h3>

                <p className="text-gray-300 mb-8 leading-relaxed">
                  {activeTab === "gants" &&
                    "Nos gants d'entraînement personnalisés offrent une protection optimale et un style unique. Choisissez les matériaux, les couleurs et les finitions pour créer des gants parfaitement adaptés à votre pratique."}
                  {activeTab === "ceintures" &&
                    "Soutenez votre dos avec style grâce à nos ceintures de musculation personnalisées. Sélectionnez l'épaisseur, la largeur, les matériaux et ajoutez votre touche personnelle avec des gravures ou broderies."}
                  {activeTab === "sangles" &&
                    "Améliorez votre grip et protégez vos poignets avec nos sangles de levage sur mesure. Personnalisez la longueur, la rigidité et le design pour des performances optimales."}
                  {activeTab === "genouilleres" &&
                    "Protégez vos articulations avec nos genouillères personnalisées. Adaptez le niveau de compression, le rembourrage et le design pour un confort maximal pendant vos entraînements."}
                  {activeTab === "accessoires" &&
                    "Découvrez notre gamme complète d'accessoires fitness personnalisables : bandes de résistance, protège-poignets, straps et bien plus encore."}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-200">
                        {activeTab === "gants" &&
                          "Protection optimale des mains et des poignets"}
                        {activeTab === "ceintures" &&
                          "Soutien lombaire adapté à votre morphologie"}
                        {activeTab === "sangles" &&
                          "Amélioration significative de votre grip"}
                        {activeTab === "genouilleres" &&
                          "Protection articulaire pendant les exercices intenses"}
                        {activeTab === "accessoires" &&
                          "Amélioration de vos performances sportives"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-200">
                        {activeTab === "gants" &&
                          "Matériaux respirants et durables"}
                        {activeTab === "ceintures" &&
                          "Matériaux premium pour une durabilité maximale"}
                        {activeTab === "sangles" &&
                          "Confort et sécurité pendant les soulevés lourds"}
                        {activeTab === "genouilleres" &&
                          "Confort et liberté de mouvement"}
                        {activeTab === "accessoires" &&
                          "Design unique qui reflète votre personnalité"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-200">
                        {activeTab === "gants" &&
                          "Design personnalisé avec vos couleurs et logo"}
                        {activeTab === "ceintures" &&
                          "Personnalisation complète (couleurs, logo, texte)"}
                        {activeTab === "sangles" &&
                          "Options de personnalisation étendues"}
                        {activeTab === "genouilleres" &&
                          "Personnalisation esthétique et fonctionnelle"}
                        {activeTab === "accessoires" &&
                          "Fabrication sur mesure selon vos spécifications"}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handlePlayVideo("/placeholder.svg?height=1080&width=1920")
                  }
                  className="group relative px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full flex items-center transition-all transform hover:scale-105 shadow-lg shadow-yellow-400/20 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Play className="h-5 w-5 mr-2" />
                    Voir en action
                  </span>
                  <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </button>
              </motion.div>

              <motion.div
                key={`image-${activeTab}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="order-1 md:order-2 relative"
              >
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl border border-yellow-400/20 group">
                  <Image
                    src={`/placeholder.svg?height=800&width=800&text=${activeTab}`}
                    alt={`${activeTab} personnalisés`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
                    <button
                      onClick={() =>
                        handlePlayVideo(
                          "/placeholder.svg?height=1080&width=1920"
                        )
                      }
                      className="w-16 h-16 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 shadow-lg shadow-yellow-400/30"
                    >
                      <Play className="h-8 w-8 text-black ml-1" />
                    </button>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl p-4 transform rotate-12 shadow-lg">
                  100% personnalisable
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-4 -left-4 px-4 py-2 bg-zinc-800/90 backdrop-blur-sm rounded-full text-yellow-400 text-sm font-medium border border-yellow-400/20 shadow-lg">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    <span>Fabrication française</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Process Section with Timeline */}
        <section className="py-24 relative">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/5 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-4">
                Comment ça marche
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Notre <span className="text-yellow-400">processus</span> de
                personnalisation
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Une approche en 3 étapes pour créer des accessoires parfaitement
                adaptés à vos besoins.
              </p>
            </motion.div>

            {/* Process Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400/80 via-yellow-400/50 to-yellow-400/20"></div>

              <div className="space-y-24 relative">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-8 md:gap-16`}
                  >
                    {/* Step Number */}
                    <div className="md:w-1/2 flex md:justify-center">
                      <div className="relative">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black text-4xl font-bold shadow-lg shadow-yellow-400/20 z-10">
                          {index + 1}
                        </div>
                        <div
                          className="hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-0.5 bg-yellow-400/50 
                          ${index % 2 === 0 ? 'right-full mr-4' : 'left-full ml-4'}"
                        ></div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="md:w-1/2 bg-zinc-800/80 backdrop-blur-sm p-8 rounded-3xl border border-yellow-400/10 shadow-xl">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mr-4">
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{`${index + 1}. ${
                          step.title
                        }`}</h3>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process Video */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="mt-24"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-yellow-400/20 group">
                <Image
                  src="/placeholder.svg?height=1080&width=1920&text=Notre+Processus"
                  alt="Notre processus de personnalisation"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <button
                    onClick={() =>
                      handlePlayVideo("/placeholder.svg?height=1080&width=1920")
                    }
                    className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 shadow-lg shadow-yellow-400/30"
                  >
                    <Play className="h-10 w-10 text-black ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Customization Options */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-4">
                Possibilités infinies
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Options de{" "}
                <span className="text-yellow-400">personnalisation</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Explorez les nombreuses possibilités pour créer des accessoires
                uniques qui vous ressemblent.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {customizationOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-gradient-to-b from-zinc-800/90 to-zinc-900/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-yellow-400/10 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/5 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={option.image || "/placeholder.svg"}
                      alt={option.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black mb-3">
                        {option.icon}
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {option.description}
                    </p>
                    <button
                      onClick={() =>
                        handlePlayVideo(
                          "/placeholder.svg?height=1080&width=1920"
                        )
                      }
                      className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center group"
                    >
                      Découvrir
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Gallery Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-4">
                Nos créations
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Galerie de <span className="text-yellow-400">réalisations</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Découvrez quelques exemples de nos créations personnalisées.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() =>
                    handlePlayVideo("/placeholder.svg?height=1080&width=1920")
                  }
                >
                  <Image
                    src={`/placeholder.svg?height=500&width=500&text=Réalisation+${
                      index + 1
                    }`}
                    alt={`Réalisation ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center">
                      <Play className="h-12 w-12 text-yellow-400 mb-2" />
                      <span className="text-white font-medium">
                        Voir détails
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white/10"></div>
            ))}
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Prêt à créer votre accessoire personnalisé?
              </h2>
              <p className="text-xl mb-10 text-black/80 leading-relaxed max-w-3xl mx-auto">
                Contactez-nous dès aujourd'hui pour discuter de votre projet et
                obtenir un devis gratuit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demande-devis">
                  <button className="group relative px-8 py-4 bg-black text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Demander un devis gratuit
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Contact Form */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-4">
                    Contactez-nous
                  </span>
                  <h2 className="text-4xl font-bold mb-6 leading-tight">
                    Discutons de votre{" "}
                    <span className="text-yellow-400">projet</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Notre équipe d'experts est à votre disposition pour vous
                    accompagner dans la création de vos accessoires
                    personnalisés.
                  </p>

                  <div className="bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-yellow-400/10">
                    <h3 className="text-xl font-bold mb-4">
                      Pourquoi nous choisir?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">
                          Expertise dans la personnalisation d'accessoires
                          fitness
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">
                          Matériaux premium et fabrication artisanale
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">
                          Processus de personnalisation complet et transparent
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">
                          Service client réactif et attentif
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">
                          Garantie satisfaction sur tous nos produits
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-6 border border-yellow-400/10">
                    <h3 className="text-xl font-bold mb-4">Nos coordonnées</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                          <svg
                            className="h-5 w-5 text-yellow-400"
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
                        <div className="ml-4">
                          <h4 className="text-lg font-medium">Téléphone</h4>
                          <p className="mt-1 text-gray-300">
                            +33 1 23 45 67 89
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                          <svg
                            className="h-5 w-5 text-yellow-400"
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
                        <div className="ml-4">
                          <h4 className="text-lg font-medium">Email</h4>
                          <p className="mt-1 text-gray-300">
                            personnalisation@ironzpro.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                  className="bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 border border-yellow-400/10 shadow-xl"
                >
                  <h3 className="text-2xl font-bold mb-6">Contactez-nous</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Nom complet
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Sujet
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        placeholder="Sujet de votre message"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                        placeholder="Décrivez votre projet..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-yellow-400/20"
                    >
                      Envoyer le message
                    </button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        {/* Video Modal */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-yellow-400/20 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>

                  <video
                    ref={videoRef}
                    src={selectedVideo}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                  ></video>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                    <button
                      onClick={() => setVideoPlaying(!videoPlaying)}
                      className="p-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full transition-colors"
                    >
                      {videoPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Personnalisation d'Accessoires Fitness",
              provider: {
                "@type": "Organization",
                name: "IRONZ PRO",
                url: "https://www.ironzpro.com",
                logo: "https://www.ironzpro.com/logo.png",
                telephone: "+33123456789",
                email: "personnalisation@ironzpro.com",
              },
              description:
                "Créez des accessoires fitness uniques qui reflètent votre identité et répondent parfaitement à vos besoins spécifiques.",
              offers: {
                "@type": "Offer",
                price: "Sur devis",
                priceCurrency: "EUR",
              },
              areaServed: "France",
              serviceType: "Personnalisation d'accessoires fitness",
            }),
          }}
        />
      </main>
    </>
  );
}
