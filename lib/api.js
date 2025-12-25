export const API_URL = "http://localhost:5000/api/products";

export async function fetchProducts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function fetchProduct(slug) {
  const res = await fetch(`${API_URL}/${slug}`);
  return res.json();
}

export async function deleteProduct(slug, code) {
  return fetch(`${API_URL}/${slug}`, {
    method: "DELETE",
    headers: {
      "access-code": code
    }
  });
}
