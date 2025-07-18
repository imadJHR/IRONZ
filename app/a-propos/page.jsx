"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Head from "next/head";
import YouTube from "react-youtube";

export default function AboutPage() {
  const controls = useAnimation();
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (storyInView) {
      controls.start("visible");
    }
  }, [controls, storyInView]);
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "IRONZ PRO",
      url: "https://www.ironz.ma",
      logo: "https://www.ironzpro.com/logo.png",
      foundingDate: "2019",
      founders: [
        {
          "@type": "Person",
          name: "RIDA MAGHRABI",
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "",
        addressLocality: "Agadir",
        postalCode: "",
        addressCountry: "MAR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+212 674-114446",
        contactType: "customer service",
      },
      sameAs: [
        "https://www.instagram.com/ironz_official/",
        "https://www.instagram.com/ironz_equipements/",
        "https://www.youtube.com/@muscleironz21",
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const teamMembers = [
    {
      name: "Alexandre Martin",
      role: "Fondateur & CEO",
      bio: "Ancien athlète professionnel et passionné de fitness depuis plus de 15 ans, Alexandre a fondé IRONZ PRO avec la vision de rendre l'équipement professionnel accessible à tous.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Sophie Dubois",
      role: "Directrice Commerciale",
      bio: "Avec plus de 10 ans d'expérience dans le secteur du fitness, Sophie supervise toutes les opérations commerciales et veille à la satisfaction de nos clients.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Thomas Leroy",
      role: "Responsable Technique",
      bio: "Expert en équipements de fitness, Thomas dirige notre équipe technique et s'assure que tous nos produits répondent aux normes les plus strictes de qualité et de sécurité.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      name: "Camille Bernard",
      role: "Nutritionniste",
      bio: "Diplômée en nutrition sportive, Camille conseille nos clients sur les suppléments adaptés à leurs objectifs et élabore des plans nutritionnels personnalisés.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
  ];

  const values = [
    {
      title: "Qualité",
      description:
        "Nous sélectionnons rigoureusement chaque produit pour garantir une qualité professionnelle, durable et fiable.",
      icon: <Award className="h-10 w-10 text-yellow-500" />,
    },
    {
      title: "Expertise",
      description:
        "Notre équipe de professionnels du fitness vous conseille pour trouver les solutions les mieux adaptées à vos besoins.",
      icon: <Users className="h-10 w-10 text-yellow-500" />,
    },
    {
      title: "Innovation",
      description:
        "Nous recherchons constamment les dernières innovations pour vous proposer des équipements à la pointe de la technologie.",
      icon: <Target className="h-10 w-10 text-yellow-500" />,
    },
    {
      title: "Service",
      description:
        "De la commande à la livraison, nous vous accompagnons à chaque étape pour une expérience d'achat parfaite.",
      icon: <Clock className="h-10 w-10 text-yellow-500" />,
    },
  ];

  const showrooms = [
    {
      city: "Agadir",
      address: "123 Avenue des Champs-Élysées, 75008 Paris",
      phone: "+33 1 23 45 67 89",
      hours: "Lun-Sam: 10h-19h | Dim: Fermé",
      image: "/placeholder.svg?height=600&width=800",
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Head>
        <title>
          À Propos de IRONZ PRO - Équipement de Fitness Professionnel
        </title>
        <meta
          name="description"
          content="Découvrez l'histoire, les valeurs et l'engagement d'IRONZ PRO à fournir les meilleurs équipements et services de fitness."
        />
      </Head>
      {/* Hero Section */}
      <section
        className="relative pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-28 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1200&width=2000"
            alt="IRONZ PRO - Équipement de fitness professionnel"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-yellow-500 text-black hover:bg-yellow-600 px-3 py-1 text-sm">
              Notre histoire
            </Badge>
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              À Propos <span className="text-yellow-400">IRONZ</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              D'une passion vers une ambition.<br/>Découvrez notre histoire, nos valeurs et notre engagement à vous
              fournir les meilleurs équipements et services de fitness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        className="py-16 sm:py-20 md:py-32"
        ref={storyRef}
        aria-labelledby="story-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-3 py-1">
                Notre parcours
              </Badge>
              <h2
                id="story-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white"
              >
                Notre Histoire
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                Fondée en 2019 par RIDA MAGHRABI, Ingénieur, Ex Champion en
                Bodybuilding et athlète professionnel, IRONZ est née d'une
                passion pour le fitness et d'une vision ingénieuse pour rendre
                accessible des équipements de qualité professionnelle à tous.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Ce qui a commencé comme une petite boutique à Agadir s'est
                rapidement développé pour devenir parmi les leaders marocains de
                l'équipement fitness, avec une présence en ligne forte et
                Plusieurs showrooms à travers le pays.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-10">
                <motion.div
                  variants={scaleIn}
                  className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <span className="text-2xl sm:text-4xl font-bold text-yellow-500 block mb-1">
                    2019
                  </span>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Année de création
                  </span>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <span className="text-2xl sm:text-4xl font-bold text-yellow-500 block mb-1">
                    20+
                  </span>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Employés
                  </span>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <span className="text-2xl sm:text-4xl font-bold text-yellow-500 block mb-1">
                    5k+
                  </span>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Clients satisfaits
                  </span>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <span className="text-2xl sm:text-4xl font-bold text-yellow-500 block mb-1">
                    500+
                  </span>
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Produits
                  </span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl mt-6 md:mt-0"
            >
              <Image
                src={logo || "/placeholder.svg"}
                alt="Histoire d'IRONZ PRO - Depuis 2019"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-8">
                <Badge className="mb-2 bg-yellow-500 text-black hover:bg-yellow-600">
                  Depuis 2019
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Notre mission: l'excellence
                </h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section
        className="py-16 sm:py-20 md:py-32 bg-gray-50 dark:bg-gray-900"
        aria-labelledby="values-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-3 py-1">
              Ce qui nous définit
            </Badge>
            <h2
              id="values-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white"
            >
              Nos Valeurs
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ces principes guident chacune de nos actions et décisions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section
        className="py-16 sm:py-20 md:py-32 bg-white dark:bg-gray-950"
        aria-labelledby="video-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-3 py-1">
              Découvrez-nous en vidéo
            </Badge>
            <h2
              id="video-heading"
              className="text-2xl text-yellow-400 sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white"
            >
              Notre Vidéo
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Regardez notre vidéo pour en savoir plus sur IRONZ PRO
            </p>
          </motion.div>

          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl mt-6 md:mt-0">
            <div className="absolute top-0 left-0 w-full h-full">
              <YouTube
                videoId="LED1s8Ecpbw"
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 0,
                  },
                }}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-16 sm:py-20 md:py-32 bg-white dark:bg-gray-950"
        aria-labelledby="contact-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center"
          >
            <div>
              <Badge className="mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-3 py-1">
                Parlons-nous
              </Badge>
              <h2
                id="contact-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white"
              >
                Contactez-nous
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                Vous avez des questions ou besoin d'informations supplémentaires
                ? Notre équipe est à votre disposition pour vous aider.
              </p>

              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-start p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                >
                  <MapPin
                    className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mr-3 sm:mr-4 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">
                      Siège social
                    </h3>
                    <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
                      SAHARA MALL 1 ÈRE ÉTAGE C169 & C120
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                >
                  <Phone
                    className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mr-3 sm:mr-4 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">
                      Téléphone
                    </h3>
                    <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
                      +212 674-114446
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                >
                  <Mail
                    className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mr-3 sm:mr-4 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-gray-900 dark:text-white">
                      Email
                    </h3>
                    <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
                      muscleironz2019@gmail.com
                    </p>
                  </div>
                </motion.div>
              </div>

              <Link href="/contact">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full">
                  Nous contacter
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mt-6 md:mt-0"
            >
              <Image
                src={logo}
                alt="Contactez l'équipe IRONZ PRO"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-8">
                <Badge className="mb-2 bg-yellow-500 text-black hover:bg-yellow-600">
                  Notre équipe
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  À votre service
                </h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-br from-yellow-400 to-yellow-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-black">
              Rejoignez la communauté IRONZ PRO
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-black/80 mb-8 sm:mb-10 leading-relaxed">
              Suivez-nous sur les réseaux sociaux pour découvrir nos dernières
              actualités, promotions et conseils fitness.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a href="https://www.facebook.com/muscle.ironz" target="_blank">
                <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-4 sm:px-8 py-3 sm:py-6 flex items-center text-sm sm:text-base">
                  <Facebook
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                    aria-hidden="true"
                  />
                  Facebook
                </Button>
              </a>

              <a
                href="https://www.instagram.com/ironz_official/"
                target="_blank"
              >
                <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-4 sm:px-8 py-3 sm:py-6 flex items-center text-sm sm:text-base">
                  <Instagram
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                    aria-hidden="true"
                  />
                  Instagram
                </Button>
              </a>
              <a
                href="https://www.youtube.com/@muscleironz8921"
                target="_blank"
              >
                <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-4 sm:px-8 py-3 sm:py-6 flex items-center text-sm sm:text-base">
                  <Youtube
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                    aria-hidden="true"
                  />
                  YouTube
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <nav aria-label="Fil d'Ariane" className="text-sm">
          <ol className="flex flex-wrap items-center space-x-1 text-gray-500 dark:text-gray-400">
            <li>
              <Link
                href="/"
                className="hover:text-yellow-500 transition-colors"
              >
                Accueil
              </Link>
            </li>
            <li className="flex items-center space-x-1">
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">
                À propos
              </span>
            </li>
          </ol>
        </nav>
        <Separator className="mt-4 mb-0" />
      </div>
    </main>
  );
}
