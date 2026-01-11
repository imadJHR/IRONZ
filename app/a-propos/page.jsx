"use client";

import { useEffect, useRef } from "react";
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
  ArrowLeft,
  Sparkles,
  Zap,
  Trophy,
  ShieldCheck,
  Star,
  TrendingUp,
  Heart,
  Building,
  UsersRound,
  Globe,
  TargetIcon,
  CheckCircle,
  ArrowRight,
  PhoneCall,
  MailCheck,
  Calendar,
  ChevronRight,
  Flame,
  Dumbbell,
  Medal,
  Crown,
} from "lucide-react";


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
        streetAddress: "SAHARA MALL 1 ÈRE ÉTAGE C169 & C120",
        addressLocality: "Agadir",
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

  const values = [
    {
      title: "EXCELLENCE",
      description: "Des équipements de qualité professionnelle testés et approuvés par des athlètes.",
      icon: <Award className="h-8 w-8" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "INNOVATION",
      description: "Nous repoussons les limites avec des technologies de pointe et des designs innovants.",
      icon: <Zap className="h-8 w-8" />,
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "EXPERTISE",
      description: "Notre équipe d'experts vous guide vers les solutions les plus adaptées à vos objectifs.",
      icon: <Target className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "ENGAGEMENT",
      description: "Un service client premium et un accompagnement personnalisé à chaque étape.",
      icon: <ShieldCheck className="h-8 w-8" />,
      color: "from-red-500 to-pink-500",
    },
  ];

  const achievements = [
    { value: "2019", label: "Année de création", icon: <Calendar className="w-5 h-5" /> },
    { value: "5000+", label: "Clients satisfaits", icon: <UsersRound className="w-5 h-5" /> },
    { value: "500+", label: "Produits premium", icon: <Dumbbell className="w-5 h-5" /> },
    { value: "Maroc", label: "Présence nationale", icon: <Globe className="w-5 h-5" /> },
  ];

  const timeline = [
    { year: "2019", title: "Fondation", description: "Création d'IRONZ par RIDA MAGHRABI à Agadir", icon: <Sparkles className="w-5 h-5" /> },
    { year: "2020", title: "Expansion", description: "Ouverture du premier showroom premium", icon: <Building className="w-5 h-5" /> },
    { year: "2021", title: "Innovation", description: "Lancement de notre ligne d'équipements exclusifs", icon: <Zap className="w-5 h-5" /> },
    { year: "2023", title: "Leadership", description: "Devenu leader du fitness premium au Maroc", icon: <Crown className="w-5 h-5" /> },
    { year: "2024", title: "Vision", description: "Expansion internationale et développement de nouvelles technologies", icon: <TargetIcon className="w-5 h-5" /> },
  ];

  const teamFeatures = [
    {
      icon: <Medal className="w-6 h-6" />,
      title: "Athlètes professionnels",
      description: "Notre équipe comprend des champions reconnus",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion commune",
      description: "Une équipe unie par l'amour du sport",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance",
      description: "Nous repoussons les limites chaque jour",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Élite",
      description: "Excellence dans chaque détail",
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
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-yellow-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
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
                Notre histoire
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-6 text-white leading-[0.9]">
              À propos <span className="text-yellow-500">IRONZ</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              D'une passion pour le fitness vers une ambition nationale. 
              Découvrez l'histoire, les valeurs et la vision qui font d'IRONZ 
              le leader du fitness premium au Maroc.
            </p>

            {/* Achievements Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {achievement.icon}
                    <span className="text-3xl md:text-4xl font-black text-yellow-500">
                      {achievement.value}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400">
                    {achievement.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Flame className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Notre parcours
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                L'histoire derrière la <span className="text-yellow-500">performance</span>
              </h2>

              <div className="space-y-6 mb-10">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Fondée en 2019 par <span className="font-bold text-yellow-500">RIDA MAGHRABI</span>, ingénieur, 
                  ex-champion en bodybuilding et athlète professionnel, IRONZ est née d'une passion intense pour 
                  le fitness et d'une vision ambitieuse : rendre accessible des équipements de qualité professionnelle à tous.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ce qui a commencé comme une boutique à Agadir s'est rapidement transformé en un empire du fitness, 
                  devenant parmi les leaders marocains de l'équipement sportif premium, avec une présence en ligne forte 
                  et plusieurs showrooms d'excellence à travers le pays.
                </p>
              </div>

              {/* Team Features */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {teamFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <h4 className="font-black uppercase italic text-gray-900 dark:text-white">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Link href="/contact">
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl">
                  Rencontrer notre équipe
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8">
                <h3 className="text-2xl font-black uppercase italic mb-8 text-gray-900 dark:text-white">
                  Notre <span className="text-yellow-500">Évolution</span>
                </h3>
                
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative pl-12">
                      <div className="absolute left-0 top-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                          <span className="text-sm font-black text-white">{item.year}</span>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-gray-200 dark:border-gray-800 pl-8 pb-6">
                        <div className="flex items-center gap-3 mb-2">
                          {item.icon}
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                Ce qui nous définit
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
              Nos <span className="text-yellow-500">Valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Les principes fondamentaux qui guident chaque décision et action chez IRONZ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic mb-4 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/5 dark:to-orange-500/5 rounded-3xl p-8 md:p-12 border border-yellow-500/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-black uppercase italic text-gray-900 dark:text-white">
                  Notre <span className="text-yellow-500">Mission</span>
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Fournir des équipements de fitness premium qui permettent à chacun, 
                du débutant à l'athlète professionnel, d'atteindre ses objectifs de performance 
                dans un environnement sécurisé et inspirant.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-3xl p-8 md:p-12 border border-blue-500/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-black uppercase italic text-gray-900 dark:text-white">
                  Notre <span className="text-blue-500">Vision</span>
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Devenir la référence mondiale en équipements de fitness innovants, 
                en créant une communauté internationale d'athlètes unis par la passion 
                de la performance et l'excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                En images
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-white">
              IRONZ <span className="text-yellow-500">en Action</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez notre univers et notre passion pour l'excellence
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20" />
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/LED1s8Ecpbw"
              title="IRONZ PRO - L'excellence du fitness"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20"
          >
            {/* Contact Info */}
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <PhoneCall className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-black uppercase italic tracking-widest text-yellow-500">
                  Restons connectés
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-gray-900 dark:text-white">
                Contactez-<span className="text-yellow-500">nous</span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                Une question, un projet, ou simplement envie de discuter fitness ? 
                Notre équipe d'experts est à votre disposition.
              </p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Showroom principal</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      SAHARA MALL 1 ÈRE ÉTAGE C169 & C120, Agadir
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Téléphone</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">+212 674-114446</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">Email</h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">muscleironz2019@gmail.com</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-10">
                <Link href="/contact">
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-black uppercase italic tracking-widest px-8 py-6 rounded-2xl">
                    Nous contacter
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12"
            >
              <h3 className="text-3xl font-black uppercase italic mb-8 text-white">
                Rejoignez notre <span className="text-yellow-500">communauté</span>
              </h3>
              
              <p className="text-gray-300 mb-10 leading-relaxed">
                Suivez-nous sur les réseaux sociaux pour découvrir nos dernières innovations, 
                conseils d'experts et rejoindre une communauté passionnée par l'excellence.
              </p>

              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/ironz_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-white">Instagram</h4>
                    <p className="text-gray-400">@ironz_official</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="https://www.facebook.com/muscle.ironz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-white">Facebook</h4>
                    <p className="text-gray-400">@muscle.ironz</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href="https://www.youtube.com/@muscleironz8921"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-white">YouTube</h4>
                    <p className="text-gray-400">@muscleironz8921</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-6 text-black">
              Prêt à repousser vos limites ?
            </h2>
            <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
              Rejoignez la communauté IRONZ et transformez votre passion en performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/produit">
                <button className="px-8 py-4 bg-black hover:bg-gray-900 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg">
                  Découvrir nos produits
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <Link href="/demande-devis">
                <button className="px-8 py-4 bg-white hover:bg-gray-100 text-black font-black uppercase italic tracking-widest rounded-2xl transition-all shadow-lg">
                  Demander un devis
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}