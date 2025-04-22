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
import a18 from "../public/a18.jpeg";
import a19 from "../public/a19.jpeg";
import a20 from "../public/a20.jpeg";
import a21 from "../public/a21.jpeg";
import a22 from "../public/a22.jpeg";
import a23 from "../public/a23.jpeg";
import a24 from "../public/a24.jpeg";
import a25 from "../public/a25.jpeg";
import a26 from "../public/a26.jpeg";
import a27 from "../public/a27.jpeg";
import a28 from "../public/a28.jpeg";
import a29 from "../public/a29.jpeg";
import a30 from "../public/a30.jpeg";
import a31 from "../public/a31.jpeg";
import a32 from "../public/a32.jpeg";
import a33 from "../public/a33.jpeg";
import a34 from "../public/a34.jpeg";
import a35 from "../public/a35.jpeg";
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
    name: "Ensemble veste et pantalon Under Armour",
    slug: "ensemble-veste-pantalon",
    description:
      "Ensemble veste et pantalon Under ArmourDécouvrez cet ensemble élégant signé Under Armour, conçu pour répondre aux besoins des sportifs et amateurs de confort au quotidien. Disponible en trois couleurs",
    features: [
      "Coupe slim : Offrant une silhouette moderne et ajustée, parfaite pour l'entraînement ou les sorties décontractées.",
      "Logo discret : Positionné sur la jambe pour une finition raffinée.",
      "Confort optimal : Tissu doux et respirant qui évacue l'humidité pour rester au sec.",
      "Résistance accrue : Matériaux conçus pour durer, même après des séances d'entraînement intensives.",
      "Polyvalence : Convient aussi bien pour le sport que pour un look décontracté.",
    ],
    price: 349.99,
    oldPrice: "",
    discount: "",
    taille: ["XL", "M", "S"],
    image: a18,
    gallery: [a18, a19, a20],
    category: "accessoires",
    categoryId: "4",
    subCategoryId: "4-2",
    rating: 4.8,
    reviewCount: 112,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 75,
    tags: [
      "ceinture",
      "musculation",
      "protection",
      "soutien lombaire",
      "current",
    ],
    colors: ["Bleu", "Gris"],

    relatedProducts: ["5", "7"],
  },
  {
    id: "7",
    name: "SEATED LEG PRESS PANATTA",
    slug: "press-panatta",
    description:
      "La presse pour jambes assises est un exercice sur appareil d'exercice qui cible principalement les quadriceps et, dans une moindre mesure, ",
    features: [
      "cible également les mollets, les fessiers, l'aine, les ischio-jambiers, les fléchisseurs de la hanche, le bas du dos et l'extérieur des cuisses",
      "Le seul équipement de presse à jambes assise dont vous avez réellement besoin est le suivant : une presse à jambes. Il existe cependant de nombreuses variantes de presse pour jambes assises que vous pouvez essayer et qui peuvent nécessiter différents types d'équipement de presse pour jambes assises ou même ne nécessiter aucun équipement du tout.",
    ],
    price: 210,
    oldPrice: "",
    discount: "",
    image: a21,
    gallery: [a21, a22],
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
    id: "8",
    name: "Tatami Puzzle Double Faces 2 cm",
    slug: "tatami-puzzle-double",
    description:
      "Ensemble veste et pantalon Under ArmourDécouvrez cet ensemble élégant signé Under Armour, conçu pour répondre aux besoins des sportifs et amateurs de confort au quotidien. Disponible en trois couleurs",
    features: [
      "Coupe slim : Offrant une silhouette moderne et ajustée, parfaite pour l'entraînement ou les sorties décontractées.",
      "Logo discret : Positionné sur la jambe pour une finition raffinée.",
      "Confort optimal : Tissu doux et respirant qui évacue l'humidité pour rester au sec.",
      "Résistance accrue : Matériaux conçus pour durer, même après des séances d'entraînement intensives.",
      "Polyvalence : Convient aussi bien pour le sport que pour un look décontracté.",
    ],
    price: 299.99,
    oldPrice: "",
    discount: "",
    taille: ["XL", "M", "S"],
    image: a23,
    gallery: a23,
    category: "accessoires",
    categoryId: "4",
    subCategoryId: "4-2",
    rating: 4.8,
    reviewCount: 112,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 75,
    tags: [
      "ceinture",
      "musculation",
      "protection",
      "soutien lombaire",
      "current",
    ],
    colors: ["Bleu", "Gris"],

    relatedProducts: ["5", "7"],
  },
  {
    id: "9",
    name: "PISTOLET DE MASSAGE FASCIAL GUN",
    slug: "PISTOLET-DE-MASSAGE-FASCIAL-GUN",
    description:
      "pistolet de massage:Libérez-vous des tensions musculaires avec notre Mini Pistolet de Relaxation Musculaire, conçu pour apporter un soulagement instantané et favoriser la récupération musculaire. Compact, portable et puissant, cet appareil de thérapie par percussion offre une solution pratique pour détendre vos muscles, que ce soit après une séance d'entraînement intense, une journée stressante au travail ou simplement pour une relaxation quotidienne.",
    features: [
      "Thérapie par Percussion Avancée : Grâce à sa technologie de percussion avancée, notre mini pistolet de relaxation musculaire offre des vibrations puissantes et pulsatives pour cibler efficacement les nœuds musculaires et réduire la tension.",
      "Compact et portable : Avec son design compact, ce mini pistolet peut être emporté partout. Glissez-le dans votre sac de sport, votre sac à main ou votre mallette, et profitez d'une relaxation musculaire instantanée où que vous soyez.",
      "Différents niveaux d'intensité : choisissez parmi plusieurs niveaux d'intensité pour personnaliser votre expérience de relaxation. Que vous préfériez une sensation douce ou une thérapie plus intense, ce pistolet s'adapte à vos besoins.",
      "Batterie rechargeable : La batterie rechargeable intégrée assure une utilisation sans fil pratique. Plus besoin de vous des câbles encombrants; profitez de séances de relaxation musculaire sans interruption.",
      "Silencieux et Ergonomique : Conçu pour être discret, notre mini pistolet fonctionne avec un faible niveau sonore, permettant une utilisation discrète à tout moment de la journée. De plus, sa poignée ergonomique offre une prise en main confortable pour une utilisation prolongée.",
    ],
    price: 299.99,
    oldPrice: "",
    discount: "",
    image: a24,
    gallery: a24,
    category: "accessoires",
    categoryId: "4",
    subCategoryId: "4-2",
    rating: 4.8,
    reviewCount: 112,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockQuantity: 75,
    tags: [
      "ceinture",
      "musculation",
      "protection",
      "soutien lombaire",
      "current",
    ],
    colors: ["Bleu", "Gris"],

    relatedProducts: ["5", "7"],
  },
  {
    id: "10",
    name: "Step Aérobic Top Gym",
    slug: "step-aérobic",
    description:
      "Cette plateforme de step Top Gym est idéale pour vos entraînements de fitness et de cardio. Compacte, légère et robuste, elle s'adapte parfaitement à tous les niveaux de condition physique.",
    features: [
      "Surface antidérapante : Sécurité optimale pendant vos séances.",
      "Dimensions : Compacte, parfaite pour un usage domestique ou en salle.",
      "Polyvalence : Idéale pour les exercices d'endurance, de renforcement musculaire et de coordination.",
      "Design : Couleurs modernes gris et jaune fluo pour une touche dynamique à vos séances.",
      "Cet outil pratique aide à intensifier vos entraînements tout en favorisant la perte de calories et l'amélioration de votre condition physique.",
    ],
    price: 219,
    oldPrice: "",
    discount: "",
    image: a25,
    gallery: [a25, a26, a27],
    category: "équipement",
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
    id: "11",
    name: "Reebok Easytone Step",
    slug: "reebok-step",
    description:
      "Le Reebok Easytone Step est un appareil innovant conçu pour améliorer votre entraînement de balance, coordination, et force. Fusionnant le concept classique du step-board avec la technologie de la gamme EasyTone, il offre une variété d'exercices tout en optimisant vos performances.",
    features: [
      "Polyvalence : Utilisable des deux côtés. Le côté avec coussin d'air intensifie les exercices traditionnels, tandis que l'autre permet de travailler simultanément sur deux coussins pour des exercices avancés de coordination et stabilité.",
      "Surface antidérapante : Sécurise vos entraînements, même lors d'exercices dynamiques.",
      "Personnalisation : La pression des coussins d'air est ajustable pour moduler l'intensité. Plus l'air est réduit, plus la surface est stable, rendant l'exercice accessible à tous.",
      "Accessoires inclus : Livré avec un DVD d'entraînement contenant des exercices pratiques et une pompe pour ajuster les coussins.",
      "Capacité maximale : Supporte jusqu'à 110 kg.",
      "Avec le Reebok Easytone Step, révolutionnez vos séances de fitness et bénéficiez d’un entraînement complet combinant cardio et renforcement musculaire. Idéal pour les amateurs comme pour les sportifs confirmés.",
    ],
    price: 489,
    oldPrice: "",
    discount: "",
    image: a28,
    gallery: [a28, a29, a30],
    category: "équipement",
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
    id: "12",
    name: "Tapis de Sol Puzzle Bewilder Interlocking Floor Mat",
    slug: "tapis-de-sol-puzzle-bewilder",
    description:
      "Le Bewilder Interlocking Floor Mat est une solution polyvalente et pratique pour vos besoins en revêtement de sol. Idéal pour les environnements de fitness, la maison ou même à l'extérieur, ce tapis puzzle garantit confort et sécurité tout en étant facile à installer.",
    features: [
      "Dimensions: 60 x 60 cm par pièce, permettant une couverture adaptable selon vos espaces.",
      "Conçu pour offrir un amorti optimal, parfait pour les activités sportives et pour protéger vos surfaces des impacts.",
      "Matériau durable: Résiste à l'usure tout en restant léger et simple à assembler grâce à son design emboîtable.",
      "Multifonction: Convient pour les salles de sport, les aires de jeux, les zones d'entraînement ou tout espace nécessitant un sol antidérapant.",
    ],
    price: 389,
    oldPrice: "",
    discount: "",
    image: a31,
    gallery: [a31, a32, a33,a34,a35],
    category: "équipement",
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
