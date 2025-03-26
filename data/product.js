// Main product data file for IRONZ PRO

export const products = {
  homeGym: [
    {
      id: "hg-001",
      name: "Station de Musculation Multifonction Pro",
      description: "Station complète avec presse à cuisses, poulie haute et basse, et banc intégré",
      price: 1299.99,
      oldPrice: 1499.99,
      discount: 13,
      image: "/placeholder.svg?height=600&width=600",
      category: "Home Gym",
      rating: 5,
      reviews: 87,
      inStock: true,
      isNew: false,
      isBestseller: true,
      features: [
        "Structure en acier renforcé",
        "Charge maximale: 150kg",
        "Plus de 30 exercices possibles",
        "Dimensions: 180 x 210 x 110 cm",
      ],
    },
    {
      id: "hg-002",
      name: "Banc de Musculation Réglable",
      description: "Banc multifonctionnel pour exercices variés, réglable en 7 positions",
      price: 249.99,
      oldPrice: 299.99,
      discount: 15,
      image: "/placeholder.svg?height=600&width=600",
      category: "Home Gym",
      rating: 4,
      reviews: 42,
      inStock: true,
      isNew: false,
      isBestseller: true,
      features: [
        "7 positions d'inclinaison",
        "Charge maximale: 300kg",
        "Rembourrage haute densité",
        "Dimensions: 120 x 45 x 45 cm",
      ],
    },
    {
      id: "hg-003",
      name: "Rack à Squat Professionnel",
      description: "Rack à squat robuste avec barre de traction et supports de sécurité",
      price: 399.99,
      oldPrice: 449.99,
      discount: 10,
      image: "/placeholder.svg?height=600&width=600",
      category: "Home Gym",
      rating: 5,
      reviews: 36,
      inStock: true,
      isNew: true,
      isBestseller: false,
      features: [
        "Structure en acier renforcé",
        "Charge maximale: 350kg",
        "Barre de traction multiprises",
        "Dimensions: 120 x 110 x 210 cm",
      ],
    },
    {
      id: "hg-004",
      name: "Tapis Roulant Pliable T-800",
      description: "Tapis roulant motorisé avec inclinaison automatique et programmes d'entraînement",
      price: 899.99,
      oldPrice: 999.99,
      discount: 10,
      image: "/placeholder.svg?height=600&width=600",
      category: "Home Gym",
      rating: 4,
      reviews: 58,
      inStock: true,
      isNew: false,
      isBestseller: false,
      features: [
        "Vitesse max: 20 km/h",
        "Inclinaison max: 15%",
        "20 programmes d'entraînement",
        "Surface de course: 140 x 50 cm",
      ],
    },
  ],

  equipmentPro: [
    {
      id: "ep-001",
      name: "Haltères Hexagonaux 5kg (Paire)",
      description: "Haltères professionnels avec revêtement antidérapant",
      price: 89.99,
      oldPrice: 99.99,
      discount: 10,
      image: "/placeholder.svg?height=600&width=600",
      category: "Équipement Pro",
      rating: 4,
      reviews: 56,
      inStock: true,
      isNew: false,
      isBestseller: true,
      features: [
        "Acier de haute qualité",
        "Revêtement caoutchouc antidérapant",
        "Design hexagonal anti-roulement",
        "Poignée chromée ergonomique",
      ],
    },
    {
      id: "ep-002",
      name: "Barre Olympique 20kg",
      description: "Barre olympique professionnelle en acier trempé avec roulements à aiguilles",
      price: 249.99,
      oldPrice: null,
      discount: null,
      image: "/placeholder.svg?height=600&width=600",
      category: "Équipement Pro",
      rating: 5,
      reviews: 32,
      inStock: true,
      isNew: false,
      isBestseller: false,
      features: ["Longueur: 220 cm", "Poids: 20 kg", "Charge maximale: 700 kg", "Roulements à aiguilles"],
    },
    {
      id: "ep-003",
      name: "Kettlebell Competition 16kg",
      description: "Kettlebell de compétition en acier avec poignée ergonomique",
      price: 79.99,
      oldPrice: 89.99,
      discount: 10,
      image: "/placeholder.svg?height=600&width=600",
      category: "Équipement Pro",
      rating: 5,
      reviews: 28,
      inStock: true,
      isNew: false,
      isBestseller: false,
      features: [
        "Acier de haute qualité",
        "Dimensions standardisées",
        "Poignée ergonomique",
        "Base plate anti-roulement",
      ],
    },
    {
      id: "ep-004",
      name: "Disques Bumper 5kg (Paire)",
      description: "Disques bumper en caoutchouc haute densité pour haltérophilie",
      price: 119.99,
      oldPrice: null,
      discount: null,
      image: "/placeholder.svg?height=600&width=600",
      category: "Équipement Pro",
      rating: 4,
      reviews: 42,
      inStock: true,
      isNew: true,
      isBestseller: false,
      features: [
        "Caoutchouc haute densité",
        "Bague en acier inoxydable",
        "Diamètre olympique: 45 cm",
        "Rebond minimal",
      ],
    },
  ],

  supplements: [
    {
      id: "sp-001",
      name: "Protéine Whey Isolate Premium",
      description: "Protéine de haute qualité pour la récupération musculaire",
      price: 59.99,
      oldPrice: null,
      discount: null,
      image: "/placeholder.svg?height=600&width=600",
      category: "Suppléments",
      rating: 5,
      reviews: 128,
      inStock: true,
      isNew: false,
      isBestseller: true,
      features: ["90% de protéines", "Faible en glucides et lipides", "25g de protéines par dose", "Saveur: Chocolat"],
    },
    {
      id: "sp-002",
      name: "BCAA 8:1:1 Formula",
      description: "Acides aminés branchés pour la récupération et la croissance musculaire",
      price: 34.99,
      oldPrice: 39.99,
      discount: 12,
      image: "/placeholder.svg?height=600&width=600",
      category: "Suppléments",
      rating: 4,
      reviews: 76,
      inStock: true,
      isNew: false,
      isBestseller: false,
      features: [
        "Ratio 8:1:1 (Leucine, Isoleucine, Valine)",
        "Sans sucre ni calories",
        "7g de BCAA par dose",
        "Saveur: Fruits rouges",
      ],
    },
    {
      id: "sp-003",
      name: "Créatine Monohydrate Micronisée",
      description: "Créatine pure pour augmenter la force et la performance",
      price: 29.99,
      oldPrice: null,
      discount: null,
      image: "/placeholder.svg?height=600&width=600",
      category: "Suppléments",
      rating: 5,
      reviews: 94,
      inStock: true,
      isNew: false,
      isBestseller: true,
      features: [
        "Créatine monohydrate 100% pure",
        "5g par dose",
        "Micronisée pour une meilleure absorption",
        "Sans additifs",
      ],
    },
    {
      id: "sp-004",
      name: "Pre-Workout Extreme",
      description: "Formule pré-entraînement pour maximiser l'énergie et la concentration",
      price: 44.99,
      oldPrice: 49.99,
      discount: 10,
      image: "/placeholder.svg?height=600&width=600",
      category: "Suppléments",
      rating: 4,
      reviews: 68,
      inStock: true,
      isNew: true,
      isBestseller: false,
      features: [
        "300mg de caféine par dose",
        "Avec bêta-alanine et citrulline",
        "Sans sucre ajouté",
        "Saveur: Fruit du dragon",
      ],
    },
  ],

  fitnessAccessories: [
    {
      id: "fa-001",
      name: "Bandes de Résistance Pro (Set de 5)",
      description: "Set de bandes élastiques de différentes résistances pour un entraînement complet",
      price: 29.99,
      oldPrice: 34.99,
      discount: 15,
      image: "/placeholder.svg?height=600&width=600",
      category: "Musculation",
      rating: 4,
      reviews: 112,
      inStock: true,
      isNew: false,
      isBestseller: true,
      features: [
        "5 niveaux de résistance (5-40kg)",
        "Latex naturel haute qualité",
        "Poignées ergonomiques incluses",
        "Sac de transport inclus",
      ],
    },
    {
      id: "fa-002",
      name: "Corde à Sauter Pro Speed",
      description: "Corde à sauter professionnelle avec roulements à billes pour CrossFit et boxe",
      price: 19.99,
      oldPrice: null,
      discount: null,
      image: "/placeholder.svg?height=600&width=600",
      category: "Musculation",
      rating: 5,
      reviews: 87,
      inStock: true,
      isNew: false,
      isBestseller: false,
      features: [
        "Roulements à billes haute vitesse",
        "Câble ajustable jusqu'à 3m",
        "Poignées en aluminium légères",
        "Idéale pour double-unders",
      ],
    },
    {
      id: "fa-003",
      name: "Roue Abdominale Double",
      description: "Roue abdominale à double roue pour plus de stabilité et d'efficacité",
      price: 24.99,
      oldPrice: 29.99,
      discount: 15,
      image: "/placeholder.svg?height=600&width=600",
      category: "Musculation",
      rating: 4,
      reviews: 64,
      inStock: true,
      isNew: false,
      isBestseller: false,
      features: [
        "Double roue pour plus de stabilité",
        "Poignées ergonomiques antidérapantes",
        "Tapis de genoux inclus",
        "Supporte jusqu'à 150kg",
      ],
    },
    {
      id: "fa-004",
      name: "Gants de Musculation Premium",
      description: "Gants de musculation avec protection des paumes et soutien des poignets",
      price: 24.99,
      oldPrice: null,
      discount: null,
      image: "/placeholder.svg?height=600&width=600",
      category: "Musculation",
      rating: 4,
      reviews: 93,
      inStock: true,
      isNew: true,
      isBestseller: false,
      features: [
        "Cuir synthétique respirant",
        "Rembourrage en gel anti-ampoules",
        "Soutien des poignets intégré",
        "Disponible en tailles S à XL",
      ],
    },
  ],

  martialArts: [
    {
      id: "ma-001",
      name: "Gants de Boxe Pro Series",
      description: "Gants de boxe professionnels avec rembourrage optimal",
      price: 79.99,
      oldPrice: null,
      discount: null,
      image: "/placeholder.svg?height=600&width=600",
      category: "Arts Martiaux",
      rating: 4,
      reviews: 37,
      inStock: true,
      isNew: false,
      isBestseller: true,
      features: [
        "Cuir véritable haute qualité",
        "Rembourrage multicouche",
        "Fermeture par velcro renforcé",
        "Disponible en 10oz, 12oz, 14oz et 16oz",
      ],
    },
    {
      id: "ma-002",
      name: "Sac de Frappe Heavy Duty 150cm",
      description: "Sac de frappe professionnel rempli pour boxe et arts martiaux",
      price: 149.99,
      oldPrice: 179.99,
      discount: 15,
      image: "/placeholder.svg?height=600&width=600",
      category: "Arts Martiaux",
      rating: 5,
      reviews: 28,
      inStock: true,
      isNew: false,
      isBestseller: false,
      features: [
        "Cuir synthétique ultra-résistant",
        "Remplissage textile compressé",
        "Chaînes et crochet renforcés",
        "Poids: 45kg",
      ],
    },
    {
      id: "ma-003",
      name: "Kimono Jiu-Jitsu Brésilien Elite",
      description: "Kimono de JJB de qualité compétition avec veste renforcée",
      price: 129.99,
      oldPrice: null,
      discount: null,
      image: "/placeholder.svg?height=600&width=600",
      category: "Arts Martiaux",
      rating: 5,
      reviews: 19,
      inStock: true,
      isNew: true,
      isBestseller: false,
      features: [
        "Coton perlé 550g",
        "Veste renforcée aux points de tension",
        "Pantalon ripstop",
        "Disponible en blanc, bleu et noir",
      ],
    },
    {
      id: "ma-004",
      name: "Protège-Dents Double Protection",
      description: "Protège-dents professionnel avec étui de rangement",
      price: 19.99,
      oldPrice: 24.99,
      discount: 20,
      image: "/placeholder.svg?height=600&width=600",
      category: "Arts Martiaux",
      rating: 4,
      reviews: 45,
      inStock: true,
      isNew: false,
      isBestseller: false,
      features: [
        "Silicone médical thermoformable",
        "Double protection (supérieure et inférieure)",
        "Respirabilité optimale",
        "Étui de rangement inclus",
      ],
    },
  ],
}

