import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services : Aménagement, Équipement & Personnalisation au Maroc | IRONZ",
  description:
    "IRONZ offre des services complets au Maroc : aménagement de salles de sport, home gym, rénovation, revêtements et personnalisation d'accessoires. Devis gratuit.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
