import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact IRONZ à Agadir | IRONZ",
  description:
    "Contactez IRONZ à Agadir pour une question sur les équipements fitness, les produits ou un projet, par téléphone, WhatsApp ou email.",
  alternates: { canonical: "https://www.ironz.ma/contact" },
  robots: { index: true, follow: true },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
