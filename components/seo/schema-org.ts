import { productAggregateRatingSchema } from "../../lib/product-review-summary";
import { productOfferSchema } from "../../lib/product-offer";
import { productIdentifierSchema } from "../../lib/product-identifiers";

export const generateOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "SportsGoodsStore",
      name: "IRONZ",
      description:
        "Équipement de fitness professionnel, suppléments alimentaires et accessoires de musculation et d'arts martiaux de qualité professionnelle.",
      url: "https://www.ironz.ma",
      logo: "https://www.ironz.ma/logo-optimized.png",
      image: "https://www.ironz.ma/og-image.jpg",
      telephone: "+212-000-000000",
      email: "contact@ironz.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "SAHARA MALL 1 ére étage C169 & 120",
        addressLocality: "Agadir",
        addressRegion: "Agadir",
        postalCode: "",
        addressCountry: "MA",
      },
      openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 09:00-18:00",
      priceRange: "MAD",
      paymentAccepted: "Cash, Credit Card",
      currenciesAccepted: "MAD",
    }
  }
  export const generateProductSchema = (product) => {
    const { offers } = productOfferSchema(product, `https://www.ironz.ma/produit/${product.slug}`);
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.image,
      description: product.description,
      ...productIdentifierSchema(product),
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      ...(offers && { offers: {
        ...offers,
        seller: {
          "@type": "Organization",
          name: "IRONZ",
        },
      } }),
      ...productAggregateRatingSchema(product),
    }
  }
