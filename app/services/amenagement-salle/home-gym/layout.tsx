import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home gym sur mesure au Maroc",
  description: "Créez votre home gym au Maroc avec une étude sur mesure, des équipements adaptés et une installation professionnelle IRONZ.",
  alternates: { canonical: "/services/amenagement-salle/home-gym" },
};

export default function HomeGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
