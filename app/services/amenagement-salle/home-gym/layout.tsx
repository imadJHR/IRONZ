import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../../lib/og-image";

const PAGE_URL = "https://www.ironz.ma/services/amenagement-salle/home-gym";

export const metadata: Metadata = {
  title: "Aménagement Home Gym sur mesure au Maroc | IRONZ",
  description:
    "Aménagement Home Gym au Maroc : précisez votre pièce, vos activités, le matériel existant et les contraintes du logement pour préparer votre devis IRONZ.",
  alternates: { canonical: "/services/amenagement-salle/home-gym" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aménagement Home Gym sur mesure au Maroc | IRONZ",
    description:
      "Aménagement Home Gym au Maroc : précisez votre pièce, vos activités, le matériel existant et les contraintes du logement pour préparer votre devis IRONZ.",
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
      "Aménagement Home Gym au Maroc : précisez votre pièce, vos activités, le matériel existant et les contraintes du logement pour préparer votre devis IRONZ.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function HomeGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
