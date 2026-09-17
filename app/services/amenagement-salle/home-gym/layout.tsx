import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Gym sur mesure au Maroc | IRONZ",
  description:
    "Créez votre home gym au Maroc : étude sur mesure, conception 3D, équipements premium et installation professionnelle. Devis gratuit.",
  alternates: { canonical: "/services/amenagement-salle/home-gym" },
};

export default function HomeGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
