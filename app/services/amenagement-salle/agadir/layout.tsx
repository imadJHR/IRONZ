import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../../lib/og-image";

const PAGE_URL = "https://www.ironz.ma/services/amenagement-salle/agadir";

export const metadata: Metadata = {
  title: "Aménagement de salle de sport à Agadir | IRONZ",
  description:
    "Projet de salle de sport à Agadir, au Maroc : étude de l'espace, choix des équipements et revêtement. Présentez votre projet au showroom IRONZ du Sahara Mall.",
  alternates: { canonical: "/services/amenagement-salle/agadir" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aménagement de salle de sport à Agadir | IRONZ",
    description:
      "Projet de salle de sport à Agadir, au Maroc : étude de l'espace, choix des équipements et revêtement. Présentez votre projet au showroom IRONZ du Sahara Mall.",
    url: PAGE_URL,
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aménagement de salle de sport à Agadir | IRONZ",
    description:
      "Projet de salle de sport à Agadir, au Maroc : étude de l'espace, choix des équipements et revêtement. Présentez votre projet au showroom IRONZ du Sahara Mall.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function AgadirLayout({ children }: { children: React.ReactNode }) {
  return children;
}
