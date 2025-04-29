"use client"

import Image from "next/image"
import Marquee from "react-fast-marquee"

export default function BrandsMarquee({ brands }) {
  return (
    <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-6">
      <div className="flex gap-12 mx-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center min-w-[200px]"
          >
            <div className="relative h-16 w-16 mb-4">
              <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-cover" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-1">{brand.name}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{brand.description}</p>
          </div>
        ))}
      </div>
    </Marquee>
  )
}

