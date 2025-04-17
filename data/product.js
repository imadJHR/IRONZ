import img1 from "../public/homeGym.jpg";
import img2 from "../public/equipement.jpg";
import img3 from "../public/complement.jpg";
import img4 from "../public/accessoire.jpg";
import img5 from "../public/matrix.png";
import img6 from "../public/lifefitness.png";
import a1 from "../public/a1.jpeg";
import a2 from "../public/a2.jpeg";
import a3 from "../public/a3.jpeg";
import a4 from "../public/a4.jpeg";
import a5 from "../public/a5.jpeg";
import a6 from "../public/a6.jpeg";
import a7 from "../public/a7.jpeg";
import a8 from "../public/a8.jpeg";
import a9 from "../public/a9.jpeg";
import a10 from "../public/a10.jpeg";
import a11 from "../public/a11.jpeg";
import a12 from "../public/a12.jpeg";
import a13 from "../public/a13.jpeg";
import a14 from "../public/a14.jpeg";
import a15 from "../public/a15.jpeg";
import a16 from "../public/a16.jpeg";
import a17 from "../public/a17.jpeg";
export const categories = [
  {
    id: "1",
    image: img1,
    name: "home gym",
    href: "/categories/home-gym",
    icon: "Dumbbell",
    description: "Matériel et équipements pour l'entraînement à domicile",
  },
  {
    id: "2",
    image: img2,
    name: "équipements",
    href: "/categories/equipements",
    icon: "Settings",
    description: "Matériel professionnel pour le sport et la remise en forme",
  },
  {
    id: "3",
    image: img3,
    name: "supplément",
    href: "/categories/supplement",
    icon: "Pill",
    description:
      "Compléments alimentaires pour optimiser la nutrition et la performance",
  },
  {
    id: "4",
    image: img4,
    name: "accessoires",
    href: "/categories/accessoires",
    icon: "Package",
    description: "Accessoires indispensables pour le sport et le bien-être",
    subCategories: [
      {
        id: "4-1",
        name: "gants",
        href: "/categories/accessoires/gants",
        description: "Gants de protection pour tous types d'entraînements",
      },
      {
        id: "4-2",
        name: "ceintures",
        href: "/categories/accessoires/ceintures",
        description:
          "Ceintures de maintien pour la musculation et l'haltérophilie",
      },
      {
        id: "4-3",
        name: "sacs",
        href: "/categories/accessoires/sacs",
        description: "Sacs de sport et de rangement pour vos équipements",
      },
      {
        id: "4-4",
        name: "autres",
        href: "/categories/accessoires/autres",
        description:
          "Autres accessoires pour compléter votre équipement sportif",
      },
    ],
  },
];

