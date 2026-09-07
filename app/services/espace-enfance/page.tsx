import EspaceEnfanceClientPage from "./EspaceEnfanceClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Enfance | IRONZ",
  description:
    "Services professionnels d'aménagement d'espaces fitness pour enfants par IRONZ",
};

export default function EspaceEnfancePage() {
  return <EspaceEnfanceClientPage />;
}
