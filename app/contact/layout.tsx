import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact et showroom à Agadir",
  description: "Contactez IRONZ pour vos équipements sportifs, commandes et projets de salle au Maroc. Showroom au Sahara Mall à Agadir.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
