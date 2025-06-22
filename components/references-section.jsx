"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ref1 from "../public/ref1.jpg";
import ref2 from "../public/ref2.jpg";
import ref3 from "../public/ref3.jpg";
import ref4 from "../public/ref4.jpg";
import ref7 from "../public/ref7.jpg";
import ref8 from "../public/ref8.jpg";
import ref9 from "../public/ref9.jpg";

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
    {
      id: 1,
      type: "image",
      src: ref1,
      category: "ironz",
      title: "",
      location: "",
      year: "",
    },
    {
      id: 3,
      type: "video",
      src: "/refV.mp4",
      category: "ironz",
      title: "",
      location: "",
      year: "",
    },
    {
      id: 4,
      type: "image",
      src: ref3,
      category: "ironz",
      title: "",
      location: "",
      year: "",
    },
    {
      id: 5,
      type: "image",
      src: ref4,
      category: "ironz",
      title: "",
      location: "",
      year: "",
    },
    {
      id: 8,
      type: "image",
      src: ref7,
      category: "ironz",
      title: "",
      location: "",
      year: "",
    },
    {
      id: 9,
      type: "image",
      src: ref8,
      category: "ironz",
      title: "",
      location: "",
      year: "",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950/10 z-0" />
      <div className="absolute top-24 left-10 w-72 h-72 bg-amber-200/20 dark:bg-amber-400/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-24 right-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl z-0" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
         
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-400 bg-clip-text text-transparent">
            Nos <span className="text-yellow-500">Références</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos réalisations exceptionnelles qui témoignent de notre
            expertise et de notre créativité
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-700"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full aspect-[4/3]">
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.title || `Reference ${item.id}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <video
                      ref={(el) => (videoRefs.current[item.id] = el)}
                      className="absolute inset-0 w-full h-full object-cover opacity-70"
                      loop
                      muted
                      playsInline
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                    <button
                      onClick={() => handlePlayVideo(item.id)}
                      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-4 z-10 hover:scale-110 transition-transform"
                    >
                      <Play className="w-6 h-6 text-slate-800 dark:text-white" />
                    </button>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0,
                    y: hoveredItem === item.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col justify-end p-6"
                >
                  <div className="text-white">
                    <Badge
                      variant="secondary"
                      className="mb-3 bg-yellow-500 text-white border-0"
                    >
                      {item.category}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-1 leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-slate-300">{item.location}</p>
                        <p className="text-amber-400 font-medium">
                          {item.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
