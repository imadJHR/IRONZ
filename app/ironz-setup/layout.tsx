import type { Metadata } from "next";
import SetupClientLayout from "./SetupClientLayout";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false, nocache: true },
};

export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return <SetupClientLayout>{children}</SetupClientLayout>;
}
