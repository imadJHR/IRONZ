import {
  Home,
  Palette,
  ToyBrick,
  SquareStack,
  Check,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import img1 from "../public/salle1.jpg";
import img2 from "../public/salle2.jpg";
import img3 from "../public/salle3.jpg";
import img4 from "../public/salle4.jpg";

const ServicesSection = () => (
  <section className="py-24 bg-white dark:bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <span className="inline-block px-5 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-sm font-semibold rounded-full mb-6 tracking-wide uppercase">
          Nos solutions clés en main
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight italic">
          Nos <span className="text-yellow-500 relative inline-block">
            Services
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-200 dark:text-yellow-800 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
          Des solutions personnalisées et innovantes pour transformer vos espaces sportifs en lieux d'exception.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Service 1 */}
        <Link href="/services/amenagement-salle" className="block h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-yellow-500/30 dark:hover:border-yellow-500/30 flex flex-col"
          >
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={img1}
                alt="Aménagement de salle"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
              
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 p-3 rounded-xl backdrop-blur-md shadow-lg">
                <Home className="h-6 w-6 text-yellow-500" />
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors italic">
                Aménagement de Salles
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                Conception et réalisation clé en main de vos espaces fitness, du home gym au complexe sportif professionnel.
              </p>
              
              <div className="mt-auto space-y-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                {['Étude sur mesure', 'Équipements adaptés', 'Installation pro'].map((item, i) => (
                  <div key={i} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
                      <Check className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Service 2 */}
        <Link href="/services/personnalisation-accessoires" className="block h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-yellow-500/30 dark:hover:border-yellow-500/30 flex flex-col"
          >
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={img2}
                alt="Personnalisation"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
              
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 p-3 rounded-xl backdrop-blur-md shadow-lg">
                <Palette className="h-6 w-6 text-yellow-500" />
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors italic">
                Personnalisation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                Marquez votre identité avec des équipements uniques aux couleurs et logos de votre marque.
              </p>
              
              <div className="mt-auto space-y-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                {['Design unique', 'Impression HD', 'Matériaux premium'].map((item, i) => (
                  <div key={i} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
                      <Check className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Service 3 */}
        <Link href="/services/espace-enfance" className="block h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-yellow-500/30 dark:hover:border-yellow-500/30 flex flex-col"
          >
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={img3}
                alt="Espace Enfance"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
              
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 p-3 rounded-xl backdrop-blur-md shadow-lg">
                <ToyBrick className="h-6 w-6 text-yellow-500" />
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors italic">
                Espace Enfance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                Création de zones d'activités sportives ludiques, sécurisées et adaptées aux plus jeunes.
              </p>
              
              <div className="mt-auto space-y-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                {['Sécurité certifiée', 'Design ludique', 'Pour écoles & centres'].map((item, i) => (
                  <div key={i} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
                      <Check className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Service 4 (Large) */}
        <div className="md:col-span-2 lg:col-span-3">
          <Link href="/services/revetement-sol-mur" className="block h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-yellow-500/30 dark:hover:border-yellow-500/30 h-full flex flex-col md:flex-row"
            >
              <div className="relative h-64 md:h-auto md:w-2/5 overflow-hidden">
                <Image
                  src={img4}
                  alt="Revêtements"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" />
                
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 p-3 rounded-xl backdrop-blur-md shadow-lg">
                  <SquareStack className="h-6 w-6 text-yellow-500" />
                </div>
              </div>

              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-yellow-500 transition-colors italic">
                  Revêtement Sol & Mur
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                  Solutions techniques haute performance pour sols et murs, alliant esthétique, sécurité et durabilité pour toutes pratiques sportives.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Sols amortissants', 'Murs d\'escalade', 'Isolation acoustique', 'Installation rapide'].map((item, i) => (
                    <div key={i} className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      <Check className="h-4 w-4 text-yellow-500 mr-3 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

      </div>

      {/* CALL TO ACTION */}
      <div className="mt-20 text-center">
        <Button
          asChild
          size="lg"
          className="bg-yellow-500 text-black hover:bg-yellow-600 dark:hover:bg-yellow-400 font-bold px-10 py-7 text-lg rounded-xl shadow-lg hover:shadow-yellow-500/25 transition-all transform hover:-translate-y-1"
        >
          <Link href="/services">
            Explorer tous nos services
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default ServicesSection;