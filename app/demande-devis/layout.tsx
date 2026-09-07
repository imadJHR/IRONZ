import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande de devis pour votre salle de sport",
  description: "Demandez un devis IRONZ pour l’équipement, la conception et l’installation de votre salle de sport ou home gym au Maroc.",
  alternates: { canonical: "/demande-devis" },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
