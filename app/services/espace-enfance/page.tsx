import EspaceEnfanceClientPage from "./EspaceEnfanceClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Enfance | IRONZ PRO",
  description:
    "Services professionnels d'aménagement d'espaces fitness pour enfants par IRONZ PRO",
};

export default function EspaceEnfancePage(): JSX.Element {
  return <EspaceEnfanceClientPage />;
}