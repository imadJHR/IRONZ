import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aménagement de salle de sport au Maroc | IRONZ",
  description:
    "Aménagement complet de salles de sport au Maroc : home gym, salles professionnelles, hôtels et centres sportifs. Étude gratuite, devis personnalisé.",
  alternates: { canonical: "/services/amenagement-salle" },
};

export default function GymDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
