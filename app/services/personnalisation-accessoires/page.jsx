"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Palette,
  Scissors,
  Package,
  ChevronDown,
  Play,
  Pause,
  X,
} from "lucide-react";

import Navbar from "@/components/navbar";

export default function PersonnalisationAccessoiresPage() {
  const [activeTab, setActiveTab] = useState("gants");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

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
    },
    {
      title: "Couleurs & motifs",
      description:
        "Personnalisez les couleurs, ajoutez des motifs ou votre logo pour un style unique qui vous représente.",
      image: "/placeholder.svg?height=400&width=600&text=Couleurs+et+Motifs",
    },
    {
      title: "Ajustement sur mesure",
      description:
        "Adaptez parfaitement l'accessoire à votre morphologie pour un confort et des performances optimales.",
      image: "/placeholder.svg?height=400&width=600&text=Ajustement+Sur+Mesure",
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

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
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
          <Link
            href="/services"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux services
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
            Personnalisation d'Accessoires
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Créez des accessoires fitness uniques qui reflètent votre identité
            et répondent parfaitement à vos besoins spécifiques.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("explorer")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              Explorer nos options
            </button>
            <button
              onClick={() =>
                handlePlayVideo("/placeholder.svg?height=1080&width=1920")
              }
              className="px-8 py-4 bg-transparent hover:bg-white/10 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full flex items-center transition-all transform hover:scale-105"
            >
              <Play className="h-5 w-5 mr-2" />
              Voir notre processus
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-yellow-400" />
          </div>
        </motion.div>
      </section>

      {/* Accessory Types Section */}
      <section
        id="explorer"
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Personnalisez vos{" "}
              <span className="text-yellow-400">accessoires</span>
            </h2>
            <p className="text-xl text-gray-300">
              Découvrez notre gamme d'accessoires entièrement personnalisables
              pour améliorer vos performances et affirmer votre style.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {accessoryTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all ${
                  activeTab === type.id
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold mb-4">
                {activeTab === "gants" && "Gants d'entraînement personnalisés"}
                {activeTab === "ceintures" &&
                  "Ceintures de musculation sur mesure"}
                {activeTab === "sangles" && "Sangles de levage personnalisées"}
                {activeTab === "genouilleres" &&
                  "Genouillères adaptées à vos besoins"}
                {activeTab === "accessoires" &&
                  "Accessoires fitness personnalisés"}
              </h3>

              <p className="text-gray-300 mb-6">
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

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0" />
                  <span>
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
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0" />
                  <span>
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
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0" />
                  <span>
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
                  </span>
                </li>
              </ul>

              <button
                onClick={() =>
                  handlePlayVideo("/placeholder.svg?height=1080&width=1920")
                }
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full flex items-center transition-all transform hover:scale-105 shadow-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Voir en action
              </button>
            </div>

            <div className="order-1 md:order-2 relative">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl border-2 border-yellow-400/30">
                <Image
                  src={`/placeholder.svg?height=800&width=800&text=${activeTab}`}
                  alt={`${activeTab} personnalisés`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <button
                    onClick={() =>
                      handlePlayVideo("/placeholder.svg?height=1080&width=1920")
                    }
                    className="w-16 h-16 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
                  >
                    <Play className="h-8 w-8 text-black ml-1" />
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl p-4 transform rotate-12">
                100% personnalisable
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section with Video */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Notre <span className="text-yellow-400">processus</span> de
              personnalisation
            </h2>
            <p className="text-xl text-gray-300">
              Une approche en 3 étapes pour créer des accessoires parfaitement
              adaptés à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 rounded-2xl p-8 transform transition-transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <Palette className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Conception</h3>
              <p className="text-gray-300 mb-6">
                Nous définissons ensemble vos besoins spécifiques et créons un
                design qui correspond à vos attentes esthétiques et
                fonctionnelles.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Consultation personnalisée
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Choix des matériaux et options
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Création de maquettes 3D
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 transform transition-transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <Scissors className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Fabrication</h3>
              <p className="text-gray-300 mb-6">
                Nos artisans qualifiés fabriquent votre accessoire sur mesure en
                utilisant des techniques de production avancées et des matériaux
                premium.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Sélection minutieuse des matériaux
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Fabrication artisanale de précision
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Contrôle qualité rigoureux
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 transform transition-transform hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <Package className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Livraison</h3>
              <p className="text-gray-300 mb-6">
                Votre accessoire personnalisé est soigneusement emballé et livré
                directement à votre porte, prêt à être utilisé pour vos
                entraînements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Emballage premium éco-responsable
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Livraison rapide et sécurisée
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Suivi en temps réel</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Process Video */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-400/30">
            <Image
              src="/placeholder.svg?height=1080&width=1920&text=Notre+Processus"
              alt="Notre processus de personnalisation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button
                onClick={() =>
                  handlePlayVideo("/placeholder.svg?height=1080&width=1920")
                }
                className="w-20 h-20 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
              >
                <Play className="h-10 w-10 text-black ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Options de{" "}
              <span className="text-yellow-400">personnalisation</span>
            </h2>
            <p className="text-xl text-gray-300">
              Explorez les nombreuses possibilités pour créer des accessoires
              uniques qui vous ressemblent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customizationOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-2xl overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={option.image || "/placeholder.svg"}
                    alt={option.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                  <p className="text-gray-300 mb-6">{option.description}</p>
                  <button
                    onClick={() =>
                      handlePlayVideo("/placeholder.svg?height=1080&width=1920")
                    }
                    className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center"
                  >
                    Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ils nous font <span className="text-yellow-400">confiance</span>
            </h2>
            <p className="text-xl text-gray-300">
              Découvrez les témoignages de clients satisfaits par nos services
              de personnalisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold">{testimonial.name}</h4>
                    <p className="text-yellow-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
                <div className="flex mt-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Galerie de <span className="text-yellow-400">réalisations</span>
            </h2>
            <p className="text-xl text-gray-300">
              Découvrez quelques exemples de nos créations personnalisées.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
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
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Play className="h-12 w-12 text-yellow-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-400 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à créer votre accessoire personnalisé?
            </h2>
            <p className="text-xl mb-10">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et
              obtenir un devis gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg">
                Demander un devis gratuit
              </button>
              <button
                onClick={() =>
                  handlePlayVideo("/placeholder.svg?height=1080&width=1920")
                }
                className="px-8 py-4 bg-transparent hover:bg-black/10 border-2 border-black text-black font-bold rounded-full flex items-center justify-center transition-all transform hover:scale-105"
              >
                <Play className="h-5 w-5 mr-2" />
                Voir nos réalisations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Contactez-<span className="text-yellow-400">nous</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Notre équipe d'experts est à votre disposition pour vous
                  accompagner dans la création de vos accessoires personnalisés.
                </p>

                <div className="bg-gray-800 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Pourquoi nous choisir?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">
                        Expertise dans la personnalisation d'accessoires fitness
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">
                        Matériaux premium et fabrication artisanale
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">
                        Processus de personnalisation complet et transparent
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">
                        Service client réactif et attentif
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">
                        Garantie satisfaction sur tous nos produits
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6">
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
                        <p className="mt-1 text-gray-300">+33 1 23 45 67 89</p>
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
              </div>

              <div>
                <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6">
                    Parlez-nous de votre projet
                  </h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Prénom
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Nom
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                          placeholder="Votre nom"
                        />
                      </div>
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
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="accessoryType"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Type d'accessoire
                      </label>
                      <select
                        id="accessoryType"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                      >
                        <option value="">
                          Sélectionnez un type d'accessoire
                        </option>
                        <option value="gants">Gants d'entraînement</option>
                        <option value="ceintures">
                          Ceinture de musculation
                        </option>
                        <option value="sangles">Sangles de levage</option>
                        <option value="genouilleres">Genouillères</option>
                        <option value="autre">Autre accessoire</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Votre projet
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                        placeholder="Décrivez votre projet de personnalisation..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                      Envoyer ma demande
                    </button>
                  </form>
                </div>
              </div>
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
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full"
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
                    className="p-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full"
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
    </main>
  );
}
