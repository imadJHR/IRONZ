import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Équipement de salle de sport professionnelle au Maroc",
  description: "Équipez votre salle de sport professionnelle au Maroc avec l’étude, le matériel et l’installation IRONZ.",
  alternates: { canonical: "/services/amenagement-salle/salle-professionnelle" },
};

export default function ProfessionalGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
