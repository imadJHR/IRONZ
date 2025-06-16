import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import ServiceContactForm from "@/components/service-contact-form";

export const metadata = {
  title: "Aménagement de Salle & Espace | IRONZ PRO",
  description:
    "Services professionnels d'aménagement de salles de sport et d'espaces fitness par IRONZ PRO",
};

export default function AmenagementSallePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-yellow-600 via-yellow-700 to-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/placeholder.svg?height=1200&width=2000"
            alt="Aménagement de salle"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux services
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Aménagement de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">Salle & Espace</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Transformez votre espace en une salle de fitness fonctionnelle et
              inspirante avec notre expertise en aménagement d'espaces sportifs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/demande-devis">
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium text-lg px-8 py-6">
                  Demander un devis
                </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Créez l'espace fitness idéal
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Que vous souhaitiez aménager une salle de sport professionnelle,
              un espace fitness dans un hôtel ou un home gym personnel, notre
              équipe d'experts vous accompagne à chaque étape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
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
              <h3 className="text-xl font-heading font-bold mb-3 text-black dark:text-white">
                Étude & Conception
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Analyse de vos besoins, étude de l'espace disponible et
                conception de plans détaillés pour optimiser chaque mètre carré.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Plans 2D et 3D personnalisés
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Optimisation des flux de circulation
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Respect des normes de sécurité
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-black rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-black dark:text-white">
                Aménagement & Installation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Mise en place complète de votre espace fitness, de la
                préparation du sol à l'installation des équipements.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Installation professionnelle
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Gestion de projet complète
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Coordination des différents corps de métier
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
              <div className="w-14 h-14 bg-gradient-to-br from-black to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-black dark:text-white">
                Équipement & Finition
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sélection et installation des équipements adaptés à vos besoins,
                avec finitions personnalisées pour un résultat parfait.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Sélection d'équipements de qualité
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Personnalisation des finitions
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Formation à l'utilisation
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-yellow-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Notre processus
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Une approche méthodique en 5 étapes pour garantir la réussite de
              votre projet d'aménagement.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-800"></div>

            {/* Timeline items */}
            <div className="space-y-12 md:space-y-0">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-heading font-bold mb-3 text-black dark:text-white">
                    Consultation initiale
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nous discutons de vos besoins, objectifs et contraintes pour
                    comprendre parfaitement votre vision.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 relative">
                  <div className="absolute top-0 md:top-1/2 left-1/2 md:left-0 transform -translate-x-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold z-10">
                    1
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:ml-6 border border-gray-100 dark:border-gray-800">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Analyse des besoins
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Définition du budget
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Visite des lieux
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-12 md:text-left mb-6 md:mb-0">
                  <h3 className="text-xl font-heading font-bold mb-3 text-black dark:text-white">
                    Conception & Design
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nous élaborons des plans détaillés et des visualisations 3D
                    pour vous permettre de projeter le résultat final.
                  </p>
                </div>
                <div className="md:w-1/2 md:pr-12 relative">
                  <div className="absolute top-0 md:top-1/2 left-1/2 md:right-0 transform -translate-x-1/2 md:translate-x-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold z-10">
                    2
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:mr-6 border border-gray-100 dark:border-gray-800">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Plans 2D et 3D
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Sélection des matériaux
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Proposition d'équipements
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-heading font-bold mb-3 text-black dark:text-white">
                    Validation & Planification
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nous finalisons ensemble le projet et établissons un
                    calendrier précis pour sa réalisation.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 relative">
                  <div className="absolute top-0 md:top-1/2 left-1/2 md:left-0 transform -translate-x-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold z-10">
                    3
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:ml-6 border border-gray-100 dark:border-gray-800">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Validation du projet
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Planification des travaux
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Commande des équipements
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-12 md:text-left mb-6 md:mb-0">
                  <h3 className="text-xl font-heading font-bold mb-3 text-black dark:text-white">
                    Réalisation & Installation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Notre équipe réalise les travaux d'aménagement et installe
                    les équipements selon le planning établi.
                  </p>
                </div>
                <div className="md:w-1/2 md:pr-12 relative">
                  <div className="absolute top-0 md:top-1/2 left-1/2 md:right-0 transform -translate-x-1/2 md:translate-x-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold z-10">
                    4
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:mr-6 border border-gray-100 dark:border-gray-800">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Préparation du site
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Installation des équipements
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Contrôle qualité
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-heading font-bold mb-3 text-black dark:text-white">
                    Livraison & Suivi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nous vous remettons les clés de votre nouvel espace et
                    assurons un suivi pour garantir votre satisfaction.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 relative">
                  <div className="absolute top-0 md:top-1/2 left-1/2 md:left-0 transform -translate-x-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold z-10">
                    5
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:ml-6 border border-gray-100 dark:border-gray-800">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Formation à l'utilisation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Remise des documents
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Service après-vente
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
                  Prêt à transformer votre espace?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Contactez-nous dès aujourd'hui pour discuter de votre projet
                  d'aménagement. Notre équipe d'experts est à votre disposition
                  pour répondre à toutes vos questions.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-black dark:text-white">Téléphone</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        +212 674-114446
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
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
                      <h3 className="text-lg font-medium text-black dark:text-white">Email</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        muscleironz2019@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <svg
                        className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-black dark:text-white">Adresse</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        SAHARA MALL 1 ÈRE ÉTAGE C169 & C120
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-medium mb-4 text-black dark:text-white">
                    Horaires d'ouverture
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Lundi - Vendredi
                      </span>
                      <span className="font-medium text-black dark:text-white">9h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Samedi
                      </span>
                      <span className="font-medium text-black dark:text-white">10h - 16h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Dimanche
                      </span>
                      <span className="font-medium text-black dark:text-white">Fermé</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xl font-heading font-bold mb-6 text-black dark:text-white">Demande de devis professionnel</h3>
                  <ServiceContactForm service="Aménagement Salle Professionnelle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black">
              Transformez votre espace dès maintenant
            </h2>
            <p className="text-xl text-black/90 mb-8">
              Contactez-nous pour bénéficier d'une consultation gratuite et sans
              engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis">
                <Button className="bg-black hover:bg-gray-900 text-white font-medium text-lg px-8 py-6">
                  Demander un devis gratuit
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-2 border-black text-black hover:bg-black/10 font-medium text-lg px-8 py-6"
              >
                Découvrir nos réalisations
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}