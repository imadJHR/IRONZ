export const API_URL = "http://localhost:5000/api/products";

// 1. Définition de l'interface pour le type Produit
export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  slug: string;
  category?: string;
  description?: string;
  // Ajoutez ici d'autres champs si votre API en renvoie (ex: stock, colors, etc.)
}

/**
 * Récupère tous les produits
 */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);
  
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des produits");
  }
  
  return res.json();
}

/**
 * Récupère un produit spécifique par son slug
 */
export async function fetchProduct(slug: string): Promise<Product> {
  const res = await fetch(`${API_URL}/${slug}`);
  
  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération du produit : ${slug}`);
  }
  
  return res.json();
}

/**
 * Supprime un produit (nécessite un code d'accès)
 */
export async function deleteProduct(slug: string, code: string): Promise<Response> {
  const res = await fetch(`${API_URL}/${slug}`, {
    method: "DELETE",
    headers: {
      "access-code": code,
      "Content-Type": "application/json",
    },
  });

  return res;
}