// Featured products from all categories
export const featuredProducts = [
  products.homeGym[1], // Banc de Musculation Réglable
  products.supplements[0], // Protéine Whey Isolate Premium
  products.equipmentPro[0], // Haltères Hexagonaux 5kg
  products.martialArts[0], // Gants de Boxe Pro Series
  products.fitnessAccessories[0], // Bandes de Résistance Pro
  products.supplements[2], // Créatine Monohydrate
]

// New arrivals
export const newArrivals = [
  products.homeGym[2], // Rack à Squat Professionnel
  products.equipmentPro[3], // Disques Bumper 5kg
  products.supplements[3], // Pre-Workout Extreme
  products.fitnessAccessories[3], // Gants de Musculation Premium
  products.martialArts[2], // Kimono Jiu-Jitsu Brésilien Elite
]

// Best sellers
export const bestSellers = [
  products.homeGym[0], // Station de Musculation Multifonction Pro
  products.homeGym[1], // Banc de Musculation Réglable
  products.equipmentPro[0], // Haltères Hexagonaux 5kg
  products.supplements[0], // Protéine Whey Isolate Premium
  products.supplements[2], // Créatine Monohydrate Micronisée
  products.fitnessAccessories[0], // Bandes de Résistance Pro
  products.martialArts[0], // Gants de Boxe Pro Series
]

