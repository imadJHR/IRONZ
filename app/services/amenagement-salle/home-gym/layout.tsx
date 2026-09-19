import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../../lib/og-image";

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
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aménagement Home Gym sur mesure au Maroc | IRONZ",
    description:
      "Home Gym sur mesure au Maroc : étude de l'espace, conception, sélection d'équipements, installation et solutions de revêtement. Demandez votre devis.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function HomeGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
