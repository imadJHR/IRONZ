"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle,
  Users,
  Truck,
  PenTool as Tool,
  Shield,
  Award,
  ArrowRight,
  ArrowLeft,
  Clock,
  Target,
  Star,
  ChevronRight,
  Phone,
  Medal,
  UsersRound,
  Calendar,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import { getCanonicalServiceCards, ServiceHubIconName } from "../../lib/services";

// --- Interfaces ---

interface Stat {
  value: string;
  label: string;
  icon: ReactNode;
}

interface SupportService {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
  price: string;
  cta: string;
  color: string;
  highlights: string[];
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}

interface FAQ {
  question: string;
  answer: string;
}

function ServiceHubIcon({ name }: { name: ServiceHubIconName }) {
  const common = {
    className: "h-10 w-10",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
  };

  switch (name) {
    case "home":
      return <svg {...common}><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></svg>;
    case "building":
      return <svg {...common}><path d="M4 21V5l8-2 8 2v16" /><path d="M8 8h1M15 8h1M8 12h1M15 12h1M8 16h1M15 16h1" /><path d="M10 21v-3h4v3" /></svg>;
    case "palette":
      return <svg {...common}><path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h2a7 7 0 0 0 0-10Z" /><path d="M7.5 10h.01M9 6.5h.01M14 6.5h.01M17 10h.01" /></svg>;
    case "activity":
      return <svg {...common}><circle cx="12" cy="5" r="2" /><path d="m9 21 1.5-7L7 11l2-3 3 2 3-2 2 3-3.5 3 1.5 7" /><path d="M10.5 14h3" /></svg>;
    case "layers":
      return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></svg>;
    case "outdoor":
      return <svg {...common}><path d="M4 20h16M6 20V9h12v11M9 9V5h6v4M8 13h8M9 17h6" /></svg>;
    case "layout":
    default:
      return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 10v10" /></svg>;
  }
}

