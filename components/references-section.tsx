"use client";

import { useState, useRef, MouseEvent } from "react";
import { Play, ArrowRight, LucideProps } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { StaticImageData } from "next/image";

// Imports des images locales
import ref1 from "../public/ref1.jpg";
import ref2 from "../public/ref2.jpg";
import ref3 from "../public/ref3.jpg";
import ref4 from "../public/ref4.jpg";
import ref7 from "../public/ref7.jpg";
import ref8 from "../public/ref8.jpg";

// Types
export type PortfolioItemType = "image" | "video";

export interface PortfolioItem {
  id: number;
  type: PortfolioItemType;
  src: string | StaticImageData;
  category: string;
  title?: string;
  description?: string;
}

interface VideoRefs {
  [key: number]: HTMLVideoElement | null;
}

interface ReferencesSectionProps {
  className?: string;
  items?: PortfolioItem[];
  onViewAll?: () => void;
}

// Animation variants with proper typing
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ReferencesSection({ 
  className = "", 
  items, 
  onViewAll 
}: ReferencesSectionProps): JSX.Element {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const videoRefs = useRef<VideoRefs>({});

  const handlePlayVideo = (id: number, e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play().catch((err) => console.error("Video play error:", err));
      } else {
        video.pause();
      }
    }
  };

  const defaultPortfolioItems: PortfolioItem[] = [
    { id: 1, type: "image", src: ref1, category: "Projet Pro" },
    { id: 3, type: "video", src: "/refV.mp4", category: "Installation" },
    { id: 4, type: "image", src: ref3, category: "Home Gym" },
    { id: 5, type: "image", src: ref4, category: "Fitness Club" },
    { id: 8, type: "image", src: ref7, category: "Crossfit" },
    { id: 9, type: "image", src: ref8, category: "Premium" },
  ];

  const portfolioItems = items ?? defaultPortfolioItems;

  const getImageSource = (src: string | StaticImageData): string => {
    if (typeof src === "string") return src;
    return src.src;
  };

  const handleViewAll = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onViewAll?.();
    // Optional: navigate to portfolio page
    // window.location.href = "/portfolio";
  };

  return (
    <section className={`relative py-24 bg-white dark:bg-gray-950 overflow-hidden ${className}`}>
      {/* Éléments de décoration en arrière-plan */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mt-2 text-gray-900 dark:text-white leading-tight">
              Nos <span className="text-yellow-500">Références</span> .
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-sm italic">
            Aperçu de nos réalisations majeures pour les professionnels et particuliers.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => {
            const isHovered = hoveredItem === item.id;
            const isVideo = item.type === "video";
            
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-gray-100 dark:bg-gray-900 shadow-sm hover:shadow-2xl transition-all duration-500"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  {!isVideo ? (
                    <img
                      src={getImageSource(item.src)}
                      alt={`Reference ${item.id} - ${item.category}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      <video
                        ref={(el: HTMLVideoElement | null) => {
                          if (el) videoRefs.current[item.id] = el;
                        }}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={`Vidéo de référence ${item.category}`}
                      >
                        <source src={item.src as string} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                      <button
                        onClick={(e) => handlePlayVideo(item.id, e)}
                        className="bg-yellow-500 text-black rounded-full p-5 z-10 hover:scale-110 hover:bg-yellow-400 transition-all shadow-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-black"
                        aria-label={videoRefs.current[item.id]?.paused ? "Lire la vidéo" : "Mettre en pause"}
                        type="button"
                      >
                        <Play className="w-8 h-8 fill-current" aria-hidden="true" />
                      </button>
                    </div>
                  )}

                  {/* Overlay au survol */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Contenu textuel au survol */}
                  <div 
                    className={`absolute inset-0 flex flex-col justify-end p-8 transition-all duration-500 ${
                      isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <span className="text-yellow-500 font-bold uppercase tracking-widest text-[10px] mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase italic leading-tight mb-4">
                      {item.title || "Réalisation Ironz"}
                    </h3>
                    {item.description && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="h-1 w-12 bg-yellow-500 rounded-full" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Button */}
        <div className="mt-16 text-center">
          <button 
            onClick={handleViewAll}
            className="inline-flex items-center gap-3 px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase italic tracking-tighter hover:bg-yellow-500 hover:text-black dark:hover:bg-yellow-400 dark:hover:text-black transition-all shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
            type="button"
          >
            Voir tout le portfolio 
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Voir toutes nos réalisations</span>
          </button>
        </div>
      </div>
    </section>
  );
}