// Special offers
export const specialOffers = [
  {
    ...products.homeGym[1],
    specialPrice: 229.99,
    offerText: "Offre limitée - 20€ de réduction supplémentaire",
  },
  {
    ...products.supplements[1],
    specialPrice: 29.99,
    offerText: "Pack économique - 5€ de réduction",
  },
  {
    ...products.martialArts[1],
    specialPrice: 129.99,
    offerText: "Promo flash - 20€ de réduction",
  },
]

// Categories data
export const categories = [
  {
    id: "cat-1",
    name: "Home Gym",
    description: "Équipez votre espace d'entraînement personnel avec notre gamme complète",
    image: "/placeholder.svg?height=600&width=600",
    href: "/categories/home-gym",
    productCount: products.homeGym.length,
  },
  {
    id: "cat-2",
    name: "Équipement Professionnel",
    description: "Matériel de qualité professionnelle pour les salles et athlètes exigeants",
    image: "/placeholder.svg?height=600&width=600",
    href: "/categories/equipement-professionnel",
    productCount: products.equipmentPro.length,
  },
  {
    id: "cat-3",
    name: "Suppléments Alimentaires",
    description: "Optimisez vos performances et votre récupération avec nos suppléments",
    image: "/placeholder.svg?height=600&width=600",
    href: "/categories/supplements",
    productCount: products.supplements.length,
  },
  {
    id: "cat-4",
    name: "Accessoires de Musculation",
    description: "Tous les accessoires essentiels pour compléter votre entraînement",
    image: "/placeholder.svg?height=600&width=600",
    href: "/categories/musculation",
    productCount: products.fitnessAccessories.length,
  },
  {
    id: "cat-5",
    name: "Arts Martiaux",
    description: "Équipement spécialisé pour tous les arts martiaux et sports de combat",
    image: "/placeholder.svg?height=600&width=600",
    href: "/categories/arts-martiaux",
    productCount: products.martialArts.length,
  },
]

