import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revêtement de sol sportif au Maroc | IRONZ",
  description:
    "Revêtements de sol et murs sportifs au Maroc : dalles caoutchouc, PVC, résine polyuréthane, miroirs et protections murales. Garantie 5 ans.",
  alternates: { canonical: "/services/revetement-sol-mur" },
};

export default function SportsFlooringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
