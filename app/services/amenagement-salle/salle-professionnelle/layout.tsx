import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salle de sport professionnelle au Maroc | IRONZ",
  description:
    "Équipement et aménagement de salles professionnelles au Maroc : salles de sport, hôtels, entreprises et centres sportifs. Devis personnalisé.",
  alternates: { canonical: "/services/amenagement-salle/salle-professionnelle" },
};

export default function ProfessionalGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
