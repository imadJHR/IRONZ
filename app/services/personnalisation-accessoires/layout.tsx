import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personnalisation d'accessoires sportifs au Maroc | IRONZ",
  description:
    "Personnalisez vos accessoires sportifs au Maroc : gants, ceintures, sangles, genouillères avec vos couleurs et logo. Livraison rapide.",
  alternates: { canonical: "/services/personnalisation-accessoires" },
};

export default function CustomAccessoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
