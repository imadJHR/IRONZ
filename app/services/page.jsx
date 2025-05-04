import Image from "next/image";
import {
  CheckCircle,
  Users,
  Truck,
  PenToolIcon as Tool,
  Shield,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Nos Services | IRONZ PRO",
  description:
    "Découvrez les services professionnels proposés par IRONZ PRO pour votre équipement de fitness",
};

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Installation d'équipement",
      description:
        "Notre équipe de techniciens qualifiés installe votre équipement de fitness à domicile ou en salle, garantissant une mise en place sécurisée et optimale.",
      icon: <Tool className="h-10 w-10 text-yellow-500" />,
      features: [
        "Installation professionnelle",
        "Vérification de sécurité",
        "Conseils d'utilisation",
        "Garantie sur l'installation",
      ],
      price: "À partir de 99€",
      cta: "Demander un devis",
    },
    {
      id: 2,
      title: "Maintenance et réparation",
      description:
        "Service complet de maintenance et réparation pour prolonger la durée de vie de votre équipement et assurer son bon fonctionnement.",
      icon: <Tool className="h-10 w-10 text-yellow-500" />,
      features: [
        "Diagnostic complet",
        "Réparation rapide",
        "Pièces d'origine",
        "Contrats de maintenance",
      ],
      price: "À partir de 79€",
      cta: "Prendre rendez-vous",
    },
    {
      id: 3,
      title: "Coaching personnalisé",
      description:
        "Nos coachs certifiés vous accompagnent dans l'utilisation de votre équipement et l'optimisation de vos entraînements.",
      icon: <Users className="h-10 w-10 text-yellow-500" />,
      features: [
        "Programmes sur mesure",
        "Suivi nutritionnel",
        "Coaching à domicile",
        "Séances en visio",
      ],
      price: "À partir de 49€/h",
      cta: "Réserver une séance",
    },
    {
      id: 4,
      title: "Livraison express",
      description:
        "Service de livraison rapide et soignée de votre équipement, avec possibilité de choisir votre créneau horaire.",
      icon: <Truck className="h-10 w-10 text-yellow-500" />,
      features: [
        "Livraison sous 24-48h",
        "Créneaux personnalisés",
        "Suivi en temps réel",
        "Déballage et reprise des emballages",
      ],
      price: "À partir de 19,90€",
      cta: "En savoir plus",
    },
    {
      id: 5,
      title: "Extension de garantie",
      description:
        "Prolongez la durée de garantie de vos équipements pour une tranquillité d'esprit totale.",
      icon: <Shield className="h-10 w-10 text-yellow-500" />,
      features: [
        "Couverture complète",
        "Remplacement express",
        "Assistance prioritaire",
        "Transfert de garantie possible",
      ],
      price: "À partir de 59€/an",
      cta: "Souscrire",
    },
    {
      id: 6,
      title: "Conception de salle",
      description:
        "Service de conception et d'aménagement de votre espace fitness, adapté à vos besoins et contraintes.",
      icon: <Award className="h-10 w-10 text-yellow-500" />,
      features: [
        "Étude personnalisée",
        "Plans 3D",
        "Sélection d'équipements",
        "Suivi de projet",
      ],
      price: "À partir de 199€",
      cta: "Demander une étude",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1200&width=2000"
            alt="Services Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Nos <span className="text-yellow-400">Services</span>{" "}
              Professionnels
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Découvrez notre gamme complète de services pour vous accompagner
              dans votre parcours fitness, de l'installation à la maintenance de
              votre équipement.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/demande-devis">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6">
                  Demander un devis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-yellow-400 md:text-4xl font-heading font-bold mb-4">
              Nos Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Nous proposons une gamme complète de services pour répondre à tous
              vos besoins en matière d'équipement fitness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-2 duration-300"
              >
                <div className="p-6">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mb-6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-yellow-400 md:text-4xl font-heading font-bold mb-4">
              Notre Processus
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Un accompagnement personnalisé en 4 étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Demande</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Contactez-nous pour nous faire part de vos besoins
                  spécifiques.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-yellow-400 transform -translate-y-1/2 -translate-x-8 z-0"></div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Évaluation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nos experts évaluent votre demande et vous proposent des
                  solutions adaptées.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-yellow-400 transform -translate-y-1/2 -translate-x-8 z-0"></div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Planification
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nous planifions l'intervention selon vos disponibilités.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-yellow-400 transform -translate-y-1/2 -translate-x-8 z-0"></div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Réalisation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nos techniciens interviennent pour réaliser le service
                  demandé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-yellow-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black">
              Prêt à bénéficier de nos services ?
            </h2>
            <p className="text-xl text-black/80 mb-8">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et
              obtenir un devis personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demande-devis">
                <Button className="bg-black hover:bg-gray-800 text-white font-medium text-lg px-8 py-6">
                  Demander un devis
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black/10 font-medium text-lg px-8 py-6"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-yellow-400 md:text-4xl font-heading font-bold mb-4">
              Questions fréquentes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Trouvez rapidement des réponses à vos questions sur nos services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-heading font-bold mb-3">
                  Quels sont les délais d'intervention pour une installation ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nous intervenons généralement sous 48 à 72h après validation
                  du devis. Pour les zones rurales, le délai peut être
                  légèrement plus long.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-heading font-bold mb-3">
                  Les services sont-ils disponibles partout en Maroc ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Oui, nos services sont disponibles dans toute la Maroc
                  métropolitaine. Pour les DOM-TOM, veuillez nous contacter pour
                  vérifier la disponibilité.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-heading font-bold mb-3">
                  Comment se déroule une séance de coaching personnalisé ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  La première séance commence par un bilan complet (objectifs,
                  condition physique, contraintes). Ensuite, votre coach élabore
                  un programme sur mesure et vous accompagne dans sa
                  réalisation.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-heading font-bold mb-3">
                  Que couvre l'extension de garantie ?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Notre extension de garantie couvre les pièces, la main d'œuvre
                  et le déplacement en cas de panne. Elle inclut également un
                  service prioritaire et un remplacement temporaire pour
                  certains équipements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
