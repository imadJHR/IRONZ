"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import img11 from "../../../public/img11.png"
import img12 from "../../../public/img12.png"
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
import img1 from "../../../public/acce1.jpeg";
import img2 from "../../../public/acce2.jpeg";
import img3 from "../../../public/acce3.jpeg";

export default function PersonnalisationAccessoiresPage() {
  const [activeTab, setActiveTab] = useState("gants");
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
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

  const videoList = [
    {
      title: "",
      url: "/c1.mp4",
      poster: img11, 
    },
    {
      title: "  ",
      url: "/c2.mp4",
      poster: img12, 
    },
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  return (
    <>
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

      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black z-10" />
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
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-5"></div>
        </section>

        <section id="explorer" className="py-24 relative" ref={sectionRef}>
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
              </motion.div>
            </div>
          </div>
        </section>

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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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

            <div className="grid md:grid-cols-2 gap-4">
              {videoList.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-2xl border overflow-hidden aspect-video bg-black relative group cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={video.poster}
                      alt={`Thumbnail for ${video.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:opacity-100 opacity-0">
                      <div className="w-16 h-16 rounded-full bg-yellow-400/80 flex items-center justify-center">
                        <Play className="h-8 w-8 text-black" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black relative overflow-hidden">
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

        {/* Video Modal */}
        <AnimatePresence>
          {showModal && selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  <X className="h-8 w-8" />
                </button>
                <video
                  src={selectedVideo.url}
                  className="w-full rounded-lg"
                  controls
                  autoPlay
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                url: "https://www.ironz.ma",
                logo: "https://www.ironzpro.com/logo.png",
                telephone: "+212669510042",
                email: "muscleironz2019@gmail.com",
              },
              description:
                "Créez des accessoires fitness uniques qui reflètent votre identité et répondent parfaitement à vos besoins spécifiques.",
              offers: {
                "@type": "Offer",
                price: "Sur devis",
                priceCurrency: "MAD",
              },
              areaServed: "MAROC",
              serviceType: "Personnalisation d'accessoires fitness",
            }),
          }}
        />
      </main>
    </>
  );
}
