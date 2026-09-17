import EspaceEnfanceClientPage from "./EspaceEnfanceClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Enfance | IRONZ",
  description:
    "Services d'aménagement d'espaces fitness pour enfants par IRONZ au Maroc : sécurité, ludisme et activité physique adaptée.",
  alternates: { canonical: "/services/espace-enfance" },
};

export default function EspaceEnfancePage() {
  return <EspaceEnfanceClientPage />;
}
