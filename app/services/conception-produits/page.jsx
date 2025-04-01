import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, ArrowRight, Lightbulb, Settings, Zap } from "lucide-react"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import ServiceContactForm from "@/components/service-contact-form"

export const metadata = {
  title: "Conception de Produits | IRONZ PRO",
  description: "Services professionnels de conception et développement de produits fitness par IRONZ PRO",
}

export default function ConceptionProduitsPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/placeholder.svg?height=1200&width=2000"
            alt="Conception de produits"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux services
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Conception de <span className="text-yellow-400">Produits</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              De l'idée à la réalisation, nous concevons des équipements de fitness innovants et sur mesure pour
              répondre à vos besoins spécifiques.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6">
                Discuter de votre projet
              </Button>
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-medium text-lg px-8 py-6"
              >
                Découvrir nos réalisations
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Donnez vie à vos idées</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Notre équipe d'ingénieurs et de designers travaille en étroite collaboration avec vous pour développer des
              produits fitness innovants, ergonomiques et performants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Conception & Design</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                De l'esquisse initiale aux plans détaillés, nous concevons des produits qui allient esthétique et
                fonctionnalité.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Étude de marché et benchmarking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Design industriel et ergonomique</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Modélisation 3D et rendus réalistes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                <Settings className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Prototypage & Tests</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nous développons des prototypes fonctionnels et réalisons des tests rigoureux pour garantir la qualité
                et la sécurité.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Prototypage rapide et impression 3D</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Tests de résistance et d'endurance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Validation ergonomique et fonctionnelle</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Production & Lancement</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nous vous accompagnons dans la production et le lancement de votre produit sur le marché.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Sélection des fournisseurs et matériaux</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Supervision de la production</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Stratégie de lancement et marketing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Notre expertise</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Nous concevons une large gamme d'équipements de fitness pour répondre à tous les besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Machines de musculation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Conception de machines ergonomiques pour un entraînement efficace et sécurisé.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Équipements cardio</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Développement d'appareils cardio innovants et connectés pour un suivi optimal.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Accessoires fitness</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Création d'accessoires ergonomiques pour diversifier les entraînements.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">Solutions connectées</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intégration de technologies connectées pour un suivi des performances en temps réel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Nos réalisations</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Découvrez quelques-uns des produits que nous avons conçus pour nos clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={`/placeholder.svg?height=600&width=600&text=Produit+${item}`}
                    alt={`Produit ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-2">Produit {item}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {item % 2 === 0
                      ? "Machine de musculation innovante conçue pour optimiser les mouvements et réduire les risques de blessures."
                      : "Accessoire fitness ergonomique permettant une grande variété d'exercices pour un entraînement complet."}
                  </p>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Voir le détail</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Voir tous nos projets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Notre processus de conception</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Une approche méthodique en 6 étapes pour transformer votre idée en produit fini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Analyse des besoins</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nous étudions vos besoins, le marché cible et les contraintes techniques pour définir précisément le
                cahier des charges.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Étude de marché</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Analyse de la concurrence</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Définition du cahier des charges</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Conception préliminaire</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nos designers élaborent plusieurs concepts et esquisses pour explorer différentes solutions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Recherche de concepts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Esquisses et croquis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Sélection des concepts prometteurs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Design détaillé</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nous développons en détail le concept retenu avec modélisation 3D et études techniques.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Modélisation 3D</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Études techniques</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Choix des matériaux</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Prototypage</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nous créons un prototype fonctionnel pour valider le concept et identifier les améliorations possibles.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Fabrication du prototype</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Tests fonctionnels</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Ajustements et optimisations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                5
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Tests et validation</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nous réalisons des tests rigoureux pour garantir la qualité, la sécurité et la conformité du produit.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Tests de résistance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Tests utilisateurs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Certification et normes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                6
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Production & Lancement</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Nous vous accompagnons dans la production et le lancement de votre produit sur le marché.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Sélection des fournisseurs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Suivi de production</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Stratégie de lancement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ce que disent nos clients</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Découvrez les témoignages de clients satisfaits par nos services de conception de produits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Client" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Marc Dubois</h4>
                  <p className="text-yellow-500 text-sm">Directeur R&D, FitTech</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "L'équipe d'IRONZ PRO a su transformer notre concept initial en un produit innovant qui dépasse nos
                attentes. Leur expertise technique et leur créativité ont fait toute la différence."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Client" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sophie Martin</h4>
                  <p className="text-yellow-500 text-sm">CEO, GymInnovate</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Nous avons collaboré avec IRONZ PRO pour développer une nouvelle gamme d'accessoires fitness. Leur
                processus de conception rigoureux et leur connaissance du marché ont été déterminants dans le succès de
                notre projet."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Client" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Thomas Leroy</h4>
                  <p className="text-yellow-500 text-sm">Fondateur, FitLab</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "De la conception à la production, IRONZ PRO nous a accompagnés à chaque étape avec professionnalisme et
                expertise. Le produit final est exactement ce que nous recherchions, et les retours de nos clients sont
                excellents."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Prêt à donner vie à votre projet?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Contactez-nous dès aujourd'hui pour discuter de votre idée de produit. Notre équipe d'experts est à
                  votre disposition pour vous accompagner dans toutes les étapes de la conception.
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-xl font-heading font-bold mb-4">Pourquoi nous choisir?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">Expertise technique et créative</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Connaissance approfondie du marché fitness
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">Processus de conception rigoureux</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">Accompagnement de A à Z</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">Réseau de partenaires industriels</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-heading font-bold mb-4">Nos coordonnées</h3>
                  <div className="space-y-4">
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
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium">Téléphone</h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">+33 1 23 45 67 89</p>
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
                        <h4 className="text-lg font-medium">Email</h4>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">conception@ironzpro.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-heading font-bold mb-6">Parlez-nous de votre projet</h3>
                  <ServiceContactForm service="Conception de Produits" />
                </div>
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
              Transformez vos idées en produits innovants
            </h2>
            <p className="text-xl text-black/80 mb-8">
              Contactez-nous pour bénéficier d'une consultation gratuite et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-black hover:bg-gray-800 text-white font-medium text-lg px-8 py-6">
                Demander un devis gratuit
              </Button>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black/10 font-medium text-lg px-8 py-6"
              >
                Découvrir nos réalisations
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

