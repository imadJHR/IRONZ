import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  Truck,
  ShieldCheck,
  ChevronRight,
  Star,
  ShoppingCart,
} from "lucide-react"

import Navbar from "@/components/navbar"
import ProductCard from "@/components/product-card"
import CategoryCard from "@/components/category-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import {
  featuredProducts,
  newArrivals,
  bestSellers,
  specialOffers,
  categories,
  brands,
  blogPosts,
  faqs,
} from "@/data/product"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1200&width=2000"
            alt="Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Équipement de Fitness <span className="text-yellow-400">Professionnel</span> pour Tous
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Découvrez notre gamme complète d'équipements de fitness, suppléments alimentaires et accessoires de
              musculation et d'arts martiaux de qualité professionnelle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6">
                Découvrir nos produits
              </Button>
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-medium text-lg px-8 py-6"
              >
                Nos promotions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-6 bg-gradient-to-r from-yellow-500 to-yellow-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white rounded-full p-2 mr-4">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-black text-xl">Offres Spéciales</h3>
                <p className="text-black/80">Jusqu'à 30% de réduction sur une sélection de produits</p>
              </div>
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white">Voir toutes les offres</Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Nos Catégories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explorez notre large sélection de produits pour tous vos besoins en fitness et arts martiaux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Tabs Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Nos Produits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de produits de qualité professionnelle
            </p>
          </div>

          <Tabs defaultValue="featured" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="featured" className="text-sm md:text-base">
                  Populaires
                </TabsTrigger>
                <TabsTrigger value="new" className="text-sm md:text-base">
                  Nouveautés
                </TabsTrigger>
                <TabsTrigger value="bestsellers" className="text-sm md:text-base">
                  Meilleures Ventes
                </TabsTrigger>
                <TabsTrigger value="offers" className="text-sm md:text-base">
                  Offres Spéciales
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="featured">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bestsellers">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSellers.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="offers">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialOffers.map((product) => (
                  <ProductCard key={product.id} product={product} variant="offer" />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-10">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Voir tous les produits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Product Highlight */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=1000&width=800"
                alt="Station de Musculation Multifonction Pro"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium mb-4">
                Produit Vedette
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Station de Musculation Multifonction Pro
              </h2>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-400 ml-2">(87 avis)</span>
              </div>
              <p className="text-gray-300 mb-6">
                Notre station de musculation multifonction professionnelle est l'équipement idéal pour créer votre home
                gym complète. Avec sa structure en acier renforcé, elle supporte jusqu'à 150kg et permet plus de 30
                exercices différents pour un entraînement complet du corps.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Structure en acier renforcé</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Charge maximale: 150kg</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Plus de 30 exercices possibles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Dimensions: 180 x 210 x 110 cm</span>
                </li>
              </ul>
              <div className="flex items-center mb-6">
                <span className="text-gray-400 line-through text-xl mr-3">1499.99 €</span>
                <span className="text-3xl font-bold text-white">1299.99 €</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg px-8 py-6">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Ajouter au panier
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-medium text-lg px-8 py-6"
                >
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Nos Marques Partenaires</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous collaborons avec les meilleures marques du marché pour vous offrir des produits d'exception
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
              >
                <div className="relative h-16 w-16 mb-4">
                  <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">{brand.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{brand.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Pourquoi Choisir IRONZ PRO</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à vous offrir les meilleurs produits et services pour atteindre vos objectifs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Qualité Garantie</h3>
              <p className="text-gray-600">
                Tous nos produits sont sélectionnés avec soin et testés pour garantir une qualité professionnelle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Expertise Fitness</h3>
              <p className="text-gray-600">
                Notre équipe d'experts est là pour vous conseiller et vous aider à choisir les produits adaptés à vos
                besoins.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Marques Premium</h3>
              <p className="text-gray-600">
                Nous collaborons avec les meilleures marques du marché pour vous offrir des produits d'exception.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">
                Livraison rapide et sécurisée partout en France et en Europe, avec suivi en temps réel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600">
                Vos transactions sont 100% sécurisées grâce à notre système de paiement crypté.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Satisfaction Client</h3>
              <p className="text-gray-600">
                Votre satisfaction est notre priorité, avec un service client disponible 7j/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Conseils & Actualités</h2>
              <p className="text-gray-600 max-w-2xl">
                Découvrez nos derniers articles, conseils et guides pour optimiser votre entraînement
              </p>
            </div>
            <Link
              href="/blog"
              className="mt-4 md:mt-0 inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700 group"
            >
              Voir tous les articles
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={post.url} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-0 left-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <span>
                        {new Date(post.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-yellow-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center text-yellow-600 font-medium group-hover:underline">
                      Lire l'article
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Découvrez les témoignages de nos clients satisfaits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Thomas M." fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Thomas M.</h4>
                  <p className="text-yellow-400 text-sm">Coach sportif</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "J'ai complètement équipé mon home gym avec IRONZ PRO. La qualité est exceptionnelle et le service
                client est impeccable."
              </p>
              <div className="flex mt-4">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Sophie L." fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sophie L.</h4>
                  <p className="text-yellow-400 text-sm">Athlète CrossFit</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Les suppléments sont d'une qualité remarquable. J'ai vu une réelle différence dans mes performances et
                ma récupération."
              </p>
              <div className="flex mt-4">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Karim B." fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Karim B.</h4>
                  <p className="text-yellow-400 text-sm">Instructeur MMA</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Le rapport qualité-prix est imbattable. Je recommande IRONZ PRO à tous mes élèves pour leur équipement
                d'arts martiaux."
              </p>
              <div className="flex mt-4">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Questions Fréquentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trouvez rapidement des réponses à vos questions</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-heading font-medium text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Contactez-nous</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Restez informé</h2>
            <p className="text-gray-800 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives et nos conseils fitness
            </p>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <Button className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-3">S'inscrire</Button>
            </form>
            <p className="text-sm text-gray-700 mt-4">
              En vous inscrivant, vous acceptez de recevoir nos emails marketing. Vous pouvez vous désinscrire à tout
              moment.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Suivez-nous sur Instagram</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">@ironzpro - Partagez vos moments avec nos produits</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <Link
                href="https://instagram.com"
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Instagram+${index + 1}`}
                  alt={`Instagram post ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium">Voir le post</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="https://instagram.com"
              className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700 group"
            >
              Voir plus sur Instagram
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">IRONZ PRO</h3>
              <p className="text-gray-400 mb-4">
                Votre partenaire pour tous vos besoins en équipement de fitness, suppléments et accessoires de sport.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold mb-4">Catégories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/categories/home-gym" className="text-gray-400 hover:text-white">
                    Home Gym
                  </Link>
                </li>
                <li>
                  <Link href="/categories/equipement" className="text-gray-400 hover:text-white">
                    Équipement Pro
                  </Link>
                </li>
                <li>
                  <Link href="/categories/supplements" className="text-gray-400 hover:text-white">
                    Suppléments
                  </Link>
                </li>
                <li>
                  <Link href="/categories/musculation" className="text-gray-400 hover:text-white">
                    Musculation
                  </Link>
                </li>
                <li>
                  <Link href="/categories/arts-martiaux" className="text-gray-400 hover:text-white">
                    Arts Martiaux
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold mb-4">Informations</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/a-propos" className="text-gray-400 hover:text-white">
                    À propos de nous
                  </Link>
                </li>
                <li>
                  <Link href="/livraison" className="text-gray-400 hover:text-white">
                    Livraison
                  </Link>
                </li>
                <li>
                  <Link href="/conditions" className="text-gray-400 hover:text-white">
                    Conditions générales
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="text-gray-400 hover:text-white">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold mb-4">Contact</h3>
              <address className="not-italic text-gray-400">
                <p className="mb-2">123 Rue du Fitness</p>
                <p className="mb-2">75001 Paris, France</p>
                <p className="mb-2">Téléphone: +33 1 23 45 67 89</p>
                <p className="mb-2">Email: contact@ironzpro.com</p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} IRONZ PRO. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

