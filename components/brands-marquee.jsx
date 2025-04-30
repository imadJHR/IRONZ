"use client"

import Image from "next/image"
import Marquee from "react-fast-marquee"

export default function BrandsMarquee({ brands }) {
  return (
    <section className="py-10 bg-muted/40">
      <Marquee gradient={false} speed={50} pauseOnHover className="overflow-hidden">
        <div className="flex items-center gap-8 px-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 min-w-[220px] max-w-xs flex flex-col items-center text-center hover:scale-[1.02]"
            >
              <div className="relative h-16 w-full mb-4">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <h3 className="font-semibold text-base text-black mb-1 truncate max-w-full">
                {brand.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {brand.description}
              </p>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  )
}
