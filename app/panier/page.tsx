import { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Panier",
  description: "Gérez votre panier d'achat IRONZ",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartPageClient />;
}
