import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ServiceContactForm from "@/components/service-contact-form";

export const metadata = {
  title: "Aménagement Salle de Sport Professionnelle | IRONZ PRO",
  description:
    "Créez votre salle de sport professionnelle avec IRONZ PRO. Solutions complètes pour salles de fitness, hôtels, entreprises et centres sportifs.",
};

export default function SalleProfessionnellePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-yellow-600 via-yellow-700 to-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 via-yellow-700/80 to-black/90" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services/amenagement-salle"
            className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'aménagement de salle
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mr-4">
                <Building className="h-6 w-6 text-white" />
              </div>
              <span className="text-yellow-300 font-medium">
                Salle Professionnelle
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Votre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">
                Salle de Sport
              </span>{" "}
              Professionnelle
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Créez un espace fitness professionnel de haute qualité qui attire
              et fidélise votre clientèle. Nos solutions complètes s'adaptent
              aux salles de sport, hôtels, entreprises et centres sportifs avec
              des équipements haut de gamme et un design moderne.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/demande-devis">
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Demander un devis gratuit
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  20+
                </div>
                <div className="text-gray-300 text-sm">Salles équipées</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">5</div>
                <div className="text-gray-300 text-sm">Ans d'expertise</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  50+
                </div>
                <div className="text-gray-300 text-sm">Marques partenaires</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-300 text-sm">Support technique</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Sectors */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Nos Secteurs d'Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Des solutions professionnelles adaptées à chaque type
              d'établissement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Salles de Sport
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Équipement complet pour salles de fitness, clubs de sport et
                  centres d'entraînement.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Zones cardio et musculation</li>
                  <li>• Espaces cours collectifs</li>
                  <li>• Vestiaires et réception</li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Hôtels & Resorts
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Espaces wellness haut de gamme pour hôtels 4 et 5 étoiles.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Fitness center luxueux</li>
                  <li>• Spa et bien-être</li>
                  <li>• Piscines et jacuzzis</li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-black to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Entreprises
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Espaces fitness d'entreprise pour le bien-être des employés.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Salles de sport corporate</li>
                  <li>• Espaces détente</li>
                  <li>• Solutions modulaires</li>
                </ul>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Centres Sportifs
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Équipements pour centres municipaux et complexes sportifs.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Équipements multi-sports</li>
                  <li>• Espaces polyvalents</li>
                  <li>• Solutions durables</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-yellow-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Nos Services Professionnels
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Un accompagnement complet de la conception à la maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                Étude & Conception
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Analyse complète de vos besoins et conception de plans détaillés
                avec visualisation 3D.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Audit de l'espace existant
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Plans 2D et modélisation 3D
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Étude de faisabilité technique
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-black rounded-2xl flex items-center justify-center mb-6">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                Aménagement Complet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Réalisation complète de votre projet avec coordination de tous
                les corps de métier.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Gestion de projet clé en main
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Coordination des intervenants
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Respect des délais et budgets
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-yellow-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                Équipements Premium
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sélection et installation d'équipements professionnels de
                marques reconnues.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Équipements haut de gamme
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Installation professionnelle
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Formation du personnel
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-black rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                Maintenance & Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Service après-vente complet avec maintenance préventive et
                support technique.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Maintenance préventive
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Support technique 24/7
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Garantie étendue
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                Conseil & Formation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Accompagnement stratégique et formation pour optimiser votre
                activité.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Conseil en exploitation
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Formation du personnel
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Optimisation des revenus
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-black rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                Financement & Leasing
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Solutions de financement flexibles pour faciliter votre
                investissement.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Leasing équipements
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Crédit professionnel
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Paiement échelonné
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Packages */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Nos Formules Professionnelles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Des solutions complètes adaptées à la taille et aux besoins de
              votre établissement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 relative overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-black/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Building className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2 text-black dark:text-white">
                    Formule Starter
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Parfait pour débuter
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      100-200 m² équipés
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      15-20 équipements cardio/muscu
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Vestiaires et réception
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Système audio/vidéo
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Formation équipe
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  {/*  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">À partir de 45 000€</div> */}
                  <Link href="/demande-devis">
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
                      Demander un devis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Business */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 relative overflow-hidden border-2 border-yellow-500">
              <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                Recommandé
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-black/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2 text-black dark:text-white">
                    Formule Business
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Solution complète
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      300-500 m² aménagés
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      40-60 équipements premium
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Espaces cours collectifs
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Système de gestion intégré
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Support 24/7 première année
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  {/*  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">À partir de 45 000€</div> */}
                  <Link href="/demande-devis">
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-black hover:from-yellow-600 hover:to-black text-white">
                      Demander un devis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Premium */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 relative overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-black/10 to-yellow-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2 text-black dark:text-white">
                    Formule Premium
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Excellence absolue
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      500+ m² luxueux
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      80+ équipements haut de gamme
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Spa et espaces wellness
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Domotique et IA intégrées
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Maintenance premium 5 ans
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  {/*  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">À partir de 45 000€</div> */}
                  <Link href="/demande-devis">
                    <Button className="w-full bg-gradient-to-r from-black to-yellow-600 hover:from-gray-900 hover:to-yellow-700 text-white">
                      Demander un devis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* References Gallery */}
    {/*
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-yellow-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Nos Références
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Découvrez quelques-unes de nos réalisations pour des clients
              professionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "",
                type: "",
                location: "",
                image: "1",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 aspect-[4/3] cursor-pointer"
              >
                <Image
                  src={`/placeholder.svg?height=400&width=600&text=${project.title}`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-1">{project.type}</p>
                  <p className="text-yellow-300 text-sm mb-4">
                    {project.location}
                  </p>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/20 w-full"
                  >
                    Voir le projet
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-6 text-lg">
              Voir toutes nos références
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    */}

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
                  Prêt à lancer votre projet professionnel ?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Nos experts vous accompagnent dans la création de votre espace
                  fitness professionnel. Contactez-nous pour une étude
                  personnalisée et un devis détaillé.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-black dark:text-white">
                        Ligne dédiée professionnels
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        +212 674-114446
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-black dark:text-white">
                        Étude gratuite
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Analyse complète de votre projet
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-black/10 dark:bg-white/20 flex items-center justify-center">
                      <Award className="h-6 w-6 text-black dark:text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-black dark:text-white">
                        Garantie professionnelle
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Assurance décennale incluse
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div className="bg-gradient-to-r from-yellow-50 to-black/5 dark:from-yellow-900/20 dark:to-black/20 rounded-2xl p-6">
                  <h3 className="text-lg font-medium mb-4 text-black dark:text-white">
                    🚀 Offre de lancement
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    -15% sur votre première installation + financement 0% sur 12
                    mois pour tout projet confirmé ce mois-ci !
                  </p>
                  <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
                    Profiter de l'offre
                  </Button>
                </div> */}
              </div>

              <div>
                {/*
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-heading font-bold mb-6 text-black dark:text-white">
                    Demande de devis professionnel
                  </h3>
                  <ServiceContactForm service="Aménagement Salle Professionnelle" />
                </div>
                */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
