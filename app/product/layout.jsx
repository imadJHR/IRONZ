export const metadata = {
    title: "Tous nos produits - Votre Boutique de Sport",
    description:
      "Découvrez notre gamme complète de produits pour l'aménagement et l'équipement de vos espaces sportifs et de loisirs. Livraison rapide et service de qualité.",
    keywords: "produits sportifs, équipement sportif, aménagement sportif, loisirs, fitness, musculation",
    openGraph: {
      title: "Tous nos produits - Votre Boutique de Sport",
      description:
        "Découvrez notre gamme complète de produits pour l'aménagement et l'équipement de vos espaces sportifs et de loisirs.",
      type: "website",
      url: "https://votreboutique.com/produits",
      images: [
        {
          url: "https://votreboutique.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Produits sportifs",
        },
      ],
    },
  }
  
  export default function ProductsLayout({ children }) {
    return <>{children}</>
  }
  