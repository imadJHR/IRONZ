import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../../lib/og-image";

export const metadata: Metadata = {
  title: "Aménagement de salle de sport professionnelle au Maroc | IRONZ",
  description:
    "Salle de sport professionnelle au Maroc : organisation de l'espace, équipements, installation et revêtement. Devis personnalisé IRONZ.",
  alternates: { canonical: "/services/amenagement-salle/salle-professionnelle" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aménagement de salle de sport professionnelle au Maroc | IRONZ",
    description:
      "Salle de sport professionnelle au Maroc : organisation de l'espace, équipements, installation et revêtement. Devis personnalisé IRONZ.",
    url: "https://www.ironz.ma/services/amenagement-salle/salle-professionnelle",
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aménagement de salle de sport professionnelle au Maroc | IRONZ",
    description:
      "Salle de sport professionnelle au Maroc : organisation de l'espace, équipements, installation et revêtement. Devis personnalisé IRONZ.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function ProfessionalGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
