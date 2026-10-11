import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog fitness, musculation et aménagement au Maroc | IRONZ",
  description:
    "Articles et guides IRONZ pour s'équiper au Maroc : matériel de musculation, machines cardio, nutrition sportive et aménagement de salle de sport.",
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-white dark:bg-gray-950">{children}</main>;
}
