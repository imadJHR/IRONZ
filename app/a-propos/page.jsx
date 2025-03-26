import Image from "next/image"
import { Users, Target, Award, Clock, MapPin, Phone, Mail } from "lucide-react"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "À propos de nous | IRONZ PRO",
  description: "Découvrez l'histoire, les valeurs et l'équipe d'IRONZ PRO, votre partenaire fitness de confiance",
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alexandre Martin",
      role: "Fondateur & CEO",
      bio: "Ancien athlète professionnel et passionné de fitness depuis plus de 15 ans, Alexandre a fondé IRONZ PRO avec la vision de rendre l'équipement professionnel accessible à tous.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Sophie Dubois",
      role: "Directrice Commerciale",
      bio: "Avec plus de 10 ans d'expérience dans le secteur du fitness, Sophie supervise toutes les opérations commerciales et veille à la satisfaction de nos clients.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Thomas Leroy",
      role: "Responsable Technique",
      bio: "Expert en équipements de fitness, Thomas dirige notre équipe technique et s'assure que tous nos produits répondent aux normes les plus strictes de qualité et de sécurité.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Camille Bernard",
      role: "Nutritionniste",
      bio: "Diplômée en nutrition sportive, Camille conseille nos clients sur les suppléments adaptés à leurs objectifs et élabore des plans nutritionnels personnalisés.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

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
  ]

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1200&width=2000"
            alt="About Us Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              À Propos <span className="text-yellow-400">d'IRONZ PRO</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Découvrez notre histoire, nos valeurs et notre engagement à vous fournir les meilleurs équipements et
              services de fitness.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6">
                Notre équipe
              </Button>
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-medium text-lg px-8 py-6"
              >
                Nos valeurs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Notre Histoire</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Fondée en 2015 par Alexandre Martin, ancien athlète professionnel, IRONZ PRO est née d'une passion pour
                le fitness et d'une vision : rendre accessible à tous un équipement de qualité professionnelle.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ce qui a commencé comme une petite boutique à Paris s'est rapidement développé pour devenir l'un des
                leaders français de l'équipement fitness, avec une présence en ligne forte et plusieurs showrooms à
                travers le pays.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Aujourd'hui, IRONZ PRO c'est une équipe de 50 passionnés, plus de 10 000 clients satisfaits et un
                catalogue de plus de 2 000 produits soigneusement sélectionnés pour leur qualité et leur performance.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-yellow-500">2015</span>
                  <span className="text-gray-600 dark:text-gray-400">Année de création</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-yellow-500">50+</span>
                  <span className="text-gray-600 dark:text-gray-400">Employés</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-yellow-500">10k+</span>
                  <span className="text-gray-600 dark:text-gray-400">Clients satisfaits</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-yellow-500">2k+</span>
                  <span className="text-gray-600 dark:text-gray-400">Produits</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=1000&width=800" alt="Notre histoire" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ces principes guident chacune de nos actions et décisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Notre Équipe</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Des experts passionnés à votre service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                  <p className="text-yellow-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Showrooms Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Nos Showrooms</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Venez découvrir et tester nos équipements dans nos espaces dédiés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image src="/placeholder.svg?height=600&width=800" alt="Showroom Paris" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Paris</h3>
                <div className="flex items-start mb-2">
                  <MapPin className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">123 Avenue des Champs-Élysées, 75008 Paris</p>
                </div>
                <div className="flex items-start mb-2">
                  <Phone className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">+33 1 23 45 67 89</p>
                </div>
                <div className="flex items-start mb-4">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">Lun-Sam: 10h-19h | Dim: Fermé</p>
                </div>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Prendre rendez-vous</Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image src="/placeholder.svg?height=600&width=800" alt="Showroom Lyon" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Lyon</h3>
                <div className="flex items-start mb-2">
                  <MapPin className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">45 Rue de la République, 69002 Lyon</p>
                </div>
                <div className="flex items-start mb-2">
                  <Phone className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">+33 4 56 78 90 12</p>
                </div>
                <div className="flex items-start mb-4">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">Lun-Sam: 10h-19h | Dim: Fermé</p>
                </div>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Prendre rendez-vous</Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Showroom Marseille"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-3">Marseille</h3>
                <div className="flex items-start mb-2">
                  <MapPin className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">78 La Canebière, 13001 Marseille</p>
                </div>
                <div className="flex items-start mb-2">
                  <Phone className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">+33 4 91 23 45 67</p>
                </div>
                <div className="flex items-start mb-4">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">Lun-Sam: 10h-19h | Dim: Fermé</p>
                </div>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">Prendre rendez-vous</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Contactez-nous</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Vous avez des questions ou besoin d'informations supplémentaires ? Notre équipe est à votre disposition
                pour vous aider.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Siège social</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Avenue des Champs-Élysées, 75008 Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+33 1 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">contact@ironzpro.com</p>
                  </div>
                </div>
              </div>

              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Nous contacter</Button>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=800&width=800" alt="Contact" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-yellow-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-black">
              Rejoignez la communauté IRONZ PRO
            </h2>
            <p className="text-xl text-black/80 mb-8">
              Suivez-nous sur les réseaux sociaux pour découvrir nos dernières actualités, promotions et conseils
              fitness.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white">Facebook</Button>
              <Button className="bg-black hover:bg-gray-800 text-white">Instagram</Button>
              <Button className="bg-black hover:bg-gray-800 text-white">YouTube</Button>
              <Button className="bg-black hover:bg-gray-800 text-white">LinkedIn</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