export default function ServicesPage() {
  const canonicalServiceCards = getCanonicalServiceCards();

  const supportServices: SupportService[] = [
    {
      id: 1,
      title: "Installation d'équipement",
      description:
        "Accompagnement pour mettre en place vos équipements de fitness IRONZ dans de bonnes conditions d'usage.",
      icon: <Tool className="h-10 w-10" />,
      features: [
        "Préparation de l'espace",
        "Montage et mise en place",
        "Vérification d'usage",
        "Conseils de prise en main",
        "Orientation vers le bon interlocuteur IRONZ",
      ],
      price: "Sur devis",
      cta: "Demander un devis",
      color: "from-yellow-500 to-yellow-600",
      highlights: ["Projet cadré", "Mise en place", "Conseils"],
    },
    {
      id: 2,
      title: "Maintenance et réparation",
      description:
        "Demande d'assistance pour diagnostiquer un équipement et organiser la solution adaptée selon le cas.",
      icon: <Tool className="h-10 w-10" />,
      features: [
        "Analyse de la demande",
        "Orientation technique",
        "Pièces selon disponibilité",
        "Intervention selon le projet",
        "Suivi avec l'équipe IRONZ",
      ],
      price: "Sur devis",
      cta: "Prendre contact",
      color: "from-gray-700 to-gray-950",
      highlights: ["Diagnostic", "Assistance", "Suivi"],
    },
    {
      id: 3,
      title: "Conseil & accompagnement",
      description:
        "Aide au choix des équipements ou des services adaptés à votre espace, votre usage et votre budget.",
      icon: <Users className="h-10 w-10" />,
      features: [
        "Analyse du besoin",
        "Choix des équipements",
        "Conseils d'aménagement",
        "Orientation vers les services liés",
        "Accompagnement avant devis",
      ],
      price: "Selon projet",
      cta: "Parler du projet",
      color: "from-gray-600 to-gray-900",
      highlights: ["Conseil", "Choix matériel", "Projet"],
    },
    {
      id: 4,
      title: "Livraison & montage",
      description:
        "Organisation de la livraison et du montage selon la nature des produits, l'adresse et les contraintes d'accès.",
      icon: <Truck className="h-10 w-10" />,
      features: [
        "Coordination de la livraison",
        "Montage selon produit",
        "Gestion des contraintes d'accès",
        "Informations de suivi",
        "Support client IRONZ",
      ],
      price: "Selon commande",
      cta: "Demander les détails",
      color: "from-gray-700 to-gray-950",
      highlights: ["Livraison", "Montage", "Coordination"],
    },
    {
      id: 5,
      title: "Suivi après achat",
      description:
        "Point de contact pour les questions après achat, l'utilisation des équipements et les demandes de support.",
      icon: <Shield className="h-10 w-10" />,
      features: [
        "Questions d'utilisation",
        "Orientation support",
        "Suivi de demande",
        "Informations produit",
        "Accompagnement client",
      ],
      price: "Selon demande",
      cta: "Contacter IRONZ",
      color: "from-gray-600 to-gray-900",
      highlights: ["Support", "Suivi", "Conseil"],
    },
    {
      id: 6,
      title: "Étude de projet fitness",
      description:
        "Cadrage d'un projet d'espace fitness avant devis : usage, surface, équipements et priorités du client.",
      icon: <Award className="h-10 w-10" />,
      features: [
        "Cadrage du besoin",
        "Analyse de l'espace",
        "Sélection d'équipements",
        "Priorisation du budget",
        "Préparation du devis",
      ],
      price: "Sur devis",
      cta: "Demander une étude",
      color: "from-gray-700 to-gray-950",
      highlights: ["Étude", "Équipement", "Devis"],
    },
  ];

  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Consultation du projet",
      description: "Analyse approfondie de vos besoins avec nos experts IRONZ",
      icon: <Target className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "Devis personnalisé",
      description: "Proposition adaptée au besoin, à l'espace et aux équipements envisagés",
      icon: <Award className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Planification du projet",
      description: "Organisation des étapes selon les contraintes et les priorités du projet",
      icon: <Calendar className="w-8 h-8" />,
    },
    {
      number: "04",
      title: "Mise en œuvre du projet",
      description: "Réalisation ou accompagnement selon le service validé avec IRONZ",
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "Quels sont les délais d'intervention pour une installation ?",
      answer:
        "Le délai dépend du type de demande, de l'adresse et de la disponibilité des équipements ou pièces nécessaires. L'équipe IRONZ vous confirme les étapes après étude.",
    },
    {
      question: "Les services sont-ils disponibles partout au Maroc ?",
      answer:
        "Les demandes sont étudiées selon la ville, le type de service et les contraintes du projet. IRONZ vous confirme la faisabilité avant devis.",
    },
    {
      question: "Comment se déroule une séance de coaching personnalisé ?",
      answer:
        "L'accompagnement commence par la compréhension de votre besoin, puis l'équipe vous oriente vers les équipements ou services adaptés.",
    },
    {
      question: "Quelles conditions de suivi sont prévues ?",
      answer:
        "Les conditions de suivi dépendent du produit et de la demande. Contactez IRONZ avec la référence concernée pour une réponse adaptée.",
    },
  ];

  const stats: Stat[] = [
    { value: "Devis", label: "Personnalisé", icon: <Star className="w-5 h-5" /> },
    { value: "Projet", label: "Étudié", icon: <Clock className="w-5 h-5" /> },
    { value: "IRONZ", label: "Accompagnement", icon: <UsersRound className="w-5 h-5" /> },
    { value: "Maroc", label: "Services", icon: <Medal className="w-5 h-5" /> },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleIn: Variants = {
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
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-600/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative container mx-auto px-4">
          <nav className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-yellow-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l&apos;accueil
            </Link>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
                Services IRONZ
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-wide mb-6 text-white leading-[0.95]">
              Nos <span className="text-yellow-500">Services</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Découvrez notre gamme de services adaptés pour vous accompagner dans vos projets fitness, de l&apos;installation à l&apos;aménagement.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mb-10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2 text-yellow-500">
                    {stat.icon}
                    <span className="text-3xl md:text-4xl font-display tracking-wide">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-display uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/demande-devis"
                className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all shadow-lg"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all border border-white/10"
              >
                <Phone className="w-5 h-5" />
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/5" />
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
                Services pratiques
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Nos <span className="text-yellow-500">Services</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/50 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-black">
                        {service.icon}
                    </div>
                    
                    <h3 className="text-2xl font-display uppercase tracking-wide mb-4 text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                      {service.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-display uppercase tracking-widest bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                    <Link href="/demande-devis" className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                        Demander un devis <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Routes ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/5" />

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
                Services détaillés
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Chaque <span className="text-yellow-500">Service</span> en détail
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explorez nos prestations spécifiques et trouvez la solution adaptée à vos besoins
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {canonicalServiceCards.map((service, index) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/50 cursor-pointer h-full flex flex-col">
                  <div className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                      <ServiceHubIcon name={service.icon} />
                    </div>
                    <h3 className="text-xl font-display uppercase tracking-wide mb-2 text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                      {service.desc}
                    </p>
                    <div className="mt-4 text-yellow-500 font-medium text-sm flex items-center gap-2">
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
                Notre processus
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Excellence en <span className="text-yellow-500">4 Étapes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                  <div className="bg-zinc-950 rounded-2xl p-8 text-center relative z-10 border border-white/10">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-display text-lg">
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-6 mt-6 text-yellow-500">
                        {step.icon}
                    </div>
                    
                    <h3 className="text-xl font-display uppercase tracking-wide mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 transform -translate-y-1/2 -translate-x-4 z-0 opacity-30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/5" />
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
                FAQ services
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Questions <span className="text-yellow-500">fréquentes</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-yellow-500/30 transition-colors"
                >
                  <h3 className="text-xl font-display uppercase tracking-wide mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black text-sm font-display shrink-0">
                      ?
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-black">
              Prêt à parler de votre projet ?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis" className="px-8 py-6 bg-black hover:bg-zinc-800 text-white font-display uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-3">
                Demander un devis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="px-8 py-6 bg-white hover:bg-gray-100 text-black font-display uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-3">
                <Phone className="w-5 h-5" />
                Nous contacter
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <a
          href="https://wa.me/212674114446"
          target="_blank"
          rel="noreferrer"
          aria-label="Discuter avec IRONZ sur WhatsApp"
          className="w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg hover:shadow-2xl transition-all flex items-center justify-center"
        >
          <IoLogoWhatsapp className="w-7 h-7" />
        </a>
      </motion.div>
    </main>
  );
}