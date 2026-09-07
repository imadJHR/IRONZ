import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aménagement de salle de sport au Maroc",
  description: "Conception, équipement et installation de salles de sport sur mesure au Maroc pour particuliers et professionnels.",
  alternates: { canonical: "/services/amenagement-salle" },
};

export default function GymDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
