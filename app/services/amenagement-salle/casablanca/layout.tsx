import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../../lib/og-image";

const PAGE_URL = "https://www.ironz.ma/services/amenagement-salle/casablanca";

export const metadata: Metadata = {
  title: "Aménagement salle de sport Casablanca | IRONZ",
  description:
    "Salle de sport à Casablanca : cadrage, organisation des zones, choix d'équipements et revêtement. Devis adapté par IRONZ.",
  alternates: { canonical: "/services/amenagement-salle/casablanca" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aménagement salle de sport Casablanca | IRONZ",
    description:
      "Salle de sport à Casablanca : cadrage, organisation des zones, choix d'équipements et revêtement. Devis adapté par IRONZ.",
    url: PAGE_URL,
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aménagement salle de sport Casablanca | IRONZ",
    description:
      "Salle de sport à Casablanca : cadrage, organisation des zones, choix d'équipements et revêtement. Devis adapté par IRONZ.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function CasablancaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
