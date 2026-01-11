"use client";

import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { cn } from "../lib/utils";

const PLACEHOLDER = "/placeholder.svg";

function BrandLogo({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(PLACEHOLDER);
  
  useEffect(() => {
    const validSrc = (src && typeof src === 'object') ? src.src : (src || PLACEHOLDER);
    setImgSrc(validSrc);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt || "Brand Logo"}
      onError={() => setImgSrc(PLACEHOLDER)}
      className="h-10 md:h-16 w-auto object-contain transition-all duration-500 grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
    />
  );
}

export default function BrandsMarquee({ brands }) {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden w-full max-w-[100vw]">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white">
          Nos <span className="text-yellow-500">Marques</span> Partenaires
        </h2>
        <div className="h-1 w-16 md:w-24 bg-yellow-500 mx-auto mt-4 rounded-full" />
      </div>

      <div className="w-full relative">
        <Marquee 
          gradient={false} 
          speed={40} 
          pauseOnHover 
          className="py-4 overflow-hidden"
        >
          {brands.map((brand, index) => (
            <div
              key={brand.id || index}
              className="group flex flex-col items-center justify-center mx-8 md:mx-16 min-w-[120px] md:min-w-[180px] cursor-pointer"
            >
              {/* Logo Container */}
              <div className="mb-4 h-16 md:h-24 w-full flex items-center justify-center">
                <BrandLogo src={brand.logo} alt={brand.name} />
              </div>

              {/* Text Style */}
              <h3 className="text-sm md:text-xl font-black uppercase italic tracking-wider text-gray-300 dark:text-gray-800 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                {brand.name}
              </h3>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="container mx-auto px-4 mt-12 flex justify-center text-center">
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400 opacity-60">
          Trusted by Professionals
        </p>
      </div>
    </section>
  );
}