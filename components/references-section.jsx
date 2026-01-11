"use client";

import { useState, useRef } from "react";
import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Imports des images locales
import ref1 from "../public/ref1.jpg";
import ref2 from "../public/ref2.jpg";
import ref3 from "../public/ref3.jpg";
import ref4 from "../public/ref4.jpg";
import ref7 from "../public/ref7.jpg";
import ref8 from "../public/ref8.jpg";

export default function ReferencesSection() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const videoRefs = useRef({});

  const handlePlayVideo = (id) => {
    const video = videoRefs.current[id];
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const portfolioItems = [
    { id: 1, type: "image", src: ref1, category: "Projet Pro" },
    { id: 3, type: "video", src: "/refV.mp4", category: "Installation" },
    { id: 4, type: "image", src: ref3, category: "Home Gym" },
    { id: 5, type: "image", src: ref4, category: "Fitness Club" },
    { id: 8, type: "image", src: ref7, category: "Crossfit" },
    { id: 9, type: "image", src: ref8, category: "Premium" },
  ];

  return (
    <section className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden">
      {/* Éléments de décoration en arrière-plan */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

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
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-gray-100 dark:bg-gray-900 shadow-sm hover:shadow-2xl transition-all duration-500"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                {item.type === "image" ? (
                  <img
                    src={item.src.src} // Utilisation de .src pour l'import local
                    alt={`Reference ${item.id}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <video
                      ref={(el) => (videoRefs.current[item.id] = el)}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                      loop
                      muted
                      playsInline
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                    <button
                      onClick={() => handlePlayVideo(item.id)}
                      className="bg-yellow-500 text-black rounded-full p-5 z-10 hover:scale-110 transition-transform shadow-2xl"
                    >
                      <Play className="w-8 h-8 fill-current" />
                    </button>
                  </div>
                )}

                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Contenu textuel au survol */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-yellow-500 font-bold uppercase tracking-widest text-[10px] mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase italic leading-tight mb-4">
                    Réalisation Ironz
                  </h3>
                  <div className="h-1 w-12 bg-yellow-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-3 px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase italic tracking-tighter hover:bg-yellow-500 hover:text-black transition shadow-xl">
            Voir tout le portfolio <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}