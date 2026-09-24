import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides fitness et musculation au Maroc | IRONZ",
  description:
    "Guides d’achat IRONZ pour choisir son matériel de fitness et de musculation au Maroc : comparer les équipements, comprendre les différences et éviter les erreurs avant d’acheter.",
  alternates: { canonical: "/guides" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Guides fitness et musculation au Maroc | IRONZ",
    description:
      "Guides d’achat IRONZ : comparez haltères, kettlebells, disques, machines cardio et matériel de boxe avant d’acheter au Maroc.",
    url: "https://www.ironz.ma/guides",
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guides fitness et musculation au Maroc | IRONZ",
    description:
      "Guides d’achat IRONZ : comparez haltères, kettlebells, disques, machines cardio et matériel de boxe avant d’acheter au Maroc.",
    creator: "@ironz_official",
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-white dark:bg-gray-950">{children}</main>;
}
