import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../lib/og-image";

export const metadata: Metadata = {
  title: "Demande de devis pour votre salle de sport",
  description: "Demandez un devis IRONZ pour l’équipement, la conception et l’installation de votre salle de sport ou home gym au Maroc.",
  alternates: { canonical: "/demande-devis" },
  openGraph: {
    title: "Demande de devis pour votre salle de sport | IRONZ",
    description: "Demandez un devis IRONZ pour l’équipement, la conception et l’installation de votre salle de sport ou home gym au Maroc.",
    url: "https://www.ironz.ma/demande-devis",
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Demande de devis pour votre salle de sport | IRONZ",
    description: "Demandez un devis IRONZ pour l’équipement, la conception et l’installation de votre salle de sport ou home gym au Maroc.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