export const products = [
  {
    id: "1",
    name: "Tapis de Yoga ECO-FRIENDLY EVA",
    slug: "Tapis-de-Yoga-ECO-FRIENDLY-EVA",
    description:
      "Profitez d’un confort optimal avec ce tapis de yoga en EVA écologique, idéal pour vos séances de yoga, pilates et fitness.",
    features: [
      " Matériau EVA de haute qualité : léger, durable et résistant.",
      " Surface antidérapante pour une meilleure adhérence et sécurité.",
      " Facile à transporter et à entretenir.",
      " Disponible en plusieurs couleurs pour s’adapter à vos goûts.",
      "Parfait pour tous les niveaux, du débutant au yogi expérimenté ! 🌿",
    ],
    price: 159,
    oldPrice: "",
    discount: "",
    image: a1,
    gallery: [a2, a3, a4, a1],
    category: "home gym",
    categoryId: "1",
    rating: 4.7,
    reviewCount: 124,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 45,
    sku: "BM-MF-001",
    date: "2023-10-15",
    tags: ["musculation", "fitness", "entraînement", "banc", "clearance"],
    dimensions: {
      width: 120,
      height: 50,
      depth: 60,
      weight: 25,
    },
    colors: ["Gris", "Violet", "Vert", "Bleu"],
    materials: ["Acier", "Mousse haute densité", "Similicuir"],
    warranty: "2 ans",
    shipping: {
      dimensions: "130 x 70 x 20 cm",
      weight: 28,
      method: "Standard",
      estimatedDelivery: "3-5 jours ouvrés",
    },
    relatedProducts: ["3", "7", "9"],
  },
  {
    id: "2",
    name: "Bande de Résistance LIVEPRO  Small",
    slug: "bande-de-resistance-small",
    description:
      "Optimisez vos entraînements avec la bande de résistance LIVEPRO Small, conçue pour améliorer votre force, votre endurance et votre souplesse !",
    features: [
      "Niveau de résistance modéré, parfait pour les tractions assistées, la musculation, le CrossFit, le Pilates et les étirements.",
      "Matériau en latex premium, offrant une grande durabilité et une élasticité optimale.",
      "Adaptée aux sportifs de tous niveaux, idéale pour progresser en douceur.",
      "🔥 Ajoutez de l’intensité à vos séances et atteignez de nouveaux sommets avec la Super Band LIVEPRO Small ! 💯",
    ],
    price: 109,
    oldPrice: "",
    discount: "",
    image: a5,
    gallery: [a5],
    category: "équipements",
    categoryId: "2",
    rating: 4.9,
    reviewCount: 89,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 120,
    sku: "TY-PR-002",
    date: "2023-11-20",
    tags: ["yoga", "fitness", "méditation", "tapis", "summer", "current"],
    dimensions: {
      width: 61,
      height: 0.6,
      depth: 183,
      weight: 1.2,
    },
    colors: ["Bleu", "Violet", "Vert", "Noir"],
    materials: ["TPE écologique", "Caoutchouc naturel"],
    warranty: "1 an",
    shipping: {
      dimensions: "62 x 15 x 15 cm",
      weight: 1.5,
      method: "Express",
      estimatedDelivery: "1-2 jours ouvrés",
    },
    relatedProducts: ["8", "12"],
  },
  {
    id: "3",
    name: "Chaussettes de Sport Antidérapantes",
    slug: "chaussettes-de-sport",
    description:
      "Assurez-vous un contrôle total et un confort absolu avec ces chaussettes de sport spécialement conçues pour optimiser vos performances.",
    features: [
      "Maintien ergonomique : S’ajuste à la forme de votre pied pour un soutien optimal.",
      "Grip antidérapant : Parfait pour les changements de direction rapides et les accélérations sur le terrain.",
      "Matières respirantes : Gardent vos pieds au sec même lors des efforts les plus intenses.",
      "Multisports : Idéales pour le football, le basketball, la course et les sports de combat.",
      "Large choix de couleurs : Trouvez la teinte qui correspond à votre style et à votre équipe.",
    ],
    price: 89.99,
    oldPrice: "",
    discount: "",
    image: a6,
    gallery: [a6, a7, a8, a9, a10],
    category: "accessoires",
    categoryId: "3",
    rating: 4.5,
    reviewCount: 76,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 35,
    sku: "HA-AJ-003",
    date: "2023-09-05",
    tags: ["musculation", "fitness", "haltères", "poids", "current"],
    dimensions: {
      width: 40,
      height: 20,
      depth: 20,
      weight: 40,
    },
    colors: ["Noir/Rouge", "Noir/Gris"],
    materials: ["Fonte", "Caoutchouc", "Acier chromé"],
    warranty: "3 ans",
    shipping: {
      dimensions: "45 x 25 x 25 cm",
      weight: 42,
      method: "Standard",
      estimatedDelivery: "3-5 jours ouvrés",
    },
    relatedProducts: ["1", "7", "9"],
  },
  {
    id: "4",
    name: "Chaussures de Boxe – Alliez Vitesse et Puissance sur le Ring !",
    slug: "Chaussures-de-Boxe",
    description:
      "🔥 Passez à la vitesse supérieure avec ces chaussures de boxe conçues pour offrir légèreté, stabilité et confort à chaque mouvement. Elles vous permettent d’exploiter pleinement votre potentiel sur le ring.",
    features: [
      "Agilité Maximale – Structure ultra légère pour des déplacements rapides et précis.",
      "Maintien Renforcé – Renforts stratégiques pour une protection optimale de la cheville.",
      "Adhérence Exceptionnelle – Semelle innovante pour une traction parfaite sur tous les supports.",
      " Respirabilité et Confort – Matériaux aérés qui évacuent efficacement la transpiration.",
      "Port USB intégré",
    ],
    price: 499,
    oldPrice: "",
    discount: "",
    image: a11,
    gallery: [a11, a12, a13],
    category: "accessoires",
    categoryId: "4",
    subCategoryId: "4-4",
    rating: 4.2,
    reviewCount: 53,
    isNew: false,
    isFeatured: false,
    inStock: true,

    tags: ["luminaire", "relaxation", "LED", "ambiance", "summer"],

    colors: ["Rouge", "Bleu"],

    shipping: {
      estimatedDelivery: "2-3 jours ouvrés",
    },
    relatedProducts: ["10"],
  },
  {
    id: "5",
    name: "Ensemble Venum Training Camp – Dominez le ring avec style et puissance !",
    slug: "Ensemble-Venum-Training-Camp",
    description:
      "🔥 Préparez-vous à l'entraînement ultime avec cet ensemble exclusif Venum Training Camp. Conçu pour les combattants de haut niveau, il offre une combinaison parfaite de confort, de résistance et de style audacieux",
    features: [
      " Tissu ultra-résistant et extensible pour une liberté de mouvement totale.",
      "Technologie de compression pour un maintien optimal et une meilleure récupération musculaire.",
      " Matériaux respirants pour une évacuation rapide de la transpiration.",
      "Design agressif et moderne qui reflète la puissance et l'intensité des vrais guerriers.",
    ],
    price: 299,
    oldPrice: "",
    discount: "",
    image: a14,
    gallery: [a14, a15, a16, a17],
    category: "accessoires",
    categoryId: "4",
    subCategoryId: "4-1",
    rating: 4.6,
    reviewCount: 87,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 150,
    sku: "GM-PR-005",
    date: "2023-08-15",
    tags: [
      "gants",
      "musculation",
      "protection",
      "fitness",
      "summer",
      "current",
    ],
    colors: ["Vert", "Rouge", "Bleu", "Gris"],
    relatedProducts: ["6", "7"],
  },
  {
    id: "6",
    name: "Ceinture de musculation en cuir",
    slug: "ceinture-musculation-cuir",
    description:
      "Ceinture de musculation en cuir véritable pour un soutien lombaire optimal pendant les exercices de force. Idéale pour les soulevés de terre et les squats.",
    features: [
      "Cuir véritable de 4mm d'épaisseur",
      "Boucle à double ardillon",
      "Largeur: 10cm à l'arrière, 6cm à l'avant",
      "Soutien lombaire renforcé",
      "Conçue pour durer des années",
    ],
    price: 49.99,
    oldPrice: 59.99,
    discount: 16,
    image: "/placeholder.svg?height=300&width=300&text=Ceinture+Musculation",
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Ceinture+Vue+1",
      "/placeholder.svg?height=600&width=600&text=Ceinture+Vue+2",
      "/placeholder.svg?height=600&width=600&text=Ceinture+Vue+3",
    ],
    category: "accessoires",
    categoryId: "4",
    subCategoryId: "4-2",
    rating: 4.8,
    reviewCount: 112,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 75,
    sku: "CM-CU-006",
    date: "2023-07-10",
    tags: [
      "ceinture",
      "musculation",
      "protection",
      "soutien lombaire",
      "current",
    ],
    dimensions: {
      width: 10,
      height: 0.4,
      depth: 110,
      weight: 0.5,
    },
    colors: ["Noir", "Marron"],
    materials: ["Cuir véritable", "Métal"],
    warranty: "2 ans",
    shipping: {
      dimensions: "30 x 15 x 5 cm",
      weight: 0.6,
      method: "Standard",
      estimatedDelivery: "2-3 jours ouvrés",
    },
    relatedProducts: ["5", "7"],
  },
  {
    id: "7",
    name: "Sac de sport professionnel",
    slug: "sac-sport-professionnel",
    description:
      "Sac de sport spacieux et résistant avec compartiments spécialisés pour vos chaussures, vêtements et accessoires. Parfait pour la salle de sport ou les déplacements.",
    features: [
      "Capacité: 45L",
      "Compartiment séparé pour chaussures",
      "Poche imperméable pour vêtements humides",
      "Bandoulière rembourrée ajustable",
      "Matériaux résistants à l'eau",
    ],
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    image: "/placeholder.svg?height=300&width=300&text=Sac+Sport",
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Sac+Vue+1",
      "/placeholder.svg?height=600&width=600&text=Sac+Vue+2",
      "/placeholder.svg?height=600&width=600&text=Sac+Vue+3",
    ],
    category: "accessoires",
    categoryId: "4",
    subCategoryId: "4-3",
    rating: 4.7,
    reviewCount: 95,
    isNew: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 60,
    sku: "SS-PR-007",
    date: "2023-11-05",
    tags: ["sac", "sport", "rangement", "voyage", "summer", "current"],
    dimensions: {
      width: 60,
      height: 30,
      depth: 30,
      weight: 1.2,
    },
    colors: ["Noir", "Bleu marine", "Gris"],
    materials: ["Polyester 1200D", "Nylon", "Mesh respirant"],
    warranty: "2 ans",
    shipping: {
      dimensions: "65 x 35 x 35 cm",
      weight: 1.5,
      method: "Standard",
      estimatedDelivery: "2-4 jours ouvrés",
    },
    relatedProducts: ["5", "6"],
  },
  {
    id: "8",
    name: "Pack été fitness complet",
    slug: "pack-ete-fitness",
    description:
      "Ensemble complet pour vos activités fitness d'été comprenant un tapis de yoga, une gourde isotherme et une serviette microfibre. Idéal pour les entraînements en extérieur.",
    features: [
      "Tapis de yoga antidérapant 6mm",
      "Gourde isotherme 750ml",
      "Serviette microfibre ultra-absorbante",
      "Sac de transport inclus",
      "Matériaux résistants aux UV",
    ],
    price: 79.99,
    oldPrice: 119.99,
    discount: 33,
    image: "/placeholder.svg?height=300&width=300&text=Pack+Été+Fitness",
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Pack+Vue+1",
      "/placeholder.svg?height=600&width=600&text=Pack+Vue+2",
      "/placeholder.svg?height=600&width=600&text=Pack+Vue+3",
    ],
    category: "équipements",
    categoryId: "2",
    rating: 4.9,
    reviewCount: 42,
    isNew: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 30,
    sku: "PEF-001",
    date: "2024-05-15",
    tags: ["été", "fitness", "pack", "bundle", "summer", "current"],
    dimensions: {
      width: 65,
      height: 10,
      depth: 20,
      weight: 1.8,
    },
    colors: ["Bleu", "Turquoise"],
    materials: ["TPE écologique", "Acier inoxydable", "Microfibre"],
    warranty: "1 an",
    shipping: {
      dimensions: "70 x 15 x 25 cm",
      weight: 2.0,
      method: "Standard",
      estimatedDelivery: "2-3 jours ouvrés",
    },
    relatedProducts: ["2", "4", "7"],
  },
  {
    id: "9",
    name: "Ensemble d'haltères et kettlebells",
    slug: "ensemble-halteres-kettlebells",
    description:
      "Pack économique comprenant une paire d'haltères ajustables (2-10kg) et deux kettlebells (8kg et 12kg). Parfait pour diversifier vos entraînements à domicile.",
    features: [
      "Haltères ajustables 2-10kg",
      "Kettlebells 8kg et 12kg",
      "Poignées ergonomiques",
      "Revêtement antidérapant",
      "Support de rangement inclus",
    ],
    price: 149.99,
    oldPrice: 199.99,
    discount: 25,
    image: "/placeholder.svg?height=300&width=300&text=Ensemble+Haltères",
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Ensemble+Vue+1",
      "/placeholder.svg?height=600&width=600&text=Ensemble+Vue+2",
      "/placeholder.svg?height=600&width=600&text=Ensemble+Vue+3",
    ],
    category: "home gym",
    categoryId: "1",
    rating: 4.6,
    reviewCount: 38,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 25,
    sku: "EHK-001",
    date: "2023-12-10",
    tags: [
      "musculation",
      "haltères",
      "kettlebells",
      "pack",
      "bundle",
      "clearance",
    ],
    dimensions: {
      width: 50,
      height: 30,
      depth: 40,
      weight: 32,
    },
    colors: ["Noir/Rouge"],
    materials: ["Fonte", "Caoutchouc", "Acier"],
    warranty: "2 ans",
    shipping: {
      dimensions: "55 x 35 x 45 cm",
      weight: 34,
      method: "Standard",
      estimatedDelivery: "3-5 jours ouvrés",
    },
    relatedProducts: ["1", "3", "6"],
  },
  {
    id: "10",
    name: "Lot de 3 bandes élastiques de résistance",
    slug: "lot-bandes-elastiques",
    description:
      "Ensemble de 3 bandes élastiques de résistance différente (légère, moyenne, forte) pour la musculation, la rééducation ou le stretching. Polyvalentes et faciles à transporter.",
    features: [
      "3 niveaux de résistance",
      "Longueur: 150cm",
      "Matériau latex haute qualité",
      "Poignées confortables",
      "Pochette de rangement incluse",
    ],
    price: 19.99,
    oldPrice: 29.99,
    discount: 33,
    image: "/placeholder.svg?height=300&width=300&text=Bandes+Élastiques",
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Bandes+Vue+1",
      "/placeholder.svg?height=600&width=600&text=Bandes+Vue+2",
      "/placeholder.svg?height=600&width=600&text=Bandes+Vue+3",
    ],
    category: "accessoires",
    categoryId: "4",
    subCategoryId: "4-4",
    rating: 4.8,
    reviewCount: 120,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 200,
    sku: "LBE-001",
    date: "2023-10-20",
    tags: [
      "élastiques",
      "résistance",
      "fitness",
      "pack",
      "bundle",
      "summer",
      "clearance",
    ],
    dimensions: {
      width: 15,
      height: 5,
      depth: 15,
      weight: 0.5,
    },
    colors: ["Multicolore"],
    materials: ["Latex naturel", "Nylon"],
    warranty: "6 mois",
    shipping: {
      dimensions: "20 x 10 x 5 cm",
      weight: 0.6,
      method: "Standard",
      estimatedDelivery: "1-3 jours ouvrés",
    },
    relatedProducts: ["2", "5", "8"],
  },
  {
    id: "11",
    name: "Ensemble d'accessoires de fitness déstockage",
    slug: "ensemble-accessoires-destockage",
    description:
      "Lot économique comprenant une corde à sauter, un ab wheel, deux push-up bars et un grip de musculation. Idéal pour compléter votre équipement à petit prix.",
    features: [
      "Corde à sauter réglable avec compteur",
      "Ab wheel avec tapis pour genoux",
      "Push-up bars ergonomiques",
      "Grip de musculation réglable",
      "Guide d'exercices inclus",
    ],
    price: 39.99,
    oldPrice: 69.99,
    discount: 43,
    image: "/placeholder.svg?height=300&width=300&text=Ensemble+Accessoires",
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Ensemble+Vue+1",
      "/placeholder.svg?height=600&width=600&text=Ensemble+Vue+2",
      "/placeholder.svg?height=600&width=600&text=Ensemble+Vue+3",
    ],
    category: "accessoires",
    categoryId: "4",
    subCategoryId: "4-4",
    rating: 4.3,
    reviewCount: 65,
    isNew: false,
    isFeatured: false,
    inStock: true,
    stockQuantity: 15,
    sku: "EAD-001",
    date: "2023-08-05",
    tags: ["accessoires", "fitness", "pack", "bundle", "clearance"],
    dimensions: {
      width: 40,
      height: 20,
      depth: 30,
      weight: 3.5,
    },
    colors: ["Noir"],
    materials: ["Acier", "Mousse", "PVC"],
    warranty: "1 an",
    shipping: {
      dimensions: "45 x 25 x 35 cm",
      weight: 4.0,
      method: "Standard",
      estimatedDelivery: "2-4 jours ouvrés",
    },
    relatedProducts: ["5", "6", "10"],
  },
  {
    id: "12",
    name: "Maillot de bain sport été 2024",
    slug: "maillot-bain-sport-ete",
    description:
      "Maillot de bain spécial sport aquatique, résistant au chlore et aux UV. Coupe ergonomique pour une liberté de mouvement maximale pendant vos activités nautiques.",
    features: [
      "Tissu résistant au chlore et aux UV",
      "Séchage rapide",
      "Doublure intégrée",
      "Cordon de serrage ajustable",
      "Disponible en plusieurs tailles",
    ],
    price: 34.99,
    oldPrice: 49.99,
    discount: 30,
    image: "/placeholder.svg?height=300&width=300&text=Maillot+Bain+Sport",
    gallery: [
      "/placeholder.svg?height=600&width=600&text=Maillot+Vue+1",
      "/placeholder.svg?height=600&width=600&text=Maillot+Vue+2",
      "/placeholder.svg?height=600&width=600&text=Maillot+Vue+3",
    ],
    category: "Textiles",
    categoryId: "4",
    rating: 4.7,
    reviewCount: 28,
    isNew: true,
    isFeatured: true,
    inStock: true,
    stockQuantity: 50,
    sku: "MBS-001",
    date: "2024-04-20",
    tags: ["maillot", "bain", "sport", "été", "summer", "current"],
    dimensions: {
      width: 30,
      height: 5,
      depth: 20,
      weight: 0.2,
    },
    colors: ["Bleu marine", "Noir", "Rouge"],
    materials: ["Polyamide", "Élasthanne"],
    warranty: "30 jours",
    shipping: {
      dimensions: "25 x 15 x 5 cm",
      weight: 0.3,
      method: "Standard",
      estimatedDelivery: "1-3 jours ouvrés",
    },
    relatedProducts: ["8", "10"],
  },
];

