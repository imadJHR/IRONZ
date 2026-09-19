import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aménagement de salle de sport professionnelle au Maroc | IRONZ",
  description:
    "Projet de salle de sport professionnelle au Maroc : organisation de l'espace, sélection des équipements, installation et solutions de revêtement selon votre besoin. Demandez un devis personnalisé.",
  alternates: { canonical: "/services/amenagement-salle/salle-professionnelle" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aménagement de salle de sport professionnelle au Maroc | IRONZ",
    description:
      "Projet de salle de sport professionnelle au Maroc : organisation de l'espace, sélection des équipements, installation et solutions de revêtement selon votre besoin. Demandez un devis personnalisé.",
    url: "https://www.ironz.ma/services/amenagement-salle/salle-professionnelle",
    type: "website",
  },
};

export default function ProfessionalGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
