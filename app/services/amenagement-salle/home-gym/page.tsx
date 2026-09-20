"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Phone,
  Home,
  Dumbbell,
  Shield,
  Clock,
  MapPin,
  ChevronRight,
  Users,
  Ruler,
  Sparkles,
  Wallet,
  CalendarDays,
  MapPinned,
  Camera,
} from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import ServiceContactForm from "../../../../components/service-contact-form";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Package {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  popular: boolean;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface AudienceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SpaceType {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PreparationItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Structured data ──────────────────────────────────────────────────────────

const PAGE_URL = "https://www.ironz.ma/services/amenagement-salle/home-gym";
const WHATSAPP_URL =
  "https://wa.me/212674114446?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20Home%20Gym%20avec%20IRONZ.";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.ironz.ma/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://www.ironz.ma/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Aménagement de salle",
      item: "https://www.ironz.ma/services/amenagement-salle",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Home Gym",
      item: PAGE_URL,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Aménagement de Home Gym",
  provider: {
    "@type": "Organization",
    name: "IRONZ",
    url: "https://www.ironz.ma/",
  },
  url: PAGE_URL,
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const benefits: Benefit[] = [
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Entraînement à domicile",
    description:
      "Vous vous entraînez chez vous, au moment qui vous convient, sans déplacement ni contrainte d'horaires.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Espace dédié et privé",
    description:
      "Un environnement de pratique personnel, sans attente sur les machines et sans dérangement.",
  },
  {
    icon: <Ruler className="h-8 w-8" />,
    title: "Aménagement adapté à l'espace",
    description:
      "L'organisation de la pièce, les dégagements et le matériel sont pensés pour la surface dont vous disposez.",
  },
  {
    icon: <Dumbbell className="h-8 w-8" />,
    title: "Équipements sélectionnés pour la pièce",
    description:
      "Les appareils et accessoires sont choisis en fonction de l'espace, de votre pratique et de votre budget.",
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: "Pour appartement ou maison",
    description:
      "Un espace d'entraînement peut être installé dans différentes configurations, du coin fitness à la pièce dédiée.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Ensemble cohérent",
    description:
      "L'implantation, le revêtement de sol et le matériel sont traités ensemble pour un espace fonctionnel.",
  },
];

const packages: Package[] = [
  {
    name: "Espace fitness compact",
    description: "Un premier aménagement sur une surface réduite",
    icon: <Home className="h-10 w-10" />,
    features: [
      "Étude de l'espace disponible",
      "Choix d'équipements compacts et polyvalents",
      "Solutions de rangement",
      "Revêtement de sol sportif adapté",
    ],
    popular: false,
  },
  {
    name: "Salle équilibrée",
    description: "Cardio et musculation sur une surface intermédiaire",
    icon: <Dumbbell className="h-10 w-10" />,
    features: [
      "Étude de l'espace et proposition d'implantation",
      "Zone cardio et zone musculation",
      "Sélection d'équipements adaptée à vos pratiques",
      "Revêtement de sol et finitions",
    ],
    popular: true,
  },
  {
    name: "Espace dédié complet",
    description: "Une pièce entière consacrée à l'entraînement",
    icon: <Dumbbell className="h-10 w-10" />,
    features: [
      "Étude complète de la pièce",
      "Organisation des zones et des circulations",
      "Sélection d'équipements sur plusieurs postes",
      "Revêtement de sol, protections murales et finitions",
      "Prise en main du matériel",
    ],
    popular: false,
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Étude du projet",
    description:
      "Discussion sur vos objectifs, votre espace et vos contraintes, à partir des informations que vous nous transmettez.",
    icon: <Phone className="w-8 h-8" />,
  },
  {
    number: "02",
    title: "Conception de l'aménagement",
    description:
      "Proposition d'implantation et planification de votre futur espace home gym.",
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    number: "03",
    title: "Sélection et installation",
    description:
      "Choix des équipements adaptés à la pièce, puis installation du matériel sur place.",
    icon: <Dumbbell className="w-8 h-8" />,
  },
  {
    number: "04",
    title: "Prise en main",
    description:
      "Explication du matériel installé et des informations utiles à son utilisation.",
    icon: <CheckCircle className="w-8 h-8" />,
  },
];

const audiences: AudienceItem[] = [
  {
    icon: <Users className="h-7 w-7" />,
    title: "Particuliers",
    description:
      "Ce service s'adresse aux personnes souhaitant aménager un espace d'entraînement chez elles.",
  },
  {
    icon: <Home className="h-7 w-7" />,
    title: "Maisons et villas",
    description:
      "Pour une pièce dédiée ou un espace à convertir en salle de sport.",
  },
  {
    icon: <MapPin className="h-7 w-7" />,
    title: "Appartements",
    description:
      "Lorsque la surface, le sol et la disposition le permettent, un espace fitness peut être installé en appartement.",
  },
];

const spaceTypes: SpaceType[] = [
  {
    icon: <Home className="h-7 w-7" />,
    title: "Pièce dédiée",
    description:
      "Une chambre ou un espace inutilisé que vous consacrez entièrement à l'entraînement.",
  },
  {
    icon: <Dumbbell className="h-7 w-7" />,
    title: "Pièce existante à adapter",
    description:
      "Un bureau, un salon ou un espace de vie que vous souhaitez réorganiser pour y installer du matériel.",
  },
  {
    icon: <Ruler className="h-7 w-7" />,
    title: "Garage ou espace convertible",
    description:
      "Un garage, un sous-sol ou un espace technique que l'on peut transformer en salle de sport.",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Espace fitness plus vaste",
    description:
      "Un grand volume à organiser en plusieurs zones d'entraînement, dans une villa ou une grande habitation.",
  },
];

const preparationItems: PreparationItem[] = [
  {
    icon: <MapPinned className="h-6 w-6" />,
    title: "Votre ville",
    description: "Indispensable pour évaluer la faisabilité du déplacement.",
  },
  {
    icon: <Ruler className="h-6 w-6" />,
    title: "Surface approximative",
    description: "Les dimensions de la pièce ou de l'espace à aménager.",
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: "Type d'espace",
    description: "Pièce dédiée, garage, pièce de vie à adapter…",
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Budget approximatif",
    description: "Une fourchette indicative pour orienter la sélection.",
  },
  {
    icon: <CalendarDays className="h-6 w-6" />,
    title: "Délai souhaité",
    description: "La période à laquelle vous souhaitez démarrer le projet.",
  },
  {
    icon: <Camera className="h-6 w-6" />,
    title: "Photos de l'espace",
    description: "Utiles mais non obligatoires pour préciser le contexte.",
  },
];

const serviceIncludes: string[] = [
  "Étude de l'espace disponible et de vos pratiques",
  "Proposition d'aménagement et d'implantation",
  "Sélection des équipements adaptés à la pièce",
  "Revêtement de sol sportif et protections",
  "Installation du matériel sur place",
  "Prise en main et informations d'utilisation",
  "Devis détaillé avant le démarrage",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
      <span className="text-sm font-display uppercase tracking-widest text-yellow-500">
        {label}
      </span>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
  valueClass = "text-lg font-bold text-gray-900 dark:text-white",
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-yellow-500 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
          {title}
        </h4>
        <p className={valueClass}>{value}</p>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeGymPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Fil d'Ariane">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-400">
              <li>
                <Link href="/" className="hover:text-yellow-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-yellow-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li>
                <Link
                  href="/services/amenagement-salle"
                  className="hover:text-yellow-500 transition-colors"
                >
                  Aménagement de salle
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li className="text-yellow-500" aria-current="page">
                Home Gym
              </li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <SectionBadge label="Aménagement Home Gym" />

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-wide mb-6 text-white leading-[0.95]">
              Aménagement Home Gym{" "}
              <span className="text-yellow-500">sur mesure au Maroc</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
              IRONZ aménage votre espace d'entraînement à domicile : étude de
              l'espace, proposition d'aménagement, sélection des équipements,
              installation et revêtement de sol sportif.
            </p>

            {/* CTA Buttons */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div variants={scaleIn}>
                <Link
                  href="/demande-devis?service=home-gym"
                  className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all shadow-lg"
                >
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.a
                variants={scaleIn}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all shadow-lg"
              >
                <IoLogoWhatsapp className="w-6 h-6" />
                WhatsApp
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionBadge label="Pourquoi un Home Gym" />
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Pourquoi choisir un{" "}
              <span className="text-yellow-500">Home Gym</span> ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Un espace d'entraînement chez vous, organisé pour la surface dont
              vous disposez
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/50 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-black">{benefit.icon}</div>
                  </div>

                  <h3 className="text-2xl font-display uppercase tracking-wide mb-4 text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who is it for ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionBadge label="Pour qui" />
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Pour qui est fait{" "}
              <span className="text-yellow-500">ce service</span> ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              L'aménagement d'un home gym concerne des situations variées
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {audiences.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">
                  <div className="text-yellow-500">{item.icon}</div>
                </div>
                <h3 className="text-xl font-display uppercase tracking-wide mb-3 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Types of spaces ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionBadge label="Types d'espaces" />
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Les espaces{" "}
              <span className="text-yellow-500">à aménager</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              La nature de l'espace guide la sélection du matériel et
              l'organisation de la pièce
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {spaceTypes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-yellow-500 flex items-center justify-center mb-6">
                  <div className="text-black">{item.icon}</div>
                </div>
                <h3 className="text-lg font-display uppercase tracking-wide mb-3 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 dark:text-gray-500 text-sm mt-10 max-w-2xl mx-auto"
          >
            Les configurations ci-dessus sont des exemples d'organisation. La
            faisabilité d'un projet dépend de la surface, du sol, des accès et
            des contraintes propres à votre pièce.
          </motion.p>
        </div>
      </section>

      {/* ── Packages ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionBadge label="Nos solutions" />
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Solutions <span className="text-yellow-500">Home Gym</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Des aménagements pensés selon l'espace disponible et vos pratiques.
              L'équipement d'un home gym s'organise autour de deux piliers : les{" "}
              <Link
                href="/categories/equipements/machine-de-fitness"
                className="text-yellow-600 dark:text-yellow-400 font-semibold underline underline-offset-4 hover:text-yellow-500"
              >
                machines de fitness et de musculation
              </Link>{" "}
              pour le cardio et le travail guidé, et les{" "}
              <Link
                href="/categories/accessoires/poids-libres"
                className="text-yellow-600 dark:text-yellow-400 font-semibold underline underline-offset-4 hover:text-yellow-500"
              >
                haltères, kettlebells et disques
              </Link>{" "}
              pour la musculation libre, qui demandent moins de surface.
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
                      Le plus demandé
                    </div>
                  </div>
                )}

                <div
                  className={`bg-yellow-500 rounded-3xl p-0.5 h-full ${pkg.popular ? "scale-[1.02]" : ""}`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-[1.25rem] p-8 h-full flex flex-col">
                    {/* Header */}
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
                      <div className="text-2xl font-display tracking-wide text-gray-900 dark:text-white mb-2">
                        Sur devis
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                        Prix dépendant de l'espace et du matériel choisi
                      </p>
                      <Link href="/demande-devis?service=home-gym">
                        <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-6 py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
                          Demander un devis
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionBadge label="Notre processus" />
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
              Un projet en <span className="text-yellow-500">4 étapes</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              De la première discussion à l'installation de votre home gym
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-center relative z-10 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                      <span className="text-lg font-display text-black">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 flex items-center justify-center mx-auto mb-6 mt-6">
                    <div className="text-yellow-500">{step.icon}</div>
                  </div>

                  <h3 className="text-xl font-display uppercase tracking-wide mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transform -translate-y-1/2 -translate-x-4 z-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prepare your request ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
              <div className="text-center mb-12">
                <SectionBadge label="Préparez votre demande" />
                <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
                  Préparez votre{" "}
                  <span className="text-yellow-500">demande de devis</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Ces informations permettent d'étudier votre projet plus
                  rapidement
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {preparationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center flex-shrink-0">
                      <div className="text-black">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/demande-devis?service=home-gym"
                  className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all shadow-lg"
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Inline quote form ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <SectionBadge label="Demande directe" />
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
                Décrire votre projet{" "}
                <span className="text-yellow-500">Home Gym</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Envoyez les premiers éléments de votre projet. Votre message
                sera préparé pour WhatsApp, à vous de l'y envoyer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <ServiceContactForm service="Aménagement Home Gym sur mesure" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Flooring link + contact info ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionBadge label="Contact" />

              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-6 text-gray-900 dark:text-white">
                Discuter de votre <span className="text-yellow-500">projet</span>
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                L'équipe IRONZ vous accompagne dans la création de votre home
                gym, de la première discussion à l'installation finale.
              </p>

              {/* Flooring contextual link */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center flex-shrink-0">
                    <Ruler className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      Revêtement de sol sportif
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Le sol d'un home gym amortit les chocs, protège le support
                      et stabilise le matériel. Les solutions de{" "}
                      <Link
                        href="/services/revetement-sol-mur"
                        className="text-yellow-600 dark:text-yellow-400 font-semibold underline underline-offset-4 hover:text-yellow-500"
                      >
                        revêtement de sol sportif
                      </Link>{" "}
                      font partie du projet d'aménagement. Côté matériel, les{" "}
                      <Link
                        href="/categories/accessoires/accessoires-de-fitness"
                        className="text-yellow-600 dark:text-yellow-400 font-semibold underline underline-offset-4 hover:text-yellow-500"
                      >
                        accessoires de fitness
                      </Link>{" "}
                      complètent l'espace pour la récupération et le travail au
                      sol.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <ContactCard
                  icon={<Phone className="w-6 h-6 text-white" />}
                  title="Téléphone direct"
                  value="+212 674-114446"
                />
                <ContactCard
                  icon={<IoLogoWhatsapp className="w-6 h-6 text-white" />}
                  title="WhatsApp"
                  value="Contact direct"
                />
                <ContactCard
                  icon={<MapPin className="w-6 h-6 text-white" />}
                  title="Showroom IRONZ"
                  value="SAHARA MALL 1 ÈRE ÉTAGE C169 & C120, Agadir"
                  valueClass="text-gray-600 dark:text-gray-400"
                />
              </div>
            </motion.div>

            {/* Service summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12"
            >
              <SectionBadge label="Ce que comprend le service" />

              <h3 className="text-3xl font-display uppercase tracking-wide mb-8 text-white">
                Contenu de la{" "}
                <span className="text-yellow-500">prestation</span>
              </h3>

              <ul className="space-y-6">
                {serviceIncludes.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">
                        {item}
                      </h4>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-white/10 space-y-4">
                <Link
                  href="/demande-devis?service=home-gym"
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-display uppercase tracking-widest px-8 py-6 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2"
                >
                  <IoLogoWhatsapp className="w-5 h-5" />
                  WhatsApp
                  <ChevronRight className="w-5 h-5" />
                </a>
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
              Prêt à aménager votre Home Gym ?
            </h2>
            <p className="text-xl text-black/90 mb-10 max-w-2xl mx-auto">
              Décrivez votre projet et demandez un devis détaillé à l'équipe
              IRONZ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis?service=home-gym">
                <button className="px-8 py-6 bg-black hover:bg-gray-900 text-white font-display uppercase tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-6 bg-white hover:bg-gray-100 text-black font-display uppercase tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <IoLogoWhatsapp className="w-6 h-6" />
                WhatsApp
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
          href={WHATSAPP_URL}
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
