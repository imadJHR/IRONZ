import { StaticImageData } from "next/image";

// Static Assets
import a5 from "../public/a5.jpg";
import img2 from "../public/equipement.jpg";
import img3 from "../public/complement.jpg";
import img4 from "../public/accessoire.jpg";
import img5 from "../public/matrix.png";
import img6 from "../public/lifefitness.png";
import img66 from "../public/panatta.png";
import topgym from "../public/topgym.png";
import teslaa from "../public/teslaa.png";
import sup from "../public/14.png";
// Added missing imports based on your brands array
import adidas from "../public/logo.png"; // Placeholder
import red from "../public/logo.png";    // Placeholder

// --- TYPES ---

export interface SubCategory {
  id: string;
  name: string;
  href: string;
}

export interface Category {
  id: string;
  image: StaticImageData | string;
  name: string;
  href: string;
  icon: string;
  description: string;
  count?: number;
  subCategories?: SubCategory[];
}

export interface Brand {
  id: string;
  name: string;
  logo: StaticImageData | string;
  description: string;
}

// Assuming a product structure based on your utility functions
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  isNew: boolean;
  isFeatured: boolean;
  categoryId: string;
  subCategoryId?: string;
  relatedProducts?: string[];
  tags: string[];
}

// --- DATA ---

export const categories: Category[] = [
  {
    id: "2",
    image: img2,
    name: "Equipements",
    href: "/categories/equipements",
    icon: "Settings",
    description: "Matériel professionnel pour le sport et la remise en forme",
  },
  {
    id: "3",
    image: img3,
    name: "Supplément",
    href: "/categories/supplement",
    icon: "Pill",
    description: "Compléments alimentaires pour optimiser la nutrition et la performance",
  },
  {
    id: "4",
    image: img4,
    name: "Accessoires",
    href: "/categories/accessoires",
    icon: "Package",
    description: "Accessoires indispensables pour le sport et le bien-être",
  },
];

export const colorMap: Record<string, string> = {
  Noir: "#000000",
  Blanc: "#FFFFFF",
  Gris: "#808080",
  Rouge: "#FF0000",
  Bleu: "#0000FF",
  Vert: "#008000",
  Jaune: "#FFFF00",
  Orange: "#FFA500",
  Violet: "#800080",
  Rose: "#FFC0CB",
  Chrome: "#C0C0C0",
  Beige: "#D2B48C",
  Rosefoncé: "#DB7093",
  "Multi 2": "linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1, #FFBE0B)",
};

export const brands: Brand[] = [
  { id: "1", name: "MATRIX", logo: img5, description: "" },
  { id: "2", name: "LIFE FITNESS", logo: img6, description: "" },
  { id: "3", name: "Panatta", logo: img66, description: "" },
  { id: "4", name: "Topgym", logo: topgym, description: "" },
  { id: "5", name: "Tesla Nutrition", logo: teslaa, description: "" },
  { id: "6", name: "Superior14", logo: sup, description: "" },
  { id: "7", name: "Adidas", logo: adidas, description: "" },
  { id: "8", name: "Red Rex", logo: red, description: "" },
];

export const filters = {
  price: {
    min: 0,
    max: 30000,
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

// --- UTILS ---

// Note: In a real app, 'products' would likely be imported from a data file 
// or fetched. Here I am assuming it is available or passed in.
export const productUtils = {
  getDiscountedProducts: (products: Product[]): Product[] =>
    products.filter((product) => product.discount > 0),

  getNewProducts: (products: Product[]): Product[] => 
    products.filter((product) => product.isNew),

  getFeaturedProducts: (products: Product[]): Product[] => 
    products.filter((product) => product.isFeatured),

  getProductsByCategory: (products: Product[], categoryId: string): Product[] =>
    products.filter((product) => product.categoryId === categoryId),

  getProductsBySubCategory: (products: Product[], subCategoryId: string): Product[] =>
    products.filter((product) => product.subCategoryId === subCategoryId),

  getRelatedProducts: (products: Product[], productId: string): Product[] => {
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

  searchProducts: (products: Product[], query: string): Product[] => {
    const searchTerm = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  },

  getSubCategoryById: (subCategoryId: string): SubCategory | null => {
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

  getSubCategoriesByCategoryId: (categoryId: string): SubCategory[] => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.subCategories || [];
  },
};