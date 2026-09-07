import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aménagement et équipement de salles de sport",
  description: "IRONZ conçoit et équipe les home gyms, salles professionnelles et espaces sportifs au Maroc.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
