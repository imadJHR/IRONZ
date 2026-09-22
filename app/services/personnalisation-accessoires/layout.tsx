import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../lib/og-image";

const PAGE_URL = "https://www.ironz.ma/services/personnalisation-accessoires";
const TITLE = "Personnalisation d'accessoires sportifs au Maroc | IRONZ";
const DESCRIPTION =
  "Personnalisation d'accessoires sportifs au Maroc : couleurs, logo, finitions et configuration visuelle selon le produit et la faisabilité du projet. Demandez un devis IRONZ.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services/personnalisation-accessoires" },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function CustomAccessoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