// Marques partenaires
export const brands = [
  {
    id: "1",
    name: "MATRIX",
    logo: img5,
    description: "Équipements de fitness haut de gamme",
  },
  {
    id: "2",
    name: "LIFE FITNESS",
    logo: img6,
    description: "Produits écologiques pour le fitness",
  },
  {
    id: "3",
    name: "LuxLight",
    logo: "/placeholder.svg?height=80&width=160&text=LuxLight",
    description: "Solutions d'éclairage innovantes",
  },
  {
    id: "4",
    name: "ComfortZone",
    logo: "/placeholder.svg?height=80&width=160&text=ComfortZone",
    description: "Textiles et accessoires de confort",
  },
  {
    id: "5",
    name: "OrganizeIt",
    logo: "/placeholder.svg?height=80&width=160&text=OrganizeIt",
    description: "Solutions de rangement intelligentes",
  },
];

// Filtres disponibles
export const filters = {
  price: {
    min: 0,
    max: 1000,
    step: 10,
  },
  ratings: [
    { value: 4, label: "4 étoiles et plus" },
    { value: 3, label: "3 étoiles et plus" },
    { value: 2, label: "2 étoiles et plus" },
    { value: 1, label: "1 étoile et plus" },
  ],
  sortOptions: [
    { value: "featured", label: "Recommandés" },
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
    { value: "newest", label: "Nouveautés" },
    { value: "rating", label: "Meilleures notes" },
    { value: "discount", label: "Promotions" },
  ],
};

