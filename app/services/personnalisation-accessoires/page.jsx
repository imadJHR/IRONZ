"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Palette,
  Scissors,
  Package,
  Shield,
  Heart,
} from "lucide-react";
import logo from "../../../public/logo.png";
import img1 from "../../../public/acce1.jpeg";
import img2 from "../../../public/acce2.jpeg";
import img3 from "../../../public/acce3.jpeg";

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

  const customizationOptions = [
    {
      title: "Matériaux premium",
      description:
        "Choisissez parmi une sélection de cuirs, tissus techniques et matériaux innovants pour des performances optimales.",
      image: img1,
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Couleurs & motifs",
      description:
        "Personnalisez les couleurs, ajoutez des motifs ou votre logo pour un style unique qui vous représente.",
      image: img2,
      icon: <Palette className="h-6 w-6" />,
    },
    {
      title: "Ajustement sur mesure",
      description:
        "Adaptez parfaitement l'accessoire à votre morphologie pour un confort et des performances optimales.",
      image: img3,
      icon: <Heart className="h-6 w-6" />,
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
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ opacity, scale }}
            className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
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

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-4 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              Service Premium
            </motion.div>

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
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Explorer nos options
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </button>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-yellow-400 to-transparent z-5"></div>
        </section>

        <section
          id="explorer"
          className="py-24 relative bg-gray-50 dark:bg-gray-800/50"
          ref={sectionRef}
        >
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
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
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
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-400/20"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
                  }`}
                >
                  {type.name}
                </motion.button>
              ))}
            </div>

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
                  {activeTab === "wallball" && "Entraînement Fonctionnel"}
                  {activeTab === "boxjump" && "Entraînement Pliométrique"}
                  {activeTab === "powerbag" && "Force & Conditionnement"}
                  {activeTab === "sacbulgare" && "Force & Puissance"}
                  {activeTab === "accessoires" && "Équipement Spécialisé"}
                </span>

                <h3 className="text-3xl font-bold mb-4 leading-tight">
                  {activeTab === "gants" &&
                    "Gants d'entraînement personnalisés"}
                  {activeTab === "ceintures" && "Ceintures fitness sur mesure"}
                  {activeTab === "sangles" &&
                    "Sangles de levage personnalisées"}
                  {activeTab === "genouilleres" &&
                    "Genouillères adaptées à vos besoins"}
                  {activeTab === "wallball" && "Wall Balls personnalisés"}
                  {activeTab === "boxjump" && "Box Jumps sur mesure"}
                  {activeTab === "powerbag" && "Power Bags personnalisés"}
                  {activeTab === "sacbulgare" && "Sacs Bulgares sur mesure"}
                  {activeTab === "accessoires" &&
                    "Accessoires fitness personnalisés"}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
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
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-700 dark:text-gray-200">
                        {activeTab === "gants" &&
                          "Protection optimale des mains et des poignets"}
                        {activeTab === "ceintures" &&
                          "Soutien lombaire adapté à votre morphologie"}
                        {activeTab === "sangles" &&
                          "Amélioration significative de votre grip"}
                        {activeTab === "genouilleres" &&
                          "Protection articulaire pendant les exercices intenses"}
                        {activeTab === "wallball" &&
                          "Matériaux résistants pour une durabilité maximale"}
                        {activeTab === "boxjump" &&
                          "Construction robuste supportant des charges importantes"}
                        {activeTab === "powerbag" &&
                          "Poignées ergonomiques pour une prise en main optimale"}
                        {activeTab === "sacbulgare" &&
                          "Répartition optimale du poids pour des mouvements fluides"}
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
                      <p className="text-gray-700 dark:text-gray-200">
                        {activeTab === "gants" &&
                          "Matériaux respirants et durables"}
                        {activeTab === "ceintures" &&
                          "Matériaux premium pour une durabilité maximale"}
                        {activeTab === "sangles" &&
                          "Confort et sécurité pendant les soulevés lourds"}
                        {activeTab === "genouilleres" &&
                          "Confort et liberté de mouvement"}
                        {activeTab === "wallball" &&
                          "Différentes options de poids disponibles"}
                        {activeTab === "boxjump" &&
                          "Surface antidérapante pour une sécurité maximale"}
                        {activeTab === "powerbag" &&
                          "Différentes formes et tailles disponibles"}
                        {activeTab === "sacbulgare" &&
                          "Matériaux premium pour une longue durée de vie"}
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
                      <p className="text-gray-700 dark:text-gray-200">
                        {activeTab === "gants" &&
                          "Design personnalisé avec vos couleurs et logo"}
                        {activeTab === "ceintures" &&
                          "Personnalisation complète (couleurs, logo, texte)"}
                        {activeTab === "sangles" &&
                          "Options de personnalisation étendues"}
                        {activeTab === "genouilleres" &&
                          "Personnalisation esthétique et fonctionnelle"}
                        {activeTab === "wallball" &&
                          "Personnalisation complète (logo, couleurs, textures)"}
                        {activeTab === "boxjump" &&
                          "Design personnalisable selon vos besoins"}
                        {activeTab === "powerbag" &&
                          "Options de personnalisation étendues"}
                        {activeTab === "sacbulgare" &&
                          "Finitions personnalisées pour un look unique"}
                        {activeTab === "accessoires" &&
                          "Fabrication sur mesure selon vos spécifications"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <Image
                src={logo}
                alt="logo"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="order-1 md:order-2 relative"
              ></Image>
            </div>
          </div>
        </section>

        <section className="py-24 relative">
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
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Une approche en 3 étapes pour créer des accessoires parfaitement
                adaptés à vos besoins.
              </p>
            </motion.div>

            <div className="relative">
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
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black text-4xl font-bold shadow-lg shadow-yellow-400/20 z-10">
                          {index + 1}
                        </div>
                        <div
                          className="hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-0.5 bg-yellow-400/50 
                          ${index % 2 === 0 ? 'right-full mr-4' : 'left-full ml-4'}"
                        ></div>
                      </div>
                    </div>

                    <div className="md:w-1/2 bg-white dark:bg-gray-800 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mr-4">
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{`${index + 1}. ${
                          step.title
                        }`}</h3>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
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

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="mt-24"
            ></motion.div>
          </div>
        </section>

        <section className="py-24 relative bg-gray-50 dark:bg-gray-800/50">
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
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
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
                  className="group bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/5 transition-all duration-300 hover:-translate-y-2"
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
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black relative overflow-hidden">
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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-black text-white font-medium rounded-lg shadow-md w-full sm:w-auto"
                  >
                    Demander un devis gratuit
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
