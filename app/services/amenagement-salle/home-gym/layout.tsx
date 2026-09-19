import type { Metadata } from "next";

const PAGE_URL = "https://www.ironz.ma/services/amenagement-salle/home-gym";

export const metadata: Metadata = {
  title: "Aménagement Home Gym sur mesure au Maroc | IRONZ",
  description:
    "Home Gym sur mesure au Maroc : étude de l'espace, conception, sélection d'équipements, installation et solutions de revêtement. Demandez votre devis.",
  alternates: { canonical: "/services/amenagement-salle/home-gym" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aménagement Home Gym sur mesure au Maroc | IRONZ",
    description:
      "Home Gym sur mesure au Maroc : étude de l'espace, conception, sélection d'équipements, installation et solutions de revêtement. Demandez votre devis.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function HomeGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
