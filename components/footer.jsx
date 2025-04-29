"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/ironz_official/",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      href: "https://www.youtube.com/@muscleironz8921",
    },
  ];

  const categories = [
    { name: "Home Gym", href: "/categories/home-gym" },
    { name: "Équipements", href: "/categories/equipements" },
    { name: "Supplément", href: "/categories/supplement" },
    { name: "Accessoires", href: "/categories/accessoires" },
  ];

  const infoLinks = [
    { name: "À propos de nous", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-yellow-500" />,
      content: "SAHARA MALL 1 ÈRE ÉTAGE C169 & C120",
    },
    {
      icon: <Phone className="h-5 w-5 text-yellow-500" />,
      content: "+212669510042",
      href: "tel:+212669510042",
    },
    {
      icon: <Mail className="h-5 w-5 text-yellow-500" />,
      content: "muscleironz2019@gmail.com",
      href: "mailto:muscleironz2019@gmail.com",
    },
  ];

  if (!mounted) return null;

  return (
    <footer className="relative">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-[-1px]">
        <svg
          className="relative block w-full h-12 sm:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-900"
          ></path>
        </svg>
      </div>

      <div className="bg-gradient-to-br pt-24 pb-12 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-yellow-500 blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-orange-500 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-yellow-600 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 h-full">
                <h3 className="font-heading text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  IRONZ
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Votre partenaire pour tous vos besoins en équipement de
                  fitness, suppléments et accessoires de sport.
                </p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/50 hover:bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-300 hover:text-white transition-all duration-300 border border-gray-600 hover:border-transparent"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-lg font-bold mb-5 text-white flex items-center">
                <span className="w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 mr-3"></span>
                Catégories
              </h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={category.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {category.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-lg font-bold mb-5 text-white flex items-center">
                <span className="w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 mr-3"></span>
                Informations
              </h3>
              <ul className="space-y-3">
                {infoLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 h-full">
                <h3 className="font-heading text-lg font-bold mb-5 text-white">
                  Contactez-nous
                </h3>
                <address className="not-italic text-gray-300 space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="mr-3 mt-1 p-2 rounded-lg bg-gray-700/50 group-hover:bg-gradient-to-r from-yellow-500 to-orange-500 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-gray-300 hover:text-yellow-400 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <span>{item.content}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </address>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {currentYear} IRONZ. Tous droits réservés.
              </p>
              <motion.a
                href="#top"
                className="flex items-center text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Retour en haut
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
