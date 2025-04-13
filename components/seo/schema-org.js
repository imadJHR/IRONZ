export const generateOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "SportsGoodsStore",
      name: "IRONZ",
      description:
        "Équipement de fitness professionnel, suppléments alimentaires et accessoires de musculation et d'arts martiaux de qualité professionnelle.",
      url: "https://ironz.ma",
      logo: "https://ironz.ma/logo.png",
      image: "https://ironz.ma/images/og-image.jpg",
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
      openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00",
      priceRange: "MAD",
      paymentAccepted: "Cash, Credit Card",
      currenciesAccepted: "MAD",
    }
  }
  
  export const generateProductSchema = (product) => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.image,
      description: product.description,
      sku: product.id,
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      offers: {
        "@type": "Offer",
        url: `https://ironz.com/produits/${product.slug}`,
        priceCurrency: "MAD",
        price: product.price,
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
        availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "IRONZ",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }
  }
  
  export const generateArticleSchema = (article) => {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      image: article.image,
      datePublished: article.date,
      dateModified: article.updatedAt || article.date,
      author: {
        "@type": "Person",
        name: article.author,
      },
      publisher: {
        "@type": "Organization",
        name: "IRONZ",
        logo: {
          "@type": "ImageObject",
          url: "https://ironz.ma/logo.png",
        },
      },
      description: article.excerpt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://ironz.ma/blog/${article.slug}`,
      },
    }
  }
  