// Fonctions utilitaires pour les produits
export const productUtils = {
  // Obtenir les produits en promotion
  getDiscountedProducts: () =>
    products.filter((product) => product.discount > 0),

  // Obtenir les nouveaux produits
  getNewProducts: () => products.filter((product) => product.isNew),

  // Obtenir les produits mis en avant
  getFeaturedProducts: () => products.filter((product) => product.isFeatured),

  // Obtenir les produits par catégorie
  getProductsByCategory: (categoryId) =>
    products.filter((product) => product.categoryId === categoryId),

  // Obtenir les produits par sous-catégorie
  getProductsBySubCategory: (subCategoryId) =>
    products.filter((product) => product.subCategoryId === subCategoryId),

  // Obtenir les produits similaires
  getRelatedProducts: (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return [];
    return products
      .filter(
        (p) =>
          product.relatedProducts?.includes(p.id) ||
          (p.categoryId === product.categoryId && p.id !== productId) ||
          (product.subCategoryId &&
            p.subCategoryId === product.subCategoryId &&
            p.id !== productId)
      )
      .slice(0, 4);
  },

  // Rechercher des produits
  searchProducts: (query) => {
    const searchTerm = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  },

  // Obtenir une sous-catégorie par ID
  getSubCategoryById: (subCategoryId) => {
    for (const category of categories) {
      if (category.subCategories) {
        const subCategory = category.subCategories.find(
          (sub) => sub.id === subCategoryId
        );
        if (subCategory) return subCategory;
      }
    }
    return null;
  },

  // Obtenir toutes les sous-catégories d'une catégorie
  getSubCategoriesByCategoryId: (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.subCategories || [];
  },
};
