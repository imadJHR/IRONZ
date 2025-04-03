import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">IRONZ</h3>
            <p className="text-gray-400 mb-4">
              Votre partenaire pour tous vos besoins en équipement de fitness,
              suppléments et accessoires de sport.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/ironz_official/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>

              <a
                href="https://www.youtube.com/@muscleironz8921"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/home-gym"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  home gym
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/equipements"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  équipements
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/supplement"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  supplément
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/accessoires"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  accessoires
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold mb-4">
              Informations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/a-propos"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  À propos de nous
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-400 space-y-3">
              <p className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  SAHARA MALL 1 ÈRE ÉTAGE C169 & C120
                  <br />
                </span>
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+212669510042</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>contact@ironzpro.com</span>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} IRONZ . Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
