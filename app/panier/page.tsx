import { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Panier | IRONZ",
  description: "Gérez votre panier d'achat IRONZ PRO",
};

export default function CartPage() {
  return <CartPageClient />;
}