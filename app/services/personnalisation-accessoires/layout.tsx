import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessoires sportifs personnalisés au Maroc",
  description: "Personnalisez vos accessoires et équipements sportifs avec vos couleurs et votre logo grâce au service IRONZ.",
  alternates: { canonical: "/services/personnalisation-accessoires" },
};

export default function CustomAccessoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
