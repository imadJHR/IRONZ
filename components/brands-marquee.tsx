"use client";

import { useState, useEffect, MouseEvent } from "react";
import Marquee from "react-fast-marquee";
import { cn } from "../lib/utils";

const PLACEHOLDER = "/placeholder.svg";

// Types
export interface Brand {
  id?: string | number;
  name: string;
  logo: string | { src: string } | null | undefined;
  url?: string;
  [key: string]: unknown;
}

export interface BrandsMarqueeProps {
  brands: Brand[];
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  gradient?: boolean;
}

interface BrandLogoProps {
  src: Brand["logo"];
  alt?: string;
  className?: string;
}

function BrandLogo({ src, alt = "Brand Logo", className = "" }: BrandLogoProps){
  const [imgSrc, setImgSrc] = useState<string>(PLACEHOLDER);
  
  useEffect(() => {
    const validSrc = (src && typeof src === "object" && "src" in src) 
      ? src.src 
      : (typeof src === "string" ? src : PLACEHOLDER);
    setImgSrc(validSrc || PLACEHOLDER);
  }, [src]);

  const handleError = () => setImgSrc(PLACEHOLDER);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={cn(
        "h-10 md:h-16 w-auto object-contain transition-all duration-500 grayscale opacity-50",
        "group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110",
        className
      )}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function BrandsMarquee({ 
  brands, 
  className = "", 
  speed = 40, 
  pauseOnHover = true, 
  gradient = false 
}: BrandsMarqueeProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden w-full max-w-[100vw]", className)}>
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 dark:text-white">
          Nos <span className="text-yellow-500">Marques</span> Partenaires
        </h2>
        <div className="h-1 w-16 md:w-24 bg-yellow-500 mx-auto mt-4 rounded-full" />
      </div>

      <div className="w-full relative">
        <Marquee 
          gradient={gradient} 
          speed={speed} 
          pauseOnHover={pauseOnHover} 
          className="py-4 overflow-hidden"
        >
          {brands.map((brand, index) => {
            const key = brand.id ?? index;
            const brandName = brand.name || `Brand ${index + 1}`;
            
            return (
              <div
                key={key}
                className="group flex flex-col items-center justify-center mx-8 md:mx-16 min-w-[120px] md:min-w-[180px] cursor-pointer"
                role="listitem"
              >
                {/* Logo Container */}
                <div className="mb-4 h-16 md:h-24 w-full flex items-center justify-center">
                  <BrandLogo src={brand.logo} alt={brandName} />
                </div>

                {/* Text Style */}
                <h3 className="text-sm md:text-xl font-black uppercase italic tracking-wider text-gray-300 dark:text-gray-800 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                  {brandName}
                </h3>
              </div>
            );
          })}
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