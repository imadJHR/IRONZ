import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services IRONZ au Maroc : aménagement, revêtement et personnalisation | IRONZ",
  description:
    "Services IRONZ au Maroc : aménagement de salle, home gym, salle pro, revêtement sportif, espace enfance, personnalisation, terrains.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
