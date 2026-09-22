import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../lib/og-image";

export const metadata: Metadata = {
  title: "Aménagement de salle de sport au Maroc | IRONZ",
  description:
    "Aménagement de salles de sport au Maroc : home gym, salles professionnelles, hôtels et centres sportifs. Cadrage du projet, équipements, revêtement et devis personnalisé.",
  alternates: { canonical: "/services/amenagement-salle" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aménagement de salle de sport au Maroc | IRONZ",
    description:
      "Aménagement de salles de sport au Maroc : home gym, salles professionnelles, hôtels et centres sportifs. Cadrage du projet, équipements, revêtement et devis personnalisé.",
    url: "https://www.ironz.ma/services/amenagement-salle",
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aménagement de salle de sport au Maroc | IRONZ",
    description:
      "Aménagement de salles de sport au Maroc : home gym, salles professionnelles, hôtels et centres sportifs. Cadrage du projet, équipements, revêtement et devis personnalisé.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function GymDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
