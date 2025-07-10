import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  Phone,
  Home,
  Dumbbell,
  Zap,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceContactForm from "@/components/service-contact-form";

export const metadata = {
  title: "Aménagement Home Gym - Salle de Sport à Domicile | IRONZ PRO",
  description:
    "Créez votre salle de sport privée à domicile avec IRONZ PRO. Solutions d'aménagement home gym sur mesure, équipements multifonctionnels et design harmonieux.",
};

export default function HomeGymPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-yellow-500 via-yellow-600 to-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-yellow-600/80 to-black/90" />
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
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-yellow-300 font-medium">Home Gym</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Votre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">
                Salle de Sport
              </span>{" "}
              à Domicile
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transformez votre espace personnel en une salle de fitness privée
              et fonctionnelle. Nos solutions d'aménagement home gym sont
              conçues pour optimiser chaque mètre carré tout en s'harmonisant
              parfaitement avec votre intérieur.
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
                  50+
                </div>
                <div className="text-gray-300 text-sm">Home Gyms créés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-300 text-sm">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
                <div className="text-gray-300 text-sm">Ans d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24h</div>
                <div className="text-gray-300 text-sm">Support client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Pourquoi choisir un Home Gym ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Découvrez tous les avantages d'avoir votre propre salle de sport à
              domicile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Disponibilité 24/7
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Entraînez-vous quand vous voulez, sans contrainte d'horaires.
                  Votre salle de sport est toujours ouverte et disponible.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Intimité & Confort
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Entraînez-vous dans l'intimité de votre foyer, sans regard
                  extérieur, dans un environnement qui vous ressemble.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-black to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Économies à Long Terme
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Fini les abonnements mensuels ! Votre investissement initial
                  se rentabilise rapidement avec des années d'utilisation.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Gain de Temps
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Plus de trajet, plus d'attente pour les équipements. Maximisez
                  votre temps d'entraînement effectif.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-black to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Équipements Personnalisés
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Choisissez exactement les équipements qui correspondent à vos
                  objectifs et à votre style d'entraînement.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 text-black dark:text-white">
                  Valeur Immobilière
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Un home gym bien aménagé augmente la valeur de votre propriété
                  et constitue un atout lors de la revente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-yellow-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Nos Solutions Home Gym
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Des solutions adaptées à tous les espaces et tous les budgets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Compact */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 relative overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-black/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Home className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2 text-black dark:text-white">
                    Home Gym Compact
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Idéal pour les petits espaces
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      5-15 m² optimisés
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Équipements multifonctionnels
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Solutions de rangement intégrées
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Miroirs et éclairage LED
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Sol sportif antidérapant
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  {/*
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    À partir de 3 500€
                  </div> */}
                  <Link href="/demande-devis">
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
                      Demander un devis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Standard */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 relative overflow-hidden border-2 border-yellow-500">
              <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                Populaire
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-black/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2 text-black dark:text-white">
                    Home Gym Standard
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Le parfait équilibre
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      15-30 m² aménagés
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Zone cardio + musculation
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Système audio intégré
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Climatisation et ventilation
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Écran TV pour coaching
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  {/*
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    À partir de 3 500€
                  </div> */}
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
                    Home Gym Premium
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    L'expérience ultime
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      30+ m² luxueux
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Équipements haut de gamme
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Sauna ou hammam intégré
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Domotique et contrôle intelligent
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Design sur mesure
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  {/*
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    À partir de 3 500€
                  </div> */}
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

      {/* Gallery Section */}
      {/* 
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Nos Réalisations Home Gym
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Découvrez quelques-uns de nos projets d'aménagement home gym
              réalisés pour nos clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Home Gym Moderne",
                type: "Appartement 25m²",
                image: "1",
              },
              { title: "Salle Familiale", type: "Maison 40m²", image: "2" },
              { title: "Espace Zen", type: "Loft 20m²", image: "3" },
              { title: "Gym Connecté", type: "Villa 50m²", image: "4" },
              { title: "Studio Fitness", type: "Duplex 30m²", image: "5" },
              { title: "Espace Wellness", type: "Maison 60m²", image: "6" },
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
                  <p className="text-gray-200 text-sm mb-4">{project.type}</p>
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
        </div>
      </section>
      */}

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-50 to-black/5 dark:from-yellow-900/10 dark:to-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black dark:text-white">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Un processus simple et transparent en 4 étapes pour créer votre
              home gym idéal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "Évaluation de votre espace et de vos besoins",
                icon: Phone,
              },
              {
                step: "2",
                title: "Conception",
                description: "Création de plans 3D personnalisés",
                icon: Home,
              },
              {
                step: "3",
                title: "Installation",
                description: "Aménagement professionnel de votre espace",
                icon: Dumbbell,
              },
              {
                step: "4",
                title: "Formation",
                description: "Prise en main et conseils d'utilisation",
                icon: Star,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
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
                  Prêt à créer votre Home Gym ?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Contactez-nous dès aujourd'hui pour une consultation gratuite.
                  Nos experts vous accompagnent dans la création de votre salle
                  de sport personnelle.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-black dark:text-white">
                        Consultation gratuite
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
                        Devis sous 48h
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Réponse rapide garantie
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-black/10 dark:bg-white/20 flex items-center justify-center">
                      <Star className="h-6 w-6 text-black dark:text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-black dark:text-white">
                        Garantie 5 ans
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Sur tous nos aménagements
                      </p>
                    </div>
                  </div>
                </div>

                {/*
              
                <div className="bg-gradient-to-r from-yellow-50 to-black/5 dark:from-yellow-900/20 dark:to-black/20 rounded-2xl p-6">
                  <h3 className="text-lg font-medium mb-4 text-black dark:text-white">🎁 Offre spéciale Home Gym</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Consultation gratuite + plan 3D offert pour tout projet confirmé avant fin du mois !
                  </p>
                  <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
                    Profiter de l'offre
                  </Button>
                </div>*/}
              </div>

            
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
