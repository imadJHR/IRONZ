import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revêtement de sol sportif au Maroc",
  description: "Solutions IRONZ de sols et murs sportifs: revêtements amortissants, durables et installés sur mesure au Maroc.",
  alternates: { canonical: "/services/revetement-sol-mur" },
};

export default function SportsFlooringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
