import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services IRONZ au Maroc : aménagement, revêtement et personnalisation | IRONZ",
  description:
    "Découvrez les services IRONZ au Maroc : aménagement de salle, home gym, salle professionnelle, revêtement sportif, espace enfance, personnalisation et terrains de sport.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
