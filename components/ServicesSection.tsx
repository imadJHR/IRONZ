import {
  Home,
  Palette,
  ToyBrick,
  SquareStack,
  Check,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import img1 from "../public/salle1.jpg";
import img2 from "../public/salle2.jpg";
import img3 from "../public/salle3.jpg";
import img4 from "../public/salle4.jpg";

// Types
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: StaticImageData;
  icon: LucideIcon;
  features: string[];
  delay?: number;
  isWide?: boolean;
}

export interface ServicesSectionProps {
  className?: string;
  services?: ServiceItem[];
  ctaHref?: string;
  ctaText?: string;
}

// Default services data
const defaultServices: ServiceItem[] = [
  {
    id: "amenagement-salle",
    title: "Aménagement de Salles",
    description:
      "Conception et réalisation clé en main de vos espaces fitness, du home gym au complexe sportif professionnel.",
    href: "/services/amenagement-salle",
    image: img1,
    icon: Home,
    features: ["Étude sur mesure", "Équipements adaptés", "Installation pro"],
    delay: 0,
    isWide: false,
  },
  {
    id: "personnalisation",
    title: "Personnalisation",
    description:
      "Marquez votre identité avec des équipements uniques aux couleurs et logos de votre marque.",
    href: "/services/personnalisation-accessoires",
    image: img2,
    icon: Palette,
    features: ["Design unique", "Impression HD", "Matériaux premium"],
    delay: 0.1,
    isWide: false,
  },
  {
    id: "espace-enfance",
    title: "Espace Enfance",
    description:
      "Création de zones d'activités sportives ludiques, sécurisées et adaptées aux plus jeunes.",
    href: "/services/espace-enfance",
    image: img3,
    icon: ToyBrick,
    features: ["Sécurité certifiée", "Design ludique", "Pour écoles & centres"],
    delay: 0.2,
    isWide: false,
  },
  {
    id: "revetement",
    title: "Revêtement Sol & Mur",
    description:
      "Solutions techniques haute performance pour sols et murs, alliant esthétique, sécurité et durabilité pour toutes pratiques sportives.",
    href: "/services/revetement-sol-mur",
    image: img4,
    icon: SquareStack,
    features: ["Sols amortissants", "Murs d'escalade", "Isolation acoustique", "Installation rapide"],
    delay: 0.3,
    isWide: true,
  },
];

// Animation variants with proper typing
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ServicesSection = ({ 
  className = "", 
  services = defaultServices, 
  ctaHref = "/services",
  ctaText = "Explorer tous nos services"
}: ServicesSectionProps) => {
  return (
    <section className={`py-24 bg-white dark:bg-gray-900 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block px-5 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-sm font-semibold rounded-full mb-6 tracking-wide uppercase">
            Nos solutions clés en main
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight italic">
            Nos <span className="text-yellow-500 relative inline-block">
              Services
              <svg 
                className="absolute w-full h-3 -bottom-1 left-0 text-yellow-200 dark:text-yellow-800 -z-10" 
                viewBox="0 0 100 10" 
                preserveAspectRatio="none"
                aria-hidden="true"
              >
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
          
          {services.map((service, index) => {
            const Icon = service.icon;
            const isWide = service.isWide ?? false;
            const variant = itemVariants;
            
            return (
              <div 
                key={service.id} 
                className={isWide ? "md:col-span-2 lg:col-span-3" : ""}
              >
                <Link href={service.href} className="block h-full">
                  <motion.div
                    variants={variant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: service.delay ?? 0 }}
                    className="group relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-yellow-500/30 dark:hover:border-yellow-500/30 flex flex-col"
                  >
                    <div className={`relative ${isWide ? "h-64 md:h-auto md:w-2/5" : "h-60 w-full"} overflow-hidden ${isWide ? "md:flex-shrink-0" : ""}`}>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes={isWide 
                          ? "(max-width: 768px) 100vw, 40vw" 
                          : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        }
                        priority={index < 2}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity ${isWide ? "md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" : ""}`} />
                      
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 p-3 rounded-xl backdrop-blur-md shadow-lg">
                        <Icon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
                      </div>
                    </div>

                    <div className={`p-6 ${isWide ? "md:w-3/5 md:p-8 flex flex-col justify-center" : "flex flex-col flex-grow"}`}>
                      <h3 className={`text-2xl ${isWide ? "text-3xl" : ""} font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors italic`}>
                        {service.title}
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-400 ${isWide ? "mb-8 text-lg" : "mb-6"} leading-relaxed ${!isWide ? "flex-grow" : ""}`}>
                        {service.description}
                      </p>
                      
                      <div className={`mt-auto ${isWide ? "" : "space-y-3 pt-6 border-t border-gray-100 dark:border-gray-700"}`}>
                        {isWide ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.features.map((feature: string, i: number) => (
                              <div 
                                key={i} 
                                className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700"
                              >
                                <Check className="h-4 w-4 text-yellow-500 mr-3 flex-shrink-0" aria-hidden="true" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        ) : (
                          service.features.map((feature: string, i: number) => (
                            <div 
                              key={i} 
                              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              <span className="flex-shrink-0 w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
                                <Check className="h-3 w-3 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
                              </span>
                              {feature}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-20 text-center">
          <Button
            asChild
            size="lg"
            className="bg-yellow-500 text-black hover:bg-yellow-600 dark:hover:bg-yellow-400 font-bold px-10 py-7 text-lg rounded-xl shadow-lg hover:shadow-yellow-500/25 transition-all transform hover:-translate-y-1"
          >
            <Link href={ctaHref} className="flex items-center justify-center">
              {ctaText}
              <ArrowRight className="ml-3 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Voir tous nos services</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

ServicesSection.displayName = "ServicesSection";

export default ServicesSection;