import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revêtement de sol sportif au Maroc | IRONZ",
  description:
    "Revêtement de sol sportif au Maroc pour salles de sport et espaces fitness : dalles caoutchouc, PVC sportif, résine polyuréthane, protections murales et devis.",
  alternates: { canonical: "/services/revetement-sol-mur" },
};

export default function SportsFlooringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
