"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Phone,
  Building,
  Users,
  Zap,
  Shield,
  Star,
  Award,
  TrendingUp,
  Clock,
  Sparkles,
  Target,
  Trophy,
  Crown,
  MapPin,
  MessageSquare,
  ChevronRight,
  PhoneCall,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import ServiceContactForm from "../../../../components/service-contact-form";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Sector {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
}

interface Package {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  popular: boolean;
  color: string;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

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

// ─── Guarantee items ──────────────────────────────────────────────────────────

const guarantees: string[] = [
  "Étude du besoin et cadrage du projet",
  "Sélection des équipements selon l'espace et l'usage",
  "Accompagnement pour la mise en place du projet",
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const sectors: Sector[] = [
  {
    icon: <Building className="h-8 w-8" />,
    title: "Salles de Sport",
    description:
      "Équipement complet pour salles de fitness, clubs de sport et centres d'entraînement.",
    features: [
      "Zones cardio et musculation",
      "Espaces cours collectifs",
      "Vestiaires et réception",
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Hôtels & Resorts",
    description:
      "Espaces fitness adaptés aux hôtels et établissements d'accueil.",
    features: [
      "Zone fitness dédiée",
      "Organisation de l'espace",
      "Équipements selon le besoin",
    ],
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Entreprises",
    description:
      "Espaces fitness d'entreprise pour le bien-être des employés.",
    features: [
      "Salles de sport corporate",
      "Espaces détente",
      "Solutions modulaires",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Centres Sportifs",
    description:
      "Équipements pour centres municipaux et complexes sportifs.",
    features: [
      "Équipements multi-sports",
      "Espaces polyvalents",
      "Solutions durables",
    ],
    color: "from-red-500 to-pink-500",
  },
];

const services: Service[] = [
  {
    icon: <Building className="h-8 w-8" />,
    title: "Étude & Conception",
    description:
      "Analyse complète de vos besoins et conception de plans détaillés avec visualisation 3D.",
    features: [
      "Audit de l'espace existant",
      "Organisation des zones d'entraînement",
      "Étude du besoin et de l'espace",
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Aménagement Complet",
    description:
      "Réalisation complète de votre projet avec coordination de tous les corps de métier.",
    features: [
      "Coordination des étapes du projet",
      "Organisation de l'aménagement",
      "Suivi selon le périmètre convenu",
    ],
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Équipements",
    description:
      "Sélection et installation des équipements adaptés à votre projet.",
    features: [
      "Choix selon les zones et l'usage",
      "Installation selon le projet",
      "Prise en main de l'espace installé",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Maintenance & Support",
    description:
      "Échange sur les besoins de suivi et les solutions adaptées à votre installation.",
    features: [
      "Suivi selon le périmètre du projet",
      "Échange sur les besoins complémentaires",
      "Solutions adaptées à l'installation",
    ],
    color: "from-red-500 to-pink-500",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Conseil & Formation",
    description:
      "Accompagnement dans la préparation et l'organisation de votre espace fitness.",
    features: [
      "Cadrage du besoin",
      "Organisation des zones",
      "Conseils liés à l'aménagement",
    ],
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Solutions du projet",
    description:
      "Échangez avec IRONZ sur le périmètre, les équipements et les étapes de votre projet.",
    features: [
      "Projet neuf ou rénovation",
      "Équipements et zones souhaités",
      "Devis personnalisé",
    ],
    color: "from-purple-500 to-pink-500",
  },
];

const packages: Package[] = [
  {
    name: "Étude du projet",
    description: "Pour cadrer le besoin et l'espace",
    icon: <Building className="h-10 w-10" />,
    features: [
      "Analyse de l'espace",
      "Organisation des zones",
      "Sélection selon l'usage",
      "Première orientation du projet",
    ],
    price: "Sur devis",
    popular: false,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Aménagement professionnel",
    description: "Pour organiser un espace fitness professionnel",
    icon: <Users className="h-10 w-10" />,
    features: [
      "Conception de l'aménagement",
      "Équipements adaptés au projet",
      "Organisation des zones d'entraînement",
      "Installation selon le périmètre",
      "Prise en main de l'espace",
    ],
    price: "Sur devis",
    popular: true,
    color: "from-black to-yellow-500",
  },
  {
    name: "Projet sur mesure",
    description: "Pour les configurations et besoins spécifiques",
    icon: <Crown className="h-10 w-10" />,
    features: [
      "Étude approfondie de l'espace",
      "Équipements adaptés au besoin",
      "Coordination de l'aménagement",
      "Solutions de revêtement selon le projet",
      "Accompagnement après installation selon le périmètre",
    ],
    price: "Sur devis",
    popular: false,
    color: "from-gray-900 to-yellow-600",
  },
];

const projectSignals = [
  "Projet neuf ou rénovation",
  "Organisation des zones",
  "Sélection d'équipements",
  "Installation selon le besoin",
];

// ─── Reusable feature list ────────────────────────────────────────────────────

function FeatureList({
  features,
  small = false,
}: {
  features: string[];
  small?: boolean;
}) {
  return (
    <ul className={`space-y-${small ? "2" : "3"}`}>
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle className="w-3 h-3 text-black" />
          </div>
          <span
            className={`text-gray-700 dark:text-gray-300 ${
              small ? "text-sm" : ""
            }`}
          >
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ─── Section badge ────────────────────────────────────────────────────────────

function SectionBadge({ icon, label }: {
  icon: React.ReactNode;
  label: string;
}){
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
      <span className="text-yellow-500" aria-hidden="true">{icon}</span>
      <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
        {label}
      </span>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SalleProfessionnellePage(){
  const whatsappHref =
    "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20de%20salle%20de%20sport%20professionnelle%20avec%20IRONZ.";
  const pageUrl = "https://www.ironz.ma/services/amenagement-salle/salle-professionnelle";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SportingGoodsStore",
      name: "IRONZ",
      url: "https://www.ironz.ma",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.ironz.ma/services" },
        { "@type": "ListItem", position: 3, name: "Aménagement de salle", item: "https://www.ironz.ma/services/amenagement-salle" },
        { "@type": "ListItem", position: 4, name: "Salle Professionnelle", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Aménagement de salle de sport professionnelle",
      provider: { "@type": "Organization", name: "IRONZ", url: "https://www.ironz.ma" },
      url: pageUrl,
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative container mx-auto px-4">
          {/* Breadcrumb */}
          <nav aria-label="Fil d’Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-yellow-500">Accueil</Link></li>
              <li aria-hidden="true">→</li>
              <li><Link href="/services" className="hover:text-yellow-500">Services</Link></li>
              <li aria-hidden="true">→</li>
              <li><Link href="/services/amenagement-salle" className="hover:text-yellow-500">Aménagement de salle</Link></li>
              <li aria-hidden="true">→</li>
              <li aria-current="page" className="text-gray-300">Salle Professionnelle</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <SectionBadge icon={<Sparkles className="w-4 h-4" />} label="Projet fitness professionnel" />

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-wide mb-6 text-white leading-[0.9]">
              Aménagement de salle de sport{" "}
              <span className="text-yellow-500">professionnelle au Maroc</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              Préparez votre projet fitness professionnel avec une organisation
              de l&apos;espace, une sélection d&apos;équipements et une installation
              adaptées aux salles de sport, hôtels, entreprises et centres sportifs.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mb-10"
            >
              {projectSignals.map((signal, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 text-center"
                >
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300">{signal}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div variants={scaleIn}>
                <Link
                  href="/demande-devis?service=salle-professionnelle"
                  className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all shadow-lg"
                >
                  Demander un devis personnalisé
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.a
                variants={scaleIn}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all shadow-lg"
              >
                <IoLogoWhatsapp className="w-5 h-5" />
                WhatsApp projet professionnel
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Target Sectors ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionBadge
              icon={<Target className="w-4 h-4" />}
              label="Secteurs d'expertise"
            />
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Nos <span className="text-yellow-500">Secteurs</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Des solutions professionnelles adaptées à chaque type
              d&apos;établissement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/50 h-full">
                  <div
                    className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    <div className="text-black">{sector.icon}</div>
                  </div>

                  <h3 className="text-2xl font-display uppercase tracking-wide mb-4 text-gray-900 dark:text-white">
                    {sector.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {sector.description}
                  </p>

                  <FeatureList features={sector.features} small />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionBadge
              icon={<Trophy className="w-4 h-4" />}
              label="Services professionnels"
            />
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Nos <span className="text-yellow-500">Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Une organisation du projet, de l&apos;étude de l&apos;espace à la mise en place
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/50 h-full">
                  <div
                    className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    <div className="text-black">{service.icon}</div>
                  </div>

                  <h3 className="text-2xl font-display uppercase tracking-wide mb-4 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <FeatureList features={service.features} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <SectionBadge icon={<Building className="w-4 h-4" />} label="Pour quels projets ?" />
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Un projet fitness <span className="text-yellow-500">professionnel</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Cette prestation s&apos;adresse aux porteurs de projets et aux établissements qui souhaitent organiser ou réorganiser un espace fitness avec une sélection d&apos;équipements cohérente avec le lieu et l&apos;usage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              "Nouvel espace fitness",
              "Rénovation d'une salle existante",
              "Espace fitness d'un hôtel",
              "Espace fitness d'entreprise",
              "Espace d'un centre sportif",
            ].map((projectType) => (
              <div key={projectType} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
                <h3 className="text-lg font-display uppercase tracking-wide text-gray-900 dark:text-white">{projectType}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionBadge icon={<Target className="w-4 h-4" />} label="Périmètre du projet" />
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
                De l&apos;espace à la <span className="text-yellow-500">mise en place</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                IRONZ vous accompagne pour comprendre le besoin, organiser les zones, sélectionner les équipements et préparer leur installation. Les solutions de revêtement peuvent être étudiées lorsqu&apos;elles sont utiles au projet.
              </p>
              <Link href="/services/revetement-sol-mur" className="text-yellow-600 dark:text-yellow-400 font-display uppercase tracking-widest hover:underline">
                Découvrir le revêtement de sol sportif
              </Link>
            </div>
            <div>
              <h2 className="text-3xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">Les étapes</h2>
              <ol className="space-y-4">
                {[
                  "Étude du projet",
                  "Organisation de l'espace",
                  "Sélection des équipements et solutions",
                  "Installation et prise en main",
                ].map((step, index) => (
                  <li key={step} className="flex items-start gap-4 rounded-2xl bg-white dark:bg-gray-800 p-5 border border-gray-100 dark:border-gray-700">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-bold text-black">{index + 1}</span>
                    <span className="text-lg text-gray-700 dark:text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionBadge icon={<MessageSquare className="w-4 h-4" />} label="Préparez votre demande" />
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
            Les informations utiles pour <span className="text-yellow-500">votre projet</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            Pour recevoir une première orientation, indiquez si possible votre ville, le type d&apos;établissement, s&apos;il s&apos;agit d&apos;un projet neuf ou d&apos;une rénovation, la surface approximative, les zones souhaitées, vos besoins en équipements ou en revêtement, votre budget approximatif et le délai souhaité. Des plans ou photos peuvent compléter la demande.
          </p>
          <Link href="/demande-devis?service=salle-professionnelle" className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-6 py-4 rounded-xl transition-all shadow-lg">
            Préparer ma demande
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Packages ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionBadge
              icon={<Crown className="w-4 h-4" />}
              label="Formules professionnelles"
            />
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Périmètre du projet{" "}
              <span className="text-yellow-500">sur devis</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Des étapes et solutions adaptées au besoin de votre établissement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group h-full"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-yellow-500 text-black px-6 py-2 rounded-full font-display uppercase tracking-widest text-sm">
                      Recommandé
                    </div>
                  </div>
                )}

                <div
                  className={`bg-yellow-500 rounded-3xl p-0.5 h-full ${
                    pkg.popular ? "scale-[1.02]" : ""
                  }`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-[1.25rem] p-8 h-full flex flex-col">
                    {/* Package header */}
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 rounded-2xl bg-yellow-500 flex items-center justify-center mx-auto mb-4">
                        <div className="text-black">{pkg.icon}</div>
                      </div>
                      <h3 className="text-2xl font-display uppercase tracking-wide mb-2 text-gray-900 dark:text-white">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8 flex-1">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-black" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="text-center pt-8 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-3xl font-display tracking-wide text-gray-900 dark:text-white mb-6">
                        {pkg.price}
                      </div>
                      <Link href="/demande-devis?service=salle-professionnelle" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-6 py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
                        Demander un devis
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionBadge
                icon={<PhoneCall className="w-4 h-4" />}
                label="Échange sur votre projet"
              />

              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
                Prêt à lancer votre{" "}
                <span className="text-yellow-500">projet pro</span> ?
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                Décrivez votre projet d&apos;espace fitness professionnel pour
                recevoir une première orientation et un devis personnalisé.
              </p>

              {/* Contact cards */}
              <div className="space-y-6 mb-10">
                {/* Phone */}
                <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
                      Ligne dédiée professionnels
                    </h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      +212 674-114446
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IoLogoWhatsapp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
                      WhatsApp projet professionnel
                    </h4>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      Message prérempli à valider
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
                      Showroom IRONZ
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      SAHARA MALL 1 ÈRE ÉTAGE C169 & C120, Agadir
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-display uppercase tracking-wide mb-4 text-gray-900 dark:text-white">
                  Points de cadrage du projet
                </h3>
                <div className="space-y-4">
                  {guarantees.map((g, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {g}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 shadow-2xl">
                <SectionBadge
                  icon={<MessageSquare className="w-4 h-4" />}
                  label="Devis professionnel"
                />

                <h3 className="text-3xl font-display uppercase tracking-wide mb-8 text-white">
                  Demande de{" "}
                  <span className="text-yellow-500">devis pro</span>
                </h3>

                <p className="text-gray-300 mb-8 leading-relaxed">
                  Remplissez ce formulaire pour décrire votre projet professionnel
                  et recevoir une orientation ainsi qu&apos;un devis personnalisé.
                </p>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <ServiceContactForm service="Aménagement Salle Professionnelle" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-black">
              Préparez votre projet d&apos;espace fitness
            </h2>
            <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
              Échangez avec IRONZ sur l&apos;organisation de l&apos;espace, les
              équipements et les solutions adaptées à votre établissement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis?service=salle-professionnelle" className="px-8 py-6 bg-black hover:bg-gray-900 text-white font-display uppercase tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3">
                Demander un devis personnalisé
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-6 bg-white hover:bg-gray-100 text-black font-display uppercase tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <IoLogoWhatsapp className="w-6 h-6" />
                WhatsApp projet professionnel
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WhatsApp Floating Button ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact via WhatsApp"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-2xl transition-all flex items-center justify-center"
        >
          <IoLogoWhatsapp className="w-7 h-7" />
        </a>
      </motion.div>
    </main>
  );
}
