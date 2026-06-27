"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Wrench,
  Clock,
  Instagram,
  Facebook,
  Phone,
  Mail,
  ArrowRight,
  Flame,
} from "lucide-react";

const maintenanceFeatures = [
  {
    icon: Dumbbell,
    title: "Équipement Pro",
    desc: "Préparation de nouveaux produits fitness premium.",
  },
  {
    icon: Wrench,
    title: "Optimisation",
    desc: "Amélioration de la performance du site pour vous.",
  },
  {
    icon: Clock,
    title: "Très Bientôt",
    desc: "Le site sera de retour rapidement plus fort.",
  },
];

const contactLinks = [
  { icon: Phone, label: "+212 6XX-XXXXXX", href: "tel:+212600000000" },
  { icon: Mail, label: "contact@ironz.ma", href: "mailto:contact@ironz.ma" },
];

export default function MaintenancePage() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: 7 days from now (can be hardcoded if needed)
    const target = new Date();
    target.setDate(target.getDate() + 7);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      if (distance <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen w-full bg-white text-gray-900 relative overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      {/* Decorative background shapes */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-yellow-400/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-400/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/logo.png"
            alt="IRONZ"
            width={180}
            height={60}
            className="h-16 sm:h-20 w-auto object-contain mx-auto mb-8"
            priority
            unoptimized
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-600 text-xs sm:text-sm font-black uppercase italic tracking-widest mb-6"
        >
          <Flame className="h-4 w-4" />
          Site en maintenance
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.95] mb-6"
        >
          On se prépare
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
            pour vous servir
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed"
        >
          IRONZ est en pleine mise à niveau pour vous offrir une expérience
          encore plus performante. Revenez vite pour découvrir nos équipements
          sportifs professionnels.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-4 gap-3 sm:gap-4 mb-12 w-full max-w-md mx-auto"
        >
          {[
            { value: countdown.days, label: "Jours" },
            { value: countdown.hours, label: "Heures" },
            { value: countdown.minutes, label: "Min" },
            { value: countdown.seconds, label: "Sec" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-black italic text-gray-900">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
        >
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black uppercase italic tracking-widest shadow-lg shadow-yellow-500/25 hover:from-yellow-600 hover:to-orange-600 transition-all hover:scale-105 active:scale-95"
          >
            Contactez-nous
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mb-14"
        >
          {maintenanceFeatures.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/50 transition-all group"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-sm sm:text-base font-black uppercase italic tracking-wider text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {contactLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <link.icon className="h-4 w-4 text-yellow-500" />
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4">
            <Link
              href="https://instagram.com/ironz_equipements"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram IRONZ"
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://facebook.com/ironz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook IRONZ"
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-yellow-500 hover:text-white transition-all"
            >
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-14 text-xs text-gray-400 font-medium"
        >
          © {new Date().getFullYear()} IRONZ PRO — Tous droits réservés.
        </motion.p>
      </div>
    </main>
  );
}
