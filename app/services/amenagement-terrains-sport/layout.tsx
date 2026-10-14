import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../lib/og-image";

export const metadata: Metadata = {
  title: "Aménagement de terrains de sport au Maroc | IRONZ",
  description:
    "Terrains de sport au Maroc : surface sportive, clôture périphérique et équipement adapté au projet. Devis personnalisé IRONZ.",
  alternates: { canonical: "/services/amenagement-terrains-sport" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aménagement de terrains de sport au Maroc | IRONZ",
    description:
      "Terrains de sport au Maroc : surface sportive, clôture périphérique et équipement adapté au projet. Devis personnalisé IRONZ.",
    url: "https://www.ironz.ma/services/amenagement-terrains-sport",
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aménagement de terrains de sport au Maroc | IRONZ",
    description:
      "Terrains de sport au Maroc : surface sportive, clôture périphérique et équipement adapté au projet. Devis personnalisé IRONZ.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function TerrainSportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