// Brands data
export const brands = [
  {
    id: "brand-1",
    name: "PowerFlex",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Équipement de musculation haut de gamme",
  },
  {
    id: "brand-2",
    name: "NutriPro",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Suppléments nutritionnels de qualité supérieure",
  },
  {
    id: "brand-3",
    name: "FightMaster",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Spécialiste des équipements d'arts martiaux",
  },
  {
    id: "brand-4",
    name: "FitLife",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Accessoires de fitness innovants",
  },
  {
    id: "brand-5",
    name: "IronForce",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Équipement d'haltérophilie professionnel",
  },
  {
    id: "brand-6",
    name: "VitaMax",
    logo: "/placeholder.svg?height=200&width=200",
    description: "Vitamines et compléments alimentaires",
  },
]

// Blog posts
export const blogPosts = [
  {
    id: "blog-1",
    title: "Comment optimiser votre récupération musculaire",
    excerpt: "Découvrez les meilleures stratégies pour accélérer votre récupération et maximiser vos gains.",
    image: "/placeholder.svg?height=600&width=800",
    date: "2023-05-15",
    author: "Thomas Martin",
    category: "Nutrition",
    url: "/blog/optimiser-recuperation-musculaire",
  },
  {
    id: "blog-2",
    title: "Guide complet pour créer votre home gym",
    excerpt: "Tout ce que vous devez savoir pour aménager un espace d'entraînement efficace chez vous.",
    image: "/placeholder.svg?height=600&width=800",
    date: "2023-06-02",
    author: "Sophie Dubois",
    category: "Équipement",
    url: "/blog/guide-home-gym",
  },
  {
    id: "blog-3",
    title: "Les bases du Jiu-Jitsu Brésilien pour débutants",
    excerpt: "Apprenez les fondamentaux de cet art martial complet qui révolutionne les sports de combat.",
    image: "/placeholder.svg?height=600&width=800",
    date: "2023-06-18",
    author: "Karim Benali",
    category: "Arts Martiaux",
    url: "/blog/bases-jiu-jitsu-bresilien",
  },
]

// FAQ data
export const faqs = [
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Nous livrons partout en France métropolitaine sous 2 à 5 jours ouvrés. Pour les DOM-TOM et l'international, comptez 5 à 10 jours ouvrés.",
  },
  {
    question: "Comment retourner un produit ?",
    answer:
      "Vous disposez de 30 jours pour retourner un produit. Il doit être dans son état d'origine, non utilisé et dans son emballage d'origine. Contactez notre service client pour initier un retour.",
  },
  {
    question: "Les suppléments sont-ils testés pour les substances interdites ?",
    answer:
      "Oui, tous nos suppléments sont testés en laboratoire et certifiés sans substances interdites par les fédérations sportives internationales.",
  },
  {
    question: "Proposez-vous un service d'installation pour les équipements lourds ?",
    answer:
      "Oui, nous proposons un service d'installation pour les équipements lourds comme les stations de musculation. Ce service est disponible en option lors de votre commande.",
  },
  {
    question: "Puis-je modifier ma commande après l'avoir passée ?",
    answer:
      "Vous pouvez modifier votre commande dans les 2 heures suivant sa validation. Au-delà, contactez notre service client qui fera son possible pour répondre à votre demande.",
  },
]

