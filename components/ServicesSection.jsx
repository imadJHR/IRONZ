import {
  Home,
  Palette,
  ToyBrick,
  SquareStack,
  Check,
  ArrowRight,
  Dumbbell,
  Heart,
  Activity,
  Flame,
  Package,
  Apple,
  Sparkles,
} from "lucide-react"; // or from your actual icon library
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust this import based on your actual button component path
import img1 from "../public/salle1.jpg"
import img2 from "../public/salle2.jpg"
import img3 from "../public/salle3.jpg"
import img4 from "../public/salle4.jpg"

// Then your services section component
const ServicesSection = () => (
  <section className="py-20 bg-white dark:bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-4">
          Nos solutions clés en main
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white font-sans tracking-tight">
          Nos <span className="text-yellow-500">Services</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Des solutions personnalisées pour tous vos projets sportifs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service 1 - Aménagement de salles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={img1}
              alt="Aménagement de salle"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg mr-4">
                <Home className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Aménagement de salles
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Solutions complètes pour home gym et salles professionnelles, de
              la conception à l'installation.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-yellow-500 mr-2" />
                Étude de projet sur mesure
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-yellow-500 mr-2" />
                Sélection d'équipements adaptés
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-yellow-500 mr-2" />
                Installation professionnelle
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Service 2 - Personnalisation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={img2}
              alt="Personnalisation d'accessoires"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg mr-4">
                <Palette className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Personnalisation d'accessoires
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Créez des équipements uniques avec vos couleurs, logos ou messages
              personnalisés.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              
              <li className="flex items-center">
                <Check className="h-4 w-4 text-yellow-500 mr-2" />
                Impression haute qualité
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-yellow-500 mr-2" />
                Options de matériaux premium
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Service 3 - Espace Enfance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={img3}
              alt="Espace Enfance"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg mr-4">
                <ToyBrick className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Espace Enfance
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Zones d'activités sportives adaptées et sécurisées pour les
              enfants.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-yellow-500 mr-2" />
                Équipements certifiés sécurité
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-yellow-500 mr-2" />
                Design ludique et coloré
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-yellow-500 mr-2" />
                Solutions pour écoles et centres
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Service 4 - Revêtements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 md:col-span-2"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={img4}
              alt="Revêtements sol & mur"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg mr-4">
                <SquareStack className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Revêtement sol & mur
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Solutions techniques pour sols et murs adaptées à toutes les
              pratiques sportives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-yellow-500 mr-2" />
                  Tapis de sol haute résistance
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-yellow-500 mr-2" />
                  Revêtements amortissants
                </li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-yellow-500 mr-2" />
                  Mur d'escalade modulaire
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-yellow-500 mr-2" />
                  Panneaux acoustiques
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 text-center">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 font-medium rounded-xl"
        >
          <Link href="/services">
            Découvrir tous nos services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default ServicesSection;
