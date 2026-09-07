import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos d’IRONZ",
  description: "Découvrez IRONZ, spécialiste marocain des équipements de fitness, de musculation et de l’aménagement d’espaces sportifs.",
  alternates: { canonical: "/a-propos" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
