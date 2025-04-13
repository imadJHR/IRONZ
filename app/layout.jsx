import React from "react";
import  ClientLayout  from "./ClientLayout";

export const metadata = {
  title: "IRONZ PRO - Équipements Professionnels et Matériaux",
  description:
    "Votre partenaire de confiance pour tous vos besoins en équipements professionnels et matériaux de construction.",
};

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
